export default class UserInfo {
  constructor(name, title) {
    this._name = name;
    this._title = title;
    this._profileName = document.querySelector(".profile__name");
    this._profileTitle = document.querySelector(".profile__subtitle");
  }

  getUserInfo() {
    this._name = this._profileName.textContent;
    this._title = this._profileTitle.textContent;
    const data = {
      name: this._name,
      title: this._title,
    };
    return data;
  }

  setUserInfo() {
    this._profileName.textContent = document.querySelector(".form__field_name").value;
    this._profileTitle.textContent = document.querySelector(".form__field_about").value;
  }
}