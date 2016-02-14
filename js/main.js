/**
 * Функция Tpl.load( FILE_NAME , CALLBACK )
 * Загружает файл и выполняет функцию полсле окончания загрузки файла
 * аргументом приходит результат ресурс загружонного файла.
 * В теле функции внидрение контента файла в основной шаблон.
 *
 * @param fileName      имя загружаемого файла [FILE_NAME].html
 * @param callback      function ( response ) функция обратного вызова
 * @var response        результат загрузки. Результат всегда доступен в Tpl.data[FILE_NAME].response
 */
Tpl.load('header', function(response){

    var outputData = {title: 'Simple text title', description: 'Simple content description'};

    var objHeaderResponse = Tpl.inject('#header', response, outputData);

    console.log(objHeaderResponse);
    console.log(objHeaderResponse.dataSource);
    console.log(objHeaderResponse.dataImplemented);

});

