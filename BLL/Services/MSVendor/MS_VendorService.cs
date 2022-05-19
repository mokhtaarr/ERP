using Inv.DAL.Domain;
using Inv.DAL.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Inv.BLL.Services.MSVendor
{
    public class MS_VendorService : IMS_VendorService
    {
        private readonly IUnitOfWork unitOfWork;

        public MS_VendorService(IUnitOfWork _unitOfWork)
        {
            this.unitOfWork = _unitOfWork;
        }

        #region GLDefAccount Services
        public MS_Vendor GetById(int id)
        {
            return unitOfWork.Repository<MS_Vendor>().GetById(id);
        }

        public List<MS_Vendor> GetAll()
        {
            return unitOfWork.Repository<MS_Vendor>().GetAll();
        }

        public List<MS_Vendor> GetAll(Expression<Func<MS_Vendor, bool>> predicate)
        {
            return unitOfWork.Repository<MS_Vendor>().Get(predicate);
        }

        public List<Cal_VendAccounts> GetVendAccounts(Expression<Func<Cal_VendAccounts, bool>> predicate)
        {
            return unitOfWork.Repository<Cal_VendAccounts>().Get(predicate);
        }

        public MS_Vendor Insert(MS_Vendor entity)
        {
            var memb = unitOfWork.Repository<MS_Vendor>().Insert(entity);
            unitOfWork.Save();
            return memb;
        }

        public List<T> InsertList<T>(List<T> entitys) where T : class, new()
        {
            unitOfWork.Repository<T>().Insert(entitys);
            unitOfWork.Save();
            return null;
        }

        public MS_Vendor Update(MS_Vendor entity)
        {

            var memb = unitOfWork.Repository<MS_Vendor>().Update(entity);
            unitOfWork.Save();
            return memb;
        }

        public void UpdateBranchesList(List<Ms_VendorBranches> branches)
        {
            var insertedRecord = branches.Where(x => x.StatusFlag == 'i').ToList();
            var updatedRecord = branches.Where(x => x.StatusFlag == 'u').ToList();
            var deletedRecord = branches.Where(x => x.StatusFlag == 'd').ToList();

            if (updatedRecord.Count() > 0)
                unitOfWork.Repository<Ms_VendorBranches>().Update(updatedRecord);

            if (insertedRecord.Count() > 0)
                unitOfWork.Repository<Ms_VendorBranches>().Insert(insertedRecord);

            if (deletedRecord.Count() > 0)
            {
                foreach (var entity in deletedRecord)
                    unitOfWork.Repository<Ms_VendorBranches>().Delete(entity.VendBranchId);
            }
            unitOfWork.Save();
        }
        public void UpdateContactsList(List<Ms_VendorContacts> contacts)
        {
            var insertedRecord = contacts.Where(x => x.StatusFlag == 'i');
            var updatedRecord = contacts.Where(x => x.StatusFlag == 'u');
            var deletedRecord = contacts.Where(x => x.StatusFlag == 'd');

            if (updatedRecord.Count() > 0)
                unitOfWork.Repository<Ms_VendorContacts>().Update(updatedRecord);

            if (insertedRecord.Count() > 0)
                unitOfWork.Repository<Ms_VendorContacts>().Insert(insertedRecord);

            if (deletedRecord.Count() > 0)
            {
                foreach (var entity in deletedRecord)
                    unitOfWork.Repository<Ms_VendorContacts>().Delete(entity.VendContactId);
            }
            unitOfWork.Save();
        }
        public void UpdateUsersList(List<Ms_VendorUsers> users)
        {
            var insertedRecord = users.Where(x => x.StatusFlag == 'i').ToList();
            var updatedRecord = users.Where(x => x.StatusFlag == 'u').ToList();
            var deletedRecord = users.Where(x => x.StatusFlag == 'd').ToList();

            if (updatedRecord.Count() > 0)
                unitOfWork.Repository<Ms_VendorUsers>().Update(updatedRecord);

            if (insertedRecord.Count() > 0)
                unitOfWork.Repository<Ms_VendorUsers>().Insert(insertedRecord);

            if (deletedRecord.Count() > 0)
            {
                foreach (var entity in deletedRecord)
                    unitOfWork.Repository<Ms_VendorUsers>().Delete(entity.VendUserId);
            }
            unitOfWork.Save();
        }
        public void UpdateAccountsList(List<Cal_VendAccounts> accounts)
        {
            var insertedRecord = accounts.Where(x => x.StatusFlag == 'i');
            var updatedRecord = accounts.Where(x => x.StatusFlag == 'u');
            var deletedRecord = accounts.Where(x => x.StatusFlag == 'd');

            if (updatedRecord.Count() > 0)
                unitOfWork.Repository<Cal_VendAccounts>().Update(updatedRecord);

            if (insertedRecord.Count() > 0)
                unitOfWork.Repository<Cal_VendAccounts>().Insert(insertedRecord);

            if (deletedRecord.Count() > 0)
            {
                foreach (var entity in deletedRecord)
                    unitOfWork.Repository<Cal_VendAccounts>().Delete(entity.VendAccountId);
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
                unitOfWork.Repository<MS_Vendor>().Delete(id);
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
