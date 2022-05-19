using Inv.API.Models;
using Inv.DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Inv.API.Controllers;
using Inv.API.Tools;
using System.Web.Http.Cors;
using System.Data.SqlClient;
using System.Data.Entity;
using Inv.DAL.Repository;
using Newtonsoft.Json;
using Inv.API.Models.CustomModel;
using Inv.BLL.Services.GLDefAccount;
using Inv.BLL.Services.GLDefAccount.VM;
using Inv.BLL.Services.AccountCategories;

namespace Inv.API.Controllers
{
    public class Cod_AccountCategoriesController : BaseController
    {
        private readonly IAccountCategoriesService AccountCategoriesService;

        public Cod_AccountCategoriesController(IAccountCategoriesService accountCategoriesService )
        {
            this.AccountCategoriesService = accountCategoriesService;
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetAll()
        {
            List<Cod_AccountCategories> accountCategories = AccountCategoriesService.GetAll().OrderBy(x=>x.Code).ToList();
            return Ok(new BaseResponse(accountCategories));
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult Get()
        {
            List<Cod_AccountCategories> accountCategories = AccountCategoriesService.GetAll().Select(x=> new Cod_AccountCategories {
                Code = x.Code,
                AccountCatId = x.AccountCatId,
                DescA = x.DescA,
                DescE = x.DescE
            }).OrderBy(x => x.Code).ToList();
            return Ok(new BaseResponse(accountCategories));
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetById(int id)
        {
            Cod_AccountCategories accountCategory = AccountCategoriesService.GetById(id);
            return Ok(new BaseResponse(accountCategory));
        }

        [HttpPost, AllowAnonymous]
        public IHttpActionResult Insert([FromBody] Cod_AccountCategories cod_AccountCategories)
        {
            using (var dbTransaction = db.Database.BeginTransaction())
            {
                try
                {
                    if (cod_AccountCategories != null)
                    {
                        Cod_AccountCategories accountCategory = AccountCategoriesService.Insert(cod_AccountCategories);
                        dbTransaction.Commit();
                        return Ok(new BaseResponse(accountCategory));
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
        public IHttpActionResult Update([FromBody] Cod_AccountCategories cod_AccountCategories)
        {  
            using (var dbTransaction = db.Database.BeginTransaction())
            {
                try
                {
                    Cod_AccountCategories accountCategory = AccountCategoriesService.Update(cod_AccountCategories);
                    dbTransaction.Commit();
                    return Ok(new BaseResponse(accountCategory));
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
                    bool res = AccountCategoriesService.Delete(id);
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
