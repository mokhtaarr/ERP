using Inv.API.Models;
using Inv.API.Models.CustomModel;
using Inv.API.Tools;
using Inv.BLL.Services.MSExpenses;
using Inv.DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Inv.API.Controllers
{
    public class MS_ExpensesController : BaseController
    {
        private readonly IMS_ExpensesService Service;
       
        public MS_ExpensesController(IMS_ExpensesService _MS_ExpensesService)
        {
            this.Service = _MS_ExpensesService;
           
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetAll()
        {
            List<MS_Expenses> MS_Expensess = Service.GetAll().OrderBy(x => x.ExpensesCode).ToList();
            return Ok(new BaseResponse(MS_Expensess));
        }

        [HttpGet, AllowAnonymous]
        public List<MS_Expenses> GetAllIds()
        {
            List<MS_Expenses> MS_Expensess = Service.GetAll().OrderBy(x => x.ExpensesCode).ToList()
                .Select(x => new MS_Expenses { ExpensesId = x.ExpensesId, ExpensesCode = x.ExpensesCode }).ToList();
            return MS_Expensess;
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetById(int id)
        {
            MS_Expenses model = Service.GetById(id);
            return Ok(new BaseResponse(model));
        }

        [HttpPost, AllowAnonymous]
        public IHttpActionResult Insert([FromBody] MS_Expenses model)
        {
            using (var dbTransaction = db.Database.BeginTransaction())
            {
                try
                {
                    if (model != null)
                    {
                        MS_Expenses Model = Service.Insert(model);
                        dbTransaction.Commit();
                        return Ok(new BaseResponse(model));
                    }
                    else return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, "model is null"));
                }
                catch (Exception ex)
                {
                    dbTransaction.Rollback();
                    return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
                }
            }
        }

        [HttpPost, AllowAnonymous]
        public IHttpActionResult Update([FromBody] MS_Expenses model)
        {
            using (var dbTransaction = db.Database.BeginTransaction())
            {
                try
                {
                    if (model != null)
                    {
                        MS_Expenses Model = Service.Update(model);
                        dbTransaction.Commit();
                        return Ok(new BaseResponse(model));
                    }
                    else return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, "model is null"));
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
