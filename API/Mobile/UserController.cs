using Inv.API.Models;
using Inv.API.Tools;
using Inv.DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Inv.BLL.Services.GUSERS;
using Inv.API.ViewModel;

namespace Inv.API.Mobile
{
    public class UserController : BaseController
    {
        private readonly IG_USERSService service;

        public UserController(IG_USERSService _G_USERSController)
        {
            this.service = _G_USERSController;
        }

        // GET: Login
        [HttpPost, AllowAnonymous]
        public IHttpActionResult Login(string UserCode, string Password)
        {
            G_USERS user = new G_USERS();
            List<G_USERS> users = service.GetAll(x => x.USER_CODE == UserCode).ToList();

            if (users.Count == 0)
            {
                return Ok(new MobileBaseResponse(HttpStatusCode.NotFound,""));  // err on user 
            }
            if (users[0].USER_PASSWORD == Password || users[0].USER_ACTIVE != true)
            {
                string Guid = UserTools.GenerateGuid();
                string EnGuid = "HGFD-" + UserTools.Encrypt(Guid, "Business-Systems");
                users[0].TokenMobid = EnGuid;
                if (users[0].FirstLogin == null)
                    users[0].FirstLogin = DateTime.Now;
                users[0].LastLogin = DateTime.Now;
                // update user 
                user = service.Update(users[0]);
                //
                user.TokenMobid = Guid;
                UserVM userVM = new UserVM()
                {
                    userName = user.USER_NAME,
                    token = EnGuid,
                    token_type = "HGFD-",
                };
                return Ok(new MobileBaseResponse(userVM));
            }
            else
            {
                return Ok(new MobileBaseResponse(HttpStatusCode.NotFound, ""));  // error in pass or active 
            }
        }

        [HttpPost, AllowAnonymous]
        public bool CheckIfUserExist(string tokin)
        {
            bool flag = true;
            try
            {
                var user  = service.CheckIfUserExist(x => x.TokenMobid == tokin);
                if (user == null)
                    flag = false;
            }
            catch (Exception)
            {
                flag = false;
            }
            return flag;
        }
    }
}