using Inv.DAL.Domain;
using Inv.DAL.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Inv.BLL.Services.MSTaxes
{
  public  class MS_TaxesService : IMS_TaxesService
    {
        private readonly IUnitOfWork unitOfWork;
        public MS_TaxesService(IUnitOfWork _unitOfWork)
        {
            this.unitOfWork = _unitOfWork;
        }

        public List<MS_Taxes> GetAll()
        {
            return unitOfWork.Repository<MS_Taxes>().GetAll();
        }

        public List<MS_Taxes> GetAll(Expression<Func<MS_Taxes, bool>> predicate)
        {
            return unitOfWork.Repository<MS_Taxes>().Get(predicate);
        }

        public MS_Taxes GetById(int id)
        {
            return unitOfWork.Repository<MS_Taxes>().GetById(id);
        }

        public MS_Taxes Insert(MS_Taxes entity)
        {
            var memb = unitOfWork.Repository<MS_Taxes>().Insert(entity);
            unitOfWork.Save();
            return memb;
        }
       
        public List<T> InsertList<T>(List<T> entitys) where T : class, new()
        {
            unitOfWork.Repository<T>().Insert(entitys);
            unitOfWork.Save();
            return null;
        }
        
        public MS_Taxes Update(MS_Taxes entity)
        {
            var memb = unitOfWork.Repository<MS_Taxes>().Update(entity);
            unitOfWork.Save();
            return memb;
        }
        
        public bool Delete(int id)
        {
            try
            {
                unitOfWork.Repository<MS_Taxes>().Delete(id);
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
