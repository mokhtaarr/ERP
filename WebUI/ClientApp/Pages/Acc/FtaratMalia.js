$(document).ready(function () {
    SharedButtons.OnLoad();
    FtaratMalia.InitalizeComponent();
});
var FtaratMalia;
(function (FtaratMalia) {
    $('#headertop1').addClass('display_none');
    $('#headertop2').removeClass('display_none');
    var Resource = GetResourceList("");
    var sys = new SystemTools();
    var language = sys.SysSession.CurrentEnvironment.ScreenLanguage;
    var SysSession = GetSystemSession();
    var compCode = SysSession.CurrentEnvironment.CompCode;
    var UserCode = SysSession.CurrentEnvironment.UserCode;
    var Token = "HGFD-" + SysSession.CurrentEnvironment.Token;
    //var AllTaxeIds: Array<MS_Taxes> = new Array<MS_Taxes>();
    //var Model: MS_Taxes = new MS_Taxes();
    // select Options
    var element;
    var ObjectId = 0;
    var StatusFlag;
    var Success;
    var flag = true;
    function InitalizeComponent() {
        //localStorage.setItem("TableName", "MS_Taxes");
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
    }
    FtaratMalia.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        //SharedButtons.btnSearch = document.getElementById("btnMS_TaxesSearch") as HTMLButtonElement;
    }
    function InitalizeEvents() {
        //SharedButtons.btnSearch.onclick = btnSearch_onclick;
        //SharedButtons.btnRefrash2.onclick = Refrash;
        //TermType.onchange = function () {
        //    TermTypechanged(TermType.value)
        //};
    }
    function GetAll() {
        //Disabled(false);
        //Ajax.Callsync({
        //    type: "Get",
        //    url: sys.apiUrl("MS_Taxes", "GetAll"),
        //    success: (d) => {
        //        let result = d as BaseResponse;
        //        if (result.IsSuccess) {
        //            AllTaxeIds = result.Response as Array<MS_Taxes>;
        //            //console.log(Terms)
        //        }
        //    }
        //});
    }
    function GetByID(Id) {
        //Ajax.Callsync({
        //    type: "Get",
        //    url: sys.apiUrl("MS_Taxes", "GetById"),
        //    data: { id: Id },
        //    success: (d) => {
        //        let result = d as BaseResponse;
        //        if (result.IsSuccess) {
        //            let res = result.Response as MS_Taxes;
        //            Display(res);
        //            SharedWork.SwitchModes(ScreenModes.Query);
        //        }
        //        else
        //            MessageBox.Toastr(Resource.Error, Resource.Error, ToastrTypes.error);
        //    }
        //});
    }
    function Assign() {
        //Model = DocumentActions.AssignToModel<MS_Taxes>(Model);
        //if (StatusFlag == "i") {
        //    Model.CreatedAt = DateTimeFormat(Date().toString());
        //    Model.CreatedBy = SysSession.CurrentEnvironment.UserCode;
        //    Insert();
        //}
        //if (StatusFlag == "u") {
        //    Model.TaxesId = ObjectId;
        //    Model.UpdateAt = DateTimeFormat(Date().toString());
        //    Model.UpdateBy = SysSession.CurrentEnvironment.UserCode;
        //    Update();
        //}
        //ObjectId = Model.TaxesId;
        //GetAll();
        //return true;
    }
    function Save() {
        //if (DocumentActions.CheckCode(AllTaxeIds, DocumentActions.GetElementByName("TaxCode").value, "TaxCode") == false && StatusFlag == "i") {
        //    MessageBox.Toastr(Resource.CodeCannotDuplicated, Resource.Error, ToastrTypes.error);
        //}
        //else {
        //    Assign();
        //    if (Success) {
        //        Disabled(false);
        //        Success = false;
        //        SharedWork.SwitchModes(ScreenModes.Query);
        //    }
        //}
    }
    function Insert() {
        //$("#MessageBoxDialog").modal("hide");
        //Ajax.Callsync({
        //    type: "POST",
        //    url: sys.apiUrl("MS_Taxes", "Insert"),
        //    data: JSON.stringify(Model),
        //    success: (Response) => {
        //        let result = Response as BaseResponse;
        //        if (result.IsSuccess) {
        //            Model = result.Response as MS_Taxes;
        //            ObjectId = Model.TaxesId;
        //            Success = true;
        //        }
        //        else {
        //            MessageBox.Toastr(Resource.Error, Resource.Error, ToastrTypes.error);
        //            Success = false;
        //        }
        //    }
        //});
    }
    function Update() {
        //$("#MessageBoxDialog").modal("hide");
        //Ajax.Callsync({
        //    type: "POST",
        //    url: sys.apiUrl("MS_Taxes", "Update"),
        //    data: JSON.stringify(Model),
        //    success: (Response) => {
        //        let result = Response as BaseResponse;
        //        if (result.IsSuccess) {
        //            Model = result.Response as MS_Taxes;
        //            ObjectId = Model.TaxesId;
        //            Success = true;
        //        }
        //        else {
        //            MessageBox.Toastr(Resource.Error, Resource.Error, ToastrTypes.error);
        //            Success = false;
        //        }
        //    }
        //});
    }
    function Delete() {
        //$("#MessageBoxDialog").modal("hide");
        //Ajax.Callsync({
        //    type: "Get",
        //    url: sys.apiUrl("MS_Taxes", "Delete"),
        //    data: { id: Model.TaxesId},
        //    success: (result) => {
        //        if (result) {
        //            Success = true;
        //            ObjectId = 0;
        //            GetAll();
        //            Disabled(result);
        //            $('select').val('null').select2().trigger('change')
        //        }
        //        else {
        //            MessageBox.Toastr(Resource.Error, Resource.Error, ToastrTypes.error);
        //            Success = false;
        //        }
        //    }
        //});
    }
    function btnAdd_onclick() {
        //StatusFlag = 'i';
        //RemoveDisabled(true);
        //$('select option:first-child').val('null').prop("selected", true).prop("disabled", true);
    }
    function btnEdit_onclick() {
        //if (ObjectId == 0) {
        //    MessageBox.Toastr(Resource.PleaseSelectItem, Resource.Error, ToastrTypes.error);
        //}
        //else {
        //    RemoveDisabled(false);
        //    element = DocumentActions.GetElementByName("TaxCode");
        //    element.disabled = true;
        //    StatusFlag = 'u';
        //}
    }
    function btnsave_onClick() {
        //if (!Validation()) return
        //Save();
    }
    function btnDelete_onclick() {
        //StatusFlag == "d";
        //if (ObjectId == 0) {
        //    MessageBox.Toastr(Resource.PleaseSelectItem, Resource.Error, ToastrTypes.error);
        //}
        //else {
        //    Delete();
        //}
    }
    function Validation() {
        if (DocumentActions.GetElementByName("TaxCode").value == "") {
            MessageBox.Toastr(Resource.PleaseEnterCode, Resource.Error, ToastrTypes.error);
            flag = false;
        }
        else if (DocumentActions.GetElementByName("TaxNameA").value == "") {
            MessageBox.Toastr(Resource.PleaseEnterNameArabic, Resource.Error, ToastrTypes.error);
            flag = false;
        }
        else
            flag = true;
        return flag;
    }
    function Navigate() {
        //Model = AllTaxeIds[SharedWork.PageIndex - 1];
        //ObjectId = Model.TaxesId;
        //GetByID(ObjectId);
    }
    FtaratMalia.Navigate = Navigate;
    function Display(model) {
        //Model = model;
        //DocumentActions.RenderFromModel(Model);
        //ObjectId = Number(Model.TaxesId);
    }
    function Undo() {
        Disabled(false);
        Success = false;
        if (ObjectId != 0) {
            GetByID(ObjectId);
        }
    }
    function Disabled(clear) {
        //DocumentActions.allElements(true, clear, Model);
    }
    function RemoveDisabled(clear) {
        //DocumentActions.allElements(false, clear, Model);
    }
    function GetModel(id) {
        //Model = AllTaxeIds.filter(x => x.TaxesId == id)[0];
        //return Model;
    }
    function btnSearch_onclick() {
        //let sys: SystemTools = new SystemTools();
        //sys.FindKey(Modules.MS_Taxes, SharedButtons.btnSearch.id, "", () => {
        //    let id = SearchGrid.SearchDataGrid.SelectedKey;
        //    if (!IsNullOrEmpty(id)) {
        //        GetByID(ObjectId);
        //    }
        //});
    }
    function Refrash() {
        GetAll();
        GetByID(ObjectId);
    }
})(FtaratMalia || (FtaratMalia = {}));
//# sourceMappingURL=FtaratMalia.js.map