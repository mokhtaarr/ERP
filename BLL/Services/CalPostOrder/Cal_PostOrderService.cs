using Inv.DAL.Domain;
using Inv.DAL.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Inv.BLL.Services.CalPostOrder
{
   public class Cal_PostOrderService : ICal_PostOrderService
    {
        private readonly IUnitOfWork unitOfWork;

        public Cal_PostOrderService(IUnitOfWork _unitOfWork)
        {
            this.unitOfWork = _unitOfWork;
        }

        #region GLDefAccount Services
        public Cal_PostOrder GetById(int id)
        {
            return unitOfWork.Repository<Cal_PostOrder>().GetById(id);
        }

        public List<Cal_PostOrder> GetAll()
        {
            return unitOfWork.Repository<Cal_PostOrder>().GetAll();
        }

        public List<Cal_PostOrder> GetAll(Expression<Func<Cal_PostOrder, bool>> predicate)
        {
            return unitOfWork.Repository<Cal_PostOrder>().Get(predicate);
        }

        public Cal_PostOrder Insert(Cal_PostOrder entity)
        {
            var memb = unitOfWork.Repository<Cal_PostOrder>().Insert(entity);
            unitOfWork.Save();
            return memb;
        }
        
        public List<T> InsertList<T>(List<T> entitys) where T : class, new()
        {
            unitOfWork.Repository<T>().Insert(entitys);
            unitOfWork.Save();
            return null;
        }
        
        public Cal_PostOrder Update(Cal_PostOrder entity)
        {
            var memb = unitOfWork.Repository<Cal_PostOrder>().Update(entity);
            unitOfWork.Save();
            return memb;
        }

        public int DeleteList<T>(List<T> entitys) where T : class, new()
        {
            try
            {
                unitOfWork.Repository<T>().Delete(entitys);
                unitOfWork.Save();
                return entitys.Count;
            }
            catch (Exception)
            {
                return 0;
            }
        }

        public bool Delete(int id)
        {
            try
            {
                unitOfWork.Repository<Cal_PostOrder>().Delete(id);
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
