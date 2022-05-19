using Inv.API.Models;
using Inv.DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web.Http;
using Inv.API.Tools;
using Inv.BLL.Services.AccountClassification;

namespace Inv.API.Controllers
{
    public class Cod_AccountClassificationController : BaseController
    {
        private readonly ICod_AccountClassificationService Service;

        public Cod_AccountClassificationController(ICod_AccountClassificationService _service )
        {
            this.Service = _service;
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetAll()
        {
            List<Cod_AccountClassification> accountCategories = Service.GetAll().OrderBy(x=>x.Code).ToList();
            return Ok(new BaseResponse(accountCategories));
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetById(int id)
        {
            Cod_AccountClassification accountCategory = Service.GetById(id);
            return Ok(new BaseResponse(accountCategory));
        }

        [HttpPost, AllowAnonymous]
        public IHttpActionResult Insert([FromBody] Cod_AccountClassification Cod_AccountClassification)
        {
            using (var dbTransaction = db.Database.BeginTransaction())
            {
                try
                {
                    if (Cod_AccountClassification != null)
                    {
                        Cod_AccountClassification accountCategory = Service.Insert(Cod_AccountClassification);
                        dbTransaction.Commit();
                        return Ok(new BaseResponse(accountCategory));
                    }
                    else return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed));
                }
                catch (Exception ex)
                {
                    dbTransaction.Rollback();
                    return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
                }
            }
        }

        [HttpPost, AllowAnonymous]
        public IHttpActionResult Update([FromBody] Cod_AccountClassification Cod_AccountClassification)
        {  
            using (var dbTransaction = db.Database.BeginTransaction())
            {
                try
                {
                    Cod_AccountClassification accountCategory = Service.Update(Cod_AccountClassification);
                    dbTransaction.Commit();
                    return Ok(new BaseResponse(accountCategory));
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
