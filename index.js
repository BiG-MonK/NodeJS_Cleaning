var tab__buffer;
var tab__clear;

window.onload = function () {
    // tab__content = document.getElementsByClassName('tab__content-item');
    // tab__controls = document.getElementsByClassName('tab__controls-item');
    // console.log(tab__content);
    // console.log(tab__controls);
    tab__buffer = document.querySelector('.buffer');
    tab__clear = document.querySelector('.clear');
    tab__clear.onclick = function () {
        tab__buffer.classList.remove('show');
        tab__buffer.classList.add('hide');
        tab__clear.classList.add('show');
    };
    tab__buffer.onclick = function () {
        tab__clear.classList.remove('show');
        tab__clear.classList.add('hide');
        tab__buffer.classList.add('show');
    };

}

// function hideTabsContent(a) {
//     for (var i = a; i < tab__content.length; i++) {
//         tab__content[i].classList.remove('show');
//         tab__content[i].classList.add('hide');
//         tab__controls[i].classList.remove('whiteborder');
//     }
// }
// function showTabsContent(b) {
//     if (tab__content[b].classList.contains('hide')) {
//         hideTabsContent(0);
//         tab__controls[b].classList.add('whiteborder');
//         tab__content[b].classList.remove('hide');
//         tab__content[b].classList.add('show');
//     }
// }