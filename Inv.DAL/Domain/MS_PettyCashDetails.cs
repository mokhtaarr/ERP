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
    
    public partial class MS_PettyCashDetails
    {
        public int PettycashDetailId { get; set; }
        public Nullable<int> PettycashId { get; set; }
        public Nullable<int> ItemCardId { get; set; }
        public Nullable<int> CustomerId { get; set; }
        public Nullable<int> VendorId { get; set; }
        public Nullable<int> EmpId { get; set; }
        public Nullable<int> ExpensesId { get; set; }
        public Nullable<int> AccountId { get; set; }
        public Nullable<int> PurInvId { get; set; }
        public Nullable<int> RetSaleId { get; set; }
        public Nullable<int> CostCenterId { get; set; }
        public Nullable<int> UnitId { get; set; }
        public Nullable<decimal> UnitRate { get; set; }
        public Nullable<System.DateTime> ActionDate { get; set; }
        public Nullable<decimal> QtyBeforRate { get; set; }
        public Nullable<decimal> Quantity { get; set; }
        public Nullable<byte> ItemType { get; set; }
        public Nullable<bool> IsStockRelated { get; set; }
        public Nullable<decimal> PaidPrice { get; set; }
        public Nullable<decimal> PriceAfterRate { get; set; }
        public Nullable<bool> IsPurchase { get; set; }
        public Nullable<bool> IsReturnSales { get; set; }
        public string Remark1 { get; set; }
        public string Remark2 { get; set; }
        public string Remark3 { get; set; }
    }
}
