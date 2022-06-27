using Inv.DAL.Domain;
using Inv.DAL.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Inv.BLL.Services.MsItemCard
{
   public class MS_ItemCardService : IMS_ItemCardService
    {
        private readonly IUnitOfWork unitOfWork;

        public MS_ItemCardService(IUnitOfWork _unitOfWork)
        {
            this.unitOfWork = _unitOfWork;
        }

        #region GLDefAccount Services
        public MS_ItemCard GetById(int id)
        {
            return unitOfWork.Repository<MS_ItemCard>().GetById(id);
        }

        public List<MS_ItemCard> GetAll()
        {
            return unitOfWork.Repository<MS_ItemCard>().GetAll();
        }

        public List<MS_ItemCard> GetAll(Expression<Func<MS_ItemCard, bool>> predicate)
        {
            return unitOfWork.Repository<MS_ItemCard>().Get(predicate);
        }
        
        public List<MS_ItemVendors> GetItemVendors(Expression<Func<MS_ItemVendors, bool>> predicate)
        {
            return unitOfWork.Repository<MS_ItemVendors>().Get(predicate);
        }

        public List<Ms_ItemCardOffers> GetOffers(Expression<Func<Ms_ItemCardOffers, bool>> predicate)
        {
            return unitOfWork.Repository<Ms_ItemCardOffers>().Get(predicate);
        }
        
        public List<Prod_ItemAttributsJoin> GetAttributs(Expression<Func<Prod_ItemAttributsJoin, bool>> predicate)
        {
            return unitOfWork.Repository<Prod_ItemAttributsJoin>().Get(predicate);
        }
        
        public List<MS_ItemImages> GetItemImages(Expression<Func<MS_ItemImages, bool>> predicate)
        {
            return unitOfWork.Repository<MS_ItemImages>().Get(predicate);
        }

        public MS_ItemCard Insert(MS_ItemCard entity)
        {
            var memb = unitOfWork.Repository<MS_ItemCard>().Insert(entity);
            unitOfWork.Save();
            return memb;
        }
        
        public List<T> InsertList<T>(List<T> entitys) where T : class, new()
        {
            unitOfWork.Repository<T>().Insert(entitys);
            unitOfWork.Save();
            return null;
        }
        
        public MS_ItemCard Update(MS_ItemCard entity)
        {

            var memb = unitOfWork.Repository<MS_ItemCard>().Update(entity);
            unitOfWork.Save();
            return memb;
        }

        public void UpdateItemVendors(List<MS_ItemVendors> entities)
        {
            var insertedRecord = entities.Where(x => x.StatusFlag == 'i').ToList();
            var updatedRecord = entities.Where(x => x.StatusFlag == 'u').ToList();
            var deletedRecord = entities.Where(x => x.StatusFlag == 'd').ToList();

            if (updatedRecord.Count() > 0)
                unitOfWork.Repository<MS_ItemVendors>().Update(updatedRecord);

            if (insertedRecord.Count() > 0)
                unitOfWork.Repository<MS_ItemVendors>().Insert(insertedRecord);

            if (deletedRecord.Count() > 0)
            {
                foreach (var entity in deletedRecord)
                    unitOfWork.Repository<MS_ItemVendors>().Delete(entity.ItemVendorId);
            }
            unitOfWork.Save();
        }
        
        public void UpdateOffers(List<Ms_ItemCardOffers> entities)
        {
            var insertedRecord = entities.Where(x => x.StatusFlag == 'i').ToList();
            var updatedRecord = entities.Where(x => x.StatusFlag == 'u').ToList();
            var deletedRecord = entities.Where(x => x.StatusFlag == 'd').ToList();

            if (updatedRecord.Count() > 0)
                unitOfWork.Repository<Ms_ItemCardOffers>().Update(updatedRecord);

            if (insertedRecord.Count() > 0)
                unitOfWork.Repository<Ms_ItemCardOffers>().Insert(insertedRecord);

            if (deletedRecord.Count() > 0)
            {
                foreach (var entity in deletedRecord)
                    unitOfWork.Repository<Ms_ItemCardOffers>().Delete(entity.OfferItemId);
            }
            unitOfWork.Save();
        }
        
        public void UpdateAttributs(List<Prod_ItemAttributsJoin> entities)
        {
            var insertedRecord = entities.Where(x => x.StatusFlag == 'i').ToList();
            var updatedRecord = entities.Where(x => x.StatusFlag == 'u').ToList();
            var deletedRecord = entities.Where(x => x.StatusFlag == 'd').ToList();

            if (updatedRecord.Count() > 0)
                unitOfWork.Repository<Prod_ItemAttributsJoin>().Update(updatedRecord);

            if (insertedRecord.Count() > 0)
                unitOfWork.Repository<Prod_ItemAttributsJoin>().Insert(insertedRecord);

            if (deletedRecord.Count() > 0)
            {
                foreach (var entity in deletedRecord)
                    unitOfWork.Repository<Prod_ItemAttributsJoin>().Delete(entity.ProdItemAtrribId);
            }
            unitOfWork.Save();
        }

        public void UpdateItemImages(List<MS_ItemImages> entities)
        {
            var insertedRecord = entities.Where(x => x.StatusFlag == 'i').ToList();
            var updatedRecord = entities.Where(x => x.StatusFlag == 'u').ToList();
            var deletedRecord = entities.Where(x => x.StatusFlag == 'd').ToList();

            if (updatedRecord.Count() > 0)
                unitOfWork.Repository<MS_ItemImages>().Update(updatedRecord);

            if (insertedRecord.Count() > 0)
                unitOfWork.Repository<MS_ItemImages>().Insert(insertedRecord);

            if (deletedRecord.Count() > 0)
            {
                foreach (var entity in deletedRecord)
                    unitOfWork.Repository<MS_ItemImages>().Delete(entity.ImgId);
            }
            unitOfWork.Save();
        }
        
        public void UpdateItemUnit(List<Ms_ItemUnit> entities)
        {
            var insertedRecord = entities.Where(x => x.StatusFlag == 'i').ToList();
            var updatedRecord = entities.Where(x => x.StatusFlag == 'u').ToList();
            var deletedRecord = entities.Where(x => x.StatusFlag == 'd').ToList();

            if (updatedRecord.Count() > 0)
                unitOfWork.Repository<Ms_ItemUnit>().Update(updatedRecord);

            if (insertedRecord.Count() > 0)
                unitOfWork.Repository<Ms_ItemUnit>().Insert(insertedRecord);

            if (deletedRecord.Count() > 0)
            {
                foreach (var entity in deletedRecord)
                    unitOfWork.Repository<Ms_ItemUnit>().Delete(entity.UnitId);
            }
            unitOfWork.Save();
        }
        
        public void UpdateItemAlternatives(List<MS_ItemAlternatives> entities)
        {
            var insertedRecord = entities.Where(x => x.StatusFlag == 'i').ToList();
            var updatedRecord = entities.Where(x => x.StatusFlag == 'u').ToList();
            var deletedRecord = entities.Where(x => x.StatusFlag == 'd').ToList();

            if (updatedRecord.Count() > 0)
                unitOfWork.Repository<MS_ItemAlternatives>().Update(updatedRecord);

            if (insertedRecord.Count() > 0)
                unitOfWork.Repository<MS_ItemAlternatives>().Insert(insertedRecord);

            if (deletedRecord.Count() > 0)
            {
                foreach (var entity in deletedRecord)
                    unitOfWork.Repository<MS_ItemAlternatives>().Delete(entity.AlterId);
            }
            unitOfWork.Save();
        }
        
        public void UpdateItemCollection(List<Ms_ItemCollection> entities)
        {
            var insertedRecord = entities.Where(x => x.StatusFlag == 'i').ToList();
            var updatedRecord = entities.Where(x => x.StatusFlag == 'u').ToList();
            var deletedRecord = entities.Where(x => x.StatusFlag == 'd').ToList();

            if (updatedRecord.Count() > 0)
                unitOfWork.Repository<Ms_ItemCollection>().Update(updatedRecord);

            if (insertedRecord.Count() > 0)
                unitOfWork.Repository<Ms_ItemCollection>().Insert(insertedRecord);

            if (deletedRecord.Count() > 0)
            {
                foreach (var entity in deletedRecord)
                    unitOfWork.Repository<Ms_ItemCollection>().Delete(entity.ItemCollectId);
            }
            unitOfWork.Save();
        }
        
        public void UpdateItemCardExpenses(List<Prod_ItemcardExpenses> entities)
        {
            var insertedRecord = entities.Where(x => x.StatusFlag == 'i').ToList();
            var updatedRecord = entities.Where(x => x.StatusFlag == 'u').ToList();
            var deletedRecord = entities.Where(x => x.StatusFlag == 'd').ToList();

            if (updatedRecord.Count() > 0)
                unitOfWork.Repository<Prod_ItemcardExpenses>().Update(updatedRecord);

            if (insertedRecord.Count() > 0)
                unitOfWork.Repository<Prod_ItemcardExpenses>().Insert(insertedRecord);

            if (deletedRecord.Count() > 0)
            {
                foreach (var entity in deletedRecord)
                    unitOfWork.Repository<Prod_ItemcardExpenses>().Delete(entity.ProdExpensId);
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
                unitOfWork.Repository<MS_ItemCard>().Delete(id);
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
