using Inv.BLL.Services.GLDefAccount.VM;
using Inv.DAL.Domain; 
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Inv.BLL.Services.ProdBasicUnits
{
    public interface IProd_BasicUnitsService
    {
        Prod_BasicUnits GetById(int id);
        List<Prod_BasicUnits> GetAll();
        List<Prod_BasicUnits> GetAll(Expression<Func<Prod_BasicUnits, bool>> predicate);
        List<Prod_BasicUnits> GetDetails(Expression<Func<Prod_BasicUnits, bool>> predicate);
        Prod_BasicUnits Insert(Prod_BasicUnits entity);
        List<T> InsertList<T>(List<T> entitys) where T : class, new();
        Prod_BasicUnits Update(Prod_BasicUnits entity);
        void UpdateDetails(List<Prod_BasicUnits> entity);
        bool Delete(int id);
        bool DeleteList<T>(List<T> entitys) where T : class, new();
    }
}
