class Section {
    constructor({ items, renderer, containerSelector }) {
        this._items = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);

        if (!this._container) {
            console.error(`Container with selector "${containerSelector}" not found.`);
        }
    }

   renderItems() {
    if (!this._container) return;

    this._items.forEach((item) => {
        const renderedItem = this._renderer(item);

        // Ensure the rendered item is a valid DOM node
        if (renderedItem instanceof Node) {
            this._container.appendChild(renderedItem);
        } else {
            console.error('Renderer function did not return a valid DOM node:', renderedItem);
        }
    });
}


    addItem(element) {
        if (!this._container) return;

        this._items.push(element);
        this._container.appendChild(this._renderer(element));
    }
}

export default Section;
