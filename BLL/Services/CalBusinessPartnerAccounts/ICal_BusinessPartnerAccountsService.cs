using Inv.BLL.Services.GLDefAccount.VM;
using Inv.DAL.Domain; 
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Inv.BLL.Services.CalBusinessPartnerAccounts
{
    public interface ICal_BusinessPartnerAccountsService
    {
        Cal_BusinessPartnerAccounts GetById(int id);
        List<Cal_BusinessPartnerAccounts> GetAll();
        List<Cal_BusinessPartnerAccounts> GetAll(Expression<Func<Cal_BusinessPartnerAccounts, bool>> predicate);
        Cal_BusinessPartnerAccounts Insert(Cal_BusinessPartnerAccounts entity);
        void InsertList(List<Cal_BusinessPartnerAccounts> entitys);
        Cal_BusinessPartnerAccounts Update(Cal_BusinessPartnerAccounts entity);
        void UpdateList(List<Cal_BusinessPartnerAccounts> entity);
        bool Delete(int id);
        void DeleteList(List<Cal_BusinessPartnerAccounts> entity);

    }
}
