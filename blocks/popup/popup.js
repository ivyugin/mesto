const popup = document.querySelector('.popup');
const closeButton = popup.querySelector('.popup__close-btn');
const formElement = popup.querySelector('.popup__container');
const containerTitle= popup.querySelector('.popup__container-input_type_title');
const containerSubtitle = popup.querySelector('.popup__container-input_type_subtitle');

const profile = document.querySelector('.profile');
const editButton = profile.querySelector('.profile__edit-btn');
const escKey = 27;
const addButton = profile.querySelector('.profile__add-btn');

const pref = {
      formSelector: '.popup__container',
      inputSelector: '.popup__container-input',
      submitButtonSelector: '.popup__container-save-btn',
      inactiveButtonClass: 'popup__container-save-btn_inactive',
      inputErrorClass: 'popup__container-input_error',
      formErrorSelector: '.popup__error',
      errorClass: 'popup__error_active'
    };

// OPEN
//EDIT PROFILE
editButton.addEventListener('click', function () { 
    //disable scroll
    body.classList.add('body_disable-scroll');

    const profileTitle = profile.querySelector('.profile__name').textContent;
    const profileSubtitle = profile.querySelector('.profile__job').textContent;

    popup.querySelector('.popup__container-title').textContent = 'Редактировать профиль';
    containerTitle.value = profileTitle;
    containerSubtitle.value = profileSubtitle;
    popup.querySelector('.popup__container-save-btn').textContent = 'Сохранить';

    //validation
    containerTitle.setAttribute('type', 'text');
    containerTitle.setAttribute('minlength', '2');
    containerTitle.setAttribute('maxlength', '40');
    containerSubtitle.setAttribute('type', 'text');
    containerSubtitle.setAttribute('minlength', '2');
    containerSubtitle.setAttribute('maxlength', '200');

    enableValidation(pref);
    //============

    popup.classList.add('popup_opened', 'popup_edit');
  });

//ADD IMAGE
addButton.addEventListener('click', function () { 
    //disable scroll
    body.classList.add('body_disable-scroll');

    popup.querySelector('.popup__container-title').textContent = 'Новое место';
    containerTitle.value = '';
    containerTitle.placeholder = 'Название';
    containerSubtitle.value = '';
    containerSubtitle.placeholder = 'Ссылка на картинку';
    popup.querySelector('.popup__container-save-btn').textContent = 'Создать';

    //validation
    containerTitle.setAttribute('type', 'text');
    containerTitle.setAttribute('minlength', '1');
    containerTitle.setAttribute('maxlength', '30');
    containerSubtitle.setAttribute('type', 'url');

    enableValidation(pref);
    //============

    popup.classList.add('popup_opened', 'popup_add');
  });

//Close form
//missclick
popup.addEventListener('click', function (e) {
  if (e.target.classList.contains('popup')) {
    popup.classList.remove('popup_opened', 'popup_edit', 'popup_add');
    //enable scroll
    body.classList.remove('body_disable-scroll');
  }
})

//Close button
closeButton.addEventListener('click', function () { 
  popup.classList.remove('popup_opened', 'popup_edit', 'popup_add');

  //enable scroll
  body.classList.remove('body_disable-scroll');
   });

//esc
document.onkeydown = function(evt) {
  evt = evt || window.event;
  if (evt.keyCode == escKey) {
    popup.classList.remove('popup_opened', 'popup_edit', 'popup_add');
    imgPopup.classList.remove('img-popup_opened');
    //enable scroll
    body.classList.remove('body_disable-scroll');
  }
};

//Submit
formElement.addEventListener('submit', function (evt) {
  evt.preventDefault();

  if (formElement.parentElement.classList.contains('popup_edit')) {
    const nameInput = containerTitle.value;
    const jobInput = containerSubtitle.value;

    profile.querySelector('.profile__name').textContent = nameInput;
    profile.querySelector('.profile__job').textContent = jobInput;
  } else {
    const nameImg = containerTitle.value;
    const linkImg = containerSubtitle.value;

    if ((nameImg != '') && (linkImg != '')) {
      addImage(nameImg, linkImg);
    }
  }

  popup.classList.remove('popup_opened', 'popup_edit', 'popup_add');
  //enable scroll
  body.classList.remove('body_disable-scroll');
});