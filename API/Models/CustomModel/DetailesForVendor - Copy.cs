using Inv.DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Inv.API.Models.CustomModel
{
    public class DetailesAssetCard
    {
        public MS_Vendor Vendor { get; set; }
        public List<Ms_VendorBranches> branches { get; set; }
        public List<Ms_VendorContacts> contacts { get; set; }
        public List<Ms_VendorUsers> users { get; set; }
        public List<CustomVendorUsers> CustomUsers { get; set; }
        public List<Cal_VendAccounts> accounts { get; set; }
    }

    public class DetailesForEmployees
    {
        public Hr_Employees Model { get; set; }
        public List<Cal_EmpAccounts> accounts { get; set; }
    }
}