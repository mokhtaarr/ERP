$(document).ready(function () {
    SharedButtons.OnLoad();
    CodAccountClassification.InitalizeComponent();
});
var CodAccountClassification;
(function (CodAccountClassification) {
    $('#headertop1').addClass('display_none');
    $('#headertop2').removeClass('display_none');
    var Resource = GetResourceList("");
    $('#headerTitle').text(Resource.ClassificationAccounts);
    var sys = new SystemTools();
    var SysSession = GetSystemSession();
    var AccountCategories = new Array();
    var AccountClassification = new Cod_AccountClassification();
    var AccountClassifications = new Array();
    var Data = new Array();
    // Select Option
    var ParentAccountClassId;
    var AId;
    var AccountCatId;
    var AccountClassType;
    var Code;
    var DescA;
    var DescE;
    var RemarksA;
    var RemarksE;
    var txtCreatedBy;
    var txtCreatedAt;
    var txtUpdatedBy;
    var txtUpdatedAt;
    var AccountType = null;
    var _AccountClassId = 0;
    var ParentId = 0;
    var StatusFlag;
    var Success;
    var hasNodes;
    var IndexOfElement = 0;
    var listObjectTree;
    function InitalizeComponent() {
        SharedButtons.compcode = Number(SysSession.CurrentEnvironment.CompCode);
        localStorage.setItem("TableName", "Cod_AccountClassification");
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
    CodAccountClassification.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        // select Option
        ParentAccountClassId = document.getElementById("ParentAccountClassId");
        AId = document.getElementById("AId");
        AccountCatId = document.getElementById("AccountCatId");
        AccountClassType = document.getElementById('AccountClassType');
        //textBoxes
        Code = document.getElementById("Code");
        DescA = document.getElementById("DescA");
        DescE = document.getElementById("DescE");
        RemarksA = document.getElementById("RemarksA");
        RemarksE = document.getElementById("RemarksE");
        SharedButtons.btnSearch = document.getElementById("btnAccountClassSearch");
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
            url: sys.apiUrl("Cod_AccountClassification", "GetAll"),
            success: function (d) {
                var result = d;
                if (result.IsSuccess) {
                    Data = new Array();
                    AccountClassifications = result.Response;
                    GetTreeData();
                    GetAccountCategoriesDropdown();
                }
            }
        });
    }
    function GetTreeData() {
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
    CodAccountClassification.GetTreeData = GetTreeData;
    function PushData(result) {
        AccountClassifications.push(result);
        Data = new Array();
        AccountClassifications.sort(function (a, b) { return (a.Code > b.Code) ? 1 : -1; });
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
    $('#Tree').on("select_node.jstree", function (e, data) { click_in_labl(data.node.id); });
    function click_in_labl(Id) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        AccountClassification = new Cod_AccountClassification();
        AccountClassification = AccountClassifications.filter(function (x) { return x.AccountClassId == Number(Id); })[0];
        if (AccountClassification != null) {
            _AccountClassId = Number(AccountClassification.AccountClassId);
            ParentId = Number(AccountClassification.ParentAccountClassId);
            Code.value = (_a = AccountClassification.Code) === null || _a === void 0 ? void 0 : _a.toString();
            DescA.value = (_b = AccountClassification.DescA) === null || _b === void 0 ? void 0 : _b.toString();
            DescE.value = (_c = AccountClassification.DescE) === null || _c === void 0 ? void 0 : _c.toString();
            RemarksA.value = (_d = AccountClassification.RemarksA) === null || _d === void 0 ? void 0 : _d.toString();
            RemarksE.value = (_e = AccountClassification.RemarksE) === null || _e === void 0 ? void 0 : _e.toString();
            AccountType = AccountClassification.AccountClassType;
            AccountClassType.value = (_f = AccountType) === null || _f === void 0 ? void 0 : _f.toString();
            ParentAccountClassId.value = (_g = AccountClassification.ParentAccountClassId) === null || _g === void 0 ? void 0 : _g.toString();
            AId.value = (_h = AccountClassification.AId) === null || _h === void 0 ? void 0 : _h.toString();
            AccountCatId.value = (_j = AccountClassification.AccountCatId) === null || _j === void 0 ? void 0 : _j.toString();
            var CheckIfHasNodes = AccountClassifications.filter(function (x) { return x.ParentAccountClassId == _AccountClassId; })[0];
            hasNodes = CheckIfHasNodes != null ? true : false;
        }
        SharedWork.SwitchModes(ScreenModes.Query);
    }
    function Navigate() {
        //let getAccountCategoryId = AccountCategories[SharedWork.PageIndex - 1]?.AccountCatId;
        var obj = $($('.jstree-children .jstree-node .jstree-anchor')[SharedWork.PageIndex - 1]);
        if (obj != null) {
            var getAccountCategoryId = obj.parent()[0].id;
            listObjectTree = $('.jstree-children .jstree-node .jstree-anchor');
            listObjectTree.removeClass('jstree-clicked');
            obj.addClass('jstree-clicked');
            click_in_labl(getAccountCategoryId);
        }
    }
    CodAccountClassification.Navigate = Navigate;
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
        if (!ValidationHeader())
            return;
        Save();
        FillDropdown(true);
    }
    function ValidationHeader() {
        debugger;
        if (Code.value == "") {
            MessageBox.Show(" برجاء أدخل رقم كود التبويب", "خطأ");
            return false;
        }
        else if (DescA.value == "") {
            MessageBox.Show(" برجاء أدخل الاسم بالعربي", "خطأ");
            return false;
        }
        else if (AccountClassType.value == null || AccountClassType.value == '') {
            MessageBox.Show(" برجاء اختيار مستوى التصنيف", "خطأ");
            return false;
        }
        return true;
    }
    function Save() {
        AccountClassification = new Cod_AccountClassification();
        AccountClassification = AccountClassifications.filter(function (x) { return x.Code == Number(Code.value); })[0];
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
            AccountClassification = AccountClassifications.filter(function (x) { return x.Code == Number(Code.value); })[0];
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
            success: function (Response) {
                var result = Response;
                if (result.IsSuccess) {
                    AccountClassification = result.Response;
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
            success: function (Response) {
                var result = Response;
                if (result.IsSuccess) {
                    AccountClassification = result.Response;
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
    function FillDropdown(queryMode) {
        var newData = new Array();
        newData = queryMode ? AccountClassifications.filter(function (x) { return x.AccountClassType != 3; }) : AccountClassifications.filter(function (x) { return x.AccountClassId != _AccountClassId && x.AccountClassType != 3; });
        DocumentActions.FillCombowithCode(newData, ParentAccountClassId, "AccountClassId", "DescA", "Code", " ");
    }
    function GetAccountCategoriesDropdown() {
        Ajax.CallAsync({
            type: "Get",
            url: sys.apiUrl("Cod_AccountCategories", "Get"),
            success: function (Response) {
                var result = Response;
                if (result.IsSuccess) {
                    AccountCategories = result.Response;
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
        var val = $(this).val();
        if (val == null || val == '' || val == 'null') {
            AccountClassType.disabled = true;
            AccountClassType[1].disabled = false;
            AccountClassType.value = '1';
        }
        else {
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
        var sys = new SystemTools();
        sys.FindKey(Modules.Cod_AccountClassification, SharedButtons.btnSearch.id, "", function () {
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
})(CodAccountClassification || (CodAccountClassification = {}));
//# sourceMappingURL=Cod_AccountClassification.js.map