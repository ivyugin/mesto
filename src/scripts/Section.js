export default class Section {
    constructor ({renderer, elementSelector}) {
        this._renderer = renderer;
        this._container = document.querySelector(elementSelector);
    }

    rendererItem(item) {
        this._renderer(item);
    }

    addItem (element) {
        this._container.prepend(element);
    }
}