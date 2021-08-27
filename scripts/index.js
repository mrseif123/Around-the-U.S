let container = document.querySelectorAll('#body');

let profileContent = document.querySelector('.profile');
let profileEditBtn = profileContent.querySelector('.profile__edit-btn');
let profileText = profileContent.querySelector('.profile__info');
let profileName = profileText.querySelector('.profile__name');
let profileSubtitle = profileText.querySelector('.profile__subtitle');

let formContent = document.querySelector('.popup-container');
let formNameInput = formContent.querySelector('.form__field-name')
let formAboutInput = formContent.querySelector('.form__field-about')
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
  event.preventDefault()
  formContent.classList.remove("popup-container_mode_open")
  formContent.classList.add("popup-container_mode_hidden");
})

formSubmitBtn.addEventListener("click", function (event) {
  event.preventDefault()
  let name = formContent.querySelector('.form__field-name')
  let about = formContent.querySelector('.form__field-about')
  formContent.classList.remove("popup-container_mode_open")
  formContent.classList.add("popup-container_mode_hidden");
  profileName.textContent = name.value
  profileSubtitle.textContent = about.value
})

function showPopup(popUpElement){
  popUpElement.classList.remove("popup-container_mode_hidden");
  popUpElement.classList.add("popup-container_mode_open");
}
