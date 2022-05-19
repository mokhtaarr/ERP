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
    
    public partial class Cal_CustAccounts
    {
        public int CustAccountId { get; set; }
        public Nullable<int> AccountId { get; set; }
        public Nullable<int> CustomerId { get; set; }
        public string AccountCode { get; set; }
        public string AccountNameA { get; set; }
        public string AccountNameE { get; set; }
        public Nullable<bool> AccountStopped { get; set; }
        public string AccountModel { get; set; }
        public string RemarksA { get; set; }
        public Nullable<decimal> OpenningBalanceDepit { get; set; }
        public Nullable<decimal> OpenningBalanceCredit { get; set; }
        public Nullable<decimal> AccCurrTrancDepit { get; set; }
        public Nullable<decimal> AccCurrTrancCredit { get; set; }
        public Nullable<decimal> AccTotalDebit { get; set; }
        public Nullable<decimal> AccTotaCredit { get; set; }
        public Nullable<decimal> BalanceDebitLocal { get; set; }
        public Nullable<decimal> BalanceCreditLocal { get; set; }
        public Nullable<decimal> OpenningBalanceDepitCurncy { get; set; }
        public Nullable<decimal> OpenningBalanceCreditCurncy { get; set; }
        public Nullable<decimal> AccCurrTrancDepitCurncy { get; set; }
        public Nullable<decimal> AccCurrTrancCreditCurncy { get; set; }
        public Nullable<decimal> AccTotalDebitCurncy { get; set; }
        public Nullable<decimal> AccTotaCreditCurncy { get; set; }
        public Nullable<decimal> BalanceDebitCurncy { get; set; }
        public Nullable<decimal> BalanceCreditCurncy { get; set; }
        public Nullable<bool> IsPrimeAccount { get; set; }
        public Nullable<bool> IsInUse { get; set; }
        public string AccountDescription { get; set; }
        public string CreatedBy { get; set; }
        public Nullable<System.DateTime> CreatedAt { get; set; }
        public string UpdatedBy { get; set; }
        public Nullable<System.DateTime> UpdatedAt { get; set; }
        public string DeletedBy { get; set; }
        public Nullable<System.DateTime> DeletedAt { get; set; }
    }
}
