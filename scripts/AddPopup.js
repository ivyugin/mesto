import Popup from './Popup.js';
import Card from './Card.js';

export default class AddPopup extends Popup{
    constructor(popupElements) {
      super(popupElements);
      
      this._title = this._popup.querySelector('.popup__container-input_type_title');
      this._subtitle = this._popup.querySelector('.popup__container-input_type_subtitle');
      this._saveBtn = this._popup.querySelector('.popup__container-save-btn');

      this._submit();
    }
  
    _closePopup() {
      this._popup.classList.remove('popup_opened');
      super._closePopup();
    };
  
    _submit() {
      
      const formElement = this._popup.querySelector('.popup__container');
      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
  
        const places = document.querySelector('.places');
        
        const card = new Card(this._title.value, this._subtitle.value, '#placeTemplate');
        const cardElement = card.createImgCard();
        places.prepend(cardElement);
  
  
        this._closePopup();
      });
    }
    openPopup() {
      super.openPopup();
  
      //customization popup
      this._title.value = '';
      this._subtitle.value = '';
  
      //prepare popup window: no errors, disable button
      Array.from(this._popup.querySelectorAll('.popup__container-input')).forEach((item) => {
        item.classList.remove('popup__container-input_error');
      });
      Array.from(this._popup.querySelectorAll('.popup__error')).forEach((item) => {
        item.classList.remove('popup__error_active');
      });
      this._saveBtn.classList.add('popup__container-save-btn_inactive');
      this._saveBtn.disabled = true;
  
      //open
      this._popup.classList.add('popup_opened');
    };
  } //class: AddPopup