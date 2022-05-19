$(document).ready(() => {
    SharedButtons.OnLoad();
    Cod_AccountCategory.InitalizeComponent();
    //$('#headerTitle').text();
})
 
namespace Cod_AccountCategory {
    $('#headertop1').addClass('display_none');
    $('#headertop2').removeClass('display_none');
    let Resource: any = GetResourceList("");
    $('#headerTitle').text(Resource.AccountsTab);

    var sys: SystemTools = new SystemTools();
    var SysSession: SystemSession = GetSystemSession();
    var AccountCategory: Cod_AccountCategories = new Cod_AccountCategories();
    var AccountCategories: Array<Cod_AccountCategories> = new Array<Cod_AccountCategories>();

    var Data = new Array();

    // Select Option
    var ParentAccountCatId: HTMLSelectElement;
    var AId: HTMLSelectElement;
  
    var Code: HTMLInputElement;
    var DescA: HTMLInputElement;
    var DescE: HTMLInputElement;
    var RemarksA: HTMLInputElement;
    var RemarksE: HTMLInputElement;
   
    var txtCreatedBy: HTMLInputElement;
    var txtCreatedAt: HTMLInputElement;
    var txtUpdatedBy: HTMLInputElement;
    var txtUpdatedAt: HTMLInputElement;

    var AccountHasTransaction: boolean = true;
    var AccountCatId = 0;
    var ParentId = 0;
    var StatusFlag;
    var Success;
    var hasNodes: boolean;
    var IndexOfElement: number = 0;
    var listObjectTree: any;

    export function InitalizeComponent() {
        SharedButtons.compcode = Number(SysSession.CurrentEnvironment.CompCode);

        localStorage.setItem("TableName", "Cod_AccountCategories");
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
        //PushToSelect(true);
    }

    function InitalizeControls() {
        // select Option
        ParentAccountCatId = document.getElementById("ParentAccountCatId") as HTMLSelectElement;
        AId = document.getElementById("AId") as HTMLSelectElement;

        //textBoxes
        Code = document.getElementById("Code") as HTMLInputElement;
        DescA = document.getElementById("DescA") as HTMLInputElement;
        DescE = document.getElementById("DescE") as HTMLInputElement;
        RemarksA = document.getElementById("RemarksA") as HTMLInputElement;
        RemarksE = document.getElementById("RemarksE") as HTMLInputElement;
        SharedButtons.btnSearch = document.getElementById("btnAccCategorySearch") as HTMLButtonElement;

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
            url: sys.apiUrl("Cod_AccountCategories", "GetAll"),
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess) {
                    Data = new Array();
                    AccountCategories = result.Response as Array<Cod_AccountCategories>;
                    GetTreeData();
                }
            }
        });
    }

    export function GetTreeData() {
        AccountCategories.map(function (x) {
            Data.push({
                id: x.AccountCatId,
                parent: (x.ParentAccountCatId != null ? x.ParentAccountCatId.toString() : "#"),
                text: x.Code + " " + x.DescA,
                "state": { "opened": true }
            });
        });
        FillDropdown(StatusFlag == "u" ? false : true);
    }

    function PushData(result: Cod_AccountCategories) {
        AccountCategories.push(result);
        AccountCategories.sort((a, b) => (a.Code > b.Code) ? 1 : -1);
        AccountCategories.map(function (x) {
            Data.push({
                id: x.AccountCatId,
                parent: (x.ParentAccountCatId != null ? x.ParentAccountCatId.toString() : "#"),
                text: x.Code + " " + x.DescA,
                "state": { "opened": true }
            });
        });

        $('#Tree').jstree(true).settings.core.data = Data;
        $('#Tree').jstree(true).refresh();
    }

    $('#Tree').on("select_node.jstree", function (e, data) { click_in_labl(data.node.id) });

    function click_in_labl(Id) {
        AccountCategory = new Cod_AccountCategories();
        AccountCategory = AccountCategories.filter(x => x.AccountCatId == Number(Id))[0];
        if (AccountCategory != null) {
            AccountCatId = Number(AccountCategory.AccountCatId);
            ParentId = Number(AccountCategory.ParentAccountCatId);
            Code.value = AccountCategory.Code.toString();
            DescA.value = AccountCategory.DescA.toString();
            RemarksA.value = AccountCategory.RemarksA.toString();
            RemarksE.value = AccountCategory.RemarksE.toString();
            DescE.value = AccountCategory.DescE.toString();
            ParentAccountCatId.value = AccountCategory.ParentAccountCatId?.toString();
            AId.value = AccountCategory.AId?.toString();

            var CheckIfHasNodes = AccountCategories.filter(x => x.ParentAccountCatId == AccountCatId)[0];
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
        FillDropdown(StatusFlag == "u" ? false : true);
        clear();
        RemoveDisabled();
    }

    function clear() {
        Code.value = '';
        DescA.value = '';
        DescE.value = '';
        RemarksA.value = '';
        RemarksE.value = '';
        ParentAccountCatId.value = null;
        AId.value = null;
    }

    function RemoveDisabled() {
        Code.disabled = false;
        DescA.disabled = false;
        DescE.disabled = false;
        RemarksA.disabled = false;
        RemarksE.disabled = false;
        ParentAccountCatId.disabled = false;
        AId.disabled = false;
        $('#left').addClass("disabledDiv");
    }

    function Undo() {
        clear();
        Disabled();
        FillDropdown(StatusFlag == "u" ? false : true);
        click_in_labl(AccountCatId);
        Success = false;
    }

    function Disabled() {
        Code.disabled = true;
        DescA.disabled = true;
        DescE.disabled = true;
        RemarksA.disabled = true;
        RemarksE.disabled = true;
        ParentAccountCatId.disabled = true;
        AId.disabled = true;
        $('#left').removeClass("disabledDiv");
    }

    function btnEdit_onclick() {
        if (AccountCatId == 0) {
            MessageBox.Toastr(" برجاء أختيار عنصر", "خطأ", ToastrTypes.error);
        }
        else {
            RemoveDisabled();
            Code.disabled = true;
            StatusFlag = 'u';
            FillDropdown(StatusFlag == "u" ? false : true);
            ParentAccountCatId.value = ParentId.toString();
        }
    }

    function btnsave_onClick() {
        if (!ValidationHeader()) return
        Save();
        FillDropdown(StatusFlag == "u" ? false : true);
        SharedWork.SwitchModes(ScreenModes.Query);
    }

    function ValidationHeader() {
        if (Code.value == "") {
            MessageBox.Toastr(" برجاء أدخل رقم كود التبويب", "خطأ", ToastrTypes.error);
            return false
        }
        else if (DescA.value == "") {
            MessageBox.Toastr(" برجاء أدخل الاسم بالعربي", "خطأ", ToastrTypes.error);
            return false
        }
        return true;
    }

    function Save() {
        AccountCategory = new Cod_AccountCategories();
        AccountCategory = AccountCategories.filter(x => x.Code == Number(Code.value))[0];
        if (AccountCategory != null && StatusFlag == "i") {
            MessageBox.Toastr('لا يمكنك تكرار كود التبويب ', 'Error', ToastrTypes.error);
        }
        else {
            Assign();
            if (Success) {
              //GetAll();
                Disabled();
                Success = false;
            }
        }
    }

    function Assign() {
        Data = new Array();
        AccountCategory = new Cod_AccountCategories();
        if (StatusFlag == "i") {
            AccountCategory.AccountCatId = 0;
            AccountCategory.ParentAccountCatId = Number(ParentAccountCatId.value);
            AccountCategory.AId = Number(AId.value);
            AccountCategory.Code = Number(Code.value);
            AccountCategory.DescA = DescA.value;
            AccountCategory.DescE = DescE.value;
            AccountCategory.RemarksA = RemarksA.value;
            AccountCategory.RemarksE = RemarksE.value;

            AccountCategory.CreatedAt = DateTimeFormat(Date().toString());
            AccountCategory.CreatedBy = SysSession.CurrentEnvironment.UserCode;
            Insert();
        }
        if (StatusFlag == "u") {
            AccountCategory = AccountCategories.filter(x => x.Code == Number(Code.value))[0];

            AccountCategory.AccountCatId = AccountCatId;
            AccountCategory.ParentAccountCatId = ParentAccountCatId.value;
            AccountCategory.AId = Number(AId.value);
            AccountCategory.Code = Number(Code.value);
            AccountCategory.DescA = DescA.value;
            AccountCategory.DescE = DescE.value;
            AccountCategory.RemarksA = RemarksA.value;
            AccountCategory.RemarksE = RemarksE.value;

            AccountCategory.UpdatedAt = DateTimeFormat(Date().toString());
            AccountCategory.UpdatedBy = SysSession.CurrentEnvironment.UserCode;
            Update();
        }
        AccountCatId = AccountCategory.AccountCatId;
        return true;
    }

    function Insert() {
        $("#MessageBoxDialog").modal("hide");
        Ajax.Callsync({
            type: "POST",
            url: sys.apiUrl("Cod_AccountCategories", "Insert"),
            data: JSON.stringify(AccountCategory),
            success: (Response) => {
                let result = Response as BaseResponse;
                if (result.IsSuccess) {
                    AccountCategory = result.Response as Cod_AccountCategories;
                    Success = true;
                    PushData(AccountCategory);
                }
                else {
                    MessageBox.Toastr("خطأء", "خطأء", ToastrTypes.error);
                    Success = false;
                }
            }
        });
    }

    function Update() {
        $("#MessageBoxDialog").modal("hide");
        Ajax.Callsync({
            type: "POST",
            url: sys.apiUrl("Cod_AccountCategories", "Update"),
            data: JSON.stringify(AccountCategory),
            success: (Response) => {
                let result = Response as BaseResponse;
                if (result.IsSuccess) {
                    AccountCategory = result.Response as Cod_AccountCategories
                    Success = true;
                    RemoveFromArray(AccountCatId);
                    Data = new Array();
                    PushData(AccountCategory);
                }
                else {
                    MessageBox.Toastr("خطأء", "خطأء", ToastrTypes.error);
                    Success = false;
                }
            }
        });
    }

    function btnDelete_onclick() {
        StatusFlag == "d";
        if (AccountCatId == 0) {
            MessageBox.Toastr(" برجاء أختيار عنصر", "خطأ", ToastrTypes.error);
        }
        else {
            if (hasNodes) {
                MessageBox.Toastr(" لا يمكنك الحذف لانه لديه ابناء", "خطأ", ToastrTypes.error);
            }
            else {
                Delete();
            }
        }
        FillDropdown(StatusFlag == "u" ? false : true);
    }

    function Delete() {
        $("#MessageBoxDialog").modal("hide");
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("Cod_AccountCategories", "Delete") + "/" + AccountCatId,
            success: (result) => {
                if (result) {
                    Success = true;
                    DaleteOldData();
                    clear();
                }
                else {
                    MessageBox.Toastr("خطأء", "خطأء", ToastrTypes.error);
                    Success = false;
                }
            }
        });
    }

    function DaleteOldData() {
        RemoveFromArray(AccountCatId);
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
        for (var i = 0; i < AccountCategories.length; i++) {
            if (AccountCategories[i].AccountCatId == id) {
                AccountCategories.splice(i, 1);
                break;
            }
        }
    }

    function FillDropdown(queryMode: boolean) {
        var newData = new Array<Cod_AccountCategories>();
        newData = queryMode ? AccountCategories : AccountCategories.filter(x => x.AccountCatId != AccountCatId);
        DocumentActions.FillCombowithCode(newData, ParentAccountCatId, "AccountCatId", "DescA", "Code", " ");
    }

    function btnSearch_onclick() {
        let sys: SystemTools = new SystemTools();
        sys.FindKey(Modules.Cod_AccountCategorie, SharedButtons.btnSearch.id, "", () => {
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