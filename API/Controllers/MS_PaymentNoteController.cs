using Inv.API.Controllers.Shared;
using Inv.API.Models;
using Inv.API.Models.CustomModel;
using Inv.API.Tools;
using Inv.BLL.Services.MSPaymentNote;
using Inv.DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web.Http;
using Inv.BLL.Services.MSVendor;
using Inv.BLL.Services.CalPostOrder;
using Inv.BLL.Services.MsTerms;
using Inv.BLL.Services.MSCustomer;
using Inv.BLL.Services.HrEmployees;
using Inv.BLL.Services.CalBusinessPartnerAccounts;
using Inv.BLL.Services.GLDefAccount;
using Inv.BLL.Services.SysAnalyticalCodes;
using Inv.BLL.Services.CalCostCenters;
using Inv.BLL.Services.ProdJobOrder;
using Inv.BLL.Services.SrVehicles;
using Inv.BLL.Services.MSCurrency;
using Inv.Static.Enums;

namespace Inv.API.Controllers
{
    public class MS_PaymentNoteController : BaseController
    {
        private readonly IMS_PaymentNoteService Service;
        private PostOrderController PostOrder ;

        public MS_PaymentNoteController(IMS_PaymentNoteService _MS_PaymentNoteService, ICal_PostOrderService PostOrderService, IMs_TermsService TermsService,
            IMS_CustomerService CustomerService, IMS_VendorService vendorService, IHr_EmployeesService empService,
            ICal_BusinessPartnerAccountsService businessService, IGLDefAccountService calAccountChart, ISys_AnalyticalCodesService analyticalCodesService,
            ICalCostCentersService costCentersService, IProd_JobOrderService jobOrderService, ISr_VehiclesService vehiclesService, IMS_CurrencyService currencyService)
        {
            this.Service = _MS_PaymentNoteService;
            PostOrder = new PostOrderController("MS_PaymentNote", PostOrderService, TermsService, CustomerService, vendorService, empService,
             businessService, calAccountChart, analyticalCodesService, costCentersService, jobOrderService, vehiclesService, currencyService);
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetAll()
        {
            List<MS_PaymentNote> MS_PaymentNotes = GetAllIds();
            return Ok(new BaseResponse(MS_PaymentNotes));
        }

        [HttpGet, AllowAnonymous]
        public List<MS_PaymentNote> GetAllIds()
        {
            List<MS_PaymentNote> MS_PaymentNotes = Service.GetAll().OrderBy(x => x.TrNo).ToList()
                .Select(x => new MS_PaymentNote { PayId = x.PayId, TrNo = x.TrNo }).ToList();
            return MS_PaymentNotes;
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetById(int id)
        {
            MS_PaymentNote model = Service.GetById(id);
            return Ok(new BaseResponse(model));
        }

        [HttpPost, AllowAnonymous]
        public IHttpActionResult Insert([FromBody] PaymentNoteAndDetails details)
        {
            using (var dbTransaction = db.Database.BeginTransaction())
            {
                try
                {
                    if (details != null)
                    {
                        if (details.PaymentNote != null)
                        {
                            MS_PaymentNote Model = Service.Insert(details.PaymentNote);
                            details.Currencies.ForEach(x => x.PayId = Model.PayId);

                            if (details.Currencies.Count() > 0)
                                Service.InsertList(details.Currencies);

                            bool res = PostOrder.AccountingSave(Model.FinancialIntervalsId, Model, FormMode.Add);
                            if (res)
                                dbTransaction.Commit();
                            else
                            {
                                dbTransaction.Rollback();
                                return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, PostOrder.Message + "\n\n" + PostOrder.MessageBox));
                            }

                            return Ok(new BaseResponse(details.PaymentNote));
                        }
                        else return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, "model is null"));
                    }
                    else return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, "model and details is null"));
                }
                catch (Exception ex)
                {
                    dbTransaction.Rollback();
                    return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
                }
            }
        }

        [HttpPost, AllowAnonymous]
        public IHttpActionResult Update([FromBody] PaymentNoteAndDetails details)
        {
            using (var dbTransaction = db.Database.BeginTransaction())
            {
                try
                {
                    if (details != null)
                    {
                        if (details.PaymentNote != null)
                        {
                            MS_PaymentNote Model = Service.Update(details.PaymentNote);
                            details.Currencies.ForEach(x => x.PayId = Model.PayId);

                            if (details.Currencies.Count() > 0)
                                Service.UpdateCurrencies(details.Currencies);

                            bool res = PostOrder.AccountingSave(Model.FinancialIntervalsId, Model, FormMode.Edit);
                            if (res)
                                dbTransaction.Commit();
                            else
                            {
                                dbTransaction.Rollback();
                                return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, PostOrder.Message + "\n\n" + PostOrder.MessageBox));
                            }

                            return Ok(new BaseResponse(details.PaymentNote));
                        }
                        else return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, "model is null"));
                    }
                    else return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, "model and details is null"));
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
                    List<Ms_PaymentNoteCurrencies> Currencies = Service.GetAllPaymentCurrencies(x => x.PayId == id);
                    Service.DeleteList(Currencies);
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
        public int GetMaxTrNo(int bookId)
        {
            try
            {
                int TrNo = Service.GetAll(x => x.BookId == bookId).Max(x => x.TrNo) + 1;
                return TrNo;
            }
            catch
            {
                return 1;
            }
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult CheckPaymentTrNo(int bookId, int trNo)
        {
            MS_PaymentNote paymentNote = Service.GetAll(x => x.BookId == bookId && x.TrNo == trNo).FirstOrDefault();
            if (paymentNote != null)
                return Ok(false);
            else 
                return Ok(true);
        }
    }
}
