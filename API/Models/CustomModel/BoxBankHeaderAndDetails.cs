using Inv.DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Inv.API.Models.CustomModel
{
    public class BoxBankHeaderAndDetails
    {
        public MS_BoxBank BoxBank { get; set; }
        public List<MS_BoxCurrency> BoxCurrency { get; set; }
        public List<Ms_BoxUsers> BoxUsers { get; set; }
    }
}