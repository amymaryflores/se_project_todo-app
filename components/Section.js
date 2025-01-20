class Section {
  constructor({ items, renderer, containerSelector }) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
    if (!this._container) {
      console.error(
        `Container with selector "${containerSelector}" not found.`
      );
    }
  }

  // Add a single item to the container
  addItem(item) {
    this._container.appendChild(item);
  }

  // Render all items by calling addItem for each
  renderItems() {
    this._items.forEach((item) => {
      this.addItem(this._renderer(item)); // Reuse addItem to append each item
    });
  }
}
  export default Section;
  
