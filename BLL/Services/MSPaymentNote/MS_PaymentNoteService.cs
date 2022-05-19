using Inv.BLL.Services.MSPaymentNote;
using Inv.DAL.Domain;
using Inv.DAL.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Inv.BLL.Services.MSPaymentNote
{
  public  class MS_PaymentNoteService : IMS_PaymentNoteService
    {
        private readonly IUnitOfWork unitOfWork;
        public MS_PaymentNoteService(IUnitOfWork _unitOfWork)
        {
            this.unitOfWork = _unitOfWork;
        }

        public List<MS_PaymentNote> GetAll()
        {
            return unitOfWork.Repository<MS_PaymentNote>().GetAll();
        }

        public List<MS_PaymentNote> GetAll(Expression<Func<MS_PaymentNote, bool>> predicate)
        {
            return unitOfWork.Repository<MS_PaymentNote>().Get(predicate);
        }

        public List<Ms_PaymentNoteCurrencies> GetAllPaymentCurrencies(Expression<Func<Ms_PaymentNoteCurrencies, bool>> predicate)
        {
            return unitOfWork.Repository<Ms_PaymentNoteCurrencies>().Get(predicate);
        }

        public MS_PaymentNote GetById(int id)
        {
            return unitOfWork.Repository<MS_PaymentNote>().GetById(id);
        }

        public MS_PaymentNote Insert(MS_PaymentNote entity)
        {
            var memb = unitOfWork.Repository<MS_PaymentNote>().Insert(entity);
            unitOfWork.Save();
            return memb;
        }
       
        public List<T> InsertList<T>(List<T> entitys) where T : class, new()
        {
            unitOfWork.Repository<T>().Insert(entitys);
            unitOfWork.Save();
            return null;
        }
        
        public MS_PaymentNote Update(MS_PaymentNote entity)
        {
            var memb = unitOfWork.Repository<MS_PaymentNote>().Update(entity);
            unitOfWork.Save();
            return memb;
        }

        public void UpdateCurrencies(List<Ms_PaymentNoteCurrencies> currencies)
        {
            var OldReceiptNoteCurrencies = unitOfWork.Repository<Ms_PaymentNoteCurrencies>().GetAll().Where(x => x.PayId == currencies[0].PayId).ToList();
            unitOfWork.Repository<Ms_PaymentNoteCurrencies>().Delete(OldReceiptNoteCurrencies);
            unitOfWork.Repository<Ms_PaymentNoteCurrencies>().Insert(currencies);
            unitOfWork.Save();
        }

        public bool Delete(int id)
        {
            try
            {
                unitOfWork.Repository<MS_PaymentNote>().Delete(id);
                unitOfWork.Save();
                return true;
            }
            catch 
            {
                return false;
            }
        }

        public List<T> DeleteList<T>(List<T> entitys) where T : class, new()
        {
            unitOfWork.Repository<T>().Delete(entitys);
            unitOfWork.Save();
            return null;
        }

    }
}
