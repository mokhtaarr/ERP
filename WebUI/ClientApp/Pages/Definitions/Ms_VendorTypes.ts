$(document).ready(() => {
    SharedButtons.OnLoad();
    MsVendorTypes.InitalizeComponent();
})
 
namespace MsVendorTypes {
    let Resource: any = GetResourceList("");
    $('#headertop1').addClass('display_none');
    $('#headertop2').removeClass('display_none');
    $('#headerTitle').text(Resource.SuppliersTypes);

    var sys: SystemTools = new SystemTools();
    var SysSession: SystemSession = GetSystemSession();
     
    //var AccountCategories: Array<Cod_AccountCategories> = new Array<Cod_AccountCategories>();
    var VendorType: Ms_VendorTypes = new Ms_VendorTypes();
    var VendorTypes: Array<Ms_VendorTypes> = new Array<Ms_VendorTypes>();
    var Data = new Array();

    // Select Option
    var VendorTypeParent: HTMLSelectElement;
    var VendorTypeLevelType: HTMLSelectElement;
  
    var Code: HTMLInputElement;
    var DescA: HTMLInputElement;
    var DescE: HTMLInputElement;
    var Remarks: HTMLInputElement;
    var VendorTypeLevel: HTMLInputElement;
   
    var txtCreatedBy: HTMLInputElement;
    var txtCreatedAt: HTMLInputElement;
    var txtUpdatedBy: HTMLInputElement;
    var txtUpdatedAt: HTMLInputElement;

    var AccountType = null;
    var _VendorTypeId = 0;
    var ParentId = 0;
    var StatusFlag;
    var Success;
    var hasNodes: boolean;
    var IndexOfElement: number = 0;
    var listObjectTree: any;

    export function InitalizeComponent() {
        SharedButtons.compcode = Number(SysSession.CurrentEnvironment.CompCode);

        localStorage.setItem("TableName", "Ms_VendorTypes");
        NavigateModule.InitalizeComponent();
        SharedWork.OnNavigate = Navigate;
        SharedButtons.AddAction(() => {
            clear();
            btnAdd_onclick();
        });

        SharedButtons.DeleteAction(() => { btnDelete_onclick(); });

        SharedButtons.EditAction(() => { btnEdit_onclick(); });

        SharedButtons.UndoAction(() => { Undo(); });

        SharedButtons.SaveAction(() => {
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

    function InitalizeControls() {
        // select Option
        VendorTypeParent = document.getElementById("VendorTypeParent") as HTMLSelectElement;
        VendorTypeLevelType = document.getElementById("VendorTypeLevelType") as HTMLSelectElement;
        
        //textBoxes
        Code = document.getElementById("Code") as HTMLInputElement;
        DescA = document.getElementById("DescA") as HTMLInputElement;
        DescE = document.getElementById("DescE") as HTMLInputElement;
        Remarks = document.getElementById("Remarks") as HTMLInputElement;
        VendorTypeLevel = document.getElementById("VendorTypeLevel") as HTMLInputElement;
        SharedButtons.btnSearch = document.getElementById("btnVendorTypeSearch") as HTMLButtonElement;

        txtCreatedBy = document.getElementById("txtCreatedBy") as HTMLInputElement;
        txtCreatedAt = document.getElementById("txtCreatedAt") as HTMLInputElement;

        txtUpdatedBy = document.getElementById("txtUpdatedBy") as HTMLInputElement;
        txtUpdatedAt = document.getElementById("txtUpdatedAt") as HTMLInputElement;
    }

    function InitalizeEvents() {
        SharedButtons.btnSearch.onclick = btnSearch_onclick;
        SharedButtons.btnRefrash.onclick = Refrash;
    }

    function GetAll() {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("Ms_VendorTypes", "GetAll"),
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess) {
                    Data = new Array();
                    VendorTypes = result.Response as Array<Ms_VendorTypes>;
                    GetTreeData();
                    //GetAccountCategoriesDropdown();
                }
            }
        });
    }

    export function GetTreeData() {
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

    function PushData(result: Ms_VendorTypes) {
        VendorTypes.push(result);
        Data = new Array();
        VendorTypes.sort((a, b) => (a.VendorTypeCode > b.VendorTypeCode) ? 1 : -1);
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

    $('#Tree').on("select_node.jstree", function (e, data) { click_in_labl(data.node.id) });

    function click_in_labl(Id) {
        VendorType = new Ms_VendorTypes();
        VendorType = VendorTypes.filter(x => x.VendorTypeId == Number(Id))[0];
        if (VendorType != null) {
            _VendorTypeId = Number(VendorType.VendorTypeId);
            ParentId = Number(VendorType.VendorTypeParent);
            VendorTypeParent.value = ParentId?.toString();
            Code.value = VendorType.VendorTypeCode?.toString();
            DescA.value = VendorType.VendorTypeDescA?.toString();
            DescE.value = VendorType.VendorTypeDescE?.toString();
            Remarks.value = VendorType.Remarks?.toString();
            VendorTypeLevel.value = VendorType.VendorTypeLevel?.toString();
            VendorTypeLevelType.value = VendorType.VendorTypeLevelType?.toString();

            var CheckIfHasNodes = VendorTypes.filter(x => x.VendorTypeParent == _VendorTypeId)[0];
            hasNodes = CheckIfHasNodes != null ? true : false;
        }
        SharedWork.SwitchModes(ScreenModes.Query);
        $("select").trigger('change');
    }

    export function Navigate() {
        let obj = $($('.jstree-children .jstree-node .jstree-anchor')[SharedWork.PageIndex - 1]);
        if (obj != null) {
            let getAccountCategoryId = obj.parent()[0].id;
            listObjectTree = $('.jstree-children .jstree-node .jstree-anchor')
            listObjectTree.removeClass('jstree-clicked');
            obj.addClass('jstree-clicked');
            click_in_labl(getAccountCategoryId);
        }
    }

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
        if (!ValidationHeader()) return
        Save();
        FillDropdown(true);
    }

    function ValidationHeader() {
        if (Code.value == "") {
            MessageBox.Show(" برجاء أدخل رقم كود التبويب", "خطأ");
            return false
        }
        else if (DescA.value == "") {
            MessageBox.Show(" برجاء أدخل الاسم بالعربي", "خطأ");
            return false
        }
        else if (VendorTypeLevelType.value == null || VendorTypeLevelType.value == '' || VendorTypeLevelType.value == 'null') {
            MessageBox.Show(" برجاء اختيار نوع المستوى ", "خطأ");
            return false
        }

        return true;
    }

    function Save() {
        VendorType = new Ms_VendorTypes();
        VendorType = VendorTypes.filter(x => x.VendorTypeCode == Code.value)[0];
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
        let level = Number(VendorTypeLevel.value) == 0 ? 1 : Number(VendorTypeLevel.value);
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
            VendorType = VendorTypes.filter(x => x.VendorTypeCode == Code.value)[0];

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
            success: (Response) => {
                let result = Response as BaseResponse;
                if (result.IsSuccess) {
                    VendorType = result.Response as Ms_VendorTypes;
                    Success = true;
                    PushData(VendorType);
                    click_in_labl(VendorType.VendorTypeId)
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
            success: (Response) => {
                let result = Response as BaseResponse;
                if (result.IsSuccess) {
                    VendorType = result.Response as Ms_VendorTypes
                    Success = true;
                    RemoveFromArray(_VendorTypeId);
                    Data = new Array();
                    PushData(VendorType);
                    click_in_labl(VendorType.VendorTypeId)
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
            success: (result) => {
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

    function FillDropdown(queryMode: boolean) {
        let newData: Array<Ms_VendorTypes> = VendorTypes.filter(x => x.VendorTypeLevelType != 2);
        newData = queryMode ? newData : newData.filter(x => x.VendorTypeId != _VendorTypeId);
        DocumentActions.FillCombowithCode(newData, VendorTypeParent, "VendorTypeId", "VendorTypeDescA", "VendorTypeCode", Resource.ThereIsNo);
    }

    function GetLaVendorTypeLevel(id: string) {
        let newData: Ms_VendorTypes = VendorTypes.filter(x => x.VendorTypeId == Number(id))[0];
        VendorTypeLevel.value = newData == null? '1' :(newData.VendorTypeLevel + 1).toString();
    }

    $('#VendorTypeParent').on('change', function () {
        let val = $(this).val();
        GetLaVendorTypeLevel(val);
    });

    function btnSearch_onclick() {
        let sys: SystemTools = new SystemTools();
        sys.FindKey(Modules.Ms_VendorTypes, SharedButtons.btnSearch.id, "", () => {
            let id = SearchGrid.SearchDataGrid.SelectedKey;
            if (!IsNullOrEmpty(id)) {
                click_in_labl(id);
            }
        });
    }

    function Refrash() {
        let nodeActive = $('.jstree-anchor.jstree-clicked');
        GetAll();
        $('#Tree').jstree(true).settings.core.data = Data;
        $('#Tree').jstree(true).refresh();

        if (nodeActive != null) {
            let id = nodeActive[0]?.id.split("_")[0];
            listObjectTree = $('.jstree-children .jstree-node .jstree-anchor')
            listObjectTree.removeClass('jstree-clicked');
            nodeActive.addClass('jstree-clicked');
            click_in_labl(id);
        }
    }
}
