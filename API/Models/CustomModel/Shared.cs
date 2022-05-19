using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Inv.API.Models.CustomModel
{
    public class SharedModel
    {
    }

    public class CurrencyCategoryShared
    {
        public int CurrencyCategoryId { get; set; }
        public int RectId { get; set; }
        public int RecCurId { get; set; }
        public string CurrencyDescA { get; set; }
        public string CurrencyDescE { get; set; }
        public decimal? Value { get; set; }
        public float Count { get; set; }
        public float Price { get; set; }
    }
}