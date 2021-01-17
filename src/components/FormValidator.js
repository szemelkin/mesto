export class FormValidator{

  constructor(formElement, parameters) {
    this._formElement = formElement;
    this._formSelector = parameters.formSelector;
    this._inputSelector = parameters.inputSelector;
    this._inputValidClass = parameters.inputValidClass;
    this._inputErrorClass =parameters.inputErrorClass;
    this._submitButtonSelector = parameters.submitButtonSelector;
    this._inactiveButtonClass = parameters.inactiveButtonClass;
    this._activeButtonClass = parameters.activeButtonClass;
    this._errorClass = parameters.errorClass;
    this._inputs = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._buttonSubmit = this._formElement.querySelector(this._submitButtonSelector);
  }


  _handleInputs() {
    this._inputs.forEach(inputElement=>{
      inputElement.addEventListener('input',()=>{
        this._handleButtonValidation(inputElement);
        this._handleInputValidation(inputElement);
      });
    });
  }


  _handleButtonValidation() {
    const isFormValid = this._inputs.some((inputElement) => !inputElement.validity.valid);
      if (!isFormValid) {
        this._buttonSubmit.classList.add(this._activeButtonClass);
        this._buttonSubmit.classList.remove(this._inactiveButtonClass);
        this._buttonSubmit.disabled = false;
      } else {
        this._buttonSubmit.classList.remove(this._activeButtonClass);
        this._buttonSubmit.classList.add(this._inactiveButtonClass);
        this._makeSubmitDisabled
        // this._buttonSubmit.disabled = true;
      }
  }

  // //Проверим правильность инпутов
  _handleInputValidation(inputElement) {
    this._errorElement = this._formElement.querySelector(`#${inputElement.name}-error`);
    if (inputElement.validity.valid) {
      this._hideInputError(inputElement)
    } else {
      this._showInputError(inputElement)
    }
  };

  _showInputError(inputElement) {
    inputElement.classList.remove(this._inputValidClass);
    inputElement.classList.add(this._inputErrorClass);
    this._errorElement.textContent = inputElement.validationMessage;
    this._errorElement.classList.add(this._errorClass);
  };

  _hideInputError(inputElement) {
    this._errorElement = this._formElement.querySelector(`#${inputElement.name}-error`);
    inputElement.classList.remove(this._inputValidClass);
    inputElement.classList.remove(this._inputErrorClass);
    this._errorElement.textContent = '';
    this._errorElement.classList.remove(this._errorClass);
  };

  resetValidationErrors() {
    this._inputs.forEach((inputElement) => {
    this._hideInputError(inputElement);
    });
  };

  // Делаем активной кнопку Submit
  makeSubmitDisabled () {
    this._buttonSubmit.disabled = true;
    this._buttonSubmit.classList.add('modal__btn-disabled');
  }


  enableValidation () {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._handleInputs()
  }

}
