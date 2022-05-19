using Inv.DAL.Domain;
using Inv.DAL.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Inv.BLL.Services.CurrencyCategory
{
    public class MS_CurrencyCategoryService : IMS_CurrencyCategoryService
    {
        private readonly IUnitOfWork unitOfWork;
        public MS_CurrencyCategoryService(IUnitOfWork _unitOfWork)
        {
            this.unitOfWork = _unitOfWork;
        }
       

        public List<MS_CurrencyCategory> GetAll()
        {
            return unitOfWork.Repository<MS_CurrencyCategory>().GetAll();
        }

        public List<MS_CurrencyCategory> GetAll(Expression<Func<MS_CurrencyCategory, bool>> predicate)
        {
            return unitOfWork.Repository<MS_CurrencyCategory>().Get(predicate);
        }

        public MS_CurrencyCategory GetById(int id)
        {
            return unitOfWork.Repository<MS_CurrencyCategory>().GetById(id);
        }

        public MS_CurrencyCategory Insert(MS_CurrencyCategory entity)
        {
            var obj = unitOfWork.Repository<MS_CurrencyCategory>().Insert(entity);
            unitOfWork.Save();
            return obj;
        }

        public MS_CurrencyCategory Update(MS_CurrencyCategory entity)
        {
            var obj = unitOfWork.Repository<MS_CurrencyCategory>().Update(entity);
            unitOfWork.Save();
            return obj;
        }
        public void Delete(int id)
        {
           
                unitOfWork.Repository<MS_CurrencyCategory>().Delete(id);
                unitOfWork.Save();
            }
        }
    }

