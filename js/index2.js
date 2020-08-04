'use strict';
const modalAdd = document.querySelector('.modal__add');
const modalItem = document.querySelector('.modal__item')
const addAd = document.querySelector('.add__ad');
const modalSubmit = document.querySelector('.modal__submit')
const modalBtnSubmit = document.querySelector('.modal__btn-submit')
const card = document.querySelector('.catalog')

addAd.addEventListener('click', ()=>{
    modalAdd.classList.remove('hide')
    modalBtnSubmit.disabled = true
})
modalAdd.addEventListener('click', event=>{
    const target = event.target

    if(target.classList.value === 'modal__close'|| target === modalAdd ){
        modalAdd.classList.add('hide')
        modalSubmit.reset()

    }
})
modalAdd.addEventListener('keyup' ,event =>{
    console.log(event)
    if (event.key === 'Escape'){
        modalAdd.classList.add('hide')
        modalSubmit.reset()
    }})
card.addEventListener('click', event=>{
    const target = event.target

    console.log(target.closest(".card"))
    if(target.closest('.card')){
        modalItem.classList.remove('hide')
    }
})