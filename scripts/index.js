const editButton = profile.querySelector('.profile__edit-btn');
const addButton = profile.querySelector('.profile__add-btn');

// OPEN

//EDIT PROFILE
editButton.addEventListener('click', function () { 

    editPopup.addPopupCloseEvent();

    //disable scroll
    body.classList.add('body_disable-scroll');

    //customization popup
    editPopup.containerTitle.value = profileName.textContent;
    editPopup.containerSubtitle.value = profileJob.textContent;

    //prepare popup window: no errors, active button
    Array.from(editPopup.editPopup.querySelectorAll('.popup__container-input')).forEach((item) => {
      item.classList.remove('popup__container-input_error');
    });
    Array.from(editPopup.editPopup.querySelectorAll('.popup__error')).forEach((item) => {
      item.classList.remove('popup__error_active');
    });
    editPopup.saveBtn.classList.remove('popup__container-save-btn_inactive');
    editPopup.saveBtn.disabled = false;

    //open
    editPopup.editPopup.classList.add('popup_opened');
    editPopup.submit();
  });

//ADD IMAGE
addButton.addEventListener('click', function () { 
    //disable scroll
    body.classList.add('body_disable-scroll');

    addPopup.addPopupCloseEvent();

    //customization popup
    addPopup.containerTitle.value = '';
    addPopup.containerSubtitle.value = '';

    //prepare popup window: no errors, disable button
    Array.from(addPopup.addPopup.querySelectorAll('.popup__container-input')).forEach((item) => {
      item.classList.remove('popup__container-input_error');
    });
    Array.from(addPopup.addPopup.querySelectorAll('.popup__error')).forEach((item) => {
      item.classList.remove('popup__error_active');
    });
    addPopup.saveBtn.classList.add('popup__container-save-btn_inactive');
    addPopup.saveBtn.disabled = true;

    //open
    addPopup.addPopup.classList.add('popup_opened');

    addPopup.submit();
  });