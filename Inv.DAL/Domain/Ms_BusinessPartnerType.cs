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
    
    public partial class Ms_BusinessPartnerType
    {
        public int BsPartnerTypeId { get; set; }
        public string PartnerTypeCode { get; set; }
        public string PartnerTypeDescA { get; set; }
        public string PartnerTypeDescE { get; set; }
        public Nullable<int> PartnerTypeParent { get; set; }
        public Nullable<int> PartnerTypeLevel { get; set; }
        public string Remarks { get; set; }
        public string CreatedBy { get; set; }
        public Nullable<System.DateTime> CreatedAt { get; set; }
        public string UpdateBy { get; set; }
        public Nullable<System.DateTime> UpdateAt { get; set; }
        public string DeletedBy { get; set; }
        public Nullable<System.DateTime> DeletedAt { get; set; }
    }
}
