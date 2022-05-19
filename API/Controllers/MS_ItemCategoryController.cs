using Inv.API.Models;
using Inv.DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web.Http;
using Inv.API.Tools;
using Inv.BLL.Services.MSItemCategory;

namespace Inv.API.Controllers
{
    public class MS_ItemCategoryController : BaseController
    {
        private readonly IMS_ItemCategoryService Service;

        public MS_ItemCategoryController(IMS_ItemCategoryService _service )
        {
            this.Service = _service;
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetAll()
        {
            List<MS_ItemCategory> itemCategory = Service.GetAll().OrderBy(x=>x.ItemCatCode).ToList();
            return Ok(new BaseResponse(itemCategory));
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetById(int id)
        {
            MS_ItemCategory itemCategory = Service.GetById(id);
            return Ok(new BaseResponse(itemCategory));
        }

        [HttpPost, AllowAnonymous]
        public IHttpActionResult Insert([FromBody] MS_ItemCategory MS_ItemCategory)
        {
            using (var dbTransaction = db.Database.BeginTransaction())
            {
                try
                {
                    if (MS_ItemCategory != null)
                    {
                        MS_ItemCategory itemCategory = Service.Insert(MS_ItemCategory);
                        dbTransaction.Commit();
                        return Ok(new BaseResponse(itemCategory));
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
        public IHttpActionResult Update([FromBody] MS_ItemCategory MS_ItemCategory)
        {  
            using (var dbTransaction = db.Database.BeginTransaction())
            {
                try
                {
                    MS_ItemCategory itemCategory = Service.Update(MS_ItemCategory);
                    dbTransaction.Commit();
                    return Ok(new BaseResponse(itemCategory));
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
