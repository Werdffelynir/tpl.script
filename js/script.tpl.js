
var Tpl = Tpl || {

        /**
         *  ������������ ����������
         *  ����� ��������� ���� ���������� ������.
         *  @var object data
         */
        data : {},

        /**
         * ������ �������
         */
        version : '0.0.1',

        /**
         * ���� � ���������� � ���������/������. ������ ���� �������������,
         * ����� ������ ��� �� ������������ ��� ��� ����� ������ �������.
         * �������� ����� ��������� ������������� ��� ������, ������� ��� API
         */
        templates: 'templates/'
    };

(function(window, o){

    /**
     * ������ ������������
     *
     * @param conf
     */
    o.config = function(conf) {
        o.templates = conf.templates ? conf.templates : o.templates;
    };


    /**
     * ��������� ����
     * ��������� �������� ��� �������� � ������� ��������� ������ callback,
     * ���-�� ��������� ����������� � ������������ ���������� Tpl.data[FILE_NAME].response
     *
     * @param fileName      ��� ����� html, ��� �������� ����������
     * @param callback      ������� ��������� ������. � ������� �������� ��������
     *                          � ������� �������
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
     * ��������� ���� ��� ��������� �����, ����� - ��������� ��������� � ���� ������.
     *
     * @param filesNamesArray   ����� / url ������ � �������
     * @param callback          ����������� ����� ��� ����� ����� ���������
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
     * �������� � ��������� ������ selector ������ � dataSource, �� ����� ����
     * �������� ���������� params � dataSource
     *
     * @param selector      �������� ��� �������, ��� ������ � ������� ����� �������� ������
     * @param dataSource    ������
     * @param params        ��������� ��� ������� � dataSource
     * @returns {*}         ���� selector ������� ������, ������� ������ Node.ELEMENT_NODE
     *                          � ���� ������ ����� ��������� ��������:
     *                              .dataSource         �������� ������
     *                              .dataImplemented    ��������� ������������
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
     * ������ ������ � �����������
     *
     * @param stringData    ������ � ���������
     * @param params        ����������
     * @returns {*}         ������ ������ ����������
     */
    o.renderString = function(stringData, params) {
        if(typeof params === 'object')
            for(var k in params)
                stringData = stringData.replace(new RegExp('{{'+k+'}}', 'gi'), params[k]);

        return stringData;
    };


})(window, Tpl);