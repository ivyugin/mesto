let popup = document.querySelector('.popup');
let closeButton = popup.querySelector('.popup__close-btn');
let formElement = popup.querySelector('.popup__container');
let profile = document.querySelector('.profile');
let editButton = profile.querySelector('.profile__edit-btn');

//открытие формы

editButton.addEventListener('click', function () { 
    popup.classList.add('popup_opened');

    //disable scroll
    document.body.style.overflow = 'hidden';

    let profileTitle = profile.querySelector('.profile__name').textContent;
    let profileSubtitle = profile.querySelector('.profile__job').textContent;

    popup.querySelector('.popup__container-input_type_title').value = profileTitle;
    popup.querySelector('.popup__container-input_type_subtitle').value = profileSubtitle;
  });

//Закрытие формы:

//кнопкой
closeButton.addEventListener('click', function () { 
  popup.classList.remove('popup_opened');
  //enable scroll
  document.body.style.overflow = 'auto';
   });

//esc
document.onkeydown = function(evt) {
    evt = evt || window.event;
    if (evt.keyCode == 27) {
        popup.classList.remove('popup_opened');
        //enable scroll
        document.body.style.overflow = 'auto';
    }
};

//Сабмит
function formSubmitHandler (evt) {
  evt.preventDefault();

  let nameInput = popup.querySelector('.popup__container-input_type_title').value;
  let jobInput = popup.querySelector('.popup__container-input_type_subtitle').value;

  profile.querySelector('.profile__name').textContent = nameInput;
  profile.querySelector('.profile__job').textContent = jobInput;

  popup.classList.remove('popup_opened');
  //enable scroll
  document.body.style.overflow = 'auto';
}

formElement.addEventListener('submit', formSubmitHandler);
