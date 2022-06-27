using Inv.API.Models;
using Inv.DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web.Http;
using Inv.API.Tools;
using System.Globalization;
using Inv.BLL.Services.MsItemCard;
using Inv.Static.VM;
using System.IO;
using System.Web;
using System.Configuration;
using System.Drawing;
using System.Text.RegularExpressions;
using System.Data.Entity.Infrastructure;

namespace Inv.API.Controllers
{
    public class MS_ItemCardController : BaseController
    {
        private readonly IMS_ItemCardService Service;
        public MS_ItemCardController(IMS_ItemCardService _service)
        {
            this.Service = _service;
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetAll()
        {
            using (var dbTransaction = db.Database.BeginTransaction())
            {
                string query = @"select ItemCardId,ItemCode,ItemDescA,ItemDescE,ItemType,ItemCategoryId,
                            IsExpir,IsAttributeItem,IsDimension,IsCollection,IsSerialItem from MS_ItemCard";

                List<ItemCardVM> MS_ItemCards = db.Database.SqlQuery<ItemCardVM>(query).ToList();
                return Ok(new BaseResponse(MS_ItemCards));
            }
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetById(int id)
        {
            using (var dbTransaction = db.Database.BeginTransaction())
            {
                MS_ItemCardDetailesVM detailes = new MS_ItemCardDetailesVM()
                {
                    Model = Service.GetById(id),

                    Offers = Service.GetOffers(x => x.ItemCardId == id),
                    AttributsJoin = Service.GetAttributs(x => x.ItemCardId == id),
                    ItemImages = Service.GetItemImages(x => x.ItemCardId == id),
                    ItemCardUnits = db.Database.SqlQuery<Ms_ItemUnitVM>("select UnitId,ItemCardId, UnitCode, UnitNam, UnitNameE from Ms_ItemUnit where ItemCardId = " + id + "").ToList(),
                    ItemUnit = db.Database.SqlQuery<Ms_ItemUnit>("select * from Ms_ItemUnit where ItemCardId = " + id + "").ToList(),
                    ItemAlternatives = db.Database.SqlQuery<MS_ItemAlternatives>("select * from MS_ItemAlternatives where ItemCardId = " + id + "").ToList(),
                    ItemCollection = db.Database.SqlQuery<Ms_ItemCollection>("select * from Ms_ItemCollection where ItemCardId = " + id + "").ToList(),
                    ItemCardExpenses = db.Database.SqlQuery<Prod_ItemcardExpenses>("select * from Prod_ItemcardExpenses where ItemCardId = " + id + "").ToList(),
                    Vendors = Service.GetItemVendors(x => x.ItemCardId == id),
                };

                string itemcardOfferIds = string.Join(",", detailes.Offers.Select(x => x.ItemCardId).ToList());
                if (itemcardOfferIds == "")
                    itemcardOfferIds = "''";
                string sql = @"select UnitId,ItemCardId, UnitCode, UnitNam, UnitNameE from Ms_ItemUnit where ItemCardId in (" + itemcardOfferIds + ")";

                detailes.GiftUnits = db.Database.SqlQuery<Ms_ItemUnitVM>(sql).ToList();
                return Ok(new BaseResponse(detailes));
            }
        }

        [HttpPost, AllowAnonymous]
        public IHttpActionResult Insert([FromBody] MS_ItemCardDetailesVM detailes)
        {
            using (var dbTransaction = db.Database.BeginTransaction())
            {
                try
                {
                    if (detailes != null)
                    {
                        if (detailes.Model != null)
                        {
                            SaveImageBase64(detailes.ItemImages);

                            MS_ItemCard Model = Service.Insert(detailes.Model);
                            detailes.ItemUnit.ForEach(x => x.ItemCardId = Model.ItemCardId);
                            detailes.ItemImages.ForEach(x => x.ItemCardId = Model.ItemCardId);
                            detailes.ItemAlternatives.ForEach(x => x.ItemCardId = Model.ItemCardId);
                            detailes.ItemCollection.ForEach(x => x.ItemCardId = Model.ItemCardId);
                            detailes.AttributsJoin.ForEach(x => x.ItemCardId = Model.ItemCardId);
                            detailes.Offers.ForEach(x => x.ItemCardId = Model.ItemCardId);
                            detailes.ItemCardExpenses.ForEach(x => x.ItemCardId = Model.ItemCardId);
                            detailes.Vendors.ForEach(x => x.ItemCardId = Model.ItemCardId);
                    
                            if (detailes.ItemUnit.Count() > 0)
                                Service.InsertList(detailes.ItemUnit);
                            if (detailes.ItemImages.Count() > 0)
                                Service.InsertList(detailes.ItemImages);
                            if (detailes.ItemAlternatives.Count() > 0)
                                Service.InsertList(detailes.ItemAlternatives);
                            if (detailes.ItemCollection.Count() > 0)
                                Service.InsertList(detailes.ItemCollection);
                            if (detailes.AttributsJoin.Count() > 0)
                                Service.InsertList(detailes.AttributsJoin);
                            if (detailes.Offers.Count() > 0)
                                Service.InsertList(detailes.Offers);
                            if (detailes.ItemCardExpenses.Count() > 0)
                                Service.InsertList(detailes.ItemCardExpenses);
                            if (detailes.Vendors.Count() > 0)
                                Service.InsertList(detailes.Vendors);

                            dbTransaction.Commit();
                            return Ok(new BaseResponse(detailes.Model));
                        }
                        return Ok(new BaseResponse(HttpStatusCode.InternalServerError, "model is null"));
                    }
                    else return Ok(new BaseResponse(HttpStatusCode.InternalServerError, "detailes is null"));
                }
                catch (Exception ex)
                {
                    dbTransaction.Rollback();
                    return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
                }
            }
        }

        [HttpPost, AllowAnonymous]
        public IHttpActionResult Update([FromBody] MS_ItemCardDetailesVM detailes)
        {
            using (var dbTransaction = db.Database.BeginTransaction())
            {
                try
                {
                    if (detailes != null)
                    {
                        if (detailes.Model != null)
                        {
                            if (detailes.ItemImages.Count > 0)
                                DeleteOldImages(detailes.ItemImages[0].ItemCardId.Value, detailes.ItemImages);

                            SaveImageBase64(detailes.ItemImages);
                            
                            MS_ItemCard Model = Service.Update(detailes.Model);
                            detailes.ItemUnit.ForEach(x => x.ItemCardId = Model.ItemCardId);
                            detailes.ItemImages.ForEach(x => x.ItemCardId = Model.ItemCardId);
                            detailes.ItemAlternatives.ForEach(x => x.ItemCardId = Model.ItemCardId);
                            detailes.ItemCollection.ForEach(x => x.ItemCardId = Model.ItemCardId);
                            detailes.AttributsJoin.ForEach(x => x.ItemCardId = Model.ItemCardId);
                            detailes.Offers.ForEach(x => x.ItemCardId = Model.ItemCardId);
                            detailes.ItemCardExpenses.ForEach(x => x.ItemCardId = Model.ItemCardId);
                            detailes.Vendors.ForEach(x => x.ItemCardId = Model.ItemCardId);

                            if (detailes.ItemUnit.Count() > 0)
                                Service.UpdateItemUnit(detailes.ItemUnit);
                            if (detailes.ItemImages.Count() > 0)
                                Service.UpdateItemImages(detailes.ItemImages);
                            if (detailes.ItemAlternatives.Count() > 0)
                                Service.UpdateItemAlternatives(detailes.ItemAlternatives);
                            if (detailes.ItemCollection.Count() > 0)
                                Service.UpdateItemCollection(detailes.ItemCollection);
                            if (detailes.AttributsJoin.Count() > 0)
                                Service.UpdateAttributs(detailes.AttributsJoin);
                            if (detailes.Offers.Count() > 0)
                                Service.UpdateOffers(detailes.Offers);
                            if (detailes.ItemCardExpenses.Count() > 0)
                                Service.UpdateItemCardExpenses(detailes.ItemCardExpenses);
                            if (detailes.Vendors.Count() > 0)
                                Service.UpdateItemVendors(detailes.Vendors);
                            
                            dbTransaction.Commit();
                            return Ok(new BaseResponse(detailes.Model));
                        }
                        return Ok(new BaseResponse(HttpStatusCode.InternalServerError, "model is null"));
                    }
                    else return Ok(new BaseResponse(HttpStatusCode.InternalServerError, "detailes is null"));
                }
                catch (Exception ex)
                {
                    dbTransaction.Rollback();
                    return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
                }
            }
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult Delete(int id)
        {
            using (var dbTransaction = db.Database.BeginTransaction())
            {
                try
                {
                    db.Database.SqlQuery<int>("delete from MS_ItemVendors where ItemCardId = " + id + "");
                    db.Database.SqlQuery<int>("delete from Ms_ItemCardOffers where ItemCardId = " + id + "");
                    db.Database.SqlQuery<int>("delete from Prod_ItemAttributsJoin where ItemCardId = " + id + "");
                    db.Database.SqlQuery<int>("delete from MS_ItemImages where ItemCardId = " + id + "");
                    db.Database.SqlQuery<int>("delete from Ms_ItemUnit where ItemCardId = " + id + "");
                    db.Database.SqlQuery<int>("delete from MS_ItemAlternatives where ItemCardId = " + id + "");
                    db.Database.SqlQuery<int>("delete from Ms_ItemCollection where ItemCardId = " + id + "");
                    db.Database.SqlQuery<int>("delete from Prod_ItemcardExpenses where ItemCardId = " + id + "");

                    //MS_ItemCardDetailesVM detailes = new MS_ItemCardDetailesVM()
                    //{
                    //    Vendors = Service.GetItemVendors(x => x.ItemCardId == id),
                    //    Offers = Service.GetOffers(x => x.ItemCardId == id),
                    //    AttributsJoin = Service.GetAttributs(x => x.ItemCardId == id)
                    //};

                    //if (detailes.Vendors.Count() > 0)
                    //    Service.DeleteList(detailes.Vendors);
                    //if (detailes.Offers.Count() > 0)
                    //    Service.DeleteList(detailes.Offers);
                    // if (detailes.AttributsJoin.Count() > 0)
                    //    Service.DeleteList(detailes.AttributsJoin);

                    bool res = Service.Delete(id);
                    dbTransaction.Commit();
                    return Ok(res);
                }
                catch (Exception ex)
                {
                    dbTransaction.Rollback();
                    return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
                }
            }
        }

        public Bitmap Base64StringToBitmap(string base64String)
        {
            Bitmap bmpReturn = null;
            byte[] byteBuffer = Convert.FromBase64String(base64String);
            MemoryStream memoryStream = new MemoryStream(byteBuffer);
            memoryStream.Position = 0;
            bmpReturn = (Bitmap)Bitmap.FromStream(memoryStream);
            memoryStream.Close();
            memoryStream = null;
            byteBuffer = null;
            return bmpReturn;
        }

        public void SaveImageBase64(List<MS_ItemImages> ItemImages)
        {
            foreach (var item in ItemImages)
            {
                try
                {
                    string basePath = HttpContext.Current.Server.MapPath("~/" + ConfigurationManager.AppSettings["UploadPath"] + "/Items/");
                    string result = Regex.Replace(item.ImageStr, @"^data:image\/[a-zA-Z]+;base64,", string.Empty);
                    string fileName = System.IO.Path.GetRandomFileName().Replace(".", "") + ".png";
                    string fullPath = basePath + fileName;
                    byte[] bytes = Convert.FromBase64String(result);
                    Image image;

                    using (var streamBitmap = new MemoryStream(bytes))
                    {
                        using (image = Image.FromStream(streamBitmap))
                        {
                            image.Save(fullPath);
                        }
                    }
                }
                catch
                {
                    //string fName = Path.GetFileName(fileName);
                    //string _name = FileHelper.GetFileNewNamewithoutfolder(fName, Path.GetExtension(fName));
                    //string path = Path.Combine(HttpContext.Current.Server.MapPath("~/" + ConfigurationManager.AppSettings["UploadPath"] + "/Items/"), _name);
                    //file.SaveAs(path);
                }
            }
        }

        public void DeleteOldImages(int ItemCardId, List<MS_ItemImages> ItemImages)
        {
            List<MS_ItemImages> oldItemImages = Service.GetItemImages(x => x.ItemCardId == ItemCardId);
            //.Except(ItemImages).ToList();
            List<string> oldImageStr = oldItemImages.Select(x => x.ImageStr).ToList();
            List<string> newItemImages = ItemImages.Select(x => x.ImageStr).ToList();

            List<MS_ItemImages> difItemImages = oldItemImages.Where(x=> !newItemImages.Contains(x.ImageStr)).ToList();
            string deleteIds = string.Join(",", difItemImages.Select(x => x.ImgId));

            foreach (var item in difItemImages)
            {
                if (item.ImageStr == null)
                    continue;

                string str = Path.Combine(HttpContext.Current.Server.MapPath("~/" + ConfigurationManager.AppSettings["UploadPath"] + "/Items/"), item.ImageStr);
                if (File.Exists(str))
                {
                    File.Delete(str);
                }
            }
            Service.DeleteList(difItemImages);
            //var count = db.Database.SqlQuery<int>("delete from MS_ItemImages where ItemCardId in (" + deleteIds + ")");
        }

        //[HttpPost, AllowAnonymous]
        //public bool Uploadfile()
        //{
        //    MS_ItemCard Model = new MS_ItemCard();
        //    HttpFileCollection httpPostedFile = HttpContext.Current.Request.Files;
        //    if (HttpContext.Current.Request.Files.AllKeys.Any())
        //    {
        //        for (int i = 0; i < httpPostedFile.Count; i++)
        //        {
        //            HttpPostedFile file = httpPostedFile[i];
        //            MS_ItemImages Item = new MS_ItemImages();
        //            if (file != null && file.ContentLength > 0)
        //            {
        //                string fname = file.FileName;
        //                // Get the complete folder path and store the file inside it.

        //                string fileName = Path.GetFileName(fname);
        //                string _name = FileHelper.GetFileNewNamewithoutfolder(fileName, Path.GetExtension(fileName));
        //                string path = Path.Combine(HttpContext.Current.Server.MapPath("~/" + ConfigurationManager.AppSettings["UploadPath"] + "/Items/"), _name);
        //                file.SaveAs(path);

        //                if (Model.ItemCardId != 0)
        //                {
        //                    string query = "select * from MS_ItemImages where ItemCardId = " + Model.ItemCardId;
        //                    List<string> oldImages = db.Database.SqlQuery<string>(query).ToList();

        //                    if (Item.Image != null)
        //                    {
        //                        foreach (var item in oldImages)
        //                        {
        //                            string str = Path.Combine(HttpContext.Current.Server.MapPath("~/" + ConfigurationManager.AppSettings["UploadPath"] + "/Items/"), item);
        //                            if (File.Exists(str))
        //                            {
        //                                File.Delete(str);
        //                            }
        //                        }
        //                    }
        //                }
        //            }
        //            //else if (Model.ItemCardId != 0)
        //            //{
        //            //    Item = Service.GetAboutUsById(Model.ItemCardId);
        //            //    Model.Image = Item.Image;
        //            //}
        //        }
        //    }
        //    //else if (Model.Id != 0 && (Model.Image == "" || Model.Image == null))
        //    //{
        //    //    var Item = Service.GetAboutUsById(Model.Id);
        //    //    Model.Image = Item.Image;
        //    //}
        //    return true;
        //}
    }
}
