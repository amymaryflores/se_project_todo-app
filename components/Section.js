class Section {
    constructor({ items, renderer, containerSelector }) {
      this._items = items;
      this._renderer = renderer;
      this._container = document.querySelector(containerSelector);
      if (!this._container) {
        console.error(`Container with selector "${containerSelector}" not found.`);
      }
    }
  
    // Add a single item to the container
    addItem(item) {
      if (!this._container) return;
  
      // Ensure the rendered item is a valid DOM node before appending
      const renderedItem = this._renderer(item);
      if (renderedItem instanceof Node) {
        this._container.appendChild(renderedItem);
      } else {
        console.error('Renderer function did not return a valid DOM node:', renderedItem);
      }
    }
  
    // Render all items by calling addItem for each
    renderItems() {
      this._items.forEach((item) => {
        this.addItem(item);  // Reuse addItem to append each item
      });
    }
  }
  
  export default Section;
  
