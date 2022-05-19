using Inv.BLL.Services.GLDefAccount.VM;
using Inv.DAL.Domain; 
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Inv.BLL.Services.MSCustomer
{
    public interface IMS_CustomerService
    {
        MS_Customer GetById(int id);
        IQueryable<MS_Customer> GetAll();
        List<MS_Customer> GetAll(Expression<Func<MS_Customer, bool>> predicate);
        List<Cal_CustAccounts> GetCustAccounts(Expression<Func<Cal_CustAccounts, bool>> predicate);
        MS_Customer Insert(MS_Customer entity);
        List<T> InsertList<T>(List<T> entitys) where T : class, new();
        MS_Customer Update(MS_Customer entity);
        void UpdateAccountsList(List<Cal_CustAccounts> accounts);
        void UpdateBranchesList(List<Ms_CustomerBranches> branches);
        void UpdateContactsList(List<Ms_CustomerContacts> contacts);
        void UpdateUsersList(List<Ms_CusromerUsers> users);

        bool Delete(int id);
        //void DeleteList(List<MS_Customer> entity);
        List<T> DeleteList<T>(List<T> entitys) where T : class, new();
    }
}
