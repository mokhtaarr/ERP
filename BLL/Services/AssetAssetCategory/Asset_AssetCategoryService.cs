using Inv.DAL.Domain;
using Inv.DAL.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Inv.BLL.Services.AssetAssetCategory
{
   public class Asset_AssetCategoryService : IAsset_AssetCategoryService
    {
        private readonly IUnitOfWork unitOfWork;

        public Asset_AssetCategoryService(IUnitOfWork _unitOfWork)
        {
            this.unitOfWork = _unitOfWork;
        }

        #region GLDefAccount Services
        public Asset_AssetCategory GetById(int id)
        {
            return unitOfWork.Repository<Asset_AssetCategory>().GetById(id);
        }

        public List<Asset_AssetCategory> GetAll()
        {
            return unitOfWork.Repository<Asset_AssetCategory>().GetAll();
        }

        public List<Asset_AssetCategory> GetAll(Expression<Func<Asset_AssetCategory, bool>> predicate)
        {
            return unitOfWork.Repository<Asset_AssetCategory>().Get(predicate);
        }

        public Asset_AssetCategory Insert(Asset_AssetCategory entity)
        {
            var memb = unitOfWork.Repository<Asset_AssetCategory>().Insert(entity);
            unitOfWork.Save();
            return memb;
        }
        
        public void InsertList(List<Asset_AssetCategory> Asset_AssetCategory)
        {
            unitOfWork.Repository<Asset_AssetCategory>().Insert(Asset_AssetCategory);
            unitOfWork.Save();
        }
        
        public Asset_AssetCategory Update(Asset_AssetCategory entity)
        {

            var memb = unitOfWork.Repository<Asset_AssetCategory>().Update(entity);
            unitOfWork.Save();
            return memb;
        }
        
        public void UpdateList(List<Asset_AssetCategory> Asset_AssetCategory)
        {
            unitOfWork.Repository<Asset_AssetCategory>().Update(Asset_AssetCategory);
            unitOfWork.Save();
        }

        public void DeleteList(List<Asset_AssetCategory> Asset_AssetCategory)
        {
            unitOfWork.Repository<Asset_AssetCategory>().Delete(Asset_AssetCategory);
            unitOfWork.Save();
        }
        public bool Delete(int id)
        {
            try
            {
                unitOfWork.Repository<Asset_AssetCategory>().Delete(id);
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
