let popup = document.querySelector('.popup');
let closeButton = popup.querySelector('.popup__close-btn');
let formElement = popup.querySelector('.popup__container');
let profile = document.querySelector('.profile');
let editButton = profile.querySelector('.profile__edit-btn');

// POPUP ADD IMAGE
let addButton = profile.querySelector('.profile__add-btn');

// OPEN
//EDIT PROFILE
editButton.addEventListener('click', function () { 
    //disable scroll
    document.body.style.overflow = 'hidden';

    let profileTitle = profile.querySelector('.profile__name').textContent;
    let profileSubtitle = profile.querySelector('.profile__job').textContent;

    popup.querySelector('.popup__container-title').textContent = 'Редактировать профиль';
    popup.querySelector('.popup__container-input_type_title').value = profileTitle;
    popup.querySelector('.popup__container-input_type_subtitle').value = profileSubtitle;
    popup.querySelector('.popup__container-save-btn').textContent = 'Сохранить';

    popup.classList.add('popup_opened', 'popup_edit');
  });

//ADD IMAGE
addButton.addEventListener('click', function () { 
    popup.classList.add('popup_opened', 'popup_add');

    //disable scroll
    document.body.style.overflow = 'hidden';

    popup.querySelector('.popup__container-title').textContent = 'Новое место';
    popup.querySelector('.popup__container-input_type_title').value = '';
    popup.querySelector('.popup__container-input_type_title').placeholder = 'Название';
    popup.querySelector('.popup__container-input_type_subtitle').value = '';
    popup.querySelector('.popup__container-input_type_subtitle').placeholder = 'Ссылка на картинку';
    popup.querySelector('.popup__container-save-btn').textContent = 'Создать';
  });

//Закрытие формы:

//кнопкой
closeButton.addEventListener('click', function () { 
  popup.classList.remove('popup_opened', 'popup_edit', 'popup_add');

  //enable scroll
  document.body.style.overflow = 'auto';
   });

//esc
document.onkeydown = function(evt) {
  evt = evt || window.event;
  if (evt.keyCode == 27) {
      popup.classList.remove('popup_opened', 'popup_edit', 'popup_add');
      //enable scroll
      document.body.style.overflow = 'auto';
  }
};

//Сабмит
formElement.addEventListener('submit', function (evt) {
  evt.preventDefault();

  if (formElement.parentElement.classList.contains('popup_edit')) {
    let nameInput = popup.querySelector('.popup__container-input_type_title').value;
    let jobInput = popup.querySelector('.popup__container-input_type_subtitle').value;

    profile.querySelector('.profile__name').textContent = nameInput;
    profile.querySelector('.profile__job').textContent = jobInput;
  } else {
    let nameImg = popup.querySelector('.popup__container-input_type_title').value;
    let linkImg = popup.querySelector('.popup__container-input_type_subtitle').value;

    console.log(nameImg);
    console.log(linkImg);
    if ((nameImg != '') && (linkImg != '')) {
      addImage(nameImg, linkImg);
    }
  }

  popup.classList.remove('popup_opened', 'popup_edit', 'popup_add');
  //enable scroll
  document.body.style.overflow = 'auto';
});


