using Inv.API.Models;
using Inv.DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web.Http;
using Inv.API.Tools;
using Inv.BLL.Services.HrDepartments;

namespace Inv.API.Controllers
{
    public class Hr_DepartmentsController : BaseController
    {
        private readonly IHr_DepartmentsService Service;

        public Hr_DepartmentsController(IHr_DepartmentsService _service )
        {
            this.Service = _service;
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetAll()
        {
            List<Hr_Departments> List = Service.GetAll().OrderBy(x=>x.DepartCode).ToList();
            return Ok(new BaseResponse(List));
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetById(int id)
        {
            Hr_Departments Model = Service.GetById(id);
            return Ok(new BaseResponse(Model));
        }

        [HttpPost, AllowAnonymous]
        public IHttpActionResult Insert([FromBody] Hr_Departments model)
        {
            using (var dbTransaction = db.Database.BeginTransaction())
            {
                try
                {
                    if (model != null)
                    {
                        Hr_Departments Model = Service.Insert(model);
                        dbTransaction.Commit();
                        return Ok(new BaseResponse(Model));
                    }
                    else return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed));
                }
                catch (Exception ex)
                {
                    dbTransaction.Rollback();
                    return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
                }
            }
        }

        [HttpPost, AllowAnonymous]
        public IHttpActionResult Update([FromBody] Hr_Departments model)
        {  
            using (var dbTransaction = db.Database.BeginTransaction())
            {
                try
                {
                    if (model != null)
                    {
                        Hr_Departments Model = Service.Update(model);
                        dbTransaction.Commit();
                        return Ok(new BaseResponse(Model));
                    }
                    else return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed));
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
