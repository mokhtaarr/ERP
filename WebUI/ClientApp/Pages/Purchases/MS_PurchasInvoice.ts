$(document).ready(() => {
    SharedButtons.OnLoad();
    PurchasInvoice.InitalizeComponent();
})

namespace PurchasInvoice {
    $('#headertop1').addClass('display_none');
    $('#headertop2').removeClass('display_none');
    let Resource: any = GetResourceList("");
    $('#headerTitle').text(Resource.Purchase_Invoice);
    
    var sys: SystemTools = new SystemTools();
    var SysSession: SystemSession = GetSystemSession();
    var language = SysSession.CurrentEnvironment.ScreenLanguage;
    var env = sys.SysSession.CurrentEnvironment;

    let compCode = SysSession.CurrentEnvironment.CompCode;
    let UserCode = SysSession.CurrentEnvironment.UserCode;
    let Token = "HGFD-" + SysSession.CurrentEnvironment.Token;

    var Data = new Array();
    var Model: MS_PurchasInvoice = new MS_PurchasInvoice();
    var PurchasInvoices: Array<SharedVM> = new Array<SharedVM>();

    var Details: Array<MS_PurchaseInvoiceItemCard> = new Array<MS_PurchaseInvoiceItemCard>();
    var DetailsPros: Array<MS_PurchaseInvoiceItemCard> = new Array<MS_PurchaseInvoiceItemCard>();

    var DeatilsAndModel: PurchasInvoiceAndDetail = new PurchasInvoiceAndDetail();

    var Terms: Array<Ms_Terms> = new Array<Ms_Terms>();
    var Currencies: Array<MS_Currency> = new Array<MS_Currency>();
    var Books: Array<Sys_Books> = new Array<Sys_Books>();
    var Items: Array<ItemsVM> = new Array<ItemsVM>();
    var ItemVM: any;

    var ItemUnits = new Array<Ms_ItemUnitVM>();

    // select Options
    var element: HTMLInputElement;

    var TermId: HTMLSelectElement,
        RectSourceType: HTMLSelectElement,
        RectSourceType: HTMLSelectElement,
        SelectMode_RectSourceType: string[] = [],
        CustomerId: HTMLSelectElement,
        EmpId: HTMLSelectElement,
        VendorId: HTMLSelectElement,
        CurrencyId: HTMLSelectElement,
        BookId: HTMLSelectElement;

    var ObjectId = 0;
    var StatusFlag;
    var Success;
    var trId = "_idAdd";
    var hasNodes: boolean;
    var pageLoaded: boolean = false;
    var flag: boolean = true;
    var flagTotal: boolean = true;
    var AccountId: number;
    var rowId: string;

    var divDetailGrid: JsGrid = new JsGrid();
    var grid: JsGrid = new JsGrid();

    var datatable;
    export function InitalizeComponent() {
        localStorage.setItem("TableName", "MS_PurchasInvoice");
        NavigateModule.InitalizeComponent();
        SharedButtons.compcode = Number(SysSession.CurrentEnvironment.CompCode);
        SharedWork.OnNavigate = Navigate;

        SharedButtons.AddAction(() => { btnAdd_onclick(); });

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

        try {
            InitalizeControls();
            InitalizeEvents();
            GetAll();
            GetItems();

            GetCurrency();
            GetAllTerms(1);
            GetJournalEntryBooks(1);
            GetRectSourceType();

            InitializeDetailGrid();
        } catch (e) { }
    }

    function InitalizeControls() {
        SharedButtons.btnSearch = document.getElementById("btnMS_PurchasInvoiceSearch") as HTMLButtonElement;
        TermId = document.getElementById("TermId") as HTMLSelectElement;
        BookId = document.getElementById("BookId") as HTMLSelectElement;
        RectSourceType = document.getElementById("RectSourceType") as HTMLSelectElement;
        CurrencyId = document.getElementById("CurrencyId") as HTMLSelectElement;
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
            let type = $('#' + RectSourceType.id).find('option:selected').attr('type');
            if (!IsNullOrEmpty(type)) {
                switch (type) {
                    case "Customers":
                        SetNewSelectNodes(Resource.Client, "CustomerId")
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
                        SetNewSelectNodes("", "")
                        break;
                }
            } else
                SetNewSelectNodes("", "");
        };
    }

    function GetAll() {
        Disabled(false);
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("MS_PurchasInvoice", "GetAll"),
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess) {
                    ClearGrids();
                    PurchasInvoices = result.Response as Array<SharedVM>;
                }
            }
        });
    }

    function GetByID(Id: number) {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("MS_PurchasInvoice", "GetById"),
            data: { id: Id },
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess) {
                    DeatilsAndModel = result.Response as PurchasInvoiceAndDetail;
                    Model = DeatilsAndModel.Model;
                    Display(Model);

                    divDetailGrid.DataSource = DeatilsAndModel.Details;
                    divDetailGrid.Bind();
                    SharedWork.SwitchModes(ScreenModes.Query);
                }
                else
                    MessageBox.Show(Resource.Error, Resource.Error);
            }
        });
    }

    function Assign() {
        DeatilsAndModel.Model = DocumentActions.AssignToModel<MS_PurchasInvoice>(Model);
        DeatilsAndModel.Details = DocumentActions.AssignArr(Details, DetailsPros);

        if (StatusFlag == "i") {
            Model.CreatedAt = DateTimeFormat(Date().toString());
            Model.CreatedBy = SysSession.CurrentEnvironment.UserCode;
            Insert();
        }

        if (StatusFlag == "u") {
            // Model.PurInvId = ObjectId;
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
            success: (Response) => {
                let result = Response as BaseResponse;
                if (result.IsSuccess) {
                    Model = result.Response as MS_PurchasInvoice;
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
            success: (Response) => {
                let result = Response as BaseResponse;
                if (result.IsSuccess) {
                    Model = result.Response as MS_PurchasInvoice
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
            success: (result) => {
                if (result) {
                    Success = true;
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
        StatusFlag = 'i';
        RemoveDisabled(true);

        element = DocumentActions.GetElementByName("TrNo");
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

            element = DocumentActions.GetElementByName("BookId");
            element.disabled = true;
            StatusFlag = 'u';
        }
    }

    function btnsave_onClick() {
        if (!ValidationHeader()) return
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
        //if (DocumentActions.GetElementByName("TrNo").value == "") {
        //    MessageBox.Show(Resource.PleaseEnterCustomerCode, Resource.Error);
        //    return false
        //}
        //else if (DocumentActions.GetElementByName("Name1").value == "") {
        //    MessageBox.Show(Resource.PleaseEnterNameArabic, Resource.Error);
        //    return false
        //}
        if (!flagTotal) {
            MessageBox.Toastr("لحفظ المستند لابد اجمالى المدين  = اجمالى الدائن", Resource.Error, ToastrTypes.error);
            flag = flagTotal;
        }
        return flag;
    }

    export function Navigate() {
        ObjectId = PurchasInvoices[SharedWork.PageIndex - 1]?.Id;
        if (ObjectId != 0)
            GetByID(ObjectId);
    }

    function InitializeDetailGrid() {
        divDetailGrid.ElementName = "divDetailGrid";
        divDetailGrid.PrimaryKey = "InvItemCardId";
        divDetailGrid.Inserting = true;
        divDetailGrid.Editing = true;
        divDetailGrid.Paging = true;
        divDetailGrid.PageSize = 10;
        divDetailGrid.ConfirmDeleteing = true;
        divDetailGrid.InsertionMode = JsGridInsertionMode.Binding;
        divDetailGrid.OnItemEditing = (e: JsGridUpdateEventArgs) => { trId = "_idEdit"; };
        divDetailGrid.OnItemInserting = InsertItem;
        divDetailGrid.OnItemUpdating = UpdateItem
        divDetailGrid.OnItemDeleting = DeleteItem;
        divDetailGrid.Columns = [
            {
                title: "#", name: "btnAddItem", visible: true, type: "control", modeSwitchButton: true, editButton: true
            },
            {
                title: Resource.Itm_ItemCode, css: "ColumPadding", name: "ItemCode", id: "ItemCode",
                itemTemplate: function (data, row: MS_PurchaseInvoiceItemCard) {
                    trId = "_idAdd";
                    return GetItem(row).value;
                },
                editTemplate: function (data, row: MS_PurchaseInvoiceItemCard) {
                    return GetItem(row);
                },
                insertTemplate: function (data, row = new MS_PurchaseInvoiceItemCard()) {
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
                    let Dropdown = CreateDropdownList(ItemUnits, "UnitNam", "UnitNameE", "UnitId", null, "UnitNam", false);
                    return Dropdown;
                },
                editTemplate: function (data, row: MS_PurchaseInvoiceItemCard) {
                    ItemUnits = GetUnitsById(row.ItemCardId);
                    let Dropdown = CreateDropdownList(ItemUnits, "UnitNam", "UnitNameE", "UnitId", null, "UnitNam", false, row.UnitId.toString());
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

    function InsertItem(e: JsGridInsertEventArgs) {
        let item = e.Item as MS_PurchaseInvoiceItemCard;
        item.StatusFlag = 'i';

        item = GetNewUnit(item);

        let ItemCard: MS_PurchaseInvoiceItemCard = Details.filter(x => x.ItemCardId == item.ItemCardId && x.UnitId == item.UnitId)[0];

        if (ItemCard == null)
            Details.push(item);
        else
            toastr.error(language == "ar" ? "هذا الصنف موجود بالفعل" : "This item already exists");

        divDetailGrid.DataSource = Details;
        divDetailGrid.Bind();
        DocumentActions.ChangeSelectToSearchable("divDetailGrid");
    }

    function UpdateItem(e: JsGridUpdateEventArgs) {
        debugger
        let item = e.Item as MS_PurchaseInvoiceItemCard;
        var index: number = e.ItemIndex;
        item.StatusFlag = 'u';
        item = GetNewUnit(item);

        divDetailGrid.DataSource = Details;
        divDetailGrid.Bind();

        PushItemChanged(item, index);
    }

    function DeleteItem(e: JsGridDeleteEventArgs) {
        debugger
        let item = e.Item as MS_PurchaseInvoiceItemCard;
        var index: number = e.ItemIndex;
        item.StatusFlag = 'd';

        PushItemChanged(item, index);
    }

    function PushItemChanged(item: MS_PurchaseInvoiceItemCard, index: number) {
        Details.splice(index, 1);
        let ItemCard: MS_PurchaseInvoiceItemCard = DetailsPros.filter(x => x.ItemCardId != item.ItemCardId && x.UnitId != item.UnitId)[0];

        if (ItemCard == null)
            DetailsPros.push(item);
    }
    
    function GetNewUnit(item: MS_PurchaseInvoiceItemCard) {
        item.UnitId = $("#" + trId + " #UnitNam").val();

        let unite = ItemUnits.filter(x => x.UnitId == item.UnitId)[0];
        item.UnitNam = language == "ar" ? unite.UnitNam : unite.UnitNameE;

        return item;
    }

    function GetItem(row: MS_PurchaseInvoiceItemCard) {
        let itemCard = Items.filter(x => x.GiftItemCardId == row.ItemCardId && x.GiftUnitId == row.UnitId)[0],
            code = itemCard == null ? "" : itemCard.ItemCode;

        try {
            row.PurInvId = ObjectId;
            row.ItemDescA = itemCard.ItemDescA;
            row.ItemDescE = itemCard.ItemDescE;
            row.BarCode = itemCard.BarCode1;
            row.UnitRate = itemCard.UnittRate;

            row.UnitNam = language == "ar" ? itemCard.UnitNam : itemCard.UnitNameE;

            if (SharedWork.CurrentMode == ScreenModes.Add || SharedWork.CurrentMode == ScreenModes.Edit)
                row.StatusFlag = IsNullOrEmpty(row.InvItemCardId.toString()) ? 'i' : 'u';
        } catch (e) { }

        let txt = CreateElement("text", "", code, null, "ItemCode", null);
        txt.ondblclick = function () {
            findItems(Items, () => {
                let id = SearchGrid.SearchDataGrid.SelectedKey;
                if (!IsNullOrEmpty(id)) {
                    ItemVM = SearchGrid.SearchDataGrid.SelectedItem as ItemsVM;
                    SetItem(ItemVM);
                }
            });
        }
        return txt
    }

    function SetItem(item: ItemsVM) {
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
            success: (Response) => {
                let result = Response as BaseResponse;
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

    function findItems(Items, OnSearchSelected: () => void) {
        if (Items == null) {
            MessageBox.Toastr("Search not available, Please call your app administrator", "Search", ToastrTypes.error);
            return;
        }

        $("#tableDiv").parent().addClass("tableDivPerant");

        let columns = GetcolumnsObject(Items) as Array<datatableColumn>;

        SearchGrid.SearchDataGrid = new DataTable();
        SearchGrid.SearchDataGrid.Columns = columns;

        SearchGrid.SearchDataGrid.dataScr = Items;
        SearchGrid.SearchDataGrid.ElementName = "SearchDataTable";
        SearchGrid.SearchDataGrid.PrimaryKey = "GiftItemCardId"; //"RowIndex";
       
        SearchGrid.SearchDataGrid.Bind();

        SearchGrid.SearchDataGrid.OnDoubleClick = () => {
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

        $(".ui-igedit-input").keyup((e) => { });
        $("#SearchBox").modal("show");//.css("display", "");//
        $("#SearchDataTable").css("width", "100%");
        $("#SearchDataTable").css("height", "100%");
    }

    function GetcolumnsObject(obj) {
        let Columns: Array<datatableColumn> = new Array<datatableColumn>();
        try {
            let properties = Object.getOwnPropertyNames(obj[0]);
            for (var property of properties) {
                let Column: datatableColumn = {
                    headerText: property,
                    hidden: false,
                    key: property,
                    width: "100px",
                };
                Columns.push(Column);
            }
        } catch (e) { }
        return Columns;
    }

    $("#Rate").on('change', CalculatePrice);

    function CalculatePrice() {
        let Quantity = $("#" + trId + " #Quantity").val(),
            Price = $("#" + trId + " #Price").val() as number;
        if (Quantity == 0 || Price == 0)
            return;

            let Rate = $("#Rate").val(),
            ItemTotal = Quantity * Price,
            PriceAfterCurr = Price * Rate,
            ItemTotalAfterRate = ItemTotal * Rate as number;

        $("#" + trId + " #ItemTotal").val(ItemTotal);
        $("#" + trId + " #PriceAfterCurr").val(PriceAfterCurr);
        $("#" + trId + " #ItemTotalAfterRate").val(ItemTotalAfterRate);
    }

    function Display(model: MS_PurchasInvoice) {
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

    function Disabled(clear: boolean) {
        DocumentActions.allElements(true, clear, Model);
        $(".selectModeInput").prop('disabled', true);
    }

    function RemoveDisabled(clear: boolean) {
        DocumentActions.allElements(false, clear, Model);
        $(".selectModeInput").prop('disabled', false);
    }

    function GetAllTerms(type: number) {
        Ajax.Callsync({
            type: "Get",
            data: { type: type },
            url: sys.apiUrl("funcationShared", "GetAllTerms"),
            success: (Response) => {
                let result = Response as BaseResponse;
                if (result.IsSuccess) {
                    Terms = result.Response as Array<Ms_Terms>;
                    DocumentActions.FillCombowithdefult(Terms, TermId, "TermId", "TermName", Resource.DocumentType);
                }
            }
        });
    }

    function GetCurrency() {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("funcationShared", "GetCurrencies"),
            success: (Response) => {
                let result = Response as BaseResponse;
                if (result.IsSuccess) {
                    Currencies = result.Response as Array<MS_Currency>;
                    DocumentActions.FillCombowithCode(Currencies, CurrencyId, "CurrencyId", (language == "ar" ? "CurrencyDescA" : "CurrencyDescE"), "CurrencyCode", Resource.Currency);
                }
            }
        });
    }

    function GetUnitsById(id: number) {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("funcationShared", "GetUnitsById") + "/" + id,
            success: (Response) => {
                let result = Response as BaseResponse;
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

    function BulidUnitDrop(id: number) {
        ItemUnits = GetUnitsById(id);

        $("#" + trId + " #UnitNam").find('option').remove();
        let tem = '';
        for (var i = 0; i < ItemUnits.length; i++) {
            tem += '<option value="' + ItemUnits[i].UnitId + '">' + (language == "ar" ? ItemUnits[i].UnitNam : ItemUnits[i].UnitNameE) + '</option>';
        }
        $("#" + trId + " #UnitNam").append(tem);
    }

    function GetJournalEntryBooks(type: number) {
        Ajax.Callsync({
            type: "Get",
            data: { type: type },
            url: sys.apiUrl("funcationShared", "GetAllBooks"),
            success: (Response) => {
                let result = Response as BaseResponse;
                if (result.IsSuccess) {
                    Books = result.Response as Array<Sys_Books>;
                    DocumentActions.FillCombowithCode(Books, BookId, "BookId", (language == "ar" ? "BookNameAR" : "BookNameEN"), "PrefixCode", "");
                }
            }
        });
    }

    function GetMaxTrNo(BookId: number) {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("Ms_ReceiptNote", "GetMaxTrNo"),
            data: { bookId: BookId },
            success: (Response) => {
                element = DocumentActions.GetElementByName("TrNo");
                element.value = Response;
            }
        });
    }

    function SetCurrencyById(trId, id: number, element: HTMLElement) {
        let Currency = Currencies.filter(x => x.CurrencyId == id)[0];
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
        Details = new Array<MS_PurchaseInvoiceItemCard>();
        DetailsPros = new Array<MS_PurchaseInvoiceItemCard>();
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
        let sys: SystemTools = new SystemTools();
        sys.FindKey(Modules.PurchasInvoice, SharedButtons.btnSearch.id, "", () => {
            let id = SearchGrid.SearchDataGrid.SelectedKey;
            if (!IsNullOrEmpty(id)) {
                GetByID(ObjectId);
            }
        });
    }

    function Refrash() {
        //ClearGrids();
        GetAll();
        GetByID(ObjectId);
    }

    function GetRectSourceType() {
        let DocType = new Array();
        let RectSourceTypeArr = new Array();
        let obj = { Key: 0, Value: "", Type: "" };

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

        DocumentActions.FillComboWithDefultArrayOneValue(RectSourceTypeArr, RectSourceType, "Key", "Value", Resource.Side, "Type")
        return RectSourceTypeArr;
    }

    function SetNewSelectNodes(labelText: string, selectId: string) {
        if (labelText == "" && selectId == "") {
            $('#selectMode select').html("");
            return false;
        }

        $('#selectMode label').text(labelText);
        $('#selectMode select').attr('id', selectId).attr('name', selectId);
    }

    function GetCustomers() {
        CustomerId = document.getElementById("CustomerId") as HTMLSelectElement;
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("funcationShared", "GetCustomers"),
            success: (Response) => {
                let result = Response as BaseResponse;
                if (result.IsSuccess) {
                    let Customers = result.Response as Array<MS_Customer>;
                    DocumentActions.FillCombowithCode(Customers, CustomerId, "CustomerId", (language == "ar" ? "CustomerDescA" : "CustomerDescE"), "CustomerCode", Resource.Client);
                }
            }
        });
    }

    function GetEmployees() {
        EmpId = document.getElementById("EmpId") as HTMLSelectElement;
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("funcationShared", "GetEmployees"),
            success: (Response) => {
                let result = Response as BaseResponse;
                if (result.IsSuccess) {
                    let Employees = result.Response as Array<Hr_Employees>;
                    DocumentActions.FillCombowithCode(Employees, EmpId, "EmpId", (language == "ar" ? "Name1" : "Name2"), "EmpCode", Resource.Employee);
                }
            }
        });
    }

    function GetVendor() {
        VendorId = document.getElementById("VendorId") as HTMLSelectElement;
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("funcationShared", "GetVendor"),
            success: (Response) => {
                let result = Response as BaseResponse;
                if (result.IsSuccess) {
                    let vendors = result.Response as Array<MS_Vendor>;
                    DocumentActions.FillCombowithCode(vendors, VendorId, "VendorId", (language == "ar" ? "VendorDescA" : "VendorDescE"), "VendorCode", Resource.I_Vendor);
                }
            }
        });
    }
}
