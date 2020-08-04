import Popup from './Popup.js';

const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileJob = profile.querySelector('.profile__job');

export default class EditPopup extends Popup{
    constructor(popupElements) {
      super(popupElements);
      
      this._title = this._popup.querySelector('.popup__container-input_type_title');
      this._subtitle = this._popup.querySelector('.popup__container-input_type_subtitle');
      this._saveBtn = this._popup.querySelector('.popup__container-save-btn');
    }
  
    _closePopup() {
      this._popup.classList.remove('popup_opened');
      super._closePopup();
    };
  
    _submit() {
  
      const formElement = this._popup.querySelector('.popup__container');
      formElement.addEventListener('submit', (evt) => {
  
        evt.preventDefault();
        profileName.textContent = this._title.value;;
        profileJob.textContent = this._subtitle.value;;
        
        this._closePopup();
      });
    }
    openPopup() {
      super.openPopup();
  
      this._title.value = profileName.textContent;
      this._subtitle.value = profileJob.textContent;
  
      //prepare popup window: no errors, active button
      Array.from(this._popup.querySelectorAll('.popup__container-input')).forEach((item) => {
        item.classList.remove('popup__container-input_error');
      });
      Array.from(this._popup.querySelectorAll('.popup__error')).forEach((item) => {
        item.classList.remove('popup__error_active');
      });
      this._saveBtn.classList.remove('popup__container-save-btn_inactive');
      this._saveBtn.disabled = false;
  
      //open
      this._popup.classList.add('popup_opened');
      this._submit();
    };
  } //class: EditPopup