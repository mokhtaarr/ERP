﻿using Inv.API.Models;
using Inv.API.Models.CustomModel;
using Inv.API.Tools;
using Inv.BLL.Services.AccDefVendor;
using Inv.DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Inv.API.Controllers;

namespace Inv.API.Controllers
{
    public class AccDefVendorController : BaseController
    {
        private readonly IAccDefVendorService AccDefVendorService;
        private readonly G_USERSController UserControl;

        public AccDefVendorController(IAccDefVendorService _IAccDefVendorService, G_USERSController _Control)
        {
            this.AccDefVendorService = _IAccDefVendorService;
            this.UserControl = _Control;
        }
        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetAll(int CompCode, string UserCode, string Token)
        {
            if (ModelState.IsValid && UserControl.CheckUser(Token, UserCode))
            {
                var AccDefVendorList = AccDefVendorService.GetAll(x => x.CompCode == CompCode).ToList();
                return Ok(new BaseResponse(AccDefVendorList));
            }
            return BadRequest(ModelState);
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetAllVendorType(int CompCode,int VendorType ,  string UserCode, string Token)
        {
            if (ModelState.IsValid && UserControl.CheckUser(Token, UserCode))
            {
                var AccDefVendorList = AccDefVendorService.GetAll(x => x.CompCode == CompCode && x.VendorType == VendorType).ToList();
                return Ok(new BaseResponse(AccDefVendorList));
            }
            return BadRequest(ModelState);
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetFiltered(int CompCode, int? Catid, int? Groupid,int? CreditType ,int? VendorType, string BalType, string UserCode, string Token)
        {
            if (ModelState.IsValid && UserControl.CheckUser(Token, UserCode))
            {
                string s = "select * from IQ_GetVendor where CompCode = " + CompCode;
                string condition = "";
                if (Catid != 0)
                    condition = condition + " and CatID =" + Catid;
                if (Groupid != 0)
                    condition = condition + " and GroupId =" + Groupid;
                if (CreditType != 2)
                    condition = condition + " and IsCreditVendor =" + CreditType;
                if (VendorType != 0)
                    condition = condition + " and VendorType =" + VendorType;
                if (BalType != "All")
                {
                    if (BalType == ">")
                    {
                        condition = condition + " and Balance > 0 ";
                    }
                    if (BalType == "=")
                    {
                        condition = condition + " and Balance = 0 ";
                    }
                    if (BalType == "<")
                    {
                        condition = condition + " and Balance < 0 ";
                    }

                }
                string query = s + condition;

                var res = db.Database.SqlQuery<IQ_GetVendor>(query).ToList();
                var res2 = db.AQ_GetVendorDoc.ToList();

                IQVendorMasterDetail model = new IQVendorMasterDetail();
                model.IQ_GetVendor = res;
                model.AQ_GetVendorDoc = res2;
                return Ok(new BaseResponse(model));
            }
            return BadRequest(ModelState);

        }


        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetById(int id, string UserCode, string Token)
        {
            if (ModelState.IsValid && UserControl.CheckUser(Token, UserCode))
            {
                var AccDefVendor = AccDefVendorService.GetById(id);

                return Ok(new BaseResponse(AccDefVendor));
            }
            return BadRequest(ModelState);
        }

        [HttpPost, AllowAnonymous]
        public IHttpActionResult Insert([FromBody]VendorMasterDetail obj)
        {
            if (ModelState.IsValid && UserControl.CheckUser(obj.Token, obj.UserCode))
            {
                try
                {
                    var AccDefVen = AccDefVendorService.Insert(obj.A_Pay_D_Vendor);
                    foreach (var item in obj.A_Pay_D_VendorDoc)
                    {
                        item.VendorId = AccDefVen.VendorID;
                        AccDefVendorService.Insert(item);
                    }
                    return Ok(new BaseResponse(obj.A_Pay_D_Vendor));
                }
                catch (Exception ex)
                {
                    return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
                }
            }
            return BadRequest(ModelState);
        }
        

        [HttpPost, AllowAnonymous]
        public IHttpActionResult Update([FromBody]VendorMasterDetail obj)
        {
            if (ModelState.IsValid && UserControl.CheckUser(obj.Token, obj.UserCode))
            {
                try
                {
                    var AccDefVen = AccDefVendorService.Update(obj.A_Pay_D_Vendor);
                    //update Details
                    var insertedObjects = obj.A_Pay_D_VendorDoc.Where(x => x.StatusFlag == 'i').ToList();
                    var updatedObjects = obj.A_Pay_D_VendorDoc.Where(x => x.StatusFlag == 'u').ToList();
                    var deletedObjects = obj.A_Pay_D_VendorDoc.Where(x => x.StatusFlag == 'd').ToList();

                    foreach (var item in insertedObjects)
                    {
                        item.VendorId = obj.A_Pay_D_Vendor.VendorID;
                        AccDefVendorService.Insert(item);
                    }
                    foreach (var item in updatedObjects)
                    {
                        item.VendorId = obj.A_Pay_D_Vendor.VendorID;
                        AccDefVendorService.Update(item);
                    }
                    foreach (var item in deletedObjects)
                    {
                        AccDefVendorService.Delete(item.VendorDocID);
                    }
                    return Ok(new BaseResponse(AccDefVen));
                }
                catch (Exception ex)
                {
                    return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
                }
            }
            return BadRequest(ModelState);
        }

        [HttpPost, AllowAnonymous]
        public IHttpActionResult UpdateLst(List<A_Pay_D_Vendor> AccDefVendorList)
        {
            try
            {
                AccDefVendorService.UpdateList(AccDefVendorList);
                return Ok(new BaseResponse());
            }
            catch (Exception ex)
            {
                return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
            }
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult CodeFounBefore(string code,int compCode, string UserCode, string Token)
        {
            if (ModelState.IsValid && UserControl.CheckUser(Token, UserCode))
            {
                var AccDefVendor = AccDefVendorService.GetAll(x=>x.CompCode==compCode&&x.VendorCode==code);

                return Ok(new BaseResponse(AccDefVendor));
            }
            return BadRequest(ModelState);
        }
        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetAllWithCreditType(int CompCode, bool isCredit, string UserCode, string Token)
        {
            if (ModelState.IsValid && UserControl.CheckUser(Token, UserCode))
            {
                var AccDefCustomerList = AccDefVendorService.GetAll(x => x.CompCode == CompCode && x.IsCreditVendor == isCredit).ToList();

                return Ok(new BaseResponse(AccDefCustomerList));
            }
            return BadRequest(ModelState);
        }

        // Currency
        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetAllCurrency( string UserCode, string Token)
        {
            if (ModelState.IsValid /*&& UserControl.CheckUser(Token, UserCode)*/)
            {
                var AccDefCustomerList = db.G_Currency.ToList();

                return Ok(new BaseResponse(AccDefCustomerList));
            }
            return BadRequest(ModelState);
        }
    }
}
