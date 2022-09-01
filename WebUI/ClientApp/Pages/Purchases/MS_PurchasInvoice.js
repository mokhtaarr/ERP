$(document).ready(function () {
    SharedButtons.OnLoad();
    PurchasInvoice.InitalizeComponent();
});
var PurchasInvoice;
(function (PurchasInvoice) {
    $('#headertop1').addClass('display_none');
    $('#headertop2').removeClass('display_none');
    var Resource = GetResourceList("");
    $('#headerTitle').text(Resource.Purchase_Invoice);
    var sys = new SystemTools();
    var SysSession = GetSystemSession();
    var language = SysSession.CurrentEnvironment.ScreenLanguage;
    var env = sys.SysSession.CurrentEnvironment;
    var compCode = SysSession.CurrentEnvironment.CompCode;
    var UserCode = SysSession.CurrentEnvironment.UserCode;
    var Token = "HGFD-" + SysSession.CurrentEnvironment.Token;
    var Data = new Array();
    var Model = new MS_PurchasInvoice();
    var PurchasInvoices = new Array();
    var Details = new Array();
    var DetailsPros = new Array();
    var DeatilsAndModel = new PurchasInvoiceAndDetail();
    var Terms = new Array();
    var Currencies = new Array();
    var Books = new Array();
    var Items = new Array();
    var ItemVM;
    var ItemUnits = new Array();
    // select Options
    var element;
    var TermId, RectSourceType, RectSourceType, SelectMode_RectSourceType = [], CustomerId, EmpId, VendorId, CurrencyId, BookId;
    var ObjectId = 0;
    var StatusFlag;
    var Success;
    var trId = "_idAdd";
    var hasNodes;
    var pageLoaded = false;
    var flag = true;
    var flagTotal = true;
    var AccountId;
    var rowId;
    var divDetailGrid = new JsGrid();
    var grid = new JsGrid();
    var datatable;
    function InitalizeComponent() {
        localStorage.setItem("TableName", "MS_PurchasInvoice");
        NavigateModule.InitalizeComponent();
        SharedButtons.compcode = Number(SysSession.CurrentEnvironment.CompCode);
        SharedWork.OnNavigate = Navigate;
        SharedButtons.AddAction(function () { btnAdd_onclick(); });
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
        try {
            InitalizeControls();
            InitalizeEvents();
            GetAll();
            GetItems();
            GetCurrency();
            GetAllTerms(1);
            GetJournalEntryBooks(1);
            GetRectSourceType();
        }
        catch (e) { }
    }
    PurchasInvoice.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        SharedButtons.btnSearch = document.getElementById("btnMS_PurchasInvoiceSearch");
        TermId = document.getElementById("TermId");
        BookId = document.getElementById("BookId");
        RectSourceType = document.getElementById("RectSourceType");
        CurrencyId = document.getElementById("CurrencyId");
        SelectMode_RectSourceType = ["#CustomerId", "#EmpId", "#VendorId"];
    }
    function InitalizeEvents() {
        SharedButtons.btnSearch.onclick = btnSearch_onclick;
        SharedButtons.btnRefrash2.onclick = Refrash;
        BookId.onchange = function () {
            if (!IsNullOrEmpty(BookId.value))
                GetMaxTrNo(Number(BookId.value));
        };
        CurrencyId.onchange = function () {
            if (!IsNullOrEmpty(CurrencyId.value))
                SetCurrencyById(null, Number(CurrencyId.value), null);
        };
        RectSourceType.onchange = function () {
            var type = $('#' + RectSourceType.id).find('option:selected').attr('type');
            if (!IsNullOrEmpty(type)) {
                if (divDetailGrid.DataSource.length == 0 && SharedWork.CurrentMode == ScreenModes.Add)
                    InitializeDetailGrid();
                switch (type) {
                    case "Customers":
                        SetNewSelectNodes(Resource.Client, "CustomerId");
                        GetCustomers();
                        //$('#CustomerId').val(Model.CustomerId).select2().trigger('change');
                        break;
                    case "Employees":
                        SetNewSelectNodes(Resource.Employee, "EmpId");
                        GetEmployees();
                        //$('#EmpId').val(Model.EmpId).select2().trigger('change');
                        break;
                    case "Vendors":
                        SetNewSelectNodes(Resource.I_Vendor, "VendorId");
                        GetVendor();
                        break;
                    default:
                        SetNewSelectNodes("", "");
                        break;
                }
            }
            else {
                SetNewSelectNodes("", "");
                $('#divDetailGrid').html('');
                $("#InvTotalAfterRate").val(0);
            }
        };
    }
    function GetAll() {
        Disabled(false);
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("MS_PurchasInvoice", "GetAll"),
            success: function (d) {
                var result = d;
                if (result.IsSuccess) {
                    ClearGrids();
                    PurchasInvoices = result.Response;
                }
            }
        });
    }
    function GetByID(Id) {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("MS_PurchasInvoice", "GetById"),
            data: { id: Id },
            success: function (d) {
                var result = d;
                if (result.IsSuccess) {
                    DeatilsAndModel = result.Response;
                    Model = DeatilsAndModel.Model;
                    Display(Model);
                    Details = DeatilsAndModel.Details;
                    for (var i = 0; i < Details.length; i++) {
                        Details[i].ItemTotal = Details[i].Price * Details[i].Quantity;
                        Details[i].ItemTotalAfterRate = Model.Rate * (Details[i].Price * Details[i].Quantity);
                    }
                    SharedWork.SwitchModes(ScreenModes.Query);
                    divDetailGrid.DataSource = Details;
                    if (divDetailGrid.DataSource.length != 0 && SharedWork.CurrentMode == ScreenModes.Query)
                        InitializeDetailGrid();
                    GetTotalForDetails();
                }
                else
                    MessageBox.Show(Resource.Error, Resource.Error);
            }
        });
    }
    function Assign() {
        DeatilsAndModel.Model = DocumentActions.AssignToModel(Model);
        DeatilsAndModel.Details = Details;
        //DeatilsAndModel.Details = DocumentActions.AssignArr(Details, DetailsPros);
        if (StatusFlag == "i") {
            Model.CreatedAt = DateTimeFormat(Date().toString());
            Model.CreatedBy = SysSession.CurrentEnvironment.UserCode;
            Insert();
        }
        if (StatusFlag == "u") {
            Model.PurInvId = ObjectId;
            Model.UpdateAt = DateTimeFormat(Date().toString());
            Model.UpdateBy = SysSession.CurrentEnvironment.UserCode;
            Update();
        }
        ObjectId = Model.PurInvId;
        GetAll();
        if (ObjectId != 0)
            GetByID(ObjectId);
        return true;
    }
    function Save() {
        if (DocumentActions.CheckCode(PurchasInvoices, DocumentActions.GetElementByName("TrNo").value, "TrNo") == false && StatusFlag == "i") {
            MessageBox.Show(Resource.CustomerCodeCannotDuplicated, Resource.Error);
        }
        else {
            if (Details.length == 0)
                MessageBox.Toastr("", Resource.Error, ToastrTypes.error);
            Assign();
            if (Success) {
                Disabled(false);
                Success = false;
                SharedWork.SwitchModes(ScreenModes.Query);
            }
        }
    }
    function Insert() {
        $("#MessageBoxDialog").modal("hide");
        Ajax.Callsync({
            type: "POST",
            url: sys.apiUrl("MS_PurchasInvoice", "Insert"),
            data: JSON.stringify(DeatilsAndModel),
            success: function (Response) {
                var result = Response;
                if (result.IsSuccess) {
                    Model = result.Response;
                    ObjectId = Model.PurInvId;
                    Success = true;
                }
                else {
                    MessageBox.Toastr(result.ErrorMessage, Resource.Error, ToastrTypes.error);
                    Success = false;
                }
            }
        });
    }
    function Update() {
        $("#MessageBoxDialog").modal("hide");
        Ajax.Callsync({
            type: "POST",
            url: sys.apiUrl("MS_PurchasInvoice", "Update"),
            data: JSON.stringify(DeatilsAndModel),
            success: function (Response) {
                var result = Response;
                if (result.IsSuccess) {
                    Model = result.Response;
                    ObjectId = Model.PurInvId;
                    Success = true;
                }
                else {
                    MessageBox.Toastr(result.ErrorMessage, Resource.Error, ToastrTypes.error);
                    Success = false;
                }
            }
        });
    }
    function Delete() {
        $("#MessageBoxDialog").modal("hide");
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("MS_PurchasInvoice", "Delete") + "/" + ObjectId,
            success: function (result) {
                if (result) {
                    Success = true;
                    $("#InvTotalAfterRate").val(0);
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
    function btnAdd_onclick() {
        $('#divDetailGrid').html('');
        StatusFlag = 'i';
        RemoveDisabled(true);
        element = DocumentActions.GetElementByName("TrNo");
        element.disabled = true;
        element = DocumentActions.GetElementByName("InvTotal");
        element.disabled = true;
        //$('select option:first-child').val('null').prop("selected", true).prop("disabled", true);
        ClearGrids();
    }
    function btnEdit_onclick() {
        if (ObjectId == 0) {
            MessageBox.Show(Resource.PleaseSelectItem, Resource.Error);
        }
        else {
            RemoveDisabled(false);
            element = DocumentActions.GetElementByName("TrNo");
            element.disabled = true;
            element = DocumentActions.GetElementByName("InvTotal");
            element.disabled = true;
            element = DocumentActions.GetElementByName("BookId");
            element.disabled = true;
            StatusFlag = 'u';
        }
    }
    function btnsave_onClick() {
        if (!ValidationHeader())
            return;
        Save();
    }
    function btnDelete_onclick() {
        StatusFlag == "d";
        if (ObjectId == 0) {
            MessageBox.Show(Resource.PleaseSelectItem, Resource.Error);
        }
        else {
            if (hasNodes) {
                MessageBox.Show(Resource.CannotDeleteHasChildren, Resource.Error);
            }
            else {
                Delete();
            }
        }
    }
    function ValidationHeader() {
        flag = true;
        if ($('#divDetailGrid').html() == '') {
            flag = false;
            MessageBox.Toastr(Resource.NumberOfItemsIsZero, Resource.Error, ToastrTypes.error);
        }
        else if (Details.length == 0) {
            flag = false;
            MessageBox.Toastr(Resource.MustChooseAtLeastOneProduct, Resource.Error, ToastrTypes.error);
        }
        return flag;
    }
    function Navigate() {
        var _a;
        ObjectId = (_a = PurchasInvoices[SharedWork.PageIndex - 1]) === null || _a === void 0 ? void 0 : _a.Id;
        if (ObjectId != 0)
            GetByID(ObjectId);
    }
    PurchasInvoice.Navigate = Navigate;
    function InitializeDetailGrid() {
        $('#divDetailGrid').removeClass('disableTable');
        divDetailGrid.ElementName = "divDetailGrid";
        divDetailGrid.PrimaryKey = "InvItemCardId";
        divDetailGrid.Inserting = true;
        divDetailGrid.Editing = true;
        divDetailGrid.Paging = true;
        divDetailGrid.PageSize = 10;
        divDetailGrid.ConfirmDeleteing = true;
        divDetailGrid.InsertionMode = JsGridInsertionMode.Binding;
        divDetailGrid.OnItemEditing = function (e) { trId = "_idEdit"; };
        divDetailGrid.OnItemInserting = InsertItem;
        divDetailGrid.OnItemUpdating = UpdateItem;
        divDetailGrid.OnItemDeleting = DeleteItem;
        divDetailGrid.Columns = [
            {
                title: "#", name: "btnAddItem", visible: true, type: "control", modeSwitchButton: true, editButton: true
            },
            {
                title: Resource.Itm_ItemCode, css: "ColumPadding", name: "ItemCode", id: "ItemCode",
                itemTemplate: function (data, row) {
                    trId = "_idAdd";
                    return GetItem(row).value;
                },
                editTemplate: function (data, row) {
                    return GetItem(row);
                },
                insertTemplate: function (data, row) {
                    if (row === void 0) { row = new MS_PurchaseInvoiceItemCard(); }
                    return GetItem(row);
                },
            },
            {
                title: Resource.Barcode, css: "ColumPadding", name: "BarCode", id: "BarCode", type: "text", disabled: true
            },
            {
                title: Resource.Itm_ItemName, css: "ColumPadding", name: "ItemDescA", id: "ItemDescA", type: "text", disabled: true
            },
            {
                title: Resource.Itm_ItemName + " 2", css: "ColumPadding", name: "ItemDescE", id: "ItemDescE", type: "text", disabled: true
            },
            {
                ///////////////////// ItemCardUnits ////////////////////
                title: Resource.UnitName, css: "ColumPadding", name: "UnitNam", id: "UnitNam",
                //type: "select", items: ItemUnits, textField: language == "ar" ? "UnitNam" : "UnitNameE", valueField: "UnitId",
                insertTemplate: function (data, row) {
                    var Dropdown = CreateDropdownList(ItemUnits, "UnitNam", "UnitNameE", "UnitId", null, "UnitNam", false);
                    return Dropdown;
                },
                editTemplate: function (data, row) {
                    ItemUnits = GetUnitsById(row.ItemCardId);
                    var Dropdown = CreateDropdownList(ItemUnits, "UnitNam", "UnitNameE", "UnitId", null, "UnitNam", false, row.UnitId.toString());
                    return Dropdown;
                },
            },
            {
                title: Resource.Quantity, type: "number", css: "ColumPadding", name: "Quantity", id: "Quantity", fun: CalculatePrice, Typefun: "change"
            },
            {
                title: Resource.priceCurr, css: "ColumPadding", name: "Price", id: "Price", type: "number", fun: CalculatePrice, Typefun: "change"
            },
            {
                title: Resource.TotalCurr, css: "ColumPadding", name: "ItemTotal", id: "ItemTotal", type: "number", disabled: true
            },
            {
                title: Resource.Price2, css: "ColumPadding", name: "PriceAfterCurr", id: "PriceAfterCurr", type: "number", disabled: true
            },
            {
                title: Resource.Total, css: "ColumPadding", name: "ItemTotalAfterRate", id: "ItemTotalAfterRate", type: "number", disabled: true
            },
            {
                title: Resource.Notes, css: "ColumPadding", name: "Remarks", id: "Remarks", type: "text"
            },
            //{
            //    title: "DisPercent", css: "ColumPadding", name: "DisPercent", id: "DisPercent", type: "number"
            //},
            //{
            //    title: "DisAmount", css: "ColumPadding", name: "DisAmount", id: "DisAmount", type: "number"
            //},
            /////////////////////////////////// hiden fileds ////////////////////////////
            {
                title: "UnitId", css: "ColumPadding disable hidden", name: "UnitId", id: "UnitId", type: "text"
            },
            {
                title: "UnittRate", css: "ColumPadding disable hidden", name: "UnittRate", id: "UnittRate", type: "text"
            },
            {
                title: "ItemCardId", css: "ColumPadding disable hidden", name: "ItemCardId", id: "ItemCardId", type: "text"
            },
            {
                title: "InvItemCardId", css: "ColumPadding disable hidden", name: "InvItemCardId", id: "InvItemCardId", type: "text"
            },
            {
                title: "PurInvId", css: "ColumPadding disable hidden", name: "PurInvId", id: "PurInvId", type: "text"
            },
            {
                title: "StatusFlag", css: "ColumPadding disable hidden", name: "StatusFlag", id: "StatusFlag", type: "text"
            },
        ];
        divDetailGrid.Bind();
    }
    function InsertItem(e) {
        var item = e.Item;
        item.StatusFlag = 'i';
        item = GetNewUnit(item);
        var ItemCard = Details.filter(function (x) { return x.ItemCardId == item.ItemCardId && x.UnitId == item.UnitId; })[0];
        if (ItemCard == null)
            Details.push(item);
        else
            MessageBox.Toastr(Resource.ItemAlreadyExists, Resource.Error, ToastrTypes.error);
        divDetailGrid.DataSource = Details;
        divDetailGrid.Bind();
        DocumentActions.ChangeSelectToSearchable("divDetailGrid");
        GetTotalForDetails();
    }
    function UpdateItem(e) {
        var item = e.Item;
        var index = e.ItemIndex;
        item.StatusFlag = 'u';
        item = GetNewUnit(item);
        PushItemChanged(item, index);
        divDetailGrid.DataSource = Details;
        divDetailGrid.Bind();
        GetTotalForDetails();
    }
    function DeleteItem(e) {
        debugger;
        var item = e.Item;
        var index = e.ItemIndex;
        item.StatusFlag = 'd';
        PushItemChanged(item, index);
        GetTotalForDetails();
    }
    function PushItemChanged(item, index) {
        //Details.splice(index, 1);
        item.StatusFlag == 'd' ? Details.splice(index, 1) : Details.splice(index, 1, item);
        var ItemCard = DetailsPros.filter(function (x) { return x.ItemCardId != item.ItemCardId && x.UnitId != item.UnitId; })[0];
        if (ItemCard == null)
            DetailsPros.push(item);
    }
    function GetNewUnit(item) {
        item.UnitId = $("#" + trId + " #UnitNam").val();
        var unite = ItemUnits.filter(function (x) { return x.UnitId == item.UnitId; })[0];
        item.UnitNam = language == "ar" ? unite.UnitNam : unite.UnitNameE;
        return item;
    }
    function GetItem(row) {
        var itemCard = Items.filter(function (x) { return x.GiftItemCardId == row.ItemCardId && x.GiftUnitId == row.UnitId; })[0], code = itemCard == null ? "" : itemCard.ItemCode;
        try {
            row.PurInvId = ObjectId;
            row.ItemDescA = itemCard.ItemDescA;
            row.ItemDescE = itemCard.ItemDescE;
            row.BarCode = itemCard.BarCode1;
            row.UnitRate = itemCard.UnittRate;
            row.UnitNam = language == "ar" ? itemCard.UnitNam : itemCard.UnitNameE;
            if (SharedWork.CurrentMode == ScreenModes.Add || SharedWork.CurrentMode == ScreenModes.Edit)
                row.StatusFlag = IsNullOrEmpty(row.InvItemCardId.toString()) ? 'i' : 'u';
        }
        catch (e) { }
        var txt = CreateElement("text", "", code, null, "ItemCode", null);
        txt.ondblclick = function () {
            findItems(Items, function () {
                var id = SearchGrid.SearchDataGrid.SelectedKey;
                if (!IsNullOrEmpty(id)) {
                    ItemVM = SearchGrid.SearchDataGrid.SelectedItem;
                    SetItem(ItemVM);
                }
            });
        };
        return txt;
    }
    function SetItem(item) {
        if (item == null)
            return;
        BulidUnitDrop(item.GiftItemCardId);
        $("#" + trId + " #ItemCardId").val(item.GiftItemCardId);
        $("#" + trId + " #UnitId").val(item.GiftUnitId);
        $("#" + trId + " #UnitNam").val(item.GiftUnitId);
        $("#" + trId + " #ItemCode").val(item.ItemCode);
        $("#" + trId + " #BarCode").val(item.BarCode1);
        $("#" + trId + " #ItemDescA").val(item.ItemDescA);
        $("#" + trId + " #ItemDescE").val(item.ItemDescE);
    }
    function GetItems() {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("funcationShared", "GetItems"),
            data: { lang: language, storeId: env.BranchCode },
            success: function (Response) {
                var result = Response;
                if (result.IsSuccess) {
                    Items = result.Response;
                }
                else {
                    MessageBox.Toastr(result.ErrorMessage, Resource.Error, ToastrTypes.error);
                    Success = false;
                }
            }
        });
    }
    function findItems(Items, OnSearchSelected) {
        if (Items == null) {
            MessageBox.Toastr("Search not available, Please call your app administrator", "Search", ToastrTypes.error);
            return;
        }
        $("#tableDiv").parent().addClass("tableDivPerant");
        var columns = GetcolumnsObject(Items);
        SearchGrid.SearchDataGrid = new DataTable();
        SearchGrid.SearchDataGrid.Columns = columns;
        SearchGrid.SearchDataGrid.dataScr = Items;
        SearchGrid.SearchDataGrid.ElementName = "SearchDataTable";
        SearchGrid.SearchDataGrid.PrimaryKey = "GiftItemCardId"; //"RowIndex";
        SearchGrid.SearchDataGrid.Bind();
        SearchGrid.SearchDataGrid.OnDoubleClick = function () {
            $("#SearchBox").modal("hide");
            OnSearchSelected();
        };
        try {
            $("#resetSearch").hide();
            $('#SearchDataTable_wrapper').css("overflow", "auto");
            if (language == "ar") {
                document.getElementById("searchTitle").innerText = "بحث الاصناف";
            }
            else if (language == "en") {
                document.getElementById("searchTitle").innerText = "item search";
            }
            //document.getElementById("searchDes").innerText = settings.Description;
        }
        catch (e) {
            console.log('error in language...');
        }
        $(".ui-igedit-input").keyup(function (e) { });
        $("#SearchBox").modal("show"); //.css("display", "");//
        $("#SearchDataTable").css("width", "100%");
        $("#SearchDataTable").css("height", "100%");
    }
    function GetcolumnsObject(obj) {
        var Columns = new Array();
        try {
            var properties = Object.getOwnPropertyNames(obj[0]);
            for (var _i = 0, properties_1 = properties; _i < properties_1.length; _i++) {
                var property = properties_1[_i];
                var Column = {
                    headerText: property,
                    hidden: false,
                    key: property,
                    width: "100px",
                };
                Columns.push(Column);
            }
        }
        catch (e) { }
        return Columns;
    }
    $("#Rate").on('change', CalculatePrice);
    function CalculatePrice() {
        var Quantity = $("#" + trId + " #Quantity").val(), Price = $("#" + trId + " #Price").val();
        if (Quantity == 0 || Price == 0)
            return;
        var Rate = $("#Rate").val(), ItemTotal = Quantity * Price, PriceAfterCurr = Price * Rate, ItemTotalAfterRate = ItemTotal * Rate;
        $("#" + trId + " #ItemTotal").val(ItemTotal);
        $("#" + trId + " #PriceAfterCurr").val(PriceAfterCurr);
        $("#" + trId + " #ItemTotalAfterRate").val(ItemTotalAfterRate);
    }
    function Display(model) {
        DocumentActions.RenderFromModel(model);
        Model = model;
        ObjectId = Number(Model.PurInvId);
    }
    function Undo() {
        Disabled(false);
        Success = false;
        if (ObjectId != 0)
            GetByID(ObjectId);
    }
    function Disabled(clear) {
        DocumentActions.allElements(true, clear, Model);
        $(".selectModeInput").prop('disabled', true);
    }
    function RemoveDisabled(clear) {
        DocumentActions.allElements(false, clear, Model);
        $(".selectModeInput").prop('disabled', false);
    }
    function GetAllTerms(type) {
        Ajax.Callsync({
            type: "Get",
            data: { type: type },
            url: sys.apiUrl("funcationShared", "GetAllTerms"),
            success: function (Response) {
                var result = Response;
                if (result.IsSuccess) {
                    Terms = result.Response;
                    DocumentActions.FillCombowithdefult(Terms, TermId, "TermId", "TermName", Resource.DocumentType);
                }
            }
        });
    }
    function GetCurrency() {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("funcationShared", "GetCurrencies"),
            success: function (Response) {
                var result = Response;
                if (result.IsSuccess) {
                    Currencies = result.Response;
                    DocumentActions.FillCombowithCode(Currencies, CurrencyId, "CurrencyId", (language == "ar" ? "CurrencyDescA" : "CurrencyDescE"), "CurrencyCode", Resource.Currency);
                }
            }
        });
    }
    function GetUnitsById(id) {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("funcationShared", "GetUnitsById") + "/" + id,
            success: function (Response) {
                var result = Response;
                if (result.IsSuccess) {
                    ItemUnits = result.Response;
                }
                else {
                    MessageBox.Toastr(result.ErrorMessage, Resource.Error, ToastrTypes.error);
                    Success = false;
                }
            }
        });
        return ItemUnits;
    }
    function BulidUnitDrop(id) {
        ItemUnits = GetUnitsById(id);
        $("#" + trId + " #UnitNam").find('option').remove();
        var tem = '';
        for (var i = 0; i < ItemUnits.length; i++) {
            tem += '<option value="' + ItemUnits[i].UnitId + '">' + (language == "ar" ? ItemUnits[i].UnitNam : ItemUnits[i].UnitNameE) + '</option>';
        }
        $("#" + trId + " #UnitNam").append(tem);
    }
    function GetJournalEntryBooks(type) {
        Ajax.Callsync({
            type: "Get",
            data: { type: type },
            url: sys.apiUrl("funcationShared", "GetAllBooks"),
            success: function (Response) {
                var result = Response;
                if (result.IsSuccess) {
                    Books = result.Response;
                    DocumentActions.FillCombowithCode(Books, BookId, "BookId", (language == "ar" ? "BookNameAR" : "BookNameEN"), "PrefixCode", "");
                }
            }
        });
    }
    function GetMaxTrNo(BookId) {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("Ms_ReceiptNote", "GetMaxTrNo"),
            data: { bookId: BookId },
            success: function (Response) {
                element = DocumentActions.GetElementByName("TrNo");
                element.value = Response;
            }
        });
    }
    function SetCurrencyById(trId, id, element) {
        var Currency = Currencies.filter(function (x) { return x.CurrencyId == id; })[0];
        if (IsNullOrEmpty(trId)) {
            $('#Rate').val(Currency.Rate.toFixed(2));
            CalculatePrice();
        }
        else {
            $(trId + ' #CurrencyId').val(Currency.CurrencyId);
            $(trId + ' #' + element.id).val(Currency.CurrencyCode);
            $(trId + ' #NameCurrency').val(Currency.CurrencyDescA);
            $(trId + ' #CodeCurrency').select2().trigger('change');
        }
    }
    function ClearGrids() {
        Details = new Array();
        DetailsPros = new Array();
        ClearBranchesGrid();
    }
    function ClearBranchesGrid() {
        divDetailGrid.DataSource = Details;
        divDetailGrid.Bind();
        //$('div#TotalDebit span').text(0);
        //$('div#TotalCredit span').text(0);
        //$('div#def span').text(0);
    }
    function btnSearch_onclick() {
        var sys = new SystemTools();
        sys.FindKey(Modules.PurchasInvoice, SharedButtons.btnSearch.id, "", function () {
            var id = SearchGrid.SearchDataGrid.SelectedKey;
            if (!IsNullOrEmpty(id)) {
                GetByID(ObjectId);
            }
        });
    }
    function Refrash() {
        ClearGrids();
        GetAll();
        GetByID(ObjectId);
    }
    function GetRectSourceType() {
        var DocType = new Array();
        var RectSourceTypeArr = new Array();
        var obj = { Key: 0, Value: "", Type: "" };
        if (language == "ar") {
            DocType.push(0, "اختر نوع", "");
            DocType.push(1, "عميل / ح.الاستاذ", "Customers");
            DocType.push(2, "مورد / ح.الاستاذ", "Vendors");
            DocType.push(3, "أخرى / نوع المستند", "Other");
            DocType.push(4, "موظف / ح.الاستاذ", "Employees");
            DocType.push(36, "أمر شغل انتاجى / ح.الاستاذ", "");
            DocType.push(48, "أمر شغل مركبه / ح.الاستاذ", "");
            DocType.push(51, "خ.ضمان / ح.الاستاذ", "");
            DocType.push(61, "أمر صيانة مركبات / ح.الاستاذ", "");
            DocType.push(64, "أمر صيانة معدات / ح.الاستاذ", "");
            DocType.push(38, "مركبه / ح.الاستاذ", "");
            DocType.push(67, "أصل ثابت / ح.الاستاذ", "");
            DocType.push(78, "مشروعات / ح.الاستاذ", "");
            DocType.push(34, "حساب فرعى من الدليل", "");
            //Customers
            DocType.push(5, "عميل / ح.اضافى 1", "Customers");
            DocType.push(6, "عميل / ح.اضافى 2", "Customers");
            DocType.push(7, "عميل / ح.اضافى 3", "Customers");
            DocType.push(8, "عميل / ح.اضافى 4", "Customers");
            DocType.push(9, "عميل / ح.اضافى 5", "Customers");
            DocType.push(10, "عميل / ح.اضافى 6", "Customers");
            DocType.push(11, "عميل / ح.اضافى 7", "Customers");
            DocType.push(12, "عميل / ح.اضافى 8", "Customers");
            DocType.push(13, "عميل / ح.اضافى 9", "Customers");
            DocType.push(14, "عميل / ح.اضافى 10", "Customers");
            //Vendors
            DocType.push(15, "مورد / ح.اضافى 1", "Vendors");
            DocType.push(16, "مورد / ح.اضافى 2", "Vendors");
            DocType.push(17, "مورد / ح.اضافى 3", "Vendors");
            DocType.push(18, "مورد / ح.اضافى 4", "Vendors");
            DocType.push(19, "مورد / ح.اضافى 5", "Vendors");
            DocType.push(20, "مورد / ح.اضافى 6", "Vendors");
            DocType.push(21, "مورد / ح.اضافى 7", "Vendors");
            DocType.push(22, "مورد / ح.اضافى 8", "Vendors");
            DocType.push(23, "مورد / ح.اضافى 9", "Vendors");
            DocType.push(24, "مورد / ح.اضافى 10", "Vendors");
            //Employees
            DocType.push(35, "موظف / ح.عمولة بيع", "Employees");
            DocType.push(25, "موظف / ح.سلف ", "Employees");
            DocType.push(26, "موظف / ح.عهده ", "Employees");
            DocType.push(27, "موظف / ح.مخصص اجازات ", "Employees");
            DocType.push(28, "موظف / ح.مخصص نهاية الخدمه ", "Employees");
            DocType.push(29, "موظف / ح.ذمـــه ", "Employees");
            DocType.push(30, "موظف / ح.وقت ضائع ", "Employees");
            DocType.push(31, "موظف / ح.مخصص تذاكر ", "Employees");
            DocType.push(32, "موظف / ح.اضافى 8", "Employees");
            DocType.push(33, "موظف / ح.اضافى 9", "Employees");
            //Production
            DocType.push(37, "ح.مصروفات صناعيه", "Production");
            //Vehicles
            DocType.push(39, "مركبه / ح.مصروفات", "Vehicles");
            DocType.push(40, "مركبه / ح.ايرادات", "Vehicles");
            DocType.push(41, "مركبه / ح.مصروف صيانه", "Vehicles");
            DocType.push(42, "مركبه / ح.اضافى 4", "Vehicles");
            DocType.push(43, "مركبه / ح.اضافى 5", "Vehicles");
            DocType.push(44, "مركبه / ح.اضافى 6", "Vehicles");
            DocType.push(45, "مركبه / ح.اضافى 7", "Vehicles");
            DocType.push(46, "مركبه / ح.اضافى 8", "Vehicles");
            DocType.push(47, "مركبه / ح.اضافى 9", "Vehicles");
            //VehicleJobOrder
            DocType.push(49, "أمر شغل مركبه / ح.اضافى1", "VehicleJobOrder");
            DocType.push(50, "أمر شغل مركبه / ح.اضافى2", "VehicleJobOrder");
            //LetterOfGuarantee
            DocType.push(52, "خ.ضمان / ح.مصروفات", "LetterOfGuarantee");
            DocType.push(53, "خ.ضمان / ح.عموله بنكيه", "LetterOfGuarantee");
            DocType.push(54, "خ.ضمان / ح.هامش نقدى", "LetterOfGuarantee");
            DocType.push(55, "خ.ضمان / ح.اضافى 4", "LetterOfGuarantee");
            DocType.push(56, "خ.ضمان / ح.اضافى 5", "LetterOfGuarantee");
            DocType.push(57, "خ.ضمان / ح.اضافى 6", "LetterOfGuarantee");
            DocType.push(58, "خ.ضمان / ح.اضافى 7", "LetterOfGuarantee");
            DocType.push(59, "خ.ضمان / ح.اضافى 8", "LetterOfGuarantee");
            DocType.push(60, "خ.ضمان / ح.اضافى 9", "LetterOfGuarantee");
            //VehicleRepairOrder
            DocType.push(62, "أمر صيانة مركبات / ح.اضافى 1", "VehicleRepairOrder");
            DocType.push(63, "أمر صيانة مركبات / ح.اضافى 2", "VehicleRepairOrder");
            //MachineRepairOrder
            DocType.push(65, "أمر صيانة معدات / ح.اضافى 1", "MachineRepairOrder");
            DocType.push(66, "أمر صيانة معدات / ح.اضافى 2", "MachineRepairOrder");
            //FixedAsset
            DocType.push(68, "أصل ثابت / ح.الإستهلاك", "FixedAsset");
            DocType.push(69, "أصل ثابت / ح.مجمع الإهلاك", "FixedAsset");
            DocType.push(70, "أصل ثابت / ح.المصاريف", "FixedAsset");
            DocType.push(71, "أصل ثابت / ح.أرباح رأسماليه", "FixedAsset");
            DocType.push(72, "أصل ثابت / ح.خسائر رأسماليه", "FixedAsset");
            DocType.push(73, "أصل ثابت / ح.فائض اعادة تقييم", "FixedAsset");
            DocType.push(74, "أصل ثابت / ح.عجز اعادة تقييم", "FixedAsset");
            DocType.push(75, "أصل ثابت / ح.اضافى 8", "FixedAsset");
            DocType.push(76, "أصل ثابت / ح.اضافى 9", "FixedAsset");
            DocType.push(77, "أصل ثابت / ح.اضافى 10", "FixedAsset");
            //Projects
            DocType.push(79, "مشروعات / ح.اضافى 1", "Projects");
            DocType.push(80, "مشروعات / ح.اضافى 2", "Projects");
            DocType.push(81, "مشروعات / ح.اضافى 3", "Projects");
            DocType.push(82, "مشروعات / ح.اضافى 4", "Projects");
            DocType.push(83, "مشروعات / ح.اضافى 5", "Projects");
            DocType.push(84, "مشروعات / ح.اضافى 6", "Projects");
            DocType.push(85, "مشروعات / ح.اضافى 7", "Projects");
            DocType.push(86, "مشروعات / ح.اضافى 8", "Projects");
            DocType.push(87, "مشروعات / ح.اضافى 9", "Projects");
            DocType.push(88, "مشروعات / ح.اضافى 10", "Projects");
        }
        else {
            DocType.push(0, "Choose Type", "");
            DocType.push(1, "Customer Account", "Customers");
            DocType.push(2, "Vendor Account", "Vendor");
            DocType.push(3, "Other / Term Effect", "Other");
            DocType.push(4, "Employee Account", "Employee");
            DocType.push(36, "Production Job Order", "");
            DocType.push(48, "Vehicle Job Order", "");
            DocType.push(51, "LG Account", "");
            DocType.push(61, "Vehicle repair order", "");
            DocType.push(64, "Machine repair order", "");
            DocType.push(38, "Vehicle Account", "");
            DocType.push(67, "Fixed asset account", "");
            DocType.push(78, "Projects / Account", "");
            DocType.push(34, "Gl Account", "");
            //Customers
            DocType.push(5, "Customer Add account 1", "Customers");
            DocType.push(6, "Customer Add account 2", "Customers");
            DocType.push(7, "Customer Add account 3", "Customers");
            DocType.push(8, "Customer Add account 4", "Customers");
            DocType.push(9, "Customer Add account 5", "Customers");
            DocType.push(10, "Customer Add account 6", "Customers");
            DocType.push(11, "Customer Add account 7", "Customers");
            DocType.push(12, "Customer Add account 8", "Customers");
            DocType.push(13, "Customer Add account 9", "Customers");
            DocType.push(14, "Customer Add account 10", "Customers");
            //Vendors
            DocType.push(15, "Vendor Add account 1", "Vendors");
            DocType.push(16, "Vendor Add account 2", "Vendors");
            DocType.push(17, "Vendor Add account 3", "Vendors");
            DocType.push(18, "Vendor Add account 4", "Vendors");
            DocType.push(19, "Vendor Add account 5", "Vendors");
            DocType.push(20, "Vendor Add account 6", "Vendors");
            DocType.push(21, "Vendor Add account 7", "Vendors");
            DocType.push(22, "Vendor Add account 8", "Vendors");
            DocType.push(23, "Vendor Add account 9", "Vendors");
            DocType.push(24, "Vendor Add account 10", "Vendors");
            //Employees
            DocType.push(35, "Sales commission", "Employees");
            DocType.push(25, "Lending account", "Employees");
            DocType.push(26, "Consignment account", "Employees");
            DocType.push(27, "Vacations account", "Employees");
            DocType.push(28, "Indemnity account", "Employees");
            DocType.push(29, "Debtors account", "Employees");
            DocType.push(30, "Idle time account", "Employees");
            DocType.push(31, "Tickets account", "Employees");
            DocType.push(32, "Employee Add account 8", "Employees");
            DocType.push(33, "Employee Add account 9", "Employees");
            //Production
            DocType.push(37, "Production Expenses", "Production");
            //Vehicles
            DocType.push(39, "Vehicle Expenses Account", "Vehicles");
            DocType.push(40, "Vehicle Revenue Account", "Vehicles");
            DocType.push(41, "Vehicle Maintenance Expense Acc", "Vehicles");
            DocType.push(42, "Vehicle Add account 4", "Vehicles");
            DocType.push(43, "Vehicle Add account 5", "Vehicles");
            DocType.push(44, "Vehicle Add account 6", "Vehicles");
            DocType.push(45, "Vehicle Add account 7", "Vehicles");
            DocType.push(46, "Vehicle Add account 8", "Vehicles");
            DocType.push(47, "Vehicle Add account 10", "Vehicles");
            //VehicleJobOrder
            DocType.push(49, "Vehicle Job Order Add Acc2", "VehicleJobOrder");
            DocType.push(50, "Vehicle Job Order Add Acc2", "VehicleJobOrder");
            //LetterOfGuarantee
            DocType.push(52, "LG / Bank expense", "LetterOfGuarantee");
            DocType.push(53, "LG / Bank commision", "LetterOfGuarantee");
            DocType.push(54, "LG / Cash margin", "LetterOfGuarantee");
            DocType.push(55, "LG / Add account 4", "LetterOfGuarantee");
            DocType.push(56, "LG / Add account 5", "LetterOfGuarantee");
            DocType.push(57, "LG / Add account 6", "LetterOfGuarantee");
            DocType.push(58, "LG / Add account 7", "LetterOfGuarantee");
            DocType.push(59, "LG / Add account 8", "LetterOfGuarantee");
            DocType.push(60, "LG / Add account 9", "LetterOfGuarantee");
            //VehicleRepairOrder
            DocType.push(62, "Vehicle repair order / Add account 1", "VehicleRepairOrder");
            DocType.push(63, "Vehicle repair order / Add account 2", "VehicleRepairOrder");
            //MachineRepairOrder
            DocType.push(65, "Machine repair order / Add account 1", "MachineRepairOrder");
            DocType.push(66, "Machine repair order / Add account 2", "MachineRepairOrder");
            //FixedAsset
            DocType.push(68, "Fixed asset / Depreciation account", "FixedAsset");
            DocType.push(69, "Fixed asset / Depreciation collection Acc", "FixedAsset");
            DocType.push(70, "Fixed asset / Expenses Account", "FixedAsset");
            DocType.push(71, "Fixed asset / Capital profits Account", "FixedAsset");
            DocType.push(72, "Fixed asset / Capital losses Account", "FixedAsset");
            DocType.push(73, "Fixed asset / Reevaluation surplus Account", "FixedAsset");
            DocType.push(74, "Fixed asset / Reevaluation shortage Account", "FixedAsset");
            DocType.push(75, "Fixed asset / Add account 8", "FixedAsset");
            DocType.push(76, "Fixed asset / Add account 9", "FixedAsset");
            DocType.push(77, "Fixed asset / Add account 10", "FixedAsset");
            //Projects
            DocType.push(79, "Projects / Add account 1", "Projects");
            DocType.push(80, "Projects / Add account 2", "Projects");
            DocType.push(81, "Projects / Add account 3", "Projects");
            DocType.push(82, "Projects / Add account 4", "Projects");
            DocType.push(83, "Projects / Add account 5", "Projects");
            DocType.push(84, "Projects / Add account 6", "Projects");
            DocType.push(85, "Projects / Add account 7", "Projects");
            DocType.push(86, "Projects / Add account 8", "Projects");
            DocType.push(87, "Projects / Add account 9", "Projects");
            DocType.push(88, "Projects / Add account 10", "Projects");
        }
        for (var i = 0; i < DocType.length; i++) {
            obj = obj = { Key: 0, Value: "", Type: "" };
            obj.Key = DocType[i];
            obj.Value = DocType[i + 1];
            obj.Type = DocType[i + 2];
            RectSourceTypeArr.push(obj);
            i = i + 2;
        }
        DocumentActions.FillComboWithDefultArrayOneValue(RectSourceTypeArr, RectSourceType, "Key", "Value", Resource.Side, "Type");
        return RectSourceTypeArr;
    }
    function SetNewSelectNodes(labelText, selectId) {
        if (labelText == "" && selectId == "") {
            $('#selectMode select').html("");
            return false;
        }
        $('#selectMode label').text(labelText);
        $('#selectMode select').attr('id', selectId).attr('name', selectId);
    }
    function GetCustomers() {
        CustomerId = document.getElementById("CustomerId");
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("funcationShared", "GetCustomers"),
            success: function (Response) {
                var result = Response;
                if (result.IsSuccess) {
                    var Customers = result.Response;
                    DocumentActions.FillCombowithCode(Customers, CustomerId, "CustomerId", (language == "ar" ? "CustomerDescA" : "CustomerDescE"), "CustomerCode", Resource.Client);
                }
            }
        });
    }
    function GetEmployees() {
        EmpId = document.getElementById("EmpId");
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("funcationShared", "GetEmployees"),
            success: function (Response) {
                var result = Response;
                if (result.IsSuccess) {
                    var Employees = result.Response;
                    DocumentActions.FillCombowithCode(Employees, EmpId, "EmpId", (language == "ar" ? "Name1" : "Name2"), "EmpCode", Resource.Employee);
                }
            }
        });
    }
    function GetVendor() {
        VendorId = document.getElementById("VendorId");
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("funcationShared", "GetVendor"),
            success: function (Response) {
                var result = Response;
                if (result.IsSuccess) {
                    var vendors = result.Response;
                    DocumentActions.FillCombowithCode(vendors, VendorId, "VendorId", (language == "ar" ? "VendorDescA" : "VendorDescE"), "VendorCode", Resource.I_Vendor);
                }
            }
        });
    }
    function GetTotalForDetails() {
        var ItemTotalCurr = 0, ItemTotallocal = 0, Rate = Number($("#Rate").val());
        for (var i = 0; i < Details.length; i++) {
            var Quantity = Details[i].Quantity, Price = Details[i].Price;
            ItemTotalCurr = ItemTotalCurr + (Quantity * Price);
            ItemTotallocal = ItemTotalCurr * Rate;
        }
        $("#InvTotal").val(ItemTotalCurr);
        $("#InvTotalAfterRate").val(ItemTotallocal);
    }
})(PurchasInvoice || (PurchasInvoice = {}));
//# sourceMappingURL=MS_PurchasInvoice.js.map