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
    
    public partial class Cod_InsurCovTypes
    {
        public int InsurCovTypeId { get; set; }
        public int Code { get; set; }
        public string DescA { get; set; }
        public string DescE { get; set; }
        public Nullable<int> AId { get; set; }
        public Nullable<decimal> CoverPercent { get; set; }
        public string CreatedBy { get; set; }
        public Nullable<System.DateTime> CreatedAt { get; set; }
        public string UpdatedBy { get; set; }
        public Nullable<System.DateTime> UpdatedAt { get; set; }
        public string DeletedBy { get; set; }
        public Nullable<System.DateTime> DeletedAt { get; set; }
        public string RemarksA { get; set; }
        public string RemarksE { get; set; }
    }
}
