$(document).ready(function () {
    try {
        Login_.checkBrowser();
        Login_.InitalizeComponent();
    } catch (e) {

    }
    //LoginComponent.InitalizeComponent();
});

namespace Login_ {
    var sys = new SystemTools();
    var sysPar = new SystemParameters();
    let Resource: any = GetResourceList("");
    var cmbLanguage;
    var OnLoggedUrl = "";
    var txtUserName;
    var txtUserPassword;
    var chkRemember;
    var btnLogin;
    var btnBack;
    var txtYear;
    var hLoggedName;
    var spnLoggedYear;
    var cmbBranch;
    var cmbCompany;
    var TestConn: boolean = false;
    const GridInputClassName = "form-control gridIput";
    //var Databses: string[];
    //export function InitalizeComponent() {
    //}
    //Login_.InitalizeComponent = InitalizeComponent;

    export function InitalizeComponent() {
        txtUserName = document.getElementById("txtUserName");
        txtUserPassword = document.getElementById("txtUserPassword");
        chkRemember = document.getElementById("chkRemember");
        btnLogin = document.getElementById("btnLogin");
        btnBack = document.getElementById("btnBack");
        cmbLanguage = document.getElementById("cmbLanguage");
        txtYear = document.getElementById("txtYear");
        //hLoggedName = DocumentActions.GetElementById("hLoggedName");
        //spnLoggedYear = DocumentActions.GetElementById("spnLoggedYear");
        cmbCompany = document.getElementById("cmbCompany");
        cmbBranch = document.getElementById("cmbBranch");
        OnLoggedUrl = $("#OnLogged").val();
        btnBack.addEventListener("click", GoBack);
        btnLogin.addEventListener("click", Login);
        cmbCompany.onchange = function () { cmbCompany_Onchange(Number(cmbCompany.value), SystemEnv.ScreenLanguage); };
        //MessageBox
        var loginData = localStorage.getItem("Inv1_Login_Data");
        const d = new Date();
        let year = d.getFullYear();
        txtYear.value = year;

        if (loginData != null) {
            var data = JSON.parse(loginData);
            txtUserName.value = data.USER_CODE;
            txtUserPassword.value = data.USER_PASSWORD;

            cmbLanguage.value = data.Language;
            chkRemember.checked = true;
        }
        else {
            //txtYear.value = SharedWork.Session.CurrentYear;
            //cmbLanguage.value = SharedWork.Session.Language;
        }

        InitalizeControls();
        InitalizeEvents();
        InitializeGrid();
    }

    function InitalizeControls() {
    }

    function InitalizeEvents() {
        ServerName.onchange = function () {
            if (!IsNullOrEmpty(ServerName.value))
                GetDatabase(ServerName.value);
        }
    }

    var Connection: ConnectionObj = new ConnectionObj();

    var Connections: Array<ConnectionObj> = new Array<ConnectionObj>();

    //var connection: Connection = new Connection();

    var compData = Array();

    var SystemEnv: SystemEnvironment = new SystemEnvironment();

    var SysSession: SystemSession = GetSystemSession();

    var ServerName: HTMLSelectElement = document.getElementById("ServerName") as HTMLSelectElement;

    var InitialCatalog: HTMLSelectElement = document.getElementById("InitialCatalog") as HTMLSelectElement;

    var Database: HTMLSelectElement = document.getElementById("Database") as HTMLSelectElement;

    var Servers: Array<string> = Array<string>();

    var Databases: Array<string> = Array<string>();

    var GridConnection: JsGrid = new JsGrid();

    export function checkBrowser() {
        //// Get the user-agent string
        //var userAgentString = navigator.userAgent;
        //// Detect Chrome
        //var chromeAgent = userAgentString.indexOf("Chrome") > -1;
        //if (userAgentString == "Mozilla/5.0 (iPad; CPU OS 11_0 like Mac OS X) AppleWebKit/604.1.34 (KHTML, like Gecko) Version/11.0 Mobile/15A5341f Safari/604.1"
        //    || "Mozilla/5.0 (iPhone; U; CPU iPhone OS 5_1_1 like Mac OS X; en-gb)AppleWebKit/ 534.46.0 (KHTML, like Gecko)CriOS / 19.0.1084.60 Mobile/ 9B206 Safari/ 7534.48.3"
        //    || "Mozilla/5.0 (iPhone; CPU iPhone OS 10_3 like Mac OS X)AppleWebKit/ 602.1.50 (KHTML, like Gecko) CriOS/ 56.0.2924.75 Mobile / 14E5239e Safari/ 602.1") {
        //    chromeAgent = true;
        //}
        //// Detect Internet Explorer
        //var IExplorerAgent =
        //    //User - Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/ 79.0.3945.74 Safari/ 537.36 Edg/ 79.0.309.43
        //    userAgentString.indexOf("MSIE") > -1 ||
        //    userAgentString.indexOf("rv:") > -1;
        //// Detect Firefox
        //var firefoxAgent = userAgentString.indexOf("Firefox") > -1;
        //// Detect Safari
        //var safariAgent = userAgentString.indexOf("Safari") > -1;
        //var EdgeAgent = userAgentString.indexOf("Edge") > -1;
        //// Discard Safari since it also matches Chrome
        //if ((chromeAgent) && (safariAgent))
        //    safariAgent = false;
        //// Detect Opera
        //var operaAgent = userAgentString.indexOf("OP") > -1;
        //// Discard Chrome since it also matches Opera
        //if ((chromeAgent) && (operaAgent))
        //    chromeAgent = false;

        //if (safariAgent || IExplorerAgent || operaAgent || firefoxAgent || EdgeAgent) {
        //    var mg =  "يجب الدخول من متصفح جوجل كروم" + "You must log in from Google Chrome";
        //    MessageBox.Show(mg, "");
        //}
        //else {
        //    InitalizeComponent();
        //}
        InitalizeComponent();
    }

    Login_.checkBrowser = checkBrowser;

    function Login() {
        var userName = txtUserName.value;
        var userPassword = txtUserPassword.value;
        var user = new G_USERS();
        user.USER_CODE = userName;
        user.USER_PASSWORD = userPassword;
        var year = $("#txtYear").val();
        txtUserName.style.borderColor = "";
        txtUserPassword.style.borderColor = "";
        var lang = "ar";
        if (cmbLanguage.selectedIndex == 0)
            lang = "ar";
        else
            lang = "en";

        SystemEnv.ScreenLanguage = lang;
        SystemEnv.CurrentYear = txtYear.value;
        SystemEnv.UserCode = userName;
        SystemEnv.CompanyNameAr = "";

        Ajax.Callsync({
            type: "GET",
            url: sys.apiUrl("G_USERS", "UserLogin"),
            data: { UserCode: user.USER_CODE, Password: user.USER_PASSWORD },
            success: function (d) {
                var res = d;
                if (res.IsSuccess == true) {
                    var result = <G_USERS>res.Response;
                    if (result != null && result.USER_CODE != null) {
                        $("#divLogin").css("display", "none");
                        $("#divCompanies").css("display", "block");

                        LoadUserAuthentications(result.UserId);

                        SystemEnv.UserId = result.UserId;
                        SystemEnv.Token = result.Tokenid;
                        SystemEnv.UserType = result.USER_TYPE;
                        SystemEnv.SalesManID = result.SalesManID;
                        SystemEnv.CashBoxID = result.CashBoxID;
                        document.cookie = "Inv1_systemProperties=" + JSON.stringify(SystemEnv).toString() + ";expires=Fri, 31 Dec 2030 23:59:59 GMT;path=/";
                        Ajax.Callsync({
                            type: "GET",
                            url: sys.apiUrl("SystemTools", "GetAppSettings"),
                            data: { userCode: user.USER_CODE, SystemCode: 'I', SubSystemCode: 'I' },
                            success: function (d) {
                                compData = d;
                                cmbCompany.innerHTML = "";
                                if (user.USER_CODE == "safe") {
                                    compData.forEach(function (comp, index) {
                                        cmbCompany.add(new Option(lang == "en" ? (index + 1) + " - " + comp.CompanyNameE.toString() : (index + 1) + " - " + comp.CompanyNameA.toString(), comp.CompanyCode.toString()));
                                    });
                                }
                                else {
                                    compData.forEach(function (comp, index) {
                                        cmbCompany.add(new Option(lang == "en" ? comp.CompanyNameE.toString() : comp.CompanyNameA.toString(), comp.CompanyCode.toString()));
                                    });
                                }
                            }
                        });
                        var compCode = Number(cmbCompany.value);
                        localStorage.setItem("comCode", cmbCompany.value);
                        cmbCompany_Onchange(compCode, lang);
                        if (chkRemember.checked == true) {

                            var loginData = {
                                USER_CODE: userName,
                                USER_PASSWORD: userPassword,
                                Year: txtYear.value,
                                Language: cmbLanguage.value,
                                compCode: compCode
                            };
                            localStorage.setItem("Inv1_Login_Data", JSON.stringify(loginData));
                        }
                        //hLoggedName.innerText = user.USER_CODE;
                        GoToCompanySelect();
                    }
                    else {  // Error in user or pass or active 
                        txtUserName.style.borderColor = "red";
                        txtUserPassword.style.borderColor = "red";
                    }
                }
                else { // Error in API 
                    alert(res.ErrorMessage);
                    return;
                }
            }
        });
    }

    function LoadUserAuthentications(userId: number) {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("funcationShared", "LoadUserAuthentications"),
            data: { userId: userId },
            success: (Response) => {
            }
        });
    }

    function GoToCompanySelect() {
        $("#tblLogin").css("display", "none");
        $("#tblCompany").css("display", "block");
        (document.getElementById("btnOk") as HTMLInputElement).addEventListener("click", () => {
            let compCode = $("#cmbCompany").val();
            let braCode = $("#cmbBranch").val();
            let company = compData.filter(x => x.CompanyCode == cmbCompany.value)[0];
            let isActive = company.IsActive;
            SystemEnv = GetSystemEnvironment();
            if (isActive) {
                $.ajax({
                    type: "GET",
                    url: sys.apiUrl("I_VW_GetCompStatus", "GetStat"),
                    data: { Compcode: compCode, yr: Number(txtYear.value) },
                    async: false,
                    success: (d) => {
                        let res = d as BaseResponse;
                        if (res.IsSuccess) {
                            var CompanyStatus = res.Response as I_VW_GetCompStatus;
                            var status = CompanyStatus.CompStatus;
                            var masg = CompanyStatus.LoginMsg;
                            if (status == 0 || status == 1 || status == 2) {
                                //if (status == 1 || status == 2) {
                                MessageBox.Toastr(CompanyStatus.LoginMsg, "", (status == 2 ? ToastrTypes.warning : ToastrTypes.success));
                                window.setTimeout(function () {
                                    $.ajax({
                                        type: "GET",
                                        url: sys.apiUrl("I_Control", "GetAll"),
                                        data: { Compcode: compCode },
                                        async: false,
                                        success: (d) => {
                                            let res = d as BaseResponse;
                                            if (res.IsSuccess) {
                                                var CompanyService = res.Response as I_Control;

                                                if (CompanyService != null) {
                                                    SystemEnv.I_Control = CompanyService;
                                                    SystemEnv.CompCode = compCode;
                                                    SystemEnv.BranchCode = braCode;
                                                    SystemEnv.CompanyName = company.CompanyNameE;
                                                    SystemEnv.CompanyNameAr = company.CompanyNameA;
                                                    SystemEnv.CurrentYear = txtYear.value;
                                                    SystemEnv.IsBiLingual = true;
                                                    SystemEnv.Language = cmbLanguage.value;
                                                    SystemEnv.ScreenLanguage = cmbLanguage.value;
                                                    SystemEnv.SystemCode = 'I';
                                                    SystemEnv.SubSystemCode = 'I';
                                                    SystemEnv.UserCode = txtUserName.value;
                                                    SystemEnv.StartDate = CompanyStatus.FirstDate.substr(0, 10);
                                                    SystemEnv.EndDate = CompanyStatus.LastDate.substr(0, 10);

                                                    document.cookie = "Inv1_systemProperties=" + JSON.stringify(SystemEnv).toString() + ";expires=Fri, 31 Dec 2030 23:59:59 GMT;path=/";
                                                    OnLogged();
                                                } else {
                                                    var msg = SystemEnv.ScreenLanguage == "ar" ? "غير مصرح لك الدخول للنظام" : "You are not allowed to login";
                                                    MessageBox.Toastr(msg, "", ToastrTypes.error);

                                                }
                                            }
                                        }
                                    });
                                }, 1000);

                                //}
                                //else {
                                //    MessageBox.Showwithoutclick(CompanyStatus.LoginMsg, ""); 
                                //    //setTimeout(function ()
                                //    { 
                                //        $.ajax({
                                //            type: "GET",
                                //            url: sys.apiUrl("I_Control", "GetAll"),
                                //            data: { Compcode: compCode },
                                //            async: false,
                                //            success: (d) => {
                                //                let res = d as BaseResponse;
                                //                if (res.IsSuccess) {

                                //                    var CompanyService = res.Response as I_Control;
                                //                    if (CompanyService != null) { 
                                //                        //debugger; 
                                //                        SystemEnv.I_Control = CompanyService;
                                //                        SystemEnv.CompCode = compCode;
                                //                        SystemEnv.BranchCode = braCode;
                                //                        SystemEnv.CompanyName = company.CompanyNameE;
                                //                        SystemEnv.CompanyNameAr = company.CompanyNameA;
                                //                        SystemEnv.CurrentYear = txtYear.value;
                                //                        SystemEnv.IsBiLingual = true;
                                //                        SystemEnv.Language = cmbLanguage.value;
                                //                        SystemEnv.ScreenLanguage = cmbLanguage.value;
                                //                        SystemEnv.SystemCode = 'I';
                                //                        SystemEnv.SubSystemCode = 'I';
                                //                        SystemEnv.UserCode = txtUserName.value;
                                //                        SystemEnv.StartDate = '01/01/2021';
                                //                        SystemEnv.EndDate = '31/12/2021';
                                //                        //SystemEnv.CurrentYear = "2021";


                                //                        document.cookie = "Inv1_systemProperties=" + JSON.stringify(SystemEnv).toString() + ";expires=Fri, 31 Dec 2030 23:59:59 GMT;path=/";
                                //                        OnLogged();
                                //                    } else {
                                //                        let msg = SystemEnv.ScreenLanguage  == "ar" ? "غير مصرح لك الدخول للفصل الدراسي" : "You are not allowed to enter the semester";
                                //                        MessageBox.Show(msg, "");
                                //                    }
                                //                }
                                //            }
                                //        }); 
                                //    }
                                //    //, 1000);
                                //}

                            }
                            else /*if (status == 3)*/ {
                                MessageBox.Toastr(CompanyStatus.LoginMsg, "", ToastrTypes.error, function () {
                                    window.setTimeout(function () {
                                        window.location.href = "/Login/LoginIndex";
                                    }, 700);
                                });
                            }
                        }
                    }
                });
            }
            else {
                let mg = SystemEnv.ScreenLanguage == "ar" ? "هذه الشركة غير متاحة" : "This company is not Active";
                MessageBox.Toastr(mg, "", ToastrTypes.error);
            }
        });
    }

    function OnLogged() {
        // set api session values 
        APiSession.Session.BranchCode = SystemEnv.BranchCode;
        APiSession.Session.CompCode = SystemEnv.CompCode;
        APiSession.Session.SystemCode = SystemEnv.SystemCode;
        APiSession.Session.SubSystemCode = SystemEnv.SubSystemCode;
        APiSession.Session.ScreenLanguage = SystemEnv.ScreenLanguage;
        APiSession.Session.UserCode = SystemEnv.UserCode;
        APiSession.Session.CurrentYear = $("#txtYear").val();
        $.ajax({
            url: OnLoggedUrl,
            success: function (result) {
                var obj = result.result;
                window.location.href = obj.url;
            }
        });

    }

    function GoBack() {
        $("#divLogin").css("display", "block");
        $("#divCompanies").css("display", "none");
    }

    function cmbCompany_Onchange(compCode, lang) {
        Ajax.Callsync({
            type: "GET",
            url: sys.apiUrl("SystemTools", "GetBranchsUser"),
            data: { compCode: compCode, userCode: txtUserName.value },
            success: function (d) {
                var res = d;
                if (res.IsSuccess == true) {
                    var result = res.Response;
                    cmbBranch.innerHTML = "";
                    result.forEach(function (bra, index) {
                        var text = bra.BRA_CODE.toString() + "- " + (lang == "en" ? bra.BRA_DESCE : bra.BRA_DESC);
                        cmbBranch.add(new Option(text, bra.BRA_CODE.toString()));
                    });
                }
            }
        });
    }

    function Display(model: ConnectionObj) {
        DocumentActions.RenderFromModel(model);
    }

    export function InitializeGrid() {
        GridConnection.ElementName = "GridConnection";
        //GridConnection.PrimaryKey = "BookId";
        GridConnection.Editing = true;
        GridConnection.Paging = true;
        GridConnection.Sorting = true;
        GridConnection.PageSize = 10;
        GridConnection.ConfirmDeleteing = true;
        GridConnection.InsertionMode = JsGridInsertionMode.Binding;
        GridConnection.OnRowSelected = () => { };
        GridConnection.Columns = [
            {
                title: "الخادم", css: "ColumPadding", name: "ServerName", width: "170px"
            },
            {
                title: "قاعدة البيانات", css: "ColumPadding", name: "InitialCatalog"
            },
            {
                title: "اسم المستخدم", css: "ColumPadding", name: "DbUserName"
            },
            {
                title: "كلمة المرور", css: "ColumPadding", name: "DbPassword"
            },
            {
                title: "Integrated Security", type: "checkbox", css: "ColumPadding", name: "IntegratedSecurity"
            },
            {
                title: "ConnectionNumber", css: "ColumPadding hide", name: "ConnectionNumber", headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("text", GridInputClassName, " ", " ", "ConnectionNumber", " ");
                    txt.disabled = false;
                    txt.id = "hd_ConnectionNumber";
                    return HeaderTemplate("ConnectionNumber", txt);
                }
            },
            {
                itemTemplate: (s: string, item: ConnectionObj): HTMLButtonElement => {
                    let btn: HTMLButtonElement = DocumentActions.CreateElement<HTMLButtonElement>("button");
                    btn.innerHTML = "<i class='glyphicon glyphicon-edit'></i>";
                    btn.className = "btn btn-warning";
                    btn.name = Connections.indexOf(item).toString();
                    btn.id = "btnEditGrid";
                    btn.value = item.ConnectionNumber.toString();
                    btn.onclick = (e) => {
                        GetConectionFromGrid(Number(btn.value));
                    };
                    return btn;
                }
            },
            {
                css: JsGridHeaderCenter,
                itemTemplate: (s: string, item: ConnectionObj): HTMLButtonElement => {
                    let btn: HTMLButtonElement = DocumentActions.CreateElement<HTMLButtonElement>("button");
                    btn.innerHTML = "<i class='glyphicon glyphicon-remove'></i>";
                    btn.className = "btn btn-danger";
                    btn.value = item.ConnectionNumber.toString();
                    btn.id = "btnRemoveGrid";
                    btn.onclick = (e) => {
                        RemoveConection(Number(btn.value));
                    };
                    return btn;
                }
            }
        ];
        GridConnection.Bind();
    }

    $('#Enter').on('click', function () {
        let datbase = $('#Database').val();
        let url = $('#GetAPIUrl').val();
        if (IsNullOrEmpty(datbase)) {
            MessageBox.Toastr("من فضلك اختر قاعدة البيانات", "خطأ", ToastrTypes.error)
            return;
        }

        Connection = Connections.filter(x => x.InitialCatalog == datbase)[0];
        SaveConn(url);
    });

    function SaveConn(url: string) {
        Ajax.Callsync({
            type: "GET",
            url: sys.apiUrl("DynamicConnection", "LoginWithConnection"),
            data: { data: JSON.stringify(Connection), url: url },
            success: function (result) {
                if (result) {
                    //document.cookie = "username=" + JSON.stringify(Connection);

                    $('#DataBaseLogin').hide();
                    $('#UserLoginInfo').show();
                }
            }
        });
    }

    function GetDatabase(val) {
        Ajax.Callsync({
            type: "GET",
            url: sys.apiUrl("DynamicConnection", "GetDatabasesName"),
            data: { serverName: val },
            success: function (result) {
                debugger
                if (result.status) {
                    Databases = result.data as Array<string>;
                    DocumentActions.FillCombowithdefultListOneValue(Databases, InitialCatalog, "", "", "اختر قاعدة البيانات");
                } else {
                    MessageBox.Toastr(result.ms, "Error", ToastrTypes.error);
                }
            }
        });
    }

    GetServers();
    function GetServers() {
        Ajax.Callsync({
            type: "GET",
            url: sys.apiUrl("DynamicConnection", "GetServersName"),
            success: function (result) {
                if (result.status) {
                    Servers = result.data as Array<string>;
                    DocumentActions.FillCombowithdefultListOneValue(Servers, ServerName, "", "", "اختر الخادم");
                } else {
                    MessageBox.Toastr(result.ms, "Error", ToastrTypes.error);
                }
            }
        });

        //$.ajax({
        //    url: "/ClientTools/GetServersName",
        //    success: function (result) {
        //        Servers = JSON.parse(result) as Array<string>;
        //        DocumentActions.FillCombowithdefultListOneValue(Servers, ServerName, "", "", "اختر الخادم");
        //    }
        //});

        // As with JSON, use the Fetch API & ES6
        //fetch('/Connectionstrings.json').then(response => response.text()).then(data => {
        //    debugger
        //    if (!IsNullOrEmpty(data)) {
        //        Connectionstrings = JSON.parse(data);
        //        Connectionstrings.push(Connectionstrings[0]);
        //        let usersjson = JSON.stringify(Connectionstrings);
        //        //fs.writeFileSync("users.json", usersjson, "utf-8");


        //        //let TranTypeArr: { value: number, text: string }[] = [
        //        //    { "value": 0, "text": language == "ar" ? "اختر النوع" : "CaptureType" },
        //        //    { "value": 1, "text": language == "ar" ? "نقدي" : "Cash" },
        //        //    { "value": 2, "text": language == "ar" ? "شيك" : "Check" },
        //        //];

        //        //DocumentActions.FillCombo(TranTypeArr, TranType, "value", "text");
        //    }
        //});

        //var text = fs.readFileSync("./mytext.txt").toString('utf-8');

    }

    GetDatabsesConn();
    function GetDatabsesConn() {
        Ajax.Callsync({
            type: "GET",
            url: sys.apiUrl("DynamicConnection", "GetDatabsesJson"),
            success: function (result) {
                Connections = JSON.parse(result) as Array<ConnectionObj>;
                GridConnection.DataSource = Connections;
                GridConnection.Bind();
                SetDatabasesFromConnections(Connections)
            }
        });
    }

    $('#saveConnectionString').on('click', function () {
        let DataSource = $('#ServerName').val(),
            InitialCatalog = $('#InitialCatalog').val(),
            UserName = $('#DbUserName').val(),
            mode = $('#mode').val(),
            Password = $('#DbPassword').val(),
            IntegratedSecurity = $('#IntegratedSecurity').is(":checked");

        Connection.ServerName = DataSource;
        Connection.InitialCatalog = InitialCatalog;
        Connection.singleDb = InitialCatalog;
        Connection.IntegratedSecurity = IntegratedSecurity;
        Connection.DbUserName = UserName;
        Connection.DbPassword = Password;

        if (mode == "add") {
            try {
                Connection.ConnectionNumber = Connections.length + 1;
            } catch (e) {
                Connection.ConnectionNumber = 1;
            }
        }

        Ajax.Callsync({
            type: "GET",
            data: { data: JSON.stringify(Connection), mode: mode },
            url: sys.apiUrl("DynamicConnection", "SaveConnection"),
            success: function (result) {
                ResetGrid();

                Connections = JSON.parse(result) as Array<ConnectionObj>;
                GridConnection.DataSource = Connections;
                GridConnection.Bind();

                SetDatabasesFromConnections(Connections)
                $('#AddDatabses').modal("hide");
            }
        });

        //Connections.unshift(Connection);
        //GridConnection.DataSource = Connections;
        //GridConnection.Bind();

    })

    $('#Advanced').on('click', function () {
        Disabled(false);

        $('#mode').val('add');
        $('#AddDatabses').modal();
        $('#GridConnection').show();
        $('#AddDatabses select').select2().trigger('change');
        $('#connectionString').text('');
    })

    $('#testConnectionString').on('click', function () {
        if (IsNullOrEmpty(connection))
            return;

        Ajax.Callsync({
            type: "Get",
            data: { connectionString: connection },
            url: sys.apiUrl("DynamicConnection", "TestConnectionString"),
            success: function (result) {
                if (result) {
                    MessageBox.Toastr("Connection Successed", "Success", ToastrTypes.success);
                    TestConn = result;
                }
                else {
                    MessageBox.Toastr("Connection Failure", "Error", ToastrTypes.error)
                    TestConn = result;
                }
            }
        });
    })

    $('#ServerName,#InitialCatalog,#DbUserName,#DbPassword,#IntegratedSecurity').on('change', function () {
        let DataSource = $('#ServerName').val(),
            InitialCatalog = $('#InitialCatalog').val(),
            UserName = $('#DbUserName').val(),
            Password = $('#DbPassword').val(),
            IntegratedSecurity = $('#IntegratedSecurity').is(":checked");

        GetConnection(DataSource, InitialCatalog, IntegratedSecurity, UserName, Password);
    });

    var connection = "";
    function GetConnection(DataSource: string, InitialCatalog: string, IntegratedSecurity: boolean, UserID: string, Password: string) {
        if (!IsNullOrEmpty(DataSource))
            connection = "Data Source =" + DataSource + ";";
        if (!IsNullOrEmpty(InitialCatalog))
            connection += "Initial Catalog = " + InitialCatalog + "; Integrated Security = " + IntegratedSecurity + ";";
        if (!IsNullOrEmpty(UserID))
            connection += " User ID = " + UserID + ";";
        if (!IsNullOrEmpty(Password))
            connection += "Password = " + Password + ";";

        $('#connectionString').text(connection);
    }

    function GetConectionFromGrid(value: number) {
        $('#mode').val('edit');

        Connection = Connections.filter(x => x.ConnectionNumber == value)[0];
        let Index = Connections.indexOf(Connection);

        Connections.splice(Index, 1);
        Display(Connection);

        GetConnection(Connection.ServerName, Connection.InitialCatalog, Connection.IntegratedSecurity, Connection.DbUserName, Connection.DbPassword)
        $('#AddDatabses').modal();
    }

    //$('#AddDatabses').on('hidden.bs.modal', function () {
    //    Connection = DocumentActions.AssignToModel<ConnectionObj>(Connection);
    //    let mode = $('#mode').val();

    //    if (TestConn) {
    //        Connections.unshift(Connection);
    //        GridConnection.DataSource = Connections;
    //        GridConnection.Bind();
    //    }
    //    else if (mode != 'add')
    //        MessageBox.Toastr("يجب التاكد من صحة الاتصال اولاً", "خطأ", ToastrTypes.error)
    //})

    function Disabled(clear: boolean) {
        DocumentActions.allElements(false, true, Connection);
    }

    function SetDatabasesFromConnections(connections: Array<ConnectionObj>) {
        if (connections != null) {
            let Databases = connections.map(function (a) { return a.InitialCatalog; }) as Array<string>;
            DocumentActions.FillCombowithdefultListOneValue(Databases, Database, "", "", "اختر قاعدة البيانات");
        }
    }

    function RemoveConection(connectionNumber) {
        Ajax.Callsync({
            type: "GET",
            data: { ConnectionNumber: connectionNumber },
            url: sys.apiUrl("DynamicConnection", "RemoveConection"),
            success: function (result) {
                Connections = JSON.parse(result) as Array<ConnectionObj>;
                GridConnection.DataSource = Connections;
                GridConnection.Bind();
                SetDatabasesFromConnections(Connections)
            }
        });
    }

    function ResetGrid() {
        Connections = new Array<ConnectionObj>();
        GridConnection.DataSource = Connections;
        GridConnection.Bind();
    }
}
