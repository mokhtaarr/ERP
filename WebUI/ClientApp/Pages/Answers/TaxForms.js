$(document).ready(function () {
    SharedButtons.OnLoad();
    TaxForms.InitalizeComponent();
});
var TaxForms;
(function (TaxForms) {
    var sys = new SystemTools();
    var language = sys.SysSession.CurrentEnvironment.ScreenLanguage;
    var SysSession = GetSystemSession();
    var Resource = GetResourceList("");
    var element;
    function InitalizeComponent() {
        $('#headertop1').addClass('display_none');
        $('#headertop2').removeClass('display_none');
        $('#headerTitle').text("نماذج الضرائب");
    }
    TaxForms.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
    }
    function InitalizeEvents() {
    }
})(TaxForms || (TaxForms = {}));
//# sourceMappingURL=TaxForms.js.map