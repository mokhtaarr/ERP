using Inv.BLL.Services.GLDefAccount.VM;
using Inv.DAL.Domain; 
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Inv.BLL.Services.AssetAssetCard
{
    public interface IAsset_AssetCardService
    {
        Asset_AssetCard GetById(int id);
        List<Asset_AssetCard> GetAll();
        List<Asset_AssetCard> GetAll(Expression<Func<Asset_AssetCard, bool>> predicate);
        List<Cal_AssetAccounts> GetAssetAccounts(Expression<Func<Cal_AssetAccounts, bool>> predicate);
        Asset_AssetCard Insert(Asset_AssetCard entity);
        List<T> InsertList<T>(List<T> entitys) where T : class, new();
        Asset_AssetCard Update(Asset_AssetCard entity);
        void UpdateAssetCards(List<Cal_AssetAccounts> entity);
        bool Delete(int id);
        List<T> DeleteList<T>(List<T> entitys) where T : class, new();
    }
}
