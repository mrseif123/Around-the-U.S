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

const addForm = document.getElementById("add_popup")

const formNameInput = document.getElementById("fullName")
const formAboutInput = document.getElementById("about")
const formName = document.getElementById("fullName")
const formAbout = document.getElementById("about")

const profileForm = document.getElementById("form_popup")
const profileEditCloseBtn = profileForm.querySelector('.form__close-btn');
const editProfileSubmitBtn = document.getElementById("form__profile-submit-button")


const addElementSubmitBtn = document.getElementById("form__place-submit-button")
const addPlaceCloseBtn = document.getElementById('close_button_add');

const photoPop = document.getElementById("photo_popup");

const elementsContent = document.querySelector('.elements')
const elementsList = elementsContent.querySelector('.elements__list')
const elementItem = elementsContent.querySelector('.elements__item')
const likeButton = elementsContent.querySelector('.elements__like-btn')
const closePlacePopup = document.querySelector('.popup__img-close-btn');
const popups = document.querySelectorAll(".popup")

const containersClasses = ["add-container", "form-container", "photo-container"]
const popupsObjects = [profileForm, addForm, photoPop]

initialCards.forEach(x => addElement(x.name, x.link))

function openModal(element) {
  element.classList.add("popup_visible");
}

function closeModal(element) {
  element.classList.remove("popup_visible");
}

profileEditBtn.addEventListener("click", function () {
  formNameInput.value = profileName.textContent
  formAboutInput.value = profileSubtitle.textContent

  const inputList = Array.from(profileForm.querySelectorAll(".form__field"));
  const buttonElement = profileForm.querySelector(".form__submit-btn")
  toggleButtonState(inputList, buttonElement)
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

closePlacePopup.addEventListener("click", function () {
  closePhotoPopUp()
})


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

  const photoElement = document.getElementById('photo_popup');
  const photoTitle = photoElement.querySelector(".popup__photo-title");
  const photoImage = photoElement.querySelector(".popup__place-image");

  placeElement.querySelector(".elements__img").addEventListener("click", function (e) {
    photoTitle.textContent = titleValue;
    photoImage.src = linkValue;
    photoImage.alt = "photo of " + titleValue
    openPhotoPopUp();
  })
  elementsList.prepend(placeElement)
}


function openProfileForm() {
  openModal(profileForm);
  profileForm.addEventListener("click", mouseHandler);
  document.addEventListener("keypress", keyHandler);
}

function closeProfileForm() {
  profileForm.removeEventListener("click", mouseHandler);
  document.removeEventListener("keypress", keyHandler);
  closeModal(profileForm);
}

function openAddFrom() {
  openModal(addForm);
  addForm.addEventListener("click", mouseHandler);
  document.addEventListener("keypress", keyHandler);
}

function closeAddFrom() {
  addForm.removeEventListener("click", mouseHandler);
  document.removeEventListener("keypress", keyHandler);
  closeModal(addForm);
}

function openPhotoPopUp() {
  openModal(photoPop);
  photoPop.addEventListener("click", mouseHandler);
  document.addEventListener("keypress", keyHandler);
}

function closePhotoPopUp() {
  photoPop.removeEventListener("click", mouseHandler);
  document.removeEventListener("keypress", keyHandler);
  closeModal(photoPop);
}

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add("form__field_invalid");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("form__input-error_active");
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove("form__field_invalid");
  errorElement.classList.remove("form__input-error_active");
  errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(".form__field"));
  const buttonElement = formElement.querySelector(".form__submit-btn")
  toggleButtonState(inputList, buttonElement)

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add("form__submit-btn_inactive");
  } else {
    buttonElement.classList.remove("form__submit-btn_inactive");
  }
};

function enableValidation() {
  const formList = Array.from(document.querySelectorAll("form"));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault;
    })
    setEventListeners(formElement);
  })
}

function closeOpenedModals(x) {
  if (x.classList.contains("popup_visible")) {
    closeModal(x);
  }
}

function keyHandler(evt) {
  if (evt.key === "Escape") {
    popupsObjects.forEach(popup => closeOpenedModals(popup))
  }
}

function mouseHandler(evt) {
  if (containersClasses.some(r => evt.target.classList.contains(r)))
    popupsObjects.forEach(popup => closeOpenedModals(popup))
}

enableValidation();