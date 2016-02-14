
var Tpl = Tpl || {

        /**
         *  динамическая библиотека
         *  может выполнять роль провайдера данных.
         *  @var object data
         */
        data : {},

        /**
         * версия скрипта
         */
        version : '0.0.1',

        /**
         * путь к директории с шаблонами/видами. должен быть относительным,
         * нужно учесть что он используется для как часть строки запроса.
         * возможно нужно настроить индивидуально под роутер, выделив ему API
         */
        templates: 'templates/'
    };

(function(window, o){

    /**
     * Сборка конфигурации
     *
     * @param conf
     */
    o.config = function(conf) {
        o.templates = conf.templates ? conf.templates : o.templates;
    };


    /**
     * Загружает файл
     * Результат вернется как аргумент в функцию обратного вызова callback,
     * так-же результат сохраняется в динамической библиотеке Tpl.data[FILE_NAME].response
     *
     * @param fileName      имя файла html, без указания расширения
     * @param callback      функция обратного вызова. В функцию приходит аргумент
     *                          с ответом запроса
     * @param callbackError
     */
    o.loadHTML = function(fileName, callback, callbackError) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", o.templates + fileName + '.html', true);
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onload  = function(event) {
            if(xhr.status === 200 && typeof callback === 'function'){
                o.data[fileName] = {
                    source: o.templates + fileName + '.html',
                    response: xhr.responseText
                };
                callback.call(o, xhr.responseText);
            }
        };
        xhr.onerror = function(event) {
            if(typeof callbackError === 'function')
                callbackError.call(o, xhr);
        };
        xhr.send();
    };


    /**
     * Загружает один или несколько файлв, имена - параметры принимает в виде масива.
     *
     * @param filesNamesArray   имена / url файлов в массиве
     * @param callback          выполняется когда все файлы будут загружены
     * @param callbackError
     */
    o.include = function(filesNamesArray, callback, callbackError) {
        if(typeof filesNamesArray === 'string') filesNamesArray = [filesNamesArray];
        if(Object.prototype.toString.call(filesNamesArray) === '[object Array]'){

            o.include.iter = 0;
            o.include.amount = filesNamesArray.length;
            o.include.callBack = function(response){
                o.include.iter ++;
                if(o.include.iter === o.include.amount){
                    var arg = o.include.amount === 1 ? response : o.data;
                    callback.call(o, arg);
                }
            };

            filesNamesArray.map(function(file){
                o.loadHTML(String(file).trim(), o.include.callBack, callbackError);
            });


        }
    };

    /**
     * Внедряет в переданый объект selector данные с dataSource, но перед этим
     * рендерит переменные params в dataSource
     *
     * @param selector      селектор для выборки, или объект в который будет внедрены данные
     * @param dataSource    данные
     * @param params        параметры для шаблона в dataSource
     * @returns {*}         если selector успешно выбран, функция вернет Node.ELEMENT_NODE
     *                          в этот объект будет добавлены свойства:
     *                              .dataSource         исходная строка
     *                              .dataImplemented    результат щаблонизации
     */
    o.inject = function(selector, dataSource, params){
        if(typeof selector === 'string'){
            selector = document.querySelector(selector);
        }

        if(typeof selector === 'object' && selector.nodeType === Node.ELEMENT_NODE){
            selector.dataSource = dataSource;
            selector.innerHTML = selector.dataImplemented = o.renderString(dataSource, params);
            return selector;
        }
    };


    /**
     * Сводит шаблон с переменными
     *
     * @param stringData    строка с шаблонами
     * @param params        переменные
     * @returns {*}         вернет строку результата
     */
    o.renderString = function(stringData, params) {
        if(typeof params === 'object')
            for(var k in params)
                stringData = stringData.replace(new RegExp('{{'+k+'}}', 'gi'), params[k]);

        return stringData;
    };


})(window, Tpl);