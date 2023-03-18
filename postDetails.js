import {getUsersData} from '/API.js'

let currentAccountJSON = JSON.parse(localStorage.getItem('currentAccount'));
let dataLocalStorageIslogin = JSON.parse(localStorage.getItem('login'));
console.log(dataLocalStorageIslogin)
console.log(currentAccountJSON)







const nameUser = document.querySelector('.post_title');
const comments=document.getElementsByClassName('comments')[0]
const text=document.querySelector('.text');
const wrapperComments=document.querySelector('.wrapper');
const titlePost=document.querySelector('.title_post');
let a=document.querySelector('.icon_arrow');
// Передаю конкретный href в ** а ** для возврата с правильным ID. для того что бы из адресной строки вытащить
// корректный id User  и при переходе сделать
if(currentAccountJSON!==null&&currentAccountJSON!==undefined){
    a.href=`details.html?id=${currentAccountJSON.id}`;
}



//************************************************************************************
let currentPostId=new URL(location.href).searchParams.get('postId');
console.log(currentPostId);
const post = await getUsersData(`https://jsonplaceholder.typicode.com/posts/${currentPostId}`)
const coments = await getUsersData(`https://jsonplaceholder.typicode.com/comments?postId=${currentPostId}`)
// console.log(post,coments);
// Можно смоделироать ошибку не загрузки данные Ошибку обработал
// перевыбрасил в API.Отключить интернет или(const post = await getUsersData(`https://jsonplaceholder.typicode.com/1posts/${currentPostId}`))


//*****************************************************************************************************


const loadDataAboutPost=function (){
    wrapperComments.style.opacity = 100;
    nameUser.innerHTML = `${currentAccountJSON.name}`
    titlePost.innerHTML=`NAME POST: ${ post.title}`
    text.innerHTML=`<div>${post.body}</div>`
    for (const coment of coments) {
        let htmlComent=`
    <div class="container_comments">
    <h3 class="title_comment">title:  ${coment.name}</h3>
    <div class="email_comment" > Email:  ${coment.email}</div>
    <div class="duration_comment">${coment.body}</div>
    </div>`
        comments.insertAdjacentHTML('beforeend', htmlComent)
    }
}

// Логика при обновлении странцы проверка залогинени ли USER. Если нет получаем сообщение
if(dataLocalStorageIslogin){
loadDataAboutPost()
}else{
    wrapperComments.classList.add('hidden');
    nameUser.style.color='orangered'
    nameUser.innerText = 'Login to your profile'
}







