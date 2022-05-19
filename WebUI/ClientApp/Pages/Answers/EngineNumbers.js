$(document).ready(function () {
    SharedButtons.OnLoad();
    EngineNumbers.InitalizeComponent();
});
var EngineNumbers;
(function (EngineNumbers) {
    var sys = new SystemTools();
    var language = sys.SysSession.CurrentEnvironment.ScreenLanguage;
    var SysSession = GetSystemSession();
    var Resource = GetResourceList("");
    var element;
    function InitalizeComponent() {
        $('#headertop1').addClass('display_none');
        $('#headertop2').removeClass('display_none');
        $('#headerTitle').text("ارقام المواتير");
    }
    EngineNumbers.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
    }
    function InitalizeEvents() {
    }
})(EngineNumbers || (EngineNumbers = {}));
//# sourceMappingURL=EngineNumbers.js.map