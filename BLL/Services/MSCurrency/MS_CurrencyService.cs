using Inv.DAL.Domain;
using Inv.DAL.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Inv.BLL.Services.MSCurrency
{
    public class MS_CurrencyService : IMS_CurrencyService
    {
        private readonly IUnitOfWork unitOfWork;

        public MS_CurrencyService(IUnitOfWork _unitOfWork)
        {
            this.unitOfWork = _unitOfWork;
        }

        #region GLDefAccount Services
        public MS_Currency GetById(int id)
        {
            return unitOfWork.Repository<MS_Currency>().GetById(id);
        }

        public List<MS_Currency> GetAll()
        {
            return unitOfWork.Repository<MS_Currency>().GetAll();
        }


        public List<Ms_CurrencyCategoryJoin> GetAllCurrencyCategoryJoin(Expression<Func<Ms_CurrencyCategoryJoin, bool>> predicate)
        {
            return unitOfWork.Repository<Ms_CurrencyCategoryJoin>().Get(predicate);
        }

        public List<Ms_CurrencyRate> GetAllCurrencyRate(Expression<Func<Ms_CurrencyRate, bool>> predicate)
        {
            return unitOfWork.Repository<Ms_CurrencyRate>().Get(predicate);
        }
        public List<MS_Currency> GetAll(Expression<Func<MS_Currency, bool>> predicate)
        {
            return unitOfWork.Repository<MS_Currency>().Get(predicate);
        }

        public MS_Currency Insert(MS_Currency entity)
        {
            var memb = unitOfWork.Repository<MS_Currency>().Insert(entity);
            unitOfWork.Save();
            return memb;
        }

        public List<T> InsertList<T>(List<T> entitys) where T : class, new()
        {
            unitOfWork.Repository<T>().Insert(entitys);
            unitOfWork.Save();
            return null;
        }

        public MS_Currency Update(MS_Currency entity)
        {

            var memb = unitOfWork.Repository<MS_Currency>().Update(entity);
            unitOfWork.Save();
            return memb;
        }

        public void UpdateCurrencyCategoryJoins(List<Ms_CurrencyCategoryJoin>  categoryJoins)
        {
            var insertedRecord = categoryJoins.Where(x => x.StatusFlag == 'i').ToList();
            var updatedRecord = categoryJoins.Where(x => x.StatusFlag == 'u').ToList();
            var deletedRecord = categoryJoins.Where(x => x.StatusFlag == 'd').ToList();

            if (updatedRecord.Count() > 0)
                unitOfWork.Repository<Ms_CurrencyCategoryJoin>().Update(updatedRecord);

            if (insertedRecord.Count() > 0)
                unitOfWork.Repository<Ms_CurrencyCategoryJoin>().Insert(insertedRecord);

            if (deletedRecord.Count() > 0)
            {
                foreach (var entity in deletedRecord)
                    unitOfWork.Repository<Ms_CurrencyCategoryJoin>().Delete(entity);
            }
            unitOfWork.Save();
        }
        public void UpdatecurrencyRates(List<Ms_CurrencyRate> currencyRates)
        {
            var insertedRecord = currencyRates.Where(x => x.StatusFlag == 'i');
            var updatedRecord = currencyRates.Where(x => x.StatusFlag == 'u');
            var deletedRecord = currencyRates.Where(x => x.StatusFlag == 'd');

            if (updatedRecord.Count() > 0)
                unitOfWork.Repository<Ms_CurrencyRate>().Update(updatedRecord);

            if (insertedRecord.Count() > 0)
                unitOfWork.Repository<Ms_CurrencyRate>().Insert(insertedRecord);

            if (deletedRecord.Count() > 0)
            {
                foreach (var entity in deletedRecord)
                    unitOfWork.Repository<Ms_CurrencyRate>().Delete(entity);
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
                unitOfWork.Repository<MS_Currency>().Delete(id);
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
