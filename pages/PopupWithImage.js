import { Popup } from './Popup.js';

export class PopupWithImage extends Popup{

  constructor(modalWindow, e) {
    super(modalWindow);
    this._e = e;
  }

  openModalWindow = () => {
    this.setEventListeners();
    this._modalWindow.querySelector('img').src =this._e.target.src;
    this._modalWindow.querySelector('h3').textContent = this._e.target.closest('.element').querySelector('.element__title').textContent;
    this._modalWindow.classList.add('modal_is-open');
  }

}
