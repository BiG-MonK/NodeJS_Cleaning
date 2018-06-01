
var gui = new require('nw.gui');
var buffer_text = '';
var buffer_array = []; 
var buffer_obj = '';
var top_win = 1;

var Time = function() {
    var date = new Date();
    var H = date.getHours() < 10 ? "0" + date.getHours() : date.getHours(),
        M = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(),
        S = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    return H + ' : ' + M + ' : ' + S;
};

var Top_window = function(){                                //--------- Функция переключателя окна поверх всех окон
    var win = gui.Window.get();
    if (top_win === 0){
        win.hide();
        //win.setAlwaysOnTop(false);
        top_win++;
    } else {
        win.show();
        win.setAlwaysOnTop(true);
        top_win--;
    }
}//конец функции переключателя окна поверх всех окон
Top_window();

var shortcut = new gui.Shortcut({
    key: "Ctrl+D", 
    active: function() {
        Top_window();
        //console.log(top);
    },
    failed: function(msg) {
        console.log('Проблемма!!' + msg);
    }
});
gui.App.registerGlobalHotKey(shortcut);

var id = setInterval(function () {
    buffer_obj = gui.Clipboard.get();
    buffer_text = buffer_obj.get();
    if (!buffer_array.some(elem => elem === buffer_text)) {  //--------- Сравнение вновь поступившего элемента в массив с уже имеющимися
        var data_time = document.querySelector('.data-time');
        var newTr = document.createElement('tr');
        var newTd = document.createElement('td');
        var newTd2 = document.createElement('td');
        data_time.appendChild(newTr);                       //--------- Создание элемента Tr в элементе Tbody
        newTr.appendChild(newTd);                           //--------- Создание элемента Td в элементе Tr
        newTd.textContent = Time();                           //--------- Заполнение ячейки времени
        newTr.appendChild(newTd2);                          //--------- Создание второго элемента Td в том же элементе Tr
        newTd2.textContent = buffer_text;                     //--------- Заполнение ячейки буфера
        buffer_array.push(buffer_text);                     //--------- Увеличение массива буфера еще одним значением
        var buffer_elem = document.querySelectorAll('.data-time tr td:last-child');
        for (let i = 0; i < buffer_elem.length; i++) {      //--------- Навешивание событий на каждый элемент Td тот что содержит значение буфера
            buffer_elem[i].onclick = function () {
                buffer_obj.set(window.event.target.textContent, 'text');
                //console.log(window.event.target.textContent);
                return false;
            };//конец обработчика событий
        }//конец цыкла навешивания обработчика событий
    }
}, 1000);