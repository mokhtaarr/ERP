using Inv.DAL.Domain;
using Inv.DAL.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Inv.BLL.Services.AccountClassification
{
   public class Cod_AccountClassificationService : ICod_AccountClassificationService
    {
        private readonly IUnitOfWork unitOfWork;

        public Cod_AccountClassificationService(IUnitOfWork _unitOfWork)
        {
            this.unitOfWork = _unitOfWork;
        }

        #region GLDefAccount Services
        public Cod_AccountClassification GetById(int id)
        {
            return unitOfWork.Repository<Cod_AccountClassification>().GetById(id);
        }

        public List<Cod_AccountClassification> GetAll()
        {
            return unitOfWork.Repository<Cod_AccountClassification>().GetAll();
        }

        public List<Cod_AccountClassification> GetAll(Expression<Func<Cod_AccountClassification, bool>> predicate)
        {
            return unitOfWork.Repository<Cod_AccountClassification>().Get(predicate);
        }

        public Cod_AccountClassification Insert(Cod_AccountClassification entity)
        {
            var memb = unitOfWork.Repository<Cod_AccountClassification>().Insert(entity);
            unitOfWork.Save();
            return memb;
        }
        
        public void InsertList(List<Cod_AccountClassification> Cod_AccountClassification)
        {
            unitOfWork.Repository<Cod_AccountClassification>().Insert(Cod_AccountClassification);
            unitOfWork.Save();
        }
        
        public Cod_AccountClassification Update(Cod_AccountClassification entity)
        {

            var memb = unitOfWork.Repository<Cod_AccountClassification>().Update(entity);
            unitOfWork.Save();
            return memb;
        }
        
        public void UpdateList(List<Cod_AccountClassification> Cod_AccountClassification)
        {
            unitOfWork.Repository<Cod_AccountClassification>().Update(Cod_AccountClassification);
            unitOfWork.Save();
        }

        public void DeleteList(List<Cod_AccountClassification> Cod_AccountClassification)
        {
            unitOfWork.Repository<Cod_AccountClassification>().Delete(Cod_AccountClassification);
            unitOfWork.Save();
        }
        public bool Delete(int id)
        {
            try
            {
                unitOfWork.Repository<Cod_AccountClassification>().Delete(id);
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
