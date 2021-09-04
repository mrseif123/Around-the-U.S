const initialCards = [{
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg"
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg"
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg"
  }
];

const container = document.querySelectorAll('#body');

const profileContent = document.querySelector('.profile');
const profileEditBtn = profileContent.querySelector('.profile__edit-btn');
const profileText = profileContent.querySelector('.profile__info');
const profileName = profileText.querySelector('.profile__name');
const profileSubtitle = profileText.querySelector('.profile__subtitle');
const addPlaceBtn = profileContent.querySelector('.profile__add-btn');

const popUpContainer = document.querySelector('.popup');
const addForm = popUpContainer.querySelector(".popup__add-container")

const formNameInput = document.getElementById("fullName")
const formAboutInput = document.getElementById("about")

const profileForm = popUpContainer.querySelector(".popup__form-container")
const profileEditCloseBtn = popUpContainer.querySelector('.form__close-btn');
const editProfileSubmitBtn = document.getElementById("form__profile-submit-button")

const addElementSubmitBtn = document.getElementById("form__place-submit-button")
const addPlaceCloseBtn = document.getElementById('close_button_add');

const elementsContent = document.querySelector('.elements')
const elementsList = elementsContent.querySelector('.elements__list')
const elementItem = elementsContent.querySelector('.elements__item')
const likeButton = elementsContent.querySelector('.elements__like-btn')

let currentImageElement;
const currentCards = []
initialCards.forEach(x => addElement(x.name, x.link))

const popups = [addForm, profileForm, popUpContainer]

function openModal(element) {
  element.classList.add("popup_visible");
}

function closeModal(element) {
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
  const name = document.getElementById("fullName")
  const about = document.getElementById("about")
  profileName.textContent = name.value
  profileSubtitle.textContent = about.value
  closeProfileForm();
})


addPlaceBtn.addEventListener("click", function () {
  openAddFrom();
})

addPlaceCloseBtn.addEventListener("click", function () {
  const title = document.getElementById("title");
  const link = document.getElementById("link");
  title.value = "";
  link.value = "";
  closeAddFrom();
})

addForm.addEventListener("submit", function (event) {
  event.preventDefault()
  const title = document.getElementById("title");
  const link = document.getElementById("link");
  addElement(title.value, link.value);
  title.value = ""
  link.value = ""
  closeAddFrom();
})



function openProfileForm() {
  openModal(popUpContainer);
  openModal(profileForm);
}

function closeProfileForm() {
  closeModal(popUpContainer);
  closeModal(profileForm);
}

function openAddFrom() {
  openModal(popUpContainer);
  openModal(addForm);
}

function addElement(titleValue, linkValue) {
  const elementTemplate = document.querySelector("#element-template").content;
  const placeElement = elementTemplate.querySelector('.elements__item').cloneNode(true);
  placeElement.querySelector(".elements__title").textContent = titleValue;
  placeElement.querySelector(".elements__img").src = linkValue;
  const likeButton = placeElement.querySelector(".elements__like-btn")

  likeButton.addEventListener("click", function (e) {
    likeButton.classList.toggle("elements__like-btn_active");
  })

  placeElement.querySelector(".elements__delete-btn").addEventListener("click", function (e) {
    placeElement.remove()
  })

  const photoElement = popUpContainer.querySelector('.popup__photo');
  const photoTitle = photoElement.querySelector(".popup__photo-title");
  const photoImage = photoElement.querySelector(".popup__place-image");

  placeElement.querySelector(".elements__img").addEventListener("click", function (e) {
    photoTitle.textContent = titleValue;
    photoImage.src = linkValue;
    photoImage.alt = "photo of " + titleValue
    openPhotoPopUp(photoElement);

    const closePlacePopup = photoElement.querySelector('.popup__img-close-btn');
    closePlacePopup.addEventListener("click", function (e) {
      closePhotoPopUp(photoElement);
    })
  })
  elementsList.prepend(placeElement)
}

function closePhotoPopUp(photoElement) {
  closeModal(photoElement);
  closeModal(popUpContainer);
}

function openPhotoPopUp(photoElement) {
  openModal(photoElement);
  openModal(popUpContainer);
}

function closeAddFrom() {
  closeModal(popUpContainer);
  closeModal(addForm);
}
