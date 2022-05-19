using Inv.DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Inv.BLL.Services.MSBoxBank
{
    public interface IMS_BoxBankService
    {
        MS_BoxBank GetById(int id);
        List<MS_BoxBank> GetAll();
        List<MS_BoxBank> GetAll(Expression<Func<MS_BoxBank, bool>> predicate);
        MS_BoxBank Insert(MS_BoxBank entity);
        List<T> InsertList<T>(List<T> entitys) where T : class, new();
        MS_BoxBank Update(MS_BoxBank entity);
        bool Delete(int id);
        bool DeleteTermsDetails(int id);
        List<T> DeleteList<T>(List<T> entitys) where T : class, new();
        List<MS_BoxCurrency> GetBoxCurrency(Expression<Func<MS_BoxCurrency, bool>> predicate);
        List<Ms_BoxUsers> GetBoxUsers(Expression<Func<Ms_BoxUsers, bool>> predicate);
        void UpdateBoxCurrency(List<MS_BoxCurrency> entity);
        void UpdateBoxUsers(List<Ms_BoxUsers> entity);
    }
}
