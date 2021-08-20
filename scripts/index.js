let container = document.querySelectorAll('#body');

let profile_content = document.querySelector('.profile');
let profile_edit_btn = profile_content.querySelector('.profile__edit-btn');
let profile_text = profile_content.querySelector('.profile__info');
let profile_name = profile_text.querySelector('.profile__name');
let profile_subtitle = profile_text.querySelector('.profile__subtitle');

let form_content = document.querySelector('.popup-container');
let form_name_input = form_content.querySelector('.form__field_name')
let form_about_input = form_content.querySelector('.form__field_about')
let form_close_btn = form_content.querySelector('.form__close-btn');
let form_submit_btn = form_content.querySelector('.form__submit-btn')

let elements_content = document.querySelector('.elements')
let heart_icons = elements_content.querySelectorAll('.elements__like-icon')

profile_edit_btn.addEventListener("click", function () {
  form_content.style.display = "block";
  form_name_input.setAttribute("value", profile_name.textContent)
  form_about_input.setAttribute("value", profile_subtitle.textContent)
} )

form_close_btn.addEventListener("click", function () {
  form_content.style.display = "none";
})

form_submit_btn.addEventListener("click", function (event) {
  event.preventDefault()
  let name = form_content.querySelector('.form__field_name')
  let about = form_content.querySelector('.form__field_about')
  form_content.style.display = "none";
  console.log(form_name_input.getAttribute("value"))
  profile_name.textContent = name.value
  profile_subtitle.textContent = about.value
})




