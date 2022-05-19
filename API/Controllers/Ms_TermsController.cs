using Inv.API.Models;
using Inv.DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web.Http;
using Inv.API.Tools;
using Inv.BLL.Services.MsTerms;
using Inv.API.Models.CustomModel;

namespace Inv.API.Controllers
{
    public class Ms_TermsController : BaseController
    {
        private readonly IMs_TermsService Service;
        public Ms_TermsController(IMs_TermsService _service)
        {
            this.Service = _service;
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetAll()
        {
            List<Ms_Terms> Ms_Termss = GetAllIds();
            //List<Ms_Terms> Ms_Termss = Service.GetAll().OrderBy(x => x.TermCode).ToList();
            return Ok(new BaseResponse(Ms_Termss));
        }

        public List<Ms_Terms> GetAllIds()
        {
            List<Ms_Terms> Ms_Termss = Service.GetAll().ToList().Select(x => new Ms_Terms { TermId = x.TermId,TermCode = x.TermCode }).OrderBy(x => x.TermType).ToList();
            return Ms_Termss;
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetById(int id)
        {
            TermsHeaderAndDetails terms = new TermsHeaderAndDetails()
            {
                Terms= Service.GetById(id),
                TermsDetails = Service.GetTermsDetailsById(x => x.TermId == id),
            };
            return Ok(new BaseResponse(terms));
        }

        [HttpPost, AllowAnonymous]
        public IHttpActionResult Insert([FromBody] TermsHeaderAndDetails terms)
        {
            using (var dbTransaction = db.Database.BeginTransaction())
            {
                try
                {
                    if (terms != null)
                    {
                        if (terms.Terms != null)
                        {
                            Ms_Terms Model = Service.Insert(terms.Terms);
                            terms.TermsDetails.TermId = Model.TermId;
                            Service.InsertDetails(terms.TermsDetails);
                            dbTransaction.Commit();
                            return Ok(new BaseResponse(terms));
                        }
                        return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed));
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
        public IHttpActionResult Update([FromBody] TermsHeaderAndDetails terms)
        {
            using (var dbTransaction = db.Database.BeginTransaction())
            {
                try
                {
                    if (terms != null)
                    {
                        Ms_Terms Model = Service.Update(terms.Terms);
                        if (terms.TermsDetails != null)
                        {
                            terms.TermsDetails.TermId = Model.TermId;
                            if(terms.TermsDetails.TermDetailId != 0)
                                Service.UpdateDetails(terms.TermsDetails);
                            else
                                Service.InsertDetails(terms.TermsDetails);
                        }
                        dbTransaction.Commit();
                         return Ok(new BaseResponse(terms));
                    }
                    return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed));
                }
                catch (Exception ex)
                {
                    dbTransaction.Rollback();
                    return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
                }
            }
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult Delete(int id,int TermDetailsId)
        {
            using (var dbTransaction = db.Database.BeginTransaction())
            {
                try
                {
                    bool res = Service.Delete(id);
                    bool resDeatails = Service.DeleteTermsDetails(TermDetailsId);
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
