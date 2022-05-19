using Inv.API.Models;
using Inv.API.Models.CustomModel;
using Inv.API.Tools;
using Inv.BLL.Services.SrVehicle;
using Inv.DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Inv.API.Controllers
{
    public class Sr_VehicleShapesController : BaseController
    {
        private readonly ISr_VehicleShapesService Service;
       
        public Sr_VehicleShapesController(ISr_VehicleShapesService _Sr_VehicleShapesService)
        {
            this.Service = _Sr_VehicleShapesService;
           
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetAll()
        {
            List<Sr_VehicleShapes> Sr_VehicleShapess = Service.GetAll().OrderBy(x => x.ShapeCode).ToList();
            return Ok(new BaseResponse(Sr_VehicleShapess));
        }

        [HttpGet, AllowAnonymous]
        public List<Sr_VehicleShapes> GetAllIds()
        {
            List<Sr_VehicleShapes> Sr_VehicleShapess = Service.GetAll().OrderBy(x => x.ShapeCode).ToList()
                .Select(x => new Sr_VehicleShapes { VehicleShapeId = x.VehicleShapeId, ShapeCode = x.ShapeCode }).ToList();
            return Sr_VehicleShapess;
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetById(int id)
        {
            Sr_VehicleShapes model = Service.GetById(id);
            return Ok(new BaseResponse(model));
        }

        [HttpPost, AllowAnonymous]
        public IHttpActionResult Insert([FromBody] Sr_VehicleShapes model)
        {
            using (var dbTransaction = db.Database.BeginTransaction())
            {
                try
                {
                    if (model != null)
                    {
                        Sr_VehicleShapes Model = Service.Insert(model);
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
        public IHttpActionResult Update([FromBody] Sr_VehicleShapes model)
        {
            using (var dbTransaction = db.Database.BeginTransaction())
            {
                try
                {
                    if (model != null)
                    {
                        Sr_VehicleShapes Model = Service.Update(model);
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
