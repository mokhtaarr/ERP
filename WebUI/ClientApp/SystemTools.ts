var _moduleCode: any;
var _SearchControlName: any;
var _Condition: any;
var _OnSearchSelected: any;
let _SystemCode: any;
let _SubSystemCode: any;
let _ScreenLanguage: any;
let _Url: any;
let _GetResulte: any;
let _GetNameAndValue: any;
var arr = new Array<NameAndValueInSearch>();

var temSearsh = `<div class="searchInStart text-center p-5">`;
var temBtnSearsh = `<button class="btn btn-info ml-3" id="searchInStartBtn">بـحــث</button></div>`;
var temDynamicInputs = "";

$(document).ready(() => {
    _SystemTools.InitalizeComponent();
});

namespace _SystemTools {
    export function InitalizeComponent() {
        try {
            SharedButtons.InitalizeComponent();
            var sys: SystemTools = new SystemTools();
            SharedButtons.btnResetSearch.onclick = sys.resetSearch;
        } catch (e) {
        }
    }
}

class SystemTools {
    constructor() {
        this.orgCondition = "";
        this.SysSession = GetSystemSession();
    }

    public orgCondition: string;
    public SysSession: SystemSession;

    public apiUrl(controller: string, action: string) {
        var apiUrl = $("#GetAPIUrl").val() + controller + "/" + action;

        return (apiUrl);
    }

    public getJsonData(model: any, type: string = ""): any {

        switch (type) {
            case "Insert":
                model.CreatedAt = DateTimeFormat(GetCurrentDate().toString());
                model.CreatedBy = this.SysSession.CurrentEnvironment.UserCode;
                break;
            case "Update":
                model.UpdatedAt = DateTimeFormat(GetCurrentDate().toString());
                model.UpdatedBy = this.SysSession.CurrentEnvironment.UserCode;
                break;
            default:
                break;
        }

        var res = JSON.stringify(model)
        return res;
    }

    public GetResourceByName<T>(callbackfn: (value: T, index: number, array: T[]) => any): string {
        let func: string = callbackfn.toString().split(".")[1].split(";")[0];
        let result = Ajax.Call<string>({
            url: Url.Action("GetResourceByName", "ClientTools"),
            data: { key: func }

        });
        return result;
    }

    public GetFavorites() {
        var data = {
            session: this.SysSession.CurrentEnvironment
        };

        let UserCode = this.SysSession.CurrentEnvironment.UserCode;
        let SystemCode = this.SysSession.CurrentEnvironment.SystemCode;
        let SubSystemCode = this.SysSession.CurrentEnvironment.SubSystemCode;

        $.ajax({
            url: this.apiUrl("SystemTools", "GetFavorites"),
            data: { UserCode: UserCode, SystemCode: SystemCode, SubSystemCode: SubSystemCode },
            success: (response) => {

                let result = response as Array<FavModules>;
                SharedWork.UserFavorits = result;
                this.SwitchFavoriteIcon();
                let div = DocumentActions.GetElementById<HTMLUListElement>("favourite_div");// document.getElementById("favourite_div") as HTMLDivElement;
                div.innerHTML = "";

                for (var fav of result) {
                    let li: HTMLLIElement = DocumentActions.CreateElement<HTMLLIElement>("li");
                    let desc: string = "";
                    if (this.SysSession.CurrentEnvironment.ScreenLanguage == "en")
                        desc = fav.MODULE_DESCE;
                    else
                        desc = fav.MODULE_DESCA;
                    li.innerHTML = `
                        <a href="#" onclick="HomeComponent.OpenView('`+ fav.MODULE_CODE + `','` + fav.MODULE_CODE + `');">
                            <strong>`+ desc + `</strong>
                        </a>`;
                    div.appendChild(li);
                }
            }
        });
    }

    private SwitchFavoriteIcon() {
        //imgFavUrl

        if (sessionStorage.getItem("MODU_CODE") == null) {
            sessionStorage.setItem("imgFavUrl", "../images/favourit.gif");
            return;
        }
        let favs = SharedWork.UserFavorits.filter(f => f.MODULE_CODE == sessionStorage.getItem("MODU_CODE"));

        let favImage = DocumentActions.GetElementById<HTMLImageElement>("favImage");
        if (favs.length > 0) { // This page is in favorite list
            //sessionStorage.setItem("imgFavUrl", "../images/favourit.gif");
            //$("#imgFavUrl").val("../images/favourit.gif");
            favImage.src = "../images/favourit.gif";
        }
        else {
            //$("#imgFavUrl").val("../images/favourit2.gif");
            //sessionStorage.setItem("imgFavUrl", "../images/favourit2.gif");
            favImage.src = "../images/favourit2.gif";
        }
    }

    public SwitchUserFavorite() {
        let UserCode = this.SysSession.CurrentEnvironment.UserCode;
        let Modulecode = this.SysSession.CurrentPrivileges.MODULE_CODE;
        let SubSystemCode = this.SysSession.CurrentEnvironment.SubSystemCode;

        Ajax.CallAsync({
            type: "GET",
            url: this.apiUrl("SystemTools", "SwitchUserFavorite"),
            data: { UserCode: UserCode, Modulecode: Modulecode, SubSystemCode: SubSystemCode },
            success: (response) => {
                this.GetFavorites();
            }
        });

    }

    public searchInStartBtn: HTMLSelectElement;

    public GetColumns(code: string): string {
        Ajax.CallAsync({
            url: this.apiUrl("SystemTools", "GetColumns"),
            data: { code: code },
            async: true,
            success: (resp) => {
                if (resp != "codeIsNullOrEmpty") {
                    try {
                        var res = JSON.parse(resp);
                        temDynamicInputs = temSearsh;
                        for (var i = 0; i < res.length; i++) {
                            temDynamicInputs += `<input class="inputSearch form-control" id="${res[i].DataMember}" type="text" name="${res[i].DataMember}" value="" placeholder="ابحث هنا ... ${res[i].FieldTitleA}"> <br/>`;
                        }
                        temDynamicInputs += temBtnSearsh;
                        this.Searsh(temDynamicInputs);
                    } catch (e) {
                    }
                }
            }
        });
        return "";
    }

    public Searsh(DynamicInputs: string) {
        $("#tableDiv").parent().removeClass("tableDivPerant");
        $("#tableDiv").html(DynamicInputs);
        $("#SearchBox").addClass("CustomStyleSearshBox");
        $("#SearchBox").modal("show");
        if (document.getElementById('searchInStartBtn'))
            document.getElementById('searchInStartBtn').onclick = this.GetResulte;
    }

    public FindKey(moduleCode: string, SearchControlName: string, Condition: string, OnSearchSelected: () => void) {
        _Url = this.apiUrl("SystemTools", "FindKey");
        _moduleCode = moduleCode;
        _SearchControlName = SearchControlName;
        _Condition = Condition;
        _OnSearchSelected = OnSearchSelected;
        _GetResulte = this.GetResulte;
        _GetNameAndValue = this.GetNameAndValue;

        _SystemCode = this.SysSession.CurrentEnvironment.SystemCode;
        _SubSystemCode = this.SysSession.CurrentEnvironment.SubSystemCode;
        _ScreenLanguage = this.SysSession.CurrentEnvironment.ScreenLanguage;

        this.GetColumns(_moduleCode);
       /* this.Searsh();*/
    }

    public resetSearch() {
        if ($("#tableDiv").parent().hasClass("tableDivPerant")) {
            $("#tableDiv").parent().removeClass("tableDivPerant");
            temDynamicInputs/* += temBtnSearsh*/;
            $("#tableDiv").html(temDynamicInputs);

            if (document.getElementById('searchInStartBtn'))
                document.getElementById('searchInStartBtn').onclick = _GetResulte;
        }
    }

    public GetNameAndValue() {
        var list = $('.inputSearch')
        var obj = new NameAndValueInSearch;
        arr = new Array<NameAndValueInSearch>();

        for (var i = 0; i < list.length; i++) {
            obj = new NameAndValueInSearch;
            let object = list[i] as HTMLInputElement;
            obj.Name = object.name;
            obj.Value = object.value;
            if (object.value != "")
                arr.push(obj);
        }
    }

    public GetResulte() {
        _GetNameAndValue()
        if (arr.length != 0) {
            this.orgCondition = _Condition;
            Ajax.CallAsync({
                url: _Url,
                data: {
                    moduleCode: _moduleCode,
                    Condition: _Condition,
                    valueInSearches: JSON.stringify(arr),
                    controlName: _SearchControlName,
                    SystemCode: _SystemCode,
                    SubSystemCode: _SubSystemCode,
                    ScreenLanguage: _ScreenLanguage
                },
                async: true,
                success: (resp) => {
                    var response = resp;
                    if (response == null) {
                        MessageBox.Show("Search not available, Please call your app administrator", "Search");
                        return;
                    }
                    $("#tableDiv").parent().addClass("tableDivPerant");

                    let columns = response.Columns as Array<datatableColumn>;
                    let result = JSON.parse(response.DataResult);
                    let settings = response.Settings as G_SearchForm;
                    let TableName = response.TableName as string;
                    let Condition = response.Condition as string;

                    SearchGrid.SearchDataGrid = new DataTable();
                    SearchGrid.SearchDataGrid.Columns = columns;

                    SearchGrid.SearchDataGrid.dataScr = result;
                    SearchGrid.SearchDataGrid.ElementName = "SearchDataTable";
                    SearchGrid.SearchDataGrid.PageSize = settings.PageSize;// < 50 ? 50 : settings.PageSize;
                    SearchGrid.SearchDataGrid.PrimaryKey = settings.ReturnDataPropertyName; //"RowIndex";

                    let boxWidth: string = settings.Width <= 100 ? "80%" : settings.Width.toString() + "px";
                    let boxHeight: string = settings.Height <= 100 ? "80%" : settings.Height.toString() + "px";
                    let boxLeft: string = settings.Left <= 50 ? "5%" : settings.Left.toString() + "px";
                    let boxTop: string = settings.Top <= 50 ? "10%" : settings.Top.toString() + "px";

                    //$("#SearchBox").css("width", boxWidth);
                    //$("#SearchBox").css("height", boxHeight);
                    //$("#SearchBox").css("left", boxLeft);
                    //$("#SearchBox").css("top", boxTop);
                    
                    SearchGrid.SearchDataGrid.Bind();

                    SearchGrid.SearchDataGrid.OnDoubleClick = () => {
                        //.css("display", "none");
                        $("#SearchBox").modal("hide");
                        _OnSearchSelected();
                    };

                    try {
                        if (_ScreenLanguage == "ar") {
                            document.getElementById("searchTitle").innerText = settings.SerachFormTitleA;
                        }
                        else if (_ScreenLanguage == "en") {
                            document.getElementById("searchTitle").innerText = settings.SerachFormTitle;
                        }
                        document.getElementById("searchDes").innerText = settings.Description;
                    } catch (e) {
                        console.log('error in language...');
                    }

                    $(".ui-igedit-input").keyup((e) => {

                    });

                    $("#SearchBox").modal("show");//.css("display", "");//
                    // $("#SearchBox").addClass("in");//.css("display", "");//
                    $("#SearchDataTable").css("width", "100%");
                    $("#SearchDataTable").css("height", "100%");
                }
            });
        } else {
            MessageBox.Show("لا يوجد بيانات للبحث بها !", "خطأء");
        }
    }

    //old code
    //public FindNotification(moduleCode: string, _SearchControlName: string, Condition: string, OnSearchSelected: () => void) {
    //    this.orgCondition = Condition;

    //    Ajax.CallAsync({
    //        url: Url.Action("Find", "ClientTools"),
    //        data: {
    //            moduleCode: moduleCode,
    //            Condition: Condition,
    //            controlName: _SearchControlName//$("#SearchControlName").val()
    //        },
    //        async: true,
    //        success: (resp) => {
    //            var response = resp.result;
    //            if (response == null) {
    //                MessageBox.Show("Search not available, Please call your app administrator", "Search");
    //                return;
    //            }

    //            let columns = response.Columns as Array<datatableColumn>;
    //            let result = JSON.parse(response.DataResult);

    //            let settings = response.Settings as G_SearchForm;
    //            let TableName = response.TableName as string;
    //            let Condition = response.Condition as string;

    //            SearchGrid.SearchDataGrid = new DataTable();
    //            SearchGrid.SearchDataGrid.Columns = columns;

    //            SearchGrid.SearchDataGrid.dataScr = result;
    //            SearchGrid.SearchDataGrid.ElementName = "SearchDataTable";
    //            SearchGrid.SearchDataGrid.PageSize = settings.PageSize;// < 50 ? 50 : settings.PageSize;
    //            SearchGrid.SearchDataGrid.PrimaryKey = settings.ReturnDataPropertyName; //"RowIndex";

    //            let boxWidth: string = settings.Width <= 100 ? "70%" : settings.Width.toString() + "px";
    //            let boxHeight: string = settings.Height <= 100 ? "50%" : settings.Height.toString() + "px";
    //            let boxLeft: string = settings.Left <= 50 ? "14%" : settings.Left.toString() + "px";
    //            let boxTop: string = settings.Top <= 50 ? "10%" : settings.Top.toString() + "px";

    //            $("#SearchBox").css("width", boxWidth);
    //            $("#SearchBox").css("height", boxHeight);
    //            $("#SearchBox").css("left", boxLeft);
    //            $("#SearchBox").css("top", boxTop);

    //            SearchGrid.SearchDataGrid.Bind();



    //            try {
    //                if (SysSession.CurrentEnvironment.ScreenLanguage == "ar") {
    //                    document.getElementById("searchTitle").innerText = settings.SerachFormTitleA;
    //                }
    //                else if (SysSession.CurrentEnvironment.ScreenLanguage == "en") {
    //                    document.getElementById("searchTitle").innerText = settings.SerachFormTitle;
    //                }
    //            } catch (e) {
    //                console.log('error in language...');
    //            }

    //            $(".ui-igedit-input").keyup((e) => {

    //            });

    //            $("#SearchBox").modal("show");//.css("display", "");//
    //            $("#SearchDataTable").css("width", "100%");
    //            $("#SearchDataTable").css("height", "100%");
    //        }
    //    });
    //}

    //new code//
    public FindNotification(moduleCode: string, _SearchControlName: string, Condition: string, OnSearchSelected: () => void) {
        this.orgCondition = Condition;
        Ajax.CallAsync({
            url: this.apiUrl("SystemTools", "Find"),
            data: {
                moduleCode: moduleCode,
                Condition: Condition,
                controlName: _SearchControlName
            },
            async: true,
            success: (resp) => {
                var response = resp.result;
                if (response == null) {
                    MessageBox.Show("Search not available, Please call your app administrator", "Search");
                    return;
                }

                let columns = response.Columns as Array<datatableColumn>;
                let result = JSON.parse(response.DataResult);

                let settings = response.Settings as G_SearchForm;
                let TableName = response.TableName as string;
                let Condition = response.Condition as string;

                SearchGrid.SearchDataGrid = new DataTable();
                SearchGrid.SearchDataGrid.Columns = columns;

                SearchGrid.SearchDataGrid.dataScr = result;
                SearchGrid.SearchDataGrid.ElementName = "SearchDataTable";
                SearchGrid.SearchDataGrid.PageSize = settings.PageSize;// < 50 ? 50 : settings.PageSize;
                SearchGrid.SearchDataGrid.PrimaryKey = settings.ReturnDataPropertyName; //"RowIndex";

                let boxWidth: string = settings.Width <= 100 ? "70%" : settings.Width.toString() + "px";
                let boxHeight: string = settings.Height <= 100 ? "50%" : settings.Height.toString() + "px";
                let boxLeft: string = settings.Left <= 50 ? "14%" : settings.Left.toString() + "px";
                let boxTop: string = settings.Top <= 50 ? "10%" : settings.Top.toString() + "px";

                $("#SearchBox").css("width", boxWidth);
                $("#SearchBox").css("height", boxHeight);
                $("#SearchBox").css("left", boxLeft);
                $("#SearchBox").css("top", boxTop);

                SearchGrid.SearchDataGrid.Bind();



                try {
                    if (this.SysSession.CurrentEnvironment.ScreenLanguage == "ar") {
                        document.getElementById("searchTitle").innerText = settings.SerachFormTitleA;
                    }
                    else if (this.SysSession.CurrentEnvironment.ScreenLanguage == "en") {
                        document.getElementById("searchTitle").innerText = settings.SerachFormTitle;
                    }
                } catch (e) {
                    console.log('error in language...');
                }

                $(".ui-igedit-input").keyup((e) => {

                });

                $("#SearchBox").modal("show");//.css("display", "");//
                $("#SearchDataTable").css("width", "100%");
                $("#SearchDataTable").css("height", "100%");
            }
        });
    }
    //***********************************************//
    private GenerateFiltersKey(moduleCode: string, sh: string, columns: Array<datatableColumn>, dataSource: Array<any>, onSuccess: (dd) => void) {
        let SearchFilters = DocumentActions.GetElementById<HTMLTableRowElement>("SearchFilters");
        let sqlConditions: Array<string> = new Array<string>();
        SearchFilters.innerHTML = "";

        let SearchFilterTypes = DocumentActions.GetElementById<HTMLTableRowElement>("SearchFilterTypes");
        SearchFilterTypes.innerHTML = "";
        for (var column of columns) {
            if (column.hidden == true)
                continue;
            let txt: HTMLInputElement = DocumentActions.CreateElement<HTMLInputElement>("input");
            if (column.dataType == "number")
                txt.type = "number";
            else if (column.dataType == "date")
                txt.type = "date";
            else
                txt.type = "text";
            txt.placeholder = column.headerText;
            txt.className = "form-control";
            txt.tabIndex = columns.indexOf(column);
            txt.id = "Filter_" + column.key;
            sqlConditions.push("");
            txt.onkeyup = (e) => {
                //if (e.key != Keys.Enter)
                //    return;
                let currentInput = (e.currentTarget as HTMLInputElement) as HTMLInputElement;
                let colIndex = currentInput.tabIndex;
                let columnKey: string = currentInput.id.replace("Filter_", "");
                if (currentInput.value != "" && currentInput.value != null)
                    sqlConditions[colIndex] = columnKey + $("#FType_" + columnKey).val().replace("{0}", currentInput.value);
                else
                    sqlConditions[colIndex] = "";



                let filter: string = "";
                let fltr: string = "";
                fltr = "";
                let cond: string = "";
                for (cond of sqlConditions) {
                    if (cond != "" && cond != undefined)
                        fltr += cond + " And ";
                }
                //fltr += "0 = 0";

                if (this.orgCondition != "" && fltr != "") {
                    filter = fltr + this.orgCondition  // + " and " + fltr;
                }
                else
                    if (this.orgCondition == "")
                        filter = fltr + "0 = 0";
                    else
                        filter = this.orgCondition;

                Ajax.CallAsync({
                    url: Url.Action("Refilter", "ClientTools"),
                    data: {
                        moduleCode: moduleCode,
                        Condition: filter,
                        controllerName: sh//$("#SearchControlName").val()
                    },
                    success: (d) => {
                        onSuccess(d);
                    }
                })
            };


            let td: HTMLTableCellElement = DocumentActions.CreateElement<HTMLTableCellElement>("td");
            td.appendChild(txt);
            SearchFilters.appendChild(td);

            let tdType: HTMLTableCellElement = DocumentActions.CreateElement<HTMLTableCellElement>("td");
            tdType.appendChild(this.GenerateFilterTypes(column));
            SearchFilterTypes.appendChild(tdType);
        }
    }

    private GenerateFilters(moduleCode: string, columns: Array<datatableColumn>, dataSource: Array<any>, onSuccess: (dd) => void) {
        let SearchFilters = DocumentActions.GetElementById<HTMLTableRowElement>("SearchFilters");
        let sqlConditions: Array<string> = new Array<string>();
        SearchFilters.innerHTML = "";

        let SearchFilterTypes = DocumentActions.GetElementById<HTMLTableRowElement>("SearchFilterTypes");
        SearchFilterTypes.innerHTML = "";
        for (var column of columns) {
            if (column.hidden == true)
                continue;
            let txt: HTMLInputElement = DocumentActions.CreateElement<HTMLInputElement>("input");
            if (column.dataType == "number")
                txt.type = "number";
            else if (column.dataType == "date")
                txt.type = "date";
            else
                txt.type = "text";
            txt.placeholder = column.headerText;
            txt.className = "form-control";
            txt.tabIndex = columns.indexOf(column);
            txt.id = "Filter_" + column.key;
            sqlConditions.push("");
            txt.onkeyup = (e) => {
                //if (e.key != Keys.Enter)
                //    return;
                let currentInput = (e.currentTarget as HTMLInputElement) as HTMLInputElement;
                let colIndex = currentInput.tabIndex;
                let columnKey: string = currentInput.id.replace("Filter_", "");
                if (currentInput.value != "" && currentInput.value != null)
                    sqlConditions[colIndex] = columnKey + $("#FType_" + columnKey).val().replace("{0}", currentInput.value);
                else
                    sqlConditions[colIndex] = "";



                let filter: string = "";
                let fltr: string = "";
                fltr = "";
                let cond: string = "";
                for (cond of sqlConditions) {
                    if (cond != "" && cond != undefined)
                        fltr += cond + " And ";
                }
                //fltr += "0 = 0";

                if (this.orgCondition != "" && fltr != "") {
                    filter = fltr + this.orgCondition  // + " and " + fltr;
                }
                else
                    if (this.orgCondition == "")
                        filter = fltr + "0 = 0";
                    else
                        filter = this.orgCondition;

                Ajax.CallAsync({
                    url: Url.Action("Refilter", "ClientTools"),
                    data: {
                        moduleCode: moduleCode,
                        Condition: filter,
                        controllerName: $("#SearchControlName").val()
                    },
                    success: (d) => {
                        onSuccess(d);
                    }
                })
            };


            let td: HTMLTableCellElement = DocumentActions.CreateElement<HTMLTableCellElement>("td");
            td.appendChild(txt);
            SearchFilters.appendChild(td);

            let tdType: HTMLTableCellElement = DocumentActions.CreateElement<HTMLTableCellElement>("td");
            tdType.appendChild(this.GenerateFilterTypes(column));
            SearchFilterTypes.appendChild(tdType);
        }
    }

    private GenerateFilterTypes(column: datatableColumn): HTMLSelectElement {
        let source: Array<SelectItem> = new Array<SelectItem>();
        if (column.dataType == "number") {
            source.push({ Text: "Equal", Value: "= {0}" },
                { Text: "Not Equal", Value: "<> {0}" },
                { Text: "Larger Than", Value: "> {0}" },
                { Text: "Larger Than Or Equal", Value: ">= {0}" },
                { Text: "Less Than", Value: "<{0}" },
                { Text: "Less Than Or Equal", Value: "< {0}" });
        }
        else {
            source.push(
                { Text: "Contains", Value: " Like '%{0}%'" },
                { Text: "Equal", Value: "= '{0}'" },
                { Text: "Starts With", Value: " Like '{0}%'" },
                { Text: "Ends With", Value: " Like '%{0}'" });
        }

        let cmbo: HTMLSelectElement = DocumentActions.CreateElement<HTMLSelectElement>("select");
        cmbo.className = "form-control";
        cmbo.id = "FType_" + column.key;
        DocumentActions.FillCombo(source, cmbo, "Value", "Text");
        return cmbo;
    }

    private convertFilterToCondition(cond: string, filter: string) {
        if (cond.toLowerCase() == "contains")
            return " Like '%" + filter + "%'";
        else if (cond.toLowerCase() == "endsWith")
            return " Like '%" + filter + "'";
        if (cond.toLowerCase() == "startswith")
            return " Like '" + filter + "%'";
    }

    public ImgPopup(CompCode: string, Branch: string, moduleCode: string, TrNo: string) {
        let opt: JQueryAjaxSettings = {
            url: Url.Action("ImagePopup", "GeneralReports"),
            success: (d) => {

                let result = d as string;


                $("#btnImgBody").html(result);
                $("#exampleModal2").modal("show");
                $('#exampleModal2').modal({
                    refresh: true
                });

                $("#btnCompCode").val(CompCode);
                $("#btnBranch").val(Branch);
                $("#btnmoduleCode").val(moduleCode);
                $("#btnTrNo").val(TrNo);

                //systemEnv.ScreenLanguage = sessionStorage.getItem("temp_lang");
                //var val = $("#rpTitle").text();
                //$("#TitleSpan").html(val);
            }
        };
        Ajax.CallAsync(opt);
    }

    public JsTree(data: object) {
        $('#Tree').jstree({
            'core': {
                'data': data,
            },
            'search': {
                'case_insensitive': true,
                'show_only_matches': true
            },
            'plugins': ['search']
        }).on('search.jstree', function (nodes, str, res) {
            if (str.nodes.length === 0) {
                $('#Tree').jstree(true).hide_all();
            }
        })

        $('#Tree_search').keyup(function () {
            $('#Tree').jstree(true).show_all();
            $('#Tree').jstree('search', $(this).val());
        });
    }
}

class SelectItem {
    constructor() {
        this.Value = null;
        this.Text = null;
    }
    public Value: string;
    public Text: string;
}

//class SessionManager {
//    public Me: G_USERS;
//    public PageIndex: number;
//    public ModelCount: number;
//    public SessionRecord: SessionRecord;
//}

var language: string;
try {
    language = GetSystemSession().CurrentEnvironment.ScreenLanguage;
} catch (e) {
    language = "ar";
}


var ValueArr: { value: string, text: string }[] = [];
class ListValue {
    public static GetLetOfGrnteeTranDataTable() {
    ValueArr = [];
        if (language == "ar") {
            ValueArr.push({ value: "ValueBeforeRate", text: "مبلغ الضمان" });
            ValueArr.push({ value: "CoverValue", text: "قيمة التغطيه" });
            ValueArr.push({ value: "Expenses", text: "مصروفات" });
            ValueArr.push({ value: "CashMargin", text: "هامش نقدى" });
            ValueArr.push({ value: "Commision", text: "عموله" });
        }
        else {
            ValueArr.push({ value: "ValueBeforeRate", text: "Guarantee amount" });
            ValueArr.push({ value: "CoverValue", text: "Coverage amount" });
            ValueArr.push({ value: "Expenses", text: "Expenses" });
            ValueArr.push({ value: "CashMargin", text: "Cash Margin" });
            ValueArr.push({ value: "Commision", text: "Commision" });

        }
        return ValueArr;
    }
    public static GetJobOrderEquipDataTable() {
    ValueArr = [];
        if (language == "ar") {
            ValueArr.push({ value: "TotalCost", text: "إجمالى تكلفه" });
        }
        else {
            ValueArr.push({ value: "TotalCost", text: "Total Cost" });
        }
        return ValueArr;
    }
    public static GetJobOrderEmpDataTable() {
    ValueArr = [];
        if (language == "ar") {
            ValueArr.push({ value: "TotalCost", text: "إجمالى تكلفه" });
        }
        else {
            ValueArr.push({ value: "TotalCost", text: "Total Cost" });
        }
        return ValueArr;
    }
    public static GetUnitReservationDataTable() {
    ValueArr = [];
        if (language == "ar") {
            ValueArr.push({ value: "TotalPrice", text: "سعر البيع" });
            ValueArr.push({ value: "FinishValue", text: "إجمالى التشطيب" });
            ValueArr.push({ value: "FeesValue", text: "رســـوم" });
            ValueArr.push({ value: "CommissionValue", text: "العمولــه" });
            ValueArr.push({ value: "DiscValue", text: "الخصــــم" });
            ValueArr.push({ value: "LeaveValue", text: "قيمة التنازل" });
            ValueArr.push({ value: "ActPricWithoutFee", text: "الصافى بدون الرسوم" });
            //ValueArr.push({ value:"ActualSalesPriceWithFee",text: "الصافى بالرسوم"});
            ValueArr.push({ value: "ActualSalesPrice", text: "صافى بيع" });
            ValueArr.push({ value: "TotalServices", text: "خدمات و مرافق" });
            //ValueArr.push({ value:"TotalInstallments",text: "إجمالى الأقساط"});
            //ValueArr.push({ value:"ActualPriceWithServices",text: "صافى البيع بالخدمات و المرافق"});
            //ValueArr.push({ value:"ActualPriceWithFinish",text: "صافى البيع بالخدمات و المرافق"});
            //ValueArr.push({ value:"ActualPriceWithServicesAndFinish",text: "صافى بيع"});
        }
        else {

            ValueArr.push({ value: "TotalPrice", text: "Sales Price" });
            ValueArr.push({ value: "FinishValue", text: "Decoration Price" });
            ValueArr.push({ value: "FeesValue", text: "Fees" });
            ValueArr.push({ value: "CommissionValue", text: "Commission" });
            ValueArr.push({ value: "DiscValue", text: "Discount" });
            ValueArr.push({ value: "LeaveValue", text: "concession fee" });
            //ValueArr.push({ value:"PaidPrice",text: "المدفـــوع"});
            ValueArr.push({ value: "ActPricWithoutFee", text: "Net Without fees" });
            ValueArr.push({ value: "ActualSalesPrice", text: "Net Price" });
            ValueArr.push({ value: "TotalServices", text: "Total Services" });
            //ValueArr.push({ value:"Commision",text: "عمولة البيع"});
            //ValueArr.push({ value:"TotalCredit",text: "اجمالى دائن"});
        }
        return ValueArr;
    }

    public static GetBankNoticeDataTable() {
    ValueArr = [];
        if (language == "ar") {
            ValueArr.push({ value: "TotalCheques", text: "اجمالى الأوراق" });
            ValueArr.push({ value: "MultiCheques", text: "الأوراق المتعدده" });
            ValueArr.push({ value: "BankExpenses", text: "مصروفات بنكيه" });
            ValueArr.push({ value: "TotalChequesAfterExpens", text: "الاجمالى بعد المصروفات" });
        }
        else {

            ValueArr.push({ value: "TotalCheques", text: "Total Cheques" });
            ValueArr.push({ value: "MultiCheques", text: "Multi Cheques" });
            ValueArr.push({ value: "BankExpenses", text: "Bank Expenses" });
            ValueArr.push({ value: "TotalChequesAfterExpens", text: "Total Cheques After Expenses" });
        }
        return ValueArr;
    }
    public static GetPettyCashDataTable() {
    ValueArr = [];
        if (language == "ar") {
            ValueArr.push({ value: "TotalFilteredPrice", text: "تصفية العهده" });
            ValueArr.push({ value: "MultiExpenses", text: "المصاريف المتعدده" });
        }
        else {
            ValueArr.push({ value: "TotalFilteredPrice", text: "Total lequidation" });
            ValueArr.push({ value: "MultiExpenses", text: "Multi Expenses" });
        }
        return ValueArr;
    }
    public static GetItemStockAdjustDataTable() {
    ValueArr = [];
        if (language == "ar") {
            ValueArr.push({ value: "StockTotalCost", text: "اجمالى الاصناف" });
            ValueArr.push({ value: "TotalDiff", text: "فرق التكلفه" });
        }
        else {
            ValueArr.push({ value: "StockTotalCost", text: "Total Items" });
            ValueArr.push({ value: "TotalDiff", text: "Net Cost" });
        }
        return ValueArr;
    }
    public static GetJournalEntryDataTable() {
    ValueArr = [];
        if (language == "ar") {
            ValueArr.push({ value: "TotalDebit", text: "اجمالى مدين" });
            ValueArr.push({ value: "TotalCredit", text: "اجمالى دائن" });
        }
        else {
            ValueArr.push({ value: "TotalDebit", text: "Total Debit" });
            ValueArr.push({ value: "TotalCredit", text: "Total Credit" });
        }
        return ValueArr;
    }
    public static GetKeeperbankDataTable() {
    ValueArr = [];
        if (language == "ar") {
            ValueArr.push({ value: "TotalCheques", text: "اجمالى الشيكات" });
        }
        else {
            ValueArr.push({ value: "TotalCheques", text: "Total Cheques" });
        }
        return ValueArr;
    }
    public static GetStockTranReqValuesDataTable() {
        ValueArr = [];
        if (language == "ar") {
            ValueArr.push({ value: "TotalValue", text: "اجمالى متوسط التكلفه" });
            //ValueArr.push({ value:"TotalLastCost",text: "اجمالى اخر تكلفه"});
        }
        else {
            ValueArr.push({ value: "TotalValue", text: "Total Cost Average" });
            //ValueArr.push({ value:"TotalLastCost",text: "اجمالى اخر تكلفه"});
        }
        return ValueArr;
    }
    public static GetStockTranValuesDataTable() {
        ValueArr = [];
        if (language == "ar") {
            ValueArr.push({ value: "TotalValue", text: "اجمالى متوسط التكلفه" });
        }
        else {
            ValueArr.push({ value: "TotalValue", text: "Total Cost Average" });
            //ValueArr.push({ value:"TotalLastCost",text: "اجمالى اخر تكلفه"});
        }
        return ValueArr;
    }
    public static GetSalesDeliverValuesDataTable() {
        ValueArr = [];
        if (language == "ar") {
            ValueArr.push({ value: "TotalCostAverage", text: "اجمالى متوسط التكلفه" });
            ValueArr.push({ value: "TotalLastCost", text: "اجمالى اخر تكلفه" });
        }
        else {
            ValueArr.push({ value: "TotalCostAverage", text: "Total Cost Average" });
            ValueArr.push({ value: "TotalLastCost", text: "Total Last Cost" });
        }
        return ValueArr;
    }
    public static GetPurchReceitValuesDataTable() {
        ValueArr = [];
        if (language == "ar") {
            ValueArr.push({ value: "NetPrice", text: "تكلفة الأصناف" });
        }
        else {
            ValueArr.push({ value: "NetPrice", text: "Net Item Cost" });
        }
        return ValueArr;
    }
    public static GetPurchValuesDataTable() {
        ValueArr = [];
        if (language == "ar") {
            ValueArr.push({ value: "InvTotal", text: "اجمالى الاصناف" });
            ValueArr.push({ value: "TaxValu", text: "الضرائب" });
            ValueArr.push({ value: "TaxValu2", text: "الضرائب 2" });
            ValueArr.push({ value: "TaxValu3", text: "الضرائب 3" });
            ValueArr.push({ value: "TotalItemTax1", text: "ضريبة الأصناف 1" });
            ValueArr.push({ value: "TotalItemTax2", text: "ضريبة الأصناف 2" });
            ValueArr.push({ value: "TotalItemTax3", text: "ضريبة الأصناف 3" });
            ValueArr.push({ value: "PriceAfterTax", text: "السعر بعد الضريبه" });
            ValueArr.push({ value: "ExpenValue", text: "المصروفات" });
            ValueArr.push({ value: "DiscAmount", text: "الخصــــم" });
            ValueArr.push({ value: "NetPrice", text: "الصافـــى" });
            ValueArr.push({ value: "PaidPrice", text: "المدفـــوع" });
            ValueArr.push({ value: "NotPaid", text: "المتبقـــى" });
            ValueArr.push({ value: "ExpenValueWithCurr", text: "اجمالى المصاريف المتعدده" });
            ValueArr.push({ value: "MultiExpenses", text: "المصاريف المتعدده" });
            ValueArr.push({ value: "AccountInExpense", text: "حساب فرعى بملف المصروف" });
            ValueArr.push({ value: "AdvancExpenseWithCurr", text: "دفعات مقدمه عمله" });
            ValueArr.push({ value: "AdvancExpenseBeforCurr", text: "دفعات مقدمه محلى" });
        }
        else {
            ValueArr.push({ value: "InvTotal", text: "Total Items" });
            ValueArr.push({ value: "TaxValu", text: "Tax Value" });
            ValueArr.push({ value: "TaxValu2", text: "Tax Value 2" });
            ValueArr.push({ value: "TaxValu3", text: "Tax Value 3" });
            ValueArr.push({ value: "TotalItemTax1", text: "Item Tax 1" });
            ValueArr.push({ value: "TotalItemTax2", text: "Item Tax 2" });
            ValueArr.push({ value: "TotalItemTax3", text: "Item Tax 3" });
            ValueArr.push({ value: "PriceAfterTax", text: "Price After Tax" });
            ValueArr.push({ value: "ExpenValue", text: "Expenses" });
            ValueArr.push({ value: "DiscAmount", text: "Discount" });
            ValueArr.push({ value: "NetPrice", text: "Net Price" });
            ValueArr.push({ value: "PaidPrice", text: "Paid " });
            ValueArr.push({ value: "NotPaid", text: "Not Paid " });
            ValueArr.push({ value: "ExpenValueWithCurr", text: "Total Multi-Expenses" });
            ValueArr.push({ value: "MultiExpenses", text: "Multi Expenses" });
            ValueArr.push({ value: "AccountInExpense", text: "Expenses GL Account" });
            ValueArr.push({ value: "AdvancExpenseWithCurr", text: "Expenses in advance currency" });
            ValueArr.push({ value: "AdvancExpenseBeforCurr", text: "Expenses in advance local" });
        }
        return ValueArr;
    }
    public static GetJobOrderDataTable() {
        ValueArr = [];
        if (language == "ar") {
            ValueArr.push({ value: "TotalProductsPrice", text: "اجمالى المنتجات" });
            ValueArr.push({ value: "TotalItemCost", text: "اجمالى الخامات" });
            ValueArr.push({ value: "TotalJobsCost", text: "عماله مباشره" });
            ValueArr.push({ value: "TotalScrap", text: "اجمالى هالك" });
            ValueArr.push({ value: "TotalExpensesCost", text: "اجمالى مصروفات" });
            ValueArr.push({ value: "CustomerCharged", text: "مصروفات على العميل" });
            ValueArr.push({ value: "NetExpenses", text: "صافى المصروفات" });
            ValueArr.push({ value: "TotalEquipCost", text: "تكلفة ماكينات" });
            ValueArr.push({ value: "TotalPurchInvCost", text: "تكلفه المشتريات" });
            ValueArr.push({ value: "GrandTotal", text: "اجمالى بيع" });
            ValueArr.push({ value: "TotalJpbOrder", text: "اجمالى تكلفه" });
            ValueArr.push({ value: "TotalProfit", text: "اجمالى ربح" });
        }
        else {
            ValueArr.push({ value: "TotalProductsPrice", text: "Total Products" });
            ValueArr.push({ value: "TotalItemCost", text: "Total Material Cost" });
            ValueArr.push({ value: "TotalJobsCost", text: "Total WorkForce" });
            ValueArr.push({ value: "TotalScrap", text: "Total Scrap" });
            ValueArr.push({ value: "TotalExpensesCost", text: "Total Expenses" });
            ValueArr.push({ value: "CustomerCharged", text: "Customer Charged" });
            ValueArr.push({ value: "NetExpenses", text: "Net Expenses" });
            ValueArr.push({ value: "TotalEquipCost", text: "Total Machine cost" });
            ValueArr.push({ value: "TotalPurchInvCost", text: "Total Purchase" });
            ValueArr.push({ value: "GrandTotal", text: "Grand Total" });
            ValueArr.push({ value: "TotalJpbOrder", text: "Total Jobb Order Cost" });
            ValueArr.push({ value: "TotalProfit", text: "Total Profit" });
        }
        return ValueArr;
    }
    public static GetPurchOrderDataTable() {
        ValueArr = [];
        if (language == "ar") {
            ValueArr.push({ value: "InvTotal", text: "اجمالى الاصناف" });
            ValueArr.push({ value: "TaxValu", text: "الضرائب" });
            ValueArr.push({ value: "TotalItemTax1", text: "ضريبة الأصناف 1" });
            ValueArr.push({ value: "TotalItemTax2", text: "ضريبة الأصناف 2" });
            ValueArr.push({ value: "TotalItemTax3", text: "ضريبة الأصناف 3" });
            ValueArr.push({ value: "PriceAfterTax", text: "السعر بعد الضريبه" });
            ValueArr.push({ value: "ExpenValue", text: "المصروفات" });
            ValueArr.push({ value: "DiscAmount", text: "الخصــــم" });
            ValueArr.push({ value: "NetPrice", text: "الصافـــى" });
            ValueArr.push({ value: "PaidPrice", text: "المدفـــوع" });
            ValueArr.push({ value: "NotPaid", text: "المتبقـــى" });
            ValueArr.push({ value: "ExpenValueBeforCurr", text: "اجمالى المصاريف المتعدده" });
            ValueArr.push({ value: "MultiExpenses", text: "المصاريف المتعدده" });
            ValueArr.push({ value: "AccountInExpense", text: "حساب فرعى بملف المصروف" });
            //ValueArr.push({ value:"TotalCredit",text: "اجمالى دائن"});
        }
        else {

            ValueArr.push({ value: "InvTotal", text: "Total Items" });
            ValueArr.push({ value: "TaxValu", text: "Tax Value" });
            ValueArr.push({ value: "TotalItemTax1", text: "Item Tax 1" });
            ValueArr.push({ value: "TotalItemTax2", text: "Item Tax 2" });
            ValueArr.push({ value: "TotalItemTax3", text: "Item Tax 3" });
            ValueArr.push({ value: "PriceAfterTax", text: "Price After Tax" });
            ValueArr.push({ value: "ExpenValue", text: "Expenses" });
            ValueArr.push({ value: "DiscAmount", text: "Discount" });
            ValueArr.push({ value: "NetPrice", text: "Net Price" });
            ValueArr.push({ value: "PaidPrice", text: "Paid " });
            ValueArr.push({ value: "NotPaid", text: "Not Paid " });
            ValueArr.push({ value: "ExpenValueBeforCurr", text: "Total Multi-Expenses" });
            ValueArr.push({ value: "MultiExpenses", text: "Multi Expenses" });
            ValueArr.push({ value: "AccountInExpense", text: "Expenses GL Account" });
            //ValueArr.push({ value:"TotalCredit",text: "اجمالى دائن"});
        }
        return ValueArr;
    }
    public static GetSalesOfferDataTable() {
        ValueArr = [];
        if (language == "ar") {
            ValueArr.push({ value: "InvTotal", text: "اجمالى الاصناف" });
            ValueArr.push({ value: "TaxValu", text: "الضرائب" });
            ValueArr.push({ value: "TotalItemTax1", text: "ضريبة الأصناف 1" });
            ValueArr.push({ value: "TotalItemTax2", text: "ضريبة الأصناف 2" });
            ValueArr.push({ value: "TotalItemTax3", text: "ضريبة الأصناف 3" });
            ValueArr.push({ value: "PriceAfterTax", text: "السعر بعد الضريبه" });
            ValueArr.push({ value: "ExpenValue", text: "المصروفات" });
            ValueArr.push({ value: "DiscAmount", text: "الخصــــم" });
            ValueArr.push({ value: "NetPrice", text: "الصافـــى" });
            ValueArr.push({ value: "PaidPrice", text: "المدفـــوع" });
            ValueArr.push({ value: "NotPaid", text: "المتبقـــى" });
            ValueArr.push({ value: "PriceAfterCommision", text: "الاجمالى بعد العموله" });
            ValueArr.push({ value: "Commision", text: "عمولة البيع" });
            //ValueArr.push({ value:"TotalCredit",text: "اجمالى دائن"});
        }
        else {

            ValueArr.push({ value: "InvTotal", text: "Total Items" });
            ValueArr.push({ value: "TaxValu", text: "Tax Value" });
            ValueArr.push({ value: "TotalItemTax1", text: "Item Tax 1" });
            ValueArr.push({ value: "TotalItemTax2", text: "Item Tax 2" });
            ValueArr.push({ value: "TotalItemTax3", text: "Item Tax 3" });
            ValueArr.push({ value: "PriceAfterTax", text: "Price After Tax" });
            ValueArr.push({ value: "ExpenValue", text: "Expenses" });
            ValueArr.push({ value: "DiscAmount", text: "Discount" });
            ValueArr.push({ value: "NetPrice", text: "Net Price" });
            ValueArr.push({ value: "PaidPrice", text: "Paid " });
            ValueArr.push({ value: "NotPaid", text: "Not Paid " });
            ValueArr.push({ value: "PriceAfterCommision", text: "Total After Commision" });
            ValueArr.push({ value: "Commision", text: "Sales Commision" });
            //ValueArr.push({ value:"TotalCredit",text: "اجمالى دائن"});
        }
        return ValueArr;
    }
    public static GetSalesOrderDataTable() {
        ValueArr = [];
        if (language == "ar") {
            ValueArr.push({ value: "InvTotal", text: "اجمالى الاصناف" });
            ValueArr.push({ value: "TaxValu", text: "الضرائب" });
            ValueArr.push({ value: "TotalItemTax1", text: "ضريبة الأصناف 1" });
            ValueArr.push({ value: "TotalItemTax2", text: "ضريبة الأصناف 2" });
            ValueArr.push({ value: "TotalItemTax3", text: "ضريبة الأصناف 3" });
            ValueArr.push({ value: "PriceAfterTax", text: "السعر بعد الضريبه" });
            ValueArr.push({ value: "ExpenValue", text: "المصروفات" });
            ValueArr.push({ value: "DiscAmount", text: "الخصــــم" });
            ValueArr.push({ value: "NetPrice", text: "الصافـــى" });
            ValueArr.push({ value: "PaidPrice", text: "المدفـــوع" });
            ValueArr.push({ value: "NotPaid", text: "المتبقـــى" });
            ValueArr.push({ value: "PriceAfterCommision", text: "الاجمالى بعد العموله" });
            ValueArr.push({ value: "Commision", text: "عمولة البيع" });
            //ValueArr.push({ value:"TotalCredit",text: "اجمالى دائن"});
        }
        else {

            ValueArr.push({ value: "InvTotal", text: "Total Items" });
            ValueArr.push({ value: "TaxValu", text: "Tax Value" });
            ValueArr.push({ value: "TotalItemTax1", text: "Item Tax 1" });
            ValueArr.push({ value: "TotalItemTax2", text: "Item Tax 2" });
            ValueArr.push({ value: "TotalItemTax3", text: "Item Tax 3" });
            ValueArr.push({ value: "PriceAfterTax", text: "Price After Tax" });
            ValueArr.push({ value: "ExpenValue", text: "Expenses" });
            ValueArr.push({ value: "DiscAmount", text: "Discount" });
            ValueArr.push({ value: "NetPrice", text: "Net Price" });
            ValueArr.push({ value: "PaidPrice", text: "Paid " });
            ValueArr.push({ value: "NotPaid", text: "Not Paid " });
            ValueArr.push({ value: "PriceAfterCommision", text: "Total After Commision" });
            ValueArr.push({ value: "Commision", text: "Sales Commision" });
            //ValueArr.push({ value:"TotalCredit",text: "اجمالى دائن"});
        }
        return ValueArr;
    }

    public static GetSalesValuesDataTable() {
        ValueArr = [];
        if (language == "ar") {
            ValueArr.push({ value: "InvTotal", text: "اجمالى الاصناف" });
            ValueArr.push({ value: "TaxValu", text: "الضرائب 1" });
            ValueArr.push({ value: "TaxValu2", text: "الضرائب 2" });
            ValueArr.push({ value: "TaxValu3", text: "الضرائب 3" });
            ValueArr.push({ value: "TotalItemTax1", text: "ضريبة الأصناف 1" });
            ValueArr.push({ value: "TotalItemTax2", text: "ضريبة الأصناف 2" });
            ValueArr.push({ value: "TotalItemTax3", text: "ضريبة الأصناف 3" });
            ValueArr.push({ value: "PriceAfterTax", text: "السعر بعد الضريبه" });
            ValueArr.push({ value: "ExpenValue", text: "المصروفات" });
            ValueArr.push({ value: "DiscAmount", text: "الخصــــم" });
            ValueArr.push({ value: "NetPrice", text: "الصافـــى" });
            ValueArr.push({ value: "PaidPrice", text: "المدفـــوع" });
            ValueArr.push({ value: "NotPaid", text: "المتبقـــى" });
            ValueArr.push({ value: "PriceAfterCommision", text: "الاجمالى بعد العموله" });
            ValueArr.push({ value: "Commision", text: "عمولة البيع" });
            ValueArr.push({ value: "PayMethodValue", text: "نسبة الزياده" });
            ValueArr.push({ value: "TotalItemsCost", text: "اجمالى تكلفة الاصناف" });
            ValueArr.push({ value: "TotalItemsProfit", text: "اجمالى ربح الاصناف" });
            ValueArr.push({ value: "PaidPriceVisa", text: "المدفوع فيزا" });
            ValueArr.push({ value: "ItemCommision", text: "عمولة الأصناف" });
            ValueArr.push({ value: "DiscAmount2", text: "خصم كسور" });
        }
        else {

            ValueArr.push({ value: "InvTotal", text: "Total Items" });
            ValueArr.push({ value: "TaxValu", text: "Tax Value 1" });
            ValueArr.push({ value: "TaxValu2", text: "Tax Value 2" });
            ValueArr.push({ value: "TaxValu3", text: "Tax Value 3" });
            ValueArr.push({ value: "TotalItemTax1", text: "Item Tax 1" });
            ValueArr.push({ value: "TotalItemTax2", text: "Item Tax 2" });
            ValueArr.push({ value: "TotalItemTax3", text: "Item Tax 3" });
            ValueArr.push({ value: "PriceAfterTax", text: "Price After Tax" });
            ValueArr.push({ value: "ExpenValue", text: "Expenses" });
            ValueArr.push({ value: "DiscAmount", text: "Discount" });
            ValueArr.push({ value: "NetPrice", text: "Net Price" });
            ValueArr.push({ value: "PaidPrice", text: "Paid " });
            ValueArr.push({ value: "NotPaid", text: "Not Paid " });
            ValueArr.push({ value: "PriceAfterCommision", text: "Total After Commision" });
            ValueArr.push({ value: "Commision", text: "Sales Commision" });
            ValueArr.push({ value: "PayMethodValue", text: "Add Percent" });
            ValueArr.push({ value: "TotalItemsCost", text: "Total Items Cost" });
            ValueArr.push({ value: "TotalItemsProfit", text: "Total Items Profit" });
            ValueArr.push({ value: "PaidPriceVisa", text: "Paid VISA" });
            ValueArr.push({ value: "ItemCommision", text: "Items Commision" });
            ValueArr.push({ value: "DiscAmount2", text: "Discount on net Val" });
        }
        return ValueArr;
    }
    public static GetRetPurchValuesDataTable() {
        ValueArr = [];
        if (language == "ar") {
            ValueArr.push({ value: "RetTotal", text: "اجمالى الاصناف" });
            ValueArr.push({ value: "TaxValu", text: "الضرائب" });
            ValueArr.push({ value: "TaxValu2", text: "الضرائب 2" });
            ValueArr.push({ value: "TaxValu3", text: "الضرائب 3" });
            ValueArr.push({ value: "TotalItemTax1", text: "ضريبة الأصناف 1" });
            ValueArr.push({ value: "TotalItemTax2", text: "ضريبة الأصناف 2" });
            ValueArr.push({ value: "TotalItemTax3", text: "ضريبة الأصناف 3" });
            ValueArr.push({ value: "PriceAfterTax", text: "السعر بعد الضريبه" });
            ValueArr.push({ value: "DiscAmount", text: "الخصــــم" });
            ValueArr.push({ value: "NetPrice", text: "الصافـــى" });
            ValueArr.push({ value: "PaidPrice", text: "المدفـــوع" });
            ValueArr.push({ value: "NotPaidPrice", text: "المتبقـــى" });
        }
        else {

            ValueArr.push({ value: "RetTotal", text: "Total Items" });
            ValueArr.push({ value: "TaxValu", text: "Tax Value" });
            ValueArr.push({ value: "TaxValu2", text: "Tax Value 2" });
            ValueArr.push({ value: "TaxValu3", text: "Tax Value 3" });
            ValueArr.push({ value: "TotalItemTax1", text: "Item Tax 1" });
            ValueArr.push({ value: "TotalItemTax2", text: "Item Tax 2" });
            ValueArr.push({ value: "TotalItemTax3", text: "Item Tax 3" });
            ValueArr.push({ value: "PriceAfterTax", text: "Price After Tax" });
            ValueArr.push({ value: "DiscAmount", text: "Discount" });
            ValueArr.push({ value: "NetPrice", text: "Net Price" });
            ValueArr.push({ value: "PaidPrice", text: "Paid " });
            ValueArr.push({ value: "NotPaidPrice", text: "Not Paid " });
        }
        return ValueArr;
    }
    public static GetRetSalesValuesDataTable() {
        ValueArr = [];
        if (language == "ar") {
            ValueArr.push({ value: "RetTotal", text: "اجمالى الاصناف" });
            ValueArr.push({ value: "TaxValu", text: "الضرائب" });
            ValueArr.push({ value: "TaxValu2", text: "الضرائب 2" });
            ValueArr.push({ value: "TaxValu3", text: "الضرائب 3" });
            ValueArr.push({ value: "TotalItemTax1", text: "ضريبة الأصناف 1" });
            ValueArr.push({ value: "TotalItemTax2", text: "ضريبة الأصناف 2" });
            ValueArr.push({ value: "TotalItemTax3", text: "ضريبة الأصناف 3" });
            ValueArr.push({ value: "PriceAfterTax", text: "السعر بعد الضريبه" });
            ValueArr.push({ value: "DiscAmount", text: "الخصــــم" });
            ValueArr.push({ value: "NetPrice", text: "الصافـــى" });
            ValueArr.push({ value: "PaidPrice", text: "المدفـــوع" });
            ValueArr.push({ value: "NotPaidPrice", text: "المتبقـــى" });
            ValueArr.push({ value: "PriceAfterCommision", text: "الاجمالى بعد العموله" });
            ValueArr.push({ value: "Commision", text: "عمولة البيع" });
            ValueArr.push({ value: "TotalItemsCost", text: "اجمالى تكلفة الاصناف" });
            ValueArr.push({ value: "TotalItemsProfit", text: "اجمالى ربح الاصناف" });
            ValueArr.push({ value: "DiscAmount2", text: "خصم كسور" });
        }
        else {

            ValueArr.push({ value: "RetTotal", text: "Total Items" });
            ValueArr.push({ value: "TaxValu", text: "Tax Value" });
            ValueArr.push({ value: "TaxValu2", text: "Tax Value 2" });
            ValueArr.push({ value: "TaxValu3", text: "Tax Value 3" });
            ValueArr.push({ value: "TotalItemTax1", text: "Item Tax 1" });
            ValueArr.push({ value: "TotalItemTax2", text: "Item Tax 2" });
            ValueArr.push({ value: "TotalItemTax3", text: "Item Tax 3" });
            ValueArr.push({ value: "PriceAfterTax", text: "Price After Tax" });
            ValueArr.push({ value: "DiscAmount", text: "Discount" });
            ValueArr.push({ value: "NetPrice", text: "Net Price" });
            ValueArr.push({ value: "PaidPrice", text: "Paid " });
            ValueArr.push({ value: "NotPaidPrice", text: "Not Paid " });
            ValueArr.push({ value: "PriceAfterCommision", text: "Total After Commision" });
            ValueArr.push({ value: "Commision", text: "Sales Commision" });
            ValueArr.push({ value: "TotalItemsCost", text: "Total Items Cost" });
            ValueArr.push({ value: "TotalItemsProfit", text: "Total Items Profit" });
            ValueArr.push({ value: "DiscAmount2", text: "Discount on net Val" });
        }
        return ValueArr;
    }
    public static GetAdjustValuesDataTable() {
        ValueArr = [];
        if (language == "ar") {
            ValueArr.push({ value: "Value", text: "قيمة التسويه" });
        }
        else {
            ValueArr.push({ value: "Value", text: "Value" });
        }
        return ValueArr;
    }
    public static GetRecietValuesDataTable() {
        ValueArr = [];
        if (language == "ar") {
            ValueArr.push({ value: "PaidPrice", text: "مبلغ القبض " });
            ValueArr.push({ value: "PriceAfterCommision", text: "الاجمالى بعد العموله" });
            ValueArr.push({ value: "Commision", text: "عمولة التحصيل" });
            ValueArr.push({ value: "Value1BeforeRate", text: "ديون معدومه" });
            ValueArr.push({ value: "Value2BeforeRate", text: "مصروفات تحصيل" });
            ValueArr.push({ value: "Value3BeforeRate", text: "غرامات" });
            ValueArr.push({ value: "Value4BeforeRate", text: "ضريبه" });
            ValueArr.push({ value: "Value5BeforeRate", text: "خصم" });
            ValueArr.push({ value: "Value6BeforeRate", text: "دمغات" });
            ValueArr.push({ value: "Value7BeforeRate", text: "تأمين ابتدائى" });
            ValueArr.push({ value: "Value8BeforeRate", text: "تأمين نهائى" });
            ValueArr.push({ value: "Value9BeforeRate", text: "قيمه 9" });
            ValueArr.push({ value: "Value10BeforeRate", text: "قيمه 10" });
            ValueArr.push({ value: "TotalValue", text: "الاجمالى" });
        }
        else {

            ValueArr.push({ value: "PaidPrice", text: "Amount " });
            ValueArr.push({ value: "PriceAfterCommision", text: "Total After Commision" });
            ValueArr.push({ value: "Commision", text: "Collection Commision" });
            ValueArr.push({ value: "Value1BeforeRate", text: "Bad debts" });
            ValueArr.push({ value: "Value2BeforeRate", text: "Collection Expenses" });
            ValueArr.push({ value: "Value3BeforeRate", text: "Fines" });
            ValueArr.push({ value: "Value4BeforeRate", text: "Tax Value" });
            ValueArr.push({ value: "Value5BeforeRate", text: "Discount" });
            ValueArr.push({ value: "Value6BeforeRate", text: "stamp" });
            ValueArr.push({ value: "Value7BeforeRate", text: "Primary insurance" });
            ValueArr.push({ value: "Value8BeforeRate", text: "Final insurance" });
            ValueArr.push({ value: "Value9BeforeRate", text: "Value 9" });
            ValueArr.push({ value: "Value10BeforeRate", text: "Value 10" });
            ValueArr.push({ value: "TotalValue", text: "Total Value" });
        }
        return ValueArr;
    }
    public static GetPayValuesDataTable() {
        ValueArr = [];
        if (language == "ar") {
            ValueArr.push({ value: "PaidPrice", text: "مبلغ الدفع " });
            ValueArr.push({ value: "Value1BeforeRate", text: "قيمه 1" });
            ValueArr.push({ value: "Value2BeforeRate", text: "قيمه 2" });
            ValueArr.push({ value: "Value3BeforeRate", text: "قيمه 3" });
            ValueArr.push({ value: "Value4BeforeRate", text: "قيمه 4" });
            ValueArr.push({ value: "Value5BeforeRate", text: "قيمه 5" });
            ValueArr.push({ value: "Value6BeforeRate", text: "قيمه 6" });
            ValueArr.push({ value: "Value7BeforeRate", text: "تأمين ابتدائى" });
            ValueArr.push({ value: "Value8BeforeRate", text: "تأمين نهائى" });
            ValueArr.push({ value: "Value9BeforeRate", text: "قيمه 9" });
            ValueArr.push({ value: "Value10BeforeRate", text: "قيمه 10" });
            ValueArr.push({ value: "TotalValue", text: "الاجمالى" });
        }
        else {
            ValueArr.push({ value: "PaidPrice", text: "Paid Amount " });
            ValueArr.push({ value: "Value1BeforeRate", text: "Value 1" });
            ValueArr.push({ value: "Value2BeforeRate", text: "Value 2" });
            ValueArr.push({ value: "Value3BeforeRate", text: "Value 3" });
            ValueArr.push({ value: "Value4BeforeRate", text: "Value 4" });
            ValueArr.push({ value: "Value5BeforeRate", text: "Value 5" });
            ValueArr.push({ value: "Value6BeforeRate", text: "Value 6" });
            ValueArr.push({ value: "Value7BeforeRate", text: "Primary insurance" });
            ValueArr.push({ value: "Value8BeforeRate", text: "Final insurance" });
            ValueArr.push({ value: "Value9BeforeRate", text: "Value 9" });
            ValueArr.push({ value: "Value10BeforeRate", text: "Value 10" });
            ValueArr.push({ value: "TotalValue", text: "Total Value" });
        }
        return ValueArr;
    }

    public static GetVehicleMovValuesDataTable() {
        ValueArr = [];
        if (language == "ar") {
            ValueArr.push({ value: "TotalValue", text: "الاجمالى" });
            //ValueArr.push({ value:"TotalLastCost",text: "اجمالى اخر تكلفه"});
        }
        else {
            ValueArr.push({ value: "TotalValue", text: "Total Value" });
            //ValueArr.push({ value:"TotalLastCost",text: "اجمالى اخر تكلفه"});
        }
        return ValueArr;
    }
}