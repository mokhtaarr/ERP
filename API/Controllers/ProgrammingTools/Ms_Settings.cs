using Inv.API.Models;
using Inv.DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web.Http;
using Inv.API.Tools;
using Inv.BLL.Services.HrEmployees;
using Inv.API.Models.CustomModel;
using System.Globalization;
using Inv.BLL.Services.AssetAssetCard;
using Inv.BLL.Services.ProgrammingTools.MsSettings;
using Inv.DAL.RedisCache;
using Inv.Static.VM;

namespace Inv.API.Controllers
{
    public class MS_SettingsController : BaseController
    {
        private RedisCache redis = RedisCache.GetInstance();
        private readonly IMS_SettingsService Service;
        public MS_SettingsController(IMS_SettingsService _service)
        {
            this.Service = _service;
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetAll()
        {

            MS_Settings Setting = redis.GetOrSetSettings();
            //MS_Settings Setting = Service.GetAll().FirstOrDefault();
            return Ok(new BaseResponse(Setting));
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetById(int id)
        {
            return Ok(new BaseResponse(Service.GetById(id)));
        }

        [HttpPost, AllowAnonymous]
        public IHttpActionResult Insert([FromBody] MS_Settings model)
        {
            using (var dbTransaction = db.Database.BeginTransaction())
            {
                try
                {

                    if (model != null)
                    {
                        MS_Settings Model = Service.Insert(model);
                        dbTransaction.Commit();
                        return Ok(new BaseResponse(Model));
                    }
                    return Ok(new BaseResponse(HttpStatusCode.InternalServerError, "model is null"));
                }
                catch (Exception ex)
                {
                    dbTransaction.Rollback();
                    return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
                }
            }
        }

        [HttpPost, AllowAnonymous]
        public IHttpActionResult Update([FromBody] MS_Settings model)
        {
            using (var dbTransaction = db.Database.BeginTransaction())
            {
                try
                {
                    if (model != null)
                    {
                        MS_Settings Model = Service.Update(model);
                        dbTransaction.Commit();

                        redis.AddOrUpdateSetting(Model);
                        return Ok(new BaseResponse(Model));
                    }
                    return Ok(new BaseResponse(HttpStatusCode.InternalServerError, "model is null"));
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
