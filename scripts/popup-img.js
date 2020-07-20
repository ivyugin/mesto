//image-popup open from place card (places.js)
const imagePopup = {};
imagePopup.imgPopup = document.querySelector('.img-popup');

imagePopup.closePopupImg = function () {
  imagePopup.imgPopup.classList.remove('img-popup_opened');
  body.classList.remove('body_disable-scroll');
  imagePopup.removePopupCloseEvent();
};
imagePopup.missClickClose = function (evt) {
    if (evt.target.classList.contains('img-popup')) {
        imagePopup.closePopupImg();
      }
  };
imagePopup.onBtnClose = function (evt) {
    imagePopup.closePopupImg();
  };

imagePopup.onEscClose = function (evt) {
      if (evt.key == 'Escape') {
        imagePopup.closePopupImg();
      }
  };
imagePopup.addPopupCloseEvent = function () {
    //esc
    document.addEventListener('keydown', imagePopup.onEscClose);
    //missclick
    imagePopup.imgPopup.addEventListener('click', imagePopup.missClickClose);
    //Close button
    imagePopup.imgPopup.querySelector('.img-popup__close-btn').addEventListener('click', imagePopup.onBtnClose);
  };
imagePopup.removePopupCloseEvent = function () {
    document.removeEventListener('keydown', imagePopup.onEscClose);
    imagePopup.imgPopup.removeEventListener('click', imagePopup.missClickClose);
    imagePopup.imgPopup.removeEventListener('click', imagePopup.onBtnClose);
  };


