import {
  FormValidation,
} from "./FormValidation.js";

import {
  Card
} from "./Card.js"

const validationConfig = {
  inputSelector: ".form__field",
  submitButtonSelector: ".form__submit-btn",
  inactiveButtonClass: "form__submit-btn_inactive",
  inputErrorClass: "form__field_invalid",
  errorClass: "form__input-error_active",
}

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

const addPlaceCloseBtn = document.getElementById('close_button_add');

const popupPhoto = document.getElementById("photo_popup");

const elementsContent = document.querySelector('.elements')
const elementsList = elementsContent.querySelector('.elements__list')
const closePlacePopup = document.querySelector('.popup__img-close-btn');

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
  const newCard = new Card(titleValue, linkValue, {
    handleCardClick: openPopupPhoto
  })
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

function openPopupPhoto() {
  openModal(popupPhoto);
}

function closePopupPhoto() {
  closeModal(popupPhoto);
}

function closeOpenedModals(openedModal) {
  if (openedModal.classList.contains("popup_visible")) {
    closeModal(openedModal);
  }
}

function keyHandler(evt) {
  if (evt.key === "Escape") {
    closeModal(document.querySelector('.popup_visible'));
  }
}

function mouseHandler(evt) {
  if (containersClasses.some(popupContainer => evt.target.classList.contains(popupContainer)))
    closeModal(document.querySelector('.popup_visible'));
}


function validateForms() {
  const formList = Array.from(document.querySelectorAll("form"));
  formList.forEach((formElement) => {
    const currentFormValidator = new FormValidation(validationConfig, formElement)
    currentFormValidator.enableValidation();
  })
}

validateForms()