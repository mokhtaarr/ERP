$(document).ready(function () {
    SharedButtons.OnLoad();
    AccDefCustomer.InitalizeComponent();
});
var AccDefCustomer;
(function (AccDefCustomer) {
    $('#headertop1').addClass('display_none');
    $('#headertop2').removeClass('display_none');
    var sys = new SystemTools();
    var SysSession = GetSystemSession();
    var language = sys.SysSession.CurrentEnvironment.ScreenLanguage;
    var Resource = GetResourceList("");
    $('#headerTitle').text(Resource.AccountsChart);
    var Currency = new MS_Currency();
    var Currencies = new Array();
    var newAccountUsersToSave = new Cal_AccountUsers();
    var newArrayAccountUsersToSave = new Array();
    var MasterDetails = new MasterDetails_AccountChart();
    var NewAccount = new Cal_AccountUsersVm();
    var NewClause = new Cal_Clauses();
    var Clauses = new Array();
    var accountUsers = new Array();
    //var deletedDetails: Array<Cal_AccountUsersVm> = new Array<Cal_AccountUsersVm>();
    var AllUsers = new Array();
    var Details_ACCOUNT = new Array();
    var AccList = new Cal_AccountChart();
    var AQ_AccList = new Cal_AccountChart();
    var NewAcc = new Cal_AccountChart();
    var Data = new Array();
    var divPartitionGrid = new JsGrid();
    var divClausesGrid = new JsGrid();
    var divBalancMonthlyGrid = new JsGrid();
    var GridInputClassName = "form-control gridIput";
    // Select Option
    var mainAccountId;
    var CalcMethod;
    var AcountType;
    var AccountGroup;
    var AccCashFlow;
    var AccountNature;
    var CurrencyCode;
    //var CurrencyDescA: HTMLInputElement;
    var Rate;
    var Name_Acc;
    var txt_ACC_CODE;
    var txt_NAME_A;
    var txt_NAME_E;
    var txt_CreditLimit;
    var RemarksA;
    var RemarksE;
    var txt_Openbalance;
    var txt_Debit;
    var txt_DebitFC;
    var txt_balance;
    var txt_level;
    var chkeck_Detailed;
    //ragab //ragabمحلي       
    var txt_mainAccountId;
    var txt_mainAccountdes;
    var txt_OpenningBalanceCredit;
    var txt_OpenningBalanceDepit;
    var txt_AccCurrTrancDepit;
    var txt_AccCurrTrancCredit;
    var txt_AccTotalDebit;
    var txt_AccTotaCredit;
    var txt_BalanceDebitLocal;
    var txt_BalanceCreditLocal;
    //ragab عملة
    var txt_OpenningBalanceDepitCurncy;
    var txt_OpenningBalanceCreditCurncy;
    var txt_AccCurrTrancDepitCurncy;
    var txt_AccCurrTrancCreditCurncy;
    var txt_AccTotalDebitCurncy;
    var txt_AccTotaCreditCurncy;
    var txt_BalanceDebitCurncy;
    var txt_BalanceCreditCurncy;
    var txtCreatedBy;
    var txtCreatedAt;
    var txtUpdatedBy;
    var txtUpdatedAt;
    var AccountId = 0;
    var ParentId = 0;
    var NodeParent;
    var Success;
    var NAME = "";
    var StatusFlag;
    var ACC_CODE;
    var ACC_CODE_NodeParent;
    var AccountId_NodeParent = null;
    var CodeOfSystemNotAllowedToDeleted = [1, 2, 3, 4, 5, 6, 7];
    var listObjectTree;
    var nodeActive;
    var IsRefresh = false;
    function InitalizeComponent() {
        SharedButtons.compcode = Number(SysSession.CurrentEnvironment.CompCode);
        GetAllUsers();
        InitializeGrid();
        InitializeBalancMonthlyGrid();
        InitializeclausesGrid();
        localStorage.setItem("TableName", "Cal_AccountChart");
        GetAllCurrency();
        NavigateModule.InitalizeComponent();
        SharedWork.OnNavigate = Navigate;
        SharedButtons.AddAction(function () {
            clear();
            btnAdd_onclick();
            PushToSelect(false);
            getParent();
        });
        SharedButtons.DeleteAction(function () { btnDelete_onclick(); });
        SharedButtons.EditAction(function () { btnEdit_onclick(); PushToSelect(false); getParent(); });
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
        sys.JsTree(Data);
        GetAll();
    }
    AccDefCustomer.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        // select Option
        mainAccountId = document.getElementById("mainAccountId");
        AcountType = document.getElementById("AcountType");
        CalcMethod = document.getElementById("CalcMethod");
        AccountGroup = document.getElementById("AccountGroup");
        AccCashFlow = document.getElementById("AccCashFlow");
        AccountNature = document.getElementById("AccountNature");
        CurrencyCode = document.getElementById("CurrencyCode");
        Rate = document.getElementById("Rate");
        chkeck_Detailed = document.getElementById("chkeck_Detailed");
        ////textBoxes
        //CurrencyDescA = document.getElementById("CurrencyDescA") as HTMLInputElement;
        Name_Acc = document.getElementById("Name_Acc");
        txt_ACC_CODE = document.getElementById("txt_ACC_CODE");
        txt_NAME_A = document.getElementById("txt_NAME_A");
        txt_NAME_E = document.getElementById("txt_NAME_E");
        RemarksA = document.getElementById("RemarksA");
        RemarksE = document.getElementById("RemarksE");
        txt_level = document.getElementById("txt_level");
        txt_Debit = document.getElementById("txt_Debit");
        txt_DebitFC = document.getElementById("txt_DebitFC");
        txt_Openbalance = document.getElementById("txt_Openbalance");
        txt_CreditLimit = document.getElementById("txt_CreditLimit");
        txt_balance = document.getElementById("txt_balance");
        txtCreatedBy = document.getElementById("txtCreatedBy");
        txtCreatedAt = document.getElementById("txtCreatedAt");
        txtUpdatedBy = document.getElementById("txtUpdatedBy");
        txtUpdatedAt = document.getElementById("txtUpdatedAt");
        //ragabمحلي 
        txt_mainAccountId = document.getElementById("txt_mainAccountId");
        txt_mainAccountdes = document.getElementById("txt_mainAccountdes");
        txt_OpenningBalanceCredit = document.getElementById("txt_OpenningBalanceCredit");
        txt_OpenningBalanceDepit = document.getElementById("txt_OpenningBalanceDepit");
        txt_AccCurrTrancDepit = document.getElementById("txt_AccCurrTrancDepit");
        txt_AccCurrTrancCredit = document.getElementById("txt_AccCurrTrancCredit");
        txt_AccTotalDebit = document.getElementById("txt_AccTotalDebit");
        txt_AccTotaCredit = document.getElementById("txt_AccTotaCredit");
        txt_BalanceDebitLocal = document.getElementById("txt_BalanceDebitLocal");
        txt_BalanceCreditLocal = document.getElementById("txt_BalanceCreditLocal");
        //ragab عملة
        txt_OpenningBalanceDepitCurncy = document.getElementById("txt_OpenningBalanceDepitCurncy");
        txt_OpenningBalanceCreditCurncy = document.getElementById("txt_OpenningBalanceCreditCurncy");
        txt_AccCurrTrancDepitCurncy = document.getElementById("txt_AccCurrTrancDepitCurncy");
        txt_AccCurrTrancCreditCurncy = document.getElementById("txt_AccCurrTrancCreditCurncy");
        txt_AccTotalDebitCurncy = document.getElementById("txt_AccTotalDebitCurncy");
        txt_AccTotaCreditCurncy = document.getElementById("txt_AccTotaCreditCurncy");
        txt_BalanceDebitCurncy = document.getElementById("txt_BalanceDebitCurncy");
        txt_BalanceCreditCurncy = document.getElementById("txt_BalanceCreditCurncy");
        SharedButtons.btnSearch = document.getElementById("btnAccSearch");
    }
    function InitalizeEvents() {
        SharedButtons.btnSearch.onclick = btnSearch_onclick;
        SharedButtons.btnRefrash.onclick = Refrash;
        SharedButtons.btnRefrash2.onclick = Refrash;
    }
    function PushToSelect(queryMode) {
        var newData = new Array();
        newData = queryMode ? Details_ACCOUNT : Details_ACCOUNT.filter(function (x) { return x.AccountType == 1 || x.AccountType == 2; });
        DocumentActions.FillCombowithCode(newData, mainAccountId, "AccountId", "AccountNameA", "AccountCode", " ");
    }
    function Navigate() {
        AccList = Details_ACCOUNT[SharedWork.PageIndex - 1];
        click_in_labl(AccList.AccountId);
    }
    AccDefCustomer.Navigate = Navigate;
    function AddItemInGrid() {
        NewAccount = new Cal_AccountUsersVm();
        NewAccount.AccUserId = $("#hd_AccUserId").val().trim();
        NewAccount.UserId = $("#hd_USERNAME option:selected").val().trim();
        NewAccount.USERNAME = $("#hd_USERNAME option:selected").text().trim();
        NewAccount.TranAndView = $('#hd_TranAndView').is(":checked");
        NewAccount.Remarks1 = $('#hd_Remarks1').val().trim();
        NewAccount.Remarks2 = $('#hd_Remarks2').val().trim();
        NewAccount.AccountId = AccountId;
        if ($('#hd_AccUserId').val().trim() == "")
            NewAccount.AccUserId = 0;
        else
            NewAccount.AccUserId = $('#hd_AccUserId').val().trim();
        if ($('#hd_Flag').val().trim() == "u")
            NewAccount.StatusFlag = "u";
        else
            NewAccount.StatusFlag = "i";
        if (DocumentActions.CheckCode(accountUsers, NewAccount.UserId.toString(), "UserId") == false && NewAccount.StatusFlag == "i") {
            MessageBox.Toastr(Resource.CodeCannotDuplicated, Resource.Error, ToastrTypes.error);
        }
        else {
            accountUsers.unshift(NewAccount);
            divPartitionGrid.DataSource = accountUsers;
            divPartitionGrid.Bind();
        }
        return;
    }
    function InitializeGrid() {
        divPartitionGrid.ElementName = "divPartitionGrid";
        divPartitionGrid.PrimaryKey = "AccUserId";
        divPartitionGrid.Inserting = true;
        divPartitionGrid.Editing = true;
        divPartitionGrid.ConfirmDeleteing = true;
        divPartitionGrid.InsertionMode = JsGridInsertionMode.Binding;
        divPartitionGrid.OnItemInserting = function () { };
        divPartitionGrid.OnItemUpdating = function () { };
        divPartitionGrid.OnItemDeleting = function () { };
        divPartitionGrid.Columns = [
            {
                title: "#", name: "btnAddItem", visible: true, width: "30px",
                headerTemplate: function () {
                    var btn = DocumentActions.CreateElement("button");
                    btn.className = TransparentButton + " editable addable ";
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
                    btn.name = accountUsers.indexOf(item).toString();
                    btn.id = "btnRemoveItemGrid";
                    btn.onclick = function (e) {
                        var index = Number(e.currentTarget.name);
                        accountUsers[index].StatusFlag = "d";
                        accountUsers.push(accountUsers[index]);
                        accountUsers.splice(index, 1);
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
                    btn.name = accountUsers.indexOf(item).toString();
                    btn.id = "btnUpdateItemGrid";
                    btn.onclick = function (e) {
                        var index = Number(e.currentTarget.name);
                        accountUsers.splice(index, 1);
                        divPartitionGrid.DataSource = accountUsers;
                        divPartitionGrid.Bind();
                        if (item.AccUserId != null)
                            FillInputText("hd_AccUserId", item.AccUserId.toString());
                        if (item.USERNAME != null)
                            SelectDrobInGrid("hd_USERNAME", item.UserId.toString());
                        if (item.TranAndView != null)
                            $('#hd_TranAndView').prop("checked", item.TranAndView);
                        if (item.Remarks1 != null)
                            FillInputText("hd_Remarks1", item.Remarks1.toString());
                        if (item.Remarks2 != null)
                            FillInputText("hd_Remarks2", item.Remarks2.toString());
                        FillInputText("hd_Flag", "u");
                    };
                    return btn;
                }
            },
            {
                title: Resource.Name, css: "ColumPadding", name: "USERNAME",
                headerTemplate: function () {
                    var txt = CreateDropdownList(AllUsers, "USERNAME", "USERNAME", "UserId", true);
                    txt.id = "hd_USERNAME";
                    return HeaderTemplateDropdownList(Resource.Name, txt);
                }
            },
            {
                title: Resource.MovementAndReading, css: "ColumPadding", name: "TranAndView",
                headerTemplate: function () {
                    var txt = CreateElement("checkbox", GridInputClassName, " ", " ", "TranAndView", " ");
                    txt.id = "hd_TranAndView";
                    return HeaderTemplate(Resource.MovementAndReading, txt);
                }
            },
            {
                title: Resource.Notes + "1", css: "ColumPadding", name: "Remarks1",
                headerTemplate: function () {
                    var txt = CreateElement("text", GridInputClassName, " ", " ", "Remarks1", " ");
                    txt.id = "hd_Remarks1";
                    return HeaderTemplate(Resource.Notes + "1", txt);
                }
            },
            {
                title: Resource.Notes + "2", css: "ColumPadding", name: "Remarks2",
                headerTemplate: function () {
                    var txt = CreateElement("text", GridInputClassName, " ", " ", "Remarks2", " ");
                    txt.id = "hd_Remarks2";
                    return HeaderTemplate(Resource.Notes + "2", txt);
                }
            },
            {
                title: "Flag", css: "ColumPadding display_none", name: "Flag", width: "1%",
                headerTemplate: function () {
                    var txt = CreateElement("text", GridInputClassName, " ", " ", "Flag", " ");
                    txt.disabled = false;
                    txt.id = "hd_Flag";
                    return HeaderTemplate("Flag", txt);
                }
            },
            {
                title: "AccUserId", css: "ColumPadding display_none", name: "AccUserId", width: "1%",
                headerTemplate: function () {
                    var txt = CreateElement("text", GridInputClassName, "", " ", "AccUserId", " ");
                    txt.disabled = false;
                    txt.id = "hd_AccUserId";
                    return HeaderTemplate("AccUserId", txt);
                }
            },
        ];
        divPartitionGrid.Bind();
    }
    function AddClauseInGrid() {
        NewClause = new Cal_Clauses();
        NewClause.ClausesCode = $("#hd_ClausesCode").val().trim();
        NewClause.NameAr = $("#hd_NameAr").val().trim();
        NewClause.NameEn = $("#hd_NameEn").val().trim();
        NewClause.Percentage = $("#hd_Percentage").val().trim();
        NewClause.Debtor = $("#hd_Debtor").val().trim();
        NewClause.Creditor = $("#hd_Creditor").val().trim();
        NewClause.Balance = $("#hd_Balance").val().trim();
        NewClause.AccountId = $("#hd_AccountId").val().trim();
        if ($('#hd_ClausesId').val().trim() == "")
            NewClause.ClausesId = 0;
        else
            NewClause.ClausesId = $('#hd_ClausesId').val().trim();
        if ($('#hd_Flag').val().trim() == "u")
            NewClause.StatusFlag = "u";
        else
            NewClause.StatusFlag = "i";
        if (DocumentActions.CheckCode(Clauses, NewClause.ClausesCode.toString(), "ClausesCode") == false && NewClause.StatusFlag == "i") {
            MessageBox.Toastr(Resource.CodeCannotDuplicated, Resource.Error, ToastrTypes.error);
        }
        else if (NewClause.NameAr == "") {
            MessageBox.Toastr(" برجاء أدخل الاسم بالعربي", Resource.Error, ToastrTypes.error);
        }
        else {
            Clauses.unshift(NewClause);
            divClausesGrid.DataSource = Clauses;
            divClausesGrid.Bind();
        }
        return;
    }
    function InitializeclausesGrid() {
        divClausesGrid.ElementName = "divClausesGrid";
        divClausesGrid.PrimaryKey = "ClausesId";
        divClausesGrid.Inserting = true;
        divClausesGrid.Editing = true;
        divClausesGrid.ConfirmDeleteing = true;
        divClausesGrid.InsertionMode = JsGridInsertionMode.Binding;
        divClausesGrid.OnItemInserting = function () { };
        divClausesGrid.OnItemUpdating = function () { };
        divClausesGrid.OnItemDeleting = function () { };
        divClausesGrid.Columns = [
            {
                title: "#", name: "btnAddItem", visible: true, width: "45px",
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
                        AddClauseInGrid();
                    };
                    return btn;
                },
                itemTemplate: function (s, item) {
                    var btn = DocumentActions.CreateElement("button");
                    btn.innerHTML = "<i class='fas fa-times'></i>";
                    btn.className = TransparentButton + "  red_Delete_Cotnrol editable";
                    btn.type = "button";
                    btn.name = Clauses.indexOf(item).toString();
                    btn.id = "btnRemoveItemGrid";
                    btn.onclick = function (e) {
                        var index = Number(e.currentTarget.name);
                        Clauses[index].StatusFlag = "d";
                        Clauses.push(Clauses[index]);
                        Clauses.splice(index, 1);
                        divClausesGrid.Bind();
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
                    btn.name = Clauses.indexOf(item).toString();
                    btn.id = "btnUpdateItemGrid";
                    btn.onclick = function (e) {
                        var index = Number(e.currentTarget.name);
                        Clauses.splice(index, 1);
                        divClausesGrid.DataSource = Clauses;
                        divClausesGrid.Bind();
                        if (item.ClausesId != null)
                            FillInputText("hd_ClausesId", item.ClausesId.toString());
                        if (item.AccountId != null)
                            SelectDrobInGrid("hd_AccountId", item.AccountId.toString());
                        if (item.ClausesCode != null)
                            FillInputText("hd_ClausesCode", item.ClausesCode.toString());
                        if (item.NameAr != null)
                            FillInputText("hd_NameAr", item.NameAr.toString());
                        if (item.NameEn != null)
                            FillInputText("hd_NameEn", item.NameEn.toString());
                        if (item.Percentage != null)
                            FillInputText("hd_Percentage", item.Percentage.toString());
                        if (item.Creditor != null)
                            FillInputText("hd_Creditor", item.Creditor.toString());
                        if (item.Debtor != null)
                            FillInputText("hd_Debtor", item.Debtor.toString());
                        if (item.Balance != null)
                            FillInputText("hd_Balance", item.Balance.toString());
                        FillInputText("hd_Flag", "u");
                    };
                    return btn;
                }
            },
            {
                title: Resource.Code2 + Resource.Clause, css: "ColumPadding", name: "ClausesCode", headerTemplate: function () {
                    var txt = CreateElement("text", GridInputClassName, " ", " ", "ClausesCode", " ");
                    txt.id = "hd_ClausesCode";
                    return HeaderTemplate(Resource.Code2 + Resource.Clause, txt);
                }
            },
            {
                title: Resource.Name_Arabic, css: "ColumPadding", name: "NameAr", headerTemplate: function () {
                    var txt = CreateElement("text", GridInputClassName, "", "", "NameAr", "");
                    txt.id = "hd_NameAr";
                    return HeaderTemplate(Resource.Name_Arabic, txt);
                }
            },
            {
                title: Resource.Name_English, css: "ColumPadding", name: "NameEn", headerTemplate: function () {
                    var txt = CreateElement("text", GridInputClassName, "", "", "NameEn", "");
                    txt.id = "hd_NameEn";
                    return HeaderTemplate(Resource.Name_English, txt);
                }
            },
            {
                title: Resource.Percentage, css: "ColumPadding", name: "Percentage", headerTemplate: function () {
                    var txt = CreateElement("text", GridInputClassName, "", "", "Percentage", "");
                    txt.id = "hd_Percentage";
                    return HeaderTemplate(Resource.Percentage, txt);
                }
            },
            {
                title: Resource.Debtor, css: "ColumPadding", name: "Debtor", headerTemplate: function () {
                    var txt = CreateElement("text", GridInputClassName, "", "", "Debtor", "");
                    txt.id = "hd_Debtor";
                    return HeaderTemplate(Resource.Debtor, txt);
                }
            },
            {
                title: Resource.Creditor, css: "ColumPadding", name: "Creditor", headerTemplate: function () {
                    var txt = CreateElement("text", GridInputClassName, "", "", "Creditor", "");
                    txt.id = "hd_Creditor";
                    return HeaderTemplate(Resource.Creditor, txt);
                }
            },
            {
                title: Resource.App_Balanc, css: "ColumPadding", name: "Balance", headerTemplate: function () {
                    var txt = CreateElement("text", GridInputClassName, "", "", "Balance", "");
                    txt.id = "hd_Balance";
                    return HeaderTemplate(Resource.App_Balanc, txt);
                }
            },
            {
                title: "AccountId", css: "ColumPadding display_none", name: "AccountId", width: "1%", headerTemplate: function () {
                    var txt = CreateElement("text", GridInputClassName, "", " ", "AccountId", " ");
                    txt.disabled = false;
                    txt.id = "hd_AccountId";
                    return HeaderTemplate("AccountId", txt);
                }
            },
            {
                title: "ClausesId", css: "ColumPadding display_none", name: "ClausesId", width: "1%", headerTemplate: function () {
                    var txt = CreateElement("text", GridInputClassName, "", " ", "ClausesId", " ");
                    txt.disabled = false;
                    txt.id = "hd_ClausesId";
                    return HeaderTemplate("ClausesId", txt);
                }
            },
            {
                title: "Flag", css: "ColumPadding display_none", name: "Flag", width: "1%", headerTemplate: function () {
                    var txt = CreateElement("text", GridInputClassName, "", " ", "Flag", " ");
                    txt.disabled = false;
                    txt.id = "hd_Flag";
                    return HeaderTemplate("Flag", txt);
                }
            },
        ];
        divClausesGrid.Bind();
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
                        AddItemInGrid();
                    };
                    return btn;
                },
                itemTemplate: function (s, item) {
                    var btn = DocumentActions.CreateElement("button");
                    btn.innerHTML = "<i class='fas fa-times'></i>";
                    btn.className = TransparentButton + "  red_Delete_Cotnrol editable";
                    btn.type = "button";
                    btn.name = accountUsers.indexOf(item).toString();
                    btn.id = "btnRemoveItemGrid";
                    btn.onclick = function (e) {
                        var index = Number(e.currentTarget.name);
                        accountUsers[index].StatusFlag = "d";
                        accountUsers.push(accountUsers[index]);
                        accountUsers.splice(index, 1);
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
                    btn.name = accountUsers.indexOf(item).toString();
                    btn.id = "btnUpdateItemGrid";
                    btn.onclick = function (e) {
                        var index = Number(e.currentTarget.name);
                        accountUsers.splice(index, 1);
                        divBalancMonthlyGrid.DataSource = accountUsers;
                        divBalancMonthlyGrid.Bind();
                        if (item.AccUserId != null)
                            FillInputText("hd_AccUserId", item.AccUserId.toString());
                        if (item.USERNAME != null)
                            SelectDrobInGrid("hd_USERNAME", item.UserId.toString());
                        if (item.TranAndView != null)
                            FillInputText("hd_TranAndView", item.TranAndView.toString());
                        if (item.Remarks1 != null)
                            FillInputText("hd_Remarks1", item.Remarks1.toString());
                        if (item.Remarks2 != null)
                            FillInputText("hd_Remarks2", item.Remarks2.toString());
                        FillInputText("hd_Flag", "u");
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
    function FillInputText(_TextID, _Data) {
        $("#" + _TextID).text(_Data);
        $("#" + _TextID).val(_Data);
        var elment = $("#" + _TextID)[0];
        if (elment.type == "checkbox")
            $("#" + _TextID).prop('checked', true);
    }
    function SelectDrobInGrid(_TextID, _Data) {
        var elment = $("#" + _TextID)[0];
        elment.value = _Data;
    }
    function GetAll() {
        Details_ACCOUNT = new Array();
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("GLDefAccount", "GetAll"),
            success: function (d) {
                var result = d;
                if (result.IsSuccess) {
                    Details_ACCOUNT = result.Response;
                    FillTreeData();
                }
            }
        });
    }
    function GetById(Id) {
        var Account = new Cal_AccountChart();
        Ajax.Callsync({
            type: "Get",
            data: { id: Id },
            url: sys.apiUrl("GLDefAccount", "GetById"),
            success: function (d) {
                var result = d;
                if (result.IsSuccess) {
                    Account = result.Response;
                }
            }
        });
        return Account;
    }
    function GetAllClausesById(Id) {
        Ajax.Callsync({
            type: "Get",
            data: { id: Id },
            url: sys.apiUrl("GLDefAccount", "GetAllClausesById"),
            success: function (d) {
                var result = d;
                if (result.IsSuccess) {
                    Clauses = result.Response;
                    divClausesGrid.DataSource = Clauses;
                    divClausesGrid.Bind();
                }
            }
        });
    }
    function FillTreeData() {
        Data = new Array();
        $('#Tree').jstree(true).settings.core.data = Data;
        $('#Tree').jstree(true).refresh();
        for (var i = 0; i < Details_ACCOUNT.length; i++) {
            Data.push({
                id: Details_ACCOUNT[i].AccountId,
                parent: (Details_ACCOUNT[i].mainAccountId != null ? Details_ACCOUNT[i].mainAccountId.toString() : "#"),
                text: Details_ACCOUNT[i].AccountCode + " " + (language == "ar" ? Details_ACCOUNT[i].AccountNameA : Details_ACCOUNT[i].AccountNameE),
                "state": { "opened": true }
            });
        }
        $('#Tree').jstree(true).settings.core.data = Data;
        $('#Tree').jstree(true).refresh();
    }
    AccDefCustomer.FillTreeData = FillTreeData;
    $('#Tree').on("select_node.jstree", function (e, data) { click_in_labl(data.node.id); });
    function Display(model) {
        DocumentActions.RenderFromModel(model);
        AQ_AccList = model;
        AccountId = Number(AQ_AccList.AccountId);
    }
    function click_in_labl(Id) {
        var _a, _b, _c, _d;
        AQ_AccList = new Cal_AccountChart();
        AQ_AccList = GetById(Id);
        if (AQ_AccList != null) {
            AccountId = Number(AQ_AccList.AccountId);
            GetAllUsersById(AccountId);
            GetAllClausesById(AccountId);
            SelectCurrency(AQ_AccList.CurrencyId, 0);
            AccountId_NodeParent = Number(AQ_AccList.mainAccountId);
            var mainAccount = Details_ACCOUNT.filter(function (x) { return x.AccountId == AccountId_NodeParent; })[0];
            txt_mainAccountdes.value = mainAccount == undefined ? "" : mainAccount === null || mainAccount === void 0 ? void 0 : mainAccount.AccountNameA;
            txt_mainAccountId.value = mainAccount == null ? "" : mainAccount.AccountCode;
            mainAccountId.value = (_a = AQ_AccList.mainAccountId) === null || _a === void 0 ? void 0 : _a.toString();
            NodeParent = AccountId;
            NAME = AQ_AccList.AccountNameA;
            ACC_CODE = AQ_AccList.AccountCode;
            ACC_CODE_NodeParent = AQ_AccList.mainAccountId;
            Name_Acc.innerHTML = "" + NAME + " ( " + ACC_CODE + " )";
            ;
            Name_Acc.setAttribute('data-level', AQ_AccList.AccountLevel.toString());
            txt_ACC_CODE.value = AQ_AccList.AccountCode;
            txt_NAME_A.value = AQ_AccList.AccountNameA;
            txt_NAME_E.value = AQ_AccList.AccountNameE == 'null' ? '' : AQ_AccList.AccountNameE;
            RemarksA.value = AQ_AccList.RemarksA == "null" ? "" : AQ_AccList.RemarksA;
            RemarksE.value = AQ_AccList.RemarksE == "null" ? "" : AQ_AccList.RemarksE;
            txt_level.value = AQ_AccList.AccountLevel.toString();
            AccCashFlow.value = (_b = AQ_AccList.AccCashFlow) === null || _b === void 0 ? void 0 : _b.toString();
            AccountNature.value = (_c = AQ_AccList.AccountNature) === null || _c === void 0 ? void 0 : _c.toString();
            AcountType.value = (_d = AQ_AccList.AccountType) === null || _d === void 0 ? void 0 : _d.toString();
            CalcMethod.value = AQ_AccList.CalcMethod == true ? "1" : "0";
            AccountGroup.value = AQ_AccList.AccountGroup.toString();
            //ragab محلي
            txt_OpenningBalanceCredit.value = CheckValue(AQ_AccList.OpenningBalanceCredit);
            txt_OpenningBalanceDepit.value = CheckValue(AQ_AccList.OpenningBalanceDepit);
            txt_AccCurrTrancDepit.value = CheckValue(AQ_AccList.AccCurrTrancDepit);
            txt_AccCurrTrancCredit.value = CheckValue(AQ_AccList.AccCurrTrancCredit);
            txt_AccTotalDebit.value = CheckValue(AQ_AccList.AccTotalDebit);
            txt_AccTotaCredit.value = CheckValue(AQ_AccList.AccTotaCredit);
            txt_BalanceDebitLocal.value = CheckValue(AQ_AccList.BalanceDebitLocal);
            txt_BalanceCreditLocal.value = CheckValue(AQ_AccList.BalanceCreditLocal);
            //ragab عملة
            txt_OpenningBalanceDepitCurncy.value = CheckValue(AQ_AccList.OpenningBalanceDepitCurncy);
            txt_OpenningBalanceCreditCurncy.value = CheckValue(AQ_AccList.OpenningBalanceCreditCurncy);
            txt_AccCurrTrancDepitCurncy.value = CheckValue(AQ_AccList.AccCurrTrancDepitCurncy);
            txt_AccCurrTrancCreditCurncy.value = CheckValue(AQ_AccList.AccCurrTrancCreditCurncy);
            txt_AccTotalDebitCurncy.value = CheckValue(AQ_AccList.AccTotalDebitCurncy);
            txt_AccTotaCreditCurncy.value = CheckValue(AQ_AccList.AccTotaCreditCurncy);
            txt_BalanceDebitCurncy.value = CheckValue(AQ_AccList.BalanceDebitCurncy);
            txt_BalanceCreditCurncy.value = CheckValue(AQ_AccList.BalanceCreditCurncy);
            chkeck_Detailed.checked = Details_ACCOUNT.filter(function (x) { return x.mainAccountId == Number(Id); }).length == 0 ? true : false;
        }
        SharedWork.SwitchModes(ScreenModes.Query);
    }
    function CheckValue(value) {
        var _a;
        return IsNullOrEmpty(value) == false ? (_a = value.toFixed(3)) === null || _a === void 0 ? void 0 : _a.toString() : "0.000";
    }
    function btnAdd_onclick() {
        if (Name_Acc.innerHTML == '') {
            txt_level.value = '1';
            Name_Acc.innerHTML = "اضافه في المستوي الاول ";
        }
        else {
            txt_level.value = (Number(Name_Acc.getAttribute('data-level')) + 1).toString();
            NAME = SysSession.CurrentEnvironment.ScreenLanguage == "ar" ? txt_NAME_A.value : txt_NAME_E.value;
            Name_Acc.innerHTML = "اضافه داخل " + NAME + " ( " + ACC_CODE + " ) ";
        }
        clear();
        RemoveDisabled();
        setAccountGroupAndCalcMethod(AccountId);
        StatusFlag = 'i';
    }
    function clear() {
        //CurrencyDescA.value = '';
        Rate.value = '';
        CurrencyCode.value = '';
        txt_ACC_CODE.value = '';
        txt_NAME_A.value = '';
        txt_NAME_E.value = '';
        mainAccountId.value = 'null';
        AcountType.value = 'null';
        AccountNature.value = 'null';
        AccCashFlow.value = 'null';
        CalcMethod.value = 'null';
        AccountGroup.value = 'null';
        RemarksA.value = '';
        RemarksE.value = '';
        var Cal_AccountUsers = new Array();
        divPartitionGrid.DataSource = Cal_AccountUsers;
        divPartitionGrid.Bind();
        Clauses = new Array();
        divClausesGrid.DataSource = Clauses;
        divClausesGrid.Bind();
        accountUsers = new Array();
    }
    function RemoveDisabled() {
        CurrencyCode.disabled = false;
        txt_ACC_CODE.disabled = false;
        txt_NAME_A.disabled = false;
        txt_NAME_E.disabled = false;
        RemarksA.disabled = false;
        RemarksE.disabled = false;
        mainAccountId.disabled = false;
        AcountType.disabled = false;
        AccountNature.disabled = false;
        AccCashFlow.disabled = false;
        $('#left').addClass("disabledDiv");
    }
    function Undo() {
        if (StatusFlag == 'i') {
            Name_Acc.innerHTML = '';
        }
        PushToSelect(true);
        clear();
        Disabled();
        click_in_labl(AccountId);
        Success = false;
    }
    function Disabled() {
        CurrencyCode.disabled = true;
        txt_ACC_CODE.disabled = true;
        txt_NAME_A.disabled = true;
        txt_NAME_E.disabled = true;
        RemarksA.disabled = true;
        RemarksE.disabled = true;
        txt_level.disabled = true;
        chkeck_Detailed.disabled = true;
        mainAccountId.disabled = true;
        AcountType.disabled = true;
        AccCashFlow.disabled = true;
        AccountNature.disabled = true;
        CalcMethod.disabled = true;
        AccountGroup.disabled = true;
        $('#left').removeClass("disabledDiv");
    }
    function btnEdit_onclick() {
        if (Name_Acc.innerHTML == '') {
            MessageBox.Toastr(" برجاء أختيار مستوي", "خطأ", ToastrTypes.error);
        }
        else {
            RemoveDisabled();
            txt_ACC_CODE.disabled = true;
            StatusFlag = 'u';
        }
    }
    function btnsave_onClick() {
        if (!ValidationHeader())
            return;
        if (txt_NAME_E.value == "") {
            txt_NAME_E.value = txt_NAME_A.value;
        }
        Save();
    }
    function ValidationHeader() {
        if (txt_ACC_CODE.value == "") {
            MessageBox.Toastr(" برجاء أدخل رقم الحساب", "خطأ", ToastrTypes.error);
            return false;
        }
        else if (txt_NAME_A.value == "") {
            MessageBox.Toastr(" برجاء أدخل الاسم بالعربي", "خطأ", ToastrTypes.error);
            return false;
        }
        else if (CurrencyCode.value == "") {
            MessageBox.Toastr(" برجاء أدخل كود العملة", "خطأ", ToastrTypes.error);
            return false;
        }
        if (CurrencyCode.value != "" && Rate.value == "") {
            MessageBox.Toastr(" رجاء أدخل كود عملة صالح", "خطأ", ToastrTypes.error);
            return false;
        }
        return true;
    }
    function Save() {
        AQ_AccList = new Cal_AccountChart();
        AQ_AccList = Details_ACCOUNT.filter(function (x) { return x.AccountCode == txt_ACC_CODE.value; })[0];
        if (AQ_AccList != null && StatusFlag == "i") {
            MessageBox.Toastr('لا يمكنك تكرار رقم الحساب ', '(Error)', ToastrTypes.error);
        }
        else {
            Assign();
            if (Success == true) {
                Disabled();
                Success = false;
                SharedWork.SwitchModes(ScreenModes.Query);
                GetAll();
            }
        }
    }
    function Assign() {
        AccList = new Cal_AccountChart();
        Currency = GetCurrency(0, Number(CurrencyCode.value));
        if (StatusFlag == "i") {
            AccList.StatusFlag = StatusFlag.toString();
            AccList.AccountId = 0;
            AccList.Aid = 1;
            AccList.CurrencyId = Currency.CurrencyId;
            AccList.AccountCode = txt_ACC_CODE.value;
            AccList.AccountNameA = txt_NAME_A.value;
            AccList.AccountNameE = txt_NAME_E.value;
            AccList.AccountLevel = Number(txt_level.value);
            AccList.CalcMethod = CalcMethod.value == "0" ? false : true;
            AccList.mainAccountId = NodeParent;
            AccList.RemarksA = RemarksA.value.toString();
            AccList.RemarksE = RemarksE.value.toString();
            AccList.AccountType = Number(AcountType.value);
            AccList.AccountGroup = Number(AccountGroup.value);
            AccList.AccCashFlow = Number(AccCashFlow.value);
            AccList.AccountNature = Number(AccountNature.value);
            AccList.CreatedAt = DateTimeFormat(Date().toString());
            AccList.CreatedBy = SysSession.CurrentEnvironment.UserCode;
            FillMasterAndDetails();
            Insert();
        }
        if (StatusFlag == "u") {
            AccList = Details_ACCOUNT.filter(function (x) { return x.AccountCode == txt_ACC_CODE.value; })[0];
            AccList.StatusFlag = StatusFlag.toString();
            AccList.AccountId = AccountId;
            AccList.Aid = 1;
            AccList.CurrencyId = Currency.CurrencyId;
            AccList.AccountCode = txt_ACC_CODE.value;
            AccList.AccountNameA = txt_NAME_A.value;
            AccList.AccountNameE = txt_NAME_E.value;
            AccList.AccountLevel = Number(txt_level.value);
            AccList.CalcMethod = CalcMethod.value == "0" ? false : true;
            AccList.mainAccountId = AccList.mainAccountId;
            AccList.RemarksA = RemarksA.value.toString();
            AccList.RemarksE = RemarksE.value.toString();
            AccList.AccountType = Number(AcountType.value);
            AccList.AccountGroup = Number(AccountGroup.value);
            AccList.AccCashFlow = Number(AccCashFlow.value);
            AccList.AccountNature = Number(AccountNature.value);
            AccList.UpdatedAt = DateTimeFormat(Date().toString());
            AccList.UpdatedBy = SysSession.CurrentEnvironment.UserCode;
            FillMasterAndDetails();
            Update();
        }
        else if (txt_NAME_A.value == "") {
            MessageBox.Toastr(" برجاء أدخل الاسم بالعربي", "خطأ", ToastrTypes.error);
            return false;
        }
        return true;
    }
    function FillMasterAndDetails() {
        MasterDetails.Cal_AccountChart = AccList;
        newArrayAccountUsersToSave = new Array();
        accountUsers.forEach(function (x) {
            newAccountUsersToSave = new Cal_AccountUsers();
            newAccountUsersToSave.AccUserId = x.AccUserId;
            newAccountUsersToSave.AccountId = x.AccountId;
            newAccountUsersToSave.UserId = x.UserId;
            newAccountUsersToSave.Remarks1 = x.Remarks1;
            newAccountUsersToSave.Remarks2 = x.Remarks2;
            newAccountUsersToSave.TranAndView = x.TranAndView;
            newAccountUsersToSave.StatusFlag = x.StatusFlag;
            newArrayAccountUsersToSave.push(newAccountUsersToSave);
        });
        MasterDetails.Cal_AccountUsers = newArrayAccountUsersToSave;
        MasterDetails.Clauses = Clauses;
    }
    function Insert() {
        $("#MessageBoxDialog").modal("hide");
        Ajax.Callsync({
            type: "POST",
            url: sys.apiUrl("GLDefAccount", "Insert"),
            data: JSON.stringify(MasterDetails),
            success: function (d) {
                var result = d;
                if (result.IsSuccess) {
                    Success = true;
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
            url: sys.apiUrl("GLDefAccount", "Update"),
            data: JSON.stringify(MasterDetails),
            success: function (d) {
                var result = d;
                if (result.IsSuccess) {
                    Success = true;
                }
                else {
                    MessageBox.Toastr("خطأء", "خطأء", ToastrTypes.error);
                    Success = false;
                }
            }
        });
    }
    function btnDelete_onclick() {
        var alloweToDelete = CodeOfSystemNotAllowedToDeleted.indexOf(ACC_CODE) == -1 ? true : false;
        if (Name_Acc.innerHTML == '') {
            MessageBox.Toastr(" برجاء أختيار مستوي", "خطأ", ToastrTypes.error);
        }
        else {
            if (chkeck_Detailed.checked == true) {
                if (alloweToDelete) {
                    StatusFlag = 'd';
                    Delete();
                }
                else {
                    MessageBox.Toastr("لايمكن حذف الحساب لانه حساب نظامي", "خطأ", ToastrTypes.error);
                }
            }
            else {
                MessageBox.Toastr(" لا يمكنك الحذف لانه لديه ابناء", "خطأ", ToastrTypes.error);
            }
        }
    }
    function Delete() {
        $("#MessageBoxDialog").modal("hide");
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("GLDefAccount", "Delete") + "/" + AccountId,
            success: function (result) {
                if (result) {
                    Success = true;
                    //DaleteOldData()
                }
                else {
                    MessageBox.Toastr("خطأء", "خطأء", ToastrTypes.error);
                    Success = false;
                }
            }
        });
    }
    //function PushData(result: Cal_AccountChart) {
    //    Details_ACCOUNT.push(result);
    //    Data.push({
    //        id: result.AccountId,
    //        parent: (result.mainAccountId != null ? result.mainAccountId.toString() : "#"),
    //        text: result.AccountCode + " " + result.AccountNameA
    //    });
    //    $('#Tree').jstree(true).settings.core.data = Data;
    //    $('#Tree').jstree(true).refresh();
    //}
    //function RemoveFromArray(id) {
    //    for (var i = 0; i < Data.length; i++) {
    //        if (Data[i].id == id) {
    //            Data.splice(i, 1);
    //            break;
    //        }
    //    }
    //    for (var i = 0; i < Details_ACCOUNT.length; i++) {
    //        if (Details_ACCOUNT[i].AccountId == id) {
    //            Details_ACCOUNT.splice(i, 1);
    //            break;
    //        }
    //    }
    //}
    //function DaleteOldData() {
    //    RemoveFromArray(AccountId);
    //    $('#Tree').jstree(true).settings.core.data = Data;
    //    $('#Tree').jstree(true).refresh();
    //}
    function getParent() {
        var newAccountId = AccountId;
        for (var i = 0; i < Details_ACCOUNT.length; i++) {
            AQ_AccList = new Cal_AccountChart();
            AQ_AccList = Details_ACCOUNT.filter(function (x) { return x.AccountId == Number(newAccountId); })[0];
            if (AQ_AccList != null) {
                if (AQ_AccList.AccountType == 2 || AQ_AccList.AccountType == 1) {
                    ParentId = AQ_AccList.AccountId;
                    mainAccountId.value = ParentId.toString();
                    break;
                }
                else
                    newAccountId = AQ_AccList.mainAccountId;
            }
        }
    }
    $('#mainAccountId').on('change', function () {
        setAccountGroupAndCalcMethod($(this).val());
    });
    function setAccountGroupAndCalcMethod(id) {
        var _a;
        AQ_AccList = new Cal_AccountChart();
        AQ_AccList = Details_ACCOUNT.filter(function (x) { return x.AccountId == Number(id); })[0];
        if (AQ_AccList != null) {
            AccountGroup.value = (_a = AQ_AccList.AccountGroup) === null || _a === void 0 ? void 0 : _a.toString();
            CalcMethod.value = AQ_AccList.CalcMethod ? "1" : "0";
            AccountGroup.disabled = true;
            CalcMethod.disabled = true;
        }
        else {
            AccountGroup.disabled = false;
            CalcMethod.disabled = false;
        }
    }
    function GetAllUsers() {
        Ajax.Callsync({
            type: "GET",
            url: sys.apiUrl("GLDefAccount", "GetAllUsers"),
            success: function (d) {
                var result = d;
                if (result.IsSuccess) {
                    AllUsers = result.Response;
                }
                else
                    MessageBox.Toastr("خطأء", "خطأء", ToastrTypes.error);
            }
        });
    }
    $('#CurrencyCode').on('change', function () {
        var val = $(this).val();
        SelectCurrency(0, val);
    });
    function GetAllCurrency() {
        Ajax.CallAsync({
            type: "Get",
            url: sys.apiUrl("GLDefAccount", "GetCurrencies"),
            success: function (d) {
                var result = d;
                if (result.IsSuccess) {
                    Currencies = result.Response;
                    PushToCurrencySelect(Currencies);
                }
                else
                    MessageBox.Toastr("خطأء", "خطأء", ToastrTypes.error);
            }
        });
    }
    function PushToCurrencySelect(data) {
        DocumentActions.FillComboWithEmpty(data, CurrencyCode, "CurrencyCode", "CurrencyDescA");
    }
    function SelectCurrency(currencyId, code) {
        GetCurrency(currencyId, code);
        FillCurrency(Currency);
    }
    function GetCurrency(currencyId, code) {
        Currency = new MS_Currency;
        if (currencyId != 0 && code == 0)
            Currency = Currencies.filter(function (x) { return x.CurrencyId == currencyId; })[0];
        else if (currencyId == 0 && code != 0)
            Currency = Currencies.filter(function (x) { return x.CurrencyCode == code; })[0];
        return Currency;
    }
    function FillCurrency(Currency) {
        if (Currency != null) {
            CurrencyCode.value = Currency.CurrencyCode.toString();
            Rate.value = Currency.Rate.toFixed(2).toString();
        }
        else {
            Rate.value = "";
            CurrencyCode.value = null;
        }
    }
    function GetAllUsersById(id) {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("GLDefAccount", "GetAllUsersById") + "/" + id,
            success: function (d) {
                var result = d;
                if (result.IsSuccess) {
                    accountUsers = result.Response;
                    divPartitionGrid.DataSource = accountUsers;
                    divPartitionGrid.Bind();
                }
                else
                    MessageBox.Toastr("خطأء", "خطأء", ToastrTypes.error);
            }
        });
    }
    function btnSearch_onclick() {
        var sys = new SystemTools();
        sys.FindKey(Modules.Acc, SharedButtons.btnSearch.id, "", function () {
            var id = SearchGrid.SearchDataGrid.SelectedKey;
            if (!IsNullOrEmpty(id)) {
                click_in_labl(id);
            }
        });
    }
    function Refrash() {
        var _a;
        nodeActive = $('.jstree-anchor.jstree-clicked');
        GetAll();
        var id = '';
        if (nodeActive != null) {
            if (nodeActive.length > 0) {
                id = (_a = nodeActive[0]) === null || _a === void 0 ? void 0 : _a.id.split("_")[0];
                AccountId = Number(id);
                click_in_labl(AccountId);
            }
        }
        var interval_id = setInterval(function () {
            listObjectTree = $('.jstree-children .jstree-node .jstree-anchor');
            listObjectTree.removeClass('jstree-clicked');
            $($('#' + AccountId + ' a')[0]).addClass('jstree-clicked');
            clearInterval(interval_id);
        }, 50);
    }
})(AccDefCustomer || (AccDefCustomer = {}));
//# sourceMappingURL=GLDefAccount.js.map