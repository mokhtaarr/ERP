using Inv.DAL.Domain;
using Inv.DAL.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Inv.BLL.Services.ProdEquipments
{
  public  class Prod_EquipmentsService : IProd_EquipmentsService
    {
        private readonly IUnitOfWork unitOfWork;
        public Prod_EquipmentsService(IUnitOfWork _unitOfWork)
        {
            this.unitOfWork = _unitOfWork;
        }

        public List<Prod_Equipments> GetAll()
        {
            return unitOfWork.Repository<Prod_Equipments>().GetAll();
        }

        public List<Prod_Equipments> GetAll(Expression<Func<Prod_Equipments, bool>> predicate)
        {
            return unitOfWork.Repository<Prod_Equipments>().Get(predicate);
        }

        public Prod_Equipments GetById(int id)
        {
            return unitOfWork.Repository<Prod_Equipments>().GetById(id);
        }

        public Prod_Equipments Insert(Prod_Equipments entity)
        {
            var memb = unitOfWork.Repository<Prod_Equipments>().Insert(entity);
            unitOfWork.Save();
            return memb;
        }
       
        public List<T> InsertList<T>(List<T> entitys) where T : class, new()
        {
            unitOfWork.Repository<T>().Insert(entitys);
            unitOfWork.Save();
            return null;
        }
        
        public Prod_Equipments Update(Prod_Equipments entity)
        {
            var memb = unitOfWork.Repository<Prod_Equipments>().Update(entity);
            unitOfWork.Save();
            return memb;
        }
        
        public bool Delete(int id)
        {
            try
            {
                unitOfWork.Repository<Prod_Equipments>().Delete(id);
                unitOfWork.Save();
                return true;
            }
            catch 
            {
                return false;
            }
        }
    }
}
