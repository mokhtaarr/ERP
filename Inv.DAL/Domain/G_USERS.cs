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
    
    public partial class G_USERS
    {
        public string USER_CODE { get; set; }
        public string USER_PASSWORD { get; set; }
        public bool USER_ACTIVE { get; set; }
        public string USER_NAME { get; set; }
        public Nullable<int> CompCode { get; set; }
        public string REGION_CODE { get; set; }
        public Nullable<int> GRP_CODE { get; set; }
        public string USER_PASSWORD2 { get; set; }
        public Nullable<System.DateTime> CHANGE_PASS_DATE { get; set; }
        public string City { get; set; }
        public string Address { get; set; }
        public string Tel { get; set; }
        public string Fax { get; set; }
        public string Mobile { get; set; }
        public string Email { get; set; }
        public string DepartmentName { get; set; }
        public string JobTitle { get; set; }
        public Nullable<byte> USER_TYPE { get; set; }
        public string ManagedBy { get; set; }
        public Nullable<bool> LoginUrl { get; set; }
        public string Tokenid { get; set; }
        public Nullable<System.DateTime> LastLogin { get; set; }
        public Nullable<System.DateTime> FirstLogin { get; set; }
        public string Remarks { get; set; }
        public Nullable<System.DateTime> CreatedAt { get; set; }
        public string CreatedBy { get; set; }
        public Nullable<System.DateTime> UpdatedAt { get; set; }
        public string UpdatedBy { get; set; }
        public Nullable<int> CashBoxID { get; set; }
        public Nullable<int> SalesManID { get; set; }
        public Nullable<int> StoreID { get; set; }
        public int UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string TokenMobid { get; set; }
    }
}
