using Inv.API.Models;
using Inv.DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web.Http;
using Inv.API.Tools;
using Inv.BLL.Services.MSCurrency;
using Inv.BLL.Services.CurrencyCategory;
using Inv.API.Models.CustomModel;

namespace Inv.API.Controllers
{
    public class MS_CurrencyController : BaseController
    {
        private readonly IMS_CurrencyCategoryService MS_CurrencyCategoryService;
        private readonly IMS_CurrencyService Service;

        public MS_CurrencyController(IMS_CurrencyService _service ,IMS_CurrencyCategoryService _IMS_CurrencyCategorySrv)
        {
            this.MS_CurrencyCategoryService = _IMS_CurrencyCategorySrv;

            this.Service = _service;
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetAll()
        {
            List<MS_Currency> List = Service.GetAll().OrderBy(x=>x.CurrencyCode).ToList();
            return Ok(new BaseResponse(List));
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetById(int id)
        {
            MS_Currency Model = Service.GetById(id);
            return Ok(new BaseResponse(Model));
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetAllCurrencyCategory()
        {
            List<MS_CurrencyCategory> List = MS_CurrencyCategoryService.GetAll().Select(x=> new MS_CurrencyCategory { 
                CurrencyCategoryId = x.CurrencyCategoryId,
                CurrencyCategoryNameA = x.CurrencyCategoryNameA,
                CurrencyCategoryNameE = x.CurrencyCategoryNameE,
                code = x.code
            }).ToList();
            return Ok(new BaseResponse(List));
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetDetails(int id)
        {
            CurrencyDetails Model = new CurrencyDetails()
            {
                CurrencyCategories = (from CategoryJoin in db.Ms_CurrencyCategoryJoin
                                      join CurrencyCategory in db.MS_CurrencyCategory on CategoryJoin.CurrencyCategoryId equals CurrencyCategory.CurrencyCategoryId
                                      where CategoryJoin.CurrencyId == id
                                      select new CustomCurrencyCategory
                                      {
                                          CurrencyCategoryId = CurrencyCategory.CurrencyCategoryId,
                                          CurrencyId = CategoryJoin.CurrencyId,
                                          CurrencyCategoryNameA = CurrencyCategory.CurrencyCategoryNameA,
                                          CurrencyCategoryNameE = CurrencyCategory.CurrencyCategoryNameE,
                                          CurrencyType = CategoryJoin.CurrencyType,
                                          code = CurrencyCategory.code
                                      }
                                      ).ToList(),
                CurrencyRate = (from CurrencyRate in db.Ms_CurrencyRate
                                join Currency in db.MS_Currency on CurrencyRate.EquivalentCurrencyId equals Currency.CurrencyId
                                where CurrencyRate.CurrencyId == id
                                select new CustomCurrencyRate
                                {
                                    EqualCurrencyPriceId = CurrencyRate.EqualCurrencyPriceId,
                                    Rate = CurrencyRate.Rate,
                                    CurrencyId = Currency.CurrencyId,
                                    CurrencyDescA = Currency.CurrencyDescA,
                                    CurrencyCode = Currency.CurrencyCode,
                                    CurrencyDescE = Currency.CurrencyDescE,
                                    EquivalentCurrencyId = CurrencyRate.EquivalentCurrencyId
                                }).ToList(),
            };
            return Ok(new BaseResponse(Model));
        }

        [HttpPost, AllowAnonymous]
        public IHttpActionResult Insert([FromBody] PostCurrencyDetails detailes)
        {
            using (var dbTransaction = db.Database.BeginTransaction())
            {
                try
                {
                    if (detailes != null)
                    {
                        if (detailes.Currency != null)
                        {
                            MS_Currency model = Service.Insert(detailes.Currency);
                            detailes.CurrencyCategories.ForEach(x => x.CurrencyId = model.CurrencyId);
                            detailes.CurrencyRate.ForEach(x => x.CurrencyId = model.CurrencyId);

                            if (detailes.CurrencyCategories.Count() > 0)
                                Service.InsertList(detailes.CurrencyCategories);
                            if (detailes.CurrencyRate.Count() > 0)
                                Service.InsertList(detailes.CurrencyRate);

                            dbTransaction.Commit();
                            return Ok(new BaseResponse(detailes));
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
        public IHttpActionResult Update([FromBody] PostCurrencyDetails detailes)
        {
            using (var dbTransaction = db.Database.BeginTransaction())
            {
                try
                {
                    if (detailes.Currency != null)
                    {
                        detailes.Currency.LastModify = DateTime.UtcNow;
                        MS_Currency model = Service.Update(detailes.Currency);
                        detailes.CurrencyCategories.ForEach(x => x.CurrencyId = model.CurrencyId);
                        detailes.CurrencyRate.ForEach(x => x.CurrencyId = model.CurrencyId);

                        if (detailes.CurrencyCategories.Count() > 0)
                            Service.UpdateCurrencyCategoryJoins(detailes.CurrencyCategories);
                        if (detailes.CurrencyRate.Count() > 0)
                            Service.UpdatecurrencyRates(detailes.CurrencyRate);

                        dbTransaction.Commit();
                        return Ok(new BaseResponse(detailes));
                    }
                    return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed));
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
                    var CurrencyCategoryJoin = Service.GetAllCurrencyCategoryJoin(x => x.CurrencyId == id);
                    var CurrencyRate = Service.GetAllCurrencyRate(x => x.CurrencyId == id);
                    if (CurrencyCategoryJoin.Count() > 0)
                        Service.DeleteList(CurrencyCategoryJoin);
                    if (CurrencyRate.Count() >  0)
                        Service.DeleteList(CurrencyRate);

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

        //[HttpPost, AllowAnonymous]
        //public IHttpActionResult Insert([FromBody] MS_Currency model)
        //{
        //    using (var dbTransaction = db.Database.BeginTransaction())
        //    {
        //        try
        //        {
        //            if (model != null)
        //            {
        //                MS_Currency Model = Service.Insert(model);
        //                dbTransaction.Commit();
        //                return Ok(new BaseResponse(Model));
        //            }
        //            else return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed));
        //        }
        //        catch (Exception ex)
        //        {
        //            dbTransaction.Rollback();
        //            return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
        //        }
        //    }
        //}

        //[HttpPost, AllowAnonymous]
        //public IHttpActionResult Update([FromBody] MS_Currency model)
        //{  
        //    using (var dbTransaction = db.Database.BeginTransaction())
        //    {
        //        try
        //        {
        //            if (model != null)
        //            {
        //                MS_Currency Model = Service.Update(model);
        //                dbTransaction.Commit();
        //                return Ok(new BaseResponse(Model));
        //            }
        //            else return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed));
        //        }
        //        catch (Exception ex)
        //        {
        //            dbTransaction.Rollback();
        //            return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
        //        }
        //    }
        //}

        //[HttpGet, AllowAnonymous]
        //public IHttpActionResult Delete(int id)
        //{
        //    using (var dbTransaction = db.Database.BeginTransaction())
        //    {
        //        try
        //        {
        //            bool res = Service.Delete(id);
        //            dbTransaction.Commit();
        //            return Ok(res);
        //        }
        //        catch (Exception ex)
        //        {
        //            dbTransaction.Rollback();
        //            return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
        //        }
        //    }
        //}
    }
}
