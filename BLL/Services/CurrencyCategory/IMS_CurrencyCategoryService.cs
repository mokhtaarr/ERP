using Inv.DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Inv.BLL.Services.CurrencyCategory
{
  public interface IMS_CurrencyCategoryService
    {
        MS_CurrencyCategory GetById(int id);
        List<MS_CurrencyCategory> GetAll();
        List<MS_CurrencyCategory> GetAll(Expression<Func<MS_CurrencyCategory, bool>> predicate);
        MS_CurrencyCategory Insert(MS_CurrencyCategory entity);
        MS_CurrencyCategory Update(MS_CurrencyCategory entity);
        void Delete(int id);
      
    }
}
