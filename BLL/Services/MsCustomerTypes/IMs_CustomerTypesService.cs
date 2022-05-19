using Inv.BLL.Services.GLDefAccount.VM;
using Inv.DAL.Domain; 
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Inv.BLL.Services.MsCustomerTypes
{
    public interface IMs_CustomerTypesService
    {
        Ms_CustomerTypes GetById(int id);
        List<Ms_CustomerTypes> GetAll();
        List<Ms_CustomerTypes> GetAll(Expression<Func<Ms_CustomerTypes, bool>> predicate);
        Ms_CustomerTypes Insert(Ms_CustomerTypes entity);
        void InsertList(List<Ms_CustomerTypes> entitys);
        Ms_CustomerTypes Update(Ms_CustomerTypes entity);
        void UpdateList(List<Ms_CustomerTypes> entity);
        bool Delete(int id);
        void DeleteList(List<Ms_CustomerTypes> entity);

    }
}
