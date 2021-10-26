export default class Card {
  constructor({
    card,
    handleCardClick,
    handleDeleteClick,
    userData,
    handleLikeCard,
    templateSelector
  }) {

    this._name = card.name;
    this._link = card.link;
    this._likes = card.likes;
    this._timesLiked = card.likes.length;
    this._id = card._id;
    this._creatorName = card.owner.name;
    this._creatorId = card.owner._id;
    this._user = userData.id;
    this._openPopup = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._templateSelector = templateSelector;
    this._handleLikeCard = handleLikeCard;
  }

  _checkIfLiked = () => this._likes.some(like => like._id === this._user)

  _toggleLike(evt) {
    this._handleLikeCard(!this._checkIfLiked())
  }

  updateLikes(likes) {
    this._likes = likes;
    this._renderLikes()
  }

  _setEventListeners() {
    this._deleteButton = this._newPlace.querySelector(".elements__delete-btn");
    if (this._creatorId !== this._user) {
      this._deleteButton.remove();
    } else {
      this._deleteButton.addEventListener('click', evt => {
        this._handleDeleteClick(evt, this._id);
      });
    }
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

  _renderLikes() {
    this._newPlace.querySelector('.elements__likes').textContent = this._likes.length;
    if (this._checkIfLiked()) {
      this._newPlace.querySelector('.elements__like-btn').classList.add('elements__like-btn_active');
    } else if (!this._checkIfLiked()) {
      this._newPlace.querySelector('.elements__like-btn').classList.remove('elements__like-btn_active');
    }
  }

  createCard() {
    this._newPlace = this._getTemplate();
    this._setEventListeners();
    this._newPlace.querySelector(".elements__title").textContent = this._name;
    this._placeImage.src = this._link;
    this._placeImage.alt = this._name;
    this._renderLikes();
    return this._newPlace;
  }
}