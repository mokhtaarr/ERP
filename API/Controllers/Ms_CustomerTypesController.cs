using Inv.API.Models;
using Inv.DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web.Http;
using Inv.API.Tools;
using Inv.BLL.Services.MsCustomerTypes;

namespace Inv.API.Controllers
{
    public class Ms_CustomerTypesController : BaseController
    {
        private readonly IMs_CustomerTypesService Service;

        public Ms_CustomerTypesController(IMs_CustomerTypesService _service )
        {
            this.Service = _service;
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetAll()
        {
            List<Ms_CustomerTypes> customerTypes = Service.GetAll().OrderBy(x=>x.CustomerTypeCode).ToList();
            return Ok(new BaseResponse(customerTypes));
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetById(int id)
        {
            Ms_CustomerTypes customerType = Service.GetById(id);
            return Ok(new BaseResponse(customerType));
        }

        [HttpPost, AllowAnonymous]
        public IHttpActionResult Insert([FromBody] Ms_CustomerTypes Ms_CustomerTypes)
        {
            using (var dbTransaction = db.Database.BeginTransaction())
            {
                try
                {
                    if (Ms_CustomerTypes != null)
                    {
                        Ms_CustomerTypes customerType = Service.Insert(Ms_CustomerTypes);
                        dbTransaction.Commit();
                        return Ok(new BaseResponse(customerType));
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
        public IHttpActionResult Update([FromBody] Ms_CustomerTypes Ms_CustomerTypes)
        {  
            using (var dbTransaction = db.Database.BeginTransaction())
            {
                try
                {
                    Ms_CustomerTypes customerType = Service.Update(Ms_CustomerTypes);
                    dbTransaction.Commit();
                    return Ok(new BaseResponse(customerType));
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
