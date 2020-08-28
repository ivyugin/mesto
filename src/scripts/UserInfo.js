export default class UserInfo {
    constructor(nameSelector, infoSelector, id) {
        this._profileName = document.querySelector(nameSelector);
        this._profileJob = document.querySelector(infoSelector);
        this.id = id;
    }

    getUserId() {
        return this.id;
    }

    getUserInfo() {
        return { title: this._profileName.textContent, subtitle: this._profileJob.textContent }
    }

    setUserInfo(title, subtitle, id) {
        this._profileName.textContent = title;
        this._profileJob.textContent = subtitle;
        this.id = id;
    }

    setUserAvatar(avatarLink, avatarSelector) {
        document.querySelector(avatarSelector).src = avatarLink;
    }
}