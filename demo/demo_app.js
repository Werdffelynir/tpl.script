


document.addEventListener('DOMContentLoaded', contentLoaded, false);

Tpl.config({

    template: 'templates_app/'

});

var siteApp = siteApp || {
        value:{}, data:{},
        title:'My Application',
        page:null,
        header:null,
        content:null,
        footer:null
    };

function contentLoaded(event){

    siteApp.page = Tpl.query('#page');
    siteApp.header = Tpl.query('#header');
    siteApp.content = Tpl.query('#content');
    siteApp.footer = Tpl.query('#footer');

    // load test data
    //siteApp.data['articles'] = demo_articles;
    //siteApp.data['users'] = demo_users;
    siteApp.value['title'] = demo_articles[0]['title'];
    siteApp.value['description'] = demo_articles[0]['description'];

    Tpl.loadJSON('js/testdata.json', function(response){
        console.log(response);
    });

    //Tpl.request('', request);
    //function dataBaseLoaded(){}

    //Tpl.localSet('str', 'demo_articles');
    //Tpl.localSet('articles', demo_articles);

    Tpl.include(['header','content','footer'], function(responses){

        Tpl.inject(siteApp.header, responses['header'].response, siteApp.value);
        Tpl.inject(siteApp.content, responses['content'].response, siteApp.value);
        Tpl.inject(siteApp.footer, responses['footer'].response, siteApp.value);

    });

    //var str = Tpl.localGet('str', false, true);
    //var articles = Tpl.localGet('articles', false, true);

    //console.log(str);
    //console.log(articles);



    //Tpl.merge(siteApp.value, );


    //siteApp.value['title'] = 'MailChimp';
    //siteApp.value['description'] = 'Grid has a bespoke user interface called Maestro, which uses a selection of gestures to create a grid structure for any given task, and organise it as you see fit.';


}

