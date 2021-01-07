export class UserInfo {

  //Принимает в конструктор объект с селекторами двух элементов: элемента имени пользователя и элемента информации о себе.
  constructor() {
  }

  //Содержит публичный метод getUserInfo, который возвращает объект с данными пользователя. Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.
  getUserInfo() {
    this._userName = document.querySelector('.profile__title').textContent
    this._userAbout = document.querySelector('.profile__text').textContent
    return {name:this._userName, status:this._userAbout};
  }

  //Содержит публичный метод setUserInfo, который принимает новые данные пользователя и добавляет их на страницу.
  setUserInfo(name, status) {
    document.querySelector('.profile__title').textContent = name;
    document.querySelector('.profile__text').textContent = status;
  }

}
