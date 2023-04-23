// имя пользователя
let fullName = document.querySelector(".form__inputname"); // переменная для имени пользователя в поле ввода
let userName = document.querySelector(".chat__username"); // переменная для имени пользователя, отображающегося в чате

// аватар пользователя
let link = document.querySelector(".form__inputlink"); // переменная для ссылки на фотографию аватара в поле ввода
let userPic = document.querySelector(".chat__userpic"); // переменная для аватара пользователя

// комментарий пользователя
let comment = document.querySelector(".form__comment"); // переменная для комментария пользователя в поле ввода
let commentInChat = document.querySelector(".chat__showcomment"); // переменная для комментария в чате

let commentShowDate = document.querySelector('.chat__date'); // переменная для области, в которой выводится дата, когда был отправлен комментарий

// кнопка для отправки введенных данных
const button = document.querySelector(".button");

// радиокнопки Да/Нет
const answerYes = document.getElementById('yes');
const answerNo = document.getElementById('no');

// вывести/скрыть имя пользователя
function clickYes(){
if (answerYes.checked) {
fullName.style.display = "block";
} else {
fullName.style.display = "none";
}
};

function clickNo(){
if (answerNo.checked) {
fullName.style.display = "none";
} else {
    fullName.style.display = "block";
}
};

answerYes.addEventListener('change', clickYes);
answerNo.addEventListener('change', clickNo);

// Показать дату
let currentDate = new Date();
console.log(currentDate);

// Функция для фильтрации спама/ цензурирования комментариев
function checkSpam() {
   let comment = document.querySelector(".form__comment").value;
       comment = comment.replace(/viagra/gi, "******").replace(/xxx/gi, '***'); // замена обнаруженных запрещенных слов и символов в комментариях на ***
       commentInChat.textContent = comment; // присваивание переменной commentInChat значения переменной comment
};

// Массив с шаблонными изображениями
let templateImages = [
    'assets/images/userpic1.jpeg',
    'assets/images/userpic2.jpeg',
    'assets/images/userpic3.png',
    'assets/images/userpic4.png',
    'assets/images/userpic5.png',
    'assets/images/userpic6.jpeg',
    'assets/images/userpic7.png',
];

// Перенос данных, введенных пользователем, в чат при нажатии кнопки "Отправить"
button.addEventListener('click',() => {
    let fullNameNew = fullName.value; // новая переменная для введенного пользователем имени
    let arr = fullNameNew.split(' '); 
    let surname = arr[0];
    let firstName = arr[1];
    let middleName = arr[2];
    if (fullName.value ==='') {fullNameNew = 'Username' // Выведение в чате "Username", если пользователь не ввел имя
    } else if (arr.length>=3) { // Приводим введенное имя к единому формату (Имя/Фамилия/Отчество с заглавной буквы, остальные буквы строчные)
      fullNameNew = (surname[0].toUpperCase() + (surname.substring(1)).toLowerCase()) + ' ' + (firstName[0].toUpperCase() + (firstName.substring(1)).toLowerCase()) + ' ' + (middleName[0].toUpperCase() + (middleName.substring(1)).toLowerCase());
    } else if (arr.length === 2){
    fullNameNew = (surname[0].toUpperCase() + (surname.substring(1)).toLowerCase()) + ' ' + (firstName[0].toUpperCase() + (firstName.substring(1)).toLowerCase());
    } else if (arr.length === 1){
        fullNameNew = (surname[0].toUpperCase() + (surname.substring(1)).toLowerCase())
    };
        userName.textContent = fullNameNew;
        if (link.value ==='') { // В случае отсутствия ссылки на картинку, выводится случайная картинка из массива
            let randomImageChoice = Math.floor(Math.random() * templateImages.length);
            userPic.innerHTML = `<img class="chat__userpic"
            src="${templateImages[randomImageChoice]}"
            alt="template userpic">
            `;
         } else {
            userPic.innerHTML = `
            <img class = "chat__userpic"
            src= "${link.value}"
            alt = "userpic"/>
            `;
        };
        commentShowDate.textContent = currentDate.toString().slice(0,21); // переводим дату в формат строки и сокращаем ее длину 
        checkSpam(); // вывод комментария в чате с заменой viagra и xxx на ***
        // Удаляем текст из полей ввода после отправки данных
        document.querySelector('.form__comment').value = ''; 
        document.querySelector('.form__comment').disabled = false;
        document.querySelector('.form__inputname').value = ''; 
        document.querySelector('.form__inputname').disabled = false;
        document.querySelector('.form__inputlink').value = ''; 
        document.querySelector('.form__inputlink').disabled = false;
    });