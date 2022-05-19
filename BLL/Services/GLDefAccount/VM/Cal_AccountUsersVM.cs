using Inv.DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Inv.BLL.Services.GLDefAccount.VM
{
    public class Cal_AccountUsersVM
    {
        public int AccUserId { get; set; }
        public int? AccountId { get; set; }
        public int? UserId { get; set; }
        //public string FirstName { get; set; }
        //public string LastName { get; set; }
        public string USERNAME { get; set; }
        public string Remarks1 { get; set; }
        public string Remarks2 { get; set; }
        public bool? TranAndView { get; set; }
    }
}