$(document).ready(() => {
    //HomeComponent.Language();
    BackgroundImage.GetBackgroundImage();
    $('#headertop2').remove();
    BackgroundImage.GetCountInDashboard();
});

namespace BackgroundImage {
    var sys: SystemTools = new SystemTools();
    var Dashboard: CountInDashboard = new CountInDashboard();
    var SysSession: SystemSession = GetSystemSession();
  
  export function GetBackgroundImage() {
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

    export function GetCountInDashboard() {
        Ajax.Callsync({
            type: "GET",
            url: sys.apiUrl("Dashboard", "GetCountInDashboard"),
            success: function (result) {
                Dashboard = result.Response as CountInDashboard;
                FillCount(Dashboard)
            }
        });

        function FillCount(Count: CountInDashboard) {
            $('#ReceiptCount').text(Count.ReceiptNoteCount);
            $('#PaymentCount').text(Count.PaymentNoteCount);
            $('#CustomerCount').text(Count.CustomerCount);
            $('#VendorCount').text(Count.VendorCount);
            $('#UsersCount').text(Count.UsersCount);
        }
    }
}