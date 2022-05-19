using Inv.BLL.Services.GLDefAccount.VM;
using Inv.DAL.Domain; 
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Inv.BLL.Services.MSItemCategory
{
    public interface IMS_ItemCategoryService
    {
        MS_ItemCategory GetById(int id);
        List<MS_ItemCategory> GetAll();
        List<MS_ItemCategory> GetAll(Expression<Func<MS_ItemCategory, bool>> predicate);
        MS_ItemCategory Insert(MS_ItemCategory entity);
        void InsertList(List<MS_ItemCategory> entitys);
        MS_ItemCategory Update(MS_ItemCategory entity);
        void UpdateList(List<MS_ItemCategory> entity);
        bool Delete(int id);
        void DeleteList(List<MS_ItemCategory> entity);

    }
}
