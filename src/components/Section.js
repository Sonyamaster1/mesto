export default class Section {
  constructor({ data, renderer }, selector) {
    this._initialArray = data;
    this._container = document.querySelector(selector);
    this._renderer = renderer;
  }
  addItem(element) {
    this._container.prepend(element);
  }
  renderItems() {
    this._initialArray.forEach((item) => this._renderer(item));
  }
}
