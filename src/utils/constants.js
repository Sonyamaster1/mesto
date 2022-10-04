export const validationConfig = {
  formSelector: ".popup__form", //формы
  inputSelector: ".popup__input", //поля ввода
  submitButtonSelector: ".popup__button", //кнопка сохранить
  inactiveButtonClass: "popup__button_disabled", //неактивная кнопка сохранить
  inputErrorClass: "popup__input_type_error", //поле ввода с ошибкой
  errorClass: "popup__input_type_error-active", //span
};
export const popupProfileOpenButton = document.querySelector(
  ".profile__button-edit"
); //кнопка для редактирования
export const popupProfileFormElement =
  document.querySelector(".popup__form-data"); //форма попапа редактирования
export const popUpAdd = document.querySelector(".profile__button-add"); //кнопка добавления
export const cardsForm = document.querySelector(".popup__cards-form"); //форма карточек
export const avatarForm = document.querySelector(".popup__avatar-form"); // форма аватара
export const cardsImage = document.querySelector(".popup__input_type_image");
export const cardsLink = document.querySelector(".popup__input_type_link");
export const avatarPen = document.querySelector(".profile__pen"); // карандаш аватара
export const submitButton = document.querySelector(".popup__button");
