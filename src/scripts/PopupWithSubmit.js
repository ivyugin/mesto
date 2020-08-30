import Popup from './Popup.js';

export default class PopupWithSubmit extends Popup {
    constructor({popupElements, submit}) {
        super(popupElements);
        this._submit = submit;
        super.setEventListeners();
    }

    setEventListeners() {
        //submit
        const formElement = this._popup.querySelector('.popup__container');
  
        this.submitHandler =
        formElement.addEventListener('submit', (evt) => {
          evt.preventDefault();
          this._submit();
        });
      }
}