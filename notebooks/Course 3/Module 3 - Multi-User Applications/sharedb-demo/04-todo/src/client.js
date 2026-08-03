// ShareDB demo, stage 4: the to-do list client. Instead of re-rendering
// everything on every change, it reads each incoming operation and makes
// exactly the matching change to the page.

// #region imports
import sharedb from 'sharedb/lib/client';
import ReconnectingWebSocket from 'reconnecting-websocket';
// #endregion

// #region connect
// Open a websocket connection back to whatever host served this page.
const wsProtocol = location.protocol === 'https:' ? 'wss:' : 'ws:';
const socket = new ReconnectingWebSocket(wsProtocol + '//' + location.host + location.pathname);
const connection = new sharedb.Connection(socket);

const doc = connection.get('examples', 'todo-list');
// #endregion

// #region refs
const todoListElem = document.querySelector('ul#todo-list');
const descriptionInp = document.querySelector('input#todo-description');
const addItemBtn = document.querySelector('button#add-item');
// #endregion

// #region subscribe
doc.subscribe((error) => {
  if (error) {
    throw error;
  }

  // Draw the items that already exist. 'op' only fires for changes,
  // and loading the page is not a change.
  for (let i = 0; i < doc.data.todos.length; i++) {
    addTodoElement(doc.data.todos[i], i);
  }
});
// #endregion

// #region ops
doc.on('op', (ops) => {
  for (const op of ops) {
    if (op.p[0] === 'todos') {
      const index = op.p[1];

      if (op.li !== undefined) {
        addTodoElement(op.li, index);
      } else if (op.ld !== undefined) {
        removeTodoElement(index);
      }
    }
  }
});
// #endregion

// #region remove-element
function removeTodoElement(index) {
  todoListElem.removeChild(todoListElem.children[index]);
}
// #endregion

// #region add-element
function addTodoElement(todo, index) {
  const li = document.createElement('li');

  const span = document.createElement('span');
  span.innerText = todo.title;

  // #region delete-button
  const deleteBtn = document.createElement('button');
  deleteBtn.innerText = 'x';

  deleteBtn.addEventListener('click', () => {
    const todoListElementChildren = Array.from(todoListElem.children);
    const deletingIndex = todoListElementChildren.indexOf(li);

    doc.submitOp([
      {
        p: ['todos', deletingIndex],
        ld: doc.data.todos[deletingIndex]
      }
    ]);
  });
  // #endregion

  li.append(span, deleteBtn);

  if (index >= todoListElem.children.length) {
    todoListElem.append(li); // insert li at the end
  } else {
    const childAtIndex = todoListElem.children[index];

    todoListElem.insertBefore(li, childAtIndex);
  }
}
// #endregion

// #region add
addItemBtn.addEventListener('click', () => {
  const title = descriptionInp.value;
  const newTodo = { title: title, done: false };

  doc.submitOp([
    {
      p: ['todos', doc.data.todos.length],
      li: newTodo
    }
  ]);

  descriptionInp.value = '';
});
// #endregion
