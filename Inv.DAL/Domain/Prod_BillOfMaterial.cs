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
    
    public partial class Prod_BillOfMaterial
    {
        public int BillOfMaterialId { get; set; }
        public string BOMCode { get; set; }
        public string Name1 { get; set; }
        public string Name2 { get; set; }
        public Nullable<int> ItemCardId { get; set; }
        public Nullable<int> ItemAtrribBatchId { get; set; }
        public Nullable<int> UnitId { get; set; }
        public Nullable<decimal> UnitRate { get; set; }
        public string BarCode { get; set; }
        public Nullable<decimal> QtyBeforRate { get; set; }
        public Nullable<decimal> Quantity { get; set; }
        public Nullable<decimal> ScrapQtyBeforRate { get; set; }
        public Nullable<decimal> ScrapQuantity { get; set; }
        public Nullable<bool> IsScrapCost { get; set; }
        public Nullable<decimal> ScrapCostPercent { get; set; }
        public Nullable<decimal> OverflowQtyBeforRate { get; set; }
        public Nullable<decimal> OverflowQuantity { get; set; }
        public string CreatedBy { get; set; }
        public Nullable<System.DateTime> CreatedAt { get; set; }
        public string UpdateBy { get; set; }
        public Nullable<System.DateTime> UpdateAt { get; set; }
        public string DeletedBy { get; set; }
        public Nullable<System.DateTime> DeletedAt { get; set; }
    }
}
