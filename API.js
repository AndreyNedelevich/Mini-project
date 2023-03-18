

export const displayError = function (message) {
    const error = `<div class="infoError"> 
${message} </div>`
    document.body.insertAdjacentHTML('afterbegin', error);
};



export const getUsersData = async function (url) {
    try {
        const responce = await fetch(url)
        // console.log(responce);
        if (!responce.ok) throw new Error('Проблема с получением данных');
        const data = await responce.json();
        // console.log(data);
        return data;
    } catch (e) {
        console.error(`${e}`);
        displayError(`Что  то пошло не так ${e.message}`);
        throw e;
    }
};













