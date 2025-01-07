import { v4 as uuidv4 } from "https://jspm.dev/uuid";

import { initialTodos, validationConfig } from "../utils/constants.js";
import FormValidator from "../components/FormValidator.js";
import Todo from "../components/Todo.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupEl = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopupEl.querySelector(".popup__form");
const addTodoCloseButton = addTodoPopupEl.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");
const cardContainer = document.querySelector("#card-container");
const todoTemplateSelector = "#todo-template";

const renderer = (item) => {
  const todo = new Todo(item, todoTemplateSelector);
  return todo.getView();
};

const generateTodo = (data) => {
    const todo = new Todo(data, "#todo-template", handleCheck, handleDelete);
    return todo.getView();
  };

const section = new Section({
  items: initialTodos,
  renderer,
  containerSelector: "#card-container",
});

section.renderItems();


addTodoCloseButton.addEventListener("click", () => {
    closeModal(addTodoPopup);
});

initialTodos.forEach((item) => {
    const todo = generateTodo(item);
    todosList.append(todo);
});

const addTodoPopup = new PopupWithForm({
    popupSelector: "#add-todo-popup",
    handleFormSubmit: (input) => {
      // Extract name and date from the input object
      const name = input.name;
      const dateInput = input.date;
  
      const date = new Date(dateInput);
      date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
  
      const id = uuidv4();
      const values = { name, date, id };
  
      renderTodo(values);
      todoCounter.updateTotal(true);
  
      addTodoPopup.close();
      addTodoPopup.resetForm();
    },
  });
  
  addTodoPopup.setEventListeners();
function handleCheck(completed) {
    todoCounter.updateCompleted(completed);
    console.log(completed);
  }
  
  function handleDelete(completed) {
    todoCounter.updateTotal(false);
    // decrement total count
    if (completed) {
      todoCounter.updateCompleted(false);
    }
  }

const newFormValidator = new FormValidator(validationConfig, addTodoForm);
newFormValidator.enableValidation();