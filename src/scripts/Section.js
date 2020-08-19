export default class Section {
    constructor ({ items, renderer }, elementSelector) {
        this.items = items;
        this._renderer = renderer;
        this._container = document.querySelector(elementSelector);
    }

    rendererItems () {
        this.items.forEach(item => this._renderer(item));
    }

    addItem (element) {
        this._container.prepend(element);
    }
}