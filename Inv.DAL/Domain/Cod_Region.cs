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
    
    public partial class Cod_Region
    {
        public int RegionId { get; set; }
        public int Code { get; set; }
        public string NameA { get; set; }
        public string NameE { get; set; }
        public string RemarksA { get; set; }
        public string RemarksE { get; set; }
        public Nullable<int> AId { get; set; }
        public Nullable<int> CountryId { get; set; }
        public string Lat { get; set; }
        public string Lng { get; set; }
        public Nullable<byte> MinZoom { get; set; }
        public Nullable<byte> MaxZoom { get; set; }
        public Nullable<byte> CurrentZoom { get; set; }
        public string CreatedBy { get; set; }
        public Nullable<System.DateTime> CreatedAt { get; set; }
        public string UpdatedBy { get; set; }
        public Nullable<System.DateTime> UpdatedAt { get; set; }
        public string DeletedBy { get; set; }
        public Nullable<System.DateTime> DeletedAt { get; set; }
    }
}
