const openPopUp = document.querySelector('.profile__button-edit');
const closePopUp = document.querySelector('.popup__close');
const popUp = document.querySelector('.popup');
const formElement = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_about');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
function openHandler() {
  popUp.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileAbout.textContent;
}

function closeHandler() {
  popUp.classList.remove('popup_opened');
}
function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileAbout.textContent = jobInput.value;
  closeHandler();
}
openPopUp.addEventListener('click', openHandler);
closePopUp.addEventListener('click', closeHandler);
formElement.addEventListener('submit', formSubmitHandler);
//popup
const popUpAdd = document.querySelector('.profile__button-add');
const popUpRemove = document.querySelector('.popup__close-cards');
const popUpCards = document.querySelector('.popup_cards');
const cardsForm = document.querySelector('.popup__cards-form');

function popUpOpen() {
  popUpCards.classList.add('popup_opened');
}
function popUpClose() {
  popUpCards.classList.remove('popup_opened');
}
popUpAdd.addEventListener('click', popUpOpen);
popUpRemove.addEventListener('click', popUpClose);
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
const imageCollection = document.querySelector('.elements');
const template = document
  .querySelector('#template-element')
  .content.querySelector('.element');
function createNewCards(cardName, cardLink) {
  const tamplateCard = template.cloneNode(true);
  const templateImage = tamplateCard.querySelector('.element__image');
  const templateTitle = tamplateCard.querySelector('.element__title');
  templateImage.src = cardName;
  templateTitle.textContent = cardLink;
  imageCollection.prepend(tamplateCard);
  popUpCards.classList.remove('popup_opened');

  const elementTrash = document.querySelector('.element__button-trash'); //trash
  function clearElement(evt) {
    const evtTarget = evt.target;
    cardClose = evtTarget.closest('.element');
    cardClose.remove();
  }
  elementTrash.addEventListener('click', clearElement);

  const elementLike = document.querySelector('.element__like'); //like
  function addActive(evt) {
    evt.target.classList.toggle('element__like_active');
  }
  elementLike.addEventListener('click', addActive);
  const fullScreen = document.querySelector('.full-screen');
  const fullScreenClose = document.querySelector('.full-screen__close');
  const fullScreenOpen = document.querySelector('.element__image');
  const elementText = document.querySelector('.element__title');
  const fullScreenImage = document.querySelector('.full-screen__image');
  const fullScreenText = document.querySelector('.full-screen__text');
  function openFull() {
    fullScreen.classList.add('full-screen__image-big');
    fullScreenImage.src = fullScreenOpen.src;
    fullScreenText.textContent = elementText.textContent;
  }
  function closeFull() {
    fullScreen.classList.remove('full-screen__image-big');
  }
  fullScreenOpen.addEventListener('click', openFull);
  fullScreenClose.addEventListener('click', closeFull);

  return tamplateCard;
}

function addEventListener() {
  const cardsImage = document.querySelector('.popup__input_type_image');
  const cardsLink = document.querySelector('.popup__input_type_link');
  cardsForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    createNewCards(cardsLink.value, cardsImage.value);
    cardsImage.value = '';
    cardsLink.value = '';
  });
}

function createInitialCards() {
  initialCards.forEach(function (element) {
    createNewCards(element.link, element.name);
  });
}
addEventListener();
createInitialCards();
