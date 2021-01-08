import { object, validationConfig } from './Constants.js';
import { FormValidator } from './FormValidator.js';
import { Popup } from './Popup.js';

export class PopupWithForm extends Popup{
  constructor(modalWindow, {callback}) {
    super(modalWindow);
    this._callback = callback;
    this._count = 0;
  }

  closeModalWindow = () => {
    document.removeEventListener('keyup', (evt) => {
      this._handleEscClose(evt)
    });

    const cancelValidation = new FormValidator(this._modalWindow,validationConfig);
    cancelValidation.resetValidationErrors();
    this._modalWindow.classList.remove('modal_is-open');
    this._modalWindow.querySelector('.modal__form').reset();

  }

  _getInputValues() {
    // достаём все элементы полей
    this._inputList = this._modalWindow.querySelectorAll('.modal__input');
    // создаём пустой объект
    this._formValues = {};
    // добавляем в этот объект значения всех полей
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    // возвращаем объект значений
    return this._formValues;
  }

  // //________________________________________________________________

  //Обработка при нажатии кнопки Submit
  submitHandler() {
    this._modalWindow.addEventListener('submit', (evt) => {
      evt.preventDefault(evt);
      this._callback(this._getInputValues());
      this.closeModalWindow();
    })
  }




}

