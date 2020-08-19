import {initialCards} from './scripts/places-arr.js';
import Card from './scripts/Card.js';
import PopupWithForm from './scripts/PopupWithForm.js';
import FormValidator from './scripts/FormValidator.js';
import Section from './scripts/Section.js';
import UserInfo from './scripts/UserInfo.js';
import PopupWithImage from './scripts/PopupWithImage.js';
import './styles/index.css';

const profile = document.querySelector('.profile');
const placesSelector = '.places';

//IMAGE
const imgPopup = new PopupWithImage({
  popupClass: 'img-popup',
  popupSelector: '.img-popup', 
  closeBtnSelector: '.img-popup__close-btn'
});

const imgCard = new Section ({
    items: initialCards,
    renderer: (item) => {
      const card = new Card({
        name: item.name, 
        link: item.link, 
        openPopup: (link, title) => {
          imgPopup._img.src = link;
          imgPopup._img.alt = title;
          imgPopup._title.textContent = title;
          imgPopup.open();
        },
        template: '#placeTemplate'});
      const cardElement = card.createImgCard();
      imgCard.addItem(cardElement);
    }
  },
  placesSelector
);
imgCard.rendererItems();

//EDIT PROFILE
const userInfo = new UserInfo ('.profile__name', '.profile__job');

const editPopup = new PopupWithForm({
  popupElements: {
    popupClass: 'popup_edit',
    popupSelector: '.popup_edit', 
    closeBtnSelector: '.popup__close-btn'
  },
  openPopup: () => {
    editPopup.setInputValues(userInfo.getUserInfo());

    editPopup._saveBtn.classList.remove('popup__container-save-btn_inactive');
    editPopup._saveBtn.disabled = false;
  },
  submit: ({title, subtitle}) => {
    userInfo.setUserInfo(title, subtitle);
  }});

const editButton = profile.querySelector('.profile__edit-btn');

editButton.addEventListener('click', () => editPopup.open({userInfo: userInfo.getUserInfo()}));

//ADD IMAGE
const addPopup = new PopupWithForm({
  popupElements: {
    popupClass: 'popup_add',
    popupSelector: '.popup_add', 
    closeBtnSelector: '.popup__close-btn'
  },
  openPopup: () => {
    addPopup.setInputValues({title: '', subtitle: ''});
    addPopup._saveBtn.classList.add('popup__container-save-btn_inactive');
    addPopup._saveBtn.disabled = true;
  },
  submit: ({title, subtitle}) => {
    imgCard.items = [{
        name: title,
        link: subtitle
      }];
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