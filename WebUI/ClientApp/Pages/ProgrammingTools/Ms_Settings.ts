$(document).ready(() => {
    SharedButtons.OnLoad();
    MsSettings.InitalizeComponent();
});
 
namespace MsSettings {
    $('#headertop1').addClass('display_none');
    $('#headertop2').removeClass('display_none');
    let Resource: any = GetResourceList("");

    var sys: SystemTools = new SystemTools();
    var SysSession: SystemSession = GetSystemSession();

    var Model: MS_Settings = new MS_Settings();
    var Settings: Array<MS_Settings> = new Array<MS_Settings>();
    
    ///////// Detailes ///////////////////////

    // select Options
    var CostCenterId2: HTMLSelectElement;

    var element: HTMLInputElement;

    var _SettingId = 0;
    var StatusFlag;
    var Success;
    var hasNodes: boolean;
    var flag: boolean;

    export function InitalizeComponent() {
        SharedButtons.compcode = Number(SysSession.CurrentEnvironment.CompCode);
        localStorage.setItem("TableName", "MS_Settings");
        NavigateModule.InitalizeComponent(true);

        SharedButtons.AddAction(() => { btnAdd_onclick(); });

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
        SharedWork.SwitchModes(ScreenModes.Query);
        $('#headerTitle').text(Resource.ProgramBasics);
    }

    function InitalizeControls() {
        // select Options
        CostCenterId2 = document.getElementById("CostCenterId2") as HTMLSelectElement;
    }

    function InitalizeEvents() {
        SharedButtons.btnRefrash2.onclick = Refrash;
    }

    function GetAll() {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("MS_Settings", "GetAll"),
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess) {
                    Disabled(false);
                    Model = result.Response as MS_Settings;
                    Display(Model);
                }
            }
        });
        return Model;
    }

    function Display(model: MS_Settings) {
        if (model == null) return;
        DocumentActions.RenderFromModel(model);
        Model = model;
        _SettingId = Number(Model.SettingId);
    }

    function btnAdd_onclick() {
        StatusFlag = 'i';
        RemoveDisabled(true);
        $('select').val('null');
    }

    function RemoveDisabled(clear: boolean) {
        DocumentActions.allElements(false, clear, Model);
        //$('#BasicAccCode').prop('disabled', false).select2().trigger('change');
    }

    function Undo() {
        GetAll();
    }

    function Disabled(clear: boolean) {
        DocumentActions.allElements(true, clear, Model);
        //$('#BasicAccCode').prop('disabled', true).select2().trigger('change');
    }

    function btnEdit_onclick() {
        if (_SettingId == 0) {
            MessageBox.Show(Resource.PleaseSelectItem, Resource.Error);
        }
        else {
            RemoveDisabled(false);
            StatusFlag = 'u';
        }
    }

    function btnsave_onClick() {
        Save();
    }

    function Save() {
        Assign();
        if (Success) {
            Disabled(false);
            Success = false;
            SharedWork.SwitchModes(ScreenModes.Query);
        }
    }

    function Assign() {
        debugger
        Model = DocumentActions.AssignToModel<MS_Settings>(Model);

        if (StatusFlag == "i") {
            Insert();
        }
        if (StatusFlag == "u") {
            Model.SettingId = _SettingId;
            Update();
        }
        _SettingId = Model.SettingId;
        GetAll();
        return true;
    }

    function Insert() {
        $("#MessageBoxDialog").modal("hide");
        Ajax.Callsync({
            type: "POST",
            url: sys.apiUrl("MS_Settings", "Insert"),
            data: JSON.stringify(Model),
            success: (Response) => {
                let result = Response as BaseResponse;
                if (result.IsSuccess) {
                    Model = result.Response as MS_Settings;
                    _SettingId = Model.SettingId;
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
            url: sys.apiUrl("MS_Settings", "Update"),
            data: JSON.stringify(Model),
            success: (Response) => {
                let result = Response as BaseResponse;
                if (result.IsSuccess) {
                    Model = result.Response as MS_Settings
                    _SettingId = Model.SettingId;
                    Success = true;
                }
                else {
                    MessageBox.Show(Resource.Error, Resource.Error);
                    Success = false;
                }
            }
        });
    }

    function btnDelete_onclick() {
        StatusFlag == "d";
        if (_SettingId == 0) {
            MessageBox.Show(Resource.PleaseSelectItem, Resource.Error);
        }
        else {
            if (hasNodes) {
                MessageBox.Show(Resource.CannotDeleteHasChildren, Resource.Error);
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
            url: sys.apiUrl("MS_Settings", "Delete") + "/" + _SettingId,
            success: (result) => {
                if (result) {
                    Success = true;
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

    function Refrash() {
        Display(GetAll());
    }
}
