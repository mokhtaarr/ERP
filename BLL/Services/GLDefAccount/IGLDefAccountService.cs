using Inv.BLL.Services.GLDefAccount.VM;
using Inv.DAL.Domain; 
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Inv.BLL.Services.GLDefAccount
{
    public interface IGLDefAccountService
    {
        List<Cal_Clauses> GetAllClausesById(Expression<Func<Cal_Clauses, bool>> predicate);
        List<Cal_AccountUsersVM> GetAllUsersById(int id);
        Cal_AccountChart GetById(int id);
        List<Cal_AccountChart> GetAll();
        List<Cal_AccountChart> GetAll(Expression<Func<Cal_AccountChart, bool>> predicate);
        Cal_AccountChart Insert(Cal_AccountChart entity);
        List<T> InsertList<T>(List<T> entitys) where T : class, new();
        Cal_AccountChart Update(Cal_AccountChart entity);
        List<Cal_Clauses> UpdateClauses(List<Cal_Clauses> entities);
        bool Delete(int id);
        List<T> DeleteList<T>(List<T> entitys) where T : class, new();
    }
}
