// 'https://mesto.nomoreparties.co/v1/cohort-19'
// '2a94bf63-3818-4ae4-afdc-14a08472aae2'



export class Api {
  constructor({address, token}) {
    this._address = address;
    this._token = token;
  }


  getCards() {
    return fetch(`${this._address}/cards`,{
      method: 'GET',
      headers: {
        authorization: this._token
      }
    })
    .then(res =>{
      if (res.ok) {
        return res.json();
      }
      // если ошибка, отклоняем промис
      // return Promise.reject(`Ошибка: ${res.status}`);
    })
  }


  getUserInfo() {
    return fetch(`${this._address}/users/me`,{
      method: 'GET',
      headers: {
        authorization: this._token
      }
    })
    .then(res =>{
      if (res.ok) {
        return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }


  addCard(data) {
    return fetch(`${this._address}/cards`,{
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
    .then(res =>{
      if (res.ok) {
        return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  deleteCard(data) {
    return fetch(`${this._address}/cards/${data._id}`,{
      method: 'DELETE',
      headers: {
        authorization: this._token
        // 'Content-Type': 'application/json'
      },
      // body: JSON.stringify({
      //   name: data.name,
      //   link: data.link
      // })
    })
    .then(res =>{
      if (res.ok) {
        return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  editProfile(data) {
    return fetch(`${this._address}/users/me`,{
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
    .then(res =>{
      if (res.ok) {
        return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }


  addAvatar(data) {
    return fetch(`${this._address}/users/me/avatar`,{
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: data.link
      })
    })
    .then(res =>{
      if (res.ok) {
        return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }
}
