import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._caption = this._popup.querySelector('.popup__photo-title');
    this._image = this._popup.querySelector('.popup__place-image');
  }

  setEventListeners() {
    const closeButton = this._popup.querySelector(".popup__img-close-btn");
    closeButton.addEventListener("click", () => {
      this.close();
    });
  }

  open(name, link) {
    this._caption.textContent = name;
    this._image.src = link;
    this._image.alt = `photo of ${name}`
    super.open();
  }
}