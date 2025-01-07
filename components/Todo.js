class Todo {
  constructor(data, templateSelector, handleCheck, handleDelete) {
    this._name = data.name;
    this._date = data.date;
    this._completed = data.completed || false;
    this._id = data.id;
    this._templateSelector = templateSelector;

    this._handleCheck = handleCheck;
    this._handleDelete = handleDelete;
  }

  setEventListeners() {
    // Delete button event listener
    this._todoDeleteBtn.addEventListener("click", () => {
      this._todoElement.remove();

      if (this._handleDelete && typeof this._handleDelete === "function") {
        this._handleDelete(this._completed);
      }
    });

    // Checkbox change event listener
    this._todoCheckboxEl.addEventListener("change", () => {
      this._completed = !this._completed;

      if (this._handleCheck && typeof this._handleCheck === "function") {
        this._handleCheck(this._completed);
      }
    });
  }

  generateCheckboxEl() {
    this._todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
    this._todoLabel = this._todoElement.querySelector(".todo__label");
    this._todoCheckboxEl.checked = this._completed;
    this._todoCheckboxEl.id = `todo-${this._id}`;
    this._todoLabel.setAttribute("for", `todo-${this._id}`);
  }

  generateDate() {
    if (this._date) {
      this._dueDate = new Date(this._date);
      this._todoDate = this._todoElement.querySelector(".todo__date");

      if (!isNaN(this._dueDate)) {
        this._todoDate.textContent = `Due: ${this._dueDate.toLocaleString(
          "en-US",
          {
            year: "numeric",
            month: "short",
            day: "numeric",
          }
        )}`;
      }
    }
  }

  getView() {
    this._templateElement = document.querySelector(this._templateSelector);
    this._todoElement = this._templateElement.content
      .querySelector(".todo")
      .cloneNode(true);

    const todoNameEl = this._todoElement.querySelector(".todo__name");
    this._todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");

    todoNameEl.textContent = this._name;

    this.generateCheckboxEl();
    this.setEventListeners();
    this.generateDate();

    return this._todoElement;
  }
}

export default Todo;
