using Inv.BLL.Services.MSExpenses;
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
  public  class MS_ExpensesService : IMS_ExpensesService
    {
        private readonly IUnitOfWork unitOfWork;
        public MS_ExpensesService(IUnitOfWork _unitOfWork)
        {
            this.unitOfWork = _unitOfWork;
        }

        public List<MS_Expenses> GetAll()
        {
            return unitOfWork.Repository<MS_Expenses>().GetAll();
        }

        public List<MS_Expenses> GetAll(Expression<Func<MS_Expenses, bool>> predicate)
        {
            return unitOfWork.Repository<MS_Expenses>().Get(predicate);
        }

        public MS_Expenses GetById(int id)
        {
            return unitOfWork.Repository<MS_Expenses>().GetById(id);
        }

        public MS_Expenses Insert(MS_Expenses entity)
        {
            var memb = unitOfWork.Repository<MS_Expenses>().Insert(entity);
            unitOfWork.Save();
            return memb;
        }
       
        public List<T> InsertList<T>(List<T> entitys) where T : class, new()
        {
            unitOfWork.Repository<T>().Insert(entitys);
            unitOfWork.Save();
            return null;
        }
        
        public MS_Expenses Update(MS_Expenses entity)
        {
            var memb = unitOfWork.Repository<MS_Expenses>().Update(entity);
            unitOfWork.Save();
            return memb;
        }
        
        public bool Delete(int id)
        {
            try
            {
                unitOfWork.Repository<MS_Expenses>().Delete(id);
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
