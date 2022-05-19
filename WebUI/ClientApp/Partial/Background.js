$(document).ready(function () {
    //HomeComponent.Language();
    BackgroundImage.GetBackgroundImage();
    $('#headertop2').remove();
    BackgroundImage.GetCountInDashboard();
});
var BackgroundImage;
(function (BackgroundImage) {
    var sys = new SystemTools();
    var Dashboard = new CountInDashboard();
    var SysSession = GetSystemSession();
    function GetBackgroundImage() {
        //$.ajax({
        //    type: "GET",
        //    async: false,
        //    url: sys.apiUrl("SystemTools", "getBackgroundImage"),
        //    data: { CompCode: Number(SysSession.CurrentEnvironment.CompCode) },
        //    success: (response) => {
        //        let class_css = "<style>.hero-image {background-image: url(../../images/Background/" + response + ")!important;height: -webkit-fill-available;background-position: center!important;background-repeat: no-repeat;background-size: cover;position: relative;top:-21px;}</style>";
        //        $("#cont").append(class_css);
        //        $("#body_img").addClass("hero-image");
        //        //$("#cont").html(' <img id="img_divcont" style="background-repeat: no-repeat;max-width: 104.9%;height: auto;margin: -15px -29px 0px -14px;" src="/images/Background/' + response + '" alt="Alternate Text" /> ');
        //    }
        //});
    }
    BackgroundImage.GetBackgroundImage = GetBackgroundImage;
    function GetCountInDashboard() {
        Ajax.Callsync({
            type: "GET",
            url: sys.apiUrl("Dashboard", "GetCountInDashboard"),
            success: function (result) {
                Dashboard = result.Response;
                FillCount(Dashboard);
            }
        });
        function FillCount(Count) {
            $('#ReceiptCount').text(Count.ReceiptNoteCount);
            $('#PaymentCount').text(Count.PaymentNoteCount);
            $('#CustomerCount').text(Count.CustomerCount);
            $('#VendorCount').text(Count.VendorCount);
            $('#UsersCount').text(Count.UsersCount);
        }
    }
    BackgroundImage.GetCountInDashboard = GetCountInDashboard;
})(BackgroundImage || (BackgroundImage = {}));
//# sourceMappingURL=Background.js.map