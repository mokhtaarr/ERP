using Inv.API.Models;
using Inv.API.Tools;
using Inv.BLL.Services.AccTrReceipt;
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
    public class AccTrReceiptController : BaseController
    {
        private readonly IAccTrReceiptService AccTrReceiptService;
        private readonly G_USERSController UserControl;

        public AccTrReceiptController(IAccTrReceiptService _IAccTrReceiptService, G_USERSController _Control)
        {
            this.AccTrReceiptService = _IAccTrReceiptService;
            this.UserControl = _Control;
        }
        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetAll(string UserCode, string Token)
        {
            if (ModelState.IsValid && UserControl.CheckUser(Token, UserCode))
            {
                var AccTrReceipList = AccTrReceiptService.GetAll().ToList();

                return Ok(new BaseResponse(AccTrReceipList));
            }
            return BadRequest(ModelState);
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetBoxReceiveList(int comp ,int IQ_TrType, int? Boxid  ,int? RecPayTypeId ,string Status , string FromDate , string Todate, int? custId, int?vndid, int? expid, int? BankCode, int?fromBoxid ,int? CashType,  string UserCode, string Token)
        {
            if (ModelState.IsValid && UserControl.CheckUser(Token, UserCode))
            {   // 

                if (custId == 0){custId = null;}
                if (vndid == 0) { vndid = null; }
                if (BankCode == 0) { BankCode = null; }
                if (expid == 0) { expid = null; }
                if (fromBoxid == 0) { fromBoxid = null; }
                if (Boxid == 0) { Boxid = null; }
                if (RecPayTypeId == 0) { RecPayTypeId = null; }
                if (CashType == 1001) { CashType = null; }
                if (Status == "All") { Status = null; }




                string s = "select * from IQ_GetBoxReceiveList where TrType="+ IQ_TrType + "";
                string condition = "";

                if (CashType != null)
                    condition = condition + " and CashType=" + CashType;

                if (Boxid != null)
                    condition = condition + " and CashBoxID=" + Boxid ;
                if (RecPayTypeId != null)
                    condition = condition + " and RecPayTypeId=" + RecPayTypeId;

                if (Status != null)
                    condition = condition + " and Status=" +Convert.ToInt16(Status);

                if (custId != null)
                    condition = condition + " and CustomerID=" + custId;
                if (vndid != null)
                    condition = condition + " and VendorID=" + vndid;
                if (BankCode != null)
                    condition = condition + " and BankAccountCode='" + BankCode+"'";
                if (expid != null)
                    condition = condition + " and ExpenseID=" + expid;
                if (fromBoxid != null)
                    condition = condition + " and FromCashBoxID=" + fromBoxid;

                if (FromDate != "")
                    condition = condition + " and TrDate>='" + FromDate + "'";
                if (Todate != "")
                    condition = condition + " and TrDate<='" + Todate + "'";

                try
                {
                    string query = s + condition;
                    var AccTrReceipList = db.Database.SqlQuery<IQ_GetBoxReceiveList>(query).ToList();
                    return Ok(new BaseResponse(AccTrReceipList));
                }
                catch(Exception e) {

                }
           
                
            }
            return BadRequest(ModelState);
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetById(int id, string UserCode, string Token)
        {
            if (ModelState.IsValid && UserControl.CheckUser(Token, UserCode))
            {
                var AccTrReceip = AccTrReceiptService.GetById(id);

                return Ok(new BaseResponse(AccTrReceip));
            }
            return BadRequest(ModelState);
        }

        [HttpPost, AllowAnonymous]
        public IHttpActionResult Insert([FromBody]A_RecPay_Tr_ReceiptNote Entity)
        {
            if (ModelState.IsValid && UserControl.CheckUser(Entity.Token, Entity.UserCode))
            {
                using (var dbTransaction = db.Database.BeginTransaction())
                {
                    try
                    {
                        var res = AccTrReceiptService.Insert(Entity);
                        string Typ;
                        if (res.TrType == 1)
                            Typ = "BoxReceipt";
                        else if (res.TrType == 2)
                            Typ = "BoxPayment";
                        else
                            Typ = "BoxTransfer";
                        ResponseResult result = Shared.TransactionProcess(int.Parse(res.CompCode.ToString()), int.Parse(res.BranchCode.ToString()), res.ReceiptID, Typ, "Add", db);
                        if (result.ResponseState == true)
                        {
                            dbTransaction.Commit();
                            res.TrNo  = int.Parse(result.ResponseData.ToString());
                            return Ok(new BaseResponse(res));
                        }
                        else
                        {
                            dbTransaction.Rollback();
                            return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, result.ResponseMessage));
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

        [HttpPost, AllowAnonymous]
        public IHttpActionResult Open([FromBody] A_RecPay_Tr_ReceiptNote obj)
        {
            if (ModelState.IsValid && UserControl.CheckUser(obj.Token, obj.UserCode))
            {
                using (var dbTransaction = db.Database.BeginTransaction())
                {
                    try
                    {
                        var res = AccTrReceiptService.Update(obj);
                        string Typ;
                        if (res.TrType == 1)
                            Typ = "BoxReceipt";
                        else if (res.TrType == 2)
                            Typ = "BoxPayment";
                        else
                            Typ = "BoxTransfer";
                        ResponseResult result = Shared.TransactionProcess(int.Parse(res.CompCode.ToString()), int.Parse(res.BranchCode.ToString()), res.ReceiptID, Typ, "Open", db);
                        if (result.ResponseState == true)
                        {
                            dbTransaction.Commit();
                            res.TrNo = int.Parse(result.ResponseData.ToString());
                            return Ok(new BaseResponse(res));
                        }
                        else
                        {
                            dbTransaction.Rollback();
                            return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, result.ResponseMessage));
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
                    AccTrReceiptService.Delete(ID);
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
        public IHttpActionResult Update([FromBody]A_RecPay_Tr_ReceiptNote AccTrReceipt)
        {
            if (ModelState.IsValid && UserControl.CheckUser(AccTrReceipt.Token, AccTrReceipt.UserCode))
            {
                using (var dbTransaction = db.Database.BeginTransaction())
                {
                    try
                    {
                        var res = AccTrReceiptService.Update(AccTrReceipt);
                        string Typ;
                        if (res.TrType == 1)
                            Typ = "BoxReceipt";
                        else if (res.TrType == 2)
                            Typ = "BoxPayment";
                        else
                            Typ = "BoxTransfer";
                        ResponseResult result = Shared.TransactionProcess(int.Parse(res.CompCode.ToString()), int.Parse(res.BranchCode.ToString()), res.ReceiptID, Typ, "Update", db);
                        if (result.ResponseState == true)
                        {
                            dbTransaction.Commit();
                            res.TrNo = int.Parse(result.ResponseData.ToString());
                            return Ok(new BaseResponse(res));
                        }
                        else
                        {
                            dbTransaction.Rollback();
                            return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, result.ResponseMessage));
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
        public IHttpActionResult TrNoFounBefore(int TrNo,int TrType, int compCode, string UserCode, string Token)
        {
            if (ModelState.IsValid && UserControl.CheckUser(Token, UserCode))
            {
                var AccDefVendor = AccTrReceiptService.GetAll(x => x.CompCode == compCode && x.TrNo == TrNo&&x.TrType== TrType);

                return Ok(new BaseResponse(AccDefVendor));
            }
            return BadRequest(ModelState);
        }
    }
}
