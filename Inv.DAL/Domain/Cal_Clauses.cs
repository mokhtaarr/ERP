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
    
    public partial class Cal_Clauses
    {
        public int ClausesId { get; set; }
        public Nullable<int> AccountId { get; set; }
        public string ClausesCode { get; set; }
        public string NameAr { get; set; }
        public string NameEn { get; set; }
        public Nullable<decimal> Percentage { get; set; }
        public Nullable<decimal> Debtor { get; set; }
        public Nullable<decimal> Creditor { get; set; }
        public Nullable<decimal> Balance { get; set; }
        public string CreatedBy { get; set; }
        public Nullable<System.DateTime> CreatedAt { get; set; }
        public string UpdateBy { get; set; }
        public Nullable<System.DateTime> UpdateAt { get; set; }
        public string DeletedBy { get; set; }
        public Nullable<System.DateTime> DeletedAt { get; set; }
    }
}
