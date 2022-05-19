//using Inv.API.Models.CustomEntities;
using Inv.WebUI.Reports.Models;
using System.Web.Mvc;

namespace Inv.WebUI.Controllers
{//eslam 1 dec 2020
    public class GeneralReportsController : Controller
    {
        private ReportService MakeReport(ReportParameters p)
        {
            ReportService rep = new ReportService();

            rep.AddParameter<ReportParameters>("par", p);
            return rep;
        }
        /// <summary>
        /// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        /// </summary>
        /// <returns></returns>
        public ReportService getStandardParameters()
        {
            //Models.SessionRecord sr = SessionManager.SessionRecord;
            ReportService rep = new ReportService();

            //sr.CompanyName = "";
            //sr.CompanyNameAr = "";
            // SystemEnvironment sys = new SystemEnvironment();

            //rep.AddParameter("CompCode", sr.CompCode);
            //rep.AddParameter("braCode", sr.BranchCode);
            //rep.AddParameter("LoginUser", sr.UserCode);
            //rep.AddParameter("ScreenLanguage", sr.ScreenLanguage);
            //rep.AddParameter("SystemCode", sr.SystemCode);
            //rep.AddParameter("SubSystemCode", sr.SubSystemCode);

            //rep.AddParameter("CompNameA", sr.CompanyNameAr);
            //rep.AddParameter("CompNameE", sr.CompanyName);

            //if (string.IsNullOrEmpty(sr.BranchName))
            //{
            //    rep.AddParameter("BraNameA", "");
            //    rep.AddParameter("BraNameE", "");
            //}
            //else
            //{
            //    rep.AddParameter("BraNameA", sr.BranchName);
            //    rep.AddParameter("BraNameE", sr.BranchName);
            //}


            return rep;
        }
        //mahroos adding new parameter 
        public ReportService getStandardParameters(StdParamters sr)
        {
            //Models.SessionRecord sr = SessionManager.SessionRecord;
            ReportService rep = new ReportService();

            //sr.CompanyName = "";
            //sr.CompanyNameAr = "";
            // SystemEnvironment sys = new SystemEnvironment();

            rep.AddParameter("BranchCode", sr.BranchCode);
            rep.AddParameter("LoginUser", sr.UserCode);
            rep.AddParameter("UserCode", sr.UserCode);
            rep.AddParameter("Tokenid", "HGFD-" + sr.Tokenid);
            rep.AddParameter("ScreenLanguage", sr.ScreenLanguage);
            rep.AddParameter("SystemCode", sr.SystemCode);
            rep.AddParameter("SubSystemCode", sr.SubSystemCode);
            rep.AddParameter("CompNameA", sr.CompNameA);
            rep.AddParameter("CompNameE", sr.CompNameE);
            rep.AddParameter("CompCode", sr.CompCode);

            if (string.IsNullOrEmpty(sr.BranchName))
            {
                rep.AddParameter("BraNameA", "");
                rep.AddParameter("BraNameE", "");
            }
            else
            {
                rep.AddParameter("BraNameA", sr.BranchName);
                rep.AddParameter("BraNameE", sr.BranchName);
            }


            return rep;
        }
        public JsonResult RptCustomerinfo(RepFinancials rp)
        {
            ReportService rep = getStandardParameters(rp);
            //ReportService rep = new ReportService();
            rep.AddParameter("RepType", rp.RepType);
            if (rp.CustomerCode==null)
            {
                rp.CustomerCode = "null";
            }
            rep.AddParameter("CustomerCode", rp.CustomerCode);
            rep.AddParameter("CatCodeFrom", rp.CatCodeFrom);
            rep.AddParameter("CatCodeTo", rp.CatCodeTo);
            

            string url = "";

            url = rep.GetReportUrl("Customerinfo");
            return Shared.JsonObject(url);
        }
    }
}