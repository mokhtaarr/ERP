using Inv.API.Models;
using Inv.API.Tools;
using Inv.BLL.Services.MSStores;
using Inv.BLL.Services.MSPartition;
using Inv.DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Inv.API.Models.CustomModel;


namespace Inv.API.Controllers
{
    public class MSDefBranchesController : BaseController
    {
        private readonly IMS_StoresService MS_StoresService;
        private readonly IMS_PartitionService MS_PartitionService;
        public MSDefBranchesController(IMS_StoresService _IMS_StoresSRV, IMS_PartitionService _MS_PartitionSRV)
        {
            this.MS_StoresService = _IMS_StoresSRV;
            this.MS_PartitionService = _MS_PartitionSRV;
        }
        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetAllBranches()
        {
            if (ModelState.IsValid)
            {



                var branchesList = MS_StoresService.GetAll().ToList();

                return Ok(new BaseResponse(branchesList));
            }
            return BadRequest(ModelState);

        }
        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetMasterDetailsBranches(string id)
        {
            MasterDetails_Branches BranchesData = new MasterDetails_Branches();
            int storeId = Convert.ToInt32(id);

            var storeObj = MS_StoresService.GetById(storeId);
            var partitionsList = MS_PartitionService.GetAll(x => x.StoreId == storeId).ToList();

            BranchesData.MS_Stores = storeObj;
            BranchesData.MS_Partitions = partitionsList;

            return Ok(new BaseResponse(BranchesData));


        }


        [HttpPost, AllowAnonymous]
        public IHttpActionResult Insert([FromBody] MasterDetails_Branches branchesList)
        {

            //if (ModelState.IsValid)
            //{

            using (var dbTransaction = db.Database.BeginTransaction())
            {
                try
                {
                    var storeFound = MS_StoresService.GetAll(x => x.StoreCode == branchesList.MS_Stores.StoreCode).FirstOrDefault();
                    if (storeFound == null)
                    {

                        var Newstore = MS_StoresService.Insert(branchesList.MS_Stores);
                        foreach (var obj in branchesList.MS_Partitions)
                        {
                            obj.StoreId = Newstore.StoreId;
                        }
                        MS_PartitionService.InsertList(branchesList.MS_Partitions);
                        dbTransaction.Commit();
                        return Ok(new BaseResponse(Newstore));
                    }
                    else return Ok(new BaseResponse("CodeFound"));
                }
                catch (Exception ex)
                {
                    dbTransaction.Rollback();
                    return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
                }
            }
            //}
            //return BadRequest(ModelState);

        }
        [HttpPost, AllowAnonymous]
        public IHttpActionResult Update([FromBody] MasterDetails_Branches branchesList)
        {
            //if (ModelState.IsValid)
            //{

            using (var dbTransaction = db.Database.BeginTransaction())
            {
                try
                {
                    var store = MS_StoresService.Update(branchesList.MS_Stores);
                    foreach (var obj in branchesList.MS_Partitions)
                    {
                        obj.StoreId = store.StoreId;
                    }
                    if (branchesList.MS_Partitions.Count > 0)
                        MS_PartitionService.UpdateList(branchesList.MS_Partitions);

                    dbTransaction.Commit();
                    return Ok(new BaseResponse(store));

                }
                catch (Exception ex)
                {
                    dbTransaction.Rollback();
                    return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
                }
            }
            //}
            //return BadRequest(ModelState);

        }
        [HttpGet, AllowAnonymous]
        public IHttpActionResult Delete(int id)
        {
            //if (ModelState.IsValid)
            //{
            using (var dbTransaction = db.Database.BeginTransaction())
            {
                try
                {
                    int storeId = Convert.ToInt32(id);

                    MS_PartitionService.DeleteList(MS_PartitionService.GetAll(x => x.StoreId == storeId));
                    MS_StoresService.Delete(storeId);
                    dbTransaction.Commit();
                    return Ok(new BaseResponse());

                }
                catch (Exception ex)
                {
                    dbTransaction.Rollback();
                    return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
                }
            }
            //}
            //return BadRequest(ModelState);
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetBrancheById(string id)
        {
            string s = "select * from MS_Stores where StoreId=" + id;

            string query = s;
            var res = db.Database.SqlQuery<MS_Stores>(query).FirstOrDefault();
            return Ok(new BaseResponse(res));




        }

        //[HttpGet, AllowAnonymous]
        //public IHttpActionResult GetPartitionsByStoreID(string id)
        //{
        //    if (ModelState.IsValid)
        //    {
        //        string s = "select * from MS_Partition where StoreId=" + id;

        //        string query = s;
        //        var res = db.Database.SqlQuery<MS_Partition>(query).ToList();
        //        return Ok(new BaseResponse(res));



        //    }
        //    return BadRequest(ModelState);

        //}
    }
}
