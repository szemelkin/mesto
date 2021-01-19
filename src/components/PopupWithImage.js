import { Popup } from './Popup.js';

export class PopupWithImage extends Popup{

  constructor(modalWindow) {
    super(modalWindow);
  }

  openModalWindow(url, title) {
    super.openModalWindow();
    this._modalWindow.querySelector('.modal__image').src = url  ;
    this._modalWindow.querySelector('.modal__title-image').textContent = title ;
  }

}
