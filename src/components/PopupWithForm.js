import Popup from './Popup.js';
// попап добавления карточек
export default class PopupWithForm extends Popup {
  constructor({ handleFormSubmit }, popupSelector) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit; // колбек сабмита формы
    this._inputList = this._popup.querySelectorAll('.popup__input'); // поля ввода
    this._formList = this._popup.querySelector('.popup__form'); // форма
    this._submitButtonPopup = this._popup.querySelector('.popup__button'); //кнопка "сохранить"
  }
  _getInputValues() {
    this._formElement = {};
    // перебираем inputs, присваиваем значение и возвращаем форму
    this._inputList.forEach(
      (elem) => (this._formElement[elem.name] = elem.value)
    );
    return this._formElement;
  }
  setEventListeners() {
    super.setEventListeners();
    this._formList.addEventListener('submit', (evt) => {
      evt.preventDefault(); // отменяем стандартное поведение
      this._handleFormSubmit(this._getInputValues(), this._submitButtonPopup); // настраиваем отправку формы
      this.close();
    });
  }
  close() {
    super.close();
    this._formList.reset(); //очищаем поля после закрытия
  }
}
