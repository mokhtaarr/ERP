using Inv.API.Models;
using Inv.API.Models.CustomModel;
using Inv.API.Tools;
using Inv.BLL.Services.ProdEquipments;
using Inv.DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Inv.API.Controllers
{
    public class Prod_EquipmentsController : BaseController
    {
        private readonly IProd_EquipmentsService Service;
       
        public Prod_EquipmentsController(IProd_EquipmentsService _Prod_EquipmentsService)
        {
            this.Service = _Prod_EquipmentsService;
           
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetAll()
        {
            List<Prod_Equipments> Prod_Equipmentss = Service.GetAll().OrderBy(x => x.EquipCode).ToList();
            return Ok(new BaseResponse(Prod_Equipmentss));
        }

        [HttpGet, AllowAnonymous]
        public List<Prod_Equipments> GetAllIds()
        {
            List<Prod_Equipments> Prod_Equipmentss = Service.GetAll().OrderBy(x => x.EquipCode).ToList()
                .Select(x => new Prod_Equipments { EquipId = x.EquipId, EquipCode = x.EquipCode }).ToList();
            return Prod_Equipmentss;
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetById(int id)
        {
            Prod_Equipments model = Service.GetById(id);
            return Ok(new BaseResponse(model));
        }

        [HttpPost, AllowAnonymous]
        public IHttpActionResult Insert([FromBody] Prod_Equipments model)
        {
            using (var dbTransaction = db.Database.BeginTransaction())
            {
                try
                {
                    if (model != null)
                    {
                        Prod_Equipments Model = Service.Insert(model);
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
        public IHttpActionResult Update([FromBody] Prod_Equipments model)
        {
            using (var dbTransaction = db.Database.BeginTransaction())
            {
                try
                {
                    if (model != null)
                    {
                        Prod_Equipments Model = Service.Update(model);
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
