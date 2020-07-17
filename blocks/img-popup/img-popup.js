//CLOSE IMAGE POPUP
const imgPopup = document.querySelector('.img-popup');
const closeImgButton = imgPopup.querySelector('.img-popup__close-btn');

//BUTTON
closeImgButton.addEventListener('click', function () {
  imgPopup.classList.remove('img-popup_opened');

  //enable scroll
  body.classList.remove('body_disable-scroll');
   });

//missclick
imgPopup.addEventListener('click', function (e) {
  if (e.target.classList.contains('img-popup')) {
    imgPopup.classList.remove('img-popup_opened');

    //enable scroll
    body.classList.remove('body_disable-scroll');
  }
})