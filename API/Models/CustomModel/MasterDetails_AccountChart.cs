using Inv.DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Inv.API.Models.CustomModel
{
    public class MasterDetails_AccountChart
    {
        public Cal_AccountChart Cal_AccountChart { get; set; }
        public List<Cal_AccountUsers> Cal_AccountUsers { get; set; }
        public List<Cal_Clauses> Clauses { get; set; }
    }
}