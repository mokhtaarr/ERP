using Inv.BLL.Services.GLDefAccount.VM;
using Inv.DAL.Domain; 
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Inv.BLL.Services.ProgrammingTools.MsSettings
{
    public interface IMS_SettingsService
    {
        MS_Settings GetById(int id);
        List<MS_Settings> GetAll();
        List<MS_Settings> GetAll(Expression<Func<MS_Settings, bool>> predicate);
        List<Cal_AssetAccounts> GetAssetAccounts(Expression<Func<Cal_AssetAccounts, bool>> predicate);
        MS_Settings Insert(MS_Settings entity);
        List<T> InsertList<T>(List<T> entitys) where T : class, new();
        MS_Settings Update(MS_Settings entity);
        void UpdateAssetCards(List<Cal_AssetAccounts> entity);
        bool Delete(int id);
        List<T> DeleteList<T>(List<T> entitys) where T : class, new();
    }
}
