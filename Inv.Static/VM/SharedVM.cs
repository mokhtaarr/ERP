using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inv.Static.VM
{
    public class SharedVM
    {
        public int Id { get; set; }
        public string Code { get; set; }
        public string NameA { get; set; }
        public string NameE { get; set; }
    }

    public class VendorVM
    {
        public int VendorId { get; set; }
        public string VendorCode { get; set; }
        public string VendorDescA { get; set; }
        public string VendorDescE { get; set; }
    }
    
    public class ItemAttributesVM
    {
        public int AttributId { get; set; }
        public string AttributCode { get; set; }
        public string AttributName1 { get; set; }
        public string AttributName2 { get; set; }
        public Nullable<bool> IsActive { get; set; }
        public Nullable<bool> IsMandatory { get; set; }
        public Nullable<byte> Dimension { get; set; }
        public string UnitNam { get; set; }
        public string UnitNameE { get; set; }
        public Nullable<int> BasUnitId { get; set; }
    }

    public class ItemPartitionVM
    {
        public decimal? QtyPartiation { get; set; }
        public decimal? QtyInNotebook { get; set; }
        public decimal? CoastAverage { get; set; }
    }

    public class ItemsVM
    {
        public string ItemCode { get; set; }
        public string UnitNam { get; set; }
        public string BarCode1 { get; set; }
        public string PartCode { get; set; }
        public string PartDescA { get; set; }
        public string StoreCode { get; set; }
        public string StoreDescA { get; set; }
        public string ItemDescA { get; set; }
        public string ItemDescE { get; set; }
        public string ItemCatCode { get; set; }
        public string ItemCatDescA { get; set; }
        public Nullable<byte> ItemType { get; set; }
        public Nullable<int> GiftItemCardId { get; set; }
        public Nullable<int> GiftUnitId { get; set; }
        public Nullable<int> UnitId { get; set; }
        public Nullable<decimal> UnittRate { get; set; }
        public Nullable<decimal> QtyInBox { get; set; }
        public Nullable<decimal> QtyPartiation { get; set; }
        public Nullable<decimal> QtyInNotebook { get; set; }
        public Nullable<bool> IsCollection { get; set; }
        public Nullable<decimal> FirstPrice { get; set; }
        public Nullable<decimal> SecandPrice { get; set; }
        public Nullable<decimal> ThirdPrice { get; set; }
        public Nullable<decimal> LargePrice { get; set; }
        public string Remarks { get; set; }
        public string ItemTypestring { get; set; }
        public string ItemType2 { get; set; }
        public string BarCode2 { get; set; }
        public string BarCode3 { get; set; }
        public string BarCode4 { get; set; }
        public string BarCode5 { get; set; }
    }

    public class BasicUnitsVM
    {
        public int BasUnitId { get; set; }
        public string UnitCode { get; set; }
        public string UnitNam { get; set; }
        public string UnitNameE { get; set; }
        public Nullable<decimal> UnittRate { get; set; }
        public string Symbol { get; set; }
        public Nullable<int> ParentUnit { get; set; }
    }

    public class UnitsVM
    {
        public int UnitId { get; set; }
        public int? ItemCardId { get; set; }
        public string UnitNam { get; set; }
        public string UnitNameE { get; set; }
    }
}
