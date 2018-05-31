
var gui = new require('nw.gui');
var buffer_text = '', buffer_array = [], buffer_obj = '', top = 1;

var Time = function() {
    var date = new Date();
    var H = date.getHours() < 10 ? "0" + date.getHours() : date.getHours(),
        M = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(),
        S = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    return H + ' : ' + M + ' : ' + S;
};

var Top_window = function(){                                //--------- Функция переключателя окна поверх всех окон
    var win = gui.Window.get();
    if (top === 0){
        win.hide();
        top++;
    } else {
        win.show();
        win.setAlwaysOnTop(true);
        top--;
    }
}//конец функции переключателя окна поверх всех окон
Top_window();

var id = setInterval(function () {
    buffer_obj = gui.Clipboard.get();
    buffer_text = buffer_obj.get();
    if (!buffer_array.some(elem => elem == buffer_text)) {  //--------- Сравнение вновь поступившего элемента в массив с уже имеющимися
        var data_time = document.querySelector('.data-time');
        var newTr = document.createElement('tr');
        var newTd = document.createElement('td');
        var newTd2 = document.createElement('td');
        data_time.appendChild(newTr);                       //--------- Создание элемента Tr в элементе Tbody
        newTr.appendChild(newTd);                           //--------- Создание элемента Td в элементе Tr
        newTd.innerHTML = Time();                           //--------- Заполнение ячейки времени
        newTr.appendChild(newTd2);                          //--------- Создание второго элемента Td в том же элементе Tr
        newTd2.innerHTML = buffer_text;                     //--------- Заполнение ячейки буфера
        buffer_array.push(buffer_text);                     //--------- Увеличение массива буфера еще одним значением
        var buffer_elem = document.querySelectorAll('.data-time tr td:last-child');
        for (let i = 0; i < buffer_elem.length; i++) {      //--------- Навешивание событий на каждый элемент Td тот что содержит значение буфера
            buffer_elem[i].onclick = function () {
                buffer_obj.set(window.event.target.innerHTML, 'text');
                //console.log(window.event.target.innerHTML);
                return false;
            };//конец обработчика событий
        }//конец цыкла навешивания обработчика событий
    }
}, 1000);