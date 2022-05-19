$(document).ready(() => {
    SharedButtons.OnLoad();
    CodAccountClassification.InitalizeComponent();
})
 
namespace CodAccountClassification {
    $('#headertop1').addClass('display_none');
    $('#headertop2').removeClass('display_none');
    let Resource: any = GetResourceList("");
    $('#headerTitle').text(Resource.ClassificationAccounts);

    var sys: SystemTools = new SystemTools();
    var SysSession: SystemSession = GetSystemSession();
     
    var AccountCategories: Array<Cod_AccountCategories> = new Array<Cod_AccountCategories>();
    var AccountClassification: Cod_AccountClassification = new Cod_AccountClassification();
    var AccountClassifications: Array<Cod_AccountClassification> = new Array<Cod_AccountClassification>();
    var Data = new Array();

    // Select Option
    var ParentAccountClassId: HTMLSelectElement;
    var AId: HTMLSelectElement;
    var AccountCatId: HTMLSelectElement;
    var AccountClassType: HTMLSelectElement;
  
    var Code: HTMLInputElement;
    var DescA: HTMLInputElement;
    var DescE: HTMLInputElement;
    var RemarksA: HTMLInputElement;
    var RemarksE: HTMLInputElement;
   
    var txtCreatedBy: HTMLInputElement;
    var txtCreatedAt: HTMLInputElement;
    var txtUpdatedBy: HTMLInputElement;
    var txtUpdatedAt: HTMLInputElement;

    var AccountType = null;
    var _AccountClassId = 0;
    var ParentId = 0;
    var StatusFlag;
    var Success;
    var hasNodes: boolean;
    var IndexOfElement: number = 0;
    var listObjectTree: any;

    export function InitalizeComponent() {
        SharedButtons.compcode = Number(SysSession.CurrentEnvironment.CompCode);

        localStorage.setItem("TableName", "Cod_AccountClassification");
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
                SharedWork.SwitchModes(ScreenModes.Query);
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
        ParentAccountClassId = document.getElementById("ParentAccountClassId") as HTMLSelectElement;
        AId = document.getElementById("AId") as HTMLSelectElement;
        AccountCatId = document.getElementById("AccountCatId") as HTMLSelectElement;
        AccountClassType = document.getElementById('AccountClassType') as HTMLSelectElement;
        
        //textBoxes
        Code = document.getElementById("Code") as HTMLInputElement;
        DescA = document.getElementById("DescA") as HTMLInputElement;
        DescE = document.getElementById("DescE") as HTMLInputElement;
        RemarksA = document.getElementById("RemarksA") as HTMLInputElement;
        RemarksE = document.getElementById("RemarksE") as HTMLInputElement;
        SharedButtons.btnSearch = document.getElementById("btnAccountClassSearch") as HTMLButtonElement;

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
            url: sys.apiUrl("Cod_AccountClassification", "GetAll"),
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess) {
                    Data = new Array();
                    AccountClassifications = result.Response as Array<Cod_AccountClassification>;
                    GetTreeData();
                    GetAccountCategoriesDropdown();
                }
            }
        });
    }

    export function GetTreeData() {
        AccountClassifications.map(function (x) {
            Data.push({
                id: x.AccountClassId,
                parent: (x.ParentAccountClassId != null ? x.ParentAccountClassId.toString() : "#"),
                text: x.Code + " " + x.DescA,
                "state": { "opened": true }
            });
        });
        FillDropdown(true);
    }

    function PushData(result: Cod_AccountClassification) {
        AccountClassifications.push(result);
        Data = new Array();
        AccountClassifications.sort((a, b) => (a.Code > b.Code) ? 1 : -1);
        AccountClassifications.map(function (x) {
            Data.push({
                id: x.AccountClassId,
                parent: (x.ParentAccountClassId != null ? x.ParentAccountClassId.toString() : "#"),
                text: x.Code + " " + x.DescA,
                "state": { "opened": true }
            });
        });

        $('#Tree').jstree(true).settings.core.data = Data;
        $('#Tree').jstree(true).refresh();
    }

    $('#Tree').on("select_node.jstree", function (e, data) { click_in_labl(data.node.id) });

    function click_in_labl(Id) {
        AccountClassification = new Cod_AccountClassification();
        AccountClassification = AccountClassifications.filter(x => x.AccountClassId == Number(Id))[0];
        if (AccountClassification != null) {
            _AccountClassId = Number(AccountClassification.AccountClassId);
            ParentId = Number(AccountClassification.ParentAccountClassId);
            Code.value = AccountClassification.Code?.toString();
            DescA.value = AccountClassification.DescA?.toString();
            DescE.value = AccountClassification.DescE?.toString();
            RemarksA.value = AccountClassification.RemarksA?.toString();
            RemarksE.value = AccountClassification.RemarksE?.toString();
            AccountType = AccountClassification.AccountClassType;
            AccountClassType.value = AccountType?.toString();
            ParentAccountClassId.value = AccountClassification.ParentAccountClassId?.toString();
            AId.value = AccountClassification.AId?.toString();
            AccountCatId.value = AccountClassification.AccountCatId?.toString();

            var CheckIfHasNodes = AccountClassifications.filter(x => x.ParentAccountClassId == _AccountClassId)[0];
            hasNodes = CheckIfHasNodes != null ? true : false;
        }
        SharedWork.SwitchModes(ScreenModes.Query);
    }

    export function Navigate() {
        //let getAccountCategoryId = AccountCategories[SharedWork.PageIndex - 1]?.AccountCatId;
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
        GetAccountType();
    }

    function clear() {
        Code.value = '';
        DescA.value = '';
        DescE.value = '';
        RemarksA.value = '';
        RemarksE.value = '';
        AccountClassType.value = null;
        ParentAccountClassId.value = null;
        AId.value = null;
        AccountCatId.value = null;
    }

    function RemoveDisabled() {
        Code.disabled = false;
        DescA.disabled = false;
        DescE.disabled = false;
        RemarksA.disabled = false;
        RemarksE.disabled = false;
        AccountClassType.disabled = false;
        ParentAccountClassId.disabled = false;
        AId.disabled = false;
        AccountCatId.disabled = false;
        $('#left').addClass("disabledDiv");
    }

    function Undo() {
        clear();
        Disabled();
        FillDropdown(true);
        click_in_labl(AccountCatId);
        Success = false;
    }

    function Disabled() {
        Code.disabled = true;
        DescA.disabled = true;
        DescE.disabled = true;
        RemarksA.disabled = true;
        RemarksE.disabled = true;
        AccountClassType.disabled = true;
        ParentAccountClassId.disabled = true;
        AId.disabled = true;
        AccountCatId.disabled = true;
        $('#left').removeClass("disabledDiv");
    }

    function btnEdit_onclick() {
        if (_AccountClassId == 0) {
            MessageBox.Show(" برجاء أختيار عنصر", "خطأ");
        }
        else {
            RemoveDisabled();
            Code.disabled = true;
            StatusFlag = 'u';
            FillDropdown(false);
            ParentAccountClassId.value = ParentId.toString();
        }
    }

    function btnsave_onClick() {
        if (!ValidationHeader()) return
        Save();
        FillDropdown(true);
    }

    function ValidationHeader() {
        debugger
        if (Code.value == "") {
            MessageBox.Show(" برجاء أدخل رقم كود التبويب", "خطأ");
            return false
        }
        else if (DescA.value == "") {
            MessageBox.Show(" برجاء أدخل الاسم بالعربي", "خطأ");
            return false
        } else if (AccountClassType.value == null || AccountClassType.value == '') {
            MessageBox.Show(" برجاء اختيار مستوى التصنيف", "خطأ");
            return false
        }
        return true;
    }

    function Save() {
        AccountClassification = new Cod_AccountClassification();
        AccountClassification = AccountClassifications.filter(x => x.Code == Number(Code.value))[0];
        if (AccountClassification != null && StatusFlag == "i") {
            MessageBox.Show('لا يمكنك تكرار كود التبويب ', '(Error)');
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
        AccountClassification = new Cod_AccountClassification();
        if (StatusFlag == "i") {
            AccountClassification.AccountClassId = 0;
            AccountClassification.AccountCatId = AccountCatId.value;
            AccountClassification.ParentAccountClassId = ParentAccountClassId.value;
            AccountClassification.AId = AId.value;

            AccountClassification.Code = Number(Code.value);
            AccountClassification.DescA = DescA.value;
            AccountClassification.DescE = DescE.value;
            AccountClassification.RemarksA = RemarksA.value;
            AccountClassification.RemarksE = RemarksE.value;
            AccountClassification.AccountClassType = AccountClassType.value;

            AccountClassification.CreatedAt = DateTimeFormat(Date().toString());
            AccountClassification.CreatedBy = SysSession.CurrentEnvironment.UserCode;
            Insert();
        }
        if (StatusFlag == "u") {
            AccountClassification = AccountClassifications.filter(x => x.Code == Number(Code.value))[0];

            AccountClassification.AccountClassId = _AccountClassId;
            AccountClassification.ParentAccountClassId = ParentAccountClassId.value;
            AccountClassification.AId = AId.value;
            AccountClassification.AccountCatId = AccountCatId.value;

            AccountClassification.Code = Number(Code.value);
            AccountClassification.DescA = DescA.value;
            AccountClassification.DescE = DescE.value;
            AccountClassification.RemarksA = RemarksA.value;
            AccountClassification.RemarksE = RemarksE.value;
            AccountClassification.AccountClassType = AccountClassType.value;

            AccountClassification.UpdatedAt = DateTimeFormat(Date().toString());
            AccountClassification.UpdatedBy = SysSession.CurrentEnvironment.UserCode;
            Update();
        }
        _AccountClassId = AccountClassification.AccountClassId;
        return true;
    }

    function Insert() {
        $("#MessageBoxDialog").modal("hide");
        Ajax.Callsync({
            type: "POST",
            url: sys.apiUrl("Cod_AccountClassification", "Insert"),
            data: JSON.stringify(AccountClassification),
            success: (Response) => {
                let result = Response as BaseResponse;
                if (result.IsSuccess) {
                    AccountClassification = result.Response as Cod_AccountClassification;
                    Success = true;
                    PushData(AccountClassification);
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
            url: sys.apiUrl("Cod_AccountClassification", "Update"),
            data: JSON.stringify(AccountClassification),
            success: (Response) => {
                let result = Response as BaseResponse;
                if (result.IsSuccess) {
                    AccountClassification = result.Response as Cod_AccountClassification
                    Success = true;
                    RemoveFromArray(_AccountClassId);
                    Data = new Array();
                    PushData(AccountClassification);
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
        if (_AccountClassId == 0) {
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
            url: sys.apiUrl("Cod_AccountClassification", "Delete") + "/" + _AccountClassId,
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
        RemoveFromArray(_AccountClassId);
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
        for (var i = 0; i < AccountClassifications.length; i++) {
            if (AccountClassifications[i].AccountClassId == id) {
                AccountClassifications.splice(i, 1);
                break;
            }
        }
    }

    function FillDropdown(queryMode: boolean) {
        var newData = new Array<Cod_AccountClassification>();
        newData = queryMode ? AccountClassifications.filter(x => x.AccountClassType != 3) : AccountClassifications.filter(x => x.AccountClassId != _AccountClassId && x.AccountClassType != 3);
        DocumentActions.FillCombowithCode(newData, ParentAccountClassId, "AccountClassId", "DescA", "Code", " ");
    }

    function GetAccountCategoriesDropdown() {
        Ajax.CallAsync({
            type: "Get",
            url: sys.apiUrl("Cod_AccountCategories", "Get"),
            success: (Response) => {
                let result = Response as BaseResponse;
                if (result.IsSuccess) {
                    AccountCategories = result.Response as Array<Cod_AccountCategories>;
                    DocumentActions.FillCombowithCode(AccountCategories, AccountCatId, "AccountCatId", "DescA", "Code", " ");
                }
                else {
                    MessageBox.Show("خطأء", "خطأء");
                    Success = false;
                }
            }
        });
    }

    $('#ParentAccountClassId').on('change', function () {
        let val = $(this).val();
        if (val == null || val == '' || val == 'null') {
            AccountClassType.disabled = true;
            AccountClassType[1].disabled = false;
            AccountClassType.value = '1';
        } else {
            AccountClassType.disabled = false;
            AccountClassType[1].disabled = true;
            AccountClassType.value = '2';
        }
        //setAccountGroupAndCalcMethod($(this).val());
    });

    function GetAccountType() {
        if (AccountType == null) {
            AccountClassType.value = '1';
        }
        else {
            if (StatusFlag == 'i') {
                AccountClassType[1].disabled = true;
                AccountClassType.value = '2';
            }
            else
                AccountClassType[1].disabled = false;
        }
    }

    function btnSearch_onclick() {
        let sys: SystemTools = new SystemTools();
        sys.FindKey(Modules.Cod_AccountClassification, SharedButtons.btnSearch.id, "", () => {
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
