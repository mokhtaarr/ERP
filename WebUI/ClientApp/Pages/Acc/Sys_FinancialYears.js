$(document).ready(function () {
    SharedButtons.OnLoad();
    SysFinancialYears.InitalizeComponent();
});
var SysFinancialYears;
(function (SysFinancialYears) {
    $('#headertop1').addClass('display_none');
    $('#headertop2').removeClass('display_none');
    var Resource = GetResourceList("");
    $('#headerTitle').text(Resource.FinancialPeriods);
    var sys = new SystemTools();
    var language = sys.SysSession.CurrentEnvironment.ScreenLanguage;
    var SysSession = GetSystemSession();
    var compCode = SysSession.CurrentEnvironment.CompCode;
    var UserCode = SysSession.CurrentEnvironment.UserCode;
    var Token = "HGFD-" + SysSession.CurrentEnvironment.Token;
    var FinancialYears = new Array();
    var Model = new Sys_FinancialYears();
    var Intervals = new Array();
    var Interval = new Sys_FinancialIntervals();
    var Details = new FinancialYearsDetails();
    //select Options
    var element;
    var CreateIntervalsAutomatically;
    var ObjectId = 0;
    var StatusFlag;
    var Success;
    var flag = true;
    var GridInputClassName = "form-control gridIput";
    var divIntervalsGrid = new JsGrid();
    var Periods = new JsGrid();
    function InitalizeComponent() {
        localStorage.setItem("TableName", "Sys_FinancialYears");
        NavigateModule.InitalizeComponent();
        SharedButtons.compcode = Number(SysSession.CurrentEnvironment.CompCode);
        SharedWork.OnNavigate = Navigate;
        SharedButtons.AddAction(function () {
            btnAdd_onclick();
        });
        SharedButtons.DeleteAction(function () { btnDelete_onclick(); });
        SharedButtons.EditAction(function () { btnEdit_onclick(); });
        SharedButtons.UndoAction(function () {
            Undo();
            if (ObjectId == 0)
                SharedWork.SwitchModes(ScreenModes.Start);
        });
        SharedButtons.SaveAction(function () {
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
        InitializeIntervalsGrid();
        SetDefaultDate();
    }
    SysFinancialYears.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        SharedButtons.btnSearch = document.getElementById("btnSys_FinancialYearsSearch");
        CreateIntervalsAutomatically = document.getElementById("CreateIntervalsAutomatically");
    }
    function InitalizeEvents() {
        SharedButtons.btnSearch.onclick = btnSearch_onclick;
        SharedButtons.btnRefrash2.onclick = Refrash;
        CreateIntervalsAutomatically.onclick = GenerateIntervals;
    }
    function GetAll() {
        Disabled(false);
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("Sys_FinancialYears", "GetAll"),
            success: function (d) {
                var result = d;
                if (result.IsSuccess) {
                    FinancialYears = result.Response;
                    Periods.DataSource = FinancialYears;
                    Periods.Bind();
                }
            }
        });
    }
    function GetByID(Id) {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("Sys_FinancialYears", "GetById"),
            data: { id: Id },
            success: function (d) {
                var result = d;
                if (result.IsSuccess) {
                    var res = result.Response;
                    Display(res);
                    SharedWork.SwitchModes(ScreenModes.Query);
                }
                else
                    MessageBox.Toastr(Resource.Error, Resource.Error, ToastrTypes.error);
            }
        });
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("Sys_FinancialYears", "GetFinancialIntervals"),
            data: { id: Id },
            success: function (d) {
                var result = d;
                if (result.IsSuccess) {
                    Intervals = result.Response;
                    for (var i = 0; i < Intervals.length; i++) {
                        Intervals[i].StartingFrom = moment(Intervals[i].StartingFrom).format("DD/MM/YYYY");
                        Intervals[i].EndingDate = moment(Intervals[i].EndingDate).format("DD/MM/YYYY");
                    }
                    divIntervalsGrid.DataSource = Intervals;
                    divIntervalsGrid.Bind();
                }
            }
        });
    }
    function Assign() {
        Details.Model = DocumentActions.AssignToModel(Model);
        Details.Intervals = Intervals;
        if (StatusFlag == "i") {
            Model.CreatedAt = DateTimeFormat(Date().toString());
            Model.CreatedBy = SysSession.CurrentEnvironment.UserCode;
            Insert();
        }
        if (StatusFlag == "u") {
            Model.FinancialYearsId = ObjectId;
            Model.UpdatedAt = DateTimeFormat(Date().toString());
            Model.UpdatedBy = SysSession.CurrentEnvironment.UserCode;
            Update();
        }
        ObjectId = Model.FinancialYearsId;
        GetAll();
        return true;
    }
    function Save() {
        if (DocumentActions.CheckCode(FinancialYears, DocumentActions.GetElementByName("FinancialYearsCode").value, "FinancialYearsCode") == false && StatusFlag == "i") {
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
            url: sys.apiUrl("Sys_FinancialYears", "Insert"),
            data: JSON.stringify(Details),
            success: function (Response) {
                var result = Response;
                if (result.IsSuccess) {
                    Model = result.Response;
                    ObjectId = Model.FinancialYearsId;
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
            url: sys.apiUrl("Sys_FinancialYears", "Update"),
            data: JSON.stringify(Details),
            success: function (Response) {
                var result = Response;
                if (result.IsSuccess) {
                    Model = result.Response;
                    ObjectId = Model.FinancialYearsId;
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
    function Delete() {
        $("#MessageBoxDialog").modal("hide");
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("Sys_FinancialYears", "Delete"),
            data: { id: Model.FinancialYearsId },
            success: function (result) {
                if (result) {
                    Success = true;
                    ObjectId = 0;
                    GetAll();
                    Disabled(result);
                    $('select').val('null').select2().trigger('change');
                    MessageBox.Toastr(Resource.DeletedSucc, "", ToastrTypes.success);
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
        ClearJsGrid();
        element = DocumentActions.GetElementById("CreateIntervalsAutomatically");
        element.disabled = false;
        element = DocumentActions.GetElementByName("YearState");
        element.disabled = true;
    }
    function btnEdit_onclick() {
        if (ObjectId == 0) {
            MessageBox.Toastr(Resource.PleaseSelectItem, Resource.Error, ToastrTypes.error);
        }
        else {
            RemoveDisabled(false);
            debugger;
            element = DocumentActions.GetElementByName("FinancialYearsCode");
            element.disabled = true;
            element = DocumentActions.GetElementByName("YearState");
            element.disabled = true;
            element = DocumentActions.GetElementById("CreateIntervalsAutomatically");
            element.disabled = false;
            StatusFlag = 'u';
        }
    }
    function btnsave_onClick() {
        if (!Validation())
            return;
        Save();
        element = DocumentActions.GetElementById("CreateIntervalsAutomatically");
        element.disabled = true;
    }
    function btnDelete_onclick() {
        StatusFlag == "d";
        if (ObjectId == 0) {
            MessageBox.Toastr(Resource.PleaseSelectItem, Resource.Error, ToastrTypes.error);
        }
        else {
            Delete();
            element = DocumentActions.GetElementById("CreateIntervalsAutomatically");
            element.disabled = true;
        }
    }
    function Validation() {
        if (DocumentActions.GetElementByName("FinancialYearsCode").value == "") {
            MessageBox.Toastr(Resource.PleaseEnterCode, Resource.Error, ToastrTypes.error);
            flag = false;
        }
        else if (DocumentActions.GetElementByName("FinancialYearNameA").value == "") {
            MessageBox.Toastr(Resource.PleaseEnterNameArabic, Resource.Error, ToastrTypes.error);
            flag = false;
        }
        else
            flag = true;
        return flag;
    }
    function Navigate() {
        debugger;
        Model = FinancialYears[SharedWork.PageIndex - 1];
        ObjectId = Model.FinancialYearsId;
        GetByID(ObjectId);
    }
    SysFinancialYears.Navigate = Navigate;
    function Display(model) {
        Model = model;
        DocumentActions.RenderFromModel(Model);
        ObjectId = Number(Model.FinancialYearsId);
    }
    function Undo() {
        Disabled(false);
        ClearJsGrid();
        Success = false;
        if (ObjectId != 0) {
            GetByID(ObjectId);
        }
        else
            SetDefaultDate();
        element = DocumentActions.GetElementById("CreateIntervalsAutomatically");
        element.disabled = true;
    }
    function Disabled(clear) {
        DocumentActions.allElements(true, clear, Model);
    }
    function RemoveDisabled(clear) {
        DocumentActions.allElements(false, clear, Model);
    }
    function InitializeGrid() {
        Periods.ElementName = "Periods";
        Periods.PrimaryKey = "FinancialYearsId";
        Periods.Editing = true;
        Periods.Paging = true;
        Periods.Sorting = true;
        Periods.PageSize = 50;
        Periods.ConfirmDeleteing = true;
        Periods.InsertionMode = JsGridInsertionMode.Binding;
        Periods.OnRowSelected = function () {
            GetByID(Number(Periods.SelectedItem.FinancialYearsId));
            SharedWork.SwitchModes(ScreenModes.Query);
        };
        //Periods.OnRowDoubleClicked = () => {
        //    GetByID(Number(Periods.SelectedItem.FinancialYearsId));
        //    SharedWork.SwitchModes(ScreenModes.Query);
        //}
        Periods.Columns = [
            {
                title: Resource.PeriodCode, css: "ColumPadding", name: "FinancialYearsCode"
            },
            {
                title: Resource.PeriodName, css: "ColumPadding", name: (language == "ar" ? "FinancialYearNameA" : "FinancialYearNameE")
            },
            {
                title: Resource.FinancialYearsId, css: "ColumPadding hidden", name: "FinancialYearsId"
            },
        ];
        Periods.Bind();
    }
    function InitializeIntervalsGrid() {
        divIntervalsGrid.ElementName = "divIntervalsGrid";
        divIntervalsGrid.PrimaryKey = "JurnalDetailId";
        divIntervalsGrid.Filtering = false;
        divIntervalsGrid.Inserting = false;
        divIntervalsGrid.Editing = true;
        divIntervalsGrid.Paging = true;
        divIntervalsGrid.Sorting = true;
        divIntervalsGrid.PageSize = 10;
        divIntervalsGrid.ConfirmDeleteing = true;
        divIntervalsGrid.InsertionMode = JsGridInsertionMode.Binding;
        divIntervalsGrid.OnItemInserting = function () { };
        divIntervalsGrid.OnItemUpdating = function () { };
        divIntervalsGrid.OnItemDeleting = function () { };
        divIntervalsGrid.OnRowSelected = function () { };
        divIntervalsGrid.OnRowDoubleClicked = function () { };
        divIntervalsGrid.Columns = [
            {
                title: Resource.PeriodCode, name: "FinancialIntervalCode"
                //, headerTemplate: (): HTMLElement => {
                //    let txt = CreateElement("text", GridInputClassName, " ", " ", "FinancialIntervalCode", " ");
                //    txt.id = "hd_FinancialIntervalCode";
                //    return HeaderTemplate(Resource.PeriodCode, txt);
                //}
            },
            {
                title: Resource.PeriodName + " 1", name: "MonthNameA"
                //, headerTemplate: (): HTMLElement => {
                //    let txt = CreateElement("text", GridInputClassName, " ", " ", "MonthNameA", " ");
                //    txt.id = "hd_MonthNameA";
                //    return HeaderTemplate(Resource.PeriodName + " 1", txt);
                //}
            },
            {
                title: Resource.PeriodName + " 2", css: "ColumPadding", name: "MonthNameE"
                //, headerTemplate: (): HTMLElement => {
                //    let txt = CreateElement("text", GridInputClassName, " ", " ", "MonthNameE", " ");
                //    txt.id = "hd_MonthNameE";
                //    return HeaderTemplate(Resource.PeriodName + " 2", txt);
                //}
            },
            {
                title: Resource.StartDate, css: "ColumPadding", name: "StartingFrom"
                //, type: "date", headerTemplate: (): HTMLElement => {
                //    let txt = CreateElement("date", GridInputClassName, " ", " ", "StartingFrom", " ");
                //    txt.id = "hd_StartingFrom";
                //    return HeaderTemplate(Resource.StartDate, txt);
                //}
            },
            {
                title: Resource.EndDate, css: "ColumPadding", name: "EndingDate"
                //, type: "EndingDate", headerTemplate: (): HTMLElement => {
                //    let txt = CreateElement("date", GridInputClassName, " ", " ", "EndingDate", " ");
                //    txt.id = "hd_EndingDate";
                //    return HeaderTemplate(Resource.EndDate, txt);
                //}
            },
            {
                title: Resource.Closed, css: "ColumPadding", name: "IsClosed", type: "checkbox"
                //, headerTemplate: (): HTMLElement => {
                //    let txt = CreateElement("checkbox", GridInputClassName, " ", " ", "IsClosed", " ");
                //    txt.id = "hd_IsClosed";
                //    return HeaderTemplate(Resource.Closed, txt);
                //}
            },
            {
                title: Resource.Active, css: "ColumPadding", name: "IsActive", type: "checkbox"
                //, headerTemplate: (): HTMLElement => {
                //    let txt = CreateElement("checkbox", GridInputClassName, " ", " ", "IsActive", " ");
                //    txt.id = "hd_IsActive";
                //    return HeaderTemplate(Resource.Active, txt);
                //}
            },
            {
                title: Resource.ReasonForStopping, css: "ColumPadding", name: "StopReason"
                //, headerTemplate: (): HTMLElement => {
                //    let txt = CreateElement("text", GridInputClassName, " ", " ", "StopReason", " ");
                //    txt.id = "hd_StopReason";
                //    return HeaderTemplate(Resource.ReasonForStopping, txt);
                //}
            },
            {
                title: "Flag", css: "ColumPadding hide", name: "Flag", width: "1%", headerTemplate: function () {
                    var txt = CreateElement("text", GridInputClassName, " ", " ", "Flag", " ");
                    txt.disabled = false;
                    txt.id = "hd_Flag";
                    return HeaderTemplate("Flag", txt);
                }
            },
        ];
        divIntervalsGrid.Bind();
    }
    function ClearJsGrid() {
        Intervals = Array();
        divIntervalsGrid.DataSource = Intervals;
        divIntervalsGrid.Bind();
    }
    var unitOfTime = "", amount = 0, diff = 0;
    function GenerateIntervals() {
        if ($('#StartingFrom').val() == "" || $('#EndTo').val() == "") {
            MessageBox.Toastr(Resource.chooseValidStartAndEndDate, Resource.Error, ToastrTypes.error);
            return;
        }
        Intervals = new Array();
        Interval = new Sys_FinancialIntervals();
        var starting = moment($('#StartingFrom').val()).format('DD/MM/YYYY'), ending = ConvertTDate($('#EndTo').val()), dateGenerated = ConvertTDate(starting), _PeriodPartsType = $('#SubPeriodsType').val(), ShutdownMethod = $('input[name="ShutdownMethod"]:checked').val(), totalIntervals = 0, _totalDaysInMonth = moment($('#StartingFrom').val(), "DD/MM/YYYY").daysInMonth(), year = moment($('#StartingFrom').val(), "YYYY").year(), dayInMonth = Number(moment($('#StartingFrom').val(), "YYYY-MM-DD").format('DD')), month = 1, num = 1;
        Generate(_PeriodPartsType, ShutdownMethod);
        if (dayInMonth != 1 && ShutdownMethod == 2) {
            var totalDaysInMonth = moment($('#StartingFrom').val(), "DD/MM/YYYY").daysInMonth(), _totalDaysInMonth_1 = totalDaysInMonth;
            diff = totalDaysInMonth - dayInMonth,
                dateGenerated = ConvertTDate("01/" + moment($('#StartingFrom').val()).format('MM/YYYY'));
        }
        while (ending >= dateGenerated) {
            var strDate = moment(dateGenerated).format('DD/MM/YYYY'), newDate = moment(strDate, "DD/MM/YYYY").add(amount, unitOfTime).format('DD/MM/YYYY');
            dateGenerated = ConvertTDate(newDate);
            Interval = new Sys_FinancialIntervals();
            if (dateGenerated >= ending) {
                //console.log(num + " / " + month + "-" + year + " form " + strDate + " To " + moment(ending).format('DD/MM/YYYY'));
                Interval.MonthNameE = moment(strDate, "DD/MM/YYYY").format('MMMM');
                Interval.MonthNameA = GetNameOfMonth(Interval.MonthNameE);
                Interval.EndingDate = moment(ending).format('DD/MM/YYYY');
                Interval.FinancialIntervalCode = year + "-" + month;
                Interval.StartingFrom = strDate;
                Interval.IsActive = true;
                Intervals.push(Interval);
                break;
            }
            else {
                //console.log(num + " / " + month + "-" + year + " form " + strDate + " To " + moment(newDate, "DD/MM/YYYY").subtract(1, 'days').format('DD/MM/YYYY'));
                Interval.EndingDate = moment(newDate, "DD/MM/YYYY").subtract(1, 'days').format('DD/MM/YYYY');
                Interval.FinancialIntervalCode = year + "-" + month;
                Interval.MonthNameE = moment(strDate, "DD/MM/YYYY").format('MMMM');
                Interval.MonthNameA = GetNameOfMonth(Interval.MonthNameE);
                if (ShutdownMethod == 2) {
                    if (diff != 0) {
                        if (num == 1) {
                            Interval.StartingFrom = moment(strDate).add(diff, 'days').format('DD/MM/YYYY');
                            if (unitOfTime != "days")
                                diff = 0;
                            else {
                                Interval.EndingDate = Interval.StartingFrom;
                                newDate = moment(Interval.StartingFrom, "DD/MM/YYYY").add(amount, unitOfTime).format('DD/MM/YYYY');
                                dateGenerated = ConvertTDate(newDate);
                            }
                        }
                        else {
                            Interval.StartingFrom = strDate;
                        }
                    }
                    else {
                        Interval.StartingFrom = strDate;
                    }
                }
                else {
                    num = GenerateNonOverlapping(starting, ending);
                    break;
                }
                Interval.IsActive = true;
                Intervals.push(Interval);
            }
            month++;
            num++;
            if (year != moment(newDate, "DD/MM/YYYY").year()) {
                year = moment(newDate, "DD/MM/YYYY").year();
                month = 1;
            }
        }
        $('#NoOfIntervals').val(num);
        divIntervalsGrid.DataSource = Intervals;
        divIntervalsGrid.Bind();
    }
    function GenerateNonOverlapping(starting, ending) {
        Intervals = new Array();
        Interval = new Sys_FinancialIntervals();
        var formDate = ConvertTDate(starting), year = moment(starting, "DD/MM/YYYY").year(), month = 1;
        for (formDate; formDate <= ending;) {
            Interval = new Sys_FinancialIntervals();
            var fromStr = moment(formDate).format('DD/MM/YYYY');
            Interval.StartingFrom = fromStr;
            Interval.MonthNameE = moment(fromStr, "DD/MM/YYYY").format('MMMM');
            Interval.MonthNameA = GetNameOfMonth(Interval.MonthNameE);
            var daysInMonth = moment(fromStr, "DD/MM/YYYY").daysInMonth(), toStr = moment(fromStr, "DD/MM/YYYY").add(daysInMonth, "days").format('DD/MM/YYYY');
            Interval.EndingDate = toStr;
            fromStr = moment(toStr, "DD/MM/YYYY").add(1, "days").format('DD/MM/YYYY');
            formDate = ConvertTDate(fromStr);
            if (formDate >= ending)
                Interval.EndingDate = moment(ending).format('DD/MM/YYYY');
            Interval.FinancialIntervalCode = year + "-" + month;
            Interval.IsActive = true;
            Intervals.push(Interval);
            month++;
        }
        return month - 1;
    }
    function Generate(_PeriodPartsType, ShutdownMethod) {
        switch (Number(_PeriodPartsType)) {
            case 1:
                unitOfTime = "months";
                amount = 1;
                break;
            case 2:
                unitOfTime = "months";
                amount = 3;
                break;
            case 3:
                unitOfTime = "days";
                amount = 1;
                break;
            case 4:
                unitOfTime = "years";
                amount = 1;
                break;
            default:
                unitOfTime = "months";
                amount = 1;
                break;
        }
    }
    function GetNameOfMonth(month) {
        var ArMonth = "";
        switch (month) {
            case "January":
                ArMonth = "يناير";
                break;
            case "February":
                ArMonth = "فبراير";
                break;
            case "March":
                ArMonth = "مارس";
                break;
            case "April":
                ArMonth = "ابريل";
                break;
            case "May":
                ArMonth = "مايو";
                break;
            case "June":
                ArMonth = "يونيو";
                break;
            case "July":
                ArMonth = "يوليو";
                break;
            case "August":
                ArMonth = "أغسطس";
                break;
            case "September":
                ArMonth = "سبتمبر";
                break;
            case "October":
                ArMonth = "أكتوبر";
                break;
            case "November":
                ArMonth = "نوفمبر";
                break;
            case "December":
                ArMonth = "ديسمبر";
                break;
        }
        return ArMonth;
    }
    function SetDefaultDate() {
        var date = moment(new Date()).format('YYYY-MM-DD');
        $.each($('input[type="date"]'), function (index, e) {
            e.value = date;
        });
    }
    function btnSearch_onclick() {
        var sys = new SystemTools();
        sys.FindKey(Modules.Sys_FinancialYears, SharedButtons.btnSearch.id, "", function () {
            var id = SearchGrid.SearchDataGrid.SelectedKey;
            if (!IsNullOrEmpty(id)) {
                GetByID(ObjectId);
            }
        });
    }
    function Refrash() {
        GetAll();
        GetByID(ObjectId);
    }
})(SysFinancialYears || (SysFinancialYears = {}));
//# sourceMappingURL=Sys_FinancialYears.js.map