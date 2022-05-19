using Inv.BLL.Services.GLDefAccount.VM;
using Inv.DAL.Domain; 
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Inv.BLL.Services.CalPostOrder
{
    public interface ICal_PostOrderService
    {
        Cal_PostOrder GetById(int id);
        List<Cal_PostOrder> GetAll();
        List<Cal_PostOrder> GetAll(Expression<Func<Cal_PostOrder, bool>> predicate);
        Cal_PostOrder Insert(Cal_PostOrder entity);
        List<T> InsertList<T>(List<T> entitys) where T : class, new();
        Cal_PostOrder Update(Cal_PostOrder entity);
        bool Delete(int id);
        int DeleteList<T>(List<T> entitys) where T : class, new();
    }
}
