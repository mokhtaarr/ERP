using Inv.API.Models;
using Inv.DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web.Http;
using Inv.API.Tools;
using Inv.BLL.Services.MSCustomer;
using Inv.BLL.Services.MsCustomerTypes;
using Inv.API.Models.CustomModel;
using Inv.BLL.Services.CalJurnalEntry;
using System.Data.SqlClient;
using Inv.API.Enum;

namespace Inv.API.Controllers
{
    public class DashboardController : BaseController
    {
        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetCountInDashboard()
        {
            CountInDashboard Dashboard = new CountInDashboard();
            string User = @"select count(*) as UsersCount from G_USERS ",
                PaymentNote = "select count(*) as PaymentNoteCount from MS_PaymentNote",
                ReceiptNote = "select count(*) as ReceiptNoteCount from Ms_ReceiptNote",
                Customer ="select count(*) as CustomerCount from MS_Customer",
                Vendor = "select count(*) as VendorCount from MS_Vendor";

            Dashboard.UsersCount = db.Database.SqlQuery<int>(User).FirstOrDefault();
            Dashboard.PaymentNoteCount = db.Database.SqlQuery<int>(PaymentNote).FirstOrDefault();
            Dashboard.ReceiptNoteCount = db.Database.SqlQuery<int>(ReceiptNote).FirstOrDefault();
            Dashboard.CustomerCount = db.Database.SqlQuery<int>(Customer).FirstOrDefault();
            Dashboard.VendorCount = db.Database.SqlQuery<int>(Vendor).FirstOrDefault();

            return Ok(new BaseResponse(Dashboard));
        }
    }
}
