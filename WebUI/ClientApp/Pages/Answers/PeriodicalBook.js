$(document).ready(function () {
    SharedButtons.OnLoad();
    PeriodicalBook.InitalizeComponent();
});
var PeriodicalBook;
(function (PeriodicalBook) {
    var sys = new SystemTools();
    var language = sys.SysSession.CurrentEnvironment.ScreenLanguage;
    var SysSession = GetSystemSession();
    var Resource = GetResourceList("");
    var element;
    function InitalizeComponent() {
        $('#headertop1').addClass('display_none');
        $('#headertop2').removeClass('display_none');
        $('#headerTitle').text("كتاب دوري");
    }
    PeriodicalBook.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
    }
    function InitalizeEvents() {
    }
})(PeriodicalBook || (PeriodicalBook = {}));
//# sourceMappingURL=PeriodicalBook.js.map