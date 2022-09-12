export default class FormValidator {
  constructor(validationConfig, form) {
    this._validationConfig = validationConfig; //объект
    this._form = form; //форма
    this._inputCollection = Array.from(
      this._form.querySelectorAll(this._validationConfig.inputSelector)
    ); //input
    this._submitButtonElement = this._form.querySelector(
      this._validationConfig.submitButtonSelector
    ); //кнопка
    this._formCollection = Array.from(
      document.querySelectorAll(this._validationConfig.form)
    ); //forms
  }
  // показывает ошибку
  _showInputError = (inputSelector, errorMessage) => {
    const errorItem = this._form.querySelector(`.${inputSelector.id}-error`);
    inputSelector.classList.add(this._validationConfig.inputErrorClass);
    errorItem.classList.add(this._validationConfig.errorClass);
    errorItem.textContent = errorMessage;
  };
  //скрывает ошибку
  _hideInputError = (inputSelector) => {
    const errorItem = this._form.querySelector(`.${inputSelector.id}-error`);
    inputSelector.classList.remove(this._validationConfig.inputErrorClass);
    errorItem.classList.remove(this._validationConfig.errorClass);
    errorItem.textContent = '';
  };
  //проверяет есть ли ошибка
  _isValid = (inputSelector) => {
    if (!inputSelector.validity.valid) {
      this._showInputError(inputSelector, inputSelector.validationMessage);
    } else {
      this._hideInputError(inputSelector);
    }
  };
  //кнопка
  _toggleButtonState = () => {
    if (this._hasInvalidInput(this._inputCollection)) {
      this.disabledButton();
    } else {
      this._submitButtonElement.classList.remove(
        this._validationConfig.inactiveButtonClass
      );
      this._submitButtonElement.removeAttribute('disabled', 'disabled');
    }
  };
  _hasInvalidInput = () => {
    return this._inputCollection.some((inputSelector) => {
      return !inputSelector.validity.valid;
    });
  };
  //слушатель
  _setEventListener = () => {
    this._toggleButtonState(); //button
    this._inputCollection.forEach((inputSelector) => {
      inputSelector.addEventListener('input', () => {
        this._isValid(inputSelector);
        this._toggleButtonState(); //button
      });
    });
  };
  enableValidation = () => {
    this._setEventListener();
  };
  disabledButton = () => {
    this._submitButtonElement.setAttribute('disabled', 'disabled');
    this._submitButtonElement.classList.add(
      this._validationConfig.inactiveButtonClass
    );
  };
  // очистка от ошибок
  resetInputs = () => {
    this._toggleButtonState();
    this._inputCollection.forEach((inputSelector) => {
      this._hideInputError(inputSelector);
    });
  };
}
