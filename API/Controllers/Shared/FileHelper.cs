using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inv.API.Controllers
{
    public static class FileHelper
    {
        /// <summary>
        /// Returns Full Path to file to use it int DB
        /// </summary>
        /// <param name="fileName"> Get Uploaded file Name with Extention</param>
        /// <returns></returns>
        //public static string GenerateCompleteFilePath(string fileName)
        //{
        //    string basePath = System.AppDomain.CurrentDomain.BaseDirectory + LC_Constants.Images_URL;
        //    string guid = Guid.NewGuid().ToString();
        //    var Fullpath = Path.Combine(basePath, guid);
        //    return Fullpath;

        //}

        ///// <summary>
        ///// Returns Full Path to file to use it int DB
        ///// </summary>
        ///// <param name="fileName"> Get Uploaded file Name with Extention</param>
        ///// <returns></returns>
        //public static string GetFileNewName(string fileName, string extention)
        //{
        //    string guid = Guid.NewGuid().ToString();
        //    return LC_Constants.Images_URL + guid + extention;

        //}
        public static string GetFileNewNamewithoutfolder(string fileName, string extention)
        {
            string guid = Guid.NewGuid().ToString();
            return  guid + extention;

        }

        //public static string GetUploadFileNewName(string fileName, string extention)
        //{
        //    string guid = Guid.NewGuid().ToString();
        //    return LC_Constants.Upload_URL + guid + extention;

        //}
        //public static string GetUploadSessionNewName(string fileName, string extention)
        //{
        //    string guid = Guid.NewGuid().ToString();
        //    return LC_Constants.Upload_URL + guid + extention;

        //}
        //public static object GetFileNewName(System.Web.HttpPostedFileBase groupImage)
        //{
        //    throw new NotImplementedException();
        //}

        /// <summary> 
        /// Reduce image by reducing quality
        /// </summary> 
        /// <param name="path"> Initially img. </param> 
        /// <param name="quality"> An integer from 0 to 100, with 100 being the highest quality. </param> 


        public static string ConvertToBase64String(byte[] url)
        {
            try
            {

                return "data:image/png;base64," + Convert.ToBase64String(url, 0, url.Length);
            }
            catch (Exception)
            {

                return "/Content/assets/img/logo.png";
            }

        }
    }
}
