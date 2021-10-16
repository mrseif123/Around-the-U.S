export default class Api {
  constructor({
    baseUrl,
    authorization
  }) {
    this._baseUrl = baseUrl;
    this._auth = authorization;
  }

  _checkResponse(res) {
    {
      if (!res.ok) {
        return Promise.reject(`${res.status} error!`);
      }
      return res.json();
    }
  }

  async getUserInfo() {
    const res = await fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: this._auth,
      },
    });
    return this._checkResponse(res);
  }

  async getGroupCards() {
    const res = await fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: this._auth,
      },
    });
    return this._checkResponse(res);
  }

  async updateProfile({
    name,
    about
  }) {
    const res = await fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._auth,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    });
    return this._checkResponse(res);
  }

  async updateAvatar({
    avatar
  }) {
    const res = await fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._auth,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        avatar: avatar
      }),
    });
    return this._checkResponse(res);
  }

  async addCard({
    name,
    link
  }) {
    const res = await fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._auth,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        link,
      }),
    });
    return this._checkResponse(res);
  }

  async likeCard(cardId) {
    const res = await fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: {
        authorization: this._auth,
        'Content-Type': 'application/json',
      },
    });
    return this._checkResponse(res);
  }

  async removeLike(cardId) {
    const res = await fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._auth,
        'Content-Type': 'application/json',
      },
    });
    return this._checkResponse(res);
  }

  async deleteCard(cardId) {
    const res = await fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._auth,
        'Content-Type': 'application/json',
      },
    });
    return this._checkResponse(res);
  }
}