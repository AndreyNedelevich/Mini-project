
import {getUsersData,displayError} from '/API.js'



const informUser = document.querySelector('.app_wrapper');
const labelWelcome = document.querySelector('.welcome');
const containerApp = document.querySelector('.app');
const form = document.forms.form;

let currentAccount;
// В переменной храним текущего пользователя.



//********Блок с функция для добавление дополнительных параметров в каждого USER (login,Password)*********************
const createNicknames = function (user) {
    user.nickName = user.email
};

const createPassword = function (user) {
    const lastNumber = user.phone.slice(-3)
    const firstLatter = user.name.toLowerCase()
        .split(' ')
        .map(word => word[0])
        .join('');
    user.password
        = firstLatter + lastNumber
}
const extraOption=function () {
    users.forEach(user => {
        createNicknames(user)
        createPassword(user)
    })
}


//**********************************************************************************************************
const users = await getUsersData(`https://jsonplaceholder.typicode.com/users`)
console.log(users);
// Можно смоделировать ошибку не загрузки  Ошибки обработал и
// перевыбрасил  в API.Можно отключить интернет или (const post = await getUsersData(const users = await getUsersData(`https://jsonplaceholder.typicode.com/1users`))


//***************************                ФУНКЦИИ       ************************************
extraOption()//запуск функции для добавления доп параметров в каждого USER после получение данных.

const displayUser = function (account){
    informUser.innerHTML = '';
    const userInfo=`<div class="name">${account.name}</div>
        <button class="button"><a class="a" href="details.html?id=${account.id}"> User Information</a></button> `
    informUser.insertAdjacentHTML('afterbegin', userInfo)
    labelWelcome.textContent = `Рады что вы снова с нами, ${
        account.name.split(' ')[0]
    }!`;
}



// Проверка из locale Storage что бы оставться залогиненным.
if (!!localStorage.getItem('currentAccount')) {
    const current = JSON.parse(localStorage.getItem('currentAccount'))
    displayUser(current);
    containerApp.style.opacity = 100;
}

// Функция входа в Акаунт.
const loadUserData = function () {
    const passwordValue=form.password.value.trim();
    const loginValue=form.email.value.trim();
    currentAccount = users.find(
        account => account.nickName
            === loginValue
    );
    if (currentAccount?.password === passwordValue) {
        localStorage.setItem('login', 'true')
        localStorage.setItem('currentAccount', JSON.stringify(currentAccount));
        let isLogin=true;
        form.email.classList.remove('valid');
        form.password.classList.remove('valid')
        containerApp.style.opacity = 100;
        displayUser(currentAccount)
    }else {
        alert('Incorrect Login or Password')
        form.email.classList.add('valid');
        form.password.classList.add('valid')
    }
    form.email.value = '';
    form.password.value = '';
}

// Функция выхода из Акаунта.
const logOutUser=function (){
    localStorage.removeItem('currentAccount');
    localStorage.setItem('login', 'false')
    currentAccount=''
    containerApp.style.opacity = 0;
}

//*****************                   СЛУШАТЕЛИ СОБЫТИЙ     **********************************

// Вход в профиль.
form.signIn.addEventListener('click',function (e){
    e.preventDefault();
    if(!JSON.parse(localStorage.getItem('login'))){
        loadUserData();
    }
});

// Выход из профиля
form.logout.addEventListener('click',logOutUser);


//0
// Sincere@april.biz
// lg442

//1
//Shanna@melissa.tv
//eh125

//2
// Nathan@yesenia.net
// cb447

//3
//Julianne.OConner@kory.org
//pl156

//4
//Lucio_Hettinger@annie.ca
//cd289

//5
//Karley_Dach@jasper.info
//mds430

//6
//Telly.Hoeger@billy.biz
//kw132

//7
//Sherwood@rosamond.me
//nrv140

//8
//Chaim_McDermott@dana.io
//gr206

//9
//Rey.Padberg@karina.biz
//cd804












