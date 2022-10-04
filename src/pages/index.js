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
  submitButton,
} from "../utils/constants.js";
import { data } from "autoprefixer";

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
let cardList; // изменяю значение ниже, поэтому не могу обьявить константу
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
      api
        .patchUserInfo({
          name: data.name,
          about: data.about,
        })
        .then(() => {
          profilePopup.setUserInfo({
            name: data.name,
            about: data.about,
          });
        })
        .then(() => newProfilePopup.close())
        .then(() => {
          popUpProfileValidation.disabledButton(),
            popUpProfileValidation.resetInputs();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          submitButton.textContent = "Сохранить";
        });
    },
  },
  ".popup_edit"
);
newProfilePopup.setEventListeners();
// попап добавления карточек
const newCardPopup = new PopupWithForm(
  {
    handleFormSubmit: (item) => {
      api
        .postNewCard({ name: item.image, link: item.link })
        .then((data) => {
          cardList.addItem(
            createNewCard({
              name: data.name,
              link: data.link,
              owner: { _id: userId },
              likes: data.likes,
              _id: data._id,
            })
          );
        })
        .then(
          () => newCardPopup.close(),
          popUpCardsValidation.resetInputs(),
          popUpCardsValidation.disabledButton()
        )
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          submitButton.textContent = "Сохранить";
        });
    },
  },
  ".popup_cards"
);
newCardPopup.setEventListeners(); // создаются карточки

// попап  с картинкой
const fullScreen = new PopupWithImage(".popup_full-screen");
fullScreen.setEventListeners();

// попап аватара
const popupAvatar = new PopupWithForm(
  {
    handleFormSubmit: (data) => {
      api
        .patchAvatarInfo({ avatar: data.avatar }) // это метод класса Api
        .then((info) => {
          profilePopup.setAvatarInfo({ link: info.avatar }); // это метод из класса UserInfo. profilePopup - экземпляр класса UserInfo
        })
        .then(() => {
          popupAvatar.close(),
            popUpAvatarValidation.resetInputs(),
            popUpAvatarValidation.disabledButton();
        })
        .catch((err) => console.log(err))
        .finally(() => {
          submitButton.textContent = "Сохранить";
        });
    },
  },
  ".popup_avatar"
);
popupAvatar.setEventListeners();
// навешиваем слушатель на кнопку
popUpAdd.addEventListener("click", () => {
  newCardPopup.open();
});
// навешиваем слушатель на кнопку
popupProfileOpenButton.addEventListener("click", function () {
  newProfilePopup.open();
  newProfilePopup.setInputsValues(profilePopup.getUserInfo());
});
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
      item.toggleLikeCard(data);
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
      item.toggleLikeCard(data);
    })
    .catch((err) => {
      console.log(err);
    });
}
// данные пользователя
let userId; // изменяю значение ниже, поэтому не могу обьявить константу
const userInfo = api
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
