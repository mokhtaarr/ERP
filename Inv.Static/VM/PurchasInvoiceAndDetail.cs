using Inv.DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inv.Static.VM
{
    public class PurchasInvoiceAndDetail
    {
        public MS_PurchasInvoice Model { get; set; }
        public List<MS_PurchaseInvoiceItemCard> Details { get; set; }
    }
}
