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

  const place_image = placeTemplate.querySelector('.place__image'); 
  place_image.src = link;
  place_image.alt = name;
  placeTemplate.querySelector('.place__title').textContent = name;

  //OPEN IMAGE
  place_image.addEventListener('click', () => {
    const imgPopup = document.querySelector('.img-popup');
    const img_popup_img = imgPopup.querySelector('.img-popup__img');
    img_popup_img.src = link;
    img_popup_img.alt = name;
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




