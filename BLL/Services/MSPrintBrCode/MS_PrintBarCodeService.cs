using Inv.BLL.Services.MSCustomerCategory;
using Inv.DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Inv.BLL.Services.MSPrintBrCode
{
    public class MS_PrintBarCodeService : IMS_PrintBarCodeService
    {
        private readonly IMS_PrintBarCodeService Service;
        public MS_PrintBarCodeService(MS_PrintBarCodeService _service)
        {
            this.Service = _service;
        }

        public bool Delete(int id)
        {
            throw new NotImplementedException();
        }

        public void DeleteList(List<MS_CustomerCategory> entity)
        {
            throw new NotImplementedException();
        }

        public List<MS_CustomerCategory> GetAll()
        {
            throw new NotImplementedException();
        }

        public List<MS_CustomerCategory> GetAll(Expression<Func<MS_CustomerCategory, bool>> predicate)
        {
            throw new NotImplementedException();
        }

        public MS_CustomerCategory GetById(int id)
        {
            throw new NotImplementedException();
        }

        public MS_CustomerCategory Insert(MS_CustomerCategory entity)
        {
            throw new NotImplementedException();
        }

        public void InsertList(List<MS_CustomerCategory> entitys)
        {
            throw new NotImplementedException();
        }

        public MS_CustomerCategory Update(MS_CustomerCategory entity)
        {
            throw new NotImplementedException();
        }

        public void UpdateList(List<MS_CustomerCategory> entity)
        {
            throw new NotImplementedException();
        }
    }
}
