using Inv.DAL.Domain;
using Inv.DAL.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Inv.BLL.Services.MSBoxBank
{
  public  class MS_BoxBankService : IMS_BoxBankService
    {
        private readonly IUnitOfWork unitOfWork;
        public MS_BoxBankService(IUnitOfWork _unitOfWork)
        {
            this.unitOfWork = _unitOfWork;
        }

        public List<MS_BoxBank> GetAll()
        {
            return unitOfWork.Repository<MS_BoxBank>().GetAll();
        }

        public List<MS_BoxBank> GetAll(Expression<Func<MS_BoxBank, bool>> predicate)
        {
            return unitOfWork.Repository<MS_BoxBank>().Get(predicate);
        }

        public MS_BoxBank GetById(int id)
        {
            return unitOfWork.Repository<MS_BoxBank>().GetById(id);
        }

        public MS_BoxBank Insert(MS_BoxBank entity)
        {
            var memb = unitOfWork.Repository<MS_BoxBank>().Insert(entity);
            unitOfWork.Save();
            return memb;
        }
       
        public List<T> InsertList<T>(List<T> entitys) where T : class, new()
        {
            unitOfWork.Repository<T>().Insert(entitys);
            unitOfWork.Save();
            return null;
        }
        
        public MS_BoxBank Update(MS_BoxBank entity)
        {
            var memb = unitOfWork.Repository<MS_BoxBank>().Update(entity);
            unitOfWork.Save();
            return memb;
        }
        
        public List<MS_BoxCurrency> GetBoxCurrency(Expression<Func<MS_BoxCurrency, bool>> predicate)
        {
            return unitOfWork.Repository<MS_BoxCurrency>().Get(predicate);
        }
        
        public List<Ms_BoxUsers> GetBoxUsers(Expression<Func<Ms_BoxUsers, bool>> predicate)
        {
            return unitOfWork.Repository<Ms_BoxUsers>().Get(predicate);
        }

        public void UpdateBoxCurrency(List<MS_BoxCurrency> entity)
        {
            var insertedRecord = entity.Where(x => x.StatusFlag == 'i').ToList();
            var updatedRecord = entity.Where(x => x.StatusFlag == 'u').ToList();
            var deletedRecord = entity.Where(x => x.StatusFlag == 'd').ToList();

            if (updatedRecord.Count() > 0)
                unitOfWork.Repository<MS_BoxCurrency>().Update(updatedRecord);

            if (insertedRecord.Count() > 0)
                unitOfWork.Repository<MS_BoxCurrency>().Insert(insertedRecord);

            if (deletedRecord.Count() > 0)
            {
                foreach (var item in deletedRecord)
                    unitOfWork.Repository<MS_BoxCurrency>().Delete(item.BoxCurrencyId);
            }
            unitOfWork.Save();
        }

        public void UpdateBoxUsers(List<Ms_BoxUsers> entity)
        {
            var insertedRecord = entity.Where(x => x.StatusFlag == 'i').ToList();
            var updatedRecord = entity.Where(x => x.StatusFlag == 'u').ToList();
            var deletedRecord = entity.Where(x => x.StatusFlag == 'd').ToList();

            if (updatedRecord.Count() > 0)
                unitOfWork.Repository<Ms_BoxUsers>().Update(updatedRecord);

            if (insertedRecord.Count() > 0)
                unitOfWork.Repository<Ms_BoxUsers>().Insert(insertedRecord);

            if (deletedRecord.Count() > 0)
            {
                foreach (var item in deletedRecord)
                    unitOfWork.Repository<Ms_BoxUsers>().Delete(item.BoxUsersId);
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
                unitOfWork.Repository<MS_BoxBank>().Delete(id);
                unitOfWork.Save();
                return true;
            }
            catch 
            {
                return false;
            }
        }

        public bool DeleteTermsDetails(int id)
        {
            try
            {
                unitOfWork.Repository<Ms_TermsDetails>().Delete(id);
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
