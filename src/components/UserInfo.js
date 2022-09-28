// попап редактирования
export default class UserInfo {
  constructor({ profileName, profileAbout, profileAvatar }) {
    // передем обьект, чтобы потом вставить нужные значения
    this._profileName = document.querySelector(profileName); // селектор имя
    this._profileAbout = document.querySelector(profileAbout); //селектор обо мне
    this._profileAvatar = document.querySelector(profileAvatar); // селектор аватара
  }
  getUserInfo() {
    //вщзвращаем значения
    const info = {};
    info.name = this._profileName.textContent;
    info.about = this._profileAbout.textContent;
    return info;
  }
  setUserInfo({ name, about, avatar }) {
    //вставляем значения
    this._profileName.textContent = name;
    this._profileAbout.textContent = about;
    this._profileAvatar.src = avatar;
  }
  // вставляем значения для аватара
  setAvatarInfo({ link }) {
    this._profileAvatar.src = link;
  }
}
