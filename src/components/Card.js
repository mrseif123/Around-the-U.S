export default class Card {
  constructor({
    card,
    handleCardClick
  }, templateSelector) {
    this._name = card.name;
    this._link = card.link;
    this._openPopup = handleCardClick;
    this._templateSelector = templateSelector;
  }

  _deletePlace(e) {
    e.target.parentElement.remove();
  }

  _toggleLike(e) {
    e.target.classList.toggle("elements__like-btn_active");
  }

  _setEventListeners() {
    this._deleteButton = this._newPlace.querySelector(".elements__delete-btn");
    this._deleteButton.addEventListener("click", (e) => {
      this._deletePlace(e);
    });

    this._likeButton = this._newPlace.querySelector(".elements__like-btn");
    this._likeButton.addEventListener("click", (e) => {
      this._toggleLike(e);
    });

    this._placeImage = this._newPlace.querySelector(".elements__img");
    this._placeImage.addEventListener("click", () => {
      this._openPopup(this._name, this._link);
    });
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".elements__item")
      .cloneNode(true);
    return cardElement;
  }

  createCard() {
    this._newPlace = this._getTemplate();
    this._setEventListeners();
    this._newPlace.querySelector(".elements__title").textContent = this._name;
    this._placeImage.src = this._link;
    this._placeImage.alt = `${this._name}`;
    return this._newPlace;
  }
}