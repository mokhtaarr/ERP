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
    
    public partial class MS_Vendor
    {
        public int VendorId { get; set; }
        public Nullable<int> VendorCatId { get; set; }
        public Nullable<int> VendorTypeId { get; set; }
        public Nullable<int> CurrencyId { get; set; }
        public Nullable<int> CostCenterId { get; set; }
        public string VendorCode { get; set; }
        public string VendorDescA { get; set; }
        public string VendorDescE { get; set; }
        public Nullable<bool> IsActive { get; set; }
        public Nullable<bool> IsTaxExempted { get; set; }
        public Nullable<byte> CreditPeriodType { get; set; }
        public Nullable<int> CreditPeriod { get; set; }
        public Nullable<decimal> CreditLimit { get; set; }
        public string Tel { get; set; }
        public string Tel2 { get; set; }
        public string Tel3 { get; set; }
        public string Tel4 { get; set; }
        public string Tel5 { get; set; }
        public string Fax { get; set; }
        public string Email { get; set; }
        public string Email2 { get; set; }
        public string Email3 { get; set; }
        public string Email4 { get; set; }
        public string Address { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string Address3 { get; set; }
        public string Remarks { get; set; }
        public string AddField1 { get; set; }
        public string AddField2 { get; set; }
        public string AddField3 { get; set; }
        public string AddField4 { get; set; }
        public string AddField5 { get; set; }
        public Nullable<byte> Barcode { get; set; }
        public Nullable<bool> ForAdjustOnly { get; set; }
        public string CreatedBy { get; set; }
        public Nullable<System.DateTime> CreatedAt { get; set; }
        public string UpdateBy { get; set; }
        public Nullable<System.DateTime> UpdateAt { get; set; }
        public string DeletedBy { get; set; }
        public Nullable<System.DateTime> DeletedAt { get; set; }
        public Nullable<int> CostCenterId1 { get; set; }
        public Nullable<int> CostCenterId2 { get; set; }
        public Nullable<int> CityId { get; set; }
        public Nullable<int> EmpId { get; set; }
        public Nullable<int> StoreId { get; set; }
        public Nullable<int> TaxesId1 { get; set; }
        public Nullable<int> TaxesId2 { get; set; }
        public Nullable<int> TaxesId3 { get; set; }
        public Nullable<bool> IsBlocked { get; set; }
        public Nullable<bool> IsCreditEnabled { get; set; }
        public Nullable<bool> IsPricIncludTax { get; set; }
        public string TaxExemptionNo { get; set; }
        public string TaxRefNo { get; set; }
        public Nullable<decimal> PrePaidPercent { get; set; }
        public string PostalCode { get; set; }
        public string HomePage { get; set; }
        public Nullable<byte> InvoiceCopies { get; set; }
        public Nullable<System.DateTime> dtReg { get; set; }
        public Nullable<System.DateTime> dtRegRenew { get; set; }
        public string Company { get; set; }
        public string VendJob { get; set; }
        public string VendID { get; set; }
        public string EtaxCustType { get; set; }
    }
}
