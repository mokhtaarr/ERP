using Inv.DAL.Domain;
using Inv.DAL.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Inv.BLL.Services.CalCostCenters
{
    public class CalCostCentersService : ICalCostCentersService
    {
        private readonly IUnitOfWork unitOfWork;

        public CalCostCentersService(IUnitOfWork _unitOfWork)
        {
            this.unitOfWork = _unitOfWork;
        }
        #region IGenDefCategory Services

        public Cal_CostCenters GetById(int id)
        {
            return unitOfWork.Repository<Cal_CostCenters>().GetById(id);
        }

        public List<Cal_CostCenters> GetAll()
        {
            return unitOfWork.Repository<Cal_CostCenters>().GetAll();
        }

        public List<Cal_CostCenters> GetAll(Expression<Func<Cal_CostCenters, bool>> predicate)
        {
            return unitOfWork.Repository<Cal_CostCenters>().Get(predicate);
        }

        public Cal_CostCenters Insert(Cal_CostCenters entity)
        {
            var memb = unitOfWork.Repository<Cal_CostCenters>().Insert(entity);
            unitOfWork.Save();
            return memb;
        }

        public Cal_CostCenters Update(Cal_CostCenters entity)
        {

            var memb = unitOfWork.Repository<Cal_CostCenters>().Update(entity);
            unitOfWork.Save();
            return memb;
        }

        public void Delete(int id)
        {
            unitOfWork.Repository<Cal_CostCenters>().Delete(id);
            unitOfWork.Save();
        }
        #endregion
    }
}
