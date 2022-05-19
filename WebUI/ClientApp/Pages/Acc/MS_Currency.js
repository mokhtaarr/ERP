$(document).ready(function () {
    SharedButtons.OnLoad();
    MSCurrency.InitalizeComponent();
    $('#headertop1').addClass('display_none');
    $('#headertop2').removeClass('display_none');
});
var MSCurrency;
(function (MSCurrency) {
    var sys = new SystemTools();
    var SysSession = GetSystemSession();
    var Resource = GetResourceList("");
    var language = sys.SysSession.CurrentEnvironment.ScreenLanguage;
    var CurrencyTypeArr = [
        {
            id: 1,
            name: Resource.Paper,
        },
        {
            id: 2,
            name: Resource.Coin,
        }
    ];
    $('#headerTitle').text(Resource.Currencies);
    var Currencies = new Array();
    var Model = new MS_Currency();
    var currCategoryList = new Array();
    var currCategory = new CustomCurrencyCategory();
    var currCategoryCodeList = new Array();
    var currRateList = new Array();
    var currRate = new CustomCurrencyRate();
    var CurrencyDetailsForModel = new CurrencyDetails();
    var element;
    var StatusFlag;
    var Success;
    var ObjectId = 0;
    var GridInputClassName = "form-control gridIput";
    var divCurrenciesGrid = new JsGrid();
    var divCurrencyCategoryGrid = new JsGrid();
    var divCurrencyRateGrid = new JsGrid();
    function InitalizeComponent() {
        SharedButtons.compcode = Number(SysSession.CurrentEnvironment.CompCode);
        localStorage.setItem("TableName", "MS_Currency");
        NavigateModule.InitalizeComponent();
        SharedWork.OnNavigate = Navigate;
        SharedButtons.AddAction(function () {
            btnAdd_onclick();
            ClearGrids();
        });
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
        InitalizeControls();
        InitalizeEvents();
        GetAll();
        InitializeGrid();
        InitializeCurrencyCategoryGrid();
        InitializeCurrencyRateGrid();
    }
    MSCurrency.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        SharedButtons.btnSearch = document.getElementById("btnMS_CurrencySearch");
    }
    function InitalizeEvents() {
        SharedButtons.btnSearch.onclick = btnSearch_onclick;
        SharedButtons.btnRefrash2.onclick = Refrash;
    }
    function GetAll() {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("MS_Currency", "GetAll"),
            success: function (d) {
                var result = d;
                if (result.IsSuccess) {
                    ClearGrids();
                    Currencies = result.Response;
                    divCurrenciesGrid.DataSource = Currencies;
                    divCurrenciesGrid.Bind();
                }
            }
        });
    }
    function GetAllCurrencyCategory() {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("MS_Currency", "GetAllCurrencyCategory"),
            success: function (d) {
                var result = d;
                if (result.IsSuccess) {
                    currCategoryCodeList = result.Response;
                }
            }
        });
    }
    function InitializeGrid() {
        divCurrenciesGrid.ElementName = "divCurrenciesGrid";
        divCurrenciesGrid.PrimaryKey = "CurrencyId";
        divCurrenciesGrid.Editing = true;
        divCurrenciesGrid.Paging = true;
        divCurrenciesGrid.Sorting = true;
        divCurrenciesGrid.PageSize = 10;
        divCurrenciesGrid.ConfirmDeleteing = true;
        divCurrenciesGrid.InsertionMode = JsGridInsertionMode.Binding;
        divCurrenciesGrid.OnRowSelected = function () {
            Display(divCurrenciesGrid.SelectedItem);
        };
        divCurrenciesGrid.OnRowDoubleClicked = function () {
            Display(divCurrenciesGrid.SelectedItem);
        };
        divCurrenciesGrid.Columns = [
            {
                title: Resource.Code, css: "ColumPadding", name: "CurrencyCode"
            },
            {
                title: Resource.Name_Arabic, css: "ColumPadding", name: "CurrencyDescA"
            },
            {
                title: Resource.Name_English, css: "ColumPadding", name: "CurrencyDescE"
            },
            {
                title: "عملة اساسية", css: "ColumPadding", name: "DefualtCurrency", type: "checkbox"
            },
            {
                title: "معامل التحويل", css: "ColumPadding", name: "Rate"
            },
            {
                title: Resource.Notes, css: "ColumPadding", name: "Remarks"
            },
            {
                title: "CurrencyId", css: "ColumPadding disable hidden", name: "CurrencyId", width: "1%",
                headerTemplate: function () {
                    var txt = CreateElement("text", GridInputClassName, " ", " ", "CurrencyId", " ");
                    txt.disabled = true;
                    txt.id = "hd_CurrencyId";
                    return HeaderTemplate("CurrencyId", txt);
                }
            }
        ];
        divCurrenciesGrid.Bind();
    }
    //////////////////////// Start Add Currency Category In Grid /////////////////////////
    function AddCurrencyCategoryInGrid() {
        var flag = true;
        currCategory = new CustomCurrencyCategory();
        var hd_code = $('#hd_code'), hd_CurrencyCatJoinId = $('#hd_CurrencyCatJoinId'), hd_ContactName1 = $('#hd_CurrencyCategoryNameA'), hd_ContactName2 = $('#hd_CurrencyCategoryNameE'), hd_CurrencyType = $('#hd_CurrencyType'), hd_CurrencyId = $('#hd_CurrencyId'), hd_CurrencyCategoryId = $('#hd_CurrencyCategoryId');
        if (hd_code.val().trim() == "") {
            MessageBox.Show(Resource.PleaseEnterCode, Resource.Error);
            flag = false;
            return;
        }
        else {
            if (!DocumentActions.CheckCode(currCategoryList, hd_code.val(), "code")) {
                MessageBox.Show(Resource.CodeCannotDuplicated, Resource.Error);
                flag = false;
                return;
            }
            else
                currCategory.code = hd_code.val().trim();
        }
        if (flag) {
            currCategory.CurrencyCategoryNameA = hd_ContactName1.val().trim();
            currCategory.CurrencyCategoryNameE = hd_ContactName2.val().trim();
            currCategory.CurrencyType = hd_CurrencyType.val().trim() == "1" ? Resource.Paper : Resource.Coin;
            if (hd_CurrencyId.val().trim() == "")
                currCategory.CurrencyId = 0;
            else
                currCategory.CurrencyId = hd_CurrencyId.val().trim();
            if (hd_CurrencyCatJoinId.val().trim() == "")
                currCategory.CurrencyCatJoinId = 0;
            else
                currCategory.CurrencyCatJoinId = hd_CurrencyCatJoinId.val().trim();
            if (hd_CurrencyCategoryId.val().trim() == "")
                currCategory.CurrencyCategoryId = 0;
            else
                currCategory.CurrencyCategoryId = hd_CurrencyCategoryId.val().trim();
            if ($('#hd_Flag').val().trim() == "u")
                currCategory.StatusFlag = "u";
            else
                currCategory.StatusFlag = "i";
            currCategoryList.unshift(currCategory);
            divCurrencyCategoryGrid.DataSource = currCategoryList;
            divCurrencyCategoryGrid.Bind();
        }
        return;
    }
    function InitializeCurrencyCategoryGrid() {
        GetAllCurrencyCategory();
        divCurrencyCategoryGrid.ElementName = "divCurrencyCategoryGrid";
        divCurrencyCategoryGrid.Editing = true;
        divCurrencyCategoryGrid.Paging = true;
        divCurrencyCategoryGrid.Sorting = true;
        divCurrencyCategoryGrid.PageSize = 10;
        divCurrencyCategoryGrid.ConfirmDeleteing = true;
        divCurrencyCategoryGrid.InsertionMode = JsGridInsertionMode.Binding;
        divCurrencyCategoryGrid.OnItemInserting = function () { };
        divCurrencyCategoryGrid.OnItemUpdating = function () { };
        divCurrencyCategoryGrid.OnItemDeleting = function () { };
        divCurrencyCategoryGrid.Columns = [
            {
                title: "#", name: "btnAddItem", visible: true, width: "50px", css: "text-center", headerTemplate: function () {
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
                        AddCurrencyCategoryInGrid();
                    };
                    return btn;
                },
                itemTemplate: function (s, item) {
                    var btn = DocumentActions.CreateElement("button");
                    btn.innerHTML = "<i class='fas fa-times'></i>";
                    btn.className = TransparentButton + "  red_Delete_Cotnrol editable";
                    btn.type = "button";
                    btn.name = currCategoryList.indexOf(item).toString();
                    btn.id = "btnRemoveItemGrid";
                    btn.onclick = function (e) {
                        var index = Number(e.currentTarget.name);
                        currCategoryList[index].StatusFlag = "d";
                        currCategoryList.push(currCategoryList[index]);
                        currCategoryList.splice(index, 1);
                        divCurrencyCategoryGrid.Bind();
                    };
                    return btn;
                }
            },
            {
                css: JsGridHeaderCenter, itemTemplate: function (s, item) {
                    var btn = DocumentActions.CreateElement("button");
                    btn.innerHTML = "<i class='fa fa-edit'></i>";
                    btn.className = TransparentButton + " " + "emptrainingedit " + "green_edit_control editable";
                    btn.type = "button";
                    btn.name = currCategoryList.indexOf(item).toString();
                    btn.id = "btnUpdateItemGrid";
                    btn.onclick = function (e) {
                        var index = Number(e.currentTarget.name);
                        currCategoryList.splice(index, 1);
                        divCurrencyCategoryGrid.DataSource = currCategoryList;
                        divCurrencyCategoryGrid.Bind();
                        if (item.code != null)
                            DocumentActions.SelectDrobInGrid("hd_code", item.code.toString());
                        if (item.CurrencyCategoryNameA != null)
                            DocumentActions.FillInputText("hd_CurrencyCategoryNameA", item.CurrencyCategoryNameA.toString());
                        if (item.CurrencyCategoryNameE != null)
                            DocumentActions.FillInputText("hd_CurrencyCategoryNameE", item.CurrencyCategoryNameE.toString());
                        if (item.CurrencyType != null) {
                            var val = item.CurrencyType == Resource.Paper ? "1" : "2";
                            DocumentActions.SelectDrobInGrid("hd_CurrencyType", val);
                        }
                        if (item.CurrencyId != null)
                            DocumentActions.FillInputText("hd_CurrencyId", item.CurrencyId.toString());
                        if (item.CurrencyCategoryId != null)
                            DocumentActions.FillInputText("hd_CurrencyCategoryId", item.CurrencyCategoryId.toString());
                        DocumentActions.FillInputText("hd_Flag", "u");
                    };
                    return btn;
                }
            },
            {
                title: Resource.Code, css: "ColumPadding", name: "code", headerTemplate: function () {
                    var txt = CreateDropdownListWithCode(currCategoryCodeList, "CurrencyCategoryNameA", "CurrencyCategoryNameE", "code", "CurrencyCategoryId", true);
                    txt.id = "hd_code";
                    txt.onchange = function (e) {
                        FillValueInInputsCurrCategoy();
                    };
                    return HeaderTemplateDropdownList(Resource.Code, txt);
                }
            },
            {
                title: Resource.Name_Arabic, css: "ColumPadding", name: "CurrencyCategoryNameA", headerTemplate: function () {
                    var txt = CreateElement("text", GridInputClassName, " ", " ", "CurrencyCategoryNameA", " ");
                    txt.id = "hd_CurrencyCategoryNameA";
                    txt.disabled = true;
                    return HeaderTemplate(Resource.Name_Arabic, txt);
                }
            },
            {
                title: Resource.Name_English, css: "ColumPadding", name: "CurrencyCategoryNameE", headerTemplate: function () {
                    var txt = CreateElement("text", GridInputClassName, " ", " ", "CurrencyCategoryNameE", " ");
                    txt.id = "hd_CurrencyCategoryNameE";
                    txt.disabled = true;
                    return HeaderTemplate(Resource.Name_English, txt);
                }
            },
            {
                title: Resource.currencyType, css: "ColumPadding", name: "CurrencyType", headerTemplate: function () {
                    var txt = CreateDropdownList(CurrencyTypeArr, "name", "name", "id", true);
                    txt.id = "hd_CurrencyType";
                    return HeaderTemplateDropdownList(Resource.currencyType, txt);
                }
            },
            {
                title: "Flag", css: "ColumPadding hide", name: "Flag", width: "1%", headerTemplate: function () {
                    var txt = CreateElement("text", GridInputClassName, " ", " ", "Flag", " ");
                    txt.disabled = false;
                    txt.id = "hd_Flag";
                    return HeaderTemplate("Flag", txt);
                }
            },
            {
                title: "CurrencyId", css: "ColumPadding hide", name: "CurrencyId", width: "1%", headerTemplate: function () {
                    var txt = CreateElement("text", GridInputClassName, " ", " ", "CurrencyId", " ");
                    txt.disabled = false;
                    txt.id = "hd_CurrencyId";
                    return HeaderTemplate("CustomerId", txt);
                }
            },
            {
                title: "CurrencyCategoryId", css: "ColumPadding hide", name: "CurrencyCategoryId", width: "1%", headerTemplate: function () {
                    var txt = CreateElement("text", GridInputClassName, " ", " ", "CurrencyCategoryId", " ");
                    txt.disabled = false;
                    txt.id = "hd_CurrencyCategoryId";
                    return HeaderTemplate("CurrencyCategoryId", txt);
                }
            },
            {
                title: "CurrencyCatJoinId", css: "ColumPadding hide", name: "CurrencyCatJoinId", width: "1%", headerTemplate: function () {
                    var txt = CreateElement("text", GridInputClassName, " ", " ", "CurrencyCatJoinId", " ");
                    txt.disabled = false;
                    txt.id = "hd_CurrencyCatJoinId";
                    return HeaderTemplate("CurrencyCatJoinId", txt);
                }
            },
        ];
        divCurrencyCategoryGrid.Bind();
    }
    function FillValueInInputsCurrCategoy() {
        var code = $('#hd_code').val(), category = currCategoryCodeList.filter(function (x) { return x.CurrencyCategoryId == code; })[0];
        if (category != null) {
            $('#hd_CurrencyCategoryNameA').val(category.CurrencyCategoryNameA);
            $('#hd_CurrencyCategoryNameE').val(category.CurrencyCategoryNameE);
            $('#hd_CurrencyCategoryId').val(code);
        }
        else {
            $('#hd_CurrencyCategoryNameA').val('');
            $('#hd_CurrencyCategoryNameE').val('');
            $('#hd_CurrencyCategoryId').val('');
        }
    }
    //////////////////////// End Add Currency Category In Grid /////////////////////////
    //////////////////////// Start Add Currency Category In Grid /////////////////////////
    function AddCurrencyRateInGrid() {
        var flag = true;
        currRate = new CustomCurrencyRate();
        var hd_code = $('#hd_CurrencyCode'), hd_ContactName1 = $('#hd_CurrencyDescA'), hd_ContactName2 = $('#hd_CurrencyDescE'), hd_Rate = $('#hd_Rate'), hd_EquivalentCurrencyId = $('#hd_EquivalentCurrencyId'), hd_CurrencyId = $('#hd_CurrencyId'), hd_EqualCurrencyPriceId = $('#hd_EqualCurrencyPriceId');
        if (hd_code.val().trim() == "") {
            MessageBox.Show(Resource.PleaseEnterCode, Resource.Error);
            flag = false;
            return;
        }
        else {
            if (!DocumentActions.CheckCode(currRateList, hd_EquivalentCurrencyId.val(), "EquivalentCurrencyId")) {
                MessageBox.Show(Resource.CodeCannotDuplicated, Resource.Error);
                flag = false;
                return;
            }
            else
                currRate.CurrencyCode = hd_code.val().trim();
        }
        if (flag) {
            currRate.CurrencyDescA = hd_ContactName1.val().trim();
            currRate.CurrencyDescE = hd_ContactName2.val().trim();
            currRate.Rate = hd_Rate.val().trim();
            if (hd_CurrencyId.val().trim() == "")
                currRate.CurrencyId = 0;
            else
                currRate.CurrencyId = hd_CurrencyId.val().trim();
            debugger;
            if (hd_EquivalentCurrencyId.val().trim() == "")
                currRate.EquivalentCurrencyId = 0;
            else
                currRate.EquivalentCurrencyId = hd_EquivalentCurrencyId.val().trim();
            if (hd_EqualCurrencyPriceId.val().trim() == "")
                currRate.EqualCurrencyPriceId = 0;
            else
                currRate.EqualCurrencyPriceId = hd_EqualCurrencyPriceId.val().trim();
            if ($('#hd_Flag').val().trim() == "u")
                currRate.StatusFlag = "u";
            else
                currRate.StatusFlag = "i";
            currRateList.unshift(currRate);
            divCurrencyRateGrid.DataSource = currRateList;
            divCurrencyRateGrid.Bind();
        }
        return;
    }
    function InitializeCurrencyRateGrid() {
        divCurrencyRateGrid.ElementName = "divCurrencyRateGrid";
        divCurrencyRateGrid.Editing = true;
        divCurrencyRateGrid.Paging = true;
        divCurrencyRateGrid.Sorting = true;
        divCurrencyRateGrid.PageSize = 10;
        divCurrencyRateGrid.ConfirmDeleteing = true;
        divCurrencyRateGrid.InsertionMode = JsGridInsertionMode.Binding;
        divCurrencyRateGrid.OnItemInserting = function () { };
        divCurrencyRateGrid.OnItemUpdating = function () { };
        divCurrencyRateGrid.OnItemDeleting = function () { };
        divCurrencyRateGrid.Columns = [
            {
                title: "#", name: "btnAddItem", visible: true, width: "50px", css: "text-center", headerTemplate: function () {
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
                        AddCurrencyRateInGrid();
                    };
                    return btn;
                },
                itemTemplate: function (s, item) {
                    var btn = DocumentActions.CreateElement("button");
                    btn.innerHTML = "<i class='fas fa-times'></i>";
                    btn.className = TransparentButton + "  red_Delete_Cotnrol editable";
                    btn.type = "button";
                    btn.name = currRateList.indexOf(item).toString();
                    btn.id = "btnRemoveItemGrid";
                    btn.onclick = function (e) {
                        var index = Number(e.currentTarget.name);
                        currRateList[index].StatusFlag = "d";
                        currRateList.push(currRateList[index]);
                        currRateList.splice(index, 1);
                        divCurrencyRateGrid.Bind();
                    };
                    return btn;
                }
            },
            {
                css: JsGridHeaderCenter, itemTemplate: function (s, item) {
                    var btn = DocumentActions.CreateElement("button");
                    btn.innerHTML = "<i class='fa fa-edit'></i>";
                    btn.className = TransparentButton + " " + "emptrainingedit " + "green_edit_control editable";
                    btn.type = "button";
                    btn.name = currRateList.indexOf(item).toString();
                    btn.id = "btnUpdateItemGrid";
                    btn.onclick = function (e) {
                        var index = Number(e.currentTarget.name);
                        currRateList.splice(index, 1);
                        divCurrencyRateGrid.DataSource = currRateList;
                        divCurrencyRateGrid.Bind();
                        if (item.CurrencyCode != null)
                            DocumentActions.SelectDrobInGrid("hd_CurrencyCode", item.CurrencyCode.toString());
                        if (item.CurrencyDescA != null)
                            DocumentActions.FillInputText("hd_CurrencyDescA", item.CurrencyDescA.toString());
                        if (item.CurrencyDescE != null)
                            DocumentActions.FillInputText("hd_CurrencyDescE", item.CurrencyDescE.toString());
                        if (item.Rate != null)
                            DocumentActions.FillInputText("hd_Rate", item.Rate.toString());
                        if (item.EquivalentCurrencyId != null)
                            DocumentActions.FillInputText("hd_EquivalentCurrencyId", item.EquivalentCurrencyId.toString());
                        if (item.CurrencyId != null)
                            DocumentActions.FillInputText("hd_CurrencyId", item.CurrencyId.toString());
                        if (item.EqualCurrencyPriceId != null)
                            DocumentActions.FillInputText("hd_EqualCurrencyPriceId", item.EqualCurrencyPriceId.toString());
                        DocumentActions.FillInputText("hd_Flag", "u");
                    };
                    return btn;
                }
            },
            {
                title: Resource.Code, css: "ColumPadding", name: "CurrencyCode", headerTemplate: function () {
                    var txt = CreateDropdownListWithCode(Currencies, "CurrencyDescA", "CurrencyDescE", "CurrencyCode", "CurrencyId", true);
                    txt.id = "hd_CurrencyCode";
                    txt.onchange = function (e) {
                        FillValueInInputsCurrRate();
                    };
                    return HeaderTemplateDropdownList(Resource.Code, txt);
                }
            },
            {
                title: Resource.Name_Arabic, css: "ColumPadding", name: "CurrencyDescA", headerTemplate: function () {
                    var txt = CreateElement("text", GridInputClassName, " ", " ", "CurrencyDescA", " ");
                    txt.id = "hd_CurrencyDescA";
                    txt.disabled = true;
                    return HeaderTemplate(Resource.Name_Arabic, txt);
                }
            },
            {
                title: Resource.Name_English, css: "ColumPadding", name: "CurrencyDescE", headerTemplate: function () {
                    var txt = CreateElement("text", GridInputClassName, " ", " ", "CurrencyDescE", " ");
                    txt.id = "hd_CurrencyDescE";
                    txt.disabled = true;
                    return HeaderTemplate(Resource.Name_English, txt);
                }
            },
            {
                title: Resource.EquivalentCurrencyRate, css: "ColumPadding", name: "Rate", headerTemplate: function () {
                    var txt = CreateElement("text", GridInputClassName, " ", " ", "Rate", " ");
                    txt.id = "hd_Rate";
                    txt.disabled = false;
                    return HeaderTemplate(Resource.EquivalentCurrencyRate, txt);
                }
            },
            {
                title: "Flag", css: "ColumPadding hide", name: "Flag", width: "1%", headerTemplate: function () {
                    var txt = CreateElement("text", GridInputClassName, " ", " ", "Flag", " ");
                    txt.disabled = false;
                    txt.id = "hd_Flag";
                    return HeaderTemplate("Flag", txt);
                }
            },
            {
                title: "CurrencyId", css: "ColumPadding hide", name: "CurrencyId", width: "1%", headerTemplate: function () {
                    var txt = CreateElement("text", GridInputClassName, " ", " ", "CurrencyId", " ");
                    txt.disabled = false;
                    txt.id = "hd_CurrencyId";
                    return HeaderTemplate("CustomerId", txt);
                }
            },
            {
                title: "EquivalentCurrencyId", css: "ColumPadding hide", name: "EquivalentCurrencyId", width: "1%", headerTemplate: function () {
                    var txt = CreateElement("text", GridInputClassName, " ", " ", "EquivalentCurrencyId", " ");
                    txt.disabled = false;
                    txt.id = "hd_EquivalentCurrencyId";
                    return HeaderTemplate("EquivalentCurrencyId", txt);
                }
            },
            {
                title: "EqualCurrencyPriceId", css: "ColumPadding hide", name: "EqualCurrencyPriceId", width: "1%", headerTemplate: function () {
                    var txt = CreateElement("text", GridInputClassName, " ", " ", "EqualCurrencyPriceId", " ");
                    txt.disabled = false;
                    txt.id = "hd_EqualCurrencyPriceId";
                    return HeaderTemplate("EqualCurrencyPriceId", txt);
                }
            },
        ];
        divCurrencyRateGrid.Bind();
    }
    function FillValueInInputsCurrRate() {
        var code = $('#hd_CurrencyCode').val(), Currency = Currencies.filter(function (x) { return x.CurrencyId == code; })[0];
        if (Currency != null) {
            $('#hd_CurrencyDescA').val(Currency.CurrencyDescA);
            $('#hd_CurrencyDescE').val(Currency.CurrencyDescE);
            $('#hd_EquivalentCurrencyId').val(code);
        }
        else {
            $('#hd_CurrencyDescA').val('');
            $('#hd_CurrencyDescE').val('');
            $('#hd_EquivalentCurrencyId').val('');
        }
    }
    //////////////////////// End Add Currency Category In Grid /////////////////////////
    function ClearGrids() {
        currCategoryList = new Array();
        currRateList = new Array();
        ClearBranchesGrid();
    }
    function ClearBranchesGrid() {
        divCurrencyCategoryGrid.DataSource = currCategoryList;
        divCurrencyCategoryGrid.Bind();
        divCurrencyRateGrid.DataSource = currRateList;
        divCurrencyRateGrid.Bind();
    }
    function GetByID(Id) {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("MS_Currency", "GetById"),
            data: { id: Id },
            success: function (d) {
                var result = d;
                if (result.IsSuccess) {
                    Model = result.Response;
                    Display(Model);
                    SharedWork.SwitchModes(ScreenModes.Query);
                }
                else
                    MessageBox.Show(Resource.Error, Resource.Error);
            }
        });
    }
    function GetDetails(Id) {
        Ajax.Callsync({
            type: "Get", url: sys.apiUrl("MS_Currency", "GetDetails"),
            data: { id: Id },
            success: function (d) {
                var result = d;
                if (result.IsSuccess) {
                    CurrencyDetailsForModel = result.Response;
                    RenderDetailsGrid(CurrencyDetailsForModel);
                }
                else
                    MessageBox.Show(Resource.Error, Resource.Error);
            }
        });
    }
    function RenderDetailsGrid(Details) {
        currRateList = Details.CurrencyRate;
        currCategoryList = Details.CurrencyCategories;
        for (var i = 0; i < currCategoryList.length; i++) {
            currCategoryList[i].CurrencyType = currCategoryList[i].CurrencyType == "1" ? Resource.Paper : Resource.Coin;
        }
        divCurrencyCategoryGrid.DataSource = currCategoryList;
        divCurrencyCategoryGrid.Bind();
        divCurrencyRateGrid.DataSource = currRateList;
        divCurrencyRateGrid.Bind();
    }
    function Display(model) {
        DocumentActions.RenderFromModel(model);
        ObjectId = Number(model.CurrencyId);
        Model = model;
        GetDetails(model.CurrencyId);
        SharedWork.SwitchModes(ScreenModes.Query);
    }
    function Navigate() {
        Model = Currencies[SharedWork.PageIndex - 1];
        Display(Model);
        //GetByID(Model.CurrencyId);
    }
    function btnAdd_onclick() {
        StatusFlag = 'i';
        RemoveDisabled(true);
        element = DocumentActions.GetElementByName("LastModify");
        element.disabled = true;
        $('select option:first-child').val('null').prop("selected", true).prop("disabled", true);
    }
    function btnEdit_onclick() {
        if (ObjectId == 0) {
            MessageBox.Show(Resource.PleaseSelectItem, Resource.Error);
        }
        else {
            RemoveDisabled(false);
            element = DocumentActions.GetElementByName("CurrencyCode");
            element.disabled = true;
            element = DocumentActions.GetElementByName("LastModify");
            element.disabled = true;
            StatusFlag = 'u';
        }
    }
    function btnsave_onClick() {
        if (!ValidationHeader())
            return;
        Save();
    }
    function btnDelete_onClick() {
        Delete();
    }
    function ValidationHeader() {
        if (DocumentActions.GetElementByName("CurrencyCode").value == "") {
            MessageBox.Show(Resource.PleaseEnterCode, Resource.Error);
            return false;
        }
        else if (DocumentActions.CheckCode(Currencies, DocumentActions.GetElementByName("CurrencyCode").value, "CurrencyCode") == false && StatusFlag == "i") {
            MessageBox.Show(Resource.CodeCannotDuplicated, Resource.Error);
        }
        else if (DocumentActions.GetElementByName("CurrencyDescA").value == "") {
            MessageBox.Show(Resource.PleaseEnterNameArabic, Resource.Error);
            return false;
        }
        else
            return true;
    }
    function RemoveDisabled(clear) {
        DocumentActions.allElements(false, clear, Model);
    }
    function Disabled(clear) {
        DocumentActions.allElements(true, clear, Model);
    }
    function Undo() {
        Disabled(false);
        Success = false;
        GetDetails(ObjectId);
    }
    function Assign() {
        Model = DocumentActions.AssignToModel(Model);
        CurrencyDetailsForModel.Currency = Model;
        for (var i = 0; i < currCategoryList.length; i++) {
            currCategoryList[i].CurrencyType = currCategoryList[i].CurrencyType == Resource.Paper ? "1" : "2";
        }
        CurrencyDetailsForModel.CurrencyCategories = currCategoryList;
        CurrencyDetailsForModel.CurrencyRate = currRateList;
        console.log(CurrencyDetailsForModel);
        if (StatusFlag == "i") {
            Model.CreatedAt = DateTimeFormat(Date().toString());
            Model.CreatedBy = SysSession.CurrentEnvironment.UserCode;
            Insert();
        }
        if (StatusFlag == "u") {
            Model.CurrencyId = ObjectId;
            Model.UpdateAt = DateTimeFormat(Date().toString());
            Model.UpdateBy = SysSession.CurrentEnvironment.UserCode;
            Update();
        }
        ObjectId = Model.CurrencyId;
        GetAll();
        return true;
    }
    function Insert() {
        $("#MessageBoxDialog").modal("hide");
        Ajax.Callsync({
            type: "POST",
            url: sys.apiUrl("MS_Currency", "Insert"),
            data: JSON.stringify(CurrencyDetailsForModel),
            success: function (Response) {
                var result = Response;
                if (result.IsSuccess) {
                    CurrencyDetailsForModel = result.Response;
                    Model = CurrencyDetailsForModel.Currency;
                    ObjectId = Model.CurrencyId;
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
            url: sys.apiUrl("MS_Currency", "Update"),
            data: JSON.stringify(CurrencyDetailsForModel),
            success: function (Response) {
                var result = Response;
                if (result.IsSuccess) {
                    CurrencyDetailsForModel = result.Response;
                    Model = CurrencyDetailsForModel.Currency;
                    ObjectId = Model.CurrencyId;
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
            url: sys.apiUrl("MS_Currency", "Delete") + "/" + ObjectId,
            success: function (result) {
                if (result) {
                    ObjectId = 0;
                    Success = result;
                    GetAll();
                    Disabled(result);
                    SharedWork.SwitchModes(ScreenModes.NoData);
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
        sys.FindKey(Modules.MS_Currency, SharedButtons.btnSearch.id, "", function () {
            if (Model.CurrencyId != null) {
                Display(Model);
            }
        });
    }
    function Refrash() {
        GetAll();
        GetByID(Model.CurrencyId);
    }
})(MSCurrency || (MSCurrency = {}));
//# sourceMappingURL=MS_Currency.js.map