$(document).ready(function () {
    SharedButtons.OnLoad();
    HrEmployees.InitalizeComponent();
});
var HrEmployees;
(function (HrEmployees) {
    $('#headertop1').addClass('display_none');
    $('#headertop2').removeClass('display_none');
    var Resource = GetResourceList("");
    $('#headerTitle').text(Resource.Employees);
    var sys = new SystemTools();
    var language = sys.SysSession.CurrentEnvironment.ScreenLanguage;
    var SysSession = GetSystemSession();
    var compCode = SysSession.CurrentEnvironment.CompCode;
    var UserCode = SysSession.CurrentEnvironment.UserCode;
    var Token = "HGFD-" + SysSession.CurrentEnvironment.Token;
    var Model = new Hr_Employees();
    var Employees = new Array();
    var Departments = new Array();
    var Stores = new Array();
    var Jobs = new Array();
    var Shifts = new Array();
    var PeriodsTables = new Array();
    var EmpDocuments = new Array();
    var Currency = new Array();
    var CostCenters = new Array();
    var SalaryTypes = new Array();
    var EmpSalaryTypes = new Array();
    var CustomEmpSalaryTypes = new Array();
    var AccountCharts = new Array();
    ///////// Detailes ///////////////////////
    var Detailes = new DetailesForEmployees();
    var newAccount = new Cal_EmpAccounts();
    var EmpAccounts = new Array();
    // select Options
    var CurrencyId;
    var DepartMentId;
    var StoreId;
    var JobId;
    var CostCenterId;
    var ShiftId;
    var PeriodTableId;
    var element;
    var ObjectId = 0;
    var StatusFlag;
    var Success;
    var hasNodes;
    var flag;
    var divSalaryTypesGrid = new JsGrid();
    var divEmployeeGrid = new JsGrid();
    var divEmpDocumentsGrid = new JsGrid();
    var GridInputClassName = "form-control gridIput";
    function InitalizeComponent() {
        localStorage.setItem("TableName", "Hr_Employees");
        NavigateModule.InitalizeComponent();
        SharedButtons.compcode = Number(SysSession.CurrentEnvironment.CompCode);
        SharedWork.OnNavigate = Navigate;
        SharedButtons.AddAction(function () {
            btnAdd_onclick();
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
        InitializeGrid();
        InitializSelectOptoins();
        InitializeSalaryTypeGrid();
        InitializeEmpDocumentsGrid();
        GetAssistantAccounts();
    }
    HrEmployees.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        SharedButtons.btnSearch = document.getElementById("btnEmployeeSearch");
        CurrencyId = document.getElementById("CurrencyId");
        DepartMentId = document.getElementById("DepartMentId");
        StoreId = document.getElementById("StoreId");
        JobId = document.getElementById("JobId");
        PeriodTableId = document.getElementById("PeriodTableId");
        ShiftId = document.getElementById("ShiftId");
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
            success: function (d) {
                var result = d;
                if (result.IsSuccess) {
                    Employees = result.Response;
                    divEmployeeGrid.DataSource = Employees;
                    divEmployeeGrid.Bind();
                }
            }
        });
    }
    function GetById(empId) {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("Hr_Employees", "GetById"),
            data: { id: empId },
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
    function Display(model) {
        model = GetById(model.EmpId).Model;
        for (var item in model) {
            var Cost = item.indexOf('Cost');
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
    function DisplayAccounts(accounts) {
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
    function SelectDrobInGrid(_TextID, _Data) {
        var elment = $("#" + _TextID)[0];
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
        divEmployeeGrid.OnItemInserting = function () { };
        divEmployeeGrid.OnItemUpdating = function () { };
        divEmployeeGrid.OnItemDeleting = function () { };
        divEmployeeGrid.OnRowSelected = function () {
            //GetDataRow();
            Display(divEmployeeGrid.SelectedItem);
            SharedWork.SwitchModes(ScreenModes.Query);
        };
        divEmployeeGrid.OnRowDoubleClicked = function () {
            //GetDataRow();
            Display(divEmployeeGrid.SelectedItem);
            SharedWork.SwitchModes(ScreenModes.Query);
        };
        divEmployeeGrid.Columns = [
            {
                title: Resource.Code, css: "ColumPadding", name: "EmpCode"
            },
            {
                title: Resource.Name_Arabic, css: "ColumPadding", name: "Name1"
            },
            {
                title: Resource.Name_English, css: "ColumPadding", name: "Name2"
            },
            {
                title: Resource.IDCardNumber, css: "ColumPadding", name: "IDNo"
            },
            {
                title: Resource.Email, css: "ColumPadding", name: "Email"
            },
            {
                title: "EmpId", css: "ColumPadding disable hidden", name: "EmpId", width: "1%",
                headerTemplate: function () {
                    var txt = CreateElement("text", GridInputClassName, " ", " ", "EmpId", " ");
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
        divEmployeeGrid.OnItemInserting = function () { };
        divEmployeeGrid.OnItemUpdating = function () { };
        divEmployeeGrid.OnItemDeleting = function () { };
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
                title: Resource.value, css: "ColumPadding", name: "SalaryValu", itemTemplate: function (value) {
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
                headerTemplate: function () {
                    var txt = CreateElement("text", GridInputClassName, " ", " ", "EmpSalaryTypesId", " ");
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
        divEmployeeGrid.OnItemInserting = function () { };
        divEmployeeGrid.OnItemUpdating = function () { };
        divEmployeeGrid.OnItemDeleting = function () { };
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
                headerTemplate: function () {
                    var txt = CreateElement("text", GridInputClassName, " ", " ", "EmpDocId", " ");
                    txt.disabled = true;
                    txt.id = "hd_EmpDocId";
                    return HeaderTemplate("EmpDocId", txt);
                }
            }
        ];
        divEmpDocumentsGrid.Bind();
    }
    //////////////////////// End Employee Documents In Grid /////////////////////////
    function Navigate() {
        Model = Employees[SharedWork.PageIndex - 1];
        ObjectId = Model.EmpId;
        if (Model != null) {
            Display(Model);
        }
    }
    HrEmployees.Navigate = Navigate;
    function btnAdd_onclick() {
        StatusFlag = 'i';
        RemoveDisabled(true);
        $('select option:first-child').val('null').prop("selected", true).prop("disabled", true);
    }
    function RemoveDisabled(clear) {
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
    function Disabled(clear) {
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
        if (!ValidationHeader())
            return;
        Save();
    }
    function ValidationHeader() {
        if (DocumentActions.GetElementByName("EmpCode").value == "") {
            MessageBox.Show(Resource.PleaseEnterCustomerCode, Resource.Error);
            return false;
        }
        else if (DocumentActions.GetElementByName("Name1").value == "") {
            MessageBox.Show(Resource.PleaseEnterNameArabic, Resource.Error);
            return false;
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
        Detailes.Model = DocumentActions.AssignToModel(Model);
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
    function AssignMaritalStatus(model) {
        var newElement = document.getElementsByName('MaritalStatus');
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
            success: function (Response) {
                var result = Response;
                if (result.IsSuccess) {
                    Model = result.Response;
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
            success: function (Response) {
                var result = Response;
                if (result.IsSuccess) {
                    Model = result.Response;
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
            success: function (result) {
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
            success: function (Response) {
                var result = Response;
                if (result.IsSuccess) {
                    Currency = result.Response;
                    DocumentActions.FillCombowithCode(Currency, CurrencyId, "CurrencyId", "CurrencyDescA", "CurrencyCode", Resource.Currency);
                }
            }
        });
    }
    function GetDepartments() {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("funcationShared", "GetDepartments"),
            success: function (Response) {
                var result = Response;
                if (result.IsSuccess) {
                    Departments = result.Response;
                    DocumentActions.FillCombowithCode(Departments, DepartMentId, "DepartMentId", "DepartName1", "DepartCode", Resource.Department2);
                }
            }
        });
    }
    function GetStores() {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("funcationShared", "GetStores"),
            success: function (Response) {
                var result = Response;
                if (result.IsSuccess) {
                    Stores = result.Response;
                    DocumentActions.FillCombowithCode(Stores, StoreId, "StoreId", "StoreDescA", "StoreCode", Resource.Store);
                }
            }
        });
    }
    function GetJobs() {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("funcationShared", "GetJobs"),
            success: function (Response) {
                var result = Response;
                if (result.IsSuccess) {
                    Jobs = result.Response;
                    DocumentActions.FillCombowithCode(Jobs, JobId, "JobId", "JName1", "JCode", Resource.Job);
                }
            }
        });
    }
    function GetCostCenters() {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("funcationShared", "GetCostCenters"),
            success: function (Response) {
                var result = Response;
                if (result.IsSuccess) {
                    CostCenters = result.Response;
                    DocumentActions.FillCombowithCode(CostCenters, CostCenterId, "CostCenterId", "CostCenterNameA", "CostCenterCode", Resource.CostCenter);
                }
            }
        });
    }
    function GetHrPeriodsTables() {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("funcationShared", "GetHrPeriodsTables"),
            success: function (Response) {
                var result = Response;
                if (result.IsSuccess) {
                    PeriodsTables = result.Response;
                    DocumentActions.FillCombowithCode(PeriodsTables, PeriodTableId, "PeriodTableId", (language == "ar" ? "Name1" : "Name2"), "PeriodCode", "جدول المواعيد");
                }
            }
        });
    }
    function GetHrShifts() {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("funcationShared", "GetHrShifts"),
            success: function (Response) {
                var result = Response;
                if (result.IsSuccess) {
                    Shifts = result.Response;
                    DocumentActions.FillCombowithCode(Shifts, ShiftId, "ShiftId", (language == "ar" ? "Name1" : "Name2"), "ShiftCode", "فترة الراتب");
                }
            }
        });
    }
    function GetSalaryTypeForEmployees(id) {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("Hr_Employees", "SalaryTypeForEmployees"),
            data: { EmployeeId: id },
            success: function (Response) {
                var result = Response;
                if (result.IsSuccess) {
                    CustomEmpSalaryTypes = result.Response;
                    divSalaryTypesGrid.DataSource = CustomEmpSalaryTypes;
                    divSalaryTypesGrid.Bind();
                }
            }
        });
    }
    function GetEmployeeDocuments(id) {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("Hr_Employees", "GetEmployeeDocuments"),
            data: { EmployeeId: id },
            success: function (Response) {
                var result = Response;
                if (result.IsSuccess) {
                    EmpDocuments = result.Response;
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
    function MapCustomAccounts() {
        EmpAccounts = new Array();
        newAccount = new Cal_EmpAccounts();
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
            EmpAccounts.push(newAccount);
        }
        for (var i = 0; i < AddAccounts.length; i++) {
            newAccount = new Cal_EmpAccounts();
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
                EmpAccounts.push(newAccount);
            }
        }
        //console.log(EmpAccounts);
        return EmpAccounts;
    }
    function btnSearch_onclick() {
        var sys = new SystemTools();
        sys.FindKey(Modules.Hr_Employees, SharedButtons.btnSearch.id, "", function () {
            var id = SearchGrid.SearchDataGrid.SelectedKey;
            if (!IsNullOrEmpty(id)) {
                Display(GetModel(id));
            }
        });
    }
    function GetModel(id) {
        Model = Employees.filter(function (x) { return x.EmpId == id; })[0];
        return Model;
    }
    function Refrash() {
        debugger;
        GetAll();
        Disabled(true);
        if (ObjectId != 0)
            Display(GetModel(ObjectId));
        localStorage.setItem("TableName", "Hr_Employees");
        NavigateModule.InitalizeComponent();
    }
    function ResetSelect(clear) {
        if (clear) {
            $('#BasicAccCode').val(null);
            $('#accounts select').val(null);
            $('#BasicData select').val(null);
        }
    }
})(HrEmployees || (HrEmployees = {}));
//# sourceMappingURL=Hr_Employees.js.map