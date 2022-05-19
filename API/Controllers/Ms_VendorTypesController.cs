using Inv.API.Models;
using Inv.DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web.Http;
using Inv.API.Tools;
using Inv.BLL.Services.MsVendorTypes;

namespace Inv.API.Controllers
{
    public class Ms_VendorTypesController : BaseController
    {
        private readonly IMs_VendorTypesService Service;

        public Ms_VendorTypesController(IMs_VendorTypesService _service )
        {
            this.Service = _service;
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetAll()
        {
            List<Ms_VendorTypes> vendorType = Service.GetAll().OrderBy(x=>x.VendorTypeCode).ToList();
            return Ok(new BaseResponse(vendorType));
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetById(int id)
        {
            Ms_VendorTypes vendorType = Service.GetById(id);
            return Ok(new BaseResponse(vendorType));
        }

        [HttpPost, AllowAnonymous]
        public IHttpActionResult Insert([FromBody] Ms_VendorTypes Ms_VendorTypes)
        {
            using (var dbTransaction = db.Database.BeginTransaction())
            {
                try
                {
                    if (Ms_VendorTypes != null)
                    {
                        Ms_VendorTypes vendorType = Service.Insert(Ms_VendorTypes);
                        dbTransaction.Commit();
                        return Ok(new BaseResponse(vendorType));
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
        public IHttpActionResult Update([FromBody] Ms_VendorTypes Ms_VendorTypes)
        {  
            using (var dbTransaction = db.Database.BeginTransaction())
            {
                try
                {
                    Ms_VendorTypes vendorType = Service.Update(Ms_VendorTypes);
                    dbTransaction.Commit();
                    return Ok(new BaseResponse(vendorType));
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
