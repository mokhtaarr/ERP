using Inv.BLL.Services.GLDefAccount.VM;
using Inv.DAL.Domain;
using Inv.DAL.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Inv.BLL.Services.AccountCategories
{
   public class AccountCategoriesService : IAccountCategoriesService
    {
        private readonly IUnitOfWork unitOfWork;

        public AccountCategoriesService(IUnitOfWork _unitOfWork)
        {
            this.unitOfWork = _unitOfWork;
        }

        #region GLDefAccount Services
        public Cod_AccountCategories GetById(int id)
        {
            return unitOfWork.Repository<Cod_AccountCategories>().GetById(id);
        }

        public List<Cod_AccountCategories> GetAll()
        {
            return unitOfWork.Repository<Cod_AccountCategories>().GetAll();
        }

        public List<Cod_AccountCategories> GetAll(Expression<Func<Cod_AccountCategories, bool>> predicate)
        {
            return unitOfWork.Repository<Cod_AccountCategories>().Get(predicate);
        }

        public Cod_AccountCategories Insert(Cod_AccountCategories entity)
        {
            var memb = unitOfWork.Repository<Cod_AccountCategories>().Insert(entity);
            unitOfWork.Save();
            return memb;
        }
        
        public void InsertList(List<Cod_AccountCategories> Cod_AccountCategories)
        {
            unitOfWork.Repository<Cod_AccountCategories>().Insert(Cod_AccountCategories);
            unitOfWork.Save();
        }
        
        public Cod_AccountCategories Update(Cod_AccountCategories entity)
        {

            var memb = unitOfWork.Repository<Cod_AccountCategories>().Update(entity);
            unitOfWork.Save();
            return memb;
        }
        
        public void UpdateList(List<Cod_AccountCategories> Cod_AccountCategories)
        {
            unitOfWork.Repository<Cod_AccountCategories>().Update(Cod_AccountCategories);
            unitOfWork.Save();
        }

        public void DeleteList(List<Cod_AccountCategories> Cod_AccountCategories)
        {
            unitOfWork.Repository<Cod_AccountCategories>().Delete(Cod_AccountCategories);
            unitOfWork.Save();
        }
        public bool Delete(int id)
        {
            try
            {
                unitOfWork.Repository<Cod_AccountCategories>().Delete(id);
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
