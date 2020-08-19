export default class Card {
  constructor ({name, link, openPopup, template}) {
    this._name = name;
    this._link = link;
    this._openPopup = openPopup;
    this._placeTemplate = this._getTemplate(template);
    this._placeImage = this._placeTemplate.querySelector('.place__image'); 
  }

  _getTemplate(template) {
    return document.querySelector(template).content.cloneNode(true);
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

      this._openPopup(this._link, this._name);
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