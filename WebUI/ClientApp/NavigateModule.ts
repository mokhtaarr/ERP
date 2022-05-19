namespace NavigateModule {
    export var btnNext: HTMLInputElement;
    export var btnPrev: HTMLInputElement;
    export var btnFirst: HTMLInputElement;
    export var btnLast: HTMLInputElement;
    export var txtNavigator: HTMLInputElement;

    export function InitalizeComponent(isOneRow: boolean = false) {
        btnNext = document.getElementById("btnNext") as HTMLInputElement;
        btnPrev = document.getElementById("btnPrev") as HTMLInputElement;
        btnFirst = document.getElementById("btnFirst") as HTMLInputElement;
        btnLast = document.getElementById("btnLast") as HTMLInputElement;
        txtNavigator = DocumentActions.GetElementById<HTMLInputElement>("txtNavigator");
        SharedWork.PageIndex = 0;
        SharedWork.Render();
        btnFirst.onclick = First;
        btnLast.onclick = Last;
        btnNext.onclick = Next;
        btnPrev.onclick = Previous;

        if (isOneRow) {
            btnNext.hidden = isOneRow;
            btnPrev.hidden = isOneRow;
            btnFirst.hidden = isOneRow;
            btnLast.hidden = isOneRow;
            txtNavigator.hidden = isOneRow;

            let addBtn = document.getElementById("Add_New") as HTMLInputElement,
                deleteBtn = document.getElementById("btnDelete") as HTMLInputElement;
            addBtn.hidden = isOneRow;
            deleteBtn.hidden = isOneRow;
        }
    }

    function Next() {
        if (SharedWork.PageIndex < SharedWork.ModelCount) {
            SharedWork.PageIndex += 1;
            SharedWork.OnNavigate();
            SharedWork.Render();
        }
        SharedWork.SwitchModes(ScreenModes.Query);
    }

    function Previous() {
        if (SharedWork.PageIndex > 1) {
            SharedWork.PageIndex -= 1;
            SharedWork.OnNavigate();
            SharedWork.Render();
        }
        SharedWork.SwitchModes(ScreenModes.Query);
    }

    function First() {
        SharedWork.PageIndex = 1;
        SharedWork.OnNavigate();
        SharedWork.Render();

        SharedWork.SwitchModes(ScreenModes.Query);
    }
    function Last() {
        SharedWork.PageIndex = SharedWork.ModelCount;
        SharedWork.OnNavigate();
        SharedWork.Render();
        SharedWork.SwitchModes(ScreenModes.Query);
    }
}