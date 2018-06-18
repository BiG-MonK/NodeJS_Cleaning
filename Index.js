window.onload = function () {
    var tab__buffer;
    var tab__clear;
    var win = gui.Window.get();
    tab__buffer = document.querySelector('.tab__controls-item:first-child');
    tab__clear = document.querySelector('.tab__controls-item:last-child');
    btn__getData = document.querySelector('.btn__get-data');

    tab__buffer.onclick = function () {
        win.width = 400;
        win.height = 500;
        win.position = 'center';
        document.querySelector('.clear').classList.remove('show');
        document.querySelector('.clear').classList.add('hide');
        document.querySelector('.buffer').classList.add('show');
        document.querySelector('.buffer').classList.remove('hide');
    };

    tab__clear.onclick = function () {
        document.querySelector('.buffer').classList.remove('show');
        document.querySelector('.buffer').classList.add('hide');
        document.querySelector('.clear').classList.add('show');
        document.querySelector('.clear').classList.remove('hide');
        win.width = 900;
        win.height = document.querySelector('.tab__content-item.clear').offsetHeight + 70;
        win.position = 'center';
    };

    btn__getData.onclick = function () {
        var path_size_all_user = 0;
        var size_f_user = 0;
        get_user_list('c:/Users').forEach(function (user) {
            for (let i = 0; i < path_clean.length; i++) {
            // path_clean.forEach(function (path) {

                list_dir('c:/Users/' + user + path_clean[i]);
                size_f_user += size_all_files;
                // var path_f_size = document.querySelector('.table__path-f-size');
                // var newTr = document.createElement('tr');
                // var newTd = document.createElement('td');
                // var newTd2 = document.createElement('td');
                // var newTd3 = document.createElement('td');
                // path_f_size.appendChild(newTr);
                // newTr.appendChild(newTd);
                // newTd.textContent = path;
                // newTr.appendChild(newTd2);
                // newTd2.textContent = arr_files.length;
                // newTr.appendChild(newTd3);
                // newTd3.textContent = (size_all_files / 1024 / 1024).toFixed(4) + ' Mb';
                // arr_files = [];
                // size_all_files = 0;
            // });
            }
            var dir_f_size = document.querySelector('.table__dir-f-size');
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
            newTd3.textContent = arr_files.length;
            newTr.appendChild(newTd4);
            newTd4.textContent = (size_all_files / 1024 / 1024).toFixed(4) + ' Mb';
            arr_dir = [];
            arr_files = [];
            size_all_files = 0;
        }); //--- Конец цепочки функции на отображения данных папок юзеров
        win.resizeTo(900, document.querySelector('.tab__content-item.clear').offsetHeight + 70);
    };

    document.querySelector('.btn__clear-screen').onclick = function () {
        location.reload();
    };
}