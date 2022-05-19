using Inv.BLL.Services.GLDefAccount.VM;
using Inv.DAL.Domain; 
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Inv.BLL.Services.HrJobs
{
    public interface IHr_JobsService
    {
        Hr_Jobs GetById(int id);
        List<Hr_Jobs> GetAll();
        List<Hr_Jobs> GetAll(Expression<Func<Hr_Jobs, bool>> predicate);
        Hr_Jobs Insert(Hr_Jobs entity);
        void InsertList(List<Hr_Jobs> entitys);
        Hr_Jobs Update(Hr_Jobs entity);
        void UpdateList(List<Hr_Jobs> entity);
        bool Delete(int id);
        void DeleteList(List<Hr_Jobs> entity);
    }
}
