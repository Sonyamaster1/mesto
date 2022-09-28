export default class Card {
  constructor(
    {
      data,
      userId,
      handleCardClick,
      handleDeleteCard,
      handleLikeCard,
      handleDeleteLikeCard,
    },
    templateSelector
  ) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this.handleCardClick = handleCardClick;
    this.handleDeleteCard = handleDeleteCard;
    this.handleLikeCard = handleLikeCard;
    this.handleDeleteLikeCard = handleDeleteLikeCard;
    this.likes = data.likes.length;
    this._userId = userId;
    this._id = data._id;
    this._owner = data.owner._id;
  }
  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);
    return cardTemplate;
  }
  generateCard() {
    this._element = this._getTemplate();
    this.cardTitle = this._element.querySelector(".element__title");
    this.cardImage = this._element.querySelector(".element__image");
    this.cardLike = this._element.querySelector(".element__like");
    this.likeCounter = this._element.querySelector(".element__like-counter");
    this.deleteEl = this._element.querySelector(".element__button-trash");
    this.cardImage.src = this._link;
    this.cardTitle.textContent = this._name;
    this.cardImage.alt = `Перед вами ${this._name}`;
    this._checkOwner();
    this._checkLikeOwner();
    this.cardLike.addEventListener("click", () => {
      if (this.cardLike.classList.contains("element__like_active")) {
        this.handleDeleteLikeCard(this);
      } else {
        this.handleLikeCard(this);
      }
    });
    this.likeCounter.textContent = this.likes;
    this._setEventListeners();
    return this._element;
  }
  // добавляем лайк
  getLikeCard() {
    this.cardLike.classList.add("element__like_active");
    this.likeCounter.textContent =
      parseInt(this.likeCounter.textContent, 10) + 1;
  }
  // убираем лайк
  deleteLikeCard() {
    this.cardLike.classList.remove("element__like_active");
    this.likeCounter.textContent =
      parseInt(this.likeCounter.textContent, 10) - 1;
  }
  // удаление
  remove() {
    this._element.remove();
    this._element = null;
  }
  // открытие попапа
  _handleOpenImagePopup() {
    this.handleCardClick(this._name, this._link);
  }
  // все слушатели
  _setEventListeners() {
    this.deleteEl.addEventListener("click", () => this.handleDeleteCard(this));
    this.cardImage.addEventListener("click", () => {
      this._handleOpenImagePopup();
    });
  }
  // получаем id
  getId() {
    return this._data._id;
  }
  // проверяем пользователя
  _checkOwner() {
    if (this._owner == this._userId) {
      this.deleteEl.classList.add("element__button-trash_type_active");
    }
  }
  // проверяем пользователя
  _checkLikeOwner() {
    this._data.likes.forEach((element) => {
      if (this._owner == this._userId) {
        this.cardLike.classList.add("element__like_active");
      }
    });
  }
}
