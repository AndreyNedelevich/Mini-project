// В index.html
// 1 отримати масив об'єктів з endpoint`а https://jsonplaceholder.typicode.com/users
// 2 Вивести id,name всіх user в index.html. Окремий блок для кожного user.
// 3 Додати кожному блоку кнопку/посилання , при кліку на яку відбувається перехід  на сторінку details.html, котра має детальну інфорацію про об'єкт на який клікнули
// На странице details.html:
// 4 Вивести всю, без виключення, інформацію про об'єкт user на який клікнули
// 5 Додати кнопку "post of current user", при кліку на яку, з'являються title всіх постів поточного юзера
// (для получения постов используйте эндпоинт https://jsonplaceholder.typicode.com/users/USER_ID/posts)
//     6 Каждому посту додати кнопку/посилання, при кліку на яку відбувається перехід на сторінку post-details.html, котра має детальну інфу про поточний пост.
//     На странице post-details.html:
// 7 Вивести всю, без виключення, інформацію про об'єкт post на який клікнули .


// Стилизація проєкта -
// index.html - всі блоки з user - по 2 в рядок. кнопки/аосилвння розташувати під інформацією про user.
//     details.html - блок з інфою про user зверху сторінки. Кнопка нижчє, на 90% ширини сторінки, по центру.
//     блоки з короткою іфною про post - в ряд по 5 .
//     post-details.html - блок з інфою про пост зверху. Коментарі - по 4 в ряд.
//     Всі елементи котрі характеризують users, posts, comments візуалізувати, так, щоб було видно що це блоки (дати фон. марджини і тд)



import {getUsersData} from '/fetch.js'

const users = await getUsersData('users')

const informUser = document.querySelector('.app_wrapper');
const labelWelcome = document.querySelector('.welcome');
const containerApp = document.querySelector('.app');
const form = document.forms.form;


const displayUser = function (account){
    informUser.innerHTML = '';
    const userInfo=`<div class="name">${account.name}</div>
        <button class="button"><a class="a" href="userDetails.html?id=${account.id}"> Информация о пользователе</a></button> `
    informUser.insertAdjacentHTML('afterbegin', userInfo)
    labelWelcome.textContent = `Рады что вы снова с нами, ${
        account.name.split(' ')[0]
    }!`;
}




 let currentAccount;

if (!!localStorage.getItem('currentAccount')) {
    const current = JSON.parse(localStorage.getItem('currentAccount'))
    console.log(current);
    displayUser(current);
    containerApp.style.opacity = 100;
}


const loadUserData = function (e) {
    e.preventDefault();
    currentAccount = users.find(
        account => account.nickName
            === this.email.value
    );
    if (currentAccount?.password === this.password.value) {
        // localStorage.setItem('login', 'true')
        localStorage.setItem('currentAccount', JSON.stringify(currentAccount));
        containerApp.style.opacity = 100;
        this.email.value = '';
        this.password.value = '';
        displayUser(currentAccount)
        console.log(currentAccount);
    }
}

// console.log(location.href);
// let url = new URL(location.href)
// console.log(url.searchParams)
// let id = url.searchParams.get('id');
// console.log(id); //2

export const cart = [];
console.log(cart);


form.addEventListener('submit', loadUserData);









// Sincere@april.biz
// lg442














