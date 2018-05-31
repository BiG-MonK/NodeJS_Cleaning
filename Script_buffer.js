
var gui = new require('nw.gui');
var time, data_time, buffer_elem, buffer_text = '', myArray = [], cLipboard = '', per = 1;
//--------- Сравнение вновь поступившего элемента в массив с уже имеющимися
Array.prototype.in_array = function (p_val) {
    for (var i = 0, l = this.length; i < l; i++) {
        if (this[i] == p_val) return true;
    }
    return false;
};

function times() {
    var date = new Date();
    var H = date.getHours() < 10 ? "0" + date.getHours() : date.getHours(),
        M = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(),
        S = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    return H + ' : ' + M + ' : ' + S;
};

var id = setInterval(function () {
    cLipboard = gui.Clipboard.get();
    buffer_text = cLipboard.get();
    if (!myArray.in_array(buffer_text)) {
        // if (buffer_text === '') {
        time = times();
        data_time = document.querySelector('.data-time');
        var newTr = document.createElement('tr');
        var newTd = document.createElement('td');
        var newTd2 = document.createElement('td');
        data_time.appendChild(newTr);
        newTr.appendChild(newTd);
        newTd.innerHTML = time;
        newTr.appendChild(newTd2);
        newTd2.innerHTML = buffer_text;
        myArray.push(buffer_text);
        buffer_elem = document.querySelectorAll('.data-time tr td:last-child');
        for (var i = 0; i < buffer_elem.length; i++) {
            buffer_elem[i].onclick = function () {
                cLipboard.set(window.event.target.innerHTML, 'text');
                //console.log(window.event.target.innerHTML);
                return false;
            };
        }
        // }
    }
}, 1000);