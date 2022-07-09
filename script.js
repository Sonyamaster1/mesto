let openPopUp = document.querySelector(".profile__button_edit");
let closePopUp = document.querySelector(".popup__close");
let popUp = document.querySelector(".popup");

openPopUp.addEventListener("click", function (evt) {
  evt.preventDefault();
  popUp.classList.add("popup_opened");
});
closePopUp.addEventListener("click", function () {
  popUp.classList.remove("popup_opened");
});

let formElement = document.querySelector(".popup_form");
let nameInput = document.querySelector(".popup_input_first");
let jobInput = document.querySelector(".popup_input_second");
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
