using Inv.BLL.Services.GLDefAccount.VM;
using Inv.DAL.Domain; 
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Inv.BLL.Services.MSGACity
{
    public interface IMSGA_CityService
    {
        MSGA_City GetById(int id);
        List<MSGA_City> GetAll();
        List<MSGA_City> GetAll(Expression<Func<MSGA_City, bool>> predicate);
        MSGA_City Insert(MSGA_City entity);
        void InsertList(List<MSGA_City> entitys);
        MSGA_City Update(MSGA_City entity);
        void UpdateList(List<MSGA_City> entity);
        bool Delete(int id);
        void DeleteList(List<MSGA_City> entity);
    }
}
