import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import { initialCards, validationConfig } from '../utils/constants.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import {
  popupProfileOpenButton,
  popupProfileFormElement,
  nameInput,
  jobInput,
  popUpAdd,
  cardsForm,
  cardsImage,
  cardsLink,
} from '../utils/constants.js';
//валидация 1 формы
const popUpProfileValidation = new FormValidator(
  validationConfig,
  popupProfileFormElement
);
popUpProfileValidation.enableValidation();
//валидация 2 формы
const popUpCardsValidation = new FormValidator(validationConfig, cardsForm);
popUpCardsValidation.enableValidation();

// функция для создания карточки
function createNewCard(item) {
  const card = new Card(
    {
      data: item,
      handleCardClick: (name, link) => {
        fullScreen.open(name, link);
      },
    },
    '#template-element'
  );
  const cardTemplate = card.generateCard();
  return cardTemplate;
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
