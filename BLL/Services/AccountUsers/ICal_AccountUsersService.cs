using Inv.BLL.Services.GLDefAccount.VM;
using Inv.DAL.Domain; 
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Inv.BLL.Services.AccountUsers
{
    public interface ICal_AccountUsersService
    {
        List<Cal_AccountUsersVM> GetAllUsersById(int id);
        Cal_AccountUsers GetById(int id);
        List<Cal_AccountUsers> GetAll();
        List<Cal_AccountUsers> GetAll(Expression<Func<Cal_AccountUsers, bool>> predicate);
        Cal_AccountUsers Insert(Cal_AccountUsers entity);
        void InsertList(List<Cal_AccountUsers> entitys);
        Cal_AccountUsers Update(Cal_AccountUsers entity);
        bool Delete(int id);
        void DeleteList(List<Cal_AccountUsers> entity);
        void UpdateList(List<Cal_AccountUsers> entity);
    }
}
