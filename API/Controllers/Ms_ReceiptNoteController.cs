using Inv.API.Models;
using Inv.DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web.Http;
using Inv.API.Tools;
using Inv.BLL.Services.MSVendor;
using Inv.API.Models.CustomModel;
using Inv.BLL.Services.MsReceiptNote;
using Inv.BLL.Services.CalPostOrder;
using Inv.Static.Enums;
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
using Inv.API.Controllers.Shared;

namespace Inv.API.Controllers
{
    public class Ms_ReceiptNoteController : BaseController
    {
        private readonly IMs_ReceiptNoteService Service;

        private PostOrderController PostOrder ;
        public Ms_ReceiptNoteController(IMs_ReceiptNoteService _service, ICal_PostOrderService PostOrderService, IMs_TermsService TermsService,
            IMS_CustomerService CustomerService, IMS_VendorService vendorService, IHr_EmployeesService empService,
            ICal_BusinessPartnerAccountsService businessService, IGLDefAccountService calAccountChart, ISys_AnalyticalCodesService analyticalCodesService,
            ICalCostCentersService costCentersService, IProd_JobOrderService jobOrderService, ISr_VehiclesService vehiclesService, IMS_CurrencyService currencyService)
        {
            this.Service = _service;

            PostOrder = new PostOrderController("Ms_ReceiptNote", PostOrderService, TermsService, CustomerService, vendorService, empService,
            businessService, calAccountChart, analyticalCodesService, costCentersService, jobOrderService, vehiclesService, currencyService);
        }

        #region Main Fun

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetAll()
        {
            List<Ms_ReceiptNote> Ms_ReceiptNotes = Service.GetAll();
            return Ok(new BaseResponse(Ms_ReceiptNotes));
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetById(int id)
        {
            Ms_ReceiptNote Ms_ReceiptNotes = Service.GetById(id);
            return Ok(new BaseResponse(Ms_ReceiptNotes));
        }

        [HttpPost, AllowAnonymous]
        public IHttpActionResult Insert([FromBody] ReceiptNoteAndDetails details)
        {
            using (var dbTransaction = db.Database.BeginTransaction())
            {
                try
                {
                    if (details != null)
                    {
                        if (details.Ms_Receipt != null)
                        {
                            Ms_ReceiptNote model = Service.Insert(details.Ms_Receipt);
                            details.Currencies.ForEach(x => x.RectId = model.RectId);

                            if (details.Currencies.Count() > 0)
                                Service.InsertList(details.Currencies);

                            bool res = PostOrder.AccountingSave(model.FinancialIntervalsId, model, FormMode.Add);
                            PostOrder.Message = PostOrder.Message == "" ? "PostOrder not saveing" : PostOrder.Message;
                            if (res)
                                dbTransaction.Commit();
                            else
                            {
                                dbTransaction.Rollback();
                                return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, PostOrder.Message + "\n\n" + PostOrder.MessageBox));
                            }

                            return Ok(new BaseResponse(model));
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
        public IHttpActionResult Update([FromBody] ReceiptNoteAndDetails details)
        {
            using (var dbTransaction = db.Database.BeginTransaction())
            {
                try
                {
                    if (details != null)
                    {
                        if (details.Ms_Receipt != null)
                        {
                            Ms_ReceiptNote model = Service.Update(details.Ms_Receipt);
                            details.Currencies.ForEach(x => x.RectId = model.RectId);

                            if (details.Currencies.Count() > 0)
                                Service.UpdateCurrencies(details.Currencies);

                            bool res = PostOrder.AccountingSave(model.FinancialIntervalsId, model, FormMode.Edit);
                            PostOrder.Message = PostOrder.Message == "" ? "PostOrder not saveing" : PostOrder.Message;
                            if (res)
                                dbTransaction.Commit();
                            else
                            {
                                dbTransaction.Rollback();
                                return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, PostOrder.Message + "\n\n" + PostOrder.MessageBox));
                            }

                            return Ok(new BaseResponse(model));
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
                    List<Ms_ReceiptNoteCurrencies> Currencies = Service.GetAllReceiptNoteCurrencies(x => x.RectId == id);
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

        #endregion
    }
}
