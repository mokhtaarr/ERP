$(document).ready(function () {
    SharedButtons.OnLoad();
    HrDepartments.InitalizeComponent();
    $('#headertop1').addClass('display_none');
    $('#headertop2').removeClass('display_none');
});
var HrDepartments;
(function (HrDepartments) {
    var sys = new SystemTools();
    var language = sys.SysSession.CurrentEnvironment.ScreenLanguage;
    var SysSession = GetSystemSession();
    var Resource = GetResourceList("");
    var element;
    $('#headerTitle').text(Resource.AdministrativeStructure);
    var Departments = new Array();
    var Model = new Hr_Departments();
    var Data = new Array();
    // Select Option
    var ParentId;
    var listObjectTree;
    var nodeActive;
    var StatusFlag;
    var Success;
    var hasNodes;
    var ObjectId = 0;
    function InitalizeComponent() {
        SharedButtons.compcode = Number(SysSession.CurrentEnvironment.CompCode);
        localStorage.setItem("TableName", "Hr_Departments");
        NavigateModule.InitalizeComponent();
        SharedWork.OnNavigate = Navigate;
        SharedButtons.AddAction(function () {
            btnAdd_onclick();
        });
        SharedButtons.DeleteAction(function () { btnDelete_onClick(); });
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
        sys.JsTree(Data);
        GetAll();
    }
    HrDepartments.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        SharedButtons.btnSearch = document.getElementById("btnHr_DepartmentsSearch");
        ParentId = document.getElementById("ParentId");
    }
    function InitalizeEvents() {
        SharedButtons.btnSearch.onclick = btnSearch_onclick;
        SharedButtons.btnRefrash.onclick = Refrash;
        SharedButtons.btnRefrash2.onclick = Refrash;
    }
    function GetAll() {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("Hr_Departments", "GetAll"),
            success: function (d) {
                var result = d;
                if (result.IsSuccess) {
                    Data = new Array();
                    Departments = result.Response;
                    FillTreeData();
                    FillDropDownList();
                }
            }
        });
    }
    function FillDropDownList() {
        if (StatusFlag == "i")
            DocumentActions.FillCombowithCode(Departments, ParentId, "DepartMentId", (language == "ar" ? "DepartName1" : "DepartName2"), "DepartCode", "اختر ادارة رئيسية");
        else {
            var newHrJobs = Departments.filter(function (x) { return x.DepartMentId != Model.DepartMentId; });
            DocumentActions.FillCombowithCode(newHrJobs, ParentId, "DepartMentId", (language == "ar" ? "DepartName1" : "DepartName2"), "DepartCode", "اختر ادارة رئيسية");
        }
    }
    function GetByID(Id) {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("Hr_Departments", "GetById"),
            data: { id: Id },
            success: function (d) {
                var result = d;
                if (result.IsSuccess) {
                    hasNodes = false;
                    Model = result.Response;
                    CheckIfElmentHasNodes();
                    Display(Model);
                    SharedWork.SwitchModes(ScreenModes.Query);
                }
                else
                    MessageBox.Show(Resource.Error, Resource.Error);
            }
        });
    }
    function CheckIfElmentHasNodes() {
        hasNodes = Departments.filter(function (x) { return x.ParentId == Model.DepartMentId; })[0] != null ? true : false;
    }
    function Display(model) {
        DocumentActions.RenderFromModel(model);
        ObjectId = Number(model.DepartMentId);
        Model = model;
    }
    function FillTreeData() {
        Data = new Array();
        for (var i = 0; i < Departments.length; i++) {
            Data.push({
                id: Departments[i].DepartMentId,
                parent: (Departments[i].ParentId != null ? Departments[i].ParentId.toString() : "#"),
                text: Departments[i].DepartCode + "-" + (language == "ar" ? Departments[i].DepartName1 : Departments[i].DepartName2),
                "state": { "opened": true }
            });
        }
        $('#Tree').jstree(true).settings.core.data = Data;
        $('#Tree').jstree(true).refresh();
    }
    HrDepartments.FillTreeData = FillTreeData;
    $('#Tree').on("select_node.jstree", function (e, data) { GetByID(data.node.id); });
    function Navigate() {
        Model = Departments[SharedWork.PageIndex - 1];
        GetByID(Model.DepartMentId);
    }
    function btnAdd_onclick() {
        StatusFlag = 'i';
        RemoveDisabled(true);
        $('select option:first-child').val('null').prop("selected", true).prop("disabled", true);
    }
    function btnEdit_onclick() {
        if (ObjectId == 0) {
            MessageBox.Show(Resource.PleaseSelectItem, Resource.Error);
        }
        else {
            RemoveDisabled(false);
            element = DocumentActions.GetElementByName("DepartCode");
            element.disabled = true;
            StatusFlag = 'u';
            FillDropDownList();
        }
    }
    function btnsave_onClick() {
        if (!ValidationHeader())
            return;
        Save();
    }
    function btnDelete_onClick() {
        if (!hasNodes)
            Delete();
        else
            MessageBox.Show(" لا يمكنك الحذف لانه لديه ابناء", Resource.Error);
    }
    function ValidationHeader() {
        if (DocumentActions.GetElementByName("DepartCode").value == "") {
            MessageBox.Show(Resource.PleaseEnterCustomerCode, Resource.Error);
            return false;
        }
        else if (DocumentActions.CheckCode(Departments, DocumentActions.GetElementByName("DepartCode").value, "DepartCode") == false && StatusFlag == "i") {
            MessageBox.Show(Resource.CustomerCodeCannotDuplicated, Resource.Error);
        }
        else if (DocumentActions.GetElementByName("DepartName1").value == "") {
            MessageBox.Show(Resource.PleaseEnterNameArabic, Resource.Error);
            return false;
        }
        else
            return true;
    }
    function RemoveDisabled(clear) {
        DocumentActions.allElements(false, clear, Model);
        $('#left').addClass("disabledDiv");
    }
    function Disabled(clear) {
        DocumentActions.allElements(true, clear, Model);
        $('#left').removeClass("disabledDiv");
    }
    function Undo() {
        Disabled(false);
        Success = false;
    }
    function Assign() {
        Model = DocumentActions.AssignToModel(Model);
        if (StatusFlag == "i") {
            Model.CreatedAt = DateTimeFormat(Date().toString());
            Model.CreatedBy = SysSession.CurrentEnvironment.UserCode;
            Insert();
        }
        if (StatusFlag == "u") {
            Model.DepartMentId = ObjectId;
            Model.UpdateAt = DateTimeFormat(Date().toString());
            Model.UpdateBy = SysSession.CurrentEnvironment.UserCode;
            Update();
        }
        ObjectId = Model.DepartMentId;
        GetAll();
        return true;
    }
    function Insert() {
        $("#MessageBoxDialog").modal("hide");
        Ajax.Callsync({
            type: "POST",
            url: sys.apiUrl("Hr_Departments", "Insert"),
            data: JSON.stringify(Model),
            success: function (Response) {
                var result = Response;
                if (result.IsSuccess) {
                    Model = result.Response;
                    ObjectId = Model.DepartMentId;
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
            url: sys.apiUrl("Hr_Departments", "Update"),
            data: JSON.stringify(Model),
            success: function (Response) {
                var result = Response;
                if (result.IsSuccess) {
                    Model = result.Response;
                    ObjectId = Model.DepartMentId;
                    Success = true;
                }
                else {
                    MessageBox.Show(Resource.Error, Resource.Error);
                    Success = false;
                }
            }
        });
    }
    function Save() {
        Assign();
        if (Success) {
            Disabled(false);
            Success = false;
            SharedWork.SwitchModes(ScreenModes.Query);
        }
    }
    function Delete() {
        $("#MessageBoxDialog").modal("hide");
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("Hr_Departments", "Delete") + "/" + ObjectId,
            success: function (result) {
                if (result) {
                    ObjectId = 0;
                    Success = result;
                    GetAll();
                    Disabled(result);
                    SharedWork.SwitchModes(ScreenModes.NoData);
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
        sys.FindKey(Modules.Hr_Departments, SharedButtons.btnSearch.id, "", function () {
            if (Model.DepartCode != null) {
                Display(Model);
            }
        });
    }
    function Refrash() {
        var _a;
        var id = '';
        nodeActive = $('.jstree-anchor.jstree-clicked');
        if (nodeActive != null && nodeActive.length > 0) {
            GetAll();
            resetTree();
            FillTreeData();
            id = (_a = nodeActive[0]) === null || _a === void 0 ? void 0 : _a.id.split("_")[0];
            GetByID(id);
        }
        if (id != '') {
            var interval_id_1 = setInterval(function () {
                listObjectTree = $('.jstree-children .jstree-node .jstree-anchor');
                listObjectTree.removeClass('jstree-clicked');
                $($('#' + ObjectId + ' a')[0]).addClass('jstree-clicked');
                clearInterval(interval_id_1);
            }, 50);
        }
    }
    function resetTree() {
        $('#Tree').jstree(true).settings.core.data = null;
        $('#Tree').jstree(true).refresh();
    }
})(HrDepartments || (HrDepartments = {}));
//# sourceMappingURL=Hr_Departments.js.map