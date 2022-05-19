﻿$(document).ready(() => {
    $('#headertop1').addClass('display_none');
    $('#headertop2').removeClass('display_none');
    USERS.InitalizeComponent();
});

namespace USERS {
    var sys: SystemTools = new SystemTools();
    var SysSession: SystemSession = GetSystemSession();
    var compcode: number;
    var BranchCode: number;
    var MSG_ID: number;
    var CountGrid = 0;
    var btnSearch: HTMLButtonElement;
    var btnsave: HTMLButtonElement;
    var btnEdit: HTMLButtonElement;
    var btnback: HTMLButtonElement;
    var btnsearch: HTMLButtonElement;
    var btnAdd: HTMLButtonElement;
    var btnLoadRoles: HTMLButtonElement;
    var btnAddDetails: HTMLButtonElement;
    var btnGive_assignments: HTMLButtonElement;
    var btnBlock_permissions: HTMLButtonElement;
    var searchbutmemreport: HTMLInputElement;

    var ddlStore: HTMLSelectElement;
    var drpuserType: HTMLSelectElement;
    var ddlSalesman: HTMLSelectElement;
    //var ddlCashBox: HTMLSelectElement;
    var drpRoles: HTMLSelectElement;
    var drpuserType_2: HTMLSelectElement;
    var drpStatus: HTMLSelectElement;
    var txtUSER_CODE: HTMLInputElement;
    var txtUSER_PASSWORD: HTMLInputElement;
    var txtUSER_NAME: HTMLInputElement;
    var txtDepartmentName: HTMLInputElement;
    var txtJobTitle: HTMLInputElement;
    var txtMobile: HTMLInputElement;
    var txtEmail: HTMLInputElement;
    var txtFirstLogin: HTMLInputElement;
    var txtLastLogin: HTMLInputElement;
    var txtCreatedBy: HTMLInputElement;
    var txtCreatedAt: HTMLInputElement;
    var txtUpdatedAt: HTMLInputElement;
    var txtUpdatedBy: HTMLInputElement;
    var txtRemarks: HTMLInputElement;
    var txtRoleRemarks: HTMLInputElement;
    var chk_IsActive: HTMLInputElement;
    var element: HTMLInputElement;
    var formMain: HTMLFormElement;
    var formAdditionalData: HTMLFormElement;
    var formPricingPolicies: HTMLFormElement;
    var List_UserType: Array<G_Codes> = new Array<G_Codes>();
    var List_status = new Array();
    var ModelBarAccdetails: Array<G_USER_BRANCH> = new Array<G_USER_BRANCH>();
    var ListG_BRANCH: Array<G_BRANCH> = new Array<G_BRANCH>();
    var ListBarAccdetails: Array<GQ_GetUserBarnchAccess> = new Array<GQ_GetUserBarnchAccess>();
    var List_Userdetails: Array<GQ_GetUsers> = new Array<GQ_GetUsers>();
    var List_Roles: Array<GQ_GetUserRole> = new Array<GQ_GetUserRole>();
    var Test_RoleDetails: Array<GQ_GetUserRole> = new Array<GQ_GetUserRole>();
    var List_RoleDetails: Array<G_Role> = new Array<G_Role>();
    var singl_RoleDetails: G_Role = new G_Role();
    var Roleetailsf: Array<G_Role> = new Array<G_Role>();
    var UserRoleGrid: JsGrid = new JsGrid();
    var BarnchGrid: JsGrid = new JsGrid();
    var UserGrid: JsGrid = new JsGrid();
    var Selecteditem = new GQ_GetUsers;
    var Model: G_USERS = new G_USERS();
    var ModelRoleUsers: G_RoleUsers = new G_RoleUsers();
    var BRANCHsingleModel: G_USER_BRANCH = new G_USER_BRANCH();
    var BRANCHDetailsModel: Array<G_USER_BRANCH> = new Array<G_USER_BRANCH>();
    var storeDetails: Array<G_STORE> = new Array<G_STORE>();

    var SearchDetails;
    var Mode: number;
    var Master: MasterDetailsUserRoles = new MasterDetailsUserRoles();
    var Flag_Mastr;
    var CashboxDetails: Array<A_RecPay_D_CashBox> = new Array<A_RecPay_D_CashBox>();
    var SalesmanDetails: Array<I_Sls_D_Salesman> = new Array<I_Sls_D_Salesman>();//
    var CountGridBarnch = 0;


    var lang = (SysSession.CurrentEnvironment.ScreenLanguage);

    export function InitalizeComponent() {
        if (SysSession.CurrentEnvironment.ScreenLanguage == "ar") {
            document.getElementById('Screen_name').innerHTML = "المستخدمين";
        } else {
            document.getElementById('Screen_name').innerHTML = "Users";
        }
        compcode = Number(SysSession.CurrentEnvironment.CompCode);
        BranchCode = Number(SysSession.CurrentEnvironment.BranchCode);
        InitalizeControls();
        InitalizeEvents();
        FillddluserType();
        Fillddlstatus();
        fillRoles();
       // fillddlSalesman();
       // FillddlCashBox();
        GetAllBarnch_from_G_USERS();
        //FillddlStore();
        InitializeGrid();
        btnShow_onclick();
        SharedButtons.EditAction(() => { btnEdit_onclick(); });


    }
    function InitalizeControls() {
        btnEdit = document.getElementById("btnedite") as HTMLButtonElement;
        btnsave = document.getElementById("btnsave") as HTMLButtonElement;
        btnback = document.getElementById("btnback") as HTMLButtonElement;
        btnsearch = document.getElementById("btnsearch") as HTMLButtonElement;

        btnAdd = document.getElementById("btnAdd") as HTMLButtonElement;
        btnAddDetails = document.getElementById("btnAddDetails") as HTMLButtonElement;
        btnLoadRoles = document.getElementById("btnLoadRoles") as HTMLButtonElement;
        btnGive_assignments = document.getElementById("btnGive_assignments") as HTMLButtonElement;
        btnBlock_permissions = document.getElementById("btnBlock_permissions") as HTMLButtonElement;
        ddlStore = document.getElementById("ddlStore") as HTMLSelectElement;;
        ddlSalesman = document.getElementById("ddlSalesman") as HTMLSelectElement;
        //ddlCashBox = document.getElementById("ddlCashBox") as HTMLSelectElement;
        drpStatus = document.getElementById("drpStatus") as HTMLSelectElement;
        txtUSER_CODE = document.getElementById("txtUSER_CODE") as HTMLInputElement;
        txtUSER_PASSWORD = document.getElementById("txtUSER_PASSWORD") as HTMLInputElement;
        txtUSER_NAME = document.getElementById("txtUSER_NAME") as HTMLInputElement;
        txtDepartmentName = document.getElementById("txtDepartmentName") as HTMLInputElement;
        txtJobTitle = document.getElementById("txtJobTitle") as HTMLInputElement;
        txtMobile = document.getElementById("txtMobile") as HTMLInputElement;
        txtEmail = document.getElementById("txtEmail") as HTMLInputElement;
        txtFirstLogin = document.getElementById("txtFirstLogin") as HTMLInputElement;
        txtLastLogin = document.getElementById("txtLastLogin") as HTMLInputElement;
        txtCreatedBy = document.getElementById("txtCreatedBy") as HTMLInputElement;
        txtCreatedAt = document.getElementById("txtCreatedAt") as HTMLInputElement;
        txtUpdatedAt = document.getElementById("txtUpdatedAt") as HTMLInputElement;
        txtUpdatedBy = document.getElementById("txtUpdatedBy") as HTMLInputElement;
        txtRemarks = document.getElementById("txtRemarks") as HTMLInputElement;
        txtRoleRemarks = document.getElementById("txtRoleRemarks") as HTMLInputElement;
        chk_IsActive = document.getElementById("chk_IsActive") as HTMLInputElement;
        searchbutmemreport = document.getElementById("searchbutmemreport") as HTMLInputElement;

        drpuserType = document.getElementById("drpuserType") as HTMLSelectElement;
        drpuserType_2 = document.getElementById("drpuserType_2") as HTMLSelectElement;

        drpRoles = document.getElementById("drpRoles") as HTMLSelectElement;
        btnSearch = document.getElementById("btnEmpSearch") as HTMLButtonElement;


        btnAddDetails.disabled = !SysSession.CurrentPrivileges.AddNew;
        btnEdit.disabled = !SysSession.CurrentPrivileges.EDIT;
    }
    function InitalizeEvents() {
        btnsearch.onclick = btnShow_onclick;
        btnLoadRoles.onclick = btnLoadRoles_onClick;
        btnAdd.onclick = btnAdd_onClick;
        btnsave.onclick = btnsave_onClick;
        btnback.onclick = btnback_onclick;
        btnEdit.onclick = btnEdit_onclick;
        drpRoles.onchange = drpRoles_change;
        drpuserType_2.onchange = drpuserType_change;
        btnAddDetails.onclick = btnAddDetails_onclick;
        btnGive_assignments.onclick = Give_assignments_onClick;
        btnBlock_permissions.onclick = Block_permissions_onClick;
        searchbutmemreport.onkeyup = _SearchBox_Change;
        btnSearch.onclick = btnSearch_onclick;

    }
    function drpuserType_change() {
        let selectedRelease = List_UserType.filter(x => x.CodeValue == Number(drpuserType_2.value))[0];
        var resilt = selectedRelease.CodeValue;
        if (resilt == 1) {
            $("#selsman").removeClass("display_none");
            $("#cashbox").addClass("display_none");
            //ddlCashBox.value = "null"
        }
        else if (resilt == 2) {
            $("#cashbox").removeClass("display_none");
            $("#selsman").addClass("display_none");
            ddlSalesman.value = "null"
            ddlStore.value = "null"
        }
        else if (resilt == 3) {
            $("#cashbox").removeClass("display_none");
            $("#selsman").removeClass("display_none");
            //ddlCashBox.value = "null"
            ddlSalesman.value = "null"
            ddlStore.value = "null"
        }
        else {
            $("#cashbox").addClass("display_none");
            $("#selsman").addClass("display_none");
            //ddlCashBox.value = "null"
            ddlSalesman.value = "null"
            ddlStore.value = "null"
        }

        $('#ddlCashBox').prop('selectedIndex', 0)
        $('#ddlSalesman').prop('selectedIndex', 0)
        $('#ddlStore').prop('selectedIndex', 0)

    }

    function RemoveDisabled(clear: boolean) {
        allElements(false, clear);
    }

    function allElements(isVisible: boolean, clear: boolean) {
        for (var i = 0; i < formMain.elements.length; i++) {
            element = formMain.elements.item(i) as HTMLInputElement;
            if (element.name == SharedButtons.btnSearch.name)
                continue;
            else {
                element.disabled = isVisible;
                element.value = clear ? '' : element.value;
            }
        }
        for (var i = 0; i < formAdditionalData.elements.length; i++) {
            element = formAdditionalData.elements.item(i) as HTMLInputElement;
            element.disabled = isVisible;
            element.value = clear ? '' : element.value;
        }
        for (var i = 0; i < formPricingPolicies.elements.length; i++) {
            element = formPricingPolicies.elements.item(i) as HTMLInputElement;
            element.disabled = isVisible;
            element.value = clear ? '' : element.value;
        }
    }

   

    function Disabled(clear: boolean) {
        allElements(true, clear);
    }

    function GetElementByName(name: string) {
        element = formMain.elements.namedItem(name) as HTMLInputElement;
        return element;
    }

    function btnEdit2_onclick() {
       
            RemoveDisabled(false);
 
            element.disabled = true;
            
        
    }
    function Fillddlstatus() {
        if (SysSession.CurrentEnvironment.ScreenLanguage == "ar") {
            List_status = [{ id: 1, value: 'فعال' }, { id: 0, value: 'غير فعال' }, { id: 2, value: 'الجميع' }];
            DocumentActions.FillComboFirstvalue(List_status, drpStatus, "id", "value", " - اختر -", null);
        }
        else {
            List_status = [{ id: 1, value: 'Active' }, { id: 0, value: 'Not Active' }, { id: 2, value: 'All' }];
            DocumentActions.FillComboFirstvalue(List_status, drpStatus, "id", "value", "Select", null);
        }
    }
    function FillddluserType() {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("GCodes", "GetbycodeTp"),
            data: { CodeType: "UserType", UserCode: SysSession.CurrentEnvironment.UserCode, Token: "HGFD-" + SysSession.CurrentEnvironment.Token },
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess) {
                    List_UserType = result.Response as Array<G_Codes>;

                    DocumentActions.FillComboFirstvalue(List_UserType, drpuserType, "CodeValue", "" + (lang == "ar" ? "DescA" : "DescE") + "", "" + (lang == "ar" ? " - اختر -" : " - Choose -") + "", null);
                    DocumentActions.FillComboFirstvalue(List_UserType, drpuserType_2, "CodeValue", "" + (lang == "ar" ? "DescA" : "DescE") + "", "" + (lang == "ar" ? " - اختر -" : " - Choose -") + "", null);
                }
            }
        });
    }
    function fillRoles() {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("G_Role", "GetAll"),
            data: { Token: "HGFD-" + SysSession.CurrentEnvironment.Token, UserCode: SysSession.CurrentEnvironment.UserCode },
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess) {
                    List_RoleDetails = result.Response as Array<G_Role>;
                    List_RoleDetails = List_RoleDetails.filter(x => x.IsAvailable == true && x.IsShowable == true);

                    DocumentActions.FillComboFirstvalue(List_RoleDetails, drpRoles, "RoleId", "" + (lang == "ar" ? "DescA" : "DescE") + "", "" + (lang == "ar" ? " - اختر -" : " - Choose -") + "", null);

                }
            }
        });
    }
    function fillddlSalesman() {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("AccDefSalesMen", "GetAllSalesPeople"),
            data: {
                CompCode: compcode, BranchCode: BranchCode, IsSalesEnable: true, UserCode: SysSession.CurrentEnvironment.UserCode, Token: "HGFD-" + SysSession.CurrentEnvironment.Token
            },
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess) {
                    SalesmanDetails = result.Response as Array<I_Sls_D_Salesman>;
                    SalesmanDetails = SalesmanDetails.filter(s => s.Isactive == true);
                    if (SysSession.CurrentEnvironment.ScreenLanguage == "en") {
                        DocumentActions.FillCombowithdefult(SalesmanDetails, ddlSalesman, "SalesmanId", "NameE", "Select saleman");
                    }
                    else {
                        DocumentActions.FillCombowithdefult(SalesmanDetails, ddlSalesman, "SalesmanId", "NameA", "اختر المندوب");
                    }
                    SysSession.CurrentEnvironment.UserType == 1 ? ($('#ddlSalesman option[value="null"]').remove()) : $('#ddlSalesman').prop('selectedIndex', 0);
                }
            }
        });
    }
    function FillddlCashBox() {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("AccDefBox", "GetAll"),
            data: { compCode: compcode, BranchCode: BranchCode, UserCode: SysSession.CurrentEnvironment.UserCode, Token: "HGFD-" + SysSession.CurrentEnvironment.Token },
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess) {
                    CashboxDetails = result.Response as Array<A_RecPay_D_CashBox>;
                    if (SysSession.CurrentEnvironment.ScreenLanguage == "en") {
                        //DocumentActions.FillCombowithdefult(CashboxDetails, ddlCashBox, "CashBoxID", "CashBox_DescE", " ");
                    }
                    else {
                        //DocumentActions.FillCombowithdefult(CashboxDetails, ddlCashBox, "CashBoxID", "CashBox_DescA", "اختر الصندوق");
                    }
                }
            }
        });
    }

    function FillddlStore() {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("StkDefStore", "GetAll"),
            data: {
                CompCode: compcode, BranchCode: BranchCode, UserCode: SysSession.CurrentEnvironment.UserCode, Token: "HGFD-" + SysSession.CurrentEnvironment.Token
            },
            success: (d) => {
                ;
                let result = d as BaseResponse;
                if (result.IsSuccess) {
                    storeDetails = result.Response as Array<G_STORE>;
                    if (SysSession.CurrentEnvironment.ScreenLanguage == "en") {
                        DocumentActions.FillCombowithdefult(storeDetails, ddlStore, "StoreId", "DescL", "Select Store");
                    }
                    else {
                        DocumentActions.FillCombowithdefult(storeDetails, ddlStore, "StoreId", "DescA", "اختر المستودع");
                    }
                }
            }
        });
    }

    function _SearchBox_Change() {
        if (searchbutmemreport.value != "") {

            let search: string = searchbutmemreport.value.toLowerCase();
            SearchDetails = List_Userdetails.filter(x => x.USER_CODE.toString().search(search) >= 0 || x.USER_NAME.toLowerCase().search(search) >= 0);

            UserGrid.DataSource = SearchDetails;
            UserGrid.Bind();
        } else {
            UserGrid.DataSource = List_Userdetails;
            UserGrid.Bind();
        }
    }
    function InitializeGrid() {
        let res: any = GetResourceList("");
        UserGrid.ElementName = "div_grid";
        UserGrid.PrimaryKey = "USER_CODE";
        UserGrid.Paging = true;
        UserGrid.PageSize = 10;
        UserGrid.Sorting = true;
        UserGrid.InsertionMode = JsGridInsertionMode.Binding;
        UserGrid.Editing = false;
        UserGrid.Inserting = false;
        UserGrid.SelectedIndex = 1;
        UserGrid.OnRowDoubleClicked = GridDoubleClick;
        UserGrid.OnItemEditing = () => { };
        UserGrid.Columns = [
            { title: res.User_Code, name: "USER_CODE", type: "text", width: "5%" },
            { title: res.SHT_Name, name: "USER_NAME", type: "text", width: "5%" },
            { title: res.department, name: "DepartmentName", type: "text", width: "10%" },
            { title: res.Job, name: "JobTitle", type: "text", width: "10%" },
            { title: res.App_Active, name: "IsActiveDesc", type: "text", width: "15%" },
        ];
    }
    function GridDoubleClick() {
        $("#div_grid").removeClass("disabledDiv");
        Flag_Mastr = '';
        $('#div_Data').html("");
        $("#btnedite").removeAttr("disabled");
        $("#btnAdd").removeAttr("disabled");
        $("#btnedite").removeClass("display_none");
        $("#btnAdd").removeClass("display_none");
        $("#div_BasicData").removeClass("display_none");

        $("#btnback").addClass("display_none");
        $("#btnsave").addClass("display_none");
        $("#div_Data").addClass("disabledDiv");
        var Selecte = List_Userdetails.filter(x => x.USER_CODE == UserGrid.SelectedKey);
        Selecteditem = Selecte[0];
        DisplayData_Header();
        Display_RoleUsers();
        Disbly_BuildControlsBarnch();

        let Userdetails = Selecte.filter(x => x.USER_CODE.toLowerCase() == SysSession.CurrentEnvironment.UserCode);

        if (Userdetails.length > 0) {
            $("#btnedite").addClass("display_none");
        }
    }
    function DisplayData_Header() {
        $("#cashbox").addClass("display_none");
        $("#selsman").addClass("display_none");
        drpuserType_2.value = "null";

        DocumentActions.RenderFromModel(Selecteditem);
        txtUSER_CODE.value = Selecteditem.USER_CODE;
        txtUSER_PASSWORD.value = Selecteditem.USER_PASSWORD;
        if (Selecteditem.USER_NAME != null)
            txtUSER_NAME.value = Selecteditem.USER_NAME;

        if (Selecteditem.USER_ACTIVE == true)
            chk_IsActive.checked = true;
        else
            chk_IsActive.checked = false;
        if (Selecteditem.USER_TYPE != null) {
            drpuserType_2.value = Selecteditem.USER_TYPE.toString();

            if (Selecteditem.USER_TYPE == 1) {
                $("#selsman").removeClass("display_none");
                $("#cashbox").addClass("display_none");
                ddlSalesman.value = Selecteditem.SalesManID.toString();
                ddlStore.value = Selecteditem.StoreID == null ? 'null' : Selecteditem.StoreID.toString();

            }
            else if (Selecteditem.USER_TYPE == 2) {
                $("#cashbox").removeClass("display_none");
                $("#selsman").addClass("display_none");
                //ddlCashBox.value = Selecteditem.CashBoxID.toString();
            }
            else if (Selecteditem.USER_TYPE == 3) {
                $("#cashbox").removeClass("display_none");
                $("#selsman").removeClass("display_none");
                //ddlCashBox.value = Selecteditem.CashBoxID.toString();
                ddlSalesman.value = Selecteditem.SalesManID.toString();
                ddlStore.value = Selecteditem.StoreID == null ? 'null' : Selecteditem.StoreID.toString();

            }
            else {
                $("#cashbox").addClass("display_none");
                $("#selsman").addClass("display_none");
            }

        }

        if (!IsNullOrEmpty(Selecteditem.JobTitle)) {
            txtJobTitle.value = (Selecteditem.JobTitle);
        }

        if (!IsNullOrEmpty(Selecteditem.DepartmentName)) {
            txtDepartmentName.value = (Selecteditem.DepartmentName);
        }
        if (!IsNullOrEmpty(Selecteditem.Email)) {
            txtEmail.value = (Selecteditem.Email);
        }
        txtCreatedAt.value = Selecteditem.CreatedAt;
        txtUpdatedAt.value = Selecteditem.UpdatedAt;
        txtCreatedBy.value = Selecteditem.CreatedBy;
        txtUpdatedBy.value = Selecteditem.UpdatedBy;
        txtLastLogin.value = Selecteditem.LastLogin;
        txtFirstLogin.value = Selecteditem.FirstLogin;
    }
    function Display_RoleUsers() {
        var USER_CODE = txtUSER_CODE.value;
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("G_RoleUsers", "search"),
            data: {
                UserCode: SysSession.CurrentEnvironment.UserCode, Token: "HGFD-" + SysSession.CurrentEnvironment.Token,
                User: USER_CODE
            },
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess) {
                    List_Roles = new Array<GQ_GetUserRole>();
                    List_Roles = result.Response as Array<GQ_GetUserRole>;
                    List_Roles = List_Roles.filter(x => x.IsShowable == true);
                    for (var i = 0; i < List_Roles.length; i++) {
                        List_Roles[i].IsActiveDesc = List_Roles[i].ISActive == true ? "نعم" : "لا";

                        DisplayUserRole(List_Roles);

                    }
                }
            }
        });
    }
    function Disbly_BuildControlsBarnch() {



        $("#div_Data_BRANCH").html('');

        var ListBarAcc = new Array<GQ_GetUserBarnchAccess>();

        ListBarAcc = ListBarAccdetails.filter(x => x.USER_CODE == txtUSER_CODE.value);

        CountGridBarnch = 0;
        for (var i = 0; i < ListBarAcc.length; i++) {

            BuildControlsBarnch(i);

            $("#BRA_CODE" + i).val(ListBarAcc[i].BRA_CODE);
            $("#BRA_DESC" + i).val(ListBarAcc[i].BRA_DESC);

            if (ListBarAcc[i].EXECUTE == true) {
                $('#EXECUTE' + i).attr('checked', 'checked');
            }
            if (ListBarAcc[i].CREATE == true) {
                $('#CREATE' + i).attr('checked', 'checked');
            }
            if (ListBarAcc[i].EDIT == true) {
                $('#EDIT' + i).attr('checked', 'checked');
            }
            if (ListBarAcc[i].DELETE == true) {
                $('#DELETE' + i).attr('checked', 'checked');
            }
            if (ListBarAcc[i].PRINT == true) {
                $('#PRINT' + i).attr('checked', 'checked');
            }

            $("#txt_StatusFlag2" + i).val("");
            $("#btn_minus3" + i).addClass("display_none");


            CountGridBarnch += 1;

        }



    }
     
    function BuildControlsBarnch(cnt: number) {
        var html;
        html = '<div id="row_font_header' + cnt + '" class=" font_header col-lg-12" style="bottom: 5px;font-weight:bold">' +
            '<span id="btn_minus3' + cnt + '" class="fa fa-minus-circle fontitm4user lebelminus"></span>' +
            '<div class="col-lg-1" style=""><input disabled id="BRA_CODE' + cnt + '" type="text" class="form-control"></div>' +
            '<div class="col-lg-2" style=""><input type="text" disabled id="BRA_DESC' + cnt + '" class="form-control"></div>' +
            '<div class="col-lg-1 style_pading"> <input disabled id="EXECUTE' + cnt + '"  type= "checkbox"  class="form-control "   /></div>' +
            '<div class="col-lg-1 style_pading"> <input disabled id="CREATE' + cnt + '"  type= "checkbox"  class="form-control "   /></div>' +
            '<div class="col-lg-1 style_pading"> <input disabled id="EDIT' + cnt + '"  type= "checkbox"  class="form-control "   /></div>' +
            '<div class="col-lg-1 style_pading"> <input disabled id="DELETE' + cnt + '"  type= "checkbox"  class="form-control "   /></div>' +
            '<div class="col-lg-1 style_pading"> <input disabled id="PRINT' + cnt + '"  type= "checkbox"  class="form-control "   /></div>' +
            '<div class="col-lg-1" style=""><input id="txt_StatusFlag2' + cnt + '" name = " " type = "hidden" class="form-control"/><input id="DepositID' + cnt + '" name = " " type = "hidden" class="form-control" /></div></div>';

        $("#div_Data_BRANCH").append(html);




        if (SysSession.CurrentPrivileges.Remove) {

            $("#btn_minus3" + cnt).addClass("display_none");
            $("#btn_minus3" + cnt).attr("disabled", "disabled");
        }
        else {
            $("#btn_minus3" + cnt).addClass("display_none");
            $("#btn_minus3" + cnt).attr("disabled", "disabled");
        }


        $("#EXECUTE" + cnt).on('change', function () {
            if ($("#txt_StatusFlag2" + cnt).val() != "i")
                $("#txt_StatusFlag2" + cnt).val("u");
        });


        $("#CREATE" + cnt).on('change', function () {
            if ($("#txt_StatusFlag2" + cnt).val() != "i")
                $("#txt_StatusFlag2" + cnt).val("u");
        });

        $("#EDIT" + cnt).on('change', function () {
            if ($("#txt_StatusFlag2" + cnt).val() != "i")
                $("#txt_StatusFlag2" + cnt).val("u");
        });

        $("#DELETE" + cnt).on('change', function () {
            if ($("#txt_StatusFlag2" + cnt).val() != "i")
                $("#txt_StatusFlag2" + cnt).val("u");
        });

        $("#PRINT" + cnt).on('change', function () {
            if ($("#txt_StatusFlag2" + cnt).val() != "i")
                $("#txt_StatusFlag2" + cnt).val("u");
        });

    } 
    function GetAllBarnch_from_G_USERS() {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("G_USERS", "GetBarnch"),
            data: {
                CompCode: compcode, UserCode: SysSession.CurrentEnvironment.UserCode, Token: "HGFD-" + SysSession.CurrentEnvironment.Token
            },
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess) {
                    ListBarAccdetails = result.Response as Array<GQ_GetUserBarnchAccess>;

                }
            }
        });
    } 
    function Get_All_BRANCH_From_GBranch() {

        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("GBranch", "GetAll"),
            data: {
                CompCode: compcode, UserCode: SysSession.CurrentEnvironment.UserCode, Token: "HGFD-" + SysSession.CurrentEnvironment.Token
            },
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess) {
                    ListG_BRANCH = result.Response as Array<G_BRANCH>;

                    $("#div_Data_BRANCH").html('');
                    CountGridBarnch = 0;
                    for (var i = 0; i < ListG_BRANCH.length; i++) {

                        BuildControlsBarnch(i);

                        $("#BRA_CODE" + i).val(ListG_BRANCH[i].BRA_CODE);
                        $("#BRA_DESC" + i).val(ListG_BRANCH[i].BRA_DESC);

                        $('#EXECUTE' + i).attr('checked', 'checked');
                        $('#CREATE' + i).attr('checked', 'checked');
                        $('#EDIT' + i).attr('checked', 'checked');
                        $('#DELETE' + i).attr('checked', 'checked');
                        $('#PRINT' + i).attr('checked', 'checked');

                        $("#txt_StatusFlag2" + i).val("i");
                        $("#btn_minus3" + i).addClass("display_none");

                        CountGridBarnch += 1;

                    }

                }
            }
        });

    } 
     
    function BuildControls(cnt: number) {
        var html;
        html = '<div id="No_Row' + cnt + '" class="col-lg-12" >' +
            '<span id="btn_minus' + cnt + '" class="glyphicon glyphicon-remove-sign fontitm3user  minus_btn display_none"></span>' +
            '<div class="col-lg-3 style_pading"> <input id="txtDescA' + cnt + '" type= "text" class="form-control  " disabled="disabled"/></div>' +
            '<div class="col-lg-7 style_pading"> <input id="txtRemarks' + cnt + '" type= "text" class="form-control " disabled="disabled"/></div>' +
            '<div class="col-lg-2 style_pading"> <input id="CheckISActive' + cnt + '"  type= "checkbox"  class="form-control " disabled="disabled" /></div>' +
            '<div class="col-lg-12"> <input id = "txt_StatusFlag' + cnt + '" name = " " type = "hidden"   class="form-control"/></div>' +
            '<div class="col-lg-12"> <input id = "txtRoleId' + cnt + '" name = " " type = "hidden" class="form-control"/></div>' +
            '</div>';
        $("#div_Data").append(html);
        $("#btn_minus" + cnt).on('click', function () {
            WorningMessage("هل تريد الحذف؟", "Do you want to delete?", "تحذير", "worning", () => {
                $("#No_Row" + cnt).attr("hidden", "true");
                $("#txt_StatusFlag" + cnt).val() == 'i' ? $("#txt_StatusFlag" + cnt).val('m') : $("#txt_StatusFlag" + cnt).val('d');

            });
        });
        $("#txtCode" + cnt).on('change', function () {
            Validate_code(cnt);
        });
        $("#CheckISActive" + cnt).on('change', function () {
            if ($("#txt_StatusFlag" + cnt).val() != 'i') {
                $("#txt_StatusFlag" + cnt).val('u');
            }
        });
        if (SysSession.CurrentPrivileges.Remove) {
            $("#btn_minus" + cnt).removeAttr("disabled")
        }
        else {
            $("#btn_minus" + cnt).attr("disabled", "disabled")
        }
        return;
    }
    function btnAddDetails_onclick() {
        if (!SysSession.CurrentPrivileges.AddNew) return;
        $("#drpRoles").removeClass("display_none");
        $("#txtRoleRemarks").removeClass("display_none");
        $("#Ch_RoleActive").removeClass("display_none");
    }
     
    function DisplayUserRole(Result_List: Array<GQ_GetUserRole>) {
        for (var i = 0; i < Result_List.length; i++) {
            BuildControls(i);
            $("#txtRoleId" + i).val(Result_List[i].RoleId);

            if (Result_List[i].ISActive == true) {
                $('#CheckISActive' + i).attr('checked', 'checked');
            }
            $("#txt_StatusFlag" + i).val("");
            $("#txtDescA" + i).val((lang == "ar" ? Result_List[i].DescA : Result_List[i].DescE));
            $("#txtRemarks" + i).val(Result_List[i].Remarks);
        }
        CountGrid = Result_List.length;
    }
    function BindUserGrid() {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("G_USERS", "GetUSER"),
            data: {
                CompCode: compcode,
                UserCode: SysSession.CurrentEnvironment.UserCode, Token: "HGFD-" + SysSession.CurrentEnvironment.Token,
                Status: drpStatus.value, UserType: drpuserType.value
            },
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess) {
                    List_Userdetails = result.Response as Array<GQ_GetUsers>;
                    for (var i = 0; i < List_Userdetails.length; i++) {
                        List_Userdetails[i].IsActiveDesc = List_Userdetails[i].USER_ACTIVE == true ? "فعال" : "غير فعال";
                    }

                    UserGrid.DataSource = List_Userdetails;
                    UserGrid.Bind();
                }
            }
        });
    }
    function drpRoles_change() {

        if (!ValidationRoles())
            return;


        var Role_value = drpRoles.options[drpRoles.selectedIndex].value;
        if (Role_value == "" || Role_value == " " || Role_value == "null") {

        }
        else {
            let Test_RoleDetails = List_Roles.filter(x => x.RoleId == Number(Role_value));

            if (Test_RoleDetails.length > 0) {
                MessageBox.Show('لا يمكن اختيار هذة الصلاحية مرة اخري', 'This validity cannot be selected again');
            }
            else {
                let filter_RoleDetails = List_RoleDetails.filter(x => x.RoleId == Number(Role_value));
                let fRoleDetails = Roleetailsf.filter(x => x.RoleId == Number(Role_value));

                if (fRoleDetails.length > 0) {
                    MessageBox.Show('لا يمكن اختيار هذة الصلاحية مرة اخري', 'This validity cannot be selected again');
                }
                else {
                    BuildControls(CountGrid);
                    $("#txtRoleId" + CountGrid).val(filter_RoleDetails[0].RoleId.toString());
                    $("#txtDescA" + CountGrid).val((lang == "ar" ? filter_RoleDetails[0].DescA : filter_RoleDetails[0].DescE));
                    $("#txtRemarks" + CountGrid).val(filter_RoleDetails[0].Remarks);
                    $("#txt_StatusFlag" + CountGrid).val("i");
                    $("#CheckISActive" + CountGrid).attr("checked") ? 1 : 0;
                    $('#btn_minus' + CountGrid).removeClass("display_none");
                    $('#txtRemarks' + CountGrid).removeAttr("disabled");
                    $('#CheckISActive' + CountGrid).removeAttr("disabled");
                    $('#CheckISActive' + CountGrid).attr('checked', 'checked');
                    singl_RoleDetails = new G_Role();
                    singl_RoleDetails.RoleId = filter_RoleDetails[0].RoleId;
                    Roleetailsf.push(singl_RoleDetails);
                    CountGrid++;
                }
            }
        }

    }
    
    function DisableControls() {
        txtUSER_CODE.disabled = true;
        txtUSER_PASSWORD.disabled = true;
        txtUSER_NAME.disabled = true;
        txtEmail.disabled = true;
        txtJobTitle.disabled = true;
        txtDepartmentName.disabled = true;
        txtMobile.disabled = true;
        chk_IsActive.disabled = true;
        drpuserType_2.disabled = true;
        btnBlock_permissions.disabled = true;
        btnGive_assignments.disabled = true;

    }
    function Validate_code(rowno: number) {
        for (var i = 0; i < CountGrid; i++) {
            if (i != rowno) {
                if ($("#txtCode" + rowno).val() == $("#txtCode" + i).val())
                    WorningMessage("لا يمكن تكرار رقم الكود " + $("#txtCode" + rowno).val(), "code cannot br repeated?", "تحذير", "worning", () => {
                        $("#txtCode" + rowno).val("");
                        return false;
                    });
            }
        }
        return true;
    }
    function btnLoadRoles_onClick() {

        if (txtUSER_NAME.value == "" || txtUSER_CODE.value == "" || txtUSER_PASSWORD.value == "") {
            WorningMessageDailog("من فضلك تاكد من ادخال جميع البيانات", "")
        }
        else {
            $('#div_Data').html("");
            DisplayUserRole(List_Roles);
            //btnEdit_onclick();
            for (var i = 0; i < List_Roles.length; i++) {
                $("#btn_minus" + i).removeClass("display_none");
                $("#CheckISActive" + i).removeAttr("disabled");
            }
            $("#div_grid").addClass("disabledDiv");
            var Q = 0;
            for (var i = List_Roles.length; i < Number(List_RoleDetails.length + List_Roles.length); i++) {

                let xx = List_Roles.filter(x => x.RoleId == List_RoleDetails[Q].RoleId);
                if (xx.length > 0) {
                    Q += 1;
                    continue;
                }
                BuildControls(i);
                $("#btn_minus" + i).removeClass("display_none");
                $("#txtRoleId" + i).val(List_RoleDetails[Q].RoleId);

                $("#txtDescA" + i).val((lang == "ar" ? List_RoleDetails[i].DescA : List_RoleDetails[i].DescE));
                $("#txtRemarks" + i).val(List_RoleDetails[Q].Remarks);
                $("#CheckISActive" + i).removeAttr("disabled");
                $('#CheckISActive' + i).prop('checked', 'checked');
                $("#txt_StatusFlag" + i).val("i");
                $("#drpRoles").addClass("display_none");
                $("#txtRoleRemarks").addClass("display_none");
                $("#Ch_RoleActive").addClass("display_none");
                Q += 1;

            }
            CountGrid = Number(List_RoleDetails.length + List_Roles.length);
        }
    }
    function Give_assignments_onClick() {
        if (txtUSER_NAME.value == "" || txtUSER_CODE.value == "" || txtUSER_PASSWORD.value == "") {
            WorningMessageDailog("من فضلك تاكد من ادخال جميع البيانات", "")
        } else {
            for (var i = 0; i < CountGrid; i++) {
                if ($("#txt_StatusFlag" + i).val() != 'i') {
                    $("#txt_StatusFlag" + i).val('u');
                }
                $('#CheckISActive' + i).prop('checked', 'checked');
            }
        }
    }
    function Block_permissions_onClick() {
        if (txtUSER_NAME.value == "" || txtUSER_CODE.value == "" || txtUSER_PASSWORD.value == "") {
            WorningMessageDailog("من فضلك تاكد من اختيار مستخدم", "")
        } else {
            for (var i = 0; i < CountGrid; i++) {
                if ($("#txt_StatusFlag" + i).val() != 'i') {
                    $("#txt_StatusFlag" + i).val('u');
                }
                $('#CheckISActive' + i).removeProp('checked');
            }
        }
    }
    
    function ValidationRoles() {

        if (txtUSER_NAME.value == "") {
            WorningMessage("من فضلك تاكد من ادخال اسم المستخدم   ", "Please make sure to enter your Name user", 'خطاء', 'Erorr');
            Errorinput(txtUSER_NAME);
            return false

        }
        if (txtUSER_PASSWORD.value == "") {
            WorningMessage("من فضلك تاكد من ادخال كلمة السر   ", "Please make sure to enter your password", 'خطاء', 'Erorr');
            Errorinput(txtUSER_PASSWORD);
            return false

        }
        if (txtUSER_CODE.value == "") {
            WorningMessage("من فضلك تاكد من ادخال كود المستخدم    ", "Please make sure to enter your user ID  ", 'خطاء', 'Erorr');
            Errorinput(txtUSER_CODE);
            return false

        }

        return true;
    } 
    function ValidationHeader() {


        if (USER_CODEFoundBefore() == false && Flag_Mastr == 'i') {
            WorningMessage('اسم المستخدم موجود ', 'Username already exists', 'خطاء', 'Erorr');
            Errorinput($("#txtUSER_CODE"));
            return false

        }
        if (txtUSER_NAME.value == "") {
            WorningMessage("من فضلك تاكد من ادخال اسم المستخدم   ", "Please make sure to enter your Name user", 'خطاء', 'Erorr');
            Errorinput(txtUSER_NAME);
            return false

        }
        if (txtUSER_PASSWORD.value == "") {
            WorningMessage("من فضلك تاكد من ادخال كلمة السر   ", "Please make sure to enter your password", 'خطاء', 'Erorr');
            Errorinput(txtUSER_PASSWORD);
            return false

        }
        if (txtUSER_CODE.value == "") {
            WorningMessage("من فضلك تاكد من ادخال كود المستخدم    ", "Please make sure to enter your user ID  ", 'خطاء', 'Erorr');
            Errorinput(txtUSER_CODE);
            return false

        }
        if (drpuserType_2.value == 'null') {
            WorningMessage(" يجب اختيار نوع المستخدم", "User type must be chosen", 'خطاء', 'Erorr');
            Errorinput(drpuserType_2);
            return false

        }
        if (drpuserType_2.value == '1' && ddlSalesman.value == "null") {
            WorningMessage(" يجب اختيار المندوب", "Please select a Salesman", 'خطاء', 'Erorr');
            Errorinput(ddlSalesman);
            return false

        }
        if (drpuserType_2.value == '1' && ddlStore.value == "null") {
            WorningMessage(" يجب اختيار المستودع", "Please select a Store", 'خطاء', 'Erorr');
            Errorinput(ddlStore);
            return false

        }
        //if (drpuserType_2.value == '2' && ddlCashBox.value == "null") {
        //    WorningMessage(" يجب اختيار الصندوق", "Please select a box", 'خطاء', 'Erorr');
        //    Errorinput(ddlCashBox);
        //    return false

        //}
        if (drpuserType_2.value == '3' && ddlSalesman.value == "null") {
            WorningMessage(" يجب اختيار المندوب", "Please select a Salesman", 'خطاء', 'Erorr');
            Errorinput(ddlSalesman);
            return false

        }
        if (drpuserType_2.value == '3' && ddlStore.value == "null") {
            WorningMessage(" يجب اختيار المستودع", "Please select a Store", 'خطاء', 'Erorr');
            Errorinput(ddlStore);
            return false

        }
        //if (drpuserType_2.value == '3' && ddlCashBox.value == "null") {

        //    WorningMessage(" يجب اختيار الصندوق", "Please select a box", 'خطاء', 'Erorr');
        //    Errorinput(ddlCashBox);
        //    return false

        //}
        if ($('#txtEmail').val() != '') {

            if (validate_email() == false) {
                DisplayMassage("يجب ادخال البريد الالكتروني صحيح ", "Contact Email Is Not Valid", MessageType.Worning);
                Errorinput($('#txtEmail'));
                return false
            }
        }


        return true;
    }
    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
    function validate_email() {
        const email = $("#txtEmail").val();
        validateEmail(email)
        return validateEmail(email);
    }
    function ValidatioCountGrid(rowcount: number) {
        if ($("#txt_StatusFlag" + rowcount).val() == "d" || $("#txt_StatusFlag" + rowcount).val() == "m") {
            return false;
        }
        return true;
    }

    function USER_CODEFoundBefore() {
        var res: boolean = true;
        var USER_CODE = txtUSER_CODE.value.toLowerCase();

        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("G_USERS", "CodeFounBefore"),
            data: {
                USER_CODE: USER_CODE, compCode: compcode, UserCode: SysSession.CurrentEnvironment.UserCode, Token: "HGFD-" + SysSession.CurrentEnvironment.Token
            },
            success: (d) => {
                //debugger
                let result = d as BaseResponse;
                if (result.Response == 0) {
                    res = true;
                }
                else
                    res = false;
            }
        });
        //alert(res);
        return res;
    }
    
    function Update() {
        Model = <G_USERS>Selecteditem;
        Assign();

        Assign_BRANCH();

        Master.Token = "HGFD-" + SysSession.CurrentEnvironment.Token;
        Master.UserCode = SysSession.CurrentEnvironment.UserCode;
        Master.G_USERS.CompCode = Number(SysSession.CurrentEnvironment.CompCode);
        Master.G_USERS.USER_CODE = txtUSER_CODE.value;
        Master.G_USERS.USER_NAME = txtUSER_NAME.value;
        Master.G_USERS.USER_PASSWORD = txtUSER_PASSWORD.value;
        Master.G_USERS.Flag_Mastr = Flag_Mastr;
        if (Flag_Mastr == 'i') {
            Master.G_USERS.CreatedBy = SysSession.CurrentEnvironment.UserCode;
            Master.G_USERS.CreatedAt = DateTimeFormat(Date().toString());
        }
        else {
            Master.G_USERS.UpdatedAt = DateTimeFormat(Date().toString());
            Master.G_USERS.UpdatedBy = SysSession.CurrentEnvironment.UserCode;
        }
        Master.G_USERS.StoreID = ddlStore.value == "null" ? null : Number(ddlStore.value);
        Master.G_USERS.SalesManID = ddlSalesman.value == "null" ? null : Number(ddlSalesman.value);
        //Master.G_USERS.CashBoxID = ddlCashBox.value == "null" ? null : Number(ddlCashBox.value);
        Master.G_USERS.USER_TYPE = drpuserType_2.value == "null" ? null : Number(drpuserType_2.value);



        Ajax.Callsync({
            type: "POST",
            url: sys.apiUrl("G_USERS", "Update"),
            data: JSON.stringify(Master),
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess == true) {
                    DisplayMassage("تم الحفظ", "saved success", MessageType.Succeed);
                    if (Flag_Mastr == 'i') {  
                        let code = txtUSER_CODE.value
                        btnback_onclick(); 
                        Flag_Mastr = '';
                        $('#div_Data').html("");
                        Mode = 0; 
                        btnShow_onclick();
                         
                        $("#div_grid").removeClass("disabledDiv");
                        Flag_Mastr = '';
                        $('#div_Data').html("");
                        $("#btnedite").removeAttr("disabled");
                        $("#btnAdd").removeAttr("disabled");
                        $("#btnedite").removeClass("display_none");
                        $("#btnAdd").removeClass("display_none");
                        $("#div_BasicData").removeClass("display_none");

                        $("#btnback").addClass("display_none");
                        $("#btnsave").addClass("display_none");
                        $("#div_Data").addClass("disabledDiv");
                        var Selecte = List_Userdetails.filter(x => x.USER_CODE == code);
                        Selecteditem = Selecte[0];
                        DisplayData_Header();
                        Display_RoleUsers();
                        Disbly_BuildControlsBarnch(); 
                    }
                    else { 
                        $('#div_Data').html("");
                        Mode = 0; 
                        $("#btnLoadRoles").attr("disabled");
                        $("#btnGive_assignments").attr("disabled");
                        $("#btnBlock_permissions").attr("disabled");
                        $("#btnsave").addClass("display_none");
                        $("#btnback").addClass("display_none");
                        btnShow_onclick();
                        btnback_onclick(); 
                        Flag_Mastr = '';
                          
                    }

               

                }
                else {
                    DisplayMassage("الرجاء تحديث الصفحة واعادت تكرارالمحاولة مره اخري ", "Please refresh the page and try again", MessageType.Error);
                }
            }
        });


    }
    function Assign() {
        Master.G_USERS = DocumentActions.AssignToModel<G_USERS>(Model);
        Master.G_RoleUsers = new Array<G_RoleUsers>();
        for (var i = 0; i < CountGrid; i++) {
            ModelRoleUsers = new G_RoleUsers();
            if ($("#txt_StatusFlag" + i).val() == 'i') {
                ModelRoleUsers.ISActive = $("#CheckISActive" + i).prop('checked')
                ModelRoleUsers.USER_CODE = txtUSER_CODE.value;
                ModelRoleUsers.RoleId = $("#txtRoleId" + i).val();
                ModelRoleUsers.StatusFlag = $("#txt_StatusFlag" + i).val();
                Master.G_RoleUsers.push(ModelRoleUsers);
            }
            if ($("#txt_StatusFlag" + i).val() == 'u') {
                ModelRoleUsers.ISActive = $("#CheckISActive" + i).prop('checked')
                ModelRoleUsers.USER_CODE = txtUSER_CODE.value;
                ModelRoleUsers.RoleId = $("#txtRoleId" + i).val();
                ModelRoleUsers.StatusFlag = $("#txt_StatusFlag" + i).val();
                Master.G_RoleUsers.push(ModelRoleUsers);
            }
            if ($("#txt_StatusFlag" + i).val() == 'd') {
                ModelRoleUsers.RoleId = $("#txtRoleId" + i).val();
                ModelRoleUsers.StatusFlag = $("#txt_StatusFlag" + i).val();
                ModelRoleUsers.ISActive = $("#CheckISActive" + i).prop('checked')
                ModelRoleUsers.USER_CODE = txtUSER_CODE.value;
                Master.G_RoleUsers.push(ModelRoleUsers);
            }
        }
        if (Master.G_USERS.USER_TYPE == 0) {  // Reserve
            Master.G_USERS.USER_TYPE = Number(drpuserType_2.value);
        }
        if (chk_IsActive.checked)
            Master.G_USERS.USER_ACTIVE = true;
        else
            Master.G_USERS.USER_ACTIVE = false;
    }
    function Assign_BRANCH() {

        debugger;
        Master.BRANCHDetailsModel = new Array<G_USER_BRANCH>();
        var StatusFlag: string;
        for (var i = 0; i < CountGridBarnch; i++) {
            BRANCHsingleModel = new G_USER_BRANCH();
            StatusFlag = $("#txt_StatusFlag2" + i).val();

            if (StatusFlag == "i") {
                BRANCHsingleModel.StatusFlag = StatusFlag.toString();
                BRANCHsingleModel.USER_CODE = txtUSER_CODE.value;
                BRANCHsingleModel.COMP_CODE = compcode;
                BRANCHsingleModel.BRA_CODE = $("#BRA_CODE" + i).val();
                BRANCHsingleModel.EXECUTE = $("#EXECUTE" + i).prop('checked');
                BRANCHsingleModel.CREATE = $("#CREATE" + i).prop('checked');
                BRANCHsingleModel.EDIT = $("#EDIT" + i).prop('checked');
                BRANCHsingleModel.DELETE = $("#DELETE" + i).prop('checked');
                BRANCHsingleModel.PRINT = $("#PRINT" + i).prop('checked');
                BRANCHsingleModel.VIEW = true;
                Master.BRANCHDetailsModel.push(BRANCHsingleModel);

            }
            if (StatusFlag == "u") {
                BRANCHsingleModel.StatusFlag = StatusFlag.toString();
                BRANCHsingleModel.USER_CODE = txtUSER_CODE.value;
                BRANCHsingleModel.COMP_CODE = compcode;
                BRANCHsingleModel.BRA_CODE = $("#BRA_CODE" + i).val();
                BRANCHsingleModel.EXECUTE = $("#EXECUTE" + i).prop('checked');
                BRANCHsingleModel.CREATE = $("#CREATE" + i).prop('checked');
                BRANCHsingleModel.EDIT = $("#EDIT" + i).prop('checked');
                BRANCHsingleModel.DELETE = $("#DELETE" + i).prop('checked');
                BRANCHsingleModel.PRINT = $("#PRINT" + i).prop('checked');
                BRANCHsingleModel.VIEW = true;
                Master.BRANCHDetailsModel.push(BRANCHsingleModel);
            }
            if (StatusFlag == "d") {
                BRANCHsingleModel.StatusFlag = StatusFlag.toString();
                BRANCHsingleModel.USER_CODE = txtUSER_CODE.value;
                BRANCHsingleModel.COMP_CODE = compcode;
                BRANCHsingleModel.BRA_CODE = $("#BRA_CODE" + i).val();
                BRANCHsingleModel.EXECUTE = $("#EXECUTE" + i).prop('checked');
                BRANCHsingleModel.CREATE = $("#CREATE" + i).prop('checked');
                BRANCHsingleModel.EDIT = $("#EDIT" + i).prop('checked');
                BRANCHsingleModel.DELETE = $("#DELETE" + i).prop('checked');
                BRANCHsingleModel.PRINT = $("#PRINT" + i).prop('checked');
                BRANCHsingleModel.VIEW = true;
                Master.BRANCHDetailsModel.push(BRANCHsingleModel);

            }
        }
    }
     
    function btnShow_onclick() {
        BindUserGrid();
        $("#btnedite").removeClass("display_none");
        $("#btnAdd").removeClass("display_none");
        $("#divdataa :input").prop("disabled", true);
        $("#btnedite").removeAttr("disabled");
        $("#id_UsersGrid").removeClass("display_none");
    }
    function btnsave_onClick() {

        if (!ValidationHeader())
            return;

        var CanAdd: boolean = true;
        if (CountGrid == 0) {
            WorningMessage("يجب اختيار صلاحية للمستخدم", "You must choose a Role for the user", 'خطاء', 'Erorr');
            Errorinput(drpRoles);
            CanAdd = false;
        }
        if (CountGrid > 0) {
            for (var i = 0; i < CountGrid; i++) {
                CanAdd = ValidatioCountGrid(i);
                if (CanAdd == true) {
                    break;
                }
            }
        }
        if (CanAdd == false) {
            WorningMessage("يجب اختيار صلاحية للمستخدم", "You must choose a Role for the user", 'خطاء', 'Erorr');
            Errorinput(drpRoles);
        }
        if (CanAdd) {
            Update();
        }

    }
    function btnAdd_onClick() {
        $("#div_grid").addClass("disabledDiv");
        Mode = 1;
        $("#div_BasicData :input").val("");
        $("#div_Data").html("");
        $("#div_BasicData :input").prop("disabled", false);
        DisableNoEditControls();
        $("#btnsave").removeClass("display_none");
        $("#btnback").removeClass("display_none");
        $("#btnedite").addClass("display_none");
        $("#btnAdd").toggleClass("display_none");
        $("#btnLoadRoles").removeAttr("disabled");
        $("#btnGive_assignments").removeAttr("disabled");
        $("#btnBlock_permissions").removeAttr("disabled");
        $("#drpRoles").removeClass("display_none");
        $("#txtRoleRemarks").removeClass("display_none");
        $("#Ch_RoleActive").removeClass("display_none");
        $("#btnsearch").attr("disabled", "disabled");
        $("#drpuserType_2").prop("value", "null");

        fillRoles();

        Get_All_BRANCH_From_GBranch();
        $('#btnAddDetails').removeClass("display_none");
        $("#div_plassAddDetails").removeClass("display_none");
        Flag_Mastr = 'i';
        $("#selsman").addClass("display_none");
        $("#cashbox").addClass("display_none");
        List_Roles = new Array<GQ_GetUserRole>();
        Roleetailsf = new Array<G_Role>();
        $("#div_BasicData").removeClass("display_none");
    }
    function btnEdit_onclick() {

        $("#div_grid").addClass("disabledDiv");
        Mode = 2
        $("#div_Data").removeClass("disabledDiv");
        $("#divdataa :input").prop("disabled", false);
        DisableNoEditControls();
        for (var i = 0; i < List_Roles.length; i++) {
            $("#btn_minus" + i).removeClass("display_none");
            $("#CheckISActive" + i).removeAttr("disabled");
        }
        $("#btnedite").addClass("display_none");
        $("#btnAdd").addClass("display_none");
        $("#btnsave").removeClass("display_none");
        $("#btnback").removeClass("display_none");
        $("#btnLoadRoles").removeAttr("disabled");
        $("#btnGive_assignments").removeAttr("disabled");
        $("#btnBlock_permissions").removeAttr("disabled");
        $("#drpRoles").removeClass("display_none");
        $("#txtRoleRemarks").removeClass("display_none");
        $("#Ch_RoleActive").removeClass("display_none");
        $('#btnAddDetails').removeClass("display_none");
        $("#div_plassAddDetails").removeClass("display_none");

        $("#btnsearch").attr("disabled", "disabled");

        for (var i = 0; i < CountGridBarnch; i++) {
            $("#EXECUTE" + i).removeAttr("disabled");
            $("#CREATE" + i).removeAttr("disabled");
            $("#EDIT" + i).removeAttr("disabled");
            $("#DELETE" + i).removeAttr("disabled");
            $("#PRINT" + i).removeAttr("disabled");
        }
        Flag_Mastr = 'u';

    }
    function btnback_onclick() {


        if (Flag_Mastr == 'i') {

            $("#div_Data").html("");
            $("#divdataa :input").val("");
            $("#div_Data_BRANCH").html('');
            $("#btnedite").addClass("display_none");
            $("#div_BasicData").addClass("display_none");
            $("#div_grid").removeClass("disabledDiv"); 
            $("#btnAdd").removeClass("display_none");
            $("#btnAdd").removeAttr("disabled"); 
            $("#btnsearch").removeAttr("disabled");
            $('#btnAddDetails').addClass("display_none");
            $("#divdataa :input").prop("disabled", true);  
            $("#drpRoles").addClass("display_none");
            $("#txtRoleRemarks").addClass("display_none");
            $("#Ch_RoleActive").addClass("display_none");
            Roleetailsf = new Array<G_Role>();

            DisableControls(); 
            //Roleetailsf = new Array<G_Role>();
            //DisableControls();
            //GridDoubleClick();
        }
        else
        {

       
            $('#div_Data').html(""); 
            $("#div_grid").removeClass("disabledDiv");
            $('#btnAddDetails').addClass("display_none");
            $("#divdataa :input").prop("disabled", true);  
            $('#btnsave').addClass("display_none");
            $('#btnback').addClass("display_none");
            $("#btnedite").removeClass("display_none"); 
            $("#btnAdd").removeClass("display_none");
            $("#btnAdd").removeAttr("disabled"); 
            $(".minus_btn").addClass("display_none");
            $("#div_Data").addClass("disabledDiv"); 
            $("#btnBlock_permissions").attr("disabled", "disabled");
            $("#btnGive_assignments").attr("disabled", "disabled"); 
            $("#btnsearch").removeAttr("disabled");
            $("#div_plassAddDetails").addClass("display_none"); 
            $("#drpRoles").addClass("display_none");
            $("#txtRoleRemarks").addClass("display_none");
            $("#Ch_RoleActive").addClass("display_none");

            Roleetailsf = new Array<G_Role>();
            DisableControls();
            GridDoubleClick();
        

        }
     
     

    }

    function DisableNoEditControls() {
        txtFirstLogin.disabled = true;
        txtLastLogin.disabled = true;
        txtCreatedBy.disabled = true;
        txtUpdatedAt.disabled = true;
        txtCreatedAt.disabled = true;
        txtUpdatedBy.disabled = true;
    }

    function btnSearch_onclick() {

        let sys: SystemTools = new SystemTools();
        sys.FindKey(Modules.USERS, "btnUSERS", "", () => {
            let id = SearchGrid.SearchDataGrid.SelectedKey;
 
            alert(id)
            if (!IsNullOrEmpty(id)) {
                Ajax.Callsync({
                    type: "Get",

                    url: sys.apiUrl("A_REC_CUSTOMER", "GetBycode"),
                    data: { CST_CODE: id, comp: compcode, UserCode: SysSession.CurrentEnvironment.UserCode, Token: "HGFD-" + SysSession.CurrentEnvironment.Token },
                    success: (d) => {

                        let result = d as BaseResponse;
                        if (result.IsSuccess) {

                            let Cust = result.Response as G_USERS;
                            if (SysSession.CurrentEnvironment.ScreenLanguage == "en") {
                                $("#txtCustomer").val(Cust.USER_CODE);
                            }
                            else {
                                $("#txtCustomer").val(Cust.USER_CODE);
                            }
                        }
                    }
                });
            }


        });

    }

} 