using Inv.DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Inv.BLL.Services.SrVehicle
{
    public interface ISr_VehicleShapesService
    {
        Sr_VehicleShapes GetById(int id);
        List<Sr_VehicleShapes> GetAll();
        List<Sr_VehicleShapes> GetAll(Expression<Func<Sr_VehicleShapes, bool>> predicate);
        Sr_VehicleShapes Insert(Sr_VehicleShapes entity);
        List<T> InsertList<T>(List<T> entitys) where T : class, new();
        Sr_VehicleShapes Update(Sr_VehicleShapes entity);
        bool Delete(int id);
    }
}
