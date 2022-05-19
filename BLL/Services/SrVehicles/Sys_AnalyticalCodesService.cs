using Inv.DAL.Domain;
using Inv.DAL.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Inv.BLL.Services.SrVehicles
{
    public class Sr_VehiclesService : ISr_VehiclesService
    {
        private readonly IUnitOfWork unitOfWork;

        public Sr_VehiclesService(IUnitOfWork _unitOfWork)
        {
            this.unitOfWork = _unitOfWork;
        }

        #region GLDefAccount Services
        public Sr_Vehicles GetById(int id)
        {
            return unitOfWork.Repository<Sr_Vehicles>().GetById(id);
        }

        public List<Sr_Vehicles> GetAll()
        {
            return unitOfWork.Repository<Sr_Vehicles>().GetAll();
        }

        public List<Sr_Vehicles> GetAll(Expression<Func<Sr_Vehicles, bool>> predicate)
        {
            return unitOfWork.Repository<Sr_Vehicles>().Get(predicate);
        }

        public Sr_Vehicles Insert(Sr_Vehicles entity)
        {
            var memb = unitOfWork.Repository<Sr_Vehicles>().Insert(entity);
            unitOfWork.Save();
            return memb;
        }

        public List<T> InsertList<T>(List<T> entitys) where T : class, new()
        {
            unitOfWork.Repository<T>().Insert(entitys);
            unitOfWork.Save();
            return null;
        }

        public Sr_Vehicles Update(Sr_Vehicles entity)
        {

            var memb = unitOfWork.Repository<Sr_Vehicles>().Update(entity);
            unitOfWork.Save();
            return memb;
        }

        public List<T> DeleteList<T>(List<T> entitys) where T : class, new()
        {
            unitOfWork.Repository<T>().Delete(entitys);
            unitOfWork.Save();
            return null;
        }
        
        public bool Delete(int id)
        {
            try
            {
                unitOfWork.Repository<Sr_Vehicles>().Delete(id);
                unitOfWork.Save();
                return true;
            }
            catch
            {
                return false;
            }
        }
        #endregion
    }
}
