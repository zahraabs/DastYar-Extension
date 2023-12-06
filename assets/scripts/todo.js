"use strict";
const toDoForm = document.querySelector(".todo-form");
const toDoInput = document.querySelector(".todo-form__input");
const newToDo = document.querySelector(".todo-form__icon");
const list = document.querySelector(".todo__list");

showUnComplete();

toDoForm.addEventListener("submit", addItem);
list.addEventListener("click", icons);

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
    console.log("delete");
    deleteItem(e.target.parentElement.parentElement.parentElement.dataset.id);
        e.target.parentElement.parentElement.parentElement.remove();
  // } else if(e.target.classList.contains("fa-edit")) {
  //   editItem(e.target);
  // }else if (e.target.nodeName === "INPUT") {
  //   console.log("input");
  //   complete(e.target);
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

function deleteItem(id) {
  var old = oldItems();

  for (var i = 0; i < old.length; i++) {
      if (old[i].id == id) {
          old.splice(i, 1);
      }

  }
  localStorage.setItem("names", JSON.stringify(old))
}

// function complete(element) {
//   var old = oldItems();
//   for (var i = 0; i < old.length; i++) {
//       if (old[i].id == element.parentElement.parentElement.dataset.id) {
//           old[i].isDone = !old[i].isDone;
//       }
//   }
//   localStorage.setItem("names", JSON.stringify(old));

//   // showCompleteList();
//   showUnComplete();
// }