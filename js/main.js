/**
 * ������� Tpl.load( FILE_NAME , CALLBACK )
 * ��������� ���� � ��������� ������� ������ ��������� �������� �����
 * ���������� �������� ��������� ������ ������������ �����.
 * � ���� ������� ��������� �������� ����� � �������� ������.
 *
 * @param fileName      ��� ������������ ����� [FILE_NAME].html
 * @param callback      function ( response ) ������� ��������� ������
 * @var response        ��������� ��������. ��������� ������ �������� � Tpl.data[FILE_NAME].response
 */
Tpl.load('header', function(response){

    var outputData = {title: 'Simple text title', description: 'Simple content description'};

    var objHeaderResponse = Tpl.inject('#header', response, outputData);

    console.log(objHeaderResponse);
    console.log(objHeaderResponse.dataSource);
    console.log(objHeaderResponse.dataImplemented);

});

