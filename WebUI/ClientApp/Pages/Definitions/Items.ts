$(document).ready(() => {
    SharedButtons.OnLoad();
    Items.InitalizeComponent();
    $('#headertop1').addClass('display_none');
    $('#headertop2').removeClass('display_none');
    //$('.Offers-ToDate input,.Offers-FromDate input').datepicker();
})

namespace Items {
    var sys: SystemTools = new SystemTools();
    var env = sys.SysSession.CurrentEnvironment;
    var lang = env.ScreenLanguage;
    var format = "YYYY-MM-DD",
        formatDatePi = 'yy-mm-dd';

    let Resource: any = GetResourceList("");
    $('#headerTitle').text(Resource.Men_StkDefItems);

    var ItemCardDetailes: MS_ItemCardDetailesVM = new MS_ItemCardDetailesVM();
    var ItemCards: Array<MS_ItemCard> = new Array<MS_ItemCard>();
    var Model: MS_ItemCard = new MS_ItemCard();

    var itemGrid: JsGrid = new JsGrid();
    var SuppliersGrid: JsGrid = new JsGrid();
    var OffersGrid: JsGrid = new JsGrid();
    var AttributesGrid: JsGrid = new JsGrid();
    var UnitsPricesGrid: JsGrid = new JsGrid();
    var ItemAlternativesGrid: JsGrid = new JsGrid();
    var ItemCollectionGrid: JsGrid = new JsGrid();
    var ItemCardExpensesGrid: JsGrid = new JsGrid();

    var Vendors: Array<MS_Vendor> = new Array<MS_Vendor>();
    var ItemVendors: Array<MS_ItemVendors> = new Array<MS_ItemVendors>();
    var ItemVendorsPros: Array<MS_ItemVendors> = new Array<MS_ItemVendors>();

    var Attributes: Array<Prod_ItemAttributes> = new Array<Prod_ItemAttributes>();
    var AttributsJoin: Array<Prod_ItemAttributsJoin> = new Array<Prod_ItemAttributsJoin>();
    var AttributsJoinPros: Array<Prod_ItemAttributsJoin> = new Array<Prod_ItemAttributsJoin>();

    var ItemPartition: Array<Ms_ItemPartition> = new Array<Ms_ItemPartition>();
    var ItemCardOffers: Array<Ms_ItemCardOffers> = new Array<Ms_ItemCardOffers>();
    var ItemCardOffersPros: Array<Ms_ItemCardOffers> = new Array<Ms_ItemCardOffers>();

    var ItemImages: Array<MS_ItemImages> = new Array<MS_ItemImages>();

    var BasicUnits: Array<Prod_BasicUnits> = new Array<Prod_BasicUnits>();
    var ItemUnit: Array<Ms_ItemUnit> = new Array<Ms_ItemUnit>();
    var ItemUnitPros: Array<Ms_ItemUnit> = new Array<Ms_ItemUnit>();

    var ItemAlternatives: Array<MS_ItemAlternatives> = new Array<MS_ItemAlternatives>();
    var ItemAlternativesPros: Array<MS_ItemAlternatives> = new Array<MS_ItemAlternatives>();

    var ItemCollection: Array<Ms_ItemCollection> = new Array<Ms_ItemCollection>();
    var ItemCollectionPros: Array<Ms_ItemCollection> = new Array<Ms_ItemCollection>();

    var ItemCardExpenses: Array<Prod_ItemcardExpenses> = new Array<Prod_ItemcardExpenses>();
    var ItemCardExpensesPros: Array<Prod_ItemcardExpenses> = new Array<Prod_ItemcardExpenses>();


    var ItemCategory: Array<SharedVM> = new Array<SharedVM>();
    var Partitions: Array<SharedVM> = new Array<SharedVM>();
    var Items: Array<ItemsVM> = new Array<ItemsVM>();
    var ExpensesAccount: Array<SharedVM> = new Array<SharedVM>();

    var GiftUnits = new Array<Ms_ItemUnitVM>();
    var ItemCardUnits = new Array<Ms_ItemUnitVM>();

    var fileInput;
    var trId = "_idAdd";
    var ObjectId = 0;
    var StatusFlag;
    var Success;
    var hasNodes: boolean;
    var pageLoaded: boolean = false;
    var flag: boolean = true;
    var element: HTMLInputElement;
    var slectOpt: HTMLSelectElement;
    var BasUnitId: HTMLSelectElement;
    //let imagesBase64 = [];

    export function InitalizeComponent() {
        localStorage.setItem("TableName", "MS_ItemCard");

        NavigateModule.InitalizeComponent();

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

        InitalizeControls();
        InitalizeEvents();
        GetAll();

        InitializeGrid();
        InitializeSuppliersGrid();
        InitializeOffersGrid();
        InitializeAttributesGrid();
        InitializeUnitsPricesGrid();
        InitializeItemAlternativesGrid();
        InitializeItemCollectionGrid();
        InitializeItemcardExpensesGrid();

        FillDropdownPeriod("PeriodType");
        FillDropdownPeriod("WarantyPeriodType");
        FillDropdownItemType("ItemType");
    }

    function GetAll() {
        EmptyDeletedList();
        FillSelectOption();
        Disabled(false);

        Ajax.Callsync({
            type: "GET",
            url: sys.apiUrl("MS_ItemCard", "GetAll"),
            success: (d) => {
                let res = d as BaseResponse;
                if (res.IsSuccess) {
                    ItemCards = res.Response as Array<MS_ItemCard>;
                    itemGrid.DataSource = ItemCards;
                    itemGrid.Bind();
                }
            }
        });
    }

    function InitalizeControls() {
        SharedButtons.btnRefrash2 = document.getElementById("btnRefrash") as HTMLButtonElement;
        SharedButtons.btnSearch = document.getElementById("btnMS_ItemCardSearch") as HTMLButtonElement;
        BasUnitId = document.getElementById("BasUnitId") as HTMLSelectElement;
        fileInput = document.getElementById('ItemImages');
    }

    function InitalizeEvents() {
        SharedButtons.btnRefrash2.onclick = Refrash;
        SharedButtons.btnSearch.onclick = btnSearch_onclick;

        // Listen for the change event so we can capture the file
        fileInput.addEventListener('change', (e) => {
            //imagesBase64 = [];
            for (let i = 0; i < fileInput.files.length; i++) {
                getBase64(fileInput.files[i]);
            }
        });

        BasUnitId.onchange = function () {
            if (!IsNullOrEmpty(BasUnitId.value) && SharedWork.CurrentMode == ScreenModes.Add) {
                GetBasicUnitsChildren(Number(BasUnitId.value))
            } else {
                ItemUnit = new Array<Ms_ItemUnit>();
                UnitsPricesGrid.DataSource = ItemUnit;
                UnitsPricesGrid.Bind();
            }
        };
    }

    function Navigate() {
        Model = ItemCards[SharedWork.PageIndex - 1];
        ObjectId = Model.ItemCardId;
        if (ObjectId != 0)
            GetByID(ObjectId);
    }

    function GetByID(id: number) {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("MS_ItemCard", "GetById"),
            data: { id: id },
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess) {
                    ItemCardDetailes = result.Response as MS_ItemCardDetailesVM;

                    Model = ItemCardDetailes.Model;
                    Display(Model);
                    GetItemPartition(Model.ItemCardId);
                    FillGrid(ItemCardDetailes);

                    SharedWork.SwitchModes(ScreenModes.Query);
                }
                else
                    MessageBox.Show(Resource.Error, Resource.Error);
            }
        });
    }

    ///////////////////////////////////// Strt Grid /////////////////////////////////
    function InitializeGrid() {
        itemGrid.ElementName = "itemGrid";
        itemGrid.PrimaryKey = "ItemCardId";
        itemGrid.InsertionMode = JsGridInsertionMode.Binding;
        itemGrid.Paging = true;
        itemGrid.PageSize = 5;
        itemGrid.OnItemInserting = () => { };
        itemGrid.OnItemUpdating = () => { };
        itemGrid.OnItemDeleting = () => { };
        itemGrid.OnRowDoubleClicked = () => { ; GetByID(Number(itemGrid.SelectedKey)); };
        itemGrid.Columns = [
            {
                title: Resource.SHT_Code, css: "ColumPadding", name: "ItemCode"
            },
            {
                title: Resource.Name_Arabic, css: "ColumPadding", name: "ItemDescA"
            },
            {
                title: Resource.Name_English, css: "ColumPadding", name: "ItemDescE"
            },
            {
                title: Resource.NatureVariety, css: "ColumPadding", name: "ItemType"
            },
            {
                title: Resource.ItemCategories, css: "ColumPadding", name: "ItemCategoryId"
            },
            {
                title: Resource.ExpiryDates, css: "ColumPadding", name: "IsExpir", itemTemplate: function (data, row) {
                    return DocumentActions.BuildAwesomeCheckBox("", data, "");
                },
            },
            {
                title: Resource.Properties, css: "ColumPadding", name: "IsAttributeItem", itemTemplate: function (data, row) {
                    return DocumentActions.BuildAwesomeCheckBox("", data, "");
                },
            },
            {
                title: Resource.Dimensions2, css: "ColumPadding", name: "IsDimension", itemTemplate: function (data, row) {
                    return DocumentActions.BuildAwesomeCheckBox("", data, "");
                },
            },
            {
                title: Resource.Collection, css: "ColumPadding", name: "IsCollection", itemTemplate: function (data, row) {
                    return DocumentActions.BuildAwesomeCheckBox("", data, "");
                },
            },
            {
                title: Resource.SerialNumbers, css: "ColumPadding", name: "IsSerialItem", itemTemplate: function (data, row) {
                    return DocumentActions.BuildAwesomeCheckBox("", data, "");
                },
            },
            {
                title: "Flag", css: "ColumPadding disable hidden", name: "Flag"
            },

        ];
        itemGrid.Bind();
    }

    function FillGrid(itemCardDetailes: MS_ItemCardDetailesVM) {
        ItemUnit = itemCardDetailes.ItemUnit;
        ItemImages = itemCardDetailes.ItemImages;
        ItemAlternatives = itemCardDetailes.ItemAlternatives;
        ItemCollection = itemCardDetailes.ItemCollection;
        AttributsJoin = itemCardDetailes.AttributsJoin;
        ItemCardOffers = itemCardDetailes.Offers;
        ItemCardExpenses = itemCardDetailes.ItemCardExpenses;
        ItemVendors = itemCardDetailes.Vendors;

        try {
            CreateItemImages(ItemImages);

            SuppliersGrid.DataSource = ItemVendors;
            SuppliersGrid.Bind();

            OffersGrid.DataSource = ItemCardOffers;
            OffersGrid.Bind();

            AttributesGrid.DataSource = AttributsJoin;
            AttributesGrid.Bind();

            UnitsPricesGrid.DataSource = ItemUnit;
            UnitsPricesGrid.Bind();

            ItemAlternativesGrid.DataSource = ItemAlternatives;
            ItemAlternativesGrid.Bind();

            ItemCollectionGrid.DataSource = ItemCollection;
            ItemCollectionGrid.Bind();

            ItemCardExpensesGrid.DataSource = ItemCardExpenses;
            ItemCardExpensesGrid.Bind();
        } catch (e) {

        }

        $(".image_fileChange").addClass('disableTable');
    }

    
    function InitializeUnitsPricesGrid() {
        UnitsPricesGrid.ElementName = "UnitsPricesGrid";
        UnitsPricesGrid.PrimaryKey = "BasUnitId";
        UnitsPricesGrid.Editing = true;
        UnitsPricesGrid.Sorting = true;
        UnitsPricesGrid.Paging = true;
        UnitsPricesGrid.PageSize = 10;
        UnitsPricesGrid.ConfirmDeleteing = true;
        UnitsPricesGrid.InsertionMode = JsGridInsertionMode.Binding;

        UnitsPricesGrid.OnItemUpdating = UpdateUnitsPrices
        UnitsPricesGrid.Columns = [
            {
                name: "btnAddItem", visible: false, type: "control", editButton: true, /*modeSwitchButton: true, */deleteButton: true
            },
            {
                title: Resource.MainSellingUnit, css: "ColumPadding", name: "IsDefaultSale", id: "IsDefaultSale", type: "checkbox"
            },
            {
                title: Resource.BasicPurchaseUnit, css: "ColumPadding", name: "IsDefaultPurchas", id: "IsDefaultPurchas", type: "checkbox"
            },
            {
                title: Resource.UnitCode, css: "ColumPadding", name: "UnitCode", id: "UnitCode", type: "text"
            },
            {
                title: Resource.UnitName + " 1", css: "ColumPadding", name: "UnitNam", id: "UnitNam", type: "text"
            },
            {
                title: Resource.UnitName + " 2", css: "ColumPadding", name: "UnitNameE", id: "UnitNameE", type: "text"
            },
            {
                title: Resource.TaxCode, css: "ColumPadding", name: "EtaxUnitCode", id: "EtaxUnitCode", type: "text"
            },
            {
                title: Resource.ConversionFactor, css: "ColumPadding", name: "UnittRate", id: "UnittRate", type: "text"
            },
            {
                title: Resource.Symbol, css: "ColumPadding", name: "Symbol", id: "Symbol", type: "text"
            },
            {
                title: Resource.Quantity2 + " 1", css: "ColumPadding", name: "Quantity1", id: "Quantity1", type: "number"
            },
            {
                title: Resource.Price2 + " 1", css: "ColumPadding", name: "Price1", id: "Price1", type: "number"
            },
            {
                title: Resource.Quantity2 + " 2", css: "ColumPadding", name: "Quantity2", id: "Quantity2", type: "number"
            },
            {
                title: Resource.Price2 + " 2", css: "ColumPadding", name: "Price2", id: "Price2", type: "number"
            },
            {
                title: Resource.Quantity2 + " 3", css: "ColumPadding", name: "Quantity3", id: "Quantity3", type: "number"
            },
            {
                title: Resource.Price2 + " 3", css: "ColumPadding", name: "Price3", id: "Price3", type: "number"
            },
            {
                title: Resource.Quantity2 + " 4", css: "ColumPadding", name: "Quantity4", id: "Quantity4", type: "number"
            },
            {
                title: Resource.Price2 + " 4", css: "ColumPadding", name: "Price4", id: "Price4", type: "number"
            },
            {
                title: Resource.Quantity2 + " 5", css: "ColumPadding", name: "Quantity5", id: "Quantity5", type: "number"
            },
            {
                title: Resource.Price2 + " 5", css: "ColumPadding", name: "Price5", id: "Price5", type: "number"
            },
            {
                title: Resource.Price2 + " 6", css: "ColumPadding", name: "Price6", id: "Price6", type: "number"
            },
            {
                title: Resource.Price2 + " 7", css: "ColumPadding", name: "Price7", id: "Price7", type: "number"
            },
            {
                title: Resource.Price2 + " 8", css: "ColumPadding", name: "Price8", id: "Price8", type: "number"
            },
            {
                title: Resource.Price2 + " 9", css: "ColumPadding", name: "Price9", id: "Price9", type: "number"
            },
            {
                title: Resource.Price2 + " 10", css: "ColumPadding", name: "Price10", id: "Price10", type: "number"
            },
            {
                title: Resource.Barcode + " 1", css: "ColumPadding", name: "BarCode1", id: "BarCode1", type: "number"
            },
            {
                title: Resource.Barcode + " 2", css: "ColumPadding", name: "BarCode2", id: "BarCode2", type: "text"
            },
            {
                title: Resource.Barcode + " 3", css: "ColumPadding", name: "BarCode3", id: "BarCode3", type: "text"
            },
            {
                title: Resource.Barcode + " 4", css: "ColumPadding", name: "BarCode4", id: "BarCode4", type: "text"
            },
            {
                title: Resource.Barcode + " 5", css: "ColumPadding", name: "BarCode5", id: "BarCode5", type: "text"
            },
            {
                title: Resource.Barcode + " 6", css: "ColumPadding", name: "BarCode6", id: "BarCode6", type: "text"
            },
            {
                title: Resource.Barcode + " 7", css: "ColumPadding", name: "BarCode7", id: "BarCode7", type: "text"
            },
            {
                title: Resource.Barcode + " 8", css: "ColumPadding", name: "BarCode8", id: "BarCode8", type: "text"
            },
            {
                title: Resource.Barcode + " 9", css: "ColumPadding", name: "BarCode9", id: "BarCode9", type: "text"
            },
            {
                title: Resource.Barcode + " 10", css: "ColumPadding", name: "BarCode10", id: "BarCode10", type: "text"
            },
            {
                title: Resource.Barcode + " 11", css: "ColumPadding", name: "BarCode11", id: "BarCode11", type: "text"
            },
            {    
                title: Resource.Barcode + " 12", css: "ColumPadding", name: "BarCode12", id: "BarCode12", type: "text"
            },
            {
                title: Resource.Barcode + " 13", css: "ColumPadding", name: "BarCode13", id: "BarCode13", type: "text"
            },
            {
                title: Resource.Barcode + " 14", css: "ColumPadding", name: "BarCode14", id: "BarCode14", type: "text"
            },
            {
                title: Resource.Barcode + " 15", css: "ColumPadding", name: "BarCode15", id: "BarCode15", type: "text"
            },
           
            /////////////////////////////////// hiden fileds ////////////////////////////
            {
                title: "UnitId", css: "ColumPadding disable hidden", name: "UnitId", id: "UnitId", type: "text"
            },
            {
                title: "ItemCardId", css: "ColumPadding disable hidden", name: "ItemCardId", id: "ItemCardId", type: "text"
            },
            {
                title: "BasUnitId", css: "ColumPadding disable hidden", name: "BasUnitId", id: "BasUnitId", type: "text"
            },
            {
                title: "StatusFlag", css: "ColumPadding disable hidden", name: "StatusFlag", id: "StatusFlag", type: "text"
            },
        ];
        UnitsPricesGrid.Bind();
    }

    function UpdateUnitsPrices(e: JsGridUpdateEventArgs) {
        let item = e.Item as Ms_ItemUnit;
        if (item.IsDefaultSale)
            ItemUnit.forEach(x => x.IsDefaultSale = false);

        if (item.IsDefaultPurchas)
            ItemUnit.forEach(x => x.IsDefaultPurchas = false);

        item.StatusFlag = IsNullOrEmpty(item.UnitId.toString()) ? 'i' : 'u';
        var index: number = e.ItemIndex;
        ItemUnit.splice(index, 1, item);

        UnitsPricesGrid.DataSource = ItemUnit;
        UnitsPricesGrid.Bind();
        ItemUnitPros = ItemUnitPros.filter(x => x.BasUnitId != item.BasUnitId);
        ItemUnitPros.push(item)
    }


    function InitializeItemAlternativesGrid() {
        ItemAlternativesGrid.ElementName = "ItemAlternativesGrid";
        ItemAlternativesGrid.PrimaryKey = "AlterId";
        ItemAlternativesGrid.Inserting = true;
        ItemAlternativesGrid.Editing = true;
        ItemAlternativesGrid.Paging = true;
        ItemAlternativesGrid.PageSize = 10;
        ItemAlternativesGrid.ConfirmDeleteing = true;
        ItemAlternativesGrid.InsertionMode = JsGridInsertionMode.Binding;
        ItemAlternativesGrid.OnItemEditing = () => { trId = "_idEdit"; };

        //ItemAlternativesGrid.OnItemInserting = InsertItemAlternatives;
        //ItemAlternativesGrid.OnItemUpdating = UpdateItemAlternatives
        //ItemAlternativesGrid.OnItemDeleting = DeleteItemAlternatives;
         
        ItemAlternativesGrid.OnRowSelected = () => { };
        ItemAlternativesGrid.OnRefreshed = () => { };
        ItemAlternativesGrid.Columns = [
            {
                title: "#", name: "btnAddItem", visible: true, type: "control", modeSwitchButton: true, editButton: true
            },
            {
                title: Resource.Itm_ItemCode, css: "ColumPadding", name: "ItemCode", id: "ItemCode",
                itemTemplate: function (data, row: MS_ItemAlternatives) {
                    trId = "_idAdd";
                    return GetItemAlternatives(row).value;
                },
                editTemplate: function (data, row: MS_ItemAlternatives) {
                    return GetItemAlternatives(row);
                },
                insertTemplate: function (data, row = new MS_ItemAlternatives()) {
                    return GetItemAlternatives(row);
                },
            },
            {
                title: Resource.Itm_ItemName, css: "ColumPadding", name: "ItemDescA", id: "ItemDescA", type: "text", disabled: true,
            },
            {
                title: Resource.Itm_ItemName + " 2", css: "ColumPadding", name: "ItemDescE", id: "ItemDescE", type: "text", disabled: true,
            },
            {
                title: Resource.AlternativeQuantity, css: "ColumPadding", name: "Quantity", id: "Quantity", type: "number", value: "1.0000"
            },
            {
                title: Resource.Itm_Uom, css: "ColumPadding", name: "UnitNam", id: "UnitNam", type: "text", disabled: true,
            },
            {
                title: Resource.NatureVariety, css: "ColumPadding", name: "ItemType", id: "ItemType", type: "text", disabled: true,
            },
            {
                title: Resource.Notes, css: "ColumPadding", name: "Remarks", id: "Remarks", type: "text"
            },

            /////////////////////////////////// hiden fileds ////////////////////////////
            {
                title: Resource.BasicQuantity, css: " disable hidden", name: "UnitRate", id: "UnitRate", type: "number", value: "1.0000", disabled: true
            },
            {
                title: "AlterItemCardId", css: "ColumPadding disable hidden", name: "AlterItemCardId", id: "AlterItemCardId", type: "text"
            },
            {
                title: "UnitId", css: "ColumPadding disable hidden", name: "UnitId", id: "UnitId", type: "text"
            },
            {
                title: "ItemCardId", css: "ColumPadding disable hidden", name: "ItemCardId", id: "ItemCardId", type: "text"
            },
            {
                title: "AlterId", css: "ColumPadding disable hidden", name: "AlterId", id: "AlterId", type: "text"
            },
            {
                title: "StatusFlag", css: "ColumPadding disable hidden", name: "StatusFlag", id: "StatusFlag", type: "text"
            },
        ];
        ItemAlternativesGrid.Bind();
    }

    function InsertItemAlternatives(e: JsGridInsertEventArgs) {
        let item = e.Item as MS_ItemAlternatives;
        item.StatusFlag = 'i';

        ItemAlternatives.push(item);
        ItemAlternativesGrid.DataSource = ItemAlternatives;
        ItemAlternativesGrid.Bind();

        DocumentActions.ChangeSelectToSearchable("SuppliersGrid");
    }

    function UpdateItemAlternatives(e: JsGridUpdateEventArgs) {
        let item = e.Item as MS_ItemAlternatives;
        item.StatusFlag = 'u';

        var index: number = e.ItemIndex;
        ItemAlternatives.splice(index, 1, item);

        ItemAlternativesGrid.DataSource = ItemAlternatives;
        ItemAlternativesGrid.Bind();

        ItemAlternativesPros.push(item);
    }

    function DeleteItemAlternatives(e: JsGridDeleteEventArgs) {
        let item = e.Item as MS_ItemAlternatives;
        var index: number = e.ItemIndex;
        item.StatusFlag = 'd';

        ItemAlternativesPros.push(item);
        ItemAlternatives.splice(index, 1);
    }

     
    function InitializeItemCollectionGrid() {
        ItemCollectionGrid.ElementName = "ItemCollectionGrid";
        ItemCollectionGrid.PrimaryKey = "ItemCollectId";
        ItemCollectionGrid.Inserting = true;
        ItemCollectionGrid.Editing = true;
        ItemCollectionGrid.Paging = true;
        ItemCollectionGrid.PageSize = 10;
        ItemCollectionGrid.ConfirmDeleteing = true;
        ItemCollectionGrid.InsertionMode = JsGridInsertionMode.Binding;
        ItemCollectionGrid.OnItemEditing = () => { trId = "_idEdit"; /*DocumentActions.ChangeSelectToSearchable("ItemCollectionGrid")*/ };
        //ItemCollectionGrid.OnItemUpdating = UpdateOffer
        //ItemCollectionGrid.OnItemInserting = InsertOffer;
        //ItemCollectionGrid.OnItemDeleting = DeleteOffer;

        ItemCollectionGrid.OnRowSelected = () => { };
        ItemCollectionGrid.OnRefreshed = () => { };
        ItemCollectionGrid.Columns = [
            {
                title: "#", name: "btnAddItem", visible: true, type: "control", modeSwitchButton: true, editButton: true
            },
            {
                title: Resource.Itm_ItemCode, css: "ColumPadding", name: "ItemCode", id: "ItemCode",
                itemTemplate: function (data, row: Ms_ItemCollection) {
                    trId = "_idAdd";
                    return GetItemCollection(row).value;
                },
                editTemplate: function (data, row: Ms_ItemCollection) {
                    return GetItemCollection(row);
                },
                insertTemplate: function (data, row = new Ms_ItemCollection()) {
                    return GetItemCollection(row);
                },
            },
            {
                title: Resource.Itm_ItemName, css: "ColumPadding", name: "ItemDescA", id: "ItemDescA", type: "text", disabled: true,
            },
            {
                title: Resource.Itm_ItemName + " 2", css: "ColumPadding", name: "ItemDescE", id: "ItemDescE", type: "text", disabled: true,
            },
            {
                title: Resource.AlternativeQuantity, css: "ColumPadding", name: "Quantity", id: "Quantity", type: "number", value: "1.0000"
            },
            {
                title: Resource.Itm_Uom, css: "ColumPadding", name: "UnitNam", id: "UnitNam", type: "text", disabled: true,
            },
            {
                title: Resource.NatureVariety, css: "ColumPadding", name: "ItemTypeName", id: "ItemTypeName", type: "text", disabled: true,
            },
            {
                title: Resource.IsNotBasic, css: "ColumPadding", name: "IsNotBasic", id: "IsNotBasic", type: "checkbox"
            },
            {
                title: Resource.Notes, css: "ColumPadding", name: "Remarks", id: "Remarks", type: "text"
            },

            /////////////////////////////////// hiden fileds ////////////////////////////
            {
                title: "ItemType", css: " disable hidden", name: "ItemType", id: "ItemType", type: "number", disabled: true
            },
            {
                title: "UnitRate", css: " disable hidden", name: "UnitRate", id: "UnitRate", type: "number", value: "1.0000", disabled: true
            },
            {
                title: "SubItemId", css: "ColumPadding disable hidden", name: "SubItemId", id: "SubItemId", type: "text"
            },
            {
                title: "UnitId", css: "ColumPadding disable hidden", name: "UnitId", id: "UnitId", type: "text"
            },
            {
                title: "ItemCardId", css: "ColumPadding disable hidden", name: "ItemCardId", id: "ItemCardId", type: "text"
            },
            {
                title: "ItemCollectId", css: "ColumPadding disable hidden", name: "ItemCollectId", id: "ItemCollectId", type: "text"
            },
            {
                title: "StatusFlag", css: "ColumPadding disable hidden", name: "StatusFlag", id: "StatusFlag", type: "text"
            },
        ];
        ItemCollectionGrid.Bind();
    }

    function UpdateItemCollection(e: JsGridUpdateEventArgs) {
        let item = e.Item as Ms_ItemCollection;
        item.StatusFlag = 'u';

        var index: number = e.ItemIndex;
        ItemCollection.splice(index, 1, item);

        ItemCollectionGrid.DataSource = ItemCollection;
        ItemCollectionGrid.Bind();

        ItemCollectionPros.push(item);
    }

    function InsertItemCollection(e: JsGridInsertEventArgs) {
        let item = e.Item as Ms_ItemCollection;
        item.StatusFlag = 'i';

        ItemCollection.push(item);
        ItemCollectionGrid.DataSource = ItemCollection;
        ItemCollectionGrid.Bind();
        DocumentActions.ChangeSelectToSearchable("ItemCollectionGrid");
    }

    function DeleteItemCollection(e: JsGridDeleteEventArgs) {
        let item = e.Item as Ms_ItemCollection;
        var index: number = e.ItemIndex;
        item.StatusFlag = 'd';

        ItemCollection.push(item);
        ItemCollectionPros.push(item);

        ItemAlternatives.splice(index, 1);
    }


    function InitializeAttributesGrid() {
        AttributesGrid.ElementName = "AttributesGrid";
        AttributesGrid.PrimaryKey = "ProdItemAtrribId";
        AttributesGrid.Inserting = true;
        AttributesGrid.Editing = true;
        AttributesGrid.Paging = true;
        AttributesGrid.PageSize = 10;
        AttributesGrid.ConfirmDeleteing = true;
        AttributesGrid.InsertionMode = JsGridInsertionMode.Binding;

        AttributesGrid.OnItemEditing = () => { DocumentActions.ChangeSelectToSearchable("AttributesGrid") };
        AttributesGrid.OnItemUpdating = UpdateAttribute
        AttributesGrid.OnItemInserting = InsertAttribute;
        AttributesGrid.OnItemDeleting = DeleteAttribute;
        AttributesGrid.OnRowSelected = () => { };
        AttributesGrid.OnRefreshed = () => { };
        AttributesGrid.Columns = [
            {
                title: "#", name: "btnAddItem", visible: true, type: "control", modeSwitchButton: true, editButton: true
            },
            {
                title: Resource.FeatureCode, css: "ColumPadding", name: "AttributCode", id: "AttributCode",
                itemTemplate: function (data, row) {
                    try {
                        let Attribute = GetAttributById(row);
                        data = Attribute.AttributCode;
                    } catch (e) { }

                    return data
                },
                editTemplate: function (data, row) {
                    let txt = CreateDropdownList(Attributes, "AttributName1", "AttributName2", "AttributCode", true, "AttributCode");
                    txt.onchange = (e) => {
                        try {
                            let trId = '#' + $(e.currentTarget).parent().parent()[0].id,
                                value = $(e.currentTarget).val();
                            SetAttribute(trId, value);
                        } catch (e) { }
                    }
                    txt.value = data;
                    return txt
                },
                insertTemplate: function (data, row) {
                    let txt = CreateDropdownList(Attributes, "AttributName1", "AttributName2", "AttributCode", true, "AttributCode");
                    txt.onchange = (e) => {
                        try {
                            let trId = '#' + $(e.currentTarget).parent().parent()[0].id,
                                value = $(e.currentTarget).val();
                            SetAttribute(trId, value);
                        } catch (e) { }
                    }
                    txt.value = data;
                    return txt
                },
            },
            {
                title: Resource.FeatureName, css: "ColumPadding", name: (lang == "ar" ? "AttributName1" : "AttributName2"), type: "text", disabled: true, id: "AttributName"
            },
            {
                title: Resource.Active, css: "ColumPadding", name: "IsActive", type: "checkbox", id: "IsActive"
            },
            {
                title: Resource.IsMandatory, css: "ColumPadding", name: "IsMandatory", type: "checkbox", id: "IsMandatory"
            },
            {
                title: Resource.Dimensions2, css: "ColumPadding", name: "Dimension", type: "text", disabled: true, id: "Dimension"
            },
            {
                title: Resource.Itm_Uom, css: "ColumPadding", name: "UnitName", type: "text", disabled: true, id: "UnitName",
            },

            {
                title: "BasUnitId", css: "ColumPadding disable hidden", name: "BasUnitId", type: "number", id: "BasUnitId"
            },
            {
                title: "AttributId", css: "ColumPadding disable hidden", name: "AttributId", type: "number", id: "AttributId"
            },
            {
                title: "ItemCardId", css: "ColumPadding disable hidden", name: "ItemCardId", type: "number", id: "ItemCardId"
            },
            {
                title: "ProdItemAtrribId", css: "ColumPadding disable hidden", name: "ProdItemAtrribId", type: "number", id: "ProdItemAtrribId"
            },
            {
                title: "StatusFlag", css: "ColumPadding disable hidden", name: "StatusFlag", type: "text", id: "StatusFlag"
            },
        ];
        AttributesGrid.Bind();
    }

    function UpdateAttribute(e: JsGridUpdateEventArgs) {
        let item = e.Item as Prod_ItemAttributsJoin;
        item.StatusFlag = 'u';
        SetStaticAttributeCol("#_idEdit", item);

        var index: number = e.ItemIndex;
        AttributsJoin.splice(index, 1, item);
        AttributesGrid.DataSource = AttributsJoin;
        AttributesGrid.Bind();

        AttributsJoinPros = AttributsJoinPros.filter(x => x.AttributId != item.AttributId);
        AttributsJoinPros.push(item);
    }

    function InsertAttribute(e: JsGridInsertEventArgs) {
        let item = e.Item as Prod_ItemAttributsJoin;
        item.StatusFlag = 'i';
        SetStaticAttributeCol("#_idAdd", item);

        AttributsJoin.push(item);
        AttributesGrid.DataSource = AttributsJoin;
        AttributesGrid.Bind();
        DocumentActions.ChangeSelectToSearchable("AttributesGrid");
    }

    function DeleteAttribute(e: JsGridDeleteEventArgs) {
        let item = e.Item as Prod_ItemAttributsJoin;
        item.StatusFlag = 'd';
        var index: number = e.ItemIndex;

        AttributsJoin.splice(index, 1);
        AttributsJoinPros.push(item);

        AttributsJoinPros = AttributsJoinPros.filter(x => x.AttributId != item.AttributId);
        AttributsJoinPros.push(item);
    }


    function InitializeOffersGrid() {
        OffersGrid.ElementName = "OffersGrid";
        OffersGrid.PrimaryKey = "OfferItemId";
        OffersGrid.Inserting = true;
        OffersGrid.Editing = true;
        OffersGrid.Paging = true;
        OffersGrid.PageSize = 10;
        OffersGrid.ConfirmDeleteing = true;
        OffersGrid.InsertionMode = JsGridInsertionMode.Binding;

        OffersGrid.OnItemEditing = () => { ; trId = "_idEdit"; DocumentActions.ChangeSelectToSearchable("OffersGrid") };

        OffersGrid.OnItemUpdating = UpdateOffer
        OffersGrid.OnItemInserting = InsertOffer;
        OffersGrid.OnItemDeleting = DeleteOffer;

        OffersGrid.OnRowSelected = () => { };
        OffersGrid.OnRefreshed = () => { };
        OffersGrid.Columns = [
            {
                title: "#", name: "btnAddItem", visible: true, type: "control", modeSwitchButton: true, editButton: true
            },
            {
                title: Resource.Itm_ItemCode, css: "ColumPadding", name: "ItemCode", id: "ItemCode",
                itemTemplate: function (data, row: Ms_ItemCardOffers) {
                    trId = "_idAdd";
                    return GetItemCardTextWithFun(row.ItemCardId).value;
                },
                editTemplate: function (data, row: Ms_ItemCardOffers) {
                    return GetItemCardTextWithFun(row.ItemCardId);
                },
                insertTemplate: function (data, row = new Ms_ItemCardOffers()) {
                    return GetItemCardTextWithFun(row.ItemCardId);
                },
            },
            {
                title: Resource.Itm_ItemName, css: "ColumPadding", name: "ItemDescA", id: "ItemDescA", type: "text", disabled: true
            },
            {
                title: Resource.BasicQuantity, css: "ColumPadding", name: "BasicQuantity", id: "BasicQuantity", type: "number"
            },
            {
                //////// ItemCardUnits
                title: Resource.BasicUnit2, css: "ColumPadding", name: "UnitName", id: "UnitName",
                itemTemplate: function (data, row: Ms_ItemCardOffers) {
                    return GetUniteName(row.UnitId);
                },
                editTemplate: function (data, row: Ms_ItemCardOffers) {
                    let select = CreateDropdownList(GetItemCardUnitsList(), "UnitNam", "UnitNameE", "UnitId", null, "UnitName");
                    select.value = row.UnitId.toString();
                    return select;
                },
                insertTemplate: function (data, row = new Ms_ItemCardOffers()) {
                    let select = CreateDropdownList(GetItemCardUnitsList(), "UnitNam", "UnitNameE", "UnitId", null, "UnitName");
                    return select;
                },
            },
            {
                title: Resource.GiftQuantity, css: "ColumPadding", name: "GiftQuantity", id: "GiftQuantity", type: "text"
            },
            {
                //////// GiftUnitName
                title: Resource.AloneGift, css: "ColumPadding", name: "GiftUnitName", id: "GiftUnitName",
                itemTemplate: function (data, row: Ms_ItemCardOffers) {
                    return GetGiftUniteName(row.UnitId);
                },
                editTemplate: function (data, row: Ms_ItemCardOffers) {
                    let select = CreateDropdownList(GetGiftUnitsList(row.ItemCardId), "UnitNam", "UnitNameE", "UnitId", null, "GiftUnitName");
                    select.value = row.UnitId.toString();
                    return select;
                },
                insertTemplate: function (data, row = new Ms_ItemCardOffers()) {
                    let select = CreateDropdownList(GetGiftUnitsList(row.ItemCardId), "UnitNam", "UnitNameE", "UnitId", null, "GiftUnitName");
                    return select;
                },
            },
            {
                title: Resource.OfferPrice, css: "ColumPadding", name: "PriceAfterDisc", id: "PriceAfterDisc", type: "number"
            },
            {
                title: Resource.Discount3, css: "ColumPadding", name: "IsGiftDiscount", id: "IsGiftDiscount", type: "checkbox"
            },
            {
                title: Resource.percentageDiscount, css: "ColumPadding", name: "IsDiscountPercent", id: "IsDiscountPercent", type: "checkbox"
            },
            {
                title: Resource.DiscountValue, css: "ColumPadding", name: "GiftDiscount", id: "GiftDiscount", type: "number"
            },
            {
                title: Resource.App_FromDate, css: "ColumPadding datepicker", name: "FromDate", id: "FromDate", type: "date", width: "150px",
                itemTemplate: function (data, row) {
                    //let control = CreateElement("text", "", "", "", "FromDate", "");
                    return moment(data).format(format);
                },
            },
            {
                title: Resource.App_ToDate, css: "ColumPadding datepicker", name: "ToDate", id: "ToDate", type: "date", width: "150px",
                itemTemplate: function (data, row) {
                    return moment(data).format(format);
                },
            },
            /////////////////////////////////// hiden fileds ////////////////////////////
            {
                title: "GiftItemCardId", css: "ColumPadding disable hidden", name: "GiftItemCardId", id: "GiftItemCardId", type: "text"
            },
            {
                title: "GiftUnitId", css: "ColumPadding disable hidden", name: "GiftUnitId", id: "GiftUnitId", type: "text"
            },
            {
                title: "UnitId", css: "ColumPadding disable hidden", name: "UnitId", id: "UnitId", type: "text"
            },
            {
                title: "ItemCardId", css: "ColumPadding disable hidden", name: "ItemCardId", id: "ItemCardId", type: "text"
            },
            {
                title: "OfferItemId", css: "ColumPadding disable hidden", name: "OfferItemId", id: "OfferItemId", type: "text"
            },
            {
                title: "StatusFlag", css: "ColumPadding disable hidden", name: "StatusFlag", id: "StatusFlag", type: "text"
            },
        ];
        OffersGrid.Bind();
    }

    function UpdateOffer(e: JsGridUpdateEventArgs) {
        let item = e.Item as Ms_ItemCardOffers;
        item.StatusFlag = 'u';

        var index: number = e.ItemIndex;
        ItemCardOffers.splice(index, 1, item);
        OffersGrid.DataSource = ItemCardOffers;
        OffersGrid.Bind();

        ItemCardOffersPros = ItemCardOffersPros.filter(x => x.GiftItemCardId != item.GiftItemCardId);
        ItemCardOffersPros.push(item);
    }

    function InsertOffer(e: JsGridInsertEventArgs) {
        let item = e.Item as Ms_ItemCardOffers;
        item.StatusFlag = 'i';

        ItemCardOffers.push(item);
        OffersGrid.DataSource = ItemCardOffers;
        OffersGrid.Bind();
        DocumentActions.ChangeSelectToSearchable("OffersGrid");
    }

    function DeleteOffer(e: JsGridDeleteEventArgs) {
        let item = e.Item as Ms_ItemCardOffers;
        var index: number = e.ItemIndex;
        item.StatusFlag = 'd';

        ItemCardOffers.slice(index, 1);
        OffersGrid.DataSource = ItemCardOffers;
        OffersGrid.Bind();

        ItemCardOffersPros = ItemCardOffersPros.filter(x => x.GiftItemCardId != item.GiftItemCardId);
        ItemCardOffersPros.push(item);
    }

    
    function InitializeItemcardExpensesGrid() {
        ItemCardExpensesGrid.ElementName = "ItemCardExpensesGrid";
        ItemCardExpensesGrid.PrimaryKey = "ProdExpensId";
        ItemCardExpensesGrid.Inserting = true;
        ItemCardExpensesGrid.Editing = true;
        ItemCardExpensesGrid.Paging = true;
        ItemCardExpensesGrid.PageSize = 10;
        ItemCardExpensesGrid.ConfirmDeleteing = true;
        ItemCardExpensesGrid.InsertionMode = JsGridInsertionMode.Binding;
        ItemCardExpensesGrid.OnItemEditing = () => { trId = "_idEdit"; DocumentActions.ChangeSelectToSearchable("ItemCardExpensesGrid") };

        //ItemCardExpensesGrid.OnItemUpdating = UpdateItemExpenses
        //ItemCardExpensesGrid.OnItemInserting = InsertItemExpenses;
        //ItemCardExpensesGrid.OnItemDeleting = DeleteItemExpenses;

        ItemCardExpensesGrid.OnRowSelected = () => { };
        ItemCardExpensesGrid.OnRefreshed = () => { };
        ItemCardExpensesGrid.Columns = [
            {
                title: "#", name: "btnAddItem", visible: true, type: "control", modeSwitchButton: true, editButton: true
            },
            {
                title: Resource.Itm_ItemCode, name: "AccountCode", id: "AccountCode", type: "select", items: ExpensesAccount, valueField: "Id",
                textField: (lang == "ar" ? "NameA" : "NameE"), Typefun: "change", fun: function (e) { GetItemExpenses(Number(e.currentTarget.value)) },
                itemTemplate: function (data, row: Prod_ItemcardExpenses) {
                    let item = ExpensesAccount.filter(x => x.Id == data)[0];
                    return item.Code;
                }
            },
            {
                title: Resource.Itm_ItemName, css: "ColumPadding", name: "AccountNameA", id: "AccountNameA", type: "text", disabled: true
            },
            {
                title: Resource.Itm_ItemName + " 2", css: "ColumPadding", name: "AccountNameE", id: "AccountNameE", type: "text", disabled: true
            },
            {
                title: Resource.percentage2 + " " + Resource.From, css: "ColumPadding", name: "PercentOf", id: "PercentOf", type: "text"
            },
            {
                title: Resource.percentage2, css: "ColumPadding", name: "IsPercent", id: "IsPercent", type: "checkbox"
            },
            {
                title: Resource.value, css: "ColumPadding", name: "ExpenseValu", id: "ExpenseValu", type: "number"
            },

            /////////////////////////////////// hiden fileds ////////////////////////////
            {
                title: "AccountId", css: "ColumPadding disable hidden", name: "AccountId", id: "AccountId", type: "text"
            },
            {
                title: "ItemCardId", css: "ColumPadding disable hidden", name: "ItemCardId", id: "ItemCardId", type: "text"
            },
            {
                title: "ProdExpensId", css: "ColumPadding disable hidden", name: "ProdExpensId", id: "ProdExpensId", type: "text"
            },
            {
                title: "StatusFlag", css: "ColumPadding disable hidden", name: "StatusFlag", id: "StatusFlag", type: "text"
            },
        ];
        ItemCardExpensesGrid.Bind();
    }

    function UpdateItemExpenses(e: JsGridUpdateEventArgs) {
        let item = e.Item as Prod_ItemcardExpenses;
        var index: number = e.ItemIndex;
        item.StatusFlag = 'u';

        ItemCardExpenses.splice(index, 1, item);
        ItemCardExpensesGrid.DataSource = ItemCardExpenses;
        ItemCardExpensesGrid.Bind();
    }

    function InsertItemExpenses(e: JsGridInsertEventArgs) {
        let item = e.Item as Prod_ItemcardExpenses;
        item.StatusFlag = 'i';

        ItemCardExpenses.push(item);
        ItemCardExpensesGrid.DataSource = ItemCardExpenses;
        ItemCardExpensesGrid.Bind();
        DocumentActions.ChangeSelectToSearchable("ItemCardExpensesGrid");
    }

    function DeleteItemExpenses(e: JsGridDeleteEventArgs) {
        let item = e.Item as Prod_ItemcardExpenses;
        var index: number = e.ItemIndex;
        item.StatusFlag = 'd';

        ItemCardExpenses.splice(index, 1);
        ItemCardExpensesPros.push(item);
    }


    function InitializeSuppliersGrid() {
        SuppliersGrid.ElementName = "SuppliersGrid";
        SuppliersGrid.PrimaryKey = "ItemVendorId";
        SuppliersGrid.Inserting = true;
        SuppliersGrid.Editing = true;
        SuppliersGrid.Paging = true;
        SuppliersGrid.PageSize = 10;
        SuppliersGrid.ConfirmDeleteing = true;
        SuppliersGrid.InsertionMode = JsGridInsertionMode.Binding;

        SuppliersGrid.OnItemEditing = () => { DocumentActions.ChangeSelectToSearchable("SuppliersGrid") };
        SuppliersGrid.OnItemUpdating = UpdateSupplier
        SuppliersGrid.OnItemInserting = InsertSupplier;
        SuppliersGrid.OnItemDeleting = DeleteSupplier;
        SuppliersGrid.OnRowSelected = () => { };
        SuppliersGrid.OnRefreshed = () => { };
        SuppliersGrid.Columns = [
            {
                title: "#", name: "btnAddItem", visible: true, type: "control", modeSwitchButton: true, editButton: true
            },
            {
                title: Resource.MainSupplier, type: "checkbox", css: "ColumPadding", name: "IsBasicVendor",
            },
            {
                title: Resource.VendCode, css: "ColumPadding", name: "VendorCode",
                itemTemplate: function (data, row) {
                    try {
                        let Vendor = GetVendorById(row);
                        data = Vendor.VendorCode;
                    } catch (e) { }
                    return data
                },
                editTemplate: function (data, row) {
                    let txt = CreateDropdownList(Vendors, "VendorDescA", "VendorDescE", "VendorCode", true, "VendorCode");
                    txt.onchange = (e) => {
                        try {
                            let trId = '#' + $(e.currentTarget).parent().parent()[0].id,
                                value = $(e.currentTarget).val();
                            SetVendor(trId, value);
                        } catch (e) { }
                    }
                    txt.value = data;
                    return txt
                },
                insertTemplate: function (data, row) {
                    let txt = CreateDropdownList(Vendors, "VendorDescA", "VendorDescE", "VendorCode", true, "VendorCode");
                    txt.onchange = (e) => {
                        try {
                            let trId = '#' + $(e.currentTarget).parent().parent()[0].id,
                                value = $(e.currentTarget).val();
                            SetVendor(trId, value);
                        } catch (e) { }
                    }
                    txt.value = data;
                    return txt
                },
            },
            {
                title: Resource.Name_Arabic, css: "ColumPadding", name: "VendorDescA", id: "VendorDescA", type: "text", disabled: true
            },
            {
                title: Resource.Name_English, css: "ColumPadding", name: "VendorDescE", id: "VendorDescE", type: "text", disabled: true
            },
            {
                title: Resource.OrderUnit, css: "ColumPadding", name: "UnitId", id: "UnitId", type: "text"
            },
            {
                title: Resource.M_Transfer, css: "ColumPadding", name: "UnitRate", id: "UnitRate", type: "number", disabled: true
            },
            {
                title: Resource.Quantity2 + " 1", css: "ColumPadding", name: "Quantity1", id: "Quantity1", type: "number"
            },
            {
                title: Resource.Price2 + " 1", css: "ColumPadding Price", name: "Price1", id: "Price1", type: "number"
            },
            {
                title: Resource.Quantity2 + " 2", css: "ColumPadding", name: "Quantity2", id: "Quantity2", type: "number"
            },
            {
                title: Resource.Price2 + " 2", css: "ColumPadding Price", name: "Price2", id: "Price2", type: "number"
            },
            {
                title: Resource.Quantity2 + " 3", css: "ColumPadding", name: "Quantity3", id: "Quantity3", type: "number"
            },
            {
                title: Resource.Price2 + " 3", css: "ColumPadding Price", name: "Price3", id: "Price3", type: "number"
            },
            {
                title: Resource.Quantity2 + " 4", css: "ColumPadding", name: "Quantity4", id: "Quantity4", type: "number"
            },
            {
                title: Resource.Price2 + " 4", css: "ColumPadding Price", name: "Price4", id: "Price4", type: "number"
            },
            {
                title: Resource.Quantity2 + " 5", css: "ColumPadding", name: "Quantity5", id: "Quantity5", type: "number"
            },
            {
                title: Resource.Price2 + " 5", css: "ColumPadding Price", name: "Price5", id: "Price5", type: "number"
            },
            {
                title: Resource.Quantity2 + " 6", css: "ColumPadding", name: "Quantity6", id: "Quantity6", type: "number"
            },
            {
                title: Resource.Price2 + " 6", css: "ColumPadding Price", name: "Price6", id: "Price6", type: "number"
            },
            {
                title: Resource.Quantity2 + " 7", css: "ColumPadding", name: "Quantity7", id: "Quantity7", type: "number"
            },
            {
                title: Resource.Price2 + " 7", css: "ColumPadding Price", name: "Price7", id: "Price7", type: "number"
            },
            {
                title: Resource.Quantity2 + " 8", css: "ColumPadding", name: "Quantity8", id: "Quantity8", type: "number"
            },
            {
                title: Resource.Price2 + " 8", css: "ColumPadding Price", name: "Price8", id: "Price8", type: "number"
            },
            {
                title: Resource.Quantity2 + " 9", css: "ColumPadding", name: "Quantity9", id: "Quantity9", type: "number"
            },
            {
                title: Resource.Price2 + " 9", css: "ColumPadding Price", name: "Price9", id: "Price9", type: "number"
            },
            {
                title: Resource.Quantity2 + " 10", css: "ColumPadding", name: "Quantity10", id: "Quantity10", type: "number"
            },
            {
                title: Resource.Price2 + " 10", css: "ColumPadding Price", name: "Price10", id: "Price10", type: "number"
            },
            {
                title: "VendorId", css: "ColumPadding ", name: "VendorId", id: "VendorId", type: "text"
            },
            {
                title: "ItemCardId", css: "ColumPadding ", name: "ItemCardId", id: "ItemCardId", type: "text"
            },
            {
                title: "StatusFlag", css: "ColumPadding ", name: "StatusFlag", id: "StatusFlag", type: "text"
            },
        ];
        SuppliersGrid.Bind();
    }

    function InsertSupplier(e: JsGridInsertEventArgs) {
        let item = e.Item as MS_ItemVendors;
        
        item.StatusFlag = 'i';
        SetStaticCol("#_idAdd", item);
        //GetPriceAndQyt("#_idAdd", item);

        ItemVendors.push(item);
        SuppliersGrid.DataSource = ItemVendors;
        SuppliersGrid.Bind();
        DocumentActions.ChangeSelectToSearchable("SuppliersGrid");
    }

    function UpdateSupplier(e: JsGridUpdateEventArgs) {
        let item = e.Item as MS_ItemVendors;
        SetStaticCol("#_idEdit", item);
        //GetPriceAndQyt("#_idEdit", item);
        item.StatusFlag = 'u';

        var index: number = e.ItemIndex;
        ItemVendors.splice(index, 1, item);
        SuppliersGrid.DataSource = ItemVendors;
        SuppliersGrid.Bind();


        ItemVendorsPros = ItemVendorsPros.filter(x => x.VendorId != item.VendorId);
        ItemVendorsPros.push(item);
    }

    function DeleteSupplier(e: JsGridDeleteEventArgs) {
        let item = e.Item as MS_ItemVendors;
        var index: number = e.ItemIndex;
        item.StatusFlag = 'd';

        ItemVendors.splice(index, 1);
        ItemVendorsPros.push(item);

        ItemVendorsPros = ItemVendorsPros.filter(x => x.VendorId != item.VendorId);
        ItemVendorsPros.push(item);
    }

    ///////////////////////////////////// End Grid /////////////////////////////////

    function EmptyDeletedList() {
        ItemUnitPros = new Array<Ms_ItemUnit>();
        ItemImages = new Array<MS_ItemImages>();
        ItemAlternativesPros = new Array<MS_ItemAlternatives>();
        ItemCollectionPros = new Array<Ms_ItemCollection>();
        AttributsJoinPros = new Array<Prod_ItemAttributsJoin>();
        ItemCardOffersPros = new Array<Ms_ItemCardOffers>();
        ItemCardExpensesPros = new Array<Prod_ItemcardExpenses>();
        ItemVendorsPros = new Array<MS_ItemVendors>();
    }

    function Assign() {
        Success = false;
        ItemCardDetailes.Model = DocumentActions.AssignToModel<MS_ItemCard>(Model);
        ItemCardDetailes.ItemUnit = DocumentActions.AssignArr(ItemUnit, ItemUnitPros);
        ItemCardDetailes.ItemImages = ItemImages;
        ItemCardDetailes.ItemAlternatives = ItemAlternativesGrid.DataSource;
        ItemCardDetailes.ItemCollection = ItemCollectionGrid.DataSource;
        ItemCardDetailes.AttributsJoin = DocumentActions.AssignArr(AttributsJoin, AttributsJoinPros);
        ItemCardDetailes.Offers = DocumentActions.AssignArr(ItemCardOffers, ItemCardOffersPros);
        ItemCardDetailes.ItemCardExpenses = ItemCardExpenses;
        ItemCardDetailes.Vendors = DocumentActions.AssignArr(ItemVendors, ItemVendorsPros);
        
        if (StatusFlag == "i") {
            Model.CreatedAt = DateTimeFormat(Date().toString());
            Model.CreatedBy = sys.SysSession.CurrentEnvironment.UserCode;
            Insert();
        }
        if (StatusFlag == "u") {
            Model.UpdateAt = DateTimeFormat(Date().toString());
            Model.UpdateBy = sys.SysSession.CurrentEnvironment.UserCode;
            Update();
        }

        if (Success)
            MessageBox.Toastr(Resource.SavedSucc, "", ToastrTypes.success);

        ObjectId = Model.ItemCardId;
        GetAll();
        if (ObjectId != 0)
            GetByID(ObjectId);

        return true;
    }

    function Save() {
        if (DocumentActions.CheckCode(ItemCards, DocumentActions.GetElementByName("ItemCode").value, "ItemCode") == false && StatusFlag == "i") {
            MessageBox.Toastr(Resource.CodeCannotDuplicated, Resource.Error, ToastrTypes.error);
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
            url: sys.apiUrl("MS_ItemCard", "Insert"),
            data: JSON.stringify(ItemCardDetailes),
            success: (Response) => {
                let result = Response as BaseResponse;
                if (result.IsSuccess) {
                    Model = result.Response as MS_ItemCard;
                    ObjectId = Model.ItemCardId;
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
            url: sys.apiUrl("MS_ItemCard", "Update"),
            data: JSON.stringify(ItemCardDetailes),
            success: (Response) => {
                let result = Response as BaseResponse;
                if (result.IsSuccess) {
                    Model = result.Response as MS_ItemCard
                    ObjectId = Model.ItemCardId;
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
            url: sys.apiUrl("MS_ItemCard", "Delete") + "/" + ObjectId,
            success: (result) => {
                if (result) {
                    ClearGrids();
                    Success = true;
                    GetAll();
                    Disabled(result);
                    MessageBox.Toastr(Resource.DeletedSucc, "", ToastrTypes.success);
                }
                else {
                    MessageBox.Toastr(Resource.DeletedErr, Resource.Error, ToastrTypes.error);
                    Success = false;
                }
            }
        });
    }

    function btnAdd_onclick() {
        StatusFlag = 'i';
        ObjectId = 0;
        RemoveDisabled(true);
        ResetSelect2();
        //$('select option:first-child').val('null').prop("selected", true).prop("disabled", true);
        ClearGrids();

        StopRemoveDisabled(true);
    }

    function btnEdit_onclick() {
        if (ObjectId == 0) {
            MessageBox.Show(Resource.PleaseSelectItem, Resource.Error);
        }
        else {
            RemoveDisabled(false);
            element = DocumentActions.GetElementByName("ItemCode");
            element.disabled = true;
            element = DocumentActions.GetElementByName("BasUnitId");
            element.disabled = true;

            StatusFlag = 'u';
            StopRemoveDisabled(true);
        }
    }

    function btnsave_onClick() {
        if (!Validation()) return
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

    function btnSearch_onclick() {
        let sys: SystemTools = new SystemTools();
        sys.FindKey(Modules.DefBranches, SharedButtons.btnSearch.id, "", () => {
            let id = SearchGrid.SearchDataGrid.SelectedKey;
            if (!IsNullOrEmpty(id)) {
                //GetMasterAndDetails(id.toString());
            }
        });
    }

    function Display(model: MS_ItemCard) {
        DocumentActions.RenderFromModel(model);
        Model = model;
        ObjectId = Number(Model.ItemCardId);
    }

    function Disabled(clear: boolean) {
        DocumentActions.allElements(true, clear, Model);
        DocumentActions.GetElementByName("ItemImages").disabled = true;
    }

    function RemoveDisabled(clear: boolean) {
        DocumentActions.allElements(false, clear, Model);
        DocumentActions.GetElementByName("ItemImages").disabled = false;
        $(".image_fileChange").removeClass('disableTable');
    }

    function Refrash() {
        GetAll();
        GetByID(ObjectId);
    }

    function FillDropdownPeriod(id) {
        let select = document.getElementById(id) as HTMLSelectElement;
        let arr: { value: string, text: string }[] = [
            { "value": "1", "text": (lang == "ar" ? "يوم" : "Day") },
            { "value": "2", "text": (lang == "ar" ? "اسبوع" : "Week") },
            { "value": "3", "text": (lang == "ar" ? "شهر" : "Month") },
            { "value": "4", "text": (lang == "ar" ? "عام" : "year") },
        ];
        DocumentActions.FillCombowithdefult(arr, select, "value", "text", "");
    }

    function FillDropdownItemType(id) {
        let select = document.getElementById(id) as HTMLSelectElement;
        let arr: { value: string, text: string }[] = [
            { "value": "1", "text": Resource.PerfectProduct },
            { "value": "2", "text": Resource.Raw },
            { "value": "3", "text": Resource.ServeHim },
            { "value": "4", "text": Resource.FactoryClass },
            { "value": "5", "text": Resource.Vehicle },
            { "value": "6", "text": Resource.SemiManufacturedProduct },
        ];
        DocumentActions.FillCombowithdefult(arr, select, "value", "text", "");
    }

    function GetVendor() {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("funcationShared", "GetVendor"),
            success: (Response) => {
                let result = Response as BaseResponse;
                if (result.IsSuccess) {
                    Vendors = result.Response;
                }
                else {
                    MessageBox.Toastr(result.ErrorMessage, Resource.Error, ToastrTypes.error);
                    Success = false;
                }
            }
        });
    }

    function GetAttributes() {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("funcationShared", "GetAttributes"),
            success: (Response) => {
                let result = Response as BaseResponse;
                if (result.IsSuccess) {
                    Attributes = result.Response;
                }
                else {
                    MessageBox.Toastr(result.ErrorMessage, Resource.Error, ToastrTypes.error);
                    Success = false;
                }
            }
        });
    }

    function GetPriceAndQyt(trRow: string, item: MS_ItemVendors) {
        let count = $(trRow + ' .Price').length;
        for (var i = 1; i < count; i++) {
            item["Price" + i] = $(trRow + ' #Price' + i).val();
            item["Quantity" + i] = $(trRow + ' #Quantity' + i).val();
        }
    }

    function GetVendorById(item: MS_ItemVendors) {
        let vendor = Vendors.filter(x => x.VendorId == item.VendorId)[0];
        if (vendor != null) {
            item.VendorCode = vendor.VendorCode;
            item.VendorDescA = vendor.VendorDescA;
            item.VendorDescE = vendor.VendorDescE;
        }
        return vendor;
    }

    function SetVendor(trRow: string, code: string) {
        let vendor = Vendors.filter(x => x.VendorCode == code)[0];
        if (vendor != null) {
            $(trRow + ' #VendorDescA').val(vendor.VendorDescA);
            $(trRow + ' #VendorDescE').val(vendor.VendorDescE);
            $(trRow + ' #VendorId').val(vendor.VendorId);
            $(trRow + ' #VendorCode').val(vendor.VendorCode);
            //$(trRow + ' #UnitId').val();
            //$(trRow + ' #UnitRate').val();
        }
        return vendor;
    }

    function SetStaticCol(trRow: string, item: MS_ItemVendors) {
        let code = $(trRow + ' #VendorCode').val() as string;
        let vendor = SetVendor(trRow, code);
        if (vendor != null) {
            item.VendorId = vendor.VendorId;
            item.VendorDescA = vendor.VendorDescA;
            item.VendorDescE = vendor.VendorDescE;
            item.VendorCode = vendor.VendorCode;
            item.ItemCardId = ObjectId;

            if (SharedWork.CurrentMode == ScreenModes.Add || SharedWork.CurrentMode == ScreenModes.Edit)
                item.StatusFlag = IsNullOrEmpty(item.VendorId.toString()) ? 'i' : 'u';
        }
        return item;
    }

    function SetAttribute(trRow: string, code: string, IsActive: boolean = null, IsMandatory: boolean = null) {
        let Attribute = Attributes.filter(x => x.AttributCode == code)[0];
        if (Attribute != null) {
            let dima = Attribute.Dimension == 1 ? "طول" : Attribute.Dimension == 2 ? "عرض" : "بدون",
                AttributName = lang == "ar" ? Attribute.AttributName1 : Attribute.AttributName2,
                BasUnit = lang == "ar" ? Attribute.UnitNam : Attribute.UnitNameE;

            Attribute.IsActive = IsActive == null ? Attribute.IsActive : IsActive;
            Attribute.IsMandatory = IsMandatory == null ? Attribute.IsMandatory : IsMandatory;


            $(trRow + ' #AttributName').val(AttributName);
            $(trRow + ' #Dimension').val(dima);

            $(trRow + ' #AttributCode').val(Attribute.AttributCode);
            $(trRow + ' #AttributId').val(Attribute.AttributId);

            $(trRow + ' #BasUnitId').val(Attribute.BasUnitId);
            $(trRow + ' #UnitName').val(BasUnit);


            $(trRow + ' #IsActive').prop("checked", Attribute.IsActive);
            $(trRow + ' #IsMandatory').prop("checked", Attribute.IsMandatory);
        }
        return Attribute;
    }

    function SetStaticAttributeCol(trRow: string, item: Prod_ItemAttributsJoin) {
        let Attribute = SetAttribute(trRow, $(trRow + ' #AttributCode').val(), $(trRow + ' #IsActive').prop('checked'), $(trRow + ' #IsMandatory').prop('checked'));
        item.AttributId = Attribute.AttributId;
        item.AttributCode = Attribute.AttributCode;

        item.IsMandatory = Attribute.IsMandatory;
        item.IsActive = Attribute.IsActive;

        return item;
    }

    function GetAttributById(item: Prod_ItemAttributsJoin) {
        let Attribute = Attributes.filter(x => x.AttributId == item.AttributId)[0];

        item.AttributId = Attribute.AttributId;
        item.AttributName1 = Attribute.AttributName1;
        item.AttributName2 = Attribute.AttributName2;
        item.AttributCode = Attribute.AttributCode;
        item.IsMandatory = Attribute.IsMandatory;
        item.IsActive = Attribute.IsActive;
        item.Dimension = Attribute.Dimension == 1 ? "طول" : Attribute.Dimension == 2 ? "عرض" : "بدون";
        item.BasUnitId = Attribute.BasUnitId;
        item.UnitName = lang == "ar" ? Attribute.UnitNam : Attribute.UnitNameE;

        return item;
    }

    function GetItemPartition(itemCardId: number) {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("funcationShared", "GetItemPartition"),
            data: { itemCardId: itemCardId, storeId: Number(env.BranchCode) },
            success: (Response) => {
                let result = Response as BaseResponse;
                if (result.IsSuccess) {
                    ItemPartition = result.Response;
                    GetSumOfQtys("QtyPartiation");
                    GetSumOfQtys("QtyInNotebook");
                    DocumentActions.GetElementByName("CoastAverage").value = ItemPartition[0]?.CoastAverage?.toFixed(3);
                }
                else {
                    MessageBox.Toastr(result.ErrorMessage, Resource.Error, ToastrTypes.error);
                    Success = false;
                }
            }
        });
        return ItemPartition;
    }

    function GetSumOfQtys(elm: string) {
        const sum = ItemPartition.reduce((sum, Partition) => sum + Partition[elm], 0);
        element = DocumentActions.GetElementByName(elm);
        if (element != null)
            element.value = sum.toFixed(4);
    }

    function ClearGrids() {
        UnitsPricesGrid.DataSource = new Array<Ms_ItemUnit>();
        ItemAlternativesGrid.DataSource = new Array<MS_ItemAlternatives>();
        ItemCollectionGrid.DataSource = new Array<Ms_ItemCollection>();
        AttributesGrid.DataSource = new Array<Prod_ItemAttributsJoin>();
        OffersGrid.DataSource = new Array<Ms_ItemCardOffers>();
        ItemCardExpensesGrid.DataSource = new Array<Prod_ItemcardExpenses>();
        SuppliersGrid.DataSource = new Array<MS_ItemVendors>();

        UnitsPricesGrid.Bind();
        ResetImage();
        ItemAlternativesGrid.Bind();
        ItemCollectionGrid.Bind();
        AttributesGrid.Bind();
        OffersGrid.Bind();
        ItemCardExpensesGrid.Bind();
        SuppliersGrid.Bind();
    }

    function Undo() {
        Disabled(false);
        Success = false;
        if (ObjectId != 0)
            GetByID(ObjectId);
        else
            SharedWork.SwitchModes(ScreenModes.Start);
    }

    function StopRemoveDisabled(stop: boolean) {
        element = DocumentActions.GetElementByName("QtyInNotebook");
        element.disabled = stop;
        element = DocumentActions.GetElementByName("QtyPartiation");
        element.disabled = stop;
        element = DocumentActions.GetElementByName("CoastAverage");
        element.disabled = stop;
        element = DocumentActions.GetElementByName("BeforLastCost");
        element.disabled = stop;
        element = DocumentActions.GetElementByName("LastCost");
        element.disabled = stop;
        element = DocumentActions.GetElementByName("LastSalePrice");
        element.disabled = stop;

        if (SharedWork.CurrentMode == ScreenModes.Add)
            $('#OffersGrid').addClass('disableTable');

        if (SharedWork.CurrentMode == ScreenModes.Edit)
            $('#UnitsPricesGrid').addClass('disableTable');
    }

    function FillSelectOption() {
        GetBasicUnits();
        GetItems();
        GetAttributes();
        GetVendor();
        GetPartitions();
        GetItemCategories();
        GetExpensesAccount();

        let itemCategory = document.getElementById("ItemCategoryId") as HTMLSelectElement,
            Partition = document.getElementById("StoreId") as HTMLSelectElement;

        DocumentActions.FillComboWithEmpty(Partitions, Partition, "Code", (lang == "ar" ? "NameA" : "NameE"));
        DocumentActions.FillComboWithEmpty(ItemCategory, itemCategory, "Code", (lang == "ar" ? "NameA" : "NameE"));
        DocumentActions.FillCombowithCode(BasicUnits, BasUnitId, "BasUnitId", (lang == "ar" ? "UnitNam" : "UnitNameE"), "UnitCode", Resource.App_MeasuringUnit);
    }

    function GetPartitions() {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("funcationShared", "GetPartitions"),
            success: (Response) => {
                let result = Response as BaseResponse;
                if (result.IsSuccess) {
                    Partitions = result.Response;
                }
                else {
                    MessageBox.Toastr(result.ErrorMessage, Resource.Error, ToastrTypes.error);
                    Success = false;
                }
            }
        });
    }

    function GetItemCategories() {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("funcationShared", "GetItemCategories"),
            success: (Response) => {
                let result = Response as BaseResponse;
                if (result.IsSuccess) {
                    ItemCategory = result.Response;
                }
                else {
                    MessageBox.Toastr(result.ErrorMessage, Resource.Error, ToastrTypes.error);
                    Success = false;
                }
            }
        });
    }

    function GetItemCardTextWithFun(data) {
        let itemCard = ItemCards.filter(x => x.ItemCardId == data)[0],
            code = itemCard == null ? "" : itemCard.ItemCode;

        let txt = CreateElement("text", "", code, null, "ItemCode", null);
        txt.ondblclick = function () {
            findItems(Items, () => {
                let id = SearchGrid.SearchDataGrid.SelectedKey; if (!IsNullOrEmpty(id)) { SetOfferItem(Number(id)); }
            });
        }
        return txt
    }

    function GetItemAlternatives(row: MS_ItemAlternatives) {
        let itemCard = Items.filter(x => x.GiftItemCardId == row.AlterItemCardId)[0],
            code = itemCard == null ? "" : itemCard.ItemCode;

        try {;
            row.ItemDescA = itemCard.ItemDescA;
            row.ItemDescE = itemCard.ItemDescE;
            row.UnitNam = lang == "ar" ? itemCard.UnitNam : itemCard.UnitNameE;
            row.ItemTypeName = itemCard.ItemTypestring;
            row.UnitRate = itemCard.UnittRate;
            row.AlterItemCardId = itemCard.GiftItemCardId;
            row.UnitId = itemCard.UnitId;
            row.ItemCardId = ObjectId;

            if (SharedWork.CurrentMode == ScreenModes.Add || SharedWork.CurrentMode == ScreenModes.Edit) 
                row.StatusFlag = IsNullOrEmpty(row.AlterId.toString()) ? 'i' : 'u';
            
        } catch (e) {}

        let txt = CreateElement("text", "", code, null, "ItemCode", null);
        txt.ondblclick = function () {
            findItems(Items, () => {
                let id = SearchGrid.SearchDataGrid.SelectedKey; if (!IsNullOrEmpty(id)) { SetItemAlternatives(Number(id)); }
            });
        }
        return txt
    }

    function GetItemCollection(row: Ms_ItemCollection) {
        let itemCard = Items.filter(x => x.GiftItemCardId == row.SubItemId)[0],
            code = itemCard == null ? "" : itemCard.ItemCode;

        try {
            row.ItemDescA = itemCard.ItemDescA
            row.ItemDescE = itemCard.ItemDescE
            row.UnitNam = lang == "ar" ? itemCard.UnitNam : itemCard.UnitNameE
            row.ItemTypeName = itemCard.ItemTypestring
            row.ItemType = itemCard.ItemType;
            row.UnitRate = itemCard.UnittRate;
            row.SubItemId = itemCard.GiftItemCardId;
            row.UnitId = itemCard.GiftUnitId;
            row.ItemCardId = ObjectId;

            if (SharedWork.CurrentMode == ScreenModes.Add || SharedWork.CurrentMode == ScreenModes.Edit)
                row.StatusFlag = IsNullOrEmpty(row.ItemCollectId.toString()) ? 'i' : 'u';
        } catch (e) { }

        let txt = CreateElement("text", "", code, null, "ItemCode", null);
        txt.ondblclick = function () {
            findItems(Items, () => {
                let id = SearchGrid.SearchDataGrid.SelectedKey; if (!IsNullOrEmpty(id)) { SetItemCollection(Number(id)); }
            });
        }
        return txt
    }

    function GetItemExpenses(id: number) {
        let item = ExpensesAccount.filter(x => x.Id == id)[0];
        if (item == null)
            return;

        $("#" + trId + " #AccountNameA").val(item.NameA);
        $("#" + trId + " #AccountNameE").val(item.NameE);
        $("#" + trId + " #AccountId").val(item.Id);

        if (SharedWork.CurrentMode == ScreenModes.Add || SharedWork.CurrentMode == ScreenModes.Edit)
            $("#" + trId + " #StatusFlag").val(ObjectId == 0 ? 'i' : 'u');
    }

    function GetBasicUnits() {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("funcationShared", "GetBasicUnits"),
            success: (Response) => {
                let result = Response as BaseResponse;
                if (result.IsSuccess) {
                    BasicUnits = result.Response;
                }
                else {
                    MessageBox.Toastr(result.ErrorMessage, Resource.Error, ToastrTypes.error);
                    Success = false;
                }
            }
        });
        return ItemPartition;
    }

    function GetBasicUnitsChildren(ParentUnit: number) {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("funcationShared", "GetBasicUnitsChildren"),
            data: { ParentUnit: ParentUnit },
            success: (Response) => {
                let result = Response as BaseResponse;
                if (result.IsSuccess) {
                    if (SharedWork.CurrentMode == ScreenModes.Add)
                        UnitsPricesGrid.Columns[0].visible = true;
                    else
                        UnitsPricesGrid.Columns[0].visible = false;

                    let units = result.Response as Array<Ms_ItemUnit>;
                    for (var item of units) {
                        let unit = new Ms_ItemUnit();
                        unit.BasUnitId = item.BasUnitId;
                        unit.UnitCode = item.UnitCode;
                        unit.UnitNam = item.UnitNam;
                        unit.UnitNameE = item.UnitNameE;
                        unit.UnittRate = item.UnittRate;
                        unit.Symbol = item.Symbol;
                        unit.StatusFlag = 'i';
                        ItemUnit.push(unit);
                    }

                    MapBaseUnitToItemUnit(ParentUnit);
                    UnitsPricesGrid.DataSource = ItemUnit;
                    UnitsPricesGrid.Bind();
                }
                else {
                    MessageBox.Toastr(result.ErrorMessage, Resource.Error, ToastrTypes.error);
                    Success = false;
                }
            }
        });
        return ItemPartition;
    }

    function MapBaseUnitToItemUnit(BasUnitId: number) {
        let basUnit = BasicUnits.filter(x => x.BasUnitId == BasUnitId)[0],
            oneItemUnit = new Ms_ItemUnit();

        oneItemUnit.BasUnitId = BasUnitId;
        oneItemUnit.UnitCode = basUnit.UnitCode;
        oneItemUnit.UnitNam = basUnit.UnitNam;
        oneItemUnit.UnitNameE = basUnit.UnitNameE;
        oneItemUnit.Symbol = basUnit.Symbol;
        ItemUnit.push(oneItemUnit);
    }
    
    function GetExpensesAccount() {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("funcationShared", "GetExpensesAccount"),
            success: (Response) => {
                let result = Response as BaseResponse;
                if (result.IsSuccess) {
                    let res = result.Response as Array<SharedVM>;
                    ExpensesAccount = new Array<SharedVM>();
                    ExpensesAccount.push(new SharedVM());
                    ExpensesAccount = DocumentActions.AssignArr(ExpensesAccount, res);

                }
                else {
                    MessageBox.Toastr(result.ErrorMessage, Resource.Error, ToastrTypes.error);
                    Success = false;
                }
            }
        });
        return ItemPartition;
    }
    
    function GetItems() {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("funcationShared", "GetItems"),
            data: { lang: lang, storeId: env.BranchCode },
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
        return ItemPartition;
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

            if (lang == "ar") {
                document.getElementById("searchTitle").innerText = "بحث الاصناف";
            }
            else if (lang == "en") {
                document.getElementById("searchTitle").innerText = "item search";
            }
            //document.getElementById("searchDes").innerText = settings.Description;
        } catch (e) {
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

    function SetOfferItem(id: number) {
        let item = Items.filter(c => c.GiftItemCardId == id)[0];
        if (item == null)
            return;

        if (SharedWork.CurrentMode == ScreenModes.Add || SharedWork.CurrentMode == ScreenModes.Edit)
            GetUnitsById(id);

        $("#" + trId + " #ItemCode").val(item.ItemCode);
        $("#" + trId + " #ItemDescA").val((lang == "ar" ? item.ItemDescA : item.ItemDescE));
        $("#" + trId + " #GiftQuantity").val((1).toFixed(4));
        $("#" + trId + " #GiftUnitName").val(item.GiftUnitId);
        //$("#" + trId + " #UnitName").val((lang == "ar" ? item.UnitNam : item.UnitNameE));

        $("#" + trId + " #BasicQuantity").val((1).toFixed(4));
        $("#" + trId + " #GiftItemCardId").val(item.GiftItemCardId);
        $("#" + trId + " #GiftUnitId").val(item.GiftUnitId);
        $("#" + trId + " #FromDate").val(new Date().toLocaleDateString()).datepicker();
        $("#" + trId + " #ToDate").val(new Date().toLocaleDateString()).datepicker();
    }
    
    function SetItemCollection(id: number) {
        let item = Items.filter(c => c.GiftItemCardId == id)[0];
        if (item == null)
            return;

        $("#" + trId + " #ItemDescA").val(item.ItemDescA);
        $("#" + trId + " #ItemDescE").val(item.ItemDescE);
        $("#" + trId + " #UnitNam").val((lang == "ar" ? item.UnitNam : item.UnitNameE));
        $("#" + trId + " #ItemTypeName").val(item.ItemTypestring);

        $("#" + trId + " #ItemCode").val(item.ItemCode);
        $("#" + trId + " #UnitRate").val(item.UnittRate);
        $("#" + trId + " #UnitId").val(item.GiftUnitId);
        $("#" + trId + " #ItemType").val(item.ItemType);
        $("#" + trId + " #SubItemId").val(item.GiftItemCardId);
    }
    
    function SetItemAlternatives(id: number) {
        let item = Items.filter(c => c.GiftItemCardId == id)[0];
        if (item == null)
            return;

        $("#" + trId + " #ItemDescA").val(item.ItemDescA);
        $("#" + trId + " #ItemDescE").val(item.ItemDescE);
        $("#" + trId + " #ItemCode").val(item.ItemCode);
        $("#" + trId + " #UnitRate").val(item.UnittRate);
        $("#" + trId + " #UnitNam").val(item.UnitNam);
        $("#" + trId + " #ItemType").val(item.ItemTypestring);
        $("#" + trId + " #AlterItemCardId").val(item.GiftItemCardId);
    }
    
    function getBase64(file) {
        var ready = false;
        var check = function () {
            const myTimeout = setTimeout(check, 1000);

            if (ready === true) {
                // do what you want with the result variable
                clearTimeout(myTimeout);
                return;
            }
        }
        check();

        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            let itemImage: MS_ItemImages = new MS_ItemImages();
            itemImage.ImageStr = reader.result.toString()
                //.replace('data:', '').replace(/^.+,/, '');
            ItemImages.push(itemImage);
            ready = true;
            PreviewImage(itemImage.ImageStr);
        };
    }

    function CreateItemImages(ItemImages: Array<MS_ItemImages>) {
        let imagesPre = document.getElementById("imagesPre");
        imagesPre.innerHTML = "";
        for (var i = 0; i < ItemImages.length; i++) {
            let nameImage = ItemImages[i].ImageStr,
                src = "";
            try {
                src = nameImage.split('data:image/jpeg;base64,').length > 1 ? nameImage : $('#GetAPIUrl').val() + "/Uploads/Items/" + nameImage;
            } catch (e) { }

            let img = CreateImage(src, "ItemImages", "ItemImages" + i);
            $(img).css("max-width", "100%");

            let file = CreateElement("file", "", "", "", "", "");
            $(file).css("max-width", "100%");
            $(file).on("change", function (e) {
                let file = e.target as HTMLInputElement;
                DeleteOldImage(img.id, nameImage)
                getBase64(file.files[0]);
            });

            let deleteBtn = CreateButton("btn btn-danger fa fa-trash", "", function () { DeleteOldImage(img.id, nameImage) }),
                div = CreateDiv("image_fileChange col-md-2", "") as HTMLDivElement;

            div.appendChild(img);
            div.appendChild(file);
            div.appendChild(deleteBtn);

            imagesPre.appendChild(div);
        }
    }

    function DeleteOldImage(id, src) {
        
        let oldImage = $('#' + id);
        oldImage.parent().remove();
        ItemImages = ItemImages.filter(x => x.ImageStr != src);
        CreateItemImages(ItemImages);
    }

    function PreviewImage(src: string) {
        let imagesPre = document.getElementById("imagesPre");

        let images = $('.ItemImages');
        let img = CreateImage(src, "ItemImages", "ItemImages" + (images.length + 1));
        $(img).css("max-width", "100%");
        let file = CreateElement("file", "", "", "", "", "");
        $(file).css("max-width", "100%");

        let deleteBtn = CreateButton("btn btn-danger fa fa-trash", "", function () { DeleteOldImage(img.id, src) }),
            div = CreateDiv("col-md-2", "") as HTMLDivElement;

        div.appendChild(img);
        div.appendChild(file);
        div.appendChild(deleteBtn);

        imagesPre.appendChild(div);
    }

    function ResetImage() {
        let imagesPre = document.getElementById("imagesPre");
        imagesPre.innerHTML = "";
        ItemImages = new Array<MS_ItemImages>();
    }

    function ResetSelect2() {
        let select = $('select');
        for (var i = 0; i < select.length; i++) {
            $(select[i]).val("null");
        }
        $('select option:first-child').prop("selected", true)
            //.prop("disabled", true);
    }

    function SetDatepickerValue(trId: string, id: string) {
        let controller = $('#' + trId + ' #' + id),
            date  = $(controller).datepicker("getDate");
        $(controller).formatDate("dd-mm-yy", date)
        //$(controller).val(controller.val());
    }

    function CreateDatePic() {
        
        $('input.datepicker').datepicker({
            format: "dd.mm.yyyy",
            todayBtn: true,
            language: "de",
            calendarWeeks: true,
            todayHighlight: true,
            onSelect: function (dateText, inst) {
                
                $('#submitDate').val(dateText);
            }
        });
    }

    function GetUniteName(id: number) {
        let unite = ItemCardUnits.filter(x => x.UnitId == id)[0],
            uniteName = unite == null ? "" : lang == "ar" ? unite.UnitNam : unite.UnitNameE;

        return uniteName;
    }
    
    function GetGiftUniteName(id: number) {
        let unite = GiftUnits.filter(x => x.UnitId == id)[0],
            uniteName = unite == null ? "" : lang == "ar" ? unite.UnitNam : unite.UnitNameE;

        return uniteName;
    }
    
    function GetItemCardUnitsList() {
        var emptyList = new Array<Ms_ItemUnitVM>();
        emptyList.push(new Ms_ItemUnitVM());

        ItemCardUnits = ItemCardDetailes.ItemCardUnits == null ? new Array<Ms_ItemUnitVM>() :
            DocumentActions.AssignArr(emptyList, ItemCardDetailes.ItemCardUnits);
        return ItemCardUnits;
    }

    function GetGiftUnitsList(id: number) {
        var emptyList = new Array<Ms_ItemUnitVM>();
        emptyList.push(new Ms_ItemUnitVM());

        if (ItemCardDetailes.GiftUnits == null)
            return GiftUnits;

        GiftUnits = ItemCardDetailes.GiftUnits.filter(x => x.ItemCardId == id) == null ? new Array<Ms_ItemUnitVM>() :
            DocumentActions.AssignArr(emptyList, ItemCardDetailes.GiftUnits);
        return GiftUnits;
    }

    function GetUnitsById(id: number) {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("funcationShared", "GetUnitsById") + "/" + id,
            success: (Response) => {
                let result = Response as BaseResponse;
                if (result.IsSuccess) {
                    
                    GiftUnits = result.Response;
                    $("#" + trId + " #GiftUnitName").find('option').remove();
                    let tem = '';
                    for (var i = 0; i < GiftUnits.length; i++) {
                        tem += '<option value="' + GiftUnits[i].UnitId + '">' + (lang == "ar" ? GiftUnits[i].UnitNam : GiftUnits[i].UnitNameE) + '</option>';
                    }
                    $("#" + trId + " #GiftUnitName").append(tem);
                }
                else {
                    MessageBox.Toastr(result.ErrorMessage, Resource.Error, ToastrTypes.error);
                    Success = false;
                }
            }
        });
    }

    function Validation() {
        flag = true;
        let unitsPrice = UnitsPricesGrid.DataSource as Array<Ms_ItemUnit>,
            checkDefaultSale: Ms_ItemUnit = new Ms_ItemUnit(),
            checkDefaultPurchas: Ms_ItemUnit = new Ms_ItemUnit();

        if (unitsPrice != null) {
            checkDefaultSale = unitsPrice.filter(x => x.IsDefaultSale == true)[0];
            checkDefaultPurchas = unitsPrice.filter(x => x.IsDefaultPurchas == true)[0];
        }

        if (DocumentActions.GetElementByName("ItemCode").value == "") {
            MessageBox.Toastr(Resource.PleaseEnterCode, Resource.Error, ToastrTypes.error);
            flag = false
        }

        else if (DocumentActions.GetElementByName("ItemDescA").value == "") {
            MessageBox.Toastr(Resource.PleaseEnterName + " 1", Resource.Error, ToastrTypes.error);
            flag = false
        }

        else if (unitsPrice == null) {
            MessageBox.Toastr(Resource.ItemsUnitsMustBeEntered, Resource.Error, ToastrTypes.error);
            flag = false
        }

        else if (unitsPrice.length <= 0) {
            MessageBox.Toastr(Resource.ItemsUnitsMustBeEntered, Resource.Error, ToastrTypes.error);
            flag = false
        }

        else if (checkDefaultSale == null) {
            MessageBox.Toastr(Resource.MainSellingUnitMustSelected, Resource.Error, ToastrTypes.error);
            flag = false
        }

        else if (checkDefaultPurchas == null) {
            MessageBox.Toastr(Resource.PrimaryPurchaseUnitMustSelected, Resource.Error, ToastrTypes.error);
            flag = false
        }

        //else if (!DocumentActions.ValidateFields("nav-tabContent"))
        //    flag = false

        return flag
    }
}