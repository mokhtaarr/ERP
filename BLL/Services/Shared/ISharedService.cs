using Inv.BLL.Services.GLDefAccount.VM;
using Inv.DAL.Domain; 
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Inv.BLL.Services.Shared
{
    public interface ISharedService
    {
        List<MS_Customer> GetCustomers(Expression<Func<MS_Customer, bool>> predicate);
        List<Ms_Terms> GetAllTerms(Expression<Func<Ms_Terms, bool>> predicate);
        List<Cal_AccountChart> GetAllAccountChart(Expression<Func<Cal_AccountChart, bool>> predicate);
        List<Cal_CostCenters> GetCostCenters(Expression<Func<Cal_CostCenters, bool>> predicate);
        List<Sys_Books> GetAllBooks(Expression<Func<Sys_Books, bool>> predicate);
        List<MS_BoxBank> GetAllBoxBank(Expression<Func<MS_BoxBank, bool>> predicate);
        List<Ms_CurrencyCategoryJoin> GetAllCurrencyCategoryJoin(Expression<Func<Ms_CurrencyCategoryJoin, bool>> predicate);
        List<MS_CurrencyCategory> GetAllCurrencyCategory(Expression<Func<MS_CurrencyCategory, bool>> predicate);
        Sys_Counter GetCounter(Expression<Func<Sys_Counter, bool>> predicate);
    }
}
