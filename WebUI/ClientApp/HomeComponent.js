$(document).ready(function () {
    HomeComponent.InitalizeComponent();
});
var HomeComponent;
(function (HomeComponent) {
    //let res: any = GetResourceList("");
    var sys = new SystemTools();
    var btnDashboard;
    var btn_loguotuser;
    var SysSession = GetSystemSession();
    var systemEnv = SysSession.CurrentEnvironment;
    function OpenPage(moduleCode) {
        SysSession.CurrentEnvironment.ModuleCode = moduleCode;
        var compCode = SysSession.CurrentEnvironment.CompCode;
        var Modulecode = SysSession.CurrentEnvironment.ModuleCode;
        var branchCode = SysSession.CurrentEnvironment.BranchCode;
        var UserCode = SysSession.CurrentEnvironment.UserCode;
        var SystemCode = SysSession.CurrentEnvironment.SystemCode;
        var SubSystemCode = SysSession.CurrentEnvironment.SubSystemCode;
        var CurrentYear = SysSession.CurrentEnvironment.CurrentYear;
        Ajax.Callsync({
            type: "GET",
            url: sys.apiUrl("SystemTools", "GetUserPrivilage"),
            data: { year: Number(CurrentYear), compCode: compCode, branchCode: branchCode, UserCode: UserCode, SystemCode: SystemCode, Modulecode: Modulecode },
            success: function (d) {
                if (d == undefined) {
                    window.open(Url.Action("LoginIndex", "Login"), "_self");
                    return;
                }
                else {
                    var result = JSON.parse(d);
                    if (result == null) {
                        MessageBox.Show("Access denied", moduleCode);
                        return;
                    }
                    if (result.Access == true) {
                        SysSession.CurrentPrivileges = result;
                        document.cookie = "Inv1_Privilage=" + JSON.stringify(result).toString() + ";expires=Fri, 31 Dec 2030 23:59:59 GMT;path=/";
                        window.open(Url.Action(moduleCode + "Index", "Home"), "_self");
                    }
                    else {
                        MessageBox.Show("No Inv1_Privilage", moduleCode);
                    }
                }
            }
        });
    }
    HomeComponent.OpenPage = OpenPage;
    function OpenReportsPopup(moduleCode) {
        SysSession.CurrentEnvironment.ModuleCode = moduleCode;
        var compCode = SysSession.CurrentEnvironment.CompCode;
        var branchCode = SysSession.CurrentEnvironment.BranchCode;
        var UserCode = SysSession.CurrentEnvironment.UserCode;
        var SystemCode = SysSession.CurrentEnvironment.SystemCode;
        var SubSystemCode = SysSession.CurrentEnvironment.SubSystemCode;
        var Modulecode = SysSession.CurrentEnvironment.ModuleCode;
        Ajax.CallAsync({
            url: sys.apiUrl("SystemTools", "GetUserPrivilage"),
            data: { compCode: compCode, branchCode: branchCode, UserCode: UserCode, SystemCode: SystemCode, SubSystemCode: SubSystemCode, Modulecode: Modulecode },
            success: function (d) {
                if (d == undefined) {
                    window.open(Url.Action("LoginIndex", "Login"), "_self");
                    return;
                }
                else {
                    var result = JSON.parse(d);
                    if (result == null) {
                        MessageBox.Show("Access denied", "GeneralReports");
                        return;
                    }
                    if (result.Access == true) {
                        var opt = {
                            url: Url.Action(moduleCode, "GeneralReports"),
                            success: function (d) {
                                var result = d;
                                $("#PopupDialog").modal("show");
                                $("#PopupBody").html(result);
                                $('#PopupDialog').modal({
                                    refresh: true
                                });
                                var val = $("#rpTitle").text();
                                $("#TitleSpan").html(val);
                            }
                        };
                        Ajax.CallAsync(opt);
                    }
                    else {
                        MessageBox.Show("Access denied", "GeneralReports");
                    }
                }
            }
        });
    }
    HomeComponent.OpenReportsPopup = OpenReportsPopup;
    function InitalizeComponent() {
        $('#sidebarCollapse').on('click', function () {
            $(".left-sidebar-pro").css({ 'display': 'block' });
        });
        $('#sidebarCollapse2').on('click', function () {
            $(".left-sidebar-pro").toggle("slide");
            $("#cont").addClass("colapsdivcont");
            $("#i_toolpar").removeAttr('hidden');
            $("#i_toolpar").addClass('i_toolpar');
        });
        $('#i_toolpar').on('click', function () {
            $(".left-sidebar-pro").css({ 'display': 'none' });
            $("#cont").addClass("colapsdivcont");
            $("#i_toolpar").attr('hidden');
            $("#i_toolpar").removeClass('i_toolpar');
        });
        Language();
        if (SysSession.CurrentEnvironment.ScreenLanguage == "ar") {
            document.getElementById('camp_name').innerHTML = SysSession.CurrentEnvironment.CompanyNameAr;
        }
        else {
            document.getElementById('camp_name').innerHTML = SysSession.CurrentEnvironment.CompanyName;
        }
        ApplyModules();
        ApplyCompanyPrivilages();
        $("#btnHelpRep").click(function () { ScreenHelp(); });
        InitializePages();
        $("#DashButton").css('pointer-events', 'auto');
        document.getElementById('Admin_name').innerHTML = SysSession.CurrentEnvironment.UserCode;
        if (SysSession.CurrentEnvironment.ScreenLanguage == 'ar') {
            $('#homeTitle').text("نظام سيف لادارة الاملاك");
        }
        else {
            $('#homeTitle').text("Safe Proprity Managment");
            $("#main-menu").removeClass("sm-rtl");
        }
        if (SysSession.CurrentEnvironment.ScreenLanguage == 'ar') {
            $('#LanguageButtonHome').text("Change Language");
        }
        else {
            $('#LanguageButtonHome').text(" تغير اللغة  ");
        }
        btn_loguotuser = DocumentActions.GetElementById("btn_loguotuser");
        btn_loguotuser.onclick = LogoutUserApi;
        //CheckTime(); 
        $("#LanguageButtonHome").click(function () {
            if (SysSession.CurrentEnvironment.ScreenLanguage == "ar") { // English Mode  
                //RemoveStyleSheet("bootstrap-rtl");
                //RemoveStyleSheet("mainAR");
                //RemoveStyleSheet("Style_Arabic");
                //RemoveStyleSheet("style");
                //RemoveStyleSheet("StyleNewmassege");
                //RemoveStyleSheet("responsive_AR");
                //AppendStyleSheet("bootstrap.min");
                //AppendStyleSheet("main");
                //AppendStyleSheet("responsive");
                //AppendStyleSheet("StyleEn");
                $('#LanguageButtonHome').text(" تغير اللغة  ");
                SysSession.CurrentEnvironment.ScreenLanguage = "en";
                document.cookie = "Inv1_systemProperties=" + JSON.stringify(SysSession.CurrentEnvironment) + ";expires=Fri, 31 Dec 2030 23:59:59 GMT;path=/";
            }
            else { // Arabic Mode
                //RemoveStyleSheet("StyleEn");
                //RemoveStyleSheet("bootstrap.min");
                //RemoveStyleSheet("main");
                //RemoveStyleSheet("responsive");
                //AppendStyleSheet("bootstrap-rtl");
                //AppendStyleSheet("StyleNewmassege");
                //AppendStyleSheet("mainAR");
                //AppendStyleSheet("style");
                //AppendStyleSheet("Style_Arabic");
                //AppendStyleSheet("responsive_AR");
                SysSession.CurrentEnvironment.ScreenLanguage = "ar";
                $('#LanguageButtonHome').text("Change Language");
                document.cookie = "Inv1_systemProperties=" + JSON.stringify(SysSession.CurrentEnvironment) + ";expires=Fri, 31 Dec 2030 23:59:59 GMT;path=/";
            }
            window.location.reload();
        });
        $(window).scroll(function () {
            var backtotop = $('.back-to-top');
            if (window.scrollY > 10) {
                backtotop.addClass('active');
            }
            else {
                backtotop.removeClass('active');
            }
        });
    }
    HomeComponent.InitalizeComponent = InitalizeComponent;
    function LogoutUserApi() {
        var userCode = SysSession.CurrentEnvironment.UserCode;
        Ajax.Callsync({
            type: "GET",
            url: sys.apiUrl("G_USERS", "LogoutUser"),
            data: { user: userCode },
            success: function (d) {
                if (d !== undefined) {
                    window.open(Url.Action("LoginIndex", "Login"), "_self");
                    return;
                }
            }
        });
    }
    HomeComponent.LogoutUserApi = LogoutUserApi;
    ;
    function ApplyCompanyPrivilages() {
        if (systemEnv.IsDashboardActive == false) {
            // disable dashboard button
            btnDashboard = DocumentActions.GetElementById("btnDashboard");
            btnDashboard.style.display = "none";
        }
    }
    function ApplyModules() {
        var lis = document.getElementsByClassName("liItem");
        var obj = [document.getElementById('liItem')];
        var modules = new Array();
        var compCode = SysSession.CurrentEnvironment.CompCode;
        var branchCode = SysSession.CurrentEnvironment.BranchCode;
        var UserCode = SysSession.CurrentEnvironment.UserCode;
        var SystemCode = SysSession.CurrentEnvironment.SystemCode;
        var SubSystemCode = SysSession.CurrentEnvironment.SubSystemCode;
        var CurrentYear = SysSession.CurrentEnvironment.CurrentYear;
        $.ajax({
            type: "GET",
            url: sys.apiUrl("SystemTools", "GetAllUserPrivilage"),
            async: false,
            data: { year: Number(CurrentYear), compCode: Number(compCode), branchCode: Number(branchCode), UserCode: UserCode, SystemCode: SystemCode, SubSystemCode: SubSystemCode },
            success: function (d) {
                modules = d;
            },
            error: function (d) {
                location.href = "/Login/LoginIndex";
            }
        });
        // filter moulules where isavailable = false or access = false 
        var li;
        for (var i = 0; i < modules.length; i++) {
            var singleUserModule = modules[i];
            //Notification control
            if (singleUserModule.MODULE_CODE.substring(0, 5) == "Note_") {
                li = document.getElementById(singleUserModule.MODULE_CODE);
            }
            else if (singleUserModule.MODULE_CODE.substring(0, 4) == "tol_") {
                li = document.getElementById(singleUserModule.MODULE_CODE);
            }
            else {
                li = document.getElementById("btn" + singleUserModule.MODULE_CODE);
            }
            if (li != null) {
                if (singleUserModule != null) {
                    if (singleUserModule.Access === false)
                        li.remove();
                    //li.style.display = "none";
                    if (singleUserModule.AVAILABLE === false)
                        li.style.display = "none";
                }
                else {
                    var key = li.getAttribute("key");
                    li.style.display = "";
                    li.className = "liItem";
                }
            }
            else {
                //alert("wrong code  " + singleUserModule.MODULE_CODE)
            }
        }
        $('.MED').removeClass('display_none');
        if (SysSession.CurrentEnvironment.GL_VoucherCCDT_Type != 1) {
            $('#btnDtcostcenter').addClass('display_none');
            $('#btnCcdtAccState').addClass('display_none');
        }
    }
    //By Muhammad Rajab 
    function GetNotificationData() {
        var comCode = SysSession.CurrentEnvironment.CompCode;
        var BraCode = SysSession.CurrentEnvironment.BranchCode;
        var SystemCode = SysSession.CurrentEnvironment.SystemCode;
        var SubSystemCode = SysSession.CurrentEnvironment.SubSystemCode;
        var yearid = SysSession.CurrentEnvironment.CurrentYear;
        var PeriodinSec = SysSession.CurrentEnvironment.I_Control.NotePeriodinSec;
        $.ajax({
            type: "GET",
            url: sys.apiUrl("SystemTools", "GetNotifications"),
            data: { comCode: comCode, BraCode: BraCode, yearid: yearid, SystemCode: SystemCode, SubSystemCode: SubSystemCode },
            async: false,
            success: function (d) {
                var not = d;
                var ulcontent = "";
                $("#notificationUL").html("");
                var _loop_1 = function (n) {
                    var li = document.createElement("li");
                    var span = document.createElement("span");
                    var span2 = document.createElement("span");
                    if (n.NoteCount > 0) {
                        li.onclick = function () {
                            notification_onclick(n.MODULE_CODE, n.MODULE_CODE);
                        };
                    }
                    li.className = "liItem disabledLi dropdown cursor";
                    li.id = n.MODULE_CODE;
                    if (SysSession.CurrentEnvironment.ScreenLanguage == "ar") {
                        span.innerText = n.MODULE_DESCA;
                    }
                    else {
                        span.innerText = n.MODULE_DESCE;
                    }
                    span2.className = 'price';
                    span.className = 'bading_left';
                    span2.innerText = n.NoteCount.toString();
                    li.appendChild(span);
                    li.appendChild(span2);
                    $("#notificationUL").append(li);
                };
                for (var _i = 0, not_1 = not; _i < not_1.length; _i++) {
                    var n = not_1[_i];
                    _loop_1(n);
                }
                setTimeout(GetNotificationData, PeriodinSec * 1000);
            }
        });
    }
    function notification_onclick(ModuleCode, btnName) {
        var sys = new SystemTools();
        var condation = "CompCode = " + SysSession.CurrentEnvironment.CompCode + " and BranchCode = " + SysSession.CurrentEnvironment.BranchCode + "and finyear = " + SysSession.CurrentEnvironment.CurrentYear;
        //if (ModuleCode == "Note_openinvoice")
        //    condation = condation + "  and Status = 0";
        //else if (ModuleCode == "Note_openreceipt") 
        //    condation = condation + "  and Status = 0 and TrType =1";
        //else if (ModuleCode == "Note_openopration") 
        //    condation = condation + "  and Status = 0 ";
        //else if (ModuleCode == "Note_openpaymnt")
        //    condation = condation + "  and Status = 0 and TrType =2";
        sys.FindKey(ModuleCode, btnName, condation, function () {
        });
    }
    function UpdateNotificationAndSendMsg() {
        if (SysSession.CurrentEnvironment.IsNotificaitonActive == true) {
            var PeriodinSec = SysSession.CurrentEnvironment.I_Control.NotePeriodinSec;
            var comCode = SysSession.CurrentEnvironment.CompCode;
            var BraCode = SysSession.CurrentEnvironment.BranchCode;
            var SystemCode = SysSession.CurrentEnvironment.SystemCode;
            var SubSystemCode = SysSession.CurrentEnvironment.SubSystemCode;
            $.ajax({
                type: "GET",
                url: sys.apiUrl("SystemTools", "UpdateNotificationAndSndMsg"),
                data: { comCode: comCode, BraCode: BraCode, SystemCode: SystemCode, SubSystemCode: SubSystemCode },
                success: function (d) {
                    GetNotificationData();
                    ApplyModules();
                    setTimeout(UpdateNotificationAndSendMsg, PeriodinSec * 1000);
                }
            });
        }
    }
    function HomePrev(controllerName, moduleCode) {
        var compCode = SysSession.CurrentEnvironment.CompCode;
        var branchCode = SysSession.CurrentEnvironment.BranchCode;
        var UserCode = SysSession.CurrentEnvironment.UserCode;
        var SystemCode = SysSession.CurrentEnvironment.SystemCode;
        var SubSystemCode = SysSession.CurrentEnvironment.SubSystemCode;
        var Modulecode = SysSession.CurrentEnvironment.ModuleCode;
        Ajax.Callsync({
            url: sys.apiUrl("SystemTools", "GetUserPrivilage"),
            data: { compCode: compCode, branchCode: branchCode, UserCode: UserCode, SystemCode: SystemCode, SubSystemCode: SubSystemCode, Modulecode: moduleCode },
            success: function (d) {
                if (d == undefined) {
                    window.open(Url.Action("LoginIndex", "Login"), "_self");
                    return;
                }
                else {
                    var result = JSON.parse(d);
                    if (result == null) {
                        MessageBox.Show("Access denied", controllerName);
                        return;
                    }
                    if (result.Access == true) {
                        $("#spnFav").css("display", "inline-block");
                        SysSession.CurrentPrivileges = result;
                        SysSession.CurrentPrivileges.MODULE_CODE = SysSession.CurrentEnvironment.ModuleCode;
                        document.cookie = "Inv1_Privilage=" + JSON.stringify(result).toString() + ";expires=Fri, 31 Dec 2030 23:59:59 GMT;path=/";
                    }
                    else {
                        MessageBox.Show("Access denied", controllerName);
                    }
                }
            }
        });
    }
    HomeComponent.HomePrev = HomePrev;
    function OpenView(controllerName, moduleCode) {
        SysSession.CurrentEnvironment.ModuleCode = moduleCode;
        var compCode = SysSession.CurrentEnvironment.CompCode;
        var branchCode = SysSession.CurrentEnvironment.BranchCode;
        var UserCode = SysSession.CurrentEnvironment.UserCode;
        var SystemCode = SysSession.CurrentEnvironment.SystemCode;
        var SubSystemCode = SysSession.CurrentEnvironment.SubSystemCode;
        var Modulecode = SysSession.CurrentEnvironment.ModuleCode;
        var CurrentYear = SysSession.CurrentEnvironment.CurrentYear;
        localStorage.setItem("Compcode1", compCode);
        Ajax.Callsync({
            url: sys.apiUrl("SystemTools", "GetAllUserPrivilage"),
            data: { compCode: compCode, branchCode: branchCode, UserCode: UserCode, SystemCode: SystemCode, SubSystemCode: SubSystemCode, Modulecode: Modulecode },
            success: function (d) {
                if (d == undefined) {
                    window.open(Url.Action("LoginIndex", "Login"), "_self");
                    return;
                }
                else {
                    var result = JSON.parse(d);
                    if (result == null) {
                        MessageBox.Show("Access denied", controllerName);
                        return;
                    }
                    if (result.Access == true) {
                        $("#spnFav").css("display", "inline-block");
                        SysSession.CurrentPrivileges = result;
                        SysSession.CurrentPrivileges.MODULE_CODE = SysSession.CurrentEnvironment.ModuleCode;
                        sessionStorage.setItem("MODU_CODE", SysSession.CurrentEnvironment.ModuleCode);
                        systemEnv.ScreenLanguage = sessionStorage.getItem("temp_lang");
                        document.cookie = "Privilage=" + JSON.stringify(d).toString() + ";expires=Fri, 31 Dec 2030 23:59:59 GMT;path=/";
                        window.open(Url.Action(controllerName + "Index", controllerName), "_self");
                    }
                    else {
                        MessageBox.Show("Access denied", controllerName);
                    }
                }
            }
        });
    }
    HomeComponent.OpenView = OpenView;
    function InitializePages() {
        $("#btnHome").click(function () { OpenPage(Modules.Home); });
        $("#btnClientaccstat").click(function () { OpenPage(Modules.Clientaccstat); }); //
        $("#btnUSERS").click(function () { OpenPage(Modules.USERS); }); //
        $("#btnDefBranches").click(function () { OpenPage(Modules.DefBranches); });
        $("#btnCurrencyCategory").click(function () { OpenPage(Modules.CurrencyCategory); });
        //8-9-2021 
        //$("#btnbranches").click(() => { OpenPage(Modules.branches); })
        /////////////////Start Definitions Pages ////////////////////
        $("#btnItems").click(function () { OpenPage(Modules.Items); });
        $("#btnMs_CustomerTypes").click(function () { OpenPage(Modules.Ms_CustomerTypes); });
        $("#btnMs_VendorTypes").click(function () { OpenPage(Modules.Ms_VendorTypes); });
        $("#btnMS_ItemCategory").click(function () { OpenPage(Modules.MS_ItemCategory); });
        $("#btnMS_Customer").click(function () { OpenPage(Modules.MS_Customer); });
        $("#btnMS_Vendor").click(function () { OpenPage(Modules.MS_Vendor); });
        $("#btnHr_Employees").click(function () { OpenPage(Modules.Hr_Employees); });
        $("#btnMS_CustomerCategory").click(function () { OpenPage(Modules.MS_CustomerCategory); });
        $("#btnHr_Jobs").click(function () { OpenPage(Modules.Hr_Jobs); });
        $("#btnHr_Departments").click(function () { OpenPage(Modules.Hr_Departments); });
        $("#btnMSGA_City").click(function () { OpenPage(Modules.MSGA_City); });
        $("#btnSys_Books").click(function () { OpenPage(Modules.Sys_Books); });
        $("#btnSr_VehicleTypes").click(function () { OpenPage(Modules.Sr_VehicleTypes); });
        $("#btnSr_VehicleShapes").click(function () { OpenPage(Modules.Sr_VehicleShapes); });
        $("#btnProd_Equipments").click(function () { OpenPage(Modules.Prod_Equipments); });
        $("#btnBasicUnits").click(function () { OpenPage(Modules.BasicUnits); });
        /////////////////End Definitions Pages ////////////////////
        /////////////////Start Account Pages ////////////////////
        $("#btnAcc").click(function () { OpenPage(Modules.Acc); });
        $("#btnCod_AccountCategorie").click(function () { OpenPage(Modules.Cod_AccountCategorie); });
        $("#btnCod_AccountClassification").click(function () { OpenPage(Modules.Cod_AccountClassification); });
        $("#btnCal_CostCenters").click(function () { OpenPage(Modules.Cal_CostCenters); });
        $("#btnMS_Currency").click(function () { OpenPage(Modules.MS_Currency); });
        $("#btnCal_JurnalEntry").click(function () { OpenPage(Modules.Cal_JurnalEntry); });
        $("#btnMs_Terms").click(function () { OpenPage(Modules.Ms_Terms); });
        $("#btnMS_BoxBank").click(function () { OpenPage(Modules.MS_BoxBank); });
        $("#btnMS_Taxes").click(function () { OpenPage(Modules.MS_Taxes); });
        $("#btnSys_FinancialYears").click(function () { OpenPage(Modules.Sys_FinancialYears); });
        $("#btnMs_ReceiptNote").click(function () { OpenPage(Modules.Ms_ReceiptNote); });
        $("#btnMS_Expenses").click(function () { OpenPage(Modules.MS_Expenses); });
        $("#btnMS_PaymentNote").click(function () { OpenPage(Modules.MS_PaymentNote); });
        /////////////////End Account Pages ////////////////////
        ///////// Start Setting ///////////
        $("#btnSearch").click(function () { OpenPage(Modules.Search); });
        ///////// End Setting ///////////
        ///////// Programming Tools ///////////
        $("#btnMS_Settings").click(function () { OpenPage(Modules.Settings); });
        ///////// End Setting ///////////
        $("#btnCustomerReports").click(function () { OpenPage(Modules.CustomerReport); });
        ///////////////////////////////////Start Fixed assets Pages //////////////////////////////
        $("#btnAsset_AssetCard").click(function () { OpenPage(Modules.Asset_AssetCard); });
        $("#btnAsset_AssetCategory").click(function () { OpenPage(Modules.Asset_AssetCategory); });
        /////////////////////////////////// End Fixed assets Pages //////////////////////////////
        /////////////////////////////////// Static Pages //////////////////////////////
        $("#btnSataicFtaratMalia").click(function () { OpenPage(Modules.SataicFtaratMalia); });
        $("#btnSataticMostanadSarf").click(function () { OpenPage(Modules.SataticMostanadSarf); });
        $("#btnSataticMostanadKabdYomia").click(function () { OpenPage(Modules.SataticMostanadKabdYomia); });
        $("#btnStaticMostanad3ohda").click(function () { OpenPage(Modules.StaticMostanad3ohda); });
        $("#btnAnswer").click(function () { OpenPage(Modules.Answer); });
        $("#btnEngineNumbers").click(function () { OpenPage(Modules.EngineNumbers); });
        $("#btnAnswerTaxes").click(function () { OpenPage(Modules.AnswerTaxes); });
        $("#btnPeriodicalBook").click(function () { OpenPage(Modules.PeriodicalBook); });
        $("#btnTaxForms").click(function () { OpenPage(Modules.TaxForms); });
    }
    function Notifications_Message() {
        var comCode = SysSession.CurrentEnvironment.CompCode;
        var BraCode = SysSession.CurrentEnvironment.BranchCode;
        var SystemCode = SysSession.CurrentEnvironment.SystemCode;
        var SubSystemCode = SysSession.CurrentEnvironment.SubSystemCode;
        $.ajax({
            type: "GET",
            url: sys.apiUrl("SystemTools", "GetNotifications_Message"),
            // data: { comCode: comCode, SystemCode: SystemCode },
            async: false,
            success: function (d) {
                var massg = d;
                var ulcontent = "";
                $("#creatnotesmassg").html("");
                for (var _i = 0, massg_1 = massg; _i < massg_1.length; _i++) {
                    var ms = massg_1[_i];
                    var li = document.createElement("li");
                    var span = document.createElement("span");
                    var span2 = document.createElement("span");
                    var span3 = document.createElement("span");
                    var span4 = document.createElement("span");
                    li.id = ms.AlertID.toString();
                    if (ms.NoteSubType == 1) {
                        li.className = "liItem disabledLi dropdown cursor border_li style_li1";
                    }
                    else {
                        li.className = "liItem disabledLi dropdown cursor border_li style_li2";
                    }
                    span.innerText = ms.MsgText;
                    span.className = 'bading_left font_mseeg';
                    span2.className = 'col-lg-12 font_mseeg';
                    span3.className = 'col-lg-12 font_mseeg';
                    span4.className = 'col-lg-12 font_mseeg';
                    span2.innerText = DateTimeFormat(ms.MsgDate);
                    li.appendChild(span);
                    li.appendChild(span2);
                    li.appendChild(span3);
                    li.appendChild(span4);
                    $("#creatnotesmassg").append(li);
                }
            }
        });
    }
    //By Muhammad Rajab
    function Language() {
        if (SysSession.CurrentEnvironment.ScreenLanguage == "en") {
            //RemoveStyleSheet("bootstrap-rtl");
            //RemoveStyleSheet("responsive_AR");
            //RemoveStylejs("mainAR");
            //RemoveStyleSheet("Style_Arabic");
            //RemoveStyleSheet("style");
            //RemoveStyleSheet("StyleNewmassege");
            //$("#bootstrap_rtl").remove();
            //$("#Style_Arabic").remove();
            //AppendStyleSheet("bootstrap.min");
            //AppendStylejs("main");
            //AppendStyleSheet("responsive");
            //AppendStyleSheet("StyleEn");
            SysSession.CurrentEnvironment.ScreenLanguage = "en";
            $("#btn_loguotuser span").text("Logout");
        }
        else {
            //RemoveStyleSheet("StyleEn");
            //RemoveStyleSheet("bootstrap.min");
            //RemoveStylejs("main");
            //RemoveStyleSheet("responsive");
            //AppendStyleSheet("bootstrap-rtl");
            //AppendStyleSheet("StyleNewmassege");
            //AppendStylejs("mainAR");
            //AppendStyleSheet("style");
            //AppendStyleSheet("Style_Arabic");
            //AppendStyleSheet("responsive_AR");
            //$('#langImg').attr('src', '../images/english.png');
            SysSession.CurrentEnvironment.ScreenLanguage = "ar";
            $("#btn_loguotuser span").text("الخروج من النظام");
        }
        //$("#SearchBox").draggable();
        App.Startup();
    }
    HomeComponent.Language = Language;
    function AppendStyleSheet(fileName) {
        var lnk = document.createElement('link');
        lnk.href = "../Style_design/" + fileName + ".css";
        lnk.rel = 'stylesheet';
        lnk.type = 'text/css';
        document.getElementsByTagName("head")[0].appendChild(lnk);
    }
    function RemoveStyleSheet(fileName) {
        var href = "../Style_design/" + fileName + ".css";
        $("link[rel=stylesheet][href~='" + href + "']").remove();
    }
    //By Muhammad Rajab 
    function AppendStylejs(fileName) {
        var script = document.createElement('script');
        script.src = "../Style_design/" + fileName + ".js";
        document.getElementById("caret_script").appendChild(script);
    }
    //By Muhammad Rajab 
    function RemoveStylejs(fileName) {
        var href = "../Style_design/" + fileName + ".js";
        $("<script src=" + href + " ></script>").remove();
    }
    function ScreenHelp() {
        var ModuleCode = SysSession.CurrentPrivileges.MODULE_CODE;
        $.ajax({
            type: "GET",
            url: sys.apiUrl("SystemTools", "GetHelp"),
            data: { ModuleCode: ModuleCode },
            async: false,
            success: function (d) {
                var result = d;
                var res = result.Response;
                if (res != null) {
                    if (SysSession.CurrentEnvironment.ScreenLanguage == "ar") {
                        $("#modalHelpRep").html("<div style=\"direction:rtl;height: 289px;overflow: scroll;overflow-x: hidden;font-weight: bold;\" >" + res.HelpBody_Ar + "</div>");
                    }
                    else {
                        $("#modalHelpRep").html("<div style=\"direction:ltr;height: 289px;overflow: scroll;overflow-x: hidden;font-weight: bold;\">" + res.HelpBody_En + "</div>");
                    }
                }
            }
        });
    }
})(HomeComponent || (HomeComponent = {}));
//# sourceMappingURL=HomeComponent.js.map