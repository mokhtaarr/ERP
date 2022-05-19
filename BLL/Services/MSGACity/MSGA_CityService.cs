using Inv.DAL.Domain;
using Inv.DAL.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Inv.BLL.Services.MSGACity
{
   public class MSGA_CityService : IMSGA_CityService
    {
        private readonly IUnitOfWork unitOfWork;

        public MSGA_CityService(IUnitOfWork _unitOfWork)
        {
            this.unitOfWork = _unitOfWork;
        }

        #region GLDefAccount Services
        public MSGA_City GetById(int id)
        {
            return unitOfWork.Repository<MSGA_City>().GetById(id);
        }

        public List<MSGA_City> GetAll()
        {
            return unitOfWork.Repository<MSGA_City>().GetAll();
        }

        public List<MSGA_City> GetAll(Expression<Func<MSGA_City, bool>> predicate)
        {
            return unitOfWork.Repository<MSGA_City>().Get(predicate);
        }

        public MSGA_City Insert(MSGA_City entity)
        {
            var memb = unitOfWork.Repository<MSGA_City>().Insert(entity);
            unitOfWork.Save();
            return memb;
        }
        
        public void InsertList(List<MSGA_City> MSGA_City)
        {
            unitOfWork.Repository<MSGA_City>().Insert(MSGA_City);
            unitOfWork.Save();
        }
        
        public MSGA_City Update(MSGA_City entity)
        {

            var memb = unitOfWork.Repository<MSGA_City>().Update(entity);
            unitOfWork.Save();
            return memb;
        }
        
        public void UpdateList(List<MSGA_City> MSGA_City)
        {
            unitOfWork.Repository<MSGA_City>().Update(MSGA_City);
            unitOfWork.Save();
        }

        public void DeleteList(List<MSGA_City> MSGA_City)
        {
            unitOfWork.Repository<MSGA_City>().Delete(MSGA_City);
            unitOfWork.Save();
        }
        public bool Delete(int id)
        {
            try
            {
                unitOfWork.Repository<MSGA_City>().Delete(id);
                unitOfWork.Save();
                return true;
            }
            catch 
            {
                return false;
            }
        }
        #endregion
    }
}
