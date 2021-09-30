import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmitHandler) {
    super(popupSelector);
    this._form = this._popup.querySelector(".form");
    this._formSubmitHandler = formSubmitHandler;
  }

  _getInputValues() {
    const inputs = Array.from(this._form.querySelectorAll(".form__field"));
    const inputValues = {};
    inputs.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._formSubmitHandler(this._getInputValues());
    });
  }

  close() {
    super.close();
    const form = this._popup.querySelector(".form");
    form.reset();
  }
}