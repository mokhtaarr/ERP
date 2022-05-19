using Inv.BLL.Services.GLDefAccount.VM;
using Inv.DAL.Domain; 
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Inv.BLL.Services.SysAnalyticalCodes
{
    public interface ISys_AnalyticalCodesService
    {
        Sys_AnalyticalCodes GetById(int id);
        List<Sys_AnalyticalCodes> GetAll();
        List<Sys_AnalyticalCodes> GetAll(Expression<Func<Sys_AnalyticalCodes, bool>> predicate);
        Sys_AnalyticalCodes Insert(Sys_AnalyticalCodes entity);
        Sys_AnalyticalCodes Update(Sys_AnalyticalCodes entity);
        bool Delete(int id);
        List<T> InsertList<T>(List<T> entitys) where T : class, new();
        List<T> DeleteList<T>(List<T> entitys) where T : class, new();
    }
}
