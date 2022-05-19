using Inv.DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Inv.API.Models.CustomModel
{
    public class CustomJurnalDetailes
    {
        public int? JurnalDetailId { get; set; }
        public int? JurnalId { get; set; }
        public int? AccountId { get; set; }
        public int? CustAccountId { get; set; }
        public int? VendAccountId { get; set; }
        public int? EmpAccountId { get; set; }
        public int? AssetAccountId { get; set; }
        public int? BusinessPartnerAccId { get; set; }
        public int? CostCenterId1 { get; set; }
        public int? CurrencyId { get; set; }
        public string AccountType { get; set; }
        public string AccountCode { get; set; }
        public string SubAccountCode { get; set; }
        public string AccountNameA { get; set; }
        public string AccountNameE { get; set; }
        public decimal? CurrencyCreditor { get; set; }
        public decimal? CurrencyDebtor { get; set; }
        public string CodeCurrency { get; set; }
        public string NameCurrency { get; set; }
        public decimal? Rate { get; set; }
        public decimal? Creditor { get; set; }
        public decimal? Debtor { get; set; }
        public string Descriptions { get; set; }
        public string Remarks { get; set; }
        public int? CostCenterCode { get; set; }
        public string CostCenterNameA { get; set; }
        public string CostCenterNameE { get; set; }
        public string StatusFlag { get; set; }
    }
}