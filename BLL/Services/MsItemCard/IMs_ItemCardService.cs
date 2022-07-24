using Inv.BLL.Services.GLDefAccount.VM;
using Inv.DAL.Domain; 
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Inv.BLL.Services.MsItemCard
{
    public interface IMS_ItemCardService
    {
        MS_ItemCard GetById(int id);
        List<MS_ItemCard> GetAll();
        List<MS_ItemCard> GetAll(Expression<Func<MS_ItemCard, bool>> predicate);
        List<MS_ItemVendors> GetItemVendors(Expression<Func<MS_ItemVendors, bool>> predicate);
        List<Ms_ItemCardOffers> GetOffers(Expression<Func<Ms_ItemCardOffers, bool>> predicate);
        List<Prod_ItemAttributsJoin> GetAttributs(Expression<Func<Prod_ItemAttributsJoin, bool>> predicate);
        List<MS_ItemImages> GetItemImages(Expression<Func<MS_ItemImages, bool>> predicate);
        List<Ms_ItemUnit> GetItemUnits(Expression<Func<Ms_ItemUnit, bool>> predicate);
        List<MS_ItemAlternatives> GetItemAlternatives(Expression<Func<MS_ItemAlternatives, bool>> predicate);
        List<Ms_ItemCollection> GetItemCollection(Expression<Func<Ms_ItemCollection, bool>> predicate);
        List<Prod_ItemcardExpenses> GetItemcardExpenses(Expression<Func<Prod_ItemcardExpenses, bool>> predicate);
        MS_ItemCard Insert(MS_ItemCard entity);
        List<T> InsertList<T>(List<T> entitys) where T : class, new();
        MS_ItemCard Update(MS_ItemCard entity);
        void UpdateItemVendors(List<MS_ItemVendors> entity);
        void UpdateOffers(List<Ms_ItemCardOffers> entity);
        void UpdateAttributs(List<Prod_ItemAttributsJoin> entity);
        void UpdateItemImages(List<MS_ItemImages> entity);
        void UpdateItemUnit(List<Ms_ItemUnit> entity);
        void UpdateItemAlternatives(List<MS_ItemAlternatives> entity);
        void UpdateItemCollection(List<Ms_ItemCollection> entity);
        void UpdateItemCardExpenses(List<Prod_ItemcardExpenses> entity);
        bool Delete(int id);
        List<T> DeleteList<T>(List<T> entitys) where T : class, new();
    }
}
