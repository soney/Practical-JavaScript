// PROBLEM 3: A Persistent To-Do List with localStorage
//
// Tasks are stored in localStorage under the key "todos" as a JSON array of
// strings, so they survive a page reload. The DOM references, the "Add" button
// wiring, and renderTodos() are provided for you at the bottom of this file.
// You write the three functions that read and write localStorage.

const STORAGE_KEY = 'todos';

// getTodos(): read the saved tasks from localStorage and return them as an array.
//   - Read the string stored under STORAGE_KEY with localStorage.getItem(STORAGE_KEY).
//   - If nothing is stored yet, return an empty array [].
//   - Otherwise JSON.parse the stored string back into an array and return it.
function getTodos() {
    // TODO: (1) read localStorage.getItem(STORAGE_KEY); return [] if nothing stored, else JSON.parse it and return the array
}

// saveTodos(todos): save the given array of tasks to localStorage.
//   - Use JSON.stringify(todos) to turn the array into a string, then store it
//     under STORAGE_KEY with localStorage.setItem.
function saveTodos(todos) {
    // TODO: (2) JSON.stringify(todos), then store it under STORAGE_KEY with localStorage.setItem
}

// addTodo(text): add one task, then save and redraw.
//   - Get the current tasks with getTodos().
//   - Add text to the end of the array with .push(text).
//   - Save the updated array with saveTodos(...).
//   - Call renderTodos() so the new task shows up.
function addTodo(text) {
    // TODO: (3) getTodos(), push text onto it, saveTodos(...), then call renderTodos()
}

// ----- Provided for you (you do not need to change anything below) -----

// Draws the saved tasks into the #todo-list element.
function renderTodos() {
    const list = document.querySelector('#todo-list');
    list.innerHTML = '';
    const todos = getTodos() || [];
    todos.forEach((task) => {
        const li = document.createElement('li');
        li.textContent = task;
        list.appendChild(li);
    });
}

const input = document.querySelector('#todo-input');
const addButton = document.querySelector('#add-button');

addButton.addEventListener('click', () => {
    const text = input.value.trim();
    if (text !== '') {
        addTodo(text);
        input.value = '';
    }
});

// Show any saved tasks when the page first loads.
renderTodos();
