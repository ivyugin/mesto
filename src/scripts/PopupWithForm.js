import Popup from './Popup.js';

export default class PopupWithForm extends Popup{
    constructor({popupElements, openPopup, submit, dropError}) {
      super(popupElements);
      this.openPopup = openPopup;
      this._submit = submit;
      this._dropError = dropError;
      this._saveBtn = this._popup.querySelector('.popup__container-save-btn');
      this.formElement = this._popup.querySelector('.popup__container');
      this.setEventListeners();
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
      const inputArray = this._popup.querySelectorAll('.popup__container-input');
      inputArray.forEach((input) => {
        input.value = userData[input.name];
      });
    }

    setEventListeners() {
      super.setEventListeners();
      //submit
      this.formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
        this._submit(this._getInputValues());  
      });
    }
  
    close() {
      this._dropError();
      super.close();
    };
  
    open() {
      super.open();
      
      this.openPopup();
    };
  }