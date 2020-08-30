//VALIDATION FORM
export default class FormValidator {
  constructor(pref, form) {
    this._pref = pref;
    this._form = form;
    this._inputList = Array.from(this._form.querySelectorAll(this._pref.inputSelector));
    this._submitBtn = this._form.querySelector(this._pref.submitButtonSelector);
  }

  _showInputError (inputElement, validationMessage) {
    inputElement.classList.add(this._pref.inputErrorClass);
    const errorElement = inputElement.parentElement.querySelector(this._pref.formErrorSelector);
    errorElement.textContent = validationMessage;
    errorElement.classList.add(this._pref.errorClass);
  }

  _hideInputError (inputElement) {
    inputElement.classList.remove(this._pref.inputErrorClass);
    const errorElement = inputElement.parentElement.querySelector(this._pref.formErrorSelector);
    errorElement.classList.remove(this._pref.errorClass);
  }

  _isValid  (inputElement)  {
    if (inputElement.validity.valid) {
      this._hideInputError(inputElement);
    } else {
      this._showInputError(inputElement, inputElement.validationMessage);
    }
  }

  _hasInvalidInput () {
    return this._inputList.some((input) => {
      return !input.validity.valid;
    })
  }

  _toggleButtonState () {
    if (this._hasInvalidInput()) {
      this.disableButton();
    } else {
      this.activateButton();
    }
  }

  activateButton () {
    this._submitBtn.classList.remove(this._pref.inactiveButtonClass);
    this._submitBtn.disabled = false;
  }

  disableButton() {
    this._submitBtn.classList.add(this._pref.inactiveButtonClass);
    this._submitBtn.disabled = true;
  }

  _setEventListeners () {
    this._toggleButtonState(this._inputList, this._submitBtn);

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this._toggleButtonState(this._inputList, this._submitBtn);
      })
    })
  }

  enableValidation () {
      this._form.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });
      this._setEventListeners();
  }

  dropErrorsFrom () {
    Array.from(this._form.querySelectorAll('.popup__container-input')).forEach((item) => {
        item.classList.remove('popup__container-input_error');
    });
    Array.from(this._form.querySelectorAll('.popup__error')).forEach((item) => {
      item.classList.remove('popup__error_active');
    });
  }
}




    


