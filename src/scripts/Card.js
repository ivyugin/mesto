export default class Card {
  constructor ({cardInfo, ownerId, openPopup, template, openSubmitToDelete, likeCard}) {
    this._cardInfo = cardInfo;
    this._ownerId = ownerId;
    this._openPopup = openPopup;
    this._placeTemplate = this._getTemplate(template);
    this._placeImage = this._placeTemplate.querySelector('.place__image'); 
    this._openSubmitToDelete = openSubmitToDelete;
    this._likeCard = likeCard;
    this._isLiked = false;
    this._userArray = this._cardInfo.likes.map((user) => {
        return user._id;
      })
  }

  _getTemplate(template) {
    return document.querySelector(template).content.cloneNode(true);
  }

  createImgCard() {
    this._placeImage.src = this._cardInfo.link;
    this._placeImage.alt = this._cardInfo.name;
    this._placeTemplate.querySelector('.place__title').textContent = this._cardInfo.name;
    this._placeTemplate.querySelector('.place__like-count').textContent = this._cardInfo.likes.length;

    if (this._userArray.includes(this._ownerId)) {
      this._placeTemplate.querySelector('.place__like-btn').classList.add('place__like-btn_cheked');
      this._isLiked = true;
    } 
      

    if(this._cardInfo.owner._id === this._ownerId) {
      this._placeTemplate.querySelector('.place__delete-btn').classList.add('place__delete-btn_active');
      this._eventListenerDelete();
    }
    
    //Set event listeners
    this._eventListenerOpen();
    this._evenListenerLike();

    return this._placeTemplate;
  }

//OPEN IMAGE
  _eventListenerOpen() {
    this._placeImage.addEventListener('click', () => {

      this._openPopup(this._cardInfo.link, this._cardInfo.name);
    });
  }

//LIKE BUTTON
  _evenListenerLike() {
    this._placeTemplate.querySelector('.place__like-btn').addEventListener('click', (evt) => {

      if (this._isLiked) 
      {
        evt.target.classList.add('place__like-btn_cheked');
        //evt.target.parentElement.querySelector('.place__like-count').textContent = 1;
        this._likeCard(this._cardInfo._id, 'DELETE', evt.target);
        this._isLiked = false;
      } 
      else 
      {
        evt.target.classList.remove('place__like-btn_cheked');
        this._likeCard(this._cardInfo._id, 'PUT', evt.target);
        this._isLiked = true;
      }


      evt.target.classList.toggle('place__like-btn_cheked');
    });
  }

//DELETE BUTTON
  _eventListenerDelete() {
    this._placeTemplate.querySelector('.place__delete-btn').addEventListener('click', (evt) => {
      this._openSubmitToDelete(evt.target.parentElement);
    });
  }

}