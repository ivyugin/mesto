import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor (popupElements) {
      super(popupElements);
  
      this._link = popupElements.link;
      this._name = popupElements.name;
      this._img = this._popup.querySelector('.img-popup__img');
      this._title = this._popup.querySelector('.img-popup__title');
    }
  
    close() {
      this._popup.classList.remove('img-popup_opened');
      super.close();
    };
  
    open() {
      super.open();
  
      this._img.src = this._link;
      this._img.alt = this._name;
      this._title.textContent = this._name;
  
      this._popup.classList.add('img-popup_opened');
    };
  } 