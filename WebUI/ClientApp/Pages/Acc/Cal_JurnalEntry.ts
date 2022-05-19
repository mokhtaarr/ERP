﻿$(document).ready(() => {
    SharedButtons.OnLoad();
    CalJurnalEntry.InitalizeComponent();
})

namespace CalJurnalEntry {
    $('#headertop1').addClass('display_none');
    $('#headertop2').removeClass('display_none');
    let Resource: any = GetResourceList("");
    $('#headerTitle').text(Resource.DailyVoucherDocuments);
    
    var sys: SystemTools = new SystemTools();
    var language = sys.SysSession.CurrentEnvironment.ScreenLanguage;
    var SysSession: SystemSession = GetSystemSession();
    let compCode = SysSession.CurrentEnvironment.CompCode;
    let UserCode = SysSession.CurrentEnvironment.UserCode;
    let Token = "HGFD-" + SysSession.CurrentEnvironment.Token;

    var Data = new Array();
    var Model: Cal_JurnalEntry = new Cal_JurnalEntry();
    var JurnalEntries: Array<Cal_JurnalEntry> = new Array<Cal_JurnalEntry>();
    var JurnalDetail: Array<Cal_JurnalDetail> = new Array<Cal_JurnalDetail>();
    var PostJurnalDetail: PostJurnalDetailAndmodel = new PostJurnalDetailAndmodel();
    var GetJurnalDetail: Array<CustomJurnalDetail> = new Array<CustomJurnalDetail>();
    var OldJurnalDetail: Array<CustomJurnalDetail> = new Array<CustomJurnalDetail>();
    var GetNewJurnalDetail: CustomJurnalDetail = new CustomJurnalDetail();

    var AllAccounts: Array<VW_SearchAllAccounts> = new Array<VW_SearchAllAccounts>();
    var DeatilsAndModel: CustomJurnalDetailAndmodel = new CustomJurnalDetailAndmodel();

    var Terms: Array<Ms_Terms> = new Array<Ms_Terms>();
    var CostCenters: Array<Cal_CostCenters> = new Array<Cal_CostCenters>();
    var Currencies: Array<MS_Currency> = new Array<MS_Currency>();

    // select Options
    var element: HTMLInputElement;
    var TermId: HTMLSelectElement;

    var ObjectId = 0;
    var StatusFlag;
    var Success;
    var hasNodes: boolean;
    var pageLoaded: boolean = false;
    var flag: boolean = true;
    var flagTotal: boolean = true;
    var AccountId: number;

    var divJurnalDetailGrid: JsGrid = new JsGrid();
    var grid: JsGrid = new JsGrid();

    const GridInputClassName = "form-control gridIput";

    var datatable;
    export function InitalizeComponent() {
        localStorage.setItem("TableName", "Cal_JurnalEntry");
        NavigateModule.InitalizeComponent();
        SharedButtons.compcode = Number(SysSession.CurrentEnvironment.CompCode);
        SharedWork.OnNavigate = Navigate;

        SharedButtons.AddAction(() => {
            btnAdd_onclick();
        });

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
        sys.JsTree(Data);
        GetAll();
        GetAllAccountCode();
        GetCostCenters();
        GetCurrency();
        GetAllTerms(13);
        InitializeJurnalDetailGrid();
    }

    function Initalizegrid(data: Array<CustomJurnalDetail>) {
        datatable = $('#datatable').DataTable({
            data: data,
            columns: [
                {
                    title: "#", data: "", className: "jsgrid control", render: function (data, type, row, meta) {
                        let tem = `<input class="jsgrid-button jsgrid-edit-button" type="button" title="Edit"> 
                                    <input class="jsgrid-button jsgrid-delete-button" type="button" title="Delete">`;
                        return tem;
                        //return meta.row + 1;
                    }
                },
                {
                    title: Resource.Code, type: "text", css: "ColumPadding", data: "AccountCode", id: "AccountCode", render: function (data, type, row) {
                        return isNaN(data) ? "" : data;
                    }
                    //editTemplate: (data: string, item: CustomJurnalDetail): HTMLSelectElement => {
                    //    let txt = CreateDropdownList(AllAccounts, "AccountNameA", "AccountNameA", "AccountCode", true) as HTMLSelectElement;
                    //    txt.onchange = (e) => {
                    //        SetAccountFromDrobDownInGrid($(e.target).val(), "u_CodeCurrency");
                    //    }
                    //    txt.id = "u_AccountCode";
                    //    txt.value = data;
                    //    return txt
                    //},
                    //insertTemplate: (data: string, item: CustomJurnalDetail): HTMLSelectElement => {
                    //    let txt = CreateDropdownList(AllAccounts, "AccountNameA", "AccountNameA", "AccountCode", true) as HTMLSelectElement;
                    //    txt.onchange = (e) => {
                    //        SetAccountFromDrobDownInGrid($(e.target).val(), "i_CodeCurrency");
                    //    }
                    //    txt.id = "i_AccountCode";
                    //    return txt
                    //},
                },
                {
                    title: Resource.Code2 + " " + Resource.AssistantAccount, type: "text", data: "SubAccountCode", id: "hd_SubAccountCode", render: function (data, type, row) {
                        return isNaN(data) ? "" : data;
                    }
                    //insertTemplate: function (data, row) {
                    //    let txt = CreateElement("text", null, null, null, "i_SubAccountCode", null);
                    //    txt.id = "i_SubAccountCode";
                    //    txt.disabled = true;
                    //    return txt
                    //}
                },
                {
                    title: Resource.Name_Arabic, type: "text", css: "ColumPadding", data: "AccountNameA", id: "hd_AccountNameA", render: function (data, type, row) {
                        return IsNullOrEmpty(data) ? "" : data;
                    }
                    //insertTemplate: function (data, row) {
                    //    let txt = CreateElement("text", null, null, null, "hd_AccountNameA", null);
                    //    txt.id = "hd_AccountNameA";
                    //    txt.disabled = true;
                    //    return txt
                    //}
                },
                {
                    title: Resource.App_Creditor + " " + "(" + Resource.Currency2 + ")", type: "number", css: "ColumPadding", data: "CurrencyCreditor",
                    id: "hd_CurrencyCreditor", render: function (data, type, row) {
                        return IsNullOrEmpty(data) ? "" : data;
                    }
                    //Typefun: "change", fun: function (e) {
                    //    calculat(e);
                    //},
                    //insertTemplate: function (data, row) {
                    //    let txt = CreateElement("number", null, null, null, "i_CurrencyCreditor", null);
                    //    txt.id = "i_CurrencyCreditor";
                    //    txt.onchange = (e) => {
                    //        calculat(e);
                    //    }
                    //    return txt
                    //},
                    //editTemplate: (data: string, item: CustomJurnalDetail): HTMLInputElement => {
                    //    let txt = CreateElement("number", null, null, null, "u_CurrencyCreditor", null);
                    //    txt.id = "u_CurrencyCreditor";
                    //    txt.value = data;
                    //    txt.onchange = (e) => {
                    //        calculat(e);
                    //    }
                    //    return txt
                    //},
                    //editControl: $(CreateElement("number", null, null, null, "u_CurrencyCreditor", null))
                },
                {
                    title: Resource.App_Debtor + " " + "(" + Resource.Currency2 + ")", type: "number", css: "ColumPadding", data: "CurrencyDebtor",
                    id: "hd_CurrencyDebtor", render: function (data, type, row) {
                         return isNaN(data) ? "" : data;
                    }
                    //Typefun: "change", fun: function (e) {
                    //    calculat(e);
                    //},
                    //insertTemplate: function (data, row) {
                    //    let txt = CreateElement("number", null, null, null, "i_CurrencyDebtor", null);
                    //    txt.id = "i_CurrencyDebtor";
                    //    txt.onchange = (e) => {
                    //        calculat(e);
                    //    }
                    //    return txt
                    //},
                    //editTemplate: (data: string, item: CustomJurnalDetail): HTMLInputElement => {
                    //    let txt = CreateElement("number", null, null, null, "u_CurrencyDebtor", null);
                    //    txt.id = "u_CurrencyDebtor";
                    //    txt.value = data;
                    //    txt.onchange = (e) => {
                    //        calculat(e);
                    //    }
                    //    return txt
                    //},
                    //editControl: $(CreateElement("number", null, null, null, "u_CurrencyDebtor", null))
                },
                {
                    title: Resource.Code2 + " " + Resource.Currency, css: "ColumPadding", type: "select", data: "CodeCurrency",
                    items: Currencies, valueField: "CurrencyCode", textField: (language ? "CurrencyDescA" : "CurrencyDescE"), id: "hd_CodeCurrency"
                    ,render: function (data, type, row) {
                         return isNaN(data) ? "" : data;
                    }
                    //Typefun: "change", fun: function (e) {
                    //    SetCurrency(Number($(e.target).val()), this);
                    //    calculat(e);
                    //}
                    //, editTemplate: function (data, row) {
                    //    let txt = CreateDropdownList(Currencies, "CurrencyDescA", "CurrencyDescE", "CurrencyCode", true);
                    //    txt.onchange = (e) => {
                    //        SetCurrency(Number($(e.target).val()), txt);
                    //        calculat(e);
                    //    }
                    //    txt.id = "u_CodeCurrency";
                    //    txt.value = data;
                    //    return txt
                    //}
                    //, insertTemplate: function (data, row) {
                    //    let txt = CreateDropdownList(Currencies, "CurrencyDescA", "CurrencyDescE", "CurrencyCode", true);
                    //    txt.onchange = (e) => {
                    //        SetCurrency(Number($(e.target).val()), txt);
                    //        calculat(e);
                    //    }
                    //    txt.id = "i_CodeCurrency";
                    //    return txt
                    //}
                },
                {
                    title: Resource.Name + " " + Resource.Currency, css: "ColumPadding", type: "text", data: "NameCurrency", id: "hd_NameCurrency",
                    render: function (data, type, row) {
                         return isNaN(data) ? "" : data;
                    }
                    //insertTemplate: function (data, row) {
                    //    let txt = CreateElement("text", null, null, null, "hd_NameCurrency", null);
                    //    txt.id = "hd_NameCurrency";
                    //    txt.disabled = true;
                    //    return txt
                    //}
                },
                {
                    title: Resource.ConversionFactor, css: "ColumPadding", type: "text", data: "Rate", id: "hd_Rate", disabled: true,
                    render: function (data, type, row) {
                         return isNaN(data) ? "" : data;
                    }
                    //insertTemplate: function (data, row) {
                    //    let txt = CreateElement("text", null, null, null, "hd_Rate", null);
                    //    txt.id = "hd_Rate";
                    //    txt.disabled = true;
                    //    return txt
                    //}
                },
                {
                    title: Resource.App_Creditor, css: "ColumPadding", data: "Creditor", type: "text", id: "hd_Creditor", disabled: true,
                    render: function (data, type, row) {
                         return isNaN(data) ? "" : data;
                    }
                    //insertTemplate: function (data, row) {
                    //    let txt = CreateElement("number", null, null, null, "hd_Creditor", null);
                    //    txt.id = "hd_Creditor";
                    //    txt.disabled = true;
                    //    return txt
                    //}
                },
                {
                    title: Resource.App_Debtor, css: "ColumPadding", type: "text", data: "Debtor", id: "hd_Debtor", disabled: true,
                    render: function (data, type, row) {
                         return isNaN(data) ? "" : data;
                    }
                    //insertTemplate: function (data, row) {
                    //    let txt = CreateElement("number", null, null, null, "hd_Debtor", null);
                    //    txt.id = "hd_Debtor";
                    //    txt.disabled = true;
                    //    return txt
                    //}
                },
                {
                    title: Resource.description, css: "ColumPadding", type: "text", data: "Descriptions", id: "hd_Descriptions", render: function (data, type, row) {
                         return isNaN(data) ? "" : data;
                    }
                },
                {
                    title: Resource.Notes, css: "ColumPadding", data: "Remarks", type: "text", id: "hd_Remarks", render: function (data, type, row) {
                         return isNaN(data) ? "" : data;
                    }
                },
                {
                    title: Resource.Code2 + Resource.Costcenter_name, css: "ColumPadding", type: "text", data: "CostCenterCode", id: "CostCenterCode",
                    render: function (data, type, row) {
                         return isNaN(data) ? "" : data;
                    }
                    //, editTemplate: function (data, row) {
                    //    let txt = CreateDropdownList(CostCenters, "CostCenterNameA", "CostCenterNameE", "CostCenterCode", true);
                    //    txt.onchange = (e) => {
                    //        SetCostCentersFromDrobDownInGrid($(e.target).val());
                    //    }
                    //    txt.id = "u_CostCenterCode";
                    //    txt.value = data;
                    //    return txt
                    //}
                    //, insertTemplate: function (data, row) {
                    //    let txt = CreateDropdownList(CostCenters, "CostCenterNameA", "CostCenterNameE", "CostCenterCode", true);
                    //    txt.onchange = (e) => {
                    //        SetCostCentersFromDrobDownInGrid($(e.target).val());
                    //    }
                    //    txt.id = "i_CostCenterCode";
                    //    return txt
                    //}
                },
                {
                    title: Resource.Costcenter_name + 1, css: "ColumPadding", type: "text", data: "CostCenterNameA", id: "hd_CostCenterNameA", disabled: true,
                    render: function (data, type, row) {
                         return isNaN(data) ? "" : data;
                    }
                    //,insertTemplate: function (data, row) {
                    //    let txt = CreateElement("text", null, null, null, "hd_CostCenterNameA", null);
                    //    txt.id = "hd_CostCenterNameA";
                    //    txt.disabled = true;
                    //    return txt
                    //}
                },
                {
                    title: "Flag", css: "ColumPadding hide", data: "Flag", width: "1%", id: "hd_Flag", render: function (data, type, row) {
                         return isNaN(data) ? "" : data;
                    }
                },
                {
                    title: "CostCenterId1", css: "ColumPadding hide", type: "text", data: "CostCenterId1", width: "1%", id: "hd_CostCenterId1", disabled: true
                    , render: function (data, type, row) {
                         return isNaN(data) ? "" : data;
                    }
                },
                {
                    title: "AccountId", css: "ColumPadding hide", type: "text", data: "AccountId", width: "1%", id: "hd_AccountId", disabled: true
                    , render: function (data, type, row) {
                         return isNaN(data) ? "" : data;
                    }
                },
                {
                    title: "CurrencyId", css: "ColumPadding hide", data: "CurrencyId", width: "1%", id: "hd_CurrencyId", disabled: true
                    , render: function (data, type, row) {
                         return isNaN(data) ? "" : data;
                    }
                },
                {
                    title: "JurnalId", css: "ColumPadding disable hidden", data: "JurnalId", width: "1%", id: "hd_JurnalId", disabled: true
                    , render: function (data, type, row) {
                         return isNaN(data) ? "" : data;
                    }
                },
                {
                    title: "JurnalDetailId", css: "ColumPadding disable hidden", data: "JurnalDetailId", width: "1%", id: "hd_JurnalDetailId", disabled: true
                    , render: function (data, type, row) {
                         return isNaN(data) ? "" : data;
                    }
                },
                ////////////////////////////////////////// ///////////////////
                {
                    title: "BusinessPartnerAccId", css: "ColumPadding disable hidden", data: "BusinessPartnerAccId", width: "1%", id: "hd_BusinessPartnerAccId", disabled: true
                    , render: function (data, type, row) {
                         return isNaN(data) ? "" : data;
                    }
                },
                {
                    title: "AssetAccountId", css: "ColumPadding disable hidden", data: "AssetAccountId", width: "1%", id: "hd_AssetAccountId", disabled: true
                    , render: function (data, type, row) {
                         return isNaN(data) ? "" : data;
                    }
                },
                {
                    title: "EmpAccountId", css: "ColumPadding disable hidden", data: "EmpAccountId", width: "1%", id: "hd_EmpAccountId", disabled: true
                    , render: function (data, type, row) {
                         return isNaN(data) ? "" : data;
                    }
                },
                {
                    title: "VendAccountId", css: "ColumPadding disable hidden", data: "VendAccountId", width: "1%", id: "hd_VendAccountId", disabled: true
                    , render: function (data, type, row) {
                         return isNaN(data) ? "" : data;
                    }
                },
                {
                    title: "CustAccountId", css: "ColumPadding disable hidden", data: "CustAccountId", width: "1%", id: "hd_CustAccountId", disabled: true
                    , render: function (data, type, row) {
                         return isNaN(data) ? "" : data;
                    }
                },
            ]
        });
    }

    function InitalizeControls() {
        SharedButtons.btnSearch = document.getElementById("btnCal_JurnalEntrySearch") as HTMLButtonElement;
        TermId = document.getElementById("TermId") as HTMLSelectElement;
        //DepartMentId = document.getElementById("DepartMentId") as HTMLSelectElement;
        //StoreId = document.getElementById("StoreId") as HTMLSelectElement;
        //JobId = document.getElementById("JobId") as HTMLSelectElement;
        //PeriodTableId = document.getElementById("PeriodTableId") as HTMLSelectElement;
        //ShiftId = document.getElementById("ShiftId") as HTMLSelectElement;
    }

    function InitalizeEvents() {
        SharedButtons.btnSearch.onclick = btnSearch_onclick;
        SharedButtons.btnRefrash.onclick = Refrash;
        SharedButtons.btnRefrash2.onclick = Refrash;
    }

    function GetAll() {
        Disabled(false);
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("Cal_JurnalEntry", "GetAllFroTree"),
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess) {
                    JurnalEntries = result.Response as Array<Cal_JurnalEntry>;
                    //FillTreeData();
                }
            }
        });
    }

    function GetByID(Id: number) {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("Cal_JurnalEntry", "GetAll"),
            data: { id: Id },
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess) {
                    DeatilsAndModel = result.Response as CustomJurnalDetailAndmodel;
                    GetJurnalDetail = DeatilsAndModel.JurnalDetails;
                    let data = ConvertNumberToDesimal(GetJurnalDetail);

                    divJurnalDetailGrid.DataSource = data;
                    divJurnalDetailGrid.Bind();
                    //console.log(divJurnalDetailGrid.DataSource);
                    //InitializeJurnalDetailGrid();

                    //////////////// for DataTable ////////////////
                    //if (datatable == null)
                    //    Initalizegrid(data);
                    //else
                    //    ResetDatatable(data);

                    Model = DeatilsAndModel.JurnalEntry;
                    Display(Model);
                    CalculatTotal();
                    SharedWork.SwitchModes(ScreenModes.Query);
                }
                else
                    MessageBox.Show(Resource.Error, Resource.Error);
            }
        });
    }

    function ConvertNumberToDesimal(Detail: Array<CustomJurnalDetail>) {
        for (var i = 0; i < Detail.length; i++) {
            Detail[i].CurrencyDebtor = Number(Detail[i].CurrencyDebtor?.toFixed(3));
            Detail[i].Debtor = Number(Detail[i].Debtor?.toFixed(3));

            Detail[i].CurrencyCreditor = Number(Detail[i].CurrencyCreditor?.toFixed(3));
            Detail[i].Creditor = Number(Detail[i].Creditor?.toFixed(3));
        }
        return GetJurnalDetail;
    }

    function Assign() {
        MapDetails();
        Model = DocumentActions.AssignToModel<Cal_JurnalEntry>(Model);
        PostJurnalDetail.JurnalEntry = Model;
        if (StatusFlag == "i") {
            Model.CreatedAt = DateTimeFormat(Date().toString());
            Model.CreatedBy = SysSession.CurrentEnvironment.UserCode;
            Insert();
        }
        if (StatusFlag == "u") {
            // Model.JurnalId = ObjectId;
            Model.UpdateAt = DateTimeFormat(Date().toString());
            Model.UpdateBy = SysSession.CurrentEnvironment.UserCode;
            Update();
        }
        ObjectId = Model.JurnalId;
        GetAll();
        return true;
    }

    function Save() {
        if (DocumentActions.CheckCode(JurnalEntries, DocumentActions.GetElementByName("TrNo").value, "TrNo") == false && StatusFlag == "i") {
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
            url: sys.apiUrl("Cal_JurnalEntry", "Insert"),
            data: JSON.stringify(PostJurnalDetail),
            success: (Response) => {
                let result = Response as BaseResponse;
                if (result.IsSuccess) {
                    Model = result.Response as Cal_JurnalEntry;
                    ObjectId = Model.JurnalId;
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
            url: sys.apiUrl("Cal_JurnalEntry", "Update"),
            data: JSON.stringify(PostJurnalDetail),
            success: (Response) => {
                let result = Response as BaseResponse;
                if (result.IsSuccess) {
                    Model = result.Response as Cal_JurnalEntry
                    ObjectId = Model.JurnalId;
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
            url: sys.apiUrl("Cal_JurnalEntry", "Delete") + "/" + ObjectId,
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
        $('select option:first-child').val('null').prop("selected", true).prop("disabled", true);
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
            MessageBox.Show("لحفظ المستند لابد اجمالى المدين  = اجمالى الدائن", Resource.Error);
            flag = flagTotal;
        }
        return flag;
    }

    export function Navigate() {
        Model = JurnalEntries[SharedWork.PageIndex - 1];
        ObjectId = Model.JurnalId;
        if (ObjectId != 0)
            GetByID(ObjectId);
    }

    export function FillTreeData() {
        Data = new Array();
        for (var i = 0; i < JurnalEntries.length; i++) {
            Data.push({
                id: JurnalEntries[i].JurnalId,
                parent: "#",
                text: JurnalEntries[i].TrNo,
                "state": { "opened": true }
            });
        }
        $('#Tree').jstree(true).settings.core.data = Data;
        $('#Tree').jstree(true).refresh();
    }

    $('#Tree').on("select_node.jstree", function (e, data) { GetByID(data.node.id) });

    function Display(model: Cal_JurnalEntry) {
        DocumentActions.RenderFromModel(model);
        Model = model;
        ObjectId = Number(Model.JurnalId);
    }

    //////////////////////// start Add Jurnal Detail In Grid /////////////////////////
    function AddJurnalDetailInGrid() {
        flag = true;
        GetNewJurnalDetail = new CustomJurnalDetail();
        let hd_SubAccountCode = $('#hd_SubAccountCode'),
            hd_AccountId = $('#hd_AccountId'),
            hd_BusinessPartnerAccId = $('#hd_BusinessPartnerAccId'),
            hd_AssetAccountId = $('#hd_AssetAccountId'),
            hd_EmpAccountId = $('#hd_EmpAccountId'),
            hd_VendAccountId = $('#hd_VendAccountId'),
            hd_CustAccountId = $('#hd_CustAccountId'),
            hd_AccountCode = $('#hd_AccountCode'),
            hd_AccountNameA = $('#hd_AccountNameA'),
            hd_CurrencyCreditor = $('#hd_CurrencyCreditor'),
            hd_CurrencyDebtor = $('#hd_CurrencyDebtor'),
            hd_CurrencyId = $('#hd_CurrencyId'),
            hd_CodeCurrency = $('#hd_CodeCurrency'),
            hd_NameCurrency = $('#hd_NameCurrency'),
            hd_Rate = $('#hd_Rate'),
            hd_Creditor = $('#hd_Creditor'),
            hd_Debtor = $('#hd_Debtor'),
            hd_Descriptions = $('#hd_Descriptions'),
            hd_Remarks = $('#hd_Remarks'),
            hd_CostCenterId1 = $('#hd_CostCenterId1'),
            hd_CostCenterCode = $('#hd_CostCenterCode'),
            hd_CostCenterNameA = $('#hd_CostCenterNameA'),
            hd_JurnalDetailId = $('#hd_JurnalDetailId'),
            hd_JurnalId = $('#hd_JurnalId');

        if (hd_CurrencyCreditor.val().trim() == '' && hd_CurrencyDebtor.val().trim() == '') { MessageBox.Show("من فضلك ادخل قيمة الدائن او المدين", Resource.Error); flag = false; return }

        if (hd_AccountCode.val().trim() == 'null') { MessageBox.Show(Resource.PleaseEnterCode, Resource.Error); flag = false; return }
        else {
            GetNewJurnalDetail.AccountId = hd_AccountId.val().trim();
            let val = hd_AccountCode.val().trim().split('-') as Array<string>;
            if (val.length > 1)
                GetNewJurnalDetail.AccountCode = val[1];
            else
                GetNewJurnalDetail.AccountCode = val[0];
        }
        if (hd_CodeCurrency.val().trim() == "null") { MessageBox.Show("من فضلك اختر العملة", Resource.Error); flag = false; return }
        if (flag) {
            GetNewJurnalDetail.JurnalId = hd_JurnalId.val().trim();
            GetNewJurnalDetail.SubAccountCode = hd_SubAccountCode.val().trim();
            GetNewJurnalDetail.AccountNameA = hd_AccountNameA.val().trim();
            GetNewJurnalDetail.CurrencyCreditor = hd_CurrencyCreditor.val().trim();
            GetNewJurnalDetail.CurrencyDebtor = hd_CurrencyDebtor.val().trim();
            GetNewJurnalDetail.CurrencyId = hd_CurrencyId.val().trim();
            GetNewJurnalDetail.CodeCurrency = hd_CodeCurrency.val().trim();
            GetNewJurnalDetail.NameCurrency = hd_NameCurrency.val().trim();
            GetNewJurnalDetail.Rate = hd_Rate.val().trim();
            GetNewJurnalDetail.Creditor = hd_Creditor.val().trim();
            GetNewJurnalDetail.Debtor = hd_Debtor.val().trim();
            GetNewJurnalDetail.Descriptions = hd_Descriptions.val().trim();
            GetNewJurnalDetail.Remarks = hd_Remarks.val().trim();

            if (hd_CostCenterCode.val().trim() != 'null') {
                GetNewJurnalDetail.CostCenterCode = hd_CostCenterCode.val().trim();
                GetNewJurnalDetail.CostCenterNameA = hd_CostCenterNameA.val().trim();
                GetNewJurnalDetail.CostCenterId1 = hd_CostCenterId1.val().trim();
            }

            GetNewJurnalDetail.BusinessPartnerAccId = hd_BusinessPartnerAccId.val().trim();
            GetNewJurnalDetail.AssetAccountId = hd_AssetAccountId.val().trim();
            GetNewJurnalDetail.EmpAccountId = hd_EmpAccountId.val().trim();
            GetNewJurnalDetail.VendAccountId = hd_VendAccountId.val().trim();
            GetNewJurnalDetail.CustAccountId = hd_CustAccountId.val().trim();

            if ($('#hd_Flag').val().trim() == "u")
                GetNewJurnalDetail.StatusFlag = "u";
            else GetNewJurnalDetail.StatusFlag = "i";

            if (hd_JurnalDetailId.val().trim() == "") GetNewJurnalDetail.JurnalDetailId = 0;
            else GetNewJurnalDetail.JurnalDetailId = hd_JurnalDetailId.val().trim();

            GetJurnalDetail.unshift(GetNewJurnalDetail);
            divJurnalDetailGrid.DataSource = GetJurnalDetail;
            CalculatTotal();
            divJurnalDetailGrid.Bind();
        }
        return;
    }

    function InitializeJurnalDetailGrid() {
        divJurnalDetailGrid.ElementName = "divJurnalDetailGrid";
        divJurnalDetailGrid.PrimaryKey = "JurnalDetailId";
        divJurnalDetailGrid.Inserting = true;
        divJurnalDetailGrid.Editing = true;
        divJurnalDetailGrid.Paging = true;
        //divJurnalDetailGrid.Sorting = true;
        divJurnalDetailGrid.PageSize = 10;
        divJurnalDetailGrid.ConfirmDeleteing = true;
        divJurnalDetailGrid.InsertionMode = JsGridInsertionMode.Binding;
        divJurnalDetailGrid.OnItemEditing = ChangeSelectToSearchable;
        divJurnalDetailGrid.OnItemUpdating = UpdateGrid
        divJurnalDetailGrid.OnItemInserting = InsertGrid;
        divJurnalDetailGrid.OnItemDeleting = () => { };
        divJurnalDetailGrid.OnRowSelected = () => { };
        divJurnalDetailGrid.OnRefreshed = () => { };
        divJurnalDetailGrid.Columns = [
            {
                title: "#", name: "btnAddItem", visible: true, width: "45px" , type: "control"
            },
            {
                title: Resource.Code, type: "text", css: "ColumPadding", name: "AccountCode", id: "AccountCode",
                editTemplate: (data: string, item: CustomJurnalDetail): HTMLSelectElement => {
                    let txt = CreateDropdownList(AllAccounts, "AccountNameA", "AccountNameA", "AccountCode", true) as HTMLSelectElement;
                    txt.onchange = (e) => {
                        SetAccountFromDrobDownInGrid($(e.target).val(), "u_CodeCurrency");
                    }
                    txt.id = "u_AccountCode";
                    txt.value = data;
                    return txt
                },
                insertTemplate: (data: string, item: CustomJurnalDetail): HTMLSelectElement => {
                    let txt = CreateDropdownList(AllAccounts, "AccountNameA", "AccountNameA", "AccountCode", true) as HTMLSelectElement;
                    txt.onchange = (e) => {
                        SetAccountFromDrobDownInGrid($(e.target).val(), "i_CodeCurrency");
                    }
                    txt.id = "i_AccountCode";
                    return txt
                },
            },
            {
                title: Resource.Code2 + " " + Resource.AssistantAccount, type: "text", name: "SubAccountCode", id: "hd_SubAccountCode",
                insertTemplate: function (data, row) {
                    let txt = CreateElement("text", null, null, null, "i_SubAccountCode", null);
                    txt.id = "i_SubAccountCode";
                    txt.disabled = true;
                    return txt
                }
            },
            {
                title: Resource.Name_Arabic, type: "text", css: "ColumPadding", name: "AccountNameA", id: "hd_AccountNameA",
                insertTemplate: function (data, row) {
                    let txt = CreateElement("text", null, null, null, "hd_AccountNameA", null);
                    txt.id = "hd_AccountNameA";
                    txt.disabled = true;
                    return txt
                }
            },
            {
                title: Resource.App_Creditor + " " + "(" + Resource.Currency2 + ")", type: "number", css: "ColumPadding", name: "CurrencyCreditor",
                id: "hd_CurrencyCreditor", Typefun: "change", fun: function (e) {
                    calculat(e);
                },
                insertTemplate: function (data, row) {
                    let txt = CreateElement("number", null, null, null, "i_CurrencyCreditor", null);
                    txt.id = "i_CurrencyCreditor";
                    txt.onchange = (e) => {
                        calculat(e);
                    }
                    return txt
                },
                editTemplate: (data: string, item: CustomJurnalDetail): HTMLInputElement => {
                    let txt = CreateElement("number", null, null, null, "u_CurrencyCreditor", null);
                    txt.id = "u_CurrencyCreditor";
                    txt.value = data;
                    txt.onchange = (e) => {
                        calculat(e);
                    }
                    return txt
                },
                editControl: $(CreateElement("number", null, null, null, "u_CurrencyCreditor", null))
            },
            {
                title: Resource.App_Debtor + " " + "(" + Resource.Currency2 + ")", type: "number", css: "ColumPadding", name: "CurrencyDebtor",
                id: "hd_CurrencyDebtor", Typefun: "change", fun: function (e) {
                    calculat(e);
                },
                insertTemplate: function (data, row) {
                    let txt = CreateElement("number", null, null, null, "i_CurrencyDebtor", null);
                    txt.id = "i_CurrencyDebtor";
                    txt.onchange = (e) => {
                        calculat(e);
                    }
                    return txt
                },
                editTemplate: (data: string, item: CustomJurnalDetail): HTMLInputElement => {
                    let txt = CreateElement("number", null, null, null, "u_CurrencyDebtor", null);
                    txt.id = "u_CurrencyDebtor";
                    txt.value = data;
                    txt.onchange = (e) => {
                        calculat(e);
                    }
                    return txt
                },
                editControl: $(CreateElement("number", null, null, null, "u_CurrencyDebtor", null))
            },
            {
                title: Resource.Code2 + " " + Resource.Currency, css: "ColumPadding", type: "select", name: "CodeCurrency",
                items: Currencies, valueField: "CurrencyCode", textField: (language ? "CurrencyDescA" : "CurrencyDescE"), id:"hd_CodeCurrency"
                , Typefun: "change", fun: function (e) {
                    SetCurrency(Number($(e.target).val()), this);
                    calculat(e);
                }
                ,editTemplate: function (data, row) {
                    let txt = CreateDropdownList(Currencies, "CurrencyDescA", "CurrencyDescE", "CurrencyCode", true);
                    txt.onchange = (e) => {
                        SetCurrency(Number($(e.target).val()), txt);
                        calculat(e);
                    }
                    txt.id = "u_CodeCurrency";
                    txt.value = data;
                    return txt
                }
                ,insertTemplate: function (data, row) {
                    let txt = CreateDropdownList(Currencies, "CurrencyDescA", "CurrencyDescE", "CurrencyCode", true);
                    txt.onchange = (e) => {
                        SetCurrency(Number($(e.target).val()), txt);
                        calculat(e);
                    }
                    txt.id = "i_CodeCurrency";
                    return txt
                }
            },
            {
                title: Resource.Name + " " + Resource.Currency, css: "ColumPadding", type: "text", name: "NameCurrency", id: "hd_NameCurrency",
                insertTemplate: function (data, row) {
                    let txt = CreateElement("text", null, null, null, "hd_NameCurrency", null);
                    txt.id = "hd_NameCurrency";
                    txt.disabled = true;
                    return txt
                }
            },
            {
                title: Resource.ConversionFactor, css: "ColumPadding", type: "text", name: "Rate", id: "hd_Rate", disabled: true,
                insertTemplate: function (data, row) {
                    let txt = CreateElement("text", null, null, null,"hd_Rate", null);
                    txt.id = "hd_Rate";
                    txt.disabled = true;
                    return txt
                }
            },
            {
                title: Resource.App_Creditor, css: "ColumPadding", name: "Creditor", type: "text", id: "hd_Creditor", disabled: true,
                insertTemplate: function (data, row) {
                    let txt = CreateElement("number", null, null, null, "hd_Creditor", null);
                    txt.id = "hd_Creditor";
                    txt.disabled = true;
                    return txt
                }
            },
            {
                title: Resource.App_Debtor, css: "ColumPadding", type: "text", name: "Debtor", id: "hd_Debtor", disabled: true,
                insertTemplate: function (data, row) {
                    let txt = CreateElement("number", null, null, null, "hd_Debtor", null);
                    txt.id = "hd_Debtor";
                    txt.disabled = true;
                    return txt
                }
            },
            {
                title: Resource.description, css: "ColumPadding", type: "text", name: "Descriptions", id: "hd_Descriptions",
            },
            {
                title: Resource.Notes, css: "ColumPadding", name: "Remarks", type: "text", id: "hd_Remarks",
            },
            {
                title: Resource.Code2 + Resource.Costcenter_name, css: "ColumPadding", type: "text", name: "CostCenterCode", id:"CostCenterCode"
                ,editTemplate: function (data, row) {
                    let txt = CreateDropdownList(CostCenters, "CostCenterNameA", "CostCenterNameE", "CostCenterCode", true);
                    txt.onchange = (e) => {
                        SetCostCentersFromDrobDownInGrid($(e.target).val());
                    }
                    txt.id = "u_CostCenterCode";
                    txt.value = data;
                    return txt
                }
                ,insertTemplate: function (data, row) {
                    let txt = CreateDropdownList(CostCenters, "CostCenterNameA", "CostCenterNameE", "CostCenterCode", true);
                    txt.onchange = (e) => {
                        SetCostCentersFromDrobDownInGrid($(e.target).val());
                    }
                    txt.id = "i_CostCenterCode";
                    return txt
                }
            },
            {
                title: Resource.Costcenter_name + 1, css: "ColumPadding", type: "text", name: "CostCenterNameA", id: "hd_CostCenterNameA", disabled: true
                //,insertTemplate: function (data, row) {
                //    let txt = CreateElement("text", null, null, null, "hd_CostCenterNameA", null);
                //    txt.id = "hd_CostCenterNameA";
                //    txt.disabled = true;
                //    return txt
                //}
            },
            {
                title: "Flag", css: "ColumPadding hide", name: "Flag", width: "1%", id: "hd_Flag"
            },
            {
                title: "CostCenterId1", css: "ColumPadding hide", type: "text", name: "CostCenterId1", width: "1%", id: "hd_CostCenterId1", disabled: true
            },
            {
                title: "AccountId", css: "ColumPadding hide", type: "text", name: "AccountId", width: "1%", id: "hd_AccountId", disabled: true
            },
            {
                title: "CurrencyId", css: "ColumPadding hide", name: "CurrencyId", width: "1%", id: "hd_CurrencyId", disabled: true
            },
            {
                title: "JurnalId", css: "ColumPadding disable hidden", name: "JurnalId", width: "1%", id: "hd_JurnalId", disabled: true
            },
            {
                title: "JurnalDetailId", css: "ColumPadding disable hidden", name: "JurnalDetailId", width: "1%", id: "hd_JurnalDetailId", disabled: true
            },
            ////////////////////////////////////////// ///////////////////
            {
                title: "BusinessPartnerAccId", css: "ColumPadding disable hidden", name: "BusinessPartnerAccId", width: "1%", id: "hd_BusinessPartnerAccId", disabled: true
            },
            {
                title: "AssetAccountId", css: "ColumPadding disable hidden", name: "AssetAccountId", width: "1%", id: "hd_AssetAccountId", disabled: true
            },
            {
                title: "EmpAccountId", css: "ColumPadding disable hidden", name: "EmpAccountId", width: "1%", id: "hd_EmpAccountId", disabled: true
            },
            {
                title: "VendAccountId", css: "ColumPadding disable hidden", name: "VendAccountId", width: "1%", id: "hd_VendAccountId", disabled: true
            },
            {
                title: "CustAccountId", css: "ColumPadding disable hidden", name: "CustAccountId", width: "1%", id: "hd_CustAccountId", disabled: true
            },

        ];
        divJurnalDetailGrid.Bind();
    }
    //////////////////////// End Jurnal Detail In Grid /////////////////////////

    function Undo() {
        Disabled(false);
        Success = false;
        if (ObjectId != 0) 
            GetByID(ObjectId);
    }

    function Disabled(clear: boolean) {
        DocumentActions.allElements(true, clear, Model);
        $('#left').removeClass("disabledDiv");
    }

    function RemoveDisabled(clear: boolean) {
        DocumentActions.allElements(false, clear, Model);
        $('#left').addClass("disabledDiv");
    }

    function GetModel(id: number) {
        Model = JurnalEntries.filter(x => x.JurnalId == id)[0];
        return Model;
    }

    function GetAllAccountCode() {
        Disabled(false);
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("Cal_JurnalEntry", "GetAllAccountCode"),
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess) {
                    AllAccounts = result.Response as Array<VW_SearchAllAccounts>;
                }
            }
        });
    }

    function GetCostCenters() {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("funcationShared", "GetCostCenters"),
            success: (Response) => {
                let result = Response as BaseResponse;
                if (result.IsSuccess) {
                    CostCenters = result.Response as Array<Cal_CostCenters>;
                }
            }
        });
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
                }
            }
        });
    }

    function SetAccountFromDrobDownInGrid(code: string, CurrencyId: string) {
        let account = AllAccounts.filter(x => x.AccountCode == code)[0],
            elm = document.getElementById(CurrencyId),
            rowId = GetRowId(elm);

        if (account != null) {
            SetAccountData(account.AccDesc2, code);
            if (code.split('-').length > 1) {
                $(rowId +' #hd_SubAccountCode').val(code.split('-')[0]);
            } else {
                $(rowId +' #hd_SubAccountCode').val('');
            }
            $(rowId +' #hd_AccountNameA').val(account.AccountNameA);
            SetCurrencyById(account.CurrencyId, elm);
            $('#' + CurrencyId).select2().trigger('change');
        }
    }

    function SetCostCentersFromDrobDownInGrid(val: number) {
        let cost = CostCenters.filter(x => x.CostCenterCode == val)[0];
        if (cost != null) {
            $('#hd_CostCenterId1').val(cost.CostCenterId);
            $('#hd_CostCenterNameA').val(cost.CostCenterNameA);
        }
    }

    function SetAccountData(AccDesc2: string, code: string) {
        switch (AccDesc2) {
            case 'GL Account': {
                AccountByCode(code);
                break;
            }
            case 'Customer': {
                CustomerByCode(code);
                break;
            }
            case 'Vendor': {
                VendorByCode(code);
                break;
            }
            case 'Employee': {
                EmployeeByCode(code);
                break;
            }
            case 'Fixed Asset': {
                FixedAssetByCode(code);
                break;
            }
            default: {
                BusinessPartnerAccountsByCode(code);
                break;
            }
        }
    }

    function AccountByCode(code: string) {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("funcationShared", "GetAccountChartByCode"),
            data: { code: code },
            success: (Response) => {
                let result = Response as BaseResponse;
                if (result.IsSuccess) {
                    let res = result.Response as Cal_AccountChart
                    AccountId = res.AccountId;
                    $('#hd_AccountId').val(AccountId);
                }
            }
        });
    }

    function CustomerByCode(code: string) {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("funcationShared", "GetCustAccountByCode"),
            data: { code: code },
            success: (Response) => {
                let result = Response as BaseResponse;
                if (result.IsSuccess) {
                    let res = result.Response as Cal_CustAccounts
                    AccountId = res.AccountId;
                    $('#hd_AccountId').val(AccountId);
                    $('#hd_CustAccountId').val(res.CustAccountId);
                }
            }
        });
    }

    function VendorByCode(code: string) {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("funcationShared", "GetVendAccountByCode"),
            data: { code: code },
            success: (Response) => {
                let result = Response as BaseResponse;
                if (result.IsSuccess) {
                    let res = result.Response as Cal_VendAccounts
                    AccountId = res.AccountId;
                    $('#hd_AccountId').val(AccountId);
                    $('#hd_VendAccountId').val(res.VendAccountId);
                }
            }
        });
    }

    function EmployeeByCode(code: string) {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("funcationShared", "GetEmpAccountsByCode"),
            data: { code: code },
            success: (Response) => {
                let result = Response as BaseResponse;
                if (result.IsSuccess) {
                    let res = result.Response as Cal_EmpAccounts
                    AccountId = res.AccountId;
                    $('#hd_AccountId').val(AccountId);
                    $('#hd_VendAccountId').val(res.EmpAccountId);
                }
            }
        });
    }

    function FixedAssetByCode(code: string) {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("funcationShared", "GetAssetAccountsByCode"),
            data: { code: code },
            success: (Response) => {
                let result = Response as BaseResponse;
                if (result.IsSuccess) {
                    let res = result.Response as Cal_AssetAccounts
                    AccountId = res.AccountId;
                    $('#hd_AccountId').val(AccountId);
                    $('#hd_VendAccountId').val(res.AssetAccountId);
                }
            }
        });
    }

    function BusinessPartnerAccountsByCode(code: string) {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("funcationShared", "GetBusinessPartnerAccByCode"),
            data: { code: code },
            success: (Response) => {
                let result = Response as BaseResponse;
                if (result.IsSuccess) {
                    let res = result.Response as Cal_BusinessPartnerAccounts
                    AccountId = res.AccountId;
                    $('#hd_AccountId').val(AccountId);
                    $('#hd_VendAccountId').val(res.BusinessPartnerAccId);
                }
            }
        });
    }

    function SetCurrency(code: number, element: HTMLElement) {
        let rowId = GetRowId(element);

        if (!isNaN(code) && code != 0 && !IsNullOrEmpty(rowId)) {
            let Currency = Currencies.filter(x => x.CurrencyCode == code)[0];
            $(rowId + '#hd_CurrencyId').val(Currency.CurrencyId);
            $(rowId + '#' + element.id).val(Currency.CurrencyCode);

            $(rowId + '#hd_Rate').val(Currency.Rate.toFixed(2));
            $(rowId + '#hd_NameCurrency').val(Currency.CurrencyDescA);
        }
    }

    function SetCurrencyById(id: number, element: HTMLElement) {
        let rowId = GetRowId(element);

        let Currency = Currencies.filter(x => x.CurrencyId == id)[0];
        $(rowId + '#hd_CurrencyId').val(Currency.CurrencyId);
        $(rowId + '#' + element.id).val(Currency.CurrencyCode);

        $(rowId + '#hd_Rate').val(Currency.Rate.toFixed(2));
        $(rowId + '#hd_NameCurrency').val(Currency.CurrencyDescA);

        $(rowId + '#hd_CodeCurrency').select2().trigger('change');
    }

    function ClearGrids() {
        GetJurnalDetail = new Array<CustomJurnalDetail>();
        ClearBranchesGrid();
    }

    function ClearBranchesGrid() {
        divJurnalDetailGrid.DataSource = GetJurnalDetail;
        divJurnalDetailGrid.Bind();
        $('div#TotalDebit span').text(0);
        $('div#TotalCredit span').text(0);
        $('div#def span').text(0);
    }

    function calculat(e) {
        let elm = document.getElementById(e.target.id),
            rowId = GetRowId(elm),
            pref = e.target.id.split('_')[0];

        let CurrencyCreditor = $(rowId + ' #' + pref+'_CurrencyCreditor'),
            CurrencyDebtor = $(rowId + ' #' + pref +'_CurrencyDebtor'),
            Rate = Number($(rowId + ' #hd_Rate').val()),
            Creditor = $(rowId +' #hd_Creditor'),
            Debtor = $(rowId +' #hd_Debtor');

        if (e.target.id == pref+"_CurrencyCreditor") {
            Creditor.val(Number(CurrencyCreditor.val()) * Rate);
            Debtor.val('');
            CurrencyDebtor.val('');
        }
        else if (e.target.id == pref +"_CurrencyDebtor") {
            Debtor.val(Number(CurrencyDebtor.val()) * Rate);
            Creditor.val('');
            CurrencyCreditor.val('');
        } else if (e.target.id == "hd_CodeCurrency") {
            if (Number(CurrencyCreditor.val()) > 0)
                Creditor.val(Number(CurrencyCreditor.val()) * Rate);
            if (Number(CurrencyDebtor.val()) > 0)
                Debtor.val(Number(CurrencyDebtor.val()) * Rate);
        }
    }

    function CalculatTotal() {
        let TotalDebit = 0,
            TotalCredit = 0,
            def = 0;

        for (var i = 0; i < GetJurnalDetail.length; i++) {
            TotalDebit += isNaN(GetJurnalDetail[i].CurrencyDebtor) ? 0 : Number(GetJurnalDetail[i].CurrencyDebtor);
            TotalCredit += isNaN(GetJurnalDetail[i].CurrencyCreditor) ? 0 : Number(GetJurnalDetail[i].CurrencyCreditor);
        }

        def = Number(TotalDebit.toFixed(3)) - Number(TotalCredit.toFixed(3));
        $('div#TotalDebit span').text(TotalDebit.toFixed(3));
        $('div#TotalCredit span').text(TotalCredit.toFixed(3));
        $('div#def span').text(def);
        if (def == 0)
            flagTotal = true
        else {
            flagTotal = false;
        }
    }

    function MapDetails() {
        debugger
        PostJurnalDetail.JurnalDetails = new Array<Cal_JurnalDetail>();
        for (var i = 0; i < GetJurnalDetail.length; i++) {
            let NewJurnalDetail = new Cal_JurnalDetail();
            NewJurnalDetail.JurnalDetailId = GetJurnalDetail[i].JurnalDetailId;
            NewJurnalDetail.AccountId = GetJurnalDetail[i].AccountId;
            NewJurnalDetail.JurnalId = GetJurnalDetail[i].JurnalId;;
            NewJurnalDetail.CustAccountId = GetJurnalDetail[i].CustAccountId;
            NewJurnalDetail.VendAccountId = GetJurnalDetail[i].VendAccountId;
            NewJurnalDetail.EmpAccountId = GetJurnalDetail[i].EmpAccountId;
            NewJurnalDetail.AssetAccountId = GetJurnalDetail[i].AssetAccountId;
            NewJurnalDetail.BusinessPartnerAccId = GetJurnalDetail[i].BusinessPartnerAccId;
            NewJurnalDetail.CostCenterId1 = GetJurnalDetail[i].CostCenterId1;
            NewJurnalDetail.Rate = GetJurnalDetail[i].Rate;
            NewJurnalDetail.DebitCurrency = GetJurnalDetail[i].CurrencyDebtor;
            NewJurnalDetail.CreditCurrency = GetJurnalDetail[i].CurrencyCreditor;
            NewJurnalDetail.DebitLocal = GetJurnalDetail[i].Debtor;
            NewJurnalDetail.CreditLocal = GetJurnalDetail[i].Creditor;
            NewJurnalDetail.JurDesc = GetJurnalDetail[i].Descriptions;
            NewJurnalDetail.CurrencyId = GetJurnalDetail[i].CurrencyId;
            NewJurnalDetail.Remarks = GetJurnalDetail[i].Remarks;

            NewJurnalDetail.StatusFlag = GetJurnalDetail[i].StatusFlag;
            PostJurnalDetail.JurnalDetails.push(NewJurnalDetail);
        };
    }

    function GetRowId(element: HTMLElement): string {
        let rowId = '';
        try {
            if (element.id.split('_')[0] == 'i') {
                rowId = '.jsgrid-insert-row '
            }
            else if (element.id.split('_')[0] == 'u') {
                rowId = '#_idEdit ';
            } else
                rowId = $('#' + element.id).parent().parent()[0].id;
        } catch (e) {
        }
        return rowId;
    }

    function btnSearch_onclick() {
        let sys: SystemTools = new SystemTools();
        sys.FindKey(Modules.Cal_JurnalEntry, SharedButtons.btnSearch.id, "", () => {
            let id = SearchGrid.SearchDataGrid.SelectedKey;
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

    function UpdateGrid(e: JsGridUpdateEventArgs) {
        debugger
        //OldJurnalDetail = GetJurnalDetail;
        //GetJurnalDetail = new Array<CustomJurnalDetail>();

        let item = e.Item as CustomJurnalDetail;

        //var index: number = e.ItemIndex;
        let index = Number($('#_idEdit').nextAll('tr:first')[0].id.split('_id')[1]);

        item.StatusFlag = 'u';
        item.AccountCode = $('#u_AccountCode').val()?.trim();
        item.CodeCurrency = $('#u_CodeCurrency').val()?.trim();
        item.CostCenterCode = $('#u_CostCenterCode').val()?.trim();

        GetJurnalDetail.splice(index, 1, item);
        //GetJurnalDetail.unshift(item);
        //OldJurnalDetail.filter(x => x.JurnalDetailId != item.JurnalDetailId).forEach(element => GetJurnalDetail.push(element));

        //divJurnalDetailGrid.DataSource = new Array<CustomJurnalDetail>();
        //divJurnalDetailGrid.Bind();

        divJurnalDetailGrid.DataSource = GetJurnalDetail;
        CalculatTotal();
        divJurnalDetailGrid.Bind();
    }

    function InsertGrid(e: JsGridInsertEventArgs) {
        debugger
        let item = e.Item as CustomJurnalDetail;
        item.StatusFlag = 'i';
        GetJurnalDetail.push(item);
        divJurnalDetailGrid.DataSource = GetJurnalDetail;
        divJurnalDetailGrid.Bind();
        CalculatTotal();
    }

    function ChangeSelectToSearchable(id) {
        if (IsNullOrEmpty(id))
            setTimeout(function () { $('#' + id).select2().trigger('change'); }, 5);
        else
            setTimeout(function () { $('#divJurnalDetailGrid select').select2().trigger('change'); }, 5);
    }

    function removeItemOnce(arr, value) {
        var index = arr.indexOf(value);
        if (index > -1) {
            arr.splice(index, 1);
        }
        return arr;
    }

    function ResetDatatable(data: Array<CustomJurnalDetail>) {
        debugger
        if (datatable == null) return;

        datatable.destroy();
        $('#datatable').html('');
        Initalizegrid(data);
    }
}
