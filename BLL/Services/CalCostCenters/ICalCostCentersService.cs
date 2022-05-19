using Inv.DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Inv.BLL.Services.CalCostCenters
{
    public interface ICalCostCentersService
    {
        Cal_CostCenters GetById(int id);
        List<Cal_CostCenters> GetAll();
        List<Cal_CostCenters> GetAll(Expression<Func<Cal_CostCenters, bool>> predicate);
        Cal_CostCenters Insert(Cal_CostCenters entity);
        Cal_CostCenters Update(Cal_CostCenters entity);
        void Delete(int id);
    }
}
