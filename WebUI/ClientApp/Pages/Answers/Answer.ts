$(document).ready(() => {
    SharedButtons.OnLoad();
    Answer.InitalizeComponent();
})
 
namespace Answer {
    var sys: SystemTools = new SystemTools();
    var language = sys.SysSession.CurrentEnvironment.ScreenLanguage;
    var SysSession: SystemSession = GetSystemSession();
    let Resource: any = GetResourceList("");
    var element: HTMLInputElement;

    export function InitalizeComponent() {
        $('#headertop1').addClass('display_none');
        $('#headertop2').removeClass('display_none');

        $('#headerTitle').text("الجواب");
    }

    function InitalizeControls() {
        
    }

    function InitalizeEvents() {
       
    }
}
