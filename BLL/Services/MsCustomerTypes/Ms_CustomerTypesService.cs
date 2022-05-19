using Inv.DAL.Domain;
using Inv.DAL.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Inv.BLL.Services.MsCustomerTypes
{
   public class Ms_CustomerTypesService : IMs_CustomerTypesService
    {
        private readonly IUnitOfWork unitOfWork;

        public Ms_CustomerTypesService(IUnitOfWork _unitOfWork)
        {
            this.unitOfWork = _unitOfWork;
        }

        #region GLDefAccount Services
        public Ms_CustomerTypes GetById(int id)
        {
            return unitOfWork.Repository<Ms_CustomerTypes>().GetById(id);
        }

        public List<Ms_CustomerTypes> GetAll()
        {
            return unitOfWork.Repository<Ms_CustomerTypes>().GetAll();
        }

        public List<Ms_CustomerTypes> GetAll(Expression<Func<Ms_CustomerTypes, bool>> predicate)
        {
            return unitOfWork.Repository<Ms_CustomerTypes>().Get(predicate);
        }

        public Ms_CustomerTypes Insert(Ms_CustomerTypes entity)
        {
            var memb = unitOfWork.Repository<Ms_CustomerTypes>().Insert(entity);
            unitOfWork.Save();
            return memb;
        }
        
        public void InsertList(List<Ms_CustomerTypes> Ms_CustomerTypes)
        {
            unitOfWork.Repository<Ms_CustomerTypes>().Insert(Ms_CustomerTypes);
            unitOfWork.Save();
        }
        
        public Ms_CustomerTypes Update(Ms_CustomerTypes entity)
        {

            var memb = unitOfWork.Repository<Ms_CustomerTypes>().Update(entity);
            unitOfWork.Save();
            return memb;
        }
        
        public void UpdateList(List<Ms_CustomerTypes> Ms_CustomerTypes)
        {
            unitOfWork.Repository<Ms_CustomerTypes>().Update(Ms_CustomerTypes);
            unitOfWork.Save();
        }

        public void DeleteList(List<Ms_CustomerTypes> Ms_CustomerTypes)
        {
            unitOfWork.Repository<Ms_CustomerTypes>().Delete(Ms_CustomerTypes);
            unitOfWork.Save();
        }
        public bool Delete(int id)
        {
            try
            {
                unitOfWork.Repository<Ms_CustomerTypes>().Delete(id);
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
