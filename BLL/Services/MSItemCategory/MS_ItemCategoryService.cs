using Inv.DAL.Domain;
using Inv.DAL.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Inv.BLL.Services.MSItemCategory
{
   public class MS_ItemCategoryService : IMS_ItemCategoryService
    {
        private readonly IUnitOfWork unitOfWork;

        public MS_ItemCategoryService(IUnitOfWork _unitOfWork)
        {
            this.unitOfWork = _unitOfWork;
        }

        #region GLDefAccount Services
        public MS_ItemCategory GetById(int id)
        {
            return unitOfWork.Repository<MS_ItemCategory>().GetById(id);
        }

        public List<MS_ItemCategory> GetAll()
        {
            return unitOfWork.Repository<MS_ItemCategory>().GetAll();
        }

        public List<MS_ItemCategory> GetAll(Expression<Func<MS_ItemCategory, bool>> predicate)
        {
            return unitOfWork.Repository<MS_ItemCategory>().Get(predicate);
        }

        public MS_ItemCategory Insert(MS_ItemCategory entity)
        {
            var memb = unitOfWork.Repository<MS_ItemCategory>().Insert(entity);
            unitOfWork.Save();
            return memb;
        }
        
        public void InsertList(List<MS_ItemCategory> MS_ItemCategory)
        {
            unitOfWork.Repository<MS_ItemCategory>().Insert(MS_ItemCategory);
            unitOfWork.Save();
        }
        
        public MS_ItemCategory Update(MS_ItemCategory entity)
        {

            var memb = unitOfWork.Repository<MS_ItemCategory>().Update(entity);
            unitOfWork.Save();
            return memb;
        }
        
        public void UpdateList(List<MS_ItemCategory> MS_ItemCategory)
        {
            unitOfWork.Repository<MS_ItemCategory>().Update(MS_ItemCategory);
            unitOfWork.Save();
        }

        public void DeleteList(List<MS_ItemCategory> MS_ItemCategory)
        {
            unitOfWork.Repository<MS_ItemCategory>().Delete(MS_ItemCategory);
            unitOfWork.Save();
        }
        public bool Delete(int id)
        {
            try
            {
                unitOfWork.Repository<MS_ItemCategory>().Delete(id);
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
