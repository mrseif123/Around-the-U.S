import {
  FormValidation,
} from "./FormValidation.js";

import {
  Card
} from "./Card.js"

const myValidator = new FormValidation()
const container = document.querySelectorAll('#body');

const profileContent = document.querySelector('.profile');
const profileEditBtn = profileContent.querySelector('.profile__edit-btn');
const profileText = profileContent.querySelector('.profile__info');
const profileName = profileText.querySelector('.profile__name');
const profileSubtitle = profileText.querySelector('.profile__subtitle');
const addPlaceBtn = profileContent.querySelector('.profile__add-btn');

const addCardFrom = document.getElementById("add_popup")

const formNameInput = document.getElementById("fullName")
const formAboutInput = document.getElementById("about")
const formName = document.getElementById("fullName")
const formAbout = document.getElementById("about")

const profileForm = document.getElementById("form_popup")
const profileEditCloseBtn = profileForm.querySelector('.form__close-btn');
const editProfileSubmitBtn = document.getElementById("form__profile-submit-button")

const elementTemplate = document.querySelector("#element-template").content;

const addElementSubmitBtn = document.getElementById("form__place-submit-button")
const addPlaceCloseBtn = document.getElementById('close_button_add');

const popupPhoto = document.getElementById("photo_popup");
const photoTitle = popupPhoto.querySelector(".popup__photo-title");
const photoImage = popupPhoto.querySelector(".popup__place-image");

const elementsContent = document.querySelector('.elements')
const elementsList = elementsContent.querySelector('.elements__list')
const elementItem = elementsContent.querySelector('.elements__item')
const likeButton = elementsContent.querySelector('.elements__like-btn')
const closePlacePopup = document.querySelector('.popup__img-close-btn');
const popups = document.querySelectorAll(".popup")

const inputListProfile = Array.from(profileForm.querySelectorAll(".form__field"));
const buttonElementProfile = profileForm.querySelector(".form__submit-btn")

const inputListAdd = Array.from(addCardFrom
  .querySelectorAll(".form__field"))
const buttonElementAdd = addCardFrom.querySelector(".form__submit-btn")

const titleAdd = document.getElementById("title");
const linkAdd = document.getElementById("link");

const containersClasses = ["add-container", "form-container", "photo-container"]
const popupsObjects = [profileForm, addCardFrom, popupPhoto]

initialCards.forEach(card => addElement(card.name, card.link))

function openModal(element) {
  element.classList.add("popup_visible");
  element.addEventListener("click", mouseHandler);
  document.addEventListener("keyup", keyHandler);
}

function closeModal(element) {
  element.removeEventListener("click", mouseHandler);
  document.removeEventListener("keyup", keyHandler);
  element.classList.remove("popup_visible");
}


profileEditBtn.addEventListener("click", function () {
  formNameInput.value = profileName.textContent
  formAboutInput.value = profileSubtitle.textContent
  myValidator.toggleButtonState(inputListProfile, buttonElementProfile)
  openProfileForm();
})

profileEditCloseBtn.addEventListener("click", function () {
  closeProfileForm();
})

profileForm.addEventListener("submit", function (event) {
  event.preventDefault()
  profileName.textContent = formName.value
  profileSubtitle.textContent = formAbout.value
  closeProfileForm();
})

addPlaceBtn.addEventListener("click", function () {
  openAddCardForm();
  myValidator.toggleButtonState(inputListAdd, buttonElementAdd)
})

addPlaceCloseBtn.addEventListener("click", function () {
  titleAdd.value = "";
  linkAdd.value = "";
  closeAddCardForm();
})

addCardFrom.addEventListener("submit", function (event) {
  event.preventDefault()
  addElement(title.value, link.value);
  titleAdd.value = ""
  linkAdd.value = ""
  closeAddCardForm();
})

closePlacePopup.addEventListener("click", function () {
  closePopupPhoto()
})

function createCard(titleValue, linkValue) {
  const newCard = new Card(titleValue, linkValue)
  return newCard.generateCard()
}

function addElement(titleValue, linkValue) {
  elementsList.prepend(createCard(titleValue, linkValue))
}

function openProfileForm() {
  openModal(profileForm);
}

function closeProfileForm() {
  closeModal(profileForm);
}

function openAddCardForm() {
  openModal(addCardFrom);
}

function closeAddCardForm() {
  closeModal(addCardFrom);
}

export function openPopupPhoto() {
  openModal(popupPhoto);
}

export function closePopupPhoto() {
  closeModal(popupPhoto);
}

function closeOpenedModals(openedModal) {
  if (openedModal.classList.contains("popup_visible")) {
    closeModal(openedModal);
  }
}

function keyHandler(evt) {
  if (evt.key === "Escape") {
    popupsObjects.forEach(popup => closeOpenedModals(popup))
  }
}

function mouseHandler(evt) {
  if (containersClasses.some(popupContainer => evt.target.classList.contains(popupContainer)))
    popupsObjects.forEach(popup => closeOpenedModals(popup))
}

myValidator.enableValidation();