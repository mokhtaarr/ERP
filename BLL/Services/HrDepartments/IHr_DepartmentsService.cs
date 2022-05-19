using Inv.BLL.Services.GLDefAccount.VM;
using Inv.DAL.Domain; 
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Inv.BLL.Services.HrDepartments
{
    public interface IHr_DepartmentsService
    {
        Hr_Departments GetById(int id);
        List<Hr_Departments> GetAll();
        List<Hr_Departments> GetAll(Expression<Func<Hr_Departments, bool>> predicate);
        Hr_Departments Insert(Hr_Departments entity);
        void InsertList(List<Hr_Departments> entitys);
        Hr_Departments Update(Hr_Departments entity);
        void UpdateList(List<Hr_Departments> entity);
        bool Delete(int id);
        void DeleteList(List<Hr_Departments> entity);
    }
}
