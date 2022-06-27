$(document).ready(function () {
    SharedButtons.OnLoad();
    MSItemCategory.InitalizeComponent();
});
var MSItemCategory;
(function (MSItemCategory) {
    $('#headertop1').addClass('display_none');
    $('#headertop2').removeClass('display_none');
    var sys = new SystemTools();
    var SysSession = GetSystemSession();
    var Resource = GetResourceList("");
    $('#headerTitle').text(Resource.ItemCategories);
    var ItemCategory = new MS_ItemCategory();
    var ItemCategories = new Array();
    var Data = new Array();
    // Select Option
    var ParentItemCategoryId;
    var ItemCategoryType;
    var Code;
    var DescA;
    var DescE;
    var Remarks;
    var ItemCategoryCatLevel;
    var CategoryImage;
    var PreviewCategoryImage;
    var imgURL;
    var txtCreatedBy;
    var txtCreatedAt;
    var txtUpdatedBy;
    var txtUpdatedAt;
    var AccountType = null;
    var _ItemCategoryId = 0;
    var ParentId = 0;
    var StatusFlag;
    var Success;
    var hasNodes;
    var IndexOfElement = 0;
    var listObjectTree;
    function InitalizeComponent() {
        SharedButtons.compcode = Number(SysSession.CurrentEnvironment.CompCode);
        localStorage.setItem("TableName", "MS_ItemCategory");
        NavigateModule.InitalizeComponent();
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
        sys.JsTree(Data);
    }
    MSItemCategory.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        // select Option
        ParentItemCategoryId = document.getElementById("ParentItemCategoryId");
        ItemCategoryType = document.getElementById("ItemCategoryType");
        //textBoxes
        Code = document.getElementById("Code");
        DescA = document.getElementById("DescA");
        DescE = document.getElementById("DescE");
        Remarks = document.getElementById("Remarks");
        ItemCategoryCatLevel = document.getElementById("ItemCategoryCatLevel");
        CategoryImage = document.getElementById("CategoryImage");
        PreviewCategoryImage = document.getElementById("PreviewCategoryImage");
        SharedButtons.btnSearch = document.getElementById("btnItemCategorySearch");
        txtCreatedBy = document.getElementById("txtCreatedBy");
        txtCreatedAt = document.getElementById("txtCreatedAt");
        txtUpdatedBy = document.getElementById("txtUpdatedBy");
        txtUpdatedAt = document.getElementById("txtUpdatedAt");
    }
    function InitalizeEvents() {
        CategoryImage.onchange = _PreviewImage;
        SharedButtons.btnSearch.onclick = btnSearch_onclick;
        SharedButtons.btnRefrash.onclick = Refrash;
        SharedButtons.btnRefrash2.onclick = Refrash;
    }
    function GetAll() {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("MS_ItemCategory", "GetAll"),
            success: function (d) {
                var result = d;
                if (result.IsSuccess) {
                    Data = new Array();
                    ItemCategories = result.Response;
                    GetTreeData();
                }
            }
        });
    }
    function GetTreeData() {
        ItemCategories.map(function (x) {
            Data.push({
                id: x.ItemCategoryId,
                parent: (x.ParentItemCategoryId != null ? x.ParentItemCategoryId.toString() : "#"),
                text: x.ItemCatCode + " " + x.ItemCatDescA,
                "state": { "opened": true }
            });
        });
        FillDropdown(true);
    }
    MSItemCategory.GetTreeData = GetTreeData;
    function PushData(result) {
        ItemCategories.push(result);
        Data = new Array();
        ItemCategories.sort(function (a, b) { return (a.ItemCatCode > b.ItemCatCode) ? 1 : -1; });
        ItemCategories.map(function (x) {
            Data.push({
                id: x.ItemCategoryId,
                parent: (x.ParentItemCategoryId != null ? x.ParentItemCategoryId.toString() : "#"),
                text: x.ItemCatCode + " " + x.ItemCatDescA,
                "state": { "opened": true }
            });
        });
        $('#Tree').jstree(true).settings.core.data = Data;
        $('#Tree').jstree(true).refresh();
    }
    $('#Tree').on("select_node.jstree", function (e, data) { click_in_labl(data.node.id); });
    function click_in_labl(Id) {
        var _a, _b, _c, _d, _e, _f;
        ItemCategory = new MS_ItemCategory();
        ItemCategory = ItemCategories.filter(function (x) { return x.ItemCategoryId == Number(Id); })[0];
        if (ItemCategory != null) {
            _ItemCategoryId = Number(ItemCategory.ItemCategoryId);
            ParentId = Number(ItemCategory.ParentItemCategoryId);
            ParentItemCategoryId.value = ParentId === null || ParentId === void 0 ? void 0 : ParentId.toString();
            Code.value = (_a = ItemCategory.ItemCatCode) === null || _a === void 0 ? void 0 : _a.toString();
            DescA.value = (_b = ItemCategory.ItemCatDescA) === null || _b === void 0 ? void 0 : _b.toString();
            DescE.value = (_c = ItemCategory.ItemCatDescE) === null || _c === void 0 ? void 0 : _c.toString();
            Remarks.value = (_d = ItemCategory.Remarks) === null || _d === void 0 ? void 0 : _d.toString();
            ItemCategoryCatLevel.value = (_e = ItemCategory.ItemCategoryCatLevel) === null || _e === void 0 ? void 0 : _e.toString();
            ItemCategoryType.value = (_f = ItemCategory.ItemCategoryType) === null || _f === void 0 ? void 0 : _f.toString();
            if (ItemCategory.CategoryImage != null) {
                imgURL = "data:image/png;base64," + ItemCategory.CategoryImage;
                PreviewCategoryImage.hidden = false;
                PreviewCategoryImage.src = imgURL;
            }
            else
                PreviewCategoryImage.hidden = true;
            var CheckIfHasNodes = ItemCategories.filter(function (x) { return x.ParentItemCategoryId == _ItemCategoryId; })[0];
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
    MSItemCategory.Navigate = Navigate;
    function btnAdd_onclick() {
        StatusFlag = 'i';
        FillDropdown(true);
        clear();
        RemoveDisabled();
    }
    function clear() {
        Code.value = '';
        DescA.value = '';
        DescE.value = '';
        Remarks.value = '';
        CategoryImage.value = '';
        imgURL = null;
        ItemCategoryCatLevel.value = '';
        ItemCategoryType.value = null;
        ParentItemCategoryId.value = null;
        PreviewCategoryImage.src = '';
        PreviewCategoryImage.hidden = true;
    }
    function RemoveDisabled() {
        Code.disabled = false;
        DescA.disabled = false;
        DescE.disabled = false;
        Remarks.disabled = false;
        CategoryImage.disabled = false;
        ItemCategoryType.disabled = false;
        ParentItemCategoryId.disabled = false;
        $('#left').addClass("disabledDiv");
    }
    function Undo() {
        clear();
        Disabled();
        FillDropdown(true);
        click_in_labl(_ItemCategoryId);
        Success = false;
    }
    function Disabled() {
        Code.disabled = true;
        DescA.disabled = true;
        DescE.disabled = true;
        Remarks.disabled = true;
        CategoryImage.disabled = true;
        ItemCategoryType.disabled = true;
        ParentItemCategoryId.disabled = true;
        $('#left').removeClass("disabledDiv");
    }
    function btnEdit_onclick() {
        if (_ItemCategoryId == 0) {
            MessageBox.Show(" برجاء أختيار عنصر", "خطأ");
        }
        else {
            RemoveDisabled();
            Code.disabled = true;
            StatusFlag = 'u';
            FillDropdown(false);
            ParentItemCategoryId.value = ParentId.toString();
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
        else if (ItemCategoryType.value == null || ItemCategoryType.value == '' || ItemCategoryType.value == 'null') {
            MessageBox.Show(" برجاء اختيار نوع المستوى ", "خطأ");
            return false;
        }
        return true;
    }
    function Save() {
        ItemCategory = new MS_ItemCategory();
        ItemCategory = ItemCategories.filter(function (x) { return x.ItemCatCode == Code.value; })[0];
        if (ItemCategory != null && StatusFlag == "i") {
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
        ItemCategory = new MS_ItemCategory();
        var level = Number(ItemCategoryCatLevel.value) == 0 ? 1 : Number(ItemCategoryCatLevel.value);
        if (StatusFlag == "i") {
            ItemCategory.ItemCategoryId = 0;
            ItemCategory.ItemCatCode = Code.value;
            ItemCategory.ItemCatDescA = DescA.value;
            ItemCategory.ItemCatDescE = DescE.value;
            ItemCategory.Remarks = Remarks.value;
            ItemCategory.ItemCategoryCatLevel = level;
            ItemCategory.CategoryImage = imgURL === null || imgURL === void 0 ? void 0 : imgURL.split('base64,')[1];
            ItemCategory.ParentItemCategoryId = ParentItemCategoryId.value;
            ItemCategory.ItemCategoryType = Number(ItemCategoryType.value);
            ItemCategory.CreatedAt = DateTimeFormat(Date().toString());
            ItemCategory.CreatedBy = SysSession.CurrentEnvironment.UserCode;
            Insert();
        }
        if (StatusFlag == "u") {
            ItemCategory = ItemCategories.filter(function (x) { return x.ItemCatCode == Code.value; })[0];
            ItemCategory.ItemCategoryId = _ItemCategoryId;
            ItemCategory.ItemCatCode = Code.value;
            ItemCategory.ItemCatDescA = DescA.value;
            ItemCategory.ItemCatDescE = DescE.value;
            ItemCategory.Remarks = Remarks.value;
            ItemCategory.ItemCategoryCatLevel = level;
            ItemCategory.CategoryImage = imgURL === null || imgURL === void 0 ? void 0 : imgURL.split('base64,')[1];
            ItemCategory.ParentItemCategoryId = ParentItemCategoryId.value;
            ItemCategory.ItemCategoryType = Number(ItemCategoryType.value);
            ItemCategory.UpdateAt = DateTimeFormat(Date().toString());
            ItemCategory.UpdateBy = SysSession.CurrentEnvironment.UserCode;
            Update();
        }
        _ItemCategoryId = ItemCategory.ItemCategoryId;
        return true;
    }
    function Insert() {
        $("#MessageBoxDialog").modal("hide");
        Ajax.Callsync({
            type: "POST",
            url: sys.apiUrl("MS_ItemCategory", "Insert"),
            data: JSON.stringify(ItemCategory),
            success: function (Response) {
                var result = Response;
                if (result.IsSuccess) {
                    ItemCategory = result.Response;
                    Success = true;
                    PushData(ItemCategory);
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
            url: sys.apiUrl("MS_ItemCategory", "Update"),
            data: JSON.stringify(ItemCategory),
            success: function (Response) {
                var result = Response;
                if (result.IsSuccess) {
                    ItemCategory = result.Response;
                    Success = true;
                    RemoveFromArray(_ItemCategoryId);
                    Data = new Array();
                    PushData(ItemCategory);
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
        if (_ItemCategoryId == 0) {
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
            url: sys.apiUrl("MS_ItemCategory", "Delete") + "/" + _ItemCategoryId,
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
        RemoveFromArray(_ItemCategoryId);
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
        for (var i = 0; i < ItemCategories.length; i++) {
            if (ItemCategories[i].ItemCategoryId == id) {
                ItemCategories.splice(i, 1);
                break;
            }
        }
    }
    function FillDropdown(queryMode) {
        var newData = ItemCategories.filter(function (x) { return x.ItemCategoryType != 2; });
        newData = queryMode ? newData : newData.filter(function (x) { return x.ItemCategoryId != _ItemCategoryId; });
        DocumentActions.FillCombowithCode(newData, ParentItemCategoryId, "ItemCategoryId", "ItemCatDescA", "ItemCatCode", " ");
    }
    function GetLaItemCategoryCatLevel(id) {
        var newData = ItemCategories.filter(function (x) { return x.ItemCategoryId == Number(id); })[0];
        ItemCategoryCatLevel.value = newData == null ? '1' : (newData.ItemCategoryCatLevel + 1).toString();
    }
    $('#ParentItemCategoryId').on('change', function () {
        var val = $(this).val();
        GetLaItemCategoryCatLevel(val);
    });
    function _PreviewImage() {
        var files = CategoryImage.files;
        if (files.length === 0)
            return;
        var mimeType = files[0].type;
        if (mimeType.match(/image\/*/) == null) {
            PreviewCategoryImage.src = '';
            PreviewCategoryImage.hidden = true;
            var message = "يمكنك فقط رفع صوره.";
            MessageBox.Show(message, "خطأء");
            return;
        }
        var reader = new FileReader();
        this.imagePath = files;
        reader.readAsDataURL(files[0]);
        reader.onload = function (_event) {
            imgURL = reader.result;
            PreviewCategoryImage.hidden = false;
            PreviewCategoryImage.src = imgURL;
        };
    }
    function btnSearch_onclick() {
        var sys = new SystemTools();
        sys.FindKey(Modules.MS_ItemCategory, SharedButtons.btnSearch.id, "", function () {
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
})(MSItemCategory || (MSItemCategory = {}));
//# sourceMappingURL=MS_ItemCategory.js.map