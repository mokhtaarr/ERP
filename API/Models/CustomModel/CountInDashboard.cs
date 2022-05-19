using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Inv.API.Models.CustomModel
{
    public class CountInDashboard
    {
        public int ReceiptNoteCount { get; set; }
        public int PaymentNoteCount { get; set; }
        public int CustomerCount { get; set; }
        public int VendorCount { get; set; }
        public int UsersCount { get; set; }
    }
}