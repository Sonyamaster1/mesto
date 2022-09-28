export default class Section {
  constructor({ elem, renderer }, selector) {
    this._reversedElem = elem;
    this._container = document.querySelector(selector);
    this._renderer = renderer;
  }
  addItem(element) {
    this._container.prepend(element);
  }
  renderItems() {
    this._reversedElem.forEach((item) => this._renderer(item));
  }
}
