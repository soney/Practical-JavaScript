const STORAGE_KEY = 'todos';

// SOLUTION: getTodos, saveTodos, and addTodo (localStorage read/write)
// Read the saved tasks from localStorage and return them as an array.
function getTodos() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
        return [];
    }
    return JSON.parse(stored);
}

// Save the given array of tasks to localStorage.
function saveTodos(todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

// Add one task, then save and redraw.
function addTodo(text) {
    const todos = getTodos();
    todos.push(text);
    saveTodos(todos);
    renderTodos();
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
