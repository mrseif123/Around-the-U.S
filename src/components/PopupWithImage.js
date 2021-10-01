import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(name, link) {
    this._popup.querySelector(".popup__photo-title").textContent = name;
    this._popup.querySelector(".popup__place-image").src = link;
    this._popup.querySelector(".popup__place-image").alt = "photo of _" + name;
    super.open();
  }

  setEventListeners() {
    const closeButton = this._popup.querySelector(".popup__img-close-btn");
    closeButton.addEventListener("click", () => {
      this.close();
    });
  }
}