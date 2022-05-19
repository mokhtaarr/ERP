using Inv.DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Inv.BLL.Services.MSTaxes
{
    public interface IMS_TaxesService
    {
        MS_Taxes GetById(int id);
        List<MS_Taxes> GetAll();
        List<MS_Taxes> GetAll(Expression<Func<MS_Taxes, bool>> predicate);
        MS_Taxes Insert(MS_Taxes entity);
        List<T> InsertList<T>(List<T> entitys) where T : class, new();
        MS_Taxes Update(MS_Taxes entity);
        bool Delete(int id);
    }
}
