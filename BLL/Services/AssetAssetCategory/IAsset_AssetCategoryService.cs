using Inv.BLL.Services.GLDefAccount.VM;
using Inv.DAL.Domain; 
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Inv.BLL.Services.AssetAssetCategory
{
    public interface IAsset_AssetCategoryService
    {
        Asset_AssetCategory GetById(int id);
        List<Asset_AssetCategory> GetAll();
        List<Asset_AssetCategory> GetAll(Expression<Func<Asset_AssetCategory, bool>> predicate);
        Asset_AssetCategory Insert(Asset_AssetCategory entity);
        void InsertList(List<Asset_AssetCategory> entitys);
        Asset_AssetCategory Update(Asset_AssetCategory entity);
        void UpdateList(List<Asset_AssetCategory> entity);
        bool Delete(int id);
        void DeleteList(List<Asset_AssetCategory> entity);

    }
}
