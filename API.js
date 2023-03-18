let error =document.querySelector('#error');
let blockLoader=document.querySelector('.block_loader')

 let isloader=false;

export const displayError = function (message) {
    let messageError = `<div class="infoError"> 
${message} </div>`
    error.insertAdjacentHTML('afterbegin', messageError);
};

export const setIsLoading=(boolean)=>{
   if(boolean){
       isloader=boolean;
       let loader = `<div class='loader'></div>`
       blockLoader.insertAdjacentHTML('afterbegin', loader);
   }
    else if(!boolean) {
        isloader=boolean;
       blockLoader.innerHTML='';
   }
}


export const getUsersData = async function (url) {
    try {
        setIsLoading(true);
        const responce = await fetch(url)
        // console.log(responce);
        if (!responce.ok) throw new Error('Проблема с получением данных');
        // Здесь без выбрасвания ошибки не удаеться перевыбросить ее дальше и отобразить на других страницах сайта.
        const data = await responce.json();
        return data;
    } catch (e) {
        console.error(`${e}`);
        displayError(`Что  то пошло не так ${e.message}`);
        throw e;
    //     Перевыбрасываю что бы далее отображать ошибку на других странцах.
    }finally {
        setIsLoading(false);

    }
};













