using Inv.DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Inv.BLL.Services.MSExpenses
{
    public interface IMS_ExpensesService
    {
        MS_Expenses GetById(int id);
        List<MS_Expenses> GetAll();
        List<MS_Expenses> GetAll(Expression<Func<MS_Expenses, bool>> predicate);
        MS_Expenses Insert(MS_Expenses entity);
        List<T> InsertList<T>(List<T> entitys) where T : class, new();
        MS_Expenses Update(MS_Expenses entity);
        bool Delete(int id);
    }
}
