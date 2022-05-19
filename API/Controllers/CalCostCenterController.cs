using Inv.API.Models;
using Inv.DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Inv.API.Controllers;
using Inv.API.Tools;
using System.Web.Http.Cors;
using System.Data.SqlClient;
using System.Data.Entity;
using Inv.DAL.Repository;
using Newtonsoft.Json;
using Inv.BLL.Services.CalCostCenters;

namespace Inv.API.Controllers
{
    public class CalCostCenterController : BaseController
    {
        private readonly ICalCostCentersService service;

        public CalCostCenterController(ICalCostCentersService _Service)
        {
            this.service = _Service;
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetAll()
        {
            List<Cal_CostCenters> costCenters = service.GetAll().Select(x=> new Cal_CostCenters { 
                CostCenterId = x.CostCenterId,
                mainCostCenterId = x.mainCostCenterId,
                CostType = x.CostType,
                CostCenterCode = x.CostCenterCode,
                CostCenterNameA = x.CostCenterNameA,
                CostCenterNameE = x.CostCenterNameE
            }).OrderBy(x=>x.CostCenterCode).ThenBy(x=>x.CostCenterLevel).ToList();
            return Ok(new BaseResponse(costCenters));
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetById(int id)
        {
            Cal_CostCenters accountChart = service.GetById(id);
            return Ok(new BaseResponse(accountChart));
        }

        [HttpPost, AllowAnonymous]
        public IHttpActionResult Insert(Cal_CostCenters model)
        {
            using (var dbTransaction = db.Database.BeginTransaction())
            {
                try
                {
                    Cal_CostCenters accountChart = service.Insert(model);
                    dbTransaction.Commit();
                    return Ok(new BaseResponse(accountChart));
                }
                catch (Exception ex)
                {
                    dbTransaction.Rollback();
                    return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
                }
            }
        }

        [HttpPost, AllowAnonymous]
        public IHttpActionResult Update(Cal_CostCenters model)
        {
            using (var dbTransaction = db.Database.BeginTransaction())
            {
                try
                {
                    Cal_CostCenters accountChart = service.Update(model);
                    dbTransaction.Commit();
                    return Ok(new BaseResponse(accountChart));
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
                    service.Delete(id);
                    dbTransaction.Commit();
                    return Ok(new BaseResponse(true));
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
