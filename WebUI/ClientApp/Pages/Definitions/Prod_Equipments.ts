$(document).ready(() => {
    SharedButtons.OnLoad();
    ProdEquipments.InitalizeComponent();
})

namespace ProdEquipments  {
    $('#headertop1').addClass('display_none');
    $('#headertop2').removeClass('display_none');

    let Resource: any = GetResourceList("");
    var Expensess: Array<Prod_Equipments> = new Array<Prod_Equipments>();
    const GridInputClassName = "form-control gridIput";
    $('#headerTitle').text(Resource.Prod_Equipments);

    var sys: SystemTools = new SystemTools();
    var divProd_EquipmentsGrid: JsGrid = new JsGrid();
    var SysSession: SystemSession = GetSystemSession();
    let compCode = SysSession.CurrentEnvironment.CompCode;
    let UserCode = SysSession.CurrentEnvironment.UserCode;
    let Token = "HGFD-" + SysSession.CurrentEnvironment.Token;

    var AllTermsIds: Array<Prod_Equipments> = new Array<Prod_Equipments>();
    var Model: Prod_Equipments = new Prod_Equipments();
    //////////////// Details ///////////////////
    var AccountChart: Array<Cal_AccountChart> = new Array<Cal_AccountChart>();
    var language = sys.SysSession.CurrentEnvironment.ScreenLanguage;

    var StandardMonthlyCost: HTMLInputElement;
    var StandardHolyDays: HTMLInputElement;
    var StandardDailyCost: HTMLInputElement;
    var StandardDailyWorkHours: HTMLInputElement;
    var StandardHourlyCost: HTMLInputElement;
    var NumberAvailable: HTMLInputElement;
    var AccountId: HTMLSelectElement;
    // select Options
    var element: HTMLInputElement;

    var ObjectId = 0;
    var StatusFlag;
    var Success;
    var flag: boolean = true;

    export function InitalizeComponent() {
        localStorage.setItem("TableName", "Prod_Equipments");

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
        InitializeGrid();
        GetAll();
    }

    function InitalizeControls() {
        SharedButtons.btnSearch = document.getElementById("btnProd_EquipmentsSearch") as HTMLButtonElement;
        AccountId = document.getElementById("AccountId") as HTMLSelectElement;

        StandardMonthlyCost = document.getElementById("StandardMonthlyCost") as HTMLInputElement;
        StandardHolyDays = document.getElementById("StandardHolyDays") as HTMLInputElement;
        StandardDailyWorkHours = document.getElementById("StandardDailyWorkHours") as HTMLInputElement;
        StandardDailyCost = document.getElementById("StandardDailyCost") as HTMLInputElement;
        StandardHourlyCost = document.getElementById("StandardHourlyCost") as HTMLInputElement;

    }

    function InitalizeEvents() {
        SharedButtons.btnSearch.onclick = btnSearch_onclick;
        SharedButtons.btnRefrash2.onclick = Refrash;

        StandardMonthlyCost.onchange = CalculationSalary;
        StandardHolyDays.onchange = CalculationSalary;
        StandardDailyWorkHours.onchange = CalculationSalary;
        StandardDailyCost.onchange = CalculationSalary;
        StandardHourlyCost.onchange = CalculationSalary;
    }

    function GetAll() {
        Disabled(false);
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("Prod_Equipments", "GetAll"),
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess) {
                    AllTermsIds = result.Response as Array<Prod_Equipments>;
                    divProd_EquipmentsGrid.DataSource = AllTermsIds;
                    divProd_EquipmentsGrid.Bind();
                }
            }
        });
    }

    function GetByID(Id: number) {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("Prod_Equipments", "GetById"),
            data: { id: Id },
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess) {
                    let res = result.Response as Prod_Equipments;
                    Display(res);
                }
                else
                    MessageBox.Toastr(Resource.Error, Resource.Error, ToastrTypes.error);
            }
        });
    }

    function Assign() {
        Model = DocumentActions.AssignToModel<Prod_Equipments>(Model);
        Model.IsScale = Model.IsScale? 1 : 0;

        if (StatusFlag == "i") {
            Model.CreatedAt = DateTimeFormat(Date().toString());
            Model.CreatedBy = SysSession.CurrentEnvironment.UserCode;
            Insert();
        }
        if (StatusFlag == "u") {
            Model.EquipId = ObjectId;
            Model.UpdateAt = DateTimeFormat(Date().toString());
            Model.UpdateBy = SysSession.CurrentEnvironment.UserCode;
            Update();
        }
        ObjectId = Model.EquipId;
        GetAll();
        return true;
    }

    function Save() {
        if (DocumentActions.CheckCode(AllTermsIds, DocumentActions.GetElementByName("EquipCode").value, "EquipCode") == false && StatusFlag == "i") {
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
            url: sys.apiUrl("Prod_Equipments", "Insert"),
            data: JSON.stringify(Model),
            success: (Response) => {
                let result = Response as BaseResponse;
                if (result.IsSuccess) {
                    Model = result.Response as Prod_Equipments;
                    ObjectId = Model.EquipId;
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
            url: sys.apiUrl("Prod_Equipments", "Update"),
            data: JSON.stringify(Model),
            success: (Response) => {
                let result = Response as BaseResponse;
                if (result.IsSuccess) {
                    Model = result.Response as Prod_Equipments;
                    ObjectId = Model.EquipId;
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
            url: sys.apiUrl("Prod_Equipments", "Delete"),
            data: { id: Model.EquipId},
            success: (result) => {
                if (result) {
                    Success = true;
                    ObjectId = 0;
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
            element = DocumentActions.GetElementByName("EquipCode");
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
        if (DocumentActions.GetElementByName("EquipCode").value == "") {
            MessageBox.Toastr(Resource.PleaseEnterCode, Resource.Error, ToastrTypes.error);
            flag = false
        }
        else if (DocumentActions.GetElementByName("EquipName1").value == "") {
            MessageBox.Toastr(Resource.PleaseEnterNameArabic, Resource.Error, ToastrTypes.error);
            flag = false
        }
        else if (DocumentActions.GetElementByName("StandardMonthlyCost").value == "") {
            MessageBox.Toastr(Resource.PleaseEnterStandardMonthlyCost, Resource.Error, ToastrTypes.error);
            flag = false
        } else if (DocumentActions.GetElementByName("StandardHolyDays").value == "") {
            MessageBox.Toastr(Resource.PleaseEnterStandardHolyDays, Resource.Error, ToastrTypes.error);
            flag = false
        } else if (DocumentActions.GetElementByName("StandardDailyCost").value == "") {
            MessageBox.Toastr(Resource.PleaseEnterStandardDailyCost, Resource.Error, ToastrTypes.error);
            flag = false
        } else if (DocumentActions.GetElementByName("StandardDailyWorkHours").value == "") {
            MessageBox.Toastr(Resource.PleaseEnterStandardDailyWorkHours, Resource.Error, ToastrTypes.error);
            flag = false
        } else if (DocumentActions.GetElementByName("StandardHourlyCost").value == "") {
            MessageBox.Toastr(Resource.PleaseEnterStandardHourlyCost, Resource.Error, ToastrTypes.error);
            flag = false
        } else if (DocumentActions.GetElementByName("NumberAvailable").value == "") {
            MessageBox.Toastr(Resource.PleaseEnterNumberAvailable, Resource.Error, ToastrTypes.error);
            flag = false
        }
        else
            flag = true;

        return flag;
    }

    export function Navigate() {
        Model = AllTermsIds[SharedWork.PageIndex - 1];
        ObjectId = Model.EquipId;
        GetByID(ObjectId);
    }

    function Display(model: Prod_Equipments) {
        Model = model;
        DocumentActions.RenderFromModel(Model);
        ObjectId = Number(Model.EquipId);
        SharedWork.SwitchModes(ScreenModes.Query);
    }

    function Undo() {
        Disabled(false);
        Success = false;
        if (ObjectId != 0) {
            GetByID(ObjectId);
        }
    }

    function Disabled(clear: boolean) {
        DocumentActions.allElements(true, clear, Model);
    }

    function RemoveDisabled(clear: boolean) {
        DocumentActions.allElements(false, clear, Model);
    }

    function GetModel(id: number) {
        Model = AllTermsIds.filter(x => x.EquipId == id)[0];
        return Model;
    }
   
    function btnSearch_onclick() {
        let sys: SystemTools = new SystemTools();
        sys.FindKey(Modules.Prod_Equipments, SharedButtons.btnSearch.id, "", () => {
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

    function InitializeGrid() {
        divProd_EquipmentsGrid.ElementName = "divProd_EquipmentsGrid";
        divProd_EquipmentsGrid.PrimaryKey = "EquipId";
        divProd_EquipmentsGrid.Editing = true;
        divProd_EquipmentsGrid.Paging = true;
        divProd_EquipmentsGrid.Sorting = true;
        divProd_EquipmentsGrid.PageSize = 10;
        divProd_EquipmentsGrid.ConfirmDeleteing = true;
        divProd_EquipmentsGrid.InsertionMode = JsGridInsertionMode.Binding;
        divProd_EquipmentsGrid.OnRowSelected = () => {
            GetByID(divProd_EquipmentsGrid.SelectedItem.EquipId);
        };
        divProd_EquipmentsGrid.Columns = [
            {
                title: Resource.Code, css: "ColumPadding", name: "EquipCode"
            },
            {
                title: Resource.Name_Arabic, css: "ColumPadding", name: "EquipName1"
            },
            {
                title: Resource.Name_English, css: "ColumPadding", name: "EquipName2"
            },
            {
                title: Resource.App_desc, css: "ColumPadding", name: "JDesc"
            },
            {
                title: Resource.StandardMonthlyCost, css: "ColumPadding", name: "StandardMonthlyCost"
            },
            {
                title: Resource.StandardHolyDays, css: "ColumPadding", name: "StandardHolyDays"
            }, {
                title: Resource.StandardDailyCost, css: "ColumPadding", name: "StandardDailyCost"
            }, {
                title: Resource.StandardDailyWorkHours, css: "ColumPadding", name: "StandardDailyWorkHours"
            }, {
                title: Resource.StandardHourlyCost, css: "ColumPadding", name: "StandardHourlyCost"
            }, {
                title: Resource.NumberAvailable, css: "ColumPadding", name: "NumberAvailable"
            },
            {
                title: Resource.Notes, css: "ColumPadding", name: "Remarks"
            },
            {
                title: "EquipId", css: "ColumPadding disable hidden", name: "EquipId", width: "1%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("text", GridInputClassName, " ", " ", "EquipId", " ");
                    txt.disabled = true;
                    txt.id = "hd_EquipId";
                    return HeaderTemplate("EquipId", txt);
                }
            }
        ];
        divProd_EquipmentsGrid.Bind();
    }

    function GetAllAccountChart() {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("funcationShared", "GetAllSubAccountChart"),
            success: (Response) => {
                let result = Response as BaseResponse;
                if (result.IsSuccess) {
                    AccountChart = result.Response as Array<Cal_AccountChart>;
                    DocumentActions.FillCombowithCode(AccountChart, AccountId, "AccountId", (language == "ar" ? "AccountNameA" : "AccountNameE"), "AccountCode", Resource.Account2);
                }
            }
        });
        return AccountChart;
    }

    function CalculationSalary() {
        StandardDailyCost.value = (Number(StandardMonthlyCost.value) / (30 - Number(StandardHolyDays.value))).toFixed(2).toString();
        StandardHourlyCost.value = (Number(StandardDailyCost.value) / Number(StandardDailyWorkHours.value == "" ? "1" : StandardDailyWorkHours.value)).toFixed(2).toString();
    }
}
