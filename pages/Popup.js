import { validationConfig } from './Constants.js';
import { FormValidator } from './FormValidator.js';

export class Popup {
  constructor(modalWindow) {
    this._modalWindow = modalWindow;
  }

  openModalWindow = () => {
    this._modalWindow.classList.add('modal_is-open');
    this.setEventListeners();
  }

  closeModalWindow = () => {
    document.removeEventListener('keyup', (evt) => {
      this._handleEscClose(evt)
    });

    const cancelValidation = new FormValidator(this._modalWindow,validationConfig);
    cancelValidation.resetValidationErrors();

    this._modalWindow.classList.remove('modal_is-open');
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this._modalWindow.classList.remove('modal_is-open');
      const cancelValidation = new FormValidator(this._modalWindow,validationConfig);
      cancelValidation.resetValidationErrors();
    };
  }

  setEventListeners() {
    //Закрытие при нажатии на Esc
    document.addEventListener('keyup', (evt) => {
      this._handleEscClose(evt)
    });

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
