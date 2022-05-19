using Inv.DAL.Domain;
using Inv.DAL.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Inv.BLL.Services.Shared
{
   public class SharedService : ISharedService
    {
        private readonly IUnitOfWork unitOfWork;

        public SharedService(IUnitOfWork _unitOfWork)
        {
            this.unitOfWork = _unitOfWork;
        }

        #region Shared Services

        public List<Ms_Terms> GetAllTerms(Expression<Func<Ms_Terms, bool>> predicate)
        {
            return unitOfWork.Repository<Ms_Terms>().Get(predicate);
        }

        public List<MS_Customer> GetCustomers(Expression<Func<MS_Customer, bool>> predicate)
        {
            return unitOfWork.Repository<MS_Customer>().Get(predicate);
        }

        public List<Cal_AccountChart> GetAllAccountChart(Expression<Func<Cal_AccountChart, bool>> predicate)
        {
            return unitOfWork.Repository<Cal_AccountChart>().Get(predicate);
        }
        
        public List<Cal_CostCenters> GetCostCenters(Expression<Func<Cal_CostCenters, bool>> predicate)
        {
            return unitOfWork.Repository<Cal_CostCenters>().Get(predicate);
        }
        
        public List<Sys_Books> GetAllBooks(Expression<Func<Sys_Books, bool>> predicate)
        {
            return unitOfWork.Repository<Sys_Books>().Get(predicate);
        }

        public List<MS_BoxBank> GetAllBoxBank(Expression<Func<MS_BoxBank, bool>> predicate)
        {
            return unitOfWork.Repository<MS_BoxBank>().Get(predicate);
        }

        public List<Ms_CurrencyCategoryJoin> GetAllCurrencyCategoryJoin(Expression<Func<Ms_CurrencyCategoryJoin, bool>> predicate)
        {
            return unitOfWork.Repository<Ms_CurrencyCategoryJoin>().Get(predicate);
        }
        
        public List<MS_CurrencyCategory> GetAllCurrencyCategory(Expression<Func<MS_CurrencyCategory, bool>> predicate)
        {
            return unitOfWork.Repository<MS_CurrencyCategory>().Get(predicate);
        }

        public Sys_Counter GetCounter(Expression<Func<Sys_Counter, bool>> predicate)
        {
            return unitOfWork.Repository<Sys_Counter>().GetFirstOrDefault(predicate);
        }

        #endregion
    }
}
