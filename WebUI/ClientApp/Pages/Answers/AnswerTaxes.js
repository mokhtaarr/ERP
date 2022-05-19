$(document).ready(function () {
    SharedButtons.OnLoad();
    AnswerTaxes.InitalizeComponent();
});
var AnswerTaxes;
(function (AnswerTaxes) {
    var sys = new SystemTools();
    var language = sys.SysSession.CurrentEnvironment.ScreenLanguage;
    var SysSession = GetSystemSession();
    var Resource = GetResourceList("");
    var element;
    function InitalizeComponent() {
        $('#headertop1').addClass('display_none');
        $('#headertop2').removeClass('display_none');
        $('#headerTitle').text("ضرائب الجوابات");
    }
    AnswerTaxes.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
    }
    function InitalizeEvents() {
    }
})(AnswerTaxes || (AnswerTaxes = {}));
//# sourceMappingURL=AnswerTaxes.js.map