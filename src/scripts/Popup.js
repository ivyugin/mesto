const body = document.querySelector('.body');

export default class Popup{
  constructor(popupElements) {
    this._popupClass = popupElements.popupClass;
    this._popupSelector = popupElements.popupSelector;
    this._closeBtnSelector = popupElements.closeBtnSelector;
    this._popup = document.querySelector(this._popupSelector);
    this.setEventListeners();
  }

  close() {
    body.classList.remove('body_disable-scroll');
    this._removePopupCloseEvent();
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
      if (evt.key == 'Escape') {
        this.close();
      }
  };
  setEventListeners() {
    //esc
    this.escHandler = this._handleEscClose.bind(this);
    document.addEventListener('keydown', this.escHandler);
    //missclick
    this.missClcHandler = this._missClickClose.bind(this);
    this._popup.addEventListener('click', this.missClcHandler);
    //Close button
    this._popup.querySelector(this._closeBtnSelector)
    .addEventListener('click', () => {
      this._onBtnClose();
    });
    //submit
  }


  _removePopupCloseEvent() {
    document.removeEventListener('keydown', this.escHandler);
    this._popup.removeEventListener('click', this.missClcHandler);
    this._popup.removeEventListener('click', this._onBtnClose);

  };

  open() {
    //disable scroll
    body.classList.add('body_disable-scroll');

    //this.setEventListeners();
  }

}