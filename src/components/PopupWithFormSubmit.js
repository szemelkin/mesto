import { Popup } from './Popup.js';

export class PopupWithFormSubmit extends Popup {
  constructor(modalWindow) {
    super(modalWindow);
  }

  setSubmitAction({action}) {
    this._handleSubmitCallback = action
  }

  setEventListeners() {
    super.setEventListeners()
    this._modalWindow.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmitCallback()
    });

  }
}
