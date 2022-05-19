using Inv.BLL.Services.GLDefAccount.VM;
using Inv.DAL.Domain;
using Inv.DAL.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Inv.BLL.Services.AccountUsers
{
   public class Cal_AccountUsersService : ICal_AccountUsersService
    {
        private readonly IUnitOfWork unitOfWork;

        public Cal_AccountUsersService(IUnitOfWork _unitOfWork)
        {
            this.unitOfWork = _unitOfWork;
        }

        #region GLDefAccount Services
        public Cal_AccountUsers GetById(int id)
        {
            return unitOfWork.Repository<Cal_AccountUsers>().GetById(id);
        }

        public List<Cal_AccountUsers> GetAll()
        {
            return unitOfWork.Repository<Cal_AccountUsers>().GetAll();
        }

        public List<Cal_AccountUsers> GetAll(Expression<Func<Cal_AccountUsers, bool>> predicate)
        {
            return unitOfWork.Repository<Cal_AccountUsers>().Get(predicate);
        }

        public Cal_AccountUsers Insert(Cal_AccountUsers entity)
        {
            var memb = unitOfWork.Repository<Cal_AccountUsers>().Insert(entity);
            unitOfWork.Save();
            return memb;
        }

        public Cal_AccountUsers Update(Cal_AccountUsers entity)
        {

            var memb = unitOfWork.Repository<Cal_AccountUsers>().Update(entity);
            unitOfWork.Save();
            return memb;
        }

        public bool Delete(int id)
        {
            try
            {
                unitOfWork.Repository<Cal_AccountUsers>().Delete(id);
                unitOfWork.Save();
                return true;
            }
            catch 
            {
                return false;
            }
        }

        public void InsertList(List<Cal_AccountUsers> Cal_AccountUsers)
        {
            unitOfWork.Repository<Cal_AccountUsers>().Insert(Cal_AccountUsers);
            unitOfWork.Save();
        }
        public void UpdateList(List<Cal_AccountUsers> Cal_AccountUsers)
        {
            var insertedRecord = Cal_AccountUsers.Where(x => x.StatusFlag == 'i').ToList();
            var updatedRecord = Cal_AccountUsers.Where(x => x.StatusFlag == 'u').ToList();
            var deletedRecord = Cal_AccountUsers.Where(x => x.StatusFlag == 'd').ToList();

            if (updatedRecord.Count() > 0)
                unitOfWork.Repository<Cal_AccountUsers>().Update(updatedRecord);

            if (insertedRecord.Count() > 0)
                unitOfWork.Repository<Cal_AccountUsers>().Insert(insertedRecord);

            if (deletedRecord.Count() > 0)
            {
                foreach (var entity in deletedRecord)
                    unitOfWork.Repository<Cal_AccountUsers>().Delete(entity.AccUserId);
            }
            //unitOfWork.Repository<Cal_AccountUsers>().Update(Cal_AccountUsers);
            unitOfWork.Save();
        }

        public void DeleteList(List<Cal_AccountUsers> Cal_AccountUsers)
        {
            unitOfWork.Repository<Cal_AccountUsers>().Delete(Cal_AccountUsers);
            unitOfWork.Save();
        }
        public List<Cal_AccountUsersVM> GetAllUsersById(int id)
        {
            return unitOfWork.Repository<Cal_AccountUsersVM>().Get(x=>x.AccountId == id);
        }
        #endregion
    }
}
