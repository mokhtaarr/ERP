using Inv.API.Models;
using Inv.API.Tools;
using Inv.DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Inv.BLL.Services.SysFinancialYears;
using Inv.API.Models.CustomModel;

namespace Inv.API.Controllers
{
    public class Sys_FinancialYearsController : BaseController
    {
        private readonly ISys_FinancialYearsService Service;

        public Sys_FinancialYearsController(ISys_FinancialYearsService _Sys_FinancialYearsService)
        {
            this.Service = _Sys_FinancialYearsService;

        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetAll()
        {
            List<Sys_FinancialYears> Ms_Termss = this.GetAllIds();
            return Ok(new BaseResponse(Ms_Termss));
        }

        [HttpGet, AllowAnonymous]
        public List<Sys_FinancialYears> GetAllIds()
        {
            List<Sys_FinancialYears> FinancialYears = Service.GetAll().OrderBy(x => x.FinancialYearsCode).ToList()
                .Select(x => new Sys_FinancialYears
                {
                    FinancialYearsId = x.FinancialYearsId,
                    FinancialYearsCode = x.FinancialYearsCode,
                    FinancialYearNameA = x.FinancialYearNameA,
                    FinancialYearNameE = x.FinancialYearNameE,
                }).ToList();
            return FinancialYears;
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetFinancialIntervals(int id)
        {
            List<Sys_FinancialIntervals> Intervals = Service.GetFinancialIntervals(x=>x.FinancialYearId == id);
            return Ok(new BaseResponse(Intervals));
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetById(int id)
        {
            Sys_FinancialYears model = Service.GetById(id);
            return Ok(new BaseResponse(model));
        }

        [HttpPost, AllowAnonymous]
        public IHttpActionResult Insert([FromBody] FinancialYearsDetails Details)
        {
            using (var dbTransaction = db.Database.BeginTransaction())
            {
                try
                {
                    if (Details.Model != null)
                    {
                        Sys_FinancialYears Model = Service.Insert(Details.Model);
                        Details.Intervals.ForEach(x => x.FinancialYearId = Details.Model.FinancialYearsId);
                        Service.InsertList(Details.Intervals);

                        dbTransaction.Commit();
                        return Ok(new BaseResponse(Details.Model));
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
        public IHttpActionResult Update([FromBody] FinancialYearsDetails Details)
        {
            using (var dbTransaction = db.Database.BeginTransaction())
            {
                try
                {
                    if (Details.Model != null)
                    {
                        //Details = ConvertDate(Details);
                        Sys_FinancialYears Model = Service.Update(Details.Model);
                        Details.Intervals.ForEach(x => x.FinancialYearId = Details.Model.FinancialYearsId);

                        Service.UpdateFinancialIntervals(Details.Intervals);
                        dbTransaction.Commit();
                        return Ok(new BaseResponse(Details.Model));
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
                    List<Sys_FinancialIntervals> financialIntervals = Service.GetFinancialIntervals(x => x.FinancialYearId == id);
                    Service.DeleteList(financialIntervals);

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


        public FinancialYearsDetails ConvertDate(FinancialYearsDetails Details)
        {
            string from = funcationSharedController.ConvertDateCalendar(Details.Model.StartingFrom),
                to = funcationSharedController.ConvertDateCalendar(Details.Model.EndTo),
                close = funcationSharedController.ConvertDateCalendar(Details.Model.ClosingDate),
                CreatedAt = funcationSharedController.ConvertDateCalendar(Details.Model.CreatedAt),
                UpdatedAt = funcationSharedController.ConvertDateCalendar(Details.Model.UpdatedAt),
                DeletedAt = funcationSharedController.ConvertDateCalendar(Details.Model.DeletedAt);

            Details.Model.StartingFrom = funcationSharedController.ConvertToDate(from, "dd/MM/yyyy");
            Details.Model.EndTo = funcationSharedController.ConvertToDate(to, "dd/MM/yyyy");
            Details.Model.ClosingDate = funcationSharedController.ConvertToDate(close, "dd/MM/yyyy");
            Details.Model.CreatedAt = funcationSharedController.ConvertToDate(CreatedAt, "dd/MM/yyyy");
            Details.Model.UpdatedAt = funcationSharedController.ConvertToDate(UpdatedAt, "dd/MM/yyyy");
            Details.Model.DeletedAt = funcationSharedController.ConvertToDate(DeletedAt, "dd/MM/yyyy");


            return Details;
        }
    }
}
