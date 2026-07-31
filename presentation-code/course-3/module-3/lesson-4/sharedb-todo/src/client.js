// ... imports remain the same
import sharedb from 'sharedb/lib/client';
import ReconnectingWebSocket from 'reconnecting-websocket';

// open websocket connection
const socket = new ReconnectingWebSocket('ws://localhost:8000');
const connection = new sharedb.Connection(socket);

const doc = connection.get('examples', 'todo-list');

const todoListElem = document.querySelector("ul#todo-list")
const descriptionInp = document.querySelector("input#todo-description");
const addItemBtn = document.querySelector("button#add-item");

doc.subscribe((err) => {
    if (err) throw err;
    for(let i = 0; i<doc.data.todos.length; i++) {
        addTodoElement(doc.data.todos[i], i);
    }
});

doc.on('op', (ops) => {
    for(const op of ops) {
        console.log(op);
        if(op.p[0] == 'todos') {
            const index = op.p[1];
            if(op.li) {
                addTodoElement(op.li, index)
            } else if(op.ld) {
                removeTodoElement(index);
            }
        }
    }
});

function removeTodoElement(index) {
    todoListElem.removeChild(todoListElem.children[index]);
}

function addTodoElement(todo, index) {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.innerText = todo.title;

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "x";

    deleteBtn.addEventListener("click", () => {
        const todoListElementChildren = Array.from(todoListElem.children);
        const deletingIndex = todoListElementChildren.indexOf(li);
        doc.submitOp([
            {
                p: ['todos', deletingIndex],
                ld: doc.data.todos[deletingIndex]
            }
        ])
    });

    li.append(span, deleteBtn);

    if(index >= todoListElem.children.length) {
        todoListElem.append(li); // insert li @ end
    } else {
        const childAtIndex = todoListElem.children[index];
        todoListElem.inserBefore(li, childAtIndex);
    }
}

addItemBtn.addEventListener("click", () => {
    const title = descriptionInp.value;
    const newTodo = { title, done: false };
    doc.submitOp([
        {
            p: ['todos', doc.data.todos.length],
            li: newTodo
        }
    ])
    descriptionInp.value = "";
});