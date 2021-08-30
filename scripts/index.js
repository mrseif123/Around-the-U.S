let container = document.querySelectorAll('#body');

let profileContent = document.querySelector('.profile');F
let profileEditBtn = profileContent.querySelector('.profile__edit-btn');
let profileText = profileContent.querySelector('.profile__info');
let profileName = profileText.querySelector('.profile__name');
let profileSubtitle = profileText.querySelector('.profile__subtitle');

let formContent = document.querySelector('.popup_hidden');
let formNameInput = document.getElementById("fullName")
let formAboutInput = document.getElementById("about")
let formProfile = document.forms.edit_profile_form
let formCloseBtn = formContent.querySelector('.form__close-btn');
let formSubmitBtn = formContent.querySelector('.form__submit-btn')

let elementsContent = document.querySelector('.elements')
let heartIcon = elementsContent.querySelectorAll('.elements__like-icon')

profileEditBtn.addEventListener("click", function () {
  showPopup(formContent);
  formNameInput.value = profileName.textContent
  formAboutInput.value = profileSubtitle.textContent
})

formCloseBtn.addEventListener("click", function (event) {
  formContent.classList.remove("popup")
  formContent.classList.add("popup_hidden");
})

formProfile.addEventListener("submit", function (event) {
  event.preventDefault()
  let name = document.getElementById("fullName")
  let about = document.getElementById("about")
  formContent.classList.remove("popup")
  formContent.classList.add("popup_hidden");
  profileName.textContent = name.value
  profileSubtitle.textContent = about.value
})

function showPopup(popUpElement){
  popUpElement.classList.remove("popup_hidden");
  popUpElement.classList.add("popup");
}