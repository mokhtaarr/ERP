using Inv.BLL.Services.GLDefAccount.VM;
using Inv.DAL.Domain; 
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Inv.BLL.Services.MsReceiptNote
{
    public interface IMs_ReceiptNoteService
    {
        Ms_ReceiptNote GetById(int id);
        List<Ms_ReceiptNote> GetAll();
        List<Ms_ReceiptNote> GetAll(Expression<Func<Ms_ReceiptNote, bool>> predicate);
        List<Ms_ReceiptNoteCurrencies> GetAllReceiptNoteCurrencies(Expression<Func<Ms_ReceiptNoteCurrencies, bool>> predicate);
        Ms_ReceiptNote Insert(Ms_ReceiptNote entity);
        List<T> InsertList<T>(List<T> entitys) where T : class, new();
        Ms_ReceiptNote Update(Ms_ReceiptNote entity);
        void UpdateCurrencies(List<Ms_ReceiptNoteCurrencies> currencies);
        bool Delete(int id);
        List<T> DeleteList<T>(List<T> entitys) where T : class, new();
    }
}
