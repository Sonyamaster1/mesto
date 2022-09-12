export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeButton = this._popup.querySelector('.popup__close');
    this._handleEscClose = this._handleEscClose.bind(this);
  }
  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }
  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }
  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }
  _handleOverClose = (evt) => {
    if (evt.target.classList.contains('popup')) {
      this.close();
    }
  };
  setEventListeners() {
    this._closeButton.addEventListener('mousedown', this.close.bind(this));
    this._popup.addEventListener('mousedown', this._handleOverClose.bind(this));
  }
}
