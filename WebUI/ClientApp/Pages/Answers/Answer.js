$(document).ready(function () {
    SharedButtons.OnLoad();
    Answer.InitalizeComponent();
});
var Answer;
(function (Answer) {
    var sys = new SystemTools();
    var language = sys.SysSession.CurrentEnvironment.ScreenLanguage;
    var SysSession = GetSystemSession();
    var Resource = GetResourceList("");
    var element;
    function InitalizeComponent() {
        $('#headertop1').addClass('display_none');
        $('#headertop2').removeClass('display_none');
        $('#headerTitle').text("الجواب");
    }
    Answer.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
    }
    function InitalizeEvents() {
    }
})(Answer || (Answer = {}));
//# sourceMappingURL=Answer.js.map