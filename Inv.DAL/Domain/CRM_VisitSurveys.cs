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
    
    public partial class CRM_VisitSurveys
    {
        public int VisitSurveyId { get; set; }
        public Nullable<int> VisitId { get; set; }
        public Nullable<int> SurveyId { get; set; }
        public string Answer1 { get; set; }
        public string Answer2 { get; set; }
        public string Answer3 { get; set; }
        public string Answer4 { get; set; }
        public Nullable<bool> AnswerYorN { get; set; }
        public string FilePath { get; set; }
    }
}
