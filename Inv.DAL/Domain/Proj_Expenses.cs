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
    
    public partial class Proj_Expenses
    {
        public int ProjectExpensId { get; set; }
        public Nullable<int> ProjectId { get; set; }
        public Nullable<int> ExpensesId { get; set; }
        public Nullable<decimal> EstimateValue { get; set; }
        public Nullable<decimal> EstimatePercent { get; set; }
        public Nullable<decimal> RealValue { get; set; }
        public Nullable<decimal> RealPercent { get; set; }
    }
}
