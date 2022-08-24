$(document).ready(function () {
    SharedButtons.OnLoad();
    Ms_CustomerType.InitalizeComponent();
});
var Ms_CustomerType;
(function (Ms_CustomerType) {
    $('#headertop1').addClass('display_none');
    $('#headertop2').removeClass('display_none');
    var Resource = GetResourceList("");
    $('#headerTitle').text(Resource.CustomerTypes);
    var sys = new SystemTools();
    var SysSession = GetSystemSession();
    var CustomerType = new Ms_CustomerTypes();
    var CustomerTypes = new Array();
    var Data = new Array();
    // Select Option
    var CustomerTypeParent;
    var CustomerTypeLevelType;
    var Code;
    var DescA;
    var DescE;
    var Remarks;
    var CustomerTypeLevel;
    var txtCreatedBy;
    var txtCreatedAt;
    var txtUpdatedBy;
    var txtUpdatedAt;
    var AccountType = null;
    var _CustomerTypeId = 0;
    var ParentId = 0;
    var StatusFlag;
    var Success;
    var hasNodes;
    var IndexOfElement = 0;
    var listObjectTree;
    function InitalizeComponent() {
        SharedButtons.compcode = Number(SysSession.CurrentEnvironment.CompCode);
        localStorage.setItem("TableName", "Ms_CustomerTypes");
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
    Ms_CustomerType.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        // select Option
        CustomerTypeParent = document.getElementById("CustomerTypeParent");
        CustomerTypeLevelType = document.getElementById("CustomerTypeLevelType");
        //textBoxes
        Code = document.getElementById("Code");
        DescA = document.getElementById("DescA");
        DescE = document.getElementById("DescE");
        Remarks = document.getElementById("Remarks");
        CustomerTypeLevel = document.getElementById("CustomerTypeLevel");
        SharedButtons.btnSearch = document.getElementById("btnCustomerTypeSearch");
        txtCreatedBy = document.getElementById("txtCreatedBy");
        txtCreatedAt = document.getElementById("txtCreatedAt");
        txtUpdatedBy = document.getElementById("txtUpdatedBy");
        txtUpdatedAt = document.getElementById("txtUpdatedAt");
    }
    function InitalizeEvents() {
        SharedButtons.btnSearch.onclick = btnSearch_onclick;
        SharedButtons.btnRefrash.onclick = Refrash;
        SharedButtons.btnRefrash2.onclick = Refrash;
    }
    function GetAll() {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("Ms_CustomerTypes", "GetAll"),
            success: function (d) {
                var result = d;
                if (result.IsSuccess) {
                    Data = new Array();
                    CustomerTypes = result.Response;
                    GetTreeData();
                    //GetAccountCategoriesDropdown();
                }
            }
        });
    }
    function GetTreeData() {
        CustomerTypes.map(function (x) {
            Data.push({
                id: x.CustomerTypeId,
                parent: (x.CustomerTypeParent != null ? x.CustomerTypeParent.toString() : "#"),
                text: x.CustomerTypeCode + " " + x.CustomerTypeDescA,
                "state": { "opened": true }
            });
        });
        FillDropdown(true);
    }
    Ms_CustomerType.GetTreeData = GetTreeData;
    function PushData(result) {
        CustomerTypes.push(result);
        Data = new Array();
        CustomerTypes.sort(function (a, b) { return (a.CustomerTypeCode > b.CustomerTypeCode) ? 1 : -1; });
        CustomerTypes.map(function (x) {
            Data.push({
                id: x.CustomerTypeId,
                parent: (x.CustomerTypeParent != null ? x.CustomerTypeParent.toString() : "#"),
                text: x.CustomerTypeCode + " " + x.CustomerTypeDescA,
                "state": { "opened": true }
            });
        });
        $('#Tree').jstree(true).settings.core.data = Data;
        $('#Tree').jstree(true).refresh();
    }
    $('#Tree').on("select_node.jstree", function (e, data) { click_in_labl(data.node.id); });
    function click_in_labl(Id) {
        var _a, _b, _c, _d, _e, _f;
        CustomerType = new Ms_CustomerTypes();
        CustomerType = CustomerTypes.filter(function (x) { return x.CustomerTypeId == Number(Id); })[0];
        if (CustomerType != null) {
            _CustomerTypeId = Number(CustomerType.CustomerTypeId);
            ParentId = Number(CustomerType.CustomerTypeParent);
            CustomerTypeParent.value = ParentId === null || ParentId === void 0 ? void 0 : ParentId.toString();
            Code.value = (_a = CustomerType.CustomerTypeCode) === null || _a === void 0 ? void 0 : _a.toString();
            DescA.value = (_b = CustomerType.CustomerTypeDescA) === null || _b === void 0 ? void 0 : _b.toString();
            DescE.value = (_c = CustomerType.CustomerTypeDescE) === null || _c === void 0 ? void 0 : _c.toString();
            Remarks.value = (_d = CustomerType.Remarks) === null || _d === void 0 ? void 0 : _d.toString();
            CustomerTypeLevel.value = (_e = CustomerType.CustomerTypeLevel) === null || _e === void 0 ? void 0 : _e.toString();
            CustomerTypeLevelType.value = (_f = CustomerType.CustomerTypeLevelType) === null || _f === void 0 ? void 0 : _f.toString();
            var CheckIfHasNodes = CustomerTypes.filter(function (x) { return x.CustomerTypeParent == _CustomerTypeId; })[0];
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
    Ms_CustomerType.Navigate = Navigate;
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
        CustomerTypeLevel.value = '';
        CustomerTypeLevelType.value = null;
        CustomerTypeParent.value = null;
    }
    function RemoveDisabled() {
        Code.disabled = false;
        DescA.disabled = false;
        DescE.disabled = false;
        Remarks.disabled = false;
        //CustomerTypeLevel.disabled = false;
        CustomerTypeLevelType.disabled = false;
        CustomerTypeParent.disabled = false;
        $('#left').addClass("disabledDiv");
    }
    function Undo() {
        clear();
        Disabled();
        FillDropdown(true);
        click_in_labl(_CustomerTypeId);
        Success = false;
    }
    function Disabled() {
        Code.disabled = true;
        DescA.disabled = true;
        DescE.disabled = true;
        Remarks.disabled = true;
        //CustomerTypeLevel.disabled = true;
        CustomerTypeLevelType.disabled = true;
        CustomerTypeParent.disabled = true;
        $('#left').removeClass("disabledDiv");
    }
    function btnEdit_onclick() {
        if (_CustomerTypeId == 0) {
            MessageBox.Show(" برجاء أختيار عنصر", "خطأ");
        }
        else {
            RemoveDisabled();
            Code.disabled = true;
            StatusFlag = 'u';
            FillDropdown(false);
            CustomerTypeParent.value = ParentId.toString();
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
        else if (CustomerTypeLevelType.value == null || CustomerTypeLevelType.value == '' || CustomerTypeLevelType.value == 'null') {
            MessageBox.Show(" برجاء اختيار نوع المستوى ", "خطأ");
            return false;
        }
        return true;
    }
    function Save() {
        CustomerType = new Ms_CustomerTypes();
        CustomerType = CustomerTypes.filter(function (x) { return x.CustomerTypeCode == Code.value; })[0];
        if (CustomerType != null && StatusFlag == "i") {
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
        CustomerType = new Ms_CustomerTypes();
        var level = Number(CustomerTypeLevel.value) == 0 ? 1 : Number(CustomerTypeLevel.value);
        if (StatusFlag == "i") {
            CustomerType.CustomerTypeId = 0;
            CustomerType.CustomerTypeCode = Code.value;
            CustomerType.CustomerTypeDescA = DescA.value;
            CustomerType.CustomerTypeDescE = DescE.value;
            CustomerType.Remarks = Remarks.value;
            CustomerType.CustomerTypeLevel = level;
            CustomerType.CustomerTypeParent = CustomerTypeParent.value;
            CustomerType.CustomerTypeLevelType = Number(CustomerTypeLevelType.value);
            CustomerType.CreatedAt = DateTimeFormat(Date().toString());
            CustomerType.CreatedBy = SysSession.CurrentEnvironment.UserCode;
            Insert();
        }
        if (StatusFlag == "u") {
            CustomerType = CustomerTypes.filter(function (x) { return x.CustomerTypeCode == Code.value; })[0];
            CustomerType.CustomerTypeId = _CustomerTypeId;
            CustomerType.CustomerTypeCode = Code.value;
            CustomerType.CustomerTypeDescA = DescA.value;
            CustomerType.CustomerTypeDescE = DescE.value;
            CustomerType.Remarks = Remarks.value;
            CustomerType.CustomerTypeLevel = level;
            CustomerType.CustomerTypeParent = CustomerTypeParent.value;
            CustomerType.CustomerTypeLevelType = Number(CustomerTypeLevelType.value);
            CustomerType.UpdateAt = DateTimeFormat(Date().toString());
            CustomerType.UpdateBy = SysSession.CurrentEnvironment.UserCode;
            Update();
        }
        _CustomerTypeId = CustomerType.CustomerTypeId;
        return true;
    }
    function Insert() {
        $("#MessageBoxDialog").modal("hide");
        Ajax.Callsync({
            type: "POST",
            url: sys.apiUrl("Ms_CustomerTypes", "Insert"),
            data: JSON.stringify(CustomerType),
            success: function (Response) {
                var result = Response;
                if (result.IsSuccess) {
                    CustomerType = result.Response;
                    Success = true;
                    PushData(CustomerType);
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
            url: sys.apiUrl("Ms_CustomerTypes", "Update"),
            data: JSON.stringify(CustomerType),
            success: function (Response) {
                var result = Response;
                if (result.IsSuccess) {
                    CustomerType = result.Response;
                    Success = true;
                    RemoveFromArray(_CustomerTypeId);
                    Data = new Array();
                    PushData(CustomerType);
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
        if (_CustomerTypeId == 0) {
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
            url: sys.apiUrl("Ms_CustomerTypes", "Delete") + "/" + _CustomerTypeId,
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
        RemoveFromArray(_CustomerTypeId);
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
        for (var i = 0; i < CustomerTypes.length; i++) {
            if (CustomerTypes[i].CustomerTypeId == id) {
                CustomerTypes.splice(i, 1);
                break;
            }
        }
    }
    function FillDropdown(queryMode) {
        var newData = CustomerTypes.filter(function (x) { return x.CustomerTypeLevelType != 2; });
        newData = queryMode ? newData : newData.filter(function (x) { return x.CustomerTypeId != _CustomerTypeId; });
        DocumentActions.FillCombowithCode(newData, CustomerTypeParent, "CustomerTypeId", "CustomerTypeDescA", "CustomerTypeCode", " ");
    }
    function GetLaCustomerTypeLevel(id) {
        var newData = CustomerTypes.filter(function (x) { return x.CustomerTypeId == Number(id); })[0];
        CustomerTypeLevel.value = newData == null ? '1' : (newData.CustomerTypeLevel + 1).toString();
    }
    $('#CustomerTypeParent').on('change', function () {
        var val = $(this).val();
        GetLaCustomerTypeLevel(val);
    });
    function btnSearch_onclick() {
        var sys = new SystemTools();
        sys.FindKey(Modules.Ms_CustomerTypes, SharedButtons.btnSearch.id, "", function () {
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
})(Ms_CustomerType || (Ms_CustomerType = {}));
//# sourceMappingURL=Ms_CustomerTypes.js.map