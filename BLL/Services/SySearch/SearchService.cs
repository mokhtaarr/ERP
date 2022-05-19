using Inv.DAL.Domain;
using Inv.DAL.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Inv.BLL.Services.SySearch
{
   public class SearchService : ISearchService
    {
        private readonly IUnitOfWork unitOfWork;

        public SearchService(IUnitOfWork _unitOfWork)
        {
            this.unitOfWork = _unitOfWork;
        }

        #region GLDefAccount Services
        public G_SearchFormModule GetById(string code)
        {
            return unitOfWork.Repository<G_SearchFormModule>().Get(x=>x.ModuleCode == code).FirstOrDefault();
        }

        public List<G_SearchFormModule> GetAll()
        {
            return unitOfWork.Repository<G_SearchFormModule>().GetAll();
        }

        public List<G_SearchFormModule> GetAll(Expression<Func<G_SearchFormModule, bool>> predicate)
        {
            return unitOfWork.Repository<G_SearchFormModule>().Get(predicate);
        }

        public G_SearchFormModule Insert(G_SearchFormModule entity)
        {
            var memb = unitOfWork.Repository<G_SearchFormModule>().Insert(entity);
            unitOfWork.Save();
            return memb;
        }
        
        public List<T> InsertList<T>(List<T> entitys) where T : class, new()
        {
            unitOfWork.Repository<T>().Insert(entitys);
            unitOfWork.Save();
            return null;
        }
        
        public G_SearchFormModule Update(G_SearchFormModule entity)
        {
            var memb = unitOfWork.Repository<G_SearchFormModule>().Update(entity);
            unitOfWork.Save();
            return memb;
        }

        public void UpdateSettings(List<G_SearchForm> settings)
        {
            var insertedRecord = settings.Where(x => x.StatusFlag == 'i').ToList();
            var updatedRecord = settings.Where(x => x.StatusFlag == 'u').ToList();
            var deletedRecord = settings.Where(x => x.StatusFlag == 'd').ToList();

            if (updatedRecord.Count() > 0)
                unitOfWork.Repository<G_SearchForm>().Update(updatedRecord);

            if (insertedRecord.Count() > 0)
                unitOfWork.Repository<G_SearchForm>().Insert(insertedRecord);

            if (deletedRecord.Count() > 0)
            {
                foreach (var entity in deletedRecord)
                    unitOfWork.Repository<G_SearchForm>().Delete(entity);
            }
            unitOfWork.Save();
        }

        public void UpdateColumnSetting(List<G_SearchFormSetting> ColumnSetting)
        {
            var insertedRecord = ColumnSetting.Where(x => x.StatusFlag == 'i');
            var updatedRecord = ColumnSetting.Where(x => x.StatusFlag == 'u');
            var deletedRecord = ColumnSetting.Where(x => x.StatusFlag == 'd');

            if (updatedRecord.Count() > 0)
                unitOfWork.Repository<G_SearchFormSetting>().Update(updatedRecord);

            if (insertedRecord.Count() > 0)
                unitOfWork.Repository<G_SearchFormSetting>().Insert(insertedRecord);

            if (deletedRecord.Count() > 0)
            {
                foreach (var entity in deletedRecord)
                    unitOfWork.Repository<G_SearchFormSetting>().Delete(entity.SearchFormSettingID);
            }
            unitOfWork.Save();
        }
        
        public List<T> DeleteList<T>(List<T> entitys) where T : class, new()
        {
            unitOfWork.Repository<T>().Delete(entitys);
            unitOfWork.Save();
            return null;
        }
        
        public bool Delete(G_SearchFormModule module)
        {
            try
            {
                unitOfWork.Repository<G_SearchFormModule>().Delete(module);
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
