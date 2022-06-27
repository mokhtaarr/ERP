using Inv.WebUI.Filter;
using System.Web.Mvc;

namespace Inv.WebUI.Controllers
{

    [AuthorizeUserAttribute()]
    public class HomeController : Controller
    {
        //    GET: Home
        public ActionResult HomeIndex()
        {

            return View("HomeIndex");
        }
        public ActionResult Admin()
        {
            return View();
        }
        public ActionResult AdminHome()
        {
            return View();
        }
        public JsonResult AdminHome_()
        {

            var obj = new
            {
                url = Url.Action("AdminHome", "Home")

            };
            var result = Shared.JsonObject(obj);
            return result;
        }
        public ActionResult HomeIndexPackage()
        {


            return View("HomeIndex");
        }


        public ActionResult Logout()
        {

           
            return RedirectToAction("Loginindex", "Login");
        }
        public ViewResult Help()
        {

            return View();
        }
        public ActionResult OpenView(string ModuleCode)
        {


            if (ModuleCode == "ImagPopUp")
            {
                return PartialView("~/Views/Shared/ImagePopup.cshtml");

            }
            if (ModuleCode == "Messages_screen")
            {
                return PartialView("~/Views/Shared/Messages_screen.cshtml");
            }
            if (ModuleCode == "ImagePopupiupload")
            {
                return PartialView("~/Views/Shared/ImagePopupiupload.cshtml");
            }

            return PartialView("");

        }

        #region Open Pages 
        public ActionResult SearchIndex()
        {
            return View("~/Views/Search/SearchIndex.cshtml");
        }

        #region Account
        ///////////////////////////// Start Account ////////////////////////////
        public ActionResult AccIndex()
        {
            return View("~/Views/Acc/AccIndex.cshtml");
        }
        public ActionResult Cod_AccountCategorieIndex()
        {
            return View("~/Views/Acc/Cod_AccountCategorieIndex.cshtml");
        }
        public ActionResult Cod_AccountClassificationIndex()
        {
            return View("~/Views/Acc/Cod_AccountClassificationIndex.cshtml");
        }
        public ActionResult CurrencyCategoryIndex()
        {
            return View("~/Views/Acc/CurrencyCategory.cshtml");
        }
        public ActionResult Cal_CostCentersIndex()
        {
            return View("~/Views/Acc/CostCentersIndex.cshtml");
        }
        public ActionResult MS_CurrencyIndex()
        {
            return View("~/Views/Acc/MS_CurrencyIndex.cshtml");
        }
        public ActionResult Cal_JurnalEntryIndex()
        {
            return View("~/Views/Acc/Cal_JurnalEntry.cshtml");
        }
        public ActionResult Ms_TermsIndex()
        {
            return View("~/Views/Acc/Ms_Terms.cshtml");
        }
        public ActionResult MS_BoxBankIndex()
        {
            return View("~/Views/Acc/MS_BoxBank.cshtml");
        }
        public ActionResult MS_TaxesIndex()
        {
            return View("~/Views/Acc/MS_Taxes.cshtml");
        }
        public ActionResult MS_ExpensesIndex()
        {
            return View("~/Views/Acc/MS_Expenses.cshtml");
        }
        public ActionResult Sys_BooksIndex()
        {
            return View("~/Views/Acc/Sys_Books.cshtml");
        }
        public ActionResult Sys_FinancialYearsIndex()
        {
            return View("~/Views/Acc/Sys_FinancialYears.cshtml");
        }
        public ActionResult Ms_ReceiptNoteIndex()
        {
            return View("~/Views/Acc/Ms_ReceiptNote.cshtml");
        }
        public ActionResult MS_PaymentNoteIndex()
        {
            return View("~/Views/Acc/MS_PaymentNoteIndex.cshtml");
        }
        ///////////////////////////// End Account ////////////////////////////
        #endregion

        #region Sataic Page 
        /// //////////////////////////////////////////// Sataic Page ////////////////////////
        public ActionResult SataicFtaratMaliaIndex()
        {
            return View("~/Views/Acc/FtaratMalia.cshtml");
        }
       
        public ActionResult SataticMostanadKabdYomiaIndex()
        {
            return View("~/Views/Acc/MostanadKabdYomia.cshtml");
        }

        public ActionResult StaticMostanad3ohdaIndex()
        {
            return View("~/Views/Acc/Mostanad3ohda.cshtml");
        }

        public ActionResult AnswerIndex()
        {
            return View("~/Views/static/Answer.cshtml");
        }

        public ActionResult EngineNumbersIndex()
        {
            return View("~/Views/static/EngineNumbers.cshtml");
        }

        public ActionResult AnswerTaxesIndex()
        {
            return View("~/Views/static/AnswerTaxes.cshtml");
        }

        public ActionResult PeriodicalBookIndex()
        {
            return View("~/Views/static/PeriodicalBook.cshtml");
        }

        public ActionResult TaxFormsIndex()
        {
            return View("~/Views/static/TaxForms.cshtml");
        }

        ///////////////////////////// End Account ////////////////////////////
        #endregion

        #region Defination 
        ///////////////////////////// Start Defination ////////////////////////////
        public ActionResult ItemsIndex()
        {
            return View("~/Views/Definitions/Items.cshtml");
        }
        public ActionResult Ms_CustomerTypesIndex()
        {
            return View("~/Views/Definitions/Ms_CustomerTypesIndex.cshtml");
        }
        public ActionResult Hr_JobsIndex()
        {
            return View("~/Views/Definitions/Hr_JobsIndex.cshtml");
        }
        public ActionResult MS_CustomerCategoryIndex()
        {
            return View("~/Views/Definitions/MS_CustomerCategoryIndex.cshtml");
        }
        public ActionResult Ms_VendorTypesIndex()
        {
            return View("~/Views/Definitions/Ms_VendorTypesIndex.cshtml");
        }
        public ActionResult MS_ItemCategoryIndex()
        {
            return View("~/Views/Definitions/MS_ItemCategoryIndex.cshtml");
        }
        public ActionResult MS_CustomerIndex()
        {
            return View("~/Views/Definitions/MS_CustomerIndex.cshtml");
        }
        public ActionResult MS_VendorIndex()
        {
            return View("~/Views/Definitions/MS_VendorIndex.cshtml");
        }
        public ActionResult Hr_EmployeesIndex()
        {
            return View("~/Views/Definitions/Hr_EmployeesIndex.cshtml");
        }
        public ActionResult Hr_DepartmentsIndex()
        {
            return View("~/Views/Definitions/Hr_DepartmentsIndex.cshtml");
        }
        public ActionResult MSGA_CityIndex()
        {
            return View("~/Views/Definitions/MSGA_CityIndex.cshtml");
        }
        public ActionResult Sr_VehicleTypesIndex()
        {
            return View("~/Views/Definitions/Sr_VehicleTypesIndex.cshtml");

        }
        public ActionResult Sr_VehicleShapesIndex()
        {
            return View("~/Views/Definitions/Sr_VehicleShapesIndex.cshtml");

        }
        public ActionResult Prod_EquipmentsIndex()
        {
            return View("~/Views/Definitions/Prod_EquipmentsIndex.cshtml");

        }
        ///////////////////////////// End Defination ////////////////////////////
        #endregion

        #region Fixed Assets
        public ActionResult Asset_AssetCardIndex()
        {
            return View("~/Views/FixedAssets/Asset_AssetCard.cshtml");
        }

        public ActionResult Asset_AssetCategoryIndex()
        {
            return View("~/Views/FixedAssets/Asset_AssetCategory.cshtml");
        }
        #endregion

        #region Fixed Assets
        public ActionResult SettingsIndex()
        {
            return View("~/Views/ProgrammingTools/MS_Settings.cshtml");
        }
        #endregion

        public ActionResult USERSIndex()
        {
            return View("~/Views/Tools/USERS/USERSIndex.cshtml");
        }
        
        public ActionResult AdminBarIndex()
        {
            return View("~/Views/AdminSetting/AdminBarIndex.cshtml");
        }
        
        public ActionResult ClientaccstatIndex()
        {
            return View("~/Views/CollectionReports/ClientaccstatIndex.cshtml");
        }

        public ActionResult AdminCompIndex()
        {
            return View("~/Views/AdminSetting/AdminCompIndex.cshtml");
        }
        
        public ActionResult DefBranchesIndex()
        {
            return View("~/Views/Definitions/DefBranches.cshtml");
        }

        ///////////////////////////// Start Reporting ////////////////////////////
        public ActionResult CustomerReportIndex()
        {
            return View("~/Views/CollectionReports/CustomerReport.cshtml");
        }
        ///////////////////////////// End Reporting ////////////////////////////
        #endregion  Open Pages 

    }
}