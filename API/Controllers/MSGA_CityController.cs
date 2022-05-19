using Inv.API.Models;
using Inv.DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web.Http;
using Inv.API.Tools;
using Inv.BLL.Services.MSGACity;

namespace Inv.API.Controllers
{
    public class MSGA_CityController : BaseController
    {
        private readonly IMSGA_CityService Service;

        public MSGA_CityController(IMSGA_CityService _service )
        {
            this.Service = _service;
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetAll()
        {
            List<MSGA_City> List = Service.GetAll().OrderBy(x=>x.CityCode).ToList();
            return Ok(new BaseResponse(List));
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetById(int id)
        {
            MSGA_City Model = Service.GetById(id);
            return Ok(new BaseResponse(Model));
        }

        [HttpPost, AllowAnonymous]
        public IHttpActionResult Insert([FromBody] MSGA_City model)
        {
            using (var dbTransaction = db.Database.BeginTransaction())
            {
                try
                {
                    if (model != null)
                    {
                        MSGA_City Model = Service.Insert(model);
                        dbTransaction.Commit();
                        return Ok(new BaseResponse(Model));
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
        public IHttpActionResult Update([FromBody] MSGA_City model)
        {  
            using (var dbTransaction = db.Database.BeginTransaction())
            {
                try
                {
                    if (model != null)
                    {
                        MSGA_City Model = Service.Update(model);
                        dbTransaction.Commit();
                        return Ok(new BaseResponse(Model));
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
