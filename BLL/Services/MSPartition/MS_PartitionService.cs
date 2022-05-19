using Inv.DAL.Domain;
using Inv.DAL.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Inv.BLL.Services.MSPartition
{
   public class MS_PartitionService : IMS_PartitionService
    {

        private readonly IUnitOfWork unitOfWork;
        public MS_PartitionService(IUnitOfWork _unitOfWork)
        {
            this.unitOfWork = _unitOfWork;
        }

      
        public List<MS_Partition> GetAll()
        {
            return unitOfWork.Repository<MS_Partition>().GetAll();
        }

        public List<MS_Partition> GetAll(Expression<Func<MS_Partition, bool>> predicate)
        {
            return unitOfWork.Repository<MS_Partition>().Get(predicate);

        }

        public MS_Partition GetById(int id)
        {
            return unitOfWork.Repository<MS_Partition>().GetById(id);
        }

        public MS_Partition Insert(MS_Partition PartitionObj)
        {

            var obj = unitOfWork.Repository<MS_Partition>().Insert(PartitionObj);
            unitOfWork.Save();
            return obj;
        }
        public void InsertList(List<MS_Partition> PartitionList)
        {

            unitOfWork.Repository<MS_Partition>().Insert(PartitionList);
            unitOfWork.Save();
           
        }
        public MS_Partition Update(MS_Partition PartitionObj)
        {
            var obj = unitOfWork.Repository<MS_Partition>().Update(PartitionObj);
            unitOfWork.Save();
            return obj;
        }
        public void UpdateList(List<MS_Partition> PartList)
        {
            var insertedRecord = PartList.Where(x => x.StatusFlag == 'i');
            var updatedRecord = PartList.Where(x => x.StatusFlag == 'u');
            var deletedRecord = PartList.Where(x => x.StatusFlag == 'd');

            if (updatedRecord.Count() > 0)
                unitOfWork.Repository<MS_Partition>().Update(updatedRecord);

            if (insertedRecord.Count() > 0)
                unitOfWork.Repository<MS_Partition>().Insert(insertedRecord);


            if (deletedRecord.Count() > 0)
            {
                foreach (var entity in deletedRecord)
                    unitOfWork.Repository<MS_Partition>().Delete(entity.StorePartId);
            }

            unitOfWork.Save();
        }
        public void Delete(int id)
        {
            unitOfWork.Repository<MS_Partition>().Delete(id);
            unitOfWork.Save();
        }

        public void DeleteList(List<MS_Partition> PartitionList)
        {
            unitOfWork.Repository<MS_Partition>().Delete(PartitionList);
            unitOfWork.Save();
        }
    }
}
