document.addEventListener('DOMContentLoaded', contentLoaded, false);

var SiteApp = SiteApp || {

        value:{}

    };



function contentLoaded(event){

    SiteApp.value['title'] = 'MailChimp';
    SiteApp.value['description'] = 'Grid has a bespoke user interface called Maestro, which uses a selection of gestures to create a grid structure for any given task, and organise it as you see fit.';

    Tpl.include(['header','content','footer'], function(responses){

        Tpl.inject('#header', responses['header'].response, SiteApp.value);
        Tpl.inject('#content', responses['content'].response, SiteApp.value);
        Tpl.inject('#footer', responses['footer'].response, SiteApp.value);

    });

}

