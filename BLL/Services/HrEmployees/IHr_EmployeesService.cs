using Inv.BLL.Services.GLDefAccount.VM;
using Inv.DAL.Domain; 
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Inv.BLL.Services.HrEmployees
{
    public interface IHr_EmployeesService
    {
        Hr_Employees GetById(int id);
        List<Hr_Employees> GetAll();
        List<Hr_Employees> GetAll(Expression<Func<Hr_Employees, bool>> predicate);
        List<Cal_EmpAccounts> GetEmpAccounts(Expression<Func<Cal_EmpAccounts, bool>> predicate);
        Hr_Employees Insert(Hr_Employees entity);
        List<T> InsertList<T>(List<T> entitys) where T : class, new();
        Hr_Employees Update(Hr_Employees entity);
        void UpdateAccountsList(List<Cal_EmpAccounts> accounts);
        bool Delete(int id);
        List<T> DeleteList<T>(List<T> entitys) where T : class, new();
    }
}
