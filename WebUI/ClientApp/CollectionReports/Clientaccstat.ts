$(document).ready(() => {
    Clientaccstat.InitalizeComponent();
})

namespace Clientaccstat {
    var compcode: Number;
    var AccountType: Number = 1;
    var sys: SystemTools = new SystemTools();
    var SysSession: SystemSession = GetSystemSession();
    var lang = SysSession.CurrentEnvironment.ScreenLanguage;
    let Resource: any = GetResourceList("");

    $('#headertop1').addClass('display_none');
    $('#headertop2').addClass('display_none');
    $('#headerTitle').text(Resource.Clientstatment);

    //------------------------------------------------------------
    var Details_Type_D_Category: Array<MS_CustomerCategory> = new Array<MS_CustomerCategory>();

    var Customer: A_Rec_D_Customer = new A_Rec_D_Customer();

    //------------------------------------------------------------
    var txtfromCategory: HTMLSelectElement;
    var txttoCategory: HTMLSelectElement;

    var txt_ID_APP_Category: HTMLSelectElement;
    var txt_ID_APP_Type: HTMLSelectElement;
    var ddlCustomer: HTMLSelectElement;
    var txtDateFrom: HTMLInputElement;
    var txtDateTo: HTMLInputElement;
    var Rddetails: HTMLInputElement;
    var Rd_sum: HTMLInputElement;
    var btnReset;

    //-------------------------------------------------------------
    var indebtedness;

    //--- Print Buttons
    var btnPrint: HTMLButtonElement;
    var btnPrintTrview: HTMLButtonElement;
    var btnPrintTrPDF: HTMLButtonElement;
    var btnPrintTrEXEL: HTMLButtonElement;

    export function InitalizeComponent() {
        InitalizeControls();
        InitalizeEvents();
        compcode = Number(SysSession.CurrentEnvironment.CompCode);
        Display_CustomerCat();
    }

    function InitalizeControls() {
        txtfromCategory = document.getElementById("txtfromCategory") as HTMLSelectElement;
        txttoCategory = document.getElementById("txttoCategory") as HTMLSelectElement;

        txt_ID_APP_Category = document.getElementById("txt_ID_APP_Category") as HTMLSelectElement;
        txt_ID_APP_Type = document.getElementById("txt_ID_APP_Type") as HTMLSelectElement;
        ddlCustomer = document.getElementById("ddlCustomer") as HTMLSelectElement;
        txtDateFrom = document.getElementById("txtFromDate") as HTMLInputElement;
        txtDateTo = document.getElementById("txtToDate") as HTMLInputElement;
        Rddetails = document.getElementById("Rd_detail") as HTMLInputElement;
        Rd_sum = document.getElementById("Rd_sum") as HTMLInputElement;
        //Rddetails = document.querySelector("input[name=details]:checked");

        btnReset = document.getElementById("btnReset") as HTMLButtonElement;
        //---------------------------------------------------------------------- Print Buttons

        btnPrintTrview = document.getElementById("btnPrintTrview") as HTMLButtonElement;
        btnPrintTrPDF = document.getElementById("btnPrintTrPDF") as HTMLButtonElement;
        btnPrintTrEXEL = document.getElementById("btnPrintTrEXEL") as HTMLButtonElement;

    }

    function InitalizeEvents() {
        // Print Buttons
        btnPrintTrview.onclick = () => { PrintReport(1); }
        btnPrintTrPDF.onclick = () => { PrintReport(2); }
        btnPrintTrEXEL.onclick = () => { PrintReport(3); }
    }

    //----------------------------------------------------( Get cus_Cat )
    function Display_CustomerCat() {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("MS_CustomerCategory", "GetAll"),
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess) {
                    Details_Type_D_Category = result.Response as Array<MS_CustomerCategory>;
                    DisplayStGenDefCustomerCat();
                }
            }
        });
    }

    function DisplayStGenDefCustomerCat() {
        DocumentActions.FillCombowithdefult(Details_Type_D_Category, txtfromCategory, "CustomerCatId", (lang == "ar" ? "CatDescA" : ".CatDescE"), Resource.Nothing);
        DocumentActions.FillCombowithdefult(Details_Type_D_Category, txttoCategory, "CustomerCatId", (lang == "ar" ? "CatDescA" : ".CatDescE"), Resource.Nothing);
    }

    function PrintReport(OutType: number) {
        let rp: ReportParameters = new ReportParameters();

        rp.CompCode = SysSession.CurrentEnvironment.CompCode;
        rp.BranchCode = SysSession.CurrentEnvironment.BranchCode;
        rp.CompNameA = SysSession.CurrentEnvironment.CompanyNameAr;
        rp.CompNameE = SysSession.CurrentEnvironment.CompanyName;
        rp.UserCode = SysSession.CurrentEnvironment.UserCode;
        rp.Tokenid = SysSession.CurrentEnvironment.Token;
        let BranchNameA = SysSession.CurrentEnvironment.BranchName,
            BranchNameE = SysSession.CurrentEnvironment.BranchNameEn;
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
        rp.RepType = OutType;//output report as View

        rp.CustomerCode = $("#txtCustomerCODE").val();
        rp.CatCodeFrom = $('#txtfromCategory').val();
        rp.CatCodeTo = $('#txttoCategory').val();

        //  Rd_detail
        rp.check = 1;
        Ajax.Callsync({
            url: Url.Action("RptCustomerinfo", "GeneralReports"),
            data: rp,
            success: (d) => {
                let result = d.result as string;
                window.open(result, "_blank");
            }
        });
    }
}