const addTaskInput = document.querySelector('.item__text_add');
const addTaskButton = document.querySelector('.item__button_add');
const todoTasksList = document.querySelector('.list__todo');
const completedTasksList = document.querySelector('.list__completed');
let nextTaskId = document.querySelectorAll('.item__text').length;

const createNewTaskElement = function (taskTitle) {
  const taskListItem = document.createElement('li');
  taskListItem.className = 'item list__item';

  const checkBox = document.createElement('input');
  checkBox.type = 'checkbox';
  checkBox.className = 'item__input item__checkbox';

  const label = document.createElement('label');
  label.innerText = taskTitle;
  label.className = 'item__label';
  label.htmlFor = `task-${nextTaskId}`;

  const editInput = document.createElement('input');
  editInput.type = 'text';
  editInput.className = 'item__input item__text item__text_display_none';
  editInput.id = `task-${nextTaskId}`;

  const editButton = document.createElement('button'); //edit button
  editButton.innerText = 'Edit'; //innerText encodes special characters, HTML does not.
  editButton.className = 'item__button item__button_edit';

  const deleteButton = document.createElement('button'); //delete button
  deleteButton.className = 'item__button button-delete item__button_delete';

  const deleteButtonImg = document.createElement('img'); //delete button image
  deleteButtonImg.src = './remove.svg';
  deleteButtonImg.className = 'button-delete__image';
  deleteButtonImg.alt = 'remove';

  deleteButton.appendChild(deleteButtonImg);

  nextTaskId += 1;

  taskListItem.appendChild(checkBox);
  taskListItem.appendChild(label);
  taskListItem.appendChild(editInput);
  taskListItem.appendChild(editButton);
  taskListItem.appendChild(deleteButton);

  return taskListItem;
};

const addTask = function () {
  if (!addTaskInput.value) return;
  const taskListItem = createNewTaskElement(addTaskInput.value);

  todoTasksList.appendChild(taskListItem);
  bindTaskEvents(taskListItem);

  addTaskInput.value = '';
};

const editTask = function () {
  const taskListItem = this.parentNode;

  const editInput = taskListItem.querySelector('.item__text');
  const label = taskListItem.querySelector('.item__label');
  const editBtn = taskListItem.querySelector('.item__button_edit');
  const isEditing = taskListItem.classList.contains('list__item_edit');

  if (isEditing) {
    label.innerText = editInput.value;
    editBtn.innerText = 'Edit';
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = 'Save';
  }

  taskListItem.classList.toggle('list__item_edit');
  editInput.classList.toggle('item__text_display_none');
  editInput.classList.toggle('item__text_edit');
  label.classList.toggle('item__label_edit');
};

const deleteTask = function () {
  const taskListItem = this.parentNode;
  const parentList = taskListItem.parentNode;

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

const bindTaskEvents = function (taskListItem) {
  const editButton = taskListItem.querySelector('.item__button_edit');
  const deleteButton = taskListItem.querySelector('.item__button_delete');

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
};

todoTasksList.addEventListener('change', handleTaskCheck);
completedTasksList.addEventListener('change', handleTaskCheck);
addTaskButton.addEventListener('click', addTask);
[...todoTasksList.children, ...completedTasksList.children].forEach(bindTaskEvents);
