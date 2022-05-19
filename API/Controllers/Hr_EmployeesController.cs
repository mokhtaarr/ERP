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

namespace Inv.API.Controllers
{
    public class Hr_EmployeesController : BaseController
    {
        private readonly IHr_EmployeesService Service;
        public Hr_EmployeesController(IHr_EmployeesService _service)
        {
            this.Service = _service;
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetAll()
        {
            List<Hr_Employees> Hr_Employeess = Service.GetAll().Select(x => new Hr_Employees
            {
                EmpId = x.EmpId,
                EmpCode = x.EmpCode,
                Name1 = x.Name1,
                Name2 = x.Name2,
                Email = x.Email
            }).OrderBy(x => x.EmpCode).ToList();
            return Ok(new BaseResponse(Hr_Employeess));
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetById(int id)
        {
            DetailesForEmployees detailes = new DetailesForEmployees()
            {
                Model = Service.GetById(id),
                accounts = GetEmpAccounts(id)
            };

            return Ok(new BaseResponse(detailes));
        }

        [HttpPost, AllowAnonymous]
        public IHttpActionResult Insert([FromBody] DetailesForEmployees detailes)
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
                            Hr_Employees Model = Service.Insert(detailes.Model);
                            detailes.accounts.ForEach(x => x.EmpId = Model.EmpId);

                            if (detailes.accounts != null)
                                Service.InsertList(detailes.accounts);

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
        public IHttpActionResult Update([FromBody] DetailesForEmployees detailes)
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
                            Hr_Employees Model = Service.Update(detailes.Model);
                            detailes.accounts.ForEach(x => x.EmpId = Model.EmpId);

                            if (detailes.accounts != null)
                                Service.UpdateAccountsList(detailes.accounts.Distinct().ToList());

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
                    List<Cal_EmpAccounts> empAccounts = GetEmpAccounts(id);
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

        [HttpGet, AllowAnonymous]
        public IHttpActionResult SalaryTypeForEmployees(int EmployeeId)
        {
            try
            {
                List<CustomEmpSalaryTypes> customEmpSalary = new List<CustomEmpSalaryTypes>();
                List<Hr_EmpSalaryTypes> EmpSalaryType = db.Hr_EmpSalaryTypes.Where(x => x.EmpId == EmployeeId).ToList();
                List<int> SalaryTypIds = EmpSalaryType.Select(t => t.SalaryTypId.Value).ToList();

                List<Hr_SalaryTypes> SalaryTypes = db.Hr_SalaryTypes.ToList().Where(x => SalaryTypIds.Contains(x.SalaryTypId)).Select(x => new Hr_SalaryTypes
                {
                    Name1 = x.Name1,
                    Name2 = x.Name2,
                    SalaryCode = x.SalaryCode,
                    SalaryTypId = x.SalaryTypId
                }).ToList();

                foreach (Hr_EmpSalaryTypes item in EmpSalaryType)
                {
                    Hr_SalaryTypes salaryType = SalaryTypes.FirstOrDefault(x => x.SalaryTypId == item.SalaryTypId);
                    Cal_AccountChart DebitAccount1 = null;
                    Cal_EmpAccounts DebitAccount2 = null;

                    Cal_AccountChart CreditAccount1 = null;
                    Cal_EmpAccounts CreditAccount2 = null;

                    Cal_CostCenters CreditCostCenter = new Cal_CostCenters();
                    Cal_CostCenters DebitCostCenter = new Cal_CostCenters();

                    if (item.DebitEmpAccountId == null)
                        DebitAccount1 = GetAccountIfDebitOrCreditIsNull(item.DebitAccId.Value);
                    else
                        DebitAccount2 = GetAccountIfDebitOrCreditNotNull(item.DebitEmpAccountId.Value);

                    if (item.CreditEmpAccountId == null)
                        CreditAccount1 = GetAccountIfDebitOrCreditIsNull(item.CreditAccId.Value);
                    else
                        CreditAccount2 = GetAccountIfDebitOrCreditNotNull(item.CreditEmpAccountId.Value);

                    if (item.CreditCostCenterId != null)
                        CreditCostCenter = GetCostCenters(item.CreditCostCenterId);

                    if (item.DebitCostCenterId != null)
                        DebitCostCenter = GetCostCenters(item.DebitCostCenterId);

                    if (salaryType != null)
                    {
                        customEmpSalary.Add(new CustomEmpSalaryTypes
                        {
                            EmpSalaryTypesId = item.EmpSalaryTypesId,
                            EmpId = item.EmpId,
                            SalaryValu = item.SalaryValu,
                            Name1 = salaryType.Name1,
                            Name2 = salaryType.Name2,
                            SalaryCode = salaryType.SalaryCode,
                            DepitAccountCode = DebitAccount1 != null ? DebitAccount1.AccountCode.ToString() : DebitAccount2?.AccountCode,
                            DebitAccountNameA = DebitAccount1 != null ? DebitAccount1.AccountNameA : DebitAccount2?.AccountNameA,
                            DebitAccountNameE = DebitAccount1 != null ? DebitAccount1.AccountNameE : DebitAccount2?.AccountNameE,
                            CreditAccountCode = CreditAccount1 != null ? CreditAccount1.AccountCode.ToString() : CreditAccount2?.AccountCode,
                            CreditAccountNameA = CreditAccount1 != null ? CreditAccount1.AccountNameA : CreditAccount2?.AccountNameA,
                            CreditAccountNameE = CreditAccount1 != null ? CreditAccount1.AccountNameE : CreditAccount2?.AccountNameE,

                            CrediCostCode = CreditCostCenter.CostCenterCode?.ToString(),
                            CrediCostNameA = CreditCostCenter.CostCenterNameA,
                            CrediCostNameE = CreditCostCenter.CostCenterNameE,

                            DepitCostCode = DebitCostCenter.CostCenterCode?.ToString(),
                            DebitCostNameA = DebitCostCenter.CostCenterNameA,
                            DebitCostNameE = DebitCostCenter.CostCenterNameE,
                        });
                    }
                }
                return Ok(new BaseResponse(customEmpSalary));
            }
            catch (Exception ex)
            {
                return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
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

        public Cal_EmpAccounts GetAccountIfDebitOrCreditNotNull(int accountId)
        {
            Cal_EmpAccounts account = db.Cal_EmpAccounts.ToList().Where(x => x.EmpAccountId == accountId).Select(x => new Cal_EmpAccounts
            {
                AccountCode = x.AccountCode,
                AccountNameA = x.AccountNameA,
                AccountNameE = x.AccountNameE
            }).FirstOrDefault();
            return account;
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetEmployeeDocuments(int EmployeeId)
        {
            try
            {
                List<Hr_EmpDocuments> empDocuments = db.Hr_EmpDocuments.Where(x => x.EmpId == EmployeeId).ToList().Select(x => new Hr_EmpDocuments
                {
                    EmpDocId = x.EmpDocId,
                    TrNo = x.TrNo,
                    IssueDate = x.IssueDate,
                    IssuePlace = x.IssuePlace,
                    FromDate = x.FromDate,
                    ToDate = x.ToDate,
                    ManualTrNo = x.ManualTrNo,
                    Remarks1 = x.Remarks1
                }).ToList();
                return Ok(new BaseResponse(empDocuments));
            }
            catch (Exception ex)
            {
                return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
            }
        }

        public DetailesForEmployees Concatenate(DetailesForEmployees detailes)
        {
            string cl = CultureInfo.CurrentCulture.Name;
            List<Cal_EmpAccounts> updateCustAccounts = new List<Cal_EmpAccounts>();
            List<Cal_EmpAccounts> insertCustAccounts = new List<Cal_EmpAccounts>();

            List<Cal_EmpAccounts> dbCustAccounts = db.Cal_EmpAccounts.Where(x => x.EmpId == detailes.Model.EmpId).ToList();

            #region Baisc Account
            /////////// Start Baisc Account ///////////
            Cal_EmpAccounts baiscCustAccountDb = dbCustAccounts.FirstOrDefault(x => x.AccountDescription == "BasicAccCode" && x.IsInUse == true);
            Cal_EmpAccounts baiscCustAccountView = detailes.accounts.FirstOrDefault(x => x.AccountDescription == "BasicAccCode");

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
            List<Cal_EmpAccounts> AddCustAccountsDb = dbCustAccounts.Where(x => x.AccountDescription.Contains("AddAccountCode")).ToList();
            List<Cal_EmpAccounts> AddCustAccountsView = detailes.accounts.Where(x => x.AccountDescription.Contains("AddAccountCode")).ToList();

            ///////////////////// in view not found in db
            var diffAddCustAccountsIdsInDb = AddCustAccountsView.Select(x => new { AccountId = x.AccountId, AccountDescription = x.AccountDescription })
                .Except(AddCustAccountsDb.Select(x => new { AccountId = x.AccountId, AccountDescription = x.AccountDescription })).ToList();

            List<Cal_EmpAccounts> diffAddCustAccountsInDb = AddCustAccountsView.Where(x => diffAddCustAccountsIdsInDb.Select(y => y.AccountId).Contains(x.AccountId) &&
            diffAddCustAccountsIdsInDb.Select(y => y.AccountDescription).Contains(x.AccountDescription)).ToList();

            diffAddCustAccountsInDb.ForEach(x => x.StatusFlag = 'i');
            //insertCustAccounts.AddRange(diffAddCustAccountsInDb);

            ///////////////////// in db not found in view 
            var diffAddCustAccountsIdsInView = AddCustAccountsDb.Select(x => new { AccountId = x.AccountId, AccountDescription = x.AccountDescription })
                .Except(AddCustAccountsView.Select(x => new { AccountId = x.AccountId, AccountDescription = x.AccountDescription })).ToList();

            List<Cal_EmpAccounts> diffAddCustAccountsInView = AddCustAccountsDb.Where(x => diffAddCustAccountsIdsInView.Select(y => y.AccountId).Contains(x.AccountId) &&
            diffAddCustAccountsIdsInView.Select(y => y.AccountDescription).Contains(x.AccountDescription)).ToList();

            //List<Cal_EmpAccounts> diffAddCustAccountsInView = AddCustAccountsDb.Except(AddCustAccountsView).ToList();
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

            List<Cal_EmpAccounts> ListWithOutUpdate = detailes.accounts.Where(x => x.IsInUse == true && x.StatusFlag.ToString().Replace("\0", string.Empty) != "")
                .Distinct().ToList();
            List<Cal_EmpAccounts> ListToUpdate = detailes.accounts.Where(x => (x.StatusFlag != 'i' && x.StatusFlag != 'd') && x.IsInUse == true).Distinct().ToList();

            ConcatenateCodeAndName(ListWithOutUpdate, dbCustAccounts, detailes, cl);
            ConcatenateCodeAndName(ListToUpdate, dbCustAccounts, detailes, cl);

            //List<Cal_EmpAccounts> finalList = detailes.accounts.Where(x => x.StatusFlag == 'i' | x.StatusFlag == 'u' && x.IsInUse == true).Distinct().ToList();
            return detailes;
        }

        public DetailesForEmployees ConcatenateCodeAndName(List<Cal_EmpAccounts> custAccounts, List<Cal_EmpAccounts> dbCustAccounts, DetailesForEmployees detailes, string cl)
        {
            List<Cal_EmpAccounts> newCustAccounts = new List<Cal_EmpAccounts>();
            Cal_EmpAccounts newCustAccount = new Cal_EmpAccounts();

            int i = 0;
            foreach (Cal_EmpAccounts account in custAccounts)
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
                account.AccountCode = detailes.Model.EmpCode + "-" + account.AccountCode;

                newCustAccounts.Add(newCustAccount);
                i++;
            }

            detailes.accounts.RemoveAll(x => newCustAccounts.Select(r => r.AccountDescription).Contains(x.AccountDescription) && x.IsInUse == true);
            detailes.accounts.AddRange(newCustAccounts);
            return detailes;
        }

        public List<Cal_EmpAccounts> GetEmpAccounts(int ModelId)
        {
            List<Cal_EmpAccounts> EmpAccounts = Service.GetEmpAccounts(x => x.EmpId == ModelId && x.IsInUse == true);
            return EmpAccounts;
        }
    }
}
