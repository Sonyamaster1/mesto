export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
];
export const validationConfig = {
  formSelector: '.popup__form', //формы
  inputSelector: '.popup__input', //поля ввода
  submitButtonSelector: '.popup__button', //кнопка сохранить
  inactiveButtonClass: 'popup__button_disabled', //неактивная кнопка сохранить
  inputErrorClass: 'popup__input_type_error', //поле ввода с ошибкой
  errorClass: 'popup__input_type_error-active', //span
};
export const popupProfileOpenButton = document.querySelector(
  '.profile__button-edit'
); //кнопка для редактирования
export const popupProfileFormElement =
  document.querySelector('.popup__form-data'); //форма попапа редактирования
export const nameInput = document.querySelector('.popup__input_type_name'); //поле ввода "имя"
export const jobInput = document.querySelector('.popup__input_type_about'); //поле ввода "о себе"
export const popUpAdd = document.querySelector('.profile__button-add'); //кнопка добавления
export const cardsForm = document.querySelector('.popup__cards-form'); //форма карточек
export const cardsImage = document.querySelector('.popup__input_type_image');
export const cardsLink = document.querySelector('.popup__input_type_link');
