using Inv.API.Models;
using Inv.API.Models.CustomModel;
using Inv.API.Tools;
using Inv.BLL.Services.MSTaxes;
using Inv.DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Inv.API.Controllers
{
    public class MS_TaxesController : BaseController
    {
        private readonly IMS_TaxesService Service;
       
        public MS_TaxesController(IMS_TaxesService _MS_TaxesService)
        {
            this.Service = _MS_TaxesService;
           
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetAll()
        {
            List<MS_Taxes> Ms_Termss = GetAllIds();
            return Ok(new BaseResponse(Ms_Termss));
        }

        [HttpGet, AllowAnonymous]
        public List<MS_Taxes> GetAllIds()
        {
            List<MS_Taxes> Ms_Termss = Service.GetAll().OrderBy(x => x.TaxCode).ToList()
                .Select(x => new MS_Taxes { TaxesId = x.TaxesId, TaxCode = x.TaxCode }).ToList();
            return Ms_Termss;
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetById(int id)
        {
            MS_Taxes model = Service.GetById(id);
            return Ok(new BaseResponse(model));
        }

        [HttpPost, AllowAnonymous]
        public IHttpActionResult Insert([FromBody] MS_Taxes model)
        {
            using (var dbTransaction = db.Database.BeginTransaction())
            {
                try
                {
                    if (model != null)
                    {
                        MS_Taxes Model = Service.Insert(model);
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
        public IHttpActionResult Update([FromBody] MS_Taxes model)
        {
            using (var dbTransaction = db.Database.BeginTransaction())
            {
                try
                {
                    if (model != null)
                    {
                        MS_Taxes Model = Service.Update(model);
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
