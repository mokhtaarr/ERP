$(document).ready(() => {
    SharedButtons.OnLoad();
    MSVendor.InitalizeComponent();
})
 
namespace MSVendor {
    $('#headertop1').addClass('display_none');
    $('#headertop2').removeClass('display_none');
    let Resource: any = GetResourceList("");
    $('#headerTitle').text(Resource.Suppliers);

    var sys: SystemTools = new SystemTools();
    var SysSession: SystemSession = GetSystemSession();
    let compCode = SysSession.CurrentEnvironment.CompCode;
    let UserCode = SysSession.CurrentEnvironment.UserCode;
    let Token = "HGFD-" + SysSession.CurrentEnvironment.Token;

    var Vendor: MS_Vendor = new MS_Vendor();
    var Vendors: Array<MS_Vendor> = new Array<MS_Vendor>();
    var VendorTypes: Array<Ms_VendorTypes> = new Array<Ms_VendorTypes>();
    var VendorCategory: Array<MS_VendorCategory> = new Array<MS_VendorCategory>();
    var Currency: Array<MS_Currency> = new Array<MS_Currency>();
    var Cities: Array<MSGA_City> = new Array<MSGA_City>();
    var Employees: Array<Hr_Employees> = new Array<Hr_Employees>();
    var CostCenters: Array<Cal_CostCenters> = new Array<Cal_CostCenters>();

    ///////// Detailes ///////////////////////
    var Detailes: DetailesForVendor = new DetailesForVendor();

    var newBranche: Ms_VendorBranches = new Ms_VendorBranches();
    var VendorBranches: Array<Ms_VendorBranches> = new Array<Ms_VendorBranches>();

    var AllUsersForDropdown: Array<CustomVendorUsers> = new Array<CustomVendorUsers>();
    var newUser: CustomVendorUsers = new CustomVendorUsers();
    var VendorUsers: Array<CustomVendorUsers> = new Array<CustomVendorUsers>();
    var Users: Array<Ms_VendorUsers> = new Array<Ms_VendorUsers>();

    var newContact: Ms_VendorContacts = new Ms_VendorContacts();
    var VendorContacts: Array<Ms_VendorContacts> = new Array<Ms_VendorContacts>();
    var newAccount: Cal_VendAccounts = new Cal_VendAccounts();
    var CustAccounts: Array<Cal_VendAccounts> = new Array<Cal_VendAccounts>();
    var AccountCharts: Array<Cal_AccountChart> = new Array<Cal_AccountChart>();


    var formMain: HTMLFormElement;
    var formAdditionalData: HTMLFormElement;
    var formPricingPolicies: HTMLFormElement;

    // select Options
    var VendorTypeId: HTMLSelectElement;
    var VendorCatId: HTMLSelectElement;
    var CurrencyId: HTMLSelectElement;
    var CityId: HTMLSelectElement;
    var EmpId: HTMLSelectElement;
    var CostCenterId: HTMLSelectElement;

    var element: HTMLInputElement;

    var _VendorId = 0;
    var StatusFlag;
    var Success;
    var hasNodes: boolean;
    var flag: boolean;

    var divVendorGrid: JsGrid = new JsGrid();
    var divBranchesGrid: JsGrid = new JsGrid();
    var divUsersGrid: JsGrid = new JsGrid();
    var divContactsGrid: JsGrid = new JsGrid();
    const GridInputClassName = "form-control gridIput";

    export function InitalizeComponent() {
        SharedButtons.compcode = Number(SysSession.CurrentEnvironment.CompCode);
        localStorage.setItem("TableName", "MS_Vendor");
        NavigateModule.InitalizeComponent();

        SharedWork.OnNavigate = Navigate;
        SharedButtons.AddAction(() => {
            GetAllUsers();
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

        InitializeGrid();
        InitializSelectOptoins();
        InitializeBranchesGrid();
        InitializeUsersGrid();
        InitializeContactsGrid();
        GetAssistantAccounts();
    }

    function InitalizeControls() {
        formMain = document.getElementById("formMain") as HTMLFormElement;
        formAdditionalData = document.getElementById("formAdditionalData") as HTMLFormElement;
        formPricingPolicies = document.getElementById("formPricingPolicies") as HTMLFormElement;

        // select Options
        VendorTypeId = document.getElementById("VendorTypeId") as HTMLSelectElement;
        VendorCatId = document.getElementById("VendorCatId") as HTMLSelectElement;
        CurrencyId = document.getElementById("CurrencyId") as HTMLSelectElement;
        CityId = document.getElementById("CityId") as HTMLSelectElement;
        EmpId = document.getElementById("EmpId") as HTMLSelectElement;
        CostCenterId = document.getElementById("CostCenterId") as HTMLSelectElement;

        SharedButtons.btnSearch = document.getElementById("btnVendorSearch") as HTMLButtonElement;
    }

    function InitalizeEvents() {
        SharedButtons.btnSearch.onclick = btnSearch_onclick;
        SharedButtons.btnRefrash2.onclick = Refrash;
    }

    function ClearGrids() {
        ClearBranchesGrid();
        VendorBranches = new Array<Ms_VendorBranches>();
        VendorUsers = new Array<CustomVendorUsers>();
        Users = new Array<Ms_VendorUsers>();
        VendorContacts = new Array<Ms_VendorContacts>();
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
            url: sys.apiUrl("MS_Vendor", "GetAll"),
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess) {
                    Vendors = result.Response as Array<MS_Vendor>;
                    divVendorGrid.DataSource = Vendors;
                    divVendorGrid.Bind();
                }
            }
        });
    }

    function InitializeGrid() {
        divVendorGrid.ElementName = "divVendorGrid";
        divVendorGrid.PrimaryKey = "VendorId";
        divVendorGrid.Editing = true;
        divVendorGrid.Paging = true;
        divVendorGrid.Sorting = true;
        divVendorGrid.PageSize = 10;
        divVendorGrid.ConfirmDeleteing = true;
        divVendorGrid.InsertionMode = JsGridInsertionMode.Binding;
        divVendorGrid.OnItemInserting = () => { };
        divVendorGrid.OnItemUpdating = () => { };
        divVendorGrid.OnItemDeleting = () => { };
        divVendorGrid.OnRowSelected = () => {
            GetDataRow();
            SharedWork.SwitchModes(ScreenModes.Query);
        };
        divVendorGrid.OnRowDoubleClicked = () => {
            GetDataRow();
            SharedWork.SwitchModes(ScreenModes.Query);
        }
        divVendorGrid.Columns = [
            {
                title: Resource.IsActive, css: "ColumPadding", name: "IsActive", type: "checkbox"
            },
            {
                title: Resource.Code , css: "ColumPadding", name: "VendorCode"
            },
            {
                title: Resource.VendorName + " 1", css: "ColumPadding", name: "VendorDescA"
            },
            {
                title: Resource.VendorName + " 2", css: "ColumPadding", name: "VendorDescE"
            },
            {
                title: "VendorId", css: "ColumPadding disable hidden", name: "VendorId", width: "1%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("text", GridInputClassName, " ", " ", "VendorId", " ");
                    txt.disabled = true;
                    txt.id = "hd_VendorId";
                    return HeaderTemplate("VendorId", txt);
                }
            }
        ];
        divVendorGrid.Bind();
    }

    function GetDataRow() {
        var obj: MS_Vendor = divVendorGrid.SelectedItem;
        _VendorId = Number(obj.VendorId);
        SetRow(_VendorId);
        //GetDetailes(_VendorId);
    }

    function SetRow(Id) {
        Vendor = new MS_Vendor();
        _VendorId = Id;
        GetDetailes(_VendorId);
        //Vendor = Vendors.filter(x => x.VendorId == Number(Id))[0];
        if (Vendor != null) {
            DocumentActions.RenderFromModel(Vendor);
            _VendorId = Id;

            $('#accounts select').val('null').select2().trigger('change');
            for (var i = 0; i < Detailes.accounts.length; i++) {
                SelectDrobInGrid(Detailes.accounts[i].AccountDescription, Detailes.accounts[i].AccountId.toString());
                $('#' + Detailes.accounts[i].AccountDescription).select2().trigger('change');
            }

            if (Detailes.accounts.length == 0) {
                $('#BasicAccCode').val('null').select2().trigger('change');
                $('#accounts select').val('null').select2().trigger('change');
            }
        }
        SharedWork.SwitchModes(ScreenModes.Query);
    }

    function FillInputs(json, form: HTMLFormElement) {
        $.each(json, function (key, value) {
            let controller = $(form.elements.namedItem(key));

            if (controller.is('[type="date"]')) {
                if (value != null) {
                    let finalValue = FormatDate(value);
                    controller.val(finalValue);
                }
                else
                    controller.val('');
            }
            else {
                if (controller[0] != null) {
                    if (controller[0].tagName == 'SELECT')
                        controller.val(value == null ? 'null' : value);
                    else {
                        if (controller.is('[type="checkbox"]')) {
                            controller.val(value);
                            controller.prop("checked", value);
                        }
                        else
                            controller.val(value);
                    }
                }
            }
        });
    };

    function FormatDate(value: string) {
        let date = new Date(value);
        let newDate = date.getFullYear() + '-' + ("0" + (date.getMonth() + 1)).slice(-2) + '-' + date.getDate();
        return newDate;
    }

    export function Navigate() {
        Vendor = Vendors[SharedWork.PageIndex - 1];
        _VendorId = Vendor.VendorId;
        if (Vendor != null) {
            SetRow(_VendorId);
        }
    }

    function btnAdd_onclick() {
        StatusFlag = 'i';
        RemoveDisabled(true);
        $('select').val('null');
    }

    function RemoveDisabled(clear: boolean) {
        allElements(false, clear);
        $('#accounts select').prop('disabled', false).select2().trigger('change');
    }

    function allElements(isVisible: boolean, clear: boolean) {
        for (var i = 0; i < formMain.elements.length; i++) {
            element = formMain.elements.item(i) as HTMLInputElement;
            if (element.name == SharedButtons.btnSearch.name)
                continue;
            else {
                element.disabled = isVisible;
                element.value = clear ? '' : element.value;
            }
        }
        for (var i = 0; i < formAdditionalData.elements.length; i++) {
            element = formAdditionalData.elements.item(i) as HTMLInputElement;
            element.disabled = isVisible;
            element.value = clear ? '' : element.value;
        }
        for (var i = 0; i < formPricingPolicies.elements.length; i++) {
            element = formPricingPolicies.elements.item(i) as HTMLInputElement;
            element.disabled = isVisible;
            element.value = clear ? '' : element.value;
        }
    }

    function Undo() {
        Disabled(true);
        Success = false;
    }

    function Disabled(clear: boolean) {
        allElements(true, clear);
        $('#accounts select').prop('disabled', true).select2().trigger('change');
    }

    function GetElementByName(name: string) {
        element = formMain.elements.namedItem(name) as HTMLInputElement;
        return element;
    }

    function btnEdit_onclick() {
        if (_VendorId == 0) {
            MessageBox.Show(Resource.PleaseSelectItem, Resource.Error);
        }
        else {
            RemoveDisabled(false);
            element = GetElementByName("VendorCode");
            element.disabled = true;
            StatusFlag = 'u';
        }
    }

    function btnsave_onClick() {
        if (!ValidationHeader()) return
        Save();
    }

    function ValidationHeader() {
        if (GetElementByName("VendorCode").value == "") {
            MessageBox.Show(Resource.PleaseEnterVendorCode, Resource.Error);
            return false
        }
        else if (GetElementByName("VendorDescA").value == "") {
            MessageBox.Show(Resource.PleaseEnterNameArabic, Resource.Error);
            return false
        }
        return true;
    }

    function Save() {
        if (CheckCode(Vendors, GetElementByName("VendorCode").value, "VendorCode") == false && StatusFlag == "i") {
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

    function FillObjectFromInputs(json, from: HTMLFormElement) {
        $.each(from, function (key) {
            let controller = from[key] as HTMLInputElement;
            if (controller.type == 'checkbox')
                Vendor[controller.name] = controller.checked;
            else
                Vendor[controller.name] = controller.value;
        });
    };

    function Assign() {
        Vendor = new MS_Vendor();
        MapCustomVendorUsers();

        Detailes.branches = VendorBranches;
        Detailes.users = Users;
        Detailes.contacts = VendorContacts;
        Detailes.accounts = MapVendorAccounts();

        if (StatusFlag == "i") {
            FillObjectFromInputs(Vendor, formMain);
            FillObjectFromInputs(Vendor, formAdditionalData);
            FillObjectFromInputs(Vendor, formPricingPolicies);

            Detailes.Vendor = Vendor;
            Vendor.CreatedAt = DateTimeFormat(Date().toString());
            Vendor.CreatedBy = SysSession.CurrentEnvironment.UserCode;

            Insert();
        }
        if (StatusFlag == "u") {
            FillObjectFromInputs(Vendor, formMain);
            FillObjectFromInputs(Vendor, formAdditionalData);
            FillObjectFromInputs(Vendor, formPricingPolicies);
            Vendor.VendorId = _VendorId;

            Detailes.Vendor = Vendor;
            Vendor.UpdateAt = DateTimeFormat(Date().toString());
            Vendor.UpdateBy = SysSession.CurrentEnvironment.UserCode;
            Update();
        }
        GetDetailes(Detailes.Vendor.VendorId);
        GetAll();
        return true;
    }

    function Insert() {
        $("#MessageBoxDialog").modal("hide");
        Ajax.Callsync({
            type: "POST",
            url: sys.apiUrl("MS_Vendor", "Insert"),
            data: JSON.stringify(Detailes),
            success: (Response) => {
                let result = Response as BaseResponse;
                if (result.IsSuccess) {
                    Vendor = result.Response as MS_Vendor;
                    _VendorId = Vendor.VendorId;
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
            url: sys.apiUrl("MS_Vendor", "Update"),
            data: JSON.stringify(Detailes),
            success: (Response) => {
                let result = Response as BaseResponse;
                if (result.IsSuccess) {
                    Vendor = result.Response as MS_Vendor
                    _VendorId = Vendor.VendorId;
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
        if (_VendorId == 0) {
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
            url: sys.apiUrl("MS_Vendor", "Delete") + "/" + _VendorId,
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

    function InitializSelectOptoins() {
        GetVendorTypes();
        GetVendorCategory();
        GetCurrency();
        GetCity();
        GetEmployees();
        GetCostCenters();
    }
    
    function GetVendorTypes() {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("MS_Vendor", "GetAllVendorTypes"),
            success: (Response) => {
                let result = Response as BaseResponse;
                if (result.IsSuccess) {
                    VendorTypes = result.Response as Array<Ms_VendorTypes>;
                    DocumentActions.FillCombowithCode(VendorTypes, VendorTypeId, "VendorTypeId", "VendorTypeDescA", "VendorTypeCode", Resource.VendorType);
                }
            }
        });
    }

    function GetVendorCategory() {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("MS_Vendor", "GetAllVendorCategory"),
            success: (Response) => {
                let result = Response as BaseResponse;
                if (result.IsSuccess) {
                    VendorCategory = result.Response as Array<MS_VendorCategory>;
                    DocumentActions.FillCombowithCode(VendorCategory, VendorCatId, "VendorCatId", "CatDescA", "CatCode", Resource.Category);
                }
            }
        });
    }

    function GetCurrency() {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("MS_Vendor", "GetCurrencies"),
            success: (Response) => {
                let result = Response as BaseResponse;
                if (result.IsSuccess) {
                    Currency = result.Response as Array<MS_Currency>;
                    DocumentActions.FillCombowithCode(Currency, CurrencyId, "CurrencyId", "CurrencyDescA", "CurrencyCode", Resource.Currency);
                }
            }
        });
    }

    function GetCity() {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("MS_Vendor", "GetCities"),
            success: (Response) => {
                let result = Response as BaseResponse;
                if (result.IsSuccess) {
                    Cities = result.Response as Array<MSGA_City>;
                    DocumentActions.FillCombowithCode(Cities, CityId, "CityID", "CityName", " ", Resource.Governorate);
                }
            }
        });
    }

    function GetEmployees() {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("MS_Vendor", "GetEmployees"),
            success: (Response) => {
                let result = Response as BaseResponse;
                if (result.IsSuccess) {
                    Employees = result.Response as Array<Hr_Employees>;
                    DocumentActions.FillCombowithCode(Employees, EmpId, "EmpId", "Name1", "EmpCode", Resource.Representative);
                }
            }
        });
    }

    function GetCostCenters() {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("MS_Vendor", "GetCostCenters"),
            success: (Response) => {
                let result = Response as BaseResponse;
                if (result.IsSuccess) {
                    CostCenters = result.Response as Array<Cal_CostCenters>;
                    DocumentActions.FillCombowithCode(CostCenters, CostCenterId, "CostCenterId", "CostCenterNameA", "CostCenterCode", Resource.CostCenter);
                }
            }
        });
    }

    function btnSearch_onclick() {
        let sys: SystemTools = new SystemTools();
        sys.FindKey(Modules.MS_Vendor, SharedButtons.btnSearch.id, "", () => {
            let id = SearchGrid.SearchDataGrid.SelectedKey;
            if (!IsNullOrEmpty(id)) {
                SetRow(id);
            }
        });
    }

    function GetDetailes(id: number) {
        Ajax.Callsync({
            type: "GET",
            url: sys.apiUrl("MS_Vendor", "GetDetailesForVendor") + "/" + id,
            data: JSON.stringify(Vendor),
            success: (Response) => {
                let result = Response as BaseResponse;
                if (result.IsSuccess) {
                    Detailes = result.Response as DetailesForVendor;
                    FillDetailes(Detailes);
                }
                else {
                    MessageBox.Show(Resource.Error, Resource.Error);
                    Success = false;
                }
            }
        });
    }

    function GetAllUsers() {
        Ajax.Callsync({
            type: "GET",
            url: sys.apiUrl("MS_Vendor", "GetAllUsers"),
            data: { CompCode: compCode, Token: Token, UserCode: UserCode},
            success: (Response) => {
                AllUsersForDropdown = Response as Array<CustomVendorUsers>;
            }
        });
    }

    function GetUser(code: string) {
        Ajax.Callsync({
            type: "GET",
            url: sys.apiUrl("MS_Vendor", "GetUser"),
            data: { CompCode: compCode, Token: Token, UserCode: UserCode, UserCodeSelected: code},
            success: (Response) => {
                let result = Response as BaseResponse;
                if (result.IsSuccess) {
                    newUser = result.Response as CustomVendorUsers;
                    fillUserInput(newUser);
                }
            }
        });
    }

    function fillUserInput(User: CustomVendorUsers) {
        $("#divUsersGrid #hd_USER_CODE").val(User.USER_CODE);
        $("#divUsersGrid #hd_USER_NAME").val(User.USER_NAME);
        $("#divUsersGrid #hd_FirstName").val(User.FirstName);

        $("#divUsersGrid #hd_UserId").val(User.UserId);
        $("#divUsersGrid #hd_CustUserId").val($('#hd_CustUserId').val());
        $("#divUsersGrid #hd_VendorId").val(User.VendUserId);
    }

    function FillDetailes(Detailes: DetailesForVendor) {
        Vendor = Detailes.Vendor;
        VendorBranches = Detailes.branches;
        divBranchesGrid.DataSource = VendorBranches;
        divBranchesGrid.Bind();

        GetAllUsers();
        VendorUsers = Detailes.CustomUsers;
        divUsersGrid.DataSource = VendorUsers;
        divUsersGrid.Bind();
        
        VendorContacts = Detailes.contacts;
        divContactsGrid.DataSource = VendorContacts;
        divContactsGrid.Bind();
    }

    //////////////////////// start Add Vendor Branch In Grid /////////////////////////
    function AddVendBranchInGrid() {
        flag = true;
        newBranche = new Ms_VendorBranches();
        let hd_VendBranchCode = $('#hd_VendBranchCode'),
            hd_VendBranchName1 = $('#hd_VendBranchName1'),
            hd_VendBranchId = $('#hd_VendBranchId'),
            hd_VendorId = $('#hd_VendorId');

        if (hd_VendBranchCode.val().trim() == "")
        { MessageBox.Show(Resource.PleaseEnterCode, Resource.Error); flag = false; return }
        else newBranche.VendBranchCode = hd_VendBranchCode.val().trim();

        if (hd_VendBranchName1.val().trim() == "")
        { MessageBox.Show(Resource.PleaseEnterName +" 1", Resource.Error); flag = false; return }
        else newBranche.VendBranchName1 = hd_VendBranchName1.val().trim(); 

        if (flag) {
            newBranche.VendBranchName2 = $('#hd_VendBranchName2').val().trim();
            newBranche.Address = $('#hd_Address').val().trim();
            newBranche.Remarks = $('#hd_Remarks').val().trim();
            newBranche.Remarks = $('#hd_Remarks').val().trim();
            newBranche.VendorId = hd_VendorId.val().trim();

            if ($('#hd_Flag').val().trim() == "u") 
                newBranche.StatusFlag = "u";
            else newBranche.StatusFlag = "i";

            if (hd_VendBranchId.val().trim() == "") newBranche.VendBranchId = 0;
            else newBranche.VendBranchId = hd_VendBranchId.val().trim();

            VendorBranches.unshift(newBranche);
            divBranchesGrid.DataSource = VendorBranches;
            divBranchesGrid.Bind();
        }
        return;
    }
    function InitializeBranchesGrid() { 
        divBranchesGrid.ElementName = "divBranchesGrid";
        divBranchesGrid.Editing = true;
        divBranchesGrid.Paging = true;
        divBranchesGrid.Sorting = true;
        divBranchesGrid.PageSize = 10;
        divBranchesGrid.ConfirmDeleteing = true;
        divBranchesGrid.InsertionMode = JsGridInsertionMode.Binding;
        divBranchesGrid.OnItemInserting = () => { };
        divBranchesGrid.OnItemUpdating = () => { };
        divBranchesGrid.OnItemDeleting = () => { };
        divBranchesGrid.Columns = [
            {
                title: "#", name: "btnAddItem", visible: true, width: "9%",
                headerTemplate: (): HTMLElement => {
                    let btn: HTMLButtonElement = DocumentActions.CreateElement<HTMLButtonElement>("button");
                    btn.className = TransparentButton + " editable";
                    btn.type = "button";
                    
                    
                    btn.innerHTML = "<span class='fa fa-plus'></span>";
                    btn.id = "btnAddItemGrid";
                    btn.onclick = (e) => {
                        if (SharedWork.CurrentMode == ScreenModes.Query || SharedWork.CurrentMode == ScreenModes.Start || SharedWork.CurrentMode == ScreenModes.NoData) {
                            WorningMessage("يجب اختيار وضع التعديل اولا ", "Please Select Edit Mode First");
                            return;
                        }
                        AddVendBranchInGrid();
                    };
                    return btn;
                },
                itemTemplate: (s: string, item: Ms_VendorBranches): HTMLButtonElement => {
                    let btn: HTMLButtonElement = DocumentActions.CreateElement<HTMLButtonElement>("button");
                    btn.innerHTML = "<i class='fas fa-times'></i>";
                    btn.className = TransparentButton + "  red_Delete_Cotnrol editable";
                    
                    btn.type = "button";
                    
                    btn.name = VendorBranches.indexOf(item).toString();
                    btn.id = "btnRemoveItemGrid";
                    btn.onclick = (e) => {
                        let index = Number((e.currentTarget as HTMLButtonElement).name);
                        VendorBranches[index].StatusFlag = "d";
                        VendorBranches.push(VendorBranches[index]);
                        VendorBranches.splice(index, 1);
                        divBranchesGrid.Bind();
                    };
                    return btn;
                }
            }
            ,
            {
                css: JsGridHeaderCenter, itemTemplate: (s: string, item: Ms_VendorBranches): HTMLButtonElement => {
                    let btn: HTMLButtonElement = DocumentActions.CreateElement<HTMLButtonElement>("button");
                    btn.innerHTML = "<i class='fa fa-edit'></i>";
                    btn.className = TransparentButton + " " + "emptrainingedit " + "green_edit_control editable";
                    
                    btn.type = "button";
                    
                    btn.name = VendorBranches.indexOf(item).toString();
                    btn.id = "btnUpdateItemGrid";
                    btn.onclick = (e) => {
                        let index = Number((e.currentTarget as HTMLButtonElement).name);
                        VendorBranches.splice(index, 1);
                        divBranchesGrid.DataSource = VendorBranches;
                        divBranchesGrid.Bind();
                        if (item.VendBranchCode != null) FillInputText("hd_VendBranchCode", item.VendBranchCode.toString());
                        if (item.VendBranchName1 != null) FillInputText("hd_VendBranchName1", item.VendBranchName1.toString());
                        if (item.VendBranchName2 != null) FillInputText("hd_VendBranchName2", item.VendBranchName2.toString());
                        if (item.Remarks != null) FillInputText("hd_Remarks", item.Remarks.toString());
                        if (item.Address != null) FillInputText("hd_Address", item.Address.toString());
                        if (item.VendBranchId != null) FillInputText("hd_VendBranchId", item.VendBranchId.toString());
                        if (item.VendorId != null) FillInputText("hd_VendorId", item.VendorId.toString());
                        FillInputText("hd_Flag", "u");
                    };
                    return btn;
                }
            },
            {
                title: Resource.BranchCode, css: "ColumPadding", name: "VendBranchCode", headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("text", GridInputClassName, " ", " ", "VendBranchCode", " ");
                    txt.id = "hd_VendBranchCode";
                    return HeaderTemplate(Resource.BranchCode, txt);
                }
            },
            {
                title: Resource.App_Name + " 1", css: "ColumPadding", name: "VendBranchName1", headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("text", GridInputClassName, " ", " ", "VendBranchName1", " ");
                    txt.id = "hd_VendBranchName1";
                    return HeaderTemplate(Resource.App_Name + " 1", txt);
                }
            },
            {
                title: Resource.App_Name + " 2", css: "ColumPadding", name: "VendBranchName2", headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("text", GridInputClassName, " ", " ", "VendBranchName2", " ");
                    txt.id = "hd_VendBranchName2";
                    return HeaderTemplate(Resource.App_Name + " 2", txt);
                }
            },
            {
                title: Resource.Address, css: "ColumPadding", name: "Address", headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("text", GridInputClassName, " ", " ", "Address", " ");
                    txt.id = "hd_Address";
                    return HeaderTemplate(Resource.Address, txt);
                }
            },
            {
                title: Resource.Notes, css: "ColumPadding", name: "Remarks", headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("text", GridInputClassName, " ", " ", "Remarks", " ");
                    txt.id = "hd_Remarks";
                    return HeaderTemplate(Resource.Notes, txt);
                }
            },
            {
                title: "Flag", css: "ColumPadding hide", name: "Flag", width: "1%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("text", GridInputClassName, " ", " ", "Flag", " ");
                    txt.disabled = false;
                    txt.id = "hd_Flag";
                    return HeaderTemplate("Flag", txt);
                }
            },
            {
                title: "VendorId", css: "ColumPadding hide", name: "VendorId", width: "1%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("text", GridInputClassName, " ", " ", "VendorId", " ");
                    txt.disabled = false;
                    txt.id = "hd_VendorId";
                    return HeaderTemplate("VendorId", txt);
                }
            },
            {
                title: "VendBranchId", css: "ColumPadding hide", name: "VendBranchId", width: "1%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("text", GridInputClassName, " ", " ", "VendBranchId", " ");
                    txt.disabled = false;
                    txt.id = "hd_VendBranchId";
                    return HeaderTemplate("VendBranchId", txt);
                }
            },
        ];
        divBranchesGrid.Bind();
    }
    //////////////////////// End Add Vendor Branch In Grid /////////////////////////

    //////////////////////// start Add User In Grid /////////////////////////
    function AddUsersGridInGrid() {
        flag = true;
        newUser = new CustomVendorUsers();
        let hd_USER_CODE = $('#hd_USER_CODE'),
            hd_USER_NAME = $('#hd_USER_NAME'),
            hd_FirstName = $('#hd_FirstName'),
            hd_UserId = $('#hd_UserId'),
            hd_VendUserId = $('#hd_VendUserId'),
            hd_VendorId = $('#hd_VendorId');

        if (hd_USER_CODE.val().trim() == "") { MessageBox.Show(Resource.PleaseEnterCode, Resource.Error); flag = false; return }
        else newUser.USER_CODE = hd_USER_CODE.val().trim();

        if (flag) {
            newUser.USER_NAME = hd_USER_NAME.val().trim();
            newUser.FirstName = hd_FirstName.val().trim();

            if (hd_VendUserId.val().trim() == "") newUser.VendUserId = 0;
            else newUser.VendUserId = hd_VendUserId.val().trim();
            if (hd_UserId.val().trim() == "") newUser.UserId = 0;
            else newUser.UserId = hd_UserId.val().trim();
            if (hd_VendorId.val().trim() == "") newUser.VendorId = 0;
            else newUser.VendorId = hd_VendorId.val().trim();

            if ($('#hd_Flag').val().trim() == "u") {
                newUser.StatusFlag = "u";
                newUser.UpdateAt = DateTimeFormat(Date().toString());
                newUser.UpdateBy = SysSession.CurrentEnvironment.UserCode;
            }
            else {
                newUser.StatusFlag = "i";
                newUser.CreatedAt = DateTimeFormat(Date().toString());
                newUser.CreatedBy = SysSession.CurrentEnvironment.UserCode;
            }


            VendorUsers.unshift(newUser);
            divUsersGrid.DataSource = VendorUsers;
            divUsersGrid.Bind();
        }
        return;
    }
    function InitializeUsersGrid() {
        divUsersGrid.ElementName = "divUsersGrid";
        divUsersGrid.Editing = true;
        divUsersGrid.Paging = true;
        divUsersGrid.Sorting = true;
        divUsersGrid.PageSize = 10;
        divUsersGrid.ConfirmDeleteing = true;
        divUsersGrid.InsertionMode = JsGridInsertionMode.Binding;
        divUsersGrid.OnItemInserting = () => { };
        divUsersGrid.OnItemUpdating = () => { };
        divUsersGrid.OnItemDeleting = () => { };
        divUsersGrid.Columns = [
            {
                title: "#", name: "btnAddItem", visible: true, width: "9%",
                headerTemplate: (): HTMLElement => {
                    let btn: HTMLButtonElement = DocumentActions.CreateElement<HTMLButtonElement>("button");
                    btn.className = TransparentButton + " editable";
                    btn.type = "button";
                    
                    
                    btn.innerHTML = "<span class='fa fa-plus'></span>";
                    btn.id = "btnAddItemGrid";
                    btn.onclick = (e) => {
                        if (SharedWork.CurrentMode == ScreenModes.Query || SharedWork.CurrentMode == ScreenModes.Start || SharedWork.CurrentMode == ScreenModes.NoData) {
                            WorningMessage("يجب اختيار وضع التعديل اولا ", "Please Select Edit Mode First");
                            return;
                        }
                        AddUsersGridInGrid();
                    };
                    return btn;
                },
                itemTemplate: (s: string, item: CustomVendorUsers): HTMLButtonElement => {
                    let btn: HTMLButtonElement = DocumentActions.CreateElement<HTMLButtonElement>("button");
                    btn.innerHTML = "<i class='fas fa-times'></i>";
                    btn.className = TransparentButton + "  red_Delete_Cotnrol editable";
                    
                    btn.type = "button";
                    
                    btn.name = VendorUsers.indexOf(item).toString();
                    btn.id = "btnRemoveItemGrid";
                    btn.onclick = (e) => {
                        let index = Number((e.currentTarget as HTMLButtonElement).name);
                        VendorUsers[index].StatusFlag = "d";
                        VendorUsers.push(VendorUsers[index]);
                        VendorUsers.splice(index, 1);
                        divUsersGrid.Bind();
                        //$(e.currentTarget).parent().parent().children().css('background-color', 'ff9e9e');
                    };
                    return btn;
                }
            },
            {
                css: JsGridHeaderCenter, itemTemplate: (s: string, item: CustomVendorUsers): HTMLButtonElement => {
                    let btn: HTMLButtonElement = DocumentActions.CreateElement<HTMLButtonElement>("button");
                    btn.innerHTML = "<i class='fa fa-edit'></i>";
                    btn.className = TransparentButton + " " + "emptrainingedit " + "green_edit_control editable";
                    
                    btn.type = "button";
                    
                    btn.name = VendorUsers.indexOf(item).toString();
                    btn.id = "btnUpdateItemGrid";
                    btn.onclick = (e) => {
                        let index = Number((e.currentTarget as HTMLButtonElement).name);
                        VendorUsers.splice(index, 1);
                        divUsersGrid.DataSource = VendorUsers;
                        divUsersGrid.Bind();
                        if (item.USER_CODE != null) SelectDrobInGrid("hd_USER_CODE", item.USER_CODE.toString());
                        if (item.USER_NAME != null) FillInputText("hd_USER_NAME", item.USER_NAME.toString());
                        if (item.FirstName != null) FillInputText("hd_FirstName", item.FirstName.toString());
                        if (item.UserId != null) FillInputText("hd_UserId", item.UserId.toString());
                        if (item.VendUserId != null) FillInputText("hd_VendUserId", item.VendUserId.toString());
                        if (item.VendorId != null) FillInputText("hd_VendorId", item.VendorId.toString());
                        FillInputText("hd_Flag", "u");
                    };
                    return btn;
                }
            },
            {
                title: Resource.UserCode, css: "ColumPadding", name: "USER_CODE", headerTemplate: (): HTMLTableElement => {
                    let txt = CreateDropdownList(AllUsersForDropdown, "UserName", "UserName", "UserCode", false);
                    txt.id = "hd_USER_CODE";
                    txt.onchange = (e) => {
                        GetUser($(e.target).val());
                    }
                    return HeaderTemplate(Resource.UserCode, txt);
                }
            },
            {
                title: Resource.UserName , css: "ColumPadding", name: "USER_NAME", headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("text", GridInputClassName, " ", " ", "USER_NAME", " ");
                    txt.id = "hd_USER_NAME";
                    txt.readOnly = true;
                    return HeaderTemplate(Resource.UserName, txt);
                }
            },
            {
                title: Resource.FirstName, css: "ColumPadding", name: "FirstName", headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("text", GridInputClassName, " ", " ", "FirstName", " ");
                    txt.id = "hd_FirstName";
                    txt.readOnly = true;
                    return HeaderTemplate(Resource.FirstName, txt);
                }
            },
            {
                title: "Flag", css: "ColumPadding hide", name: "Flag", width: "1%", headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("text", GridInputClassName, " ", " ", "Flag", " ");
                    txt.disabled = false;
                    txt.id = "hd_Flag";
                    return HeaderTemplate("Flag", txt);
                }
            },
            {
                title: "VendorId", css: "ColumPadding hide", name: "VendorId", width: "1%", headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("text", GridInputClassName, " ", " ", "VendorId", " ");
                    txt.disabled = false;
                    txt.id = "hd_VendorId";
                    return HeaderTemplate("VendorId", txt);
                }
            },
            {
                title: "UserId", css: "ColumPadding hide", name: "UserId", width: "1%", headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("text", GridInputClassName, " ", " ", "UserId", " ");
                    txt.disabled = false;
                    txt.id = "hd_UserId";
                    return HeaderTemplate("UserId", txt);
                }
            },
            {
                title: "VendUserId", css: "ColumPadding hide", name: "VendUserId", width: "1%", headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("text", GridInputClassName, " ", " ", "VendUserId", " ");
                    txt.disabled = false;
                    txt.id = "hd_VendUserId";
                    return HeaderTemplate("VendUserId", txt);
                }
            },
        ];
        divUsersGrid.Bind();
    }
    //////////////////////// End Add User In Grid /////////////////////////

    //////////////////////// start Add Contacts In Grid /////////////////////////
    function AddContactsGridInGrid() {
        flag = true;
        newContact = new Ms_VendorContacts();
        let hd_ContactCode = $('#hd_ContactCode'),
            hd_ContactName1 = $('#hd_ContactName1'),
            hd_ContactName2 = $('#hd_ContactName2'),
            hd_ContactPhone1 = $('#hd_ContactPhone1'),
            hd_ContactPhone2 = $('#hd_ContactPhone2'),
            hd_ContactPhone3 = $('#hd_ContactPhone3'),
            hd_ContactPhone4 = $('#hd_ContactPhone4'),
            hd_ContactPhone5 = $('#hd_ContactPhone5'),
            hd_ContactAddress1 = $('#hd_ContactAddress1'),
            hd_ContactAddress2 = $('#hd_ContactAddress2'),
            hd_ContactAddress3 = $('#hd_ContactAddress3'),
            hd_ContactEmail1 = $('#hd_ContactEmail1'),
            hd_ContactEmail2 = $('#hd_ContactEmail2'),
            hd_ContactEmail3 = $('#hd_ContactEmail3'),
            hd_IDNo = $('#hd_IDNo'),
            hd_PassPortNo = $('#hd_PassPortNo'),
            hd_Bank1 = $('#hd_Bank1'),
            hd_Bank2 = $('#hd_Bank2'),
            hd_Bank3 = $('#hd_Bank3'),
            hd_BankAccNo1 = $('#hd_BankAccNo1'),
            hd_BankAccNo2 = $('#hd_BankAccNo2'),
            hd_BankAccNo3 = $('#hd_BankAccNo3'),
            hd_Remark1 = $('#hd_Remark1'),
            hd_Remark2 = $('#hd_Remark2'),
            hd_Isprimary = $('#hd_Isprimary'),
            hd_VendContactId = $('#hd_VendContactId'),
            hd_VendorId = $('#hd_VendorId');

        if (hd_ContactCode.val().trim() == "") { MessageBox.Show(Resource.PleaseEnterCode, Resource.Error); flag = false; return }
        else {
            if (!CheckCode(VendorContacts, hd_ContactCode.val(), "ContactCode")) { MessageBox.Show(Resource.CodeCannotDuplicated, Resource.Error); flag = false; return }
            else newContact.ContactCode = hd_ContactCode.val().trim();
        }

        if (hd_ContactName1.val().trim() == "") { MessageBox.Show(Resource.PleaseEnterName + " 1", Resource.Error); flag = false; return }
        else newContact.ContactName1 = hd_ContactName1.val().trim();

        if (flag) {
            newContact.ContactName2 = hd_ContactName2.val().trim();
            newContact.ContactPhone1 = hd_ContactPhone1.val().trim();
            newContact.ContactPhone2 = hd_ContactPhone2.val().trim();
            newContact.ContactPhone3 = hd_ContactPhone3.val().trim();
            newContact.ContactPhone4 = hd_ContactPhone4.val().trim();
            newContact.ContactPhone5 = hd_ContactPhone5.val().trim();
            newContact.ContactAddress1 = hd_ContactAddress1.val().trim();
            newContact.ContactAddress2 = hd_ContactAddress2.val().trim();
            newContact.ContactAddress3 = hd_ContactAddress3.val().trim();
            newContact.ContactEmail1 = hd_ContactEmail1.val().trim();
            newContact.ContactEmail2 = hd_ContactEmail2.val().trim();
            newContact.ContactEmail3 = hd_ContactEmail3.val().trim();
            newContact.IDNo = hd_IDNo.val().trim();
            newContact.PassPortNo = hd_PassPortNo.val().trim();
            newContact.Bank1 = hd_Bank1.val().trim();
            newContact.Bank2 = hd_Bank2.val().trim();
            newContact.Bank3 = hd_Bank3.val().trim();
            newContact.BankAccNo1 = hd_BankAccNo1.val().trim();
            newContact.BankAccNo2 = hd_BankAccNo2.val().trim();
            newContact.BankAccNo3 = hd_BankAccNo3.val().trim();
            newContact.Remark1 = hd_Remark1.val().trim();
            newContact.Remark2 = hd_Remark2.val().trim();
            newContact.Isprimary = hd_Isprimary.is(":checked");

            if (hd_VendContactId.val().trim() == "") newContact.VendContactId = 0;
            else newContact.VendContactId  = hd_VendContactId.val().trim();
            if (hd_VendorId.val().trim() == "") newContact.VendorId = 0;
            else newContact.VendorId = hd_VendorId.val().trim();

            if ($('#hd_Flag').val().trim() == "u") newContact.StatusFlag = "u";
            else newContact.StatusFlag = "i";

            VendorContacts.unshift(newContact);
            divContactsGrid.DataSource = VendorContacts;
            divContactsGrid.Bind();
        }
        return;
    }
    function InitializeContactsGrid() {
        divContactsGrid.ElementName = "divContactsGrid";
        divContactsGrid.Editing = true;
        divContactsGrid.Paging = true;
        divContactsGrid.Sorting = true;
        divContactsGrid.PageSize = 10;
        divContactsGrid.ConfirmDeleteing = true;
        divContactsGrid.InsertionMode = JsGridInsertionMode.Binding;
        divContactsGrid.OnItemInserting = () => { };
        divContactsGrid.OnItemUpdating = () => { };
        divContactsGrid.OnItemDeleting = () => { };
        divContactsGrid.Columns = [
            {
                title: "#", name: "btnAddItem", visible: true, width: "50px", css:"text-center", headerTemplate: (): HTMLElement => {
                    let btn: HTMLButtonElement = DocumentActions.CreateElement<HTMLButtonElement>("button");
                    btn.className = TransparentButton + " editable";
                    btn.type = "button";
                    
                    
                    btn.innerHTML = "<span class='fa fa-plus'></span>";
                    btn.id = "btnAddItemGrid";
                    btn.onclick = (e) => {
                        if (SharedWork.CurrentMode == ScreenModes.Query || SharedWork.CurrentMode == ScreenModes.Start || SharedWork.CurrentMode == ScreenModes.NoData) {
                            WorningMessage("يجب اختيار وضع التعديل اولا ", "Please Select Edit Mode First");
                            return;
                        }
                        AddContactsGridInGrid();
                    };
                    return btn;
                },
                itemTemplate: (s: string, item: Ms_VendorContacts): HTMLButtonElement => {
                    let btn: HTMLButtonElement = DocumentActions.CreateElement<HTMLButtonElement>("button");
                    btn.innerHTML = "<i class='fas fa-times'></i>";
                    btn.className = TransparentButton + "  red_Delete_Cotnrol editable";
                    
                    btn.type = "button";
                    
                    btn.name = VendorContacts.indexOf(item).toString();
                    btn.id = "btnRemoveItemGrid";
                    btn.onclick = (e) => {
                        let index = Number((e.currentTarget as HTMLButtonElement).name);
                        VendorContacts[index].StatusFlag = "d";
                        VendorContacts.push(VendorContacts[index]);
                        VendorContacts.splice(index, 1);
                        divContactsGrid.Bind();
                    };
                    return btn;
                }
            },
            {
                css: JsGridHeaderCenter, itemTemplate: (s: string, item: Ms_VendorContacts): HTMLButtonElement => {
                    let btn: HTMLButtonElement = DocumentActions.CreateElement<HTMLButtonElement>("button");
                    btn.innerHTML = "<i class='fa fa-edit'></i>";
                    btn.className = TransparentButton + " " + "emptrainingedit " + "green_edit_control editable";
                    
                    btn.type = "button";
                    
                    btn.name = VendorContacts.indexOf(item).toString();
                    btn.id = "btnUpdateItemGrid";
                    btn.onclick = (e) => {
                        let index = Number((e.currentTarget as HTMLButtonElement).name);
                        VendorContacts.splice(index, 1);
                        divContactsGrid.DataSource = VendorContacts;
                        divContactsGrid.Bind();
                        if (item.ContactCode != null) SelectDrobInGrid("hd_ContactCode", item.ContactCode.toString());
                        if (item.ContactName1 != null) FillInputText("hd_ContactName1", item.ContactName1.toString());
                        if (item.ContactName2 != null) FillInputText("hd_ContactName2", item.ContactName2.toString());
                        if (item.ContactPhone1 != null) FillInputText("hd_ContactPhone1", item.ContactPhone1.toString());
                        if (item.ContactPhone2 != null) FillInputText("hd_ContactPhone2", item.ContactPhone2.toString());
                        if (item.ContactPhone3 != null) FillInputText("hd_ContactPhone3", item.ContactPhone3.toString());
                        if (item.ContactPhone4 != null) FillInputText("hd_ContactPhone4", item.ContactPhone4.toString());
                        if (item.ContactPhone5 != null) FillInputText("hd_ContactPhone5", item.ContactPhone5.toString());
                        if (item.ContactAddress1 != null) FillInputText("hd_ContactAddress1", item.ContactAddress1.toString());
                        if (item.ContactAddress2 != null) FillInputText("hd_ContactAddress2", item.ContactAddress2.toString());
                        if (item.ContactAddress3 != null) FillInputText("hd_ContactAddress3", item.ContactAddress3.toString());
                        if (item.ContactEmail1 != null) FillInputText("hd_ContactEmail1", item.ContactEmail1.toString());
                        if (item.ContactEmail2 != null) FillInputText("hd_ContactEmail2", item.ContactEmail2.toString());
                        if (item.ContactEmail3 != null) FillInputText("hd_ContactEmail3", item.ContactEmail3.toString());
                        if (item.IDNo != null) FillInputText("hd_IDNo", item.IDNo.toString());
                        if (item.PassPortNo != null) FillInputText("hd_PassPortNo", item.PassPortNo.toString());
                        if (item.Bank1 != null) FillInputText("hd_Bank1", item.Bank1.toString());
                        if (item.Bank2 != null) FillInputText("hd_Bank2", item.Bank2.toString());
                        if (item.Bank3 != null) FillInputText("hd_Bank3", item.Bank3.toString());
                        if (item.BankAccNo1 != null) FillInputText("hd_BankAccNo1", item.BankAccNo1.toString());
                        if (item.BankAccNo2 != null) FillInputText("hd_BankAccNo2", item.BankAccNo2.toString());
                        if (item.BankAccNo3 != null) FillInputText("hd_BankAccNo3", item.BankAccNo3.toString());
                        if (item.Remark1 != null) FillInputText("hd_Remark1", item.Remark1.toString());
                        if (item.Remark2 != null) FillInputText("hd_Remark2", item.Remark2.toString());
                        if (item.Isprimary != null) FillInputText("hd_Isprimary", item.Isprimary.toString());

                        if (item.VendContactId != null) FillInputText("hd_VendContactId", item.VendContactId.toString());
                        if (item.VendorId != null) FillInputText("hd_VendorId", item.VendorId.toString());
                        FillInputText("hd_Flag", "u");
                    };
                    return btn;
                }
            },
            {
                title: Resource.DestinationCode, css: "ColumPadding", name: "ContactCode", headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("text", GridInputClassName, " ", " ", "ContactCode", " ");
                    txt.id = "hd_ContactCode";
                    return HeaderTemplate(Resource.DestinationCode, txt);
                }
            },
            {
                title: Resource.MainFace, css: "ColumPadding", name: "Isprimary", type: "hd_Isprimary", formatter: 'checkbox', headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("checkbox", GridInputClassName, " ", " ", "Isprimary", " ");
                    txt.id = "hd_Isprimary";
                    txt.type = "checkbox";
                    return HeaderTemplateInput(Resource.MainFace, txt);
                }
            },
            {
                title: Resource.NameSide + " 1", css: "ColumPadding", name: "ContactName1", headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("text", GridInputClassName, " ", " ", "ContactName1", " ");
                    txt.id = "hd_ContactName1";
                    return HeaderTemplate(Resource.NameSide + " 1", txt);
                }
            },
            {
                title: Resource.NameSide + " 2", css: "ColumPadding", name: "ContactName2", headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("text", GridInputClassName, " ", " ", "ContactName2", " ");
                    txt.id = "hd_ContactName2";
                    return HeaderTemplate(Resource.NameSide + " 2", txt);
                }
            },
            {
                title: Resource.Phone + " 1", css: "ColumPadding", name: "ContactPhone1", headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("text", GridInputClassName, " ", " ", "ContactPhone1", " ");
                    txt.id = "hd_ContactPhone1";
                    return HeaderTemplate(Resource.Phone +" 1", txt);
                }
            },
            {
                title: Resource.Phone +" 2", css: "ColumPadding", name: "ContactPhone2", headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("text", GridInputClassName, " ", " ", "ContactPhone2", " ");
                    txt.id = "hd_ContactPhone2";
                    return HeaderTemplate(Resource.Phone +" 2", txt);
                }
            },
            {
                title: Resource.Phone +" 3", css: "ColumPadding", name: "ContactPhone3", headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("text", GridInputClassName, " ", " ", "ContactPhone3", " ");
                    txt.id = "hd_ContactPhone3";
                    return HeaderTemplate(Resource.Phone +" 3", txt);
                }
            },
            {
                title: Resource.Phone +" 4", css: "ColumPadding", name: "ContactPhone4", headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("text", GridInputClassName, " ", " ", "ContactPhone4", " ");
                    txt.id = "hd_ContactPhone4";
                    return HeaderTemplate(Resource.Phone +" 4", txt);
                }
            },
            {
                title: Resource.Phone +" 5", css: "ColumPadding", name: "ContactPhone3", headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("text", GridInputClassName, " ", " ", "ContactPhone5", " ");
                    txt.id = "hd_ContactPhone5";
                    return HeaderTemplate(Resource.Phone +" 5", txt);
                }
            },
            {
                title: Resource.IDCardNumber, css: "ColumPadding", name: "IDNo", headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("text", GridInputClassName, " ", " ", "IDNo", " ");
                    txt.id = "hd_IDNo";
                    return HeaderTemplate(Resource.IDCardNumber, txt);
                }
            },
            {
                title: Resource.Passport, css: "ColumPadding", name: "PassPortNo", headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("text", GridInputClassName, " ", " ", "PassPortNo", " ");
                    txt.id = "hd_PassPortNo";
                    return HeaderTemplate(Resource.Passport, txt);
                }
            },
            {
                title: Resource.Address + " 1", css: "ColumPadding", name: "ContactAddress1", headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("text", GridInputClassName, " ", " ", "ContactAddress1", " ");
                    txt.id = "hd_ContactAddress1";
                    return HeaderTemplate(Resource.Address + " 1", txt);
                }
            },
            {
                title: Resource.Address + " 2", css: "ColumPadding", name: "ContactAddress2", headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("text", GridInputClassName, " ", " ", "ContactAddress2", " ");
                    txt.id = "hd_ContactAddress2";
                    return HeaderTemplate(Resource.Address + " 2", txt);
                }
            },
            {
                title: Resource.Address + " 3", css: "ColumPadding", name: "ContactAddress3", headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("text", GridInputClassName, " ", " ", "ContactAddress3", " ");
                    txt.id = "hd_ContactAddress3";
                    return HeaderTemplate(Resource.Address + " 3", txt);
                }
            },
            {
                title: Resource.Email + " 1", css: "ColumPadding", name: "ContactEmail1", headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("text", GridInputClassName, " ", " ", "ContactEmail1", " ");
                    txt.id = "hd_ContactEmail1";
                    return HeaderTemplate(Resource.Email + " 1", txt);
                }
            },
            {
                title: Resource.Email + "  2", css: "ColumPadding", name: "ContactEmail2", headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("text", GridInputClassName, " ", " ", "ContactEmail2", " ");
                    txt.id = "hd_ContactEmail2";
                    return HeaderTemplate(Resource.Email + " 2", txt);
                }
            },
            {
                title: Resource.Email + " 3", css: "ColumPadding", name: "ContactEmail3", headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("text", GridInputClassName, " ", " ", "ContactEmail3", " ");
                    txt.id = "hd_ContactEmail3";
                    return HeaderTemplate(Resource.Email + " 3", txt);
                }
            },
            {
                title: Resource.Bank + " 1", css: "ColumPadding", name: "Bank1", headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("text", GridInputClassName, " ", " ", "Bank1", " ");
                    txt.id = "hd_Bank1";
                    return HeaderTemplate(Resource.Bank + " 1", txt);
                }
            },
            {
                title: Resource.Bank +  " 2", css: "ColumPadding", name: "Bank2", headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("text", GridInputClassName, " ", " ", "Bank2", " ");
                    txt.id = "hd_Bank2";
                    return HeaderTemplate(Resource.Bank + " 2", txt);
                }
            },
            {
                title: Resource.Bank + " 3", css: "ColumPadding", name: "Bank3", headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("text", GridInputClassName, " ", " ", "Bank3", " ");
                    txt.id = "hd_Bank3";
                    return HeaderTemplate(Resource.Bank + " 3", txt);
                }
            },
            {
                title: Resource.BankAccount + " 1", css: "ColumPadding", name: "BankAccNo1", headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("text", GridInputClassName, " ", " ", "BankAccNo1", " ");
                    txt.id = "hd_BankAccNo1";
                    return HeaderTemplate(Resource.BankAccount + "  1", txt);
                }
            },
            {
                title: Resource.BankAccount + "  2", css: "ColumPadding", name: "BankAccNo2", headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("text", GridInputClassName, " ", " ", "BankAccNo2", " ");
                    txt.id = "hd_BankAccNo2";
                    return HeaderTemplate(Resource.BankAccount + " 2", txt);
                }
            },
            {
                title: Resource.BankAccount + " 3", css: "ColumPadding", name: "BankAccNo3", headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("text", GridInputClassName, " ", " ", "BankAccNo3", " ");
                    txt.id = "hd_BankAccNo3";
                    return HeaderTemplate(Resource.BankAccount + " 3", txt);
                }
            },
            {
                title: Resource.Notes + " 1", css: "ColumPadding", name: "Remark1", headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("text", GridInputClassName, " ", " ", "Remark1", " ");
                    txt.id = "hd_Remark1";
                    return HeaderTemplate(Resource.Notes + " 1", txt);
                }
            },
            {
                title: Resource.Notes + " 2", css: "ColumPadding", name: "Remark2", headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("text", GridInputClassName, " ", " ", "Remark2", " ");
                    txt.id = "hd_Remark2";
                    return HeaderTemplate(Resource.Notes + " 2", txt);
                }
            },
            {
                title: "Flag", css: "ColumPadding hide", name: "Flag", width: "1%", headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("text", GridInputClassName, " ", " ", "Flag", " ");
                    txt.disabled = false;
                    txt.id = "hd_Flag";
                    return HeaderTemplate("Flag", txt);
                }
            },
            {
                title: "VendorId", css: "ColumPadding hide", name: "VendorId", width: "1%", headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("text", GridInputClassName, " ", " ", "VendorId", " ");
                    txt.disabled = false;
                    txt.id = "hd_VendorId";
                    return HeaderTemplate("VendorId", txt);
                }
            },
            {
                title: "VendContactId", css: "ColumPadding hide", name: "VendContactId", width: "1%", headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("text", GridInputClassName, " ", " ", "VendContactId", " ");
                    txt.disabled = false;
                    txt.id = "hd_VendContactId";
                    return HeaderTemplate("VendContactId", txt);
                }
            },
        ];
        divContactsGrid.Bind();
    }
    //////////////////////// End Add Contacts In Grid /////////////////////////

    function FillInputText(_TextID: string, _Data: string) {
        $("#" + _TextID).text(_Data);
        $("#" + _TextID).val(_Data);
        let elment = $("#" + _TextID)[0] as HTMLSelectElement,
            val = _Data == "false" ? false : true;
        if (elment.type == "checkbox") {
            $("#" + _TextID).prop('checked', val);
        }
    }

    function SelectDrobInGrid(_TextID: string, _Data: string) {
        let elment = $("#" + _TextID)[0] as HTMLSelectElement;
        elment.value = _Data;
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

    function MapVendorAccounts() {
        CustAccounts = new Array<Cal_VendAccounts>();
        newAccount = new Cal_VendAccounts();
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
            CustAccounts.push(newAccount);
        }

        for (var i = 0; i < AddAccounts.length; i++) {
            newAccount = new Cal_VendAccounts();
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
                CustAccounts.push(newAccount);
            }
        }

        //console.log(CustAccounts);
        return CustAccounts;
    }

    function MapCustomVendorUsers() {
        Users = new Array<Ms_VendorUsers>();
        VendorUsers.map(function (item) {
            Users.push(item);
        })
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
        SetRow(_VendorId)
    }
}
