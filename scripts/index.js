import Card from './Card.js';
import FormValidator from './FormValidator.js';
import { initialCards, validationConfig } from './data.js';

const popupProfileOpenButton = document.querySelector('.profile__button-edit'); //кнопка для редактирования
const popUpProfile = document.querySelector('.popup_edit'); //попап редактирования
const popupProfileFormElement = document.querySelector('.popup__form-data'); //форма попапа редактирования
const nameInput = document.querySelector('.popup__input_type_name'); //поле ввода "имя"
const jobInput = document.querySelector('.popup__input_type_about'); //поле ввода "о себе"
const fullScreen = document.querySelector('.popup_full-screen'); //попап картинки
const fullImage = fullScreen.querySelector('.popup__full-image'); //изображение попапа
const fullText = fullScreen.querySelector('.popup__full-text'); //текст попапа
const profileName = document.querySelector('.profile__name'); //имя
const profileAbout = document.querySelector('.profile__about'); // о себе
const buttonSubmitFormCard = document.querySelector(
  '.popup__button_type_create'
); //кнопка создать
const popUpAdd = document.querySelector('.profile__button-add'); //кнопка добавления
const popUpCards = document.querySelector('.popup_cards'); //попап добавления карточек
const cardsForm = document.querySelector('.popup__cards-form'); //форма карточек
const imageCollection = document.querySelector('.elements');
const cardsImage = document.querySelector('.popup__input_type_image');
const cardsLink = document.querySelector('.popup__input_type_link');
//валидация 1 формы
const popUpProfileValidation = new FormValidator(
  validationConfig,
  popupProfileFormElement
);
popUpProfileValidation.enableValidation();
//валидация 2 формы
const popUpCardsValidation = new FormValidator(validationConfig, cardsForm);
popUpCardsValidation.enableValidation();

//открытие попап
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEsc);
  popUpProfileValidation.resetInputs();
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
// попап с изображением
function handlePopUp(name, link) {
  fullImage.src = link;
  fullText.textContent = name;
  fullImage.alt = `Перед вами ${fullText.textContent}`;
  openPopup(fullScreen);
}

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
function renderCards(item) {
  const card = new Card(item, '#template-element', openPopup, handlePopUp);
  const cardTemplate = card.generateCard();
  return cardTemplate;
}
function addCard(card, position) {
  position.prepend(card);
}

function createNewCard() {
  cardsForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const cardData = { name: cardsImage.value, link: cardsLink.value };
    addCard(renderCards(cardData), imageCollection);
    closePopup(popUpCards);
    cardsImage.value = '';
    cardsLink.value = '';
    popUpCardsValidation.inactiveButton();
    popUpCardsValidation.disabledButton();
  });
}
createNewCard();
initialCards.forEach((item) => {
  addCard(renderCards(item), imageCollection);
});
