using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Inv.WebUI.Models
{
    public class AccountingTreeVm
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string EnName { get; set; }
        public string Code { get; set; }

        public int FinancialStatementID { get; set; }

        public int? ParentID { get; set; }

        public int AccountTypeId { get; set; }
    }
}