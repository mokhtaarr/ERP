using System;
using Inv.DAL.Domain;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;

namespace Inv.API.Models.CustomModel
{
    // //////////////////////// For Get //////////////////////////
    public class ReceiptNoteAndDetails
    {
        public Ms_ReceiptNote Ms_Receipt { get; set; }
        public List<Ms_ReceiptNoteCurrencies> Currencies { get; set; }
    }

    public class PaymentNoteAndDetails
    {
        public MS_PaymentNote PaymentNote { get; set; }
        public List<Ms_PaymentNoteCurrencies> Currencies { get; set; }
    }
}
