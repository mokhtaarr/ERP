$(document).ready(() => {
    SharedButtons.OnLoad();
    MSPaymentNote.InitalizeComponent();
})

namespace MSPaymentNote {
    let Resource: any = GetResourceList("");
    $('#headertop1').addClass('display_none');
    $('#headertop2').removeClass('display_none');
    $('#headerTitle').text(Resource.Voucher);

    var sys: SystemTools = new SystemTools();
    var language = sys.SysSession.CurrentEnvironment.ScreenLanguage;
    var SysSession: SystemSession = GetSystemSession();

    var Model: MS_PaymentNote = new MS_PaymentNote();
    var AllPaymentNoteIds: Array<MS_PaymentNote> = new Array<MS_PaymentNote>();
    var CurrencyCategories: Array<CurrencyCategoryShared> = new Array<CurrencyCategoryShared>();
    var Terms: Array<Ms_Terms> = new Array<Ms_Terms>();
    var Books: Array<Sys_Books> = new Array<Sys_Books>();
    var Boxs: Array<MS_BoxBank> = new Array<MS_BoxBank>();
    var Currencies: Array<MS_Currency> = new Array<MS_Currency>();
    var Banks: Array<BNk_BankNotice> = new Array<BNk_BankNotice>();
    var Details: PaymentNoteAndDetails = new PaymentNoteAndDetails();

    //select Options
    var element: HTMLInputElement,
        TrNo: HTMLInputElement,
        TotalItems: HTMLInputElement,
        Rate: HTMLInputElement,
        ValueBeforeRate: HTMLInputElement,
        PaidPrice: HTMLInputElement,

        BookId: HTMLSelectElement,
        TermId: HTMLSelectElement,
        RectSourceType: HTMLSelectElement,
        TranType: HTMLSelectElement,
        EmpId: HTMLSelectElement,
        BoxId: HTMLSelectElement,
        CurrencyId: HTMLSelectElement,
        CustomerId: HTMLSelectElement,
        VendorId: HTMLSelectElement,
        ClientAccNo: HTMLSelectElement,
        BankNoticId: HTMLSelectElement,
        BankAccNumber: HTMLSelectElement,
        checkfield: HTMLFormElement,
        SelectMode_RectSourceType: string[] = [],

        Total = 0,
        TotalCurancy = 0,
        ObjectId = 0,
        StatusFlag,
        Success,
        flag: boolean = true,
        CuranciesGridId: JsGrid = new JsGrid();


    export function InitalizeComponent() {
        localStorage.setItem("TableName", "MS_PaymentNote");

        NavigateModule.InitalizeComponent();
        SharedButtons.compcode = Number(SysSession.CurrentEnvironment.CompCode);
        SharedWork.OnNavigate = Navigate;

        SharedButtons.AddAction(() => {  btnAdd_onclick(); });

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

        try {
            InitalizeControls();
            InitalizeEvents();
            InitializeGrid();
            GetInventoryTerms(7);
            GetJournalEntryBooks(7);
            GetRectSourceType();
            GetTranType();
            GetAllSafes();
            GetAllBanks();
            GetCurrencies();
            GetAll();
        } catch (e) {
        }
    }

    function InitalizeControls() {
        SharedButtons.btnSearch = document.getElementById("btnMS_PaymentNoteSearch") as HTMLButtonElement;
        TermId = document.getElementById("TermId") as HTMLSelectElement;
        BookId = document.getElementById("BookId") as HTMLSelectElement;
        TrNo = document.getElementById("TrNo") as HTMLInputElement;
        TranType = document.getElementById("TranType") as HTMLSelectElement;
        RectSourceType = document.getElementById("RectSourceType") as HTMLSelectElement;
        BoxId = document.getElementById("BoxId") as HTMLSelectElement;
        CurrencyId = document.getElementById("CurrencyId") as HTMLSelectElement;
        TotalItems = document.getElementById("TotalItems") as HTMLInputElement;
        Rate = document.getElementById("Rate") as HTMLInputElement;
        ValueBeforeRate = document.getElementById("ValueBeforeRate") as HTMLInputElement;
        PaidPrice = document.getElementById("PaidPrice") as HTMLInputElement;

        ///////////// check element ///////////////////
        BankNoticId = document.getElementById("BankNoticId") as HTMLSelectElement;
        BankAccNumber = document.getElementById("BankAccNumber") as HTMLSelectElement;

        SelectMode_RectSourceType = ["#CustomerId", "#EmpId", "#VendorId"];
    }

    function InitalizeEvents() {
        SharedButtons.btnSearch.onclick = btnSearch_onclick;
        SharedButtons.btnRefrash2.onclick = Refrash;
        Rate.onchange = TotalItemsfun;
        TotalItems.onchange = TotalItemsfun;
        ValueBeforeRate.onchange = TotalItemsfun;
        PaidPrice.onchange = TotalItemsfun;

        CurrencyId.onchange = function () {
            if (SharedWork.CurrentMode == ScreenModes.Add || SharedWork.CurrentMode == ScreenModes.Edit) {
                if (!IsNullOrEmpty(CurrencyId.value)) {
                    GetRate(Number(CurrencyId.value));
                    GetAllCurrencyCategory(Number(CurrencyId.value));
                }
            } else {
                CalculationSalaryBefor();
                SetTotalAndTotalCurancy(Model.ValueBeforeRate, Model.PaidPrice)
            }

            //if (!IsNullOrEmpty(CurrencyId.value)) {
            //    let curancy = Currencies.filter(x => x.CurrencyId == Number(CurrencyId.value))[0];
            //    Rate.value = curancy.Rate.toString();
            //}
        }

        BookId.onchange = function () {
            if (!IsNullOrEmpty(BookId.value))
                GetMaxTrNo(Number(BookId.value));
        };

        TranType.onchange = function () {
            if (!IsNullOrEmpty(TranType.value))
                ResetSafe(Number(TranType.value));
        };

        BankNoticId.onchange = function () {
            if (!IsNullOrEmpty(BankNoticId.value))
                GetBankAccounts(Number(BankNoticId.value), true);
        };

        RectSourceType.onchange = function () {
            let type = $('#' + RectSourceType.id).find('option:selected').attr('type');
            if (!IsNullOrEmpty(type)) {
                switch (type) {
                    case "Customers":
                        SetNewSelectNodes(Resource.Client, "CustomerId")
                        GetCustomers();
                        break;
                    case "Employees":
                        SetNewSelectNodes(Resource.Employee, "EmpId");
                        GetEmployees();
                        break;
                    case "Vendors":
                        SetNewSelectNodes(Resource.I_Vendor, "VendorId");
                        GetVendor();
                        break;
                    default:
                        SetNewSelectNodes("", "")
                        break;
                }
            }
        }
    }

    function GetAll() {
        Disabled(false);
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("MS_PaymentNote", "GetAll"),
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess) {
                    AllPaymentNoteIds = result.Response as Array<MS_PaymentNote>;
                }
            }
        });
    }

    function GetByID(Id: number) {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("MS_PaymentNote", "GetById"),
            data: { id: Id },
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess) {
                    let res = result.Response as MS_PaymentNote;
                    GetAllCurrencyCategory(res.CurrencyId);
                    Display(res);
                    SharedWork.SwitchModes(ScreenModes.Query);
                }
                else
                    MessageBox.Toastr(Resource.Error, Resource.Error, ToastrTypes.error);
            }
        });
    }
   
    function Assign() {
        Details.PaymentNote = DocumentActions.AssignToModel<MS_PaymentNote>(Model);
        Model.ChequeOpenId = Model.ChequeOpenId ? 1 : 0;
        Model.CheckType = Model.CheckType ? 1 : 0;
        Details.Currencies = CurrencyCategories;

        if (StatusFlag == "i") {
            Model.CreatedAt = DateTimeFormat(Date().toString());
            Model.CreatedBy = SysSession.CurrentEnvironment.UserCode;
            Insert();
        }
        if (StatusFlag == "u") {
            Model.PayId = ObjectId;
            Model.UpdateAt = DateTimeFormat(Date().toString());
            Model.UpdateBy = SysSession.CurrentEnvironment.UserCode;
            Update();
        }
        ObjectId = Model.PayId;
        if (Success)
            GetAll();

        return Success;
    }

    function Save() {
        Assign();
        if (Success) {
            Disabled(false);
            Success = false;
            SharedWork.SwitchModes(ScreenModes.Query);
        }
    }

    function Insert() {
        $("#MessageBoxDialog").modal("hide");
        Ajax.Callsync({
            type: "POST",
            url: sys.apiUrl("MS_PaymentNote", "Insert"),
            data: JSON.stringify(Details),
            success: (Response) => {
                let result = Response as BaseResponse;
                if (result.IsSuccess) {
                    Model = result.Response as MS_PaymentNote;
                    ObjectId = Model.PayId;
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
            url: sys.apiUrl("MS_PaymentNote", "Update"),
            data: JSON.stringify(Details),
            success: (Response) => {
                let result = Response as BaseResponse;
                if (result.IsSuccess) {
                    Model = result.Response as MS_PaymentNote;
                    ObjectId = Model.PayId;
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
            url: sys.apiUrl("MS_PaymentNote", "Delete"),
            data: { id: Model.PayId },
            success: (result) => {
                if (result) {
                    Success = true;
                    ObjectId = 0;
                    GetAll();
                    Disabled(result);
                    $('select').val('null').select2().trigger('change')
                }
                else {
                    MessageBox.Toastr(result.ErrorMessage, Resource.Error, ToastrTypes.error);
                    Success = false;
                }
            }
        });
    }

    function btnAdd_onclick() {
        StatusFlag = 'i';
        RemoveDisabled(true);
        ClearGrid();

        element = DocumentActions.GetElementByName("TrNo");
        element.disabled = true;
        element = DocumentActions.GetElementByName("BoxId");
        element.disabled = true;
        element = DocumentActions.GetElementByName("PaidPrice");
        element.disabled = true;
        element = DocumentActions.GetElementByName("TotalItems");
        element.disabled = true;
        element = DocumentActions.GetElementByName("TotalCurancy");
        element.disabled = true;

        $('select option:first-child').val('null').prop("selected", true).prop("disabled", true);
    }

    function btnEdit_onclick() {
        if (ObjectId == 0) {
            MessageBox.Toastr(Resource.PleaseSelectItem, Resource.Error, ToastrTypes.error);
        }
        else {
            RemoveDisabled(false);
            element = DocumentActions.GetElementByName("TrNo");
            element.disabled = true;

            element = DocumentActions.GetElementByName("BookId");
            element.disabled = true;

            element = DocumentActions.GetElementByName("PaidPrice");
            element.disabled = true;

            element = DocumentActions.GetElementByName("TotalItems");
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
        //Ajax.Callsync({
        //    type: "Get",
        //    data: { bookId: BookId.value, trNo: TrNo.value },
        //    url: sys.apiUrl("MS_PaymentNote", "CheckPaymentTrNo"),
        //    success: (Response) => {
        //        flag = Response;
        //        if (!flag) {
        //            MessageBox.Toastr(Resource.CannotAddExist, Resource.Error, ToastrTypes.error);
        //            return flag;
        //        }
        //    }
        //});
        
        //if (Number(TranType.value) == 2 && (BoxId.value != null || IsNullOrEmpty(BankNoticId.value)
        //    /*|| IsNullOrEmpty(BankAccNumber.value)*/ || CheckNumber.value == "" || DueDate.value == "" || PaidDate.value == ""))
        //{
        //    MessageBox.Toastr(Resource.ErrorOnSave, Resource.Error, ToastrTypes.error);
        //    flag = false
        //}

        //else if (Number(TranType.value) == 1 && BoxId.value == null || (!IsNullOrEmpty(BankNoticId.value) || !IsNullOrEmpty(BankAccNumber.value)||
        //    CheckNumber.value != "" || DueDate.value != "" || PaidDate.value != "" ))
        //{
        //    MessageBox.Toastr(Resource.ErrorOnSave, Resource.Error, ToastrTypes.error);
        //    flag = false
        //}

        //else
        //    flag = true;
        return flag;
    }

    export function Navigate() {
        Model = AllPaymentNoteIds[SharedWork.PageIndex - 1];
        ObjectId = Model.PayId;
        GetByID(ObjectId);
    }

    function Display(model: MS_PaymentNote) {
        Model = model;
        DocumentActions.RenderFromModel(Model);
        ObjectId = Number(Model.PayId);
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
        EnabledOrDisabledSelectMode_RectSourceType(true);
    }

    function RemoveDisabled(clear: boolean) {
        DocumentActions.allElements(false, clear, Model);
        DisabledOtherMoney();
        ResetSafe(Model.TranType);
        EnabledOrDisabledSelectMode_RectSourceType(false);
    }

    function EnabledOrDisabledSelectMode_RectSourceType(disabled: boolean) {
        for (var i = 0; i < SelectMode_RectSourceType.length; i++) {
            $(SelectMode_RectSourceType[i]).prop("disabled", disabled).select2().trigger('change');
        }
    }

    function checkfieldd(clear: boolean) {
        DocumentActions.allElements(false, clear, checkfield);
    }

    function GetModel(id: number) {
        Model = AllPaymentNoteIds.filter(x => x.PayId == id)[0];
        return Model;
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
                    DocumentActions.FillCombowithCode(Books, BookId, "BookId", (language == "ar" ? "BookNameAR" : "BookNameEN"), "PrefixCode", "");
                }
            }
        });
    }

    function InitializeGrid() {
        CuranciesGridId.ElementName = "CuranciesGridId";
        CuranciesGridId.PrimaryKey = "RecCurId";
        CuranciesGridId.Editing = true;
        CuranciesGridId.Paging = true;
        CuranciesGridId.Sorting = true;
        CuranciesGridId.PageSize = 10;
        CuranciesGridId.ConfirmDeleteing = true;
        CuranciesGridId.InsertionMode = JsGridInsertionMode.Binding;
        CuranciesGridId.OnRowSelected = () => {
        };
        CuranciesGridId.Columns = [
            {
                title: Resource.Name_Arabic, css: "ColumPadding", name: "CurrencyDescA"
            },
            {
                title: Resource.Name_English, css: "ColumPadding", name: "CurrencyDescE"
            },
            {
                title: Resource.value, css: "ColumPadding", name: "Value", itemTemplate: (e) => {
                    let val = e as number;
                    return val.toFixed(6);
                }
            },
            {
                title: Resource.UnitsCount, css: "ColumPadding", name: "Count", itemTemplate: (e) => {
                    let val = e as number;
                    return val.toFixed(6);
                }
            },
            {
                title: Resource.Price, css: "ColumPadding", name: "Price", itemTemplate: (e) => {
                    let val = e as number;
                    return val.toFixed(6);
                }
            },
            {
                title: "RectId", css: "ColumPadding disable hidden", name: "RectId", width: "1%"
            },
            {
                title: "RecCurId", css: "ColumPadding disable hidden", name: "RecCurId", width: "1%"
            },
            {
                title: "CurrencyCategoryId", css: "ColumPadding disable hidden", name: "CurrencyCategoryId", width: "1%"
            },
        ];
        CuranciesGridId.Bind();
    }

    function ClearGrid() {
        CuranciesGridId.DataSource = new Array<CurrencyCategoryShared>();
        CuranciesGridId.Bind();
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
                    DocumentActions.FillCombowithdefult(Terms, TermId, "TermId", "TermName", Resource.DocumentType);
                }
            }
        });
    }

    function GetRectSourceType() {
        let DocType = new Array();
        let RectSourceTypeArr = new Array();
        let obj = { Key: 0, Value: "", Type: "" };

        if (language == "ar") {
            DocType.push(0, "اختر نوع", "");
            DocType.push(1, "عميل / ح.الاستاذ", "Customers");
            DocType.push(2, "مورد / ح.الاستاذ", "Vendors");
            DocType.push(3, "أخرى / نوع المستند", "Other");
            DocType.push(4, "موظف / ح.الاستاذ", "Employees");
            DocType.push(36, "أمر شغل انتاجى / ح.الاستاذ", "");
            DocType.push(48, "أمر شغل مركبه / ح.الاستاذ", "");
            DocType.push(51, "خ.ضمان / ح.الاستاذ", "");
            DocType.push(61, "أمر صيانة مركبات / ح.الاستاذ", "");
            DocType.push(64, "أمر صيانة معدات / ح.الاستاذ", "");
            DocType.push(38, "مركبه / ح.الاستاذ", "");
            DocType.push(67, "أصل ثابت / ح.الاستاذ", "");
            DocType.push(78, "مشروعات / ح.الاستاذ", "");
            DocType.push(34, "حساب فرعى من الدليل", "");

            //Customers
            DocType.push(5, "عميل / ح.اضافى 1", "Customers");
            DocType.push(6, "عميل / ح.اضافى 2", "Customers");
            DocType.push(7, "عميل / ح.اضافى 3", "Customers");
            DocType.push(8, "عميل / ح.اضافى 4", "Customers");
            DocType.push(9, "عميل / ح.اضافى 5", "Customers");
            DocType.push(10, "عميل / ح.اضافى 6", "Customers");
            DocType.push(11, "عميل / ح.اضافى 7", "Customers");
            DocType.push(12, "عميل / ح.اضافى 8", "Customers");
            DocType.push(13, "عميل / ح.اضافى 9", "Customers");
            DocType.push(14, "عميل / ح.اضافى 10", "Customers");

            //Vendors
            DocType.push(15, "مورد / ح.اضافى 1", "Vendors");
            DocType.push(16, "مورد / ح.اضافى 2", "Vendors");
            DocType.push(17, "مورد / ح.اضافى 3", "Vendors");
            DocType.push(18, "مورد / ح.اضافى 4", "Vendors");
            DocType.push(19, "مورد / ح.اضافى 5", "Vendors");
            DocType.push(20, "مورد / ح.اضافى 6", "Vendors");
            DocType.push(21, "مورد / ح.اضافى 7", "Vendors");
            DocType.push(22, "مورد / ح.اضافى 8", "Vendors");
            DocType.push(23, "مورد / ح.اضافى 9", "Vendors");
            DocType.push(24, "مورد / ح.اضافى 10", "Vendors");

            //Employees
            DocType.push(35, "موظف / ح.عمولة بيع", "Employees");
            DocType.push(25, "موظف / ح.سلف ", "Employees");
            DocType.push(26, "موظف / ح.عهده ", "Employees");
            DocType.push(27, "موظف / ح.مخصص اجازات ", "Employees");
            DocType.push(28, "موظف / ح.مخصص نهاية الخدمه ", "Employees");
            DocType.push(29, "موظف / ح.ذمـــه ", "Employees");
            DocType.push(30, "موظف / ح.وقت ضائع ", "Employees");
            DocType.push(31, "موظف / ح.مخصص تذاكر ", "Employees");
            DocType.push(32, "موظف / ح.اضافى 8", "Employees");
            DocType.push(33, "موظف / ح.اضافى 9", "Employees");
            //Production
            DocType.push(37, "ح.مصروفات صناعيه", "Production");

            //Vehicles
            DocType.push(39, "مركبه / ح.مصروفات", "Vehicles");
            DocType.push(40, "مركبه / ح.ايرادات", "Vehicles");
            DocType.push(41, "مركبه / ح.مصروف صيانه", "Vehicles");
            DocType.push(42, "مركبه / ح.اضافى 4", "Vehicles");
            DocType.push(43, "مركبه / ح.اضافى 5", "Vehicles");
            DocType.push(44, "مركبه / ح.اضافى 6", "Vehicles");
            DocType.push(45, "مركبه / ح.اضافى 7", "Vehicles");
            DocType.push(46, "مركبه / ح.اضافى 8", "Vehicles");
            DocType.push(47, "مركبه / ح.اضافى 9", "Vehicles");

            //VehicleJobOrder
            DocType.push(49, "أمر شغل مركبه / ح.اضافى1", "VehicleJobOrder");
            DocType.push(50, "أمر شغل مركبه / ح.اضافى2", "VehicleJobOrder");

            //LetterOfGuarantee
            DocType.push(52, "خ.ضمان / ح.مصروفات", "LetterOfGuarantee");
            DocType.push(53, "خ.ضمان / ح.عموله بنكيه", "LetterOfGuarantee");
            DocType.push(54, "خ.ضمان / ح.هامش نقدى", "LetterOfGuarantee");
            DocType.push(55, "خ.ضمان / ح.اضافى 4", "LetterOfGuarantee");
            DocType.push(56, "خ.ضمان / ح.اضافى 5", "LetterOfGuarantee");
            DocType.push(57, "خ.ضمان / ح.اضافى 6", "LetterOfGuarantee");
            DocType.push(58, "خ.ضمان / ح.اضافى 7", "LetterOfGuarantee");
            DocType.push(59, "خ.ضمان / ح.اضافى 8", "LetterOfGuarantee");
            DocType.push(60, "خ.ضمان / ح.اضافى 9", "LetterOfGuarantee");


            //VehicleRepairOrder
            DocType.push(62, "أمر صيانة مركبات / ح.اضافى 1", "VehicleRepairOrder");
            DocType.push(63, "أمر صيانة مركبات / ح.اضافى 2", "VehicleRepairOrder");

            //MachineRepairOrder
            DocType.push(65, "أمر صيانة معدات / ح.اضافى 1", "MachineRepairOrder");
            DocType.push(66, "أمر صيانة معدات / ح.اضافى 2", "MachineRepairOrder");

            //FixedAsset
            DocType.push(68, "أصل ثابت / ح.الإستهلاك", "FixedAsset");
            DocType.push(69, "أصل ثابت / ح.مجمع الإهلاك", "FixedAsset");
            DocType.push(70, "أصل ثابت / ح.المصاريف", "FixedAsset");
            DocType.push(71, "أصل ثابت / ح.أرباح رأسماليه", "FixedAsset");
            DocType.push(72, "أصل ثابت / ح.خسائر رأسماليه", "FixedAsset");
            DocType.push(73, "أصل ثابت / ح.فائض اعادة تقييم", "FixedAsset");
            DocType.push(74, "أصل ثابت / ح.عجز اعادة تقييم", "FixedAsset");
            DocType.push(75, "أصل ثابت / ح.اضافى 8", "FixedAsset");
            DocType.push(76, "أصل ثابت / ح.اضافى 9", "FixedAsset");
            DocType.push(77, "أصل ثابت / ح.اضافى 10", "FixedAsset");

            //Projects
            DocType.push(79, "مشروعات / ح.اضافى 1", "Projects");
            DocType.push(80, "مشروعات / ح.اضافى 2", "Projects");
            DocType.push(81, "مشروعات / ح.اضافى 3", "Projects");
            DocType.push(82, "مشروعات / ح.اضافى 4", "Projects");
            DocType.push(83, "مشروعات / ح.اضافى 5", "Projects");
            DocType.push(84, "مشروعات / ح.اضافى 6", "Projects");
            DocType.push(85, "مشروعات / ح.اضافى 7", "Projects");
            DocType.push(86, "مشروعات / ح.اضافى 8", "Projects");
            DocType.push(87, "مشروعات / ح.اضافى 9", "Projects");
            DocType.push(88, "مشروعات / ح.اضافى 10", "Projects");
        }
        else {
            DocType.push(0, "Choose Type", "");
            DocType.push(1, "Customer Account", "Customers");
            DocType.push(2, "Vendor Account", "Vendor");
            DocType.push(3, "Other / Term Effect", "Other");
            DocType.push(4, "Employee Account", "Employee");
            DocType.push(36, "Production Job Order", "");
            DocType.push(48, "Vehicle Job Order", "");
            DocType.push(51, "LG Account", "");
            DocType.push(61, "Vehicle repair order", "");
            DocType.push(64, "Machine repair order", "");
            DocType.push(38, "Vehicle Account", "");
            DocType.push(67, "Fixed asset account", "");
            DocType.push(78, "Projects / Account", "");
            DocType.push(34, "Gl Account", "");

            //Customers
            DocType.push(5, "Customer Add account 1", "Customers");
            DocType.push(6, "Customer Add account 2", "Customers");
            DocType.push(7, "Customer Add account 3", "Customers");
            DocType.push(8, "Customer Add account 4", "Customers");
            DocType.push(9, "Customer Add account 5", "Customers");
            DocType.push(10, "Customer Add account 6", "Customers");
            DocType.push(11, "Customer Add account 7", "Customers");
            DocType.push(12, "Customer Add account 8", "Customers");
            DocType.push(13, "Customer Add account 9", "Customers");
            DocType.push(14, "Customer Add account 10", "Customers");

            //Vendors
            DocType.push(15, "Vendor Add account 1", "Vendors");
            DocType.push(16, "Vendor Add account 2", "Vendors");
            DocType.push(17, "Vendor Add account 3", "Vendors");
            DocType.push(18, "Vendor Add account 4", "Vendors");
            DocType.push(19, "Vendor Add account 5", "Vendors");
            DocType.push(20, "Vendor Add account 6", "Vendors");
            DocType.push(21, "Vendor Add account 7", "Vendors");
            DocType.push(22, "Vendor Add account 8", "Vendors");
            DocType.push(23, "Vendor Add account 9", "Vendors");
            DocType.push(24, "Vendor Add account 10", "Vendors");

            //Employees
            DocType.push(35, "Sales commission", "Employees");
            DocType.push(25, "Lending account", "Employees");
            DocType.push(26, "Consignment account", "Employees");
            DocType.push(27, "Vacations account", "Employees");
            DocType.push(28, "Indemnity account", "Employees");
            DocType.push(29, "Debtors account", "Employees");
            DocType.push(30, "Idle time account", "Employees");
            DocType.push(31, "Tickets account", "Employees");
            DocType.push(32, "Employee Add account 8", "Employees");
            DocType.push(33, "Employee Add account 9", "Employees");

            //Production
            DocType.push(37, "Production Expenses", "Production");

            //Vehicles
            DocType.push(39, "Vehicle Expenses Account", "Vehicles");
            DocType.push(40, "Vehicle Revenue Account", "Vehicles");
            DocType.push(41, "Vehicle Maintenance Expense Acc", "Vehicles");
            DocType.push(42, "Vehicle Add account 4", "Vehicles");
            DocType.push(43, "Vehicle Add account 5", "Vehicles");
            DocType.push(44, "Vehicle Add account 6", "Vehicles");
            DocType.push(45, "Vehicle Add account 7", "Vehicles");
            DocType.push(46, "Vehicle Add account 8", "Vehicles");
            DocType.push(47, "Vehicle Add account 10", "Vehicles");

            //VehicleJobOrder
            DocType.push(49, "Vehicle Job Order Add Acc2", "VehicleJobOrder");
            DocType.push(50, "Vehicle Job Order Add Acc2", "VehicleJobOrder");

            //LetterOfGuarantee
            DocType.push(52, "LG / Bank expense", "LetterOfGuarantee");
            DocType.push(53, "LG / Bank commision", "LetterOfGuarantee");
            DocType.push(54, "LG / Cash margin", "LetterOfGuarantee");
            DocType.push(55, "LG / Add account 4", "LetterOfGuarantee");
            DocType.push(56, "LG / Add account 5", "LetterOfGuarantee");
            DocType.push(57, "LG / Add account 6", "LetterOfGuarantee");
            DocType.push(58, "LG / Add account 7", "LetterOfGuarantee");
            DocType.push(59, "LG / Add account 8", "LetterOfGuarantee");
            DocType.push(60, "LG / Add account 9", "LetterOfGuarantee");


            //VehicleRepairOrder
            DocType.push(62, "Vehicle repair order / Add account 1", "VehicleRepairOrder");
            DocType.push(63, "Vehicle repair order / Add account 2", "VehicleRepairOrder");

            //MachineRepairOrder
            DocType.push(65, "Machine repair order / Add account 1", "MachineRepairOrder");
            DocType.push(66, "Machine repair order / Add account 2", "MachineRepairOrder");

            //FixedAsset
            DocType.push(68, "Fixed asset / Depreciation account", "FixedAsset");
            DocType.push(69, "Fixed asset / Depreciation collection Acc", "FixedAsset");
            DocType.push(70, "Fixed asset / Expenses Account", "FixedAsset");
            DocType.push(71, "Fixed asset / Capital profits Account", "FixedAsset");
            DocType.push(72, "Fixed asset / Capital losses Account", "FixedAsset");
            DocType.push(73, "Fixed asset / Reevaluation surplus Account", "FixedAsset");
            DocType.push(74, "Fixed asset / Reevaluation shortage Account", "FixedAsset");
            DocType.push(75, "Fixed asset / Add account 8", "FixedAsset");
            DocType.push(76, "Fixed asset / Add account 9", "FixedAsset");
            DocType.push(77, "Fixed asset / Add account 10", "FixedAsset");

            //Projects

            DocType.push(79, "Projects / Add account 1", "Projects");
            DocType.push(80, "Projects / Add account 2", "Projects");
            DocType.push(81, "Projects / Add account 3", "Projects");
            DocType.push(82, "Projects / Add account 4", "Projects");
            DocType.push(83, "Projects / Add account 5", "Projects");
            DocType.push(84, "Projects / Add account 6", "Projects");
            DocType.push(85, "Projects / Add account 7", "Projects");
            DocType.push(86, "Projects / Add account 8", "Projects");
            DocType.push(87, "Projects / Add account 9", "Projects");
            DocType.push(88, "Projects / Add account 10", "Projects");

        }

        for (var i = 0; i < DocType.length; i++) {
            obj = obj = { Key: 0, Value: "", Type: "" };
            obj.Key = DocType[i];
            obj.Value = DocType[i + 1];
            obj.Type = DocType[i + 2];
            RectSourceTypeArr.push(obj);
            i = i + 2;
        }

        DocumentActions.FillComboWithDefultArrayOneValue(RectSourceTypeArr, RectSourceType, "Key", "Value", Resource.Side, "Type")
        return RectSourceTypeArr;
    }

    function GetAllSafes() {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("funcationShared", "GetAllSafes"),
            success: (Response) => {
                let result = Response as BaseResponse;
                if (result.IsSuccess) {
                    Boxs = result.Response as Array<MS_BoxBank>;
                    DocumentActions.FillCombowithCode(Boxs, BoxId, "BoxId", (language == "ar" ? "DESCA" : "DESCE"), "BoxCode", Resource.Safe);
                }
            }
        });
        return Boxs;
    }

    function GetCurrencies() {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("funcationShared", "GetCurrencies"),
            success: (Response) => {
                let result = Response as BaseResponse;
                if (result.IsSuccess) {
                    Currencies = result.Response as Array<MS_Currency>;
                    DocumentActions.FillCombowithCode(Currencies, CurrencyId, "CurrencyId", (language == "ar" ? "CurrencyDescA" : "CurrencyDescE"), "CurrencyCode", Resource.Currency);

                }
            }
        });
        return Currencies;
    }

    function GetAllCurrencyCategory(currencyId: number) {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("funcationShared", "GetAllCurrencyCategory"),
            data: { currencyId: currencyId },
            success: (Response) => {
                let result = Response as BaseResponse;
                if (result.IsSuccess) {
                    CurrencyCategories = result.Response as Array<CurrencyCategoryShared>;
                    CuranciesGridId.DataSource = CurrencyCategories;
                    CuranciesGridId.Bind();
                }
            }
        });
        return Currencies;
    }

    function GetCustomers() {
        CustomerId = document.getElementById("CustomerId") as HTMLSelectElement;
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("funcationShared", "GetCustomers"),
            success: (Response) => {
                let result = Response as BaseResponse;
                if (result.IsSuccess) {
                    let Customers = result.Response as Array<MS_Customer>;
                    DocumentActions.FillCombowithCode(Customers, CustomerId, "CustomerId", (language == "ar" ? "CustomerDescA" : "CustomerDescE"), "CustomerCode", Resource.Client);
                }
            }
        });
    }

    function GetEmployees()
    {
        EmpId = document.getElementById("EmpId") as HTMLSelectElement;
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("funcationShared", "GetEmployees"),
            success: (Response) => {
                let result = Response as BaseResponse;
                if (result.IsSuccess) {
                    let Employees = result.Response as Array<Hr_Employees>;
                    DocumentActions.FillCombowithCode(Employees, EmpId, "EmpId", (language == "ar" ? "Name1" : "Name2"), "EmpCode", Resource.Employee);
                }
            }
        });
    }

    function GetVendor() {
        VendorId = document.getElementById("VendorId") as HTMLSelectElement;
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("funcationShared", "GetVendor"),
            success: (Response) => {
                let result = Response as BaseResponse;
                if (result.IsSuccess) {
                    let vendors = result.Response as Array<MS_Vendor>;
                    DocumentActions.FillCombowithCode(vendors, VendorId, "VendorId", (language == "ar" ? "VendorDescA" : "VendorDescE"), "VendorCode", Resource.I_Vendor);
                }
            }
        });
    }

    function SetNewSelectNodes(labelText: string, selectId: string) {
        if (labelText == "" && selectId == "") {
            $('#selectMode select').html("");
            return false;
        }

        $('#selectMode label').text(labelText);
        $('#selectMode select').attr('id', selectId).attr('name', selectId);
        $('#selectId').select2().trigger('change');
    }

    function btnSearch_onclick() {
        let sys: SystemTools = new SystemTools();
        sys.FindKey(Modules.MS_PaymentNote, SharedButtons.btnSearch.id, "", () => {
            let id = SearchGrid.SearchDataGrid.SelectedKey;
            if (!IsNullOrEmpty(id)) {
                GetByID(ObjectId);
            }
        });
    }

    function GetMaxTrNo(BookId: number) {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("MS_PaymentNote", "GetMaxTrNo"),
            data: { bookId: BookId },
            success: (Response) => {
                element = DocumentActions.GetElementByName("TrNo");
                element.value = Response;
            }
        });
    }

    function Refrash() {
        GetAll();
        GetByID(ObjectId);
    }

    function GetTranType() {
        let TranTypeArr: { value: number, text: string }[] = [
            { "value": 0, "text": language == "ar" ? "اختر النوع" : "CaptureType" },
            { "value": 1, "text": language == "ar" ? "نقدي" : "Cash" },
            { "value": 2, "text": language == "ar" ? "شيك" : "Check" },
        ];

        DocumentActions.FillCombo(TranTypeArr, TranType, "value", "text");
    }

    function ResetSafe(tranTypeVal: number) {
        if (SharedWork.CurrentMode == ScreenModes.Add || SharedWork.CurrentMode == ScreenModes.Edit)
        {
            if (tranTypeVal == 2 || tranTypeVal == 0)
            {
                BoxId.value = 'null';
                BoxId.disabled = true;
            }
            else {
                BoxId.disabled = false;
            }

            ResetCheck(tranTypeVal);
            $('#' + BoxId.id).select2().trigger('change');
        }
    }

    function ResetCheck(tranTypeVal: number = 1) {
        if (SharedWork.CurrentMode == ScreenModes.Add || tranTypeVal == 1)
            $("#menu1 :input").val('');

        $("#menu1 select").each(function (index, element) {
            $('#' + element.id).select2().trigger('change');
        });

        if (tranTypeVal == 1 || tranTypeVal == 0) {
            $("#menu1 :input").not("#RefNo,#DocTrNo").prop("disabled", true);
        }
        else {
            $("#menu1 :input").not("#RefNo,#DocTrNo").prop("disabled", false);
        }
    }

    function GetBankNotic(id: number) {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("funcationShared", "GetBankNotic"),
            data: { bankNoticId: id },
            success: (Response) => {
                let result = Response as BaseResponse;
                if (result.IsSuccess) {
                    $('#RefNo').val(result.Response.RefNo)
                    $('#DocTrNo').val(result.Response.DocTrNo)
                }
            }
        });
    }

    function DisabledOtherMoney() {
        let countInputs = $('.SalaryBefor').length;
        for (var i = 1; i <= countInputs; i++) {
            $('#Value' + i).prop("disabled", true);
        }
    }

    function GetBankAccounts(BoxId: number, IsBankNoticId: boolean = false) {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("funcationShared", "GetBankAccounts"),
            data: { BoxId: BoxId },
            success: (Response) => {
                let result = Response as BaseResponse;
                if (result.IsSuccess) {
                    DocumentActions.FillCombowithdefult(result.Response, (IsBankNoticId ? BankAccNumber : ClientAccNo),
                        "AcountCode", (language == "ar" ? "AcounntNameA" : "AcounntNameE"), (IsBankNoticId ? Resource.AccountNo : Resource.EntityAccountNumber));
                }
            }
        });
    }

    function GetAllBanks() {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("funcationShared", "GetAllBanks"),
            success: (Response) => {
                let result = Response as BaseResponse;
                if (result.IsSuccess) {
                    Boxs = result.Response as Array<MS_BoxBank>;
                    DocumentActions.FillCombowithCode(Boxs, BankNoticId, "BoxId", (language == "ar" ? "DESCA" : "DESCE"), "BoxCode", Resource.BankCode);
                }
            }
        });
        return Boxs;
    }

    function TotalItemsfun()
    {
        PaidPrice.value = TotalItems.value = (Number(Rate.value) * Number(ValueBeforeRate.value)).toString();
        
    }

    function GetRate(currencyId: number) {
        let Currency = Currencies.filter(x => x.CurrencyId == currencyId)[0];
        $('#Rate').val(Currency.Rate);
        CalculationCurrency();
    }

    $('#Rate,#ValueBeforeRate,.SalaryBefor').on("change paste keyup", function () {
        CalculationCurrency();
    });

    function CalculationCurrency() {
        let ValueBeforeRate = 0, ValueAfterRate = 0, rate = Number(Rate.value), Price = Number($('#ValueBeforeRate').val());

        if (rate > 0 && Price > 0) {
            ValueBeforeRate = Price;
            ValueAfterRate = Price * rate;
            //$('#ValueBeforeRate').val(ValueBeforeRate);
            $('#PaidPrice').val(ValueAfterRate);

            TotalCurancy = ValueBeforeRate;
            Total = ValueAfterRate;
        }
        else {
            $('#PaidPrice').val(0);
            Total = 0;
            TotalCurancy = 0;
        }
        CalculationSalaryBefor();
    }

    function CalculationSalaryBefor() {
        let rate = Number(Rate.value),
            countInput = $('.SalaryBefor').length;

        for (var i = 1; i <= countInput; i++) {
            let BeforeRate = $('#Value' + i + "BeforeRate").val(),
                afterrate = Number(BeforeRate) * rate;
            $('#Value' + i).val(afterrate);
        }

        SetTotalAndTotalCurancy();
    }

    function SetTotalAndTotalCurancy(ValueBeforeRate: number = 0, PaidPrice: number = 0) {
        let total = 0 + PaidPrice,
            totalCurancy = 0 + ValueBeforeRate,
            countInput = $('.SalaryBefor').length;


        if (ValueBeforeRate != 0 && PaidPrice != 0) {
            Total = 0; TotalCurancy = 0;
            for (var i = 1; i <= countInput; i++) {
                totalCurancy += Number(Model["Value" + i + "BeforeRate"]);
                total += Number(Model["Value" + i]);
            }
        }
        else {
            for (var i = 1; i <= countInput; i++) {
                totalCurancy += Number($('#Value' + i + "BeforeRate").val());
                total += Number($('#Value' + i).val());
            }
        }

        total = Number(Total) + total;
        totalCurancy = Number(TotalCurancy) + totalCurancy;
        $('#TotalItems').val(total);
        $('#TotalCurancy').val(totalCurancy);
    }
}
