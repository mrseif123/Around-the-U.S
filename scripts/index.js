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

let container = document.querySelectorAll('#body');

let profileContent = document.querySelector('.profile');
let profileEditBtn = profileContent.querySelector('.profile__edit-btn');
let profileText = profileContent.querySelector('.profile__info');
let profileName = profileText.querySelector('.profile__name');
let profileSubtitle = profileText.querySelector('.profile__subtitle');
let addPlaceBtn = profileContent.querySelector('.profile__add-btn');

let popUpContainer = document.querySelector('.popup');
let addForm = popUpContainer.querySelector(".popup__add-container")

let formNameInput = document.getElementById("fullName")
let formAboutInput = document.getElementById("about")

let profileForm = popUpContainer.querySelector(".popup__form-container")
let profileEditCloseBtn = popUpContainer.querySelector('.form__close-btn');
let editProfileSubmitBtn = document.getElementById("form__profile-submit-button")

let addElementSubmitBtn = document.getElementById("form__place-submit-button")
let addPlaceCloseBtn = document.getElementById('close_button_add');


let elementsContent = document.querySelector('.elements')
let elementsList = elementsContent.querySelector('.elements__list')
let elementItem = elementsContent.querySelector('.elements__item')
let likeButton = elementsContent.querySelector('.elements__like-btn')

let currentCards = []
initialCards.forEach(x => addElement(x.name, x.link))

profileEditBtn.addEventListener("click", function () {
  showPopup(popUpContainer);
  showPopup(profileForm);
  let addFormNew = document.getElementById("add_container");
  addFormNew.style.display = "none"
  profileForm.style.display = "block"
  formNameInput.value = profileName.textContent
  formAboutInput.value = profileSubtitle.textContent
})

profileEditCloseBtn.addEventListener("click", function () {
  hidePopup(popUpContainer);
  hidePopup(profileForm)
  hidePopup(addForm)
  addFormNew.style.display = "none"
  profileForm.style.display = "none"
  popUpContainer.style.display = "none"
})


addPlaceBtn.addEventListener("click", function () {
  showPopup(popUpContainer);
  showPopup(addForm)
  let addFormNew = document.getElementById("add_container");
  profileForm.style.display = "none"
  addFormNew.style.display = "block"
})

addPlaceCloseBtn.addEventListener("click", function () {
  hidePopup(addForm)
  hidePopup(popUpContainer)
  const title = document.getElementById("title");
  const link = document.getElementById("link");
  title.value = "";
  link.value = "";
})

addForm.addEventListener("submit", function (event) {
  event.preventDefault()
  const title = document.getElementById("title");
  const link = document.getElementById("link");
  addElement(title.value, link.value);
  hidePopup(addForm)
  hidePopup(popUpContainer)
  title.value = ""
  link.value = ""
  addFormNew.style.display = "none"
  profileForm.style.display = "none"
  popUpContainer.style.display = "none"
})

profileForm.addEventListener("submit", function (event) {
  event.preventDefault()
  let name = document.getElementById("fullName")
  let about = document.getElementById("about")
  profileName.textContent = name.value
  profileSubtitle.textContent = about.value
  hidePopup(profileForm)
  hidePopup(popUpContainer)
  addFormNew.style.display = "none"
  profileForm.style.display = "none"
  popUpContainer.style.display = "none"
})

function showPopup(popUpElement) {
  popUpElement.classList.remove("popup_hidden");
}

function hidePopup(popUpElement) {
  popUpElement.classList.add("popup_hidden");
}

function addElement(titleValue, linkValue) {
  const elementTemplate = document.querySelector("#element-template").content;
  const placeElement = elementTemplate.querySelector('.elements__item').cloneNode(true);
  placeElement.querySelector(".elements__title").textContent = titleValue;
  placeElement.querySelector(".elements__img").src = linkValue;
  
  placeElement.querySelector(".elements__like-btn").addEventListener("click", function (e) {
    e.target.classList.toggle("elements__like-btn_active");
    e.target.classList.toggle("elements__like-btn")
    console.log(e.target)
  })

  placeElement.querySelector(".elements__delete-btn").addEventListener("click", function (e) {
    placeElement.remove()
  })

  let photoPopupTemplate = document.querySelector("#photo-popup-template").content;
  let photoElement = photoPopupTemplate.querySelector('.popup__photo').cloneNode(true);

  placeElement.querySelector(".elements__img").addEventListener("click", function (e) {
    titleValue = placeElement.querySelector(".elements__title").textContent;
    linkValue = placeElement.querySelector(".elements__img").src;
    photoElement.querySelector(".popup__photo-title").textContent = titleValue;
    photoElement.querySelector(".popup__place-image").src = linkValue;
    popUpContainer.insertAdjacentElement("beforeend", photoElement)
    showPopup(photoElement)
    showPopup(popUpContainer)
    addForm.style.display = "none"
    profileForm.style.display = "none"
    let closePlacePopup = document.getElementById('close_button_img');
    closePlacePopup.addEventListener("click", function () {
        hidePopup(popUpContainer)
      photoElement.remove()
    })
  })
  elementsList.prepend(placeElement)
}


// photoPopup.getElementById("close_button_img").addEventListener("click", function () {
//   hidePopup(popUpContainer)
//   hidePopup(photoElement)
// })