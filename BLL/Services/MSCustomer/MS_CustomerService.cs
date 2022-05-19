using Inv.DAL.Domain;
using Inv.DAL.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Inv.BLL.Services.MSCustomer
{
   public class MS_CustomerService : IMS_CustomerService
    {
        private readonly IUnitOfWork unitOfWork;

        public MS_CustomerService(IUnitOfWork _unitOfWork)
        {
            this.unitOfWork = _unitOfWork;
        }

        #region GLDefAccount Services
        public MS_Customer GetById(int id)
        {
            return unitOfWork.Repository<MS_Customer>().GetById(id);
        }

        public IQueryable<MS_Customer> GetAll()
        {
            return unitOfWork.Repository<MS_Customer>().GetAllQueryable();
        }

        public List<MS_Customer> GetAll(Expression<Func<MS_Customer, bool>> predicate)
        {
            return unitOfWork.Repository<MS_Customer>().Get(predicate);
        }

        public List<Cal_CustAccounts> GetCustAccounts(Expression<Func<Cal_CustAccounts, bool>> predicate)
        {
            return unitOfWork.Repository<Cal_CustAccounts>().Get(predicate);
        }

        public MS_Customer Insert(MS_Customer entity)
        {
            var memb = unitOfWork.Repository<MS_Customer>().Insert(entity);
            unitOfWork.Save();
            return memb;
        }
        
        public List<T> InsertList<T>(List<T> entitys) where T : class, new()
        {
            unitOfWork.Repository<T>().Insert(entitys);
            unitOfWork.Save();
            return null;
        }
        
        public MS_Customer Update(MS_Customer entity)
        {

            var memb = unitOfWork.Repository<MS_Customer>().Update(entity);
            unitOfWork.Save();
            return memb;
        }

        public void UpdateBranchesList(List<Ms_CustomerBranches> branches)
        {
            var insertedRecord = branches.Where(x => x.StatusFlag == 'i').ToList();
            var updatedRecord = branches.Where(x => x.StatusFlag == 'u').ToList();
            var deletedRecord = branches.Where(x => x.StatusFlag == 'd').ToList();

            if (updatedRecord.Count() > 0)
                unitOfWork.Repository<Ms_CustomerBranches>().Update(updatedRecord);

            if (insertedRecord.Count() > 0)
                unitOfWork.Repository<Ms_CustomerBranches>().Insert(insertedRecord);

            if (deletedRecord.Count() > 0)
            {
                foreach (var entity in deletedRecord)
                    unitOfWork.Repository<Ms_CustomerBranches>().Delete(entity.CustBranchId);
            }
            unitOfWork.Save();
        }
        public void UpdateContactsList(List<Ms_CustomerContacts> contacts)
        {
            var insertedRecord = contacts.Where(x => x.StatusFlag == 'i');
            var updatedRecord = contacts.Where(x => x.StatusFlag == 'u');
            var deletedRecord = contacts.Where(x => x.StatusFlag == 'd');

            if (updatedRecord.Count() > 0)
                unitOfWork.Repository<Ms_CustomerContacts>().Update(updatedRecord);

            if (insertedRecord.Count() > 0)
                unitOfWork.Repository<Ms_CustomerContacts>().Insert(insertedRecord);

            if (deletedRecord.Count() > 0)
            {
                foreach (var entity in deletedRecord)
                    unitOfWork.Repository<Ms_CustomerContacts>().Delete(entity.CustContactId);
            }
            unitOfWork.Save();
        }
        public void UpdateUsersList(List<Ms_CusromerUsers> users)
        {
            var insertedRecord = users.Where(x => x.StatusFlag == 'i').ToList();
            var updatedRecord = users.Where(x => x.StatusFlag == 'u').ToList();
            var deletedRecord = users.Where(x => x.StatusFlag == 'd').ToList();

            if (updatedRecord.Count() > 0)
                unitOfWork.Repository<Ms_CusromerUsers>().Update(updatedRecord);

            if (insertedRecord.Count() > 0)
                unitOfWork.Repository<Ms_CusromerUsers>().Insert(insertedRecord);

            if (deletedRecord.Count() > 0)
            {
                foreach (var entity in deletedRecord)
                    unitOfWork.Repository<Ms_CusromerUsers>().Delete(entity.CustUserId);
            }
            unitOfWork.Save();
        }

        public void UpdateAccountsList(List<Cal_CustAccounts> accounts)
        {
            var insertedRecord = accounts.Where(x => x.StatusFlag == 'i').ToList();
            var updatedRecord = accounts.Where(x => x.StatusFlag == 'u').ToList();
            var deletedRecord = accounts.Where(x => x.StatusFlag == 'd').ToList();

            if (updatedRecord.Count() > 0)
                unitOfWork.Repository<Cal_CustAccounts>().Update(updatedRecord);

            if (insertedRecord.Count() > 0)
                unitOfWork.Repository<Cal_CustAccounts>().Insert(insertedRecord);

            if (deletedRecord.Count() > 0)
            {
                foreach (var entity in deletedRecord)
                    unitOfWork.Repository<Cal_CustAccounts>().Delete(entity.CustAccountId);
            }
            //unitOfWork.Repository<Cal_CustAccounts>().Insert(accounts);
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
                unitOfWork.Repository<MS_Customer>().Delete(id);
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
