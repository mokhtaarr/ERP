$(document).ready(() => {
    SharedButtons.OnLoad();
    MsTerms.InitalizeComponent();
})

namespace MsTerms {
    let Resource: any = GetResourceList("");
    $('#headertop1').addClass('display_none');
    $('#headertop2').removeClass('display_none');
    $('#headerTitle').text(Resource.DocumentType);

    var sys: SystemTools = new SystemTools();
    var language = sys.SysSession.CurrentEnvironment.ScreenLanguage;
    var SysSession: SystemSession = GetSystemSession();
    let compCode = SysSession.CurrentEnvironment.CompCode;
    let UserCode = SysSession.CurrentEnvironment.UserCode;
    let Token = "HGFD-" + SysSession.CurrentEnvironment.Token;

    var AllTermsIds: Array<Ms_Terms> = new Array<Ms_Terms>();
    var Model: Ms_Terms = new Ms_Terms();
    var Details: Ms_TermsDetails = new Ms_TermsDetails();
    var HeaderAndDetails: TermsHeaderAndDetails = new TermsHeaderAndDetails();

    var Terms: Array<Ms_Terms> = new Array<Ms_Terms>();
    var Books: Array<Sys_Books> = new Array<Sys_Books>();
    var CostCenters: Array<Cal_CostCenters> = new Array<Cal_CostCenters>();
    var AccountChart: Array<Cal_AccountChart> = new Array<Cal_AccountChart>();

    // select Options
    var element: HTMLInputElement;
    var TermType: HTMLSelectElement;
    var JournalEntryBookId: HTMLSelectElement;
    var JournalEntryTermId: HTMLSelectElement;
    var CashOrCredit: HTMLSelectElement;
    var BookId: HTMLSelectElement;
    var InventoryBookId: HTMLSelectElement;
    var InventoryTermId: HTMLSelectElement;

    //////////////// Details ///////////////////
    var AccountDebitFixed: HTMLSelectElement;
    var AccountCreditFixed: HTMLSelectElement;
    var AccountDiscIsFixed: HTMLSelectElement;
    var AccountTaxIsFixed: HTMLSelectElement;
    var AccountCashIsFixed: HTMLSelectElement;
    var AddAccount1IsFixed: HTMLSelectElement;
    var AddAccountIsFixed2: HTMLSelectElement;
    var AddAccountIsFixed3: HTMLSelectElement;
    var AddAccountIsFixed4: HTMLSelectElement;
    var AddAccountIsFixed5: HTMLSelectElement;

    var CostCenterDebitFixed: HTMLSelectElement;
    var CostCenterCreditFixed: HTMLSelectElement;
    var CostCenterDiscIsFixed: HTMLSelectElement;
    var CostCenterTaxIsFixed: HTMLSelectElement;
    var CostCenterCashIsFixed: HTMLSelectElement;
    var AddCostCenter1IsFixed: HTMLSelectElement;
    var AddCostCenterIsFixed2: HTMLSelectElement;
    var AddCostCenterIsFixed3: HTMLSelectElement;
    var AddCostCenterIsFixed4: HTMLSelectElement;
    var AddCostCenterIsFixed5: HTMLSelectElement;

    var AccDiscDebitOrCredit: HTMLSelectElement,
        AccTaxDebitOrCredit: HTMLSelectElement,
        AccCashDebitOrCredit: HTMLSelectElement,
        AddAcc1DebitOrCredit: HTMLSelectElement,
        AddAcc2DebitOrCredit: HTMLSelectElement,
        AddAcc3DebitOrCredit: HTMLSelectElement,
        AddAcc4DebitOrCredit: HTMLSelectElement,
        AddAcc5DebitOrCredit: HTMLSelectElement,
        UseItemTax: HTMLSelectElement;

    var ValuAccountDebit: HTMLSelectElement,
        ValuAccountCredit: HTMLSelectElement,
        ValuAccountDisc: HTMLSelectElement,
        ValuAccountTax: HTMLSelectElement,
        ValuAccountCash: HTMLSelectElement,
        ValuAddAccount1: HTMLSelectElement,
        ValuAddAccount2: HTMLSelectElement,
        ValuAddAccount3: HTMLSelectElement,
        ValuAddAccount4: HTMLSelectElement,
        ValuAddAccount5: HTMLSelectElement;

    var AccountIdDebit: HTMLSelectElement,
        AccountIdCredit: HTMLSelectElement,
        AccountIdDisc: HTMLSelectElement,
        AccountIdTax: HTMLSelectElement,
        AccountIdCash: HTMLSelectElement,
        AddAccountId1: HTMLSelectElement,
        AddAccountId2: HTMLSelectElement,
        AddAccountId3: HTMLSelectElement,
        AddAccountId4: HTMLSelectElement,
        AddAccountId5: HTMLSelectElement;

    var CostCenterIdDebit: HTMLSelectElement,
        CostCenterIdCredit: HTMLSelectElement,
        CostCenterIdDisc: HTMLSelectElement,
        CostCenterIdTax: HTMLSelectElement,
        CostCenterIdCash: HTMLSelectElement,
        AddCostCenterId1: HTMLSelectElement,
        AddCostCenterId2: HTMLSelectElement,
        AddCostCenterId3: HTMLSelectElement,
        AddCostCenterId4: HTMLSelectElement,
        AddCostCenterId5: HTMLSelectElement;

    var ObjectId = 0;
    var StatusFlag;
    var Success;
    var hasNodes: boolean;
    var flag: boolean = true;
    var flagTotal: boolean = true;
    var AccountId: number;

    export function InitalizeComponent() {
        localStorage.setItem("TableName", "Ms_Terms");
        NavigateModule.InitalizeComponent();
        SharedButtons.compcode = Number(SysSession.CurrentEnvironment.CompCode);
        SharedWork.OnNavigate = Navigate;

        SharedButtons.AddAction(() => {
            btnAdd_onclick();
        });

        SharedButtons.DeleteAction(() => { btnDelete_onclick(); });

        SharedButtons.EditAction(() => { btnEdit_onclick(); });

        SharedButtons.UndoAction(() => {
            Undo();
            if (ObjectId == 0)
                SharedWork.SwitchModes(ScreenModes.Start);
        });

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
        GetaccountAndCostCenter();
        GetAccDiscDebitOrCredit();
        GetJournalEntryBooks(13);
        GetJournalEntryTerm(13);
        GetMovementType();
        GetUseItemTax();
        GetDocType();
        GetAll();
    }

    function InitalizeControls() {
        SharedButtons.btnSearch = document.getElementById("btnMs_TermsSearch") as HTMLButtonElement;
        TermType = document.getElementById("TermType") as HTMLSelectElement;
        JournalEntryBookId = document.getElementById("JournalEntryBookId") as HTMLSelectElement;
        JournalEntryTermId = document.getElementById("JournalEntryTermId") as HTMLSelectElement;
        CashOrCredit = document.getElementById("CashOrCredit") as HTMLSelectElement;
        BookId = document.getElementById("BookId") as HTMLSelectElement;
        InventoryBookId = document.getElementById("InventoryBookId") as HTMLSelectElement;
        InventoryTermId = document.getElementById("InventoryTermId") as HTMLSelectElement;

        //////////////// Details ///////////////////
        AccountDebitFixed = document.getElementById("AccountDebitFixed") as HTMLSelectElement;
        AccountCreditFixed = document.getElementById("AccountCreditFixed") as HTMLSelectElement;
        AccountDiscIsFixed = document.getElementById("AccountDiscIsFixed") as HTMLSelectElement;
        AccountTaxIsFixed = document.getElementById("AccountTaxIsFixed") as HTMLSelectElement;
        AccountCashIsFixed = document.getElementById("AccountCashIsFixed") as HTMLSelectElement;
        AddAccount1IsFixed = document.getElementById("AddAccount1IsFixed") as HTMLSelectElement;
        AddAccountIsFixed2 = document.getElementById("AddAccountIsFixed2") as HTMLSelectElement;
        AddAccountIsFixed3 = document.getElementById("AddAccountIsFixed3") as HTMLSelectElement;
        AddAccountIsFixed4 = document.getElementById("AddAccountIsFixed4") as HTMLSelectElement;
        AddAccountIsFixed5 = document.getElementById("AddAccountIsFixed5") as HTMLSelectElement;

        CostCenterDebitFixed = document.getElementById("CostCenterDebitFixed") as HTMLSelectElement;
        CostCenterCreditFixed = document.getElementById("CostCenterCreditFixed") as HTMLSelectElement;
        CostCenterDiscIsFixed = document.getElementById("CostCenterDiscIsFixed") as HTMLSelectElement;
        CostCenterTaxIsFixed = document.getElementById("CostCenterTaxIsFixed") as HTMLSelectElement;
        CostCenterCashIsFixed = document.getElementById("CostCenterCashIsFixed") as HTMLSelectElement;
        AddCostCenter1IsFixed = document.getElementById("AddCostCenter1IsFixed") as HTMLSelectElement;
        AddCostCenterIsFixed2 = document.getElementById("AddCostCenterIsFixed2") as HTMLSelectElement;
        AddCostCenterIsFixed3 = document.getElementById("AddCostCenterIsFixed3") as HTMLSelectElement;
        AddCostCenterIsFixed4 = document.getElementById("AddCostCenterIsFixed4") as HTMLSelectElement;
        AddCostCenterIsFixed5 = document.getElementById("AddCostCenterIsFixed5") as HTMLSelectElement;

        AccTaxDebitOrCredit = document.getElementById("AccTaxDebitOrCredit") as HTMLSelectElement;
        AccDiscDebitOrCredit = document.getElementById("AccDiscDebitOrCredit") as HTMLSelectElement;
        AccCashDebitOrCredit = document.getElementById("AccCashDebitOrCredit") as HTMLSelectElement;
        AddAcc1DebitOrCredit = document.getElementById("AddAcc1DebitOrCredit") as HTMLSelectElement;
        AddAcc2DebitOrCredit = document.getElementById("AddAcc2DebitOrCredit") as HTMLSelectElement;
        AddAcc3DebitOrCredit = document.getElementById("AddAcc3DebitOrCredit") as HTMLSelectElement;
        AddAcc4DebitOrCredit = document.getElementById("AddAcc4DebitOrCredit") as HTMLSelectElement;
        AddAcc5DebitOrCredit = document.getElementById("AddAcc5DebitOrCredit") as HTMLSelectElement;
        UseItemTax = document.getElementById("UseItemTax") as HTMLSelectElement;

        ValuAccountDebit = document.getElementById("ValuAccountDebit") as HTMLSelectElement;
        ValuAccountCredit = document.getElementById("ValuAccountCredit") as HTMLSelectElement;
        ValuAccountDisc = document.getElementById("ValuAccountDisc") as HTMLSelectElement;
        ValuAccountTax = document.getElementById("ValuAccountTax") as HTMLSelectElement;
        ValuAccountCash = document.getElementById("ValuAccountCash") as HTMLSelectElement;
        ValuAddAccount1 = document.getElementById("ValuAddAccount1") as HTMLSelectElement;
        ValuAddAccount2 = document.getElementById("ValuAddAccount2") as HTMLSelectElement;
        ValuAddAccount3 = document.getElementById("ValuAddAccount3") as HTMLSelectElement;
        ValuAddAccount4 = document.getElementById("ValuAddAccount4") as HTMLSelectElement;
        ValuAddAccount5 = document.getElementById("ValuAddAccount5") as HTMLSelectElement;

        AccountIdDebit = document.getElementById("AccountIdDebit") as HTMLSelectElement;
        AccountIdCredit = document.getElementById("AccountIdCredit") as HTMLSelectElement;
        AccountIdDisc = document.getElementById("AccountIdDisc") as HTMLSelectElement;
        AccountIdTax = document.getElementById("AccountIdTax") as HTMLSelectElement;
        AccountIdCash = document.getElementById("AccountIdCash") as HTMLSelectElement;
        AddAccountId1 = document.getElementById("AddAccountId1") as HTMLSelectElement;
        AddAccountId2 = document.getElementById("AddAccountId2") as HTMLSelectElement;
        AddAccountId3 = document.getElementById("AddAccountId3") as HTMLSelectElement;
        AddAccountId4 = document.getElementById("AddAccountId4") as HTMLSelectElement;
        AddAccountId5 = document.getElementById("AddAccountId5") as HTMLSelectElement;

        CostCenterIdDebit = document.getElementById("CostCenterIdDebit") as HTMLSelectElement;
        CostCenterIdCredit = document.getElementById("CostCenterIdCredit") as HTMLSelectElement;
        CostCenterIdDisc = document.getElementById("CostCenterIdDisc") as HTMLSelectElement;
        CostCenterIdTax = document.getElementById("CostCenterIdTax") as HTMLSelectElement;
        CostCenterIdCash = document.getElementById("CostCenterIdCash") as HTMLSelectElement;
        AddCostCenterId1 = document.getElementById("AddCostCenterId1") as HTMLSelectElement;
        AddCostCenterId2 = document.getElementById("AddCostCenterId2") as HTMLSelectElement;
        AddCostCenterId3 = document.getElementById("AddCostCenterId3") as HTMLSelectElement;
        AddCostCenterId4 = document.getElementById("AddCostCenterId4") as HTMLSelectElement;
        AddCostCenterId5 = document.getElementById("AddCostCenterId5") as HTMLSelectElement;
    }

    function InitalizeEvents() {
        SharedButtons.btnSearch.onclick = btnSearch_onclick;
        SharedButtons.btnRefrash2.onclick = Refrash;
        TermType.onchange = function () {
            TermTypechanged(TermType.value)
        };
    }

    function GetAll() {
        Disabled(false);
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("Ms_Terms", "GetAll"),
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess) {
                    AllTermsIds = result.Response as Array<Ms_Terms>;
                    //console.log(Terms)
                }
            }
        });
    }

    function GetByID(Id: number) {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("Ms_Terms", "GetById"),
            data: { id: Id },
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess) {
                    let res = result.Response as TermsHeaderAndDetails;
                    Display(res);
                    SharedWork.SwitchModes(ScreenModes.Query);
                }
                else
                    MessageBox.Toastr(Resource.Error, Resource.Error, ToastrTypes.error);
            }
        });
    }

    function Assign() {
        HeaderAndDetails.Terms = DocumentActions.AssignToModel<Ms_Terms>(Model);
        HeaderAndDetails.TermsDetails = DocumentActions.AssignToModel<Ms_TermsDetails>(Details);
        if (StatusFlag == "i") {
            Model.CreatedAt = DateTimeFormat(Date().toString());
            Model.CreatedBy = SysSession.CurrentEnvironment.UserCode;
            Insert();
        }
        if (StatusFlag == "u") {
            Model.TermId = ObjectId;
            let TermsDetails = Details == null ? new Ms_TermsDetails : Details;
            HeaderAndDetails.TermsDetails = DocumentActions.AssignToModel<Ms_TermsDetails>(TermsDetails);
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
            success: (Response) => {
                let result = Response as BaseResponse;
                if (result.IsSuccess) {
                    HeaderAndDetails = result.Response as TermsHeaderAndDetails;
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
            success: (Response) => {
                let result = Response as BaseResponse;
                if (result.IsSuccess) {
                    HeaderAndDetails = result.Response as TermsHeaderAndDetails;
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
            success: (result) => {
                if (result) {
                    Success = true;
                    GetAll();
                    Disabled(result);
                    $('select').val('null').select2().trigger('change')
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
        if (!Validation()) return
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
            flag = false
        }
        else if (DocumentActions.GetElementByName("TermName").value == "") {
            MessageBox.Toastr(Resource.EnterNameOfDocumentType, Resource.Error, ToastrTypes.error);
            flag = false
        }
        else if (DocumentActions.GetElementByName("AccountDebitFixed").value == "1" && DocumentActions.GetElementByName("AccountIdDebit").value == 'null') {
            MessageBox.Toastr(Resource.SelectAccountIn + "' " + Resource.App_Debtor + " '", Resource.Error, ToastrTypes.error);
            flag = false
        }
        else if (DocumentActions.GetElementByName("CostCenterDebitFixed").value == "1" && DocumentActions.GetElementByName("CostCenterIdDebit").value == 'null') {
            MessageBox.Toastr(Resource.SelectCostCenterIn + "' " + Resource.App_Debtor + " '", Resource.Error, ToastrTypes.error);
            flag = false
        }
        else if (DocumentActions.GetElementByName("AccountCreditFixed").value == "1" && DocumentActions.GetElementByName("AccountIdCredit").value == 'null') {
            MessageBox.Toastr(Resource.SelectAccountIn + "' " + Resource.Creditor + " '", Resource.Error, ToastrTypes.error);
            flag = false
        }
        else if (DocumentActions.GetElementByName("CostCenterCreditFixed").value == "1" && DocumentActions.GetElementByName("CostCenterIdCredit").value == 'null') {
            MessageBox.Toastr(Resource.SelectCostCenterIn + "' " + Resource.Creditor + " '", Resource.Error, ToastrTypes.error);
            flag = false
        }
        else if (DocumentActions.GetElementByName("AccountDiscIsFixed").value == "1" && DocumentActions.GetElementByName("AccountIdDisc").value == 'null') {
            MessageBox.Toastr(Resource.SelectAccountIn + "' " + Resource.Discount2 + " '", Resource.Error, ToastrTypes.error);
            flag = false
        }
        else if (DocumentActions.GetElementByName("CostCenterDiscIsFixed").value == "1" && DocumentActions.GetElementByName("CostCenterIdDisc").value == 'null') {
            MessageBox.Toastr(Resource.SelectCostCenterIn + "' " + Resource.Discount2 + " '", Resource.Error, ToastrTypes.error);
            flag = false
        }
        else if (DocumentActions.GetElementByName("AccountTaxIsFixed").value == "1" && DocumentActions.GetElementByName("AccountIdTax").value == 'null') {
            MessageBox.Toastr(Resource.SelectAccountIn + "' " + Resource.Taxes + " '", Resource.Error, ToastrTypes.error);
            flag = false
        }
        else if (DocumentActions.GetElementByName("CostCenterTaxIsFixed").value == "1" && DocumentActions.GetElementByName("CostCenterIdTax").value == 'null') {
            MessageBox.Toastr(Resource.SelectCostCenterIn + "' " + Resource.Taxes + " '", Resource.Error, ToastrTypes.error);
            flag = false
        }
        else if (DocumentActions.GetElementByName("AccountCashIsFixed").value == "1" && DocumentActions.GetElementByName("AccountIdCash").value == 'null') {
            MessageBox.Toastr(Resource.SelectAccountIn + "' " + Resource.Cash + " '", Resource.Error, ToastrTypes.error);
            flag = false
        }
        else if (DocumentActions.GetElementByName("CostCenterCashIsFixed").value == "1" && DocumentActions.GetElementByName("CostCenterIdCash").value == 'null') {
            MessageBox.Toastr(Resource.SelectCostCenterIn + "' " + Resource.Cash + " '", Resource.Error, ToastrTypes.error);
            flag = false
        }
        else if (DocumentActions.GetElementByName("AddAccount1IsFixed").value == "1" && DocumentActions.GetElementByName("AddAccountId1").value == 'null') {
            MessageBox.Toastr(Resource.SelectAccountIn + "' " + Resource.Expenses + " '", Resource.Error, ToastrTypes.error);
            flag = false
        }
        else if (DocumentActions.GetElementByName("AddCostCenter1IsFixed").value == "1" && DocumentActions.GetElementByName("AddCostCenterId1").value == 'null') {
            MessageBox.Toastr(Resource.SelectCostCenterIn + "' " + Resource.Expenses + " '", Resource.Error, ToastrTypes.error);
            flag = false
        }
        else if (DocumentActions.GetElementByName("AddAccountIsFixed2").value == "1" && DocumentActions.GetElementByName("AddAccountId2").value == 'null') {
            MessageBox.Toastr(Resource.SelectAccountIn + "' " + Resource.ExtraAccount +" 2" + " '", Resource.Error, ToastrTypes.error);
            flag = false
        }
        else if (DocumentActions.GetElementByName("AddCostCenterIsFixed2").value == "1" && DocumentActions.GetElementByName("AddCostCenterId2").value == 'null') {
            MessageBox.Toastr(Resource.SelectCostCenterIn + "' " + Resource.ExtraAccount +" 2" + " '", Resource.Error, ToastrTypes.error);
            flag = false
        }
        else if (DocumentActions.GetElementByName("AddAccountIsFixed3").value == "1" && DocumentActions.GetElementByName("AddAccountId3").value == 'null') {
            MessageBox.Toastr(Resource.SelectAccountIn + "' " + Resource.ExtraAccount +" 3" + " '", Resource.Error, ToastrTypes.error);
            flag = false
        }
        else if (DocumentActions.GetElementByName("AddCostCenterIsFixed3").value == "1" && DocumentActions.GetElementByName("AddCostCenterId3").value == 'null') {
            MessageBox.Toastr(Resource.SelectCostCenterIn + "' " + Resource.ExtraAccount +" 3" + " '", Resource.Error, ToastrTypes.error);
            flag = false
        }
        else if (DocumentActions.GetElementByName("AddAccountIsFixed4").value == "1" && DocumentActions.GetElementByName("AddAccountId4").value == 'null') {
            MessageBox.Toastr(Resource.SelectAccountIn + "' " + Resource.ExtraAccount +" 4" + " '", Resource.Error, ToastrTypes.error);
            flag = false
        }
        else if (DocumentActions.GetElementByName("AddCostCenterIsFixed4").value == "1" && DocumentActions.GetElementByName("AddCostCenterId4").value == 'null') {
            MessageBox.Toastr(Resource.SelectCostCenterIn + "' " + Resource.ExtraAccount +" 4" + " '", Resource.Error, ToastrTypes.error);
            flag = false
        }
        else if (DocumentActions.GetElementByName("AddAccountIsFixed5").value == "1" && DocumentActions.GetElementByName("AddAccountId5").value == 'null') {
            MessageBox.Toastr(Resource.SelectAccountIn + "' " + Resource.ExtraAccount +" 5" + " '", Resource.Error, ToastrTypes.error);
            flag = false
        }
        else if (DocumentActions.GetElementByName("AddCostCenterIsFixed5").value == "1" && DocumentActions.GetElementByName("AddCostCenterId5").value == 'null') {
            MessageBox.Toastr(Resource.SelectCostCenterIn + "' " + Resource.ExtraAccount +" 5" + " '", Resource.Error, ToastrTypes.error);
            flag = false
        } else
            flag = true;

        return flag;
    }

    export function Navigate() {
        Model = AllTermsIds[SharedWork.PageIndex - 1];
        ObjectId = Model.TermId;
        GetByID(ObjectId);
    }

    function Display(model: TermsHeaderAndDetails) {
        Model = model.Terms;
        Details = model.TermsDetails /*== null ? new Ms_TermsDetails : model.TermsDetails*/;
        if (Model.TermType != null)
            TermTypechanged(Model.TermType.toString());
        DocumentActions.RenderFromModel(Model);
        let TermsDetails = Details;
        if (Details == null) {
            TermsDetails = new Ms_TermsDetails;
            DocumentActions.allElements(true, true, TermsDetails);
            Details = DocumentActions.AssignToModel<Ms_TermsDetails>(TermsDetails);
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

    function Disabled(clear: boolean) {
        let TermsDetails = Details == null ? new Ms_TermsDetails : Details;
        DocumentActions.allElements(true, clear, Model);
        DocumentActions.allElements(true, clear, TermsDetails);
        $('#left').removeClass("disabledDiv");
    }

    function RemoveDisabled(clear: boolean) {
        let TermsDetails = Details == null ? new Ms_TermsDetails : Details;
        DocumentActions.allElements(false, clear, Model);
        DocumentActions.allElements(false, clear, TermsDetails);
        $('#left').addClass("disabledDiv");
    }

    function GetModel(id: number) {
        Model = AllTermsIds.filter(x => x.TermId == id)[0];
        return Model;
    }

    function TermTypechanged(TermType: string) {
        if (TermType != "null") {
            GetAllBooks(Number(TermType));
            GetAccDiscIsFixed(Number(TermType));
            GetCostDescIsFixed(Number(TermType));
            FillComboValuNames(Number(TermType));
            switch (Number(TermType)) {
                case 2:
                    GetInventoryBooks(11);
                    GetInventoryTerms(11)
                    break;
                case 3:
                    GetInventoryBooks(11);
                    GetInventoryTerms(11)
                    break;
                case 1:
                    GetInventoryBooks(10);
                    GetInventoryTerms(10)
                    break;
                case 4:
                    GetInventoryBooks(10);
                    GetInventoryTerms(10)
                    break;
                default:
                    DocumentActions.FillCombowithdefult([], InventoryBookId, "BookId", (language == "ar" ? "BookNameAR" : "BookNameEN"), Resource.SupplyBook);
                    DocumentActions.FillCombowithdefult([], InventoryTermId, "TermId", "TermName", Resource.SupplyDocumentType);
                    break;
            }
        }
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
                    DocumentActions.FillCombowithdefult(Books, JournalEntryBookId, "BookId", (language == "ar" ? "BookNameAR" : "BookNameEN"), Resource.EntryDocumentType);
                }
            }
        });
    }

    function GetJournalEntryTerm(type: number = null) {
        Ajax.Callsync({
            type: "Get",
            data: { type: type },
            url: sys.apiUrl("funcationShared", "GetAllTerms"),
            success: (Response) => {
                let result = Response as BaseResponse;
                if (result.IsSuccess) {
                    Terms = result.Response as Array<Ms_Terms>;
                    DocumentActions.FillCombowithdefult(Terms, JournalEntryTermId, "TermId", "TermName", Resource.EntryDocumentType);
                }
            }
        });
    }

    function GetAllBooks(type: number = null) {
        Ajax.Callsync({
            type: "Get",
            data: { type: type },
            url: sys.apiUrl("funcationShared", "GetAllBooks"),
            success: (Response) => {
                let result = Response as BaseResponse;
                if (result.IsSuccess) {
                    Books = result.Response as Array<Sys_Books>;
                    DocumentActions.FillCombowithdefult(Books, BookId, "BookId", (language == "ar" ? "BookNameAR" : "BookNameEN"), Resource.Notebook);
                }
            }
        });
    }

    function GetInventoryBooks(type: number = null) {
        Ajax.Callsync({
            type: "Get",
            data: { type: type },
            url: sys.apiUrl("funcationShared", "GetAllBooks"),
            success: (Response) => {
                let result = Response as BaseResponse;
                if (result.IsSuccess) {
                    Books = result.Response as Array<Sys_Books>;
                    DocumentActions.FillCombowithdefult(Books, InventoryBookId, "BookId", (language == "ar" ? "BookNameAR" : "BookNameEN"), Resource.SupplyBook);
                }
            }
        });
    }

    function GetInventoryTerms(type: number = null) {
        Ajax.Callsync({
            type: "Get",
            data: { type: type },
            url: sys.apiUrl("funcationShared", "GetAllTerms"),
            success: (Response) => {
                let result = Response as BaseResponse;
                if (result.IsSuccess) {
                    Terms = result.Response as Array<Ms_Terms>;
                    DocumentActions.FillCombowithdefult(Terms, InventoryTermId, "TermId", "TermName", Resource.SupplyDocumentType);
                }
            }
        });
    }

    function GetCostCenters() {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("funcationShared", "GetAllSubCostCenters"),
            success: (Response) => {
                let result = Response as BaseResponse;
                if (result.IsSuccess) {
                    CostCenters = result.Response as Array<Cal_CostCenters>;
                }
            }
        });
        return CostCenters;
    }

    function GetAllAccountChart() {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("funcationShared", "GetAllSubAccountChart"),
            success: (Response) => {
                let result = Response as BaseResponse;
                if (result.IsSuccess) {
                    AccountChart = result.Response as Array<Cal_AccountChart>;
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

    function IntialAccountAndCostCenter(accountChart: Array<Cal_AccountChart>, costCenters: Array<Cal_CostCenters>) {
        
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
        let DocType = new Array();
        let DocTypefinal = new Array();
        let obj = { Key: 0, Value: "" };
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
        DocumentActions.FillComboWithDefultArrayOneValue(DocTypefinal, TermType, "Key", "Value", Resource.DocumentType)
        return DocTypefinal;
    }

    function GetMovementType() {
        let CashOrCreditArr: { value: boolean, text: string }[] = [
            { "value": true, "text": "نقدي" },
            { "value": false, "text": "اجل" },
        ];
        DocumentActions.FillCombowithdefult(CashOrCreditArr, CashOrCredit, "value", "text", Resource.MovementType);
    }

    //الحساب
    function GetAccDiscIsFixed(TermType: number) {
        let AccDiscIsFixedArr: { value: number, text: string }[] = [];
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
    function GetCostDescIsFixed(TermType: number) {
        let CostDescIsFixedArr: { value: number, text: string }[] = [];
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
        let AccDiscDebitOrCreditArr: { value: boolean, text: string }[] = [];
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
        let UseItemTaxArr: { value: number, text: string }[] = [
            //{ "value": null, "text": "غير خاضع" },
            { "value": 1, "text": "ضرائب الأصناف" },
            { "value": 2, "text": "ضرائب المستند" },
            { "value": 3, "text": "ضريبة الصنف 1" },
            { "value": 4, "text": "ضريبة الصنف 2" },
            { "value": 5, "text": "ضريبة الصنف 3" },
        ];
        DocumentActions.FillCombowithdefult(UseItemTaxArr, UseItemTax, "value", "text", "غير خاضع");
    }

    function FillComboValuNames(TermType: number) {
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
        let sys: SystemTools = new SystemTools();
        sys.FindKey(Modules.Ms_Terms, SharedButtons.btnSearch.id, "", () => {
            let id = SearchGrid.SearchDataGrid.SelectedKey;
            if (!IsNullOrEmpty(id)) {
                GetByID(ObjectId);
            }
        });
    }

    function Refrash() {
        GetAll();
        GetByID(ObjectId);
    }
}
