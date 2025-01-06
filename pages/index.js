import { v4 as uuidv4 } from "https://jspm.dev/uuid";

import { initialTodos, validationConfig } from "../utils/constants.js";
import FormValidator from "../components/FormValidator.js";

import Todo from "../components/Todo.js";
import Section from "../components/Section.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = document.forms["add-todo-form"];
const addTodoCloseBtn = addTodoPopup.querySelector(".popup__close");
const todoTemplate = document.querySelector("#todo-template");
const todosList = document.querySelector(".todos__list");

const renderer = (item) => {
    const cardElement = document.createElement('div');
    cardElement.className = 'card';
    cardElement.textContent = item.name; 
};

const section = new Section({
    items: [{ name: 'Card 1' }, { name: 'Card 2' }], 
    renderer: renderer,
    containerSelector: '#card-container' 
});


section.renderItems();

addTodoForm.addEventListener("submit", (evt) => {
    evt.preventDefault();

    const name = evt.target.name.value;
    const dateInput = evt.target.date.value;

    const date = new Date(dateInput);
    if (date && !isNaN(date)) {
        date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
    }

    const id = uuidv4();
    const values = { name, date, id };

    renderTodo(values);

    newTodoValidator.resetValidation();
    closeModal(addTodoPopup);

    addTodoForm.reset();
});

const openModal = (modal) => {
    modal.classList.add("popup_visible");
};

const closeModal = (modal) => {
    modal.classList.remove("popup_visible");
};

const generateTodo = (data) => {
    const todo = new Todo(data, "#todo-template");
    const todoElement = todo.getView();
    return todoElement;
};

addTodoButton.addEventListener("click", () => {
    openModal(addTodoPopup);
});

addTodoCloseBtn.addEventListener("click", () => {
    closeModal(addTodoPopup);
});

initialTodos.forEach((item) => {
    const todo = generateTodo(item);
    todosList.append(todo);
});

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();
