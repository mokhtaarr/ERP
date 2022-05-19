using Inv.BLL.Services.SrVehicle;
using Inv.DAL.Domain;
using Inv.DAL.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Inv.BLL.Services.SrVehicleTypes
{
  public  class Sr_VehicleTypesService : ISr_VehicleTypesService
    {
        private readonly IUnitOfWork unitOfWork;
        public Sr_VehicleTypesService(IUnitOfWork _unitOfWork)
        {
            this.unitOfWork = _unitOfWork;
        }

        public List<Sr_VehicleTypes> GetAll()
        {
            return unitOfWork.Repository<Sr_VehicleTypes>().GetAll();
        }

        public List<Sr_VehicleTypes> GetAll(Expression<Func<Sr_VehicleTypes, bool>> predicate)
        {
            return unitOfWork.Repository<Sr_VehicleTypes>().Get(predicate);
        }

        public Sr_VehicleTypes GetById(int id)
        {
            return unitOfWork.Repository<Sr_VehicleTypes>().GetById(id);
        }

        public Sr_VehicleTypes Insert(Sr_VehicleTypes entity)
        {
            var memb = unitOfWork.Repository<Sr_VehicleTypes>().Insert(entity);
            unitOfWork.Save();
            return memb;
        }
       
        public List<T> InsertList<T>(List<T> entitys) where T : class, new()
        {
            unitOfWork.Repository<T>().Insert(entitys);
            unitOfWork.Save();
            return null;
        }
        
        public Sr_VehicleTypes Update(Sr_VehicleTypes entity)
        {
            var memb = unitOfWork.Repository<Sr_VehicleTypes>().Update(entity);
            unitOfWork.Save();
            return memb;
        }
        
        public bool Delete(int id)
        {
            try
            {
                unitOfWork.Repository<Sr_VehicleTypes>().Delete(id);
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
