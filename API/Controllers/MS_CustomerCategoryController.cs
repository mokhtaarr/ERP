using Inv.API.Models;
using Inv.DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web.Http;
using Inv.API.Tools;
using Inv.BLL.Services.MSCustomerCategory;
using Inv.API.ViewModel;

namespace Inv.API.Controllers
{
    public class MS_CustomerCategoryController : BaseController
    {
        private readonly IMS_CustomerCategoryService Service;

        public MS_CustomerCategoryController(IMS_CustomerCategoryService _service )
        {
            this.Service = _service;
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetAll()
        {
            List<MS_CustomerCategory> itemCategory = Service.GetAll().OrderBy(x=>x.CatCode).ToList();
            return Ok(new BaseResponse(itemCategory));
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetAllCustomerCategoryKeyAndValue(string Lang)
        {
            List<KeyAndValue> itemCategory = Service.GetAll().OrderBy(x => x.CatCode)
                .Select(x => new KeyAndValue
                {
                    Id = x.CustomerCatId,
                    Text = Lang == "ar" ? x.CatDescA : x.CatDescE,
                }).ToList();
            return Ok(new MobileBaseResponse(itemCategory));
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetById(int id)
        {
            MS_CustomerCategory itemCategory = Service.GetById(id);
            return Ok(new BaseResponse(itemCategory));
        }

        [HttpPost, AllowAnonymous]
        public IHttpActionResult Insert([FromBody] MS_CustomerCategory MS_CustomerCategory)
        {
            using (var dbTransaction = db.Database.BeginTransaction())
            {
                try
                {
                    if (MS_CustomerCategory != null)
                    {
                        MS_CustomerCategory itemCategory = Service.Insert(MS_CustomerCategory);
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
        public IHttpActionResult Update([FromBody] MS_CustomerCategory MS_CustomerCategory)
        {  
            using (var dbTransaction = db.Database.BeginTransaction())
            {
                try
                {
                    MS_CustomerCategory itemCategory = Service.Update(MS_CustomerCategory);
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
