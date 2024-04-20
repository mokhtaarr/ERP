$(document).ready(() => {
    HomeComponent.InitalizeComponent();
});
 
namespace HomeComponent {
     //let res: any = GetResourceList("");
    var sys: SystemTools = new SystemTools();
    var btnDashboard: HTMLButtonElement; 
    var btn_loguotuser: HTMLButtonElement;
    var SysSession: SystemSession = GetSystemSession();
    var systemEnv: SystemEnvironment = SysSession.CurrentEnvironment;

    export function OpenPage(moduleCode: string) {
        SysSession.CurrentEnvironment.ModuleCode = moduleCode;
        let compCode = SysSession.CurrentEnvironment.CompCode;
        let Modulecode = SysSession.CurrentEnvironment.ModuleCode;
        let branchCode = SysSession.CurrentEnvironment.BranchCode;
        let UserCode = SysSession.CurrentEnvironment.UserCode;
        let SystemCode = SysSession.CurrentEnvironment.SystemCode;
        let SubSystemCode = SysSession.CurrentEnvironment.SubSystemCode;
        let CurrentYear = SysSession.CurrentEnvironment.CurrentYear;
         Ajax.Callsync({
            type: "GET",
            url: sys.apiUrl("SystemTools", "GetUserPrivilage"),
            data: { year: Number(CurrentYear), compCode: compCode, branchCode: branchCode, UserCode: UserCode, SystemCode: SystemCode,  Modulecode: Modulecode },
             success: (d) => {
                if (d == undefined) {
                    window.open(Url.Action("LoginIndex", "Login"), "_self");
                    return;
                }
                else {
                    let result = JSON.parse(d) as UserPrivilege;

                    if (result == null) {
                        MessageBox.Show("denied", moduleCode);
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

    export function OpenReportsPopup(moduleCode: string) {
        SysSession.CurrentEnvironment.ModuleCode = moduleCode;
        let compCode = SysSession.CurrentEnvironment.CompCode;
        let branchCode = SysSession.CurrentEnvironment.BranchCode;
        let UserCode = SysSession.CurrentEnvironment.UserCode;
        let SystemCode = SysSession.CurrentEnvironment.SystemCode;
        let SubSystemCode = SysSession.CurrentEnvironment.SubSystemCode;
        let Modulecode = SysSession.CurrentEnvironment.ModuleCode;

        Ajax.CallAsync({
            url: sys.apiUrl("SystemTools", "GetUserPrivilage"),

            data: { compCode: compCode, branchCode: branchCode, UserCode: UserCode, SystemCode: SystemCode, SubSystemCode: SubSystemCode, Modulecode: Modulecode },
            success: (d) => { 
                if (d == undefined) {
                    window.open(Url.Action("LoginIndex", "Login"), "_self");
                    return;
                }
                else {
                    let result = JSON.parse(d) as UserPrivilege;
                    if (result == null) {
                        MessageBox.Show("Access denied", "GeneralReports");
                        return;
                    }
                    if (result.Access == true) {
                        let opt: JQueryAjaxSettings = {
                            url: Url.Action(moduleCode, "GeneralReports"),
                            success: (d) => {
                                let result = d as string;
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
     
    export function InitalizeComponent() {
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
        if (SysSession.CurrentEnvironment.ScreenLanguage == "ar")
        { document.getElementById('camp_name').innerHTML = SysSession.CurrentEnvironment.CompanyNameAr;  }
        else { document.getElementById('camp_name').innerHTML = SysSession.CurrentEnvironment.CompanyName; }
        
        ApplyModules();
        ApplyCompanyPrivilages();
        $("#btnHelpRep").click(() => { ScreenHelp(); })

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
         btn_loguotuser = DocumentActions.GetElementById<HTMLButtonElement>("btn_loguotuser");
        btn_loguotuser.onclick = LogoutUserApi;
        //CheckTime(); 
        $("#LanguageButtonHome").click(() => {
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
       
        $(window).scroll(() => {
        let backtotop = $('.back-to-top');
            if (window.scrollY > 10) {
                backtotop.addClass('active');
            } else {
                backtotop.removeClass('active');
            }
        });
     }

    export function LogoutUserApi() {
         let userCode = SysSession.CurrentEnvironment.UserCode;
        Ajax.Callsync({
            type: "GET",
            url: sys.apiUrl("G_USERS", "LogoutUser"),
            data: { user: userCode },
            success: (d) => {
                if (d !== undefined) {
                    window.open(Url.Action("LoginIndex", "Login"), "_self");
                    return;
                }
            }
        });
    };

    function ApplyCompanyPrivilages() {
        if (systemEnv.IsDashboardActive == false) {
            // disable dashboard button
            btnDashboard = DocumentActions.GetElementById<HTMLButtonElement>("btnDashboard");
            btnDashboard.style.display = "none";
        }
    }

    function ApplyModules() {
        var lis = document.getElementsByClassName("liItem");
        let obj = [document.getElementById('liItem')];
        let modules: Array<UserPrivilege> = new Array<UserPrivilege>();
        let compCode = SysSession.CurrentEnvironment.CompCode;
        let branchCode = SysSession.CurrentEnvironment.BranchCode;
        let UserCode = SysSession.CurrentEnvironment.UserCode;
        let SystemCode = SysSession.CurrentEnvironment.SystemCode;
        let SubSystemCode = SysSession.CurrentEnvironment.SubSystemCode;
        let CurrentYear = SysSession.CurrentEnvironment.CurrentYear;
        $.ajax({
            type: "GET",
            url: sys.apiUrl("SystemTools", "GetAllUserPrivilage"),
            async: false,
            data: { year: Number(CurrentYear), compCode: Number(compCode), branchCode: Number(branchCode), UserCode: UserCode, SystemCode: SystemCode, SubSystemCode: SubSystemCode   },
            success: (d) => {
                modules = d as Array<UserPrivilege>;
            },
            error: (d) => {
                location.href = "/Login/LoginIndex";
            }
        });

        // filter moulules where isavailable = false or access = false 
        let li;
        for (var i = 0; i < modules.length; i++) {
            let singleUserModule: UserPrivilege = modules[i];
            //Notification control
            if (singleUserModule.MODULE_CODE.substring(0, 5) == "Note_") {
                li = document.getElementById(singleUserModule.MODULE_CODE) as HTMLLIElement;
            }
            else if (singleUserModule.MODULE_CODE.substring(0, 4) == "tol_") {

                   li = document.getElementById(singleUserModule.MODULE_CODE) as HTMLLIElement;
             }

            else {
                    li = document.getElementById("btn" + singleUserModule.MODULE_CODE) as HTMLLIElement;
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
                    let key: string = li.getAttribute("key");
                    li.style.display = "";
                    li.className = "liItem";
                }
            } else {
                //alert("wrong code  " + singleUserModule.MODULE_CODE)
            }
        }

        $('.MED').removeClass('display_none');

        if (SysSession.CurrentEnvironment.GL_VoucherCCDT_Type != 1)
        {
            $('#btnDtcostcenter').addClass('display_none');
            $('#btnCcdtAccState').addClass('display_none');
        }
    }
    //By Muhammad Rajab 
   
    function GetNotificationData() {
        let comCode = SysSession.CurrentEnvironment.CompCode;
        let BraCode = SysSession.CurrentEnvironment.BranchCode;
        let SystemCode = SysSession.CurrentEnvironment.SystemCode;
        let SubSystemCode = SysSession.CurrentEnvironment.SubSystemCode; 
        let yearid = SysSession.CurrentEnvironment.CurrentYear; 
        var PeriodinSec = SysSession.CurrentEnvironment.I_Control.NotePeriodinSec;
        $.ajax({
            type: "GET",
            url: sys.apiUrl("SystemTools", "GetNotifications"),
            data: { comCode: comCode, BraCode: BraCode, yearid: yearid,  SystemCode: SystemCode, SubSystemCode: SubSystemCode },
            async: false,
            success: (d) => {
                let not = d as NoteificationsModel[];
                let ulcontent = "";
                $("#notificationUL").html("");
                for (let n of not) {
                    let li = document.createElement("li");
                    let span = document.createElement("span");
                    let span2 = document.createElement("span"); 
                    if (n.NoteCount > 0) {
                        li.onclick = () => { 
                            notification_onclick(n.MODULE_CODE, n.MODULE_CODE);
                        }
                    } 
                    li.className = "liItem disabledLi dropdown cursor";
                    li.id = n.MODULE_CODE;
                    if (SysSession.CurrentEnvironment.ScreenLanguage == "ar") {
                        span.innerText = n.MODULE_DESCA;
                    } else {
                        span.innerText = n.MODULE_DESCE;
                    }
                    span2.className = 'price';
                    span.className = 'bading_left';
                    span2.innerText = n.NoteCount.toString();
                    li.appendChild(span);
                    li.appendChild(span2);
                    $("#notificationUL").append(li); 
                } 
                setTimeout(GetNotificationData, PeriodinSec * 1000);
            }
        });

    } 

    function notification_onclick(ModuleCode: string, btnName: string) {
        let sys: SystemTools = new SystemTools();
        var condation = "CompCode = " + SysSession.CurrentEnvironment.CompCode + " and BranchCode = " + SysSession.CurrentEnvironment.BranchCode + "and finyear = " + SysSession.CurrentEnvironment.CurrentYear ;
        //if (ModuleCode == "Note_openinvoice")
        //    condation = condation + "  and Status = 0";
        //else if (ModuleCode == "Note_openreceipt") 
        //    condation = condation + "  and Status = 0 and TrType =1";
        //else if (ModuleCode == "Note_openopration") 
        //    condation = condation + "  and Status = 0 ";
        //else if (ModuleCode == "Note_openpaymnt")
        //    condation = condation + "  and Status = 0 and TrType =2";
        sys.FindKey(ModuleCode, btnName, condation, () => {

        });
    }

    function UpdateNotificationAndSendMsg() {
        if (SysSession.CurrentEnvironment.IsNotificaitonActive == true) {
            var PeriodinSec = SysSession.CurrentEnvironment.I_Control.NotePeriodinSec;

            let comCode = SysSession.CurrentEnvironment.CompCode;
            let BraCode = SysSession.CurrentEnvironment.BranchCode;
            let SystemCode = SysSession.CurrentEnvironment.SystemCode;
            let SubSystemCode = SysSession.CurrentEnvironment.SubSystemCode;
            $.ajax({
                type: "GET",
                url: sys.apiUrl("SystemTools", "UpdateNotificationAndSndMsg"),
                data: { comCode: comCode, BraCode: BraCode, SystemCode: SystemCode, SubSystemCode: SubSystemCode },
                success: (d) => {
                    GetNotificationData();
                    ApplyModules();
                    setTimeout(UpdateNotificationAndSendMsg, PeriodinSec * 1000);
                }
            });
        }
    }

    export function HomePrev(controllerName: string, moduleCode: string) { 
        let compCode = SysSession.CurrentEnvironment.CompCode;
        let branchCode = SysSession.CurrentEnvironment.BranchCode;
        let UserCode = SysSession.CurrentEnvironment.UserCode;
        let SystemCode = SysSession.CurrentEnvironment.SystemCode;
        let SubSystemCode = SysSession.CurrentEnvironment.SubSystemCode;
        let Modulecode = SysSession.CurrentEnvironment.ModuleCode;

        Ajax.Callsync({
            url: sys.apiUrl("SystemTools", "GetUserPrivilage"),
            data: { compCode: compCode, branchCode: branchCode, UserCode: UserCode, SystemCode: SystemCode, SubSystemCode: SubSystemCode, Modulecode: moduleCode },
            success: (d) => {
                if (d == undefined) {
                    window.open(Url.Action("LoginIndex", "Login"), "_self");
                    return;
                }
                else { 
                    let result = JSON.parse(d) as UserPrivilege;
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
     
    export function OpenView(controllerName: string, moduleCode: string) {
            SysSession.CurrentEnvironment.ModuleCode = moduleCode;
 
            let compCode = SysSession.CurrentEnvironment.CompCode;
            let branchCode = SysSession.CurrentEnvironment.BranchCode;
            let UserCode = SysSession.CurrentEnvironment.UserCode;
            let SystemCode = SysSession.CurrentEnvironment.SystemCode;
            let SubSystemCode = SysSession.CurrentEnvironment.SubSystemCode;
            let Modulecode = SysSession.CurrentEnvironment.ModuleCode;
             let CurrentYear = SysSession.CurrentEnvironment.CurrentYear;
         localStorage.setItem("Compcode1", compCode);

        Ajax.Callsync({
            url: sys.apiUrl("SystemTools", "GetAllUserPrivilage"),
            data: { compCode: compCode, branchCode: branchCode, UserCode: UserCode, SystemCode: SystemCode, SubSystemCode: SubSystemCode, Modulecode: Modulecode },
            success: (d) => {
                if (d == undefined) {
                    window.open(Url.Action("LoginIndex", "Login"), "_self");
                    return;
                }
                else {
                    let result = JSON.parse(d) as UserPrivilege;

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

    function InitializePages() {

        $("#btnHome").click(() => { OpenPage(Modules.Home); })
        $("#btnClientaccstat").click(() => { OpenPage(Modules.Clientaccstat); })//
        $("#btnUSERS").click(() => { OpenPage(Modules.USERS); })//
        $("#btnDefBranches").click(() => { OpenPage(Modules.DefBranches); })
        $("#btnCurrencyCategory").click(() => { OpenPage(Modules.CurrencyCategory); })
        $("btnMS_PrintBarCode").click(() => { OpenPage(Modules.CurrencyCategory); })

        //8-9-2021 
        //$("#btnbranches").click(() => { OpenPage(Modules.branches); })

        /////////////////Start Definitions Pages ////////////////////
        $("#btnItems").click(() => { OpenPage(Modules.Items); })
        $("#btnMs_CustomerTypes").click(() => { OpenPage(Modules.Ms_CustomerTypes); })
        $("#btnMs_VendorTypes").click(() => { OpenPage(Modules.Ms_VendorTypes); })
        $("#btnMS_ItemCategory").click(() => { OpenPage(Modules.MS_ItemCategory); })
        $("#btnMS_Customer").click(() => { OpenPage(Modules.MS_Customer); })
        $("#btnMS_Vendor").click(() => { OpenPage(Modules.MS_Vendor); })
        $("#btnHr_Employees").click(() => { OpenPage(Modules.Hr_Employees); })
        $("#btnMS_CustomerCategory").click(() => { OpenPage(Modules.MS_CustomerCategory); })
        $("#btnHr_Jobs").click(() => { OpenPage(Modules.Hr_Jobs); })
        $("#btnHr_Departments").click(() => { OpenPage(Modules.Hr_Departments); })
        $("#btnMSGA_City").click(() => { OpenPage(Modules.MSGA_City); })
        $("#btnSys_Books").click(() => { OpenPage(Modules.Sys_Books); })
        $("#btnSr_VehicleTypes").click(() => { OpenPage(Modules.Sr_VehicleTypes); })
        $("#btnSr_VehicleShapes").click(() => { OpenPage(Modules.Sr_VehicleShapes); })
        $("#btnProd_Equipments").click(() => { OpenPage(Modules.Prod_Equipments); })
        $("#btnBasicUnits").click(() => { OpenPage(Modules.BasicUnits); })

        /////////////////End Definitions Pages ////////////////////

        /////////////////Start Account Pages ////////////////////
        $("#btnAcc").click(() => { OpenPage(Modules.Acc); })
        $("#btnCod_AccountCategorie").click(() => { OpenPage(Modules.Cod_AccountCategorie); })
        $("#btnCod_AccountClassification").click(() => { OpenPage(Modules.Cod_AccountClassification); })
        $("#btnCal_CostCenters").click(() => { OpenPage(Modules.Cal_CostCenters); })
        $("#btnMS_Currency").click(() => { OpenPage(Modules.MS_Currency); })
        $("#btnCal_JurnalEntry").click(() => { OpenPage(Modules.Cal_JurnalEntry); })
        $("#btnMs_Terms").click(() => { OpenPage(Modules.Ms_Terms); });
        $("#btnMS_BoxBank").click(() => { OpenPage(Modules.MS_BoxBank); });
        $("#btnMS_Taxes").click(() => { OpenPage(Modules.MS_Taxes); });
        $("#btnSys_FinancialYears").click(() => { OpenPage(Modules.Sys_FinancialYears); });
        $("#btnMs_ReceiptNote").click(() => { OpenPage(Modules.Ms_ReceiptNote); })
        $("#btnMS_Expenses").click(() => { OpenPage(Modules.MS_Expenses); })
        $("#btnMS_PaymentNote").click(() => { OpenPage(Modules.MS_PaymentNote); })
        /////////////////End Account Pages ////////////////////

        /////////////////Start Purchase Pages ////////////////////
        $("#btnPurchasInvoice").click(() => { OpenPage(Modules.PurchasInvoice); })
        /////////////////End Purchase Pages ////////////////////

        ///////// Start Setting ///////////
        $("#btnSearch").click(() => { OpenPage(Modules.Search); })
        ///////// End Setting ///////////

        ///////// Programming Tools ///////////
        $("#btnMS_Settings").click(() => { OpenPage(Modules.Settings); })
        ///////// End Setting ///////////

        $("#btnCustomerReports").click(() => { OpenPage(Modules.CustomerReport); })

        ///////////////////////////////////Start Fixed assets Pages //////////////////////////////
        $("#btnAsset_AssetCard").click(() => { OpenPage(Modules.Asset_AssetCard); })
        $("#btnAsset_AssetCategory").click(() => { OpenPage(Modules.Asset_AssetCategory); })
        /////////////////////////////////// End Fixed assets Pages //////////////////////////////


        /////////////////////////////////// Static Pages //////////////////////////////
        $("#btnSataicFtaratMalia").click(() => { OpenPage(Modules.SataicFtaratMalia); })
        $("#btnSataticMostanadSarf").click(() => { OpenPage(Modules.SataticMostanadSarf); })
        $("#btnSataticMostanadKabdYomia").click(() => { OpenPage(Modules.SataticMostanadKabdYomia); })
        $("#btnStaticMostanad3ohda").click(() => { OpenPage(Modules.StaticMostanad3ohda); })

        $("#btnAnswer").click(() => { OpenPage(Modules.Answer); })
        $("#btnEngineNumbers").click(() => { OpenPage(Modules.EngineNumbers); })
        $("#btnAnswerTaxes").click(() => { OpenPage(Modules.AnswerTaxes); })
        $("#btnPeriodicalBook").click(() => { OpenPage(Modules.PeriodicalBook); })
        $("#btnTaxForms").click(() => { OpenPage(Modules.TaxForms); })
    }

    function Notifications_Message() {

        let comCode = SysSession.CurrentEnvironment.CompCode;
        let BraCode = SysSession.CurrentEnvironment.BranchCode;
        let SystemCode = SysSession.CurrentEnvironment.SystemCode;
        let SubSystemCode = SysSession.CurrentEnvironment.SubSystemCode;

        $.ajax({
            type: "GET",
            url: sys.apiUrl("SystemTools", "GetNotifications_Message"),
            // data: { comCode: comCode, SystemCode: SystemCode },
            async: false,
            success: (d) => {

                let massg = d as KQ_GetAlertNoteLog[];
                let ulcontent = "";
                $("#creatnotesmassg").html("");
                for (let ms of massg) {
                    let li = document.createElement("li");
                    let span = document.createElement("span");
                    let span2 = document.createElement("span");
                    let span3 = document.createElement("span");
                    let span4 = document.createElement("span"); 
                    li.id = ms.AlertID.toString();
                    if (ms.NoteSubType == 1) {
                        li.className = "liItem disabledLi dropdown cursor border_li style_li1";
                    } else {
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
    export function Language() {
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
            SysSession.CurrentEnvironment.ScreenLanguage = "en"
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

             SysSession.CurrentEnvironment.ScreenLanguage = "ar"
            $("#btn_loguotuser span").text("الخروج من النظام")
        }
        //$("#SearchBox").draggable();
        App.Startup();
    }
     
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
        let ModuleCode = SysSession.CurrentPrivileges.MODULE_CODE;
        $.ajax({
            type: "GET",
            url: sys.apiUrl("SystemTools", "GetHelp"),
            data: { ModuleCode: ModuleCode },
            async: false,
            success: (d) => {
                let result = d as BaseResponse;
                let res = result.Response as G_ModuleHelp;
                if (res != null) {
                    if (SysSession.CurrentEnvironment.ScreenLanguage == "ar") {
                        $("#modalHelpRep").html(`<div style="direction:rtl;height: 289px;overflow: scroll;overflow-x: hidden;font-weight: bold;" >` + res.HelpBody_Ar + `</div>`);
                    }
                    else {
                        $("#modalHelpRep").html(`<div style="direction:ltr;height: 289px;overflow: scroll;overflow-x: hidden;font-weight: bold;">` + res.HelpBody_En + `</div>`);
                    }
                }
            }


        });

    } 
}
 