const popup = document.querySelector('.popup');
const closeButton = popup.querySelector('.popup__close-btn');
const formElement = popup.querySelector('.popup__container');
const container_title= popup.querySelector('.popup__container-input_type_title');
const container_subtitle = popup.querySelector('.popup__container-input_type_subtitle');

const profile = document.querySelector('.profile');
const editButton = profile.querySelector('.profile__edit-btn');
const esc_key = 27;

// POPUP ADD IMAGE
const addButton = profile.querySelector('.profile__add-btn');

// OPEN
//EDIT PROFILE
editButton.addEventListener('click', function () { 
    //disable scroll
    body.classList.add('body_disable-scroll');

    const profileTitle = profile.querySelector('.profile__name').textContent;
    const profileSubtitle = profile.querySelector('.profile__job').textContent;

    popup.querySelector('.popup__container-title').textContent = 'Редактировать профиль';
    container_title.value = profileTitle;
    container_subtitle.value = profileSubtitle;
    popup.querySelector('.popup__container-save-btn').textContent = 'Сохранить';

    popup.classList.add('popup_opened', 'popup_edit');
  });

//ADD IMAGE
addButton.addEventListener('click', function () { 
    popup.classList.add('popup_opened', 'popup_add');

    //disable scroll
    body.classList.add('body_disable-scroll');

    popup.querySelector('.popup__container-title').textContent = 'Новое место';
    container_title.value = '';
    container_title.placeholder = 'Название';
    container_subtitle.value = '';
    container_subtitle.placeholder = 'Ссылка на картинку';
    popup.querySelector('.popup__container-save-btn').textContent = 'Создать';
  });

//Закрытие формы:

//кнопкой
closeButton.addEventListener('click', function () { 
  popup.classList.remove('popup_opened', 'popup_edit', 'popup_add');

  //enable scroll
  body.classList.remove('body_disable-scroll');
   });

//esc
document.onkeydown = function(evt) {
  evt = evt || window.event;
  if (evt.keyCode == esc_key) {
    console.log('esc');
      popup.classList.remove('popup_opened', 'popup_edit', 'popup_add');
      imgPopup.classList.remove('img-popup_opened');
      //enable scroll
      body.classList.remove('body_disable-scroll');
  }
};

//Сабмит
formElement.addEventListener('submit', function (evt) {
  evt.preventDefault();

  if (formElement.parentElement.classList.contains('popup_edit')) {
    const nameInput = container_title.value;
    const jobInput = container_subtitle.value;

    profile.querySelector('.profile__name').textContent = nameInput;
    profile.querySelector('.profile__job').textContent = jobInput;
  } else {
    const nameImg = container_title.value;
    const linkImg = container_subtitle.value;

    if ((nameImg != '') && (linkImg != '')) {
      addImage(nameImg, linkImg);
    }
  }

  popup.classList.remove('popup_opened', 'popup_edit', 'popup_add');
  //enable scroll
  body.classList.remove('body_disable-scroll');
});


