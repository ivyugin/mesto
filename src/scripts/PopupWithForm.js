import Popup from './Popup.js';
import UserInfo from './UserInfo.js';

export default class PopupWithForm extends Popup{
    constructor({popupElements, submit}) {
      super(popupElements);
      
      this._submit = submit;

      this._userInfo = new UserInfo ('.profile__name', '.profile__job');

      this._title = this._popup.querySelector('.popup__container-input_type_title');
      this._subtitle = this._popup.querySelector('.popup__container-input_type_subtitle');
      this._saveBtn = this._popup.querySelector('.popup__container-save-btn');
    }

    _getInputValues() {
      return {title: this._popup.querySelector('.popup__container-input_type_title'), subtitle: this._popup.querySelector('.popup__container-input_type_subtitle')}
    }

    setEventListeners() {
      super.setEventListeners();

      //submit
      const formElement = this._popup.querySelector('.popup__container');

      formElement.addEventListener('submit', (evt) => {
  
        evt.preventDefault();
        
        this._submit(this._title.value, this._subtitle.value);
        
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

      if (this._popupClass == 'popup_edit') {

        const userInfo = this._userInfo.getUserInfo();
        this._title.value = userInfo.title;
        this._subtitle.value = userInfo.subtitle;
    
        this._saveBtn.classList.remove('popup__container-save-btn_inactive');
        this._saveBtn.disabled = false;
      } else {
        this._title.value = '';
        this._subtitle.value = '';
        this._saveBtn.classList.add('popup__container-save-btn_inactive');
        this._saveBtn.disabled = true;
      }
  
      //open
      this._popup.classList.add('popup_opened');
    };
  } //class: EditPopup