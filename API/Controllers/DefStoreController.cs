﻿using Inv.API.Models;
using Inv.API.Tools;
using Inv.BLL.Services.DefStoree;
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
    public class DefStoreController : BaseController
    {
        private readonly IDefStoreService DefStoreService;
        private readonly G_USERSController UserControl;

        public DefStoreController(IDefStoreService _IDefStoreService, G_USERSController _Control)
        {
            this.DefStoreService = _IDefStoreService;
            this.UserControl = _Control;
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetAll(int CompCode, int BranchCode ,string UserCode, string Token)
        {
            //if (ModelState.IsValid && UserControl.CheckUser(Token, UserCode))
            //{
                var AccDefCustomerList = DefStoreService.GetAll(x => x.COMP_CODE == CompCode && x.BRA_CODE == BranchCode).ToList();

                return Ok(new BaseResponse(AccDefCustomerList));
            //}
            //return BadRequest(ModelState);
        }


        //public IHttpActionResult GetAllbycomp(int CompCode, string UserCode, string Token)
        //{
        //    if (ModelState.IsValid && UserControl.CheckUser(Token, UserCode))
        //    {
        //        var AccDefCustomerList = DefStoreService.GetAll(x => x.COMP_CODE == CompCode).ToList();

        //        return Ok(new BaseResponse(AccDefCustomerList));
        //    }
        //    return BadRequest(ModelState);
        //}

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetById(int id, string UserCode, string Token)
        {
            if (ModelState.IsValid && UserControl.CheckUser(Token, UserCode))
            {
                var AccDefCustomer = DefStoreService.GetById(id);

                return Ok(new BaseResponse(AccDefCustomer));
            }
            return BadRequest(ModelState);
        }
        [HttpGet, AllowAnonymous]
        public IHttpActionResult Update(int StoreId , int BranchId , int COMP_CODE ,int BRA_CODE , int STORE_CODE , string DescA , string DescL , string Tel1 , string Tel2 , string Address , string Remarks , string UpdatedBy)
  {
            var query = "UPDATE G_STORE SET  BranchId = "+BranchId+", COMP_CODE = "+COMP_CODE+", STORE_CODE ="+STORE_CODE +", DescA= '"+DescA+"',DescL='"+DescL+"',Tel1 ='"+Tel1+"', Tel2='"+Tel2+"', Address ='"+Address+"' ,Remarks= '"+Remarks+"',UpdatedBy='"+UpdatedBy+"' WHERE StoreId = "+StoreId+" and BRA_CODE= "+BRA_CODE+"";




            //if (ModelState.IsValid && UserControl.CheckUser(AccTrReceipt.Token, AccTrReceipt.UserCode))
            //{
            //var res = DefStoreService.Update(AccTrReceipt);
            db.Database.ExecuteSqlCommand(query);
            return Ok(new BaseResponse(StoreId));

            //}
            //return BadRequest(ModelState);
        }
        [HttpPost, AllowAnonymous]
        public IHttpActionResult Insert([FromBody]G_STORE AccTrReceipt)
        {
            //if (ModelState.IsValid && UserControl.CheckUser(AccTrReceipt.Token, AccTrReceipt.UserCode))
            //{
                var res = DefStoreService.Insert(AccTrReceipt);
                return Ok(new BaseResponse(res.StoreId));

            //}
            //return BadRequest(ModelState);
        }

    }
}
