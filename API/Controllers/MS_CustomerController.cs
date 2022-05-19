using Inv.API.Models;
using Inv.DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web.Http;
using Inv.API.Tools;
using Inv.BLL.Services.MSCustomer;
using Inv.BLL.Services.MsCustomerTypes;
using Inv.API.Models.CustomModel;
using CustomCusromerUsers = Inv.API.Models.CustomModel.CustomCusromerUsers;
using System.Globalization;

namespace Inv.API.Controllers
{
    public class MS_CustomerController : BaseController
    {
        private readonly IMS_CustomerService Service;
        private readonly IMs_CustomerTypesService customerTypesServic;
        private G_USERSController G_USERS;
        public MS_CustomerController(IMS_CustomerService _service, IMs_CustomerTypesService _customerTypesServic, G_USERSController USERS)
        {
            this.Service = _service;
            this.customerTypesServic = _customerTypesServic;
            this.G_USERS = USERS;
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetAll()
        {
            List<MS_Customer> MS_Customers = Service.GetAll().ToList().Select(x => new MS_Customer
            {
                CustomerId = x.CustomerId,
                IsActive = x.IsActive,
                CustomerCode = x.CustomerCode,
                CustomerDescA = x.CustomerDescA,
                CustomerDescE = x.CustomerDescE
            }).OrderBy(x => x.CustomerCode).ToList();

            return Ok(new BaseResponse(MS_Customers));
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetById(int id)
        {
            DetailesForCustomer detailes = new DetailesForCustomer()
            {
                Customer = Service.GetById(id),
                accounts = GetCustAccounts(id)
            };
            //MS_Customer MS_Customers = Service.GetById(id);
            //GetCustAccounts(id);
            return Ok(new BaseResponse(detailes));
        }

        [HttpPost, AllowAnonymous]
        public IHttpActionResult Insert([FromBody] DetailesForCustomer detailes)
        {
            using (var dbTransaction = db.Database.BeginTransaction())
            {
                try
                {
                    if (detailes.accounts.Count() > 0)
                        Concatenate(detailes);

                    if (detailes != null)
                    {
                        if (detailes.Customer != null)
                        {
                            MS_Customer Customer = Service.Insert(detailes.Customer);
                            detailes.branches.ForEach(x => x.CustomerId = Customer.CustomerId);
                            detailes.users.ForEach(x => x.CustomerId = Customer.CustomerId);
                            detailes.contacts.ForEach(x => x.CustomerId = Customer.CustomerId);

                            if (detailes.branches != null)
                                Service.InsertList(detailes.branches);
                            if (detailes.contacts != null)
                                Service.InsertList(detailes.contacts);
                            if (detailes.users != null)
                                Service.InsertList(detailes.users);
                            if (detailes.accounts != null)
                                Service.InsertList(detailes.accounts);

                            dbTransaction.Commit();
                            return Ok(new BaseResponse(detailes.Customer));
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
        public IHttpActionResult Update([FromBody] DetailesForCustomer detailes)
        {

            using (var dbTransaction = db.Database.BeginTransaction())
            {
                try
                {
                    if (detailes.accounts.Count() > 0)
                        Concatenate(detailes);

                    if (detailes.Customer != null)
                    {
                        MS_Customer Customer = Service.Update(detailes.Customer);
                        detailes.branches.ForEach(x => x.CustomerId = Customer.CustomerId);
                        detailes.users.ForEach(x => x.CustomerId = Customer.CustomerId);
                        detailes.contacts.ForEach(x => x.CustomerId = Customer.CustomerId);
                        detailes.accounts.ForEach(x => x.CustomerId = Customer.CustomerId);

                        if (detailes.branches.Count() > 0)
                            Service.UpdateBranchesList(detailes.branches);
                        if (detailes.contacts.Count() > 0)
                            Service.UpdateContactsList(detailes.contacts);
                        if (detailes.users.Count() > 0)
                            Service.UpdateUsersList(detailes.users);
                        if (detailes.accounts.Count() > 0)
                            Service.UpdateAccountsList(detailes.accounts);

                        dbTransaction.Commit();
                        return Ok(new BaseResponse(detailes.Customer));
                    }
                    return Ok(new BaseResponse(detailes.Customer));
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
        public IHttpActionResult GetAllCustomerTypes()
        {
            List<Ms_CustomerTypes> customerTypes = customerTypesServic.GetAll(x => x.CustomerTypeLevelType == 2).Select(x => new Ms_CustomerTypes
            {
                CustomerTypeId = x.CustomerTypeId,
                CustomerTypeDescA = x.CustomerTypeDescA,
                CustomerTypeDescE = x.CustomerTypeDescE,
                CustomerTypeCode = x.CustomerTypeCode,
            }).ToList().OrderBy(x => x.CustomerTypeCode).ToList();
            return Ok(new BaseResponse(customerTypes));
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetAllCustomerCategory()
        {
            List<MS_CustomerCategory> customerCategory = db.MS_CustomerCategory.ToList().Select(x => new MS_CustomerCategory
            {
                CustomerCatId = x.CustomerCatId,
                CatCode = x.CatCode,
                CatDescA = x.CatDescA,
                CatDescE = x.CatDescE,
            }).OrderBy(x => x.CatCode).ToList();
            return Ok(new BaseResponse(customerCategory));
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetCurrencies()
        {
            List<MS_Currency> currency = db.MS_Currency.ToList().Select(x => new MS_Currency
            {
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
        public IHttpActionResult GetDetailesForCustomer(int id)
        {
            return Ok(new BaseResponse(GetDetailes(id)));
        }

        public DetailesForCustomer GetDetailes(int id)
        {
            DetailesForCustomer Detailes = new DetailesForCustomer()
            {
                Customer = Service.GetById(id),
                accounts = GetCustAccounts(id),
                branches = db.Ms_CustomerBranches.Where(x => x.CustomerId == id).ToList(),
                contacts = db.Ms_CustomerContacts.Where(x => x.CustomerId == id).ToList(),
                //accounts = db.Cal_CustAccounts.Where(x => x.CustomerId == id).ToList(),
                CustomUsers = (from CusromerUsers in db.Ms_CusromerUsers
                               join user in db.G_USERS on CusromerUsers.UserId equals user.UserId
                               where CusromerUsers.CustomerId == id
                               select new CustomCusromerUsers
                               {
                                   CustomerId = CusromerUsers.CustomerId,
                                   UserId = CusromerUsers.UserId,
                                   FirstName = user.FirstName,
                                   USER_CODE = user.USER_CODE,
                                   USER_NAME = user.USER_NAME,
                                   CustUserId = CusromerUsers.CustUserId
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
            //CustomCusromerUsers user = GetCustomerUser(UserCodeSelected).FirstOrDefault();
            CustomCusromerUsers user = G_USERS.GetAllUsers(CompCode, Token, UserCode).Where(x => x.USER_CODE == UserCodeSelected)
                .Select(x => new CustomCusromerUsers
                {
                    UserId = x.UserId,
                    FirstName = x.FirstName,
                    USER_CODE = x.USER_CODE,
                    USER_NAME = x.USER_NAME,
                }).FirstOrDefault();
            return Ok(new BaseResponse(user));
        }

        public DetailesForCustomer Concatenate(DetailesForCustomer detailes)
        {
            string cl = CultureInfo.CurrentCulture.Name;
            List<Cal_CustAccounts> updateCustAccounts = new List<Cal_CustAccounts>();
            List<Cal_CustAccounts> insertCustAccounts = new List<Cal_CustAccounts>();

            List<Cal_CustAccounts> dbCustAccounts = db.Cal_CustAccounts.Where(x => x.CustomerId == detailes.Customer.CustomerId).ToList();

            #region Baisc Account
            /////////// Start Baisc Account ///////////
            Cal_CustAccounts baiscCustAccountDb = dbCustAccounts.FirstOrDefault(x => x.AccountDescription == "BasicAccCode" && x.IsInUse == true);
            Cal_CustAccounts baiscCustAccountView = detailes.accounts.FirstOrDefault(x => x.AccountDescription == "BasicAccCode");

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
            List<Cal_CustAccounts> AddCustAccountsDb = dbCustAccounts.Where(x => x.AccountDescription.Contains("AddAccountCode")).ToList();
            List<Cal_CustAccounts> AddCustAccountsView = detailes.accounts.Where(x => x.AccountDescription.Contains("AddAccountCode")).ToList();

            ///////////////////// in view not found in db
            var diffAddCustAccountsIdsInDb = AddCustAccountsView.Select(x => new { AccountId = x.AccountId, AccountDescription = x.AccountDescription })
                .Except(AddCustAccountsDb.Select(x => new { AccountId = x.AccountId, AccountDescription = x.AccountDescription })).ToList();

            List<Cal_CustAccounts> diffAddCustAccountsInDb = AddCustAccountsView.Where(x => diffAddCustAccountsIdsInDb.Select(y => y.AccountId).Contains(x.AccountId) &&
            diffAddCustAccountsIdsInDb.Select(y => y.AccountDescription).Contains(x.AccountDescription)).ToList();

            diffAddCustAccountsInDb.ForEach(x => x.StatusFlag = 'i');
            //insertCustAccounts.AddRange(diffAddCustAccountsInDb);

            ///////////////////// in db not found in view 
            var diffAddCustAccountsIdsInView = AddCustAccountsDb.Select(x => new { AccountId = x.AccountId, AccountDescription = x.AccountDescription })
                .Except(AddCustAccountsView.Select(x => new { AccountId = x.AccountId, AccountDescription = x.AccountDescription })).ToList();

            List<Cal_CustAccounts> diffAddCustAccountsInView = AddCustAccountsDb.Where(x => diffAddCustAccountsIdsInView.Select(y => y.AccountId).Contains(x.AccountId) &&
            diffAddCustAccountsIdsInView.Select(y => y.AccountDescription).Contains(x.AccountDescription)).ToList();

            //List<Cal_CustAccounts> diffAddCustAccountsInView = AddCustAccountsDb.Except(AddCustAccountsView).ToList();
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

            List<Cal_CustAccounts> ListWithOutUpdate = detailes.accounts.Where(x => x.IsInUse == true && x.StatusFlag.ToString().Replace("\0", string.Empty) != "")
                .Distinct().ToList();
            List<Cal_CustAccounts> ListToUpdate = detailes.accounts.Where(x => (x.StatusFlag != 'i' && x.StatusFlag != 'd') && x.IsInUse == true).Distinct().ToList();

            ConcatenateCodeAndName(ListWithOutUpdate, dbCustAccounts, detailes, cl);
            ConcatenateCodeAndName(ListToUpdate, dbCustAccounts, detailes, cl);

            //List<Cal_CustAccounts> finalList = detailes.accounts.Where(x => x.StatusFlag == 'i' | x.StatusFlag == 'u' && x.IsInUse == true).Distinct().ToList();
            return detailes;
        }

        public DetailesForCustomer ConcatenateCodeAndName(List<Cal_CustAccounts> custAccounts, List<Cal_CustAccounts> dbCustAccounts, DetailesForCustomer detailes, string cl)
        {
            List<Cal_CustAccounts> newCustAccounts = new List<Cal_CustAccounts>();
            Cal_CustAccounts newCustAccount = new Cal_CustAccounts();

            int i = 0;
            foreach (Cal_CustAccounts account in custAccounts)
            {
                var flag = account.StatusFlag.ToString().Trim().Replace("\0", string.Empty);
                if (flag == "")
                {
                    var item = dbCustAccounts.FirstOrDefault(x => x.AccountDescription == account.AccountDescription && x.IsInUse == account.IsInUse
                    && x.IsPrimeAccount == account.IsPrimeAccount);
                    newCustAccount = item;
                    newCustAccount.StatusFlag = 'u';
                    if (cl == "ar")
                        newCustAccount.AccountNameA = account.AccountNameA + "-" + detailes.Customer.CustomerDescA;
                    else
                        newCustAccount.AccountNameE = account.AccountNameE + "-" + detailes.Customer.CustomerDescE;
                }
                else
                {
                    if (cl == "ar")
                        account.AccountNameA = account.AccountNameA + "-" + detailes.Customer.CustomerDescA;
                    else
                        account.AccountNameE = account.AccountNameE + "-" + detailes.Customer.CustomerDescE;
                }
                account.AccountCode = detailes.Customer.CustomerCode + "-" + account.AccountCode;

                newCustAccounts.Add(newCustAccount);
                i++;
            }
            detailes.accounts.RemoveAll(x => newCustAccounts.Select(r => r.AccountDescription).Contains(x.AccountDescription) && x.IsInUse == true);
            detailes.accounts.AddRange(newCustAccounts);
            return detailes;
        }

        public List<Cal_CustAccounts> GetCustAccounts(int customerId)
        {
            List<Cal_CustAccounts> custAccounts = Service.GetCustAccounts(x => x.CustomerId == customerId && x.IsInUse == true);
            return custAccounts;
        }
    }
}
