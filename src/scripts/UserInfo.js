export default class UserInfo {
    constructor(nameSelector, infoSelector) {
        this._profileName = document.querySelector(nameSelector);
        this._profileJob = document.querySelector(infoSelector);
        console.log(nameSelector);
    }

    getUserInfo() {
        return { title: this._profileName.textContent, subtitle: this._profileJob.textContent }
    }

    setUserInfo(title, subtitle) {
        this._profileName.textContent = title;
        this._profileJob.textContent = subtitle;
    }
}