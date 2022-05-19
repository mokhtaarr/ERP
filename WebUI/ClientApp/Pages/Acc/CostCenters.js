$(document).ready(function () {
    SharedButtons.OnLoad();
    CostCenters.InitalizeComponent();
    $('#headertop1').addClass('display_none');
    $('#headertop2').removeClass('display_none');
});
var CostCenters;
(function (CostCenters_1) {
    var sys = new SystemTools();
    var language = sys.SysSession.CurrentEnvironment.ScreenLanguage;
    var SysSession = GetSystemSession();
    var Resource = GetResourceList("");
    var mainCostCenterId;
    var CurrencyId;
    var element;
    $('#headerTitle').text(Resource.CostCenter);
    var Data = new Array();
    var CostCenters = new Array();
    var Currencies = new Array();
    var Currency = new MS_Currency();
    var Model = new Cal_CostCenters();
    var listObjectTree;
    var nodeActive;
    var StatusFlag;
    var Success;
    var LastRate = "";
    var hasNodes;
    var ObjectId = 0;
    var divBalancMonthlyGrid = new JsGrid();
    var GridInputClassName = "form-control gridIput";
    function InitalizeComponent() {
        InitializeBalancMonthlyGrid();
        InitalizeControls();
        InitalizeEvents();
        sys.JsTree(Data);
        GetAll();
        localStorage.setItem("TableName", "Cal_CostCenters");
        NavigateModule.InitalizeComponent();
        SharedButtons.compcode = Number(SysSession.CurrentEnvironment.CompCode);
        SharedWork.OnNavigate = Navigate;
        SharedButtons.AddAction(function () { btnAdd_onclick(); });
        SharedButtons.DeleteAction(function () { btnDelete_onClick(); });
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
    }
    CostCenters_1.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        SharedButtons.btnSearch = document.getElementById("btnCal_CostCentersSearch");
        mainCostCenterId = document.getElementById("mainCostCenterId");
        CurrencyId = document.getElementById("CurrencyId");
    }
    function InitalizeEvents() {
        SharedButtons.btnSearch.onclick = btnSearch_onclick;
        SharedButtons.btnRefrash.onclick = Refrash;
        SharedButtons.btnRefrash2.onclick = Refrash;
    }
    function GetByID(Id) {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("CalCostCenter", "GetById"),
            data: { id: Id },
            success: function (d) {
                var result = d;
                if (result.IsSuccess) {
                    hasNodes = false;
                    Model = result.Response;
                    CheckIfElmentHasNodes();
                    Display(Model);
                    SelectCurrency(Model.CurrencyId);
                    SharedWork.SwitchModes(ScreenModes.Query);
                }
                else
                    MessageBox.Show(Resource.Error, Resource.Error);
            }
        });
    }
    function CheckIfElmentHasNodes() {
        hasNodes = CostCenters.filter(function (x) { return x.mainCostCenterId == Model.CostCenterId; })[0] != null ? true : false;
    }
    function GetAll() {
        Disabled(false);
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("CalCostCenter", "GetAll"),
            success: function (d) {
                var result = d;
                if (result.IsSuccess) {
                    CostCenters = result.Response;
                    FillTreeData();
                    FillDropDownList();
                }
                else
                    MessageBox.Show(Resource.Error, Resource.Error);
            }
        });
    }
    function GetAllCurrency() {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("funcationShared", "GetCurrencies"),
            success: function (d) {
                var result = d;
                if (result.IsSuccess) {
                    Currencies = result.Response;
                }
                else
                    MessageBox.Show("خطأء", "خطأء");
            }
        });
    }
    function FillDropDownList() {
        GetAllCurrency();
        var newCostCenters = CostCenters.filter(function (x) { return x.CostType == 1; });
        DocumentActions.FillCombowithCode(newCostCenters, mainCostCenterId, "CostCenterId", (language == "ar" ? "CostCenterNameA" : "CostCenterNameE"), "CostCenterCode", Resource.maincenter);
        DocumentActions.FillCombowithCode(Currencies, CurrencyId, "CurrencyId", (language == "ar" ? "CurrencyDescA" : "CurrencyDescE"), "CurrencyCode", Resource.Currency);
    }
    function SelectCurrency(currencyId) {
        Currency = new MS_Currency;
        if (currencyId != 0) {
            Currency = Currencies.filter(function (x) { return x.CurrencyId == currencyId; })[0];
            LastRate = Currency != null ? Currency.Rate.toFixed(2).toString() : "";
            $('#Rate').val(LastRate);
        }
        return Currency;
    }
    function FillTreeData() {
        Data = new Array();
        for (var i = 0; i < CostCenters.length; i++) {
            Data.push({
                id: CostCenters[i].CostCenterId,
                parent: (CostCenters[i].mainCostCenterId != null ? CostCenters[i].mainCostCenterId.toString() : "#"),
                text: CostCenters[i].CostCenterCode + " " + (language == "ar" ? CostCenters[i].CostCenterNameA : CostCenters[i].CostCenterNameE),
                "state": { "opened": true }
            });
        }
        $('#Tree').jstree(true).settings.core.data = Data;
        $('#Tree').jstree(true).refresh();
    }
    CostCenters_1.FillTreeData = FillTreeData;
    function GetLavel() {
        if (StatusFlag == 'i') {
            if (Model == null)
                $('#CostCenterLevel').val('1');
            else
                $('#CostCenterLevel').val(Number((Model.CostCenterLevel + 1))).toString();
        }
    }
    function Display(Model) {
        for (var item in Model) {
            var cheakDepit = item.indexOf('Depit'), cheakDebit = item.indexOf('Debit'), cheakCredit = item.indexOf('Credit');
            if (cheakDepit > -1 || cheakCredit > -1 || cheakDebit > -1) {
                if (Model[item] == null)
                    Model[item] = "0.000000";
                else
                    Model[item] = Model[item] == "0.000000" ? "0.000000" : Model[item].toFixed(6).toString();
            }
        }
        DocumentActions.RenderFromModel(Model);
        ObjectId = Number(Model.CostCenterId);
    }
    $('#Tree').on("select_node.jstree", function (e, data) { GetByID(data.node.id); });
    function Navigate() {
        Model = CostCenters[SharedWork.PageIndex - 1];
        GetByID(Model.CostCenterId);
        HighlightTree(Model.CostCenterId);
    }
    function btnAdd_onclick() {
        StatusFlag = 'i';
        $('#Rate').val('');
        RemoveDisabled(true);
        DisabledAccountBalance();
        $('select option:first-child').val('null').prop("selected", true).prop("disabled", true);
        $('#CostCenterLevel').prop('disabled', true);
        GetLavel();
    }
    function btnEdit_onclick() {
        if (ObjectId == 0) {
            MessageBox.Show(Resource.PleaseSelectItem, Resource.Error);
        }
        else {
            RemoveDisabled(false);
            element = DocumentActions.GetElementByName("CostCenterCode");
            element.disabled = true;
            StatusFlag = 'u';
            DisabledAccountBalance();
            $('#CostCenterLevel').prop('disabled', true);
        }
    }
    function btnsave_onClick() {
        if (!ValidationHeader())
            return;
        Save();
    }
    function btnDelete_onClick() {
        if (!hasNodes)
            Delete();
        else
            MessageBox.Show(" لا يمكنك الحذف لانه لديه ابناء", Resource.Error);
    }
    function ValidationHeader() {
        if (DocumentActions.GetElementByName("CostCenterCode").value == "") {
            MessageBox.Show(Resource.PleaseEnterCustomerCode, Resource.Error);
            return false;
        }
        else if (DocumentActions.CheckCode(CostCenters, DocumentActions.GetElementByName("CostCenterCode").value, "CostCenterCode") == false && StatusFlag == "i") {
            MessageBox.Show(Resource.CustomerCodeCannotDuplicated, Resource.Error);
        }
        else if (DocumentActions.GetElementByName("CostCenterNameA").value == "") {
            MessageBox.Show(Resource.PleaseEnterNameArabic, Resource.Error);
            return false;
        }
        else
            return true;
    }
    function RemoveDisabled(clear) {
        DocumentActions.allElements(false, clear, Model);
        $('#left').addClass("disabledDiv");
    }
    function Disabled(clear) {
        DocumentActions.allElements(true, clear, Model);
        $('#left').removeClass("disabledDiv");
    }
    function DisabledAccountBalance() {
        for (var item in Model) {
            var cheakDepit = item.indexOf('Depit'), cheakDebit = item.indexOf('Debit'), cheakCredit = item.indexOf('Credit');
            if (cheakDepit > -1 || cheakCredit > -1 || cheakDebit > -1) {
                $('#' + item).prop('disabled', true);
            }
        }
    }
    function Undo() {
        Disabled(false);
        Success = false;
        $('#Rate').val(LastRate);
    }
    function Assign() {
        Model = DocumentActions.AssignToModel(Model);
        if (StatusFlag == "i") {
            Model.CreatedAt = DateTimeFormat(Date().toString());
            Model.CreatedBy = SysSession.CurrentEnvironment.UserCode;
            Insert();
        }
        if (StatusFlag == "u") {
            Model.CostCenterId = ObjectId;
            Model.UpdatedAt = DateTimeFormat(Date().toString());
            Model.UpdatedBy = SysSession.CurrentEnvironment.UserCode;
            Update();
        }
        ObjectId = Model.CostCenterId;
        GetAll();
        //SharedWork.SwitchModes(ScreenModes.Query);
        return true;
    }
    function Insert() {
        $("#MessageBoxDialog").modal("hide");
        Ajax.Callsync({
            type: "POST",
            url: sys.apiUrl("CalCostCenter", "Insert"),
            data: JSON.stringify(Model),
            success: function (Response) {
                var result = Response;
                if (result.IsSuccess) {
                    Model = result.Response;
                    ObjectId = Model.CostCenterId;
                    Success = true;
                }
                else {
                    MessageBox.Show(Resource.Error, Resource.Error);
                    Success = false;
                }
            }
        });
    }
    function Update() {
        $("#MessageBoxDialog").modal("hide");
        Ajax.Callsync({
            type: "POST",
            url: sys.apiUrl("CalCostCenter", "Update"),
            data: JSON.stringify(Model),
            success: function (Response) {
                var result = Response;
                if (result.IsSuccess) {
                    Model = result.Response;
                    ObjectId = Model.CostCenterId;
                    Success = true;
                }
                else {
                    MessageBox.Show(Resource.Error, Resource.Error);
                    Success = false;
                }
            }
        });
    }
    function Save() {
        Assign();
        if (Success) {
            Disabled(false);
            Success = false;
            SharedWork.SwitchModes(ScreenModes.Query);
        }
    }
    function Delete() {
        $("#MessageBoxDialog").modal("hide");
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("CalCostCenter", "Delete") + "/" + ObjectId,
            success: function (result) {
                if (result) {
                    Success = result;
                    GetAll();
                    Disabled(result);
                }
                else {
                    MessageBox.Show(Resource.Error, Resource.Error);
                    Success = false;
                }
            }
        });
    }
    function btnSearch_onclick() {
        var sys = new SystemTools();
        sys.FindKey(Modules.Cal_CostCenters, SharedButtons.btnSearch.id, "", function () {
            if (Model != null) {
                Display(Model);
            }
        });
    }
    function Refrash() {
        var _a;
        var id = '';
        nodeActive = $('.jstree-anchor.jstree-clicked');
        if (nodeActive != null && nodeActive.length > 0) {
            GetAll();
            resetTree();
            FillTreeData();
            id = (_a = nodeActive[0]) === null || _a === void 0 ? void 0 : _a.id.split("_")[0];
            GetByID(id);
        }
        if (id != '') {
            var interval_id_1 = setInterval(function () {
                listObjectTree = $('.jstree-children .jstree-node .jstree-anchor');
                listObjectTree.removeClass('jstree-clicked');
                $($('#' + ObjectId + ' a')[0]).addClass('jstree-clicked');
                clearInterval(interval_id_1);
            }, 50);
        }
    }
    function resetTree() {
        $('#Tree').jstree(true).settings.core.data = null;
        $('#Tree').jstree(true).refresh();
    }
    function InitializeBalancMonthlyGrid() {
        divBalancMonthlyGrid.ElementName = "divBalancMonthlyGrid";
        divBalancMonthlyGrid.Inserting = true;
        divBalancMonthlyGrid.Editing = true;
        divBalancMonthlyGrid.ConfirmDeleteing = true;
        divBalancMonthlyGrid.InsertionMode = JsGridInsertionMode.Binding;
        divBalancMonthlyGrid.OnItemInserting = function () { };
        divBalancMonthlyGrid.OnItemUpdating = function () { };
        divBalancMonthlyGrid.OnItemDeleting = function () { };
        divBalancMonthlyGrid.Columns = [
            {
                title: "#", name: "btnAddItem", visible: true, width: "9%",
                headerTemplate: function () {
                    var btn = DocumentActions.CreateElement("button");
                    btn.className = TransparentButton + " editable addable";
                    btn.type = "button";
                    btn.innerHTML = "<span class='fa fa-plus'></span>";
                    btn.id = "btnAddItemGrid";
                    btn.onclick = function (e) {
                        if (SharedWork.CurrentMode == ScreenModes.Query || SharedWork.CurrentMode == ScreenModes.Start || SharedWork.CurrentMode == ScreenModes.NoData) {
                            WorningMessage("يجب اختيار وضع التعديل اولا ", "Please Select Edit Mode First");
                            return;
                        }
                    };
                    return btn;
                },
                itemTemplate: function (s, item) {
                    var btn = DocumentActions.CreateElement("button");
                    btn.innerHTML = "<i class='fas fa-times'></i>";
                    btn.className = TransparentButton + "  red_Delete_Cotnrol editable";
                    btn.type = "button";
                    btn.id = "btnRemoveItemGrid";
                    btn.onclick = function (e) {
                        var index = Number(e.currentTarget.name);
                        divBalancMonthlyGrid.Bind();
                    };
                    return btn;
                }
            },
            {
                css: JsGridHeaderCenter,
                itemTemplate: function (s, item) {
                    var btn = DocumentActions.CreateElement("button");
                    btn.innerHTML = "<i class='fa fa-edit'></i>";
                    btn.className = TransparentButton + " " + "emptrainingedit " + "green_edit_control editable";
                    btn.type = "button";
                    btn.id = "btnUpdateItemGrid";
                    btn.onclick = function (e) {
                    };
                    return btn;
                }
            },
            {
                title: "الشهر ", css: "ColumPadding", name: "Code", headerTemplate: function () {
                    var txt = CreateElement("text", GridInputClassName, " ", " ", "Code", " ");
                    txt.id = "hd_Code";
                    return HeaderTemplate("الشهر ", txt);
                }
            },
            {
                title: "افتتاحى ", css: "ColumPadding", name: "Name1", headerTemplate: function () {
                    var txt = CreateElement("Name1", GridInputClassName, "", "", "Name1", "");
                    txt.id = "hd_Name1";
                    return HeaderTemplate("افتتاحى ", txt);
                }
            },
            {
                title: "اجمالى مدين", css: "ColumPadding", name: "Name2", headerTemplate: function () {
                    var txt = CreateElement("Name2", GridInputClassName, "", "", "Name2", "");
                    txt.id = "hd_Name2";
                    return HeaderTemplate("اجمالى مدين", txt);
                }
            },
            {
                title: "اجمالى دائن ", css: "ColumPadding", name: "Name2", headerTemplate: function () {
                    var txt = CreateElement("Name2", GridInputClassName, "", "", "Name2", "");
                    txt.id = "hd_Name2";
                    return HeaderTemplate("اجمالى دائن ", txt);
                }
            },
            {
                title: "رصيد ", css: "ColumPadding", name: "Name2", headerTemplate: function () {
                    var txt = CreateElement("Name2", GridInputClassName, "", "", "Name2", "");
                    txt.id = "hd_Name2";
                    return HeaderTemplate("رصيد ", txt);
                }
            },
        ];
        divBalancMonthlyGrid.Bind();
    }
    function HighlightTree(id) {
        var obj = $('#' + id + '_anchor');
        if (obj != null) {
            listObjectTree = $('.jstree-children .jstree-node .jstree-anchor');
            listObjectTree.removeClass('jstree-clicked');
            obj.addClass('jstree-clicked');
        }
    }
})(CostCenters || (CostCenters = {}));
//# sourceMappingURL=CostCenters.js.map