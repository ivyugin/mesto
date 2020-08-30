import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor (popupElements) {
      super(popupElements);
      this._img = this._popup.querySelector('.img-popup__img');
      this._title = this._popup.querySelector('.img-popup__title');
      super.setEventListeners();
    }
  
    open(link, title) {
      this._img.src = link;
      this._img.alt = title;
      this._title.textContent = title;

      
      super.open();
    };
  } 