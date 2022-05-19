$(document).ready(function () {
    SharedButtons.OnLoad();
    ProdEquipments.InitalizeComponent();
});
var ProdEquipments;
(function (ProdEquipments) {
    $('#headertop1').addClass('display_none');
    $('#headertop2').removeClass('display_none');
    var Resource = GetResourceList("");
    var Expensess = new Array();
    var GridInputClassName = "form-control gridIput";
    $('#headerTitle').text(Resource.Prod_Equipments);
    var sys = new SystemTools();
    var divProd_EquipmentsGrid = new JsGrid();
    var SysSession = GetSystemSession();
    var compCode = SysSession.CurrentEnvironment.CompCode;
    var UserCode = SysSession.CurrentEnvironment.UserCode;
    var Token = "HGFD-" + SysSession.CurrentEnvironment.Token;
    var AllTermsIds = new Array();
    var Model = new Prod_Equipments();
    //////////////// Details ///////////////////
    var AccountChart = new Array();
    var language = sys.SysSession.CurrentEnvironment.ScreenLanguage;
    var StandardMonthlyCost;
    var StandardHolyDays;
    var StandardDailyCost;
    var StandardDailyWorkHours;
    var StandardHourlyCost;
    var NumberAvailable;
    var AccountId;
    // select Options
    var element;
    var ObjectId = 0;
    var StatusFlag;
    var Success;
    var flag = true;
    function InitalizeComponent() {
        localStorage.setItem("TableName", "Prod_Equipments");
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
        GetAll();
    }
    ProdEquipments.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        SharedButtons.btnSearch = document.getElementById("btnProd_EquipmentsSearch");
        AccountId = document.getElementById("AccountId");
        StandardMonthlyCost = document.getElementById("StandardMonthlyCost");
        StandardHolyDays = document.getElementById("StandardHolyDays");
        StandardDailyWorkHours = document.getElementById("StandardDailyWorkHours");
        StandardDailyCost = document.getElementById("StandardDailyCost");
        StandardHourlyCost = document.getElementById("StandardHourlyCost");
    }
    function InitalizeEvents() {
        SharedButtons.btnSearch.onclick = btnSearch_onclick;
        SharedButtons.btnRefrash2.onclick = Refrash;
        StandardMonthlyCost.onchange = CalculationSalary;
        StandardHolyDays.onchange = CalculationSalary;
        StandardDailyWorkHours.onchange = CalculationSalary;
        StandardDailyCost.onchange = CalculationSalary;
        StandardHourlyCost.onchange = CalculationSalary;
    }
    function GetAll() {
        Disabled(false);
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("Prod_Equipments", "GetAll"),
            success: function (d) {
                var result = d;
                if (result.IsSuccess) {
                    AllTermsIds = result.Response;
                    divProd_EquipmentsGrid.DataSource = AllTermsIds;
                    divProd_EquipmentsGrid.Bind();
                }
            }
        });
    }
    function GetByID(Id) {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("Prod_Equipments", "GetById"),
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
        Model.IsScale = Model.IsScale ? 1 : 0;
        if (StatusFlag == "i") {
            Model.CreatedAt = DateTimeFormat(Date().toString());
            Model.CreatedBy = SysSession.CurrentEnvironment.UserCode;
            Insert();
        }
        if (StatusFlag == "u") {
            Model.EquipId = ObjectId;
            Model.UpdateAt = DateTimeFormat(Date().toString());
            Model.UpdateBy = SysSession.CurrentEnvironment.UserCode;
            Update();
        }
        ObjectId = Model.EquipId;
        GetAll();
        return true;
    }
    function Save() {
        if (DocumentActions.CheckCode(AllTermsIds, DocumentActions.GetElementByName("EquipCode").value, "EquipCode") == false && StatusFlag == "i") {
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
            url: sys.apiUrl("Prod_Equipments", "Insert"),
            data: JSON.stringify(Model),
            success: function (Response) {
                var result = Response;
                if (result.IsSuccess) {
                    Model = result.Response;
                    ObjectId = Model.EquipId;
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
            url: sys.apiUrl("Prod_Equipments", "Update"),
            data: JSON.stringify(Model),
            success: function (Response) {
                var result = Response;
                if (result.IsSuccess) {
                    Model = result.Response;
                    ObjectId = Model.EquipId;
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
            url: sys.apiUrl("Prod_Equipments", "Delete"),
            data: { id: Model.EquipId },
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
            element = DocumentActions.GetElementByName("EquipCode");
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
        if (DocumentActions.GetElementByName("EquipCode").value == "") {
            MessageBox.Toastr(Resource.PleaseEnterCode, Resource.Error, ToastrTypes.error);
            flag = false;
        }
        else if (DocumentActions.GetElementByName("EquipName1").value == "") {
            MessageBox.Toastr(Resource.PleaseEnterNameArabic, Resource.Error, ToastrTypes.error);
            flag = false;
        }
        else if (DocumentActions.GetElementByName("StandardMonthlyCost").value == "") {
            MessageBox.Toastr(Resource.PleaseEnterStandardMonthlyCost, Resource.Error, ToastrTypes.error);
            flag = false;
        }
        else if (DocumentActions.GetElementByName("StandardHolyDays").value == "") {
            MessageBox.Toastr(Resource.PleaseEnterStandardHolyDays, Resource.Error, ToastrTypes.error);
            flag = false;
        }
        else if (DocumentActions.GetElementByName("StandardDailyCost").value == "") {
            MessageBox.Toastr(Resource.PleaseEnterStandardDailyCost, Resource.Error, ToastrTypes.error);
            flag = false;
        }
        else if (DocumentActions.GetElementByName("StandardDailyWorkHours").value == "") {
            MessageBox.Toastr(Resource.PleaseEnterStandardDailyWorkHours, Resource.Error, ToastrTypes.error);
            flag = false;
        }
        else if (DocumentActions.GetElementByName("StandardHourlyCost").value == "") {
            MessageBox.Toastr(Resource.PleaseEnterStandardHourlyCost, Resource.Error, ToastrTypes.error);
            flag = false;
        }
        else if (DocumentActions.GetElementByName("NumberAvailable").value == "") {
            MessageBox.Toastr(Resource.PleaseEnterNumberAvailable, Resource.Error, ToastrTypes.error);
            flag = false;
        }
        else
            flag = true;
        return flag;
    }
    function Navigate() {
        Model = AllTermsIds[SharedWork.PageIndex - 1];
        ObjectId = Model.EquipId;
        GetByID(ObjectId);
    }
    ProdEquipments.Navigate = Navigate;
    function Display(model) {
        Model = model;
        DocumentActions.RenderFromModel(Model);
        ObjectId = Number(Model.EquipId);
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
        Model = AllTermsIds.filter(function (x) { return x.EquipId == id; })[0];
        return Model;
    }
    function btnSearch_onclick() {
        var sys = new SystemTools();
        sys.FindKey(Modules.Prod_Equipments, SharedButtons.btnSearch.id, "", function () {
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
    function InitializeGrid() {
        divProd_EquipmentsGrid.ElementName = "divProd_EquipmentsGrid";
        divProd_EquipmentsGrid.PrimaryKey = "EquipId";
        divProd_EquipmentsGrid.Editing = true;
        divProd_EquipmentsGrid.Paging = true;
        divProd_EquipmentsGrid.Sorting = true;
        divProd_EquipmentsGrid.PageSize = 10;
        divProd_EquipmentsGrid.ConfirmDeleteing = true;
        divProd_EquipmentsGrid.InsertionMode = JsGridInsertionMode.Binding;
        divProd_EquipmentsGrid.OnRowSelected = function () {
            GetByID(divProd_EquipmentsGrid.SelectedItem.EquipId);
        };
        divProd_EquipmentsGrid.Columns = [
            {
                title: Resource.Code, css: "ColumPadding", name: "EquipCode"
            },
            {
                title: Resource.Name_Arabic, css: "ColumPadding", name: "EquipName1"
            },
            {
                title: Resource.Name_English, css: "ColumPadding", name: "EquipName2"
            },
            {
                title: Resource.App_desc, css: "ColumPadding", name: "JDesc"
            },
            {
                title: Resource.StandardMonthlyCost, css: "ColumPadding", name: "StandardMonthlyCost"
            },
            {
                title: Resource.StandardHolyDays, css: "ColumPadding", name: "StandardHolyDays"
            }, {
                title: Resource.StandardDailyCost, css: "ColumPadding", name: "StandardDailyCost"
            }, {
                title: Resource.StandardDailyWorkHours, css: "ColumPadding", name: "StandardDailyWorkHours"
            }, {
                title: Resource.StandardHourlyCost, css: "ColumPadding", name: "StandardHourlyCost"
            }, {
                title: Resource.NumberAvailable, css: "ColumPadding", name: "NumberAvailable"
            },
            {
                title: Resource.Notes, css: "ColumPadding", name: "Remarks"
            },
            {
                title: "EquipId", css: "ColumPadding disable hidden", name: "EquipId", width: "1%",
                headerTemplate: function () {
                    var txt = CreateElement("text", GridInputClassName, " ", " ", "EquipId", " ");
                    txt.disabled = true;
                    txt.id = "hd_EquipId";
                    return HeaderTemplate("EquipId", txt);
                }
            }
        ];
        divProd_EquipmentsGrid.Bind();
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
    function CalculationSalary() {
        StandardDailyCost.value = (Number(StandardMonthlyCost.value) / (30 - Number(StandardHolyDays.value))).toFixed(2).toString();
        StandardHourlyCost.value = (Number(StandardDailyCost.value) / Number(StandardDailyWorkHours.value == "" ? "1" : StandardDailyWorkHours.value)).toFixed(2).toString();
    }
})(ProdEquipments || (ProdEquipments = {}));
//# sourceMappingURL=Prod_Equipments.js.map