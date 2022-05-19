using System;
using Inv.DAL.Domain;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;

namespace Inv.API.Models.CustomModel
{
    // //////////////////////// for Get //////////////////////////
    public class FinancialYearsDetails
    {
        public Sys_FinancialYears Model { get; set; }
        public List<Sys_FinancialIntervals> Intervals { get; set; }
    }
}
