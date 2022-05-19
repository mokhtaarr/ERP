using Inv.DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Inv.API.Models.CustomModel
{
    public class MasterDetails_Branches
    {
        public MS_Stores MS_Stores { get; set; }
        public List<MS_Partition> MS_Partitions { get; set; }
       
    }
}