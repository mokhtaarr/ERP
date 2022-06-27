using Inv.DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace Inv.Static.VM
{
    public class MS_ItemCardDetailesVM
    {
        public MS_ItemCard Model { get; set; }
        public List<MS_ItemVendors> Vendors { get; set; }
        public List<Ms_ItemCardOffers> Offers { get; set; }
        public List<Prod_ItemAttributsJoin> AttributsJoin { get; set; }
        public List<MS_ItemImages> ItemImages { get; set; }
        public List<string> StrItemImages { get; set; }
        public List<Ms_ItemUnitVM> GiftUnits { get; set; }
        public List<Ms_ItemUnitVM> ItemCardUnits { get; set; }
        public List<Ms_ItemUnit> ItemUnit { get; set; }
        public List<MS_ItemAlternatives> ItemAlternatives { get; set; }
        public List<Ms_ItemCollection> ItemCollection { get; set; }
        public List<Prod_ItemcardExpenses> ItemCardExpenses { get; set; }
    }
    public class ItemCardVM
    {
        public int ItemCardId { get; set; }
        public string ItemCode { get; set; }
        public string ItemDescA { get; set; }
        public string ItemDescE { get; set; }
        public Nullable<byte> ItemType { get; set; }
        public Nullable<int> ItemCategoryId { get; set; }
        public Nullable<bool> IsExpir { get; set; }
        public Nullable<bool> IsAttributeItem { get; set; }
        public Nullable<bool> IsCollection { get; set; }
        public Nullable<bool> IsDimension { get; set; }
        public Nullable<bool> IsSerialItem { get; set; }
    }

    public class Ms_ItemUnitVM
    {
        public int ItemCardId { get; set; }
        public int UnitId { get; set; }
        public string UnitCode { get; set; }
        public string UnitNam { get; set; }
        public string UnitNameE { get; set; }
    }
}
