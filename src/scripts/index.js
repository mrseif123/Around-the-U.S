import Card from '../components/Card.js';
import FormValidation from '../components/FormValidation.js';

import Api from '../components/Api.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupDelete from '../components/PopupDelete.js';

import '../pages/index.css';
import '../vendor/normalize.css';
import '../vendor/fonts.css';

import {
  validationConfig,
  profileName,
  profileSubtitle,
  profileAvatar,
  nameField,
  subtitleField,
  imageAdderForm,
  editProfileForm,
  avatarButton,
  avatarFrom,
  editButton,
  addButton
} from "./constants.js"


const api = new Api({
  baseUrl: 'https://around.nomoreparties.co/v1/group-12',
  authorization: '99b2ba57-5d11-48fc-a5da-07a4f1d8e8b5',
});

const addPlaceValidation = new FormValidation(validationConfig, imageAdderForm);
const profileValidation = new FormValidation(validationConfig, editProfileForm);
const avatarValidation = new FormValidation(validationConfig, avatarFrom);
profileValidation.enableValidation();
addPlaceValidation.enableValidation();
avatarValidation.enableValidation();


const userInfo = new UserInfo({
  nameElement: profileName,
  aboutElement: profileSubtitle,
  avatarElement: profileAvatar,
});

const confirmDeletePopup = new PopupDelete({
  popupSelector: '.delete-container',
  formSubmitHandler: (cardElement, cardId) => {
    api
      .deleteCard(cardId)
      .then(() => {
        cardElement.remove();
        cardElement = null
        confirmDeletePopup.close();
      })
      .catch(err => console.error(`Problem deleting card: ${err}`));
  },
});

function createNewCard(item) {
  const newPlace = new Card({
    card: item,
    handleCardClick: (name, link) => {
      imagePreviewPopup.open(name, link);
    },
    handleDeleteClick: evt => {
      confirmDeletePopup.open(evt, item._id);
    },
    userData: userInfo.getUserInfo(),
    handleLikeCard: status => {
      return status ? api.likeCard(item._id) : api.removeLike(item._id);
    },
    templateSelector: '#element-template',
  });
  return newPlace
}


const placeCards = new Section({
  renderer: item => {
    const newCard = createNewCard(item);
    placeCards.addItem(newCard.createCard());
  },
  containerSelector: ".elements__list",
});


const imagePreviewPopup = new PopupWithImage(".photo-container");

// initialize profile editor popup
const profileEditor = new PopupWithForm({
  popupSelector: '.form-container',
  formSubmitHandler: data => {
    api
      .updateProfile(data)
      .then(() => {
        userInfo.updateUserInfo(data);
        userInfo.renderUserInfo();
        profileEditor.close();
      })
      .catch(err => console.error(`Problem updating profile: ${err}`))
  },
});


const imageAdderPopup = new PopupWithForm({
  popupSelector: '.add-container',
  formSubmitHandler: data => {
    api
      .addCard(data)
      .then(cardData => {
        const newCard = createNewCard(cardData);
        placeCards.addItem(newCard.createCard());
      })
      .then(() => imageAdderPopup.close())
      .catch(err => console.error(`Problem adding card: ${err}`));
  },
});

const avatarUpdatePopup = new PopupWithForm({
  popupSelector: '.avatar-container',
  formSubmitHandler: data => {
    userInfo.removeAvatar(); // displays loading effect while server responds
    api
      .updateAvatar(data)
      .then(() => {
        userInfo.updateUserInfo(data);
        userInfo.renderUserInfo();
        avatarUpdatePopup.close();
      })
      .catch(err => console.error(`Problem updating avatar: ${err}`));
  },
});


// add functionality to page buttons
editButton.addEventListener("click", () => {
  const data = userInfo.getUserInfo();
  nameField.value = data.name;
  subtitleField.value = data.about;
  profileEditor.open();
});

addButton.addEventListener("click", () => {
  imageAdderPopup.open();
});

avatarButton.addEventListener('click', () => {
  avatarUpdatePopup.open();
});


imageAdderPopup.setEventListeners();
imagePreviewPopup.setEventListeners();
profileEditor.setEventListeners();
confirmDeletePopup.setEventListeners();
avatarUpdatePopup.setEventListeners();

api
  .getUserInfo()
  .then(userData => {
    userInfo.updateUserInfo(userData);
  })
  .then(() => {
    api.getGroupCards().then(fetchedCards => {
      placeCards.renderItems(fetchedCards.reverse());
    });
  })
  .then(() => {
    userInfo.renderUserInfo();
  })
  .catch(err => console.error(`Problem rendering content: ${err}`));