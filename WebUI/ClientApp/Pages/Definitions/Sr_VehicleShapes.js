$(document).ready(function () {
    SharedButtons.OnLoad();
    SrVehicleShapes.InitalizeComponent();
});
var SrVehicleShapes;
(function (SrVehicleShapes) {
    $('#headertop1').addClass('display_none');
    $('#headertop2').removeClass('display_none');
    var Resource = GetResourceList("");
    var VehicleTypess = new Array();
    var GridInputClassName = "form-control gridIput";
    $('#headerTitle').text(Resource.VehicleShapes);
    var sys = new SystemTools();
    var divVehicleShapesGrid = new JsGrid();
    var SysSession = GetSystemSession();
    var compCode = SysSession.CurrentEnvironment.CompCode;
    var UserCode = SysSession.CurrentEnvironment.UserCode;
    var Token = "HGFD-" + SysSession.CurrentEnvironment.Token;
    var AllVehicleTypes = new Array();
    var Model = new Sr_VehicleShapes();
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
        localStorage.setItem("TableName", "Sr_VehicleShapes");
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
    SrVehicleShapes.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        SharedButtons.btnSearch = document.getElementById("btnSr_VehicleShapesSearch");
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
            url: sys.apiUrl("Sr_VehicleShapes", "GetAll"),
            success: function (d) {
                var result = d;
                if (result.IsSuccess) {
                    AllVehicleTypes = result.Response;
                    divVehicleShapesGrid.DataSource = AllVehicleTypes;
                    divVehicleShapesGrid.Bind();
                }
            }
        });
    }
    function GetByID(Id) {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("Sr_VehicleShapes", "GetById"),
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
        //Model.ShapeCode = IsNullOrEmpty(Model.ShapeCode.toString) ? 3 : Model.ShapeCode
        if (StatusFlag == "i") {
            Model.CreatedAt = DateTimeFormat(Date().toString());
            Model.CreatedBy = SysSession.CurrentEnvironment.UserCode;
            Insert();
        }
        if (StatusFlag == "u") {
            Model.VehicleShapeId = ObjectId;
            Model.UpdateAt = DateTimeFormat(Date().toString());
            Model.UpdateBy = SysSession.CurrentEnvironment.UserCode;
            Update();
        }
        ObjectId = Model.VehicleShapeId;
        GetAll();
        return true;
    }
    function Save() {
        if (DocumentActions.CheckCode(AllVehicleTypes, DocumentActions.GetElementByName("ShapeCode").value, "ShapeCode") == false && StatusFlag == "i") {
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
            url: sys.apiUrl("Sr_VehicleShapes", "Insert"),
            data: JSON.stringify(Model),
            success: function (Response) {
                var result = Response;
                if (result.IsSuccess) {
                    Model = result.Response;
                    ObjectId = Model.VehicleShapeId;
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
            url: sys.apiUrl("Sr_VehicleShapes", "Update"),
            data: JSON.stringify(Model),
            success: function (Response) {
                var result = Response;
                if (result.IsSuccess) {
                    Model = result.Response;
                    ObjectId = Model.VehicleShapeId;
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
            url: sys.apiUrl("Sr_VehicleShapes", "Delete"),
            data: { id: Model.VehicleShapeId },
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
            element = DocumentActions.GetElementByName("ShapeCode");
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
        if (DocumentActions.GetElementByName("ShapeCode").value == "") {
            MessageBox.Toastr(Resource.PleaseEnterCode, Resource.Error, ToastrTypes.error);
            flag = false;
        }
        else if (DocumentActions.GetElementByName("Name1").value == "") {
            MessageBox.Toastr(Resource.PleaseEnterNameArabic, Resource.Error, ToastrTypes.error);
            flag = false;
        }
        //else if (ShapeCode.value == "" || IsNullOrEmpty(ShapeCode.value)) {
        //    MessageBox.Toastr(Resource.SelectAccount, Resource.Error, ToastrTypes.error);
        //    flag = false
        //}
        else
            flag = true;
        return flag;
    }
    function Navigate() {
        Model = AllVehicleTypes[SharedWork.PageIndex - 1];
        ObjectId = Model.VehicleShapeId;
        GetByID(ObjectId);
    }
    SrVehicleShapes.Navigate = Navigate;
    function Display(model) {
        Model = model;
        DocumentActions.RenderFromModel(Model);
        ObjectId = Number(Model.VehicleShapeId);
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
        Model = AllVehicleTypes.filter(function (x) { return x.VehicleShapeId == id; })[0];
        return Model;
    }
    function btnSearch_onclick() {
        var sys = new SystemTools();
        sys.FindKey(Modules.Sr_VehicleShapes, SharedButtons.btnSearch.id, "", function () {
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
        divVehicleShapesGrid.ElementName = "divVehicleShapesGrid";
        divVehicleShapesGrid.PrimaryKey = "VehicleShapeId";
        divVehicleShapesGrid.Editing = true;
        divVehicleShapesGrid.Paging = true;
        divVehicleShapesGrid.Sorting = true;
        divVehicleShapesGrid.PageSize = 10;
        divVehicleShapesGrid.ConfirmDeleteing = true;
        divVehicleShapesGrid.InsertionMode = JsGridInsertionMode.Binding;
        divVehicleShapesGrid.OnRowSelected = function () {
            Display(divVehicleShapesGrid.SelectedItem);
        };
        divVehicleShapesGrid.Columns = [
            {
                title: Resource.Code, css: "ColumPadding", name: "ShapeCode"
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
                title: "VehicleShapeId", css: "ColumPadding disable hidden", name: "VehicleShapeId", width: "1%",
                headerTemplate: function () {
                    var txt = CreateElement("text", GridInputClassName, " ", " ", "VehicleShapeId", " ");
                    txt.disabled = true;
                    txt.id = "hd_VehicleShapeId";
                    return HeaderTemplate("VehicleShapeId", txt);
                }
            }
        ];
        divVehicleShapesGrid.Bind();
    }
})(SrVehicleShapes || (SrVehicleShapes = {}));
//# sourceMappingURL=Sr_VehicleShapes.js.map