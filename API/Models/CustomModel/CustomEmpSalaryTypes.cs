using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Inv.API.Models.CustomModel
{
    public class CustomEmpSalaryTypes
    {
        public int EmpSalaryTypesId { get; set; }
        public string SalaryCode { get; set; }
        public string Name1 { get; set; }
        public string Name2 { get; set; }
        public decimal? SalaryValu { get; set; }
        public int? EmpId { get; set; }
        public int? SalaryTypId { get; set; }
        public string DepitAccountCode { get; set; }
        public string DebitAccountNameA { get; set; }
        public string DebitAccountNameE { get; set; }
        public string CreditAccountCode { get; set; }
        public string CreditAccountNameA { get; set; }
        public string CreditAccountNameE { get; set; }

        public string DepitCostCode { get; set; }
        public string DebitCostNameA { get; set; }
        public string DebitCostNameE { get; set; }
        public string CrediCostCode { get; set; }
        public string CrediCostNameA { get; set; }
        public string CrediCostNameE { get; set; }
    }
}