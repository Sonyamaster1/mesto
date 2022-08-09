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
const popupProfileOpenButton = document.querySelector('.profile__button-edit');
const popupProfileCloseButton = document.querySelector('.popup__close-data');
const popUpProfile = document.querySelector('.popup_edit');
const popupProfileFormElement = document.querySelector('.popup__form-data');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_about');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const popUp = document.querySelectorAll('.popup');

function openPopup(popup) {
  popup.classList.add('popup_opened');
}
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}
//закрытие по esc
function closeEscPopUp(evt) {
  if (evt.key === 'Escape') {
    popUp.forEach((popup) => {
      closePopup(popup);
    });
  }
}
//закрытие по overlay
function closeOverlayPopUp(evt) {
  if (evt.target === evt.currentTarget) {
    popUp.forEach((popup) => {
      closePopup(popup);
    });
  }
}

function assingValue() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileAbout.textContent;
  openPopup(popUpProfile);
  popUpProfile.addEventListener('keydown', closeEscPopUp); //присваивается событие
  popUpProfile.addEventListener('click', closeOverlayPopUp); //закрытие по overlay
}
function submitProfile(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileAbout.textContent = jobInput.value;
  closePopup(popUpProfile);
  popUpProfile.removeEventListener('keydown', closeEscPopUp); //событие удаляется
  popUpProfile.removeEventListener('click', closeOverlayPopUp); //закрытие по overlay
}

popupProfileOpenButton.addEventListener('click', assingValue);
popupProfileFormElement.addEventListener('submit', submitProfile);
popupProfileCloseButton.addEventListener('click', () =>
  closePopup(popUpProfile)
);

const popUpAdd = document.querySelector('.profile__button-add');
const popUpRemove = document.querySelector('.popup__close-cards');
const popUpCards = document.querySelector('.popup_cards');
const cardsForm = document.querySelector('.popup__cards-form');

popUpAdd.addEventListener('click', () => openPopup(popUpCards));
popUpRemove.addEventListener('click', () => closePopup(popUpCards));
popUpCards.addEventListener('click', closeOverlayPopUp); //закрытие по overlay
popUpCards.addEventListener('keydown', closeEscPopUp); //закрытие по esc

const imageCollection = document.querySelector('.elements');
const template = document
  .querySelector('#template-element')
  .content.querySelector('.element');
function createNewCard(cardName, cardLink) {
  const tamplateCard = template.cloneNode(true);
  const templateTitle = tamplateCard.querySelector('.element__title');
  const templateImage = tamplateCard.querySelector('.element__image');
  templateImage.src = cardName;
  templateTitle.textContent = cardLink;
  templateImage.setAttribute('alt', `${templateTitle.textContent}`);
  popUpCards.classList.remove('popup_opened');
  //лайк
  const elementLike = tamplateCard.querySelector('.element__like');
  elementLike.addEventListener('click', addActive);
  //мусорка
  const elementTrash = tamplateCard.querySelector('.element__button-trash');
  elementTrash.addEventListener('click', deleteCard);
  //картинка на большом разрешении
  const elementText = tamplateCard.querySelector('.element__title');
  const fullScreenImage = document.querySelector('.popup__full-image');
  const fullScreenText = document.querySelector('.popup__full-text');
  function assingClass(event) {
    fullScreenImage.src = event.target.src;
    fullScreenText.textContent = elementText.textContent;
    fullScreenImage.setAttribute('alt', `${elementText.textContent}`);
    openPopup(fullScreen);
  }

  templateImage.addEventListener('click', assingClass);
  fullScreen.addEventListener('click', closeOverlayPopUp); //закрытие по overlay
  fullScreen.addEventListener('keydown', closeEscPopUp); //закрытие по esc
  return tamplateCard;
}

function addActive(evt) {
  evt.target.classList.toggle('element__like_active');
}
function deleteCard(evt) {
  const evtTarget = evt.target;
  cardClose = evtTarget.closest('.element');
  cardClose.remove();
}
const fullScreen = document.querySelector('.popup_full-screen');
fullScreen.focus();
const fullScreenClose = document.querySelector('.popup__close-full-screen');
fullScreenClose.addEventListener('click', () => closePopup(fullScreen));

const cardsImage = document.querySelector('.popup__input_type_image');
const cardsLink = document.querySelector('.popup__input_type_link');
cardsForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  const newCard = createNewCard(cardsLink.value, cardsImage.value);
  renderCard(newCard, imageCollection);
  closePopup(popUpCards);
  cardsImage.value = '';
  cardsLink.value = '';
  const submitButtonCreate = document.querySelector(
    '.popup__button_type_create'
  );
  submitButtonCreate.setAttribute('disabled', 'disabled');
  submitButtonCreate.classList.add('popup__button_disabled');
});

function createInitialCards() {
  initialCards.forEach(function (element) {
    renderCard(createNewCard(element.link, element.name), imageCollection);
  });
}

createInitialCards();

function renderCard(card, container) {
  container.prepend(card);
}
