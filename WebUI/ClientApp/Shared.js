$(document).ready(function () {
    $(document).on('focus', ':input', function () {
        $(this).attr('autocomplete', 'off');
    });
    $(document.querySelectorAll('table:not([data-main])')).addClass('disableTable');
});
var APiSession = /** @class */ (function () {
    function APiSession() {
    }
    APiSession.Session = new APISessionRecord();
    return APiSession;
}());
var SearchGrid = /** @class */ (function () {
    function SearchGrid() {
    }
    return SearchGrid;
}());
var JsDataTablePages = /** @class */ (function () {
    function JsDataTablePages() {
    }
    return JsDataTablePages;
}());
var SharedWork = /** @class */ (function () {
    function SharedWork() {
    }
    Object.defineProperty(SharedWork, "PageIndex", {
        get: function () {
            var value2 = Number(localStorage.getItem("PageIndex"));
            return value2;
        },
        set: function (value) {
            localStorage.setItem("PageIndex", value.toString());
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SharedWork, "ModelCount", {
        get: function () {
            if (localStorage.getItem("TableName") != null) {
                var _Table = localStorage.getItem("TableName");
                var result = 0;
                var sys = new SystemTools();
                $.ajax({
                    type: "GET",
                    url: sys.apiUrl("SystemTools", "GetModelCount"),
                    data: { TableName: _Table },
                    async: false,
                    success: function (res) {
                        result = Number(res);
                    }
                });
                return result;
            }
            return 0;
        },
        set: function (value) {
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SharedWork, "ModelCount2", {
        get: function () {
            if (localStorage.getItem("TableName") != null) {
                var _Table = localStorage.getItem("TableName");
                var _Cond = localStorage.getItem("Condition");
                var result = 0;
                var sys = new SystemTools();
                $.ajax({
                    type: "GET",
                    url: sys.apiUrl("SystemTools", "GetModelCount2"),
                    data: { TableName: _Table, Condition: _Cond },
                    async: false,
                    success: function (res) {
                        result = Number(res);
                    }
                });
                return result;
            }
            return 0;
        },
        set: function (value) { },
        enumerable: false,
        configurable: true
    });
    SharedWork.Render = function () {
        if (!this.withCondition)
            $("#txtNavigator").text(this.PageIndex.toString() + ":" + this.ModelCount.toString());
        else
            $("#txtNavigator").text(this.PageIndex.toString() + ":" + this.ModelCount2.toString());
        this.Count = SharedWork.withCondition ? this.ModelCount2 : this.ModelCount;
    };
    SharedWork.disabledTableOrNot = function (sta) {
        var mainTable = $(document.querySelector('[data-main].jsgrid')), subTable = $(document.querySelectorAll('table:not([data-main]).jsgrid')), allModeDisable = $(document.querySelector('[data-allModeDisable].jsgrid'));
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
    };
    SharedWork.SwitchModes = function (mode) {
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
    };
    SharedWork.withCondition = false;
    SharedWork.UserFavorits = new Array();
    SharedWork.OnNavigate = null;
    SharedWork.OnSwitchModes = null;
    return SharedWork;
}());
var UserPrivilege = /** @class */ (function () {
    function UserPrivilege() {
    }
    return UserPrivilege;
}());
var SystemEnvironment = /** @class */ (function () {
    function SystemEnvironment() {
    }
    return SystemEnvironment;
}());
var sysInternal_Comm = /** @class */ (function () {
    function sysInternal_Comm() {
    }
    sysInternal_Comm.slected_MemberID = 0;
    sysInternal_Comm.period_ID = 0;
    return sysInternal_Comm;
}());
var SystemSession = /** @class */ (function () {
    function SystemSession() {
        this.CurrentPrivileges = new UserPrivilege();
        this.CurrentEnvironment = new SystemEnvironment();
    }
    return SystemSession;
}());
function getCookie(c_name) {
    // 
    if (document.cookie.length > 0) {
        var c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            var c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) {
                c_end = document.cookie.length;
            }
            var data = document.cookie.substring(c_start, c_end);
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
        while (c.charAt(0) == ' ')
            c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0)
            return c.substring(nameEQ.length, c.length);
    }
    return null;
}
function GetPrivileges() {
    // 
    if (document.cookie.length > 0) {
        var user = JSON.parse(getCookie("Inv1_Privilage"));
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
function GetSystemEnvironment() {
    if (document.cookie.length > 0) {
        var sys = JSON.parse(getCookie("Inv1_systemProperties"));
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
//function GetMemberComm(): Kids_Comm {
//    if (document.cookie.length > 0) {
//        // 
//       let kids = JSON.parse(getCookie("Inv1_Comm")) as Kids_Comm;
//        //Kids_Comm = Kids
//        return Kids;
//    }
//}
var PropertiesPage = /** @class */ (function () {
    function PropertiesPage() {
    }
    PropertiesPage.Render = function () {
        if (this.PageIndex < 1) {
            $("#ModelPreview").val("");
        }
        else {
            $("#ModelPreview").val("1");
        }
        $("#txtNav").val(this.PageIndex.toString() + "/" + this.ModelCount.toString());
    };
    PropertiesPage.OnNavigate = null;
    return PropertiesPage;
}());
function GetCompanyName(compcode) {
    // 
    var sys = new SystemTools();
    var compname = new G_COMPANY();
    Ajax.Callsync({
        url: sys.apiUrl("K_CompanyControl", "GetAllCompanyName"),
        data: { compcode: compcode },
        success: function (d) {
            var result = d;
            if (result.IsSuccess) {
                compname = result.Response;
            }
        }
    });
    return compname;
}
function OpenReportsPopup(moduleCode) {
    var opt = {
        url: Url.Action(moduleCode, "GeneralReports"),
        success: function (d) {
            var result = d;
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
function GetMAxImgSize(CompCode, BranchCode) {
    var sys = new SystemTools();
    var Cont = 0;
    Ajax.Callsync({
        type: "GET",
        url: sys.apiUrl("SystemTools", "GetMaxImagesize"),
        data: { comp: CompCode, bracode: BranchCode },
        success: function (d) {
            var result = d;
            if (result.IsSuccess == true) {
                Cont = result.Response;
            }
        }
    });
    return Cont;
}
//# sourceMappingURL=Shared.js.map