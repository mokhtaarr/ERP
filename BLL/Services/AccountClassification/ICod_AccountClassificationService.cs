using Inv.BLL.Services.GLDefAccount.VM;
using Inv.DAL.Domain; 
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Inv.BLL.Services.AccountClassification
{
    public interface ICod_AccountClassificationService
    {
        Cod_AccountClassification GetById(int id);
        List<Cod_AccountClassification> GetAll();
        List<Cod_AccountClassification> GetAll(Expression<Func<Cod_AccountClassification, bool>> predicate);
        Cod_AccountClassification Insert(Cod_AccountClassification entity);
        void InsertList(List<Cod_AccountClassification> entitys);
        Cod_AccountClassification Update(Cod_AccountClassification entity);
        void UpdateList(List<Cod_AccountClassification> entity);
        bool Delete(int id);
        void DeleteList(List<Cod_AccountClassification> entity);

    }
}
