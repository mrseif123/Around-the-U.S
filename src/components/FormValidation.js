export default class FormValidation {
  constructor(settings, formElement) {
    this._input = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButton = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._form = formElement;
    this._submitButton = this._form.querySelector(this._submitButtonSelector);
    this._inputList = Array.from(formElement.querySelectorAll(this._input));
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(this._errorClass);
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _setEventListeners() {
    this.toggleButtonState();

    this._inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this.toggleButtonState();
      });
    });
  }

  _hasInvalidInput(inputList) {
    return inputList.some((input) => !input.validity.valid);
  }

  toggleButtonState() {
    if (this._hasInvalidInput(this._inputList)) {
      this._submitButton.classList.add(this._inactiveButton);
      this._submitButton.disabled = true;
    } else {
      this._submitButton.classList.remove(this._inactiveButton);
      this._submitButton.disabled = false;
    }
  }

  enableValidation() {
    this._form.addEventListener('submit', e => {
      e.preventDefault();
    });
    this._setEventListeners();
  }
}