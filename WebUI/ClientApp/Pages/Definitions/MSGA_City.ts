$(document).ready(() => {
    SharedButtons.OnLoad();
    MSGACity.InitalizeComponent();
    $('#headertop1').addClass('display_none');
    $('#headertop2').removeClass('display_none');
});

namespace MSGACity {
    var sys: SystemTools = new SystemTools();
    var SysSession: SystemSession = GetSystemSession();
    let Resource: any = GetResourceList("");
    var element: HTMLInputElement;
    $('#headerTitle').text(Resource.Cities);

    var Cities: Array<MSGA_City> = new Array<MSGA_City>();
    var Model: MSGA_City = new MSGA_City();

    var StatusFlag;
    var Success;
    var ObjectId = 0;

    var divCitiesGrid: JsGrid = new JsGrid();
    const GridInputClassName = "form-control gridIput";
    export function InitalizeComponent() {
        SharedButtons.compcode = Number(SysSession.CurrentEnvironment.CompCode);
        localStorage.setItem("TableName", "MSGA_City");

        NavigateModule.InitalizeComponent();
        SharedWork.OnNavigate = Navigate;
        SharedButtons.AddAction(() => {
            btnAdd_onclick();
        });

        SharedButtons.DeleteAction(() => { btnDelete_onClick(); });

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
    }

    function InitalizeControls() {
        SharedButtons.btnSearch = document.getElementById("btnMSGA_CitySearch") as HTMLButtonElement;
    }

    function InitalizeEvents() {
        SharedButtons.btnSearch.onclick = btnSearch_onclick;
        SharedButtons.btnRefrash2.onclick = Refrash;
    }

    function GetAll() {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("MSGA_City", "GetAll"),
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess) {
                    Cities = result.Response as Array<MSGA_City>;
                    divCitiesGrid.DataSource = Cities;
                    divCitiesGrid.Bind();
                }
            }
        });
    }

    function InitializeGrid() {
        divCitiesGrid.ElementName = "divCitiesGrid";
        divCitiesGrid.PrimaryKey = "CityID";
        divCitiesGrid.Editing = true;
        divCitiesGrid.Paging = true;
        divCitiesGrid.Sorting = true;
        divCitiesGrid.PageSize = 10;
        divCitiesGrid.ConfirmDeleteing = true;
        divCitiesGrid.InsertionMode = JsGridInsertionMode.Binding;
        divCitiesGrid.OnRowSelected = () => {
            //GetDataRow();
            Display(divCitiesGrid.SelectedItem);
            SharedWork.SwitchModes(ScreenModes.Query);
        };
        divCitiesGrid.OnRowDoubleClicked = () => {
            //GetDataRow();
            Display(divCitiesGrid.SelectedItem);
            SharedWork.SwitchModes(ScreenModes.Query);
        }
        divCitiesGrid.Columns = [
            {
                title: Resource.Code, css: "ColumPadding", name: "CityCode"
            },
            {
                title: Resource.City, css: "ColumPadding", name: "CityName"
            },
            {
                title: Resource.Notes, css: "ColumPadding", name: "Remarks"
            },
            {
                title: "CityID", css: "ColumPadding disable hidden", name: "CityID", width: "1%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("text", GridInputClassName, " ", " ", "CityID", " ");
                    txt.disabled = true;
                    txt.id = "hd_CityID";
                    return HeaderTemplate("CityID", txt);
                }
            }
        ];
        divCitiesGrid.Bind();
    }

    function GetByID(Id) {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("MSGA_City", "GetById"),
            data: { id: Id },
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess) {
                    Model = result.Response as MSGA_City;
                    Display(Model);
                    SharedWork.SwitchModes(ScreenModes.Query);
                }
                else
                    MessageBox.Show(Resource.Error, Resource.Error);
            }
        });
    }

    function Display(model: MSGA_City) {
        DocumentActions.RenderFromModel(model);
        ObjectId = Number(model.CityID);
        Model = model;
    }

    function Navigate() {
        Model = Cities[SharedWork.PageIndex - 1];
        GetByID(Model.CityID);
    }

    function btnAdd_onclick() {
        StatusFlag = 'i';
        RemoveDisabled(true);
        $('select option:first-child').val('null').prop("selected", true).prop("disabled", true);
    }

    function btnEdit_onclick() {
        if (ObjectId == 0) {
            MessageBox.Show(Resource.PleaseSelectItem, Resource.Error);
        }
        else {
            RemoveDisabled(false);
            element = DocumentActions.GetElementByName("CityCode");
            element.disabled = true;
            StatusFlag = 'u';
        }
    }

    function btnsave_onClick() {
        if (!ValidationHeader()) return
        Save();
    }

    function btnDelete_onClick() {
        Delete()
    }

    function ValidationHeader() {
        if (DocumentActions.GetElementByName("CityCode").value == "") {
            MessageBox.Show(Resource.PleaseEnterCustomerCode, Resource.Error);
            return false
        }
        else if (DocumentActions.CheckCode(Cities, DocumentActions.GetElementByName("CityCode").value, "CityCode") == false && StatusFlag == "i") {
            MessageBox.Show(Resource.CustomerCodeCannotDuplicated, Resource.Error);
        }
        else if (DocumentActions.GetElementByName("CityName").value == "") {
            MessageBox.Show(Resource.PleaseEnterNameArabic, Resource.Error);
            return false
        }
        else
            return true;
    }

    function RemoveDisabled(clear: boolean) {
        DocumentActions.allElements(false, clear, Model);
        $('#left').addClass("disabledDiv");
    }

    function Disabled(clear: boolean) {
        DocumentActions.allElements(true, clear, Model);
        $('#left').removeClass("disabledDiv");
    }

    function Undo() {
        Disabled(false);
        Success = false;
    }

    function Assign() {
        Model = DocumentActions.AssignToModel<MSGA_City>(Model);
        if (StatusFlag == "i") {
            Model.CreatedAt = DateTimeFormat(Date().toString());
            Model.CreatedBy = SysSession.CurrentEnvironment.UserCode;
            Insert();
        }
        if (StatusFlag == "u") {
            Model.CityID = ObjectId;
            Model.UpdateAt = DateTimeFormat(Date().toString());
            Model.UpdateBy = SysSession.CurrentEnvironment.UserCode;
            Update();
        }

        ObjectId = Model.CityID;
        GetAll();
        return true;
    }

    function Insert() {
        $("#MessageBoxDialog").modal("hide");
        Ajax.Callsync({
            type: "POST",
            url: sys.apiUrl("MSGA_City", "Insert"),
            data: JSON.stringify(Model),
            success: (Response) => {
                let result = Response as BaseResponse;
                if (result.IsSuccess) {
                    Model = result.Response as MSGA_City;
                    ObjectId = Model.CityID;
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
            url: sys.apiUrl("MSGA_City", "Update"),
            data: JSON.stringify(Model),
            success: (Response) => {
                let result = Response as BaseResponse;
                if (result.IsSuccess) {
                    Model = result.Response as MSGA_City;
                    ObjectId = Model.CityID;
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
            url: sys.apiUrl("MSGA_City", "Delete") + "/" + ObjectId,
            success: (result) => {
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
        let sys: SystemTools = new SystemTools();
        sys.FindKey(Modules.MSGA_City, SharedButtons.btnSearch.id, "", () => {
            if (Model.CityCode != null) {
                Display(Model);
            }
        });
    }

    function Refrash() {
        GetAll();
        GetByID(Model.CityID);
    }
}
