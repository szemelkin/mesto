
export class Section {
  constructor({data, renderer}, containerSelector) {
    this._initialArray = data;
    this._renderer = renderer;
    this._container = containerSelector;
  }

  render() {
    console.log('Section render',this._initialArray)
    this._initialArray.forEach((item) => {
      this._renderer(item);
    });
  }

  setItem(element){
    this._container.prepend(element);
  }

}
