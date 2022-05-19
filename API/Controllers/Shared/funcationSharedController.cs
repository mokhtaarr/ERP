using System;
using Inv.API.Models;
using Inv.API.Tools;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web.Http;
using Inv.DAL.Domain;
using Security;
using Inv.API.Models.CustomModel;
using CustomVendorUsers = Inv.API.Models.CustomModel.CustomVendorUsers;
using Inv.BLL.Services.Shared;
using Inv.BLL.Services.GUSERS;
using Inv.BLL.Services.USER_BRANCH;
using System.Globalization;
using Inv.Static.Enums;

namespace Inv.API.Controllers
{
    public class funcationSharedController : BaseController
    {
        private G_USERSController G_USERS;
        private readonly ISharedService Service;
        public funcationSharedController(ISharedService _service, IG_USERSService G_USERSService, IG_USER_BRANCHService G_USER_BRANCHService)
        {
            this.Service = _service;
            this.G_USERS = new G_USERSController(G_USERSService, G_USER_BRANCHService);
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
                Rate = x.Rate
            }).ToList();
            return Ok(new BaseResponse(currency));
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetAllCurrencyCategory(int currencyId)
        {
            List<CurrencyCategoryShared> currency = new List<CurrencyCategoryShared>();
            List<int> ids = this.GetCurrencyCategoryIdsFromJoin(currencyId);
            if(ids.Count() > 0)
            {
                currency = Service.GetAllCurrencyCategory(x=> ids.Contains(x.CurrencyCategoryId)).Select(x => new CurrencyCategoryShared
                {
                    CurrencyDescA = x.CurrencyCategoryNameA,
                    CurrencyDescE = x.CurrencyCategoryNameE,
                    CurrencyCategoryId = x.CurrencyCategoryId,
                    //RecCurId = x.RecCurId,
                    Value = x.Value,
                }).ToList();
            }
            return Ok(new BaseResponse(currency));
        }
        
        [HttpGet, AllowAnonymous]
        public List<int> GetCurrencyCategoryIdsFromJoin(int currencyId)
        {
            List<int> CurrencyCategoryIds = Service.GetAllCurrencyCategoryJoin(x=>x.CurrencyId == currencyId).ToList().Select(x => x.CurrencyCategoryId.Value).ToList();
            return CurrencyCategoryIds;
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
        public IHttpActionResult GetVendor()
        {
            List<MS_Vendor> vendors = db.MS_Vendor.ToList().Select(x => new MS_Vendor
            {
                VendorId = x.VendorId,
                VendorCode = x.VendorCode,
                VendorDescA = x.VendorDescA,
                VendorDescE = x.VendorDescE,
            }).ToList();
            return Ok(new BaseResponse(vendors));
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetCustomers()
        {
            List<MS_Customer> customers = Service.GetCustomers(x=>x.CustomerId != null).Select(x => new MS_Customer
            {
                CustomerId = x.CustomerId,
                CustomerCode = x.CustomerCode,
                CustomerDescA = x.CustomerDescA,
                CustomerDescE = x.CustomerDescE,
            }).ToList();
            return Ok(new BaseResponse(customers));
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetDepartments()
        {
            List<Hr_Departments> departments = db.Hr_Departments.ToList().Select(x => new Hr_Departments
            {
                DepartMentId = x.DepartMentId,
                DepartCode = x.DepartCode,
                DepartName1 = x.DepartName1,
                DepartName2 = x.DepartName2,
            }).ToList();
            return Ok(new BaseResponse(departments));
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetStores()
        {
            List<MS_Stores> stores = db.MS_Stores.ToList().Select(x => new MS_Stores
            {
                StoreId = x.StoreId,
                StoreCode = x.StoreCode,
                StoreDescA = x.StoreDescA,
                StoreDescE = x.StoreDescE,
            }).ToList();
            return Ok(new BaseResponse(stores));
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetJobs()
        {
            List<Hr_Jobs> Jobs = db.Hr_Jobs.ToList().Select(x => new Hr_Jobs
            {
                JobId = x.JobId,
                JCode = x.JCode,
                JName1 = x.JName1,
                JName2 = x.JName2,
            }).ToList();
            return Ok(new BaseResponse(Jobs));
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetCostCenters()
        {
            List<Cal_CostCenters> costCenters = Service.GetCostCenters(x=>x.CostCenterId != null).Select(x => new Cal_CostCenters
            {
                CostCenterId = x.CostCenterId,
                CostCenterCode = x.CostCenterCode,
                CostCenterNameA = x.CostCenterNameA,
                CostCenterNameE = x.CostCenterNameE,
            }).ToList();
            return Ok(new BaseResponse(costCenters));
        }

        public List<CustomDropDownUsers> GetAllUsers(string CompCode, string Token, string UserCode)
        {
            try
            {
                List<G_USERS> res = G_USERS.GetAllUsers(CompCode, Token, UserCode);
                List<CustomDropDownUsers> users = new List<CustomDropDownUsers>();
                if (res != null)
                {
                    users = res.ToList().Select(x => new CustomDropDownUsers
                    {
                        FirstName = x.FirstName,
                        UserCode = x.USER_CODE,
                        UserName = x.USER_NAME,
                    }).ToList();
                }
                return users;
            }
            catch { return null; }
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult ReturnAllUsers(string CompCode, string Token, string UserCode)
        {
            List<G_USERS> res = G_USERS.GetAllUsers(CompCode, Token, UserCode).ToList().Select(x => new G_USERS
            {
                UserId = x.UserId,
                FirstName = x.FirstName,
                UserCode = x.USER_CODE,
                USER_NAME = x.USER_NAME,
            }).ToList();
            
            return Ok(new BaseResponse(res));
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetHrShifts()
        {
            List<Hr_Shifts> costCenters = db.Hr_Shifts.ToList().Select(x => new Hr_Shifts
            {
                ShiftId = x.ShiftId,
                ShiftCode = x.ShiftCode,
                Name1 = x.Name1,
                Name2 = x.Name2,
            }).ToList();
            return Ok(new BaseResponse(costCenters));
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetHrPeriodsTables()
        {
            List<Hr_PeriodsTables> costCenters = db.Hr_PeriodsTables.ToList().Select(x => new Hr_PeriodsTables
            {
                PeriodTableId = x.PeriodTableId,
                PeriodCode = x.PeriodCode,
                Name1 = x.Name1,
                Name2 = x.Name2,
            }).ToList();
            return Ok(new BaseResponse(costCenters));
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetAllSubAccountChart()
        {
            List<Cal_AccountChart> AccountChart = Service.GetAllAccountChart(x => x.AccountType == 3 || x.AccountType == 2).ToList().Select(x => new Cal_AccountChart
            {
                AccountId = x.AccountId,
                AccountCode = x.AccountCode,
                AccountNameA = x.AccountNameA,
                AccountNameE = x.AccountNameE
            }).ToList();
            return Ok(new BaseResponse(AccountChart));
        }

        ///////////////// Get Assistant Accounts /////////////////////////
        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetAssistantAccounts()
        {
            List<Cal_AccountChart> AccountChart = Service.GetAllAccountChart(x => x.AccountType == (int)AccountType.assistant).ToList().Select(x => new Cal_AccountChart
            {
                AccountId = x.AccountId,
                AccountCode = x.AccountCode,
                AccountNameA = x.AccountNameA,
                AccountNameE = x.AccountNameE
            }).ToList();
            return Ok(new BaseResponse(AccountChart));
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetAllSubCostCenters()
        {
            List<Cal_CostCenters> costCenters = Service.GetCostCenters(x => x.CostType == 2).ToList().Select(x => new Cal_CostCenters
            {
                CostCenterId = x.CostCenterId,
                CostCenterCode = x.CostCenterCode,
                CostCenterNameA = x.CostCenterNameA,
                CostCenterNameE = x.CostCenterNameE,
            }).ToList();
            return Ok(new BaseResponse(costCenters));
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetAllAccountChart()
        {
            List<Cal_AccountChart> AccountChart = Service.GetAllAccountChart(x => x.AccountId != null).Select(x => new Cal_AccountChart
            {
                AccountId = x.AccountId,
                AccountCode = x.AccountCode,
                AccountNameA = x.AccountNameA,
                AccountNameE = x.AccountNameE
            }).ToList();
            return Ok(new BaseResponse(AccountChart));
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetAccountChartByCode(string code)
        {
            Cal_AccountChart AccountChart = db.Cal_AccountChart.FirstOrDefault(x => x.AccountCode.ToString() == code);
            return Ok(new BaseResponse(AccountChart));
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetCustAccountByCode(string code)
        {
            Cal_CustAccounts CustAccount = db.Cal_CustAccounts.FirstOrDefault(x => x.AccountCode == code);
            return Ok(new BaseResponse(CustAccount));
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetVendAccountByCode(string code)
        {
            Cal_VendAccounts VendAccounts = db.Cal_VendAccounts.FirstOrDefault(x => x.AccountCode == code);
            return Ok(new BaseResponse(VendAccounts));
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetEmpAccountsByCode(string code)
        {
            Cal_EmpAccounts EmpAccounts = db.Cal_EmpAccounts.FirstOrDefault(x => x.AccountCode == code);
            return Ok(new BaseResponse(EmpAccounts));
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetAssetAccountsByCode(string code)
        {
            Cal_AssetAccounts AssetAccounts = db.Cal_AssetAccounts.FirstOrDefault(x => x.AccountCode == code);
            return Ok(new BaseResponse(AssetAccounts));
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetBusinessPartnerAccByCode(string code)
        {
            Cal_BusinessPartnerAccounts BusinessPartnerAccounts = db.Cal_BusinessPartnerAccounts.FirstOrDefault(x => x.AccountCode == code);
            return Ok(new BaseResponse(BusinessPartnerAccounts));
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetSystems()
        {
            List<G_SYSTEM> systems = db.G_SYSTEM.ToList().Select(x => new G_SYSTEM {
                SYSTEM_CODE = x.SYSTEM_CODE,
                SYSTEM_DESCA = x.SYSTEM_DESCA,
                SYSTEM_DESCE = x.SYSTEM_DESCE
            }).ToList();
            return Ok(new BaseResponse(systems));
        }


        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetCounter(int id)
        {
            int? Counter = Service.GetCounter(x => x.BookId == id)?.Counter;
            return Ok(new BaseResponse(Counter));
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetSubSystems()
        {
            List<G_SUB_SYSTEMS> subSystems = db.G_SUB_SYSTEMS.ToList().Select(x=> new G_SUB_SYSTEMS{ 
            SUB_SYSTEM_CODE = x.SUB_SYSTEM_CODE,
            SUB_SYSTEM_DESCA = x.SUB_SYSTEM_DESCA,
            SUB_SYSTEM_DESCE = x.SUB_SYSTEM_DESCE
            }).ToList();
            return Ok(new BaseResponse(subSystems));
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetAllTerms(int type)
        {
            List<Ms_Terms> Terms = Service.GetAllTerms(x => x.TermType == type);
            return Ok(new BaseResponse(Terms));
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetAllBooks(int type)
        {
            List<Sys_Books> models = Service.GetAllBooks(x => x.TermType == type);
            return Ok(new BaseResponse(models));
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetAllSafes()
        {
            List<MS_BoxBank> models = Service.GetAllBoxBank(x => x.IsActive == true && x.IsBank == false);
            return Ok(new BaseResponse(models));
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetAllBanks()
        {
            List<MS_BoxBank> models = Service.GetAllBoxBank(x => x.IsBank == true);
            return Ok(new BaseResponse(models));
        }

      

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetBankNotic(int bankNoticId)
        {
            string sql = @"SELECT TOP 1 (Sys_Books.[PrefixCode]+'-'+CONVERT(NVARCHAR(100),BNk_BankNotice.[TrNo])) AS DocTrNo,
                BNk_BankNotice.RefNo,BNk_BankNotice.TrDate,[dbo].[BNk_BankNotice].BankNoticId

                FROM [dbo].BNk_BankNotice 
                LEFT JOIN BNK_BankNoticeDetail on BNk_BankNotice.BankNoticId=BNK_BankNoticeDetail.BankNoticId
                join Ms_ReceiptNote on BNK_BankNoticeDetail.RectId=Ms_ReceiptNote.RectId
                LEFT JOIN dbo.Sys_Books ON BNk_BankNotice.BookId=Sys_Books.BookId
                WHERE BNk_BankNotice.BankNoticId= " + bankNoticId;

            var model = db.Database.SqlQuery<BankNoticeVM>(sql).FirstOrDefault();
            return Ok(new BaseResponse(model));
        }


        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetBankAccounts(int BoxId)
        {
            string sql = @"select Ms_BankAccount.AcounntNameA,Ms_BankAccount.AcounntNameE,Ms_BankAccount.AcountCode from MS_BoxCurrency 
                    join Ms_BankAccount on MS_BoxCurrency.AccountId = Ms_BankAccount.AccountId
                    where MS_BoxCurrency.BoxId= " + BoxId;
            var model = db.Database.SqlQuery<BankAccountsVM>(sql);
            
            return Ok(new BaseResponse(model));
        }

        public static string ConvertDateCalendar(DateTime? DateConv, string Calendar = "Gregorian", string DateLangCulture = "en-US")
        {
            if (DateConv != null)
            {
                DateTimeFormatInfo DTFormat;
                DateLangCulture = DateLangCulture.ToLower();
                /// We can't have the hijri date writen in English. We will get a runtime error

                if (Calendar == "Hijri" && DateLangCulture.StartsWith("en-"))
                {
                    DateLangCulture = "ar-sa";
                }

                /// Set the date time format to the given culture
                DTFormat = new System.Globalization.CultureInfo(DateLangCulture, false).DateTimeFormat;

                /// Set the calendar property of the date time format to the given calendar
                switch (Calendar)
                {
                    case "Hijri":
                        DTFormat.Calendar = new System.Globalization.HijriCalendar();
                        break;

                    case "Gregorian":
                        DTFormat.Calendar = new System.Globalization.GregorianCalendar();
                        break;

                    default:
                        return "";
                }

                /// We format the date structure to whatever we want
                DTFormat.ShortDatePattern = "dd/MM/yyyy";
                var date = DateConv.Value.Date.ToString(DTFormat.ShortDatePattern, DTFormat);
                return date;
            }
            else
                return "";
        }

        public static DateTime ConvertToDate(string date, string format)
        {
            try
            {
                CultureInfo cultures = new CultureInfo("en-US");
                DateTime newDate = Convert.ToDateTime(date, cultures);

                DateTime dateTime = new DateTime();
                dateTime = DateTime.ParseExact(date, format, CultureInfo.InvariantCulture);
                DateTimeFormatInfo DTFormat;
                DTFormat = new System.Globalization.CultureInfo("en-US", false).DateTimeFormat;
                DTFormat.Calendar = new System.Globalization.GregorianCalendar();
                DTFormat.ShortDatePattern = format;

                var date2 = dateTime.Date.ToString(DTFormat.ShortDatePattern, DTFormat);
                newDate = Convert.ToDateTime(date2, cultures);
            }
            catch (Exception ex)
            {
                throw;
            }


            return Convert.ToDateTime(date);
        }
    }
}