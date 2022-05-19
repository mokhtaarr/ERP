using Inv.DAL.Domain;
using Inv.DAL.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Inv.BLL.Services.MsVendorTypes
{
   public class Ms_VendorTypesService : IMs_VendorTypesService
    {
        private readonly IUnitOfWork unitOfWork;

        public Ms_VendorTypesService(IUnitOfWork _unitOfWork)
        {
            this.unitOfWork = _unitOfWork;
        }

        #region GLDefAccount Services
        public Ms_VendorTypes GetById(int id)
        {
            return unitOfWork.Repository<Ms_VendorTypes>().GetById(id);
        }

        public List<Ms_VendorTypes> GetAll()
        {
            return unitOfWork.Repository<Ms_VendorTypes>().GetAll();
        }

        public List<Ms_VendorTypes> GetAll(Expression<Func<Ms_VendorTypes, bool>> predicate)
        {
            return unitOfWork.Repository<Ms_VendorTypes>().Get(predicate);
        }

        public Ms_VendorTypes Insert(Ms_VendorTypes entity)
        {
            var memb = unitOfWork.Repository<Ms_VendorTypes>().Insert(entity);
            unitOfWork.Save();
            return memb;
        }
        
        public void InsertList(List<Ms_VendorTypes> Ms_VendorTypes)
        {
            unitOfWork.Repository<Ms_VendorTypes>().Insert(Ms_VendorTypes);
            unitOfWork.Save();
        }
        
        public Ms_VendorTypes Update(Ms_VendorTypes entity)
        {

            var memb = unitOfWork.Repository<Ms_VendorTypes>().Update(entity);
            unitOfWork.Save();
            return memb;
        }
        
        public void UpdateList(List<Ms_VendorTypes> Ms_VendorTypes)
        {
            unitOfWork.Repository<Ms_VendorTypes>().Update(Ms_VendorTypes);
            unitOfWork.Save();
        }

        public void DeleteList(List<Ms_VendorTypes> Ms_VendorTypes)
        {
            unitOfWork.Repository<Ms_VendorTypes>().Delete(Ms_VendorTypes);
            unitOfWork.Save();
        }
        public bool Delete(int id)
        {
            try
            {
                unitOfWork.Repository<Ms_VendorTypes>().Delete(id);
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
