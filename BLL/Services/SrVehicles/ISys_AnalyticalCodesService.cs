using Inv.BLL.Services.GLDefAccount.VM;
using Inv.DAL.Domain; 
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Inv.BLL.Services.SrVehicles
{
    public interface ISr_VehiclesService
    {
        Sr_Vehicles GetById(int id);
        List<Sr_Vehicles> GetAll();
        List<Sr_Vehicles> GetAll(Expression<Func<Sr_Vehicles, bool>> predicate);
        Sr_Vehicles Insert(Sr_Vehicles entity);
        Sr_Vehicles Update(Sr_Vehicles entity);
        bool Delete(int id);
        List<T> InsertList<T>(List<T> entitys) where T : class, new();
        List<T> DeleteList<T>(List<T> entitys) where T : class, new();
    }
}
