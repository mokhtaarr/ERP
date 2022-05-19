$(document).ready(() => {
    SharedButtons.OnLoad();
    MSCurrencyCategory.InitalizeComponent();

    $('#headertop1').addClass('display_none');
    $('#headertop2').removeClass('display_none');

})
namespace MSCurrencyCategory {
    var sys: SystemTools = new SystemTools();
    var txt_code: HTMLInputElement;
    var txt_CurrencyCategoryNameA: HTMLInputElement;
    var txt_CurrencyCategoryNameE: HTMLInputElement;
    var txt_Value: HTMLInputElement;
    var txt_RemarksA: HTMLInputElement;
    var currCategoryList = new Array<MS_CurrencyCategory>();
    var id_ul = 'menu-group-1';
    let Resource: any = GetResourceList("");
    $('#headerTitle').text(Resource.CurrencyClasses);

    var divCurrencyCategoryGrid: JsGrid = new JsGrid();
    const GridInputClassName = "form-control gridIput";
    var selectedID = 0;

    export function InitalizeComponent() {

        InitalizeControls();
        InitalizeEvents();

        InitializeGrid();
        GetAll();
        localStorage.setItem("TableName", "MS_CurrencyCategory");
        NavigateModule.InitalizeComponent();

        SharedWork.OnNavigate = Navigate;

        SharedButtons.AddAction(() => {
            clear();
        });

        SharedButtons.DeleteAction(() => {
            Delete();
        });
        SharedButtons.EditAction(() => { });
        SharedButtons.UndoAction(() => {
            Undo();
        });
        SharedButtons.SaveAction(() => {
            if (SharedWork.CurrentMode == ScreenModes.Add) {
                Insert();
            }
            else if (SharedWork.CurrentMode == ScreenModes.Edit) {
                Update();
            }
            else if (SharedWork.CurrentMode == ScreenModes.Query) {
                WorningMessage("يجب اختيار وضع التعديل اولا ", "Please Select Edit Mode First");
                return;
            }
        }
        );
    }

    function InitalizeControls() {
        txt_code = document.getElementById("txt_code") as HTMLInputElement;
        txt_CurrencyCategoryNameA = document.getElementById("txt_CurrencyCategoryNameA") as HTMLInputElement;
        txt_CurrencyCategoryNameE = document.getElementById("txt_CurrencyCategoryNameE") as HTMLInputElement;
        txt_RemarksA = document.getElementById("txt_RemarksA") as HTMLInputElement;
        txt_Value = document.getElementById("txt_Value") as HTMLInputElement;
        SharedButtons.btnSearch = document.getElementById("btnCurrencyCateSearch") as HTMLButtonElement;
    }

    function Undo() {
        clear();


    }

    function Navigate() {
        Ajax.Callsync({
            type: "GET",
            url: sys.apiUrl("SystemTools", "GetRowData"),
            data: { index: SharedWork.PageIndex, idField: 'CurrencyCategoryId', TableName: 'MS_CurrencyCategory' },

            success: (result) => {

                GetByID(result.CurrencyCategoryId.toString());


            }
        });
    }

    function GetByID(_id) {

        Ajax.Callsync({
            type: "GET",
            url: sys.apiUrl("MS_CurrencyCategory", "GetByID"),
            data: { id: _id },
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess == true) {

                    var data = result.Response as MS_CurrencyCategory;
                    txt_code.value = data.code;
                    txt_CurrencyCategoryNameA.value = data.CurrencyCategoryNameA;
                    txt_CurrencyCategoryNameE.value = data.CurrencyCategoryNameE;
                    txt_RemarksA.value = data.RemarksA;
                    txt_Value.value = data.Value.toString();

                    divCurrencyCategoryGrid.SelectedKey = data.CurrencyCategoryId.toString();
                }
                else

                    alert(result.ErrorMessage)

            }
        });
    }

    function InitalizeEvents() {
        SharedButtons.btnSearch.onclick = btnSearch_onclick;
    }

    function GetAll() {

        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("MS_CurrencyCategory", "GetAll"),
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess) {
                    currCategoryList = result.Response as Array<MS_CurrencyCategory>;
                    if (currCategoryList.length > 0) {
                        divCurrencyCategoryGrid.DataSource = currCategoryList;

                        divCurrencyCategoryGrid.Bind();
                        SharedWork.PageIndex = 0;
                        SharedWork.Render();

                    }
                    else {
                        SharedWork.SwitchModes(ScreenModes.NoData);

                        alert("لايوجد دتا حاليا");
                    }
                }
                else
                    alert("Faild")

            }

        });


    }

    function InitializeGrid() {
        divCurrencyCategoryGrid.ElementName = "divCurrencyCategoryGrid";
        divCurrencyCategoryGrid.PrimaryKey = "CurrencyCategoryId";
        divCurrencyCategoryGrid.Inserting = true;
        divCurrencyCategoryGrid.Editing = true;
        divCurrencyCategoryGrid.ConfirmDeleteing = true;
        divCurrencyCategoryGrid.InsertionMode = JsGridInsertionMode.Binding;
        divCurrencyCategoryGrid.OnItemInserting = () => { };
        divCurrencyCategoryGrid.OnItemUpdating = () => { };
        divCurrencyCategoryGrid.OnItemDeleting = () => { };
        divCurrencyCategoryGrid.OnRowSelected = () => {

            GetDataRow();
            SharedWork.SwitchModes(ScreenModes.Query);

        };
        divCurrencyCategoryGrid.OnRowDoubleClicked = () => {

            GetDataRow();
            SharedWork.SwitchModes(ScreenModes.Query);

        }

        divCurrencyCategoryGrid.Columns = [
            {
                title: "كود الفئة", css: "ColumPadding", name: "code"
            },
            {
                title: "اسم الفئة 1", css: "ColumPadding", name: "CurrencyCategoryNameA"
            },
            {
                title: "اسم الفئة 2", css: "ColumPadding", name: "CurrencyCategoryNameE"
            },
            {
                title: "القيمة", css: "ColumPadding", name: "Value"
            },
            {
                title: "ملاحظات", css: "ColumPadding", name: "RemarksA"
            },
            {
                title: "CurrencyCategoryId", css: "ColumPadding disable hidden", name: "CurrencyCategoryId", width: "1%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("text", GridInputClassName, " ", " ", "CurrencyCategoryId", " ");
                    txt.disabled = true;
                    txt.id = "hd_CurrencyCategoryId";
                    return HeaderTemplate("CurrencyCategoryId", txt);
                }
            }
        ];
        divCurrencyCategoryGrid.Bind();
    }

    function GetDataRow() {
        var obj: MS_CurrencyCategory = divCurrencyCategoryGrid.SelectedItem;
        selectedID = Number(obj.CurrencyCategoryId);
        txt_code.value = obj.code;
        txt_CurrencyCategoryNameA.value = obj.CurrencyCategoryNameA;
        txt_CurrencyCategoryNameE.value = obj.CurrencyCategoryNameE;
        txt_RemarksA.value = obj.RemarksA;
        txt_Value.value = obj.Value.toString();


    }

    function GetDataRowFromSearch(id: number) {
        var obj: MS_CurrencyCategory = currCategoryList.filter(x => x.CurrencyCategoryId == id)[0];
        selectedID = Number(obj.CurrencyCategoryId);
        txt_code.value = obj.code;
        txt_CurrencyCategoryNameA.value = obj.CurrencyCategoryNameA;
        txt_CurrencyCategoryNameE.value = obj.CurrencyCategoryNameE;
        txt_RemarksA.value = obj.RemarksA;
        txt_Value.value = obj.Value.toString();
    }

    function InitializeGridTemp() {
        divCurrencyCategoryGrid.ElementName = "divCurrencyCategoryGrid";
        divCurrencyCategoryGrid.Inserting = true;
        divCurrencyCategoryGrid.Editing = true;
        divCurrencyCategoryGrid.ConfirmDeleteing = true;
        divCurrencyCategoryGrid.InsertionMode = JsGridInsertionMode.Binding;
        divCurrencyCategoryGrid.OnItemInserting = () => { };
        divCurrencyCategoryGrid.OnItemUpdating = () => { };
        divCurrencyCategoryGrid.OnItemDeleting = () => { };
        divCurrencyCategoryGrid.Columns = [
            {
                title: "كود الفئة", css: "ColumPadding", name: "code",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("text", GridInputClassName, " ", " ", "code", " ");

                    txt.id = "hd_code";
                    txt.onclick = (e) => {

                    };

                    return HeaderTemplate("الكود", txt);
                }

            },
            {
                title: "اسم الفئة 1", css: "ColumPadding", name: "CurrencyCategoryNameA",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("text", GridInputClassName, " ", " ", "CurrencyCategoryNameA", " ");

                    txt.id = "hd_CurrencyCategoryNameA";
                    return HeaderTemplate("اسم الفئة 1", txt);
                }
            },
            {
                title: "اسم الفئة 2", css: "ColumPadding", name: "CurrencyCategoryNameE",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("text", GridInputClassName, " ", " ", "CurrencyCategoryNameE", " ");

                    txt.id = "hd_CurrencyCategoryNameE";
                    return HeaderTemplate("اسم الفئة 2", txt);
                }
            },
            {
                title: "القيمة", css: "ColumPadding", name: "Value",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("text", GridInputClassName, " ", " ", "Value", " ");

                    txt.id = "hd_Value";
                    return HeaderTemplate("القيمة", txt);
                }
            },
            {
                title: "ملاحظات", css: "ColumPadding", name: "RemarksA",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("text", GridInputClassName, " ", " ", "RemarksA", " ");

                    txt.id = "hd_RemarksA";
                    return HeaderTemplate("ملاحظات", txt);
                }
            },
            {
                title: "CurrencyCategoryId", css: "ColumPadding disable hidden", name: "CurrencyCategoryId", width: "1%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("text", GridInputClassName, " ", " ", "CurrencyCategoryId", " ");
                    txt.disabled = true;
                    txt.id = "hd_CurrencyCategoryId";
                    return HeaderTemplate("CurrencyCategoryId", txt);

                }
            }

        ];
        divCurrencyCategoryGrid.Bind();
    }

    function FillInputText(_TextID: string, _Data: string) {
        $("#" + _TextID).text(_Data);
        $("#" + _TextID).val(_Data);
    }

    function clear() {

        selectedID = 0;
        txt_Value.value = "";
        txt_RemarksA.value = "";
        txt_CurrencyCategoryNameE.value = "";
        txt_CurrencyCategoryNameA.value = "";
        txt_code.value = "";


    }

    function Update() {
        if (selectedID == 0) alert("يجب اختيار فئة العملات اولا!!!!!!");
        else {
            var SelectedObject = new MS_CurrencyCategory();
            SelectedObject.CurrencyCategoryId = selectedID;
            SelectedObject.code = txt_code.value;
            SelectedObject.CurrencyCategoryNameA = txt_CurrencyCategoryNameA.value;
            SelectedObject.RemarksA = txt_RemarksA.value;
            SelectedObject.Value = Number(txt_Value.value);
            SelectedObject.CurrencyCategoryNameE = txt_CurrencyCategoryNameE.value;
            Ajax.Callsync({
                type: "POST",
                url: sys.apiUrl("MS_CurrencyCategory", "Update"),
                data: JSON.stringify(SelectedObject),
                success: (d) => {
                    let result = d as BaseResponse;
                    if (result.IsSuccess == true) {
                        MessageBox.Toastr("تمت التعديل بنجاح", "", ToastrTypes.success);
                        SharedWork.SwitchModes(ScreenModes.Query);
                        GetAll();
                    }
                    else
                        alert(result.ErrorMessage)
                }
            });
        }

    }

    function Insert() {
        var NewdObject = new MS_CurrencyCategory();
        NewdObject.code = txt_code.value;
        NewdObject.CurrencyCategoryNameA = txt_CurrencyCategoryNameA.value;
        NewdObject.RemarksA = txt_RemarksA.value;
        NewdObject.Value = Number(txt_Value.value);
        NewdObject.CurrencyCategoryNameE = txt_CurrencyCategoryNameE.value;
        Ajax.Callsync({
            type: "POST",
            url: sys.apiUrl("MS_CurrencyCategory", "Insert"),
            data: JSON.stringify(NewdObject),
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess == true) {
                    if (result.Response == "CodeFound")
                        MessageBox.Toastr("كود الفئة موجود من قبل", "", ToastrTypes.error);
                    else {
                        MessageBox.Toastr("تمت الاضافة بنجاح", "", ToastrTypes.success);
                        clear();
                        GetAll();
                        SharedWork.SwitchModes(ScreenModes.Query);
                    }

                }
                else

                    alert(result.ErrorMessage)

            }
        });



    }

    function Delete() {

        if (selectedID == 0) alert("يجب اختيار فئة العملات اولا!!!!!!");
        else {
            Ajax.Callsync({
                type: "GET",
                url: sys.apiUrl("MS_CurrencyCategory", "Delete"),
                data: { id: selectedID },
                success: (d) => {
                    let result = d as BaseResponse;
                    if (result.IsSuccess == true) {

                        GetAll();

                        clear();



                    }
                    else

                        alert(result.ErrorMessage)

                }
            });
        }


    }

    function btnSearch_onclick() {
        let sys: SystemTools = new SystemTools();
        sys.FindKey(Modules.CurrencyCategory, SharedButtons.btnSearch.id, "", () => {
            let id = SearchGrid.SearchDataGrid.SelectedKey;
            if (!IsNullOrEmpty(id)) {
                GetDataRowFromSearch(id.toString());
            }
        });
    }
}