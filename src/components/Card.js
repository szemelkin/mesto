// import {openModalWindow} from './Utils.js';
import { Popup } from './Popup.js'
import { PopupWithImage } from './PopupWithImage.js'
import { object, validationConfig } from './Constants.js';

export class Card {
  constructor(cardElement, data, handleCardClick) {
    this._cardElement = cardElement;
    this._link = data.link;
    this._title = data.name;
    this._handleCardClick = handleCardClick
  }

  _getTemplate() {
    const cardElement = this._cardElement.content.cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {

    const cardLikeButton = this._element.querySelector('.element__heart');
    const cardDeleteButton = this._element.querySelector('.element__delete');
    const cardImage = this._element.querySelector('.element__image');

    cardLikeButton.addEventListener('click', (e) => {
      e.target.classList.toggle('element__heart_black');
    });

    cardDeleteButton.addEventListener('click', (e) => {
      e.target.closest('.element').remove();
    });

    cardImage.addEventListener('click', () => this._handleCardClick(object.imageShowModal, this._link, this._title));

  }

  generateCard = () => {

    this._element = this._getTemplate();
    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__title').textContent = this._title;
    this._element.querySelector('.element__image').setAttribute('alt', this._title)

    this._setEventListeners()
    return this._element;
  }
}
