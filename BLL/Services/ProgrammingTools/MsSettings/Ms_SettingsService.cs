using Inv.DAL.Domain;
using Inv.DAL.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Inv.BLL.Services.ProgrammingTools.MsSettings
{
   public class MS_SettingsService : IMS_SettingsService
    {
        private readonly IUnitOfWork unitOfWork;

        public MS_SettingsService(IUnitOfWork _unitOfWork)
        {
            this.unitOfWork = _unitOfWork;
        }

        #region GLDefAccount Services
        public MS_Settings GetById(int id)
        {
            return unitOfWork.Repository<MS_Settings>().GetById(id);
        }

        public List<MS_Settings> GetAll()
        {
            return unitOfWork.Repository<MS_Settings>().GetAll();
        }

        public List<MS_Settings> GetAll(Expression<Func<MS_Settings, bool>> predicate)
        {
            return unitOfWork.Repository<MS_Settings>().Get(predicate);
        }
        
        public List<Cal_AssetAccounts> GetAssetAccounts(Expression<Func<Cal_AssetAccounts, bool>> predicate)
        {
            return unitOfWork.Repository<Cal_AssetAccounts>().Get(predicate);
        }

        public MS_Settings Insert(MS_Settings entity)
        {
            var memb = unitOfWork.Repository<MS_Settings>().Insert(entity);
            unitOfWork.Save();
            return memb;
        }
        
        public List<T> InsertList<T>(List<T> entitys) where T : class, new()
        {
            unitOfWork.Repository<T>().Insert(entitys);
            unitOfWork.Save();
            return null;
        }
        
        public MS_Settings Update(MS_Settings entity)
        {

            var memb = unitOfWork.Repository<MS_Settings>().Update(entity);
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
                unitOfWork.Repository<MS_Settings>().Delete(id);
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
