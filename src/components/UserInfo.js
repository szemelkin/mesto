export class UserInfo {

  //Принимает в конструктор объект с селекторами двух элементов: элемента имени пользователя и элемента информации о себе.
  constructor(nameSelector, aboutSelector) {
    this._userName = document.querySelector(nameSelector)
    this._userAbout = document.querySelector(aboutSelector)
  }

  //Содержит публичный метод getUserInfo, который возвращает объект с данными пользователя. Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.
  getUserInfo() {
    return {name:this._userName.textContent, status:this._userAbout.textContent};
  }

  //Содержит публичный метод setUserInfo, который принимает новые данные пользователя и добавляет их на страницу.
  setUserInfo(name, status) {
    this._userName.textContent = name;
    this._userAbout.textContent = status;
  }

}
