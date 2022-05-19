using System;
using Inv.DAL.Domain;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;

namespace Inv.API.Models.CustomModel
{
    // //////////////////////// for Get //////////////////////////
    public class CurrencyDetails
    {
        public MS_Currency Currency { get; set; }
        public List<CustomCurrencyCategory> CurrencyCategories { get; set; }
        public List<CustomCurrencyRate> CurrencyRate { get; set; }
    }

    public class CustomCurrencyCategory
    {
        public int CurrencyCatJoinId { get; set; }
        public int? CurrencyId { get; set; }
        public int CurrencyCategoryId { get; set; }
        public string CurrencyCategoryNameA { get; set; }
        public string CurrencyCategoryNameE { get; set; }
        public int? CurrencyType { get; set; }
        public string code { get; set; }

    }

    public class CustomCurrencyRate
    {
        public int EqualCurrencyPriceId { get; set; }
        public int? EquivalentCurrencyId { get; set; }
        public int? CurrencyId { get; set; }
        public string CurrencyCode { get; set; }
        public string CurrencyDescA { get; set; }
        public string CurrencyDescE { get; set; }
        public decimal? Rate { get; set; }
    }

    //////////////////////// for Post ////////////////////
    public class PostCurrencyDetails
    {
    public MS_Currency Currency { get; set; }
    public List<Ms_CurrencyCategoryJoin> CurrencyCategories { get; set; }
    public List<Ms_CurrencyRate> CurrencyRate { get; set; }
}
}
