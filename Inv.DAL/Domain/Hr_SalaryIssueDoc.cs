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
    
    public partial class Hr_SalaryIssueDoc
    {
        public int SalaryIssuDocId { get; set; }
        public Nullable<int> StoreId { get; set; }
        public Nullable<int> BookId { get; set; }
        public Nullable<int> TermId { get; set; }
        public Nullable<int> FinancialIntervalsId { get; set; }
        public Nullable<int> AId { get; set; }
        public Nullable<int> CurrencyId { get; set; }
        public Nullable<int> EmpId { get; set; }
        public Nullable<int> PeriodTableId { get; set; }
        public Nullable<int> PeriodTablDetailId { get; set; }
        public int TrNo { get; set; }
        public string ManualTrNo { get; set; }
        public Nullable<System.DateTime> TrDate { get; set; }
        public Nullable<decimal> TotalAddValue { get; set; }
        public Nullable<decimal> TotalDeduction { get; set; }
        public Nullable<decimal> TotalOtherValue { get; set; }
        public Nullable<decimal> NetValue { get; set; }
        public Nullable<decimal> Rate { get; set; }
        public string Remarks1 { get; set; }
        public string Remarks2 { get; set; }
        public string Remarks3 { get; set; }
        public Nullable<bool> Closed { get; set; }
        public Nullable<bool> IsPrinted { get; set; }
        public Nullable<bool> IsDelivered { get; set; }
        public Nullable<int> TermCostCenterId { get; set; }
        public Nullable<decimal> TermCostCenterValue { get; set; }
        public Nullable<bool> IsPosted { get; set; }
        public string Postedby { get; set; }
        public Nullable<System.DateTime> PostedDate { get; set; }
        public Nullable<System.DateTime> CloseDate { get; set; }
        public Nullable<System.DateTime> UncloseDate { get; set; }
        public Nullable<int> ClosedBy { get; set; }
        public Nullable<int> UnclosedBy { get; set; }
        public Nullable<int> PermPrinted { get; set; }
        public Nullable<System.DateTime> PermPrintedAt { get; set; }
        public string CreatedBy { get; set; }
        public Nullable<System.DateTime> CreatedAt { get; set; }
        public string UpdateBy { get; set; }
        public Nullable<System.DateTime> UpdateAt { get; set; }
        public string DeletedBy { get; set; }
        public Nullable<System.DateTime> DeletedAt { get; set; }
    }
}
