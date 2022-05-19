$(document).ready(() => {
    SharedButtons.OnLoad();
    HrEmployees.InitalizeComponent();
})
 
namespace HrEmployees {
    $('#headertop1').addClass('display_none');
    $('#headertop2').removeClass('display_none');
    let Resource: any = GetResourceList("");
    $('#headerTitle').text(Resource.Employees);

    var sys: SystemTools = new SystemTools();
    var language = sys.SysSession.CurrentEnvironment.ScreenLanguage;
    var SysSession: SystemSession = GetSystemSession();
    let compCode = SysSession.CurrentEnvironment.CompCode;
    let UserCode = SysSession.CurrentEnvironment.UserCode;
    let Token = "HGFD-" + SysSession.CurrentEnvironment.Token;

    var Model: Hr_Employees = new Hr_Employees();
    var Employees: Array<Hr_Employees> = new Array<Hr_Employees>();
    var Departments: Array<Hr_Departments> = new Array<Hr_Departments>();
    var Stores: Array<MS_Stores> = new Array<MS_Stores>();
    var Jobs: Array<Hr_Jobs> = new Array<Hr_Jobs>();
    var Shifts: Array<Hr_Shifts> = new Array<Hr_Shifts>();
    var PeriodsTables: Array<Hr_PeriodsTables> = new Array<Hr_PeriodsTables>();
    var EmpDocuments: Array<Hr_EmpDocuments> = new Array<Hr_EmpDocuments>();

    var Currency: Array<MS_Currency> = new Array<MS_Currency>();
    var CostCenters: Array<Cal_CostCenters> = new Array<Cal_CostCenters>();
    var SalaryTypes: Array<Hr_SalaryTypes> = new Array<Hr_SalaryTypes>();
    var EmpSalaryTypes: Array<Hr_EmpSalaryTypes> = new Array<Hr_EmpSalaryTypes>();
    var CustomEmpSalaryTypes: Array<CustomEmpSalaryTypes> = new Array<CustomEmpSalaryTypes>();

    var AccountCharts: Array<Cal_AccountChart> = new Array<Cal_AccountChart>();

    ///////// Detailes ///////////////////////
    var Detailes: DetailesForEmployees = new DetailesForEmployees();
    var newAccount: Cal_EmpAccounts = new Cal_EmpAccounts();
    var EmpAccounts: Array<Cal_EmpAccounts> = new Array<Cal_EmpAccounts>();

    // select Options
    var CurrencyId: HTMLSelectElement;
    var DepartMentId: HTMLSelectElement;
    var StoreId: HTMLSelectElement;
    var JobId: HTMLSelectElement;
    var CostCenterId: HTMLSelectElement;
    var ShiftId: HTMLSelectElement;
    var PeriodTableId: HTMLSelectElement;

    var element: HTMLInputElement;

    var ObjectId = 0;
    var StatusFlag;
    var Success;
    var hasNodes: boolean;
    var flag: boolean;

    var divSalaryTypesGrid: JsGrid = new JsGrid();
    var divEmployeeGrid: JsGrid = new JsGrid();
    var divEmpDocumentsGrid: JsGrid = new JsGrid();
    const GridInputClassName = "form-control gridIput";

    export function InitalizeComponent() {
        localStorage.setItem("TableName", "Hr_Employees");
        NavigateModule.InitalizeComponent();
        SharedButtons.compcode = Number(SysSession.CurrentEnvironment.CompCode);
        SharedWork.OnNavigate = Navigate;

        SharedButtons.AddAction(() => {
            btnAdd_onclick();
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
        InitializeSalaryTypeGrid();
        InitializeEmpDocumentsGrid();
        GetAssistantAccounts();
    }

    function InitalizeControls() {
        SharedButtons.btnSearch = document.getElementById("btnEmployeeSearch") as HTMLButtonElement;

        CurrencyId = document.getElementById("CurrencyId") as HTMLSelectElement;
        DepartMentId = document.getElementById("DepartMentId") as HTMLSelectElement;
        StoreId = document.getElementById("StoreId") as HTMLSelectElement;
        JobId = document.getElementById("JobId") as HTMLSelectElement;
        PeriodTableId = document.getElementById("PeriodTableId") as HTMLSelectElement;
        ShiftId = document.getElementById("ShiftId") as HTMLSelectElement;
    }

    function InitalizeEvents() {
        SharedButtons.btnSearch.onclick = btnSearch_onclick;
        SharedButtons.btnRefrash2.onclick = Refrash;
    }

    function GetAll() {
        Disabled(false);
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("Hr_Employees", "GetAll"),
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess) {
                    Employees = result.Response as Array<Hr_Employees>;
                    divEmployeeGrid.DataSource = Employees;
                    divEmployeeGrid.Bind();
                }
            }
        });
    }

    function GetById(empId: number) {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("Hr_Employees", "GetById"),
            data: { id: empId },
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess) {
                    Detailes = result.Response as DetailesForEmployees;
                    DisplayAccounts(Detailes.accounts);
                }
            }
        });
        return Detailes;
    }

    function Display(model: Hr_Employees) {
        model = GetById(model.EmpId).Model;
        for (const item in model) {
            let Cost = item.indexOf('Cost');
            if (Cost > -1) {
                if (model[item] != null)
                    model[item] = Number(model[item].toFixed(3));
            }
        }

        DocumentActions.RenderFromModel(model);
        Model = model;
        ObjectId = Number(Model.EmpId);
        GetSalaryTypeForEmployees(Model.EmpId);
        GetEmployeeDocuments(Model.EmpId);
    }

    function DisplayAccounts(accounts: Array<Cal_EmpAccounts>) {
        $('#accounts select').val('null').select2().trigger('change');

        for (var i = 0; i < accounts.length; i++) {
            SelectDrobInGrid(accounts[i].AccountDescription, accounts[i].AccountId.toString());
            $('#' + accounts[i].AccountDescription).select2().trigger('change');
        }

        if (accounts.length == 0) {
            $('#BasicAccCode').val('null').select2().trigger('change');
            $('#accounts select').val('null').select2().trigger('change');
        }
    }

    function SelectDrobInGrid(_TextID: string, _Data: string) {
        let elment = $("#" + _TextID)[0] as HTMLSelectElement;
        elment.value = _Data;
    }

    function InitializeGrid() {
        divEmployeeGrid.ElementName = "divEmployeeGrid";
        divEmployeeGrid.PrimaryKey = "EmpId";
        divEmployeeGrid.Editing = true;
        divEmployeeGrid.Paging = true;
        divEmployeeGrid.Sorting = true;
        divEmployeeGrid.PageSize = 10;
        divEmployeeGrid.ConfirmDeleteing = true;
        divEmployeeGrid.InsertionMode = JsGridInsertionMode.Binding;
        divEmployeeGrid.OnItemInserting = () => { };
        divEmployeeGrid.OnItemUpdating = () => { };
        divEmployeeGrid.OnItemDeleting = () => { };
        divEmployeeGrid.OnRowSelected = () => {
            //GetDataRow();
            Display(divEmployeeGrid.SelectedItem);
            SharedWork.SwitchModes(ScreenModes.Query);
        };
        divEmployeeGrid.OnRowDoubleClicked = () => {
            //GetDataRow();
            Display(divEmployeeGrid.SelectedItem);
            SharedWork.SwitchModes(ScreenModes.Query);
        }
        divEmployeeGrid.Columns = [
            {
                title: Resource.Code, css: "ColumPadding", name: "EmpCode"
            },
            {
                title: Resource.Name_Arabic , css: "ColumPadding", name: "Name1"
            },
            {
                title: Resource.Name_English , css: "ColumPadding", name: "Name2"
            },
            {
                title: Resource.IDCardNumber, css: "ColumPadding", name: "IDNo"
            },
            {
                title: Resource.Email, css: "ColumPadding", name: "Email"
            },
            {
                title: "EmpId", css: "ColumPadding disable hidden", name: "EmpId", width: "1%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("text", GridInputClassName, " ", " ", "EmpId", " ");
                    txt.disabled = true;
                    txt.id = "hd_EmpId";
                    return HeaderTemplate("EmpId", txt);
                }
            }
        ];
        divEmployeeGrid.Bind();
    }

    //////////////////////// start Hr Salary Types In Grid ///////////////////////
    function InitializeSalaryTypeGrid() {
        divSalaryTypesGrid.ElementName = "divSalaryTypesGrid";
        divSalaryTypesGrid.PrimaryKey = "EmpSalaryTypesId";
        divSalaryTypesGrid.Editing = true;
        divSalaryTypesGrid.Paging = true;
        divSalaryTypesGrid.Sorting = true;
        divSalaryTypesGrid.PageSize = 5;
        divEmployeeGrid.InsertionMode = JsGridInsertionMode.Binding;
        divEmployeeGrid.OnItemInserting = () => { };
        divEmployeeGrid.OnItemUpdating = () => { };
        divEmployeeGrid.OnItemDeleting = () => { };
        divSalaryTypesGrid.Columns = [
            {
                title: Resource.Code, css: "ColumPadding", name: "SalaryCode"
            },
            {
                title: Resource.Name_Arabic, css: "ColumPadding", name: "Name1"
            },
            {
                title: Resource.Name_English, css: "ColumPadding", name: "Name2"
            },
            {
                title: Resource.value, css: "ColumPadding", name: "SalaryValu", itemTemplate: function (value: number) {
                    return value != null ? value.toFixed(2) : value;
                }
            },
            
            {
                title: "حساب مدين", css: "ColumPadding", name: "DepitAccountCode"
            },
            {
                title: "اسم الحساب عربي", css: "ColumPadding", name: "DebitAccountNameA"
            },
            {
                title: "اسم الحساب انجليزي", css: "ColumPadding", name: "DebitAccountNameE"
            },

            {
                title: "حساب دائن", css: "ColumPadding", name: "CreditAccountCode"
            },
            {
                title: "اسم الحساب عربي", css: "ColumPadding", name: "CreditAccountNameA"
            },
            {
                title: "اسم الحساب انجليزي", css: "ColumPadding", name: "CreditAccountNameE"
            },

            {
                title: "م مركز تكلفة مدين", css: "ColumPadding", name: "DepitCostCode"
            },
            {
                title: "اسم المركز عربي", css: "ColumPadding", name: "DebitCostNameA"
            },
            {
                title: "اسم المركز انجليزي", css: "ColumPadding", name: "DebitCostNameE"
            },

            {
                title: "م مركز تكلفة دائن", css: "ColumPadding", name: "CrediCostCode"
            },
            {
                title: "اسم المركز عربي", css: "ColumPadding", name: "CrediCostNameA"
            },
            {
                title: "اسم المركز انجليزي", css: "ColumPadding", name: "CrediCostNameE"
            },

            {
                title: "EmpSalaryTypesId", css: "ColumPadding disable hidden", name: "EmpSalaryTypesId", width: "1%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("text", GridInputClassName, " ", " ", "EmpSalaryTypesId", " ");
                    txt.disabled = true;
                    txt.id = "hd_EmpSalaryTypesId";
                    return HeaderTemplate("EmpSalaryTypesId", txt);
                }
            }
        ];
        divSalaryTypesGrid.Bind();
    }
    //////////////////////// End Hr Salary Types In Grid /////////////////////////

    //////////////////////// start Employee Documents In Grid ///////////////////////
    function InitializeEmpDocumentsGrid() {
        divEmpDocumentsGrid.ElementName = "divEmpDocumentsGrid";
        divEmpDocumentsGrid.PrimaryKey = "EmpDocId";
        divEmpDocumentsGrid.Editing = true;
        divEmpDocumentsGrid.Paging = true;
        divEmpDocumentsGrid.Sorting = true;
        divEmpDocumentsGrid.PageSize = 10;
        divEmployeeGrid.InsertionMode = JsGridInsertionMode.Binding;
        divEmployeeGrid.OnItemInserting = () => { };
        divEmployeeGrid.OnItemUpdating = () => { };
        divEmployeeGrid.OnItemDeleting = () => { };
        divEmpDocumentsGrid.Columns = [
            {
                title: Resource.App_Number, css: "ColumPadding", name: "TrNo"
            },
            {
                title: "تاريخ الاصدار", css: "ColumPadding", name: "IssueDate"
            },
            {
                title: "مكان الاصدار", css: "ColumPadding", name: "IssuePlace"
            },
            {
                title: "من تاريخ", css: "ColumPadding", name: "FromDate"
            },
            {
                title: "الى تاريخ", css: "ColumPadding", name: "ToDate"
            },
            {
                title: "مرجع", css: "ColumPadding", name: "ManualTrNo"
            },
            {
                title: Resource.Notes, css: "ColumPadding", name: "Remarks1"
            },
            {
                title: "EmpDocId", css: "ColumPadding disable hidden", name: "EmpDocId", width: "1%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("text", GridInputClassName, " ", " ", "EmpDocId", " ");
                    txt.disabled = true;
                    txt.id = "hd_EmpDocId";
                    return HeaderTemplate("EmpDocId", txt);
                }
            }
        ];
        divEmpDocumentsGrid.Bind();
    }
    //////////////////////// End Employee Documents In Grid /////////////////////////

    export function Navigate() {
        Model = Employees[SharedWork.PageIndex - 1];
        ObjectId = Model.EmpId;
        if (Model != null) {
            Display(Model);
        }
    }

    function btnAdd_onclick() {
        StatusFlag = 'i';
        RemoveDisabled(true);
        $('select option:first-child').val('null').prop("selected", true).prop("disabled", true);
    }

    function RemoveDisabled(clear: boolean) {
        DocumentActions.allElements(false, clear, Model);
        ResetSelect(clear);
        $('#BasicAccCode').prop('disabled', false).select2().trigger('change');
        $('#accounts select').prop('disabled', false).select2().trigger('change');
        $('#BasicData select').prop('disabled', false).select2().trigger('change');
    }

    function Undo() {
        Disabled(false);
        Success = false;
    }

    function Disabled(clear: boolean) {
        DocumentActions.allElements(true, clear, Model);
        ResetSelect(clear);
        $('#BasicAccCode').prop('disabled', true).select2().trigger('change');
        $('#accounts select').prop('disabled', true).select2().trigger('change');
        $('#BasicData select').prop('disabled', true).select2().trigger('change');
    }

    function btnEdit_onclick() {
        if (ObjectId == 0) {
            MessageBox.Show(Resource.PleaseSelectItem, Resource.Error);
        }
        else {
            RemoveDisabled(false);
            element = DocumentActions.GetElementByName("EmpCode");
            element.disabled = true;
            StatusFlag = 'u';
        }
    }

    function btnsave_onClick() {
        if (!ValidationHeader()) return
        Save();
    }

    function ValidationHeader() {
        if (DocumentActions.GetElementByName("EmpCode").value == "") {
            MessageBox.Show(Resource.PleaseEnterCustomerCode, Resource.Error);
            return false
        }
        else if (DocumentActions.GetElementByName("Name1").value == "") {
            MessageBox.Show(Resource.PleaseEnterNameArabic, Resource.Error);
            return false
        }
        return true;
    }

    function Save() {
        if (DocumentActions.CheckCode(Employees, DocumentActions.GetElementByName("EmpCode").value, "EmpCode") == false && StatusFlag == "i") {
            MessageBox.Show(Resource.CustomerCodeCannotDuplicated, Resource.Error);
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
        Detailes.Model = DocumentActions.AssignToModel<Hr_Employees>(Model);
        AssignMaritalStatus(Model);

        Detailes.accounts = MapCustomAccounts();
        
        if (StatusFlag == "i") {
            Model.CreatedAt = DateTimeFormat(Date().toString());
            Model.CreatedBy = SysSession.CurrentEnvironment.UserCode;
            Insert();
        }
        if (StatusFlag == "u") {
            Model.EmpId = ObjectId;
            Model.UpdateAt = DateTimeFormat(Date().toString());
            Model.UpdateBy = SysSession.CurrentEnvironment.UserCode;
            Update();
        }
        ObjectId = Model.EmpId;
        GetAll();
        //GetDetailes(Detailes.Model.EmpId);
        return true;
    }

    function AssignMaritalStatus(model: Hr_Employees) {
        let newElement = document.getElementsByName('MaritalStatus');
        for (var v = 0, length = newElement.length; v < length; v++) {
            if ($(newElement[v]).is(":checked")) {
                model.MaritalStatus = Number($(newElement[v]).val());
                break;
            }
        }
    }

    function Insert() {
        $("#MessageBoxDialog").modal("hide");
        Ajax.Callsync({
            type: "POST",
            url: sys.apiUrl("Hr_Employees", "Insert"),
            data: JSON.stringify(Detailes),
            success: (Response) => {
                let result = Response as BaseResponse;
                if (result.IsSuccess) {
                    Model = result.Response as Hr_Employees;
                    ObjectId = Model.EmpId;
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
            url: sys.apiUrl("Hr_Employees", "Update"),
            data: JSON.stringify(Detailes),
            success: (Response) => {
                let result = Response as BaseResponse;
                if (result.IsSuccess) {
                    Model = result.Response as Hr_Employees
                    ObjectId = Model.EmpId;
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
        if (ObjectId == 0) {
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
            url: sys.apiUrl("Hr_Employees", "Delete") + "/" + ObjectId,
            success: (result) => {
                if (result) {
                    Success = true;
                    ObjectId = 0;
                    Refrash();
                }
                else {
                    MessageBox.Show(Resource.Error, Resource.Error);
                    Success = false;
                }
            }
        });
    }

    function InitializSelectOptoins() {
        GetCurrency();
        GetDepartments();
        GetStores();
        GetJobs();
        GetHrPeriodsTables();
        GetHrShifts();
        //GetCostCenters();
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

    function GetDepartments() {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("funcationShared", "GetDepartments"),
            success: (Response) => {
                let result = Response as BaseResponse;
                if (result.IsSuccess) {
                    Departments = result.Response as Array<Hr_Departments>;
                    DocumentActions.FillCombowithCode(Departments, DepartMentId, "DepartMentId", "DepartName1", "DepartCode", Resource.Department2);
                }
            }
        });
    }

    function GetStores() {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("funcationShared", "GetStores"),
            success: (Response) => {
                let result = Response as BaseResponse;
                if (result.IsSuccess) {
                    Stores = result.Response as Array<MS_Stores>;
                    DocumentActions.FillCombowithCode(Stores, StoreId, "StoreId", "StoreDescA", "StoreCode", Resource.Store);
                }
            }
        });
    }

    function GetJobs() {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("funcationShared", "GetJobs"),
            success: (Response) => {
                let result = Response as BaseResponse;
                if (result.IsSuccess) {
                    Jobs = result.Response as Array<Hr_Jobs>;
                    DocumentActions.FillCombowithCode(Jobs, JobId, "JobId", "JName1", "JCode", Resource.Job);
                }
            }
        });
    }

    function GetCostCenters() {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("funcationShared", "GetCostCenters"),
            success: (Response) => {
                let result = Response as BaseResponse;
                if (result.IsSuccess) {
                    CostCenters = result.Response as Array<Cal_CostCenters>;
                    DocumentActions.FillCombowithCode(CostCenters, CostCenterId, "CostCenterId", "CostCenterNameA", "CostCenterCode", Resource.CostCenter);
                }
            }
        });
    }

    function GetHrPeriodsTables() {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("funcationShared", "GetHrPeriodsTables"),
            success: (Response) => {
                let result = Response as BaseResponse;
                if (result.IsSuccess) {
                    PeriodsTables = result.Response as Array<Hr_PeriodsTables>;
                    DocumentActions.FillCombowithCode(PeriodsTables, PeriodTableId, "PeriodTableId", (language == "ar" ? "Name1" : "Name2"), "PeriodCode", "جدول المواعيد");
                }
            }
        });
    }

    function GetHrShifts() {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("funcationShared", "GetHrShifts"),
            success: (Response) => {
                let result = Response as BaseResponse;
                if (result.IsSuccess) {
                    Shifts = result.Response as Array<Hr_Shifts>;
                    DocumentActions.FillCombowithCode(Shifts, ShiftId, "ShiftId", (language == "ar" ? "Name1" : "Name2"), "ShiftCode", "فترة الراتب");
                }
            }
        });
    }

    function GetSalaryTypeForEmployees(id: number) {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("Hr_Employees", "SalaryTypeForEmployees"),
            data: { EmployeeId: id },
            success: (Response) => {
                let result = Response as BaseResponse;
                if (result.IsSuccess) {
                    CustomEmpSalaryTypes = result.Response as Array<CustomEmpSalaryTypes>;
                    divSalaryTypesGrid.DataSource = CustomEmpSalaryTypes;
                    divSalaryTypesGrid.Bind();
                }
            }
        });
    }
    
    function GetEmployeeDocuments(id: number) {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("Hr_Employees", "GetEmployeeDocuments"),
            data: { EmployeeId: id },
            success: (Response) => {
                let result = Response as BaseResponse;
                if (result.IsSuccess) {
                    EmpDocuments = result.Response as Array<Hr_EmpDocuments>;
                    divEmpDocumentsGrid.DataSource = EmpDocuments;
                    divEmpDocumentsGrid.Bind();
                }
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

    function MapCustomAccounts() {
        EmpAccounts = new Array<Cal_EmpAccounts>();
        newAccount = new Cal_EmpAccounts();
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
            EmpAccounts.push(newAccount);
        }

        for (var i = 0; i < AddAccounts.length; i++) {
            newAccount = new Cal_EmpAccounts();
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
                EmpAccounts.push(newAccount);
            }
        }
        //console.log(EmpAccounts);
        return EmpAccounts;
    }

    function btnSearch_onclick() {
        let sys: SystemTools = new SystemTools();
        sys.FindKey(Modules.Hr_Employees, SharedButtons.btnSearch.id, "", () => {
            let id = SearchGrid.SearchDataGrid.SelectedKey;
            if (!IsNullOrEmpty(id)) {
                Display(GetModel(id));
            }
        });
    }

    function GetModel(id: number) {
        Model = Employees.filter(x => x.EmpId == id)[0];
        return Model;
    }

    function Refrash() {
        debugger
        GetAll();
        Disabled(true);

        if (ObjectId != 0)
            Display(GetModel(ObjectId));
        localStorage.setItem("TableName", "Hr_Employees");
        NavigateModule.InitalizeComponent();
    }

    function ResetSelect(clear: boolean) {
        if (clear) {
            $('#BasicAccCode').val(null);
            $('#accounts select').val(null);
            $('#BasicData select').val(null);
        }
    }
}
