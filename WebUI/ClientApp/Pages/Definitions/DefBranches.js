$(document).ready(function () {
    SharedButtons.OnLoad();
    MSDefBranches.InitalizeComponent();
    $('#headertop1').addClass('display_none');
    $('#headertop2').removeClass('display_none');
});
var MSDefBranches;
(function (MSDefBranches) {
    var sys = new SystemTools();
    var lang = sys.SysSession.CurrentEnvironment.ScreenLanguage;
    var Resource = GetResourceList("");
    $('#headerTitle').text(Resource.Branches);
    var Refrash;
    var txt_StoreCode;
    var chkeck_StoreType;
    var txt_StoreDescA;
    var txt_BoxId;
    var txt_StoreKeeper;
    var txt_StorePosition;
    var txt_Tel;
    var BranchesList = new Array();
    var BrancheDetails = new MS_Stores();
    var PartitionList = new Array();
    var DetBranchObj = new Array();
    var MasterDetailsBranches = new MasterDetails_Branches();
    var NewMasterDetailsBranches = new MasterDetails_Branches();
    var id_ul = 'menu-group-1';
    var NewPartion = new MS_Partition();
    var divPartitionGrid = new JsGrid();
    var GridInputClassName = "form-control gridIput";
    var flagStatus = null;
    var currentStoreId = 0;
    var deletedDetails = new Array();
    var ddlBoxBank;
    var Data = new Array();
    function InitalizeComponent() {
        sys.JsTree(Data);
        InitalizeControls();
        InitalizeEvents();
        Refrash_onclick();
        InitializeGrid();
        localStorage.setItem("TableName", "MS_Stores");
        NavigateModule.InitalizeComponent();
        SharedWork.OnNavigate = Navigate;
        fillddlBox();
        SharedButtons.AddAction(function () {
            clear();
            deletedDetails = new Array();
        });
        SharedButtons.DeleteAction(function () {
            Delete();
        });
        SharedButtons.EditAction(function () { });
        SharedButtons.UndoAction(function () {
            Undo();
        });
        SharedButtons.SaveAction(function () {
            if (SharedWork.CurrentMode == ScreenModes.Add) {
                Insert();
            }
            else if (SharedWork.CurrentMode == ScreenModes.Edit) {
                Update();
            }
            else if (SharedWork.CurrentMode == ScreenModes.Query) {
                WorningMessage("يجب اختيار وضع التعديل اولا ", "Please Select Edit Mode First");
                return;
            }
        });
    }
    MSDefBranches.InitalizeComponent = InitalizeComponent;
    function fillddlBox() {
        Ajax.Callsync({
            type: "GET",
            url: sys.apiUrl("MS_BoxBank", "GetAll"),
            // data: {TableName: 'MS_Stores' },
            success: function (d) {
                var res = d;
                if (res.IsSuccess) {
                    var boxes = res.Response;
                    DocumentActions.FillCombo(boxes, ddlBoxBank, "BoxId", (lang == "ar" ? "DESCA" : "DESCE"));
                }
            }
        });
    }
    function InitalizeControls() {
        Refrash = document.getElementById("Refrash");
        txt_StoreCode = document.getElementById("txt_StoreCode");
        chkeck_StoreType = document.getElementById("chkeck_StoreType");
        txt_StoreDescA = document.getElementById("txt_StoreDescA");
        txt_BoxId = document.getElementById("txt_BoxId");
        txt_StoreKeeper = document.getElementById("txt_StoreKeeper");
        txt_StorePosition = document.getElementById("txt_StorePosition");
        txt_Tel = document.getElementById("txt_Tel");
        SharedButtons.btnSearch = document.getElementById("btnbranchSearch");
        ddlBoxBank = document.getElementById("ddlBoxBank");
        ;
    }
    function Undo() {
        clear();
        Refrash_onclick();
    }
    function Navigate() {
        Ajax.Callsync({
            type: "GET",
            url: sys.apiUrl("SystemTools", "GetRowData"),
            data: { index: SharedWork.PageIndex, idField: 'StoreId', TableName: 'MS_Stores' },
            success: function (result) {
                GetMasterAndDetails(result.StoreId.toString());
            }
        });
    }
    function InitalizeEvents() {
        Refrash.onclick = Refrash_onclick;
        SharedButtons.btnSearch.onclick = btnSearch_onclick;
    }
    function Refrash_onclick() {
        /*$('#menu-group-1').html('');*/
        GetAll_branches();
        // Display();
        // SharedWork.PageIndex = 0;
        // SharedWork.Render();
    }
    function FillTreeData() {
        Data = new Array();
        for (var i = 0; i < BranchesList.length; i++) {
            Data.push({
                id: BranchesList[i].StoreId,
                parent: "#",
                text: BranchesList[i].StoreDescA,
                "state": { "opened": true }
            });
        }
        $('#Tree').jstree(true).settings.core.data = Data;
        $('#Tree').jstree(true).refresh();
    }
    MSDefBranches.FillTreeData = FillTreeData;
    function GetByID(StoreId) {
        GetMasterAndDetails(StoreId.toString());
        currentStoreId = StoreId;
        SharedWork.SwitchModes(ScreenModes.Query);
    }
    $('#Tree').on("select_node.jstree", function (e, data) { GetByID(data.node.id); });
    function GetAll_branches() {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("MSDefBranches", "GetAllBranches"),
            success: function (d) {
                var result = d;
                if (result.IsSuccess) {
                    BranchesList = result.Response;
                    if (BranchesList.length > 0) {
                        FillTreeData();
                        //Display();
                        SharedWork.PageIndex = 0;
                        SharedWork.Render();
                    }
                    else {
                        SharedWork.SwitchModes(ScreenModes.NoData);
                        // MessageBox.Show("لايوجد دتا حاليا","No data")
                        alert("لايوجد دتا حاليا");
                    }
                }
                else
                    alert("Faild");
            }
        });
    }
    function GetMasterAndDetails(StoreId) {
        currentStoreId = Number(StoreId);
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("MSDefBranches", "GetMasterDetailsBranches"),
            data: { id: StoreId },
            success: function (d) {
                var result = d;
                if (result.IsSuccess) {
                    MasterDetailsBranches = result.Response;
                    PartitionList = MasterDetailsBranches.MS_Partitions;
                    txt_StoreCode.value = MasterDetailsBranches.MS_Stores.StoreCode;
                    chkeck_StoreType.checked = MasterDetailsBranches.MS_Stores.StoreType == true ? true : false;
                    txt_StoreDescA.value = MasterDetailsBranches.MS_Stores.StoreDescA;
                    ddlBoxBank.value = MasterDetailsBranches.MS_Stores.BoxId.toString();
                    txt_StoreKeeper.value = MasterDetailsBranches.MS_Stores.StoreKeeper;
                    txt_StorePosition.value = MasterDetailsBranches.MS_Stores.StorePosition;
                    txt_Tel.value = MasterDetailsBranches.MS_Stores.Tel;
                    divPartitionGrid.DataSource = MasterDetailsBranches.MS_Partitions;
                    divPartitionGrid.Bind();
                }
                else
                    alert("Faild");
            }
        });
    }
    function AddItemInGrid() {
        NewPartion = new MS_Partition();
        if ($('#hd_PartCode').val().trim() == "") {
            alert("يرجى ادخال البيانات اولا");
            return;
        }
        else
            NewPartion.PartCode = $('#hd_PartCode').val().trim();
        if ($('#hd_PartDescA').val().trim() == "") {
            alert("يرجى ادخال البيانات اولا");
            return;
        }
        else
            NewPartion.PartDescA = $('#hd_PartDescA').val().trim();
        NewPartion.StoreKeeper = $('#hd_StoreKeeper').val().trim();
        NewPartion.Tel = $('#hd_Tel').val().trim();
        NewPartion.Fax = $('#hd_Fax').val().trim();
        NewPartion.Address = $('#hd_Address').val().trim();
        NewPartion.Remarks = $('#hd_Remarks').val().trim();
        if ($('#hd_Flag').val().trim() == "u") {
            NewPartion.StatusFlag = "u";
        }
        else
            NewPartion.StatusFlag = "i";
        if ($('#hd_StorePartId').val().trim() == "")
            NewPartion.StorePartId = 0;
        else
            NewPartion.StorePartId = $('#hd_StorePartId').val().trim();
        PartitionList.unshift(NewPartion);
        divPartitionGrid.DataSource = PartitionList;
        divPartitionGrid.Bind();
        return;
    }
    function InitializeGrid() {
        divPartitionGrid.ElementName = "divPartitionGrid";
        divPartitionGrid.Inserting = true;
        divPartitionGrid.Editing = true;
        divPartitionGrid.ConfirmDeleteing = true;
        divPartitionGrid.InsertionMode = JsGridInsertionMode.Binding;
        divPartitionGrid.OnItemInserting = function () { };
        divPartitionGrid.OnItemUpdating = function () { };
        divPartitionGrid.OnItemDeleting = function () { };
        divPartitionGrid.Columns = [
            {
                title: "#", name: "btnAddItem", visible: true, width: "9%",
                headerTemplate: function () {
                    var btn = DocumentActions.CreateElement("button");
                    btn.className = TransparentButton + " editable";
                    btn.type = "button";
                    btn.innerHTML = "<span class='fa fa-plus'></span>";
                    btn.id = "btnAddItemGrid";
                    btn.onclick = function (e) {
                        if (SharedWork.CurrentMode == ScreenModes.Query || SharedWork.CurrentMode == ScreenModes.Start || SharedWork.CurrentMode == ScreenModes.NoData) {
                            WorningMessage("يجب اختيار وضع التعديل اولا ", "Please Select Edit Mode First");
                            return;
                        }
                        AddItemInGrid();
                    };
                    return btn;
                },
                itemTemplate: function (s, item) {
                    var btn = DocumentActions.CreateElement("button");
                    btn.innerHTML = "<i class='fas fa-times'></i>";
                    btn.className = TransparentButton + "  red_Delete_Cotnrol editable";
                    btn.type = "button";
                    btn.name = PartitionList.indexOf(item).toString();
                    btn.id = "btnRemoveItemGrid";
                    btn.onclick = function (e) {
                        var index = Number(e.currentTarget.name);
                        PartitionList[index].StatusFlag = "d";
                        deletedDetails.push(PartitionList[index]);
                        PartitionList.splice(index, 1);
                        divPartitionGrid.Bind();
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
                    btn.name = PartitionList.indexOf(item).toString();
                    btn.id = "btnUpdateItemGrid";
                    btn.onclick = function (e) {
                        var index = Number(e.currentTarget.name);
                        PartitionList.splice(index, 1);
                        divPartitionGrid.DataSource = PartitionList;
                        divPartitionGrid.Bind();
                        if (item.PartCode != null)
                            FillInputText("hd_PartCode", item.PartCode.toString());
                        if (item.PartDescA != null)
                            FillInputText("hd_PartDescA", item.PartDescA.toString());
                        if (item.StoreKeeper != null)
                            FillInputText("hd_StoreKeeper", item.StoreKeeper.toString());
                        if (item.Tel != null)
                            FillInputText("hd_Tel", item.Tel.toString());
                        if (item.Fax != null)
                            FillInputText("hd_Fax", item.Fax.toString());
                        if (item.Address != null)
                            FillInputText("hd_Address", item.Address.toString());
                        FillInputText("hd_Flag", "u");
                        if (item.StorePartId != null)
                            FillInputText("hd_StorePartId", item.StorePartId.toString());
                    };
                    return btn;
                }
            },
            {
                title: "الكود", css: "ColumPadding", name: "PartCode",
                headerTemplate: function () {
                    var txt = CreateElement("text", GridInputClassName, " ", " ", "PartCode", " ");
                    txt.id = "hd_PartCode";
                    return HeaderTemplate("الكود", txt);
                }
            },
            {
                title: "الاسم", css: "ColumPadding", name: "PartDescA",
                headerTemplate: function () {
                    var txt = CreateElement("text", GridInputClassName, " ", " ", "PartDescA", " ");
                    txt.id = "hd_PartDescA";
                    return HeaderTemplate("الاسم", txt);
                }
            },
            {
                title: "المسؤل", css: "ColumPadding", name: "StoreKeeper",
                headerTemplate: function () {
                    var txt = CreateElement("text", GridInputClassName, " ", " ", "StoreKeeper", " ");
                    txt.id = "hd_StoreKeeper";
                    return HeaderTemplate("المسؤل", txt);
                }
            },
            {
                title: "التلفون", css: "ColumPadding", name: "Tel",
                headerTemplate: function () {
                    var txt = CreateElement("text", GridInputClassName, " ", " ", "Tel", " ");
                    txt.id = "hd_Tel";
                    return HeaderTemplate("التلفون", txt);
                }
            },
            {
                title: "الفاكس", css: "ColumPadding", name: "Fax",
                headerTemplate: function () {
                    var txt = CreateElement("text", GridInputClassName, " ", " ", "Fax", " ");
                    txt.id = "hd_Fax";
                    return HeaderTemplate("الفاكس", txt);
                }
            },
            {
                title: "العنوان", css: "ColumPadding", name: "Address",
                headerTemplate: function () {
                    var txt = CreateElement("text", GridInputClassName, " ", " ", "Address", " ");
                    txt.id = "hd_Address";
                    return HeaderTemplate("العنوان", txt);
                }
            },
            {
                title: "ملاحظات", css: "ColumPadding", name: "Remarks",
                headerTemplate: function () {
                    var txt = CreateElement("text", GridInputClassName, " ", " ", "Remarks", " ");
                    txt.id = "hd_Remarks";
                    return HeaderTemplate("ملاحظات", txt);
                }
            },
            {
                title: "Flag", css: "ColumPadding disable hidden", name: "Flag", width: "1%",
                headerTemplate: function () {
                    var txt = CreateElement("text", GridInputClassName, " ", " ", "Flag", " ");
                    txt.hidden = true;
                    txt.id = "hd_Flag";
                    return HeaderTemplate("Flag", txt);
                }
            },
            {
                title: "StorePartId", css: "ColumPadding disable hidden", name: "StorePartId", width: "1%",
                headerTemplate: function () {
                    var txt = CreateElement("text", GridInputClassName, " ", " ", "StorePartId", " ");
                    txt.hidden = true;
                    txt.id = "hd_StorePartId";
                    return HeaderTemplate("StorePartId", txt);
                }
            }
        ];
        divPartitionGrid.Bind();
    }
    function FillInputText(_TextID, _Data) {
        $("#" + _TextID).text(_Data);
        $("#" + _TextID).val(_Data);
    }
    function clear() {
        //  ddlBoxBank.value = '';
        txt_StoreCode.value = '';
        txt_StoreDescA.value = '';
        txt_StoreKeeper.value = '';
        txt_StorePosition.value = '';
        txt_Tel.value = '';
        $("#ddlBoxBank").val(null).trigger('change');
        chkeck_StoreType.checked = false;
        var ClearList = new Array();
        divPartitionGrid.DataSource = ClearList;
        divPartitionGrid.Bind();
        currentStoreId = 0;
        PartitionList = new Array();
    }
    function Update() {
        var storeObj = new MS_Stores();
        storeObj.StoreId = MasterDetailsBranches.MS_Stores.StoreId;
        storeObj.BoxId = Number(ddlBoxBank.value);
        storeObj.StoreCode = txt_StoreCode.value;
        storeObj.StoreDescA = txt_StoreDescA.value;
        storeObj.StoreKeeper = txt_StoreKeeper.value;
        storeObj.StorePosition = txt_StorePosition.value;
        storeObj.Tel = txt_Tel.value;
        /* storeObj.StoreType = chkeck_StoreType.checked == true ? '1' : '0';*/
        storeObj.StoreType = chkeck_StoreType.checked == true ? true : false;
        MasterDetailsBranches.MS_Stores = storeObj;
        for (var x = 0; x < deletedDetails.length; x++) {
            PartitionList.push(deletedDetails[x]);
        }
        MasterDetailsBranches.MS_Partitions = PartitionList; //PartObjs;
        Ajax.Callsync({
            type: "POST",
            url: sys.apiUrl("MSDefBranches", "Update"),
            data: JSON.stringify(MasterDetailsBranches),
            success: function (d) {
                var result = d;
                if (result.IsSuccess == true) {
                    MessageBox.Toastr(Resource.EditedSuccessfully, "", ToastrTypes.success);
                    deletedDetails = new Array();
                    SharedWork.SwitchModes(ScreenModes.Query);
                }
                else
                    alert(result.ErrorMessage);
            }
        });
        clear();
        Refrash_onclick();
    }
    function Insert() {
        var storeObj = new MS_Stores();
        storeObj.BoxId = Number(ddlBoxBank.value);
        storeObj.StoreCode = txt_StoreCode.value;
        storeObj.StoreDescA = txt_StoreDescA.value;
        storeObj.StoreKeeper = txt_StoreKeeper.value;
        storeObj.StorePosition = txt_StorePosition.value;
        storeObj.Tel = txt_Tel.value;
        storeObj.StoreType = chkeck_StoreType.checked == true ? true : false;
        NewMasterDetailsBranches.MS_Stores = storeObj;
        NewMasterDetailsBranches.MS_Partitions = PartitionList; //PartObjs;
        Ajax.Callsync({
            type: "POST",
            url: sys.apiUrl("MSDefBranches", "Insert"),
            data: JSON.stringify(NewMasterDetailsBranches),
            success: function (d) {
                var result = d;
                if (result.IsSuccess == true) {
                    if (result.Response == "CodeFound")
                        MessageBox.Toastr(Resource.CodeAlreadyExists, Resource.Error, ToastrTypes.error);
                    else {
                        MessageBox.Toastr(Resource.AddedSuccessfully, "", ToastrTypes.success);
                        flagStatus = null;
                        clear();
                        Refrash_onclick();
                        SharedWork.SwitchModes(ScreenModes.Query);
                    }
                }
                else
                    alert(result.ErrorMessage);
            }
        });
    }
    function Delete() {
        Ajax.Callsync({
            type: "GET",
            url: sys.apiUrl("MSDefBranches", "Delete"),
            data: { id: currentStoreId },
            success: function (d) {
                var result = d;
                if (result.IsSuccess == true) {
                    clear();
                    Refrash_onclick();
                    MessageBox.Toastr(Resource.DeletedSuccessfully, "", ToastrTypes.success);
                }
                else
                    alert(result.ErrorMessage);
            }
        });
    }
    function btnSearch_onclick() {
        var sys = new SystemTools();
        sys.FindKey(Modules.DefBranches, SharedButtons.btnSearch.id, "", function () {
            var id = SearchGrid.SearchDataGrid.SelectedKey;
            if (!IsNullOrEmpty(id)) {
                GetMasterAndDetails(id.toString());
            }
        });
    }
})(MSDefBranches || (MSDefBranches = {}));
//# sourceMappingURL=DefBranches.js.map