import Popup from "./Popup.js";
// попап добавления карточек
export default class PopupWithForm extends Popup {
  constructor({ handleFormSubmit }, popupSelector) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit; // колбек сабмита формы
    this._inputList = this._popup.querySelectorAll(".popup__input"); // поля ввода
    this._formList = this._popup.querySelector(".popup__form"); // форма
    this._submitButtonPopup = this._popup.querySelector(".popup__button"); //кнопка "сохранить"
  }
  _getInputValues() {
    this._formElement = {};
    // перебираем inputs, присваиваем значение и возвращаем форму
    this._inputList.forEach(
      (elem) => (this._formElement[elem.name] = elem.value)
    );
    return this._formElement;
  }
  setInputsValues(data) {
    this._newFormElement = {};
    this._inputList.forEach(
      (elem) => (this._newFormElement[elem.value] = data.value)
    );
  }
  setEventListeners() {
    super.setEventListeners();
    this._formList.addEventListener("submit", (evt) => {
      evt.preventDefault(); // отменяем стандартное поведение
      this._handleFormSubmit(this._getInputValues()); // настраиваем отправку формы
      this._submitButtonPopup.textContent = "Cохранение..."; // меняем состояние кнопки
      this.close();
    });
  }
  open() {
    super.open();
    this._submitButtonPopup.textContent = "Cохранить"; // меняем состояние кнопки
  }
  close() {
    super.close();
    this._formList.reset(); //очищаем поля после закрытия
  }
}
