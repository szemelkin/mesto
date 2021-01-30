import { Popup } from './Popup.js';

export class PopupWithForm extends Popup{
  constructor(modalWindow, {callback}) {
    super(modalWindow);
    this._callback = callback;
    this._resetForm = this._modalWindow.querySelector('.modal__form');
  }

  closeModalWindow() {
    super.closeModalWindow();
    this._resetForm.reset()
  }


  _getInputValues() {
    // достаём все элементы полей
    this._inputList = this._modalWindow.querySelectorAll('.modal__input');
    // создаём пустой объект
    this._formValues = {};
    // добавляем в этот объект значения всех полей
    this._inputList.forEach(input => {
      if (input.name == 'modal__input-title') {this._formValues.name = input.value}
      else if (input.name == 'modal__input-url') {this._formValues.link = input.value}
      else if (input.name == 'modal__input-avatar') {this._formValues.link = input.value}
      else if (input.name == 'modal__input-name') {this._formValues.name = input.value}
      else if (input.name == 'modal__input-status') {this._formValues.about = input.value}
      else {this._formValues[input.name] = input.value}
    });

    return this._formValues;
  }

  // //________________________________________________________________

  //Обработка при нажатии кнопки Submit
  setEventListeners() {
    this._modalWindow.addEventListener('submit', (evt) => {
      evt.preventDefault(evt);
      this._callback(this._getInputValues());
      this.closeModalWindow();
    })

    super.setEventListeners();
  }




}

