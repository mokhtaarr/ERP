using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using Inv.DAL.Domain;
using Inv.DAL.Repository;

namespace Inv.BLL.Services.MSStores
{
    public class MS_StoresService : IMS_StoresService
    {
        private readonly IUnitOfWork unitOfWork;
        public MS_StoresService(IUnitOfWork _unitOfWork)
        {
            this.unitOfWork = _unitOfWork;
        }
        public List<MS_Stores> GetAll()
        {
          
            return unitOfWork.Repository<MS_Stores>().GetAll();
        }

        public List<MS_Stores> GetAll(Expression<Func<MS_Stores, bool>> predicate)
        {
            return unitOfWork.Repository<MS_Stores>().Get(predicate);
           
        }

        public MS_Stores GetById(int id)
        {
            return unitOfWork.Repository<MS_Stores>().GetById(id);
        }

        public MS_Stores Insert(MS_Stores storeObj)
        {
            
            var obj = unitOfWork.Repository<MS_Stores>().Insert(storeObj);
            unitOfWork.Save();
            return obj;
        }

        public MS_Stores Update(MS_Stores storeObj)
        {
            var obj = unitOfWork.Repository<MS_Stores>().Update(storeObj);
            unitOfWork.Save();
            return obj;
        }
        public void Delete(int id)
        {
            unitOfWork.Repository<MS_Stores>().Delete(id);
            unitOfWork.Save();
        }
    }
}
