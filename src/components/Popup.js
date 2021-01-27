export class Popup {
  constructor(modalWindow) {
    this._modalWindow = modalWindow;
  }

  openModalWindow() {
    this._modalWindow.classList.add('modal_is-open');
      //   //Закрытие при нажатии на Esc
    document.addEventListener('keyup', this._handleEscClose)
  }

  closeModalWindow() {
    this._modalWindow.classList.remove('modal_is-open');
    document.removeEventListener('keyup', this._handleEscClose);
  }

  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.closeModalWindow();
    };
  }




  setEventListeners() {


    //Закрытие при клике в любом месте
    document.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('modal_is-open')) {
        this.closeModalWindow();
      };
    });

    //Закрытие при нажатии на крестик
    this._modalWindow.querySelector('.modal__close-button').addEventListener('click', () => {
      this.closeModalWindow();
    });
  }

}
