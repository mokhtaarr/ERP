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
    
    public partial class Ms_ChequeTransferDetail
    {
        public int ChequTranDetailId { get; set; }
        public Nullable<int> RectId { get; set; }
        public Nullable<int> CustomerId { get; set; }
        public Nullable<decimal> BalanceAfter { get; set; }
        public string Remarks { get; set; }
    }
}
