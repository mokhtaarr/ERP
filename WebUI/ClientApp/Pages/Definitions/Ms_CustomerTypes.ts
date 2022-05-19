$(document).ready(() => {
    SharedButtons.OnLoad();
    Ms_CustomerType.InitalizeComponent();
})
 
namespace Ms_CustomerType {
    $('#headertop1').addClass('display_none');
    $('#headertop2').removeClass('display_none');
    let Resource: any = GetResourceList("");
    $('#headerTitle').text(Resource.CustomerTypes);

    var sys: SystemTools = new SystemTools();
    var SysSession: SystemSession = GetSystemSession();
     
    var CustomerType: Ms_CustomerTypes = new Ms_CustomerTypes();
    var CustomerTypes: Array<Ms_CustomerTypes> = new Array<Ms_CustomerTypes>();
    var Data = new Array();

    // Select Option
    var CustomerTypeParent: HTMLSelectElement;
    var CustomerTypeLevelType: HTMLSelectElement;
  
    var Code: HTMLInputElement;
    var DescA: HTMLInputElement;
    var DescE: HTMLInputElement;
    var Remarks: HTMLInputElement;
    var CustomerTypeLevel: HTMLInputElement;
   
    var txtCreatedBy: HTMLInputElement;
    var txtCreatedAt: HTMLInputElement;
    var txtUpdatedBy: HTMLInputElement;
    var txtUpdatedAt: HTMLInputElement;

    var AccountType = null;
    var _CustomerTypeId = 0;
    var ParentId = 0;
    var StatusFlag;
    var Success;
    var hasNodes: boolean;
    var IndexOfElement: number = 0;
    var listObjectTree: any;

    export function InitalizeComponent() {
        SharedButtons.compcode = Number(SysSession.CurrentEnvironment.CompCode);

        localStorage.setItem("TableName", "Ms_CustomerTypes");
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
        CustomerTypeParent = document.getElementById("CustomerTypeParent") as HTMLSelectElement;
        CustomerTypeLevelType = document.getElementById("CustomerTypeLevelType") as HTMLSelectElement;
        
        //textBoxes
        Code = document.getElementById("Code") as HTMLInputElement;
        DescA = document.getElementById("DescA") as HTMLInputElement;
        DescE = document.getElementById("DescE") as HTMLInputElement;
        Remarks = document.getElementById("Remarks") as HTMLInputElement;
        CustomerTypeLevel = document.getElementById("CustomerTypeLevel") as HTMLInputElement;
        SharedButtons.btnSearch = document.getElementById("btnCustomerTypeSearch") as HTMLButtonElement;

        txtCreatedBy = document.getElementById("txtCreatedBy") as HTMLInputElement;
        txtCreatedAt = document.getElementById("txtCreatedAt") as HTMLInputElement;

        txtUpdatedBy = document.getElementById("txtUpdatedBy") as HTMLInputElement;
        txtUpdatedAt = document.getElementById("txtUpdatedAt") as HTMLInputElement;
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
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess) {
                    Data = new Array();
                    CustomerTypes = result.Response as Array<Ms_CustomerTypes>;
                    GetTreeData();
                    //GetAccountCategoriesDropdown();
                }
            }
        });
    }

    export function GetTreeData() {
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

    function PushData(result: Ms_CustomerTypes) {
        CustomerTypes.push(result);
        Data = new Array();
        CustomerTypes.sort((a, b) => (a.CustomerTypeCode > b.CustomerTypeCode) ? 1 : -1);
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

    $('#Tree').on("select_node.jstree", function (e, data) { click_in_labl(data.node.id) });

    function click_in_labl(Id) {
        CustomerType = new Ms_CustomerTypes();
        CustomerType = CustomerTypes.filter(x => x.CustomerTypeId == Number(Id))[0];
        if (CustomerType != null) {
            _CustomerTypeId = Number(CustomerType.CustomerTypeId);
            ParentId = Number(CustomerType.CustomerTypeParent);
            CustomerTypeParent.value = ParentId?.toString();
            Code.value = CustomerType.CustomerTypeCode?.toString();
            DescA.value = CustomerType.CustomerTypeDescA?.toString();
            DescE.value = CustomerType.CustomerTypeDescE?.toString();
            Remarks.value = CustomerType.Remarks?.toString();
            CustomerTypeLevel.value = CustomerType.CustomerTypeLevel?.toString();
            CustomerTypeLevelType.value = CustomerType.CustomerTypeLevelType?.toString();

            var CheckIfHasNodes = CustomerTypes.filter(x => x.CustomerTypeParent == _CustomerTypeId)[0];
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
        else if (CustomerTypeLevelType.value == null || CustomerTypeLevelType.value == '' || CustomerTypeLevelType.value == 'null') {
            MessageBox.Show(" برجاء اختيار نوع المستوى ", "خطأ");
            return false
        }

        return true;
    }

    function Save() {
        CustomerType = new Ms_CustomerTypes();
        CustomerType = CustomerTypes.filter(x => x.CustomerTypeCode == Code.value)[0];
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
        let level = Number(CustomerTypeLevel.value) == 0 ? 1 : Number(CustomerTypeLevel.value);
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
            CustomerType = CustomerTypes.filter(x => x.CustomerTypeCode == Code.value)[0];

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
            success: (Response) => {
                let result = Response as BaseResponse;
                if (result.IsSuccess) {
                    CustomerType = result.Response as Ms_CustomerTypes;
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
            success: (Response) => {
                let result = Response as BaseResponse;
                if (result.IsSuccess) {
                    CustomerType = result.Response as Ms_CustomerTypes
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

    function FillDropdown(queryMode: boolean) {
        let newData: Array<Ms_CustomerTypes> = CustomerTypes.filter(x => x.CustomerTypeLevelType != 2);
        newData = queryMode ? newData : newData.filter(x => x.CustomerTypeId != _CustomerTypeId);
        DocumentActions.FillCombowithCode(newData, CustomerTypeParent, "CustomerTypeId", "CustomerTypeDescA", "CustomerTypeCode", " ");
    }

    function GetLaCustomerTypeLevel(id: string) {
        let newData: Ms_CustomerTypes = CustomerTypes.filter(x => x.CustomerTypeId == Number(id))[0];
        CustomerTypeLevel.value = newData == null? '1' :(newData.CustomerTypeLevel + 1).toString();
    }

    $('#CustomerTypeParent').on('change', function () {
        let val = $(this).val();
        GetLaCustomerTypeLevel(val);
    });

    function btnSearch_onclick() {
        let sys: SystemTools = new SystemTools();
        sys.FindKey(Modules.Ms_CustomerTypes, SharedButtons.btnSearch.id, "", () => {
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
