import Card from './scripts/Card.js';
import PopupWithForm from './scripts/PopupWithForm.js';
import FormValidator from './scripts/FormValidator.js';
import Section from './scripts/Section.js';
import UserInfo from './scripts/UserInfo.js';
import PopupWithImage from './scripts/PopupWithImage.js';
import PopupWithSubmit from './scripts/PopupWithSubmit.js';
import Api from './scripts/Api.js';
import './styles/index.css';

const profile = document.querySelector('.profile');

//API
const api = new Api('https://mesto.nomoreparties.co/v1/cohort-14', '668dca3d-51ec-4823-a727-cc18d24544ec');


// PROFILE
const userInfo = new UserInfo ('.profile__name', '.profile__job');

api.getUserInfo()
.then(userInfoFromServer => {
  userInfo.setUserInfo(userInfoFromServer.name, userInfoFromServer.about, userInfoFromServer._id);
  userInfo.setUserAvatar(userInfoFromServer.avatar, '.profile__avatar-img');
})
.catch((err) => {
  console.log(err);
});

const avatarPopup = new PopupWithForm({
  popupElements: {
    popupClass: 'popup_avatar',
    popupSelector: '.popup_avatar', 
    closeBtnSelector: '.popup__close-btn'
  },
  openPopup: () => {
    avatarPopup._popup.querySelector('.popup__container-input_type_subtitle').value = '';
    avatarPopup._saveBtn.classList.add('popup__container-save-btn_inactive');
    avatarPopup._saveBtn.disabled = true;
  },
  submit: (inputValues) => {
    avatarPopup._saveBtn.textContent = 'Сохранение...';
    api.setUserAvatar({avatar: inputValues.subtitle})
    .then((result) => {
        console.log(result);
        userInfo.setUserAvatar(result.avatar, '.profile__avatar-img');
    })
    .finally((e) => {
        avatarPopup.close();
        avatarPopup._saveBtn.textContent = 'Сохраненить';
    })
  }
})

const avatarEditBtn = profile.querySelector('.profile__avatar-edit');
avatarEditBtn.addEventListener('click', () => avatarPopup.open());

// SUBMIT POPUP
const submitPopup = new PopupWithSubmit({
  popupElements: {
    popupClass: 'popup_submit',
    popupSelector: '.popup_submit', 
    closeBtnSelector: '.popup__close-btn'
  },
  submit: () => {
    api.deleteCard(submitPopup.card._id)
    .then((result) => {
      submitPopup.cardObj.remove(); 
    })
  }
});

// IMAGE POPUP
const imgPopup = new PopupWithImage({
  popupClass: 'img-popup',
  popupSelector: '.img-popup', 
  closeBtnSelector: '.img-popup__close-btn'
});

// IMAGE CARD
const imgCard = new Section ({
  items: {},
  renderer: (item) => {
    const card = new Card({
      cardInfo: item, 
      ownerId: userInfo.getUserId(),
      openPopup: (link, title) => {
        imgPopup._img.src = link;
        imgPopup._img.alt = title;
        imgPopup._title.textContent = title;
        imgPopup.open();
      },
      template: '#placeTemplate',
    openSubmitToDelete: (cardObj) => {
      submitPopup.cardObj = cardObj;
      submitPopup.card = item;
      submitPopup.open();
    },
    likeCard: (cardID, methodLike, likeCounter) => {
      api.likeCard(cardID, methodLike)
        .then((result) => {
          likeCounter.parentElement.querySelector('.place__like-count').textContent = result.likes.length;
        })
    }
  });
    const cardElement = card.createImgCard();
    imgCard.addItem(cardElement);
  }
},
'.places'
);

// ADD INITIAL CARDS
api.getCardsArr()
.then(cardsArr => {
  imgCard.items = cardsArr;
  imgCard.rendererItems();
})


// EDIT PROFILE
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
    editPopup._saveBtn.textContent = 'Сохранение...';
    api.editUserInfo({
      name: title,
      about: subtitle
    })
    .then((result) => {
      userInfo.setUserInfo(title, subtitle);
    })
    .finally((e) => {
        editPopup.close();
        editPopup._saveBtn.textContent = 'Сохраненить';
    })
    
  }});

const editButton = profile.querySelector('.profile__edit-btn');
editButton.addEventListener('click', () => editPopup.open({userInfo: userInfo.getUserInfo()}));

// ADD IMAGE
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
    addPopup._saveBtn.textContent = 'Сохранение...';
    api.addNewCard({
      name: title, 
      link: subtitle
    })
  .then((result) => {
    const temp = [];
    temp.push(result);
    imgCard.items = temp;
    imgCard.rendererItems();
  })
  .finally((e) => {
        addPopup.close();
        addPopup._saveBtn.textContent = 'Создать';
  })

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