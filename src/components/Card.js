import { Api } from '../components/Api.js';

export class Card {
  constructor(cardElement, data, handleCardClick, userId) {
    this._cardElement = cardElement;
    this._link = data.link;
    this._title = data.name;
    this._likes = data.likes;
    this._id = data._id
    this._ownerId = data.owner._id
    this._handleCardClick = handleCardClick
    this._userId = userId
    this._api = new Api({
      address: 'https://mesto.nomoreparties.co/v1/cohort-19',
      token: '2a94bf63-3818-4ae4-afdc-14a08472aae2'
    });
  }

  _getTemplate() {
    const cardElement = this._cardElement.content.cloneNode(true);
    return cardElement;
  }


  _handleDeleteCard(evt) {
    console.log(evt)
    console.log(this._id)
    this._api.deleteCard(this._id)
    evt.target.closest('.element').remove();

  }



  _setEventListeners() {

    const cardLikeButton = this._element.querySelector('.element__heart');
    const cardDeleteButton = this._element.querySelector('.element__delete');
    const cardImage = this._element.querySelector('.element__image');

    cardLikeButton.addEventListener('click', () => {
      e.target.classList.toggle('element__heart_black');

    });

    // cardLikeButton.addEventListener('click', this._handleDeleteCard.bind(this));


    if (cardDeleteButton) {
      cardDeleteButton.addEventListener('click', this._handleDeleteCard.bind(this))
    }

    // if (cardDeleteButton) {
    //   cardDeleteButton.addEventListener('click', (e) => {
    //     e.target.closest('.element').remove();
    //     // this._api.deleteCard(this._picId)
    //   });
    // }

    cardImage.addEventListener('click', () => this._handleCardClick(this._link, this._title));
  }

  generateCard = () => {
    console.log('generateCard',this._ownerId)
    this._element = this._getTemplate();
    if (this._ownerId !== this._userId) {this._element.getElementById("deleteButton").remove()}
    const elementImage = this._element.querySelector('.element__image')
    elementImage.src = this._link;
    this._element.querySelector('.element__title').textContent = this._title;
    elementImage.setAttribute('alt', this._title)
    this._element.querySelector('.element__count-likes').textContent = this._likes.length

    this._setEventListeners()
    return this._element;
  }
}
