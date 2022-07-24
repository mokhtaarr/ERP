using Inv.API.Models;
using Inv.DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web.Http;
using Inv.API.Tools;
using Inv.Static.VM;
using System.IO;
using System.Web;
using System.Configuration;
using System.Drawing;
using System.Text.RegularExpressions;
using Inv.BLL.Services.ProdBasicUnits;

namespace Inv.API.Controllers
{
    public class Prod_BasicUnitsController : BaseController
    {
        private readonly IProd_BasicUnitsService Service;
        public Prod_BasicUnitsController(IProd_BasicUnitsService _service)
        {
            this.Service = _service;
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetAll()
        {
            using (var dbTransaction = db.Database.BeginTransaction())
            {
                string query = @"select BasUnitId, UnitCode, UnitNam, UnitNameE, UnittRate, Symbol from Prod_BasicUnits where ParentUnit is null";
                List<Prod_BasicUnitsVM> Prod_BasicUnitss = db.Database.SqlQuery<Prod_BasicUnitsVM>(query).ToList();
                return Ok(new BaseResponse(Prod_BasicUnitss));
            }
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetById(int id)
        {
            using (var dbTransaction = db.Database.BeginTransaction())
            {
                Prod_BasicUnitsDetailesVM detailes = new Prod_BasicUnitsDetailesVM()
                {
                    Model = Service.GetById(id),
                    Details = Service.GetDetails(x => x.ParentUnit == id),
                };
                return Ok(new BaseResponse(detailes));
            }
        }

        [HttpPost, AllowAnonymous]
        public IHttpActionResult Insert([FromBody] Prod_BasicUnitsDetailesVM detailes)
        {
            using (var dbTransaction = db.Database.BeginTransaction())
            {
                try
                {
                    if (detailes != null)
                    {
                        if (detailes.Model != null)
                        {
                            Prod_BasicUnits Model = Service.Insert(detailes.Model);
                            detailes.Details.ForEach(x => x.ParentUnit = Model.BasUnitId);
                            detailes.Details.ForEach(x => x.UpdateAt = Model.UpdateAt);
                            detailes.Details.ForEach(x => x.UpdateBy = Model.UpdateBy);
                            detailes.Details.ForEach(x => x.DeletedAt = Model.DeletedAt);
                            detailes.Details.ForEach(x => x.DeletedBy = Model.DeletedBy);
                    
                            if (detailes.Details.Count() > 0)
                                Service.InsertList(detailes.Details);

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
        public IHttpActionResult Update([FromBody] Prod_BasicUnitsDetailesVM detailes)
        {
            using (var dbTransaction = db.Database.BeginTransaction())
            {
                try
                {
                    if (detailes != null)
                    {
                        if (detailes.Model != null)
                        {
                            Prod_BasicUnits Model = Service.Update(detailes.Model);
                            detailes.Details.ForEach(x => x.ParentUnit = Model.BasUnitId);
                            detailes.Details.ForEach(x => x.UpdateAt = Model.UpdateAt);
                            detailes.Details.ForEach(x => x.UpdateBy = Model.UpdateBy);
                            detailes.Details.ForEach(x => x.DeletedAt = Model.DeletedAt);
                            detailes.Details.ForEach(x => x.DeletedBy = Model.DeletedBy);

                            if (detailes.Details.Count() > 0)
                                Service.UpdateDetails(detailes.Details);
                            
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
                    bool flag = false;
                    List<Prod_BasicUnits> Prod_BasicUnitss = Service.GetDetails(x => x.ParentUnit == id);
                    flag = Service.DeleteList(Prod_BasicUnitss);
                    flag = Service.Delete(id);

                    dbTransaction.Commit();
                    return Ok(flag);
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
