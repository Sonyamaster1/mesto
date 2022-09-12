// попап редактирования
export default class UserInfo {
  constructor(profileSelectors) {
    // передем обьект, чтобы потом вставить нужные значения
    this._profileName = document.querySelector(profileSelectors.profileName); // селектор имя
    this._profileAbout = document.querySelector(profileSelectors.profileAbout); //селектор обо мне
  }
  getUserInfo() {
    const info = {};
    info.name = this._profileName.textContent;
    info.about = this._profileAbout.textContent;
    return info;
  }
  setUserInfo(elem) {
    this._profileName.textContent = elem.name;
    this._profileAbout.textContent = elem.about;
  }
}
