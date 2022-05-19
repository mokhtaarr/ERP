using Inv.DAL.Domain;
using Inv.DAL.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Inv.BLL.Services.SysFinancialYears
{
  public  class Sys_FinancialYearsService : ISys_FinancialYearsService
    {
        private readonly IUnitOfWork unitOfWork;
        public Sys_FinancialYearsService(IUnitOfWork _unitOfWork)
        {
            this.unitOfWork = _unitOfWork;
        }

        public List<Sys_FinancialYears> GetAll()
        {
            return unitOfWork.Repository<Sys_FinancialYears>().GetAll();
        }

        public List<Sys_FinancialYears> GetAll(Expression<Func<Sys_FinancialYears, bool>> predicate)
        {
            return unitOfWork.Repository<Sys_FinancialYears>().Get(predicate);
        }
        
        public List<Sys_FinancialIntervals> GetFinancialIntervals(Expression<Func<Sys_FinancialIntervals, bool>> predicate)
        {
            return unitOfWork.Repository<Sys_FinancialIntervals>().Get(predicate);
        }

        public Sys_FinancialYears GetById(int id)
        {
            return unitOfWork.Repository<Sys_FinancialYears>().GetById(id);
        }

        public Sys_FinancialYears Insert(Sys_FinancialYears entity)
        {
            var memb = unitOfWork.Repository<Sys_FinancialYears>().Insert(entity);
            unitOfWork.Save();
            return memb;
        }
       
        public List<T> InsertList<T>(List<T> entitys) where T : class, new()
        {
            unitOfWork.Repository<T>().Insert(entitys);
            unitOfWork.Save();
            return null;
        }
        public List<Sys_FinancialIntervals> UpdateFinancialIntervals(List<Sys_FinancialIntervals> entitys)
        {
            int? id = entitys[0].FinancialYearId;
            List<Sys_FinancialIntervals> financialIntervals = GetFinancialIntervals(x => x.FinancialYearId == id).ToList();
            DeleteList(financialIntervals);

            unitOfWork.Repository<Sys_FinancialIntervals>().Insert(entitys);
            unitOfWork.Save();
            return null;
        }
        
        public Sys_FinancialYears Update(Sys_FinancialYears entity)
        {
            var memb = unitOfWork.Repository<Sys_FinancialYears>().Update(entity);
            unitOfWork.Save();
            return memb;
        }
        
        public bool Delete(int id)
        {
            try
            {
                unitOfWork.Repository<Sys_FinancialYears>().Delete(id);
                unitOfWork.Save();
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public List<T> DeleteList<T>(List<T> entitys) where T : class, new()
        {
            unitOfWork.Repository<T>().Delete(entitys);
            unitOfWork.Save();
            return null;
        }

    }
}
