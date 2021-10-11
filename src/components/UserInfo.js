export default class UserInfo {
  constructor({
    name,
    about,
    _id,
    avatar,
    nameElement,
    aboutElement,
    avatarElement
  }) {
    this._name = name;
    this._about = about;
    this._id = _id;
    this._avatar = avatar;

    this._profileName = nameElement;
    this._profileAbout = aboutElement;
    this._profileImage = avatarElement;
  }

  updateUserInfo({
    name,
    about,
    _id,
    avatar
  }) {
    this._name = name || this._name;
    this._about = about || this._about;
    this._id = _id || this._id;
    this._avatar = avatar || this._avatar;
  }

  removeAvatar() {
    this._profileImage.src = '';
    this._profileImage.alt = '';
  }

  getUserInfo() {
    return {
      name: this._name,
      about: this._about,
      _id: this._id,
      avatar: this._avatar,
    };
  }

  renderUserInfo() {
    // populate profile with userInfo
    this._profileName.textContent = this._name;
    this._profileAbout.textContent = this._about;
    this._profileImage.src = this._avatar;
    this._profileImage.alt = this._name;
  }
}