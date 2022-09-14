// попап редактирования
export default class UserInfo {
  constructor({ profileName, profileAbout }) {
    // передем обьект, чтобы потом вставить нужные значения
    this._profileName = document.querySelector(profileName); // селектор имя
    this._profileAbout = document.querySelector(profileAbout); //селектор обо мне
  }
  getUserInfo() {
    //вщзвращаем значения
    const info = {};
    info.name = this._profileName.textContent;
    info.about = this._profileAbout.textContent;
    return info;
  }
  setUserInfo({ name, about }) {
    //вставляем значения
    this._profileName.textContent = name;
    this._profileAbout.textContent = about;
  }
}
