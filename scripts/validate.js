const obj = {
  formSelector: '.popup__form', //формы
  inputSelector: '.popup__input', //поля ввода
  submitButtonSelector: '.popup__button', //кнопка сохранить
  inactiveButtonClass: 'popup__button_disabled', //неактивная кнопка сохранить
  inputErrorClass: 'popup__input_type_error', //поле ввода с ошибкой
  errorClass: '.${input.id}-error', //span
};
//очищение span (заготовка)
/*const deleteSpanElement = (obj, form) => {
  const errorItem = form.querySelector(`.${input.id}-error`);
  errorItem.value = '';
};
popupProfileCloseButton.addEventListener('click', deleteSpanElement);*/
//
const showInputError = (form, input, errorMessage, obj) => {
  const errorItem = form.querySelector(`.${input.id}-error`);
  input.classList.add(obj.inputErrorClass);
  errorItem.classList.add('popup__input_type_error-active');
  errorItem.textContent = errorMessage;
};
const hideInputError = (form, input, obj) => {
  const errorItem = form.querySelector(`.${input.id}-error`);
  input.classList.remove(obj.inputErrorClass);
  errorItem.classList.remove('popup__input_type_error-active');
  errorItem.textContent = '';
};
//
const isValid = (form, input, obj) => {
  if (!input.validity.valid) {
    showInputError(form, input, input.validationMessage, obj);
  } else {
    hideInputError(form, input, obj);
  }
};
//делает кнопку неактвной и активной
const toggleButtonState = (inputCollection, submitButtonElement, obj) => {
  if (hasInvalidInput(inputCollection, obj)) {
    submitButtonElement.classList.add(obj.inactiveButtonClass);
    submitButtonElement.setAttribute('disabled', 'disabled');
  } else {
    submitButtonElement.classList.remove(obj.inactiveButtonClass);
    submitButtonElement.removeAttribute('disabled', 'disabled');
  }
};
//проверяем есть ли хотя бы 1 валидное поле
const hasInvalidInput = (inputCollection, obj) => {
  return inputCollection.some((input) => {
    return !input.validity.valid;
  });
};
//слушатель для всех полей формы
const setEventListener = (form, obj) => {
  const inputCollection = Array.from(form.querySelectorAll(obj.inputSelector));
  const submitButtonElement = form.querySelector(obj.submitButtonSelector);
  toggleButtonState(inputCollection, submitButtonElement, obj); //button
  inputCollection.forEach((input) => {
    input.addEventListener('input', function () {
      isValid(form, input, obj);
      toggleButtonState(inputCollection, submitButtonElement, obj); //button
    });
  });
};

// добавление обработчиков всем формам
const enableValidation = (obj) => {
  const formCollection = Array.from(
    document.querySelectorAll(obj.formSelector)
  );
  formCollection.forEach((form) => {
    form.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListener(form, obj);
  });
};
enableValidation(obj);
