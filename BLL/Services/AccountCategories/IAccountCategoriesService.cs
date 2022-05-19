using Inv.BLL.Services.GLDefAccount.VM;
using Inv.DAL.Domain; 
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Inv.BLL.Services.AccountCategories
{
    public interface IAccountCategoriesService
    {
        Cod_AccountCategories GetById(int id);
        List<Cod_AccountCategories> GetAll();
        List<Cod_AccountCategories> GetAll(Expression<Func<Cod_AccountCategories, bool>> predicate);
        Cod_AccountCategories Insert(Cod_AccountCategories entity);
        void InsertList(List<Cod_AccountCategories> entitys);
        Cod_AccountCategories Update(Cod_AccountCategories entity);
        void UpdateList(List<Cod_AccountCategories> entity);
        bool Delete(int id);
        void DeleteList(List<Cod_AccountCategories> entity);

    }
}
