$(document).ready(() => {
    SharedButtons.OnLoad();
    MSBoxBank.InitalizeComponent();
});

namespace MSBoxBank {
    let Resource: any = GetResourceList("");
    $('#headertop1').addClass('display_none');
    $('#headertop2').removeClass('display_none');
    $('#headerTitle').text(Resource.Box);

    var sys: SystemTools = new SystemTools();
    var language = sys.SysSession.CurrentEnvironment.ScreenLanguage;
    var SysSession: SystemSession = GetSystemSession();
    let compCode = SysSession.CurrentEnvironment.CompCode;
    let UserCode = SysSession.CurrentEnvironment.UserCode;
    let Token = "HGFD-" + SysSession.CurrentEnvironment.Token;

    var Model: MS_BoxBank = new MS_BoxBank();
    var BoxBanks: Array<MS_BoxBank> = new Array <MS_BoxBank>();
    var AccountChart: Array<Cal_AccountChart> = new Array<Cal_AccountChart>();

    var BoxCurrencies: Array<MS_BoxCurrency> = new Array<MS_BoxCurrency>();
    var BoxCurrency: MS_BoxCurrency = new MS_BoxCurrency();
    var Currencies: Array<MS_Currency> = new Array<MS_Currency>();

    var Users: Array<G_USERS> = new Array<G_USERS>();
    var BoxUsers: Array<Ms_BoxUsers> = new Array<Ms_BoxUsers>();
    var BoxUser: Ms_BoxUsers = new Ms_BoxUsers();

    var HeaderAndDetails: BoxBankHeaderAndDetails = new BoxBankHeaderAndDetails();
    
    // Select Options
    var element: HTMLInputElement;
    var UserId: HTMLSelectElement;
    var AccountId: HTMLSelectElement;

    //////////////// Details ///////////////////
    var AccountDebitFixed: HTMLSelectElement;

    var ObjectId = 0;
    var StatusFlag;
    var Success;
    var hasNodes: boolean;
    var flag: boolean = true;

    var divUsersGrid: JsGrid = new JsGrid();
    var divCurrencyGrid: JsGrid = new JsGrid();
    const GridInputClassName = "form-control gridIput";

    export function InitalizeComponent() {
        localStorage.setItem("TableName", "MS_BoxBank");
        NavigateModule.InitalizeComponent();
        SharedButtons.compcode = Number(SysSession.CurrentEnvironment.CompCode);
        SharedWork.OnNavigate = Navigate;

        SharedButtons.AddAction(() => {
            btnAdd_onclick();
        });

        SharedButtons.DeleteAction(() => { btnDelete_onclick(); });

        SharedButtons.EditAction(() => { btnEdit_onclick(); });

        SharedButtons.UndoAction(() => {
            Undo();
            if (ObjectId == 0)
                SharedWork.SwitchModes(ScreenModes.Start);
        });

        SharedButtons.SaveAction(() => {
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

    function InitalizeControls() {
        SharedButtons.btnSearch = document.getElementById("btnMS_BoxBankSearch") as HTMLButtonElement;
        UserId = document.getElementById("UserCode") as HTMLSelectElement;
        AccountId = document.getElementById("AccountId") as HTMLSelectElement;
    }

    function InitalizeEvents() {
        SharedButtons.btnSearch.onclick = btnSearch_onclick;
        SharedButtons.btnRefrash2.onclick = Refrash;
        AccountId.onchange = () => {

        }
    }

    function GetAll() {
        Disabled(false);
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("MS_BoxBank", "GetAll"),
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess) {
                    BoxBanks = result.Response as Array<MS_BoxBank>;
                    //console.log(BoxBanks)
                }
            }
        });
    }

    function GetByID(Id: number) {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("MS_BoxBank", "GetById"),
            data: { id: Id },
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess) {
                    let res = result.Response as BoxBankHeaderAndDetails;
                    Display(res);
                    SharedWork.SwitchModes(ScreenModes.Query);
                }
                else
                    MessageBox.Toastr(Resource.Error, Resource.Error, ToastrTypes.error);
            }
        });
    }

    function Assign() {
        HeaderAndDetails.BoxBank = DocumentActions.AssignToModel<MS_BoxBank>(Model);
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
            success: (Response) => {
                let result = Response as BaseResponse;
                if (result.IsSuccess) {
                    HeaderAndDetails = result.Response as BoxBankHeaderAndDetails;
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
            success: (Response) => {
                let result = Response as BaseResponse;
                if (result.IsSuccess) {
                    HeaderAndDetails = result.Response as BoxBankHeaderAndDetails;
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
            success: (result) => {
                if (result) {
                    Success = true;
                    GetAll();
                    Disabled(result);
                    $('select').val('null').select2().trigger('change')
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
        if (!Validation()) return
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
            flag = false
        }
        else if (DocumentActions.GetElementByName("DESCA").value == "") {
            MessageBox.Toastr(Resource.PleaseEnterNameArabic, Resource.Error, ToastrTypes.error);
            flag = false
        }
        else
            flag = true;

        return flag;
    }

    export function Navigate() {
        Model = BoxBanks[SharedWork.PageIndex - 1];
        ObjectId = Model.BoxId;
        GetByID(ObjectId);
    }

    function Display(model: BoxBankHeaderAndDetails) {
        Model = model.BoxBank;
        DocumentActions.RenderFromModel(Model);

        BoxCurrencies = model.BoxCurrency;
        BoxUsers = model.BoxUsers;
        BindGrid();

        ObjectId = Number(Model.BoxId);
    }

    function BindGrid() {
        for (var i = 0; i < BoxUsers.length; i++) {
            let user = Users.filter(x => x.UserId == BoxUsers[i].UserId)[0];
            if (user != null) {
                BoxUsers[i].USER_CODE = user.UserCode;
                BoxUsers[i].USER_NAME = user.USER_NAME;
                BoxUsers[i].FirstName = user.FirstName;
            }
        }

        for (var i = 0; i < BoxCurrencies.length; i++) {
            let Currency = Currencies.filter(x => x.CurrencyId == BoxCurrencies[i].CurrencyId)[0];
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
        BoxUsers = new Array<Ms_BoxUsers>();
        BoxCurrencies = new Array<MS_BoxCurrency>();

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

    function Disabled(clear: boolean) {
        DocumentActions.allElements(true, clear, Model);
    }

    function RemoveDisabled(clear: boolean) {
        DocumentActions.allElements(false, clear, Model);
    }

    function GetAllAccountChart() {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("funcationShared", "GetAllSubAccountChart"),
            success: (Response) => {
                let result = Response as BaseResponse;
                if (result.IsSuccess) {
                    AccountChart = result.Response as Array<Cal_AccountChart>;
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
            success: (Response) => {
                let result = Response as BaseResponse;
                if (result.IsSuccess) {
                    Currencies = result.Response as Array<MS_Currency>;
                }
            }
        });
        return Currencies;
    }

    function GetUsers() {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("funcationShared", "ReturnAllUsers"),
            data: { CompCode: compCode, Token: Token, UserCode: UserCode},
            success: (Response) => {
                let result = Response as BaseResponse;
                if (result.IsSuccess) {
                    Users = result.Response as Array<G_USERS>;
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
        let UseItemTaxArr: { value: number, text: string }[] = [
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
        let BoxCurrencyId = $("#hd_BoxCurrencyId").val().trim(),
            CurrencyId = $("#hd_CurrencyId").val().trim(),
            CurrencyCode = $("#hd_CurrencyCode").val(),
            AccountId = $("#hd_AccountId").val().trim(),
            BoxId = $("#hd_BoxId").val().trim(),
            CurrencyDescA = $("#hd_CurrencyDescA").val().trim(),
            CurrencyDescE = $("#hd_CurrencyDescE").val().trim(),
            Rate = $("#hd_Rate").val().trim();

        if (BoxCurrencyId == "") BoxCurrency.BoxCurrencyId = 0; else BoxCurrency.BoxCurrencyId = BoxCurrencyId;
        if (BoxId == "") BoxCurrency.BoxId = 0; else BoxCurrency.BoxId = BoxId;
        if (IsNullOrEmpty(CurrencyCode) == true || CurrencyCode == "null") { MessageBox.Toastr(Resource.PleaseEnterCode, Resource.Error, ToastrTypes.error); return; } else BoxCurrency.CurrencyId= CurrencyId;
        if (AccountId == "") BoxCurrency.AccountId = null; else BoxCurrency.AccountId = $('#AccountId').val();
        BoxCurrency.CurrencyDescA = CurrencyDescA;
        BoxCurrency.CurrencyCode = CurrencyCode;
        BoxCurrency.CurrencyDescE = CurrencyDescE;
        BoxCurrency.Rate = Rate;

        if ($('#hd_Flag').val().trim() == "u") BoxCurrency.StatusFlag = "u"; else BoxCurrency.StatusFlag = "i";

        if (DocumentActions.CheckCode(BoxCurrencies, BoxCurrency.CurrencyId.toString(), "CurrencyId") == false && BoxCurrency.StatusFlag == "i") {
            MessageBox.Toastr(Resource.CodeCannotDuplicated, Resource.Error, ToastrTypes.error);
        } else {
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
        divCurrencyGrid.OnItemInserting = () => { };
        divCurrencyGrid.OnItemUpdating = () => { };
        divCurrencyGrid.OnItemDeleting = () => { };
        divCurrencyGrid.Columns = [
            {
                title: "#", name: "btnAddItem", visible: true, width: "30px",
                headerTemplate: (): HTMLElement => {
                    let btn: HTMLButtonElement = DocumentActions.CreateElement<HTMLButtonElement>("button");
                    btn.className = TransparentButton + " editable addable ";
                    btn.type = "button";
                    
                    
                    btn.innerHTML = "<span class='fa fa-plus'></span>";
                    btn.id = "btnAddItemGrid";
                    btn.onclick = (e) => {
                        if (SharedWork.CurrentMode == ScreenModes.Query || SharedWork.CurrentMode == ScreenModes.Start || SharedWork.CurrentMode == ScreenModes.NoData) {
                            WorningMessage("يجب اختيار وضع التعديل اولا ", "Please Select Edit Mode First");
                            return;
                        }
                        AddCurancyInGrid();
                    };
                    return btn;
                },
                itemTemplate: (s: string, item: MS_BoxCurrency): HTMLButtonElement => {
                    let btn: HTMLButtonElement = DocumentActions.CreateElement<HTMLButtonElement>("button");
                    btn.innerHTML = "<i class='fas fa-times'></i>";
                    btn.className = TransparentButton + "  red_Delete_Cotnrol editable";
                    
                    btn.type = "button";
                    
                    btn.name = BoxCurrencies.indexOf(item).toString();
                    btn.id = "btnRemoveItemGrid";
                    btn.onclick = (e) => {
                        let index = Number((e.currentTarget as HTMLButtonElement).name);
                        BoxCurrencies[index].StatusFlag = "d";
                        BoxCurrencies.push(BoxCurrencies[index]);
                        BoxCurrencies.splice(index, 1);
                        divCurrencyGrid.Bind();
                    };
                    return btn;
                }
            },
            {
                css: JsGridHeaderCenter, itemTemplate: (s: string, item: MS_BoxCurrency): HTMLButtonElement => {
                    let btn: HTMLButtonElement = DocumentActions.CreateElement<HTMLButtonElement>("button");
                    btn.innerHTML = "<i class='fa fa-edit'></i>";
                    btn.className = TransparentButton + " " + "emptrainingedit " + "green_edit_control editable";
                    
                    btn.type = "button";
                    
                    btn.name = BoxCurrencies.indexOf(item).toString();
                    btn.id = "btnUpdateItemGrid";
                    btn.onclick = (e) => {
                        let index = Number((e.currentTarget as HTMLButtonElement).name);
                        BoxCurrencies.splice(index, 1);
                        divCurrencyGrid.DataSource = BoxCurrencies;
                        divCurrencyGrid.Bind();

                        if (item.BoxCurrencyId != null) DocumentActions.FillInputText("hd_BoxCurrencyId", item.BoxCurrencyId.toString());
                        if (item.CurrencyId != null) DocumentActions.FillInputText("hd_CurrencyId", item.CurrencyId.toString());
                        if (item.CurrencyCode != null) DocumentActions.SelectDrobInGrid("hd_CurrencyCode", item.CurrencyCode.toString());
                        if (item.BoxId != null) DocumentActions.FillInputText("hd_BoxId", item.BoxId.toString());
                        if (item.AccountId != null) DocumentActions.FillInputText("hd_AccountId", item.AccountId.toString());
                        if (item.CurrencyDescA != null) DocumentActions.FillInputText("hd_CurrencyDescA", item.CurrencyDescA.toString());
                        if (item.CurrencyDescE != null) DocumentActions.FillInputText("hd_CurrencyDescE", item.CurrencyDescE.toString());
                        if (item.Rate != null) DocumentActions.FillInputText("hd_Rate", item.Rate.toString());
                        DocumentActions.FillInputText("hd_Flag", "u");
                    };
                    return btn;
                }
            },
            {
                title: Resource.Code, css: "ColumPadding", name: "CurrencyCode", headerTemplate: (): HTMLTableElement => {
                    let txt = CreateDropdownListWithCode(Currencies, "CurrencyDescA", "CurrencyDescE", "CurrencyCode","CurrencyCode", true);
                    txt.id = "hd_CurrencyCode";
                    txt.onchange = (e) => {
                        FillCurrancyRow(Number($(e.target).val()));
                    }
                    return HeaderTemplateDropdownList(Resource.Code, txt);
                }
            },
            {
                title: Resource.Name_Arabic, css: "ColumPadding", name: "CurrencyDescA", headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("text", GridInputClassName, " ", " ", "CurrencyDescA", " ");
                    txt.id = "hd_CurrencyDescA";
                    txt.disabled = true;
                    return HeaderTemplate(Resource.Name_Arabic, txt);
                }
            },
            {
                title: Resource.Name_English, css: "ColumPadding", name: "CurrencyDescE", headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("text", GridInputClassName, " ", " ", "CurrencyDescE", " ");
                    txt.id = "hd_CurrencyDescE";
                    txt.disabled = true;
                    return HeaderTemplate(Resource.Name_English, txt);
                }
            },
            {
                title: Resource.Rate, css: "ColumPadding", name: "Rate", headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("number", GridInputClassName, " ", " ", "Rate", " ");
                    txt.id = "hd_Rate";
                    txt.disabled = true;
                    return HeaderTemplate(Resource.Rate, txt);
                }
            },
            {
                title: "Flag", css: "ColumPadding display_none", name: "Flag", width: "1%",headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("text", GridInputClassName, " ", " ", "Flag", " ");
                    txt.disabled = false;
                    txt.id = "hd_Flag";
                    return HeaderTemplate("Flag", txt);
                }
            },
            {
                title: "BoxId", css: "ColumPadding display_none", name: "BoxId", width: "1%", headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("text", GridInputClassName, "", " ", "BoxId", " ");
                    txt.disabled = false;
                    txt.id = "hd_BoxId";
                    return HeaderTemplate("BoxId", txt);
                }
            },
            {
                title: "AccountId", css: "ColumPadding display_none", name: "AccountId", width: "1%", headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("text", GridInputClassName, "", " ", "AccountId", " ");
                    txt.disabled = false;
                    txt.id = "hd_AccountId";
                    return HeaderTemplate("AccountId", txt);
                }
            },
            {
                title: "BoxCurrencyId", css: "ColumPadding display_none", name: "BoxCurrencyId", width: "1%",headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("text", GridInputClassName, "", " ", "BoxCurrencyId", " ");
                    txt.disabled = false;
                    txt.id = "hd_BoxCurrencyId";
                    return HeaderTemplate("BoxCurrencyId", txt);
                }
            },
            {
                title: "CurrencyId", css: "ColumPadding display_none", name: "CurrencyId", width: "1%",headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("text", GridInputClassName, "", " ", "CurrencyId", " ");
                    txt.disabled = false;
                    txt.id = "hd_CurrencyId";
                    return HeaderTemplate("CurrencyId", txt);
                }
            },
        ];
        divCurrencyGrid.Bind();
    }
    function FillCurrancyRow(code: number) {
        if (isNaN(code)) {
            $('#hd_CurrencyCode').val('');
            $('#hd_CurrencyId').val('');
            $('#hd_CurrencyDescA').val('');
            $('#hd_CurrencyDescE').val('');
            $('#hd_Rate').val('');
        }
        else {
            let Currency = Currencies.filter(x => x.CurrencyCode == code)[0];
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
        let UserId = $("#hd_UserId").val().trim(),
            USER_CODE = $("#hd_USER_CODE").val(),
            BoxUsersId = $("#hd_BoxUsersId").val().trim(),
            BoxId = $("#hd_BoxIdUser").val().trim(),
            USER_NAME = $("#hd_USER_NAME").val(),
            FirstName = $("#hd_FirstName").val().trim();

        if (BoxUsersId == "") BoxUser.BoxUsersId = 0; else BoxUser.BoxUsersId = BoxUsersId;

        if (IsNullOrEmpty(UserId) == true || UserId == "null") { MessageBox.Toastr(Resource.PleaseEnterCode, Resource.Error, ToastrTypes.error); return; }
        else BoxUser.UserId = UserId;

        if (BoxId == "") BoxUser.BoxId = null; else BoxUser.BoxId = BoxId;
        BoxUser.USER_NAME = USER_NAME;
        BoxUser.FirstName = FirstName;
        BoxUser.USER_CODE = USER_CODE;

        if ($('#hd_FlagUser').val().trim() == "u") BoxUser.StatusFlag = "u"; else BoxUser.StatusFlag = "i";

        if (DocumentActions.CheckCode(BoxUsers, BoxUser.UserId.toString(), "UserId") == false && BoxUser.StatusFlag == "i") {
            MessageBox.Toastr(Resource.CodeCannotDuplicated, Resource.Error, ToastrTypes.error);
        } else {
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
        divUsersGrid.OnItemInserting = () => { };
        divUsersGrid.OnItemUpdating = () => { };
        divUsersGrid.OnItemDeleting = () => { };
        divUsersGrid.Columns = [
            {
                title: "#", name: "btnAddItem", visible: true, width: "30px", headerTemplate: (): HTMLElement => {
                    let btn: HTMLButtonElement = DocumentActions.CreateElement<HTMLButtonElement>("button");
                    btn.className = TransparentButton + " editable addable ";
                    btn.type = "button";
                    
                    
                    btn.innerHTML = "<span class='fa fa-plus'></span>";
                    btn.id = "btnAddItemGrid";
                    btn.onclick = (e) => {
                        if (SharedWork.CurrentMode == ScreenModes.Query || SharedWork.CurrentMode == ScreenModes.Start || SharedWork.CurrentMode == ScreenModes.NoData) {
                            WorningMessage("يجب اختيار وضع التعديل اولا ", "Please Select Edit Mode First");
                            return;
                        }
                        AddUsersInGrid();
                    };
                    return btn;
                },
                itemTemplate: (s: string, item: Ms_BoxUsers): HTMLButtonElement => {
                    let btn: HTMLButtonElement = DocumentActions.CreateElement<HTMLButtonElement>("button");
                    btn.innerHTML = "<i class='fas fa-times'></i>";
                    btn.className = TransparentButton + "  red_Delete_Cotnrol editable";
                    
                    btn.type = "button";
                    
                    btn.name = BoxUsers.indexOf(item).toString();
                    btn.id = "btnRemoveItemGrid";
                    btn.onclick = (e) => {
                        let index = Number((e.currentTarget as HTMLButtonElement).name);
                        BoxUsers[index].StatusFlag = "d";
                        BoxUsers.push(BoxUsers[index]);
                        BoxUsers.splice(index, 1);
                        divUsersGrid.Bind();
                    };
                    return btn;
                }
            },
            {
                css: JsGridHeaderCenter, itemTemplate: (s: string, item: Ms_BoxUsers): HTMLButtonElement => {
                    let btn: HTMLButtonElement = DocumentActions.CreateElement<HTMLButtonElement>("button");
                    btn.innerHTML = "<i class='fa fa-edit'></i>";
                    btn.className = TransparentButton + " " + "emptrainingedit " + "green_edit_control editable";
                    
                    btn.type = "button";
                    
                    btn.name = BoxUsers.indexOf(item).toString();
                    btn.id = "btnUpdateItemGrid";
                    btn.onclick = (e) => {
                        let index = Number((e.currentTarget as HTMLButtonElement).name);
                        BoxUsers.splice(index, 1);
                        divUsersGrid.DataSource = BoxUsers;
                        divUsersGrid.Bind();

                        if (item.USER_CODE != null) DocumentActions.SelectDrobInGrid("hd_USER_CODE", item.USER_CODE.toString());
                        if (item.UserId != null) DocumentActions.FillInputText("hd_UserId", item.UserId.toString());
                        if (item.BoxUsersId != null) DocumentActions.FillInputText("hd_BoxUsersId", item.BoxUsersId.toString());
                        if (item.BoxId != null) DocumentActions.FillInputText("hd_BoxIdUser", item.BoxId.toString());
                        if (item.USER_NAME != null) DocumentActions.FillInputText("hd_USER_NAME", item.USER_NAME.toString());
                        if (item.FirstName != null) DocumentActions.FillInputText("hd_FirstName", item.FirstName.toString());
                        DocumentActions.FillInputText("hd_FlagUser", "u");
                    };
                    return btn;
                }
            },
            {
                title: Resource.Code, css: "ColumPadding", name: "USER_CODE", headerTemplate: (): HTMLTableElement => {
                    let txt = CreateDropdownList(Users, "USER_NAME", "USER_NAME", "UserCode", true);
                    txt.id = "hd_USER_CODE";
                    txt.onchange = (e) => {
                        FillUserRow($(e.target).val());
                    }
                    return HeaderTemplateDropdownList(Resource.Code, txt);
                }
            },
            {
                title: Resource.FirstName, css: "ColumPadding", name: "FirstName", headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("text", GridInputClassName, " ", " ", "FirstName", " ");
                    txt.id = "hd_FirstName";
                    txt.disabled = true;
                    return HeaderTemplate(Resource.FirstName, txt);
                }
            },
            {
                title: Resource.UserName, css: "ColumPadding", name: "USER_NAME", headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("text", GridInputClassName, " ", " ", "USER_NAME", " ");
                    txt.id = "hd_USER_NAME";
                    txt.disabled = true;
                    return HeaderTemplate(Resource.UserName, txt);
                }
            },
            {
                title: "Flag", css: "ColumPadding display_none", name: "Flag", width: "1%", headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("text", GridInputClassName, " ", " ", "Flag", " ");
                    txt.disabled = false;
                    txt.id = "hd_FlagUser";
                    return HeaderTemplate("Flag", txt);
                }
            },
            {
                title: "BoxId", css: "ColumPadding display_none", name: "BoxId", width: "1%", headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("text", GridInputClassName, "", " ", "BoxId", " ");
                    txt.disabled = false;
                    txt.id = "hd_BoxIdUser";
                    return HeaderTemplate("BoxId", txt);
                }
            },
            {
                title: "BoxUsersId", css: "ColumPadding display_none", name: "BoxUsersId", width: "1%", headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("text", GridInputClassName, "", " ", "BoxUsersId", " ");
                    txt.disabled = false;
                    txt.id = "hd_BoxUsersId";
                    return HeaderTemplate("BoxUsersId", txt);
                }
            },
            {
                title: "UserId", css: "ColumPadding display_none", name: "UserId", width: "1%", headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("text", GridInputClassName, "", " ", "UserId", " ");
                    txt.disabled = false;
                    txt.id = "hd_UserId";
                    return HeaderTemplate("UserId", txt);
                }
            },
        ];
        divUsersGrid.Bind();
    }
    function FillUserRow(code: string) {
        if (IsNullOrEmpty(code)) {
            $('#hd_FirstName').val('');
            $('#hd_USER_NAME').val('');
            $('#hd_USER_CODE').val('');
            $('#hd_UserId').val('');
        }
        else {
            let user = Users.filter(x => x.UserCode == code)[0];
            $('#hd_UserId').val(user.UserId);
            $('#hd_USER_CODE').val(user.UserCode);
            $('#hd_FirstName').val(user.FirstName);
            $('#hd_USER_NAME').val(user.USER_NAME);
        }
    }

    /////////////////////////////////////////// Js Grid /////////////////////////////////

    function btnSearch_onclick() {
        let sys: SystemTools = new SystemTools();
        sys.FindKey(Modules.MS_BoxBank, SharedButtons.btnSearch.id, "", () => {
            let id = SearchGrid.SearchDataGrid.SelectedKey;
            if (!IsNullOrEmpty(id)) {
                GetByID(ObjectId);
            }
        });
    }

    function Refrash() {
        GetAll();
        GetByID(ObjectId);
    }
}