const body = document.querySelector('.body');

export default class Popup{
  constructor(popupElements) {
    this._popupClass = popupElements.popupClass;
    this._popupSelector = popupElements.popupSelector;
    this._closeBtnSelector = popupElements.closeBtnSelector;
    this._popup = document.querySelector(this._popupSelector);
    this.escHandler = this._handleEscClose.bind(this);
    this.missClcHandler = this._missClickClose.bind(this);
  }

  close() {
    document.removeEventListener('keydown', this.escHandler);
    body.classList.remove('body_disable-scroll');
    this._popup.classList.remove('popup_opened');
    //this._removePopupCloseEvent();
  };

  _missClickClose(evt) {
    if (evt.target.classList.contains(this._popupClass)) {
        this.close();
      }
    };
  _onBtnClose() {
    this.close();
  };

  _handleEscClose(evt) {
      if (evt.key === 'Escape') {
        this.close();
      }
  };
  setEventListeners() {
    //missclick
    this._popup.addEventListener('click', this.missClcHandler);
    //Close button
    this._popup.querySelector(this._closeBtnSelector)
    .addEventListener('click', () => {
      this._onBtnClose();
    });
    //submit
  }


  _removePopupCloseEvent() {
    this._popup.removeEventListener('click', this.missClcHandler);
    this._popup.removeEventListener('click', this._onBtnClose);

  };

  open() {
    //esc
    document.addEventListener('keydown', this.escHandler);
    //disable scroll
    body.classList.add('body_disable-scroll');
    this._popup.classList.add('popup_opened');
    //this.setEventListeners();
  }

}