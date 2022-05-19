using System;
using Inv.DAL.Domain;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;

namespace Inv.API.Models.CustomModel
{
    // //////////////////////// for Get //////////////////////////
    public class TermsHeaderAndDetails
    {
        public Ms_Terms Terms { get; set; }
        public Ms_TermsDetails TermsDetails { get; set; }
    }
}
