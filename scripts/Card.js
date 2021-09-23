export class Card {
  constructor(title, link, {
    handleCardClick
  }) {
    this._title = title
    this._link = link
    this._handleCardClick = handleCardClick
  }

  _getTemplate() {
    const placeElement = document.
    querySelector("#element-template").
    content.
    querySelector('.elements__item').
    cloneNode(true);

    return placeElement
  }

  _addLikeButton(placeElement) {
    const likeButton = placeElement.querySelector(".elements__like-btn")
    likeButton.addEventListener("click", function (e) {
      likeButton.classList.toggle("elements__like-btn_active");
    })
  }

  _addDeleteButton(placeElement) {
    placeElement.querySelector(".elements__delete-btn").addEventListener("click", function (e) {
      placeElement.remove()
    })
  }

  _addImage(placeElement, imgLink, imgTitle) {
    const popupPhoto = document.getElementById("photo_popup");
    const photoTitle = popupPhoto.querySelector(".popup__photo-title");
    const photoImage = popupPhoto.querySelector(".popup__place-image");
    placeElement.querySelector(".elements__img").addEventListener("click", () => {
      photoTitle.textContent = imgTitle;
      photoImage.src = imgLink;
      photoImage.alt = "photo of " + imgTitle;
      this._handleCardClick()
    })
  }

  generateCard() {
    this._element = this._getTemplate()
    this._element.querySelector(".elements__title").textContent = this._title;
    this._element.querySelector(".elements__img").src = this._link;
    this._addLikeButton(this._element)
    this._addDeleteButton(this._element)
    this._addImage(this._element, this._link, this._title)
    return this._element
  }
}