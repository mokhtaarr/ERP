$(document).ready(function () {
    SharedButtons.OnLoad();
    MSBoxBank.InitalizeComponent();
});
var MSBoxBank;
(function (MSBoxBank) {
    var Resource = GetResourceList("");
    $('#headertop1').addClass('display_none');
    $('#headertop2').removeClass('display_none');
    $('#headerTitle').text(Resource.Box);
    var sys = new SystemTools();
    var language = sys.SysSession.CurrentEnvironment.ScreenLanguage;
    var SysSession = GetSystemSession();
    var compCode = SysSession.CurrentEnvironment.CompCode;
    var UserCode = SysSession.CurrentEnvironment.UserCode;
    var Token = "HGFD-" + SysSession.CurrentEnvironment.Token;
    var Model = new MS_BoxBank();
    var BoxBanks = new Array();
    var AccountChart = new Array();
    var BoxCurrencies = new Array();
    var BoxCurrency = new MS_BoxCurrency();
    var Currencies = new Array();
    var Users = new Array();
    var BoxUsers = new Array();
    var BoxUser = new Ms_BoxUsers();
    var HeaderAndDetails = new BoxBankHeaderAndDetails();
    // Select Options
    var element;
    var UserId;
    var AccountId;
    //////////////// Details ///////////////////
    var AccountDebitFixed;
    var ObjectId = 0;
    var StatusFlag;
    var Success;
    var hasNodes;
    var flag = true;
    var divUsersGrid = new JsGrid();
    var divCurrencyGrid = new JsGrid();
    var GridInputClassName = "form-control gridIput";
    function InitalizeComponent() {
        localStorage.setItem("TableName", "MS_BoxBank");
        NavigateModule.InitalizeComponent();
        SharedButtons.compcode = Number(SysSession.CurrentEnvironment.CompCode);
        SharedWork.OnNavigate = Navigate;
        SharedButtons.AddAction(function () {
            btnAdd_onclick();
        });
        SharedButtons.DeleteAction(function () { btnDelete_onclick(); });
        SharedButtons.EditAction(function () { btnEdit_onclick(); });
        SharedButtons.UndoAction(function () {
            Undo();
            if (ObjectId == 0)
                SharedWork.SwitchModes(ScreenModes.Start);
        });
        SharedButtons.SaveAction(function () {
            if (SharedWork.CurrentMode == ScreenModes.Add || SharedWork.CurrentMode == ScreenModes.Edit) {
                btnsave_onClick();
            }
            else if (SharedWork.CurrentMode == ScreenModes.Query) {
                WorningMessage("يجب اختيار وضع التعديل او الاضافة اولا ", "Please Select Save Or Edit Mode First");
                return;
            }
        });
        InitalizeControls();
        InitalizeEvents();
        IntialDropdown();
        GetUseItemTax();
        GetAll();
        InitializeCurancyGrid();
        InitializeUsersGrid();
    }
    MSBoxBank.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        SharedButtons.btnSearch = document.getElementById("btnMS_BoxBankSearch");
        UserId = document.getElementById("UserCode");
        AccountId = document.getElementById("AccountId");
    }
    function InitalizeEvents() {
        SharedButtons.btnSearch.onclick = btnSearch_onclick;
        SharedButtons.btnRefrash2.onclick = Refrash;
        AccountId.onchange = function () {
        };
    }
    function GetAll() {
        Disabled(false);
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("MS_BoxBank", "GetAll"),
            success: function (d) {
                var result = d;
                if (result.IsSuccess) {
                    BoxBanks = result.Response;
                    //console.log(BoxBanks)
                }
            }
        });
    }
    function GetByID(Id) {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("MS_BoxBank", "GetById"),
            data: { id: Id },
            success: function (d) {
                var result = d;
                if (result.IsSuccess) {
                    var res = result.Response;
                    Display(res);
                    SharedWork.SwitchModes(ScreenModes.Query);
                }
                else
                    MessageBox.Toastr(Resource.Error, Resource.Error, ToastrTypes.error);
            }
        });
    }
    function Assign() {
        HeaderAndDetails.BoxBank = DocumentActions.AssignToModel(Model);
        HeaderAndDetails.BoxUsers = BoxUsers;
        HeaderAndDetails.BoxCurrency = BoxCurrencies;
        if (StatusFlag == "i") {
            Model.CreatedAt = DateTimeFormat(Date().toString());
            Model.CreatedBy = SysSession.CurrentEnvironment.UserCode;
            Insert();
        }
        if (StatusFlag == "u") {
            Model.BoxId = ObjectId;
            Model.UpdateAt = DateTimeFormat(Date().toString());
            Model.UpdateBy = SysSession.CurrentEnvironment.UserCode;
            Update();
        }
        ObjectId = Model.BoxId;
        GetAll();
        return true;
    }
    function Save() {
        if (DocumentActions.CheckCode(BoxBanks, DocumentActions.GetElementByName("BoxCode").value, "BoxCode") == false && StatusFlag == "i") {
            MessageBox.Toastr(Resource.CodeCannotDuplicated, Resource.Error, ToastrTypes.error);
        }
        else {
            Assign();
            if (Success) {
                Disabled(false);
                Success = false;
                SharedWork.SwitchModes(ScreenModes.Query);
            }
        }
    }
    function Insert() {
        $("#MessageBoxDialog").modal("hide");
        Ajax.Callsync({
            type: "POST",
            url: sys.apiUrl("MS_BoxBank", "Insert"),
            data: JSON.stringify(HeaderAndDetails),
            success: function (Response) {
                var result = Response;
                if (result.IsSuccess) {
                    HeaderAndDetails = result.Response;
                    ObjectId = HeaderAndDetails.BoxBank.BoxId;
                    Success = true;
                }
                else {
                    MessageBox.Toastr(Resource.Error, Resource.Error, ToastrTypes.error);
                    Success = false;
                }
            }
        });
    }
    function Update() {
        $("#MessageBoxDialog").modal("hide");
        Ajax.Callsync({
            type: "POST",
            url: sys.apiUrl("MS_BoxBank", "Update"),
            data: JSON.stringify(HeaderAndDetails),
            success: function (Response) {
                var result = Response;
                if (result.IsSuccess) {
                    HeaderAndDetails = result.Response;
                    ObjectId = HeaderAndDetails.BoxBank.BoxId;
                    Success = true;
                }
                else {
                    MessageBox.Toastr(Resource.Error, Resource.Error, ToastrTypes.error);
                    Success = false;
                }
            }
        });
    }
    function Delete() {
        $("#MessageBoxDialog").modal("hide");
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("MS_BoxBank", "Delete"),
            data: { id: Model.BoxId },
            success: function (result) {
                if (result) {
                    Success = true;
                    GetAll();
                    Disabled(result);
                    $('select').val('null').select2().trigger('change');
                }
                else {
                    MessageBox.Toastr(Resource.Error, Resource.Error, ToastrTypes.error);
                    Success = false;
                }
            }
        });
    }
    function btnAdd_onclick() {
        StatusFlag = 'i';
        RemoveDisabled(true);
        $('select option:first-child').val('null').attr("selected", 'selected');
        ClearGrids();
    }
    function btnEdit_onclick() {
        if (ObjectId == 0) {
            MessageBox.Toastr(Resource.PleaseSelectItem, Resource.Error, ToastrTypes.error);
        }
        else {
            RemoveDisabled(false);
            element = DocumentActions.GetElementByName("BoxCode");
            element.disabled = true;
            StatusFlag = 'u';
        }
    }
    function btnsave_onClick() {
        if (!Validation())
            return;
        Save();
    }
    function btnDelete_onclick() {
        StatusFlag == "d";
        if (ObjectId == 0) {
            MessageBox.Toastr(Resource.PleaseSelectItem, Resource.Error, ToastrTypes.error);
        }
        else {
            Delete();
        }
    }
    function Validation() {
        if (DocumentActions.GetElementByName("BoxCode").value == "") {
            MessageBox.Toastr(Resource.PleaseEnterCode, Resource.Error, ToastrTypes.error);
            flag = false;
        }
        else if (DocumentActions.GetElementByName("DESCA").value == "") {
            MessageBox.Toastr(Resource.PleaseEnterNameArabic, Resource.Error, ToastrTypes.error);
            flag = false;
        }
        else
            flag = true;
        return flag;
    }
    function Navigate() {
        Model = BoxBanks[SharedWork.PageIndex - 1];
        ObjectId = Model.BoxId;
        GetByID(ObjectId);
    }
    MSBoxBank.Navigate = Navigate;
    function Display(model) {
        Model = model.BoxBank;
        DocumentActions.RenderFromModel(Model);
        BoxCurrencies = model.BoxCurrency;
        BoxUsers = model.BoxUsers;
        BindGrid();
        ObjectId = Number(Model.BoxId);
    }
    function BindGrid() {
        for (var i = 0; i < BoxUsers.length; i++) {
            var user = Users.filter(function (x) { return x.UserId == BoxUsers[i].UserId; })[0];
            if (user != null) {
                BoxUsers[i].USER_CODE = user.UserCode;
                BoxUsers[i].USER_NAME = user.USER_NAME;
                BoxUsers[i].FirstName = user.FirstName;
            }
        }
        for (var i = 0; i < BoxCurrencies.length; i++) {
            var Currency = Currencies.filter(function (x) { return x.CurrencyId == BoxCurrencies[i].CurrencyId; })[0];
            if (Currency != null) {
                BoxCurrencies[i].Rate = Currency.Rate.toFixed(3);
                BoxCurrencies[i].CurrencyCode = Currency.CurrencyCode;
                BoxCurrencies[i].CurrencyDescA = Currency.CurrencyDescA;
                BoxCurrencies[i].CurrencyDescE = Currency.CurrencyDescE;
            }
        }
        divUsersGrid.DataSource = BoxUsers;
        divUsersGrid.Bind();
        divCurrencyGrid.DataSource = BoxCurrencies;
        divCurrencyGrid.Bind();
    }
    function ClearGrids() {
        BoxUsers = new Array();
        BoxCurrencies = new Array();
        divUsersGrid.DataSource = BoxUsers;
        divUsersGrid.Bind();
        divCurrencyGrid.DataSource = BoxCurrencies;
        divCurrencyGrid.Bind();
    }
    function Undo() {
        Disabled(false);
        Success = false;
        if (ObjectId != 0) {
            GetByID(ObjectId);
        }
    }
    function Disabled(clear) {
        DocumentActions.allElements(true, clear, Model);
    }
    function RemoveDisabled(clear) {
        DocumentActions.allElements(false, clear, Model);
    }
    function GetAllAccountChart() {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("funcationShared", "GetAllSubAccountChart"),
            success: function (Response) {
                var result = Response;
                if (result.IsSuccess) {
                    AccountChart = result.Response;
                    //console.log(AccountChart);
                    DocumentActions.FillCombowithdefult(AccountChart, AccountId, "AccountId", (language = "" ? "AccountNameA" : "AccountNameA"), Resource.Nothing);
                }
            }
        });
        return AccountChart;
    }
    function GetCurrencies() {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("funcationShared", "GetCurrencies"),
            success: function (Response) {
                var result = Response;
                if (result.IsSuccess) {
                    Currencies = result.Response;
                }
            }
        });
        return Currencies;
    }
    function GetUsers() {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("funcationShared", "ReturnAllUsers"),
            data: { CompCode: compCode, Token: Token, UserCode: UserCode },
            success: function (Response) {
                var result = Response;
                if (result.IsSuccess) {
                    Users = result.Response;
                    //console.log(Users)
                    //DocumentActions.FillCombowithdefult(Users, UserId, "UserCode", "UserName", Resource.Users);
                }
            }
        });
        return Users;
    }
    function IntialDropdown() {
        AccountChart = GetAllAccountChart();
        Currencies = GetCurrencies();
        Users = GetUsers();
    }
    //استخدام الضرائب
    function GetUseItemTax() {
        var UseItemTaxArr = [
            //{ "value": null, "text": "غير خاضع" },
            { "value": 1, "text": "ضرائب الأصناف" },
            { "value": 2, "text": "ضرائب المستند" },
            { "value": 3, "text": "ضريبة الصنف 1" },
            { "value": 4, "text": "ضريبة الصنف 2" },
            { "value": 5, "text": "ضريبة الصنف 3" },
        ];
        //DocumentActions.FillCombowithdefult(UseItemTaxArr, UseItemTax, "value", "text", "غير خاضع");
    }
    /////////////////////////////////////////// Js Grid /////////////////////////////////
    /////////// Curancy
    function AddCurancyInGrid() {
        BoxCurrency = new MS_BoxCurrency();
        var BoxCurrencyId = $("#hd_BoxCurrencyId").val().trim(), CurrencyId = $("#hd_CurrencyId").val().trim(), CurrencyCode = $("#hd_CurrencyCode").val(), AccountId = $("#hd_AccountId").val().trim(), BoxId = $("#hd_BoxId").val().trim(), CurrencyDescA = $("#hd_CurrencyDescA").val().trim(), CurrencyDescE = $("#hd_CurrencyDescE").val().trim(), Rate = $("#hd_Rate").val().trim();
        if (BoxCurrencyId == "")
            BoxCurrency.BoxCurrencyId = 0;
        else
            BoxCurrency.BoxCurrencyId = BoxCurrencyId;
        if (BoxId == "")
            BoxCurrency.BoxId = 0;
        else
            BoxCurrency.BoxId = BoxId;
        if (IsNullOrEmpty(CurrencyCode) == true || CurrencyCode == "null") {
            MessageBox.Toastr(Resource.PleaseEnterCode, Resource.Error, ToastrTypes.error);
            return;
        }
        else
            BoxCurrency.CurrencyId = CurrencyId;
        if (AccountId == "")
            BoxCurrency.AccountId = null;
        else
            BoxCurrency.AccountId = $('#AccountId').val();
        BoxCurrency.CurrencyDescA = CurrencyDescA;
        BoxCurrency.CurrencyCode = CurrencyCode;
        BoxCurrency.CurrencyDescE = CurrencyDescE;
        BoxCurrency.Rate = Rate;
        if ($('#hd_Flag').val().trim() == "u")
            BoxCurrency.StatusFlag = "u";
        else
            BoxCurrency.StatusFlag = "i";
        if (DocumentActions.CheckCode(BoxCurrencies, BoxCurrency.CurrencyId.toString(), "CurrencyId") == false && BoxCurrency.StatusFlag == "i") {
            MessageBox.Toastr(Resource.CodeCannotDuplicated, Resource.Error, ToastrTypes.error);
        }
        else {
            BoxCurrencies.unshift(BoxCurrency);
            divCurrencyGrid.DataSource = BoxCurrencies;
            divCurrencyGrid.Bind();
        }
        return;
    }
    function InitializeCurancyGrid() {
        divCurrencyGrid.ElementName = "divCurrencyGrid";
        divCurrencyGrid.PrimaryKey = "BoxCurrencyId";
        divCurrencyGrid.Inserting = true;
        divCurrencyGrid.Editing = true;
        divCurrencyGrid.ConfirmDeleteing = true;
        divCurrencyGrid.InsertionMode = JsGridInsertionMode.Binding;
        divCurrencyGrid.OnItemInserting = function () { };
        divCurrencyGrid.OnItemUpdating = function () { };
        divCurrencyGrid.OnItemDeleting = function () { };
        divCurrencyGrid.Columns = [
            {
                title: "#", name: "btnAddItem", visible: true, width: "30px",
                headerTemplate: function () {
                    var btn = DocumentActions.CreateElement("button");
                    btn.className = TransparentButton + " editable addable ";
                    btn.type = "button";
                    btn.innerHTML = "<span class='fa fa-plus'></span>";
                    btn.id = "btnAddItemGrid";
                    btn.onclick = function (e) {
                        if (SharedWork.CurrentMode == ScreenModes.Query || SharedWork.CurrentMode == ScreenModes.Start || SharedWork.CurrentMode == ScreenModes.NoData) {
                            WorningMessage("يجب اختيار وضع التعديل اولا ", "Please Select Edit Mode First");
                            return;
                        }
                        AddCurancyInGrid();
                    };
                    return btn;
                },
                itemTemplate: function (s, item) {
                    var btn = DocumentActions.CreateElement("button");
                    btn.innerHTML = "<i class='fas fa-times'></i>";
                    btn.className = TransparentButton + "  red_Delete_Cotnrol editable";
                    btn.type = "button";
                    btn.name = BoxCurrencies.indexOf(item).toString();
                    btn.id = "btnRemoveItemGrid";
                    btn.onclick = function (e) {
                        var index = Number(e.currentTarget.name);
                        BoxCurrencies[index].StatusFlag = "d";
                        BoxCurrencies.push(BoxCurrencies[index]);
                        BoxCurrencies.splice(index, 1);
                        divCurrencyGrid.Bind();
                    };
                    return btn;
                }
            },
            {
                css: JsGridHeaderCenter, itemTemplate: function (s, item) {
                    var btn = DocumentActions.CreateElement("button");
                    btn.innerHTML = "<i class='fa fa-edit'></i>";
                    btn.className = TransparentButton + " " + "emptrainingedit " + "green_edit_control editable";
                    btn.type = "button";
                    btn.name = BoxCurrencies.indexOf(item).toString();
                    btn.id = "btnUpdateItemGrid";
                    btn.onclick = function (e) {
                        var index = Number(e.currentTarget.name);
                        BoxCurrencies.splice(index, 1);
                        divCurrencyGrid.DataSource = BoxCurrencies;
                        divCurrencyGrid.Bind();
                        if (item.BoxCurrencyId != null)
                            DocumentActions.FillInputText("hd_BoxCurrencyId", item.BoxCurrencyId.toString());
                        if (item.CurrencyId != null)
                            DocumentActions.FillInputText("hd_CurrencyId", item.CurrencyId.toString());
                        if (item.CurrencyCode != null)
                            DocumentActions.SelectDrobInGrid("hd_CurrencyCode", item.CurrencyCode.toString());
                        if (item.BoxId != null)
                            DocumentActions.FillInputText("hd_BoxId", item.BoxId.toString());
                        if (item.AccountId != null)
                            DocumentActions.FillInputText("hd_AccountId", item.AccountId.toString());
                        if (item.CurrencyDescA != null)
                            DocumentActions.FillInputText("hd_CurrencyDescA", item.CurrencyDescA.toString());
                        if (item.CurrencyDescE != null)
                            DocumentActions.FillInputText("hd_CurrencyDescE", item.CurrencyDescE.toString());
                        if (item.Rate != null)
                            DocumentActions.FillInputText("hd_Rate", item.Rate.toString());
                        DocumentActions.FillInputText("hd_Flag", "u");
                    };
                    return btn;
                }
            },
            {
                title: Resource.Code, css: "ColumPadding", name: "CurrencyCode", headerTemplate: function () {
                    var txt = CreateDropdownListWithCode(Currencies, "CurrencyDescA", "CurrencyDescE", "CurrencyCode", "CurrencyCode", true);
                    txt.id = "hd_CurrencyCode";
                    txt.onchange = function (e) {
                        FillCurrancyRow(Number($(e.target).val()));
                    };
                    return HeaderTemplateDropdownList(Resource.Code, txt);
                }
            },
            {
                title: Resource.Name_Arabic, css: "ColumPadding", name: "CurrencyDescA", headerTemplate: function () {
                    var txt = CreateElement("text", GridInputClassName, " ", " ", "CurrencyDescA", " ");
                    txt.id = "hd_CurrencyDescA";
                    txt.disabled = true;
                    return HeaderTemplate(Resource.Name_Arabic, txt);
                }
            },
            {
                title: Resource.Name_English, css: "ColumPadding", name: "CurrencyDescE", headerTemplate: function () {
                    var txt = CreateElement("text", GridInputClassName, " ", " ", "CurrencyDescE", " ");
                    txt.id = "hd_CurrencyDescE";
                    txt.disabled = true;
                    return HeaderTemplate(Resource.Name_English, txt);
                }
            },
            {
                title: Resource.Rate, css: "ColumPadding", name: "Rate", headerTemplate: function () {
                    var txt = CreateElement("number", GridInputClassName, " ", " ", "Rate", " ");
                    txt.id = "hd_Rate";
                    txt.disabled = true;
                    return HeaderTemplate(Resource.Rate, txt);
                }
            },
            {
                title: "Flag", css: "ColumPadding display_none", name: "Flag", width: "1%", headerTemplate: function () {
                    var txt = CreateElement("text", GridInputClassName, " ", " ", "Flag", " ");
                    txt.disabled = false;
                    txt.id = "hd_Flag";
                    return HeaderTemplate("Flag", txt);
                }
            },
            {
                title: "BoxId", css: "ColumPadding display_none", name: "BoxId", width: "1%", headerTemplate: function () {
                    var txt = CreateElement("text", GridInputClassName, "", " ", "BoxId", " ");
                    txt.disabled = false;
                    txt.id = "hd_BoxId";
                    return HeaderTemplate("BoxId", txt);
                }
            },
            {
                title: "AccountId", css: "ColumPadding display_none", name: "AccountId", width: "1%", headerTemplate: function () {
                    var txt = CreateElement("text", GridInputClassName, "", " ", "AccountId", " ");
                    txt.disabled = false;
                    txt.id = "hd_AccountId";
                    return HeaderTemplate("AccountId", txt);
                }
            },
            {
                title: "BoxCurrencyId", css: "ColumPadding display_none", name: "BoxCurrencyId", width: "1%", headerTemplate: function () {
                    var txt = CreateElement("text", GridInputClassName, "", " ", "BoxCurrencyId", " ");
                    txt.disabled = false;
                    txt.id = "hd_BoxCurrencyId";
                    return HeaderTemplate("BoxCurrencyId", txt);
                }
            },
            {
                title: "CurrencyId", css: "ColumPadding display_none", name: "CurrencyId", width: "1%", headerTemplate: function () {
                    var txt = CreateElement("text", GridInputClassName, "", " ", "CurrencyId", " ");
                    txt.disabled = false;
                    txt.id = "hd_CurrencyId";
                    return HeaderTemplate("CurrencyId", txt);
                }
            },
        ];
        divCurrencyGrid.Bind();
    }
    function FillCurrancyRow(code) {
        if (isNaN(code)) {
            $('#hd_CurrencyCode').val('');
            $('#hd_CurrencyId').val('');
            $('#hd_CurrencyDescA').val('');
            $('#hd_CurrencyDescE').val('');
            $('#hd_Rate').val('');
        }
        else {
            var Currency = Currencies.filter(function (x) { return x.CurrencyCode == code; })[0];
            $('#hd_CurrencyCode').val(Currency.CurrencyCode);
            $('#hd_CurrencyId').val(Currency.CurrencyId);
            $('#hd_CurrencyDescA').val(Currency.CurrencyDescA);
            $('#hd_CurrencyDescE').val(Currency.CurrencyDescE);
            $('#hd_Rate').val(Currency.Rate.toFixed(3));
        }
    }
    ////////// BoxUsers 
    function AddUsersInGrid() {
        BoxUser = new Ms_BoxUsers();
        var UserId = $("#hd_UserId").val().trim(), USER_CODE = $("#hd_USER_CODE").val(), BoxUsersId = $("#hd_BoxUsersId").val().trim(), BoxId = $("#hd_BoxIdUser").val().trim(), USER_NAME = $("#hd_USER_NAME").val(), FirstName = $("#hd_FirstName").val().trim();
        if (BoxUsersId == "")
            BoxUser.BoxUsersId = 0;
        else
            BoxUser.BoxUsersId = BoxUsersId;
        if (IsNullOrEmpty(UserId) == true || UserId == "null") {
            MessageBox.Toastr(Resource.PleaseEnterCode, Resource.Error, ToastrTypes.error);
            return;
        }
        else
            BoxUser.UserId = UserId;
        if (BoxId == "")
            BoxUser.BoxId = null;
        else
            BoxUser.BoxId = BoxId;
        BoxUser.USER_NAME = USER_NAME;
        BoxUser.FirstName = FirstName;
        BoxUser.USER_CODE = USER_CODE;
        if ($('#hd_FlagUser').val().trim() == "u")
            BoxUser.StatusFlag = "u";
        else
            BoxUser.StatusFlag = "i";
        if (DocumentActions.CheckCode(BoxUsers, BoxUser.UserId.toString(), "UserId") == false && BoxUser.StatusFlag == "i") {
            MessageBox.Toastr(Resource.CodeCannotDuplicated, Resource.Error, ToastrTypes.error);
        }
        else {
            BoxUsers.unshift(BoxUser);
            divUsersGrid.DataSource = BoxUsers;
            divUsersGrid.Bind();
        }
        return;
    }
    function InitializeUsersGrid() {
        divUsersGrid.ElementName = "divUsersGrid";
        divUsersGrid.PrimaryKey = "BoxUsersId";
        divUsersGrid.Inserting = true;
        divUsersGrid.Editing = true;
        divUsersGrid.ConfirmDeleteing = true;
        divUsersGrid.InsertionMode = JsGridInsertionMode.Binding;
        divUsersGrid.OnItemInserting = function () { };
        divUsersGrid.OnItemUpdating = function () { };
        divUsersGrid.OnItemDeleting = function () { };
        divUsersGrid.Columns = [
            {
                title: "#", name: "btnAddItem", visible: true, width: "30px", headerTemplate: function () {
                    var btn = DocumentActions.CreateElement("button");
                    btn.className = TransparentButton + " editable addable ";
                    btn.type = "button";
                    btn.innerHTML = "<span class='fa fa-plus'></span>";
                    btn.id = "btnAddItemGrid";
                    btn.onclick = function (e) {
                        if (SharedWork.CurrentMode == ScreenModes.Query || SharedWork.CurrentMode == ScreenModes.Start || SharedWork.CurrentMode == ScreenModes.NoData) {
                            WorningMessage("يجب اختيار وضع التعديل اولا ", "Please Select Edit Mode First");
                            return;
                        }
                        AddUsersInGrid();
                    };
                    return btn;
                },
                itemTemplate: function (s, item) {
                    var btn = DocumentActions.CreateElement("button");
                    btn.innerHTML = "<i class='fas fa-times'></i>";
                    btn.className = TransparentButton + "  red_Delete_Cotnrol editable";
                    btn.type = "button";
                    btn.name = BoxUsers.indexOf(item).toString();
                    btn.id = "btnRemoveItemGrid";
                    btn.onclick = function (e) {
                        var index = Number(e.currentTarget.name);
                        BoxUsers[index].StatusFlag = "d";
                        BoxUsers.push(BoxUsers[index]);
                        BoxUsers.splice(index, 1);
                        divUsersGrid.Bind();
                    };
                    return btn;
                }
            },
            {
                css: JsGridHeaderCenter, itemTemplate: function (s, item) {
                    var btn = DocumentActions.CreateElement("button");
                    btn.innerHTML = "<i class='fa fa-edit'></i>";
                    btn.className = TransparentButton + " " + "emptrainingedit " + "green_edit_control editable";
                    btn.type = "button";
                    btn.name = BoxUsers.indexOf(item).toString();
                    btn.id = "btnUpdateItemGrid";
                    btn.onclick = function (e) {
                        var index = Number(e.currentTarget.name);
                        BoxUsers.splice(index, 1);
                        divUsersGrid.DataSource = BoxUsers;
                        divUsersGrid.Bind();
                        if (item.USER_CODE != null)
                            DocumentActions.SelectDrobInGrid("hd_USER_CODE", item.USER_CODE.toString());
                        if (item.UserId != null)
                            DocumentActions.FillInputText("hd_UserId", item.UserId.toString());
                        if (item.BoxUsersId != null)
                            DocumentActions.FillInputText("hd_BoxUsersId", item.BoxUsersId.toString());
                        if (item.BoxId != null)
                            DocumentActions.FillInputText("hd_BoxIdUser", item.BoxId.toString());
                        if (item.USER_NAME != null)
                            DocumentActions.FillInputText("hd_USER_NAME", item.USER_NAME.toString());
                        if (item.FirstName != null)
                            DocumentActions.FillInputText("hd_FirstName", item.FirstName.toString());
                        DocumentActions.FillInputText("hd_FlagUser", "u");
                    };
                    return btn;
                }
            },
            {
                title: Resource.Code, css: "ColumPadding", name: "USER_CODE", headerTemplate: function () {
                    var txt = CreateDropdownList(Users, "USER_NAME", "USER_NAME", "UserCode", true);
                    txt.id = "hd_USER_CODE";
                    txt.onchange = function (e) {
                        FillUserRow($(e.target).val());
                    };
                    return HeaderTemplateDropdownList(Resource.Code, txt);
                }
            },
            {
                title: Resource.FirstName, css: "ColumPadding", name: "FirstName", headerTemplate: function () {
                    var txt = CreateElement("text", GridInputClassName, " ", " ", "FirstName", " ");
                    txt.id = "hd_FirstName";
                    txt.disabled = true;
                    return HeaderTemplate(Resource.FirstName, txt);
                }
            },
            {
                title: Resource.UserName, css: "ColumPadding", name: "USER_NAME", headerTemplate: function () {
                    var txt = CreateElement("text", GridInputClassName, " ", " ", "USER_NAME", " ");
                    txt.id = "hd_USER_NAME";
                    txt.disabled = true;
                    return HeaderTemplate(Resource.UserName, txt);
                }
            },
            {
                title: "Flag", css: "ColumPadding display_none", name: "Flag", width: "1%", headerTemplate: function () {
                    var txt = CreateElement("text", GridInputClassName, " ", " ", "Flag", " ");
                    txt.disabled = false;
                    txt.id = "hd_FlagUser";
                    return HeaderTemplate("Flag", txt);
                }
            },
            {
                title: "BoxId", css: "ColumPadding display_none", name: "BoxId", width: "1%", headerTemplate: function () {
                    var txt = CreateElement("text", GridInputClassName, "", " ", "BoxId", " ");
                    txt.disabled = false;
                    txt.id = "hd_BoxIdUser";
                    return HeaderTemplate("BoxId", txt);
                }
            },
            {
                title: "BoxUsersId", css: "ColumPadding display_none", name: "BoxUsersId", width: "1%", headerTemplate: function () {
                    var txt = CreateElement("text", GridInputClassName, "", " ", "BoxUsersId", " ");
                    txt.disabled = false;
                    txt.id = "hd_BoxUsersId";
                    return HeaderTemplate("BoxUsersId", txt);
                }
            },
            {
                title: "UserId", css: "ColumPadding display_none", name: "UserId", width: "1%", headerTemplate: function () {
                    var txt = CreateElement("text", GridInputClassName, "", " ", "UserId", " ");
                    txt.disabled = false;
                    txt.id = "hd_UserId";
                    return HeaderTemplate("UserId", txt);
                }
            },
        ];
        divUsersGrid.Bind();
    }
    function FillUserRow(code) {
        if (IsNullOrEmpty(code)) {
            $('#hd_FirstName').val('');
            $('#hd_USER_NAME').val('');
            $('#hd_USER_CODE').val('');
            $('#hd_UserId').val('');
        }
        else {
            var user = Users.filter(function (x) { return x.UserCode == code; })[0];
            $('#hd_UserId').val(user.UserId);
            $('#hd_USER_CODE').val(user.UserCode);
            $('#hd_FirstName').val(user.FirstName);
            $('#hd_USER_NAME').val(user.USER_NAME);
        }
    }
    /////////////////////////////////////////// Js Grid /////////////////////////////////
    function btnSearch_onclick() {
        var sys = new SystemTools();
        sys.FindKey(Modules.MS_BoxBank, SharedButtons.btnSearch.id, "", function () {
            var id = SearchGrid.SearchDataGrid.SelectedKey;
            if (!IsNullOrEmpty(id)) {
                GetByID(ObjectId);
            }
        });
    }
    function Refrash() {
        GetAll();
        GetByID(ObjectId);
    }
})(MSBoxBank || (MSBoxBank = {}));
//# sourceMappingURL=MS_BoxBank.js.map