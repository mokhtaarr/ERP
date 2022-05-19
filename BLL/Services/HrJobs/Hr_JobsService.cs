using Inv.DAL.Domain;
using Inv.DAL.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Inv.BLL.Services.HrJobs
{
   public class Hr_JobsService : IHr_JobsService
    {
        private readonly IUnitOfWork unitOfWork;

        public Hr_JobsService(IUnitOfWork _unitOfWork)
        {
            this.unitOfWork = _unitOfWork;
        }

        #region GLDefAccount Services
        public Hr_Jobs GetById(int id)
        {
            return unitOfWork.Repository<Hr_Jobs>().GetById(id);
        }

        public List<Hr_Jobs> GetAll()
        {
            return unitOfWork.Repository<Hr_Jobs>().GetAll();
        }

        public List<Hr_Jobs> GetAll(Expression<Func<Hr_Jobs, bool>> predicate)
        {
            return unitOfWork.Repository<Hr_Jobs>().Get(predicate);
        }

        public Hr_Jobs Insert(Hr_Jobs entity)
        {
            var memb = unitOfWork.Repository<Hr_Jobs>().Insert(entity);
            unitOfWork.Save();
            return memb;
        }
        
        public void InsertList(List<Hr_Jobs> Hr_Jobs)
        {
            unitOfWork.Repository<Hr_Jobs>().Insert(Hr_Jobs);
            unitOfWork.Save();
        }
        
        public Hr_Jobs Update(Hr_Jobs entity)
        {

            var memb = unitOfWork.Repository<Hr_Jobs>().Update(entity);
            unitOfWork.Save();
            return memb;
        }
        
        public void UpdateList(List<Hr_Jobs> Hr_Jobs)
        {
            unitOfWork.Repository<Hr_Jobs>().Update(Hr_Jobs);
            unitOfWork.Save();
        }

        public void DeleteList(List<Hr_Jobs> Hr_Jobs)
        {
            unitOfWork.Repository<Hr_Jobs>().Delete(Hr_Jobs);
            unitOfWork.Save();
        }
        public bool Delete(int id)
        {
            try
            {
                unitOfWork.Repository<Hr_Jobs>().Delete(id);
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
