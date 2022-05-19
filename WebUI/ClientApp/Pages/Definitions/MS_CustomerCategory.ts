$(document).ready(() => {
    SharedButtons.OnLoad();
    MSCustomerCategory.InitalizeComponent();
    $('#headertop1').addClass('display_none');
    $('#headertop2').removeClass('display_none');
})
namespace MSCustomerCategory {
    var sys: SystemTools = new SystemTools();
    var SysSession: SystemSession = GetSystemSession();
    let Resource: any = GetResourceList("");
    $('#headerTitle').text(Resource.CustomerCategories);

    var CustomerCategories = new Array<MS_CustomerCategory>();
    var Model = new MS_CustomerCategory();

    var element: HTMLInputElement;
    var StatusFlag;
    var Success;
    var hasNodes: boolean;
    var ObjectId = 0;
    var divCustomerCategoryGrid: JsGrid = new JsGrid();
    const GridInputClassName = "form-control gridIput";

    export function InitalizeComponent() {
        localStorage.setItem("TableName", "MS_CustomerCategory");
        NavigateModule.InitalizeComponent();
        SharedButtons.compcode = Number(SysSession.CurrentEnvironment.CompCode);
        SharedWork.OnNavigate = Navigate;

        SharedButtons.AddAction(() => { btnAdd_onclick(); });

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
        InitializeGrid();
        GetAll();
    }

    function InitalizeControls() {
        SharedButtons.btnSearch = document.getElementById("btnMS_CustomerCategorySearch") as HTMLButtonElement;
    }

    function InitalizeEvents() {
        SharedButtons.btnSearch.onclick = btnSearch_onclick;
        SharedButtons.btnRefrash2.onclick = Refrash;
    }

    function Navigate() {
        Model = CustomerCategories[SharedWork.PageIndex - 1];
        GetByID(Model.CustomerCatId);
    }

    function GetByID(id: number) {
        Model = CustomerCategories.filter(x => x.CustomerCatId == id)[0];
        Display(Model);
    }

    function GetAll() {
        Disabled(false);
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("MS_CustomerCategory", "GetAll"),
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess) {
                    CustomerCategories = result.Response as Array<MS_CustomerCategory>;
                    divCustomerCategoryGrid.DataSource = CustomerCategories;
                    divCustomerCategoryGrid.Bind();
                }
                else
                    MessageBox.Show(Resource.Error, Resource.Error);
            }
        });
    }

    function InitializeGrid() {
        divCustomerCategoryGrid.ElementName = "divCustomerCategoryGrid";
        divCustomerCategoryGrid.PrimaryKey = "CustomerCatId";
        divCustomerCategoryGrid.Inserting = true;
        divCustomerCategoryGrid.Editing = true;
        divCustomerCategoryGrid.ConfirmDeleteing = true;
        divCustomerCategoryGrid.InsertionMode = JsGridInsertionMode.Binding;
        divCustomerCategoryGrid.OnItemInserting = () => { };
        divCustomerCategoryGrid.OnItemUpdating = () => { };
        divCustomerCategoryGrid.OnItemDeleting = () => { };
        divCustomerCategoryGrid.OnRowSelected = () => {
            SharedWork.SwitchModes(ScreenModes.Query);
            Display(divCustomerCategoryGrid.SelectedItem);
        };
        divCustomerCategoryGrid.OnRowDoubleClicked = () => {
            SharedWork.SwitchModes(ScreenModes.Query);
            Display(divCustomerCategoryGrid.SelectedItem);
        }
        divCustomerCategoryGrid.Columns = [
            {
                title: Resource.Code, css: "ColumPadding", name: "CatCode"
            },
            {
                title: Resource.Name_Arabic, css: "ColumPadding", name: "CatDescA"
            },
            {
                title: Resource.Name_English, css: "ColumPadding", name: "CatDescE"
            },
            {
                title: Resource.Notes, css: "ColumPadding", name: "Remarks"
            },
            {
                title: "CustomerCatId", css: "ColumPadding disable hidden", name: "CustomerCatId", width: "1%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("text", GridInputClassName, " ", " ", "CustomerCatId", " ");
                    txt.disabled = true;
                    txt.id = "hd_CustomerCatId";
                    return HeaderTemplate("CustomerCatId", txt);
                }
            }
        ];
        divCustomerCategoryGrid.Bind();
    }

    function Display(model: MS_CustomerCategory) {
        Model = model;
        DocumentActions.RenderFromModel(model);
        ObjectId = Number(Model.CustomerCatId);
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
            element = DocumentActions.GetElementByName("CatCode");
            element.disabled = true;
            StatusFlag = 'u';
        }
    }

    function btnsave_onClick() {
        debugger
        if (!ValidationHeader()) return;
        Save();
    }

    function btnDelete_onClick() {
        if (!hasNodes)
            Delete()
        else
            MessageBox.Show(" لا يمكنك الحذف لانه لديه ابناء", Resource.Error);
    }

    function ValidationHeader() {
        if (DocumentActions.GetElementByName("CatCode").value == "") {
            MessageBox.Show(Resource.PleaseEnterCustomerCode, Resource.Error);
            return false
        }
        else if (DocumentActions.CheckCode(CustomerCategories, DocumentActions.GetElementByName("CatCode").value, "CatCode") == false && StatusFlag == "i") {
            MessageBox.Show(Resource.CustomerCodeCannotDuplicated, Resource.Error);
        }
        else if (DocumentActions.GetElementByName("CatDescA").value == "") {
            MessageBox.Show(Resource.PleaseEnterNameArabic, Resource.Error);
            return false
        }
        else
            return true;
    }

    function RemoveDisabled(clear: boolean) {
        DocumentActions.allElements(false, clear, Model);
    }

    function Disabled(clear: boolean) {
        DocumentActions.allElements(true, clear, Model);
    }

    function Undo() {
        if (Model != null) {
            Display(Model);
        }
        Disabled(false);
        Success = false;
    }

    function Assign() {
        Model = DocumentActions.AssignToModel<MS_CustomerCategory>(Model);
        if (StatusFlag == "i") {
            Model.CreatedAt = DateTimeFormat(Date().toString());
            Model.CreatedBy = SysSession.CurrentEnvironment.UserCode;
            Insert();
        }
        if (StatusFlag == "u") {
            Model.CustomerCatId = ObjectId;
            Model.UpdateAt = DateTimeFormat(Date().toString());
            Model.UpdateBy = SysSession.CurrentEnvironment.UserCode;
            Update();
        }

        ObjectId = Model.CustomerCatId;
        GetAll();
        return true;
    }

    function Insert() {
        $("#MessageBoxDialog").modal("hide");
        Ajax.Callsync({
            type: "POST",
            url: sys.apiUrl("MS_CustomerCategory", "Insert"),
            data: JSON.stringify(Model),
            success: (Response) => {
                let result = Response as BaseResponse;
                if (result.IsSuccess) {
                    Model = result.Response as MS_CustomerCategory;
                    ObjectId = Model.CustomerCatId;
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
            url: sys.apiUrl("MS_CustomerCategory", "Update"),
            data: JSON.stringify(Model),
            success: (Response) => {
                let result = Response as BaseResponse;
                if (result.IsSuccess) {
                    Model = result.Response as MS_CustomerCategory;
                    ObjectId = Model.CustomerCatId;
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
            url: sys.apiUrl("MS_CustomerCategory", "Delete") + "/" + ObjectId,
            success: (result) => {
                if (result) {
                    Success = result;
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

    function btnSearch_onclick() {
        let sys: SystemTools = new SystemTools();
        sys.FindKey(Modules.MS_CustomerCategory, SharedButtons.btnSearch.id, "", () => {
            if (Model.CatCode != null) {
                Display(Model);
            }
        });
    }

    function Refrash() {
        GetAll();
        if (Model != null) {
            Display(Model);
        }
    }
}