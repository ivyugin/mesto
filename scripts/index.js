import {initialCards} from './places-arr.js';
import Card from './Card.js';
import {EditPopup, AddPopup} from './Popup.js';
import FormValidator from './FormValidator.js'

const profile = document.querySelector('.profile');
const places = document.querySelector('.places');

initialCards.forEach( (item) => {
  const card = new Card(item.name, item.link, '#placeTemplate');
  const cardElement = card.createImgCard();
  places.prepend(cardElement);
});

//EDIT PROFILE
const editPopup = new EditPopup({
    popupClass: 'popup_edit',
    popupSelector: '.popup_edit', 
    closeBtnSelector: '.popup__close-btn'
});
const editButton = profile.querySelector('.profile__edit-btn');

editButton.addEventListener('click', () => editPopup.openPopup());

//ADD IMAGE
const addPopup = new AddPopup({
    popupClass: 'popup_add',
    popupSelector: '.popup_add', 
    closeBtnSelector: '.popup__close-btn'
});
const addButton = profile.querySelector('.profile__add-btn');

addButton.addEventListener('click', () => addPopup.openPopup());

//ENABLE VALIDATION
const pref = {
      formSelector: '.popup__container',
      inputSelector: '.popup__container-input',
      submitButtonSelector: '.popup__container-save-btn',
      inactiveButtonClass: 'popup__container-save-btn_inactive',
      inputErrorClass: 'popup__container-input_error',
      formErrorSelector: '.popup__error',
      errorClass: 'popup__error_active'
    };
    
const formArr = document.querySelectorAll(pref.formSelector);

formArr.forEach((form) => {
  const formValidator = new FormValidator(pref, form);
  formValidator.enableValidation();
});