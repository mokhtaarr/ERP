using Inv.DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Inv.BLL.Services.MSPaymentNote
{
    public interface IMS_PaymentNoteService
    {
        MS_PaymentNote GetById(int id);
        List<MS_PaymentNote> GetAll();
        List<MS_PaymentNote> GetAll(Expression<Func<MS_PaymentNote, bool>> predicate);
        List<Ms_PaymentNoteCurrencies> GetAllPaymentCurrencies(Expression<Func<Ms_PaymentNoteCurrencies, bool>> predicate);
        MS_PaymentNote Insert(MS_PaymentNote entity);
        List<T> InsertList<T>(List<T> entitys) where T : class, new();
        MS_PaymentNote Update(MS_PaymentNote entity);
        void UpdateCurrencies(List<Ms_PaymentNoteCurrencies> currencies);
        bool Delete(int id);
        List<T> DeleteList<T>(List<T> entitys) where T : class, new();
    }
}
