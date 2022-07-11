let openPopUp = document.querySelector(".profile__button-edit");
let closePopUp = document.querySelector(".popup__close");
let popUp = document.querySelector(".popup");

openPopUp.addEventListener("click", function (evt) {
  evt.preventDefault();
  popUp.classList.add("popup_opened");
});
closePopUp.addEventListener("click", function () {
  popUp.classList.remove("popup_opened");
});

let formElement = document.querySelector(".popup__form");
let nameInput = document.querySelector(".popup__input_first");
let jobInput = document.querySelector(".popup__input_second");
let saveButton = document.querySelector(".popup_button");
let profileName = document.querySelector(".profile__name");
let profileAbout = document.querySelector(".profile__about");
function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileAbout.textContent = jobInput.value;
  popUp.classList.remove("popup_opened");
}
formElement.addEventListener("submit", formSubmitHandler);
