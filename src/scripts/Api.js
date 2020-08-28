export default class Api {
    constructor(baseUrl, token) {
        this._token = token;
        this._baseUrl = baseUrl;
    }

    getUserInfo() {
        return fetch(this._baseUrl + '/users/me', {
            headers: {
                authorization: this._token
            }
            })
            .then(res => res.json())
            .then((result) => {
                return result;
        })
        .catch((err) => {
            console.log(err);
          });
    }

    getCardsArr() {
        return fetch(this._baseUrl + '/cards', {
            headers: {
                authorization: this._token
            }
            })
        .then(res => {
                if (res.ok) {
                    return res.json()
                  }
                return Promise.reject(res.status);
            })  
        .catch((err) => {
            console.log(err);
          });
    }

    editUserInfo(userInfo) {
        return fetch(this._baseUrl + '/users/me', {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userInfo)
            })
            .then(res => {
                if (res.ok) {
                    return res.json()
                  }
                return Promise.reject(res.status);
            })
        .catch((err) => {
            console.log(err);
          });
    }

    setUserAvatar(avatar) {
       return fetch(this._baseUrl + '/users/me/avatar', {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(avatar)
            })
            .then(res => {
                if (res.ok) {
                    return res.json()
                  }
                return Promise.reject(res.status);
            })
        .catch((err) => {
            console.log(err);
          });
    }

    addNewCard(card) {
        return fetch(this._baseUrl + '/cards', {
            method: 'POST',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(card)
            })
        .then(res => {
            if (res.ok) {
              return res.json()
            }
            return Promise.reject(res.status);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    deleteCard(cardID) {
        return fetch(this._baseUrl + '/cards/' + cardID, {
            method: 'DELETE',
            headers: {
                authorization: this._token
            }
            })
    .then(res => {
        if (res.ok) {
            return res.json()
          }
        return Promise.reject(res.status);
    })
    .catch((err) => {
        console.log(err);
      });
    }

    likeCard(cardID, methodLike) {
        return fetch(this._baseUrl + '/cards/likes/' + cardID, {
            method: methodLike,
            headers: {
                authorization: this._token
            }
            })
        .then(res => {
          if (res.ok) {
              return res.json()
            }
          return Promise.reject(res.status);
        })
        .catch((err) => {
          console.log(err);
        });
    }
}