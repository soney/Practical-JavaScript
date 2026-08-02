// A shared to-do list. Everything here is provided EXCEPT the "op"
// listener at the bottom, which is your job.
//
// doc is a stand-in for a ShareDB document, built by createFakeDoc (in
// fake-doc-3.js). It emits an "op" event whenever a simulated remote user
// edits the list, just like a real ShareDB doc would.

// createFakeDoc lives in fake-doc-3.js, which index.html loads with its own
// <script> tag before this file, so the createFakeDoc global is available
// here. In a project with a bundler you would import it instead:
//   import { createFakeDoc } from './fake-doc-3.js';
const doc = createFakeDoc({ todos: ['Buy milk', 'Walk the dog'] });

const todosList = document.querySelector('#todos-list');
const lastOpDisplay = document.querySelector('#last-op');

// addTodoToDOM and removeTodoFromDOM are already written. Your op listener
// should call them.
function addTodoToDOM(text, index) {
  const li = document.createElement('li');
  li.textContent = text;
  const existing = todosList.children[index];
  if (existing) {
    existing.before(li);
  } else {
    todosList.append(li);
  }
}

function removeTodoFromDOM(index) {
  const li = todosList.children[index];
  if (li) {
    li.remove();
  }
}

// The list starts with the current document data. Already written.
for (const todo of doc.data.todos) {
  addTodoToDOM(todo, todosList.children.length);
}

// The simulation buttons. Already written: they build the ops a remote user's
// edits would produce, hand them to doc, and show each op in the
// "Last operation received" box.
document.querySelector('#remote-add-btn').addEventListener('click', () => {
  const input = document.querySelector('#remote-input');
  const text = input.value.trim() || 'New to-do';
  input.value = '';
  const ops = [{ p: ['todos', doc.data.todos.length], li: text }];
  doc.receiveRemoteOps(ops);
  lastOpDisplay.textContent = JSON.stringify(ops);
});

document.querySelector('#remote-remove-btn').addEventListener('click', () => {
  if (doc.data.todos.length === 0) return;
  const ops = [{ p: ['todos', 0], ld: doc.data.todos[0] }];
  doc.receiveRemoteOps(ops);
  lastOpDisplay.textContent = JSON.stringify(ops);
});

// ---------------------------------------------------------------------------
// YOUR WORK STARTS HERE.
// ---------------------------------------------------------------------------
// SOLUTION: listen for op events, then apply each list insert (li) or list
// delete (ld) to the page at the position in the op's path
doc.on('op', (ops) => {
  for (const op of ops) {
    if (op.p[0] === 'todos') {
      if (op.li !== undefined) {
        addTodoToDOM(op.li, op.p[1]);
      } else if (op.ld !== undefined) {
        removeTodoFromDOM(op.p[1]);
      }
    }
  }
});
