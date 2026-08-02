// Get references to the DOM elements
const input = document.querySelector('#taskInput');
const button = document.querySelector('#addButton');
const list = document.querySelector('#todoList');

// Runs when the user clicks "Add Task"
function addTask() {
  const description = input.value;

  // Ignore empty or whitespace-only input
  if (description.trim() === '') {
    return;
  }

  // Create the list item with the task text
  const taskItem = document.createElement('li');
  taskItem.textContent = description;

  // Create a "Done" button that removes this task
  const doneButton = document.createElement('button');
  doneButton.textContent = 'Done';
  doneButton.addEventListener('click', function() {
    taskItem.remove();
  });

  // Put the button in the item, and the item in the list
  taskItem.append(doneButton);
  list.append(taskItem);

  // Reset the input for the next task
  input.value = '';
  input.focus();
}

// Add a task whenever the button is clicked
button.addEventListener('click', addTask);
