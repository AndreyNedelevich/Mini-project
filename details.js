import {getUsersData} from '/fetch.js'

let currentUserId=new URL(location.href).searchParams.get('id')

const user = await getUsersData(`users/${currentUserId}`)
const posts = await getUsersData(`users/${currentUserId}/posts`)

const titleUser = document.querySelector('.header_title');
const containerApp = document.querySelector('.app');
const informUser = document.querySelector('.wrapper_inform');
const wrapperPosts = document.querySelector('.wrapper_posts')


//*****************************************************************************
const createData = (start, end) => {
    return new Date(start.getTime()
        + Math.random() * (end.getTime() - start.getTime()))
}

const extraOption = function () {
    posts.forEach(post => {
        post.date = createData(new Date(1988, 0, 1), new Date())
    })
}
//*****************************************************************************************
extraOption(posts)


const showOptions = function (userObj) {
    for (const key in userObj) {
        const block = document.createElement('div');
        const duration = document.createElement('div');
        block.classList.add('blocks');
        duration.classList.add('duration');
        duration.innerHTML = ` ${key}    -     ${userObj[key]}`
        if (key === 'geo') {
            duration.innerHTML = ` ${key}`;
        }
        block.append(duration)
        informUser.append(block)
        if (typeof userObj[key] === "object") {
            showOptions(userObj[key])
        }
    }
}

const displeyDitailUser = function (user) {
    containerApp.style.opacity = 100;
    titleUser.innerHTML = `${user.name}`
    for (const key in user) {
        const block = document.createElement('div');
        const title = document.createElement('div');
        const duration = document.createElement('div');
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
            showOptions(user[key])
        }
    }
    const btn = document.createElement('button');
    btn.classList.add('button', 'title')
    btn.innerText = `Open/Closed Posts of ${user.name.split(' ')[0]}`
    informUser.append(btn)
}

displeyDitailUser(user)
const buttonPosts = document.querySelector('.button')


let state=false;
buttonPosts.addEventListener('click', function () {
    wrapperPosts.classList.toggle("hidden")
    if (!state) {
        wrapperPosts.classList.remove("hidden")
        state=true;
        const month = new Date(posts.date).toLocaleString("ru-Ru", {month: "long"});
        const year = new Date(posts.date).getFullYear();
        const day = new Date(posts.date).toLocaleString("ru-Ru", {day: "2-digit"});
        console.log(month, year, day)
        for (const post of posts) {
let htmlPost =
`<div class="post">
    <div class="container">
       <h2>${post.id}</h2>
       <div class="date_wrapper">
          <div class="date">${month}</div>
          <div class="date">${year}</div>
          <div class="date">${day}</div>
       </div>
    </div>
     <div class="post_title">${post.title}</div>
     <button class="btn">Open</button>
</div>`
wrapperPosts.insertAdjacentHTML('beforeend', htmlPost)
        }
    }
})








