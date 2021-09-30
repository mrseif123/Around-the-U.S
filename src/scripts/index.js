import Card from '../components/Card.js';
import FormValidation from '../components/FormValidation.js';
import {
  initialCards
} from './initial-cards.js';

import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';

import '../pages/index.css';
import '../vendor/normalize.css';
import '../vendor/fonts.css';

import {
  validationConfig,

  profileName,
  profileSubtitle,
  nameField,
  subtitleField,
  titleField,
  linkField,
  editButton,
  addButton,


} from "./constants.js"



const placeCards = new Section({
    items: initialCards,
    renderer: (item) => {
      const newPlace = new Card({
          card: item,
          handleCardClick: (name, link) => {
            imagePreviewPopup.open(name, link);
          },
        },
        "#element-template"
      );
      const cardElement = newPlace.createCard();
      placeCards.setItems(cardElement);
    },
  },
  ".elements__list"
);
placeCards.renderItems();

function validateForms() {
  const formList = Array.from(document.querySelectorAll("form"));
  formList.forEach((formElement) => {
    const currentFormValidator = new FormValidation(validationConfig, formElement)
    currentFormValidator.enableValidation();
  })
}
validateForms()

const userInfo = new UserInfo(
  profileName.textContent,
  profileSubtitle.textContent
);

const imagePreviewPopup = new PopupWithImage(".photo-container");
imagePreviewPopup.setEventListeners();

// initialize profile editor popup
const profileEditor = new PopupWithForm(
  ".form-container",
  () => {
    userInfo.setUserInfo()
    profileEditor.close();
  }
);

profileEditor.setEventListeners();

// initialize image adder editor popup
const imageAdderPopup = new PopupWithForm(
  ".add-container",
  () => {
    const name = titleField.value
    const link = linkField.value
    const tmp = {
      name,
      link
    }
    initialCards.unshift(tmp)
    imageAdderPopup.close();
    placeCards.renderItems();
  }
);

imageAdderPopup.setEventListeners();

// add functionality to page buttons
editButton.addEventListener("click", () => {
  const data = userInfo.getUserInfo();
  nameField.value = data.name;
  subtitleField.value = data.title;
  profileEditor.open();
});

addButton.addEventListener("click", () => {
  imageAdderPopup.open();
});