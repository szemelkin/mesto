export class Section {
  constructor({renderer}, containerSelector) {
    this._renderer = renderer;
    this._container = containerSelector;
  }

  render(data) {
    this._initialArray = data;
    this._initialArray.forEach((item) => {
      this._renderer(item);
    });
  }

  setItem(element){
    this._container.prepend(element);
  }

}
