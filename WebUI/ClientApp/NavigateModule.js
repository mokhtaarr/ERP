var NavigateModule;
(function (NavigateModule) {
    function InitalizeComponent(isOneRow) {
        if (isOneRow === void 0) { isOneRow = false; }
        NavigateModule.btnNext = document.getElementById("btnNext");
        NavigateModule.btnPrev = document.getElementById("btnPrev");
        NavigateModule.btnFirst = document.getElementById("btnFirst");
        NavigateModule.btnLast = document.getElementById("btnLast");
        NavigateModule.txtNavigator = DocumentActions.GetElementById("txtNavigator");
        SharedWork.PageIndex = 0;
        SharedWork.Render();
        NavigateModule.btnFirst.onclick = First;
        NavigateModule.btnLast.onclick = Last;
        NavigateModule.btnNext.onclick = Next;
        NavigateModule.btnPrev.onclick = Previous;
        if (isOneRow) {
            NavigateModule.btnNext.hidden = isOneRow;
            NavigateModule.btnPrev.hidden = isOneRow;
            NavigateModule.btnFirst.hidden = isOneRow;
            NavigateModule.btnLast.hidden = isOneRow;
            NavigateModule.txtNavigator.hidden = isOneRow;
            var addBtn = document.getElementById("Add_New"), deleteBtn = document.getElementById("btnDelete");
            addBtn.hidden = isOneRow;
            deleteBtn.hidden = isOneRow;
        }
    }
    NavigateModule.InitalizeComponent = InitalizeComponent;
    function Next() {
        if (SharedWork.PageIndex < SharedWork.Count) {
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
        SharedWork.PageIndex = SharedWork.Count;
        SharedWork.OnNavigate();
        SharedWork.Render();
        SharedWork.SwitchModes(ScreenModes.Query);
    }
})(NavigateModule || (NavigateModule = {}));
//# sourceMappingURL=NavigateModule.js.map