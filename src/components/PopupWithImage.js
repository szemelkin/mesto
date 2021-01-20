import { Popup } from './Popup.js';

export class PopupWithImage extends Popup{

  constructor(modalWindow) {
    super(modalWindow);
    this._popupCardImage = this._modalWindow.querySelector('.modal__image')
    this._captionImage = this._modalWindow.querySelector('.modal__title-image')
  }

  openModalWindow(url, title) {
    super.openModalWindow();
    this._popupCardImage.src = url  ;
    this._captionImage.textContent = title ;
  }

}
