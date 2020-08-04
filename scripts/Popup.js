const body = document.querySelector('.body');

export default class Popup{
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
    this.escHandler = this._onEscClose.bind(this);
    document.addEventListener('keydown', this.escHandler);
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
    document.removeEventListener('keydown', this.escHandler);
    this._popup.removeEventListener('click', this._missClickClose);
    this._popup.removeEventListener('click', this._onBtnClose);
  };

  openPopup() {
    //disable scroll
    body.classList.add('body_disable-scroll');
    this._addPopupCloseEvent();
  }

}