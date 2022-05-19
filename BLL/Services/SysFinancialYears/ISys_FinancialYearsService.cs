using Inv.DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Inv.BLL.Services.SysFinancialYears
{
    public interface ISys_FinancialYearsService
    {
        Sys_FinancialYears GetById(int id);
        List<Sys_FinancialYears> GetAll();
        List<Sys_FinancialYears> GetAll(Expression<Func<Sys_FinancialYears, bool>> predicate);
        List<Sys_FinancialIntervals> GetFinancialIntervals(Expression<Func<Sys_FinancialIntervals, bool>> predicate);
        Sys_FinancialYears Insert(Sys_FinancialYears entity);
        List<T> InsertList<T>(List<T> entitys) where T : class, new();
        Sys_FinancialYears Update(Sys_FinancialYears entity);
        List<Sys_FinancialIntervals> UpdateFinancialIntervals(List<Sys_FinancialIntervals> entitys);
        bool Delete(int id);
        List<T> DeleteList<T>(List<T> entitys) where T : class, new();
    }
}
