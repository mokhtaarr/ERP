using Inv.API.Models;
using Inv.DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web.Http;
using Inv.API.Tools;
using Inv.BLL.Services.AssetAssetCategory;

namespace Inv.API.Controllers.FixedAssets
{
    public class Asset_AssetCategoryController : BaseController
    {
        private readonly IAsset_AssetCategoryService Service;

        public Asset_AssetCategoryController(IAsset_AssetCategoryService _service)
        {
            this.Service = _service;
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetAll()
        {
            List<Asset_AssetCategory> itemCategory = Service.GetAll().Select(x => new Asset_AssetCategory
            {
                AssetCatId = x.AssetCatId,
                ParentAssetCatId = x.ParentAssetCatId,
                CatCode = x.CatCode,
                Name1 = x.Name1,
                Name2 = x.Name2
            }).OrderBy(x => x.CatCode).ToList();
            return Ok(new BaseResponse(itemCategory));
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetById(int id)
        {
            Asset_AssetCategory itemCategory = Service.GetById(id);
            return Ok(new BaseResponse(itemCategory));
        }

        [HttpPost, AllowAnonymous]
        public IHttpActionResult Insert([FromBody] Asset_AssetCategory Asset_AssetCategory)
        {
            using (var dbTransaction = db.Database.BeginTransaction())
            {
                try
                {
                    if (Asset_AssetCategory != null)
                    {
                        Asset_AssetCategory itemCategory = Service.Insert(Asset_AssetCategory);
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
        public IHttpActionResult Update([FromBody] Asset_AssetCategory Asset_AssetCategory)
        {
            using (var dbTransaction = db.Database.BeginTransaction())
            {
                try
                {
                    Asset_AssetCategory itemCategory = Service.Update(Asset_AssetCategory);
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
