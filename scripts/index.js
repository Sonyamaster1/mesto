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
const popUpFormOpen = document.querySelector('.profile__button-edit');
const popUpFormClose = document.querySelector('.popup__close-data');
const popUpProfile = document.querySelector('.popup_edit');
const formElement = document.querySelector('.popup__form-data');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_about');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');

function openHandler(popup) {
  //новый попап шаблон
  popup.classList.add('popup_opened');
}
function closeHandler(popup) {
  popup.classList.remove('popup_opened');
}

function assingValue() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileAbout.textContent;
  openHandler(popUpProfile);
}
function submitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileAbout.textContent = jobInput.value;
  closeHandler(popUpProfile);
}
popUpFormOpen.addEventListener('click', assingValue);
formElement.addEventListener('submit', submitHandler);
popUpFormClose.addEventListener('click', () => closeHandler(popUpProfile));

const popUpAdd = document.querySelector('.profile__button-add');
const popUpRemove = document.querySelector('.popup__close-cards');
const popUpCards = document.querySelector('.popup_cards');
const cardsForm = document.querySelector('.popup__cards-form');

popUpAdd.addEventListener('click', () => openHandler(popUpCards));
popUpRemove.addEventListener('click', () => closeHandler(popUpCards));

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
  closeHandler(popUpCards);
  //лайк
  const elementLike = tamplateCard.querySelector('.element__like');
  elementLike.addEventListener('click', addActive);
  //мусорка
  const elementTrash = tamplateCard.querySelector('.element__button-trash');
  elementTrash.addEventListener('click', clearElement);
  //картинка на большом разрешении
  const elementText = tamplateCard.querySelector('.element__title');
  const fullScreenImage = document.querySelector('.popup__full-image');
  const fullScreenText = document.querySelector('.popup__full-text');
  function assingClass(event) {
    fullScreenImage.src = event.target.src;
    fullScreenText.textContent = elementText.textContent;
    fullScreenImage.setAttribute('alt', `${elementText.textContent}`);
    openHandler(fullScreen);
  }
  templateImage.addEventListener('click', assingClass);

  return tamplateCard;
}

function addActive(evt) {
  evt.target.classList.toggle('element__like_active');
}
function clearElement(evt) {
  const evtTarget = evt.target;
  cardClose = evtTarget.closest('.element');
  cardClose.remove();
}
const fullScreen = document.querySelector('.popup_full-screen');
const fullScreenClose = document.querySelector('.popup__close-full-screen');
fullScreenClose.addEventListener('click', () => closeHandler(fullScreen));

const cardsImage = document.querySelector('.popup__input_type_image');
const cardsLink = document.querySelector('.popup__input_type_link');
cardsForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  const newCard = createNewCard(cardsLink.value, cardsImage.value);
  renderCard(newCard, imageCollection);
  cardsImage.value = '';
  cardsLink.value = '';
});

function createInitialCards() {
  initialCards.forEach(function (element) {
    createNewCard(element.link, element.name);
    renderCard(createNewCard(element.link, element.name), imageCollection);
  });
}
createInitialCards();

function renderCard(card, container) {
  container.prepend(card);
}
