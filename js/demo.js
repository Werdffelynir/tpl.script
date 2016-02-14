
document.addEventListener('DOMContentLoaded', contentLoaded, false);

var SiteApp = SiteApp || {

        value:{},

        view:{}
    };



function contentLoaded(event){

    SiteApp.value['title'] = 'MailChimp';
    SiteApp.value['description'] = 'Grid has a bespoke user interface called Maestro, which uses a selection of gestures to create a grid structure for any given task, and organise it as you see fit.';

    Tpl.include('header', function(response){

        var renderData = Tpl.renderString(response, SiteApp.value),

            header = Tpl.inject('#header', renderData);

        console.log(header);
    });
}
