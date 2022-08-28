
using Inv.API.Models;
using Inv.DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web.Http;
using Inv.API.Tools;
using System.Globalization;
using Inv.Static.VM;
using System.IO;
using System.Web;
using System.Configuration;
using System.Drawing;
using System.Text.RegularExpressions;
using System.Data.Entity.Infrastructure;
using Inv.BLL.Services.Purchase.PurchasInvoice;

namespace Inv.API.Controllers
{
    public class MS_PurchasInvoiceController : BaseController
    {
        private readonly IMS_PurchasInvoiceService Service;
        public MS_PurchasInvoiceController(IMS_PurchasInvoiceService _service)
        {
            this.Service = _service;
        }
        
        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetAll()
        {
            //ItemCardUnits = db.Database.SqlQuery<Ms_ItemUnitVM>("select UnitId,ItemCardId, UnitCode, UnitNam, UnitNameE from Ms_ItemUnit where ItemCardId = " + id + "").ToList(),
            using (var dbTransaction = db.Database.BeginTransaction())
            {
                string query = @"select PurInvId as Id from MS_PurchasInvoice";
                List<SharedVM> MS_PurchasInvoices = db.Database.SqlQuery<SharedVM>(query).ToList();
                return Ok(new BaseResponse(MS_PurchasInvoices));
            }
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetById(int id)
        {
            using (var dbTransaction = db.Database.BeginTransaction())
            {
                PurchasInvoiceAndDetail detailes = new PurchasInvoiceAndDetail()
                {
                    Model = Service.GetById(id),
                    Details = Service.GetPurchaseInvoiceItemCard(x => x.PurInvId == id),
                };
                return Ok(new BaseResponse(detailes));
            }
        }

        [HttpPost, AllowAnonymous]
        public IHttpActionResult Insert([FromBody] PurchasInvoiceAndDetail detailes)
        {
            using (var dbTransaction = db.Database.BeginTransaction())
            {
                try
                {
                    if (detailes != null)
                    {
                        if (detailes.Model != null)
                        {
                            MS_PurchasInvoice Model = Service.Insert(detailes.Model);
                            detailes.Details.ForEach(x => x.PurInvId = Model.PurInvId);
                    
                            if (detailes.Details.Count() > 0)
                                Service.InsertList(detailes.Details.Distinct().ToList());

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
        public IHttpActionResult Update([FromBody] PurchasInvoiceAndDetail detailes)
        {
            using (var dbTransaction = db.Database.BeginTransaction())
            {
                try
                {
                    if (detailes != null)
                    {
                        if (detailes.Model != null)
                        {
                            MS_PurchasInvoice Model = Service.Update(detailes.Model);
                            detailes.Details.ForEach(x => x.PurInvId = Model.PurInvId);

                            if (detailes.Details.Count() > 0)
                                Service.UpdatePurchaseInvoiceItemCard(detailes.Details.Distinct().ToList());
                            
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
                    List<MS_PurchaseInvoiceItemCard> Details = Service.GetPurchaseInvoiceItemCard(x => x.PurInvId == id);
                    if (Details.Count() > 0)
                        Service.DeleteList(Details);
                    
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
