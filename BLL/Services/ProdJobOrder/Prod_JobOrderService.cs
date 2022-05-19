using Inv.DAL.Domain;
using Inv.DAL.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Inv.BLL.Services.ProdJobOrder
{
    public class Prod_JobOrderService : IProd_JobOrderService
    {
        private readonly IUnitOfWork unitOfWork;

        public Prod_JobOrderService(IUnitOfWork _unitOfWork)
        {
            this.unitOfWork = _unitOfWork;
        }

        #region GLDefAccount Services
        public Prod_JobOrder GetById(int id)
        {
            return unitOfWork.Repository<Prod_JobOrder>().GetById(id);
        }

        public List<Prod_JobOrder> GetAll()
        {
            return unitOfWork.Repository<Prod_JobOrder>().GetAll();
        }

        public List<Prod_JobOrder> GetAll(Expression<Func<Prod_JobOrder, bool>> predicate)
        {
            return unitOfWork.Repository<Prod_JobOrder>().Get(predicate);
        }

        public Prod_JobOrder Insert(Prod_JobOrder entity)
        {
            var memb = unitOfWork.Repository<Prod_JobOrder>().Insert(entity);
            unitOfWork.Save();
            return memb;
        }

        public List<T> InsertList<T>(List<T> entitys) where T : class, new()
        {
            unitOfWork.Repository<T>().Insert(entitys);
            unitOfWork.Save();
            return null;
        }

        public Prod_JobOrder Update(Prod_JobOrder entity)
        {

            var memb = unitOfWork.Repository<Prod_JobOrder>().Update(entity);
            unitOfWork.Save();
            return memb;
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
                unitOfWork.Repository<Prod_JobOrder>().Delete(id);
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
