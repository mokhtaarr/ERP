using Inv.DAL.Domain;
using Inv.DAL.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Inv.BLL.Services.MsReceiptNote
{
    public class Ms_ReceiptNoteService : IMs_ReceiptNoteService
    {
        private readonly IUnitOfWork unitOfWork;

        public Ms_ReceiptNoteService(IUnitOfWork _unitOfWork)
        {
            this.unitOfWork = _unitOfWork;
        }

        #region GLDefAccount Services
        public Ms_ReceiptNote GetById(int id)
        {
            return unitOfWork.Repository<Ms_ReceiptNote>().GetById(id);
        }

        public List<Ms_ReceiptNote> GetAll()
        {
            return unitOfWork.Repository<Ms_ReceiptNote>().GetAll();
        }

        public List<Ms_ReceiptNote> GetAll(Expression<Func<Ms_ReceiptNote, bool>> predicate)
        {
            return unitOfWork.Repository<Ms_ReceiptNote>().Get(predicate);
        }

        public List<Ms_ReceiptNoteCurrencies> GetAllReceiptNoteCurrencies(Expression<Func<Ms_ReceiptNoteCurrencies, bool>> predicate)
        {
            return unitOfWork.Repository<Ms_ReceiptNoteCurrencies>().Get(predicate);
        }

        public Ms_ReceiptNote Insert(Ms_ReceiptNote entity)
        {
            var memb = unitOfWork.Repository<Ms_ReceiptNote>().Insert(entity);
            unitOfWork.Save();
            return memb;
        }

        public List<T> InsertList<T>(List<T> entitys) where T : class, new()
        {
            unitOfWork.Repository<T>().Insert(entitys);
            unitOfWork.Save();
            return null;
        }

        public Ms_ReceiptNote Update(Ms_ReceiptNote entity)
        {
            var memb = unitOfWork.Repository<Ms_ReceiptNote>().Update(entity);
            unitOfWork.Save();
            return memb;
        }

        public void UpdateCurrencies(List<Ms_ReceiptNoteCurrencies> currencies)
        {
            var OldReceiptNoteCurrencies = unitOfWork.Repository<Ms_ReceiptNoteCurrencies>().GetAll().Where(x => x.RectId == currencies[0].RectId).ToList();
            //var Diff = OldReceiptNoteCurrencies.Except(currencies).ToList();
            //if(Diff.Count() > 0)
            //{
            unitOfWork.Repository<Ms_ReceiptNoteCurrencies>().Delete(OldReceiptNoteCurrencies);
            unitOfWork.Repository<Ms_ReceiptNoteCurrencies>().Insert(currencies);
            unitOfWork.Save();
            //}
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
                unitOfWork.Repository<Ms_ReceiptNote>().Delete(id);
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
