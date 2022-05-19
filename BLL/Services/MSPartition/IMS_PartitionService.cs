using Inv.DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Inv.BLL.Services.MSPartition
{
  public  interface IMS_PartitionService
    {
        List<MS_Partition> GetAll();
        List<MS_Partition> GetAll(Expression<Func<MS_Partition, bool>> predicate);
        MS_Partition GetById(int id);
        MS_Partition Insert(MS_Partition PartitionObj);
        MS_Partition Update(MS_Partition PartitionObj);
        void InsertList(List<MS_Partition> PartitionList);
        void Delete(int id);
        void DeleteList(List<MS_Partition> PartitionList);
        void UpdateList(List<MS_Partition> PartList);


    }
}
