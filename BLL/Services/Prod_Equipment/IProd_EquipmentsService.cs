using Inv.DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Inv.BLL.Services.ProdEquipments
{
    public interface IProd_EquipmentsService
    {
        Prod_Equipments GetById(int id);
        List<Prod_Equipments> GetAll();
        List<Prod_Equipments> GetAll(Expression<Func<Prod_Equipments, bool>> predicate);
        Prod_Equipments Insert(Prod_Equipments entity);
        List<T> InsertList<T>(List<T> entitys) where T : class, new();
        Prod_Equipments Update(Prod_Equipments entity);
        bool Delete(int id);
    }
}
