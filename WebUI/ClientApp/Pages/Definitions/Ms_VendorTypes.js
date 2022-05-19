$(document).ready(function () {
    SharedButtons.OnLoad();
    MsVendorTypes.InitalizeComponent();
});
var MsVendorTypes;
(function (MsVendorTypes) {
    var Resource = GetResourceList("");
    $('#headertop1').addClass('display_none');
    $('#headertop2').removeClass('display_none');
    $('#headerTitle').text(Resource.SuppliersTypes);
    var sys = new SystemTools();
    var SysSession = GetSystemSession();
    //var AccountCategories: Array<Cod_AccountCategories> = new Array<Cod_AccountCategories>();
    var VendorType = new Ms_VendorTypes();
    var VendorTypes = new Array();
    var Data = new Array();
    // Select Option
    var VendorTypeParent;
    var VendorTypeLevelType;
    var Code;
    var DescA;
    var DescE;
    var Remarks;
    var VendorTypeLevel;
    var txtCreatedBy;
    var txtCreatedAt;
    var txtUpdatedBy;
    var txtUpdatedAt;
    var AccountType = null;
    var _VendorTypeId = 0;
    var ParentId = 0;
    var StatusFlag;
    var Success;
    var hasNodes;
    var IndexOfElement = 0;
    var listObjectTree;
    function InitalizeComponent() {
        SharedButtons.compcode = Number(SysSession.CurrentEnvironment.CompCode);
        localStorage.setItem("TableName", "Ms_VendorTypes");
        NavigateModule.InitalizeComponent();
        SharedWork.OnNavigate = Navigate;
        SharedButtons.AddAction(function () {
            clear();
            btnAdd_onclick();
        });
        SharedButtons.DeleteAction(function () { btnDelete_onclick(); });
        SharedButtons.EditAction(function () { btnEdit_onclick(); });
        SharedButtons.UndoAction(function () { Undo(); });
        SharedButtons.SaveAction(function () {
            if (SharedWork.CurrentMode == ScreenModes.Add || SharedWork.CurrentMode == ScreenModes.Edit) {
                btnsave_onClick();
                //SharedWork.SwitchModes(ScreenModes.Query);
            }
            else if (SharedWork.CurrentMode == ScreenModes.Query) {
                WorningMessage("يجب اختيار وضع التعديل او الاضافة اولا ", "Please Select Save Or Edit Mode First");
                return;
            }
        });
        InitalizeControls();
        InitalizeEvents();
        GetAll();
        sys.JsTree(Data);
    }
    MsVendorTypes.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        // select Option
        VendorTypeParent = document.getElementById("VendorTypeParent");
        VendorTypeLevelType = document.getElementById("VendorTypeLevelType");
        //textBoxes
        Code = document.getElementById("Code");
        DescA = document.getElementById("DescA");
        DescE = document.getElementById("DescE");
        Remarks = document.getElementById("Remarks");
        VendorTypeLevel = document.getElementById("VendorTypeLevel");
        SharedButtons.btnSearch = document.getElementById("btnVendorTypeSearch");
        txtCreatedBy = document.getElementById("txtCreatedBy");
        txtCreatedAt = document.getElementById("txtCreatedAt");
        txtUpdatedBy = document.getElementById("txtUpdatedBy");
        txtUpdatedAt = document.getElementById("txtUpdatedAt");
    }
    function InitalizeEvents() {
        SharedButtons.btnSearch.onclick = btnSearch_onclick;
        SharedButtons.btnRefrash.onclick = Refrash;
    }
    function GetAll() {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("Ms_VendorTypes", "GetAll"),
            success: function (d) {
                var result = d;
                if (result.IsSuccess) {
                    Data = new Array();
                    VendorTypes = result.Response;
                    GetTreeData();
                    //GetAccountCategoriesDropdown();
                }
            }
        });
    }
    function GetTreeData() {
        VendorTypes.map(function (x) {
            Data.push({
                id: x.VendorTypeId,
                parent: (x.VendorTypeParent != null ? x.VendorTypeParent.toString() : "#"),
                text: x.VendorTypeCode + " " + x.VendorTypeDescA,
                "state": { "opened": true }
            });
        });
        FillDropdown(true);
    }
    MsVendorTypes.GetTreeData = GetTreeData;
    function PushData(result) {
        VendorTypes.push(result);
        Data = new Array();
        VendorTypes.sort(function (a, b) { return (a.VendorTypeCode > b.VendorTypeCode) ? 1 : -1; });
        VendorTypes.map(function (x) {
            Data.push({
                id: x.VendorTypeId,
                parent: (x.VendorTypeParent != null ? x.VendorTypeParent.toString() : "#"),
                text: x.VendorTypeCode + " " + x.VendorTypeDescA,
                "state": { "opened": true }
            });
        });
        $('#Tree').jstree(true).settings.core.data = Data;
        $('#Tree').jstree(true).refresh();
    }
    $('#Tree').on("select_node.jstree", function (e, data) { click_in_labl(data.node.id); });
    function click_in_labl(Id) {
        var _a, _b, _c, _d, _e, _f, _g;
        VendorType = new Ms_VendorTypes();
        VendorType = VendorTypes.filter(function (x) { return x.VendorTypeId == Number(Id); })[0];
        if (VendorType != null) {
            _VendorTypeId = Number(VendorType.VendorTypeId);
            ParentId = Number(VendorType.VendorTypeParent);
            VendorTypeParent.value = (_a = ParentId) === null || _a === void 0 ? void 0 : _a.toString();
            Code.value = (_b = VendorType.VendorTypeCode) === null || _b === void 0 ? void 0 : _b.toString();
            DescA.value = (_c = VendorType.VendorTypeDescA) === null || _c === void 0 ? void 0 : _c.toString();
            DescE.value = (_d = VendorType.VendorTypeDescE) === null || _d === void 0 ? void 0 : _d.toString();
            Remarks.value = (_e = VendorType.Remarks) === null || _e === void 0 ? void 0 : _e.toString();
            VendorTypeLevel.value = (_f = VendorType.VendorTypeLevel) === null || _f === void 0 ? void 0 : _f.toString();
            VendorTypeLevelType.value = (_g = VendorType.VendorTypeLevelType) === null || _g === void 0 ? void 0 : _g.toString();
            var CheckIfHasNodes = VendorTypes.filter(function (x) { return x.VendorTypeParent == _VendorTypeId; })[0];
            hasNodes = CheckIfHasNodes != null ? true : false;
        }
        SharedWork.SwitchModes(ScreenModes.Query);
        $("select").trigger('change');
    }
    function Navigate() {
        var obj = $($('.jstree-children .jstree-node .jstree-anchor')[SharedWork.PageIndex - 1]);
        if (obj != null) {
            var getAccountCategoryId = obj.parent()[0].id;
            listObjectTree = $('.jstree-children .jstree-node .jstree-anchor');
            listObjectTree.removeClass('jstree-clicked');
            obj.addClass('jstree-clicked');
            click_in_labl(getAccountCategoryId);
        }
    }
    MsVendorTypes.Navigate = Navigate;
    function btnAdd_onclick() {
        StatusFlag = 'i';
        FillDropdown(true);
        clear();
        RemoveDisabled();
        //GetAccountType();
    }
    function clear() {
        Code.value = '';
        DescA.value = '';
        DescE.value = '';
        Remarks.value = '';
        VendorTypeLevel.value = '';
        VendorTypeLevelType.value = null;
        VendorTypeParent.value = null;
    }
    function RemoveDisabled() {
        Code.disabled = false;
        DescA.disabled = false;
        DescE.disabled = false;
        Remarks.disabled = false;
        //VendorTypeLevel.disabled = false;
        VendorTypeLevelType.disabled = false;
        VendorTypeParent.disabled = false;
        $('#left').addClass("disabledDiv");
    }
    function Undo() {
        clear();
        Disabled();
        FillDropdown(true);
        click_in_labl(_VendorTypeId);
        Success = false;
    }
    function Disabled() {
        Code.disabled = true;
        DescA.disabled = true;
        DescE.disabled = true;
        Remarks.disabled = true;
        //VendorTypeLevel.disabled = true;
        VendorTypeLevelType.disabled = true;
        VendorTypeParent.disabled = true;
        $('#left').removeClass("disabledDiv");
    }
    function btnEdit_onclick() {
        if (_VendorTypeId == 0) {
            MessageBox.Show(" برجاء أختيار عنصر", "خطأ");
        }
        else {
            RemoveDisabled();
            Code.disabled = true;
            StatusFlag = 'u';
            FillDropdown(false);
            VendorTypeParent.value = ParentId.toString();
        }
    }
    function btnsave_onClick() {
        if (!ValidationHeader())
            return;
        Save();
        FillDropdown(true);
    }
    function ValidationHeader() {
        if (Code.value == "") {
            MessageBox.Show(" برجاء أدخل رقم كود التبويب", "خطأ");
            return false;
        }
        else if (DescA.value == "") {
            MessageBox.Show(" برجاء أدخل الاسم بالعربي", "خطأ");
            return false;
        }
        else if (VendorTypeLevelType.value == null || VendorTypeLevelType.value == '' || VendorTypeLevelType.value == 'null') {
            MessageBox.Show(" برجاء اختيار نوع المستوى ", "خطأ");
            return false;
        }
        return true;
    }
    function Save() {
        VendorType = new Ms_VendorTypes();
        VendorType = VendorTypes.filter(function (x) { return x.VendorTypeCode == Code.value; })[0];
        if (VendorType != null && StatusFlag == "i") {
            MessageBox.Show('لا يمكنك تكرار كود التبويب ', '(Error)');
        }
        else {
            Assign();
            if (Success) {
                Disabled();
                Success = false;
            }
        }
    }
    function Assign() {
        Data = new Array();
        VendorType = new Ms_VendorTypes();
        var level = Number(VendorTypeLevel.value) == 0 ? 1 : Number(VendorTypeLevel.value);
        if (StatusFlag == "i") {
            VendorType.VendorTypeId = 0;
            VendorType.VendorTypeCode = Code.value;
            VendorType.VendorTypeDescA = DescA.value;
            VendorType.VendorTypeDescE = DescE.value;
            VendorType.Remarks = Remarks.value;
            VendorType.VendorTypeLevel = level;
            VendorType.VendorTypeParent = VendorTypeParent.value;
            VendorType.VendorTypeLevelType = Number(VendorTypeLevelType.value);
            VendorType.CreatedAt = DateTimeFormat(Date().toString());
            VendorType.CreatedBy = SysSession.CurrentEnvironment.UserCode;
            Insert();
        }
        if (StatusFlag == "u") {
            VendorType = VendorTypes.filter(function (x) { return x.VendorTypeCode == Code.value; })[0];
            VendorType.VendorTypeId = _VendorTypeId;
            VendorType.VendorTypeCode = Code.value;
            VendorType.VendorTypeDescA = DescA.value;
            VendorType.VendorTypeDescE = DescE.value;
            VendorType.Remarks = Remarks.value;
            VendorType.VendorTypeLevel = level;
            VendorType.VendorTypeParent = VendorTypeParent.value;
            VendorType.VendorTypeLevelType = Number(VendorTypeLevelType.value);
            VendorType.UpdateAt = DateTimeFormat(Date().toString());
            VendorType.UpdateBy = SysSession.CurrentEnvironment.UserCode;
            Update();
        }
        _VendorTypeId = VendorType.VendorTypeId;
        return true;
    }
    function Insert() {
        $("#MessageBoxDialog").modal("hide");
        Ajax.Callsync({
            type: "POST",
            url: sys.apiUrl("Ms_VendorTypes", "Insert"),
            data: JSON.stringify(VendorType),
            success: function (Response) {
                var result = Response;
                if (result.IsSuccess) {
                    VendorType = result.Response;
                    Success = true;
                    PushData(VendorType);
                    click_in_labl(VendorType.VendorTypeId);
                }
                else {
                    MessageBox.Show("خطأء", "خطأء");
                    Success = false;
                }
            }
        });
    }
    function Update() {
        $("#MessageBoxDialog").modal("hide");
        Ajax.Callsync({
            type: "POST",
            url: sys.apiUrl("Ms_VendorTypes", "Update"),
            data: JSON.stringify(VendorType),
            success: function (Response) {
                var result = Response;
                if (result.IsSuccess) {
                    VendorType = result.Response;
                    Success = true;
                    RemoveFromArray(_VendorTypeId);
                    Data = new Array();
                    PushData(VendorType);
                    click_in_labl(VendorType.VendorTypeId);
                }
                else {
                    MessageBox.Show("خطأء", "خطأء");
                    Success = false;
                }
            }
        });
    }
    function btnDelete_onclick() {
        StatusFlag == "d";
        if (_VendorTypeId == 0) {
            MessageBox.Show(" برجاء أختيار عنصر", "خطأ");
        }
        else {
            if (hasNodes) {
                MessageBox.Show(" لا يمكنك الحذف لانه لديه ابناء", "خطأ");
            }
            else {
                Delete();
            }
        }
        FillDropdown(true);
    }
    function Delete() {
        $("#MessageBoxDialog").modal("hide");
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("Ms_VendorTypes", "Delete") + "/" + _VendorTypeId,
            success: function (result) {
                if (result) {
                    Success = true;
                    DaleteOldData();
                    clear();
                }
                else {
                    MessageBox.Show("خطأء", "خطأء");
                    Success = false;
                }
            }
        });
    }
    function DaleteOldData() {
        RemoveFromArray(_VendorTypeId);
        $('#Tree').jstree(true).settings.core.data = Data;
        $('#Tree').jstree(true).refresh();
    }
    function RemoveFromArray(id) {
        for (var i = 0; i < Data.length; i++) {
            if (Data[i].id == id) {
                Data.splice(i, 1);
                break;
            }
        }
        for (var i = 0; i < VendorTypes.length; i++) {
            if (VendorTypes[i].VendorTypeId == id) {
                VendorTypes.splice(i, 1);
                break;
            }
        }
    }
    function FillDropdown(queryMode) {
        var newData = VendorTypes.filter(function (x) { return x.VendorTypeLevelType != 2; });
        newData = queryMode ? newData : newData.filter(function (x) { return x.VendorTypeId != _VendorTypeId; });
        DocumentActions.FillCombowithCode(newData, VendorTypeParent, "VendorTypeId", "VendorTypeDescA", "VendorTypeCode", Resource.ThereIsNo);
    }
    function GetLaVendorTypeLevel(id) {
        var newData = VendorTypes.filter(function (x) { return x.VendorTypeId == Number(id); })[0];
        VendorTypeLevel.value = newData == null ? '1' : (newData.VendorTypeLevel + 1).toString();
    }
    $('#VendorTypeParent').on('change', function () {
        var val = $(this).val();
        GetLaVendorTypeLevel(val);
    });
    function btnSearch_onclick() {
        var sys = new SystemTools();
        sys.FindKey(Modules.Ms_VendorTypes, SharedButtons.btnSearch.id, "", function () {
            var id = SearchGrid.SearchDataGrid.SelectedKey;
            if (!IsNullOrEmpty(id)) {
                click_in_labl(id);
            }
        });
    }
    function Refrash() {
        var _a;
        var nodeActive = $('.jstree-anchor.jstree-clicked');
        GetAll();
        $('#Tree').jstree(true).settings.core.data = Data;
        $('#Tree').jstree(true).refresh();
        if (nodeActive != null) {
            var id = (_a = nodeActive[0]) === null || _a === void 0 ? void 0 : _a.id.split("_")[0];
            listObjectTree = $('.jstree-children .jstree-node .jstree-anchor');
            listObjectTree.removeClass('jstree-clicked');
            nodeActive.addClass('jstree-clicked');
            click_in_labl(id);
        }
    }
})(MsVendorTypes || (MsVendorTypes = {}));
//# sourceMappingURL=Ms_VendorTypes.js.map