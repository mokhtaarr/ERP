using Inv.DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Inv.BLL.Services.SysBooks
{
    public interface ISys_BooksService
    {
        Sys_Books GetById(int id);
        List<Sys_Books> GetAll();
        List<Sys_Books> GetAll(Expression<Func<Sys_Books, bool>> predicate);
        Sys_Books Insert(Sys_Books entity);
        List<T> InsertList<T>(List<T> entitys) where T : class, new();
        Sys_Books Update(Sys_Books entity);
        bool Delete(int id);
    }
}
