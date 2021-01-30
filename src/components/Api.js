export class Api {
  constructor({address, token}) {
    this._address = address;
    this._token = token;
  }


  _checkResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
}

  addLike(data) {
    return fetch(`${this._address}/cards/likes/${data}`,{
      method: 'PUT',
      headers: {
        authorization: this._token
      }
    })
    .then(this._checkResponse)
  }


  removeLike(data) {
    return fetch(`${this._address}/cards/likes/${data}`,{
      method: 'DELETE',
      headers: {
        authorization: this._token
      }
    })
    .then(this._checkResponse)
  }


  getCards() {
    return fetch(`${this._address}/cards`,{
      method: 'GET',
      headers: {
        authorization: this._token
      }
    })
    .then(this._checkResponse)
  }


  getUserInfo() {
    return fetch(`${this._address}/users/me`,{
      method: 'GET',
      headers: {
        authorization: this._token
      }
    })
    .then(this._checkResponse)
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
    .then(this._checkResponse)
  }

  deleteCard(data) {
    console.log('deleteCard',data)
    return fetch(`${this._address}/cards/${data}`,{
      method: 'DELETE',
      headers: {
        authorization: this._token
      },
    })
    .then(this._checkResponse)
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
    .then(this._checkResponse)
  }


  addAvatar(data) {
    console.log(data.link)
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
    .then(this._checkResponse)
  }
}
