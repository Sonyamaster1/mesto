/*import { fullScreen } from "./index.js";*/
export default class Card {
  constructor(data, templateSelector, openPopup, handlePopUp) {
    this._name = data.name;
    this._link = data.link;
    this.openPopup = openPopup;
    this._templateSelector = templateSelector;
    this._handlePopUp = handlePopUp;
  }
  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._templateSelector)
      .content.querySelector('.element')
      .cloneNode(true);
    return cardTemplate;
  }
  generateCard() {
    this._element = this._getTemplate();
    this.cardTitle = this._element.querySelector('.element__title');
    this.cardImage = this._element.querySelector('.element__image');
    this.cardImage.src = this._link;
    this.cardTitle.textContent = this._name;
    this.cardImage.alt = `Перед вами ${this._name}`;
    this._setTrashListener();
    this._setOpenPopupListener();
    this._setLikeListener();
    return this._element;
  }
  // лайк
  _getLike() {
    this._element
      .querySelector('.element__like')
      .classList.toggle('element__like_active');
  }
  //слушатель лайка
  _setLikeListener() {
    this._element
      .querySelector('.element__like')
      .addEventListener('click', () => {
        this._getLike();
      });
  }
  //корзина
  _getTrash() {
    this._element.remove();
  }
  //слушатель корзины
  _setTrashListener() {
    this._element
      .querySelector('.element__button-trash')
      .addEventListener('click', () => {
        this._getTrash();
      });
  }
  //слушатель попапа
  _setOpenPopupListener() {
    this.cardImage.addEventListener('click', () => {
      this._handlePopUp(this._name, this._link);
    });
  }
}
