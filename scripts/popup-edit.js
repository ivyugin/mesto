
const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileJob = profile.querySelector('.profile__job');

//popup add image open from button click (popup.js)
const editPopup = {};

editPopup.editPopup = document.querySelector('.popup_edit');
editPopup.containerTitle = editPopup.editPopup.querySelector('.popup__container-input_type_title');
editPopup.containerSubtitle = editPopup.editPopup.querySelector('.popup__container-input_type_subtitle');
editPopup.saveBtn = editPopup.editPopup.querySelector('.popup__container-save-btn');

editPopup.closePopup = function () {
  editPopup.editPopup.classList.remove('popup_opened');
  body.classList.remove('body_disable-scroll');
  editPopup.removePopupCloseEvent();
};
editPopup.missClickClose = function (evt) {
    if (evt.target.classList.contains('popup_edit')) {
        editPopup.closePopup();
      }
  };
editPopup.onBtnClose = function () {
    editPopup.closePopup();
  };

editPopup.onEscClose = function (evt) {
      if (evt.key == 'Escape') {
        editPopup.closePopup();
      }
  };
editPopup.addPopupCloseEvent = function () {
    //esc
    document.addEventListener('keydown', editPopup.onEscClose);
    //missclick
    editPopup.editPopup.addEventListener('click', editPopup.missClickClose);
    //Close button
    editPopup.editPopup.querySelector('.popup__close-btn').addEventListener('click', editPopup.onBtnClose);
  };
editPopup.removePopupCloseEvent = function () {
    document.removeEventListener('keydown', editPopup.onEscClose);
    editPopup.editPopup.removeEventListener('click', editPopup.missClickClose);
    editPopup.editPopup.removeEventListener('click', editPopup.onBtnClose);
  };

editPopup.submit = function () {
  const formElement = editPopup.editPopup.querySelector('.popup__container');
  formElement.addEventListener('submit', function (evt) {

    evt.preventDefault();

    profileName.textContent = editPopup.containerTitle.value;
    profileJob.textContent = editPopup.containerSubtitle.value;
    

    editPopup.closePopup();
  });
}