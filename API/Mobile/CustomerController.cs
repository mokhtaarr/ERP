using Inv.DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web.Http;
using Inv.API.Tools;
using Inv.BLL.Services.MSCustomer;
using Inv.API.ViewModel;
using Inv.Static.Resources;
using Inv.API.Mobile;
using Inv.BLL.Services.GUSERS;

namespace Inv.API.Controllers
{
    public class CustomerController : BaseController
    {
        private readonly IMS_CustomerService Service;
        private readonly IG_USERSService UserService ;
        public CustomerController(IMS_CustomerService _service, IG_USERSService userService)
        {
            this.Service = _service;
            this.UserService = userService;
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetAll()
        {
            List<MS_Customer> MS_Customers = Service.GetAll().OrderBy(x => x.CustomerCode).ToList();
            return Ok(new MobileBaseResponse(MS_Customers));
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetById(int id)
        {
            MS_Customer MS_Customers = Service.GetById(id);
            return Ok(new MobileBaseResponse(MS_Customers));
        }

        [HttpPost, AllowAnonymous]
        public IHttpActionResult Insert([FromBody] MS_Customer customer, string token)
        {
            using (var dbTransaction = db.Database.BeginTransaction())
            {
                try
                {
                    G_USERS userExist = UserService.CheckIfUserExist(x=>x.TokenMobid == token);
                    if (userExist != null)
                    {
                        if (customer != null)
                        {
                            if ((customer.CustomerCode != null && customer.CustomerCode != "") && (customer.CustomerDescA != null && customer.CustomerDescA != ""))
                            {
                                customer.CreatedAt = DateTime.Now;
                                customer.CreatedBy = userExist.UserId.ToString();
                                MS_Customer Customer = Service.Insert(customer);
                                dbTransaction.Commit();
                                MobileBaseResponse.SuccessMessage = Resource.SaveSucc;
                                return Ok(new MobileBaseResponse(Customer));
                            }
                            else
                                return Ok(new MobileBaseResponse(HttpStatusCode.ExpectationFailed, Resource.DataMustBeEntered));
                        }
                        else return Ok(new MobileBaseResponse(HttpStatusCode.ExpectationFailed, Resource.ModelNull));
                    }
                    else return Ok(new MobileBaseResponse(HttpStatusCode.NoContent, Resource.ReLogin));
                }
                catch (Exception ex)
                {
                    dbTransaction.Rollback();
                    return Ok(new MobileBaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
                }
            }
        }

        [HttpPost, AllowAnonymous]
        public IHttpActionResult Update([FromBody] MS_Customer customer, string token)
        {
            using (var dbTransaction = db.Database.BeginTransaction())
            {
                try
                {
                    G_USERS userExist = UserService.CheckIfUserExist(x => x.TokenMobid == token);
                    if (userExist != null)
                    {
                        if (customer != null)
                        {
                            if ((customer.CustomerCode != null || customer.CustomerCode != "") && (customer.CustomerDescA != null && customer.CustomerDescA != "") && customer.CustomerId != 0)
                            {
                                customer.UpdateAt = DateTime.Now;
                                customer.UpdateBy = userExist.UserId.ToString();
                                MS_Customer Customer = Service.Update(customer);
                                dbTransaction.Commit();
                                MobileBaseResponse.SuccessMessage = Resource.EditSucc;
                                return Ok(new MobileBaseResponse(Customer));
                            }
                            else
                                return Ok(new MobileBaseResponse(HttpStatusCode.ExpectationFailed, Resource.DataMustBeEntered));
                        }
                        else return Ok(new MobileBaseResponse(HttpStatusCode.ExpectationFailed, Resource.ModelNull));
                    }
                    else return Ok(new MobileBaseResponse(HttpStatusCode.NoContent, Resource.ReLogin));
                }
                catch (Exception ex)
                {
                    dbTransaction.Rollback();
                    return Ok(new MobileBaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
                }
            }
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult Delete(int id, string token)
        {
            using (var dbTransaction = db.Database.BeginTransaction())
            {
                try
                {
                    G_USERS userExist = UserService.CheckIfUserExist(x => x.TokenMobid == token);
                    if (userExist != null)
                    {
                        bool res = Service.Delete(id);
                        dbTransaction.Commit();
                        MobileBaseResponse.SuccessMessage = Resource.DeleteSucc;
                        return Ok(new MobileBaseResponse(res));
                    }
                    else return Ok(new MobileBaseResponse(HttpStatusCode.NoContent, Resource.ReLogin));
                }
                catch (Exception ex)
                {
                    dbTransaction.Rollback();
                    return Ok(new MobileBaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
                }
            }
        }

        public MS_Customer GetByCode(string code)
        {
            MS_Customer MS_Customers = Service.GetAll(x=>x.CustomerCode == code).FirstOrDefault();
            return MS_Customers;
        }
    }
}
