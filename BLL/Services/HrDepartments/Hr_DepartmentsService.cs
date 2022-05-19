using Inv.DAL.Domain;
using Inv.DAL.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Inv.BLL.Services.HrDepartments
{
   public class Hr_DepartmentsService : IHr_DepartmentsService
    {
        private readonly IUnitOfWork unitOfWork;

        public Hr_DepartmentsService(IUnitOfWork _unitOfWork)
        {
            this.unitOfWork = _unitOfWork;
        }

        #region GLDefAccount Services
        public Hr_Departments GetById(int id)
        {
            return unitOfWork.Repository<Hr_Departments>().GetById(id);
        }

        public List<Hr_Departments> GetAll()
        {
            return unitOfWork.Repository<Hr_Departments>().GetAll();
        }

        public List<Hr_Departments> GetAll(Expression<Func<Hr_Departments, bool>> predicate)
        {
            return unitOfWork.Repository<Hr_Departments>().Get(predicate);
        }

        public Hr_Departments Insert(Hr_Departments entity)
        {
            var memb = unitOfWork.Repository<Hr_Departments>().Insert(entity);
            unitOfWork.Save();
            return memb;
        }
        
        public void InsertList(List<Hr_Departments> Hr_Departments)
        {
            unitOfWork.Repository<Hr_Departments>().Insert(Hr_Departments);
            unitOfWork.Save();
        }
        
        public Hr_Departments Update(Hr_Departments entity)
        {

            var memb = unitOfWork.Repository<Hr_Departments>().Update(entity);
            unitOfWork.Save();
            return memb;
        }
        
        public void UpdateList(List<Hr_Departments> Hr_Departments)
        {
            unitOfWork.Repository<Hr_Departments>().Update(Hr_Departments);
            unitOfWork.Save();
        }

        public void DeleteList(List<Hr_Departments> Hr_Departments)
        {
            unitOfWork.Repository<Hr_Departments>().Delete(Hr_Departments);
            unitOfWork.Save();
        }
        public bool Delete(int id)
        {
            try
            {
                unitOfWork.Repository<Hr_Departments>().Delete(id);
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
