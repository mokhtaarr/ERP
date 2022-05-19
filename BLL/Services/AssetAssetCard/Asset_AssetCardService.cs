using Inv.DAL.Domain;
using Inv.DAL.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Inv.BLL.Services.AssetAssetCard
{
   public class Asset_AssetCardService : IAsset_AssetCardService
    {
        private readonly IUnitOfWork unitOfWork;

        public Asset_AssetCardService(IUnitOfWork _unitOfWork)
        {
            this.unitOfWork = _unitOfWork;
        }

        #region GLDefAccount Services
        public Asset_AssetCard GetById(int id)
        {
            return unitOfWork.Repository<Asset_AssetCard>().GetById(id);
        }

        public List<Asset_AssetCard> GetAll()
        {
            return unitOfWork.Repository<Asset_AssetCard>().GetAll();
        }

        public List<Asset_AssetCard> GetAll(Expression<Func<Asset_AssetCard, bool>> predicate)
        {
            return unitOfWork.Repository<Asset_AssetCard>().Get(predicate);
        }
        
        public List<Cal_AssetAccounts> GetAssetAccounts(Expression<Func<Cal_AssetAccounts, bool>> predicate)
        {
            return unitOfWork.Repository<Cal_AssetAccounts>().Get(predicate);
        }

        public Asset_AssetCard Insert(Asset_AssetCard entity)
        {
            var memb = unitOfWork.Repository<Asset_AssetCard>().Insert(entity);
            unitOfWork.Save();
            return memb;
        }
        
        public List<T> InsertList<T>(List<T> entitys) where T : class, new()
        {
            unitOfWork.Repository<T>().Insert(entitys);
            unitOfWork.Save();
            return null;
        }
        
        public Asset_AssetCard Update(Asset_AssetCard entity)
        {

            var memb = unitOfWork.Repository<Asset_AssetCard>().Update(entity);
            unitOfWork.Save();
            return memb;
        }

        public void UpdateAssetCards(List<Cal_AssetAccounts> accounts)
        {
            var insertedRecord = accounts.Where(x => x.StatusFlag == 'i').ToList();
            var updatedRecord = accounts.Where(x => x.StatusFlag == 'u').ToList();
            var deletedRecord = accounts.Where(x => x.StatusFlag == 'd').ToList();

            if (updatedRecord.Count() > 0)
                unitOfWork.Repository<Cal_AssetAccounts>().Update(updatedRecord);

            if (insertedRecord.Count() > 0)
                unitOfWork.Repository<Cal_AssetAccounts>().Insert(insertedRecord);

            if (deletedRecord.Count() > 0)
            {
                foreach (var entity in deletedRecord)
                    unitOfWork.Repository<Cal_AssetAccounts>().Delete(entity.AssetAccountId);
            }
            //unitOfWork.Repository<Cal_CustAccounts>().Insert(accounts);
            unitOfWork.Save();
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
                unitOfWork.Repository<Asset_AssetCard>().Delete(id);
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
