$(document).ready(() => {
    SharedButtons.OnLoad();
    SysBooks.InitalizeComponent();
})

namespace SysBooks {
    $('#headertop1').addClass('display_none');
    $('#headertop2').removeClass('display_none');
    let Resource: any = GetResourceList("");
    $('#headerTitle').text(Resource.MovementNotebook);

    var sys: SystemTools = new SystemTools();
    var language = sys.SysSession.CurrentEnvironment.ScreenLanguage;
    var SysSession: SystemSession = GetSystemSession();
    let compCode = SysSession.CurrentEnvironment.CompCode;
    let UserCode = SysSession.CurrentEnvironment.UserCode;
    let Token = "HGFD-" + SysSession.CurrentEnvironment.Token;

    var AllTaxeIds: Array<Sys_Books> = new Array<Sys_Books>();
    var Model: Sys_Books = new Sys_Books();
    var Counter: Sys_Counter = new Sys_Counter();

     //select Options
    var element: HTMLInputElement;
    var TermType: HTMLSelectElement;

    var ObjectId = 0;
    var StatusFlag;
    var Success;
    var flag: boolean = true;


    const GridInputClassName = "form-control gridIput";
    var divBooksGrid: JsGrid = new JsGrid();

    export function InitalizeComponent() {
        localStorage.setItem("TableName", "Sys_Books");
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
        GetDocType();
        InitializeGrid();
        GetAll();
    }

    function InitalizeControls() {
        SharedButtons.btnSearch = document.getElementById("btnSys_BooksSearch") as HTMLButtonElement;
        TermType = document.getElementById("TermType") as HTMLSelectElement;
    }

    function InitalizeEvents() {
        SharedButtons.btnSearch.onclick = btnSearch_onclick;
        SharedButtons.btnRefrash2.onclick = Refrash;
        //TermType.onchange = function () {
        //    TermTypechanged(TermType.value)
        //};
    }

    function GetAll() {
        Disabled(false);
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("Sys_Books", "GetAll"),
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess) {
                    AllTaxeIds = result.Response as Array<Sys_Books>;
                    divBooksGrid.DataSource = AllTaxeIds;
                    divBooksGrid.Bind();
                    //console.log(Terms)
                }
            }
        });
    }

    function GetByID(Id: number) {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("Sys_Books", "GetById"),
            data: { id: Id },
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess) {
                    let res = result.Response as Sys_Books;
                    Display(res);
                    SharedWork.SwitchModes(ScreenModes.Query);
                }
                else
                    MessageBox.Toastr(Resource.Error, Resource.Error, ToastrTypes.error);
            }
        });
    }

    function Assign() {
        Model = DocumentActions.AssignToModel<Sys_Books>(Model);
        if (StatusFlag == "i") {
            Model.CreatedAt = DateTimeFormat(Date().toString());
            Model.CreatedBy = SysSession.CurrentEnvironment.UserCode;
            Insert();
        }
        if (StatusFlag == "u") {
            Model.BookId = ObjectId;
            Model.UpdateAt = DateTimeFormat(Date().toString());
            Model.UpdateBy = SysSession.CurrentEnvironment.UserCode;
            Update();
        }
        ObjectId = Model.BookId;
        GetAll();
        return true;
    }

    function Save() {
        if (DocumentActions.CheckCode(AllTaxeIds, DocumentActions.GetElementByName("PrefixCode").value, "PrefixCode") == false && StatusFlag == "i") {
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
            url: sys.apiUrl("Sys_Books", "Insert"),
            data: JSON.stringify(Model),
            success: (Response) => {
                let result = Response as BaseResponse;
                if (result.IsSuccess) {
                    Model = result.Response as Sys_Books;
                    ObjectId = Model.BookId;
                    Success = true;
                    MessageBox.Toastr(Resource.SavedSucc, Resource.Error, ToastrTypes.success);
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
            url: sys.apiUrl("Sys_Books", "Update"),
            data: JSON.stringify(Model),
            success: (Response) => {
                let result = Response as BaseResponse;
                if (result.IsSuccess) {
                    Model = result.Response as Sys_Books;
                    ObjectId = Model.BookId;
                    Success = true;
                    MessageBox.Toastr(Resource.SavedSucc, Resource.Error, ToastrTypes.success);
                }
                else {
                    MessageBox.Toastr(Resource.ErrorSave, Resource.Error, ToastrTypes.error);
                    Success = false;
                }
            }
        });
    }

    function Delete() {
        $("#MessageBoxDialog").modal("hide");
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("Sys_Books", "Delete"),
            data: { id: Model.BookId},
            success: (result) => {
                if (result) {
                    Success = true;
                    ObjectId = 0;
                    GetAll();
                    Disabled(result);
                    $('select').val('null').select2().trigger('change')
                    MessageBox.Toastr(Resource.DeletedSucc, Resource.Error, ToastrTypes.success);
                }
                else {
                    MessageBox.Toastr(Resource.DeletedErr, Resource.Error, ToastrTypes.error);
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
            element = DocumentActions.GetElementByName("PrefixCode");
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
        if (DocumentActions.GetElementByName("PrefixCode").value == "") {
            MessageBox.Toastr(Resource.PleaseEnterCode, Resource.Error, ToastrTypes.error);
            flag = false
        }
        else if (DocumentActions.GetElementByName("BookNameAR").value == "") {
            MessageBox.Toastr(Resource.PleaseEnterNameArabic, Resource.Error, ToastrTypes.error);
            flag = false
        }
        else if (IsNullOrEmpty(DocumentActions.GetElementByName("TermType").value)) {
            MessageBox.Toastr(Resource.EnterNameOfDocumentType, Resource.Error, ToastrTypes.error);
            flag = false
        }
        else
            flag = true;

        return flag;
    }

    export function Navigate() {
        Model = AllTaxeIds[SharedWork.PageIndex - 1];
        ObjectId = Model.BookId;
        GetByID(ObjectId);
        GetCounter(ObjectId);
    }

    function Display(model: Sys_Books) {
        Model = model;
        DocumentActions.RenderFromModel(Model);
        ObjectId = Number(Model.BookId);
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

    function GetCounter(BookId: number) {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("funcationShared", "GetCounter"),
            data: { id: BookId },
            success: (Response) => {
                let result = Response as BaseResponse;
                if (result.IsSuccess) {
                    result.Response as number;
                    console.log(result.Response)
                }
                else {
                }
            }
        });
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

    function InitializeGrid() {
        divBooksGrid.ElementName = "divBooksGrid";
        divBooksGrid.PrimaryKey = "BookId";
        divBooksGrid.Editing = true;
        divBooksGrid.Paging = true;
        divBooksGrid.Sorting = true;
        divBooksGrid.PageSize = 10;
        divBooksGrid.ConfirmDeleteing = true;
        divBooksGrid.InsertionMode = JsGridInsertionMode.Binding;
        divBooksGrid.OnRowSelected = () => {
            Display(divBooksGrid.SelectedItem);
            SharedWork.SwitchModes(ScreenModes.Query);
        };
        divBooksGrid.OnRowDoubleClicked = () => {
            Display(divBooksGrid.SelectedItem);
            SharedWork.SwitchModes(ScreenModes.Query);
        }
        divBooksGrid.Columns = [
            {
                title: Resource.NotebookCode, css: "ColumPadding", name: "PrefixCode"
            },
            {
                title: Resource.DocumentType, css: "ColumPadding", name: "TermType"
            },
            {
                title: Resource.Name_Arabic, css: "ColumPadding", name: "BookNameAR"
            },
            {
                title: Resource.Name_English, css: "ColumPadding", name: "BookNameEN"
            },
            {
                title: Resource.StartingNumber, css: "ColumPadding", name: "StartNum"
            },
            {
                title: Resource.EndingNumber, css: "ColumPadding", name: "EndNum"
            },
        ];
        divBooksGrid.Bind();
    }


    function btnSearch_onclick() {
        let sys: SystemTools = new SystemTools();
        sys.FindKey(Modules.Sys_Books, SharedButtons.btnSearch.id, "", () => {
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
