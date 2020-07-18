//VALIDATION FORM

function showInputError (pref, form, input, validationMessage) {
  input.classList.add(pref.inputErrorClass);
  const errorElement = input.parentElement.querySelector(pref.formErrorSelector);
  errorElement.textContent = validationMessage;
  errorElement.classList.add(pref.errorClass);
}

function hideInputError (pref, form, input) {
  input.classList.remove(pref.inputErrorClass);
  const errorElement = input.parentElement.querySelector(pref.formErrorSelector);
  errorElement.classList.remove(pref.errorClass);
}

function isValid  (pref, form, input)  {
  if (input.validity.valid) {
    hideInputError(pref, form, input);
  } else {
    showInputError(pref, form, input, input.validationMessage);
  }
}

function hasInvalidInput (inputList) {
  return inputList.some( (input) => {
    return !input.validity.valid;
  })
}

function toggleButtonState (pref, inputList, button) {
  if (hasInvalidInput(inputList)) {
    button.classList.add(pref.inactiveButtonClass);
    button.disabled = true;
  } else {
    button.classList.remove(pref.inactiveButtonClass);
    button.disabled = false;
  }
}

function setEventListeners (pref, form) {
  const inputList = Array.from(form.querySelectorAll(pref.inputSelector));
  const submitBtn = form.querySelector(pref.submitButtonSelector);
  toggleButtonState(pref, inputList, submitBtn);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(pref, form, inputElement);
      toggleButtonState(pref, inputList, submitBtn);
    })
  })
}

function enableValidation (pref) {
  const form = popup.querySelector(pref.formSelector);
  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
  });
  setEventListeners(pref, form);
}

const pref = {
      formSelector: '.popup__container',
      inputSelector: '.popup__container-input',
      submitButtonSelector: '.popup__container-save-btn',
      inactiveButtonClass: 'popup__container-save-btn_inactive',
      inputErrorClass: 'popup__container-input_error',
      formErrorSelector: '.popup__error',
      errorClass: 'popup__error_active'
    };

enableValidation(pref);



    


