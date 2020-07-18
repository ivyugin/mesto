const popup = document.querySelector('.popup');
const closeButton = popup.querySelector('.popup__close-btn');
const formElement = popup.querySelector('.popup__container');
const containerTitle= popup.querySelector('.popup__container-input_type_title');
const containerSubtitle = popup.querySelector('.popup__container-input_type_subtitle');
const saveBtn = popup.querySelector('.popup__container-save-btn');

const profile = document.querySelector('.profile');
const editButton = profile.querySelector('.profile__edit-btn');
const escKey = 27;
const addButton = profile.querySelector('.profile__add-btn');

function setManyAttributes (obj, attrArr) {
  //Object.entries(attrArr).forEach((Attribut) => {
  //  obj.setAttribute(Attribut[0], Attribut[1]);
  //})
  for (let Attribut in attrArr) {
    obj.setAttribute(Attribut, attrArr[Attribut]);
  }
}


// OPEN
//EDIT PROFILE
editButton.addEventListener('click', function () { 

    //disable scroll
    body.classList.add('body_disable-scroll');

    //customization popup
    const profileTitle = profile.querySelector('.profile__name').textContent;
    const profileSubtitle = profile.querySelector('.profile__job').textContent;
    popup.querySelector('.popup__container-title').textContent = 'Редактировать профиль';
    containerTitle.value = profileTitle;
    containerSubtitle.value = profileSubtitle;
    saveBtn.textContent = 'Сохранить';

    //prepare popup window: no errors, active button
    Array.from(popup.querySelectorAll('.popup__container-input')).forEach((item) => {
      item.classList.remove('popup__container-input_error');
    });
    Array.from(popup.querySelectorAll('.popup__error')).forEach((item) => {
      item.classList.remove('popup__error_active');
    });
    saveBtn.classList.remove('popup__container-save-btn_inactive');
    saveBtn.disabled = false;

    //validation attribute
    setManyAttributes(containerTitle, {type: 'text', minlength: '2', maxlength: '40'});
    setManyAttributes(containerSubtitle, {type: 'text', minlength: '2', maxlength: '200'});

    //open
    popup.classList.add('popup_opened', 'popup_edit');
  });

//ADD IMAGE
addButton.addEventListener('click', function () { 

    //disable scroll
    body.classList.add('body_disable-scroll');

    //customization popup
    popup.querySelector('.popup__container-title').textContent = 'Новое место';
    containerTitle.value = '';
    containerTitle.placeholder = 'Название';
    containerSubtitle.value = '';
    containerSubtitle.placeholder = 'Ссылка на картинку';
    popup.querySelector('.popup__container-save-btn').textContent = 'Создать';

    //prepare popup window: no errors, disable button
    Array.from(popup.querySelectorAll('.popup__container-input')).forEach((item) => {
      item.classList.remove('popup__container-input_error');
    });
    Array.from(popup.querySelectorAll('.popup__error')).forEach((item) => {
      item.classList.remove('popup__error_active');
    });
    saveBtn.classList.add('popup__container-save-btn_inactive');
    saveBtn.disabled = true;

    //validation attribute
    setManyAttributes(containerTitle, {type: 'text', minlength: '1', maxlength: '30'});
    containerSubtitle.removeAttribute('minlength');
    containerSubtitle.removeAttribute('maxlength');
    setManyAttributes(containerSubtitle, {type: 'url'});

    //open
    popup.classList.add('popup_opened', 'popup_add');
  });

//Close form
//missclick
popup.addEventListener('click', function (e) {
  if (e.target.classList.contains('popup')) {
    popup.classList.remove('popup_opened', 'popup_edit', 'popup_add');
    body.classList.remove('body_disable-scroll');
  }
})

//Close button
closeButton.addEventListener('click', function () { 
  popup.classList.remove('popup_opened', 'popup_edit', 'popup_add');
  body.classList.remove('body_disable-scroll');
   });

//esc
document.onkeydown = function(evt) {
  evt = evt || window.event;
  if (evt.keyCode == escKey) {
    popup.classList.remove('popup_opened', 'popup_edit', 'popup_add');
    imgPopup.classList.remove('img-popup_opened');
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