import Popup from "./Popup";
export default class PopupWithSubmit extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._deleteButton = document.querySelector(".popup__button_type_delete");
  }
  open(call) {
    super.open();
    this.call = call;
    this._deleteButton.onclick = this.call;
  }
}
