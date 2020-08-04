// 'use strict';

const dataBase = JSON.parse(localStorage.getItem('awito')) || []
let counter = dataBase.length
const modalAdd = document.querySelector('.modal__add');
const addAd = document.querySelector('.add__ad');
const modalBtnSubmit = document.querySelector('.modal__btn-submit');
const modalSubmit = document.querySelector('.modal__submit');
const catalog = document.querySelector('.catalog');
const modalItem = document.querySelector('.modal__item')
const modalBtnWarning = document.querySelector('.modal__btn-warning')
const modalFileInput = document.querySelector('.modal__file-input')
const modalFileBtn = document.querySelector('.modal__file-btn')
const modalImageAdd = document.querySelector('.modal__image-add')

const modalImageItem = document.querySelector('modal__image-item'),
    modalHeaderItem = document.querySelector('.modal__header-item'),
    modalStatusItem = document.querySelector('.modal__status-item'),
    modelDescriptionItem = document.querySelector('.model__description-item'),
    modalCostItem = document.querySelector('.modal__cost-item');

const searchInput = document.querySelector('.search__input');
const menuContainer = document.querySelector('.menu__container')



const textFileBtn = modalFileBtn.textContent
const srcModalImg = modalImageAdd.src
const elementsModalSubmit = [...modalSubmit.elements]
    .filter(elem=> elem.tagName !== 'BUTTON');

const infoPhoto = {};

const saveDB = () => localStorage.setItem('awito', JSON.stringify(dataBase))
const checkForm = () => {
    const validForm = elementsModalSubmit.every(elem => elem.value)
    modalBtnSubmit.disabled = !validForm;
    modalBtnWarning.style.display = validForm ? 'none' : '';
}

const closeModal = event => {
    const target = event.target

    if(target.closest('.modal__close') ||
        target.classList.contains('modal') ||
       event.code === 'Escape')
    {
        modalAdd.classList.add('hide')
        modalItem.classList.add('hide')
        document.removeEventListener('keydown', closeModal)
        modalSubmit.reset();
        modalImageAdd.src = srcModalImg
        modalFileBtn.textContent = textFileBtn
        checkForm()
    }

};

const renderCard = (DB = dataBase) => {
    catalog.textContent = '';
    DB.forEach((item, i) =>{
        catalog.insertAdjacentHTML('beforeend',`
           <li class="card" data-id-item="${item.id}">
            <img class="card__image" src="data:image/jpeg;base64,${item.image}" alt="test">
            <div class="card__description">
            <h3 class="card__header">${item.nameItem}</h3>
                <div class="card__price">${item.costItem}</div>
        </div>
        </li>
        `)
    });
};
//поиск
searchInput.addEventListener('input', ()=>{
    const valueSearch = searchInput.value.trim().toLowerCase()

    if(valueSearch.length > 2){
        const result = dataBase.filter(item => item.nameItem.toLowerCase().includes(valueSearch)||
                                                item.description.toLowerCase().includes(valueSearch))
        renderCard(result)
    }
})



modalFileInput.addEventListener('change', event =>{
    const target = event.target;

    const reader = new FileReader()

    const file = target.files[0]
    infoPhoto.filename = file.name;
    infoPhoto.size = file.size;

    reader.readAsBinaryString(file);
    //modal__image-add
    reader.addEventListener('load', event =>{
        if(infoPhoto.size < 200000){
            modalFileBtn.textContent = infoPhoto.filename;
            infoPhoto.base64 = btoa(event.target.result);
            modalImageAdd.src = `data:image/jpeg;base64,${infoPhoto.base64}`
        } else {
            modalFileBtn.textContent = 'превышает лимит'
            modalFileInput.value = '';
            checkForm();
        }

    })

})
modalSubmit.addEventListener('input', checkForm)
modalSubmit.addEventListener('submit', event =>{
    event.preventDefault();
    const itemObject = {};

    for (const elem of elementsModalSubmit){

        itemObject[elem.name] = elem.value

    }
    itemObject.id = counter++
    itemObject.image = infoPhoto.base64
    dataBase.push(itemObject)
    checkForm({target: modalAdd})
    saveDB();
    renderCard();
})


addAd.addEventListener('click', () =>{
    modalAdd.classList.remove('hide');
    modalBtnSubmit.disabled = true;
    document.addEventListener('keydown',closeModal )
});

//Делигирование

modalAdd.addEventListener('click', closeModal)
modalItem.addEventListener('click', closeModal)

catalog.addEventListener('click', event =>{
    const target = event.target
    const card = target.closest('.card')

    if( card){
        //не выводт данные  target.closest('.card')
        // console.log(card.dataset.idItem)
         console.log(dataBase)
        // console.log(dataBase[card.dataset.idItem])
        // console.log(card.dataset)
        //
        const item = dataBase.find((obj) => obj.id === +card.dataset.idItem)
        console.log(item)
        modalImageItem.src = `data:image/jpeg;base64,${item.image}`;
        modalHeaderItem.textContent = item.nameItem
        modalStatusItem.textContent = item.status === 'new' ? 'Новый' : 'Б/У';
        modelDescriptionItem.textContent = item.descriptionItem;
        modalCostItem.textContent = item.costItem

        modalItem.classList.remove('hide')
        document.addEventListener('keydown',closeModal )
    }
})

menuContainer.addEventListener('click', event =>{
    const target = event.target;
    if(target.tagName === 'A'){
        const result = dataBase.filter(item => item.category === target.dataset.category)
        renderCard(result)
    }
})
renderCard()