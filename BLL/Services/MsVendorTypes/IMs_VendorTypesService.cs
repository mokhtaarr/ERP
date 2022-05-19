using Inv.BLL.Services.GLDefAccount.VM;
using Inv.DAL.Domain; 
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Inv.BLL.Services.MsVendorTypes
{
    public interface IMs_VendorTypesService
    {
        Ms_VendorTypes GetById(int id);
        List<Ms_VendorTypes> GetAll();
        List<Ms_VendorTypes> GetAll(Expression<Func<Ms_VendorTypes, bool>> predicate);
        Ms_VendorTypes Insert(Ms_VendorTypes entity);
        void InsertList(List<Ms_VendorTypes> entitys);
        Ms_VendorTypes Update(Ms_VendorTypes entity);
        void UpdateList(List<Ms_VendorTypes> entity);
        bool Delete(int id);
        void DeleteList(List<Ms_VendorTypes> entity);

    }
}
