import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._caption = this._popup.querySelector('.popup__photo-title');
    this._image = this._popup.querySelector('.popup__place-image');
  }

  open(name, link) {
    this._caption.textContent = name;
    this._image.src = link;
    super.open();
  }
}