using Inv.DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace Inv.Static.VM
{
    public class Prod_BasicUnitsDetailesVM
    {
        public Prod_BasicUnits Model { get; set; }
        public List<Prod_BasicUnits> Details { get; set; }
    }

    public partial class Prod_BasicUnitsVM
    {
        public int BasUnitId { get; set; }
        public string UnitCode { get; set; }
        public string UnitNam { get; set; }
        public string UnitNameE { get; set; }
        public Nullable<decimal> UnittRate { get; set; }
        public string Symbol { get; set; }
    }
}
