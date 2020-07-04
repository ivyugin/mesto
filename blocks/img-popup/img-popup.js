//CLOSE IMAGE POPUP
const imgPopup = document.querySelector('.img-popup');
const closeImgButton = imgPopup.querySelector('.img-popup__close-btn')

//BUTTON
closeImgButton.addEventListener('click', function () {
  imgPopup.classList.remove('img-popup_opened');

  //enable scroll
  document.body.style.overflow = 'auto';
   });

//ESC
document.onkeydown = function(evt) {
    evt = evt || window.event;
    if (evt.keyCode == 27) {
        imgPopup.classList.remove('img-popup_opened');
        //enable scroll
        document.body.style.overflow = 'auto';
    }
};