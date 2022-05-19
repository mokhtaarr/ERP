using Inv.BLL.Services.GLDefAccount.VM;
using Inv.DAL.Domain;
using Inv.DAL.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Inv.BLL.Services.GLDefAccount
{
   public class GLDefAccountService : IGLDefAccountService
    {
        private readonly IUnitOfWork unitOfWork;

        public GLDefAccountService(IUnitOfWork _unitOfWork)
        {
            this.unitOfWork = _unitOfWork;
        }

        #region GLDefAccount Services
        public Cal_AccountChart GetById(int id)
        {
            return unitOfWork.Repository<Cal_AccountChart>().GetById(id);
        }

        public List<Cal_Clauses> GetAllClausesById(Expression<Func<Cal_Clauses, bool>> predicate)
        {
            return unitOfWork.Repository<Cal_Clauses>().Get(predicate);
        }

        public List<Cal_AccountChart> GetAll()
        {
            return unitOfWork.Repository<Cal_AccountChart>().GetAll();
        }

        public List<Cal_AccountChart> GetAll(Expression<Func<Cal_AccountChart, bool>> predicate)
        {
            return unitOfWork.Repository<Cal_AccountChart>().Get(predicate);
        }

        public Cal_AccountChart Insert(Cal_AccountChart entity)
        {
            var memb = unitOfWork.Repository<Cal_AccountChart>().Insert(entity);
            unitOfWork.Save();
            return memb;
        }

        public Cal_AccountChart Update(Cal_AccountChart entity)
        {

            var memb = unitOfWork.Repository<Cal_AccountChart>().Update(entity);
            unitOfWork.Save();
            return memb;
        }
        public List<Cal_Clauses> UpdateClauses(List<Cal_Clauses> Clauses)
        {
            var insertedRecord = Clauses.Where(x => x.StatusFlag == 'i').ToList();
            var updatedRecord = Clauses.Where(x => x.StatusFlag == 'u').ToList();
            var deletedRecord = Clauses.Where(x => x.StatusFlag == 'd').ToList();

            if (updatedRecord.Count() > 0)
                unitOfWork.Repository<Cal_Clauses>().Update(updatedRecord);

            if (insertedRecord.Count() > 0)
                unitOfWork.Repository<Cal_Clauses>().Insert(insertedRecord);

            if (deletedRecord.Count() > 0)
            {
                foreach (var entity in deletedRecord)
                    unitOfWork.Repository<Cal_Clauses>().Delete(entity.ClausesId);
            }
            unitOfWork.Save();
            return Clauses;
        }

        public bool Delete(int id)
        {
            try
            {
                unitOfWork.Repository<Cal_AccountChart>().Delete(id);
                unitOfWork.Save();
                return true;
            }
            catch 
            {
                return false;
            }
        }

        public List<Cal_AccountUsersVM> GetAllUsersById(int id)
        {
            return unitOfWork.Repository<Cal_AccountUsersVM>().Get(x=>x.AccountId == id);
        }

        public List<T> InsertList<T>(List<T> entitys) where T : class, new()
        {
            unitOfWork.Repository<T>().Insert(entitys);
            unitOfWork.Save();
            return null;
        }

        public List<T> DeleteList<T>(List<T> entitys) where T : class, new()
        {
            unitOfWork.Repository<T>().Delete(entitys);
            unitOfWork.Save();
            return null;
        }
        #endregion
    }
}
