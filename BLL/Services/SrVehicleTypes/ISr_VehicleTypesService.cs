using Inv.DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Inv.BLL.Services.SrVehicle
{
    public interface ISr_VehicleTypesService
    {
        Sr_VehicleTypes GetById(int id);
        List<Sr_VehicleTypes> GetAll();
        List<Sr_VehicleTypes> GetAll(Expression<Func<Sr_VehicleTypes, bool>> predicate);
        Sr_VehicleTypes Insert(Sr_VehicleTypes entity);
        List<T> InsertList<T>(List<T> entitys) where T : class, new();
        Sr_VehicleTypes Update(Sr_VehicleTypes entity);
        bool Delete(int id);
    }
}
