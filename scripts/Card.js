const fullScreen = document.querySelector('.popup_full-screen'); //попап изображения
const fullText = fullScreen.querySelector('.popup__full-text'); //название картинки
const fullImage = fullScreen.querySelector('.popup__full-image'); //картинка
export default class Card {
  constructor(data, templateSelector, openPopup) {
    this._name = data.name;
    this._link = data.link;
    this.openPopup = openPopup;
    this._templateSelector = templateSelector;
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
    const cardImage = this._element.querySelector('.element__image');
    const cardTitle = this._element.querySelector('.element__title');
    cardTitle.textContent = this._name;
    cardImage.src = this._link;
    cardImage.alt = `Перед вами ${this._name}`;
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
  //попап
  _getPopup() {
    fullImage.src = this._link;
    fullText.textContent = this._name;
    fullImage.alt = `Перед вами ${this._name}`;
    this.openPopup(fullScreen);
  }
  //слушатель попапа
  _setOpenPopupListener() {
    const cardImage = this._element.querySelector('.element__image');
    cardImage.addEventListener('click', () => {
      this._getPopup();
    });
  }
}
