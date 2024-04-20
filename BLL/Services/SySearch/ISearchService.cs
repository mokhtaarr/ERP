using Inv.BLL.Services.GLDefAccount.VM;
using Inv.DAL.Domain; 
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Inv.BLL.Services.SySearch
{
    public interface ISearchService
    {
        G_SearchFormModule GetById(string code);
        List<G_SearchFormModule> GetAll();
        List<G_SearchFormModule> GetAll(Expression<Func<G_SearchFormModule, bool>> predicate);
        T Insert<T>(T entitys) where T : class, new();
        List<T> InsertList<T>(List<T> entitys) where T : class, new();
        G_SearchFormModule Update(G_SearchFormModule entity);
        void UpdateSettings(G_SearchForm settings);
        void UpdateColumnSetting(List<G_SearchFormSetting> ColumnSetting);
        bool Delete<T>(T entity) where T : class, new();
        List<T> DeleteList<T>(List<T> entitys) where T : class, new();
    }
}
