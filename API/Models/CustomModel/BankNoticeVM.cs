using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Inv.API.Models.CustomModel
{
    public class BankNoticeVM
    {
        public int? BankNoticId { get; set; }
        public string DocTrNo { get; set; }
        public int? RefNo { get; set; }
        public DateTime TrDate { get; set; }
    }
}