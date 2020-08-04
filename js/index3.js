'use strict';

const dataBase = []

const modalAdd = document.querySelector('.modal__add');
const addAd = document.querySelector('.add__ad');
const modalBtnSubmit = document.querySelector('.modal__btn-submit');
const modalSubmit = document.querySelector('.modal__submit');
const catalog = document.querySelector('.catalog');
const modalItem = document.querySelector('.modal__item')
const modalBtnWarning = document.querySelector('.modal__btn-warning')

const elementsModalSubmit = [...modalSubmit.elements]
    .filter(elem=> elem.tagName !== 'BUTTON');

console.log(elementsModalSubmit)


const closeModal = function (event){
    const target = event.target

    if(target.closest('.modal__close') ||
        target === this){
        console.log(modalItem)
        this.classList.add('hide')
        if(this === modalAdd){
            modalSubmit.reset()
        }
    }
};

const closeModalEsc = event =>{
    if(event.code === 'Escape'){
        modalAdd.classList.add('hide')
        modalItem.classList.add('hide')
        modalSubmit.reset()
        document.removeEventListener('keydown',closeModalEsc )
    }
}
modalSubmit.addEventListener('input', ()=>{
    const validForm = elementsModalSubmit.every(elem => elem.value)
    modalBtnSubmit.disabled = !validForm;
    modalBtnWarning.style.display = validForm ? 'none' : '';
})
modalSubmit.addEventListener('submit', event =>{
    event.preventDefault();
    const itemObject = {};
    for (const elem of elementsModalSubmit){
        itemObject[elem.name] = elem.value
    }
    dataBase.push(itemObject)
    modalSubmit.reset()
    console.log(dataBase)
})


addAd.addEventListener('click', () =>{
    modalAdd.classList.remove('hide');
    modalBtnSubmit.disabled = true;
    document.addEventListener('keydown',closeModalEsc )
});

//Делигирование

modalAdd.addEventListener('click', closeModal)
modalItem.addEventListener('click', closeModal)

catalog.addEventListener('click', event =>{
    const target = event.target

    if(target.closest('.card')){
        modalItem.classList.remove('hide')
        document.addEventListener('keydown',closeModalEsc )
    }
})

