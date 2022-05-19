using Inv.BLL.Services.GLDefAccount.VM;
using Inv.DAL.Domain; 
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Inv.BLL.Services.MSVendor
{
    public interface IMS_VendorService
    {
        MS_Vendor GetById(int id);
        List<MS_Vendor> GetAll();
        List<MS_Vendor> GetAll(Expression<Func<MS_Vendor, bool>> predicate);
        List<Cal_VendAccounts> GetVendAccounts(Expression<Func<Cal_VendAccounts, bool>> predicate);
        MS_Vendor Insert(MS_Vendor entity);
        List<T> InsertList<T>(List<T> entitys) where T : class, new();
        MS_Vendor Update(MS_Vendor entity);
        void UpdateAccountsList(List<Cal_VendAccounts> accounts);
        void UpdateBranchesList(List<Ms_VendorBranches> branches);
        void UpdateContactsList(List<Ms_VendorContacts> contacts);
        void UpdateUsersList(List<Ms_VendorUsers> users);

        bool Delete(int id);
        List<T> DeleteList<T>(List<T> entitys) where T : class, new();
    }
}
