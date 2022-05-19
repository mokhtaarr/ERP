using Inv.API.Models;
using Inv.API.Models.CustomModel;
using Inv.API.Tools;
using Inv.BLL.Services.MSBoxBank;
using Inv.DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Inv.API.Controllers
{
    public class MS_BoxBankController : BaseController
    {
        private readonly IMS_BoxBankService Service;
       
        public MS_BoxBankController(IMS_BoxBankService _MS_BoxBankService)
        {
            this.Service = _MS_BoxBankService;
           
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetAll()
        {
            List<MS_BoxBank> Ms_Termss = GetAllIds();
            return Ok(new BaseResponse(Ms_Termss));
        }

        [HttpGet, AllowAnonymous]
        public List<MS_BoxBank> GetAllIds()
        {
            List<MS_BoxBank> Ms_Termss = Service.GetAll().OrderBy(x => x.BoxCode).ToList()
                .Select(x => new MS_BoxBank { BoxId = x.BoxId, BoxCode = x.BoxCode, DESCA = x.DESCA, DESCE = x.DESCE }).ToList();
            return Ms_Termss;
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetById(int id)
        {
            BoxBankHeaderAndDetails details = new BoxBankHeaderAndDetails()
            {
                BoxBank = Service.GetById(id),
                BoxCurrency = Service.GetBoxCurrency(x => x.BoxId == id),
                BoxUsers = Service.GetBoxUsers(x => x.BoxId == id),
            };
            return Ok(new BaseResponse(details));
        }

        [HttpPost, AllowAnonymous]
        public IHttpActionResult Insert([FromBody] BoxBankHeaderAndDetails details)
        {
            using (var dbTransaction = db.Database.BeginTransaction())
            {
                try
                {
                    if (details != null)
                    {
                        if (details.BoxBank != null)
                        {
                            MS_BoxBank Model = Service.Insert(details.BoxBank);
                            details.BoxCurrency.ForEach(x=>x.BoxId = Model.BoxId);
                            details.BoxUsers.ForEach(x=>x.BoxId = Model.BoxId);

                            if (details.BoxCurrency.Count() > 0)
                                Service.InsertList(details.BoxCurrency);
                            
                            if (details.BoxUsers.Count() > 0)
                                Service.InsertList(details.BoxUsers);

                            dbTransaction.Commit();
                            return Ok(new BaseResponse(details));
                        }
                        return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, "inset Error"));
                    }
                    else return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, "model is null"));
                }
                catch (Exception ex)
                {
                    dbTransaction.Rollback();
                    return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
                }
            }
        }

        [HttpPost, AllowAnonymous]
        public IHttpActionResult Update([FromBody] BoxBankHeaderAndDetails details)
        {
            using (var dbTransaction = db.Database.BeginTransaction())
            {
                try
                {
                    if (details != null)
                    {
                        if (details.BoxBank != null)
                        {
                            MS_BoxBank Model = Service.Update(details.BoxBank);
                            details.BoxCurrency.ForEach(x => x.BoxId = Model.BoxId);
                            details.BoxUsers.ForEach(x => x.BoxId = Model.BoxId);

                            if (details.BoxCurrency.Count() > 0)
                                Service.UpdateBoxCurrency(details.BoxCurrency);

                            if (details.BoxUsers.Count() > 0)
                                Service.UpdateBoxUsers(details.BoxUsers);

                            dbTransaction.Commit();
                            return Ok(new BaseResponse(details));
                        }
                        return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, "Update Error"));
                    }
                    else return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, "model is null"));
                }
                catch (Exception ex)
                {
                    dbTransaction.Rollback();
                    return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
                }
            }
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult Delete(int id)
        {
            using (var dbTransaction = db.Database.BeginTransaction())
            {
                try
                {
                    bool res = Service.Delete(id);
                    var boxUsers = Service.GetBoxUsers(x => x.BoxId == id);
                    var boxCurrency = Service.GetBoxCurrency(x => x.BoxId == id);
                    Service.DeleteList(boxUsers);
                    Service.DeleteList(boxCurrency);

                    dbTransaction.Commit();
                    return Ok(res);
                }
                catch (Exception ex)
                {
                    dbTransaction.Rollback();
                    return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
                }
            }
        }
    }
}
