import { v4 as uuidv4 } from "https://jspm.dev/uuid";

import { initialTodos, validationConfig } from "../utils/constants.js";
import FormValidator from "../components/FormValidator.js";
import Todo from "../components/Todo.js";
import TodoCounter from "../components/TodoCounter.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupEl = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopupEl.querySelector(".popup__form");
const addTodoCloseButton = addTodoPopupEl.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");
const todoTemplateSelector = "#todo-template";
const todoCounter = new TodoCounter(initialTodos, ".counter__text");

const renderer = (item) => {
    const todo = new Todo(item, todoTemplateSelector, handleCheck, handleDelete);
    return todo.getView();
  };

const generateTodo = (data) => {
  const todo = new Todo(data, todoTemplateSelector, handleCheck, handleDelete);
  return todo.getView();
};

const section = new Section({
  items: initialTodos,
  renderer,
  containerSelector: "#card-container",
});

section.renderItems();

const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (input) => {
    const name = input.name;
    const dateInput = input.date;

    const date = new Date(dateInput);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

    const id = uuidv4();
    const values = { name, date, id };

    const newTodoElement = generateTodo(values);
  

    todoCounter.updateTotal(true);

    addTodoPopup.close();
    newFormValidator.resetValidation()
  },
});

addTodoPopup.setEventListeners();

function handleCheck(isCompleted) {
  console.log(`Todo marked as ${isCompleted ? "completed" : "not completed"}`);
  todoCounter.updateCompleted(isCompleted); // Update counters if needed
}

function handleDelete(isCompleted) {
  console.log("Todo deleted");
  if (isCompleted) {
    todoCounter.updateCompleted(false);
  }
  todoCounter.updateTotal(false); // Reduce total count
}


const newFormValidator = new FormValidator(validationConfig, addTodoForm);
newFormValidator.enableValidation();

addTodoPopup.resetForm = () => {
  addTodoForm.reset();
  newFormValidator.resetValidation();
};

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});


