using Inv.BLL.Services.GLDefAccount.VM;
using Inv.DAL.Domain; 
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Inv.BLL.Services.Purchase.PurchasInvoice
{
    public interface IMS_PurchasInvoiceService
    {
        MS_PurchasInvoice GetById(int id);

        List<MS_PurchasInvoice> GetAll();

        List<MS_PurchasInvoice> GetAll(Expression<Func<MS_PurchasInvoice, bool>> predicate);

        List<MS_PurchaseInvoiceItemCard> GetPurchaseInvoiceItemCard(Expression<Func<MS_PurchaseInvoiceItemCard, bool>> predicate);

        MS_PurchasInvoice Insert(MS_PurchasInvoice entity);

        List<T> InsertList<T>(List<T> entitys) where T : class, new();

        MS_PurchasInvoice Update(MS_PurchasInvoice entity);

        void UpdatePurchaseInvoiceItemCard(List<MS_PurchaseInvoiceItemCard> entity);

        bool Delete(int id);

        List<T> DeleteList<T>(List<T> entitys) where T : class, new();
    }
}
