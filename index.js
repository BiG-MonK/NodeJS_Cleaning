var tab__controls;
var tab__content;

window.onload = function () {
    tab__content = document.getElementsByClassName('tab__content-item');
    tab__controls = document.getElementsByClassName('tab__controls-item');
    console.log(tab__content);
    console.log(tab__controls);
    hideTabsContent(1);
}

function hideTabsContent(a) {
    for (var i = a; i < tab__content.length; i++) {
        tab__content[i].classList.remove('show');
        tab__content[i].classList.add('hide');
        tab__controls[i].classList.remove('whiteborder');
    }
}

document.getElementsByClassName('tabs').onclick = function (event) {
    var target = event.target;
    if (target.className == 'tab__controls-item') {
        for (var i = 0; i < tab__controls.length; i++) {
            if (target == tab__controls[i]) {
                showTabsContent(i);
                break;
            }
        }
    }
}

function showTabsContent(b) {
    if (tab__content[b].classList.contains('hide')) {
        hideTabsContent(0);
        tab__controls[b].classList.add('whiteborder');
        tab__content[b].classList.remove('hide');
        tab__content[b].classList.add('show');
    }
}