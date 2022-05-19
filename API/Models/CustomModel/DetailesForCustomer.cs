using Inv.DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Inv.API.Models.CustomModel
{
    public class DetailesForCustomer
    {
        public MS_Customer Customer { get; set; }
        public List<Ms_CustomerBranches> branches { get; set; }
        public List<Ms_CustomerContacts> contacts { get; set; }
        public List<Ms_CusromerUsers> users { get; set; }
        public List<CustomCusromerUsers> CustomUsers { get; set; }
        public List<Cal_CustAccounts> accounts { get; set; }
    }
}