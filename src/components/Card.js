export default class Card {
  constructor({ data, handleCardClick }, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this.handleCardClick = handleCardClick;
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
    this._setEventListeners();
    return this._element;
  }
  // лайк
  _getLike() {
    this._element
      .querySelector('.element__like')
      .classList.toggle('element__like_active');
  }
  //корзина
  _getTrash() {
    this._element.remove();
  }
  _handleOpenImagePopup() {
    this.handleCardClick(this._name, this._link);
  }
  // все слушатели
  _setEventListeners() {
    this._element
      .querySelector('.element__like')
      .addEventListener('mousedown', () => {
        this._getLike();
      });
    this._element
      .querySelector('.element__button-trash')
      .addEventListener('mousedown', () => {
        this._getTrash();
      });
    this.cardImage.addEventListener('click', () => {
      this._handleOpenImagePopup();
    });
  }
}
