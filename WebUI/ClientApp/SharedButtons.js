var SharedButtons;
(function (SharedButtons) {
    ///// Search ///////////////
    function OnLoad() {
        InitalizeComponent();
        SharedWork.SwitchModes(ScreenModes.Start);
    }
    SharedButtons.OnLoad = OnLoad;
    function InitalizeComponent() {
        SharedButtons.btnAdd = document.getElementById("Add_New");
        SharedButtons.btnEdit = document.getElementById("btnEdit");
        SharedButtons.btnsave = document.getElementById("btnsave");
        SharedButtons.btnDelete = document.getElementById("btnDelete");
        SharedButtons.btnUndo = document.getElementById("btnUndo");
        SharedButtons.btnPrint = document.getElementById("btnPrint");
        SharedButtons.btnPreview = document.getElementById("btnPreview");
        //////////// in treeJs
        SharedButtons.btnRefrash = document.getElementById("Refrash");
        ///////// in nav
        SharedButtons.btnRefrash2 = document.getElementById("btnRefrash");
        SharedButtons.btnResetSearch = document.getElementById("resetSearch");
    }
    SharedButtons.InitalizeComponent = InitalizeComponent;
    SharedButtons.btnAdd = null;
    function AddAction(action) {
        InitalizeComponent();
        $("#" + SharedButtons.btnAdd.id).on("click", function () {
            //SharedWork.PageIndex = 0;
            SharedWork.SwitchModes(ScreenModes.Add);
            $(".addable").val("");
            action();
            //NavigateModule.InitalizeComponent();
            $("select").trigger('change');
        });
    }
    SharedButtons.AddAction = AddAction;
    SharedButtons.btnsave = null;
    function SaveAction(action) {
        $("#" + SharedButtons.btnsave.id).on("click", function () {
            if (SharedWork.CurrentMode == ScreenModes.Add)
                NavigateModule.InitalizeComponent();
            action();
        });
    }
    SharedButtons.SaveAction = SaveAction;
    SharedButtons.btnEdit = null;
    function EditAction(action) {
        $("#" + SharedButtons.btnEdit.id).on("click", function () {
            SharedWork.SwitchModes(ScreenModes.Edit);
            action();
            //NavigateModule.InitalizeComponent();
        });
    }
    SharedButtons.EditAction = EditAction;
    SharedButtons.btnDelete = null;
    function DeleteAction(action) {
        $("#" + SharedButtons.btnDelete.id).on("click", function () {
            MessageBox.Ask("هل أنت متأكد من حذف البيان", "حذف", function () {
                action();
                NavigateModule.InitalizeComponent();
            }, function () { });
        });
    }
    SharedButtons.DeleteAction = DeleteAction;
    SharedButtons.btnUndo = null;
    function UndoAction(action) {
        $("#" + SharedButtons.btnUndo.id).on("click", function () {
            MessageBox.Ask("هل أنت متأكد من التراجع ", "تراجع", function () {
                SharedWork.SwitchModes(ScreenModes.Query);
                action();
                //NavigateModule.InitalizeComponent();
            }, function () { });
        });
    }
    SharedButtons.UndoAction = UndoAction;
    SharedButtons.btnPrint = null;
    function PrintAction(action) { }
    SharedButtons.PrintAction = PrintAction;
    SharedButtons.btnPreview = null;
    function PreviewAction(action) { }
    SharedButtons.PreviewAction = PreviewAction;
})(SharedButtons || (SharedButtons = {}));
//# sourceMappingURL=SharedButtons.js.map