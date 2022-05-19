using Inv.DAL.Domain;
using Inv.DAL.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Inv.BLL.Services.SysBooks
{
  public  class Sys_BooksService : ISys_BooksService
    {
        private readonly IUnitOfWork unitOfWork;
        public Sys_BooksService(IUnitOfWork _unitOfWork)
        {
            this.unitOfWork = _unitOfWork;
        }

        public List<Sys_Books> GetAll()
        {
            return unitOfWork.Repository<Sys_Books>().GetAll();
        }

        public List<Sys_Books> GetAll(Expression<Func<Sys_Books, bool>> predicate)
        {
            return unitOfWork.Repository<Sys_Books>().Get(predicate);
        }

        public Sys_Books GetById(int id)
        {
            return unitOfWork.Repository<Sys_Books>().GetById(id);
        }

        public Sys_Books Insert(Sys_Books entity)
        {
            var memb = unitOfWork.Repository<Sys_Books>().Insert(entity);
            unitOfWork.Save();
            return memb;
        }
       
        public List<T> InsertList<T>(List<T> entitys) where T : class, new()
        {
            unitOfWork.Repository<T>().Insert(entitys);
            unitOfWork.Save();
            return null;
        }
        
        public Sys_Books Update(Sys_Books entity)
        {
            var memb = unitOfWork.Repository<Sys_Books>().Update(entity);
            unitOfWork.Save();
            return memb;
        }
        
        public bool Delete(int id)
        {
            try
            {
                unitOfWork.Repository<Sys_Books>().Delete(id);
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
