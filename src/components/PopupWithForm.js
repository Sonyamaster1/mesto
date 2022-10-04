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
    data = Object.values(data);
    for (let i = 0; i < data.length; i++) {
      this._inputList[i].value = data[i];
    }
  }
  // метод для текста кнопки
  _getIsLoading() {
    this._submitButtonPopup.textContent = "Сохранение...";
  }
  // метод для текста кнопки
  _removeIsLoading() {
    this._submitButtonPopup.textContent = "Cохранить";
  }

  setEventListeners() {
    super.setEventListeners();
    this._formList.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._getIsLoading(); // меняем на Сохранение...
      this._handleFormSubmit(this._getInputValues());
    });
  }

  open() {
    super.open();
    this._removeIsLoading(); // меняем на Сохранить
  }
  close() {
    super.close();
    this._formList.reset(); //очищаем поля после закрытия
  }
}
