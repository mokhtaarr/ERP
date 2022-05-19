using System;
using Inv.DAL.Domain;
using System.Collections.Generic;
using System.Linq;
using System.Web;

 
namespace Inv.API.Models.CustomModel
{
    public class FindKeyClass
    {
        public string moduleCode { get; set; }
        public string Condition { get; set; }
        public List<NameAndValueInSearch> valueInSearches { get; set; }
        public string controlName { get; set; }
        public string SystemCode { get; set; }
        public string SubSystemCode { get; set; }
        public string ScreenLanguage { get; set; }
    }
}
