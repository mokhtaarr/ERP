$(document).ready(function () {
    SharedButtons.OnLoad();
    AssetCard.InitalizeComponent();
});
var AssetCard;
(function (AssetCard) {
    $('#headertop1').addClass('display_none');
    $('#headertop2').removeClass('display_none');
    var Resource = GetResourceList("");
    var sys = new SystemTools();
    var SysSession = GetSystemSession();
    var compCode = SysSession.CurrentEnvironment.CompCode;
    var UserCode = SysSession.CurrentEnvironment.UserCode;
    var Token = "HGFD-" + SysSession.CurrentEnvironment.Token;
    var Model = new Asset_AssetCard();
    var AssetCards = new Array();
    Model.AssetCode;
    //var VendorTypes: Array<Ms_VendorTypes> = new Array<Ms_VendorTypes>();
    //var VendorCategory: Array<MS_VendorCategory> = new Array<MS_VendorCategory>();
    var Currency = new Array();
    //var Cities: Array<MSGA_City> = new Array<MSGA_City>();
    //var Employees: Array<Hr_Employees> = new Array<Hr_Employees>();
    var CostCenters = new Array();
    ///////// Detailes ///////////////////////
    var Detailes = new Asset_AssetCardDetailes();
    //var newBranche: Ms_VendorBranches = new Ms_VendorBranches();
    //var VendorBranches: Array<Ms_VendorBranches> = new Array<Ms_VendorBranches>();
    //var AllUsersForDropdown: Array<CustomVendorUsers> = new Array<CustomVendorUsers>();
    //var newUser: CustomVendorUsers = new CustomVendorUsers();
    //var VendorUsers: Array<CustomVendorUsers> = new Array<CustomVendorUsers>();
    //var Users: Array<Ms_VendorUsers> = new Array<Ms_VendorUsers>();
    //var newContact: Ms_VendorContacts = new Ms_VendorContacts();
    //var VendorContacts: Array<Ms_VendorContacts> = new Array<Ms_VendorContacts>();
    var newAccount = new Cal_AssetAccounts();
    var AssetAccounts = new Array();
    var AccountCharts = new Array();
    // select Options
    var VendorTypeId;
    var VendorCatId;
    var CurrencyId;
    var CityId;
    var EmpId;
    var CostCenterId;
    var CostCenterId2;
    var element;
    var _AssetId = 0;
    var StatusFlag;
    var Success;
    var hasNodes;
    var flag;
    var divAssetCardGrid = new JsGrid();
    var divBranchesGrid = new JsGrid();
    var divUsersGrid = new JsGrid();
    var divContactsGrid = new JsGrid();
    var GridInputClassName = "form-control gridIput";
    function InitalizeComponent() {
        SharedButtons.compcode = Number(SysSession.CurrentEnvironment.CompCode);
        localStorage.setItem("TableName", "Asset_AssetCard");
        NavigateModule.InitalizeComponent();
        SharedWork.OnNavigate = Navigate;
        SharedButtons.AddAction(function () {
            //GetAllUsers();
            btnAdd_onclick();
            ClearGrids();
        });
        SharedButtons.DeleteAction(function () { btnDelete_onclick(); });
        SharedButtons.EditAction(function () { btnEdit_onclick(); });
        SharedButtons.UndoAction(function () { Undo(); });
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
    AssetCard.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        // select Options
        VendorTypeId = document.getElementById("VendorTypeId");
        VendorCatId = document.getElementById("VendorCatId");
        CurrencyId = document.getElementById("CurrencyId");
        CityId = document.getElementById("CityId");
        EmpId = document.getElementById("EmpId");
        CostCenterId = document.getElementById("CostCenterId");
        CostCenterId2 = document.getElementById("CostCenterId2");
        SharedButtons.btnSearch = document.getElementById("btnAsset_AssetCardSearch");
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
        var ClrVendorBranches = new Array();
        divBranchesGrid.DataSource = ClrVendorBranches;
        divBranchesGrid.Bind();
        var ClrVendorUsers = new Array();
        divUsersGrid.DataSource = ClrVendorUsers;
        divUsersGrid.Bind();
        var ClrVendorContacts = new Array();
        divContactsGrid.DataSource = ClrVendorContacts;
        divContactsGrid.Bind();
    }
    function GetAll() {
        Disabled(false);
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("Asset_AssetCard", "GetAll"),
            success: function (d) {
                var result = d;
                if (result.IsSuccess) {
                    debugger;
                    AssetCards = result.Response;
                    divAssetCardGrid.DataSource = AssetCards;
                    divAssetCardGrid.Bind();
                }
            }
        });
    }
    function GetById(AssetId) {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("Asset_AssetCard", "GetById"),
            data: { id: AssetId },
            success: function (d) {
                var result = d;
                if (result.IsSuccess) {
                    Detailes = result.Response;
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
        divAssetCardGrid.OnItemInserting = function () { };
        divAssetCardGrid.OnItemUpdating = function () { };
        divAssetCardGrid.OnItemDeleting = function () { };
        divAssetCardGrid.OnRowSelected = function () {
            Display(Model = GetById(divAssetCardGrid.SelectedItem.AssetId).Model);
            SharedWork.SwitchModes(ScreenModes.Query);
        };
        divAssetCardGrid.Columns = [
            {
                title: Resource.ProductivityMachine, css: "ColumPadding", name: "IsProduction", type: "checkbox"
            },
            {
                title: Resource.Code, css: "ColumPadding", name: "AssetCode"
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
                headerTemplate: function () {
                    var txt = CreateElement("text", GridInputClassName, " ", " ", "AssetId", " ");
                    txt.disabled = true;
                    txt.id = "hd_VendorId";
                    return HeaderTemplate("AssetId", txt);
                }
            }
        ];
        divAssetCardGrid.Bind();
    }
    function Display(model) {
        DocumentActions.RenderFromModel(model);
        Model = model;
        _AssetId = Number(Model.AssetId);
    }
    function Navigate() {
        Model = AssetCards[SharedWork.PageIndex - 1];
        _AssetId = Model.AssetId;
        Model = GetById(_AssetId).Model;
        if (Model != null) {
            Display(Model);
        }
    }
    AssetCard.Navigate = Navigate;
    function btnAdd_onclick() {
        StatusFlag = 'i';
        RemoveDisabled(true);
        $('select').val('null');
    }
    function RemoveDisabled(clear) {
        DocumentActions.allElements(false, clear, Model);
        $('#accounts select').prop('disabled', false).select2().trigger('change');
        $('#BasicAccCode').prop('disabled', false).select2().trigger('change');
    }
    function Undo() {
        Disabled(true);
        Success = false;
    }
    function Disabled(clear) {
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
        if (!ValidationHeader())
            return;
        Save();
    }
    function ValidationHeader() {
        if (DocumentActions.GetElementByName("AssetCode").value == "") {
            MessageBox.Show(Resource.PleaseEnterVendorCode, Resource.Error);
            return false;
        }
        else if (DocumentActions.GetElementByName("Name1").value == "") {
            MessageBox.Show(Resource.PleaseEnterNameArabic, Resource.Error);
            return false;
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
        Detailes.Model = DocumentActions.AssignToModel(Model);
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
            success: function (Response) {
                var result = Response;
                if (result.IsSuccess) {
                    Model = result.Response;
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
            success: function (Response) {
                var result = Response;
                if (result.IsSuccess) {
                    Model = result.Response;
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
            success: function (result) {
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
        var sys = new SystemTools();
        sys.FindKey(Modules.Asset_AssetCard, SharedButtons.btnSearch.id, "", function () {
            var id = SearchGrid.SearchDataGrid.SelectedKey;
            if (!IsNullOrEmpty(id)) {
                Display(id);
            }
        });
    }
    function GetAssistantAccounts() {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("funcationShared", "GetAssistantAccounts"),
            success: function (Response) {
                var result = Response;
                if (result.IsSuccess) {
                    AccountCharts = result.Response;
                    var AddAccounts = $('#AddAccounts select'), BasicAccCode = $('#BasicAccCode')[0];
                    for (var i = 0; i < AddAccounts.length; i++) {
                        var selectElment = AddAccounts[i];
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
    function DisplayAccounts(accounts) {
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
        AssetAccounts = new Array();
        newAccount = new Cal_AssetAccounts();
        var AddAccounts = $('#AddAccounts select'), BasicAccCode = $('#BasicAccCode')[0];
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
            var selectElment = AddAccounts[i], text = selectElment.options[selectElment.selectedIndex];
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
            success: function (Response) {
                var result = Response;
                if (result.IsSuccess) {
                    CostCenters = result.Response;
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
            success: function (Response) {
                var result = Response;
                if (result.IsSuccess) {
                    Currency = result.Response;
                    DocumentActions.FillCombowithCode(Currency, CurrencyId, "CurrencyId", "CurrencyDescA", "CurrencyCode", Resource.Currency);
                }
            }
        });
    }
    function CheckCode(entity, code, property) {
        var isExist = entity.filter(function (x) { return x[property] == code.trim(); })[0];
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
})(AssetCard || (AssetCard = {}));
//# sourceMappingURL=Asset_AssetCard.js.map