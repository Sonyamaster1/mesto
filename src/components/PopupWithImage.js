import Popup from './Popup.js';
//попап большого изображения
export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._fullImage = this._popup.querySelector('.popup__full-image'); //изображение попапа
    this._fullText = this._popup.querySelector('.popup__full-text'); //текст попапа
  }
  open(name, link) {
    super.open();
    this._fullText.textContent = name;
    link = this._fullImage.src;
    this._fullImage.alt = `Перед вами ${name}`;
  }
}
