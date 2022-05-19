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
    
    public partial class Repair_JobOrderItems
    {
        public int RepairItemsId { get; set; }
        public Nullable<int> RepairId { get; set; }
        public Nullable<int> ItemCardId { get; set; }
        public Nullable<int> ItemAtrribBatchId { get; set; }
        public Nullable<int> ItemPatchPartitionId { get; set; }
        public Nullable<int> ItemPartId { get; set; }
        public Nullable<int> StoreId { get; set; }
        public Nullable<int> StorePartId { get; set; }
        public Nullable<int> LotNumberExpiryId { get; set; }
        public Nullable<int> BillOfMaterialId { get; set; }
        public Nullable<int> UnitId { get; set; }
        public Nullable<decimal> UnitRate { get; set; }
        public Nullable<byte> ItemType { get; set; }
        public string BarCode { get; set; }
        public string BatchNumberFifoOrLifo { get; set; }
        public Nullable<decimal> Quantity { get; set; }
        public Nullable<decimal> QtyBeforRate { get; set; }
        public Nullable<decimal> QuantityOut { get; set; }
        public Nullable<decimal> QtyOutBeforRate { get; set; }
        public Nullable<decimal> Price { get; set; }
        public Nullable<decimal> PriceAfterRate { get; set; }
        public Nullable<int> UnitIdEstimat { get; set; }
        public Nullable<decimal> UnitRateEstimat { get; set; }
        public Nullable<decimal> QuantityEstimat { get; set; }
        public Nullable<decimal> QtyBeforRateEstimat { get; set; }
        public Nullable<decimal> PriceEstimat { get; set; }
        public string Remarks { get; set; }
        public Nullable<decimal> FIFOCost { get; set; }
        public Nullable<decimal> FIFOCostUnit { get; set; }
        public Nullable<decimal> LIFOCost { get; set; }
        public Nullable<decimal> LIFOCostUnit { get; set; }
        public Nullable<decimal> CoastAverage { get; set; }
        public Nullable<decimal> CoastAverageUnit { get; set; }
        public Nullable<decimal> LastCost { get; set; }
        public Nullable<decimal> LastCostUnit { get; set; }
        public Nullable<decimal> BatchLength { get; set; }
        public Nullable<decimal> BatchWidth { get; set; }
        public Nullable<decimal> BatchHieght { get; set; }
        public Nullable<decimal> RequestedMeter { get; set; }
        public Nullable<bool> IsDelivered { get; set; }
        public string CreatedBy { get; set; }
        public Nullable<System.DateTime> CreatedAt { get; set; }
        public string UpdateBy { get; set; }
        public Nullable<System.DateTime> UpdateAt { get; set; }
    }
}
