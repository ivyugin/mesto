import {initialCards} from './scripts/places-arr.js';
import Card from './scripts/Card.js';
import PopupWithForm from './scripts/PopupWithForm.js';
import FormValidator from './scripts/FormValidator.js';
import Section from './scripts/Section.js';
import UserInfo from './scripts/UserInfo.js';
import './styles/index.css';

const profile = document.querySelector('.profile');
const placesSelector = '.places';

//ADD START PAK IMAGE
const imgList = new Section ({
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item.name, item.link, '#placeTemplate');
      const cardElement = card.createImgCard();
      imgList.addItem(cardElement);
    }
  },
  placesSelector
);

imgList.rendererItems();

//EDIT PROFILE
const userInfo = new UserInfo ('.profile__name', '.profile__job');
console.log(userInfo);

const editPopup = new PopupWithForm({
  popupElements: {
    popupClass: 'popup_edit',
    popupSelector: '.popup_edit', 
    closeBtnSelector: '.popup__close-btn'
  },
  submit: (title, subtitle) => {
    const userInfo = new UserInfo ('.profile__name', '.profile__job');
    userInfo.setUserInfo(title, subtitle);
  }});

const editButton = profile.querySelector('.profile__edit-btn');

editButton.addEventListener('click', () => editPopup.open());

//ADD IMAGE
const addPopup = new PopupWithForm({
  popupElements: {
    popupClass: 'popup_add',
    popupSelector: '.popup_add', 
    closeBtnSelector: '.popup__close-btn'
  },
  submit: (title, subtitle) => {
    const placesSelector = '.places';
        
        const imgCard = new Section ({
            items: [{
              name: title,
              link: subtitle
            }],
            renderer: (item) => {
              const card = new Card(item.name, item.link, '#placeTemplate');
              const cardElement = card.createImgCard();
              imgCard.addItem(cardElement);
            }
          },
          placesSelector
        );
        console.log(imgCard);
        imgCard.rendererItems();
  }});
const addButton = profile.querySelector('.profile__add-btn');

addButton.addEventListener('click', () => addPopup.open());

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