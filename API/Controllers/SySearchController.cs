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
            MasterDetailsSearch masterDetails = new MasterDetailsSearch();
            masterDetails.module = Service.GetAll().OrderBy(x => x.ModuleCode).ToList();
            masterDetails = GetAllDetails(masterDetails);

            return Ok(new BaseResponse(masterDetails));
        }

        [HttpGet, AllowAnonymous]
        public MasterDetailsSearch GetAllDetails(MasterDetailsSearch masterDetails)
        {
            List<string> codes = masterDetails.module.Select(x => x.ModuleCode).ToList();
            masterDetails.settings = Getsetting(codes);
            masterDetails.ColumnSetting = GetColumnSetting(codes);

            return masterDetails;
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
                        if (detailes.module.Count() > 0)
                        {
                            G_SearchFormModule module = Service.Insert(detailes.module.FirstOrDefault());
                            detailes.settings.FirstOrDefault().SearchFormCode = module.ModuleCode;
                            detailes.ColumnSetting.ForEach(x => x.SearchFormCode = module.ModuleCode);
                            
                            if (detailes.ColumnSetting.Count() > 0)
                                Service.InsertList(detailes.ColumnSetting);
                            if (detailes.settings.Count() > 0)
                                Service.InsertList(detailes.settings);

                            dbTransaction.Commit();
                            return Ok(new BaseResponse(detailes.module));
                        }
                        return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed));
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
        public IHttpActionResult Update([FromBody] MasterDetailsSearch detailes)
        {
            using (var dbTransaction = db.Database.BeginTransaction())
            {
                try
                {
                    if (detailes.module.Count() > 0)
                    {
                        G_SearchFormModule module = Service.Update(detailes.module.FirstOrDefault());
                        detailes.settings.ForEach(x => x.SearchFormCode = module.ModuleCode);
                        detailes.ColumnSetting.ForEach(x => x.SearchFormCode = module.ModuleCode);

                        if (detailes.settings.Count() > 0)
                            Service.UpdateSettings(detailes.settings);
                        if (detailes.ColumnSetting.Count() > 0)
                            Service.UpdateColumnSetting(detailes.ColumnSetting);

                        dbTransaction.Commit();
                        return Ok(new BaseResponse(detailes.module));
                    }
                    return Ok(new BaseResponse(detailes.module));
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
                    G_SearchFormModule module = GetByCode(code);
                    MasterDetailsSearch masterDetails = new MasterDetailsSearch() {module = new List<G_SearchFormModule>() };
                    masterDetails.module.Add(module);
                    MasterDetailsSearch detailes = GetAllDetails(masterDetails);

                    if (detailes.settings.Count() > 0)
                        Service.DeleteList(detailes.settings);
                    if (detailes.ColumnSetting.Count() > 0)
                        Service.DeleteList(detailes.ColumnSetting);

                    bool res = Service.Delete(module);
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
        public List<G_SearchForm> Getsetting(List<string> codes)
        {
            List<G_SearchForm> setting = db.G_SearchForm.Where(x => codes.Contains(x.SearchFormCode)).ToList();
            return setting;
        }

        [HttpGet, AllowAnonymous]
        public List<G_SearchFormSetting> GetColumnSetting(List<string> codes)
        {
            List<G_SearchFormSetting> ColumnSetting = db.G_SearchFormSetting.Where(x => codes.Contains(x.SearchFormCode)).ToList();
            return ColumnSetting;
        }
    }
}
