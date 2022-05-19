using Inv.API.Models;
using Inv.API.Models.CustomModel;
using Inv.API.Tools;
using Inv.BLL.Services.MSPaymentNote;
using Inv.DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Inv.API.Controllers
{
    public class MS_PaymentNoteController : BaseController
    {
        private readonly IMS_PaymentNoteService Service;
       
        public MS_PaymentNoteController(IMS_PaymentNoteService _MS_PaymentNoteService)
        {
            this.Service = _MS_PaymentNoteService;
           
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetAll()
        {
            List<MS_PaymentNote> Ms_Termss = GetAllIds();
            return Ok(new BaseResponse(Ms_Termss));
        }

        [HttpGet, AllowAnonymous]
        public List<MS_PaymentNote> GetAllIds()
        {
            List<MS_PaymentNote> Ms_Termss = Service.GetAll().OrderBy(x => x.TrNo).ToList()
                .Select(x => new MS_PaymentNote { PayId = x.PayId, TrNo = x.TrNo }).ToList();
            return Ms_Termss;
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetById(int id)
        {
            MS_PaymentNote model = Service.GetById(id);
            return Ok(new BaseResponse(model));
        }

        [HttpPost, AllowAnonymous]
        public IHttpActionResult Insert([FromBody] MS_PaymentNote model)
        {
            using (var dbTransaction = db.Database.BeginTransaction())
            {
                try
                {
                    if (model != null)
                    {
                        MS_PaymentNote Model = Service.Insert(model);
                        dbTransaction.Commit();
                        return Ok(new BaseResponse(model));
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
        public IHttpActionResult Update([FromBody] MS_PaymentNote model)
        {
            using (var dbTransaction = db.Database.BeginTransaction())
            {
                try
                {
                    if (model != null)
                    {
                        MS_PaymentNote Model = Service.Update(model);
                        dbTransaction.Commit();
                        return Ok(new BaseResponse(model));
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
