namespace SharedButtons {
    ///// Search ///////////////
    export function OnLoad() {
        InitalizeComponent();
        SharedWork.SwitchModes(ScreenModes.Start);
    }

    export function InitalizeComponent() {
        btnAdd = document.getElementById("Add_New") as HTMLButtonElement;
        btnEdit = document.getElementById("btnEdit") as HTMLButtonElement;
        btnsave = document.getElementById("btnsave") as HTMLButtonElement;
        btnDelete = document.getElementById("btnDelete") as HTMLButtonElement;
        btnUndo = document.getElementById("btnUndo") as HTMLButtonElement;
        btnPrint = document.getElementById("btnPrint") as HTMLButtonElement;
        btnPreview = document.getElementById("btnPreview") as HTMLButtonElement;
        //////////// in treeJs
        btnRefrash = document.getElementById("Refrash") as HTMLButtonElement
        ///////// in nav
        btnRefrash2 = document.getElementById("btnRefrash") as HTMLButtonElement
        btnResetSearch = document.getElementById("resetSearch") as HTMLButtonElement
    }

    export var compcode: number;
    export var BranchCode: number;
    export var btnSearch: HTMLButtonElement;
    export var btnRefrash: HTMLButtonElement;
    export var btnRefrash2: HTMLButtonElement;
    export var btnResetSearch: HTMLButtonElement;

    export var btnAdd: HTMLButtonElement = null;
    export function AddAction(action: () => void) {
        InitalizeComponent();
        $("#" + btnAdd.id).on("click", () => {
            //SharedWork.PageIndex = 0;
            SharedWork.SwitchModes(ScreenModes.Add);
            $(".addable").val("");
            action();
            //NavigateModule.InitalizeComponent();
            $("select").trigger('change');
        });
    }

    export var btnsave: HTMLButtonElement = null;
    export function SaveAction(action: () => void) {
        $("#" + btnsave.id).on("click", () => {
            if (SharedWork.CurrentMode == ScreenModes.Add) 
                NavigateModule.InitalizeComponent();

            action();
        });
    }

    export var btnEdit: HTMLButtonElement = null;
    export function EditAction(action: () => void) {
        $("#" + btnEdit.id).on("click", () => {
            SharedWork.SwitchModes(ScreenModes.Edit);
            action();
            //NavigateModule.InitalizeComponent();
        });
    }

    export var btnDelete: HTMLButtonElement = null;

    export function DeleteAction(action: () => void) {
        $("#" + btnDelete.id).on("click", () => {
            MessageBox.Ask("هل أنت متأكد من حذف البيان", "حذف", () => {
                action();
                NavigateModule.InitalizeComponent();
            }, () => { });
        });
    }

    export var btnUndo: HTMLButtonElement = null;
    export function UndoAction(action: () => void) {
        $("#" + btnUndo.id).on("click", () => {
            MessageBox.Ask("هل أنت متأكد من التراجع ", "تراجع", () => {
                SharedWork.SwitchModes(ScreenModes.Query);
                action();
                //NavigateModule.InitalizeComponent();
            }, () => { });
        });
    }

    export var btnPrint: HTMLButtonElement = null;

    export function PrintAction(action: () => void) { }

    export var btnPreview: HTMLButtonElement = null;

    export function PreviewAction(action: () => void) { }
}