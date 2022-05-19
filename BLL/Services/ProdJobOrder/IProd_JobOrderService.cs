using Inv.BLL.Services.GLDefAccount.VM;
using Inv.DAL.Domain; 
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Inv.BLL.Services.ProdJobOrder
{
    public interface IProd_JobOrderService
    {
        Prod_JobOrder GetById(int id);
        List<Prod_JobOrder> GetAll();
        List<Prod_JobOrder> GetAll(Expression<Func<Prod_JobOrder, bool>> predicate);
        Prod_JobOrder Insert(Prod_JobOrder entity);
        Prod_JobOrder Update(Prod_JobOrder entity);
        bool Delete(int id);
        List<T> InsertList<T>(List<T> entitys) where T : class, new();
        List<T> DeleteList<T>(List<T> entitys) where T : class, new();
    }
}
