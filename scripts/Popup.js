import Card from './Card.js';

const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileJob = profile.querySelector('.profile__job');
const body = document.querySelector('.body');

class Popup{
  constructor(popupElements) {
    this._popupClass = popupElements.popupClass;
    this._popupSelector = popupElements.popupSelector;
    this._closeBtnSelector = popupElements.closeBtnSelector;
    this._popup = document.querySelector(this._popupSelector);
  }

  _closePopup() {
    body.classList.remove('body_disable-scroll');
    this._removePopupCloseEvent();
  };

  _missClickClose(evt) {
    if (evt.target.classList.contains(this._popupClass)) {
        this._closePopup();
      }
    };
  _onBtnClose() {
    this._closePopup();
  };

  _onEscClose(evt) {
      if (evt.key == 'Escape') {
        this._closePopup();
      }
  };
  _addPopupCloseEvent() {
    //esc
    document.addEventListener('keydown', (evt) => {
      this._onEscClose(evt);
    });
    //missclick
    this._popup.addEventListener('click', (evt) => {
      this._missClickClose(evt);
    });
    //Close button img-popup__close-btn
    this._popup.querySelector(this._closeBtnSelector)
    .addEventListener('click', () => {
      this._onBtnClose();
    });
  };

  _removePopupCloseEvent() {
    document.removeEventListener('keydown', this._onEscClose);
    this._popup.removeEventListener('click', this._missClickClose);
    this._popup.removeEventListener('click', this._onBtnClose);
  };

  openPopup() {
    //disable scroll
    body.classList.add('body_disable-scroll');
    this._addPopupCloseEvent();
  }

}

class EditPopup extends Popup{
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

class AddPopup extends Popup{
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

    this._submit();
  };
} //class: AddPopup

class ImagePopup extends Popup {
  constructor (popupElements) {
    super(popupElements);

    this._link = popupElements.link;
    this._name = popupElements.name;
    this._img = this._popup.querySelector('.img-popup__img');
    this._title = this._popup.querySelector('.img-popup__title');
  }

  _closePopup() {
    this._popup.classList.remove('img-popup_opened');
    super._closePopup();
  };

  openPopup() {
    super.openPopup();

    this._img.src = this._link;
    this._img.alt = this._name;
    this._title.textContent = this._name;

    this._popup.classList.add('img-popup_opened');
  };
} //class: ImagePopup

export {EditPopup, AddPopup, ImagePopup};
