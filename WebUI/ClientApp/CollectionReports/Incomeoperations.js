$(document).ready(function () {
    Incomeoperations.InitalizeComponent();
});
var Incomeoperations;
(function (Incomeoperations) {
    var compcode;
    var AccountType = 1;
    var sys = new SystemTools();
    var SysSession = GetSystemSession();
    //------------------------------------------------------------
    var SalesmanDetails = new Array();
    var Details = new Array();
    var Display_ItemFamily = new Array();
    var BilldItemFamily = new Array();
    var Display_Type = new Array();
    var Display_D_UOM = new Array();
    var BilldDetail = new Array();
    //------------------------------------------------------------
    var catId;
    var txtFromDate;
    var txtToDate;
    var indebtedness;
    var reptp1;
    //--- Print Buttons
    var btnPrint;
    var btnPrintTrview;
    var btnPrintTrPDF;
    var btnPrintTrEXEL;
    var drpitem_family;
    var btnReset;
    var Details_reptpEnable;
    var lang = (SysSession.CurrentEnvironment.ScreenLanguage);
    function InitalizeComponent() {
        compcode = Number(SysSession.CurrentEnvironment.CompCode);
        if (SysSession.CurrentEnvironment.ScreenLanguage == "ar") {
            document.getElementById('Screen_name').innerHTML = "ايراد العمليات";
        }
        else {
            document.getElementById('Screen_name').innerHTML = "Income Operation";
        }
        InitalizeControls();
        InitalizeEvents();
        Display_Salesman();
        Display_DrpPaymentType();
        Display_I_ItemFamily();
        reptp1.checked = true;
        txtFromDate.value = DateFormat(SysSession.CurrentEnvironment.StartDate);
        txtToDate.value = ConvertToDateDash(GetDate()) <= ConvertToDateDash(SysSession.CurrentEnvironment.EndDate) ? GetDate() : SysSession.CurrentEnvironment.EndDate;
    }
    Incomeoperations.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        reptp1 = document.getElementById("reptp1");
        txtFromDate = document.getElementById("txtFromDate");
        txtToDate = document.getElementById("txtToDate");
        drpitem_family = document.getElementById("drpitem_family");
        btnReset = document.getElementById("btnReset");
        btnPrint = document.getElementById("btnPrint");
        btnPrintTrview = document.getElementById("btnPrintTrview");
        btnPrintTrPDF = document.getElementById("btnPrintTrPDF");
        btnPrintTrEXEL = document.getElementById("btnPrintTrEXEL");
    }
    function InitalizeEvents() {
        // Print Buttons
        btnPrintTrview.onclick = function () { PrintReport(1); };
        btnPrintTrPDF.onclick = function () { PrintReport(2); };
        btnPrintTrEXEL.onclick = function () { PrintReport(3); };
        btnPrint.onclick = function () { PrintReport(4); };
        drpitem_family.onchange = itemDisplay;
        btnReset.onclick = btnReset_onclick;
    }
    //----------------------------------------------------( Get Item_Cat )
    function Display_DrpPaymentType() {
        //var StkDefCategory: Array<I_D_Category> = new Array<I_D_Category>();
        debugger;
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("StkDefCategory", "GetAll"),
            data: {
                CompCode: compcode, UserCode: SysSession.CurrentEnvironment.UserCode, Token: "HGFD-" + SysSession.CurrentEnvironment.Token
            },
            success: function (d) {
                var result = d;
                if (result.IsSuccess) {
                    Display_Type = result.Response;
                    DisplayStkDefCategory();
                }
            }
        });
    }
    function DisplayStkDefCategory() {
        debugger;
        for (var i = 0; i < Display_Type.length; i++) {
            $('#drpPaymentType').append('<option data-ItemID="' + Display_Type[i].DescA + '" value="' + Display_Type[i].CatID + '">' + (lang == "ar" ? Display_Type[i].DescA : Display_Type[i].DescL) + '</option>');
        }
    }
    //----------------------------------------------------( Get item_familly )
    function Display_I_ItemFamily() {
        //var StkDefCategory: Array<I_D_Category> = new Array<I_D_Category>();
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("StkDefItemType", "GetAll"),
            data: {
                CompCode: compcode, UserCode: SysSession.CurrentEnvironment.UserCode, Token: "HGFD-" + SysSession.CurrentEnvironment.Token
            },
            success: function (d) {
                var result = d;
                if (result.IsSuccess) {
                    Display_ItemFamily = result.Response;
                    DisplayStk_I_Item();
                }
            }
        });
    }
    function DisplayStk_I_Item() {
        debugger;
        $('#drpitem_family').append('<option value="' + 0 + '">  ' + (lang == "ar" ? "اختر النوع" : "choose type") + '  </option>');
        for (var i = 0; i < Display_ItemFamily.length; i++) {
            $('#drpitem_family').append('<option value="' + Display_ItemFamily[i].ItemFamilyID + '">' + (lang == "ar" ? Display_ItemFamily[i].DescA : Display_ItemFamily[i].DescL) + '</option>');
        }
    }
    //----------------------------------------------------( Get Item_Desc )
    function itemDisplay() {
        //
        debugger;
        var storeCode = 1;
        var ItemFamilyID = Number($("#drpitem_family").val());
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("StkDefItemType", "GetItemByFamilyIdOrdered"),
            data: {
                familyid: ItemFamilyID, storeid: storeCode, UserCode: SysSession.CurrentEnvironment.UserCode, Token: "HGFD-" + SysSession.CurrentEnvironment.Token
            },
            success: function (d) {
                var result = d;
                if (result.IsSuccess) {
                    debugger;
                    Details = result.Response;
                    Display_Item();
                }
            }
        });
    }
    function Display_Item() {
        debugger;
        $('#txt_ID_APP_Type').html('');
        $('#txt_ID_APP_Type').removeAttr("disabled");
        $('#txt_ID_APP_Type').append('<option value="' + 0 + '"> ' + (lang == "ar" ? " اختر الصنف" : "choose item") + '</option>');
        for (var i = 0; i < Details.length; i++) {
            $('#txt_ID_APP_Type').append('<option value="' + Details[i].ItemID + '">' + (lang == "ar" ? Details[i].Itm_DescA : Details[i].Itm_DescE) + '</option>');
        }
    }
    function GetSystemSession() {
        if (document.cookie.length > 0) {
            // 
            var SysSession = new SystemSession;
            SysSession.CurrentEnvironment = JSON.parse(readCookie("Inv1_systemProperties"));
            SysSession.CurrentPrivileges = JSON.parse(readCookie("Inv1_Privilage"));
            //RS.CurrentMemberComm = JSON.parse(getCookie("Inv1_Comm")) as Kids_Comm;
            return SysSession;
        }
    }
    function GetDate() {
        var today = new Date();
        var dd = today.getDate().toString();
        var ReturnedDate;
        var mm = (today.getMonth() + 1).toString();
        var yyyy = today.getFullYear();
        if (Number(dd) < 10) {
            dd = ('0' + dd);
        }
        if (Number(mm) < 10) {
            mm = ('0' + mm);
        }
        ReturnedDate = yyyy + '-' + mm + '-' + dd;
        return ReturnedDate;
    }
    //----------------------------------------------------( Get sales_man )
    function Display_Salesman() {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("AccDefSalesMen", "GetAllSalesPeople"),
            data: {
                CompCode: compcode, IsSalesEnable: true, UserCode: SysSession.CurrentEnvironment.UserCode, Token: "HGFD-" + SysSession.CurrentEnvironment.Token
            },
            success: function (d) {
                var result = d;
                if (result.IsSuccess) {
                    //debugger;
                    SalesmanDetails = result.Response;
                    SalesmanDetails = SalesmanDetails.filter(function (s) { return s.Isactive == true; });
                    DisplaySalesman();
                }
            }
        });
    }
    function DisplaySalesman() {
        for (var i = 0; i < SalesmanDetails.length; i++) {
            $('#ddlSalesman').append('<option value="' + SalesmanDetails[i].SalesmanId + '">' + (lang == "ar" ? SalesmanDetails[i].NameA : SalesmanDetails[i].NameE) + '</option>');
        }
    }
    function btnReset_onclick() {
        debugger;
        txtFromDate.value = DateFormat(SysSession.CurrentEnvironment.StartDate);
        txtToDate.value = ConvertToDateDash(GetDate()) <= ConvertToDateDash(SysSession.CurrentEnvironment.EndDate) ? GetDate() : SysSession.CurrentEnvironment.EndDate;
        compcode = Number(SysSession.CurrentEnvironment.CompCode);
        discharge();
    }
    function discharge() {
        $('#drpPaymentType option[value=Null]').prop('selected', 'selected').change();
        $('#drpitem_family option[value=0]').prop('selected', 'selected').change();
        $('#txt_ID_status option[value=1]').prop('selected', 'selected').change();
        $('#txt_ID_APP_Type').html('');
        $('#txt_ID_APP_Type').append('<option value="' + 0 + '"> ' + (lang == "ar" ? "اختر الصنف" : "choose item") + '</option>');
        $('#txt_ID_APP_Type').attr("disabled", "disabled");
    }
    //----------------------------------------------------( Report )
    function PrintReport(OutType) {
        debugger;
        Details_reptpEnable = document.querySelector("input[name=reptp]:checked");
        var rp = new ReportParameters();
        rp.CompCode = SysSession.CurrentEnvironment.CompCode;
        rp.BranchCode = SysSession.CurrentEnvironment.BranchCode;
        rp.CompNameA = SysSession.CurrentEnvironment.CompanyNameAr;
        rp.CompNameE = SysSession.CurrentEnvironment.CompanyName;
        rp.UserCode = SysSession.CurrentEnvironment.UserCode;
        rp.Tokenid = SysSession.CurrentEnvironment.Token;
        rp.BraNameA = SysSession.CurrentEnvironment.BranchName;
        rp.BraNameE = SysSession.CurrentEnvironment.BranchNameEn;
        rp.ScreenLanguage = SysSession.CurrentEnvironment.ScreenLanguage;
        rp.SystemCode = SysSession.CurrentEnvironment.SystemCode;
        rp.SubSystemCode = SysSession.CurrentEnvironment.SubSystemCode;
        if (rp.BraNameA == null || rp.BraNameE == null) {
            rp.BraNameA = " ";
            rp.BraNameE = " ";
        }
        rp.LoginUser = SysSession.CurrentEnvironment.UserCode;
        rp.RepType = OutType; //output report as View
        rp.FromDate = DateFormatRep(txtFromDate.value);
        rp.ToDate = DateFormatRep(txtToDate.value);
        if ($("#drpPaymentType").val() == "Null") { //-------------جميع الفئات
            rp.CatId = -1;
        }
        else {
            rp.CatId = Number($("#drpPaymentType").val());
        }
        if ($("#drpitem_family").val() == 0) { //-------------جميع الانواع
            rp.ItemFamId = -1;
            rp.ItemID = -1;
        }
        else {
            rp.ItemFamId = Number($("#drpitem_family").val());
            rp.ItemID = Number($("#txt_ID_APP_Type").val());
        }
        var check = Number(Details_reptpEnable.value);
        if (check == 1) {
            rp.check = 3;
        }
        else if (check == 2) {
            rp.check = 2;
        }
        else {
            rp.check = 1;
        }
        rp.Status = Number($("#txt_status").val());
        Ajax.Callsync({
            url: Url.Action("IProc_Rpt_ItemStockIncome", "GeneralReports"),
            data: rp,
            success: function (d) {
                var result = d.result;
                window.open(result, "_blank");
            }
        });
    }
})(Incomeoperations || (Incomeoperations = {}));
//# sourceMappingURL=Incomeoperations.js.map