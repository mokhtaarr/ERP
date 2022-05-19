﻿$(document).ready(() => {
    SharedButtons.OnLoad();
    PeriodicalBook.InitalizeComponent();
})
 
namespace PeriodicalBook {
    var sys: SystemTools = new SystemTools();
    var language = sys.SysSession.CurrentEnvironment.ScreenLanguage;
    var SysSession: SystemSession = GetSystemSession();
    let Resource: any = GetResourceList("");
    var element: HTMLInputElement;

    export function InitalizeComponent() {
        $('#headertop1').addClass('display_none');
        $('#headertop2').removeClass('display_none');
        $('#headerTitle').text("كتاب دوري");
    }

    function InitalizeControls() {
        
    }

    function InitalizeEvents() {
       
    }
}
