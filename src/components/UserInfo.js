export class UserInfo {

  //Принимает в конструктор объект с селекторами двух элементов: элемента имени пользователя и элемента информации о себе.
  constructor(nameSelector, aboutSelector) {
    this._userName = document.querySelector(nameSelector)
    this._userAbout = document.querySelector(aboutSelector)
    this._userAvatar = document.querySelector('.profile__avatar')
  }

  //Содержит публичный метод getUserInfo, который возвращает объект с данными пользователя. Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.
  getUserInfo(data) {
    return {name:data.name, about:data.about, id: data._id};
  }

  // //Содержит публичный метод setUserInfo, который принимает новые данные пользователя и добавляет их на страницу.
  // setUserInfo(name, status) {
  //   // console.log(name, status)
  //   this._userName.textContent = name;
  //   this._userAbout.textContent = status;
  // }

  //Временно написали
  setUserInfoApi(data) {
    // console.log('setUserInfoApi',data.avatar)
    this._userName.textContent = data.name;
    this._userAbout.textContent = data.about;
    this._userAvatar.setAttribute('style',`background-image: url(${data.avatar})`)
    // (`#${inputElement.name}-error`);
  }

  getUserId(data) {
    this._userId = data._id
    console.log(this._userId )
    return this._userId
  }

}
