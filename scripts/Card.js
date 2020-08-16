import PopupWithImage from './PopupWithImage.js';

export default class Card {
  constructor (name, link, template) {
    this._name = name;
    this._link = link;
    this._template = template;
    this._placeTemplate = document.querySelector(this._template).content.cloneNode(true);
    this._placeImage = this._placeTemplate.querySelector('.place__image'); 
  }

  createImgCard() {
    this._placeImage.src = this._link;
    this._placeImage.alt = this._name;
    this._placeTemplate.querySelector('.place__title').textContent = this._name;
    
    //Set event listeners
    this._eventListenerOpen();
    this._evenListenerLike();
    this._eventListenerDelete();

    return this._placeTemplate;
  }

//OPEN IMAGE
  _eventListenerOpen() {
    this._placeImage.addEventListener('click', () => {

      const imgPopup = new PopupWithImage({
          popupClass: 'img-popup',
          popupSelector: '.img-popup', 
          closeBtnSelector: '.img-popup__close-btn',
          link: this._link,
          name: this._name
      });

      imgPopup.open();
      
    });
  }

//LIKE BUTTON
  _evenListenerLike() {
    this._placeTemplate.querySelector('.place__like-btn').addEventListener('click', (evt) => {
      evt.target.classList.toggle('place__like-btn_cheked');
    });
  }

//DELETE BUTTON
  _eventListenerDelete() {
    this._placeTemplate.querySelector('.place__delete-btn').addEventListener('click', (evt) => {
      evt.target.parentElement.remove();
    });
  }
}