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
    
    public partial class Prod_JobOrderEquipment
    {
        public int JobEquipId { get; set; }
        public Nullable<int> JobOrderId { get; set; }
        public Nullable<int> JOrderEquipDocDetailId { get; set; }
        public Nullable<int> JOrderEquipDocId { get; set; }
        public Nullable<int> TaskEquipJoinId { get; set; }
        public Nullable<int> EquipId { get; set; }
        public Nullable<int> EquipProfileId { get; set; }
        public Nullable<int> TaskId { get; set; }
        public Nullable<int> BillOfMaterialId { get; set; }
        public Nullable<int> RequestedNumber { get; set; }
        public Nullable<int> RealNumber { get; set; }
        public Nullable<decimal> TimeBeforFormat { get; set; }
        public Nullable<byte> TimeUnit { get; set; }
        public Nullable<decimal> StandardHourlyCost { get; set; }
        public Nullable<System.DateTime> FromTime { get; set; }
        public Nullable<System.DateTime> ToTime { get; set; }
        public Nullable<decimal> Minutes { get; set; }
        public Nullable<decimal> Hours { get; set; }
        public Nullable<decimal> Days { get; set; }
        public Nullable<decimal> Months { get; set; }
        public string Remarks { get; set; }
        public string CreatedBy { get; set; }
        public Nullable<System.DateTime> CreatedAt { get; set; }
        public string UpdateBy { get; set; }
        public Nullable<System.DateTime> UpdateAt { get; set; }
    }
}
