import { Api } from '../components/Api.js';
import { object } from '../components/Constants.js';

export class Card {
  constructor(cardElement, data, handleCardClick, userId) {
    this._cardElement = cardElement;
    this._link = data.link;
    this._title = data.name;
    this._likes = data.likes;
    this._idCard = data._id;
    this._ownerId = data.owner._id;
    this._handleCardClick = handleCardClick;
    this._userId = userId;
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
    console.log(object.actionConfirmation)
    object.actionConfirmation.classList.add('modal_is-open')
    console.log(object.actionConfirmation.querySelector('.modal__btn-save-confirmation'))
    object.actionConfirmation.addEventListener('submit', (event) => {
      event.preventDefault(event);
      this._api.deleteCard(this._idCard).catch((err) => {console.log(err)});
      evt.target.closest('.element').remove();
      object.actionConfirmation.classList.remove('modal_is-open')
    })
  }

  _handleLike(evt) {
    if (evt.target.classList.contains('element__heart_black')) {
      this._api.removeLike(this._idCard).catch((err) => {console.log(err)});
      evt.target.classList.remove('element__heart_black')
      evt.target.nextElementSibling.textContent = parseInt(evt.target.nextElementSibling.textContent)-1
    } else {
      this._api.addLike(this._idCard).catch((err) => {console.log(err)});
      evt.target.classList.add('element__heart_black')
      evt.target.nextElementSibling.textContent = parseInt(evt.target.nextElementSibling.textContent)+1
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
