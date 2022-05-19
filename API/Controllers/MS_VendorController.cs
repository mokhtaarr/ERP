using Inv.API.Models;
using Inv.DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web.Http;
using Inv.API.Tools;
using Inv.BLL.Services.MSVendor;
using Inv.BLL.Services.MsVendorTypes;
using Inv.API.Models.CustomModel;
using CustomVendorUsers = Inv.API.Models.CustomModel.CustomVendorUsers;
using System.Globalization;

namespace Inv.API.Controllers
{
    public class MS_VendorController : BaseController
    {
        private readonly IMS_VendorService Service;
        private readonly IMs_VendorTypesService VendorTypesServic;
        private G_USERSController G_USERS;
        public MS_VendorController(IMS_VendorService _service, IMs_VendorTypesService _VendorTypesServic, G_USERSController USERS)
        {
            this.Service = _service;
            this.VendorTypesServic = _VendorTypesServic;
            this.G_USERS = USERS;
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetAll()
        {
            List<MS_Vendor> MS_Vendors = Service.GetAll().Select(x => new MS_Vendor
            {
                VendorId = x.VendorId,
                IsActive = x.IsActive,
                VendorCode = x.VendorCode,
                VendorDescA = x.VendorDescA,
                VendorDescE = x.VendorDescE
            }).OrderBy(x => x.VendorCode).ToList();
            return Ok(new BaseResponse(MS_Vendors));
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetById(int id)
        {
            MS_Vendor MS_Vendors = Service.GetById(id);
            return Ok(new BaseResponse(MS_Vendors));
        }

        [HttpPost, AllowAnonymous]
        public IHttpActionResult Insert([FromBody] DetailesAssetCard detailes)
        {
            using (var dbTransaction = db.Database.BeginTransaction())
            {
                try
                {
                    if (detailes.accounts.Count() > 0)
                        Concatenate(detailes);

                    if (detailes != null)
                    {
                        if (detailes.Vendor != null) {
                            MS_Vendor Vendor = Service.Insert(detailes.Vendor);
                            detailes.branches.ForEach(x => x.VendorId = Vendor.VendorId);
                            detailes.users.ForEach(x => x.VendorId = Vendor.VendorId);
                            detailes.contacts.ForEach(x => x.VendorId = Vendor.VendorId);
                            detailes.accounts.ForEach(x => x.VendorId = Vendor.VendorId);

                            if (detailes.branches != null)
                                Service.InsertList(detailes.branches);
                            if (detailes.contacts != null)
                                Service.InsertList(detailes.contacts);
                            if (detailes.users != null)
                                Service.InsertList(detailes.users);
                            if (detailes.accounts != null)
                                Service.InsertList(detailes.accounts);

                            dbTransaction.Commit();
                            return Ok(new BaseResponse(detailes.Vendor));
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
        public IHttpActionResult Update([FromBody] DetailesAssetCard detailes)
        {
            using (var dbTransaction = db.Database.BeginTransaction())
            {
                try
                {
                    if (detailes.accounts.Count() > 0)
                        Concatenate(detailes);

                    if (detailes.Vendor != null)
                    {
                        MS_Vendor Vendor = Service.Update(detailes.Vendor);
                        detailes.branches.ForEach(x => x.VendorId = Vendor.VendorId);
                        detailes.users.ForEach(x => x.VendorId = Vendor.VendorId);
                        detailes.contacts.ForEach(x => x.VendorId = Vendor.VendorId);
                        detailes.accounts.ForEach(x => x.VendorId = Vendor.VendorId);

                        if (detailes.branches != null)
                            Service.UpdateBranchesList(detailes.branches);
                        if (detailes.contacts != null)
                            Service.UpdateContactsList(detailes.contacts);
                        if (detailes.users != null)
                            Service.UpdateUsersList(detailes.users);
                        if (detailes.accounts != null)
                            Service.UpdateAccountsList(detailes.accounts);

                        dbTransaction.Commit();
                        return Ok(new BaseResponse(detailes.Vendor));
                    }
                    return Ok(new BaseResponse(detailes.Vendor));
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
                    var detailes = GetDetailes(id);
                    if (detailes.branches != null)
                        Service.DeleteList(detailes.branches);
                    if (detailes.contacts != null)
                        Service.DeleteList(detailes.contacts);
                    if (detailes.users != null)
                        Service.DeleteList(detailes.users);
                    if (detailes.accounts != null)
                        Service.DeleteList(detailes.accounts);

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

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetAllVendorTypes()
        {
            List<Ms_VendorTypes> VendorTypes = VendorTypesServic.GetAll(x => x.VendorTypeLevelType == 2).Select(x => new Ms_VendorTypes {
                VendorTypeId = x.VendorTypeId,
                VendorTypeDescA = x.VendorTypeDescA,
                VendorTypeDescE = x.VendorTypeDescE,
                VendorTypeCode = x.VendorTypeCode,
            }).ToList().OrderBy(x => x.VendorTypeCode).ToList();
            return Ok(new BaseResponse(VendorTypes));
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetAllVendorCategory()
        {
            List<MS_VendorCategory> VendorCategory = db.MS_VendorCategory.ToList().Select(x => new MS_VendorCategory
            {
                VendorCatId = x.VendorCatId,
                CatCode = x.CatCode,
                CatDescA = x.CatDescA,
                CatDescE = x.CatDescE,
            }).OrderBy(x => x.CatCode).ToList();
            return Ok(new BaseResponse(VendorCategory));
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetCurrencies()
        {
            List<MS_Currency> currency = db.MS_Currency.ToList().Select(x => new MS_Currency {
                CurrencyCode = x.CurrencyCode,
                CurrencyDescA = x.CurrencyDescA,
                CurrencyDescE = x.CurrencyDescE,
                CurrencyId = x.CurrencyId,
            }).ToList();
            return Ok(new BaseResponse(currency));
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetCities()
        {
            List<MSGA_City> Cities = db.MSGA_City.ToList().Select(x => new MSGA_City
            {
                CityName = x.CityName,
                CityID = x.CityID,
            }).ToList();
            return Ok(new BaseResponse(Cities));
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetEmployees()
        {
            List<Hr_Employees> employees = db.Hr_Employees.ToList().Select(x => new Hr_Employees
            {
                EmpId = x.EmpId,
                EmpCode = x.EmpCode,
                Name1 = x.Name1,
                Name2 = x.Name2,
            }).ToList();
            return Ok(new BaseResponse(employees));
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetCostCenters()
        {
            List<Cal_CostCenters> costCenters = db.Cal_CostCenters.ToList().Select(x => new Cal_CostCenters
            {
                CostCenterId = x.CostCenterId,
                CostCenterCode = x.CostCenterCode,
                CostCenterNameA = x.CostCenterNameA,
                CostCenterNameE = x.CostCenterNameE,
            }).ToList();
            return Ok(new BaseResponse(costCenters));
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetDetailesForVendor(int id)
        {
            return Ok(new BaseResponse(GetDetailes(id)));
        }

        public DetailesAssetCard GetDetailes(int id)
        {
            DetailesAssetCard Detailes = new DetailesAssetCard()
            {
                Vendor = Service.GetById(id),
                accounts = GetVendAccounts(id),
                branches = db.Ms_VendorBranches.Where(x => x.VendorId == id).ToList(),
                contacts = db.Ms_VendorContacts.Where(x => x.VendorId == id).ToList(),
                //accounts = db.Cal_VendAccounts.Where(x => x.VendorId == id).ToList(),
                CustomUsers =
                   (from VendorUsers in db.Ms_VendorUsers
                    join user in db.G_USERS on VendorUsers.UserId equals user.UserId
                    where VendorUsers.VendorId == id
                    select new CustomVendorUsers
                    {
                        VendorId = VendorUsers.VendorId,
                        UserId = VendorUsers.UserId,
                        FirstName = user.FirstName,
                        USER_CODE = user.USER_CODE,
                        USER_NAME = user.USER_NAME,
                        VendUserId = VendorUsers.VendUserId
                    }).ToList(),
            };
            return Detailes;
        }
       
        public List<CustomDropDownUsers> GetAllUsers(string CompCode, string Token, string UserCode)
        {
            List<G_USERS> res = G_USERS.GetAllUsers(CompCode, Token, UserCode);
            List<CustomDropDownUsers> users = new List<CustomDropDownUsers>();
            if (res != null)
            {
                users = res.Select(x => new CustomDropDownUsers
                {
                    UserCode = x.USER_CODE,
                    UserName = x.USER_NAME,
                }).ToList();
            }
            return users;
        }

        public IHttpActionResult GetUser(string CompCode, string Token, string UserCode, string UserCodeSelected)
        {
            CustomVendorUsers user = G_USERS.GetAllUsers(CompCode, Token, UserCode).Where(x => x.USER_CODE == UserCodeSelected)
                .Select(x => new CustomVendorUsers
                {
                    UserId = x.UserId,
                    FirstName = x.FirstName,
                    USER_CODE = x.USER_CODE,
                    USER_NAME = x.USER_NAME,
                }).FirstOrDefault();
            return Ok(new BaseResponse(user));
        }

        public DetailesAssetCard Concatenate(DetailesAssetCard detailes)
        {
            string cl = CultureInfo.CurrentCulture.Name;
            List<Cal_VendAccounts> updateCustAccounts = new List<Cal_VendAccounts>();
            List<Cal_VendAccounts> insertCustAccounts = new List<Cal_VendAccounts>();

            List<Cal_VendAccounts> dbCustAccounts = db.Cal_VendAccounts.Where(x => x.VendorId == detailes.Vendor.VendorId).ToList();

            #region Baisc Account
            /////////// Start Baisc Account ///////////
            Cal_VendAccounts baiscCustAccountDb = dbCustAccounts.FirstOrDefault(x => x.AccountDescription == "BasicAccCode" && x.IsInUse == true);
            Cal_VendAccounts baiscCustAccountView = detailes.accounts.FirstOrDefault(x => x.AccountDescription == "BasicAccCode");

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
            List<Cal_VendAccounts> AddCustAccountsDb = dbCustAccounts.Where(x => x.AccountDescription.Contains("AddAccountCode")).ToList();
            List<Cal_VendAccounts> AddCustAccountsView = detailes.accounts.Where(x => x.AccountDescription.Contains("AddAccountCode")).ToList();

            ///////////////////// in view not found in db
            var diffAddCustAccountsIdsInDb = AddCustAccountsView.Select(x => new { AccountId = x.AccountId, AccountDescription = x.AccountDescription })
                .Except(AddCustAccountsDb.Select(x => new { AccountId = x.AccountId, AccountDescription = x.AccountDescription })).ToList();

            List<Cal_VendAccounts> diffAddCustAccountsInDb = AddCustAccountsView.Where(x => diffAddCustAccountsIdsInDb.Select(y => y.AccountId).Contains(x.AccountId) &&
            diffAddCustAccountsIdsInDb.Select(y => y.AccountDescription).Contains(x.AccountDescription)).ToList();

            diffAddCustAccountsInDb.ForEach(x => x.StatusFlag = 'i');
            //insertCustAccounts.AddRange(diffAddCustAccountsInDb);

            ///////////////////// in db not found in view 
            var diffAddCustAccountsIdsInView = AddCustAccountsDb.Select(x => new { AccountId = x.AccountId, AccountDescription = x.AccountDescription })
                .Except(AddCustAccountsView.Select(x => new { AccountId = x.AccountId, AccountDescription = x.AccountDescription })).ToList();

            List<Cal_VendAccounts> diffAddCustAccountsInView = AddCustAccountsDb.Where(x => diffAddCustAccountsIdsInView.Select(y => y.AccountId).Contains(x.AccountId) &&
            diffAddCustAccountsIdsInView.Select(y => y.AccountDescription).Contains(x.AccountDescription)).ToList();

            //List<Cal_VendAccounts> diffAddCustAccountsInView = AddCustAccountsDb.Except(AddCustAccountsView).ToList();
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

            List<Cal_VendAccounts> ListWithOutUpdate = detailes.accounts.Where(x => x.IsInUse == true && x.StatusFlag.ToString().Replace("\0", string.Empty) != "")
                .Distinct().ToList();
            List<Cal_VendAccounts> ListToUpdate = detailes.accounts.Where(x => (x.StatusFlag != 'i' && x.StatusFlag != 'd') && x.IsInUse == true).Distinct().ToList();

            ConcatenateCodeAndName(ListWithOutUpdate, dbCustAccounts, detailes, cl);
            ConcatenateCodeAndName(ListToUpdate, dbCustAccounts, detailes, cl);

            //List<Cal_VendAccounts> finalList = detailes.accounts.Where(x => x.StatusFlag == 'i' | x.StatusFlag == 'u' && x.IsInUse == true).Distinct().ToList();
            return detailes;
        }

        public DetailesAssetCard ConcatenateCodeAndName(List<Cal_VendAccounts> custAccounts, List<Cal_VendAccounts> dbCustAccounts, DetailesAssetCard detailes, string cl)
        {
            List<Cal_VendAccounts> newCustAccounts = new List<Cal_VendAccounts>();
            Cal_VendAccounts newCustAccount = new Cal_VendAccounts();

            int i = 0;
            foreach (Cal_VendAccounts account in custAccounts)
            {
                var flag = account.StatusFlag.ToString().Trim().Replace("\0", string.Empty);
                if (flag == "")
                {
                    var item = dbCustAccounts.FirstOrDefault(x => x.AccountDescription == account.AccountDescription && x.IsInUse == account.IsInUse
                    && x.IsPrimeAccount == account.IsPrimeAccount);
                    newCustAccount = item;
                    newCustAccount.StatusFlag = 'u';
                    if (cl == "ar")
                        newCustAccount.AccountNameA = account.AccountNameA + "-" + detailes.Vendor.VendorDescA;
                    else
                        newCustAccount.AccountNameE = account.AccountNameE + "-" + detailes.Vendor.VendorDescE;
                }
                else
                {
                    if (cl == "ar")
                        account.AccountNameA = account.AccountNameA + "-" + detailes.Vendor.VendorDescA;
                    else
                        account.AccountNameE = account.AccountNameE + "-" + detailes.Vendor.VendorDescE;
                }
                account.AccountCode = detailes.Vendor.VendorCode + "-" + account.AccountCode;

                newCustAccounts.Add(newCustAccount);
                i++;
            }
            detailes.accounts.RemoveAll(x => newCustAccounts.Select(r => r.AccountDescription).Contains(x.AccountDescription) && x.IsInUse == true);
            detailes.accounts.AddRange(newCustAccounts);
            return detailes;
        }

        public List<Cal_VendAccounts> GetVendAccounts(int vendorId)
        {
            List<Cal_VendAccounts> vendAccounts = Service.GetVendAccounts(x => x.VendorId == vendorId && x.IsInUse == true);
            return vendAccounts;
        }
    }
}
