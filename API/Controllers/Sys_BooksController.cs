using Inv.API.Models;
using Inv.API.Models.CustomModel;
using Inv.API.Tools;
using Inv.BLL.Services.SysBooks;
using Inv.DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Inv.API.Controllers
{
    public class Sys_BooksController : BaseController
    {
        private readonly ISys_BooksService Service;
       
        public Sys_BooksController(ISys_BooksService _Sys_BooksService)
        {
            this.Service = _Sys_BooksService;
           
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetAll()
        {
            List<Sys_Books> Ms_Termss = Service.GetAll();
            return Ok(new BaseResponse(Ms_Termss));
        }

        //[HttpGet, AllowAnonymous]
        //public List<Sys_Books> GetAllIds()
        //{
        //    List<Sys_Books> Ms_Termss = Service.GetAll().OrderBy(x => x.PrefixCode).ToList()
        //        .Select(x => new Sys_Books { BookId = x.BookId, PrefixCode = x.PrefixCode }).ToList();
        //    return Ms_Termss;
        //}

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetById(int id)
        {
            Sys_Books model = Service.GetById(id);
            return Ok(new BaseResponse(model));
        }

        [HttpPost, AllowAnonymous]
        public IHttpActionResult Insert([FromBody] Sys_Books model)
        {
            using (var dbTransaction = db.Database.BeginTransaction())
            {
                try
                {
                    if (model != null)
                    {
                        Sys_Books Model = Service.Insert(model);
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
        public IHttpActionResult Update([FromBody] Sys_Books model)
        {
            using (var dbTransaction = db.Database.BeginTransaction())
            {
                try
                {
                    if (model != null)
                    {
                        Sys_Books Model = Service.Update(model);
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
