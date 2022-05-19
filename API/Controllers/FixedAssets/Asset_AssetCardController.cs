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

namespace Inv.API.Controllers
{
    public class Asset_AssetCardController : BaseController
    {
        private readonly IAsset_AssetCardService Service;
        public Asset_AssetCardController(IAsset_AssetCardService _service)
        {
            this.Service = _service;
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetAll()
        {
            List<Asset_AssetCard> Asset_AssetCards = Service.GetAll().Select(x => new Asset_AssetCard
            {
                AssetId = x.AssetId,
                AssetCatId = x.AssetCatId,
                AssetCode = x.AssetCode,
                IsProduction = x.IsProduction,
                Name1 = x.Name1,
                Name2 = x.Name2,
                Tel = x.Tel,
                Remarks = x.Remarks,
            }).OrderBy(x => x.AssetCode).ToList();
            return Ok(new BaseResponse(Asset_AssetCards));
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetById(int id)
        {
            Asset_AssetCardDetailes detailes = new Asset_AssetCardDetailes()
            {
                Model = Service.GetById(id),
                accounts = GetAssetAccounts(id)
            };

            return Ok(new BaseResponse(detailes));
        }

        [HttpPost, AllowAnonymous]
        public IHttpActionResult Insert([FromBody] Asset_AssetCardDetailes detailes)
        {
            using (var dbTransaction = db.Database.BeginTransaction())
            {
                try
                {

                    if (detailes != null)
                    {
                        if (detailes.Model != null)
                        {
                            Asset_AssetCard Model = Service.Insert(detailes.Model);
                            detailes.accounts.ForEach(x => x.AssetId = Model.AssetId);
                    
                            if (detailes.accounts.Count() > 0)
                                Concatenate(detailes);

                            if (detailes.accounts != null)
                                Service.InsertList(detailes.accounts.Distinct().ToList());

                            dbTransaction.Commit();
                            return Ok(new BaseResponse(detailes.Model));
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
        public IHttpActionResult Update([FromBody] Asset_AssetCardDetailes detailes)
        {
            using (var dbTransaction = db.Database.BeginTransaction())
            {
                try
                {
                    if (detailes.accounts.Count() > 0)
                        Concatenate(detailes);

                    if (detailes != null)
                    {
                        if (detailes.Model != null)
                        {
                            Asset_AssetCard Model = Service.Update(detailes.Model);
                            detailes.accounts.ForEach(x => x.AssetId = Model.AssetId);

                            if (detailes.accounts != null)
                                Service.UpdateAssetCards(detailes.accounts.Distinct().ToList());

                            dbTransaction.Commit();
                            return Ok(new BaseResponse(detailes.Model));
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
        public IHttpActionResult Delete(int id)
        {
            using (var dbTransaction = db.Database.BeginTransaction())
            {
                try
                {
                    List<Cal_AssetAccounts> empAccounts = GetAssetAccounts(id);
                    if (empAccounts != null)
                        Service.DeleteList(empAccounts);

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

        public Cal_CostCenters GetCostCenters(int? CostCenterstId)
        {
            Cal_CostCenters account = db.Cal_CostCenters.ToList().Where(x => x.CostCenterId == CostCenterstId).Select(x => new Cal_CostCenters
            {
                CostCenterCode = x.CostCenterCode,
                CostCenterNameA = x.CostCenterNameA,
                CostCenterNameE = x.CostCenterNameE
            }).FirstOrDefault();
            return account;
        }

        public Cal_AccountChart GetAccountIfDebitOrCreditIsNull(int accountId)
        {
            Cal_AccountChart account = db.Cal_AccountChart.ToList().Where(x => x.AccountId == accountId).Select(x => new Cal_AccountChart
            {
                AccountCode = x.AccountCode,
                AccountNameA = x.AccountNameA,
                AccountNameE = x.AccountNameE
            }).FirstOrDefault();
            return account;
        }

        public Asset_AssetCardDetailes Concatenate(Asset_AssetCardDetailes detailes)
        {
            string cl = CultureInfo.CurrentCulture.Name;
            List<Cal_AssetAccounts> updateCustAccounts = new List<Cal_AssetAccounts>();
            List<Cal_AssetAccounts> insertCustAccounts = new List<Cal_AssetAccounts>();

            List<Cal_AssetAccounts> dbCustAccounts = db.Cal_AssetAccounts.Where(x => x.AssetId == detailes.Model.AssetId).ToList();

            #region Baisc Account
            /////////// Start Baisc Account ///////////
            Cal_AssetAccounts baiscCustAccountDb = dbCustAccounts.FirstOrDefault(x => x.AccountDescription == "BasicAccCode" && x.IsInUse == true);
            Cal_AssetAccounts baiscCustAccountView = detailes.accounts.FirstOrDefault(x => x.AccountDescription == "BasicAccCode");

            if (baiscCustAccountDb?.AccountId != baiscCustAccountView?.AccountId)
            {
                var item = baiscCustAccountDb;
                if (item != null)
                {
                    if (item.OpenningBalanceDepit == 0 && item.OpenningBalanceCredit == 0 && item.AccCurrTrancDepit == 0 && item.AccCurrTrancCredit == 0
                        && item.AccTotaCredit == 0 && item.AccTotalDebit == 0 && item.BalanceCreditCurncy == 0 && item.BalanceDebitCurncy == 0
                        && item.OpenningBalanceCreditCurncy == 0 && item.OpenningBalanceDepitCurncy == 0 && item.AccCurrTrancDepitCurncy == 0
                        && item.AccCurrTrancCreditCurncy == 0 && item.AccTotaCreditCurncy == 0 && item.AccTotalDebitCurncy == 0)
                    {

                        item.StatusFlag = 'd';
                    }
                    else
                    {
                        baiscCustAccountDb.StatusFlag = 'u';
                        baiscCustAccountDb.IsInUse = false;
                    }
                    updateCustAccounts.Add(baiscCustAccountDb);
                }

                baiscCustAccountView.StatusFlag = 'i';
                insertCustAccounts.Add(baiscCustAccountView);
            }
            //else { /*baiscCustAccountView.StatusFlag = 'u';*/ /*insertCustAccounts.Add(baiscCustAccountView);*/ }
            /////////// End Baisc Account ////////////
            #endregion

            #region AddAccounts process
            List<Cal_AssetAccounts> AddCustAccountsDb = dbCustAccounts.Where(x => x.AccountDescription.Contains("AddAccountCode")).ToList();
            List<Cal_AssetAccounts> AddCustAccountsView = detailes.accounts.Where(x => x.AccountDescription.Contains("AddAccountCode")).ToList();

            ///////////////////// in view not found in db
            var diffAddCustAccountsIdsInDb = AddCustAccountsView.Select(x => new { AccountId = x.AccountId, AccountDescription = x.AccountDescription })
                .Except(AddCustAccountsDb.Select(x => new { AccountId = x.AccountId, AccountDescription = x.AccountDescription })).ToList();

            List<Cal_AssetAccounts> diffAddCustAccountsInDb = AddCustAccountsView.Where(x => diffAddCustAccountsIdsInDb.Select(y => y.AccountId).Contains(x.AccountId) &&
            diffAddCustAccountsIdsInDb.Select(y => y.AccountDescription).Contains(x.AccountDescription)).ToList();

            diffAddCustAccountsInDb.ForEach(x => x.StatusFlag = 'i');
            //insertCustAccounts.AddRange(diffAddCustAccountsInDb);

            ///////////////////// in db not found in view 
            var diffAddCustAccountsIdsInView = AddCustAccountsDb.Select(x => new { AccountId = x.AccountId, AccountDescription = x.AccountDescription })
                .Except(AddCustAccountsView.Select(x => new { AccountId = x.AccountId, AccountDescription = x.AccountDescription })).ToList();

            List<Cal_AssetAccounts> diffAddCustAccountsInView = AddCustAccountsDb.Where(x => diffAddCustAccountsIdsInView.Select(y => y.AccountId).Contains(x.AccountId) &&
            diffAddCustAccountsIdsInView.Select(y => y.AccountDescription).Contains(x.AccountDescription)).ToList();

            //List<Cal_AssetAccounts> diffAddCustAccountsInView = AddCustAccountsDb.Except(AddCustAccountsView).ToList();
            foreach (var item in diffAddCustAccountsInView)
            {
                if (item.OpenningBalanceDepit == 0 && item.OpenningBalanceCredit == 0 && item.AccCurrTrancDepit == 0 && item.AccCurrTrancCredit == 0
                    && item.AccTotaCredit == 0 && item.AccTotalDebit == 0 && item.BalanceCreditCurncy == 0 && item.BalanceDebitCurncy == 0
                    && item.OpenningBalanceCreditCurncy == 0 && item.OpenningBalanceDepitCurncy == 0 && item.AccCurrTrancDepitCurncy == 0 &&
                    item.AccCurrTrancCreditCurncy == 0 && item.AccTotaCreditCurncy == 0 && item.AccTotalDebitCurncy == 0)

                    item.StatusFlag = 'd';
                else if (item.IsInUse != false)
                {
                    item.StatusFlag = 'u';
                    item.IsInUse = false;
                }
            }

            detailes.accounts.AddRange(diffAddCustAccountsInView);
            detailes.accounts.AddRange(insertCustAccounts);
            detailes.accounts.AddRange(updateCustAccounts);
            #endregion

            List<Cal_AssetAccounts> ListWithOutUpdate = detailes.accounts.Where(x => x.IsInUse == true && x.StatusFlag.ToString().Replace("\0", string.Empty) != "")
                .Distinct().ToList();
            List<Cal_AssetAccounts> ListToUpdate = detailes.accounts.Where(x => (x.StatusFlag != 'i' && x.StatusFlag != 'd') && x.IsInUse == true).Distinct().ToList();

            ConcatenateCodeAndName(ListWithOutUpdate, dbCustAccounts, detailes, cl);
            ConcatenateCodeAndName(ListToUpdate, dbCustAccounts, detailes, cl);

            //List<Cal_AssetAccounts> finalList = detailes.accounts.Where(x => x.StatusFlag == 'i' | x.StatusFlag == 'u' && x.IsInUse == true).Distinct().ToList();
            return detailes;
        }

        public Asset_AssetCardDetailes ConcatenateCodeAndName(List<Cal_AssetAccounts> custAccounts, List<Cal_AssetAccounts> dbCustAccounts, Asset_AssetCardDetailes detailes, string cl)
        {
            List<Cal_AssetAccounts> newCustAccounts = new List<Cal_AssetAccounts>();
            Cal_AssetAccounts newCustAccount = new Cal_AssetAccounts();

            int i = 0;
            foreach (Cal_AssetAccounts account in custAccounts)
            {
                var flag = account.StatusFlag.ToString().Trim().Replace("\0", string.Empty);
                if (flag == "")
                {
                    var item = dbCustAccounts.FirstOrDefault(x => x.AccountDescription == account.AccountDescription && x.IsInUse == account.IsInUse
                    && x.IsPrimeAccount == account.IsPrimeAccount);
                    newCustAccount = item;
                    newCustAccount.StatusFlag = 'u';
                    if (cl == "ar")
                        newCustAccount.AccountNameA = account.AccountNameA + "-" + detailes.Model.Name1;
                    else
                        newCustAccount.AccountNameE = account.AccountNameE + "-" + detailes.Model.Name2;
                }
                else
                {
                    if (cl == "ar")
                        account.AccountNameA = account.AccountNameA + "-" + detailes.Model.Name1;
                    else
                        account.AccountNameE = account.AccountNameE + "-" + detailes.Model.Name2;
                }
                account.AccountCode = detailes.Model.AssetCode + "-" + account.AccountCode;

                newCustAccounts.Add(newCustAccount);
                i++;
            }

            detailes.accounts.RemoveAll(x => newCustAccounts.Select(r => r.AccountDescription).Contains(x.AccountDescription) && x.IsInUse == true);
            detailes.accounts.AddRange(newCustAccounts);
            return detailes;
        }

        public List<Cal_AssetAccounts> GetAssetAccounts(int AssetId)
        {
            List<Cal_AssetAccounts> EmpAccounts = Service.GetAssetAccounts(x => x.AssetId == AssetId && x.IsInUse == true);
            return EmpAccounts;
        }

        public bool CheckIfAccountIsExist(List<Cal_AssetAccounts> EmpAccounts, int AssetId, string AccountDescription, bool IsInUse)
        {
            bool IsExist = EmpAccounts.Where(x => x.AssetId == AssetId && x.IsInUse == IsInUse).Count() > 0 ? false : true;
            return IsExist;
        }

    }
}
