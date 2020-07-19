//popup add image open from button click (popup.js)
const addPopup = {};
addPopup.addPopup = document.querySelector('.popup_add');

addPopup.containerTitle = addPopup.addPopup.querySelector('.popup__container-input_type_title');
addPopup.containerSubtitle = addPopup.addPopup.querySelector('.popup__container-input_type_subtitle');
addPopup.saveBtn = addPopup.addPopup.querySelector('.popup__container-save-btn');

addPopup.closePopup = function () {
  addPopup.addPopup.classList.remove('popup_opened');
  body.classList.remove('body_disable-scroll');
  addPopup.removePopupCloseEvent();
};
addPopup.missClickClose = function (evt) {
    if (evt.target.classList.contains('popup_add')) {
        addPopup.closePopup();
      }
  };
addPopup.onBtnClose = function (evt) {
    addPopup.closePopup();
  };

addPopup.onEscClose = function (evt) {
      if (evt.key == 'Escape') {
        addPopup.closePopup();
      }
  };
addPopup.addPopupCloseEvent = function () {
    //esc
    document.onkeydown = addPopup.onEscClose;
    //missclick
    addPopup.addPopup.addEventListener('click', addPopup.missClickClose);
    //Close button
    addPopup.addPopup.querySelector('.popup__close-btn').addEventListener('click', addPopup.onBtnClose);
  };
addPopup.removePopupCloseEvent = function () {
    document.onkeydown = () => document.onkeydown = null;
    addPopup.addPopup.removeEventListener('click', addPopup.missClickClose);
    addPopup.addPopup.removeEventListener('click', addPopup.onBtnClose);
  };
addPopup.submit = function () {

  const formElement = addPopup.addPopup.querySelector('.popup__container');
  formElement.addEventListener('submit', function (evt) {

    evt.preventDefault();

    addImage(addPopup.containerTitle.value, addPopup.containerSubtitle.value);


    addPopup.closePopup();
  });
}