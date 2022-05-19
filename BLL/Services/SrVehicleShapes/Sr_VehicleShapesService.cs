using Inv.BLL.Services.SrVehicle;
using Inv.DAL.Domain;
using Inv.DAL.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Inv.BLL.Services.SrVehicleShapes
{
  public  class Sr_VehicleShapesService : ISr_VehicleShapesService
    {
        private readonly IUnitOfWork unitOfWork;
        public Sr_VehicleShapesService(IUnitOfWork _unitOfWork)
        {
            this.unitOfWork = _unitOfWork;
        }

        public List<Sr_VehicleShapes> GetAll()
        {
            return unitOfWork.Repository<Sr_VehicleShapes>().GetAll();
        }

        public List<Sr_VehicleShapes> GetAll(Expression<Func<Sr_VehicleShapes, bool>> predicate)
        {
            return unitOfWork.Repository<Sr_VehicleShapes>().Get(predicate);
        }

        public Sr_VehicleShapes GetById(int id)
        {
            return unitOfWork.Repository<Sr_VehicleShapes>().GetById(id);
        }

        public Sr_VehicleShapes Insert(Sr_VehicleShapes entity)
        {
            var memb = unitOfWork.Repository<Sr_VehicleShapes>().Insert(entity);
            unitOfWork.Save();
            return memb;
        }
       
        public List<T> InsertList<T>(List<T> entitys) where T : class, new()
        {
            unitOfWork.Repository<T>().Insert(entitys);
            unitOfWork.Save();
            return null;
        }
        
        public Sr_VehicleShapes Update(Sr_VehicleShapes entity)
        {
            var memb = unitOfWork.Repository<Sr_VehicleShapes>().Update(entity);
            unitOfWork.Save();
            return memb;
        }
        
        public bool Delete(int id)
        {
            try
            {
                unitOfWork.Repository<Sr_VehicleShapes>().Delete(id);
                unitOfWork.Save();
                return true;
            }
            catch 
            {
                return false;
            }
        }
    }
}
