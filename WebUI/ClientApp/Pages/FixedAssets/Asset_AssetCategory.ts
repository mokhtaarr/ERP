$(document).ready(() => {
    SharedButtons.OnLoad();
    AssetCategory.InitalizeComponent();
})
 
namespace AssetCategory {
    $('#headertop1').addClass('display_none');
    $('#headertop2').removeClass('display_none');
    var sys: SystemTools = new SystemTools();
    var SysSession: SystemSession = GetSystemSession();
    let Resource: any = GetResourceList("");

    var Model: Asset_AssetCategory = new Asset_AssetCategory();
    var AssetCategories: Array<Asset_AssetCategory> = new Array<Asset_AssetCategory>();
    var Data = new Array();

    // Select Option
    var ParentAssetCatId: HTMLSelectElement;
    var ItemCategoryType: HTMLSelectElement;
    var element: HTMLInputElement;

    var ObjectId = 0;
    var ParentId = 0;
    var StatusFlag;
    var Success;
    var hasNodes: boolean;
    var IndexOfElement: number = 0;
    var listObjectTree: any;
    var flag: boolean = true;

    export function InitalizeComponent() {
        SharedButtons.compcode = Number(SysSession.CurrentEnvironment.CompCode);
        localStorage.setItem("TableName", "Asset_AssetCategory");
        NavigateModule.InitalizeComponent();
        SharedWork.OnNavigate = Navigate;
        SharedButtons.AddAction(() => {
            btnAdd_onclick();
        });

        SharedButtons.DeleteAction(() => { btnDelete_onclick(); });

        SharedButtons.EditAction(() => { btnEdit_onclick(); });

        SharedButtons.UndoAction(() => { Undo(); });

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
        GetAll();
        sys.JsTree(Data);
    }

    function InitalizeControls() {
        //textBoxes
        ParentAssetCatId = document.getElementById("ParentAssetCatId") as HTMLSelectElement;
        SharedButtons.btnSearch = document.getElementById("btnAsset_AssetCategorySearch") as HTMLButtonElement;
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
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess) {
                    Data = new Array();
                    AssetCategories = result.Response as Array<Asset_AssetCategory>;
                    GetTreeData();
                    GetSubCategory();
                }
            }
        });
    }

    function GetByID(Id: number) {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("Asset_AssetCategory", "GetById"),
            data: { id: Id },
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess) {
                    Model = result.Response as Asset_AssetCategory;
                    Display(Model);
                    SharedWork.SwitchModes(ScreenModes.Query);
                }
                else
                    MessageBox.Show(Resource.Error, Resource.Error);
            }
        });
    }

    export function GetTreeData() {
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

    $('#Tree').on("select_node.jstree", function (e, data) { GetByID(Number(data.node.id)) });

    function Disabled(clear: boolean) {
        DocumentActions.allElements(true, clear, Model);
        $('#left').removeClass("disabledDiv");
    }

    function RemoveDisabled(clear: boolean) {
        DocumentActions.allElements(false, clear, Model);
        $('#left').addClass("disabledDiv");
    }

    function Validation() {
        if (DocumentActions.GetElementByName("CatCode").value == "") {
            MessageBox.Toastr(Resource.PleaseEnterCode, Resource.Error, ToastrTypes.error);
            flag = false
        }
        else if (DocumentActions.GetElementByName("Name1").value == "") {
            MessageBox.Toastr(Resource.PleaseEnterNameArabic, Resource.Error, ToastrTypes.error);
            flag = false
        }
        else
            flag = true;

        return flag;
    }

    export function Navigate() {
        let obj = $($('.jstree-children .jstree-node .jstree-anchor')[SharedWork.PageIndex - 1]);
        if (obj != null) {
            let getAccountCategoryId = obj.parent()[0].id;
            listObjectTree = $('.jstree-children .jstree-node .jstree-anchor')
            listObjectTree.removeClass('jstree-clicked');
            obj.addClass('jstree-clicked');
            GetByID(Number(getAccountCategoryId))
        }

        //Model = AssetCategories[SharedWork.PageIndex - 1];
        ObjectId = Model.AssetCatId;
        //GetByID(ObjectId);
    }

    function Display(model: Asset_AssetCategory) {
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
        if (!Validation()) return
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
        Model = DocumentActions.AssignToModel<Asset_AssetCategory>(Model);
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
            success: (Response) => {
                let result = Response as BaseResponse;
                if (result.IsSuccess) {
                    Model = result.Response as Asset_AssetCategory;
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
            success: (Response) => {
                let result = Response as BaseResponse;
                if (result.IsSuccess) {
                    Model = result.Response as Asset_AssetCategory
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
            success: (result) => {
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
        let sys: SystemTools = new SystemTools();
        sys.FindKey(Modules.Cal_JurnalEntry, SharedButtons.btnSearch.id, "", () => {
            let id = SearchGrid.SearchDataGrid.SelectedKey;
            if (!IsNullOrEmpty(id)) {
                GetByID(id);
            }
        });
    }

    function Refrash() {
        GetAll();
        GetByID(ObjectId);
    }
}
