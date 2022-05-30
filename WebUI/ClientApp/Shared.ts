$(document).ready(function () {
    $(document).on('focus', ':input', function () {
        $(this).attr('autocomplete', 'off');
    });
    $(document.querySelectorAll('table:not([data-main])')).addClass('disableTable');
});

class APiSession {
    public static Session: APISessionRecord = new APISessionRecord();
}

class SearchGrid {
    public static SearchDataGrid: DataTable;
}

class JsDataTablePages {
    public static JsDataTable: DataTablePages;
}

class SharedWork {
    public static withCondition: boolean = false;

    public static Count : number;

    public static CurrentMode: ScreenModes; 

    public static SharedNavText: HTMLInputElement;

    public static UserFavorits: Array<FavModules> = new Array<FavModules>();

    public static set PageIndex(value: number) {
        localStorage.setItem("PageIndex", value.toString());
    }

    public static get PageIndex(): number {
        let value2: number = Number(localStorage.getItem("PageIndex"));
        return value2;
    }

    public static set ModelCount(value: number) {
    }

    public static get ModelCount(): number {
        if (localStorage.getItem("TableName") != null) {
            let _Table: string = localStorage.getItem("TableName");

            var result: number = 0;
            var sys: SystemTools = new SystemTools();
            $.ajax({
                type: "GET",
                url: sys.apiUrl("SystemTools", "GetModelCount"),
                data: { TableName: _Table },
                async: false,
                success: (res) => {
                    result = Number(res);
                }
            });

            return result;
        }
        return 0;
    }

    public static set ModelCount2(value: number) { }

    public static get ModelCount2(): number {
        if (localStorage.getItem("TableName") != null) {

            let _Table: string = localStorage.getItem("TableName");
            let _Cond: string = localStorage.getItem("Condition");

            var result: number = 0;
            var sys: SystemTools = new SystemTools();
            $.ajax({
                type: "GET",
                url: sys.apiUrl("SystemTools", "GetModelCount2"),
                data: { TableName: _Table, Condition: _Cond },
                async: false,
                success: (res) => {
                    result = Number(res);
                }
            });
            return result;
        }
        return 0;
    }

    public static OnNavigate: () => void = null;

    public static OnSwitchModes: () => void = null;

    public static SwitchLanguage: () => void;

    public static Render() {
        if (!this.withCondition) 
            $("#txtNavigator").text(this.PageIndex.toString() + ":" + this.ModelCount.toString());
        else 
            $("#txtNavigator").text(this.PageIndex.toString() + ":" + this.ModelCount2.toString());

        this.Count = SharedWork.withCondition ? this.ModelCount2 : this.ModelCount;
    }

    public static disabledTableOrNot(sta: boolean) {
        let mainTable = $(document.querySelector('[data-main].jsgrid')),
            subTable = $(document.querySelectorAll('table:not([data-main]).jsgrid')),
            allModeDisable = $(document.querySelector('[data-allModeDisable].jsgrid'));
        if (mainTable != null) {
            if (sta) {
                mainTable.not('[data-Sub].jsgrid').addClass('disableTable');
                subTable.removeClass('disableTable');
                allModeDisable.addClass('disableTable');
            }
            else {
                mainTable.removeClass('disableTable');
                //subTable.not('[data-Sub].jsgrid').addClass('disableTable');
                subTable.addClass('disableTable');
                allModeDisable.addClass('disableTable');
            }
        }
    }
    public static SwitchModes(mode: ScreenModes) {
        switch (mode) {
            case ScreenModes.Add:
                SharedButtons.btnAdd.disabled = true;
                SharedButtons.btnEdit.disabled = true;
                SharedButtons.btnDelete.disabled = true;
                SharedButtons.btnPreview.disabled = true;
                SharedButtons.btnPrint.disabled = true;
                SharedButtons.btnRefrash2.disabled = true;
                NavigateModule.btnNext.disabled = true;
                NavigateModule.btnPrev.disabled = true;
                NavigateModule.btnLast.disabled = true;
                NavigateModule.btnFirst.disabled = true;

                SharedButtons.btnsave.disabled = false;
                SharedButtons.btnUndo.disabled = false;

                this.disabledTableOrNot(true);
                $(".xaddable").attr("disabled", "disabled");
                $(".addable").removeAttr("disabled");

                $("[name=nav]").prop('disabled', true);
                $("[name=btnSearch]").prop('disabled', true);
                break;

            case ScreenModes.Edit:
                SharedButtons.btnAdd.disabled = true;
                SharedButtons.btnEdit.disabled = true;
                SharedButtons.btnDelete.disabled = true;
                SharedButtons.btnPreview.disabled = true;
                SharedButtons.btnPrint.disabled = true;
                SharedButtons.btnRefrash2.disabled = true;
                NavigateModule.btnNext.disabled = true;
                NavigateModule.btnPrev.disabled = true;
                NavigateModule.btnLast.disabled = true;
                NavigateModule.btnFirst.disabled = true;

                SharedButtons.btnsave.disabled = false;
                SharedButtons.btnUndo.disabled = false;

                this.disabledTableOrNot(true);
                $(".xeditable").attr("disabled", "disabled");
                $(".editable").removeAttr("disabled");
                $(".searchable").attr("disabled", "disabled");
                $("[name=nav]").prop('disabled', true);
                $("[name=btnSearch]").prop('disabled', true);
                break;

            case ScreenModes.Query:
                SharedButtons.btnsave.disabled = true;
                SharedButtons.btnUndo.disabled = true;

                SharedButtons.btnAdd.disabled = false;
                SharedButtons.btnEdit.disabled = false;
                SharedButtons.btnDelete.disabled = false;
                SharedButtons.btnPreview.disabled = false;
                SharedButtons.btnPrint.disabled = false;
                SharedButtons.btnRefrash2.disabled = false;
                NavigateModule.btnNext.disabled = false;
                NavigateModule.btnPrev.disabled = false;
                NavigateModule.btnLast.disabled = false;
                NavigateModule.btnFirst.disabled = false;

                this.disabledTableOrNot(false);
                $(".xaddable").removeAttr("disabled");
                $(".xeditable").removeAttr("disabled");
                $(".editable").attr("disabled", "disabled");
                $(".addable").attr("disabled", "disabled");
                $(".searchable").removeAttr("disabled");
                $("[name=nav]").prop('disabled', false);
                $("[name=btnSearch]").prop('disabled', false);
                break;
            case ScreenModes.NoData:
                SharedButtons.btnEdit.disabled = true;
                SharedButtons.btnDelete.disabled = true;
                SharedButtons.btnsave.disabled = true;
                SharedButtons.btnUndo.disabled = true;
                SharedButtons.btnPreview.disabled = true;
                SharedButtons.btnPrint.disabled = true;
                SharedButtons.btnRefrash2.disabled = true;

                SharedButtons.btnAdd.disabled = false;
                this.disabledTableOrNot(false);
                $(".xaddable").attr("disabled", "disabled");
                $(".xeditable").attr("disabled", "disabled");
                $(".editable").attr("disabled", "disabled");
                $(".addable").attr("disabled", "disabled");
                $(".searchable").attr("disabled", "disabled");
                $("[name=nav]").prop('disabled', true);
                $("[name=btnSearch]").prop('disabled', false);
                break;
            case ScreenModes.Start:
                SharedButtons.btnEdit.disabled = true;
                SharedButtons.btnDelete.disabled = true;
                SharedButtons.btnsave.disabled = true;
                SharedButtons.btnUndo.disabled = true;
                SharedButtons.btnPreview.disabled = true;
                SharedButtons.btnPrint.disabled = true;
                SharedButtons.btnRefrash2.disabled = true;

                SharedButtons.btnAdd.disabled = false;
                this.disabledTableOrNot(false);
                $(".xaddable").removeAttr("disabled");
                $(".xeditable").removeAttr("disabled");
                $(".editable").attr("disabled", "disabled");
                $(".addable").attr("disabled", "disabled");
                $(".searchable").removeAttr("disabled");
                $("[name=nav]").prop('disabled', false);
                $("[name=btnSearch]").prop('disabled', false);
                break;
        }

        SharedWork.CurrentMode = mode;
        if (SharedWork.OnSwitchModes != null)
            SharedWork.OnSwitchModes();

        SharedWork.Render();
    }
}


class UserPrivilege {
    public MODULE_CODE: string;   
    public Access?: boolean;
    public AddNew?: boolean;
    public EDIT: boolean;
    public VIEW: boolean;
    public Remove?: boolean;
    public PrintOut?: boolean;
    public CUSTOM1?: boolean;
    public CUSTOM2: boolean;
    public CUSTOM3?: boolean;
    public CUSTOM4?: boolean;
    public CUSTOM5?: boolean;
    public CUSTOM6?: boolean;
    public CUSTOM7?: boolean;
    public CUSTOM8?: boolean;
    public CUSTOM9?: boolean;
    public ViewImages: boolean;
    public EditImages: boolean;
    public AVAILABLE: boolean;
}

class SystemEnvironment {

    public I_Control: I_Control;
    public SystemCode: string;
    public SYSTEM_DESCE: string;
    public SYSTEM_DESCA: string;
    public SubSystemCode: string;
    public SUB_SYSTEM_DESCA: string;
    public SUB_SYSTEM_DESCE: string;
    public Language: string;
    public CurrentYear: string;
    public UserCode: string;
    public UserType: number;
    public SalesManID: number;
    public CashBoxID: number;
    public StoreID: number;
    public CompCode: string;
    public CompanyName: string;
    public CompanyNameAr: string;
    public BranchCode: string;
    public BranchName: string;
    public BranchNameEn: string;
    public SingleDatabase: boolean;
    public DatabaseColsed: boolean;
    public ScreenLanguage: string;
    public ModuleCode: string;
    public IsBiLingual?: any;
    public Token: string;
    public IsNotificaitonActive: boolean; 
    public IsDashboardActive: boolean;     
    public StartDate: string;     
    public EndDate: string;     
    public ActionLastDate: string;     
    public SysTimeOut: number;
    public NationalityID: number;
    public Currencyid: number;
    public InvoiceTypeCode: number;
    public InvoiceTransCode: number;
    public GL_VoucherCCDT_Type: number;
    public InvoiceWithoutCust: boolean;
    public IvoiceDateEditable: boolean;
    public InvoiceLineDiscount: boolean;
    public InvoiceLineAllowance: boolean;
    public InvoiceTotalAllowance: boolean;
    public InvoiceTotalCharge: boolean;
    public OperationPriceWithVAT: boolean;
    public SalesPriceWithVAT: boolean;
    public IsLocalBranchCustomer: boolean;
  
}

class sysInternal_Comm {
    public static Source: string;
    public static Destination: string;
    public static IdList: Array<number>;
    public static MsgID: number;
    public static ImgType: string;
    public static IsSiglePicture: boolean; // 
    public static PicOwnerID: number;   // Tr No image id 
    public static IsUploadPic: boolean;   // if true used can upload 
    public static IsdownloadPic: boolean;  // user can download 
    public static IsAutoSave: boolean;  // user can download 
    
    public static MsgReplyID: number;
    public static slected_MemberID: number = 0;
    public static period_ID: number = 0;
}

class SystemSession {
    public CurrentPrivileges: UserPrivilege = new UserPrivilege();
    public CurrentEnvironment: SystemEnvironment = new SystemEnvironment();
    public ModuleCode: string;
}

function getCookie(c_name): string {
    // 
    if (document.cookie.length > 0) {
        var c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            var c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) {
                c_end = document.cookie.length;
            }
            var data: string = document.cookie.substring(c_start, c_end);
            return data;
        }
    }
    return "";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function GetPrivileges(): UserPrivilege {
    // 
    if (document.cookie.length > 0) {
        let user: UserPrivilege = JSON.parse(getCookie("Inv1_Privilage")) as UserPrivilege;
        //user.MODULE_DESCA = "";
        //user.MODULE_DESCE = "";
        //var unmaskedData = JSON.parse(JSON.parse(getCookie("Privilage")));

        //var maskedData = JSON.stringify(unmaskedData, maskInfo);

        //function maskInfo(key, value) {
        //    var maskedValue = value;
        //    if (key == "MODULE_DESCA") {

        //        maskedValue = "";

        //        return maskedValue;
        //    }
        //}
        //alert(getCookie("Privilage"));
        //alert(getCookie("Privilage").length);
        //SysSession.CurrentPrivileges = user;
        return user;
    }
}

function GetSystemEnvironment(): SystemEnvironment {
    if (document.cookie.length > 0) {
        let sys: SystemEnvironment = JSON.parse(getCookie("Inv1_systemProperties")) as SystemEnvironment;
        sys.CompanyNameAr = "";
        sys.CompanyName = "";
        //alert(getCookie("Kids_systemProperties"));
        //alert(getCookie("Kids_systemProperties").length);
        // 
        //SysSession.CurrentEnvironment = sys
        return sys;
    }

}

//function GetI_Control(): I_Control {

//    if (document.cookie.length > 0) {
//        let sys: I_Control = JSON.parse(getCookie("kControl")) as I_Control;
//        //alert(getCookie("kControl"));
//        //alert(getCookie("kControl").length);
//        // 
//        SysSession.CurrentEnvironment.I_Control = sys
//        return sys;
//    }
//}

function GetSystemSession(): SystemSession {
    if (document.cookie.length > 0) {
        // 
        var SysSession = new SystemSession;
        SysSession.CurrentEnvironment = JSON.parse(readCookie("Inv1_systemProperties")) as SystemEnvironment;
        SysSession.CurrentPrivileges = JSON.parse(readCookie("Inv1_Privilage")) as UserPrivilege;
        //RS.CurrentMemberComm = JSON.parse(getCookie("Inv1_Comm")) as Kids_Comm;
        return SysSession;
    }
}

//function GetMemberComm(): Kids_Comm {
//    if (document.cookie.length > 0) {
//        // 
 //       let kids = JSON.parse(getCookie("Inv1_Comm")) as Kids_Comm;
//        //Kids_Comm = Kids
//        return Kids;
//    }
//}

class PropertiesPage {
    public static PageIndex: number;
    public static ModelCount: number;
    public static ScreenLanguage: string;

    public static OnNavigate: () => void = null;

    public static Render() {
        if (this.PageIndex < 1) {
            $("#ModelPreview").val("");
        }
        else {
            $("#ModelPreview").val("1");
        }
        $("#txtNav").val(this.PageIndex.toString() + "/" + this.ModelCount.toString());
    }
}

function GetCompanyName(compcode): G_COMPANY {
    // 
    var sys: SystemTools = new SystemTools();
    var compname: G_COMPANY = new G_COMPANY();
    Ajax.Callsync({
        url: sys.apiUrl("K_CompanyControl", "GetAllCompanyName"),
        data: { compcode: compcode },
        success: (d) => {
            var result = d as BaseResponse;
            if (result.IsSuccess) {

                compname = result.Response as G_COMPANY;

            }
        }
    })
    return compname;
}

function OpenReportsPopup(moduleCode: string) {
    let opt: JQueryAjaxSettings = {
        url: Url.Action(moduleCode, "GeneralReports"),
        success: (d) => {
            let result = d as string;
            $("#ReportPopupBody").html(result);
            $("#ReportsPopupDialog").modal("show");
            $('#ReportsPopupDialog').modal({
                refresh: true
            });

            var val = $("#rpTitle").text();
            $("#TitleSpanRep").html(val);
        }
    };
    Ajax.CallAsync(opt);
}

function GetMAxImgSize(CompCode: Number, BranchCode: Number): Number {
    let sys: SystemTools = new SystemTools();
    let Cont: Number = 0;
    Ajax.Callsync({
        type: "GET",
        url: sys.apiUrl("SystemTools", "GetMaxImagesize"),
        data: { comp: CompCode, bracode: BranchCode },
        success: (d) => {
            var result = d as BaseResponse;
            if (result.IsSuccess == true) {
                Cont = result.Response;
            }
        }
    })
    return Cont;
}