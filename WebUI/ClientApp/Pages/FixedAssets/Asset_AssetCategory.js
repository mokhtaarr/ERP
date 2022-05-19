$(document).ready(function () {
    SharedButtons.OnLoad();
    AssetCategory.InitalizeComponent();
});
var AssetCategory;
(function (AssetCategory) {
    $('#headertop1').addClass('display_none');
    $('#headertop2').removeClass('display_none');
    var sys = new SystemTools();
    var SysSession = GetSystemSession();
    var Resource = GetResourceList("");
    var Model = new Asset_AssetCategory();
    var AssetCategories = new Array();
    var Data = new Array();
    // Select Option
    var ParentAssetCatId;
    var ItemCategoryType;
    var element;
    var ObjectId = 0;
    var ParentId = 0;
    var StatusFlag;
    var Success;
    var hasNodes;
    var IndexOfElement = 0;
    var listObjectTree;
    var flag = true;
    function InitalizeComponent() {
        SharedButtons.compcode = Number(SysSession.CurrentEnvironment.CompCode);
        localStorage.setItem("TableName", "Asset_AssetCategory");
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
    AssetCategory.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        //textBoxes
        ParentAssetCatId = document.getElementById("ParentAssetCatId");
        SharedButtons.btnSearch = document.getElementById("btnAsset_AssetCategorySearch");
    }
    function InitalizeEvents() {
        SharedButtons.btnSearch.onclick = btnSearch_onclick;
        SharedButtons.btnRefrash.onclick = Refrash;
        SharedButtons.btnRefrash2.onclick = Refrash;
    }
    function GetAll() {
        Disabled(false);
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("Asset_AssetCategory", "GetAll"),
            success: function (d) {
                var result = d;
                if (result.IsSuccess) {
                    Data = new Array();
                    AssetCategories = result.Response;
                    GetTreeData();
                    GetSubCategory();
                }
            }
        });
    }
    function GetByID(Id) {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("Asset_AssetCategory", "GetById"),
            data: { id: Id },
            success: function (d) {
                var result = d;
                if (result.IsSuccess) {
                    Model = result.Response;
                    Display(Model);
                    SharedWork.SwitchModes(ScreenModes.Query);
                }
                else
                    MessageBox.Show(Resource.Error, Resource.Error);
            }
        });
    }
    function GetTreeData() {
        Data = new Array();
        AssetCategories.map(function (x) {
            Data.push({
                id: x.AssetCatId,
                parent: (x.ParentAssetCatId != null ? x.ParentAssetCatId.toString() : "#"),
                text: x.CatCode + " " + (language == "ar" ? x.Name1 : x.Name2),
                "state": { "opened": true }
            });
        });
        if ($('#Tree').jstree(true)) {
            $('#Tree').jstree(true).settings.core.data = Data;
            $('#Tree').jstree(true).refresh();
        }
    }
    AssetCategory.GetTreeData = GetTreeData;
    $('#Tree').on("select_node.jstree", function (e, data) { GetByID(Number(data.node.id)); });
    function Disabled(clear) {
        DocumentActions.allElements(true, clear, Model);
        $('#left').removeClass("disabledDiv");
    }
    function RemoveDisabled(clear) {
        DocumentActions.allElements(false, clear, Model);
        $('#left').addClass("disabledDiv");
    }
    function Validation() {
        if (DocumentActions.GetElementByName("CatCode").value == "") {
            MessageBox.Toastr(Resource.PleaseEnterCode, Resource.Error, ToastrTypes.error);
            flag = false;
        }
        else if (DocumentActions.GetElementByName("Name1").value == "") {
            MessageBox.Toastr(Resource.PleaseEnterNameArabic, Resource.Error, ToastrTypes.error);
            flag = false;
        }
        else
            flag = true;
        return flag;
    }
    function Navigate() {
        var obj = $($('.jstree-children .jstree-node .jstree-anchor')[SharedWork.PageIndex - 1]);
        if (obj != null) {
            var getAccountCategoryId = obj.parent()[0].id;
            listObjectTree = $('.jstree-children .jstree-node .jstree-anchor');
            listObjectTree.removeClass('jstree-clicked');
            obj.addClass('jstree-clicked');
            GetByID(Number(getAccountCategoryId));
        }
        //Model = AssetCategories[SharedWork.PageIndex - 1];
        ObjectId = Model.AssetCatId;
        //GetByID(ObjectId);
    }
    AssetCategory.Navigate = Navigate;
    function Display(model) {
        Model = model;
        DocumentActions.RenderFromModel(Model);
        ObjectId = Number(Model.AssetCatId);
        SharedWork.SwitchModes(ScreenModes.Query);
    }
    function Undo() {
        Disabled(false);
        Success = false;
        if (ObjectId != 0) {
            GetByID(ObjectId);
        }
    }
    function btnAdd_onclick() {
        StatusFlag = 'i';
        RemoveDisabled(true);
    }
    function btnEdit_onclick() {
        if (ObjectId == 0) {
            MessageBox.Show(Resource.PleaseSelectItem, Resource.Error);
        }
        else {
            RemoveDisabled(false);
            element = DocumentActions.GetElementByName("CatCode");
            element.disabled = true;
            StatusFlag = 'u';
        }
    }
    function btnsave_onClick() {
        if (!Validation())
            return;
        Save();
    }
    function Save() {
        if (DocumentActions.CheckCode(AssetCategories, DocumentActions.GetElementByName("CatCode").value, "CatCode") == false && StatusFlag == "i") {
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
        Model = DocumentActions.AssignToModel(Model);
        if (StatusFlag == "i") {
            Model.CreatedAt = DateTimeFormat(Date().toString());
            Model.CreatedBy = SysSession.CurrentEnvironment.UserCode;
            Insert();
        }
        if (StatusFlag == "u") {
            Model.UpdateAt = DateTimeFormat(Date().toString());
            Model.UpdateBy = SysSession.CurrentEnvironment.UserCode;
            Update();
        }
        ObjectId = Model.AssetCatId;
        GetAll();
        return true;
    }
    function Insert() {
        $("#MessageBoxDialog").modal("hide");
        Ajax.Callsync({
            type: "POST",
            url: sys.apiUrl("Asset_AssetCategory", "Insert"),
            data: JSON.stringify(Model),
            success: function (Response) {
                var result = Response;
                if (result.IsSuccess) {
                    Model = result.Response;
                    ObjectId = Model.AssetCatId;
                    Success = true;
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
            url: sys.apiUrl("Asset_AssetCategory", "Update"),
            data: JSON.stringify(Model),
            success: function (Response) {
                var result = Response;
                if (result.IsSuccess) {
                    Model = result.Response;
                    ObjectId = Model.AssetCatId;
                    Success = true;
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
        if (ObjectId == 0) {
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
    }
    function Delete() {
        $("#MessageBoxDialog").modal("hide");
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("Asset_AssetCategory", "Delete") + "/" + ObjectId,
            success: function (result) {
                if (result) {
                    Success = true;
                    GetAll();
                    Disabled(result);
                }
                else {
                    MessageBox.Show("خطأء", "خطأء");
                    Success = false;
                }
            }
        });
    }
    function GetSubCategory() {
        DocumentActions.FillCombowithCode(AssetCategories, ParentAssetCatId, "AssetCatId", (language == "ar" ? "Name1" : "Name2"), "CatCode", "فئة جذرية");
    }
    function btnSearch_onclick() {
        var sys = new SystemTools();
        sys.FindKey(Modules.Cal_JurnalEntry, SharedButtons.btnSearch.id, "", function () {
            var id = SearchGrid.SearchDataGrid.SelectedKey;
            if (!IsNullOrEmpty(id)) {
                GetByID(id);
            }
        });
    }
    function Refrash() {
        GetAll();
        GetByID(ObjectId);
    }
})(AssetCategory || (AssetCategory = {}));
//# sourceMappingURL=Asset_AssetCategory.js.map