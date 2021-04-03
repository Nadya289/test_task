//Отключаем асинхронность для запроса на получение JSON
jQuery.ajaxSetup({async:false});

//Мапа с полными названиями месяцов
const months = new Map([
    ['jan', 'January'],
    ['feb', 'Febuary'],
    ['mar', 'March'],
    ['apr', 'April'],
    ['may', 'May'],
    ['jun', 'June'],
    ['jul', 'July'],
    ['aug', 'August'],
    ['sep', 'Septeber'],
    ['oct', 'October'],
    ['nov', 'November'],
    ['dec', 'December' ]
]);
//Текущий год в формате 2 последних цифр
const year = new Date().getFullYear().toString().substr(-2);

/*получаем и парсим JSON. Т.к. он был изначально невалидный, подменяем невалидные куски по паттерну.
 Из полученного JSON достаем поле с массивом*/
let numbers = JSON.parse(
                $.getJSON('./numbers.json')
                .responseText
                .replaceAll(/,\s*}/gi,'\}'))
                .numbers;

//Оставляем только активные месяцы
const filteredMonths = numbers.filter(e => e.is_visible);
//проверяем содержимое number_list
filteredMonths.forEach(e => {
    for(let number in e.number_list){
        let objectFromList = e.number_list[number];
        /*Если имя объекта из number_list не совпадает с внутренним полем number объекта,
         то удаляем объект из number_list и переходим к следующему объекту */
        if(number !== objectFromList.number){
            delete e.number_list[number];
            continue;
        }
        /*Если alias не совпадает с number_alias объекта из number_list,
         то удаляем объект из number_list и переходим к следующему объекту */
        if(objectFromList.number_alias !== e.alias){
            delete objectFromList;
            continue;
        }
        /*Если объект из number_list за пределами месяца,
         то удаляем объект из number_list */
        const startDate = new Date(e.date_from);
        const endDate = new Date(e.date_to);
        const numberDate = new Date(objectFromList.cdate);
        if(!(numberDate >= startDate && numberDate <= endDate)){
            objectFromList;
        }
    }
});

const root = document.getElementById('root');
const title = document.createElement('ul');

//создаем ссылки с полным названием месяца и годом
let monthTitles = filteredMonths.map((e)=> 
    `<li><a class =\'${e.alias}\' href=\'#\'> ${months.get(e.alias)}<sup>${year}</sup></a></li>`
).join('');
//добавляем их на страницу
title.innerHTML = monthTitles;
root.append(title);

//добавляем строку поиска на страницу
const input = document.createElement('input');
input.classList.add('search');
//добавляем eventListner на нажатие клавиши
input.setAttribute('onkeyup', 'search()');
root.append(input);


const table = document.createElement('table');

//создаем таблицу с номерами и датами
const tableContent = filteredMonths.map((e) => {
    let res = '';
    for(let number in e.number_list){
        const numberDate = new Date(e.number_list[number].cdate).toLocaleDateString();
        //т.к. выше мы проверили совпадение имени объекта и его поля number, можем добавлять имя объекта
        res += `<tr class = \'${e.alias}\ disabled'><td> ${number}</td> <td> ${numberDate}</td></tr>`;
    }
        return res;
}).join('');
//добавляем таблицу на страницу
table.innerHTML = tableContent;
root.append(table);


//по нажатию на ссылку с названием месяца на страницу появляются соответствующие месяцу номера
[].forEach.call(document.getElementsByTagName('a'), function(el){
el.addEventListener('click', function(e){
    const rows = document.querySelectorAll('tr');
    rows.forEach(row => {
        if(row.classList.contains(e.currentTarget.className) && row.classList.contains('disabled')){
            row.classList.remove('disabled');
        }else if(!row.classList.contains(e.currentTarget.className) && !row.classList.contains('disabled')){
            row.classList.add('disabled');
        }
    });
    console.log(e);
});
});

//осуществялем поиск по вхождению подстроки
function search() {
    let input = document.getElementsByClassName('search'),
        inputText = input[0].value.toString();
        rows = document.getElementsByTagName('tr');
        for(let element of rows){
            let rowContent = element.getElementsByTagName('td')[0];
            let txtContent = rowContent.textContent || rowContent.innerText;
            if(txtContent.toString().indexOf(inputText) > -1){
                element.style.display = "";
            }else{
                element.style.display= "none";
            }
        }  
}









