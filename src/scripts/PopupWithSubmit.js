import Popup from './Popup.js';

export default class PopupWithSubmit extends Popup {
    constructor({popupElements, submit}) {
        super(popupElements);
        this._submit = submit;
    }

    setEventListeners() {
        //submit
        const formElement = this._popup.querySelector('.popup__container');
  
        this.submitHandler =
        formElement.addEventListener('submit', (evt) => {
          evt.preventDefault();
          this._submit();
          this.close();
        });
      }

    open() {
        super.open();
        super.setEventListeners();
        this._popup.classList.add('popup_opened');
    }

    close() {
        this._popup.classList.remove('popup_opened');
        super.close();
      };
}