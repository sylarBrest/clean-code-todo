//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.

// Event handling, user interaction is what starts the code execution.

const taskInput = document.querySelector('.item__text_add'); //Add a new task.
const addButton = document.querySelector('.item__button_add'); //first button
const incompleteTaskHolder = document.querySelector('.todo__list'); //ul of .todo__list
const completedTasksHolder = document.querySelector('.completed__list'); //ul of .completed__list
let taskCounter = document.querySelectorAll('.item__text').length;

//New task list item
const createNewTaskElement = function (taskString) {
  const listItem = document.createElement('li');

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

  listItem.classList.add('item', 'list__item');

  label.innerText = taskString;
  label.className = 'item__label';
  label.htmlFor = `task-${taskCounter}`;

  //Each elements, needs appending
  checkBox.type = 'checkbox';
  checkBox.classList.add('item__input', 'item__checkbox');

  editInput.type = 'text';
  editInput.className = 'item__input';
  editInput.id = `task-${taskCounter}`;
  editInput.classList.add('item__text', 'item__text_display_none');

  editButton.innerText = 'Edit'; //innerText encodes special characters, HTML does not.
  editButton.className = 'item__button';
  editButton.classList.add('item__button_edit');

  deleteButton.className = 'item__button';
  deleteButton.classList.add('button-delete', 'item__button_delete');
  deleteButtonImg.src = './remove.svg';
  deleteButtonImg.className = 'button-delete__image';
  deleteButtonImg.setAttribute('alt', 'remove');
  deleteButton.appendChild(deleteButtonImg);

  taskCounter += 1;
  //and appending.
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
};

const addTask = function () {
  //Create a new list item with the text from the .item__text_add:
  if (!taskInput.value) return;
  const listItem = createNewTaskElement(taskInput.value);

  //Append listItem to incompleteTaskHolder
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value = '';
};

//Edit an existing task.

const editTask = function () {
  const listItem = this.parentNode;

  const editInput = listItem.querySelector('input[type=text]');
  const label = listItem.querySelector('label');
  const editBtn = listItem.querySelector('.item__button_edit');
  const containsClass = listItem.classList.contains('list__item_edit');
  //If class of the parent is .list__item_edit
  if (containsClass) {
    //switch to .list__item_edit
    //label becomes the inputs value.
    label.innerText = editInput.value;
    editBtn.innerText = 'Edit';
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = 'Save';
  }

  //toggle .list__item_edit on the parent.
  listItem.classList.toggle('list__item_edit');
  editInput.classList.toggle('item__text_display_none');
  editInput.classList.toggle('item__text_edit');
  label.classList.toggle('item__label_edit');
};

//Delete task.
const deleteTask = function () {
  const listItem = this.parentNode;
  const ul = listItem.parentNode;
  //Remove the parent list item from the ul.
  ul.removeChild(listItem);
};

//Mark task completed
const taskCompleted = function () {
  //Append the task list item to the .completed__list
  const listItem = this.parentNode;
  const listItemLabel = listItem.getElementsByClassName('item__label')[0];
  listItemLabel.classList.add('item__label_line_through');
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
};

const taskIncomplete = function () {
  //Mark task as incomplete.
  //When the checkbox is unchecked
  //Append the task list item to the .todo__list.
  const listItem = this.parentNode;
  const listItemLabel = listItem.getElementsByClassName('item__label')[0];
  listItemLabel.classList.remove('item__label_line_through');
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
};

//The glue to hold it all together.

//Set the click handler to the addTask function.
addButton.onclick = addTask;

const bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  //select ListItems children
  const checkBox = taskListItem.querySelector('.item__checkbox');
  const editButton = taskListItem.querySelector('.item__button_edit');
  const deleteButton = taskListItem.querySelector('.item__button_delete');

  //Bind editTask to edit button.
  editButton.onclick = editTask;
  //Bind deleteTask to delete button.
  deleteButton.onclick = deleteTask;
  //Bind taskCompleted to checkBoxEventHandler.
  checkBox.onchange = checkBoxEventHandler;
};

//cycle over incompleteTaskHolder ul list items
//for each list item
for (let i = 0; i < incompleteTaskHolder.children.length; i++) {
  //bind events to list items chldren(tasksCompleted)
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

//cycle over completedTasksHolder ul list items
for (let i = 0; i < completedTasksHolder.children.length; i++) {
  //bind events to list items chldren(tasksIncompleted)
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}

// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.
