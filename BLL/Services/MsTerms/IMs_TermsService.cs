using Inv.BLL.Services.GLDefAccount.VM;
using Inv.DAL.Domain; 
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Inv.BLL.Services.MsTerms
{
    public interface IMs_TermsService
    {
        Ms_Terms GetById(int id);
        IQueryable<Ms_Terms> GetAll();
        IQueryable<Ms_Terms> GetAll(Expression<Func<Ms_Terms, bool>> predicate);
        Ms_Terms Insert(Ms_Terms entity);
        Ms_TermsDetails InsertDetails(Ms_TermsDetails entity);
        List<T> InsertList<T>(List<T> entitys) where T : class, new();
        Ms_Terms Update(Ms_Terms entity);

        Ms_TermsDetails GetTermsDetailsById(Expression<Func<Ms_TermsDetails, bool>> predicate);
        List<Ms_TermsDetails> FindTermsDetailsById(Expression<Func<Ms_TermsDetails, bool>> predicate);
        Ms_TermsDetails UpdateDetails(Ms_TermsDetails entity);
        bool Delete(int id);
        bool DeleteTermsDetails(int id);
        List<T> DeleteList<T>(List<T> entitys) where T : class, new();
    }
}
