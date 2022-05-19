using Inv.DAL.Domain;
using Inv.DAL.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Inv.BLL.Services.CalJurnalEntry
{
   public class Cal_JurnalEntryService : ICal_JurnalEntryService
    {
        private readonly IUnitOfWork unitOfWork;

        public Cal_JurnalEntryService(IUnitOfWork _unitOfWork)
        {
            this.unitOfWork = _unitOfWork;
        }

        #region GLDefAccount Services
        public Cal_JurnalEntry GetById(int id)
        {
            return unitOfWork.Repository<Cal_JurnalEntry>().GetById(id);
        }

        public List<Cal_JurnalEntry> GetAll()
        {
            return unitOfWork.Repository<Cal_JurnalEntry>().GetAll();
        }

        public List<Cal_JurnalEntry> GetAll(Expression<Func<Cal_JurnalEntry, bool>> predicate)
        {
            return unitOfWork.Repository<Cal_JurnalEntry>().Get(predicate);
        }


        public Cal_JurnalEntry Insert(Cal_JurnalEntry entity)
        {
            var memb = unitOfWork.Repository<Cal_JurnalEntry>().Insert(entity);
            unitOfWork.Save();
            return memb;
        }
        
        public List<T> InsertList<T>(List<T> entitys) where T : class, new()
        {
            unitOfWork.Repository<T>().Insert(entitys);
            unitOfWork.Save();
            return null;
        }
        
        public Cal_JurnalEntry Update(Cal_JurnalEntry entity)
        {
            var memb = unitOfWork.Repository<Cal_JurnalEntry>().Update(entity);
            unitOfWork.Save();
            return memb;
        }

        public void UpdateJurnalDetails(List<Cal_JurnalDetail> jurnalDetails)
        {
            var insertedRecord = jurnalDetails.Where(x => x.StatusFlag == 'i').ToList();
            var updatedRecord = jurnalDetails.Where(x => x.StatusFlag == 'u').ToList();
            var deletedRecord = jurnalDetails.Where(x => x.StatusFlag == 'd').ToList();

            if (updatedRecord.Count() > 0)
                unitOfWork.Repository<Cal_JurnalDetail>().Update(updatedRecord);

            if (insertedRecord.Count() > 0)
                unitOfWork.Repository<Cal_JurnalDetail>().Insert(insertedRecord);

            if (deletedRecord.Count() > 0)
            {
                foreach (var entity in deletedRecord)
                    unitOfWork.Repository<Cal_JurnalDetail>().Delete(entity.JurnalDetailId);
            }
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
                unitOfWork.Repository<Cal_JurnalEntry>().Delete(id);
                unitOfWork.Save();
                return true;
            }
            catch 
            {
                return false;
            }
        }

        public List<Cal_JurnalDetail> GetAllDetails(Expression<Func<Cal_JurnalDetail, bool>> predicate)
        {
            return unitOfWork.Repository<Cal_JurnalDetail>().Get(predicate);
        }
        #endregion
    }
}
