using Inv.API.Models;
using Inv.API.Tools;
using Inv.BLL.Services.CurrencyCategory;
using Inv.DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Inv.API.Controllers
{
    public class MS_CurrencyCategoryController : BaseController
    {



        private readonly IMS_CurrencyCategoryService MS_CurrencyCategoryService;

        public MS_CurrencyCategoryController(IMS_CurrencyCategoryService _IMS_CurrencyCategorySrv)
        {
            this.MS_CurrencyCategoryService = _IMS_CurrencyCategorySrv;

        }
        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetAll()
        {
            if (ModelState.IsValid)
            {
                var ObjsList = MS_CurrencyCategoryService.GetAll().ToList();
                return Ok(new BaseResponse(ObjsList));
            }
            return BadRequest(ModelState);

        }

        [HttpPost, AllowAnonymous]
        public IHttpActionResult Insert([FromBody] MS_CurrencyCategory NewObject)
        {

            //if (ModelState.IsValid)
            //{

            using (var dbTransaction = db.Database.BeginTransaction())
            {
                try
                {
                    var ObjFound = MS_CurrencyCategoryService.GetAll(x => x.code == NewObject.code).FirstOrDefault();
                    if (ObjFound == null)
                    {

                        var _NewObject = MS_CurrencyCategoryService.Insert(NewObject);

                        dbTransaction.Commit();
                        return Ok(new BaseResponse(_NewObject));
                    }
                    else return Ok(new BaseResponse("CodeFound"));
                }
                catch (Exception ex)
                {
                    dbTransaction.Rollback();
                    return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
                }
            }
            //}
            //return BadRequest(ModelState);

        }
        [HttpPost, AllowAnonymous]
        public IHttpActionResult Update([FromBody] MS_CurrencyCategory UpdateObject)
        {
            //if (ModelState.IsValid)
            //{

            using (var dbTransaction = db.Database.BeginTransaction())
            {
                try
                {
                    var _UpdateObject = MS_CurrencyCategoryService.Update(UpdateObject);

                    dbTransaction.Commit();
                    return Ok(new BaseResponse(_UpdateObject));

                }
                catch (Exception ex)
                {
                    dbTransaction.Rollback();
                    return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
                }
            }
            //}
            //return BadRequest(ModelState);

        }
        [HttpGet, AllowAnonymous]
        public IHttpActionResult Delete(int id)
        {


            //if (ModelState.IsValid)
            //{

            using (var dbTransaction = db.Database.BeginTransaction())
            {
                try
                {
                    int _id = Convert.ToInt32(id);


                    MS_CurrencyCategoryService.Delete(_id);
                    dbTransaction.Commit();
                    return Ok(new BaseResponse());

                }
                catch (Exception ex)
                {
                    dbTransaction.Rollback();
                    return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
                }
            }
            //}
            //return BadRequest(ModelState);

        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetByID(int id)
        {


            //if (ModelState.IsValid)
            //{


            int _id = Convert.ToInt32(id);

            var getdata = MS_CurrencyCategoryService.GetById(_id);
            return Ok(new BaseResponse(getdata));




        }
        //}
        //return BadRequest(ModelState);

    }


}

