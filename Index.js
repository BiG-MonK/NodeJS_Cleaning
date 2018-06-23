
window.onload = function () {
    var tab__buffer;
    var tab__clear;
    var win = gui.Window.get();
    tab__buffer = document.querySelector('.tab__controls-item:first-child');
    tab__clear = document.querySelector('.tab__controls-item:last-child');
    btn__getData = document.querySelector('.btn__get-data');
    btn__getDownloads = document.querySelector('.btn__get-downloads');
    checkb_downloads = document.querySelector('#downloads-field');
    checkb_scan = document.querySelector('#scan-field');

    tab__buffer.onclick = function () {                                 //--- Событие по нажатию на ТАБ buffer
        win.width = 400;
        win.height = 500;
        win.position = 'center';
        document.querySelector('.clear').classList.remove('show');
        document.querySelector('.clear').classList.add('hide');
        document.querySelector('.buffer').classList.add('show');
        document.querySelector('.buffer').classList.remove('hide');
    };

    tab__clear.onclick = function () {                                  //--- Событие по нажатию на ТАБ clearing
        document.querySelector('.buffer').classList.remove('show');
        document.querySelector('.buffer').classList.add('hide');
        document.querySelector('.clear').classList.add('show');
        document.querySelector('.clear').classList.remove('hide');
        win.width = 900;
        win.height = document.querySelector('.tab__content-item.clear').offsetHeight + 70;
        win.position = 'center';
    };

    btn__getDownloads.onclick = function () {  
        var time_filter = document.querySelector('.select__downloads').value;
        if (checkb_downloads.checked){
            console.log(get_date_files(time_filter, "d:/test"));
        }
    };

    btn__getData.onclick = function () {                                //--- Событие по нажатию на кнопку -получить данные-
        get_user_list('c:/Users').forEach(function (user) {             //--- Действие над каждым элементом массива всех юзеров
            path_clean.forEach(function (path) {                        //--- Действие над каждым элементом массива всех путей для чистки
                list_dir('c:/Users/' + user + path.dir);                //--- Проход по каждой дирректории и получение данных о кол-ве и размере файлов
                path.size += size_all_files;
                path.size_of_user += size_all_files;
                path.count_files += arr_files.length;
                path.count_files_of_user += arr_files.length;
                arr_files = [];                             //--- Обнуление для чистоты расчета кол-ва файлов по следующему пути
                size_all_files = 0;                         //--- Обнуление для чистоты расчета суммарного размера всех файлов по следующему пути
            });
            var initialValue = 0;
            var dir_f_size = document.querySelector('.tbody__user-dir-f-size');
            var newTr = document.createElement('tr');
            var newTd = document.createElement('td');
            var newTd2 = document.createElement('td');
            var newTd3 = document.createElement('td');
            var newTd4 = document.createElement('td');
            dir_f_size.appendChild(newTr);
            newTr.appendChild(newTd);
            newTd.textContent = user;
            newTr.appendChild(newTd2);
            newTd2.textContent = arr_dir.length;
            newTr.appendChild(newTd3);
            newTd3.textContent = path_clean.reduce(function (accumulator, currentValue) { //--- Суммирование всех значений count_files_of_user массива path_clean
                return accumulator + currentValue.count_files_of_user;
            }, initialValue);
            path_clean.forEach(function (path) { path.count_files_of_user = 0; }); //--- Обнуление у всех путей счетчика числа файлов, для другого юзера
            newTr.appendChild(newTd4);
            newTd4.textContent = (path_clean.reduce(function (accumulator, currentValue) { //--- Суммирование всех значений size_of_user массива path_clean
                return accumulator + currentValue.size_of_user;                     
            }, initialValue) / 1024 / 1024).toFixed(4) + ' Mb';
            path_clean.forEach(function (path) { path.size_of_user = 0; });       //--- Обнуление у всех путей счетчика размера файлов, для другого юзера
            arr_dir = [];
            arr_files = [];
            size_all_files = 0;
        }); //--- Конец цепочки функции на отображения данных папок юзеров
        path_clean.forEach(function (path) {                                      //--- Вывод в таблицу суммарных данных по всем юзерам по каждому пути
            var path_f_size = document.querySelector('.tbody__path-f-size');
            var newTr = document.createElement('tr');
            var newTd = document.createElement('td');
            var newTd2 = document.createElement('td');
            var newTd3 = document.createElement('td');
            path_f_size.appendChild(newTr);
            newTr.appendChild(newTd);
            newTd.textContent = path.dir;                                         //--- Вывод самого пути
            newTr.appendChild(newTd2);
            newTd2.textContent = path.count_files;                                //--- Вывод общего счетчика файлов со всех юзеров по одному пути
            newTr.appendChild(newTd3);
            newTd3.textContent = (path.size / 1024 / 1024).toFixed(4) + ' Mb';    //--- Вывод общего размера файлов со всех юзеров по одному пути
        });
        win.resizeTo(900, document.querySelector('.tab__content-item.clear').offsetHeight + 70); //--- Установаить высоту окна, относительно высоты заполняемой таблицы
    };

    document.querySelector('.btn__clear-screen').onclick = function () {           //--- Событие на кнопку - очистка окна
        location.reload();
    };
}