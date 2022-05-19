using Inv.DAL.Domain;
using Inv.DAL.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Inv.BLL.Services.HrEmployees
{
   public class Hr_EmployeesService : IHr_EmployeesService
    {
        private readonly IUnitOfWork unitOfWork;

        public Hr_EmployeesService(IUnitOfWork _unitOfWork)
        {
            this.unitOfWork = _unitOfWork;
        }

        #region GLDefAccount Services
        public Hr_Employees GetById(int id)
        {
            return unitOfWork.Repository<Hr_Employees>().GetById(id);
        }

        public List<Hr_Employees> GetAll()
        {
            return unitOfWork.Repository<Hr_Employees>().GetAll();
        }

        public List<Hr_Employees> GetAll(Expression<Func<Hr_Employees, bool>> predicate)
        {
            return unitOfWork.Repository<Hr_Employees>().Get(predicate);
        }
        
        public List<Cal_EmpAccounts> GetEmpAccounts(Expression<Func<Cal_EmpAccounts, bool>> predicate)
        {
            return unitOfWork.Repository<Cal_EmpAccounts>().Get(predicate);
        }

        public Hr_Employees Insert(Hr_Employees entity)
        {
            var memb = unitOfWork.Repository<Hr_Employees>().Insert(entity);
            unitOfWork.Save();
            return memb;
        }
        
        public List<T> InsertList<T>(List<T> entitys) where T : class, new()
        {
            unitOfWork.Repository<T>().Insert(entitys);
            unitOfWork.Save();
            return null;
        }
        
        public Hr_Employees Update(Hr_Employees entity)
        {

            var memb = unitOfWork.Repository<Hr_Employees>().Update(entity);
            unitOfWork.Save();
            return memb;
        }

        public void UpdateAccountsList(List<Cal_EmpAccounts> accounts)
        {
            var insertedRecord = accounts.Where(x => x.StatusFlag == 'i').ToList();
            var updatedRecord = accounts.Where(x => x.StatusFlag == 'u').ToList();
            var deletedRecord = accounts.Where(x => x.StatusFlag == 'd').ToList();

            if (updatedRecord.Count() > 0)
                unitOfWork.Repository<Cal_EmpAccounts>().Update(updatedRecord);

            if (insertedRecord.Count() > 0)
                unitOfWork.Repository<Cal_EmpAccounts>().Insert(insertedRecord);

            if (deletedRecord.Count() > 0)
            {
                foreach (var entity in deletedRecord)
                    unitOfWork.Repository<Cal_EmpAccounts>().Delete(entity.EmpAccountId);
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
                unitOfWork.Repository<Hr_Employees>().Delete(id);
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
