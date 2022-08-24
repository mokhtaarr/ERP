using Inv.DAL.Domain;
using Inv.DAL.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Inv.BLL.Services.Purchase.PurchasInvoice
{
   public class MS_PurchasInvoiceService : IMS_PurchasInvoiceService
    {
        private readonly IUnitOfWork unitOfWork;

        public MS_PurchasInvoiceService(IUnitOfWork _unitOfWork)
        {
            this.unitOfWork = _unitOfWork;
        }

        #region GLDefAccount Services
        public MS_PurchasInvoice GetById(int id)
        {
            return unitOfWork.Repository<MS_PurchasInvoice>().GetById(id);
        }

        public List<MS_PurchasInvoice> GetAll()
        {
            return unitOfWork.Repository<MS_PurchasInvoice>().GetAll();
        }

        public List<MS_PurchasInvoice> GetAll(Expression<Func<MS_PurchasInvoice, bool>> predicate)
        {
            return unitOfWork.Repository<MS_PurchasInvoice>().Get(predicate);
        }
        
        public List<MS_PurchaseInvoiceItemCard> GetPurchaseInvoiceItemCard(Expression<Func<MS_PurchaseInvoiceItemCard, bool>> predicate)
        {
            return unitOfWork.Repository<MS_PurchaseInvoiceItemCard>().Get(predicate);
        }

        public MS_PurchasInvoice Insert(MS_PurchasInvoice entity)
        {
            var memb = unitOfWork.Repository<MS_PurchasInvoice>().Insert(entity);
            unitOfWork.Save();
            return memb;
        }
        
        public List<T> InsertList<T>(List<T> entitys) where T : class, new()
        {
            unitOfWork.Repository<T>().Insert(entitys);
            unitOfWork.Save();
            return null;
        }
        
        public MS_PurchasInvoice Update(MS_PurchasInvoice entity)
        {

            var memb = unitOfWork.Repository<MS_PurchasInvoice>().Update(entity);
            unitOfWork.Save();
            return memb;
        }

        public void UpdatePurchaseInvoiceItemCard(List<MS_PurchaseInvoiceItemCard> entities)
        {
            var insertedRecord = entities.Where(x => x.StatusFlag == 'i').ToList();
            var updatedRecord = entities.Where(x => x.StatusFlag == 'u').ToList();
            var deletedRecord = entities.Where(x => x.StatusFlag == 'd').ToList();

            if (updatedRecord.Count() > 0)
                unitOfWork.Repository<MS_PurchaseInvoiceItemCard>().Update(updatedRecord);

            if (insertedRecord.Count() > 0)
                unitOfWork.Repository<MS_PurchaseInvoiceItemCard>().Insert(insertedRecord);

            if (deletedRecord.Count() > 0)
            {
                foreach (var entity in deletedRecord)
                    unitOfWork.Repository<MS_PurchaseInvoiceItemCard>().Delete(entity.InvItemCardId);
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
                unitOfWork.Repository<MS_PurchasInvoice>().Delete(id);
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
