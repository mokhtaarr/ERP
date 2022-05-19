﻿using Inv.API.Models;
using Inv.API.Models.CustomModel;
using Inv.API.Tools;
using Inv.BLL.Services.OperationCharges;
using Inv.BLL.Services.OperationDeposit;
using Inv.BLL.Services.OperationItems;
using Inv.BLL.Services.Processes;
using Inv.BLL.Services.PurDefCharges;
using Inv.BLL.Services.SalesTrans;
using Inv.BLL.Services.OperationSalesmanItem;
using Inv.DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web.Http;
using Inv.BLL.Services.AccDefVendor;

namespace Inv.API.Controllers
{
    public class ProcessesController : BaseController
    {
        private readonly IOperationItems OperationItems;
        private readonly IOperationCharges OperationCharges;
        private readonly IOperationDeposit OperationDeposit;
        private readonly IProcesses Processes;
        private readonly IPurDefChargesService PurDefChargesService;
        private readonly G_USERSController UserControl;
        private readonly ISalesTranservice ISalesTranservice;
        private readonly IOperationSalesmanItemsService OperationSalesmanItem;
        private readonly IAccDefVendorService AccDefVendorService;



        public ProcessesController(G_USERSController _Control, IPurDefChargesService _IPurDefChargesService, IProcesses _IProcesses, IOperationItems _IOperationItems, IOperationCharges _IOperationCharges, IOperationDeposit _IOperationDeposit, ISalesTranservice _ISalesTranservice, IOperationSalesmanItemsService _IOperationSalesmanItem, IAccDefVendorService _IAccDefVendor)
        {

            UserControl = _Control;
            PurDefChargesService = _IPurDefChargesService;
            Processes = _IProcesses;
            OperationItems = _IOperationItems;
            OperationCharges = _IOperationCharges;
            OperationDeposit = _IOperationDeposit;
            ISalesTranservice = _ISalesTranservice;
            OperationSalesmanItem = _IOperationSalesmanItem;
            AccDefVendorService = _IAccDefVendor;
        }

        #region OPeration
        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetAll(int CompCode, string UserCode, string Token)
        {
            if (ModelState.IsValid && UserControl.CheckUser(Token, UserCode))
            {
                //var ItemStoreInfoList = PurTrReceiveService.GetAll(x => x.CompCode == CompCode).ToList();

                //return Ok(new BaseResponse(ItemStoreInfoList));
            }
            return BadRequest(ModelState);
        }

        [HttpPost, AllowAnonymous]//done 
        public IHttpActionResult OpenReturn([FromBody]PurInvoiceMasterDetails updatedObj)
        {
            //if (ModelState.IsValid && UserControl.CheckUser(updatedObj.Token, updatedObj.UserCode))
            //{
            //    using (var dbTransaction = db.Database.BeginTransaction())
            //    {
            //        try
            //        {
            //            // update master
            //            PurTrReceiveService.Update(updatedObj.I_Pur_TR_Receive);


            //            //update I_Pur_TR_ReceiveItems 
            //            var insertedRecordsReceiveItems = updatedObj.I_Pur_TR_ReceiveItems.Where(x => x.StatusFlag == 'i').ToList();
            //            var updatedRecordsReceiveItems = updatedObj.I_Pur_TR_ReceiveItems.Where(x => x.StatusFlag == 'u').ToList();
            //            var deletedRecordsReceiveItems = updatedObj.I_Pur_TR_ReceiveItems.Where(x => x.StatusFlag == 'd').ToList();


            //            //loop insered  I_Pur_TR_ReceiveItems
            //            foreach (var item in insertedRecordsReceiveItems)
            //            {
            //                item.ReceiveID = updatedObj.I_Pur_TR_Receive.ReceiveID;
            //                var InsertedRec = PurTRReceiveItemsService.Insert(item);
            //            }

            //            //loop Update  I_Pur_TR_ReceiveItems
            //            foreach (var item in updatedRecordsReceiveItems)
            //            {
            //                item.ReceiveID = updatedObj.I_Pur_TR_Receive.ReceiveID;
            //                var updatedRec = PurTRReceiveItemsService.Update(item);
            //            }

            //            //loop Delete  I_Pur_TR_ReceiveItems
            //            foreach (var item in deletedRecordsReceiveItems)
            //            {
            //                int deletedId = item.ReciveDetailsID;
            //                PurTRReceiveItemsService.Delete(deletedId);
            //            }

            //            var br = 1;
            //            ResponseResult res = Shared.TransactionProcess(Convert.ToInt32(updatedObj.I_Pur_TR_Receive.CompCode), br, updatedObj.I_Pur_TR_Receive.ReceiveID, "PurReturn", "Open", db);
            //            if (res.ResponseState == true)
            //            {
            //                updatedObj.I_Pur_TR_Receive.TrNo = int.Parse(res.ResponseData.ToString());
            //                dbTransaction.Commit();
            //                return Ok(new BaseResponse(updatedObj.I_Pur_TR_Receive));
            //            }
            //            else
            //            {
            //                dbTransaction.Rollback();
            //                return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, res.ResponseMessage));
            //            }

            //        }
            //        catch (Exception ex)
            //        {
            //            dbTransaction.Rollback();
            //            return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
            //        }
            //    }
            //}
            return BadRequest(ModelState);
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetAllPurDefCharges(int compCode, string UserCode, string Token)
        {
            if (ModelState.IsValid && UserControl.CheckUser(Token, UserCode))
            {
                List<I_Pur_D_Charges> res = PurDefChargesService.GetAll(s => s.CompCode == compCode);
                return Ok(new BaseResponse(res));
            }
            return BadRequest(ModelState);
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetAll_IQ_GetOperation(int CompCode, int BranchCode, string startDate, string endDate, int trtype, int Status, int? VendorId, int? SalesmanId, string UserCode, string Token)
        {
            if (ModelState.IsValid && UserControl.CheckUser(Token, UserCode))
            {
                string s = "select * from IQ_GetOperation where CompCode = " + CompCode + " and BranchCode = " + BranchCode + "and TrDate >=' " + startDate + "' and TrDate <=' " + endDate + " ' ";

                string condition = "";

                if (SalesmanId != 0 && SalesmanId != null)
                {
                    condition = condition + " and SalesmanId =" + SalesmanId;
                }

                if (VendorId != 0 && VendorId != null)
                {
                    condition = condition + " and VendorID =" + VendorId;
                }

                if (Status != 111)
                {
                    condition = condition + " and Status =" + Status;
                }

                string query = s + condition;
                List<IQ_GetOperation> res = db.Database.SqlQuery<IQ_GetOperation>(query).ToList();
                return Ok(new BaseResponse(res));
            }
            return BadRequest(ModelState);
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult AllGetOperationMasterDisplay(int OperationID, string UserCode, string Token)
        {
            if (ModelState.IsValid && UserControl.CheckUser(Token, UserCode))
            {
                List<IQ_GetOperationItemInfo> res_1 = db.IQ_GetOperationItemInfo.Where(x => x.OperationID == OperationID).ToList();
                List<IQ_GetOperationCharges> res_2 = db.IQ_GetOperationCharges.Where(x => x.OperationID == OperationID).ToList();
                List<IQ_GetOperationDepsit> res_3 = db.IQ_GetOperationDepsit.Where(x => x.OperationID == OperationID).ToList();
                List<IQ_GetOperationSalesman> res_4 = db.IQ_GetOperationSalesman.Where(x => x.OperationID == OperationID).ToList();
                List<IQ_GetOperationSalesmanItem> res_5 = db.IQ_GetOperationSalesmanItem.Where(x => x.OperationID == OperationID).ToList();


                OperationMasterDisplay Model = new OperationMasterDisplay
                {
                    IQ_GetOperationItemInfo = res_1,
                    IQ_GetOperationCharges = res_2,
                    I_TR_OperationDeposit = res_3,
                    TR_OperationSalesman = res_4,
                    TR_OperationSalesmanItem = res_5
                };

                return Ok(new BaseResponse(Model));
            }
            return BadRequest(ModelState);
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetOperationSalesmanItem(int OperationSalesmanID, string UserCode, string Token)
        {
            if (ModelState.IsValid && UserControl.CheckUser(Token, UserCode))
            {
                List<IQ_GetOperationSalesmanItem> res = db.IQ_GetOperationSalesmanItem.Where(x => x.OperationSalesmanID == OperationSalesmanID).ToList();

                return Ok(new BaseResponse(res));
            }
            return BadRequest(ModelState);
        }

        [HttpPost, AllowAnonymous]
        public IHttpActionResult Insert_Processes([FromBody]I_TR_Operation Operation)
        {
            if (ModelState.IsValid && UserControl.CheckUser(Operation.Token, Operation.UserCode))
            {
                try
                {
                    using (System.Data.Entity.DbContextTransaction dbTransaction = db.Database.BeginTransaction())
                    {

                        var VendorObj = db.A_Pay_D_Vendor.Where(s => s.VendorID == Operation.VendorID).FirstOrDefault();

                        int lastNum = int.Parse(VendorObj.OperationSer.Last().ToString()) + 1;

                        string newItemFormatSerial = VendorObj.OperationSer;
                        var x = newItemFormatSerial.Remove(newItemFormatSerial.Length - 1, 1);

                        VendorObj.OperationSer = x + lastNum;
                        AccDefVendorService.Update(VendorObj);

                        Operation.RefNO = VendorObj.OperationFixed + VendorObj.OperationSer;


                        I_TR_Operation TR_Operation = Processes.Insert(Operation);

                        // call process trans 
                        int br = 1;
                        ResponseResult res = Shared.TransactionProcess(Convert.ToInt32(Operation.CompCode), br, Operation.OperationID, "Process", "Add", db);
                        if (res.ResponseState == true)
                        {
                            Operation.TrNo = int.Parse(res.ResponseData.ToString());
                            dbTransaction.Commit();
                            return Ok(new BaseResponse(Operation.OperationID));
                        }
                        else
                        {
                            dbTransaction.Rollback();
                            return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, res.ResponseMessage));
                        }
                    }

                }
                catch (Exception ex)
                {
                    return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
                }
            }
            return BadRequest(ModelState);
        }

        [HttpPost, AllowAnonymous]
        public IHttpActionResult Update_Processes([FromBody]I_TR_Operation Operation)
        {
            //if (ModelState.IsValid && UserControl.CheckUser(Operation.Token, Operation.UserCode))
            //{
            try
            {
                using (System.Data.Entity.DbContextTransaction dbTransaction = db.Database.BeginTransaction())
                {

                    var VendorObj = db.A_Pay_D_Vendor.Where(s => s.VendorID == Operation.VendorID).FirstOrDefault();

                    Operation.RefNO = VendorObj.OperationFixed + VendorObj.OperationSer;


                    I_TR_Operation TR_Operation = Processes.Update(Operation);
                    // call process trans 
                    int br = 1;
                    ResponseResult res = Shared.TransactionProcess(Convert.ToInt32(Operation.CompCode), br, Operation.OperationID, "Process", "Update", db);
                    if (res.ResponseState == true)
                    {
                        Operation.TrNo = int.Parse(res.ResponseData.ToString());
                        dbTransaction.Commit();
                        return Ok(new BaseResponse(Operation));
                    }
                    else
                    {
                        dbTransaction.Rollback();
                        return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, res.ResponseMessage));
                    }
                }

            }
            catch (Exception ex)
            {
                return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
            }
            //}
            //return BadRequest(ModelState);
        }


        [HttpPost, AllowAnonymous]//done status =2 مفتوحه
        public IHttpActionResult ListOperationItemsDetailProcesses_Open(List<I_TR_OperationItems> updatedObj)
        {
            if (ModelState.IsValid && UserControl.CheckUser(updatedObj[0].Token, updatedObj[0].UserCode))
            {
                using (System.Data.Entity.DbContextTransaction dbTransaction = db.Database.BeginTransaction())
                {
                    try
                    {
                        // update master
                        //OperationItems.Update(I_TR_OperationItems);


                        //update I_Pur_TR_ReceiveItems 
                        List<I_TR_OperationItems> insertedOperationItems = updatedObj.Where(x => x.StatusFlag == 'i').ToList();
                        List<I_TR_OperationItems> updatedOperationItems = updatedObj.Where(x => x.StatusFlag == 'u').ToList();
                        List<I_TR_OperationItems> deletedOperationItems = updatedObj.Where(x => x.StatusFlag == 'd').ToList();

                        //loop insered  I_Pur_TR_ReceiveItems
                        foreach (I_TR_OperationItems item in insertedOperationItems)
                        {
                            // item.OperationItemID = updatedObj[0].OperationItemID;

                            int OperationItemID = 0;
                            int OperationSalesmanID = 0; 

                            I_TR_OperationItems InsertedRec = OperationItems.Insert(item);

                            OperationItemID = InsertedRec.OperationItemID;

                           string query1 = "select OperationSalesmanID from [dbo].[I_TR_OperationSalesman]  where SalesmanId = (Select SalesmanId from [dbo].[I_TR_Operation] where OperationID = " + item.OperationID + ") and OperationID = " + item.OperationID + "";
                            OperationSalesmanID = db.Database.SqlQuery<int>(query1).FirstOrDefault();

                            string Execut_insert = "insert into [dbo].[I_TR_OperationSalesmanItem] values("+ OperationSalesmanID + " , " + OperationItemID + " ,"+ item.OperationID + " ,"+ item.ItemID + " ,"+ item.ReceivedQty + " ,0,0)";
                            db.Database.ExecuteSqlCommand(Execut_insert);
                        }

                        //loop Update  I_Pur_TR_ReceiveItems
                        foreach (I_TR_OperationItems item in updatedOperationItems)
                        {
                            decimal diff = 0;
                            decimal Qty_M = 0;
                            decimal Old_Qty = 0;
                            decimal New_Qty = 0;
                            int OperationItemID = 0;
                            int OperationSalesmanID = 0;
                            New_Qty = Convert.ToInt16(item.ReceivedQty);
                            OperationItemID = Convert.ToInt16(item.OperationItemID);

                            string query = "select ReceivedQty from [dbo].[I_TR_OperationItems] where OperationItemID = " + OperationItemID + "";
                            Old_Qty = db.Database.SqlQuery<decimal>(query).FirstOrDefault();
                            Qty_M = Old_Qty;
                            diff = New_Qty - Old_Qty;

                            if ((Qty_M + diff) >= (Convert.ToDecimal(item.SoldQty)))
                            {
                                item.ReceivedQty = (Qty_M + diff);


                                I_TR_OperationItems updatedRec = OperationItems.Update(item);

                                string query1 = "select OperationSalesmanID from [dbo].[I_TR_OperationSalesman]  where SalesmanId = (Select SalesmanId from [dbo].[I_TR_Operation] where OperationID = " + item.OperationID + ") and OperationID = " + item.OperationID + "";
                                OperationSalesmanID = db.Database.SqlQuery<int>(query1).FirstOrDefault();

                                string Execut_Update = "update [dbo].[I_TR_OperationSalesmanItem] set ReceivedQty = (ReceivedQty + "+ diff + ") where OperationSalesmanID =" + OperationSalesmanID + " and OperationItemID = "+ OperationItemID + " and OperationID = "+ item.OperationID + "";
                                db.Database.ExecuteSqlCommand(Execut_Update);

                            }
                        }

                        //loop Delete  I_Pur_TR_ReceiveItems
                        foreach (I_TR_OperationItems item in deletedOperationItems)
                        {
                            int deletedId = item.OperationItemID;
                            OperationItems.Delete(deletedId);
                        }
                        int val = updatedObj[0].OperationID;
                        I_TR_Operation operObj = db.I_TR_Operation.Where(s => s.OperationID == val).FirstOrDefault();
                        int br = 1;
                        ResponseResult res = Shared.TransactionProcess(Convert.ToInt32(operObj.CompCode), br, updatedObj[0].OperationID, "Process", "Update", db);
                        if (res.ResponseState == true)
                        {
                            dbTransaction.Commit();
                            return Ok(new BaseResponse("ok"));
                        }
                        else
                        {
                            dbTransaction.Rollback();
                            return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, res.ResponseMessage));
                        }

                    }
                    catch (Exception ex)
                    {
                        dbTransaction.Rollback();
                        return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
                    }
                }
            }
            return BadRequest(ModelState);
        }



        [HttpPost, AllowAnonymous]//done 
        public IHttpActionResult ListOperationItemsDetail(List<I_TR_OperationItems> updatedObj)
        {
            if (ModelState.IsValid && UserControl.CheckUser(updatedObj[0].Token, updatedObj[0].UserCode))
            {
                using (System.Data.Entity.DbContextTransaction dbTransaction = db.Database.BeginTransaction())
                {
                    try
                    {
                        // update master
                        //OperationItems.Update(I_TR_OperationItems);


                        //update I_Pur_TR_ReceiveItems 
                        List<I_TR_OperationItems> insertedOperationItems = updatedObj.Where(x => x.StatusFlag == 'i').ToList();
                        List<I_TR_OperationItems> updatedOperationItems = updatedObj.Where(x => x.StatusFlag == 'u').ToList();
                        List<I_TR_OperationItems> deletedOperationItems = updatedObj.Where(x => x.StatusFlag == 'd').ToList();

                        //loop insered  I_Pur_TR_ReceiveItems
                        foreach (I_TR_OperationItems item in insertedOperationItems)
                        {
                            // item.OperationItemID = updatedObj[0].OperationItemID;
                            I_TR_OperationItems InsertedRec = OperationItems.Insert(item);
                        }

                        //loop Update  I_Pur_TR_ReceiveItems
                        foreach (I_TR_OperationItems item in updatedOperationItems)
                        {

                            I_TR_OperationItems updatedRec = OperationItems.Update(item);
                        }

                        //loop Delete  I_Pur_TR_ReceiveItems
                        foreach (I_TR_OperationItems item in deletedOperationItems)
                        {
                            int deletedId = item.OperationItemID;
                            OperationItems.Delete(deletedId);
                        }
                        int val = updatedObj[0].OperationID;
                        I_TR_Operation operObj = db.I_TR_Operation.Where(s => s.OperationID == val).FirstOrDefault();
                        int br = 1;
                        ResponseResult res = Shared.TransactionProcess(Convert.ToInt32(operObj.CompCode), br, updatedObj[0].OperationID, "Process", "Update", db);
                        if (res.ResponseState == true)
                        {
                            dbTransaction.Commit();
                            return Ok(new BaseResponse("ok"));
                        }
                        else
                        {
                            dbTransaction.Rollback();
                            return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, res.ResponseMessage));
                        }

                    }
                    catch (Exception ex)
                    {
                        dbTransaction.Rollback();
                        return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
                    }
                }
            }
            return BadRequest(ModelState);
        }

        [HttpPost, AllowAnonymous]//done 
        public IHttpActionResult ListOperationChargesDetail(List<I_TR_OperationCharges> updatedObj)
        {
            if (ModelState.IsValid && UserControl.CheckUser(updatedObj[0].Token, updatedObj[0].UserCode))
            {
                using (System.Data.Entity.DbContextTransaction dbTransaction = db.Database.BeginTransaction())
                {
                    try
                    {
                        // update master
                        //OperationItems.Update(I_TR_OperationItems);


                        //update I_Pur_TR_ReceiveItems 
                        List<I_TR_OperationCharges> insertedOperationItems = updatedObj.Where(x => x.StatusFlag == 'i').ToList();
                        List<I_TR_OperationCharges> updatedOperationItems = updatedObj.Where(x => x.StatusFlag == 'u').ToList();
                        List<I_TR_OperationCharges> deletedOperationItems = updatedObj.Where(x => x.StatusFlag == 'd').ToList();

                        //loop insered  I_Pur_TR_ReceiveItems
                        foreach (I_TR_OperationCharges item in insertedOperationItems)
                        {
                            //item.OperationExpensesID = updatedObj[0].OperationItemID;
                            I_TR_OperationCharges InsertedRec = OperationCharges.Insert(item);
                        }

                        //loop Update  I_Pur_TR_ReceiveItems
                        foreach (I_TR_OperationCharges item in updatedOperationItems)
                        {

                            I_TR_OperationCharges updatedRec = OperationCharges.Update(item);
                        }

                        //loop Delete  I_Pur_TR_ReceiveItems
                        foreach (I_TR_OperationCharges item in deletedOperationItems)
                        {
                            int deletedId = item.OperationExpensesID;
                            OperationCharges.Delete(deletedId);
                        }
                        int val = updatedObj[0].OperationID;
                        I_TR_Operation operObj = db.I_TR_Operation.Where(s => s.OperationID == val).FirstOrDefault();
                        int br = 1;
                        ResponseResult res = Shared.TransactionProcess(Convert.ToInt32(operObj.CompCode), br, updatedObj[0].OperationID, "Process", "Update", db);
                        if (res.ResponseState == true)
                        {
                            dbTransaction.Commit();
                            return Ok(new BaseResponse("ok"));
                        }
                        else
                        {
                            dbTransaction.Rollback();
                            return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, res.ResponseMessage));
                        }

                    }
                    catch (Exception ex)
                    {
                        dbTransaction.Rollback();
                        return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
                    }
                }
            }
            return BadRequest(ModelState);
        }

        [HttpPost, AllowAnonymous]//done 
        public IHttpActionResult ListOperationDepositDetail([FromBody]ListOperationDepositDetail updatedObj)
        {
            if (ModelState.IsValid && UserControl.CheckUser(updatedObj.Token, updatedObj.UserCode))
            {
                using (System.Data.Entity.DbContextTransaction dbTransaction = db.Database.BeginTransaction())
                {
                    try
                    {
                        // update master

                        int val = 0;


                        foreach (I_TR_OperationSalesmanItem item in updatedObj.I_TR_OperationSalesmanItem)
                        {
                            //I_TR_OperationSalesmanItem updatedRec = OperationSalesmanItem.Update(item); 
                            string Q = "update [dbo].[I_TR_OperationSalesmanItem] set [OperationSalesmanID]= " + item.OperationSalesmanID + ", [OperationItemID] =" + item.OperationItemID + ", [OperationID] =" + item.OperationID + ", [ItemID] =" + item.ItemID + ", [ReceivedQty]=" + item.ReceivedQty + ", [SoldQty]=" + item.SoldQty + ", [ScrapQty]=" + item.ScrapQty + " where [OperationSalesmanItemID]= " + item.OperationSalesmanItemID + "";
                            string query = Q;
                            var de = db.Database.ExecuteSqlCommand(query);

                            val = Convert.ToInt32(item.OperationID);
                        }



                        //update I_Pur_TR_ReceiveItems 
                        List<I_TR_OperationDeposit> insertedOperationItems = updatedObj.I_TR_OperationDeposit.Where(x => x.StatusFlag == 'i').ToList();
                        List<I_TR_OperationDeposit> updatedOperationItems = updatedObj.I_TR_OperationDeposit.Where(x => x.StatusFlag == 'u').ToList();
                        List<I_TR_OperationDeposit> deletedOperationItems = updatedObj.I_TR_OperationDeposit.Where(x => x.StatusFlag == 'd').ToList();

                        //loop insered  I_Pur_TR_ReceiveItems
                        foreach (I_TR_OperationDeposit item in insertedOperationItems)
                        {

                            //item.OperationExpensesID = updatedObj[0].OperationItemID;
                            val = Convert.ToInt32(item.OperationID);
                            I_TR_OperationDeposit InsertedRec = OperationDeposit.Insert(item);
                        }

                        //loop Update  I_Pur_TR_ReceiveItems
                        foreach (I_TR_OperationDeposit item in updatedOperationItems)
                        {

                            val = Convert.ToInt32(item.OperationID);
                            I_TR_OperationDeposit updatedRec = OperationDeposit.Update(item);
                        }

                        //loop Delete  I_Pur_TR_ReceiveItems
                        foreach (I_TR_OperationDeposit item in deletedOperationItems)
                        {
                            val = Convert.ToInt32(item.OperationID);
                            int deletedId = item.OperationDepositID;
                            OperationDeposit.Delete(deletedId);
                        }
                        // call process trans 

                        I_TR_Operation operObj = db.I_TR_Operation.Where(s => s.OperationID == val).FirstOrDefault();
                        int br = 1;
                        ResponseResult res = Shared.TransactionProcess(Convert.ToInt32(operObj.CompCode), br, val, "Process", "Update", db);
                        if (res.ResponseState == true)
                        {
                            dbTransaction.Commit();
                            return Ok(new BaseResponse("ok"));
                        }
                        else
                        {
                            dbTransaction.Rollback();
                            return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, res.ResponseMessage));
                        }

                    }
                    catch (Exception ex)
                    {
                        dbTransaction.Rollback();
                        return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
                    }
                }
            }
            return BadRequest(ModelState);
        }
        #endregion

        #region Salesman Transfer

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetAllSalesmanTransferHeaderWithDetail(int TrType, string FromDate, string toDate, int status, int sourcrSales, int ToSales, int operation, string UserCode, string Token)
        {
            if (ModelState.IsValid && UserControl.CheckUser(Token, UserCode))
            {
                string s = "select * from IQ_GetOperationTF where  TrDate >=' " + FromDate + "' and TrDate <= ' " + toDate + " '  and TrType= " + TrType;

                string condition = "";
                if (sourcrSales != 0)
                    condition = condition + " and FromSalesmanID = " + sourcrSales;

                if (ToSales != 0)
                    condition = condition + " and ToSalesmanID = " + ToSales;

                if (operation != 0)
                    condition = condition + " and OperationID = " + operation;



                if (status == 2)
                    condition = condition + "";
                else if (status == 0)
                {
                    condition = condition + " and IsSent = 'False'  ";
                }
                else if (status == 1)
                {
                    condition = condition + " and IsSent = 'True' ";
                }

                string query = s + condition;
                var res = db.Database.SqlQuery<IQ_GetOperationTF>(query).ToList();
                var res2 = db.IQ_GetOperationTFDetail.ToList();
                IQ_GetOPerationTransferWithDetail model = new IQ_GetOPerationTransferWithDetail();
                model.IQ_GetOperationTF = res;
                model.IQ_GetOperationTFDetail = res2;
                return Ok(new BaseResponse(model));
            }
            return BadRequest(ModelState);
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetOperationSalesman(int OperationID, string UserCode, string Token)
        {
            if (ModelState.IsValid && UserControl.CheckUser(Token, UserCode))
            {
                List<IQ_GetOperationSalesman> res = db.IQ_GetOperationSalesman.Where(x => x.OperationID == OperationID).ToList();

                return Ok(new BaseResponse(res));
            }
            return BadRequest(ModelState);
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetAllOperationItems(int operationid, string UserCode, string Token)
        {
            if (ModelState.IsValid && UserControl.CheckUser(Token, UserCode))
            {
                List<IQ_GetOperationSalesmanItem> res = db.IQ_GetOperationSalesmanItem.Where(x => x.OperationID == operationid).ToList();

                return Ok(new BaseResponse(res));
            }
            return BadRequest(ModelState);
        }
        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetOperSalesmanItemByID(int Id, string UserCode, string Token)
        {
            if (ModelState.IsValid && UserControl.CheckUser(Token, UserCode))
            {
                IQ_GetOperationSalesmanItem res = db.IQ_GetOperationSalesmanItem.Where(x => x.OperationSalesmanItemID == Id).FirstOrDefault();

                return Ok(new BaseResponse(res));
            }
            return BadRequest(ModelState);
        }
        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetAllOperSalesmanItems(int operationID, string UserCode, string Token)
        {
            if (ModelState.IsValid && UserControl.CheckUser(Token, UserCode))
            {
                List<IQ_GetOperationSalesmanItem> res = db.IQ_GetOperationSalesmanItem.Where(x => x.OperationID == operationID).ToList();

                return Ok(new BaseResponse(res));
            }
            return BadRequest(ModelState);
        }
        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetOperationByID(int OperationID, string UserCode, string Token)
        {
            if (ModelState.IsValid && UserControl.CheckUser(Token, UserCode))
            {
                List<IQ_GetOperation> res_1 = db.IQ_GetOperation.Where(x => x.OperationID == OperationID).ToList();

                return Ok(new BaseResponse(res_1));
            }
            return BadRequest(ModelState);
        }
        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetAllItemsInStore(int branch, int comp, int operationID, string UserCode, string Token)
        {
            if (ModelState.IsValid && UserControl.CheckUser(Token, UserCode))
            {
                var itemsList = ISalesTranservice.GetAll(s => s.CompCode == comp && s.BranchCode == branch && s.OperationID == operationID).ToList();
                return Ok(new BaseResponse(itemsList));
            }
            return BadRequest(ModelState);
        }

        [HttpPost, AllowAnonymous]
        public IHttpActionResult InsertProcesTransferMasterDetail([FromBody]OPerationSalesmanTransferWithDetail obj)
        {
            if (ModelState.IsValid && UserControl.CheckUser(obj.Token, obj.UserCode))
            {
                using (var dbTransaction = db.Database.BeginTransaction())
                {
                    try
                    {
                        var Header = ISalesTranservice.Insert(obj.I_TR_OperationTF);
                        foreach (var item in obj.I_TR_OperationTFDetail)
                        {
                            item.OperationTFID = Header.OperationTFID;
                            ISalesTranservice.Insert(item);
                        }

                        //// call process trans 
                        ResponseResult res = Shared.TransactionProcess(Convert.ToInt32(obj.I_TR_OperationTF.CompCode), Convert.ToInt32(obj.I_TR_OperationTF.BranchCode), Header.OperationTFID, "SlsTrnsfer", "Add", db);
                        if (res.ResponseState == true)
                        {
                            obj.I_TR_OperationTF.Tr_No = int.Parse(res.ResponseData.ToString());
                            dbTransaction.Commit();
                            return Ok(new BaseResponse(obj.I_TR_OperationTF));
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

        [HttpPost, AllowAnonymous]
        public IHttpActionResult UpdateProcesTransferDetail([FromBody]OPerationSalesmanTransferWithDetail obj)
        {
            if (ModelState.IsValid && UserControl.CheckUser(obj.Token, obj.UserCode))
            {
                using (var dbTransaction = db.Database.BeginTransaction())
                {
                    try
                    {
                        var Header = ISalesTranservice.Update(obj.I_TR_OperationTF);

                        //update Details
                        var insertedObjects = obj.I_TR_OperationTFDetail.Where(x => x.StatusFlag == 'i').ToList();
                        var updatedObjects = obj.I_TR_OperationTFDetail.Where(x => x.StatusFlag == 'u').ToList();
                        var deletedObjects = obj.I_TR_OperationTFDetail.Where(x => x.StatusFlag == 'd').ToList();

                        foreach (var item in insertedObjects)
                        {
                            item.OperationTFID = obj.I_TR_OperationTF.OperationTFID;
                            ISalesTranservice.Insert(item);
                        }
                        foreach (var item in updatedObjects)
                        {
                            item.OperationTFID = obj.I_TR_OperationTF.OperationTFID;
                            ISalesTranservice.Update(item);
                        }
                        foreach (var item in deletedObjects)
                        {
                            ISalesTranservice.Delete(item.OperationTFDetailID);
                        }

                        ResponseResult res = Shared.TransactionProcess(Convert.ToInt32(obj.I_TR_OperationTF.CompCode), Convert.ToInt32(obj.I_TR_OperationTF.BranchCode), Header.OperationTFID, "SlsTrnsfer", "Update", db);
                        if (res.ResponseState == true)
                        {
                            dbTransaction.Commit();
                            return Ok(new BaseResponse(obj.I_TR_OperationTF));
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

        [HttpPost, AllowAnonymous]
        public IHttpActionResult OpenProcesTransfer([FromBody]OPerationSalesmanTransferWithDetail obj)
        {
            if (ModelState.IsValid && UserControl.CheckUser(obj.Token, obj.UserCode))
            {
                using (var dbTransaction = db.Database.BeginTransaction())
                {
                    try
                    {
                        var jouranalHeader = ISalesTranservice.Update(obj.I_TR_OperationTF);

                        //update Details
                        var insertedObjects = obj.I_TR_OperationTFDetail.Where(x => x.StatusFlag == 'i').ToList();
                        var updatedObjects = obj.I_TR_OperationTFDetail.Where(x => x.StatusFlag == 'u').ToList();
                        var deletedObjects = obj.I_TR_OperationTFDetail.Where(x => x.StatusFlag == 'd').ToList();

                        foreach (var item in insertedObjects)
                        {
                            item.OperationTFID = obj.I_TR_OperationTF.OperationTFID;
                            ISalesTranservice.Insert(item);
                        }
                        foreach (var item in updatedObjects)
                        {
                            item.OperationTFID = obj.I_TR_OperationTF.OperationTFID;
                            ISalesTranservice.Update(item);
                        }
                        foreach (var item in deletedObjects)
                        {
                            ISalesTranservice.Delete(item.OperationTFDetailID);
                        }

                        ResponseResult res = Shared.TransactionProcess(Convert.ToInt32(obj.I_TR_OperationTF.CompCode), Convert.ToInt32(obj.I_TR_OperationTF.BranchCode), jouranalHeader.OperationTFID, "SlsTrnsfer", "Open", db);
                        if (res.ResponseState == true)
                        {
                            dbTransaction.Commit();
                            return Ok(new BaseResponse(obj.I_TR_OperationTF));
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
        public IHttpActionResult GetTransferByID(int OperationTFID, string UserCode, string Token)
        {
            if (ModelState.IsValid && UserControl.CheckUser(Token, UserCode))
            {
                var res = db.IQ_GetOperationTF.Where(s => s.OperationTFID == OperationTFID).ToList();
                var res2 = db.IQ_GetOperationTFDetail.Where(s => s.OperationTFID == OperationTFID).ToList();
                IQ_GetOPerationTransferWithDetail model = new IQ_GetOPerationTransferWithDetail();
                model.IQ_GetOperationTF = res;
                model.IQ_GetOperationTFDetail = res2;
                return Ok(new BaseResponse(model));
            }
            return BadRequest(ModelState);
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetAllSalesmanOperations(int salesmanId, string UserCode, string Token)
        {
            if (ModelState.IsValid && UserControl.CheckUser(Token, UserCode))
            {
                List<IQ_GetOperationSalesman> ItemStoreInfoList = db.IQ_GetOperationSalesman.Where(x => x.SalesmanId == salesmanId).ToList();

                return Ok(new BaseResponse(ItemStoreInfoList));
            }
            return BadRequest(ModelState);
        }
        #endregion
    }
}
