$(document).ready(() => {
    SharedButtons.OnLoad();
    HrJobs.InitalizeComponent();
    $('#headertop1').addClass('display_none');
    $('#headertop2').removeClass('display_none');
})
 
namespace HrJobs {
    var sys: SystemTools = new SystemTools();
    var language = sys.SysSession.CurrentEnvironment.ScreenLanguage;
    var SysSession: SystemSession = GetSystemSession();
    let Resource: any = GetResourceList("");
    var element: HTMLInputElement;
    $('#headerTitle').text(Resource.Jobs);

    var StandardMonthlyWage: HTMLInputElement;
    var StandardHolyDays: HTMLInputElement;
    var StandardDailyWage: HTMLInputElement;
    var StandardDailyWorkHours: HTMLInputElement;
    var StandardHourlyWage: HTMLInputElement;
    var NumberAvailable: HTMLInputElement;
     
    var HrJobs: Array<Hr_Jobs> = new Array<Hr_Jobs>();
    var Model: Hr_Jobs = new Hr_Jobs();
    var Data = new Array();

    // Select Option
    var ParentId: HTMLSelectElement;

    var listObjectTree: any;
    var nodeActive: any;
    var StatusFlag;
    var Success;
    var hasNodes: boolean;
    var ObjectId = 0;

    export function InitalizeComponent() {
        SharedButtons.compcode = Number(SysSession.CurrentEnvironment.CompCode);
        localStorage.setItem("TableName", "Hr_Jobs");

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
        sys.JsTree(Data);
        GetAll();
    }

    function InitalizeControls() {
        SharedButtons.btnSearch = document.getElementById("btnHr_JobsSearch") as HTMLButtonElement;
        ParentId = document.getElementById("ParentId") as HTMLSelectElement;

        StandardMonthlyWage = document.getElementById("StandardMonthlyWage") as HTMLInputElement;
        StandardHolyDays = document.getElementById("StandardHolyDays") as HTMLInputElement;
        StandardDailyWage = document.getElementById("StandardDailyWage") as HTMLInputElement;
        StandardDailyWorkHours = document.getElementById("StandardDailyWorkHours") as HTMLInputElement;
        StandardHourlyWage = document.getElementById("StandardHourlyWage") as HTMLInputElement;
        NumberAvailable = document.getElementById("NumberAvailable") as HTMLInputElement;
    }

    function InitalizeEvents() {
        SharedButtons.btnSearch.onclick = btnSearch_onclick;
        SharedButtons.btnRefrash.onclick = Refrash;
        SharedButtons.btnRefrash2.onclick = Refrash;

        StandardMonthlyWage.onchange = CalculationSalary;
        StandardHolyDays.onchange = CalculationSalary;
        StandardDailyWorkHours.onchange = CalculationSalary;
        StandardDailyWage.onchange = CalculationSalary;
        StandardHourlyWage.onchange = CalculationSalary;
    }

    function GetAll() {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("Hr_Jobs", "GetAll"),
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess) {
                    Data = new Array();
                    HrJobs = result.Response as Array<Hr_Jobs>;
                    FillTreeData();
                    FillDropDownList();
                }
            }
        });
    }

    function FillDropDownList() {
        if (StatusFlag == "i")
            DocumentActions.FillCombowithCode(HrJobs, ParentId, "JobId", (language == "ar" ? "JName1" : "JName2"), "JCode", Resource.ThereIsNo);
        else {
            let newHrJobs = HrJobs.filter(x => x.JobId != Model.JobId);
            DocumentActions.FillCombowithCode(newHrJobs, ParentId, "JobId", (language == "ar" ? "JName1" : "JName2"), "JCode", Resource.ThereIsNo);
        }
    }

    function GetByID(Id) {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("Hr_Jobs", "GetById"),
            data: { id: Id },
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess) {
                    hasNodes = false;
                    Model = result.Response as Hr_Jobs;
                    CheckIfElmentHasNodes();
                    Display(Model);
                    SharedWork.SwitchModes(ScreenModes.Query);
                }
                else
                    MessageBox.Show(Resource.Error, Resource.Error);
            }
        });
    }

    function CheckIfElmentHasNodes() {
        hasNodes = HrJobs.filter(x => x.ParentId == Model.JobId)[0] != null ? true : false;
    }

    function Display(model: Hr_Jobs) {
        DocumentActions.RenderFromModel(model);
        ObjectId = Number(model.JobId);
        Model = model;
    }

    export function FillTreeData() {
        Data = new Array();
        for (var i = 0; i < HrJobs.length; i++) {
            Data.push({
                id: HrJobs[i].JobId,
                parent: (HrJobs[i].ParentId != null ? HrJobs[i].ParentId.toString() : "#"),
                text: HrJobs[i].JCode + "-" + (language == "ar" ? HrJobs[i].JName1 : HrJobs[i].JName2),
                "state": { "opened": true }
            });
        }
        $('#Tree').jstree(true).settings.core.data = Data;
        $('#Tree').jstree(true).refresh();
    }

    $('#Tree').on("select_node.jstree", function (e, data) { GetByID(data.node.id) });

    function Navigate() {
        Model = HrJobs[SharedWork.PageIndex - 1];
        GetByID(Model.JobId);
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
            element = DocumentActions.GetElementByName("JCode");
            element.disabled = true;
            StatusFlag = 'u';
            FillDropDownList();
        }
    }

    function btnsave_onClick() {
        if (!ValidationHeader()) return
        Save();
    }

    function btnDelete_onClick() {
        if (!hasNodes)
            Delete()
        else
            MessageBox.Show(" لا يمكنك الحذف لانه لديه ابناء", Resource.Error);
    }

    function ValidationHeader() {
        if (DocumentActions.GetElementByName("JCode").value == "") {
            MessageBox.Show(Resource.PleaseEnterCustomerCode, Resource.Error);
            return false
        }
        else if (DocumentActions.CheckCode(HrJobs, DocumentActions.GetElementByName("JCode").value, "JCode") == false && StatusFlag == "i") {
            MessageBox.Show(Resource.CustomerCodeCannotDuplicated, Resource.Error);
        }
        else if (DocumentActions.GetElementByName("JName1").value == "") {
            MessageBox.Show(Resource.PleaseEnterNameArabic, Resource.Error);
            return false
        }
        else if (StandardMonthlyWage.value == "" || StandardHolyDays.value == "" || StandardDailyWage.value == "" || StandardDailyWorkHours.value == "" || StandardHourlyWage.value == "" || NumberAvailable.value == "" ) {
            MessageBox.Show("من فضلك تاكد من ادخال بيانات سياسات الوظائف!", Resource.Error);
            return false
        }
        else if (Number(StandardMonthlyWage.value) < 0 || Number(StandardHolyDays.value) < 0 || Number(StandardDailyWage.value) < 0 || Number(StandardDailyWorkHours.value) < 0 ||
            Number(StandardHourlyWage.value) < 0 || Number(NumberAvailable.value) < 0) {
            MessageBox.Show("لا يمكن انت تكون بيانات سياسات الوظائف بالسالب!", Resource.Error);
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
        Model = DocumentActions.AssignToModel<Hr_Jobs>(Model);
        if (StatusFlag == "i") {
            Model.CreatedAt = DateTimeFormat(Date().toString());
            Model.CreatedBy = SysSession.CurrentEnvironment.UserCode;
            Insert();
        }
        if (StatusFlag == "u") {
            Model.JobId = ObjectId;
            Model.UpdateAt = DateTimeFormat(Date().toString());
            Model.UpdateBy = SysSession.CurrentEnvironment.UserCode;
            Update();
        }

        ObjectId = Model.JobId;
        GetAll();
        return true;
    }

    function Insert() {
        $("#MessageBoxDialog").modal("hide");
        Ajax.Callsync({
            type: "POST",
            url: sys.apiUrl("Hr_Jobs", "Insert"),
            data: JSON.stringify(Model),
            success: (Response) => {
                let result = Response as BaseResponse;
                if (result.IsSuccess) {
                    Model = result.Response as Hr_Jobs;
                    ObjectId = Model.JobId;
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
            url: sys.apiUrl("Hr_Jobs", "Update"),
            data: JSON.stringify(Model),
            success: (Response) => {
                let result = Response as BaseResponse;
                if (result.IsSuccess) {
                    Model = result.Response as Hr_Jobs;
                    ObjectId = Model.JobId;
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
            url: sys.apiUrl("Hr_Jobs", "Delete") + "/" + ObjectId,
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
        sys.FindKey(Modules.Hr_Jobs, SharedButtons.btnSearch.id, "", () => {
            if (Model.JCode != null) {
                Display(Model);
            }
        });
    }

    function Refrash() {
        let id = '';
        nodeActive = $('.jstree-anchor.jstree-clicked');

        if (nodeActive != null && nodeActive.length > 0) {
            GetAll();
            resetTree();
            FillTreeData();
            id = nodeActive[0]?.id.split("_")[0];
            GetByID(id);
        }

        if (id != '') {
            let interval_id = setInterval(function () {
                listObjectTree = $('.jstree-children .jstree-node .jstree-anchor')
                listObjectTree.removeClass('jstree-clicked');
                $($('#' + ObjectId + ' a')[0]).addClass('jstree-clicked');
                clearInterval(interval_id)
            }, 50);
        }
    }

    function resetTree() {
        $('#Tree').jstree(true).settings.core.data = null;
        $('#Tree').jstree(true).refresh();
    }

    function CalculationSalary() {
        StandardDailyWage.value = (Number(StandardMonthlyWage.value) / (30 - Number(StandardHolyDays.value))).toFixed(2).toString();
        StandardHourlyWage.value = (Number(StandardDailyWage.value) / Number(StandardDailyWorkHours.value == "" ? "1" : StandardDailyWorkHours.value)).toFixed(2).toString();
    }
}
