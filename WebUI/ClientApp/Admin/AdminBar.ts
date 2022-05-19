﻿$(document).ready(() => {

    AdminBar.InitalizeComponent();
})

namespace AdminBar {
     
    var compcode: Number;
    var AccountType: Number = 1;
    var sys: SystemTools = new SystemTools();
    var link = 'http://localhost:51374/';
    var SysSession: SystemSession = GetSystemSession();
    var lang = (SysSession.CurrentEnvironment.ScreenLanguage);

   
 
    var ddlCompFilter     : HTMLSelectElement;
    var txt_BraCode       : HTMLInputElement;
   // var txt_CompNameA     : HTMLInputElement;
    var txt_BRA_DESCE     : HTMLInputElement;
    var txt_TelNum        : HTMLInputElement;
    var txt_Email         : HTMLInputElement;
    var txt_HRResponsible       : HTMLInputElement;
    //var txt_Address       : HTMLInputElement;
    var txt_GrpTax        : HTMLInputElement;
    var txt_Tax           : HTMLInputElement;
    var txt_IDNo      : HTMLInputElement;
    var ddl_IdType        : HTMLSelectElement;
   // var txt_LogoIcon      : HTMLInputElement;
   // var txt_BackgroungPic1: HTMLInputElement;
   // var txt_BackgroungPic2: HTMLInputElement;
    var ddl_Country       : HTMLSelectElement;
    var ddl_Currency      : HTMLSelectElement;
    var txt_Region        : HTMLInputElement;
    var txt_City          : HTMLInputElement;
    var txt_Dist          : HTMLInputElement;
    var txt_Street1       : HTMLInputElement;
    var txt_Street2       : HTMLInputElement;
    var txt_BuildNum1     : HTMLInputElement;
    var txt_BuildNum2     : HTMLInputElement;
    var txt_postCode      : HTMLInputElement;
    var txt_BRA_DESC      : HTMLInputElement;
    var searchbutmemreport: HTMLInputElement;


    var btnSave: HTMLButtonElement;
    var btnBack: HTMLButtonElement;
    var btnEdit: HTMLButtonElement;
    var btnAdd: HTMLButtonElement;

    var IsNew = true;
    var BRA_CODE = 0;

    //------------------------------------------------------------

    var CompFilter: Array<G_COMPANY> = new Array<G_COMPANY>();
    var Grid: JsGrid = new JsGrid();
    var GridS: JsGrid = new JsGrid();
    var BRANCH: Array<G_BRANCH> = new Array<G_BRANCH>();
    var Model: G_BRANCH = new G_BRANCH();
    var CodesTypes: Array<G_Codes> = new Array<G_Codes>();
    var CountryFilter: Array<G_Nationality> = new Array<G_Nationality>();
    var CurrencyFilter: Array<G_Currency> = new Array<G_Currency>();
    var SelecteData: Array<G_BRANCH> = new Array<G_BRANCH>();
    var SelecteDataComp: Array<G_COMPANY> = new Array<G_COMPANY>();

    
    /////////////////////////////////////////////////////////////////////// SECOND GRID //////////////////////////////////////////

    var txt_STORE_CODE: HTMLInputElement;
    var txt_DescA: HTMLInputElement;
    var txt_DescL: HTMLInputElement;
    var txt_Tel1: HTMLInputElement;
    var txt_Tel2: HTMLInputElement;
    var txt_Address2: HTMLInputElement;
    var txt_Remarks: HTMLInputElement;
    var searchbutmemreportS: HTMLInputElement;


    var btnAddStore: HTMLButtonElement;
    var btnSaveS: HTMLButtonElement;
    var btnBackS: HTMLButtonElement;
    var btnEditS: HTMLButtonElement;


    var Store: Array<G_STORE> = new Array<G_STORE>();
    var SelectSData: Array<G_STORE> = new Array<G_STORE>();
    var ModelS: G_STORE = new G_STORE();
    
    var IsNewS = true;
    var STR_CODE = 0;

    ////////////////////////////////////////////////////////////////////////////////
    export function InitalizeComponent() {
        try {

       
        $('#divcompinformtion').removeClass("display_none");
        $("#btnEdit").addClass("display_none");
        InitalizeControls();
        InitalizeEvents();   
        FillddlCompFilter();
        //InitializeGrid();
        Fillddl_IdType();
        Fillddl_Country();
        Fillddl_Currency();
        Disabled();
    /////////////////////////////////////////////////////////////////////// SECOND GRID //////////////////////////////////////////

       // $('#divstoreinformtion').removeClass("display_none");
        $("#btnEditS").addClass("display_none");
        $("#btnAddStore").addClass("display_none");
        
        DisabledStr();
        } catch (e) {
            MessageBox.Show("      يجب معاودة الدخول مرة اخري بستخدم الاسم وكلمة السر", "You must log in again using your name and password ", function () {
                window.location.href = "/Login/LoginIndex";

            }), 1000;
        }
     }

    function InitalizeControls() {
        ddlCompFilter = document.getElementById("ddlCompFilter") as HTMLSelectElement;
        txt_BraCode = document.getElementById("txt_BraCode") as HTMLInputElement; 
        //txt_CompNameA = document.getElementById("txt_CompNameA") as HTMLInputElement;
        txt_BRA_DESCE = document.getElementById("txt_BRA_DESCE") as HTMLInputElement;
        txt_TelNum = document.getElementById("txt_TelNum") as HTMLInputElement;
        txt_Email = document.getElementById("txt_Email") as HTMLInputElement;
        txt_HRResponsible = document.getElementById("txt_HRResponsible") as HTMLInputElement;
        //txt_Address = document.getElementById("txt_Address") as HTMLInputElement;
        txt_GrpTax = document.getElementById("txt_GrpTax") as HTMLInputElement;
        txt_Tax = document.getElementById("txt_Tax") as HTMLInputElement;
        txt_IDNo = document.getElementById("txt_IDNo") as HTMLInputElement;
        ddl_IdType = document.getElementById("txt_IdType") as HTMLSelectElement;
        //txt_LogoIcon = document.getElementById("txt_LogoIcon") as HTMLInputElement;
        //txt_BackgroungPic1 = document.getElementById("txt_BackgroungPic1") as HTMLInputElement;
       // txt_BackgroungPic2 = document.getElementById("txt_BackgroungPic2") as HTMLInputElement;
        ddl_Country = document.getElementById("txt_Country") as HTMLSelectElement;
        ddl_Currency = document.getElementById("txt_Currency") as HTMLSelectElement;
        txt_Region = document.getElementById("txt_Region") as HTMLInputElement;
        txt_City = document.getElementById("txt_City") as HTMLInputElement;
        txt_Dist = document.getElementById("txt_Dist") as HTMLInputElement;
        txt_Street1 = document.getElementById("txt_Street1") as HTMLInputElement;
        txt_Street2 = document.getElementById("txt_Street2") as HTMLInputElement;
        txt_BuildNum1 = document.getElementById("txt_BuildNum1") as HTMLInputElement;
        txt_BuildNum2 = document.getElementById("txt_BuildNum2") as HTMLInputElement;
        txt_postCode = document.getElementById("txt_postCode") as HTMLInputElement;
        txt_BRA_DESC = document.getElementById("txt_BRA_DESC") as HTMLInputElement;
        searchbutmemreport = document.getElementById("searchbutmemreport") as HTMLInputElement;

        btnAdd = document.getElementById("btnAdd") as HTMLButtonElement;
        btnSave = document.getElementById("btnSave") as HTMLButtonElement;
        btnBack = document.getElementById("btnBack") as HTMLButtonElement;
        btnEdit = document.getElementById("btnEdit") as HTMLButtonElement;

            /////////////////////////////////////////////////////////////////////// SECOND GRID //////////////////////////////////////////

        txt_STORE_CODE = document.getElementById("txt_STORE_CODE") as HTMLInputElement;
        txt_DescA = document.getElementById("txt_DescA") as HTMLInputElement;
        txt_DescL = document.getElementById("txt_DescL") as HTMLInputElement;
        txt_Tel1 = document.getElementById("txt_Tel1") as HTMLInputElement;
        txt_Tel2 = document.getElementById("txt_Tel2") as HTMLInputElement;
        txt_Address2 = document.getElementById("txt_Address2") as HTMLInputElement;
        txt_Remarks = document.getElementById("txt_Remarks") as HTMLInputElement;
        searchbutmemreportS = document.getElementById("searchbutmemreportS") as HTMLInputElement;


        btnAddStore = document.getElementById("btnAddStore") as HTMLButtonElement;
        btnSaveS = document.getElementById("btnSaveS") as HTMLButtonElement;
        btnBackS = document.getElementById("btnBackS") as HTMLButtonElement;
        btnEditS = document.getElementById("btnEditS") as HTMLButtonElement;
    }

    function InitalizeEvents() {

        ddlCompFilter.onchange = InitializeGrid;
        btnAdd.onclick = btnAdd_onclick;
        btnSave.onclick = btnSave_onclick;
        btnBack.onclick = btnBack_onclick
        btnEdit.onclick = btnEdit_onclick
        searchbutmemreport.onkeyup = SearchBox;

           /////////////////////////////////////////////////////////////////////// SECOND GRID //////////////////////////////////////////

        btnAddStore.onclick = btnAddStore_onclick;
        btnSaveS.onclick = btnSaveS_onclick;
        btnBackS.onclick = btnBackS_onclick;
        btnEditS.onclick = btnEditS_onclick;
        searchbutmemreportS.onkeyup = SearchSBox;
    }                                            
              
    function BindGrid() {
  
        $('#divShow').removeClass("display_none");

        var COMP_CODE = 0;

        if (ddlCompFilter.value != "null") {
            COMP_CODE = Number(ddlCompFilter.value);
        }

        Ajax.Callsync({
            type: "Get",
            url: link + "GBranch/GetById",
            data: { id: COMP_CODE, UserCode: SysSession.CurrentEnvironment.UserCode, Token: "HGFD-" + SysSession.CurrentEnvironment.Token },
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess) {
                    BRANCH = result.Response as Array<G_BRANCH>;

                    Grid.DataSource = BRANCH;
                    Grid.Bind();


                }
            }
        });

    }

    function InitializeGrid() {

        let res: any = GetResourceList("");
        Grid.ElementName = "divGridDetails";
        Grid.Paging = true;
        Grid.PageSize = 10;
        Grid.Sorting = true;
        Grid.Editing = false;
        Grid.Inserting = false;
        Grid.SelectedIndex = 1;
        Grid.OnRowDoubleClicked = Grid_RowDoubleClicked;
        Grid.OnItemEditing = () => { };
        Grid.PrimaryKey = "BRA_CODE";
        Grid.Columns = [
            { title: res.App_Number, name: "BRA_CODE", type: "text", width: "2%", visible: false },
            { title: "رقم الفرع", name: "BRA_CODE", type: "text", width: "13%" },
            { title: "اسم الفرع", name: "BRA_DESC", type: "text", width: "12%" },
            { title: "رقم التليفون", name: "Tel", type: "text", width: "20%" },

        ];
        BindGrid();
        //InitializeStoreGrid();
    }

    function Grid_RowDoubleClicked() {
        $("#btnAddStore").removeClass("display_none");
        $("#divGrid").removeClass("display_none");
        $("#btnEdit").removeClass("display_none");
        $("#btnSave").addClass("display_none");
        $("#btnBack").addClass("display_none");
       // $('#divcompinformtion').removeClass("display_none");
        SelecteData = BRANCH.filter(x => x.BRA_CODE == Number(Grid.SelectedKey));
        DocumentActions.RenderFromModel(SelecteData[0]);
          InitializeStoreGrid();
        var filter_Comp = CompFilter.filter(x => x.COMP_CODE == Number(ddlCompFilter.value)) 
       // $("#txt_CompNameA").val(filter_Comp[0].NameA);
        //$("#txt_BRA_DESCE").val(filter_Comp[0].NameE);
        //$("#txt_BackgroungPic1").val(filter_Comp[0].BkImage1);
        //$("#txt_BackgroungPic2").val(filter_Comp[0].BkImage2);
        //$("#txt_HRResponsible").val(filter_Comp[0].HRResponsible);
        //$("#txt_LogoIcon").val(filter_Comp[0].LogoIcon);
        

        txt_HRResponsible.value = SelecteData[0].HRResponsible; 
        ddl_IdType.value = SelecteData[0].VndIDTypeCode == null ? 'null' : SelecteData[0].VndIDTypeCode.toString();
        ddl_Country.value = SelecteData[0].NationalityID == null ? 'null' :SelecteData[0].NationalityID.toString();
        ddl_Currency.value = SelecteData[0].Currencyid == null ? 'null' :SelecteData[0].Currencyid.toString();
        Disabled();
        ClearStr();
      

    }

    function InitializeStoreGrid() {

       let res: any = GetResourceList("");
        GridS.ElementName = "divGridStoreDetails";
        GridS.Paging = true;
        GridS.PageSize = 10;
        GridS.Sorting = true;
        GridS.Editing = false;
        GridS.Inserting = false;
        GridS.SelectedIndex = 1;
        GridS.OnRowDoubleClicked = GridS_RowDoubleClicked;
        GridS.OnItemEditing = () => { };
        GridS.PrimaryKey = "StoreId";
        GridS.Columns = [
            { title: res.App_Number, name: "StoreId", type: "text", width: "2%", visible: false },
            { title: "رقم المستودع", name: "STORE_CODE", type: "text", width: "10%" },
            { title: "اسم المستودع", name: (lang == "ar" ? "DescA" : "DescL"), type: "text", width: "30%" },
            //{ title: "اسم المستودع", name: "DescA", type: "text", width: "12%" },
            { title: "العنوان", name: "Address", type: "text", width: "30%" },

        ];
        BindStoreGrid();
    }
    
    function BindStoreGrid() {
        $('#divStoreShow').removeClass("display_none");
        let branch = Number(Grid.SelectedKey);
         var  COMP_CODE = Number(ddlCompFilter.value);
        

       
     
        Ajax.Callsync({
            type: "Get",
            url: link + "DefStore/GetAll",
            data: { CompCode: COMP_CODE, BranchCode: branch, UserCode: SysSession.CurrentEnvironment.UserCode, Token: "HGFD-" + SysSession.CurrentEnvironment.Token },
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess) {
                    Store = result.Response as Array<G_STORE>;

                    GridS.DataSource = Store;
                    GridS.Bind();


                }
            }
        });

    }

    function GridS_RowDoubleClicked() {
       // $("#divstoreinformtion").removeClass("display_none");
        $("#btnEditS").removeClass("display_none");
        $("#btnSaveS").addClass("display_none");
        $("#btnBackS").addClass("display_none");

        SelectSData = Store.filter(x => x.StoreId == Number(GridS.SelectedKey));
        DisabledStr();

        txt_STORE_CODE.value = SelectSData[0].STORE_CODE == null ? ''  : SelectSData[0].STORE_CODE.toString();
        txt_DescA.value = SelectSData[0].DescA.toString();
        txt_DescL.value = SelectSData[0].DescL.toString();
        txt_Tel1.value = SelectSData[0].Tel1.toString();
        txt_Tel2.value = SelectSData[0].Tel2.toString();
        txt_Address2.value = SelectSData[0].Address.toString();
        txt_Remarks.value = SelectSData[0].Remarks.toString();

    }

    function AssignStore() {
        ModelS = new G_STORE();
        //DocumentActions.AssignToModel(Model);
       
        ModelS.Token = "HGFD-" + SysSession.CurrentEnvironment.Token;
        ModelS.UserCode = SysSession.CurrentEnvironment.UserCode;
        ModelS.BranchId = 1;
        ModelS.COMP_CODE = Number(ddlCompFilter.value);
        ModelS.BRA_CODE = Number(txt_BraCode.value);
        ModelS.STORE_CODE = Number(txt_STORE_CODE.value);
        ModelS.DescA = txt_DescA.value;
        ModelS.DescL = txt_DescL.value;
        ModelS.Tel1 = txt_Tel1.value;
        ModelS.Tel2 = txt_Tel2.value;
        ModelS.Address = txt_Address2.value;
        ModelS.Remarks = txt_Remarks.value;
        ModelS.CreatedBy = SysSession.CurrentEnvironment.UserCode
        ModelS.CreatedAt = DateTimeFormat(GetDate().toString());
    }

    function InsertS() {
        IsNewS = true;
        debugger
        AssignStore();
        Ajax.Callsync({
            type: "Post",
            url: link + "DefStore/Insert",
            data: JSON.stringify(ModelS),
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess) {
                    DisplayMassage("تم الحفظ بنجاح", "Saved successfully", MessageType.Succeed);
                    STR_CODE = result.Response;
                    
                    $("#btnSaveS").addClass("display_none");
                    $("#btnBackS").addClass("display_none");
                    $("#btnEditS").removeClass("display_none");
                    DisabledStr();
                    BindStoreGrid();
                    $("#divSecondGrid").removeClass("disabledDiv");

                    SelectSData = Store.filter(x => x.StoreId == Number(STR_CODE));
                    DisabledStr();

                    txt_STORE_CODE.value = SelectSData[0].STORE_CODE == null ? '' : SelectSData[0].STORE_CODE.toString();
                    txt_DescA.value = SelectSData[0].DescA.toString();
                    txt_DescL.value = SelectSData[0].DescL.toString();
                    txt_Tel1.value = SelectSData[0].Tel1.toString();
                    txt_Tel2.value = SelectSData[0].Tel2.toString();
                    txt_Address2.value = SelectSData[0].Address.toString();
                    txt_Remarks.value = SelectSData[0].Remarks.toString();


                }
                else {
                    DisplayMassage("خطأء", "Error", MessageType.Error);
                }
            }
        }); 
    }

    function UpdateS() {
        debugger
        AssignStore();
         
        var StoreId = STR_CODE ;
        var BranchId = 1;
        var COMP_CODE = Number(ddlCompFilter.value);
        var BRA_CODE = Number(Grid.SelectedKey);
        var STORE_CODE = Number(txt_STORE_CODE.value);
        var DescA = txt_DescA.value;
        var DescL = txt_DescL.value;
        var Tel1 = txt_Tel1.value;
        var Tel2 = txt_Tel2.value;
        var Address = txt_Address2.value;
        var Remarks = txt_Remarks.value;
        var UpdatedBy = SysSession.CurrentEnvironment.UserCode
       
 

        Ajax.Callsync({
            type: "Get",
            url: link + "DefStore/Update",
            data: { StoreId: StoreId, BranchId: BranchId, COMP_CODE: COMP_CODE, BRA_CODE: BRA_CODE, STORE_CODE: STORE_CODE, DescA: DescA, DescL: DescL, Tel1: Tel1, Tel2: Tel2, Address: Address, Remarks: Remarks, UpdatedBy: UpdatedBy },
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess) {
                    DisplayMassage("تم الحفظ بنجاح", "Saved successfully", MessageType.Succeed);
                    // var STR_CODE = result.Response as G_STORE;
                    ModelS.UpdatedBy = SysSession.CurrentEnvironment.UserCode
                    ModelS.UpdatedAt = DateTimeFormat(GetDate().toString());

                    $("#btnSaveS").addClass("display_none");
                    $("#btnBackS").addClass("display_none");
                    $("#btnEditS").removeClass("display_none");
                    DisabledStr();
                    BindStoreGrid();
                    $("#divSecondGrid").removeClass("disabledDiv");
                    GridS_RowDoubleClicked();

                }
            }
        }); 
       
       // Grid_RowDoubleClicked();

    }


    function FillddlCompFilter() {
        

        Ajax.Callsync({// GetAll( string UserCode, string Token)
            type: "Get",
            url: link +"GComp/GetAll", 
            data: { UserCode: SysSession.CurrentEnvironment.UserCode, Token: "HGFD-" + SysSession.CurrentEnvironment.Token },
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess) {
             
                    CompFilter = result.Response as Array<G_COMPANY>;

                    DocumentActions.FillCombowithdefult(CompFilter, ddlCompFilter, "COMP_CODE", "NameA", "اختر الشركة");
                   
                }
            }
        });

    }

    function Fillddl_IdType()
    {
        
        Ajax.Callsync({
            type: "Get",
            url: link + "GCodes/GetAll",
            data: { codeType: 'VNDIDType', UserCode: SysSession.CurrentEnvironment.UserCode, Token: "HGFD-" + SysSession.CurrentEnvironment.Token },
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess == true) {
                    
                    CodesTypes = result.Response as Array<G_Codes>;
                    DocumentActions.FillCombowithdefult(CodesTypes, ddl_IdType, "CodeValue", "DescA", " اختر نوع المعرف ");
                }
            }
        });
 

    }

    function Fillddl_Country() {
        
        Ajax.Callsync({
            type: "Get",
            url: link + "Nationality/GetAll",
            data: { UserCode: SysSession.CurrentEnvironment.UserCode, Token: "HGFD-" + SysSession.CurrentEnvironment.Token },
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess == true) {
                    
                    CountryFilter = result.Response as Array<G_Nationality>;
                    DocumentActions.FillCombowithdefult(CountryFilter, ddl_Country, "NationalityID", "DescA", " اختر الدولة ");
                }
            }
        });
    }

    function Fillddl_Currency() {
        
        Ajax.Callsync({
            type: "Get",
            url: link + "AccDefVendor/GetAllCurrency",
            data: { UserCode: SysSession.CurrentEnvironment.UserCode, Token: "HGFD-" + SysSession.CurrentEnvironment.Token },
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess == true) {
                    
                    CurrencyFilter = result.Response as Array<G_Currency>;
                    DocumentActions.FillCombowithdefult(CurrencyFilter, ddl_Currency, "CurrencyID", "DescA", " اختر العملة ");
                }
            }
        });
    }

    function Insert() {
        
        Assign();
        Ajax.Callsync({
            type: "Post",
            url: link + "GBranch/Insert",
            data: JSON.stringify(Model),
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess) {
                    DisplayMassage("تم الحفظ بنجاح", "Saved successfully", MessageType.Succeed);
                     BRA_CODE = result.Response;
                    
                }
                else {
                    DisplayMassage("خطأء", "Error", MessageType.Error);
                }
            }
        });
    }

    function Assign() { 
        Model = new G_BRANCH(); 
        DocumentActions.AssignToModel(Model);
        Model.COMP_CODE = Number(ddlCompFilter.value);
        Model.HRResponsible = txt_HRResponsible.value;
        Model.IDNo = txt_IDNo.value;
        Model.Token = "HGFD-" + SysSession.CurrentEnvironment.Token;
        Model.UserCode = SysSession.CurrentEnvironment.UserCode;
    }

    function Update() {
        Assign();
        
        $("#btnEdit").removeClass("display_none");
        $("#btnSave").addClass("display_none");
        $("#btnBack").addClass("display_none");

        Ajax.Callsync({
            type: "POST",
            url: link + "GBranch/Update", 
            data: JSON.stringify(Model),
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess) {
                    DisplayMassage("تم الحفظ بنجاح", "Saved successfully", MessageType.Succeed);
               var  BRA_CODE = result.Response as G_BRANCH;
                    
               } 
            }
        });
    }

    function btnAdd_onclick() {
        if (ddlCompFilter.value == "null") {
            DisplayMassage("اختر الشركة", "Saved successfully", MessageType.Succeed);
            return;
        }
       // txt_CompNameA.disabled = true;
        //txt_BRA_DESCE.disabled = true;
       // txt_BackgroungPic1.disabled = true;
       // txt_BackgroungPic2.disabled = true;
       // txt_LogoIcon.disabled = true;
        //txt_HRResponsible.disabled = true;

        $("#divGrid").addClass("disabledDiv");
        $("#btnEdit").addClass("display_none");
        $("#btnSave").removeClass("display_none");
        $("#btnBack").removeClass("display_none");
       // $('#divcompinformtion').removeClass("display_none");
        Clear();
        Enabled();

        var filter_Comp = CompFilter.filter(x => x.COMP_CODE == Number(ddlCompFilter.value))

        //$("#txt_CompNameA").val(filter_Comp[0].NameA);
        //$("#txt_BRA_DESCE").val(filter_Comp[0].NameE);
       // $("#txt_BackgroungPic1").val(filter_Comp[0].BkImage1);
        //$("#txt_BackgroungPic2").val(filter_Comp[0].BkImage2);
        IsNew = true;

        
    }

    function btnEdit_onclick() {
        $("#btnBack").removeClass("display_none");
        $("#btnSave").removeClass("display_none");
        $("#btnEdit").addClass("display_none");
        $("#divGrid").addClass("disabledDiv");
        Enabled();
       // txt_CompNameA.disabled = true;
        //txt_BRA_DESCE.disabled = true;
        //txt_BackgroungPic1.disabled = true;
        //txt_BackgroungPic2.disabled = true;
        IsNew = false;
    }

    function btnSave_onclick() {

        if (!validation())
            return;
        Assign();

        if (IsNew == false) {
            Update();
        }
        else {
            Insert();
        }
        succes();
        
        Disabled();
        //$("#btnBack").addClass("display_none");
        //$("#btnSave").addClass("display_none");
        //$("#btnEdit").removeClass("display_none");
        //$("#divGrid").removeClass("display_none");

    }

    function btnBack_onclick() {
        $("#btnEdit").addClass("display_none");
        $("#btnSave").removeClass("display_none");
        $("#btnBack").removeClass("display_none");
        Disabled();
            $("#divGrid").removeClass("disabledDiv");

        if (IsNew == true) {      
           // $("#divcompinformtion").addClass("display_none");
            $("#btnEdit").addClass("display_none");
            $("#btnSave").addClass("display_none");
            $("#btnBack").addClass("display_none");
            Disabled();
            Clear();
        }
        else {
            Grid_RowDoubleClicked();
           
            //$("#divcompinformtion").removeClass("display_none");
        }


    }

    function Disabled() {
        txt_BraCode.disabled = true;
        //txt_CompNameA.disabled = true;
        txt_BRA_DESCE.disabled = true;
        txt_TelNum.disabled = true;
        txt_Email.disabled = true;
        txt_HRResponsible.disabled = true;
        //txt_Address.disabled = true;
        txt_GrpTax.disabled = true;
        txt_Tax.disabled = true;
        txt_IDNo.disabled = true;
        ddl_IdType.disabled = true;
       //txt_LogoIcon.disabled = true;
        //txt_BackgroungPic1.disabled = true;
        //txt_BackgroungPic2.disabled = true;
        ddl_Country.disabled = true;
        ddl_Currency.disabled = true;
        txt_Region.disabled = true;
        txt_City.disabled = true;
        txt_Dist.disabled = true;
        txt_Street1.disabled = true;
        txt_Street2.disabled = true;
        txt_BuildNum1.disabled = true;
        txt_BuildNum2.disabled = true;
        txt_postCode.disabled = true;
        txt_BRA_DESC.disabled = true;
       
    }

    function Enabled() {
        txt_BraCode.disabled = false;
       // txt_CompNameA.disabled = false;
        txt_BRA_DESCE.disabled = false;
        txt_TelNum.disabled = false;
        txt_Email.disabled = false;

        txt_HRResponsible.disabled = false;
        //txt_Address.disabled = false;
        txt_GrpTax.disabled = false;
        txt_Tax.disabled = false;
        txt_IDNo.disabled = false;
        ddl_IdType.disabled = false;
       // txt_LogoIcon.disabled = false;
       // txt_BackgroungPic1.disabled = false;
       // txt_BackgroungPic2.disabled = false;
        ddl_Country.disabled = false;
        ddl_Currency.disabled = false;
        txt_Region.disabled = false;
        txt_City.disabled = false;
        txt_Dist.disabled = false;
        txt_Street1.disabled = false;
        txt_Street2.disabled = false;
        txt_BuildNum1.disabled = false;
        txt_BuildNum2.disabled = false;
        txt_postCode.disabled = false;
        txt_BRA_DESC.disabled = false;
    }

    function Clear() {
        txt_BraCode.value = "";
        //txt_CompNameA.value = "";
        txt_BRA_DESCE.value = "";
        txt_TelNum.value = "";
        txt_Email.value = "";
        txt_HRResponsible.value = "";
        //txt_Address.value = "";
        txt_GrpTax.value = "";
        txt_Tax.value = "";
        txt_IDNo.value = "";
        ddl_IdType.value = "null";
       // txt_LogoIcon.value = "";
        //txt_BackgroungPic1.value = "";
        //txt_BackgroungPic2.value = "";
        ddl_Country.value = "null";
        ddl_Currency.value = "null";
        txt_Region.value = "";
        txt_City.value = "";
        txt_Dist.value = "";
        txt_Street1.value = "";
        txt_Street2.value = "";
        txt_BuildNum1.value = "";
        txt_BuildNum2.value = "";
        txt_postCode.value = "";
        txt_BRA_DESC.value = "";
    }

    function validateEmail(email) {

        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    function validate_email() {

        
        const email = $("#txt_Email").val();
        validateEmail(email)

        return validateEmail(email);
    }
     
    function validation() {

        var zero = Number(txt_BraCode.value);
        SelecteData = BRANCH.filter(x => x.BRA_CODE == zero)
        if (IsNew == true && SelecteData.length > 0) {
         
                DisplayMassage("الرمز موجود من قبل ", "The Code already exists", MessageType.Worning);
                Errorinput(txt_BraCode);
            return false;
         
        }
        if (txt_BraCode.value == "" || txt_BraCode.value.trim() == "" || zero <= 0) {
            DisplayMassage("يجب ادخال الرمز  ", "Please, Enter The Code!", MessageType.Worning);
            Errorinput(txt_BraCode);
            return false;
        }

        if ((txt_BRA_DESC.value == "" || txt_BRA_DESC.value.trim() == "") && (txt_BRA_DESCE.value == "" || txt_BRA_DESCE.value.trim() == "")) {
            DisplayMassage("يجب ادخال اسم الشركة بالعربي او اسم الفرع بالانجليزي  ", "Please, Enter The Arabic Or English Branch Name !", MessageType.Worning);
            Errorinput(txt_BRA_DESC); Errorinput(txt_BRA_DESCE);
            return false;
        }
        if ((txt_BRA_DESC.value == "" || txt_BRA_DESC.value.trim() == "") && txt_BRA_DESCE.value != "") {
            txt_BRA_DESC.value = txt_BRA_DESCE.value;
        }
        if ((txt_BRA_DESCE.value == "" || txt_BRA_DESCE.value.trim() == "") && txt_BRA_DESC.value != "") {
            txt_BRA_DESCE.value = txt_BRA_DESC.value;
        }


        //if (txt_BRA_DESC.value == "" || txt_BRA_DESC.value.trim() == "") {
        //    DisplayMassage(" يجب ادخال اسم الفرع    ", "Please, Enter The Branch Name!", MessageType.Worning);
        //    Errorinput(txt_BRA_DESC);
        //    return false;
        //}

        if (txt_TelNum.value == "" || txt_TelNum.value.trim() == "") {
            DisplayMassage("يجب ادخال رقم الهاتف  ", "Please, Enter The telephone Number!", MessageType.Worning);
            Errorinput(txt_TelNum);
            return false;
        }

        if ($('#txt_Email').val().trim() != '') {

            if (validate_email() == false) {
                DisplayMassage("يجب ادخال البريد الالكتروني صحيح ", "You must enter a valid email", MessageType.Worning);
                Errorinput($('#txt_Email'));
                return false;
            }
        } 

        if (txt_Email.value == "" || txt_Email.value.trim() == "") {
            DisplayMassage("يجب ادخال البريد الالكتروني  ", "Please, Enter The Email!", MessageType.Worning);
            Errorinput(txt_Email);
            return false;
        }

        if (txt_HRResponsible.value == "" || txt_HRResponsible.value.trim() == "") {
            DisplayMassage("يجب ادخال اسم المسؤل  ", "Please, Enter The Responsible Name!", MessageType.Worning);
            Errorinput(txt_HRResponsible);
            return false;
        }

        //if (txt_Address.value == "" || txt_Address.value.trim() == "") {
        //    DisplayMassage("يجب ادخال العنوان  ", "Please, Enter The Address!", MessageType.Worning);
        //    Errorinput(txt_Address);
        //    return false;
        //}
        //if (txt_GrpTax.value == "" || txt_GrpTax.value.trim() == "") {
        //    DisplayMassage("يجب ادخال رقم المجموعة الضريبية  ", "Please, Enter The group Tax!", MessageType.Worning);
        //    Errorinput(txt_GrpTax);
        //    return false;
        //}

        if ( txt_GrpTax.value.trim() == "" &&  txt_Tax.value.trim() == "") {
            DisplayMassage("يجب ادخال الرقم الضريبي  ", "Please, Enter The Tax!", MessageType.Worning);
            Errorinput(txt_Tax);
            return false;
        }

        //if (txt_Tax.value == "" || txt_Tax.value.trim() == "") {
        //    DisplayMassage("يجب ادخال الرقم الضريبي  ", "Please, Enter The Tax!", MessageType.Worning);
        //    Errorinput(txt_Tax);
        //    return false;
        //}


        //if (txt_IDNo.value == "" || txt_IDNo.value.trim() == "") {
        //    DisplayMassage("يجب ادخال الرقم التعريفي  ", "Please, Enter The IDNo!", MessageType.Worning);
        //    Errorinput(txt_IDNo);
        //    return false;
        //}


        //if (ddl_IdType.value == "" || ddl_IdType.value == "null" || ddl_IdType.value.trim() == "") {
        //    DisplayMassage("يجب ادخال نوع المعرف  ", "Please, Enter The Vndor ID Type Code!", MessageType.Worning);
        //    Errorinput(ddl_IdType);
        //    return false;
        //}

        if (txt_IDNo.value.trim() != "" && ddl_IdType.value == "null" ) {
            DisplayMassage("يجب ادخال نوع المعرف  ", "Please, Enter The Vndor ID Type Code!", MessageType.Worning);
            Errorinput(ddl_IdType);
            return false;
        }

        if (ddl_Country.value == "" || ddl_Country.value == "null" || ddl_Country.value.trim() == "") {
            DisplayMassage("يجب ادخال الدولة", "Please, Enter The Country!", MessageType.Worning);
            Errorinput(ddl_Country);
            return false;
        }
      
        if (ddl_Currency.value == "" || ddl_Currency.value == "null" || ddl_Currency.value.trim() == "") {
            DisplayMassage("يجب ادخال العملة", "Please, Enter The Currency!", MessageType.Worning);
            Errorinput(ddl_Currency);
            return false;
        }

        if (txt_Region.value == "" || txt_Region.value.trim() == "") {
            DisplayMassage("يجب ادخال المنطقة  ", "Please, Enter The Region!", MessageType.Worning);
            Errorinput(txt_Region);
            return false;
        }

        if (txt_City.value == "" || txt_City.value.trim() == "") {
            DisplayMassage("يجب ادخال المدينة  ", "Please, Enter The City!", MessageType.Worning);
            Errorinput(txt_City);
            return false;
        }

        if (txt_Dist.value == "" || txt_Dist.value.trim() == "") {
            DisplayMassage("يجب ادخال الحي  ", "Please, Enter The District!", MessageType.Worning);
            Errorinput(txt_Dist);
            return false;
        }

        if (txt_Street1.value == "" || txt_Street1.value.trim() == "") {
            DisplayMassage("يجب ادخال الشارع  ", "Please, Enter The Street", MessageType.Worning);
            Errorinput(txt_Street1);
            return false;
        }

        if (txt_Street2.value == "" || txt_Street2.value.trim() == "") {
            DisplayMassage("يجب ادخال الشارع الاضافي  ", "Please, Enter The Additional Street!", MessageType.Worning);
            Errorinput(txt_Street2);
            return false;
        }

        if (txt_BuildNum1.value == "" || txt_BuildNum1.value.trim() == "") {
            DisplayMassage("يجب ادخال رقم المبني   ", "Please, Enter The Building Number!", MessageType.Worning);
            Errorinput(txt_BuildNum1);
            return false;
        }

        if (txt_BuildNum2.value == "" || txt_BuildNum2.value.trim() == "") {
            DisplayMassage(" يجب ادخال رقم المبني الاضافي    ", "Please, Enter The Additional Building Number!", MessageType.Worning);
            Errorinput(txt_BuildNum2);
            return false;
        }

        if (txt_postCode.value == "" || txt_postCode.value.trim() == "") {
            DisplayMassage(" يجب ادخال الرمز البريدي    ", "Please, Enter The post Code!", MessageType.Worning);
            Errorinput(txt_postCode);
            return false;
        }

        return true;
    }

    function succes() {
        BindGrid();
        Disabled();
       // $("#divcompinformtion").removeClass("display_none");
        $("#btnEdit").removeClass("display_none");
        $("#divGrid").removeClass("disabledDiv");
        $("#btnBack").addClass("display_none");
        $("#btnSave").addClass("display_none");
        if (IsNew == false) {
            Grid_RowDoubleClicked();
        }
        else {
            $("#divGrid").removeClass("display_none");
            $("#btnEdit").removeClass("display_none");
            $("#btnSave").addClass("display_none");
            $("#btnBack").addClass("display_none");
           // $('#divcompinformtion').removeClass("display_none");
            SelecteData = BRANCH.filter(x => x.BRA_CODE == Number(BRA_CODE));
            DocumentActions.RenderFromModel(SelecteData[0]);

            var filter_Comp = CompFilter.filter(x => x.COMP_CODE == Number(ddlCompFilter.value))
            $("#txt_CompNameA").val(filter_Comp[0].NameA);
            $("#txt_BRA_DESCE").val(filter_Comp[0].NameE);
          //  $("#txt_BackgroungPic1").val(filter_Comp[0].BkImage1);
          //  $("#txt_BackgroungPic2").val(filter_Comp[0].BkImage2);
            txt_HRResponsible.value = SelecteData[0].HRResponsible; 
            ddl_IdType.value = SelecteData[0].VndIDTypeCode == null ? 'null' : SelecteData[0].VndIDTypeCode.toString();
            ddl_Country.value = SelecteData[0].NationalityID == null ? 'null' : SelecteData[0].NationalityID.toString();
            ddl_Currency.value = SelecteData[0].Currencyid == null ? 'null' : SelecteData[0].Currencyid.toString();
            Disabled();        }

    }

    function SearchBox() {
        var SearchDetails;
        if (searchbutmemreport.value != "") {



            let search: string = searchbutmemreport.value.toLowerCase();
            SearchDetails = BRANCH.filter(x => x.BRA_CODE.toString().toLowerCase().search(search) >= 0 || x.BRA_DESC.toLowerCase().toLowerCase().search(search) >= 0);


            Grid.DataSource = SearchDetails;
            Grid.Bind();
        } else {
            Grid.DataSource = BRANCH;
            Grid.Bind();
        }
    }



    /////////////////////////////////////////////////////////////////////// SECOND GRID //////////////////////////////////////////


    function DisabledStr() {
        txt_STORE_CODE.disabled = true;
        txt_DescA.disabled = true;
        txt_DescL.disabled = true;
        txt_Tel1.disabled = true;
        txt_Tel2.disabled = true;
        txt_Address2.disabled = true;
        txt_Remarks.disabled = true;
       

    }

    function EnabledStr() {
        txt_STORE_CODE.disabled = false;
        txt_DescA.disabled = false;
        txt_DescL.disabled = false;
        txt_Tel1.disabled = false;
        txt_Tel2.disabled = false;
        txt_Address2.disabled = false;
        txt_Remarks.disabled = false;
      
    }

    function ClearStr() {
        txt_STORE_CODE.value = "";
        txt_DescA.value = "";
        txt_DescL.value = "";
        txt_Tel1.value = "";
        txt_Tel2.value = "";
        txt_Address2.value = "";
        txt_Remarks.value = "";
      
    }


    function btnAddStore_onclick() {
         
        IsNewS = true;
        ClearStr();
        EnabledStr();
        $("#divSecondGrid").addClass("disabledDiv");
        $("#btnEditS").addClass("display_none");
        $("#btnSaveS").removeClass("display_none");
        $("#btnBackS").removeClass("display_none");
         
    }

    function btnSaveS_onclick() {
        debugger;
        if (!validationStr()) 
            return;
       
            if (IsNewS == false) {

                UpdateS();

            } else {
                InsertS();
                //ClearStr();
            }
     

        
       
    }

    function btnBackS_onclick() {
       
        DisabledStr();
        $("#divSecondGrid").removeClass("disabledDiv");
            $("#btnSaveS").addClass("display_none");
            $("#btnBackS").addClass("display_none");
        if (IsNewS == true) {
            $("#btnEditS").addClass("display_none");
             ClearStr();
        } else {

            $("#btnEditS").removeClass("display_none");
            GridS_RowDoubleClicked();
        }
    }

    function btnEditS_onclick() {
        $("#divSecondGrid").addClass("disabledDiv");

        $("#btnBackS").removeClass("display_none");
        $("#btnSaveS").removeClass("display_none");
        $("#btnEditS").addClass("display_none");
     //   $("#divGrid").addClass("disabledDiv");
        EnabledStr();
        
        IsNewS = false;
    }

    function SearchSBox() {
        var SearchDetails;
        if (searchbutmemreportS.value != "") {



            let search: string = searchbutmemreportS.value.toLowerCase();
            SearchDetails = Store.filter(x => x.STORE_CODE.toString().toLowerCase().search(search) >= 0 || x.DescA.toLowerCase().toLowerCase().search(search) >= 0);


            GridS.DataSource = SearchDetails;
            GridS.Bind();
        } else {
            GridS.DataSource = Store;
            GridS.Bind();
        }
    }

    function validationStr() {

        var zero = Number(txt_STORE_CODE.value);
        SelectSData = Store.filter(x => x.STORE_CODE == zero)
        if (IsNewS == true && SelectSData.length > 0) {

            DisplayMassage("الرمز موجود من قبل ", "The Code already exists", MessageType.Worning);
            Errorinput(txt_STORE_CODE);
            return false;

        }
        if (txt_STORE_CODE.value == "" || txt_STORE_CODE.value.trim() == "" || zero <= 0) {
            DisplayMassage("يجب ادخال الرمز  ", "Please, Enter The Code!", MessageType.Worning);
            Errorinput(txt_STORE_CODE);
            return false;
        }

        if ((txt_DescA.value == "" || txt_DescA.value.trim() == "") && (txt_DescL.value == "" || txt_DescL.value.trim() == "")) {
            DisplayMassage("يجب ادخال اسم المستودع بالعربي او اسم المستودع بالانجليزي  ", "Please, Enter The Arabic Or English Store Name !", MessageType.Worning);
            Errorinput(txt_DescA); Errorinput(txt_DescL);
            return false;
        }
        if ((txt_DescA.value == "" || txt_DescA.value.trim() == "") && txt_DescL.value != "") {
            txt_DescA.value = txt_DescL.value;
        }
        if ((txt_DescL.value == "" || txt_DescL.value.trim() == "") && txt_DescA.value != "") {
            txt_DescL.value = txt_DescA.value;
        }

        if (txt_Tel1.value == "" || txt_Tel1.value.trim() == "" || zero <= 0) {
            DisplayMassage("يجب ادخال رقم الهاتف  ", "Please, Enter The Phone Number!", MessageType.Worning);
            Errorinput(txt_Tel1);
            return false;
        }
        if (txt_Address2.value == "" || txt_Address2.value.trim() == "" || zero <= 0) {
            DisplayMassage("يجب ادخال العنوان  ", "Please, Enter The address!", MessageType.Worning);
            Errorinput(txt_Address2);
            return false;
        }
        return true;
    }
}