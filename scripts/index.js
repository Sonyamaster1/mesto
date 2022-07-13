let openPopUp = document.querySelector('.profile__button-edit');
let closePopUp = document.querySelector('.popup__close');
let popUp = document.querySelector('.popup');
let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_about');
let profileName = document.querySelector('.profile__name');
let profileAbout = document.querySelector('.profile__about');

function openHandler() {
  popUp.classList.add('popup_opened');
}

function closeHandler() {
  popUp.classList.remove('popup_opened');
}
function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileAbout.textContent = jobInput.value;
  closeHandler();
  /*popUp.classList.remove('popup_opened');*/
}

openPopUp.addEventListener('click', openHandler);
closePopUp.addEventListener('click', closeHandler);
formElement.addEventListener('submit', formSubmitHandler);
