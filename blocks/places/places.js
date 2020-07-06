const places = document.querySelector('.places');
const body = document.querySelector('.body');

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

function addImage (name, link) {

  const placeTemplate = document.querySelector('#placeTemplate').content.cloneNode(true);

  const placeImage = placeTemplate.querySelector('.place__image'); 
  placeImage.src = link;
  placeImage.alt = name;
  placeTemplate.querySelector('.place__title').textContent = name;

  //OPEN IMAGE
  placeImage.addEventListener('click', () => {
    const imgPopup = document.querySelector('.img-popup');
    const imgPopupImg = imgPopup.querySelector('.img-popup__img');
    imgPopupImg.src = link;
    imgPopupImg.alt = name;
    imgPopup.querySelector('.img-popup__title').textContent = name;

    imgPopup.classList.add('img-popup_opened');
    //disable scroll
    body.classList.add('body_disable-scroll');
  });

  //LIKE BUTTON
  placeTemplate.querySelector('.place__like-btn').addEventListener('click', (evt) => {
    evt.target.classList.toggle('place__like-btn_cheked');
  });

  //DELETE BUTTON
  placeTemplate.querySelector('.place__delete-btn').addEventListener('click', (evt) => {
    evt.target.parentElement.remove();
  });

  places.prepend(placeTemplate);
}

initialCards.forEach( (item) => {
  addImage(item.name, item.link);
});




