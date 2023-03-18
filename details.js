import {getUsersData} from '/API.js'

let currentUserId = new URL(location.href).searchParams.get('id')
let dataLocalStorageIslogin = JSON.parse(localStorage.getItem('login'));


// Переменная залогинен ли пользователь.
let user = await getUsersData(`https://jsonplaceholder.typicode.com/users/${currentUserId}`)
let posts = await getUsersData(`https://jsonplaceholder.typicode.com/users/${currentUserId}/posts`)
console.log(posts);
// Можно смоделироать ошибку не загрузки данные Ошибку обработал
// перевыбрасил в API.Отключить интернет или (const posts = await getUsersData(`https://jsonplaceholder.typicode.com/1users/${currentUserId}/posts`))


let titleUser = document.querySelector('.post_title');
let containerApp = document.querySelector('.app');
let informUser = document.querySelector('.wrapper_inform');
let wrapperPosts = document.querySelector('.wrapper_posts');
let containerPostsAndSellect=document.querySelector('.container_posts')
let search=document.querySelector(".search");
let select=document.querySelector('.select');


// *******************************   ФУНКЦИИ      ********************************************************

//***************Добавление дополнительных параметров внутри массива ПОСТОВ**********************
const createData = (start, end) => {
    return new Date(start.getTime()
        + Math.random() * (end.getTime() - start.getTime()))
}

const additionalOption = function (posts) {
    posts.forEach(post => {
        post.date = createData(new Date(1988, 0, 1), new Date())
    })
}


additionalOption(posts)



// ****************************Отображение данных о USER*****************************************************

// Рекурсивная функция для отображения данных внутри вложенных объектов (вызываеться внутри функции displeyDitailUser)
const additionalParams = function (userObj) {
    for (const key in userObj) {
        let block = document.createElement('div');
        let duration = document.createElement('div');
        block.classList.add('blocks');
        duration.classList.add('duration');
        duration.innerHTML = ` ${key} -  ${userObj[key]}`
        if (key === 'geo') {
            duration.innerHTML = ` ${key}`;
        }
        block.append(duration)
        informUser.append(block)
        if (typeof userObj[key] === "object") {
            additionalParams(userObj[key])
        }
    }
}

const displeyDitailUser = function (user) {
    containerApp.style.opacity = 100;
    titleUser.innerHTML = `${user.name}`
    for (const key in user) {
        let block = document.createElement('div');
        let title = document.createElement('div');
        let duration = document.createElement('div');
        block.classList.add('block');
        title.classList.add('title');
        duration.classList.add('duration');
        title.innerHTML = `${key}`
        duration.innerHTML = `${user[key]}`
        if (key === 'address' || key === 'company') {
            duration.innerHTML = ``
        }
        block.append(title, duration)
        informUser.append(block)
        if (typeof user[key] === "object") {
            additionalParams(user[key])
        }
    }
    let btn = document.createElement('button');
    btn.classList.add('button', 'title')
    btn.innerText = `Open/Closed Posts of ${user.name.split(' ')[0]}`
    informUser.append(btn)
}
//************************************************************************************************************

// Логика при переходе на странцу и ее  обновление  проверка залогинени ли USER. Если нет получаем сообщение.
// Если да при переходе и обновление делаем загрузку и отображения данных.
if(dataLocalStorageIslogin){
    displeyDitailUser(user)
}else{
    titleUser.innerHTML = 'Login to your profile'
    titleUser.style.color='orangered'
}


//Функция отображение постов
const showPosts=function (posts){
    wrapperPosts.innerHTML='';
    posts.forEach((post, index) => {
        const month = new Date(post.date).toLocaleString("eng", {month: "long"});
        const year = new Date(post.date).getFullYear();
        const day = new Date(post.date).toLocaleString("ru-Ru", {day: "2-digit"});
        let htmlPost =
            `<div class="post">
    <div class="container">
       <h2>${index+1}</h2>
       <div class="date_wrapper">
          <div class="date">${day}</div>
          <div class="date">${month}</div>
          <div class="date">${year}</div>
       </div>
    </div>
     <div class="main_title_post ">${post.title}</div>
     <a  href='post-details.html?postId=${post.id}' class="btn">Open</a>
</div>`
        wrapperPosts.insertAdjacentHTML('beforeend', htmlPost)
    })
}




//  *********************************Слушатели событий*************************************

const buttonPosts = document.querySelector('.button')

// Состояние для повторного нажатие кнопки отображение и скрытие списка постов.
let state = false;

// Отобразить скрыть посты.
dataLocalStorageIslogin&&buttonPosts.addEventListener('click', function () {
    containerPostsAndSellect.classList.toggle("hidden")
    if (!state) {
        containerPostsAndSellect.classList.remove("hidden")
        state = true;
        showPosts(posts)   //Функция отображение постов
    }
})

//********************************************************************************************
// Слушатель сортировке по дате.
select.addEventListener('change',function (e){
    if(select.value==='new'){
        posts.sort((a,b)=>b.date-a.date)
        showPosts(posts)
    }
    else if(select.value==='old'){
        posts.sort((a,b)=>a.date-b.date)
        showPosts(posts)
    }
})

// Слущатель поиска поста по title.

search.addEventListener('input',function (e){
const updatePosts=posts.filter(post=>post.title.toLowerCase().includes(search.value.toLowerCase()))
    showPosts(updatePosts)
})





