import { Popup } from './Popup.js';

export class PopupWithImage extends Popup{

  // constructor(modalWindow, e) {
  //   super(modalWindow);
  //   this._e = e;
  // }

  // openModalWindow = () => {
  //   this.setEventListeners();
  //   this._modalWindow.querySelector('img').src =this._e.target.src;
  //   this._modalWindow.querySelector('h3').textContent = this._e.target.closest('.element').querySelector('.element__title').textContent;
  //   this._modalWindow.classList.add('modal_is-open');
  // }

  constructor(modalWindow, url, title) {
    // console.log(modalWindow, url, title)
    super(modalWindow);
    this._url = url;
    this._title = title;
  }

  openModalWindow() {
    super.openModalWindow();
    this._modalWindow.querySelector('img').src =this._url;
    this._modalWindow.querySelector('h3').textContent = this._title;
  }

}
