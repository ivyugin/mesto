import Popup from './Popup.js';

export default class PopupWithForm extends Popup{
    constructor({popupElements, openPopup, submit}) {
      super(popupElements);
      this.openPopup = openPopup;
      this._submit = submit;
      this._saveBtn = this._popup.querySelector('.popup__container-save-btn');
    }

    _getInputValues() {
      const inputArray = this._popup.querySelectorAll('.popup__container-input');
      const inputValues = {};
      inputArray.forEach((input) => {
        inputValues[input.name] = input.value;
      });
      return inputValues
    }

    setInputValues(userData) {
      this._popup.querySelector('.popup__container-input_type_title').value = userData.title;
      this._popup.querySelector('.popup__container-input_type_subtitle').value = userData.subtitle;
    }

    setEventListeners() {
      //super.setEventListeners();

      //submit
      const formElement = this._popup.querySelector('.popup__container');

      this.submitHandler =
      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
        this._submit(this._getInputValues());
        this.close();
      });
    }
  
    close() {
      //drop input and error form
      this._popup.classList.remove('popup_opened');

      Array.from(this._popup.querySelectorAll('.popup__container-input')).forEach((item) => {
        item.classList.remove('popup__container-input_error');
      });
      Array.from(this._popup.querySelectorAll('.popup__error')).forEach((item) => {
        item.classList.remove('popup__error_active');
      });

      super.close();
    };
  
    open() {
      super.open();
      super.setEventListeners();
      this.openPopup();
  
      //open
      this._popup.classList.add('popup_opened');
    };
  } //class: EditPopup