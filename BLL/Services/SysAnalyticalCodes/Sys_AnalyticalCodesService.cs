using Inv.DAL.Domain;
using Inv.DAL.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Inv.BLL.Services.SysAnalyticalCodes
{
    public class Sys_AnalyticalCodesService : ISys_AnalyticalCodesService
    {
        private readonly IUnitOfWork unitOfWork;

        public Sys_AnalyticalCodesService(IUnitOfWork _unitOfWork)
        {
            this.unitOfWork = _unitOfWork;
        }

        #region GLDefAccount Services
        public Sys_AnalyticalCodes GetById(int id)
        {
            return unitOfWork.Repository<Sys_AnalyticalCodes>().GetById(id);
        }

        public List<Sys_AnalyticalCodes> GetAll()
        {
            return unitOfWork.Repository<Sys_AnalyticalCodes>().GetAll();
        }

        public List<Sys_AnalyticalCodes> GetAll(Expression<Func<Sys_AnalyticalCodes, bool>> predicate)
        {
            return unitOfWork.Repository<Sys_AnalyticalCodes>().Get(predicate);
        }

        public Sys_AnalyticalCodes Insert(Sys_AnalyticalCodes entity)
        {
            var memb = unitOfWork.Repository<Sys_AnalyticalCodes>().Insert(entity);
            unitOfWork.Save();
            return memb;
        }

        public List<T> InsertList<T>(List<T> entitys) where T : class, new()
        {
            unitOfWork.Repository<T>().Insert(entitys);
            unitOfWork.Save();
            return null;
        }

        public Sys_AnalyticalCodes Update(Sys_AnalyticalCodes entity)
        {

            var memb = unitOfWork.Repository<Sys_AnalyticalCodes>().Update(entity);
            unitOfWork.Save();
            return memb;
        }

        public List<T> DeleteList<T>(List<T> entitys) where T : class, new()
        {
            unitOfWork.Repository<T>().Delete(entitys);
            unitOfWork.Save();
            return null;
        }
        
        public bool Delete(int id)
        {
            try
            {
                unitOfWork.Repository<Sys_AnalyticalCodes>().Delete(id);
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
