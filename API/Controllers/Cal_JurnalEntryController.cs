using Inv.API.Models;
using Inv.DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web.Http;
using Inv.API.Tools;
using Inv.BLL.Services.MSCustomer;
using Inv.API.Models.CustomModel;
using Inv.BLL.Services.CalJurnalEntry;
using System.Data.SqlClient;
using Inv.Static.Enums;
using Inv.API.Enum;
using Inv.BLL.Services.MSVendor;
using Inv.BLL.Services.CalPostOrder;
using Inv.BLL.Services.MsTerms;
using Inv.BLL.Services.HrEmployees;
using Inv.BLL.Services.CalBusinessPartnerAccounts;
using Inv.BLL.Services.GLDefAccount;
using Inv.BLL.Services.SysAnalyticalCodes;
using Inv.BLL.Services.CalCostCenters;
using Inv.BLL.Services.ProdJobOrder;
using Inv.BLL.Services.SrVehicles;
using Inv.BLL.Services.MSCurrency;
using Inv.API.Controllers.Shared;

namespace Inv.API.Controllers
{
    public class Cal_JurnalEntryController : BaseController
    {
        private readonly ICal_JurnalEntryService Service;
        private PostOrderController PostOrder;


        public Cal_JurnalEntryController(ICal_JurnalEntryService _service, ICal_PostOrderService PostOrderService, IMs_TermsService TermsService,
            IMS_CustomerService CustomerService, IMS_VendorService vendorService, IHr_EmployeesService empService,
            ICal_BusinessPartnerAccountsService businessService, IGLDefAccountService calAccountChart, ISys_AnalyticalCodesService analyticalCodesService,
            ICalCostCentersService costCentersService, IProd_JobOrderService jobOrderService, ISr_VehiclesService vehiclesService, IMS_CurrencyService currencyService)
        {
            this.Service = _service;

            PostOrder = new PostOrderController("Cal_JurnalEntry", PostOrderService, TermsService, CustomerService, vendorService, empService,
            businessService, calAccountChart, analyticalCodesService, costCentersService, jobOrderService, vehiclesService, currencyService);
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetAllAccountCode()
        {
            string query = @"select * from VW_SearchAllAccounts";
            List<VW_SearchAllAccounts> AllAccounts = db.Database.SqlQuery<VW_SearchAllAccounts>(query).ToList();
            return Ok(new BaseResponse(AllAccounts));
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetAllFroTree()
        {
            List<Cal_JurnalEntry> Cal_JurnalEntrys = Service.GetAll()
                //.Select(x => new Cal_JurnalEntry
                //{
                //    JurnalId = x.JurnalId,
                //    TrNo = x.TrNo,

                //}).ToList()
                .OrderBy(x => x.TrNo).ToList();
            return Ok(new BaseResponse(Cal_JurnalEntrys));
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetAll(int id)
        {
            SqlParameter[] Parameters =
                {
                    new SqlParameter("@Id", id),
                };
            List<CustomJurnalDetailes> AllAccounts = db.Database.SqlQuery<CustomJurnalDetailes>("execute GetAllJurnalDetailes @Id", Parameters).ToList();
            GetCustAccount(AllAccounts);
            JurnalEntryDetailes detailes = new JurnalEntryDetailes()
            {
                JurnalEntry = Service.GetById(id),
                JurnalDetails = AllAccounts,
            };

            return Ok(new BaseResponse(detailes));
        }

        public List<CustomJurnalDetailes> GetCustAccount(List<CustomJurnalDetailes> Detailes)
        {
            List<int> CustAccountIds = Detailes.Where(x => x.AccountType == Inv.API.Enum.AccountType.CustAccount.ToString()).Select(x => x.CustAccountId.Value).ToList();
            List<int> VendAccountIds = Detailes.Where(x => x.AccountType == Inv.API.Enum.AccountType.VendAccount.ToString()).Select(x => x.VendAccountId.Value).ToList();
            List<int> EmpAccountIds = Detailes.Where(x => x.AccountType == Inv.API.Enum.AccountType.EmpAccount.ToString()).Select(x => x.EmpAccountId.Value).ToList();
            List<int> AssetAccountIds = Detailes.Where(x => x.AccountType == Inv.API.Enum.AccountType.AssetAccount.ToString()).Select(x => x.AssetAccountId.Value).ToList();
            List<int> BusinessPartnerAccIds = Detailes.Where(x => x.AccountType == Inv.API.Enum.AccountType.BusinessPartnerAcc.ToString()).Select(x => x.BusinessPartnerAccId.Value).ToList();
            List<int> AccountIds = Detailes.Where(x => x.AccountType == Inv.API.Enum.AccountType.Account.ToString()).Select(x => x.AccountId.Value).ToList();

            if (CustAccountIds.Count() > 0)
            {
                List<Cal_CustAccounts> Accounts = db.Cal_CustAccounts.Where(x => CustAccountIds.Contains(x.CustAccountId)).ToList();
                List<int> Ids = new List<int>();
                for (int i = 0; i < CustAccountIds.Count(); i++)
                {
                    var model = Accounts.Where(x => x.CustAccountId == CustAccountIds[i]).FirstOrDefault();
                    if (model != null)
                    {
                        var modelFromDetails = Detailes.FirstOrDefault(x => x.CustAccountId == model?.CustAccountId && !Ids.Contains(x.JurnalDetailId.Value));
                        modelFromDetails.AccountNameA = model.AccountNameA;
                        modelFromDetails.AccountNameE = model.AccountNameE;
                        modelFromDetails.AccountCode = model.AccountCode.Split('-')[1];
                        modelFromDetails.SubAccountCode = model.AccountCode.Split('-')[0];
                        Ids.Add(modelFromDetails.JurnalDetailId.Value);
                    }
                }
            }
            if (VendAccountIds.Count() > 0)
            {
                List<int> Ids = new List<int>();
                List<Cal_VendAccounts> Accounts = db.Cal_VendAccounts.Where(x => VendAccountIds.Contains(x.VendAccountId)).ToList();
                for (int i = 0; i < VendAccountIds.Count(); i++)
                {
                    var model = Accounts.Where(x => x.VendAccountId == VendAccountIds[i]).FirstOrDefault();
                    var modelFromDetails = Detailes.FirstOrDefault(x => x.VendAccountId == model?.VendAccountId && !Ids.Contains(x.JurnalDetailId.Value));
                    if (model != null)
                    {
                        modelFromDetails.AccountNameA = model.AccountNameA;
                        modelFromDetails.AccountNameE = model.AccountNameE;
                        modelFromDetails.AccountCode = model.AccountCode.Split('-')[1];
                        modelFromDetails.SubAccountCode = model.AccountCode.Split('-')[0];
                    }
                    Ids.Add(modelFromDetails.JurnalDetailId.Value);
                }
            }
            if (EmpAccountIds.Count() > 0)
            {
                List<Cal_EmpAccounts> Accounts = db.Cal_EmpAccounts.Where(x => EmpAccountIds.Contains(x.EmpAccountId)).ToList();
                List<int> Ids = new List<int>();
                for (int i = 0; i < EmpAccountIds.Count(); i++)
                {
                    var model = Accounts.Where(x => x.EmpAccountId == EmpAccountIds[i]).FirstOrDefault();
                    var modelFromDetails = Detailes.FirstOrDefault(x => x.EmpAccountId == model?.EmpAccountId && !Ids.Contains(x.JurnalDetailId.Value));
                    if (model != null)
                    {
                        modelFromDetails.AccountNameA = model.AccountNameA;
                        modelFromDetails.AccountNameE = model.AccountNameE;
                        modelFromDetails.AccountCode = model.AccountCode.Split('-')[1];
                        modelFromDetails.SubAccountCode = model.AccountCode.Split('-')[0];
                    }
                    Ids.Add(modelFromDetails.JurnalDetailId.Value);
                }
            }
            if (AssetAccountIds.Count() > 0)
            {
                List<Cal_AssetAccounts> Accounts = db.Cal_AssetAccounts.Where(x => AssetAccountIds.Contains(x.AssetAccountId)).ToList();
                List<int> Ids = new List<int>();
                for (int i = 0; i < AssetAccountIds.Count(); i++)
                {
                    var model = Accounts.Where(x => x.AssetAccountId == AssetAccountIds[i]).FirstOrDefault();
                    var modelFromDetails = Detailes.FirstOrDefault(x => x.AssetAccountId == model?.AssetAccountId && !Ids.Contains(x.JurnalDetailId.Value));
                    if (model != null)
                    {
                        modelFromDetails.AccountNameA = model.AccountNameA;
                        modelFromDetails.AccountNameE = model.AccountNameE;
                        modelFromDetails.AccountCode = model.AccountCode.Split('-')[1];
                        modelFromDetails.SubAccountCode = model.AccountCode.Split('-')[0];
                    }
                    Ids.Add(modelFromDetails.JurnalDetailId.Value);
                }
            }
            if (BusinessPartnerAccIds.Count() > 0)
            {
                List<Cal_BusinessPartnerAccounts> Accounts = db.Cal_BusinessPartnerAccounts.Where(x => BusinessPartnerAccIds.Contains(x.BusinessPartnerAccId)).ToList();
                List<int> Ids = new List<int>();
                for (int i = 0; i < BusinessPartnerAccIds.Count(); i++)
                {
                    var model = Accounts.Where(x => x.BusinessPartnerAccId == BusinessPartnerAccIds[i]).FirstOrDefault();
                    var modelFromDetails = Detailes.FirstOrDefault(x => x.BusinessPartnerAccId == model?.BusinessPartnerAccId && !Ids.Contains(x.JurnalDetailId.Value));
                    if (model != null)
                    {
                        modelFromDetails.AccountNameA = model.AccountNameA;
                        modelFromDetails.AccountNameE = model.AccountNameE;
                        modelFromDetails.AccountCode = model.AccountCode.Split('-')[1];
                        modelFromDetails.SubAccountCode = model.AccountCode.Split('-')[0];
                    }
                    Ids.Add(modelFromDetails.JurnalDetailId.Value);
                }
            }
            if (AccountIds.Count() > 0)
            {
                List<Cal_AccountChart> Accounts = db.Cal_AccountChart.Where(x => AccountIds.Contains(x.AccountId)).ToList();
                for (int i = 0; i < Accounts.Count(); i++)
                {
                    var Account = Detailes.FirstOrDefault(x => x.AccountId.Value == AccountIds[i]);
                    if (Account != null)
                    {
                        Detailes.FirstOrDefault(x => x.AccountId.Value == AccountIds[i]).AccountNameA = Accounts[i].AccountNameA;
                        Detailes.FirstOrDefault(x => x.AccountId.Value == AccountIds[i]).AccountNameE = Accounts[i].AccountNameE;
                        Detailes.FirstOrDefault(x => x.AccountId.Value == AccountIds[i]).AccountCode = Accounts[i].AccountCode.ToString();
                    }
                }
            }
            return Detailes;
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetById(int id)
        {
            Cal_JurnalEntry Cal_JurnalEntrys = Service.GetById(id);
            return Ok(new BaseResponse(Cal_JurnalEntrys));
        }

        [HttpPost, AllowAnonymous]
        public IHttpActionResult Insert([FromBody] PostJurnalDetail detailes)
        {
            using (var dbTransaction = db.Database.BeginTransaction())
            {
                try
                {
                    if (detailes != null)
                    {
                        if (detailes.JurnalEntry != null)
                        {
                            Cal_JurnalEntry Jurnal = Service.Insert(detailes.JurnalEntry);
                            detailes.JurnalDetails.ForEach(x => x.JurnalId = Jurnal.JurnalId);

                            if (detailes.JurnalDetails.Count() > 0)
                                Service.InsertList(detailes.JurnalDetails);

                            bool res = PostOrder.AccountingSave(Jurnal.FinancialIntervalsId, detailes.JurnalDetails, Jurnal, FormMode.Add);
                            if (res)
                                dbTransaction.Commit();
                            else
                            {
                                dbTransaction.Rollback();
                                return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, PostOrder.Message + "\n\n" + PostOrder.MessageBox));
                            }
                            return Ok(new BaseResponse(detailes.JurnalEntry));
                        }
                        return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, "Header is null"));
                    }
                    return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, "Header and Details is null"));
                }
                catch (Exception ex)
                {
                    dbTransaction.Rollback();
                    return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
                }
            }
        }

        [HttpPost, AllowAnonymous]
        public IHttpActionResult Update([FromBody] PostJurnalDetail detailes)
        {
            using (var dbTransaction = db.Database.BeginTransaction())
            {
                try
                {
                    if (detailes != null)
                    {
                        if (detailes.JurnalEntry != null)
                        {
                            Cal_JurnalEntry Jurnal = Service.Update(detailes.JurnalEntry);
                            detailes.JurnalDetails.ForEach(x => x.JurnalId = Jurnal.JurnalId);

                            if (detailes.JurnalDetails.Count() > 0)
                                Service.UpdateJurnalDetails(detailes.JurnalDetails);

                            bool res = PostOrder.AccountingSave(Jurnal.FinancialIntervalsId, detailes.JurnalDetails, Jurnal, FormMode.Edit);
                            if (res)
                                dbTransaction.Commit();
                            else
                            {
                                dbTransaction.Rollback();
                                return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, PostOrder.Message + "\n\n" + PostOrder.MessageBox));
                            }
                            return Ok(new BaseResponse(detailes.JurnalEntry));
                        }
                        return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, "Header is null"));
                    }
                    return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, "Header and Details is null"));
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
                    List<Cal_JurnalDetail> detailes = Service.GetAllDetails(x => x.JurnalId == id);
                    if (detailes.Count() > 0)
                        Service.DeleteList(detailes);

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
