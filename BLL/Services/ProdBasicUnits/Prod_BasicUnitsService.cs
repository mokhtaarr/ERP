using Inv.DAL.Domain;
using Inv.DAL.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Inv.BLL.Services.ProdBasicUnits
{
   public class Prod_BasicUnitsService : IProd_BasicUnitsService
    {
        private readonly IUnitOfWork unitOfWork;

        public Prod_BasicUnitsService(IUnitOfWork _unitOfWork)
        {
            this.unitOfWork = _unitOfWork;
        }

        #region GLDefAccount Services
        public Prod_BasicUnits GetById(int id)
        {
            return unitOfWork.Repository<Prod_BasicUnits>().GetById(id);
        }

        public List<Prod_BasicUnits> GetAll()
        {
            return unitOfWork.Repository<Prod_BasicUnits>().GetAll();
        }

        public List<Prod_BasicUnits> GetAll(Expression<Func<Prod_BasicUnits, bool>> predicate)
        {
            return unitOfWork.Repository<Prod_BasicUnits>().Get(predicate);
        }
        
        public List<Prod_BasicUnits> GetDetails(Expression<Func<Prod_BasicUnits, bool>> predicate)
        {
            return unitOfWork.Repository<Prod_BasicUnits>().Get(predicate);
        }

        public Prod_BasicUnits Insert(Prod_BasicUnits entity)
        {
            var memb = unitOfWork.Repository<Prod_BasicUnits>().Insert(entity);
            unitOfWork.Save();
            return memb;
        }
        
        public List<T> InsertList<T>(List<T> entitys) where T : class, new()
        {
            unitOfWork.Repository<T>().Insert(entitys);
            unitOfWork.Save();
            return null;
        }
        
        public Prod_BasicUnits Update(Prod_BasicUnits entity)
        {

            var memb = unitOfWork.Repository<Prod_BasicUnits>().Update(entity);
            unitOfWork.Save();
            return memb;
        }

        public void UpdateDetails(List<Prod_BasicUnits> entities)
        {
            var insertedRecord = entities.Where(x => x.StatusFlag == 'i').ToList();
            var updatedRecord = entities.Where(x => x.StatusFlag == 'u').ToList();
            var deletedRecord = entities.Where(x => x.StatusFlag == 'd').ToList();

            if (updatedRecord.Count() > 0)
                unitOfWork.Repository<Prod_BasicUnits>().Update(updatedRecord);

            if (insertedRecord.Count() > 0)
                unitOfWork.Repository<Prod_BasicUnits>().Insert(insertedRecord);

            if (deletedRecord.Count() > 0)
            {
                foreach (var entity in deletedRecord)
                    unitOfWork.Repository<Prod_BasicUnits>().Delete(entity.BasUnitId);
            }
            unitOfWork.Save();
        }

        public bool DeleteList<T>(List<T> entitys) where T : class, new()
        {
            bool flag = true;
            try
            {
                unitOfWork.Repository<T>().Delete(entitys);
                unitOfWork.Save();
            }
            catch (Exception ex)
            {
                flag = false;
            }
            return flag;
        }
        
        public bool Delete(int id)
        {
            try
            {
                unitOfWork.Repository<Prod_BasicUnits>().Delete(id);
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
