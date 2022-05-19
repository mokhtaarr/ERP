using Inv.DAL.Domain;
using Inv.DAL.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Inv.BLL.Services.MSCustomerCategory
{
   public class MS_CustomerCategoryService : IMS_CustomerCategoryService
    {
        private readonly IUnitOfWork unitOfWork;

        public MS_CustomerCategoryService(IUnitOfWork _unitOfWork)
        {
            this.unitOfWork = _unitOfWork;
        }

        #region GLDefAccount Services
        public MS_CustomerCategory GetById(int id)
        {
            return unitOfWork.Repository<MS_CustomerCategory>().GetById(id);
        }

        public List<MS_CustomerCategory> GetAll()
        {
            return unitOfWork.Repository<MS_CustomerCategory>().GetAll();
        }

        public List<MS_CustomerCategory> GetAll(Expression<Func<MS_CustomerCategory, bool>> predicate)
        {
            return unitOfWork.Repository<MS_CustomerCategory>().Get(predicate);
        }

        public MS_CustomerCategory Insert(MS_CustomerCategory entity)
        {
            var memb = unitOfWork.Repository<MS_CustomerCategory>().Insert(entity);
            unitOfWork.Save();
            return memb;
        }
        
        public void InsertList(List<MS_CustomerCategory> MS_CustomerCategory)
        {
            unitOfWork.Repository<MS_CustomerCategory>().Insert(MS_CustomerCategory);
            unitOfWork.Save();
        }
        
        public MS_CustomerCategory Update(MS_CustomerCategory entity)
        {

            var memb = unitOfWork.Repository<MS_CustomerCategory>().Update(entity);
            unitOfWork.Save();
            return memb;
        }
        
        public void UpdateList(List<MS_CustomerCategory> MS_CustomerCategory)
        {
            unitOfWork.Repository<MS_CustomerCategory>().Update(MS_CustomerCategory);
            unitOfWork.Save();
        }

        public void DeleteList(List<MS_CustomerCategory> MS_CustomerCategory)
        {
            unitOfWork.Repository<MS_CustomerCategory>().Delete(MS_CustomerCategory);
            unitOfWork.Save();
        }
        public bool Delete(int id)
        {
            try
            {
                unitOfWork.Repository<MS_CustomerCategory>().Delete(id);
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
