using Inv.DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Inv.BLL.Services.MSPrintBrCode
{
    public interface IMS_PrintBarCodeService
    {
        MS_CustomerCategory GetById(int id);
        List<MS_CustomerCategory> GetAll();
        List<MS_CustomerCategory> GetAll(Expression<Func<MS_CustomerCategory, bool>> predicate);
        MS_CustomerCategory Insert(MS_CustomerCategory entity);
        void InsertList(List<MS_CustomerCategory> entitys);
        MS_CustomerCategory Update(MS_CustomerCategory entity);
        void UpdateList(List<MS_CustomerCategory> entity);
        bool Delete(int id);
        void DeleteList(List<MS_CustomerCategory> entity);
    }
}
