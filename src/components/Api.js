export class Api {
  constructor({address, token}) {
    this._address = address;
    this._token = token;
  }


  addLike(data) {
    return fetch(`${this._address}/cards/likes/${data}`,{
      method: 'PUT',
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


  removeLike(data) {
    return fetch(`${this._address}/cards/likes/${data}`,{
      method: 'DELETE',
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
      return Promise.reject(`Ошибка: ${res.status}`);
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
    console.log('deleteCard',data)
    return fetch(`${this._address}/cards/${data}`,{
      method: 'DELETE',
      headers: {
        authorization: this._token
      },
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
