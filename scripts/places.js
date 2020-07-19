const places = document.querySelector('.places');
const body = document.querySelector('.body');

//Create immage card from template #placeTemplate
//add event listener to card
function createImgCard (name, link) {

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

    imagePopup.addPopupCloseEvent();

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

  return placeTemplate;
}

function addImage (name, link) {

  const imgCard = createImgCard (name, link);
  places.prepend(imgCard);
}

initialCards.forEach( (item) => {
  addImage(item.name, item.link);
});




