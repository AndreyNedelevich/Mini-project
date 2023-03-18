const error =document.querySelector('#error')


export const displayError = function (message) {
    let messageError = `<div class="infoError"> 
${message} </div>`
    error.insertAdjacentHTML('afterbegin', messageError);
};



export const getUsersData = async function (url) {
    try {
        const responce = await fetch(url)
        // console.log(responce);
        if (!responce.ok) throw new Error('Проблема с получением данных');
        // Здесь без выбрасвания ошибки не удаеться перевыбросить ее дальше и отобразить на других страницах сайта.
        const data = await responce.json();
        console.log(data);
        return data;
    } catch (e) {
        console.error(`${e}`);
        displayError(`Что  то пошло не так ${e.message}`);
        throw e;
    //     Перевыбрасываю что бы далее отображать ошибку на других странцах.
    }
};













