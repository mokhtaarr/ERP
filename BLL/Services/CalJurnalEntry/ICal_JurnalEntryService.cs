using Inv.BLL.Services.GLDefAccount.VM;
using Inv.DAL.Domain; 
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Inv.BLL.Services.CalJurnalEntry
{
    public interface ICal_JurnalEntryService
    {
        Cal_JurnalEntry GetById(int id);
        List<Cal_JurnalEntry> GetAll();
        List<Cal_JurnalEntry> GetAll(Expression<Func<Cal_JurnalEntry, bool>> predicate);
        List<Cal_JurnalDetail> GetAllDetails(Expression<Func<Cal_JurnalDetail, bool>> predicate);
        Cal_JurnalEntry Insert(Cal_JurnalEntry entity);
        List<T> InsertList<T>(List<T> entitys) where T : class, new();
        Cal_JurnalEntry Update(Cal_JurnalEntry entity);
        void UpdateJurnalDetails(List<Cal_JurnalDetail> jurnalDetails);
        bool Delete(int id);
        List<T> DeleteList<T>(List<T> entitys) where T : class, new();
    }
}
