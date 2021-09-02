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

let formContent = document.querySelector('.popup');
let formNameInput = document.getElementById("fullName")
let formAboutInput = document.getElementById("about")

let formProfile = document.forms.edit_profile_form
let profileEditCloseBtn = formContent.querySelector('.form__close-btn');
let editProfileSubmitBtn = document.getElementById("form__profile-submit-button")

let addForm = formContent.querySelector(".popup__add-container")
let addElementSubmitBtn = document.getElementById("form__place-submit-button")
let addPlaceCloseBtn = document.getElementById('close_button_add');


let elementsContent = document.querySelector('.elements')
let elementsList = elementsContent.querySelector('.elements__list')
let elementItem = elementsContent.querySelector('.elements__item')
let likeButton = elementsContent.querySelector('.elements__like-btn')


let currentCards = []
initialCards.forEach(x => addElement(x.name, x.link))
console.log(currentCards)

profileEditBtn.addEventListener("click", function () {
  showPopup(formContent);
  showPopup(formProfile);
  formNameInput.value = profileName.textContent
  formAboutInput.value = profileSubtitle.textContent
})

profileEditCloseBtn.addEventListener("click", function (event) {
  hidePopup(formContent)
  hidePopup(formProfile)
  hidePopup()
})


addPlaceBtn.addEventListener("click", function () {
  showPopup(addForm)
  showPopup(formContent)
  hidePopup(formProfile)
})

addPlaceCloseBtn.addEventListener("click", function () {
  hideAllPopups();
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
  hideAllPopups();
  title.value = ""
  link.value = ""
})

formProfile.addEventListener("submit", function (event) {
  event.preventDefault()
  let name = document.getElementById("fullName")
  let about = document.getElementById("about")
  showPopup(formContent)
  profileName.textContent = name.value
  profileSubtitle.textContent = about.value
    hidePopup(formContent)
    hidePopup(formProfile)
    hidePopup()
})

function hideAllPopups() {
  hidePopup(addForm);
  hidePopup(formContent);
  hidePopup(formProfile);
}

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

  //  placeElement.querySelector(".elements__img").addEventListener("click", function (e) {
  //    placeElement.remove()
  //  })
  
  elementsList.prepend(placeElement)
}