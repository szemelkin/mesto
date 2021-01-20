
export class Section {
  constructor({data, renderer}, containerSelector) {
    this._initialArray = data;
    this._renderer = renderer;
    this._container = containerSelector;
  }

  render() {
    this._initialArray.forEach((item) => {
      this._renderer(item);
    });
  }

  setItem(element){
    this._container.prepend(element);
  }

}
