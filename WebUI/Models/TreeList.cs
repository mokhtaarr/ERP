using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Inv.WebUI.Models
{
    public class TreeList
    {
        //public string id { get; set; }
        //public string parent { get; set; }
        //public string text { get; set; }
        //public bool children { get; set; } // if node has sub-nodes set true or not set false


        public int Id { get; set; }
        public string Tree { get; set; }
        public string TypeOfAccountTree { get; set; }
        public int? TypeOfAccountTreeID { get; set; }
        public int? AccountTreeID { get; set; }
        public bool IsSelected { get; set; }
        public int? ParentID { get; set; }
        public long? Code { get; set; }
        public string EnName { get; set; }
        public string Name { get; set; }
    }
}