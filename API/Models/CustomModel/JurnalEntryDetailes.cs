using Inv.DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Inv.API.Models.CustomModel
{
    public class JurnalEntryDetailes
    {
        public Cal_JurnalEntry JurnalEntry { get; set; }
        public List<CustomJurnalDetailes> JurnalDetails { get; set; }
    }

    public class PostJurnalDetail
    {
        public Cal_JurnalEntry JurnalEntry { get; set; }
        public List<Cal_JurnalDetail> JurnalDetails { get; set; }
    }
}