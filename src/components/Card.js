export class Card {
  constructor(cardElement, data, handleCardClick, userId, api, handleDeleteIconClick) {
    this._cardElement = cardElement;
    this._link = data.link;
    this._title = data.name;
    this._likes = data.likes;
    this._idCard = data._id;
    this._ownerId = data.owner._id;
    this._handleCardClick = handleCardClick;
    this._userId = userId;
    this._api = api;
    this._handleDeleteIconClick = handleDeleteIconClick;
  }

  _getTemplate() {
    const cardElement = this._cardElement.content.cloneNode(true);
    return cardElement;
  }

  _handleDeleteCard(evt) {
    this._handleDeleteIconClick(this._idCard, evt)
  }

  _handleLike(evt) {
    if (evt.target.classList.contains('element__heart_black')) {
      this._api.removeLike(this._idCard)
      .then(res => {
        evt.target.classList.remove('element__heart_black')
        evt.target.nextElementSibling.textContent = res.likes.length
      })
      .catch((err) => {console.log(err)});
  } else {
      this._api.addLike(this._idCard)
      .then(res => {
        evt.target.classList.add('element__heart_black')
        evt.target.nextElementSibling.textContent = res.likes.length
      })
      .catch((err) => {console.log(err)});
    }
  }


  _setEventListeners() {
    const cardLikeButton = this._element.querySelector('.element__heart');
    const cardDeleteButton = this._element.querySelector('.element__delete');
    const cardImage = this._element.querySelector('.element__image');


    cardLikeButton.addEventListener('click', this._handleLike.bind(this))



    if (cardDeleteButton) {
      cardDeleteButton.addEventListener('click', this._handleDeleteCard.bind(this))
    }


    cardImage.addEventListener('click', () => this._handleCardClick(this._link, this._title));
  }

  generateCard = () => {
    this._element = this._getTemplate();
    if (this._ownerId !== this._userId) {this._element.getElementById("deleteButton").remove()}
    const elementImage = this._element.querySelector('.element__image')
    elementImage.src = this._link;
    this._element.querySelector('.element__title').textContent = this._title;
    elementImage.setAttribute('alt', this._title)
    this._element.querySelector('.element__count-likes').textContent = this._likes.length


    this._likes.forEach(element => {
      if (element._id == this._userId) {this._element.querySelector('.element__heart').classList.add('element__heart_black')}
    });

    this._setEventListeners()
    return this._element;
  }
}
