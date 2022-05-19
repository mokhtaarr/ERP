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
using Inv.BLL.Services.AccountUsers;

namespace Inv.API.Controllers
{
    public class GLDefAccountController : BaseController
    {
        private readonly IGLDefAccountService GLDefAccountService;
        private readonly ICal_AccountUsersService Cal_AccountUsersService;

        public GLDefAccountController(IGLDefAccountService _IGLDefAccountService, ICal_AccountUsersService _Cal_AccountUsersService)
        {
            this.GLDefAccountService = _IGLDefAccountService;
            this.Cal_AccountUsersService = _Cal_AccountUsersService;
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetAll()
        {
            List<Cal_AccountChart> accountChartList = GLDefAccountService.GetAll().Select(x => new Cal_AccountChart
            {
                AccountId = x.AccountId,
                mainAccountId = x.mainAccountId,
                AccountCode = x.AccountCode,
                AccountNameA = x.AccountNameA,
                AccountNameE = x.AccountNameE
            }).OrderBy(x => x.AccountCode).ThenBy(x => x.AccountLevel).ToList();
            return Ok(new BaseResponse(accountChartList));
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetById(int id)
        {
            Cal_AccountChart accountChart = GLDefAccountService.GetById(id);
            return Ok(new BaseResponse(accountChart));
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetAllClausesById(int id)
        {
            List<Cal_Clauses> clauses = GLDefAccountService.GetAllClausesById(x=>x.AccountId == id);
            return Ok(new BaseResponse(clauses));
        }


        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetAllUsersById(int id)
        {
            var accountUsersVM = (from accountUsers in db.Cal_AccountUsers
                        join _Users in db.G_USERS on accountUsers.UserId equals _Users.UserId
                        where accountUsers.AccountId == id
                        select new Cal_AccountUsersVM
                        {
                            AccUserId = accountUsers.AccUserId,
                            AccountId = accountUsers.AccountId,
                            TranAndView = accountUsers.TranAndView,
                            UserId = accountUsers.UserId,
                            Remarks1 = accountUsers.Remarks1,
                            Remarks2 = accountUsers.Remarks2,
                            USERNAME = _Users.USER_NAME
                        }).ToList();
            return Ok(new BaseResponse(accountUsersVM));
        }

        [HttpPost, AllowAnonymous]
        public IHttpActionResult Insert([FromBody] MasterDetails_AccountChart MasterDetails_AccountChart)
        {
            using (var dbTransaction = db.Database.BeginTransaction())
            {
                try
                {
                    Cal_AccountChart accountFound = GLDefAccountService.
                        GetAll(x => x.AccountCode == MasterDetails_AccountChart.Cal_AccountChart.AccountCode).FirstOrDefault();
                    if (accountFound == null)
                    {
                        Cal_AccountChart accountChart = GLDefAccountService.Insert(MasterDetails_AccountChart.Cal_AccountChart);
                        MasterDetails_AccountChart.Cal_AccountUsers.ForEach(x => x.AccountId = accountChart.AccountId);
                        MasterDetails_AccountChart.Clauses.ForEach(x => x.AccountId = accountChart.AccountId);
                        MasterDetails_AccountChart.Clauses.ForEach(x => x.ClausesCode = x.ClausesCode + "-" + accountChart.AccountCode);
                        
                        Cal_AccountUsersService.InsertList(MasterDetails_AccountChart.Cal_AccountUsers);
                        GLDefAccountService.InsertList(MasterDetails_AccountChart.Clauses);

                        dbTransaction.Commit();
                        return Ok(new BaseResponse(accountChart));
                    }
                    else return Ok(new BaseResponse("CodeFound"));
                }
                catch (Exception ex)
                {
                    dbTransaction.Rollback();
                    return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
                }
            }
        }

        [HttpPost, AllowAnonymous]
        public IHttpActionResult Update([FromBody] MasterDetails_AccountChart MasterDetails_AccountChart)
        {  
            using (var dbTransaction = db.Database.BeginTransaction())
            {
                try
                {
                    int Id = MasterDetails_AccountChart.Cal_AccountChart.AccountId;
                    Cal_AccountChart accountChart = GLDefAccountService.Update(MasterDetails_AccountChart.Cal_AccountChart);
                    MasterDetails_AccountChart.Cal_AccountUsers.ForEach(x => x.AccountId = accountChart.AccountId);
                    MasterDetails_AccountChart.Clauses.ForEach(x => x.AccountId = accountChart.AccountId);
                    MasterDetails_AccountChart.Clauses.ForEach(x => x.ClausesCode = x.ClausesCode +"-"+ accountChart.AccountCode);
                   
                    if (MasterDetails_AccountChart.Cal_AccountUsers.Count() > 0)
                        Cal_AccountUsersService.UpdateList(MasterDetails_AccountChart.Cal_AccountUsers);
                    if (MasterDetails_AccountChart.Clauses.Count() > 0)
                        GLDefAccountService.UpdateClauses(MasterDetails_AccountChart.Clauses);

                    //if (MasterDetails_AccountChart.Cal_AccountUsers.Count > 0) {

                    //    var oldList = Cal_AccountUsersService.GetAll(x=>x.AccountId == Id);
                    //    var newList = MasterDetails_AccountChart.Cal_AccountUsers;

                    //    List<int> diffOldToDeleteIds = oldList.Select(x=>x.UserId.Value).Except(newList.Select(s=>s.UserId.Value)).ToList();
                    //    List<int> diffNewToInsertIds = newList.Select(x=>x.UserId.Value).Except(oldList.Select(s=>s.UserId.Value)).ToList();

                    //    List<int> NotUpdateThisIds = new List<int>();
                    //    NotUpdateThisIds.AddRange(NotUpdateThisIds);
                    //    NotUpdateThisIds.AddRange(diffNewToInsertIds);

                    //    var diffNewToInsert = newList.Where(x => diffNewToInsertIds.Contains(x.UserId.Value)).ToList();
                    //    if(diffNewToInsert.Count > 0)
                    //        Cal_AccountUsersService.InsertList(diffNewToInsert);

                    //    var diffOldToDelete = oldList.Where(x => diffOldToDeleteIds.Contains(x.UserId.Value)).ToList();
                    //    if(diffOldToDelete.Count > 0)
                    //        Cal_AccountUsersService.DeleteList(diffOldToDelete);

                    //    var diffNewToUpdate = newList.Where(x => !NotUpdateThisIds.Contains(x.UserId.Value)).ToList();
                    //    if (diffNewToUpdate.Count > 0)
                    //       Cal_AccountUsersService.UpdateList(diffNewToUpdate);
                    //}

                    dbTransaction.Commit();
                    return Ok(new BaseResponse(accountChart));
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
                    var AccountUsers = Cal_AccountUsersService.GetAll(x => x.AccountId == id);
                    Cal_AccountUsersService.DeleteList(AccountUsers);
                    bool res = GLDefAccountService.Delete(id);
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
        public IHttpActionResult GetAllUsers()
        {
            var allUsers = (from _Users in db.G_USERS
                            select new Cal_AccountUsersVM
                            {
                                UserId = _Users.UserId,
                                USERNAME = _Users.USER_NAME
                            }).ToList();
            return Ok(new BaseResponse(allUsers));
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetCurrency(string Code)
        {
            MS_Currency currency = db.MS_Currency.FirstOrDefault(x=>x.CurrencyCode == Code);
            return Ok(new BaseResponse(currency));
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetCurrencies()
        {
            List< MS_Currency> currency = db.MS_Currency.ToList().Select(x=> new MS_Currency { 
                CurrencyCode = x.CurrencyCode,
                CurrencyDescA = x.CurrencyDescA,
                CurrencyDescE = x.CurrencyDescE,
                CurrencyId = x.CurrencyId,
                Rate = x.Rate
            }).ToList();
            return Ok(new BaseResponse(currency));
        }
    }
}
