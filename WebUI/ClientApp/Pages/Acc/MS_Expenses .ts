$(document).ready(() => {
    SharedButtons.OnLoad();
    MSExpenses.InitalizeComponent();
})

namespace MSExpenses  {
    $('#headertop1').addClass('display_none');
    $('#headertop2').removeClass('display_none');

    let Resource: any = GetResourceList("");
    var Expensess: Array<MS_Expenses> = new Array<MS_Expenses>();
    const GridInputClassName = "form-control gridIput";
    $('#headerTitle').text(Resource.Expenses);

    var sys: SystemTools = new SystemTools();
    var divExpensesGrid: JsGrid = new JsGrid();
    var SysSession: SystemSession = GetSystemSession();
    let compCode = SysSession.CurrentEnvironment.CompCode;
    let UserCode = SysSession.CurrentEnvironment.UserCode;
    let Token = "HGFD-" + SysSession.CurrentEnvironment.Token;

    var AllExpenses: Array<MS_Expenses> = new Array<MS_Expenses>();
    var Model: MS_Expenses = new MS_Expenses();
    //////////////// Details ///////////////////
    var AccountChart: Array<Cal_AccountChart> = new Array<Cal_AccountChart>();
    var language = sys.SysSession.CurrentEnvironment.ScreenLanguage;

   
    var AccountId: HTMLSelectElement;
    // select Options
    var element: HTMLInputElement;

    var ObjectId = 0;
    var StatusFlag;
    var Success;
    var flag: boolean = true;

    export function InitalizeComponent() {
        localStorage.setItem("TableName", "MS_Expenses");

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
        InitializeGrid();
        GetAllAccountChart();
        GetAll();
    }

    function InitalizeControls() {
        SharedButtons.btnSearch = document.getElementById("btnMS_ExpensesSearch") as HTMLButtonElement;
        AccountId = document.getElementById("AccountId") as HTMLSelectElement;
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
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess) {
                    AllExpenses = result.Response as Array<MS_Expenses>;
                    divExpensesGrid.DataSource = AllExpenses;
                    divExpensesGrid.Bind();
                    //console.log(Terms)
                }
            }
        });
    }

    function GetByID(Id: number) {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("MS_Expenses", "GetById"),
            data: { id: Id },
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess) {
                    let res = result.Response as MS_Expenses;
                    Display(res);
                }
                else
                    MessageBox.Toastr(Resource.Error, Resource.Error, ToastrTypes.error);
            }
        });
    }

    function Assign() {
        Model = DocumentActions.AssignToModel<MS_Expenses>(Model);
        Model.ExpensesType = IsNullOrEmpty(Model.ExpensesType.toString()) ? 3 : Model.ExpensesType
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
            success: (Response) => {
                let result = Response as BaseResponse;
                if (result.IsSuccess) {
                    Model = result.Response as MS_Expenses;
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
            success: (Response) => {
                let result = Response as BaseResponse;
                if (result.IsSuccess) {
                    Model = result.Response as MS_Expenses;
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
            data: { id: Model.ExpensesId},
            success: (result) => {
                if (result) {
                    Success = true;
                    ObjectId = 0;
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
        if (DocumentActions.GetElementByName("ExpensesCode").value == "") {
            MessageBox.Toastr(Resource.PleaseEnterCode, Resource.Error, ToastrTypes.error);
            flag = false
        }
        else if (DocumentActions.GetElementByName("ExpensesDescA").value == "") {
            MessageBox.Toastr(Resource.PleaseEnterNameArabic, Resource.Error, ToastrTypes.error);
            flag = false
        }
        else if (AccountId.value == "" || IsNullOrEmpty(AccountId.value)) {
            MessageBox.Toastr(Resource.SelectAccount, Resource.Error, ToastrTypes.error);
            flag = false
        }
        else
            flag = true;

        return flag;
    }

    export function Navigate() {
        Model = AllExpenses[SharedWork.PageIndex - 1];
        ObjectId = Model.ExpensesId;
        GetByID(ObjectId);
    }

    function Display(model: MS_Expenses) {
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

    function Disabled(clear: boolean) {
        DocumentActions.allElements(true, clear, Model);
    }

    function RemoveDisabled(clear: boolean) {
        DocumentActions.allElements(false, clear, Model);
    }

    function GetModel(id: number) {
        Model = AllExpenses.filter(x => x.ExpensesId == id)[0];
        return Model;
    }
   
    function btnSearch_onclick() {
        let sys: SystemTools = new SystemTools();
        sys.FindKey(Modules.MS_Expenses, SharedButtons.btnSearch.id, "", () => {
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
        divExpensesGrid.OnRowSelected = () => {
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
                title: Resource.ExpensesType, css: "ColumPadding", name: "ExpensesType", itemTemplate: (e) => {
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
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("text", GridInputClassName, " ", " ", "ExpensesId", " ");
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
            success: (Response) => {
                let result = Response as BaseResponse;
                if (result.IsSuccess) {
                    AccountChart = result.Response as Array<Cal_AccountChart>;
                    DocumentActions.FillCombowithCode(AccountChart, AccountId, "AccountId", (language == "ar" ? "AccountNameA" : "AccountNameE"), "AccountCode", Resource.Account2);
                }
            }
        });
        return AccountChart;
    }
}
