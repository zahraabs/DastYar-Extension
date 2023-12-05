"use strict";
const toDoInput = document.querySelector(".todo-form__input");
const newToDo = document.querySelector(".todo-form__icon");
const list = document.querySelector(".todo__list");

newToDo.addEventListener("click", addItem);

function addItem(e) {
  e.preventDefault();
  const inputText = toDoInput.value.trim();

  if (inputText === "") {
    alert("Please enter a task!");
  } else if (inputText != "") {
    addToStorage(inputText);
    showUnComplete();
  }
  toDoInput.value = "";
  toDoInput.focus();
}

function addToStorage(text) {
  var currentNames = oldItems();
  var date = new Date();
  var newItem = {
    id: date.getTime(),
    content: text,
    isDone: false,
  };

  currentNames.push(newItem);
  localStorage.setItem("names", JSON.stringify(currentNames));
}

// get old names and return an array
function oldItems() {
  var oldNames;
  oldNames = JSON.parse(localStorage.getItem("names"));

  if (oldNames == null) {
    return [];
  }
  return oldNames;
}

function showUnComplete() {
  var old = oldItems();
  list.innerHTML = "";
  for (var i = 0; i < old.length; i++) {
    if (old[i].isDone == false) {
      list.innerHTML += `<li  class="todo__task" data-id="${old[i].id}">
                        <div class="todo__division">
                            <input type="checkbox" name="task" id="task${i}">
                            <label for="task${i}" class="todo__label">${old[i].content}</label>
                        </div>
                        <div>
                            <a href="#" class="todo-main__icon"><i class="fas fa-edit "></i></a>
                            <a href="#" class="todo-main__icon"><i class="far fa-trash-alt"></i></a>
                        </div>
                    </li>
      `;
    }
  }
}
