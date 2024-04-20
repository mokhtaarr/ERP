$(document).ready(() => {
    SharedButtons.OnLoad();
    Search.InitalizeComponent();
})

namespace Search {
    let Resource: any = GetResourceList("");
    $('#headertop1').addClass('display_none');
    $('#headertop2').removeClass('display_none');
    $('#headerTitle').text(Resource.SearchWindow);

    var sys: SystemTools = new SystemTools();
    var SysSession: SystemSession = GetSystemSession();
    var lang = sys.SysSession.CurrentEnvironment.ScreenLanguage;
    let compCode = SysSession.CurrentEnvironment.CompCode;
    let UserCode = SysSession.CurrentEnvironment.UserCode;
    let Token = "HGFD-" + SysSession.CurrentEnvironment.Token;

    var Model: G_SearchFormModule = new G_SearchFormModule();
    var Models: Array<G_SearchFormModule> = new Array<G_SearchFormModule>();
    var Setting: G_SearchForm = new G_SearchForm();
    var ColumnSetting: Array<G_SearchFormSetting> = new Array<G_SearchFormSetting>();
    var newColumnSetting: G_SearchFormSetting = new G_SearchFormSetting();

    var MasterDetails: MasterDetailsSearch = new MasterDetailsSearch();
    var ReturnDataPropertyvalueArr: Array<string> = new Array<string>()
    var SYSTEM: Array<G_SYSTEM> = new Array<G_SYSTEM>()
    var SubSYSTEM: Array<G_SUB_SYSTEMS> = new Array<G_SUB_SYSTEMS>()

    var element: HTMLInputElement;
    var ModuleCode: HTMLSelectElement;
    var DataSourceName: HTMLSelectElement;
    var ReturnDataPropertyName: HTMLSelectElement;
    var DataMember: HTMLSelectElement;
    var SystemCode: HTMLSelectElement;
    var SubSystemCode: HTMLSelectElement;
    var ReturnDataPropertyValue = "";
    var ReturnDataPropertyValue = "";

    var ObjectId = "";
    var StatusFlag;
    var Success;
    var hasNodes: boolean;
    var flag: boolean;
    var IndexOfElemntInJsGrid: number;

    var divSearchGrid: JsGrid = new JsGrid();
    var divColumnSettingGrid: JsGrid = new JsGrid();
    const GridInputClassName = "form-control gridIput";

    export function InitalizeComponent() {
        SharedButtons.compcode = Number(SysSession.CurrentEnvironment.CompCode);
        localStorage.setItem("TableName", "G_SearchFormModule");
        NavigateModule.InitalizeComponent();

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
        GetAll();
        InitializeGrid();
        InitializeSettingGrid();
    }

    function InitalizeControls() {
        SharedButtons.btnSearch = document.getElementById("btnSearchWindow") as HTMLButtonElement;
        ModuleCode = document.getElementById("ModuleCode") as HTMLSelectElement;
        DataSourceName = document.getElementById("DataSourceName") as HTMLSelectElement;
        ReturnDataPropertyName = document.getElementById("ReturnDataPropertyName") as HTMLSelectElement;
        DataMember = document.getElementById("DataMember") as HTMLSelectElement;

        SystemCode = document.getElementById("SystemCode") as HTMLSelectElement;
        SubSystemCode = document.getElementById("SubSystemCode") as HTMLSelectElement;
    }

    function InitalizeEvents() {
        SharedButtons.btnSearch.onclick = btnSearch_onclick;
        SharedButtons.btnRefrash2.onclick = Refrash;
        DataSourceName.onchange = GetReturnDataPropertyName;
    }

    function GetAll() {
        FillDrobDownList_InSearchWindowTap();
        Disabled(false);
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("SySearch", "GetAll"),
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess) {
                    Models = result.Response as Array<G_SearchFormModule>;
                    divSearchGrid.DataSource = Models;
                    divSearchGrid.Bind();
                }
            }
        });
    }

    function GetByCode(code: string) {
        Ajax.Callsync({
            type: "GET",
            url: sys.apiUrl("SySearch", "Get"),
            data: {code: code},
            success: (Response) => {
                let result = Response as BaseResponse;
                if (result.IsSuccess) {
                    MasterDetails = result.Response as MasterDetailsSearch;
                }
                else {
                    console.log(result.ErrorMessage);
                }
            }
        });
        return MasterDetails;
    }

    function Display(Model: G_SearchFormModule) {
        DocumentActions.RenderFromModel(Model);
        if (Model != null) {
            ObjectId = Model.ModuleCode;
            SetDataSourceFroDetails(ObjectId);
            DocumentActions.ConvertAll_InGridToSelect2("divColumnSettingGrid");
        }
    }

    function SetDataSourceFroDetails(code: string) {
        if (!IsNullOrEmpty(code)) {

            MasterDetails = GetByCode(code);
            Setting = MasterDetails.settings;

            if (Setting != null) {
                DocumentActions.RenderFromModel(Setting);
                ReturnDataPropertyValue = Setting.ReturnDataPropertyName;
                ReturnDataPropertyValue = Setting.ReturnDataPropertyName;
            } else {
                Setting = new G_SearchForm();
                DocumentActions.allElements(true, true, Setting);
                DocumentActions.ConvertAll_InGridToSelect2("setting");
            }

            GetReturnDataPropertyName();

            if (MasterDetails.ColumnSetting != null) {
                ColumnSetting = MasterDetails.ColumnSetting.filter(x => x.SearchFormCode == code);
                divColumnSettingGrid.DataSource = ColumnSetting;
                divColumnSettingGrid.Bind();
            } else
                ColumnSetting = null;
        }
    }

    function InitializeGrid() {
        divSearchGrid.ElementName = "divSearchGrid";
        divSearchGrid.PrimaryKey = "ModuleCode";
        divSearchGrid.Editing = true;
        divSearchGrid.Paging = true;
        divSearchGrid.Sorting = true;
        divSearchGrid.PageSize = 10;
        divSearchGrid.ConfirmDeleteing = true;
        divSearchGrid.InsertionMode = JsGridInsertionMode.Binding;
        divSearchGrid.OnItemInserting = () => { };
        divSearchGrid.OnItemUpdating = () => { };
        divSearchGrid.OnItemDeleting = () => { };
        divSearchGrid.OnRowSelected = () => {
            Display(divSearchGrid.SelectedItem);
            SharedWork.SwitchModes(ScreenModes.Query);
        };
        divSearchGrid.OnRowDoubleClicked = () => {
            Display(divSearchGrid.SelectedItem);
            SharedWork.SwitchModes(ScreenModes.Query);
        }
        divSearchGrid.Columns = [
            {
                title: Resource.App_SystemCode, css: "ColumPadding", name: "SystemCode", itemTemplate: (e): HTMLElement => {
                    let objSys = SYSTEM.filter(x => x.SYSTEM_CODE == e)[0];
                    let txt: HTMLElement = DocumentActions.CreateElement<HTMLElement>("span");
                    return HeaderTemplate(lang == "ar" ? objSys.SYSTEM_DESCA : objSys.SYSTEM_DESCE, txt);
                }
            },
            {
                title: Resource.App_SubSystemCode, css: "ColumPadding", name: "SubSystemCode", itemTemplate: (e): HTMLElement => {
                    let objSys = SubSYSTEM.filter(x => x.SUB_SYSTEM_CODE == e)[0];
                    let txt: HTMLElement = DocumentActions.CreateElement<HTMLElement>("span");
                    return HeaderTemplate(lang == "ar" ? objSys.SUB_SYSTEM_DESCA : objSys.SUB_SYSTEM_DESCE, txt);
                }
            },
            {
                title: Resource.App_SystemPage, css: "ColumPadding", name: "ModuleCode"
            },
            {
                title: Resource.App_SystemControl, css: "ColumPadding", name: "ControlCode"
            },
            {
                title: "ModuleCode", css: "ColumPadding disable hidden", name: "ModuleCode", headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("text", GridInputClassName, " ", " ", "ModuleCode", " ");
                    txt.disabled = true;
                    txt.id = "hd_ModuleCode";
                    return HeaderTemplate("ModuleCode", txt);
                }
            }
        ];
        divSearchGrid.Bind();
    }

    //////////////////////// start Add Column Setting In Grid /////////////////////////
    function AddCustBranchInGrid() {
        flag = true;
        newColumnSetting = new G_SearchFormSetting();
        let hd_DataMember = $('#hd_DataMember'),
            hd_FieldTitleA = $('#hd_FieldTitleA'),
            hd_FieldTitle = $('#hd_FieldTitle'),
            hd_AlternateData = $('#hd_AlternateDataMember'),
            hd_Datatype = $('#hd_Datatype'),
            hd_FieldSequence = $('#hd_FieldSequence'),
            hd_FieldWidth = $('#hd_FieldWidth'),
            hd_IsReadOnly = $('#hd_IsReadOnly'),
            hd_IsSearchable = $('#hd_IsSearchable'),
            ModuleCode = $('#ModuleCode'),
            //hd_SearchFormCode = $('#hd_SearchFormCode'),
            hd_SearchFormSettingID = $('#hd_SearchFormSettingID');

        if (hd_DataMember.val() == null) { MessageBox.Toastr("من فضك ادخل اسم الحفل الموجود في قاعدة البيانات", Resource.Error, ToastrTypes.error); flag = false; return }
        else { newColumnSetting.DataMember = hd_DataMember.val().trim(); newColumnSetting.AlternateDataMember = hd_DataMember.val().trim();}

        if (hd_FieldTitleA.val().trim() == "") { MessageBox.Toastr("من فضك ادخل اسم العمود", Resource.Error, ToastrTypes.error); flag = false; return }
        else { newColumnSetting.FieldTitleA = hd_FieldTitleA.val().trim(); }

        if (flag) {
            newColumnSetting.FieldTitle = hd_FieldTitle.val().trim();
            newColumnSetting.AlternateDataMember = newColumnSetting.DataMember;
            newColumnSetting.Datatype = hd_Datatype.val().trim();
            newColumnSetting.FieldSequence = hd_FieldSequence.val().trim();
            newColumnSetting.FieldWidth = hd_FieldWidth.val().trim();
            newColumnSetting.IsReadOnly = hd_IsReadOnly.is(":checked");
            newColumnSetting.IsSearchable = hd_IsSearchable.is(":checked");
            newColumnSetting.SearchFormCode = ModuleCode.val().trim();

            if ($('#hd_Flag').val().trim() == "u")
                newColumnSetting.StatusFlag = "u";
            else newColumnSetting.StatusFlag = "i";

            if (hd_SearchFormSettingID.val().trim() == "") newColumnSetting.SearchFormSettingID = 0;
            else newColumnSetting.SearchFormSettingID = hd_SearchFormSettingID.val().trim();

            ColumnSetting.unshift(newColumnSetting);
            divColumnSettingGrid.DataSource = ColumnSetting;
            divColumnSettingGrid.Bind();
        }
        return;
    }

    function InitializeSettingGrid() {
        divColumnSettingGrid.ElementName = "divColumnSettingGrid";
        divColumnSettingGrid.PrimaryKey = "SearchFormSettingID";
        divColumnSettingGrid.Editing = true;
        divColumnSettingGrid.Paging = true;
        divColumnSettingGrid.Sorting = true;
        divColumnSettingGrid.PageSize = 10;
        divColumnSettingGrid.ConfirmDeleteing = true;
        divColumnSettingGrid.InsertionMode = JsGridInsertionMode.Binding;
        divColumnSettingGrid.OnItemInserting = () => { };
        divColumnSettingGrid.OnItemUpdating = () => { };
        divColumnSettingGrid.OnItemDeleting = () => { };
        divColumnSettingGrid.Columns = [
            {
                title: "#", name: "btnAddItem", visible: true, width: "55px",
                headerTemplate: (): HTMLElement => {
                    let btn: HTMLButtonElement = DocumentActions.CreateElement<HTMLButtonElement>("button");
                    btn.className = TransparentButton + " editable";
                    btn.type = "button";
                    btn.innerHTML = "<span class='fa fa-plus'></span>";
                    btn.id = "btnAddItemGrid";
                    btn.onclick = (e) => {
                        if (SharedWork.CurrentMode == ScreenModes.Query || SharedWork.CurrentMode == ScreenModes.Start || SharedWork.CurrentMode == ScreenModes.NoData) {
                            WorningMessage("يجب اختيار وضع التعديل اولا ", "Please Select Edit Mode First");
                            return;
                        }
                        AddCustBranchInGrid();
                    };
                    return btn;
                },
                itemTemplate: (s: string, item: G_SearchFormSetting): HTMLButtonElement => {
                    let btn: HTMLButtonElement = DocumentActions.CreateElement<HTMLButtonElement>("button");
                    btn.innerHTML = "<i class='fas fa-times'></i>";
                    btn.className = TransparentButton + "  red_Delete_Cotnrol editable";
                    btn.type = "button";
                    btn.name = ColumnSetting.indexOf(item).toString();
                    btn.id = "btnRemoveItemGrid";
                    btn.onclick = (e) => {
                        let index = Number((e.currentTarget as HTMLButtonElement).name);
                        //IndexOfElemntInJsGrid = index;
                        ColumnSetting[index].StatusFlag = "d";
                        ColumnSetting.push(ColumnSetting[index]);
                        ColumnSetting.splice(index, 1);
                        divColumnSettingGrid.Bind();
                        //debugger
                        //$(e.srcElement).parent().parent().parent().children().each(function (index, element) {
                        //    debugger
                        //    //$(element).addClass('test');
                        //    let newElment = element as HTMLElement;
                        //    newElment.id = 'removed';
                        //    //newElment.style.backgroundColor = "#ffabab";
                        //});
                    };
                    return btn;
                }
            },
            {
                css: JsGridHeaderCenter, width: "55px",
                itemTemplate: (s: string, item: G_SearchFormSetting): HTMLButtonElement => {
                    let btn: HTMLButtonElement = DocumentActions.CreateElement<HTMLButtonElement>("button");
                    btn.innerHTML = "<i class='fa fa-edit'></i>";
                    btn.className = TransparentButton + " " + "emptrainingedit " + "green_edit_control editable";
                    
                    btn.type = "button";
                    
                    btn.name = ColumnSetting.indexOf(item).toString();
                    btn.id = "btnUpdateItemGrid";
                    btn.onclick = (e) => {
                        let index = Number((e.currentTarget as HTMLButtonElement).name);
                        ColumnSetting.splice(index, 1);
                        divColumnSettingGrid.DataSource = ColumnSetting;
                        divColumnSettingGrid.Bind();

                        if (item.FieldTitleA != null) DocumentActions.FillInputText("hd_FieldTitleA", item.FieldTitleA.toString());
                        if (item.FieldTitle != null) DocumentActions.FillInputText("hd_FieldTitle", item.FieldTitle.toString());
                        if (item.DataMember != null) DocumentActions.SelectDrobInGrid("hd_DataMember", item.DataMember.toString());
                        //if (item.AlternateDataMember != null) DocumentActions.SelectDrobInGrid("hd_AlternateDataMember", item.AlternateDataMember.toString());
                        if (item.Datatype != null) DocumentActions.FillInputText("hd_Datatype", item.Datatype.toString());
                        if (item.FieldSequence != null) DocumentActions.FillInputText("hd_FieldSequence", item.FieldSequence.toString());
                        if (item.FieldWidth != null) DocumentActions.FillInputText("hd_FieldWidth", item.FieldWidth.toString());

                        if (item.IsReadOnly != null) DocumentActions.FillInputText("hd_IsReadOnly", item.IsReadOnly.toString());
                        if (item.IsSearchable != null) DocumentActions.FillInputText("hd_IsSearchable", item.IsSearchable.toString());

                        if (item.SearchFormCode != null) DocumentActions.FillInputText("hd_SearchFormCode", item.SearchFormCode.toString());
                        if (item.SearchFormSettingID != null) DocumentActions.FillInputText("hd_SearchFormSettingID", item.SearchFormSettingID.toString());
                        DocumentActions.FillInputText("hd_Flag", "u");
                    };
                    return btn;
                }
            },
            {
                title: Resource.FieldTitleA, css: "ColumPadding", name: "FieldTitleA", width: "155px", headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("text", GridInputClassName, " ", " ", "FieldTitleA", " ");
                    txt.id = "hd_FieldTitleA";
                    return HeaderTemplate(Resource.FieldTitleA, txt);
                }
            },
            {
                title: Resource.FieldTitleE, css: "ColumPadding", name: "FieldTitle", width: "155px", headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("text", GridInputClassName, " ", " ", "FieldTitle", " ");
                    txt.id = "hd_FieldTitle";
                    return HeaderTemplate(Resource.FieldTitleE, txt);
                }
            },
            //{
            //    title: Resource.AlternateDataMember, css: "ColumPadding", name: "AlternateDataMember", headerTemplate: (): HTMLTableElement => {
            //        let txt = CreateDropdownListOneValue(ReturnDataPropertyvalueArr, true);
            //        txt.id = "hd_AlternateDataMember";
            //        return HeaderTemplate(Resource.AlternateDataMember, txt);
            //    }
            //},
            {
                title: Resource.DataMember, css: "ColumPadding", name: "DataMember", width:"170px", headerTemplate: (): HTMLTableElement => {
                    let txt = CreateDropdownListOneValue(ReturnDataPropertyvalueArr, true, "hd_DataMember");
                    DocumentActions.ConvertToSelect2("hd_DataMember");
                    return HeaderTemplate(Resource.ReturnDataPropertyName, txt);
                }
            },
            {
                title: Resource.Datatype, css: "ColumPadding", name: "Datatype", headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("number", GridInputClassName, " ", " ", "Datatype", " ");
                    txt.id = "hd_Datatype";
                    return HeaderTemplate(Resource.Datatype, txt);
                }
            },
            {
                title: Resource.FieldSequence, css: "ColumPadding", name: "FieldSequence", headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("number", GridInputClassName, " ", " ", "FieldSequence", " ");
                    txt.id = "hd_FieldSequence";
                    return HeaderTemplate(Resource.FieldSequence, txt);
                }
            },
            {
                title: Resource.FieldWidth, css: "ColumPadding", name: "FieldWidth", headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("number", GridInputClassName, " ", " ", "FieldWidth", " ");
                    txt.id = "hd_FieldWidth";
                    return HeaderTemplate(Resource.FieldWidth, txt);
                }
            },
            {
                title: Resource.IsReadOnly, css: "ColumPadding", name: "IsReadOnly", width:"145px",
                headerTemplate: (): string => {
                    return DocumentActions.BuildAwesomeCheckBox("hd_IsReadOnly", null, Resource.IsReadOnly);
                },
                itemTemplate: (e): string => {
                    return DocumentActions.BuildAwesomeCheckBox("hd_IsReadOnly", e, "");
                },
            },
            {
                title: Resource.IsSearchable, css: "ColumPadding", name: "IsSearchable", width: "145px",
                headerTemplate: (): string => {
                    return DocumentActions.BuildAwesomeCheckBox("hd_IsSearchable", null, Resource.IsSearchable);
                },
                itemTemplate: (e): string => {
                    return DocumentActions.BuildAwesomeCheckBox("hd_IsSearchable", e, "");
                },
            },
            {
                title: "Flag", css: "ColumPadding hide", name: "Flag",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("text", GridInputClassName, " ", " ", "Flag", " ");
                    txt.disabled = false;
                    txt.id = "hd_Flag";
                    return HeaderTemplate("Flag", txt);
                }
            },
            {
                title: "SearchFormCode", css: "ColumPadding hide", name: "SearchFormCode",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("text", GridInputClassName, " ", " ", "SearchFormCode", " ");
                    txt.disabled = false;
                    txt.id = "hd_SearchFormCode";
                    return HeaderTemplate("SearchFormCode", txt);
                }
            },
            {
                title: "SearchFormSettingID", css: "ColumPadding hide", name: "SearchFormSettingID",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("text", GridInputClassName, " ", " ", "SearchFormSettingID", " ");
                    txt.disabled = false;
                    txt.id = "hd_SearchFormSettingID";
                    return HeaderTemplate("SearchFormSettingID", txt);
                }
            },
        ];
        divColumnSettingGrid.Bind();
    }
    //////////////////////// End Add Column Setting  In Grid /////////////////////////

    export function Navigate() {
        Model = Models[SharedWork.PageIndex - 1];
        ObjectId = Model.ModuleCode;
        if (Model != null) {
            Display(Model);
        }
    }

    function btnAdd_onclick() {
        ClearGrids();
        StatusFlag = 'i';
        RemoveDisabled(true);
        $('select option:first-child').val('null').prop("selected", true).prop("disabled", true);
        DocumentActions.GetElementByName("ControlCode").disabled = true;
    }

    function RemoveDisabled(clear: boolean) {
        DocumentActions.allElements(false, clear, Model);
        DocumentActions.allElements(false, clear, Setting);
    }

    function Undo() {
        Disabled(false);
        Success = false;
        if (ObjectId != null) {
            Model = Models.filter(x => x.SearchFormCode == ObjectId)[0];
            Display(Model)
        }
    }

    function Disabled(clear: boolean) {
        DocumentActions.allElements(true, clear, Model);
        DocumentActions.allElements(true, clear, Setting);
    }

    function btnEdit_onclick() {
        if (ObjectId == "") {
            MessageBox.Toastr(Resource.PleaseSelectItem, Resource.Error, ToastrTypes.warning);
            //MessageBox.Show(Resource.PleaseSelectItem, Resource.Error);
        }
        else {
            RemoveDisabled(false);
            element = DocumentActions.GetElementByName("ModuleCode");
            element.disabled = true;
            DocumentActions.GetElementByName("ControlCode").disabled = true;
            StatusFlag = 'u';
        }
    }

    function btnsave_onClick() {
        if (!ValidationHeader()) return
        Save();
    }

    function ValidationHeader() {
        if (DocumentActions.GetElementByName("ModuleCode").value == "") {
            MessageBox.Toastr("من فضلك ادخل كود البحث", Resource.Error, ToastrTypes.error);
            return false
        }
        else if (DocumentActions.GetElementByName("SystemCode").value == "") {
            MessageBox.Toastr("من فضلك ادخل كود النظام", Resource.Error, ToastrTypes.error);
            return false
        }
        else if (DocumentActions.GetElementByName("SubSystemCode").value == "") {
            MessageBox.Toastr("من فضلك ادخل كود النظام الفرعي", Resource.Error, ToastrTypes.error);
            return false
        }
        else if (DocumentActions.GetElementByName("ControlCode").value == "") {
            MessageBox.Toastr("من فضلك ادخل كود الكنترول (id)", Resource.Error, ToastrTypes.error);
            return false
        }
        return true;
    }

    function Save() {
        if (DocumentActions.CheckCode(Models, DocumentActions.GetElementByName("ModuleCode").value, "ModuleCode") == false && StatusFlag == "i") {
            MessageBox.Toastr(Resource.CustomerCodeCannotDuplicated, Resource.Error, ToastrTypes.error);
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

    function Assign() {
        MasterDetails = new MasterDetailsSearch();
        Model = DocumentActions.AssignToModel<G_SearchFormModule>(Model);
        Model.SearchFormCode = Model.ModuleCode;
        Setting = DocumentActions.AssignToModel<G_SearchForm>(Setting);
        MasterDetails.ColumnSetting = ColumnSetting;
        MasterDetails.module = Model;
        MasterDetails.settings = Setting;

        if (StatusFlag == "i") 
            Insert();

        if (StatusFlag == "u") {
            Model.ModuleCode = ObjectId;
            Update();
        }

        ObjectId = Model.ModuleCode;
        GetAll();
        return true;
    }

    function Insert() {
        $("#MessageBoxDialog").modal("hide");
        Ajax.Callsync({
            type: "POST",
            url: sys.apiUrl("SySearch", "Insert"),
            data: JSON.stringify(MasterDetails),
            success: (Response) => {
                let result = Response as BaseResponse;
                if (result.IsSuccess) {
                    Model = result.Response as G_SearchFormModule;
                    ObjectId = Model.ModuleCode;
                    Success = true;
                    MessageBox.Toastr(Resource.SavedSucc, "", ToastrTypes.success);
                }
                else {
                    MessageBox.Toastr(Resource.ErrorSave, Resource.Error, ToastrTypes.error);
                    Success = false;
                }
            }
        });
    }

    function Update() {
        $("#MessageBoxDialog").modal("hide");
        Ajax.Callsync({
            type: "POST",
            url: sys.apiUrl("SySearch", "Update"),
            data: JSON.stringify(MasterDetails),
            success: (Response) => {
                let result = Response as BaseResponse;
                if (result.IsSuccess) {
                    Model = result.Response as G_SearchFormModule
                    ObjectId = Model.ModuleCode;
                    Success = true;
                    MessageBox.Toastr(Resource.SavedSucc, "", ToastrTypes.success);
                }
                else {
                    MessageBox.Toastr(Resource.ErrorSave, Resource.Error, ToastrTypes.error);
                    Success = false;
                }
            }
        });
    }

    function btnDelete_onclick() {
        StatusFlag == "d";
        if (ObjectId == "") {
            MessageBox.Toastr(Resource.PleaseSelectItem, Resource.Error, ToastrTypes.error);
        }
        else {
            if (hasNodes) {
                MessageBox.Toastr(Resource.CannotDeleteHasChildren, Resource.Error, ToastrTypes.error);
            }
            else {
                Delete();
            }
        }
    }

    function Delete() {
        $("#MessageBoxDialog").modal("hide");
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("SySearch", "Delete"),
            data: { code: ObjectId},
            success: (result) => {
                if (result) {
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

    function btnSearch_onclick() {
        let sys: SystemTools = new SystemTools();
        sys.FindKey(Modules.Search, SharedButtons.btnSearch.id, "", () => {
            let id = SearchGrid.SearchDataGrid.SelectedKey;
            if (!IsNullOrEmpty(id)) {
                Display(GetModel(id));
            }
        });
    }

    function GetModel(code: string) {
        Model = Models.filter(x => x.ModuleCode == code)[0];
        return Model;
    }

    function Refrash() {
        ClearGrids();
        GetAll();
        Display(GetModel(ObjectId));
    }

    function ClearGrids() {
        ClearBranchesGrid();
        ColumnSetting = new Array<G_SearchFormSetting>();
    }

    function ClearBranchesGrid() {
        var ClrColumnSetting = new Array<CustomCusromerUsers>();
        divColumnSettingGrid.DataSource = ClrColumnSetting;
        divColumnSettingGrid.Bind();
    }

    function FillDrobDownList_InSearchWindowTap() {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("SystemTools", "GetModulesCode"),
            success: (result) => {
                if (result != null) {
                    if (result.length > 0) {
                        DocumentActions.FillCombowithdefultListOneValue(result, ModuleCode, result, result, Resource.App_SystemPage);
                    }
                }
                else {
                    MessageBox.Toastr(Resource.Error, Resource.Error, ToastrTypes.error);
                }
            }
        });

        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("SystemTools", "GetTablesName"),
            success: (result) => {
                if (result != null) {
                    if (result.length > 0) {
                        DocumentActions.FillCombowithdefultListOneValue(result, DataSourceName, result, result, Resource.DataSourceName);
                    }
                }
                else {
                    MessageBox.Toastr(Resource.Error, Resource.Error, ToastrTypes.error);
                }
            }
        });

        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("funcationShared", "GetSystems"),
            success: (Response) => {
                let result = Response as BaseResponse;
                if (result.IsSuccess) {
                    SYSTEM = result.Response as Array<G_SYSTEM>
                    DocumentActions.FillCombowithdefult(SYSTEM, SystemCode, "SYSTEM_CODE", (lang == "ar" ? "SYSTEM_DESCA" : "SYSTEM_DESCE"), Resource.App_SystemCode);
                }
                else 
                    MessageBox.Toastr(Resource.Error, Resource.Error, ToastrTypes.error);
            }
        });

        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("funcationShared", "GetSubSystems"),
            success: (Response) => {
                let result = Response as BaseResponse;
                if (result.IsSuccess) {
                    SubSYSTEM = result.Response as Array<G_SUB_SYSTEMS>
                    DocumentActions.FillCombowithdefult(SubSYSTEM, SubSystemCode, "SUB_SYSTEM_CODE", (lang == "ar" ? "SUB_SYSTEM_DESCA" : "SUB_SYSTEM_DESCE"), Resource.App_SubSystemCode);
                }
                else 
                    MessageBox.Toastr(Resource.Error, Resource.Error, ToastrTypes.error);
            }
        });

        $('#searchWindow select option:first-child').attr("disabled", "disabled");
    }

    $('#ModuleCode').on("change", function () {
        $('#ControlCode').val("btn" + $(this).val() + "Search");
    });

    function GetReturnDataPropertyName() {
        let tableName = DataSourceName.value;
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("SystemTools", "GetColumnName"),
            data: { tableName: tableName},
            success: (result) => {
                ReturnDataPropertyvalueArr = result;
                if (result != null) {
                    if (result.length > 0) {
                        DocumentActions.FillCombowithdefultListOneValue(result, ReturnDataPropertyName, result, result, Resource.ReturnDataPropertyName);
                        divColumnSettingGrid.Bind();
                        //DocumentActions.FillCombowithdefultListOneValue(result, ReturnDataPropertyName, result, result, Resource.ReturnDataPropertyName);
                        if (ReturnDataPropertyName != null)
                            ReturnDataPropertyName.value = ReturnDataPropertyValue;
                    }
                }
                else {
                    MessageBox.Toastr(Resource.Error, Resource.Error, ToastrTypes.error);
                }
            }
        });
    }
}
