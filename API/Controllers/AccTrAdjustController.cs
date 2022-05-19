﻿using Inv.API.Models;
using Inv.API.Tools;
using Inv.BLL.Services.AccTrAdjust;
using Inv.DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Inv.API.Controllers;
using System.Data.SqlClient;

namespace Inv.API.Controllers
{
    public class AccTrAdjustController : BaseController
    {
        private readonly IAccTrAdjustService AccTrAdjustService;
        private readonly G_USERSController UserControl;

        public AccTrAdjustController(G_USERSController _Control, IAccTrAdjustService _IAccTrAdjustService)
        {
            this.AccTrAdjustService = _IAccTrAdjustService;
            this.UserControl = _Control;
        }
        //A_RecPay_Tr_Adjustment
        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetAll(int CompCode, string UserCode, string Token)
        {
            if (ModelState.IsValid && UserControl.CheckUser(Token, UserCode))
            {
                var AccTrAdjustList = AccTrAdjustService.GetAll(s=>s.CompCode== CompCode).ToList();

                return Ok(new BaseResponse(AccTrAdjustList));
            }
            return BadRequest(ModelState);
        }


        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetAccTrAdjustList(int comp, int? IsDebit, bool isCustomer,int? Status, string fromDate, string ToDate, int? AdustmentTypeID, int? custId, int? vendorId, string UserCode, string Token)
        {
            if (ModelState.IsValid && UserControl.CheckUser(Token, UserCode))
            {
                if (custId == 0) { custId = null; }
                if (AdustmentTypeID == 0) { AdustmentTypeID = null; }
                if (vendorId == 0) { vendorId = null; }
                if (vendorId == 0) { vendorId = null; }
                if (IsDebit == 2) { IsDebit = null; }
                if (Status == 2) { Status = null; }

                string s = "select * from IQ_GetBoxAdjustmentList where IsCustomer='"+ isCustomer + "' and CompCode=" + comp;
                string condition = "";

                if (custId != null)
                    condition = condition + " and CustomerId =" + custId;
                if (custId != null)
                    condition = condition + " and CustomerId =" + custId;
                if (IsDebit != null)
                    condition = condition + " and IsDebit=" + IsDebit;

                if (Status != null)
                    condition = condition + " and Status=" + Status;

                if (AdustmentTypeID != null)
                    condition = condition + " and AdustmentTypeID =" + AdustmentTypeID;

                if (fromDate != "")
                    condition = condition + " and TrDate>='" + fromDate + "'";

                if (ToDate != "")
                    condition = condition + " and TrDate<='" + ToDate + "'";

                try
                {
                    string query = s + condition;
                    var AccTrReceipList = db.Database.SqlQuery<IQ_GetBoxAdjustmentList>(query).ToList();
                    return Ok(new BaseResponse(AccTrReceipList));
                }
                catch (Exception e)
                {

                }


            }
            return BadRequest(ModelState);
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetById(int id, string UserCode, string Token)
        {
            if (ModelState.IsValid && UserControl.CheckUser(Token, UserCode))
            {
                var AccTrReceip = AccTrAdjustService.GetById(id);

                return Ok(new BaseResponse(AccTrReceip));
            }
            return BadRequest(ModelState);
        }

        [HttpPost, AllowAnonymous]
        public IHttpActionResult Insert([FromBody]A_RecPay_Tr_Adjustment Entity)
        {
            if (ModelState.IsValid && UserControl.CheckUser(Entity.Token, Entity.UserCode))
            {
                using (var dbTransaction = db.Database.BeginTransaction())
                {
                    try
                    {

                        // doha 4-7-2021 GUID 
                        string st = SystemToolsController.GenerateGuid();
                        Entity.DocUUID = st;

                        var tm = DateTime.Now.ToString("HH:mm:ss");
                        Entity.TrTime = TimeSpan.Parse(tm); ;

                        var Entity2 = AccTrAdjustService.Insert(Entity);

                        // call process trans 
                        
                        string Typ;
                        if (Entity2.IsCustomer == true)
                            Typ = "AdjCust";
                        else
                            Typ = "AdjVendor";

                        ResponseResult res = Shared.TransactionProcess(Convert.ToInt32(Entity.CompCode), Convert.ToInt32(Entity.BranchCode), Convert.ToInt32(Entity2.AdjustmentID), Typ, "Add", db);
                        if (res.ResponseState == true)
                        {
                            Entity.TrNo = res.ResponseData.ToString();
                            dbTransaction.Commit();
                            return Ok(new BaseResponse(Entity.TrNo));
                        }
                        else
                        {
                            dbTransaction.Rollback();
                            return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, res.ResponseMessage));
                        }
                    }
                    catch (Exception ex)
                    {
                        return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
                    }
                }
            }
            return BadRequest(ModelState);
        }

        public IHttpActionResult Delete(int ID, string UserCode, string Token)
        {
            if (ModelState.IsValid && UserControl.CheckUser(Token, UserCode))
            {
                try
                {
                    AccTrAdjustService.Delete(ID);
                    return Ok(new BaseResponse());
                }
                catch (Exception ex)
                {
                    return Ok(new BaseResponse(0, "Error"));
                }

            }
            else
            {
                return BadRequest(ModelState);
            }
        }
        [HttpPost, AllowAnonymous]
        public IHttpActionResult Update([FromBody]A_RecPay_Tr_Adjustment AccTrReceipt)
        {
            if (ModelState.IsValid && UserControl.CheckUser(AccTrReceipt.Token, AccTrReceipt.UserCode))
            {
                using (var dbTransaction = db.Database.BeginTransaction())
                {
                    try
                    {
                        var res = AccTrAdjustService.Update(AccTrReceipt);
                        // call process trans 
                        var br = 1;
                        string Typ;
                        if (res.IsCustomer == true)
                            Typ = "AdjCust";
                        else
                            Typ = "AdjVendor";
                        //ResponseResult res = Shared.TransactionProcess(Convert.ToInt32(AccTrReceipt.CompCode), br, Convert.ToInt32(AccTrReceipt.AdjustmentID),Typ, "Update", db);
                        ResponseResult result = Shared.TransactionProcess(int.Parse(res.CompCode.ToString()), int.Parse(res.BranchCode.ToString()), res.AdjustmentID, Typ, "Update", db);
                        if (result.ResponseState == true)
                        {
                            dbTransaction.Commit();
                            res.TrNo = result.ResponseData.ToString();
                            return Ok(new BaseResponse(AccTrReceipt));
                        }
                        else
                        {
                            dbTransaction.Rollback();
                            return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, result.ResponseMessage));
                        }
                        //if (res.ResponseState == true)
                        //{
                        //    AccTrReceipt.TrNo = res.ResponseData.ToString();
                        //    dbTransaction.Commit();
                        //    return Ok(new BaseResponse(AccTrReceipt.TrNo));
                        //}
                        //else
                        //{
                        //    dbTransaction.Rollback();
                        //    return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, res.ResponseMessage));
                        //}
                    }
                    catch (Exception ex)
                    {
                        return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
                    }
                }
            }
            return BadRequest(ModelState);
        }
        [HttpPost, AllowAnonymous]
        public IHttpActionResult Open([FromBody]A_RecPay_Tr_Adjustment AccTrReceipt)
        {
            if (ModelState.IsValid && UserControl.CheckUser(AccTrReceipt.Token, AccTrReceipt.UserCode))
            {
                using (var dbTransaction = db.Database.BeginTransaction())
                {
                    try
                    {
                        var Entity2 = AccTrAdjustService.Update(AccTrReceipt);
                        // call process trans 
                        var br = 1;
                        string Typ;
                        if (Entity2.IsCustomer == true)
                            Typ = "AdjCust";                        
                        else
                            Typ = "AdjVendor";
                        ResponseResult res = Shared.TransactionProcess(Convert.ToInt32(AccTrReceipt.CompCode), br, Convert.ToInt32(AccTrReceipt.AdjustmentID), Typ, "Open", db);
                        if (res.ResponseState == true)
                        {
                            AccTrReceipt.TrNo = res.ResponseData.ToString();
                            dbTransaction.Commit();
                            return Ok(new BaseResponse(AccTrReceipt.TrNo));
                        }
                        else
                        {
                            dbTransaction.Rollback();
                            return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, res.ResponseMessage));
                        }
                    }
                    catch (Exception ex)
                    {
                        return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
                    }
                }
            }
            return BadRequest(ModelState);
        }
        [HttpGet, AllowAnonymous]
        public IHttpActionResult TrNoFounBefore(string TrNo,bool isCustomer, int compCode, string UserCode, string Token)
        {
            if (ModelState.IsValid && UserControl.CheckUser(Token, UserCode))
            {
                var AccDefVendor = AccTrAdjustService.GetAll(x => x.CompCode == compCode && x.TrNo == TrNo&&x.IsCustomer==isCustomer);

                return Ok(new BaseResponse(AccDefVendor));
            }
            return BadRequest(ModelState);
        }
    }
}
