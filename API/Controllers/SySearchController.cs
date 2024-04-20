using Inv.API.Models;
using Inv.DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web.Http;
using Inv.API.Tools;
using Inv.BLL.Services.SySearch;
using Inv.API.Models.CustomModel;

namespace Inv.API.Controllers
{
    public class SySearchController : BaseController
    {
        private readonly ISearchService Service;
        public SySearchController(ISearchService _service)
        {
            this.Service = _service;
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetAll()
        {
            using (var dbTransaction = db.Database.BeginTransaction())
            {
                string query = @"select * from G_SearchFormModule Order By ModuleCode";
                List<G_SearchFormModule> modules = db.Database.SqlQuery<G_SearchFormModule>(query).ToList();
                return Ok(new BaseResponse(modules));
            }

            //List<G_SearchFormModule> modules = Service.GetAll().OrderBy(x => x.ModuleCode).ToList();
            //return Ok(new BaseResponse(modules));
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult Get(string code)
        {
            MasterDetailsSearch masterDetails = new MasterDetailsSearch()
            {
                settings = Getsetting(code),
                ColumnSetting = GetColumnSetting(code)
            };
            return Ok(new BaseResponse(masterDetails));
        }

        [HttpGet, AllowAnonymous]
        public G_SearchFormModule GetByCode(string code)
        {
            G_SearchFormModule Search = Service.GetById(code);
            return Search;
        }

        [HttpPost, AllowAnonymous]
        public IHttpActionResult Insert([FromBody] MasterDetailsSearch detailes)
        {
            using (var dbTransaction = db.Database.BeginTransaction())
            {
                try
                {
                    if (detailes != null)
                    {
                        if (detailes.module != null)
                        {
                            G_SearchFormModule module = Service.Insert(detailes.module);
                            detailes.settings.SearchFormCode = module.SearchFormCode;
                            detailes.ColumnSetting.ForEach(x => x.SearchFormCode = module.SearchFormCode);

                            if (detailes.ColumnSetting.Count() > 0)
                                Service.InsertList(detailes.ColumnSetting);
                            if (detailes.settings != null)
                                Service.Insert(detailes.settings);

                            dbTransaction.Commit();
                            return Ok(new BaseResponse(detailes.module));
                        }
                        return Ok(new BaseResponse(HttpStatusCode.InternalServerError, "model is null"));
                    }
                    else return Ok(new BaseResponse(HttpStatusCode.InternalServerError, "detailes is null"));
                }
                catch (Exception ex)
                {
                    dbTransaction.Rollback();
                    return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
                }
            }
        }

        [HttpPost, AllowAnonymous]
        public IHttpActionResult Update([FromBody] MasterDetailsSearch detailes)
        {
            using (var dbTransaction = db.Database.BeginTransaction())
            {
                try
                {
                    if (detailes != null)
                    {
                        if (detailes.module != null)
                        {
                            G_SearchFormModule module = Service.Update(detailes.module);
                            detailes.settings.SearchFormCode = module.SearchFormCode;
                            detailes.ColumnSetting.ForEach(x => x.SearchFormCode = module.SearchFormCode);

                            if (detailes.settings != null)
                                Service.UpdateSettings(detailes.settings);
                            if (detailes.ColumnSetting.Count() > 0)
                                Service.UpdateColumnSetting(detailes.ColumnSetting);

                            dbTransaction.Commit();
                            return Ok(new BaseResponse(detailes.module));
                        }
                        return Ok(new BaseResponse(HttpStatusCode.InternalServerError, "model is null"));
                    }
                    else return Ok(new BaseResponse(HttpStatusCode.InternalServerError, "detailes is null"));
                }
                catch (Exception ex)
                {
                    dbTransaction.Rollback();
                    return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
                }
            }
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult Delete(string code)
        {
            using (var dbTransaction = db.Database.BeginTransaction())
            {
                try
                {
                    MasterDetailsSearch detailes = new MasterDetailsSearch()
                    {
                        module = GetByCode(code),
                        settings = Getsetting(code),
                        ColumnSetting = GetColumnSetting(code)
                    };

                    if (detailes.settings != null)
                        Service.Delete(detailes.settings);
                    if (detailes.ColumnSetting.Count() > 0)
                        Service.DeleteList(detailes.ColumnSetting);

                    bool res = Service.Delete(detailes.module);
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


        [HttpGet, AllowAnonymous]
        public G_SearchForm Getsetting(string code)
        {
            G_SearchForm setting = db.G_SearchForm.FirstOrDefault(x => x.SearchFormCode == code);
            return setting;
        }

        [HttpGet, AllowAnonymous]
        public List<G_SearchFormSetting> GetColumnSetting(string code)
        {
            List<G_SearchFormSetting> ColumnSetting = db.G_SearchFormSetting.Where(x => x.SearchFormCode == code).ToList();
            return ColumnSetting;
        }
    }
}
