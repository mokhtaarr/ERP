$(document).ready(function () {
    SharedButtons.OnLoad();
    MSExpenses.InitalizeComponent();
});
var MSExpenses;
(function (MSExpenses) {
    $('#headertop1').addClass('display_none');
    $('#headertop2').removeClass('display_none');
    var Resource = GetResourceList("");
    var Expensess = new Array();
    var GridInputClassName = "form-control gridIput";
    $('#headerTitle').text(Resource.Expenses);
    var sys = new SystemTools();
    var divExpensesGrid = new JsGrid();
    var SysSession = GetSystemSession();
    var compCode = SysSession.CurrentEnvironment.CompCode;
    var UserCode = SysSession.CurrentEnvironment.UserCode;
    var Token = "HGFD-" + SysSession.CurrentEnvironment.Token;
    var AllExpenses = new Array();
    var Model = new MS_Expenses();
    //////////////// Details ///////////////////
    var AccountChart = new Array();
    var language = sys.SysSession.CurrentEnvironment.ScreenLanguage;
    var AccountId;
    // select Options
    var element;
    var ObjectId = 0;
    var StatusFlag;
    var Success;
    var flag = true;
    function InitalizeComponent() {
        localStorage.setItem("TableName", "MS_Expenses");
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
        InitializeGrid();
        GetAllAccountChart();
        GetAll();
    }
    MSExpenses.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        SharedButtons.btnSearch = document.getElementById("btnMS_ExpensesSearch");
        AccountId = document.getElementById("AccountId");
    }
    function InitalizeEvents() {
        SharedButtons.btnSearch.onclick = btnSearch_onclick;
        SharedButtons.btnRefrash2.onclick = Refrash;
        //TermType.onchange = function () {
        //    TermTypechanged(TermType.value)
        //};
    }
    function GetAll() {
        Disabled(false);
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("MS_Expenses", "GetAll"),
            success: function (d) {
                var result = d;
                if (result.IsSuccess) {
                    AllExpenses = result.Response;
                    divExpensesGrid.DataSource = AllExpenses;
                    divExpensesGrid.Bind();
                    //console.log(Terms)
                }
            }
        });
    }
    function GetByID(Id) {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("MS_Expenses", "GetById"),
            data: { id: Id },
            success: function (d) {
                var result = d;
                if (result.IsSuccess) {
                    var res = result.Response;
                    Display(res);
                }
                else
                    MessageBox.Toastr(Resource.Error, Resource.Error, ToastrTypes.error);
            }
        });
    }
    function Assign() {
        Model = DocumentActions.AssignToModel(Model);
        Model.ExpensesType = IsNullOrEmpty(Model.ExpensesType.toString()) ? 3 : Model.ExpensesType;
        if (StatusFlag == "i") {
            Model.CreatedAt = DateTimeFormat(Date().toString());
            Model.CreatedBy = SysSession.CurrentEnvironment.UserCode;
            Insert();
        }
        if (StatusFlag == "u") {
            Model.ExpensesId = ObjectId;
            Model.UpdateAt = DateTimeFormat(Date().toString());
            Model.UpdateBy = SysSession.CurrentEnvironment.UserCode;
            Update();
        }
        ObjectId = Model.ExpensesId;
        GetAll();
        return true;
    }
    function Save() {
        if (DocumentActions.CheckCode(AllExpenses, DocumentActions.GetElementByName("ExpensesCode").value, "ExpensesCode") == false && StatusFlag == "i") {
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
            url: sys.apiUrl("MS_Expenses", "Insert"),
            data: JSON.stringify(Model),
            success: function (Response) {
                var result = Response;
                if (result.IsSuccess) {
                    Model = result.Response;
                    ObjectId = Model.ExpensesId;
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
            url: sys.apiUrl("MS_Expenses", "Update"),
            data: JSON.stringify(Model),
            success: function (Response) {
                var result = Response;
                if (result.IsSuccess) {
                    Model = result.Response;
                    ObjectId = Model.ExpensesId;
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
            url: sys.apiUrl("MS_Expenses", "Delete"),
            data: { id: Model.ExpensesId },
            success: function (result) {
                if (result) {
                    Success = true;
                    ObjectId = 0;
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
        $('select option:first-child').val('null').prop("selected", true).prop("disabled", true);
    }
    function btnEdit_onclick() {
        if (ObjectId == 0) {
            MessageBox.Toastr(Resource.PleaseSelectItem, Resource.Error, ToastrTypes.error);
        }
        else {
            RemoveDisabled(false);
            element = DocumentActions.GetElementByName("ExpensesCode");
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
        if (DocumentActions.GetElementByName("ExpensesCode").value == "") {
            MessageBox.Toastr(Resource.PleaseEnterCode, Resource.Error, ToastrTypes.error);
            flag = false;
        }
        else if (DocumentActions.GetElementByName("ExpensesDescA").value == "") {
            MessageBox.Toastr(Resource.PleaseEnterNameArabic, Resource.Error, ToastrTypes.error);
            flag = false;
        }
        else if (AccountId.value == "" || IsNullOrEmpty(AccountId.value)) {
            MessageBox.Toastr(Resource.SelectAccount, Resource.Error, ToastrTypes.error);
            flag = false;
        }
        else
            flag = true;
        return flag;
    }
    function Navigate() {
        Model = AllExpenses[SharedWork.PageIndex - 1];
        ObjectId = Model.ExpensesId;
        GetByID(ObjectId);
    }
    MSExpenses.Navigate = Navigate;
    function Display(model) {
        Model = model;
        DocumentActions.RenderFromModel(Model);
        ObjectId = Number(Model.ExpensesId);
        SharedWork.SwitchModes(ScreenModes.Query);
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
    function GetModel(id) {
        Model = AllExpenses.filter(function (x) { return x.ExpensesId == id; })[0];
        return Model;
    }
    function btnSearch_onclick() {
        var sys = new SystemTools();
        sys.FindKey(Modules.MS_Expenses, SharedButtons.btnSearch.id, "", function () {
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
    //function ClearGrids() {
    //    currCategoryList = new Array<CustomCurrencyCategory>();
    //    currRateList = new Array<CustomCurrencyRate>();
    //    ClearBranchesGrid();
    //}
    function InitializeGrid() {
        divExpensesGrid.ElementName = "divExpensesGrid";
        divExpensesGrid.PrimaryKey = "ExpensesId";
        divExpensesGrid.Editing = true;
        divExpensesGrid.Paging = true;
        divExpensesGrid.Sorting = true;
        divExpensesGrid.PageSize = 10;
        divExpensesGrid.ConfirmDeleteing = true;
        divExpensesGrid.InsertionMode = JsGridInsertionMode.Binding;
        divExpensesGrid.OnRowSelected = function () {
            Display(divExpensesGrid.SelectedItem);
        };
        divExpensesGrid.Columns = [
            {
                title: Resource.Code, css: "ColumPadding", name: "ExpensesCode"
            },
            {
                title: Resource.Name_Arabic, css: "ColumPadding", name: "ExpensesDescA"
            },
            {
                title: Resource.Name_English, css: "ColumPadding", name: "ExpensesDescE"
            },
            {
                title: Resource.ExpensesType, css: "ColumPadding", name: "ExpensesType", itemTemplate: function (e) {
                    switch (e) {
                        case 1:
                            return Resource.Purchase;
                            break;
                        case 2:
                            return Resource.Men_Sales;
                            break;
                        case 3:
                            return Resource.Other;
                            break;
                    }
                }
            },
            {
                title: Resource.Notes, css: "ColumPadding", name: "Remarks"
            },
            {
                title: "ExpensesId", css: "ColumPadding disable hidden", name: "ExpensesId", width: "1%",
                headerTemplate: function () {
                    var txt = CreateElement("text", GridInputClassName, " ", " ", "ExpensesId", " ");
                    txt.disabled = true;
                    txt.id = "hd_ExpensesId";
                    return HeaderTemplate("ExpensesId", txt);
                }
            }
        ];
        divExpensesGrid.Bind();
    }
    function GetAllAccountChart() {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("funcationShared", "GetAllSubAccountChart"),
            success: function (Response) {
                var result = Response;
                if (result.IsSuccess) {
                    AccountChart = result.Response;
                    DocumentActions.FillCombowithCode(AccountChart, AccountId, "AccountId", (language == "ar" ? "AccountNameA" : "AccountNameE"), "AccountCode", Resource.Account2);
                }
            }
        });
        return AccountChart;
    }
})(MSExpenses || (MSExpenses = {}));
//# sourceMappingURL=MS_Expenses .js.map