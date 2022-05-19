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
    
    public partial class Ms_AdjustMents
    {
        public int AdjustId { get; set; }
        public Nullable<int> StoreId { get; set; }
        public Nullable<byte> CurrencyId { get; set; }
        public Nullable<int> BookId { get; set; }
        public Nullable<int> TermId { get; set; }
        public Nullable<int> PurInvId { get; set; }
        public Nullable<int> InvId { get; set; }
        public Nullable<int> RetPurchId { get; set; }
        public Nullable<int> RetSaleId { get; set; }
        public Nullable<int> RectId { get; set; }
        public Nullable<int> PayId { get; set; }
        public Nullable<int> DocBookId { get; set; }
        public Nullable<int> FinancialIntervalsId { get; set; }
        public Nullable<int> AId { get; set; }
        public int TrNo { get; set; }
        public string ManualTrNo { get; set; }
        public Nullable<System.DateTime> TrDate { get; set; }
        public Nullable<bool> AdjType { get; set; }
        public Nullable<bool> AdjSourcType { get; set; }
        public Nullable<int> AdjSourcTypeId { get; set; }
        public Nullable<decimal> Value { get; set; }
        public string Remarks { get; set; }
        public Nullable<decimal> TotalCheques { get; set; }
        public Nullable<decimal> TotalInvoices { get; set; }
        public Nullable<decimal> NotPaidInvoices { get; set; }
        public Nullable<decimal> DifferenceInvoices { get; set; }
        public Nullable<decimal> ResourceBalance { get; set; }
        public Nullable<bool> IsPaid { get; set; }
        public Nullable<int> PaidDocId { get; set; }
        public Nullable<decimal> NotPaid { get; set; }
        public Nullable<int> TermCostCenterId { get; set; }
        public Nullable<decimal> TermCostCenterValue { get; set; }
        public string CreatedBy { get; set; }
        public Nullable<System.DateTime> CreatedAt { get; set; }
        public string UpdateBy { get; set; }
        public Nullable<System.DateTime> UpdateAt { get; set; }
        public string DeletedBy { get; set; }
        public Nullable<System.DateTime> DeletedAt { get; set; }
        public Nullable<bool> IsPosted { get; set; }
        public string Postedby { get; set; }
        public Nullable<System.DateTime> PostedDate { get; set; }
    }
}
