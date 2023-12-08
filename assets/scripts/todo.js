"use strict";
const toDoForm = document.querySelector(".todo-form");
const toDoInput = document.querySelector(".todo-form__input");
const newToDo = document.querySelector(".todo-form__icon");
const todoList = document.querySelector(".todo__list");
const doneList = document.querySelector(".done__list");

showUnComplete();
showCompleteList();

toDoForm.addEventListener("submit", addItem);
todoList.addEventListener("click", icons);
doneList.addEventListener("click", icons);
addEventListener("click", saveEditedItem);

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

function icons(e) {
  e.stopPropagation();
  if (e.target.nodeName === "I" && e.target.classList.contains("fa-trash-alt")) {
    deleteItem(e.target.parentElement.parentElement.parentElement.dataset.id);
        e.target.parentElement.parentElement.parentElement.remove();
  } else if(e.target.classList.contains("fa-edit")) {
    editItem(e.target);
  }else if (e.target.nodeName === "INPUT") {
    complete(e.target);
}
}

function addToStorage(text) {
  var currentNames = oldItems();
  var date = new Date();
  var newItem = {
    id: date.getTime(),
    content: text,
    isDone: false,
  };

  currentNames.unshift(newItem);
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
  todoList.innerHTML = "";
  for (var i = 0; i < old.length; i++) {
    if (old[i].isDone == false) {
      todoList.innerHTML += `<li  class="todo__task" data-id="${old[i].id}">
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

function deleteItem(id) {
  var old = oldItems();

  for (var i = 0; i < old.length; i++) {
      if (old[i].id == id) {
          old.splice(i, 1);
      }

  }
  localStorage.setItem("names", JSON.stringify(old))
}

function editItem(element) {
  var newInput = document.createElement("input");
  newInput.setAttribute("type", "text");
  newInput.value = element.parentElement.parentElement.parentElement.children[0].children[1].innerText;
 
  element.parentElement.parentElement.parentElement.children[0].children[1].remove();
  element.parentElement.parentElement.parentElement.children[0].insertBefore(newInput, element.parentElement.parentElement.parentElement.children[0].lastchild)
  newInput.focus();
}

function complete(element) {
  var old = oldItems();
  for (var i = 0; i < old.length; i++) {
      if (old[i].id == element.parentElement.parentElement.dataset.id) {
          old[i].isDone = !old[i].isDone;
      }
  }
  localStorage.setItem("names", JSON.stringify(old));

  showCompleteList();
  showUnComplete();
}

function saveEditedItem() {
  var editing = todoList.querySelector("input[type='text']");
  var old = oldItems();
  if (editing == null) {
      return [];
  } else {
      for (var i = 0; i < old.length; i++) {
          if (old[i].id == editing.parentElement.parentElement.dataset.id) {
              old[i].content = editing.value;
          }
      }
      localStorage.setItem("names", JSON.stringify(old));
      closeEditingInput(editing);
  }
}

function closeEditingInput(element) {
  var newLabel = document.createElement("label");
  var newText = document.createTextNode(element.parentElement.parentElement.children[0].children[1].value);

  newLabel.htmlFor = element.parentElement.parentElement.children[0].children[0].id;
  newLabel.appendChild(newText);
  element.parentElement.parentElement.children[0].insertBefore(newLabel, element.parentElement.parentElement.children[0].lastchild);
  element.remove();
}

function showCompleteList() {
  var old = oldItems();
  doneList.innerHTML = "";
  for (var i = 0; i < old.length; i++) {
      if (old[i].isDone == true) {

          doneList.innerHTML += `<li data-id="${old[i].id}" class="todo__task" >
                                          <div class="todo__division">
                                          <input type="checkbox" name="item" id="item${i}" checked/>
                                          <label for="item${i}"
                                          class="todo__label">${old[i].content}         </label>
                                          </div>
                                          <div>
                                          <a href="#" class="todo-main__icon"><i class="far fa-trash-alt"></i></a>
                                      </div>
      
                                    </li>`;

      }
  }

}



