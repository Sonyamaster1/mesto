import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import { validationConfig } from "../utils/constants.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api";
import PopupWithSubmit from "../components/PopupWithSubmit.js";
import {
  popupProfileOpenButton,
  popupProfileFormElement,
  popUpAdd,
  cardsForm,
  cardsImage,
  cardsLink,
  avatarForm,
  avatarPen,
} from "../utils/constants.js";

// объект Api
const apiData = {
  url: "https://mesto.nomoreparties.co/v1/cohort-51",
  headers: {
    "content-type": "application/json",
    authorization: "35801359-77af-460b-835b-a39f894888d4",
  },
};
//валидация 1 формы
const popUpProfileValidation = new FormValidator(
  validationConfig,
  popupProfileFormElement
);
popUpProfileValidation.enableValidation();
//валидация 2 формы
const popUpCardsValidation = new FormValidator(validationConfig, cardsForm);
popUpCardsValidation.enableValidation();
//валидация 3 формы
const popUpAvatarValidation = new FormValidator(validationConfig, avatarForm);
popUpAvatarValidation.enableValidation();

// объект класса Api
const api = new Api(apiData);
// получаем начальный набор карточек
let cardList;
const elementaryCards = api
  .getInitialCards()
  .then(function (data) {
    cardList = new Section(
      {
        elem: data.reverse(), // переворачивем массив, чтобы карточки добавлялись в начало
        renderer: (item) => {
          cardList.addItem(createNewCard(item));
        },
      },
      ".elements"
    );
  })
  .catch((err) => {
    console.log(err);
  });
// функция для создания карточки
function createNewCard(item) {
  const card = new Card(
    {
      data: item,
      userId: userId,
      handleCardClick: (name, link) => {
        fullScreen.open(name, link);
      },
      handleDeleteCard,
      handleLikeCard,
      handleDeleteLikeCard,
    },
    "#template-element"
  );
  const cardTemplate = card.generateCard();
  return cardTemplate;
}
// создание экземпляра UserInfo
const profilePopup = new UserInfo({
  profileName: ".profile__name",
  profileAbout: ".profile__about",
  profileAvatar: ".profile__avatar",
});
// создание экземпляра PopupWithForm
const newProfilePopup = new PopupWithForm(
  {
    handleFormSubmit: (data) => {
      profilePopup.setUserInfo({
        name: data.name,
        about: data.about,
      });
      api
        .patchUserInfo({
          name: data.name,
          about: data.about,
        })
        .catch((err) => {
          console.log(err);
        });
      popUpProfileValidation.resetInputs(); //очищаем валидацию
      popUpProfileValidation.disabledButton();
    },
  },
  ".popup_edit"
);
newProfilePopup.setEventListeners();
// навешиваем слушатель на кнопку
popupProfileOpenButton.addEventListener("click", function () {
  newProfilePopup.open();
  newProfilePopup.setInputsValues(profilePopup.getUserInfo());
});
// попап добавления карточек
const newCardPopup = new PopupWithForm(
  {
    handleFormSubmit: () => {
      const serverData = { name: cardsImage.value, link: cardsLink.value };
      api
        .postNewCard(serverData)
        .then((serverData) => {
          cardList.addItem(createNewCard(serverData));
          popUpCardsValidation.resetInputs();
          popUpCardsValidation.disabledButton();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  ".popup_cards"
);
newCardPopup.setEventListeners(); // создаются карточки
// навешиваем слушатель на кнопку
popUpAdd.addEventListener("click", () => {
  newCardPopup.open();
});

// попап  с картинкой
const fullScreen = new PopupWithImage(".popup_full-screen");
fullScreen.setEventListeners();

// попап аватара
const popupAvatar = new PopupWithForm(
  {
    handleFormSubmit: (data) => {
      profilePopup.setAvatarInfo({ link: data.link });
      api
        .patchAvatarInfo({ avatar: data.avatar })
        .then(() => {})
        .catch((err) => {
          console.log(err);
        });
      popUpAvatarValidation.resetInputs();
      popUpAvatarValidation.disabledButton();
    },
  },
  ".popup_avatar"
);
popupAvatar.setEventListeners();
// навешиваем слушатель на кнопку
avatarPen.addEventListener("click", () => {
  popupAvatar.open();
});
// попап удаления
const popupTrash = new PopupWithSubmit(".popup_trash");
popupTrash.setEventListeners();
// функция удаления карточек
function handleDeleteCard(item) {
  popupTrash.open(() => {
    api
      .deleteCard(item.getId())
      .then(() => {
        item.remove();
        popupTrash.close();
      })
      .catch((err) => {
        console.log(err);
      });
  });
}
// функция добавления лайка
function handleLikeCard(item) {
  api
    .getLike(item.getId())
    .then((data) => {
      item.getLikeCard(data);
    })
    .catch((err) => {
      console.log(err);
    });
}
// функция удаления лайка
function handleDeleteLikeCard(item) {
  api
    .deleteLike(item.getId())
    .then((data) => {
      item.deleteLikeCard(data);
    })
    .catch((err) => {
      console.log(err);
    });
}
// данные пользователя
let userId;
let userInfo = api
  .getInfo()
  .then((data) => {
    userId = data._id;
    profilePopup.setUserInfo({
      name: data.name,
      about: data.about,
      avatar: data.avatar,
    });
  })
  .catch((err) => {
    console.log(err);
  });
// чтобы все информация загружалась одновременно
Promise.all([userInfo, elementaryCards]).then(() => cardList.renderItems());
