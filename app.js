//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.

// Event handling, user interaction is what starts the code execution.

const addTaskInput = document.querySelector('.item__text_add'); //Add a new task.
const addTaskButton = document.querySelector('.item__button_add'); //first button
const todoTasksList = document.querySelector('.list__todo'); //ul of .list__todo
const completedTasksList = document.querySelector('.list__completed'); //ul of .list__completed
let nextTaskId = document.querySelectorAll('.item__text').length;

//New task list item
const createNewTaskElement = function (taskTitle) {
  const taskListItem = document.createElement('li');

  //input (checkbox)
  const checkBox = document.createElement('input'); //checkbx
  //label
  const label = document.createElement('label'); //label
  //input (text)
  const editInput = document.createElement('input'); //text
  //button.edit
  const editButton = document.createElement('button'); //edit button

  //button.delete
  const deleteButton = document.createElement('button'); //delete button
  const deleteButtonImg = document.createElement('img'); //delete button image

  taskListItem.className = 'item list__item';

  label.innerText = taskTitle;
  label.className = 'item__label';
  label.htmlFor = `task-${nextTaskId}`;

  //Each elements, needs appending
  checkBox.type = 'checkbox';
  checkBox.className = 'item__input item__checkbox';

  editInput.type = 'text';
  editInput.className = 'item__input item__text item__text_display_none';
  editInput.id = `task-${nextTaskId}`;

  editButton.innerText = 'Edit'; //innerText encodes special characters, HTML does not.
  editButton.className = 'item__button item__button_edit';

  deleteButton.className = 'item__button button-delete item__button_delete';
  deleteButtonImg.src = './remove.svg';
  deleteButtonImg.className = 'button-delete__image';
  deleteButtonImg.alt = 'remove';
  deleteButton.appendChild(deleteButtonImg);

  nextTaskId += 1;
  //and appending.
  taskListItem.appendChild(checkBox);
  taskListItem.appendChild(label);
  taskListItem.appendChild(editInput);
  taskListItem.appendChild(editButton);
  taskListItem.appendChild(deleteButton);
  return taskListItem;
};

const addTask = function () {
  //Create a new list item with the text from the .item__text_add:
  if (!addTaskInput.value) return;
  const taskListItem = createNewTaskElement(addTaskInput.value);

  //Append taskListItem to todoTasksList
  todoTasksList.appendChild(taskListItem);
  bindTaskEvents(taskListItem);

  addTaskInput.value = '';
};

//Edit an existing task.

const editTask = function () {
  const taskListItem = this.parentNode;

  const editInput = taskListItem.querySelector('.item__text');
  const label = taskListItem.querySelector('.item__label');
  const editBtn = taskListItem.querySelector('.item__button_edit');
  const isEditing = taskListItem.classList.contains('list__item_edit');
  //If class of the parent is .list__item_edit
  if (isEditing) {
    //switch to .list__item_edit
    //label becomes the inputs value.
    label.innerText = editInput.value;
    editBtn.innerText = 'Edit';
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = 'Save';
  }

  //toggle .list__item_edit on the parent.
  taskListItem.classList.toggle('list__item_edit');
  editInput.classList.toggle('item__text_display_none');
  editInput.classList.toggle('item__text_edit');
  label.classList.toggle('item__label_edit');
};

//Delete task.
const deleteTask = function () {
  const taskListItem = this.parentNode;
  const parentList = taskListItem.parentNode;
  //Remove the parent list item from the ul.
  parentList.removeChild(taskListItem);
};

const onTaskCompletionChange = function (taskListItem) {
  const taskCheckBox = taskListItem.querySelector('.item__checkbox');
  const taskLabel = taskListItem.querySelector('.item__label');

  taskLabel.classList.toggle('item__label_line_through', taskCheckBox.checked);
  (taskCheckBox.checked ? completedTasksList : todoTasksList).appendChild(taskListItem);
};

const handleTaskCheck = function (event) {
  if (!event.target.classList.contains('item__checkbox')) return;
  onTaskCompletionChange(event.target.closest('.list__item'));
};

//The glue to hold it all together.

const bindTaskEvents = function (taskListItem) {
  //select ListItems children
  const editButton = taskListItem.querySelector('.item__button_edit');
  const deleteButton = taskListItem.querySelector('.item__button_delete');

  //Bind editTask to edit button.
  editButton.onclick = editTask;
  //Bind deleteTask to delete button.
  deleteButton.onclick = deleteTask;
};

todoTasksList.addEventListener('change', handleTaskCheck);
completedTasksList.addEventListener('change', handleTaskCheck);
addTaskButton.addEventListener('click', addTask);
[...todoTasksList.children, ...completedTasksList.children].forEach(bindTaskEvents);
// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.
