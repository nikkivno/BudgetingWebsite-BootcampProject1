// Colour Theme 
function changeTheme(theme) {
    document.documentElement.className = theme;
}

// Theme dropdown menu
document.addEventListener('DOMContentLoaded', function() {
    // theme drop down menu
    let dropdown = document.querySelector('.dropdown-menu');
    let dropdownItems = dropdown.querySelectorAll('.dropdown-item');

    // listener for each theme
    dropdownItems.forEach(function(item) {
        item.addEventListener('click', function() {
            let selectedTheme = item.textContent.toLowerCase();
            
            // Change theme
            changeTheme(selectedTheme);
        });
    });
});

// Todo list and notes **right side**
window.addEventListener('DOMContentLoaded', function() {
    loadTodoItems();
    loadNotes();
});
function addTodo() {
    let todoInput = document.getElementById('todo-input');
    let todoItems = document.getElementById('todo-items');
    let newTodo = document.createElement('li');
    newTodo.className = 'list-group-item';
    newTodo.textContent = todoInput.value;
    let removeButton = document.createElement('button');
    removeButton.className = 'btn btn-danger btn-sm float-end';
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', function() {
        removeTodoItem(newTodo);
    });
    newTodo.appendChild(removeButton);
    todoItems.appendChild(newTodo);
    todoInput.value = '';
    saveTodoItems();
}
function removeTodoItem(item) {
    let todoItems = document.getElementById('todo-items');
    todoItems.removeChild(item);
    saveTodoItems();
}
function saveTodoItems() {
    let todoItems = document.getElementById('todo-items').innerHTML;
    localStorage.setItem('todoItems', todoItems);
}
function loadTodoItems() {
    let savedTodoItems = localStorage.getItem('todoItems');
    if (savedTodoItems) {
        document.getElementById('todo-items').innerHTML = savedTodoItems;
    }
}
function saveNotes() {
    let notesInput = document.getElementById('notes-input');
    let notes = notesInput.value;
    localStorage.setItem('notes', notes);
}
function loadNotes() {
    let savedNotes = localStorage.getItem('notes');
    if (savedNotes) {
        document.getElementById('notes-input').value = savedNotes;
    }
}
// clears each item added seperatly now *****
function clearInput() {
    let todoItems = document.getElementById('todo-items');
    let todoInput = document.getElementById('todo-input');
    todoItems.innerHTML = ''; 
    todoInput.value = ''; 
    localStorage.removeItem('todoItems');
    clearButton.addEventListener('click', clearInput);
}
// Clear button
let clearButton = document.getElementById('clear-button');
clearButton.addEventListener('click', clearInput);