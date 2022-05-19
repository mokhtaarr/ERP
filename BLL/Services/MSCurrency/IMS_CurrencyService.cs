using Inv.BLL.Services.GLDefAccount.VM;
using Inv.DAL.Domain; 
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Inv.BLL.Services.MSCurrency
{
    public interface IMS_CurrencyService
    {
        MS_Currency GetById(int id);
        List<MS_Currency> GetAll();
        List<MS_Currency> GetAll(Expression<Func<MS_Currency, bool>> predicate);
        List<Ms_CurrencyCategoryJoin> GetAllCurrencyCategoryJoin(Expression<Func<Ms_CurrencyCategoryJoin, bool>> predicate);
        List<Ms_CurrencyRate> GetAllCurrencyRate(Expression<Func<Ms_CurrencyRate, bool>> predicate);
        MS_Currency Insert(MS_Currency entity);
        List<T> InsertList<T>(List<T> entitys) where T : class, new();
        MS_Currency Update(MS_Currency entity);
        void UpdateCurrencyCategoryJoins(List<Ms_CurrencyCategoryJoin> CurrencyCategory);
        void UpdatecurrencyRates(List<Ms_CurrencyRate> CurrencyRate);
        bool Delete(int id);
        List<T> DeleteList<T>(List<T> entitys) where T : class, new();
    }
}
