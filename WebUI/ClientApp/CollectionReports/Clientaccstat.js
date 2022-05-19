$(document).ready(function () {
    Clientaccstat.InitalizeComponent();
    $('#headertop1').addClass('display_none');
    $('#headertop2').removeClass('display_none');
});
var Clientaccstat;
(function (Clientaccstat) {
    var compcode;
    var AccountType = 1;
    var sys = new SystemTools();
    var SysSession = GetSystemSession();
    //------------------------------------------------------------
    var Details_Type_D_Category = new Array();
    var Customer = new A_Rec_D_Customer();
    //------------------------------------------------------------
    var txt_ID_APP_Category;
    var txt_ID_APP_Type;
    var ddlCustomer;
    var txtDateFrom;
    var txtDateTo;
    var Rddetails;
    var Rd_sum;
    var btnReset;
    //-------------------------------------------------------------
    var indebtedness;
    //--- Print Buttons
    var btnPrint;
    var btnPrintTrview;
    var btnPrintTrPDF;
    var btnPrintTrEXEL;
    var lang = (SysSession.CurrentEnvironment.ScreenLanguage);
    function InitalizeComponent() {
        if (SysSession.CurrentEnvironment.ScreenLanguage == "ar") {
            document.getElementById('Screen_name').innerHTML = "كشف حساب العملاء";
        }
        else {
            document.getElementById('Screen_name').innerHTML == "Client Account Statment";
        }
        InitalizeControls();
        InitalizeEvents();
        compcode = Number(SysSession.CurrentEnvironment.CompCode);
        Display_CustomerCat();
    }
    Clientaccstat.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        txt_ID_APP_Category = document.getElementById("txt_ID_APP_Category");
        txt_ID_APP_Type = document.getElementById("txt_ID_APP_Type");
        ddlCustomer = document.getElementById("ddlCustomer");
        txtDateFrom = document.getElementById("txtFromDate");
        txtDateTo = document.getElementById("txtToDate");
        Rddetails = document.getElementById("Rd_detail");
        Rd_sum = document.getElementById("Rd_sum");
        //Rddetails = document.querySelector("input[name=details]:checked");
        btnReset = document.getElementById("btnReset");
        //---------------------------------------------------------------------- Print Buttons
        btnPrintTrview = document.getElementById("btnPrintTrview");
        btnPrintTrPDF = document.getElementById("btnPrintTrPDF");
        btnPrintTrEXEL = document.getElementById("btnPrintTrEXEL");
    }
    function InitalizeEvents() {
        // Print Buttons
        btnPrintTrview.onclick = function () { PrintReport(1); };
        btnPrintTrPDF.onclick = function () { PrintReport(2); };
        btnPrintTrEXEL.onclick = function () { PrintReport(3); };
    }
    //----------------------------------------------------( Get cus_Cat )
    function Display_CustomerCat() {
        //var StkDefCategory: Array<I_D_Category> = new Array<I_D_Category>();
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("MS_CustomerCategory", "GetAll"),
            success: function (d) {
                //
                var result = d;
                if (result.IsSuccess) {
                    Details_Type_D_Category = result.Response;
                    DisplayStGenDefCustomerCat();
                }
            }
        });
    }
    function DisplayStGenDefCustomerCat() {
        for (var i = 0; i < Details_Type_D_Category.length; i++) {
            $('#txtfromCategory').append('<option value="' + Details_Type_D_Category[i].CustomerCatId + '">' + (lang == "ar" ? Details_Type_D_Category[i].CatDescA : Details_Type_D_Category[i].CatDescE) + '</option>');
            $('#txttoCategory').append('<option value="' + Details_Type_D_Category[i].CustomerCatId + '">' + (lang == "ar" ? Details_Type_D_Category[i].CatDescA : Details_Type_D_Category[i].CatDescE) + '</option>');
        }
    }
    function PrintReport(OutType) {
        var rp = new ReportParameters();
        rp.CompCode = SysSession.CurrentEnvironment.CompCode;
        rp.BranchCode = SysSession.CurrentEnvironment.BranchCode;
        rp.CompNameA = SysSession.CurrentEnvironment.CompanyNameAr;
        rp.CompNameE = SysSession.CurrentEnvironment.CompanyName;
        rp.UserCode = SysSession.CurrentEnvironment.UserCode;
        rp.Tokenid = SysSession.CurrentEnvironment.Token;
        var BranchNameA = SysSession.CurrentEnvironment.BranchName;
        var BranchNameE = SysSession.CurrentEnvironment.BranchNameEn;
        rp.ScreenLanguage = SysSession.CurrentEnvironment.ScreenLanguage;
        rp.SystemCode = SysSession.CurrentEnvironment.SystemCode;
        rp.SubSystemCode = SysSession.CurrentEnvironment.SubSystemCode;
        if (BranchNameA == null || BranchNameE == null) {
            BranchNameA = " ";
            BranchNameE = " ";
        }
        rp.BraNameA = BranchNameA;
        rp.BraNameE = BranchNameE;
        rp.LoginUser = SysSession.CurrentEnvironment.UserCode;
        rp.RepType = OutType; //output report as View
        rp.CustomerCode = $("#txtCustomerCODE").val();
        rp.CatCodeFrom = $('#txtfromCategory').val();
        rp.CatCodeTo = $('#txttoCategory').val();
        //  Rd_detail
        rp.check = 1;
        Ajax.Callsync({
            url: Url.Action("RptCustomerinfo", "GeneralReports"),
            data: rp,
            success: function (d) {
                var result = d.result;
                window.open(result, "_blank");
            }
        });
    }
})(Clientaccstat || (Clientaccstat = {}));
//# sourceMappingURL=Clientaccstat.js.map