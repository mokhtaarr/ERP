$(document).ready(function () {
    SharedButtons.OnLoad();
    MsTerms.InitalizeComponent();
});
var MsTerms;
(function (MsTerms) {
    var Resource = GetResourceList("");
    $('#headertop1').addClass('display_none');
    $('#headertop2').removeClass('display_none');
    $('#headerTitle').text(Resource.DocumentType);
    var sys = new SystemTools();
    var language = sys.SysSession.CurrentEnvironment.ScreenLanguage;
    var SysSession = GetSystemSession();
    var compCode = SysSession.CurrentEnvironment.CompCode;
    var UserCode = SysSession.CurrentEnvironment.UserCode;
    var Token = "HGFD-" + SysSession.CurrentEnvironment.Token;
    var AllTermsIds = new Array();
    var Model = new Ms_Terms();
    var Details = new Ms_TermsDetails();
    var HeaderAndDetails = new TermsHeaderAndDetails();
    var Terms = new Array();
    var Books = new Array();
    var CostCenters = new Array();
    var AccountChart = new Array();
    // select Options
    var element;
    var TermType;
    var JournalEntryBookId;
    var JournalEntryTermId;
    var CashOrCredit;
    var BookId;
    var InventoryBookId;
    var InventoryTermId;
    //////////////// Details ///////////////////
    var AccountDebitFixed;
    var AccountCreditFixed;
    var AccountDiscIsFixed;
    var AccountTaxIsFixed;
    var AccountCashIsFixed;
    var AddAccount1IsFixed;
    var AddAccountIsFixed2;
    var AddAccountIsFixed3;
    var AddAccountIsFixed4;
    var AddAccountIsFixed5;
    var CostCenterDebitFixed;
    var CostCenterCreditFixed;
    var CostCenterDiscIsFixed;
    var CostCenterTaxIsFixed;
    var CostCenterCashIsFixed;
    var AddCostCenter1IsFixed;
    var AddCostCenterIsFixed2;
    var AddCostCenterIsFixed3;
    var AddCostCenterIsFixed4;
    var AddCostCenterIsFixed5;
    var AccDiscDebitOrCredit, AccTaxDebitOrCredit, AccCashDebitOrCredit, AddAcc1DebitOrCredit, AddAcc2DebitOrCredit, AddAcc3DebitOrCredit, AddAcc4DebitOrCredit, AddAcc5DebitOrCredit, UseItemTax;
    var ValuAccountDebit, ValuAccountCredit, ValuAccountDisc, ValuAccountTax, ValuAccountCash, ValuAddAccount1, ValuAddAccount2, ValuAddAccount3, ValuAddAccount4, ValuAddAccount5;
    var AccountIdDebit, AccountIdCredit, AccountIdDisc, AccountIdTax, AccountIdCash, AddAccountId1, AddAccountId2, AddAccountId3, AddAccountId4, AddAccountId5;
    var CostCenterIdDebit, CostCenterIdCredit, CostCenterIdDisc, CostCenterIdTax, CostCenterIdCash, AddCostCenterId1, AddCostCenterId2, AddCostCenterId3, AddCostCenterId4, AddCostCenterId5;
    var ObjectId = 0;
    var StatusFlag;
    var Success;
    var hasNodes;
    var flag = true;
    var flagTotal = true;
    var AccountId;
    function InitalizeComponent() {
        localStorage.setItem("TableName", "Ms_Terms");
        NavigateModule.InitalizeComponent();
        SharedButtons.compcode = Number(SysSession.CurrentEnvironment.CompCode);
        SharedWork.OnNavigate = Navigate;
        SharedButtons.AddAction(function () {
            btnAdd_onclick();
        });
        SharedButtons.DeleteAction(function () { btnDelete_onclick(); });
        SharedButtons.EditAction(function () { btnEdit_onclick(); });
        SharedButtons.UndoAction(function () {
            Undo();
            if (ObjectId == 0)
                SharedWork.SwitchModes(ScreenModes.Start);
        });
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
        GetaccountAndCostCenter();
        GetAccDiscDebitOrCredit();
        GetJournalEntryBooks(13);
        GetJournalEntryTerm(13);
        GetMovementType();
        GetUseItemTax();
        GetDocType();
        GetAll();
    }
    MsTerms.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        SharedButtons.btnSearch = document.getElementById("btnMs_TermsSearch");
        TermType = document.getElementById("TermType");
        JournalEntryBookId = document.getElementById("JournalEntryBookId");
        JournalEntryTermId = document.getElementById("JournalEntryTermId");
        CashOrCredit = document.getElementById("CashOrCredit");
        BookId = document.getElementById("BookId");
        InventoryBookId = document.getElementById("InventoryBookId");
        InventoryTermId = document.getElementById("InventoryTermId");
        //////////////// Details ///////////////////
        AccountDebitFixed = document.getElementById("AccountDebitFixed");
        AccountCreditFixed = document.getElementById("AccountCreditFixed");
        AccountDiscIsFixed = document.getElementById("AccountDiscIsFixed");
        AccountTaxIsFixed = document.getElementById("AccountTaxIsFixed");
        AccountCashIsFixed = document.getElementById("AccountCashIsFixed");
        AddAccount1IsFixed = document.getElementById("AddAccount1IsFixed");
        AddAccountIsFixed2 = document.getElementById("AddAccountIsFixed2");
        AddAccountIsFixed3 = document.getElementById("AddAccountIsFixed3");
        AddAccountIsFixed4 = document.getElementById("AddAccountIsFixed4");
        AddAccountIsFixed5 = document.getElementById("AddAccountIsFixed5");
        CostCenterDebitFixed = document.getElementById("CostCenterDebitFixed");
        CostCenterCreditFixed = document.getElementById("CostCenterCreditFixed");
        CostCenterDiscIsFixed = document.getElementById("CostCenterDiscIsFixed");
        CostCenterTaxIsFixed = document.getElementById("CostCenterTaxIsFixed");
        CostCenterCashIsFixed = document.getElementById("CostCenterCashIsFixed");
        AddCostCenter1IsFixed = document.getElementById("AddCostCenter1IsFixed");
        AddCostCenterIsFixed2 = document.getElementById("AddCostCenterIsFixed2");
        AddCostCenterIsFixed3 = document.getElementById("AddCostCenterIsFixed3");
        AddCostCenterIsFixed4 = document.getElementById("AddCostCenterIsFixed4");
        AddCostCenterIsFixed5 = document.getElementById("AddCostCenterIsFixed5");
        AccTaxDebitOrCredit = document.getElementById("AccTaxDebitOrCredit");
        AccDiscDebitOrCredit = document.getElementById("AccDiscDebitOrCredit");
        AccCashDebitOrCredit = document.getElementById("AccCashDebitOrCredit");
        AddAcc1DebitOrCredit = document.getElementById("AddAcc1DebitOrCredit");
        AddAcc2DebitOrCredit = document.getElementById("AddAcc2DebitOrCredit");
        AddAcc3DebitOrCredit = document.getElementById("AddAcc3DebitOrCredit");
        AddAcc4DebitOrCredit = document.getElementById("AddAcc4DebitOrCredit");
        AddAcc5DebitOrCredit = document.getElementById("AddAcc5DebitOrCredit");
        UseItemTax = document.getElementById("UseItemTax");
        ValuAccountDebit = document.getElementById("ValuAccountDebit");
        ValuAccountCredit = document.getElementById("ValuAccountCredit");
        ValuAccountDisc = document.getElementById("ValuAccountDisc");
        ValuAccountTax = document.getElementById("ValuAccountTax");
        ValuAccountCash = document.getElementById("ValuAccountCash");
        ValuAddAccount1 = document.getElementById("ValuAddAccount1");
        ValuAddAccount2 = document.getElementById("ValuAddAccount2");
        ValuAddAccount3 = document.getElementById("ValuAddAccount3");
        ValuAddAccount4 = document.getElementById("ValuAddAccount4");
        ValuAddAccount5 = document.getElementById("ValuAddAccount5");
        AccountIdDebit = document.getElementById("AccountIdDebit");
        AccountIdCredit = document.getElementById("AccountIdCredit");
        AccountIdDisc = document.getElementById("AccountIdDisc");
        AccountIdTax = document.getElementById("AccountIdTax");
        AccountIdCash = document.getElementById("AccountIdCash");
        AddAccountId1 = document.getElementById("AddAccountId1");
        AddAccountId2 = document.getElementById("AddAccountId2");
        AddAccountId3 = document.getElementById("AddAccountId3");
        AddAccountId4 = document.getElementById("AddAccountId4");
        AddAccountId5 = document.getElementById("AddAccountId5");
        CostCenterIdDebit = document.getElementById("CostCenterIdDebit");
        CostCenterIdCredit = document.getElementById("CostCenterIdCredit");
        CostCenterIdDisc = document.getElementById("CostCenterIdDisc");
        CostCenterIdTax = document.getElementById("CostCenterIdTax");
        CostCenterIdCash = document.getElementById("CostCenterIdCash");
        AddCostCenterId1 = document.getElementById("AddCostCenterId1");
        AddCostCenterId2 = document.getElementById("AddCostCenterId2");
        AddCostCenterId3 = document.getElementById("AddCostCenterId3");
        AddCostCenterId4 = document.getElementById("AddCostCenterId4");
        AddCostCenterId5 = document.getElementById("AddCostCenterId5");
    }
    function InitalizeEvents() {
        SharedButtons.btnSearch.onclick = btnSearch_onclick;
        SharedButtons.btnRefrash2.onclick = Refrash;
        TermType.onchange = function () {
            TermTypechanged(TermType.value);
        };
    }
    function GetAll() {
        Disabled(false);
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("Ms_Terms", "GetAll"),
            success: function (d) {
                var result = d;
                if (result.IsSuccess) {
                    AllTermsIds = result.Response;
                    //console.log(Terms)
                }
            }
        });
    }
    function GetByID(Id) {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("Ms_Terms", "GetById"),
            data: { id: Id },
            success: function (d) {
                var result = d;
                if (result.IsSuccess) {
                    var res = result.Response;
                    Display(res);
                    SharedWork.SwitchModes(ScreenModes.Query);
                }
                else
                    MessageBox.Toastr(Resource.Error, Resource.Error, ToastrTypes.error);
            }
        });
    }
    function Assign() {
        HeaderAndDetails.Terms = DocumentActions.AssignToModel(Model);
        HeaderAndDetails.TermsDetails = DocumentActions.AssignToModel(Details);
        if (StatusFlag == "i") {
            Model.CreatedAt = DateTimeFormat(Date().toString());
            Model.CreatedBy = SysSession.CurrentEnvironment.UserCode;
            Insert();
        }
        if (StatusFlag == "u") {
            Model.TermId = ObjectId;
            var TermsDetails = Details == null ? new Ms_TermsDetails : Details;
            HeaderAndDetails.TermsDetails = DocumentActions.AssignToModel(TermsDetails);
            Model.UpdateAt = DateTimeFormat(Date().toString());
            Model.UpdateBy = SysSession.CurrentEnvironment.UserCode;
            Update();
        }
        ObjectId = Model.TermId;
        GetAll();
        return true;
    }
    function Save() {
        if (DocumentActions.CheckCode(AllTermsIds, DocumentActions.GetElementByName("TermCode").value, "TermCode") == false && StatusFlag == "i") {
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
            url: sys.apiUrl("Ms_Terms", "Insert"),
            data: JSON.stringify(HeaderAndDetails),
            success: function (Response) {
                var result = Response;
                if (result.IsSuccess) {
                    HeaderAndDetails = result.Response;
                    ObjectId = HeaderAndDetails.Terms.TermId;
                    Success = true;
                }
                else {
                    MessageBox.Toastr(Resource.Error, Resource.Error, ToastrTypes.error);
                    Success = false;
                }
            }
        });
    }
    function Update() {
        $("#MessageBoxDialog").modal("hide");
        Ajax.Callsync({
            type: "POST",
            url: sys.apiUrl("Ms_Terms", "Update"),
            data: JSON.stringify(HeaderAndDetails),
            success: function (Response) {
                var result = Response;
                if (result.IsSuccess) {
                    HeaderAndDetails = result.Response;
                    ObjectId = HeaderAndDetails.Terms.TermId;
                    Success = true;
                }
                else {
                    MessageBox.Toastr(Resource.Error, Resource.Error, ToastrTypes.error);
                    Success = false;
                }
            }
        });
    }
    function Delete() {
        $("#MessageBoxDialog").modal("hide");
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("Ms_Terms", "Delete"),
            data: { id: Model.TermId, TermDetailsId: Details.TermDetailId },
            success: function (result) {
                if (result) {
                    Success = true;
                    GetAll();
                    Disabled(result);
                    $('select').val('null').select2().trigger('change');
                }
                else {
                    MessageBox.Toastr(Resource.Error, Resource.Error, ToastrTypes.error);
                    Success = false;
                }
            }
        });
    }
    function btnAdd_onclick() {
        StatusFlag = 'i';
        RemoveDisabled(true);
        $('select option:first-child').val('null').prop("selected", true).prop("disabled", true);
    }
    function btnEdit_onclick() {
        if (ObjectId == 0) {
            MessageBox.Toastr(Resource.PleaseSelectItem, Resource.Error, ToastrTypes.error);
        }
        else {
            RemoveDisabled(false);
            element = DocumentActions.GetElementByName("TermCode");
            element.disabled = true;
            element = DocumentActions.GetElementByName("TermType");
            element.disabled = true;
            StatusFlag = 'u';
        }
    }
    function btnsave_onClick() {
        if (!Validation())
            return;
        Save();
    }
    function btnDelete_onclick() {
        StatusFlag == "d";
        if (ObjectId == 0) {
            MessageBox.Toastr(Resource.PleaseSelectItem, Resource.Error, ToastrTypes.error);
        }
        else {
            Delete();
        }
    }
    function Validation() {
        if (DocumentActions.GetElementByName("TermCode").value == "") {
            MessageBox.Toastr(Resource.PleaseEnterCode, Resource.Error, ToastrTypes.error);
            flag = false;
        }
        else if (DocumentActions.GetElementByName("TermName").value == "") {
            MessageBox.Toastr(Resource.EnterNameOfDocumentType, Resource.Error, ToastrTypes.error);
            flag = false;
        }
        else if (DocumentActions.GetElementByName("AccountDebitFixed").value == "1" && DocumentActions.GetElementByName("AccountIdDebit").value == 'null') {
            MessageBox.Toastr(Resource.SelectAccountIn + "' " + Resource.App_Debtor + " '", Resource.Error, ToastrTypes.error);
            flag = false;
        }
        else if (DocumentActions.GetElementByName("CostCenterDebitFixed").value == "1" && DocumentActions.GetElementByName("CostCenterIdDebit").value == 'null') {
            MessageBox.Toastr(Resource.SelectCostCenterIn + "' " + Resource.App_Debtor + " '", Resource.Error, ToastrTypes.error);
            flag = false;
        }
        else if (DocumentActions.GetElementByName("AccountCreditFixed").value == "1" && DocumentActions.GetElementByName("AccountIdCredit").value == 'null') {
            MessageBox.Toastr(Resource.SelectAccountIn + "' " + Resource.Creditor + " '", Resource.Error, ToastrTypes.error);
            flag = false;
        }
        else if (DocumentActions.GetElementByName("CostCenterCreditFixed").value == "1" && DocumentActions.GetElementByName("CostCenterIdCredit").value == 'null') {
            MessageBox.Toastr(Resource.SelectCostCenterIn + "' " + Resource.Creditor + " '", Resource.Error, ToastrTypes.error);
            flag = false;
        }
        else if (DocumentActions.GetElementByName("AccountDiscIsFixed").value == "1" && DocumentActions.GetElementByName("AccountIdDisc").value == 'null') {
            MessageBox.Toastr(Resource.SelectAccountIn + "' " + Resource.Discount2 + " '", Resource.Error, ToastrTypes.error);
            flag = false;
        }
        else if (DocumentActions.GetElementByName("CostCenterDiscIsFixed").value == "1" && DocumentActions.GetElementByName("CostCenterIdDisc").value == 'null') {
            MessageBox.Toastr(Resource.SelectCostCenterIn + "' " + Resource.Discount2 + " '", Resource.Error, ToastrTypes.error);
            flag = false;
        }
        else if (DocumentActions.GetElementByName("AccountTaxIsFixed").value == "1" && DocumentActions.GetElementByName("AccountIdTax").value == 'null') {
            MessageBox.Toastr(Resource.SelectAccountIn + "' " + Resource.Taxes + " '", Resource.Error, ToastrTypes.error);
            flag = false;
        }
        else if (DocumentActions.GetElementByName("CostCenterTaxIsFixed").value == "1" && DocumentActions.GetElementByName("CostCenterIdTax").value == 'null') {
            MessageBox.Toastr(Resource.SelectCostCenterIn + "' " + Resource.Taxes + " '", Resource.Error, ToastrTypes.error);
            flag = false;
        }
        else if (DocumentActions.GetElementByName("AccountCashIsFixed").value == "1" && DocumentActions.GetElementByName("AccountIdCash").value == 'null') {
            MessageBox.Toastr(Resource.SelectAccountIn + "' " + Resource.Cash + " '", Resource.Error, ToastrTypes.error);
            flag = false;
        }
        else if (DocumentActions.GetElementByName("CostCenterCashIsFixed").value == "1" && DocumentActions.GetElementByName("CostCenterIdCash").value == 'null') {
            MessageBox.Toastr(Resource.SelectCostCenterIn + "' " + Resource.Cash + " '", Resource.Error, ToastrTypes.error);
            flag = false;
        }
        else if (DocumentActions.GetElementByName("AddAccount1IsFixed").value == "1" && DocumentActions.GetElementByName("AddAccountId1").value == 'null') {
            MessageBox.Toastr(Resource.SelectAccountIn + "' " + Resource.Expenses + " '", Resource.Error, ToastrTypes.error);
            flag = false;
        }
        else if (DocumentActions.GetElementByName("AddCostCenter1IsFixed").value == "1" && DocumentActions.GetElementByName("AddCostCenterId1").value == 'null') {
            MessageBox.Toastr(Resource.SelectCostCenterIn + "' " + Resource.Expenses + " '", Resource.Error, ToastrTypes.error);
            flag = false;
        }
        else if (DocumentActions.GetElementByName("AddAccountIsFixed2").value == "1" && DocumentActions.GetElementByName("AddAccountId2").value == 'null') {
            MessageBox.Toastr(Resource.SelectAccountIn + "' " + Resource.ExtraAccount + " 2" + " '", Resource.Error, ToastrTypes.error);
            flag = false;
        }
        else if (DocumentActions.GetElementByName("AddCostCenterIsFixed2").value == "1" && DocumentActions.GetElementByName("AddCostCenterId2").value == 'null') {
            MessageBox.Toastr(Resource.SelectCostCenterIn + "' " + Resource.ExtraAccount + " 2" + " '", Resource.Error, ToastrTypes.error);
            flag = false;
        }
        else if (DocumentActions.GetElementByName("AddAccountIsFixed3").value == "1" && DocumentActions.GetElementByName("AddAccountId3").value == 'null') {
            MessageBox.Toastr(Resource.SelectAccountIn + "' " + Resource.ExtraAccount + " 3" + " '", Resource.Error, ToastrTypes.error);
            flag = false;
        }
        else if (DocumentActions.GetElementByName("AddCostCenterIsFixed3").value == "1" && DocumentActions.GetElementByName("AddCostCenterId3").value == 'null') {
            MessageBox.Toastr(Resource.SelectCostCenterIn + "' " + Resource.ExtraAccount + " 3" + " '", Resource.Error, ToastrTypes.error);
            flag = false;
        }
        else if (DocumentActions.GetElementByName("AddAccountIsFixed4").value == "1" && DocumentActions.GetElementByName("AddAccountId4").value == 'null') {
            MessageBox.Toastr(Resource.SelectAccountIn + "' " + Resource.ExtraAccount + " 4" + " '", Resource.Error, ToastrTypes.error);
            flag = false;
        }
        else if (DocumentActions.GetElementByName("AddCostCenterIsFixed4").value == "1" && DocumentActions.GetElementByName("AddCostCenterId4").value == 'null') {
            MessageBox.Toastr(Resource.SelectCostCenterIn + "' " + Resource.ExtraAccount + " 4" + " '", Resource.Error, ToastrTypes.error);
            flag = false;
        }
        else if (DocumentActions.GetElementByName("AddAccountIsFixed5").value == "1" && DocumentActions.GetElementByName("AddAccountId5").value == 'null') {
            MessageBox.Toastr(Resource.SelectAccountIn + "' " + Resource.ExtraAccount + " 5" + " '", Resource.Error, ToastrTypes.error);
            flag = false;
        }
        else if (DocumentActions.GetElementByName("AddCostCenterIsFixed5").value == "1" && DocumentActions.GetElementByName("AddCostCenterId5").value == 'null') {
            MessageBox.Toastr(Resource.SelectCostCenterIn + "' " + Resource.ExtraAccount + " 5" + " '", Resource.Error, ToastrTypes.error);
            flag = false;
        }
        else
            flag = true;
        return flag;
    }
    function Navigate() {
        Model = AllTermsIds[SharedWork.PageIndex - 1];
        ObjectId = Model.TermId;
        GetByID(ObjectId);
    }
    MsTerms.Navigate = Navigate;
    function Display(model) {
        Model = model.Terms;
        Details = model.TermsDetails /*== null ? new Ms_TermsDetails : model.TermsDetails*/;
        if (Model.TermType != null)
            TermTypechanged(Model.TermType.toString());
        DocumentActions.RenderFromModel(Model);
        var TermsDetails = Details;
        if (Details == null) {
            TermsDetails = new Ms_TermsDetails;
            DocumentActions.allElements(true, true, TermsDetails);
            Details = DocumentActions.AssignToModel(TermsDetails);
        }
        DocumentActions.RenderFromModel(Details);
        ObjectId = Number(Model.TermId);
    }
    function Undo() {
        Disabled(false);
        Success = false;
        if (ObjectId != 0) {
            GetByID(ObjectId);
        }
    }
    function Disabled(clear) {
        var TermsDetails = Details == null ? new Ms_TermsDetails : Details;
        DocumentActions.allElements(true, clear, Model);
        DocumentActions.allElements(true, clear, TermsDetails);
        $('#left').removeClass("disabledDiv");
    }
    function RemoveDisabled(clear) {
        var TermsDetails = Details == null ? new Ms_TermsDetails : Details;
        DocumentActions.allElements(false, clear, Model);
        DocumentActions.allElements(false, clear, TermsDetails);
        $('#left').addClass("disabledDiv");
    }
    function GetModel(id) {
        Model = AllTermsIds.filter(function (x) { return x.TermId == id; })[0];
        return Model;
    }
    function TermTypechanged(TermType) {
        if (TermType != "null") {
            GetAllBooks(Number(TermType));
            GetAccDiscIsFixed(Number(TermType));
            GetCostDescIsFixed(Number(TermType));
            FillComboValuNames(Number(TermType));
            switch (Number(TermType)) {
                case 2:
                    GetInventoryBooks(11);
                    GetInventoryTerms(11);
                    break;
                case 3:
                    GetInventoryBooks(11);
                    GetInventoryTerms(11);
                    break;
                case 1:
                    GetInventoryBooks(10);
                    GetInventoryTerms(10);
                    break;
                case 4:
                    GetInventoryBooks(10);
                    GetInventoryTerms(10);
                    break;
                default:
                    DocumentActions.FillCombowithdefult([], InventoryBookId, "BookId", (language == "ar" ? "BookNameAR" : "BookNameEN"), Resource.SupplyBook);
                    DocumentActions.FillCombowithdefult([], InventoryTermId, "TermId", "TermName", Resource.SupplyDocumentType);
                    break;
            }
        }
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
                    DocumentActions.FillCombowithdefult(Books, JournalEntryBookId, "BookId", (language == "ar" ? "BookNameAR" : "BookNameEN"), Resource.EntryDocumentType);
                }
            }
        });
    }
    function GetJournalEntryTerm(type) {
        if (type === void 0) { type = null; }
        Ajax.Callsync({
            type: "Get",
            data: { type: type },
            url: sys.apiUrl("funcationShared", "GetAllTerms"),
            success: function (Response) {
                var result = Response;
                if (result.IsSuccess) {
                    Terms = result.Response;
                    DocumentActions.FillCombowithdefult(Terms, JournalEntryTermId, "TermId", "TermName", Resource.EntryDocumentType);
                }
            }
        });
    }
    function GetAllBooks(type) {
        if (type === void 0) { type = null; }
        Ajax.Callsync({
            type: "Get",
            data: { type: type },
            url: sys.apiUrl("funcationShared", "GetAllBooks"),
            success: function (Response) {
                var result = Response;
                if (result.IsSuccess) {
                    Books = result.Response;
                    DocumentActions.FillCombowithdefult(Books, BookId, "BookId", (language == "ar" ? "BookNameAR" : "BookNameEN"), Resource.Notebook);
                }
            }
        });
    }
    function GetInventoryBooks(type) {
        if (type === void 0) { type = null; }
        Ajax.Callsync({
            type: "Get",
            data: { type: type },
            url: sys.apiUrl("funcationShared", "GetAllBooks"),
            success: function (Response) {
                var result = Response;
                if (result.IsSuccess) {
                    Books = result.Response;
                    DocumentActions.FillCombowithdefult(Books, InventoryBookId, "BookId", (language == "ar" ? "BookNameAR" : "BookNameEN"), Resource.SupplyBook);
                }
            }
        });
    }
    function GetInventoryTerms(type) {
        if (type === void 0) { type = null; }
        Ajax.Callsync({
            type: "Get",
            data: { type: type },
            url: sys.apiUrl("funcationShared", "GetAllTerms"),
            success: function (Response) {
                var result = Response;
                if (result.IsSuccess) {
                    Terms = result.Response;
                    DocumentActions.FillCombowithdefult(Terms, InventoryTermId, "TermId", "TermName", Resource.SupplyDocumentType);
                }
            }
        });
    }
    function GetCostCenters() {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("funcationShared", "GetAllSubCostCenters"),
            success: function (Response) {
                var result = Response;
                if (result.IsSuccess) {
                    CostCenters = result.Response;
                }
            }
        });
        return CostCenters;
    }
    function GetAllAccountChart() {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("funcationShared", "GetAllSubAccountChart"),
            success: function (Response) {
                var result = Response;
                if (result.IsSuccess) {
                    AccountChart = result.Response;
                    //console.log(AccountChart);
                }
            }
        });
        return AccountChart;
    }
    function GetaccountAndCostCenter() {
        AccountChart = GetAllAccountChart();
        CostCenters = GetCostCenters();
        IntialAccountAndCostCenter(AccountChart, CostCenters);
    }
    function IntialAccountAndCostCenter(accountChart, costCenters) {
        DocumentActions.FillCombowithCode(accountChart, AccountIdDebit, "AccountId", (language == "ar" ? "AccountNameA" : "AccountNameE"), "AccountCode", Resource.Account2);
        DocumentActions.FillCombowithCode(accountChart, AccountIdCredit, "AccountId", (language == "ar" ? "AccountNameA" : "AccountNameE"), "AccountCode", Resource.Account2);
        DocumentActions.FillCombowithCode(accountChart, AccountIdDisc, "AccountId", (language == "ar" ? "AccountNameA" : "AccountNameE"), "AccountCode", Resource.Account2);
        DocumentActions.FillCombowithCode(accountChart, AccountIdTax, "AccountId", (language == "ar" ? "AccountNameA" : "AccountNameE"), "AccountCode", Resource.Account2);
        DocumentActions.FillCombowithCode(accountChart, AccountIdCash, "AccountId", (language == "ar" ? "AccountNameA" : "AccountNameE"), "AccountCode", Resource.Account2);
        DocumentActions.FillCombowithCode(accountChart, AddAccountId1, "AccountId", (language == "ar" ? "AccountNameA" : "AccountNameE"), "AccountCode", Resource.Account2);
        DocumentActions.FillCombowithCode(accountChart, AddAccountId2, "AccountId", (language == "ar" ? "AccountNameA" : "AccountNameE"), "AccountCode", Resource.Account2);
        DocumentActions.FillCombowithCode(accountChart, AddAccountId3, "AccountId", (language == "ar" ? "AccountNameA" : "AccountNameE"), "AccountCode", Resource.Account2);
        DocumentActions.FillCombowithCode(accountChart, AddAccountId4, "AccountId", (language == "ar" ? "AccountNameA" : "AccountNameE"), "AccountCode", Resource.Account2);
        DocumentActions.FillCombowithCode(accountChart, AddAccountId5, "AccountId", (language == "ar" ? "AccountNameA" : "AccountNameE"), "AccountCode", Resource.Account2);
        DocumentActions.FillCombowithCode(costCenters, CostCenterIdDebit, "CostCenterId", (language == "ar" ? "CostCenterNameA" : "CostCenterNameE"), "CostCenterCode", Resource.CostCenter);
        DocumentActions.FillCombowithCode(costCenters, CostCenterIdCredit, "CostCenterId", (language == "ar" ? "CostCenterNameA" : "CostCenterNameE"), "CostCenterCode", Resource.CostCenter);
        DocumentActions.FillCombowithCode(costCenters, CostCenterIdDisc, "CostCenterId", (language == "ar" ? "CostCenterNameA" : "CostCenterNameE"), "CostCenterCode", Resource.CostCenter);
        DocumentActions.FillCombowithCode(costCenters, AccountIdTax, "CostCenterId", (language == "ar" ? "CostCenterNameA" : "CostCenterNameE"), "CostCenterCode", Resource.CostCenter);
        DocumentActions.FillCombowithCode(costCenters, CostCenterIdTax, "CostCenterId", (language == "ar" ? "CostCenterNameA" : "CostCenterNameE"), "CostCenterCode", Resource.CostCenter);
        DocumentActions.FillCombowithCode(costCenters, CostCenterIdCash, "CostCenterId", (language == "ar" ? "CostCenterNameA" : "CostCenterNameE"), "CostCenterCode", Resource.CostCenter);
        DocumentActions.FillCombowithCode(costCenters, AddCostCenterId1, "CostCenterId", (language == "ar" ? "CostCenterNameA" : "CostCenterNameE"), "CostCenterCode", Resource.CostCenter);
        DocumentActions.FillCombowithCode(costCenters, AddCostCenterId2, "CostCenterId", (language == "ar" ? "CostCenterNameA" : "CostCenterNameE"), "CostCenterCode", Resource.CostCenter);
        DocumentActions.FillCombowithCode(costCenters, AddCostCenterId3, "CostCenterId", (language == "ar" ? "CostCenterNameA" : "CostCenterNameE"), "CostCenterCode", Resource.CostCenter);
        DocumentActions.FillCombowithCode(costCenters, AddCostCenterId4, "CostCenterId", (language == "ar" ? "CostCenterNameA" : "CostCenterNameE"), "CostCenterCode", Resource.CostCenter);
        DocumentActions.FillCombowithCode(costCenters, AddCostCenterId5, "CostCenterId", (language == "ar" ? "CostCenterNameA" : "CostCenterNameE"), "CostCenterCode", Resource.CostCenter);
    }
    function GetDocType() {
        var DocType = new Array();
        var DocTypefinal = new Array();
        var obj = { Key: 0, Value: "" };
        if (language == "ar") {
            DocType.push(0, "لا يوجد");
            DocType.push(1, "فاتورة مشتريات");
            DocType.push(2, "فاتورة مبيعات");
            DocType.push(3, "مرتجع مشتريات");
            DocType.push(4, "مرتجع مبيعات");
            DocType.push(5, "تسويــات");
            DocType.push(6, "مستند قبض");
            DocType.push(7, "مستند دفع");
            DocType.push(8, "تحويلات ماليه");
            DocType.push(9, "تحويلات مخزنيه");
            DocType.push(10, "توريد مخزنى");
            DocType.push(11, "صرف مخزنى");
            DocType.push(12, "جرد الأصناف");
            DocType.push(13, "قيد يوميه");
            DocType.push(14, "حافظه بنكيه");
            DocType.push(15, "تصفية عهده");
            DocType.push(16, "إشعار بنكى");
            DocType.push(17, "عرض سعر");
            DocType.push(18, "أمر شراء");
            DocType.push(19, "أمر انتاج");
            DocType.push(20, "أمر شغل");
            DocType.push(21, "أمر بيع");
            DocType.push(22, "طلب عرض سعر");
            DocType.push(23, "أمر شغل مركبات");
            DocType.push(24, "عقد ايجار مركبات");
            DocType.push(25, "رحـــلات ");
            DocType.push(26, "كارت الميزان ");
            DocType.push(27, "تحديد أجازات الموظفين");
            DocType.push(28, "مستند حضور و انصراف");
            DocType.push(29, "طلب سلفه");
            DocType.push(30, "مستند نقل و ترقيه");
            DocType.push(31, "مستند إذن انصراف");
            DocType.push(32, "طلب إذن انصراف");
            DocType.push(33, "طلب أجازه");
            DocType.push(34, "مستند أجازه");
            DocType.push(35, "مستند تعديل أجازه");
            DocType.push(36, "مستند مكافأه أو جزاء");
            DocType.push(37, "مستند إنهاء خدمه");
            DocType.push(38, "مستند نشاط المستخدمين");
            DocType.push(39, "مستند راتب");
            DocType.push(40, "مستند خصائص أصل ثابت");
            DocType.push(41, " مستند اهلاك أصل ثابت");
            DocType.push(42, " مستند التخلص من أصل ثابت");
            DocType.push(43, "مستند أقساط");
            DocType.push(44, "مستند حجز و اقساط");
            DocType.push(45, "مستند عقد");
            DocType.push(46, "مستند تصريح / شهاده");
            DocType.push(47, "طلب عرض سعر خدمه");
            DocType.push(48, "عرض سعر نهائى خدمى");
            DocType.push(49, "تحميل عماله على أمر شغل");
            DocType.push(50, "تحميل معدات على أمر شغل");
            DocType.push(51, "إغلاق أمر شغل");
            DocType.push(52, "مستند موازنه");
            DocType.push(53, "حركة خطاب ضمان");
            DocType.push(54, "طلب تحويل مخزنى");
            DocType.push(55, "استلام أصناف قبل الفحص");
            DocType.push(56, "مستند فحص أصناف مستلمه");
            DocType.push(57, "أمر تشغيل أصناف");
            DocType.push(58, "تسليم أصنف بعد التشغيل");
            DocType.push(59, "طلب شراء");
            DocType.push(60, "حركة السيارات");
            DocType.push(61, "تحديث اسعار ذهب");
        }
        else {
            DocType.push(0, "None");
            DocType.push(1, "Purchase Invoice");
            DocType.push(2, "Sales Invoice");
            DocType.push(3, "Purchase returns invoice");
            DocType.push(4, "Sales returns invoice");
            DocType.push(5, "AdjustMents voucher");
            DocType.push(6, "Receipt voucher");
            DocType.push(7, "Payment voucher");
            DocType.push(8, "Money Transfer voucher");
            DocType.push(9, "Stock transfer voucher");
            DocType.push(10, "Stock receipt voucher");
            DocType.push(11, "Stock delivery voucher");
            DocType.push(12, "Items Stock Adjustment");
            DocType.push(13, "Journal Entry");
            DocType.push(14, "Bank portfolio");
            DocType.push(15, "Petty cash voucher");
            DocType.push(16, "Bank collection notification");
            DocType.push(17, "Sales Offer");
            DocType.push(18, "Purchase Order");
            DocType.push(19, "Production order");
            DocType.push(20, "Job Order");
            DocType.push(21, "Sales Order");
            DocType.push(22, "Sales Offer request");
            DocType.push(23, "Vehicle Job Order");
            DocType.push(24, "Vehicle Renal Contract");
            DocType.push(25, "Trips ");
            DocType.push(26, "Weighting Card");
            DocType.push(27, "Employee vacations setup");
            DocType.push(28, "Attendance document");
            DocType.push(29, "Loan request");
            DocType.push(30, "Employee move & promotion");
            DocType.push(31, "Leave permission");
            DocType.push(32, "Leave permission request");
            DocType.push(33, "Vacation Request");
            DocType.push(34, "Vacation Document");
            DocType.push(35, "Vacation Edit Document");
            DocType.push(36, "Reward & Penalty Document");
            DocType.push(37, "Employee termination Document");
            DocType.push(38, "Employee Activity Document");
            DocType.push(39, "Salary Payslip");
            DocType.push(40, "Fixed Asset Properties Document");
            DocType.push(41, "Fixed Asset Depreciation Document");
            DocType.push(42, "Fixed Asset Termination Document");
            DocType.push(43, "Installment Document");
            DocType.push(44, "Property reservation and Installment");
            DocType.push(45, "Property contract");
            DocType.push(46, "Employee permission/certificate");
            DocType.push(47, "Service Qoutation Request");
            DocType.push(48, "Final Service Qoutation Offer");
            DocType.push(49, "JobOrder WorkForce Document");
            DocType.push(50, "JobOrder Equipment Document");
            DocType.push(51, "JobOrder Closing Document");
            DocType.push(52, "Budget Doc");
            DocType.push(53, "Letter of guarantee transaction");
            DocType.push(54, "Stock Transfer request");
            DocType.push(55, "Item receive before check");
            DocType.push(56, "Check received items");
            DocType.push(57, "Items work order");
            DocType.push(58, "Items delivery after Work order");
            DocType.push(59, "Purchase Request");
            DocType.push(60, "Vehicle Movement");
            DocType.push(61, "Jewelry Pricing");
        }
        for (var i = 0; i < DocType.length; i++) {
            obj = obj = { Key: 0, Value: "" };
            obj.Key = DocType[i];
            obj.Value = DocType[i + 1];
            DocTypefinal.push(obj);
            i++;
        }
        DocumentActions.FillComboWithDefultArrayOneValue(DocTypefinal, TermType, "Key", "Value", Resource.DocumentType);
        return DocTypefinal;
    }
    function GetMovementType() {
        var CashOrCreditArr = [
            { "value": true, "text": "نقدي" },
            { "value": false, "text": "اجل" },
        ];
        DocumentActions.FillCombowithdefult(CashOrCreditArr, CashOrCredit, "value", "text", Resource.MovementType);
    }
    //الحساب
    function GetAccDiscIsFixed(TermType) {
        var AccDiscIsFixedArr = [];
        if (TermType == 53) {
            if (language == "ar") {
                AccDiscIsFixedArr.push({ value: 1, text: "حساب ثابت" });
                AccDiscIsFixedArr.push({ value: 0, text: "حساب مساعد" });
                AccDiscIsFixedArr.push({ value: 2, text: "حساب الكود التحليلى" });
                AccDiscIsFixedArr.push({ value: 3, text: "حساب خطاب ضمان" });
                AccDiscIsFixedArr.push({ value: 4, text: " حساب مصروفات" });
                AccDiscIsFixedArr.push({ value: 5, text: "حساب عموله بنكيه" });
                AccDiscIsFixedArr.push({ value: 6, text: "حساب هامش نقدى" });
                AccDiscIsFixedArr.push({ value: 7, text: "حساب اضافى 4" });
                AccDiscIsFixedArr.push({ value: 8, text: "حساب اضافى 5" });
                AccDiscIsFixedArr.push({ value: 9, text: "حساب اضافى 6" });
                AccDiscIsFixedArr.push({ value: 10, text: "حساب اضافى 7" });
                AccDiscIsFixedArr.push({ value: 11, text: "حساب اضافى 8" });
                AccDiscIsFixedArr.push({ value: 12, text: "حساب اضافى 9" });
            }
            else {
                AccDiscIsFixedArr.push({ value: 1, text: "GL Account" });
                AccDiscIsFixedArr.push({ value: 0, text: "Help Account" });
                AccDiscIsFixedArr.push({ value: 2, text: "Analytical Code Account" });
                AccDiscIsFixedArr.push({ value: 3, text: "LG Account" });
                AccDiscIsFixedArr.push({ value: 4, text: "Expense Account" });
                AccDiscIsFixedArr.push({ value: 5, text: "Bank commission Account" });
                AccDiscIsFixedArr.push({ value: 6, text: "Cash Margine Account" });
                AccDiscIsFixedArr.push({ value: 7, text: "Add Account 4" });
                AccDiscIsFixedArr.push({ value: 8, text: "Add Account 5" });
                AccDiscIsFixedArr.push({ value: 9, text: "Add Account 6" });
                AccDiscIsFixedArr.push({ value: 10, text: "Add Account 7" });
                AccDiscIsFixedArr.push({ value: 11, text: "Add Account 8" });
                AccDiscIsFixedArr.push({ value: 12, text: "Add Account 9" });
            }
        }
        else {
            if (language == "ar") {
                AccDiscIsFixedArr.push({ value: 1, text: "حساب ثابت" });
                AccDiscIsFixedArr.push({ value: 0, text: "حساب مساعد" });
                AccDiscIsFixedArr.push({ value: 2, text: "حساب الكود التحليلى" });
                if (TermType == 4 || TermType == 10 || TermType == 1 || TermType == 2 || TermType == 3 || TermType == 11) {
                    AccDiscIsFixedArr.push({ value: 13, text: "حسابات مستوى الصنف" });
                }
            }
            else {
                AccDiscIsFixedArr.push({ value: 1, text: "GL Account" });
                AccDiscIsFixedArr.push({ value: 0, text: "Help Account" });
                AccDiscIsFixedArr.push({ value: 2, text: "Analytical Code Account" });
                if (TermType == 4 || TermType == 10 || TermType == 1 || TermType == 2 || TermType == 3 || TermType == 11) {
                    AccDiscIsFixedArr.push({ value: 13, text: "Items level accounts" });
                }
            }
        }
        DocumentActions.FillCombowithdefult(AccDiscIsFixedArr, AccountDebitFixed, "value", "text", Resource.account_type);
        DocumentActions.FillCombowithdefult(AccDiscIsFixedArr, AccountCreditFixed, "value", "text", Resource.account_type);
        DocumentActions.FillCombowithdefult(AccDiscIsFixedArr, AccountDiscIsFixed, "value", "text", Resource.account_type);
        DocumentActions.FillCombowithdefult(AccDiscIsFixedArr, AccountTaxIsFixed, "value", "text", Resource.account_type);
        DocumentActions.FillCombowithdefult(AccDiscIsFixedArr, AccountCashIsFixed, "value", "text", Resource.account_type);
        DocumentActions.FillCombowithdefult(AccDiscIsFixedArr, AddAccount1IsFixed, "value", "text", Resource.account_type);
        DocumentActions.FillCombowithdefult(AccDiscIsFixedArr, AddAccountIsFixed2, "value", "text", Resource.account_type);
        DocumentActions.FillCombowithdefult(AccDiscIsFixedArr, AddAccountIsFixed3, "value", "text", Resource.account_type);
        DocumentActions.FillCombowithdefult(AccDiscIsFixedArr, AddAccountIsFixed4, "value", "text", Resource.account_type);
        DocumentActions.FillCombowithdefult(AccDiscIsFixedArr, AddAccountIsFixed5, "value", "text", Resource.account_type);
        return AccDiscIsFixedArr;
    }
    //مركز التكلفه
    function GetCostDescIsFixed(TermType) {
        var CostDescIsFixedArr = [];
        if (TermType == 53) {
            if (language == "ar") {
                CostDescIsFixedArr.push({ value: 1, text: "مركز ثابت" });
                CostDescIsFixedArr.push({ value: 0, text: "مركز مساعد" });
                CostDescIsFixedArr.push({ value: 3, text: "مركز مساعد 2" });
                CostDescIsFixedArr.push({ value: 2, text: "مركز الكود التحليلى" });
            }
            else {
                CostDescIsFixedArr.push({ value: 1, text: "Fixed Cost Center" });
                CostDescIsFixedArr.push({ value: 0, text: "Help Cost Center" });
                CostDescIsFixedArr.push({ value: 3, text: "Help Cost Center 2" });
                CostDescIsFixedArr.push({ value: 2, text: "Analytical Code Cost Center" });
            }
        }
        else {
            if (language == "ar") {
                CostDescIsFixedArr.push({ value: 1, text: "مركز ثابت" });
                CostDescIsFixedArr.push({ value: 0, text: "مركز مساعد" });
                CostDescIsFixedArr.push({ value: 2, text: "مركز الكود التحليلى" });
            }
            else {
                CostDescIsFixedArr.push({ value: 1, text: "Fixed Cost Center" });
                CostDescIsFixedArr.push({ value: 0, text: "Help Cost Center" });
                CostDescIsFixedArr.push({ value: 2, text: "Analytical Code Cost Center" });
            }
        }
        DocumentActions.FillCombowithdefult(CostDescIsFixedArr, CostCenterDebitFixed, "value", "text", Resource.Center_type);
        DocumentActions.FillCombowithdefult(CostDescIsFixedArr, CostCenterCreditFixed, "value", "text", Resource.Center_type);
        DocumentActions.FillCombowithdefult(CostDescIsFixedArr, CostCenterDiscIsFixed, "value", "text", Resource.Center_type);
        DocumentActions.FillCombowithdefult(CostDescIsFixedArr, CostCenterTaxIsFixed, "value", "text", Resource.Center_type);
        DocumentActions.FillCombowithdefult(CostDescIsFixedArr, CostCenterCashIsFixed, "value", "text", Resource.Center_type);
        DocumentActions.FillCombowithdefult(CostDescIsFixedArr, AddCostCenter1IsFixed, "value", "text", Resource.Center_type);
        DocumentActions.FillCombowithdefult(CostDescIsFixedArr, AddCostCenterIsFixed2, "value", "text", Resource.Center_type);
        DocumentActions.FillCombowithdefult(CostDescIsFixedArr, AddCostCenterIsFixed3, "value", "text", Resource.Center_type);
        DocumentActions.FillCombowithdefult(CostDescIsFixedArr, AddCostCenterIsFixed4, "value", "text", Resource.Center_type);
        DocumentActions.FillCombowithdefult(CostDescIsFixedArr, AddCostCenterIsFixed5, "value", "text", Resource.Center_type);
        return CostDescIsFixedArr;
    }
    //يظهر فى جانب
    function GetAccDiscDebitOrCredit() {
        var AccDiscDebitOrCreditArr = [];
        if (language == "ar") {
            AccDiscDebitOrCreditArr.push({ value: true, text: "مديـــن" });
            AccDiscDebitOrCreditArr.push({ value: false, text: "دائـــن" });
        }
        else {
            AccDiscDebitOrCreditArr.push({ value: true, text: "Debit" });
            AccDiscDebitOrCreditArr.push({ value: false, text: "Credit" });
        }
        DocumentActions.FillCombowithdefult(AccDiscDebitOrCreditArr, AccDiscDebitOrCredit, "value", "text", Resource.AppearsInTheSide);
        DocumentActions.FillCombowithdefult(AccDiscDebitOrCreditArr, AccTaxDebitOrCredit, "value", "text", Resource.AppearsInTheSide);
        DocumentActions.FillCombowithdefult(AccDiscDebitOrCreditArr, AccCashDebitOrCredit, "value", "text", Resource.AppearsInTheSide);
        DocumentActions.FillCombowithdefult(AccDiscDebitOrCreditArr, AddAcc1DebitOrCredit, "value", "text", Resource.AppearsInTheSide);
        DocumentActions.FillCombowithdefult(AccDiscDebitOrCreditArr, AddAcc2DebitOrCredit, "value", "text", Resource.AppearsInTheSide);
        DocumentActions.FillCombowithdefult(AccDiscDebitOrCreditArr, AddAcc3DebitOrCredit, "value", "text", Resource.AppearsInTheSide);
        DocumentActions.FillCombowithdefult(AccDiscDebitOrCreditArr, AddAcc4DebitOrCredit, "value", "text", Resource.AppearsInTheSide);
        DocumentActions.FillCombowithdefult(AccDiscDebitOrCreditArr, AddAcc5DebitOrCredit, "value", "text", Resource.AppearsInTheSide);
        return AccDiscDebitOrCreditArr;
    }
    //استخدام الضرائب
    function GetUseItemTax() {
        var UseItemTaxArr = [
            //{ "value": null, "text": "غير خاضع" },
            { "value": 1, "text": "ضرائب الأصناف" },
            { "value": 2, "text": "ضرائب المستند" },
            { "value": 3, "text": "ضريبة الصنف 1" },
            { "value": 4, "text": "ضريبة الصنف 2" },
            { "value": 5, "text": "ضريبة الصنف 3" },
        ];
        DocumentActions.FillCombowithdefult(UseItemTaxArr, UseItemTax, "value", "text", "غير خاضع");
    }
    function FillComboValuNames(TermType) {
        switch (TermType) {
            case 1:
                ValueArr = ListValue.GetPurchValuesDataTable();
                break;
            case 2:
                ValueArr = ListValue.GetSalesValuesDataTable();
                break;
            case 3:
                ValueArr = ListValue.GetRetPurchValuesDataTable();
                break;
            case 4:
                ValueArr = ListValue.GetRetSalesValuesDataTable();
                break;
            case 5:
                ValueArr = ListValue.GetAdjustValuesDataTable();
                break;
            case 6:
                ValueArr = ListValue.GetRecietValuesDataTable();
                break;
            case 7:
                ValueArr = ListValue.GetPayValuesDataTable();
                break;
            case 8:
                //ValueArr = ListValue.GetPurchValuesDataTable();
                break;
            case 9:
                ValueArr = ListValue.GetStockTranValuesDataTable();
                break;
            case 10:
                ValueArr = ListValue.GetPurchReceitValuesDataTable();
                break;
            case 11:
                ValueArr = ListValue.GetSalesDeliverValuesDataTable();
                break;
            case 12:
                ValueArr = ListValue.GetItemStockAdjustDataTable();
                break;
            case 13:
                ValueArr = ListValue.GetJournalEntryDataTable();
                break;
            case 14:
                ValueArr = ListValue.GetKeeperbankDataTable();
                break;
            case 15:
                ValueArr = ListValue.GetPettyCashDataTable();
                break;
            case 16:
                ValueArr = ListValue.GetBankNoticeDataTable();
                break;
            case 17:
                ValueArr = ListValue.GetSalesOfferDataTable();
                break;
            case 18:
                ValueArr = ListValue.GetPurchOrderDataTable();
                break;
            case 20:
                ValueArr = ListValue.GetJobOrderDataTable();
                break;
            case 21:
                ValueArr = ListValue.GetSalesOrderDataTable();
                break;
            case 44:
                ValueArr = ListValue.GetUnitReservationDataTable();
                break;
            case 45:
                ValueArr = ListValue.GetUnitReservationDataTable();
                break;
            case 49:
                ValueArr = ListValue.GetJobOrderEmpDataTable();
                break;
            case 50:
                ValueArr = ListValue.GetJobOrderEquipDataTable();
                break;
            case 53:
                ValueArr = ListValue.GetLetOfGrnteeTranDataTable();
                break;
            case 54:
                ValueArr = ListValue.GetStockTranReqValuesDataTable();
                break;
            case 60:
                ValueArr = ListValue.GetVehicleMovValuesDataTable();
                break;
        }
        DocumentActions.FillCombowithdefult(ValueArr, ValuAccountDebit, "value", "text", Resource.value);
        DocumentActions.FillCombowithdefult(ValueArr, ValuAccountCredit, "value", "text", Resource.value);
        DocumentActions.FillCombowithdefult(ValueArr, ValuAccountDisc, "value", "text", Resource.value);
        DocumentActions.FillCombowithdefult(ValueArr, ValuAccountTax, "value", "text", Resource.value);
        DocumentActions.FillCombowithdefult(ValueArr, ValuAccountCash, "value", "text", Resource.value);
        DocumentActions.FillCombowithdefult(ValueArr, ValuAddAccount1, "value", "text", Resource.value);
        DocumentActions.FillCombowithdefult(ValueArr, ValuAddAccount2, "value", "text", Resource.value);
        DocumentActions.FillCombowithdefult(ValueArr, ValuAddAccount3, "value", "text", Resource.value);
        DocumentActions.FillCombowithdefult(ValueArr, ValuAddAccount4, "value", "text", Resource.value);
        DocumentActions.FillCombowithdefult(ValueArr, ValuAddAccount5, "value", "text", Resource.value);
        return ValueArr;
    }
    function btnSearch_onclick() {
        var sys = new SystemTools();
        sys.FindKey(Modules.Ms_Terms, SharedButtons.btnSearch.id, "", function () {
            var id = SearchGrid.SearchDataGrid.SelectedKey;
            if (!IsNullOrEmpty(id)) {
                GetByID(ObjectId);
            }
        });
    }
    function Refrash() {
        GetAll();
        GetByID(ObjectId);
    }
})(MsTerms || (MsTerms = {}));
//# sourceMappingURL=Ms_Terms.js.map