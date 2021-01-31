export class UserInfo {

  //Принимает в конструктор объект с селекторами двух элементов: элемента имени пользователя и элемента информации о себе.
  constructor(nameSelector, aboutSelector, avatarSelector) {
    this._userName = document.querySelector(nameSelector)
    this._userAbout = document.querySelector(aboutSelector)
    this._userAvatar = document.querySelector(avatarSelector)//'.profile__avatar')
  }

  //Содержит публичный метод getUserInfo, который возвращает объект с данными пользователя. Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.
  getUserInfo() {
    return {name:this._userName.textContent, about:this._userAbout.textContent};
  }

  //Временно написали
  setUserInfoApi(data) {
    this._userName.textContent = data.name;
    this._userAbout.textContent = data.about;
    this._userAvatar.setAttribute('style',`background-image: url(${data.avatar})`)
  }

}
