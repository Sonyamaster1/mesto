// попап редактирования
export default class UserInfo {
  constructor({ profileName, profileAbout, profileAvatar }) {
    // передем обьект, чтобы потом вставить нужные значения
    this._profileName = document.querySelector(profileName); // селектор имя
    this._profileAbout = document.querySelector(profileAbout); //селектор обо мне
    this._profileAvatar = document.querySelector(profileAvatar); // селектор аватара
  }
  getUserInfo() {
    //возвращаем значения
    const info = {};
    info.name = this._profileName.textContent;
    info.about = this._profileAbout.textContent;
    return info;
  }
  setUserInfo({ name, about, avatar }) {
    // проверяем значения чтобы вставить нужное
    if (name) {
      this._profileName.textContent = name; /// data from the user
    }
    if (about) {
      this._profileAbout.textContent = about; /// data from the user
    }
    if (avatar) {
      this._profileAvatar.src = avatar; /// data from the user
    }
  }
  // вставляем значения для аватара
  setAvatarInfo({ link }) {
    this._profileAvatar.src = link;
  }
}
