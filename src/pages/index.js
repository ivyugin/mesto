import Card from './../scripts/Card.js';
import PopupWithForm from './../scripts/PopupWithForm.js';
import FormValidator from './../scripts/FormValidator.js';
import Section from './../scripts/Section.js';
import UserInfo from './../scripts/UserInfo.js';
import PopupWithImage from './../scripts/PopupWithImage.js';
import PopupWithSubmit from './../scripts/PopupWithSubmit.js';
import Api from './../scripts/Api.js';
import './index.css';

const profile = document.querySelector('.profile');
const pref = {
      formSelector: '.popup__container',
      inputSelector: '.popup__container-input',
      submitButtonSelector: '.popup__container-save-btn',
      inactiveButtonClass: 'popup__container-save-btn_inactive',
      inputErrorClass: 'popup__container-input_error',
      formErrorSelector: '.popup__error',
      errorClass: 'popup__error_active'
    };

//API
const api = new Api('https://mesto.nomoreparties.co/v1/cohort-14', '668dca3d-51ec-4823-a727-cc18d24544ec');


// PROFILE
const userInfo = new UserInfo ('.profile__name', '.profile__job');

const userInfoPromise = api.getUserInfo()
.then(userInfoFromServer => {
  userInfo.setUserInfo(userInfoFromServer.name, userInfoFromServer.about, userInfoFromServer._id);
  userInfo.setUserAvatar(userInfoFromServer.avatar, '.profile__avatar-img');
  return userInfoFromServer
})
.catch((err) => {
  console.log(err);
});

// AVATAR POPUP

// VALIDATION
const avatarPopupFormElement = document.querySelector('.popup_avatar').querySelector('.popup__container');
const avatarPopupValidator = new FormValidator(pref, avatarPopupFormElement);
avatarPopupValidator.enableValidation();

const avatarPopup = new PopupWithForm({
  popupElements: {
    popupClass: 'popup_avatar',
    popupSelector: '.popup_avatar', 
    closeBtnSelector: '.popup__close-btn'
  },
  openPopup: () => {
    avatarPopup.setInputValues({subtitle: ''});
    avatarPopupValidator.disableButton();
  },
  submit: (inputValues) => {
    avatarPopup._saveBtn.textContent = 'Сохранение...';
    api.setUserAvatar({avatar: inputValues.subtitle})
    .then((result) => {
        userInfo.setUserAvatar(result.avatar, '.profile__avatar-img');
        avatarPopup.close();
    })
    .catch((err) => {
            console.log(err);
          })
    .finally((e) => {
        avatarPopup._saveBtn.textContent = 'Сохраненить';
    })
  },
  dropError: () => {
   avatarPopupValidator.dropErrorsFrom();
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
      submitPopup.close();
    })
    .catch((err) => {
      console.log(err);
    });
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
        imgPopup.open(link, title);
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
        .catch((err) => {
          console.log(err);
        });
    }
  });
    const cardElement = card.createImgCard();
    imgCard.addItem(cardElement);
  },
elementSelector: '.places'
});

// ADD INITIAL CARDS

const getCardsPromise = api.getCardsArr()
.then(cardsArr => {
  return cardsArr
})
.catch((err) => {
  console.log(err);
});

const promises = [userInfoPromise, getCardsPromise]

Promise.all(promises)
  .then(prom => {
    imgCard.items = prom[1];
    imgCard.rendererItems();
  })
  .catch((err) => {
    console.log(err);
  });

// EDIT PROFILE

// VALIDATION
const editPopupFormElement = document.querySelector('.popup_edit').querySelector('.popup__container');
const editPopupValidator = new FormValidator(pref, editPopupFormElement);
editPopupValidator.enableValidation();

const editPopup = new PopupWithForm({
  popupElements: {
    popupClass: 'popup_edit',
    popupSelector: '.popup_edit', 
    closeBtnSelector: '.popup__close-btn'
  },
  openPopup: () => {
    editPopup.setInputValues(userInfo.getUserInfo());
    editPopupValidator.activateButton();
  },
  submit: ({title, subtitle}) => {
    editPopup._saveBtn.textContent = 'Сохранение...';
    api.editUserInfo({
      name: title,
      about: subtitle
    })
    .then((result) => {
      userInfo.setUserInfo(title, subtitle);
      editPopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally((e) => {
        editPopup._saveBtn.textContent = 'Сохранить';
    }) 
  },
  dropError: () => {
    editPopupValidator.dropErrorsFrom();
  }
});

const editButton = profile.querySelector('.profile__edit-btn');
editButton.addEventListener('click', () => editPopup.open({userInfo: userInfo.getUserInfo()}));

// ADD IMAGE
// VALIDATION
const addPopupFormElement = document.querySelector('.popup_add').querySelector('.popup__container');
const addPopupValidator = new FormValidator(pref, addPopupFormElement);
addPopupValidator.enableValidation();

const addPopup = new PopupWithForm({
  popupElements: {
    popupClass: 'popup_add',
    popupSelector: '.popup_add', 
    closeBtnSelector: '.popup__close-btn'
  },
  openPopup: () => {
    addPopup.setInputValues({title: '', subtitle: ''});
    addPopupValidator.disableButton();
  },
  submit: ({title, subtitle}) => {
    addPopup._saveBtn.textContent = 'Сохранение...';
    api.addNewCard({
      name: title, 
      link: subtitle
    })
  .then((result) => {

    //Класс imgCard является универсальным для создания карточек - Section
    //rendererItems - отрисовывает карточки с сервера переданные в конструкторе
    //функции addItem на вход нужно передать новую карточку - что бы она добавила её на страницу.
    //код создания новой карточки и передачи её в addItem уже есть в классе imgCard.renderer
    //что бы не дублировать этот код - добавил дополнительно функцию rendererItem - 
    //которая выполняет imgCard.renderer для одной карточки переданной через параметр.

    imgCard.rendererItem(result);
    addPopup.close();
  })
  .catch((err) => {
    console.log(err);
  })
  .finally((e) => {
        addPopup._saveBtn.textContent = 'Создать';
  })

  },
  dropError: () => {
    addPopupValidator.dropErrorsFrom();
  }
});

const addButton = profile.querySelector('.profile__add-btn');
addButton.addEventListener('click', () => addPopup.open());

//ENABLE VALIDATION
    
//const formArr = document.querySelectorAll(pref.formSelector);

//formArr.forEach((form) => {
 // const formValidator = new FormValidator(pref, form);
 // formValidator.enableValidation();
//});