const fs = require('fs');
var arr_files = [];
var arr_dir = [];
var size_all_files = 0;
var user_list = [];
const user_list_non = [
  '.NET v4.5',
  '.NET v4.5 Classic',
  'All Users',
  'Default',
  'Default User',
  'MSSQL$MICROSOFT##WID',
  'MSSQLSERVER',
  'Public',
  'SQLSERVERAGENT',
  'USR1CV82',
  'usr1cv82.TMI',
  'Все пользователи'
];
var time_now = new Date();
const one_month = 2592000000;
const two_month = 5184000000;
const three_month = 7259200000;
const four_month = 10368000000;
const five_month = 12960000000;
const six_month = 15552000000;
const one_day = 86400000;

var path_clean = [
  // c:/Windows/Temp/
  // {
  //   'dir': '/Downloads',
  //   'size': 0,
  //   'size_of_user': 0,
  //   'count_files': 0,
  //   'count_files_of_user': 0
  // },
  {
    'dir': '/AppData/Local/Temp',
    'size': 0,
    'size_of_user': 0,
    'count_files': 0,
    'count_files_of_user': 0
  },
  {
    'dir': '/AppData/Local/1C/1Cv82',
    'size': 0,
    'size_of_user': 0,
    'count_files': 0,
    'count_files_of_user': 0
  },
  {
    'dir': '/AppData/Local/Microsoft/Windows/WebCache',
    'size': 0,
    'size_of_user': 0,
    'count_files': 0,
    'count_files_of_user': 0
  },
  {
    'dir': '/AppData/Local/Opera Software/Opera Stable/Cache',
    'size': 0,
    'size_of_user': 0,
    'count_files': 0,
    'count_files_of_user': 0
  },
  {
    'dir': '/AppData/Local/Microsoft/Windows/WER/ReportQueue',
    'size': 0,
    'size_of_user': 0,
    'count_files': 0,
    'count_files_of_user': 0
  },
  {
    'dir': '/AppData/Local/Opera Software/Opera Stable/Media Cache',
    'size': 0,
    'size_of_user': 0,
    'count_files': 0,
    'count_files_of_user': 0
  },
  {
    'dir': '/AppData/Local/Microsoft/Windows/INetCache/Content.Outlook',
    'size': 0,
    'size_of_user': 0,
    'count_files': 0,
    'count_files_of_user': 0
  },
  {
    'dir': '/AppData/Roaming/Opera Software/Opera Stable/Local Storage',
    'size': 0,
    'size_of_user': 0,
    'count_files': 0,
    'count_files_of_user': 0
  },
  {
    'dir': '/AppData/Roaming/Opera Software/Opera Stable/Application Cache/Cache',
    'size': 0,
    'size_of_user': 0,
    'count_files': 0,
    'count_files_of_user': 0
  }
];

var time_work = performance.now(); //--- Засекает время выполнения программы
//------------------------------------------------------------------------------------------------------------------------------------------
get_user_list = function (path_dir) { //--- Функция наполнения массива списком пользователей с учетом списка исключений
  user_list = fs.readdirSync(path_dir);
  var count = 0;
  user_list.forEach(function (arr_item) {
    if (fs.statSync(path_dir + '/' + arr_item).isFile()) { //--- Если в списке юзеров попался файл, а не папка профиля, то
      user_list[count] = ''; //--- Удаляем этот элемент массива с общего списка профилей юзеров
    } else {
      if (user_list_non.some(function (x) {
          return (x == arr_item);
        })) { //--- Если совпадает со списком исключения, то
        user_list[count] = ''; //--- Удаляем этот элемент массива с общего списка профилей юзеров
      }
    }
    count++;
  })
  user_list = user_list.filter(function (x) { //--- Удалнггый эл-т оставляет пустое место, удаляем и его из массива юзеров
    return (x != '');
  });
  return user_list;
} //--- Конец функции наполнения массива списком
//------------------------------------------------------------------------------------------------------------------------------------------
list_dir = function (path_dir) { //--- Рекуривная функция просмотра папки на наличие файлов
  var cur_path = '';
  var content_dir = '';
  try {
    fs.statSync(path_dir);
  } catch (err) {
    console.error(path_dir + ' -- File not exists!!');
    return;
  };
  try {
    fs.accessSync(path_dir, fs.constants.R_OK | fs.constants.W_OK); //--- Проверка на права доступа
    content_dir = fs.readdirSync(path_dir); //--- Дает список содержимого папки
    for (let i = 0; i < content_dir.length; i++) { //--- Прогон списка через цикл
      cur_path = path_dir + '/' + content_dir[i]; //--- Относительный путь прогоняемого элемента
      if (fs.statSync(cur_path).isFile()) { //--- Проверка на файл/папка
        arr_files.push(path_dir + '/' + content_dir[i]); //--- Выписываем в отдельный массив файлов полный путь нового файла
        size_all_files += fs.statSync(cur_path).size; //--- Подсчет общего веса файлов всех
      } else {
        arr_dir.push(path_dir + '/' + content_dir[i]); //--- Выписываем в отдельный массив папок полный путь папки
        list_dir(cur_path); //--- Если папка то рекурсивный вызов
      }
    }
  } catch (err) { //--- Если не пройдена проверка на доступ
    if (fs.statSync(path_dir).isFile()) {
      console.error(path_dir + ' -- File no access!!');
    } else {
      console.error(path_dir + ' -- Dir no access!!');
    }
  }
}; //--- Конец рекурсивной функции просмотра папки
var arr_data_files = [];
//------------------------------------------------------------------------------------------------------------------------------------------
get_date_files = function (time_filter, path) { //--- Рекуривная функция-выборка файлов по фильтру даты
  arr_data_files.length = 0;
  arr_files.length = 0;
  list_dir(path);
  arr_files.forEach(function (file) {
    var date_file = fs.statSync(file).atime;
    if (time_now.getTime() > Number(date_file.getTime()) + Number(time_filter)) {
      arr_data_files.push(file);
    }
  });
  return arr_data_files;
}; //--- Конец рекуривной функции-выборки файлов по фильтру даты
//------------------------------------------------------------------------------------------------------------------------------------------
delete_dir = function () { //--- Функция удаления файлов и папок
  for (let i = 0; i < arr_files.length; i++) { //--- Прогон списка через цикл
    fs.unlinkSync(arr_files[i]); //--- Удаляем поочередно все файлы, пути которых находятся в общем массиве файлов
  };
  do {
    for (let i = 0; i < arr_dir.length; i++) {
      var content_dir = fs.readdirSync(arr_dir[i]);
      if (content_dir == '') { //--- Если контента в папке нет то..
        fs.rmdirSync(arr_dir[i]); //--- Удаляем пустую папку
        arr_dir.splice(i, 1); //--- Вырезаем из массива папок вместе с ключем массива пустую папку
      }
    }
  }
  while (arr_dir.length != 0); //--- Пока не закончится массив папок продолжаем перебирать и удалять пустые папки
} //--- Конец функции удаления файлов и папок
//------------------------------------------------------------------------------------------------------------------------------------------
// list_dir(dir);
// list_dir('c:/users');
// console.log('Всего папок в этой папке: ' + arr_dir.length);
// console.log(arr_dir);
// console.log('Всего файлов в этой папке: ' + arr_files.length);
// console.log('Размер всех файлов равен: ' + (size_all_files / 1024 / 1024).toFixed(4) + ' Mb');
// // delete_dir();
time_work = performance.now() - time_work;
console.log('Время выполнения программы = ', time_work, 'msec');
