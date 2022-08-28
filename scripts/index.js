import Card from './Card.js';
import FormValidator from './FormValidator.js';
const initialCards = [
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
const validationConfig = {
  formSelector: '.popup__form', //формы
  inputSelector: '.popup__input', //поля ввода
  submitButtonSelector: '.popup__button', //кнопка сохранить
  inactiveButtonClass: 'popup__button_disabled', //неактивная кнопка сохранить
  inputErrorClass: 'popup__input_type_error', //поле ввода с ошибкой
  errorClass: 'popup__input_type_error-active', //span
};

const popupProfileOpenButton = document.querySelector('.profile__button-edit'); //кнопка для редактирования
const popUpProfile = document.querySelector('.popup_edit'); //попап редактирования
const popupProfileFormElement = document.querySelector('.popup__form-data'); //форма попапа редактирования
const nameInput = document.querySelector('.popup__input_type_name'); //поле ввода "имя"
const jobInput = document.querySelector('.popup__input_type_about'); //поле ввода "о себе"
const profileName = document.querySelector('.profile__name'); //имя
const profileAbout = document.querySelector('.profile__about'); // о себе
const fullScreenImage = document.querySelector('.popup__full-image'); // картинка попапа изображения
const fullScreenText = document.querySelector('.popup__full-text'); //текст попапа изображения
const submitButtonCreate = document.querySelector('.popup__button_type_create'); //кнопка создать
const popUpAdd = document.querySelector('.profile__button-add'); //кнопка добавления
const popUpCards = document.querySelector('.popup_cards'); //попап добавления карточек
const cardsForm = document.querySelector('.popup__cards-form'); //форма карточек
//валидация 1 формы
const popUpProfileValidation = new FormValidator(
  validationConfig,
  popupProfileFormElement
);
//валидация 2 формы
popUpProfileValidation.enableValidation();
const popUpCardsValidation = new FormValidator(validationConfig, cardsForm);
popUpCardsValidation.enableValidation();

//открытие попап
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEsc);
}
//закрытие попап
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEsc);
}
//закрытие по esc
function closeByEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}
//универсальная функция
document.querySelectorAll('.popup').forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (
      evt.target === evt.currentTarget ||
      evt.target.classList.contains('popup__close-image')
    ) {
      closePopup(popup);
    }
  });
});

function assingValue() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileAbout.textContent;
  openPopup(popUpProfile);
}
function submitProfile(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileAbout.textContent = jobInput.value;
  closePopup(popUpProfile);
}

popupProfileOpenButton.addEventListener('click', assingValue);
popupProfileFormElement.addEventListener('submit', submitProfile);
popUpAdd.addEventListener('click', () => openPopup(popUpCards));

//делаем чистую функцию
const imageCollection = document.querySelector('.elements');
function renderCards(arr, selector, openPopup) {
  arr.forEach((item) => {
    const card = new Card(item, selector, openPopup);
    const cardTemplate = card.generateCard();
    imageCollection.prepend(cardTemplate);
  });
}
renderCards(initialCards, '#template-element', openPopup); //вызываем функцию с нашими данными
const cardsImage = document.querySelector('.popup__input_type_image');
const cardsLink = document.querySelector('.popup__input_type_link');
cardsForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const newCard = [{ link: cardsLink.value, name: cardsImage.value }];
  renderCards(newCard, '#template-element', openPopup);
  closePopup(popUpCards);
  cardsImage.value = '';
  cardsLink.value = '';
  submitButtonCreate.setAttribute('disabled', 'disabled');
  submitButtonCreate.classList.add('popup__button_disabled');
});
