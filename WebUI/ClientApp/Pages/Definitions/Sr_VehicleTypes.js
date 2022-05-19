$(document).ready(function () {
    SharedButtons.OnLoad();
    SrVehicleTypes.InitalizeComponent();
});
var SrVehicleTypes;
(function (SrVehicleTypes) {
    $('#headertop1').addClass('display_none');
    $('#headertop2').removeClass('display_none');
    var Resource = GetResourceList("");
    var VehicleTypess = new Array();
    var GridInputClassName = "form-control gridIput";
    $('#headerTitle').text(Resource.VehicleTypes);
    var sys = new SystemTools();
    var divVehicleTypesGrid = new JsGrid();
    var SysSession = GetSystemSession();
    var compCode = SysSession.CurrentEnvironment.CompCode;
    var UserCode = SysSession.CurrentEnvironment.UserCode;
    var Token = "HGFD-" + SysSession.CurrentEnvironment.Token;
    var AllVehicleTypes = new Array();
    var Model = new Sr_VehicleTypes();
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
        localStorage.setItem("TableName", "Sr_VehicleTypes");
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
    SrVehicleTypes.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        SharedButtons.btnSearch = document.getElementById("btnSr_VehicleTypesSearch");
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
            url: sys.apiUrl("Sr_VehicleTypes", "GetAll"),
            success: function (d) {
                var result = d;
                if (result.IsSuccess) {
                    AllVehicleTypes = result.Response;
                    divVehicleTypesGrid.DataSource = AllVehicleTypes;
                    divVehicleTypesGrid.Bind();
                }
            }
        });
    }
    function GetByID(Id) {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("Sr_VehicleTypes", "GetById"),
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
        //Model.TypeCode = IsNullOrEmpty(Model.TypeCode.toString) ? 3 : Model.TypeCode
        if (StatusFlag == "i") {
            Model.CreatedAt = DateTimeFormat(Date().toString());
            Model.CreatedBy = SysSession.CurrentEnvironment.UserCode;
            Insert();
        }
        if (StatusFlag == "u") {
            Model.VehicleTypId = ObjectId;
            Model.UpdateAt = DateTimeFormat(Date().toString());
            Model.UpdateBy = SysSession.CurrentEnvironment.UserCode;
            Update();
        }
        ObjectId = Model.VehicleTypId;
        GetAll();
        return true;
    }
    function Save() {
        if (DocumentActions.CheckCode(AllVehicleTypes, DocumentActions.GetElementByName("TypeCode").value, "TypeCode") == false && StatusFlag == "i") {
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
            url: sys.apiUrl("Sr_VehicleTypes", "Insert"),
            data: JSON.stringify(Model),
            success: function (Response) {
                var result = Response;
                if (result.IsSuccess) {
                    Model = result.Response;
                    ObjectId = Model.VehicleTypId;
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
            url: sys.apiUrl("Sr_VehicleTypes", "Update"),
            data: JSON.stringify(Model),
            success: function (Response) {
                var result = Response;
                if (result.IsSuccess) {
                    Model = result.Response;
                    ObjectId = Model.VehicleTypId;
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
            url: sys.apiUrl("Sr_VehicleTypes", "Delete"),
            data: { id: Model.VehicleTypId },
            success: function (result) {
                if (result) {
                    Success = true;
                    ObjectId = 0;
                    GetAll();
                    Disabled(result);
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
            element = DocumentActions.GetElementByName("TypeCode");
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
        if (DocumentActions.GetElementByName("TypeCode").value == "") {
            MessageBox.Toastr(Resource.PleaseEnterCode, Resource.Error, ToastrTypes.error);
            flag = false;
        }
        else if (DocumentActions.GetElementByName("Name1").value == "") {
            MessageBox.Toastr(Resource.PleaseEnterNameArabic, Resource.Error, ToastrTypes.error);
            flag = false;
        }
        //else if (TypeCode.value == "" || IsNullOrEmpty(TypeCode.value)) {
        //    MessageBox.Toastr(Resource.SelectAccount, Resource.Error, ToastrTypes.error);
        //    flag = false
        //}
        else
            flag = true;
        return flag;
    }
    function Navigate() {
        Model = AllVehicleTypes[SharedWork.PageIndex - 1];
        ObjectId = Model.VehicleTypId;
        GetByID(ObjectId);
    }
    SrVehicleTypes.Navigate = Navigate;
    function Display(model) {
        Model = model;
        DocumentActions.RenderFromModel(Model);
        ObjectId = Number(Model.VehicleTypId);
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
        Model = AllVehicleTypes.filter(function (x) { return x.VehicleTypId == id; })[0];
        return Model;
    }
    function btnSearch_onclick() {
        var sys = new SystemTools();
        sys.FindKey(Modules.Sr_VehicleTypes, SharedButtons.btnSearch.id, "", function () {
            var id = SearchGrid.SearchDataGrid.SelectedKey;
            if (!IsNullOrEmpty(id)) {
                GetByID(ObjectId);
            }
        });
    }
    function Refrash() {
        GetAll();
        if (ObjectId != 0)
            GetByID(ObjectId);
    }
    function InitializeGrid() {
        divVehicleTypesGrid.ElementName = "divVehicleTypesGrid";
        divVehicleTypesGrid.PrimaryKey = "VehicleTypId";
        divVehicleTypesGrid.Editing = true;
        divVehicleTypesGrid.Paging = true;
        divVehicleTypesGrid.Sorting = true;
        divVehicleTypesGrid.PageSize = 10;
        divVehicleTypesGrid.ConfirmDeleteing = true;
        divVehicleTypesGrid.InsertionMode = JsGridInsertionMode.Binding;
        divVehicleTypesGrid.OnRowSelected = function () {
            Display(divVehicleTypesGrid.SelectedItem);
        };
        divVehicleTypesGrid.Columns = [
            {
                title: Resource.Code, css: "ColumPadding", name: "TypeCode"
            },
            {
                title: Resource.Name_Arabic, css: "ColumPadding", name: "Name1"
            },
            {
                title: Resource.Name_English, css: "ColumPadding", name: "Name2"
            },
            {
                title: Resource.Notes, css: "ColumPadding", name: "Remark"
            },
            {
                title: "VehicleTypId", css: "ColumPadding disable hidden", name: "VehicleTypId", width: "1%",
                headerTemplate: function () {
                    var txt = CreateElement("text", GridInputClassName, " ", " ", "VehicleTypId", " ");
                    txt.disabled = true;
                    txt.id = "hd_VehicleTypId";
                    return HeaderTemplate("VehicleTypId", txt);
                }
            }
        ];
        divVehicleTypesGrid.Bind();
    }
})(SrVehicleTypes || (SrVehicleTypes = {}));
//# sourceMappingURL=Sr_VehicleTypes.js.map