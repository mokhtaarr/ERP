using Inv.BLL.Services.GLDefAccount.VM;
using Inv.DAL.Domain;
using Inv.DAL.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Inv.BLL.Services.CalBusinessPartnerAccounts
{
   public class Cal_BusinessPartnerAccountsService : ICal_BusinessPartnerAccountsService
    {
        private readonly IUnitOfWork unitOfWork;

        public Cal_BusinessPartnerAccountsService(IUnitOfWork _unitOfWork)
        {
            this.unitOfWork = _unitOfWork;
        }

        #region GLDefAccount Services
        public Cal_BusinessPartnerAccounts GetById(int id)
        {
            return unitOfWork.Repository<Cal_BusinessPartnerAccounts>().GetById(id);
        }

        public List<Cal_BusinessPartnerAccounts> GetAll()
        {
            return unitOfWork.Repository<Cal_BusinessPartnerAccounts>().GetAll();
        }

        public List<Cal_BusinessPartnerAccounts> GetAll(Expression<Func<Cal_BusinessPartnerAccounts, bool>> predicate)
        {
            return unitOfWork.Repository<Cal_BusinessPartnerAccounts>().Get(predicate);
        }

        public Cal_BusinessPartnerAccounts Insert(Cal_BusinessPartnerAccounts entity)
        {
            var memb = unitOfWork.Repository<Cal_BusinessPartnerAccounts>().Insert(entity);
            unitOfWork.Save();
            return memb;
        }
        
        public void InsertList(List<Cal_BusinessPartnerAccounts> Cal_BusinessPartnerAccounts)
        {
            unitOfWork.Repository<Cal_BusinessPartnerAccounts>().Insert(Cal_BusinessPartnerAccounts);
            unitOfWork.Save();
        }
        
        public Cal_BusinessPartnerAccounts Update(Cal_BusinessPartnerAccounts entity)
        {

            var memb = unitOfWork.Repository<Cal_BusinessPartnerAccounts>().Update(entity);
            unitOfWork.Save();
            return memb;
        }
        
        public void UpdateList(List<Cal_BusinessPartnerAccounts> Cal_BusinessPartnerAccounts)
        {
            unitOfWork.Repository<Cal_BusinessPartnerAccounts>().Update(Cal_BusinessPartnerAccounts);
            unitOfWork.Save();
        }

        public void DeleteList(List<Cal_BusinessPartnerAccounts> Cal_BusinessPartnerAccounts)
        {
            unitOfWork.Repository<Cal_BusinessPartnerAccounts>().Delete(Cal_BusinessPartnerAccounts);
            unitOfWork.Save();
        }
        public bool Delete(int id)
        {
            try
            {
                unitOfWork.Repository<Cal_BusinessPartnerAccounts>().Delete(id);
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
