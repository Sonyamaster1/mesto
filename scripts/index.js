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
const popUpProfile = document.querySelector('.popup_edit');
const popupProfileFormElement = document.querySelector('.popup__form-data');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_about');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const fullScreenImage = document.querySelector('.popup__full-image');
const fullScreenText = document.querySelector('.popup__full-text');
const submitButtonCreate = document.querySelector('.popup__button_type_create');

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEsc);
}
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

const popUpAdd = document.querySelector('.profile__button-add');
const popUpCards = document.querySelector('.popup_cards');
const cardsForm = document.querySelector('.popup__cards-form');

popUpAdd.addEventListener('click', () => openPopup(popUpCards));

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
  function assingClass(event) {
    fullScreenText.textContent = cardLink;
    fullScreenImage.src = cardName;
    fullScreenImage.setAttribute('alt', cardLink);
    openPopup(fullScreen);
  }

  templateImage.addEventListener('click', assingClass);
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

const cardsImage = document.querySelector('.popup__input_type_image');
const cardsLink = document.querySelector('.popup__input_type_link');
cardsForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  const newCard = createNewCard(cardsLink.value, cardsImage.value);
  renderCard(newCard, imageCollection);
  closePopup(popUpCards);
  cardsImage.value = '';
  cardsLink.value = '';
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
