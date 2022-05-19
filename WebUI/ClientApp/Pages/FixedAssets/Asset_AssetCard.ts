$(document).ready(() => {
    SharedButtons.OnLoad();
    AssetCard.InitalizeComponent();
})
 
namespace AssetCard {
    $('#headertop1').addClass('display_none');
    $('#headertop2').removeClass('display_none');
    let Resource: any = GetResourceList("");

    var sys: SystemTools = new SystemTools();
    var SysSession: SystemSession = GetSystemSession();
    let compCode = SysSession.CurrentEnvironment.CompCode;
    let UserCode = SysSession.CurrentEnvironment.UserCode;
    let Token = "HGFD-" + SysSession.CurrentEnvironment.Token;

    var Model: Asset_AssetCard = new Asset_AssetCard();
    var AssetCards: Array<Asset_AssetCard> = new Array<Asset_AssetCard>();
    Model.AssetCode
    //var VendorTypes: Array<Ms_VendorTypes> = new Array<Ms_VendorTypes>();
    //var VendorCategory: Array<MS_VendorCategory> = new Array<MS_VendorCategory>();
    var Currency: Array<MS_Currency> = new Array<MS_Currency>();
    //var Cities: Array<MSGA_City> = new Array<MSGA_City>();
    //var Employees: Array<Hr_Employees> = new Array<Hr_Employees>();
    var CostCenters: Array<Cal_CostCenters> = new Array<Cal_CostCenters>();

    ///////// Detailes ///////////////////////
    var Detailes: Asset_AssetCardDetailes = new Asset_AssetCardDetailes();

    //var newBranche: Ms_VendorBranches = new Ms_VendorBranches();
    //var VendorBranches: Array<Ms_VendorBranches> = new Array<Ms_VendorBranches>();

    //var AllUsersForDropdown: Array<CustomVendorUsers> = new Array<CustomVendorUsers>();
    //var newUser: CustomVendorUsers = new CustomVendorUsers();
    //var VendorUsers: Array<CustomVendorUsers> = new Array<CustomVendorUsers>();
    //var Users: Array<Ms_VendorUsers> = new Array<Ms_VendorUsers>();

    //var newContact: Ms_VendorContacts = new Ms_VendorContacts();
    //var VendorContacts: Array<Ms_VendorContacts> = new Array<Ms_VendorContacts>();

    var newAccount: Cal_AssetAccounts = new Cal_AssetAccounts();
    var AssetAccounts: Array<Cal_AssetAccounts> = new Array<Cal_AssetAccounts>();
    var AccountCharts: Array<Cal_AccountChart> = new Array<Cal_AccountChart>();

    // select Options
    var VendorTypeId: HTMLSelectElement;
    var VendorCatId: HTMLSelectElement;
    var CurrencyId: HTMLSelectElement;
    var CityId: HTMLSelectElement;
    var EmpId: HTMLSelectElement;
    var CostCenterId: HTMLSelectElement;
    var CostCenterId2: HTMLSelectElement;

    var element: HTMLInputElement;

    var _AssetId = 0;
    var StatusFlag;
    var Success;
    var hasNodes: boolean;
    var flag: boolean;

    var divAssetCardGrid: JsGrid = new JsGrid();
    var divBranchesGrid: JsGrid = new JsGrid();
    var divUsersGrid: JsGrid = new JsGrid();
    var divContactsGrid: JsGrid = new JsGrid();
    const GridInputClassName = "form-control gridIput";

    export function InitalizeComponent() {
        SharedButtons.compcode = Number(SysSession.CurrentEnvironment.CompCode);
        localStorage.setItem("TableName", "Asset_AssetCard");
        NavigateModule.InitalizeComponent();

        SharedWork.OnNavigate = Navigate;
        SharedButtons.AddAction(() => {
            //GetAllUsers();
            btnAdd_onclick();
            ClearGrids();
        });

        SharedButtons.DeleteAction(() => { btnDelete_onclick(); });

        SharedButtons.EditAction(() => { btnEdit_onclick(); });

        SharedButtons.UndoAction(() => { Undo(); });

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
        GetAll();
        GetCostCenters();
        GetCurrency();

        InitializeGrid();
        //InitializSelectOptoins();
        //InitializeBranchesGrid();
        //InitializeUsersGrid();
        //InitializeContactsGrid();
        GetAssistantAccounts();
    }

    function InitalizeControls() {
        // select Options
        VendorTypeId = document.getElementById("VendorTypeId") as HTMLSelectElement;
        VendorCatId = document.getElementById("VendorCatId") as HTMLSelectElement;
        CurrencyId = document.getElementById("CurrencyId") as HTMLSelectElement;
        CityId = document.getElementById("CityId") as HTMLSelectElement;
        EmpId = document.getElementById("EmpId") as HTMLSelectElement;
        CostCenterId = document.getElementById("CostCenterId") as HTMLSelectElement;
        CostCenterId2 = document.getElementById("CostCenterId2") as HTMLSelectElement;

        SharedButtons.btnSearch = document.getElementById("btnAsset_AssetCardSearch") as HTMLButtonElement;
    }

    function InitalizeEvents() {
        SharedButtons.btnSearch.onclick = btnSearch_onclick;
        SharedButtons.btnRefrash2.onclick = Refrash;
    }

    function ClearGrids() {
        ClearBranchesGrid();
        //VendorBranches = new Array<Ms_VendorBranches>();
        //VendorUsers = new Array<CustomVendorUsers>();
        //Users = new Array<Ms_VendorUsers>();
        //VendorContacts = new Array<Ms_VendorContacts>();
    }

    function ClearBranchesGrid() {
        var ClrVendorBranches = new Array<Ms_VendorBranches>();
        divBranchesGrid.DataSource = ClrVendorBranches;
        divBranchesGrid.Bind();

        var ClrVendorUsers = new Array<CustomVendorUsers>();
        divUsersGrid.DataSource = ClrVendorUsers;
        divUsersGrid.Bind();

        var ClrVendorContacts = new Array<Ms_VendorContacts>();
        divContactsGrid.DataSource = ClrVendorContacts;
        divContactsGrid.Bind();
    }

    function GetAll() {
        Disabled(false);
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("Asset_AssetCard", "GetAll"),
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess) {
                    debugger
                    AssetCards = result.Response as Array<Asset_AssetCard>;
                    divAssetCardGrid.DataSource = AssetCards;
                    divAssetCardGrid.Bind();
                }
            }
        });
    }

    function GetById(AssetId: number) {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("Asset_AssetCard", "GetById"),
            data: { id: AssetId },
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess) {
                    Detailes = result.Response as Asset_AssetCardDetailes;
                    DisplayAccounts(Detailes.accounts);
                }
            }
        });
        return Detailes;
    }

    function InitializeGrid() {
        divAssetCardGrid.ElementName = "divAssetCardGrid";
        divAssetCardGrid.PrimaryKey = "AssetId";
        divAssetCardGrid.Editing = true;
        divAssetCardGrid.Paging = true;
        divAssetCardGrid.Sorting = true;
        divAssetCardGrid.PageSize = 10;
        divAssetCardGrid.ConfirmDeleteing = true;
        divAssetCardGrid.InsertionMode = JsGridInsertionMode.Binding;
        divAssetCardGrid.OnItemInserting = () => { };
        divAssetCardGrid.OnItemUpdating = () => { };
        divAssetCardGrid.OnItemDeleting = () => { };
        divAssetCardGrid.OnRowSelected = () => {
            Display(Model = GetById(divAssetCardGrid.SelectedItem.AssetId).Model);
            SharedWork.SwitchModes(ScreenModes.Query);
        };
        divAssetCardGrid.Columns = [
            {
                title: Resource.ProductivityMachine, css: "ColumPadding", name: "IsProduction", type: "checkbox"
            },
            {
                title: Resource.Code , css: "ColumPadding", name: "AssetCode"
            },
            {
                title: Resource.Name_Arabic, css: "ColumPadding", name: "Name1"
            },
            {
                title: Resource.Name_English, css: "ColumPadding", name: "Name2"
            },
            {
                title: Resource.Phone, css: "ColumPadding", name: "Tel"
            },
            {
                title: Resource.Notes, css: "ColumPadding", name: "Remarks"
            },
            {
                title: "AssetId", css: "ColumPadding disable hidden", name: "AssetId", width: "1%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("text", GridInputClassName, " ", " ", "AssetId", " ");
                    txt.disabled = true;
                    txt.id = "hd_VendorId";
                    return HeaderTemplate("AssetId", txt);
                }
            }
        ];
        divAssetCardGrid.Bind();
    }

    function Display(model: Asset_AssetCard) {
        DocumentActions.RenderFromModel(model);
        Model = model;
        _AssetId = Number(Model.AssetId);
    }

    export function Navigate() {
        Model = AssetCards[SharedWork.PageIndex - 1];
        _AssetId = Model.AssetId;
        Model = GetById(_AssetId).Model;

        if (Model != null) {
            Display(Model);
        }
    }

    function btnAdd_onclick() {
        StatusFlag = 'i';
        RemoveDisabled(true);
        $('select').val('null');
    }

    function RemoveDisabled(clear: boolean) {
        DocumentActions.allElements(false, clear, Model);
        $('#accounts select').prop('disabled', false).select2().trigger('change');
        $('#BasicAccCode').prop('disabled', false).select2().trigger('change');
    }

    function Undo() {
        Disabled(true);
        Success = false;
    }

    function Disabled(clear: boolean) {
        DocumentActions.allElements(true, clear, Model);
        $('#accounts select').prop('disabled', true).select2().trigger('change');
        $('#BasicAccCode').prop('disabled', true).select2().trigger('change');
    }

    function btnEdit_onclick() {
        if (_AssetId == 0) {
            MessageBox.Show(Resource.PleaseSelectItem, Resource.Error);
        }
        else {
            RemoveDisabled(false);
            element = DocumentActions.GetElementByName("AssetCode");
            element.disabled = true;
            StatusFlag = 'u';
        }
    }

    function btnsave_onClick() {
        if (!ValidationHeader()) return
        Save();
    }

    function ValidationHeader() {
        if (DocumentActions.GetElementByName("AssetCode").value == "") {
            MessageBox.Show(Resource.PleaseEnterVendorCode, Resource.Error);
            return false
        }
        else if (DocumentActions.GetElementByName("Name1").value == "") {
            MessageBox.Show(Resource.PleaseEnterNameArabic, Resource.Error);
            return false
        }
        return true;
    }

    function Save() {
        if (CheckCode(AssetCards, DocumentActions.GetElementByName("AssetCode").value, "AssetCode") == false && StatusFlag == "i") {
            MessageBox.Show(Resource.CodeCannotDuplicated, Resource.Error);
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

    function Assign() {
        Detailes.Model = DocumentActions.AssignToModel<Asset_AssetCard>(Model);
        Detailes.accounts = MapAssetCardAccounts();

        if (StatusFlag == "i") {
            Model.CreatedAt = DateTimeFormat(Date().toString());
            Model.CreatedBy = SysSession.CurrentEnvironment.UserCode;
            Insert();
        }
        if (StatusFlag == "u") {
            Model.AssetId = _AssetId;
            Model.UpdateAt = DateTimeFormat(Date().toString());
            Model.UpdateBy = SysSession.CurrentEnvironment.UserCode;
            Update();
        }
        _AssetId = Model.AssetId;
        GetAll();
        return true;
    }

    function Insert() {
        $("#MessageBoxDialog").modal("hide");
        Ajax.Callsync({
            type: "POST",
            url: sys.apiUrl("Asset_AssetCard", "Insert"),
            data: JSON.stringify(Detailes),
            success: (Response) => {
                let result = Response as BaseResponse;
                if (result.IsSuccess) {
                    Model = result.Response as Asset_AssetCard;
                    _AssetId = Model.AssetId;
                    Success = true;
                }
                else {
                    MessageBox.Show(Resource.Error, Resource.Error);
                    Success = false;
                }
            }
        });
    }

    function Update() {
        $("#MessageBoxDialog").modal("hide");
        Ajax.Callsync({
            type: "POST",
            url: sys.apiUrl("Asset_AssetCard", "Update"),
            data: JSON.stringify(Detailes),
            success: (Response) => {
                let result = Response as BaseResponse;
                if (result.IsSuccess) {
                    Model = result.Response as Asset_AssetCard
                    _AssetId = Model.AssetId;
                    Success = true;
                }
                else {
                    MessageBox.Show(Resource.Error, Resource.Error);
                    Success = false;
                }
            }
        });
    }

    function btnDelete_onclick() {
        StatusFlag == "d";
        if (_AssetId == 0) {
            MessageBox.Show(Resource.PleaseSelectItem, Resource.Error);
        }
        else {
            if (hasNodes) {
                MessageBox.Show(Resource.CannotDeleteHasChildren, Resource.Error);
            }
            else {
                Delete();
            }
        }
    }

    function Delete() {
        $("#MessageBoxDialog").modal("hide");
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("Asset_AssetCard", "Delete") + "/" + _AssetId,
            success: (result) => {
                if (result) {
                    Success = true;
                    GetAll();
                    Disabled(result);
                }
                else {
                    MessageBox.Show(Resource.Error, Resource.Error);
                    Success = false;
                }
            }
        });
    }

    function btnSearch_onclick() {
        let sys: SystemTools = new SystemTools();
        sys.FindKey(Modules.Asset_AssetCard, SharedButtons.btnSearch.id, "", () => {
            let id = SearchGrid.SearchDataGrid.SelectedKey;
            if (!IsNullOrEmpty(id)) {
                Display(id);
            }
        });
    }

    function GetAssistantAccounts() {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("funcationShared", "GetAssistantAccounts"),
            success: (Response) => {
                let result = Response as BaseResponse;
                if (result.IsSuccess) {
                    AccountCharts = result.Response as Array<Cal_AccountChart>;
                    let AddAccounts = $('#AddAccounts select'),
                        BasicAccCode = $('#BasicAccCode')[0] as HTMLSelectElement;

                    for (var i = 0; i < AddAccounts.length; i++) {
                        let selectElment = AddAccounts[i] as HTMLSelectElement;
                        DocumentActions.FillCombowithCode(AccountCharts, selectElment, "AccountId", (language == "ar" ?
                            "AccountNameA" : "AccountNameE"), "AccountCode", Resource.ExtraAccount + (i + 1));

                        $('#' + selectElment.id + ' option:first').prop('disabled', false).select2().trigger('change');
                    }

                    DocumentActions.FillCombowithCode(AccountCharts, BasicAccCode, "AccountId", (language == "ar" ?
                        "AccountNameA" : "AccountNameE"), "AccountCode", Resource.Account);
                }
            }
        });
    }

    function DisplayAccounts(accounts: Array<Cal_AssetAccounts>) {
        $('#accounts select').val('null').select2().trigger('change');

        for (var i = 0; i < accounts.length; i++) {
            DocumentActions.SelectDrobInGrid(accounts[i].AccountDescription, accounts[i].AccountId.toString());
            $('#' + accounts[i].AccountDescription).select2().trigger('change');
        }

        if (accounts.length == 0) {
            $('#BasicAccCode').val('null').select2().trigger('change');
            $('#accounts select').val('null').select2().trigger('change');
        }
    }

    function MapAssetCardAccounts() {
        AssetAccounts = new Array<Cal_AssetAccounts>();
        newAccount = new Cal_AssetAccounts();
        let AddAccounts = $('#AddAccounts select'),
            BasicAccCode = $('#BasicAccCode')[0] as HTMLSelectElement;

        if (!IsNullOrEmpty(BasicAccCode.value)) {
            newAccount.AccountId = Number(BasicAccCode.value);
            newAccount.IsInUse = true;
            newAccount.IsPrimeAccount = true;
            newAccount.AccountDescription = "BasicAccCode";
            newAccount.AccountCode = $('#BasicAccCode option:selected').text().split('-')[0].trim();

            if (language == "ar")
                newAccount.AccountNameA = $('#BasicAccCode option:selected').text().split('-')[1].trim();
            else
                newAccount.AccountNameE = $('#BasicAccCode option:selected').text().split('-')[1].trim();
            AssetAccounts.push(newAccount);
        }

        for (var i = 0; i < AddAccounts.length; i++) {
            newAccount = new Cal_AssetAccounts();
            let selectElment = AddAccounts[i] as HTMLSelectElement,
                text = selectElment.options[selectElment.selectedIndex];

            if (!IsNullOrEmpty(selectElment.value)) {
                newAccount.AccountId = Number(selectElment.value);
                newAccount.IsInUse = true;
                newAccount.IsPrimeAccount = false;
                newAccount.AccountDescription = "AddAccountCode" + (i + 1);

                newAccount.AccountCode = text.text.split('-')[0].trim();

                if (language == "ar")
                    newAccount.AccountNameA = text.text.split('-')[1].trim();
                else
                    newAccount.AccountNameE = text.text.split('-')[1].trim();
                AssetAccounts.push(newAccount);
            }
        }
        return AssetAccounts;
    }

    function GetCostCenters() {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("funcationShared", "GetCostCenters"),
            success: (Response) => {
                let result = Response as BaseResponse;
                if (result.IsSuccess) {
                    CostCenters = result.Response as Array<Cal_CostCenters>;
                    DocumentActions.FillCombowithCode(CostCenters, CostCenterId, "CostCenterId", "CostCenterNameA", "CostCenterCode", Resource.CostCenter + " " + Resource.Debtor);
                    DocumentActions.FillCombowithCode(CostCenters, CostCenterId2, "CostCenterId", "CostCenterNameA", "CostCenterCode", Resource.CostCenter + " " + Resource.Creditor);
                }
            }
        });
    }

    function GetCurrency() {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("funcationShared", "GetCurrencies"),
            success: (Response) => {
                let result = Response as BaseResponse;
                if (result.IsSuccess) {
                    Currency = result.Response as Array<MS_Currency>;
                    DocumentActions.FillCombowithCode(Currency, CurrencyId, "CurrencyId", "CurrencyDescA", "CurrencyCode", Resource.Currency);
                }
            }
        });
    }

    function CheckCode(entity: any, code: string, property: string) {
        var isExist = entity.filter(x => x[property] == code.trim())[0];
        if (isExist == null)
            return true;
        else
            return false;
    }

    function Refrash() {
        ClearGrids();
        GetAll();
        Display(GetById(_AssetId).Model);
    }
}
