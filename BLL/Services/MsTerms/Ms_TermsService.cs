using Inv.DAL.Domain;
using Inv.DAL.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Inv.BLL.Services.MsTerms
{
   public class Ms_TermsService : IMs_TermsService
    {
        private readonly IUnitOfWork unitOfWork;

        public Ms_TermsService(IUnitOfWork _unitOfWork)
        {
            this.unitOfWork = _unitOfWork;
        }

        #region Terms Services
        public Ms_Terms GetById(int id)
        {
            return unitOfWork.Repository<Ms_Terms>().GetById(id);
        }

        public Ms_TermsDetails GetTermsDetailsById(Expression<Func<Ms_TermsDetails, bool>> predicate)
        {
            return unitOfWork.Repository<Ms_TermsDetails>().GetFirstOrDefault(predicate);
        }


        public List<Ms_TermsDetails> FindTermsDetailsById(Expression<Func<Ms_TermsDetails, bool>> predicate)
        {
            return unitOfWork.Repository<Ms_TermsDetails>().Get(predicate);
        }


        public IQueryable<Ms_Terms> GetAll()
        {
            return unitOfWork.Repository<Ms_Terms>().GetAllQueryable();
        }

        public IQueryable<Ms_Terms> GetAll(Expression<Func<Ms_Terms, bool>> predicate)
        {
            return unitOfWork.Repository<Ms_Terms>().GetQueryable(predicate);
        }

        public Ms_Terms Insert(Ms_Terms entity)
        {
            var memb = unitOfWork.Repository<Ms_Terms>().Insert(entity);
            unitOfWork.Save();
            return memb;
        }
         public Ms_TermsDetails InsertDetails(Ms_TermsDetails entity)
        {
            var memb = unitOfWork.Repository<Ms_TermsDetails>().Insert(entity);
            unitOfWork.Save();
            return memb;
        }
        
        public List<T> InsertList<T>(List<T> entitys) where T : class, new()
        {
            unitOfWork.Repository<T>().Insert(entitys);
            unitOfWork.Save();
            return null;
        }
        
        public Ms_Terms Update(Ms_Terms entity)
        {
            var memb = unitOfWork.Repository<Ms_Terms>().Update(entity);
            unitOfWork.Save();
            return memb;
        }

        public Ms_TermsDetails UpdateDetails(Ms_TermsDetails entity)
        {
            var memb = unitOfWork.Repository<Ms_TermsDetails>().Update(entity);
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
                unitOfWork.Repository<Ms_Terms>().Delete(id);
                unitOfWork.Save();
                return true;
            }
            catch 
            {
                return false;
            }
        }

        public bool DeleteTermsDetails(int id)
        {
            try
            {
                unitOfWork.Repository<Ms_TermsDetails>().Delete(id);
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
