//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Inv.DAL.Domain
{
    using System;
    using System.Collections.Generic;
    
    public partial class MS_StockRecriptMultiAccounts
    {
        public int StockRecMultiAccountId { get; set; }
        public Nullable<int> StockRecId { get; set; }
        public string DBTableName { get; set; }
        public Nullable<int> DBTableId { get; set; }
        public string AccountTableName { get; set; }
        public Nullable<byte> RectSourceType { get; set; }
        public Nullable<int> RectSourceTypeId { get; set; }
        public Nullable<decimal> RectSourceBalance { get; set; }
        public Nullable<int> AccountId { get; set; }
        public Nullable<int> CostCenterId { get; set; }
        public Nullable<int> CostCenterId1 { get; set; }
        public Nullable<int> CostCenterId2 { get; set; }
        public Nullable<int> CostCenterId3 { get; set; }
        public Nullable<int> CostCenterId4 { get; set; }
        public Nullable<int> AId { get; set; }
        public Nullable<int> CurrencyId { get; set; }
        public Nullable<decimal> Rate { get; set; }
        public Nullable<decimal> DebitCurrency { get; set; }
        public Nullable<decimal> CreditCurrency { get; set; }
        public Nullable<decimal> DebitLocal { get; set; }
        public Nullable<decimal> CreditLocal { get; set; }
        public string Remarks { get; set; }
    }
}
