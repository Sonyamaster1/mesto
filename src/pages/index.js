import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import { initialCards, validationConfig } from '../utils/constants.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

const popupProfileOpenButton = document.querySelector('.profile__button-edit'); //кнопка для редактирования
const popUpProfile = document.querySelector('.popup_edit'); //попап редактирования
const popupProfileFormElement = document.querySelector('.popup__form-data'); //форма попапа редактирования
const nameInput = document.querySelector('.popup__input_type_name'); //поле ввода "имя"
const jobInput = document.querySelector('.popup__input_type_about'); //поле ввода "о себе"
//const fullScreen = document.querySelector('.popup_full-screen'); //попап картинки

const profileName = document.querySelector('.profile__name'); //имя
const profileAbout = document.querySelector('.profile__about'); // о себе
const buttonSubmitFormCard = document.querySelector(
  '.popup__button_type_create'
); //кнопка создать
const popUpAdd = document.querySelector('.profile__button-add'); //кнопка добавления
//const popUpCards = document.querySelector('.popup_cards'); //попап добавления карточек
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

// функция открытия попапа
const popupFullScreen = document.querySelector('.popup_full-screen');
/*const fullImage = document.querySelector('.popup__full-image'); //изображение попапа
const fullText = document.querySelector('.popup__full-text'); //текст попапа*/
function handleCardClick(name, link) {
  popupFullScreen.open(name, link);
}

// селекторы попапа редактирования
const profileSelectors = {
  profileName: '.profile__name',
  profileAbout: '.profile__about',
};
// создание экземпляра PopupWithForm
const profilePopup = new UserInfo(profileSelectors); // передаем селекторы
const newProfilePopup = new PopupWithForm(
  {
    handleFormSubmit: (elem) => {
      profilePopup.setUserInfo(elem);
      const profileData = profilePopup.getUserInfo();
      profileData.name = nameInput.value;
      profileData.about = jobInput.value;
      popUpProfileValidation.resetInputs();
    },
  },
  '.popup_edit'
);
newProfilePopup.setEventListeners();
// навешиваем слушатель на кнопку
popupProfileOpenButton.addEventListener('click', function () {
  newProfilePopup.open();
});
// новая карточка
const cardList = new Section(
  {
    data: initialCards,
    renderer: (item) => {
      cardList.addItem(createNewCard(item));
    },
  },
  '.elements'
);
cardList.renderItems();
// функция для создания карточки
function createNewCard(item) {
  const card = new Card(item, '#template-element', open, handleCardClick);
  const cardTemplate = card.generateCard();
  return cardTemplate;
}

// попап добавления карточек
const newCardPopup = new PopupWithForm(
  {
    handleFormSubmit: (item) => {
      const cardData = { name: cardsImage.value, link: cardsLink.value };
      cardList.addItem(createNewCard(cardData));
      popUpCardsValidation.resetInputs();
      popUpCardsValidation.disabledButton();
    },
  },
  '.popup_cards'
);
newCardPopup.setEventListeners();
// навешиваем слушатель на кнопку
popUpAdd.addEventListener('click', () => {
  newCardPopup.open();
});
// попап  с картинкой
const fullScreen = new PopupWithImage('.popup_full-screen');
fullScreen.setEventListeners();

//делаем чистую функцию
/*function createCard(item) {
  const card = new Card(item, '#template-element', openPopup, handleCardClick);
  const cardTemplate = card.generateCard();
  return cardTemplate;
}*/

/*function addCard(card, position) {
  position.prepend(card);
}

function createNewCard() {
  cardsForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const cardData = { name: cardsImage.value, link: cardsLink.value };
    addCard(createCard(cardData), imageCollection);
    closePopup(popUpCards);
    cardsImage.value = '';
    cardsLink.value = '';
    popUpCardsValidation.disabledButton();
  });
}
createNewCard();
initialCards.forEach((item) => {
  addCard(createCard(item), imageCollection);
});*/
