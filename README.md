Тестовое задание для GuruService. 
1. Имеется JSON файл numbers.json с массивами данных, где:
 
"alias" - название месяца,
"date_from" - дата начала месяца,
"date_to" - дата конца месяца,
"number_list" - список номеров для данного месяца,
"cdate" - дата, соответствующая номеру из number_list,
"is_visible" - статус месяца.
 
Необходимо:
- создать таблицу с двумя колонками, в одной из которых будут отображаться номера из number_list для выбранного месяца, а в соседней колонке для всех значений должна отображаться соответствующая им дата из cdate в формате ДД.ММ.ГГГГ;
- над таблицей разместить строку поиска, ввод номера в которую отобразит найденный номер в таблице, скрыв все остальные;
- переключение месяцев выполнить в виде табов, где должны отображаться только месяцы с соответствующим значением в строке is_visible. Название месяца должно быть с большой буквы.

Задание выполнено в файле table_task.js
Т.к. чтение json производится из файла, необходимо выключить cors в браузере.
Т.к. изначальный json-файл, прикрепленный к заданию, был не валидный, помимо редактирования его с помощью регулярного выражения, были добавлены проверки для номеров: 
на совпадение месяца, на вхождение номера в месяц, на совпадение имени объекта и номера внутри этого объекта. 
js-код сопровожден комментариями.

2. Необходимо написать функцию, которая бы выводила в консоль время часового пояса UTC. Если время больше 12:00, но меньше 18:00, то вывести в консоль дополнительную информацию об этом.

Задание выполнено в файле time_task.js
Из-за общей формулировки задания было написано два варианта функций: для часового пояса UTС(getUtcTime) и для локального часового пояса (getLocalTime). 
В качестве "дополнительной информации" выводится соответствие условию ("Сейчас больше 12 часов и меньше 18 часов...").


