using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using Inv.DAL.Domain;

namespace Inv.BLL.Services.MSStores
{
   public interface IMS_StoresService
    {
         List<MS_Stores> GetAll();
         List<MS_Stores> GetAll(Expression<Func<MS_Stores,bool>> predicate);
         MS_Stores GetById(int id);
         MS_Stores Insert(MS_Stores storeObj);
         MS_Stores Update(MS_Stores storeObj);
   
        void Delete(int id);


    }
}
