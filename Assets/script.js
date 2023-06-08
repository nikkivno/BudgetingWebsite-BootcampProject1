// Colour Theme 
function changeTheme(theme) {
    document.documentElement.className = theme; }

// Pie Chart Stuff 
const container = d3.select("#pieChart");
const svg = container.append("svg")
  .attr("width", 300)
  .attr("height", 300);

// Create a circle within the SVG
svg.append("circle")
  .attr("cx", 150)
  .attr("cy", 150)
  .attr("r", 147)
  .attr("fill", "#F2A7C3");

//   Expense Input Form 

  document.getElementById('newExpense').addEventListener('click', function(){
    let table = document.querySelector('table');
    let row = table.insertRow(table.rows.length - 1);
    let labelCell = row.insertCell(0);
    let amountCell = row.insertCell(1);
    labelCell.innerHTML = '<input type="text" name="label[]" placeholder="Expense label">';
    amountCell.innerHTML = '<input type="number" name="amount[]" placeholder="Expense Amount">';
});

document.getElementById('culminate').addEventListener('click', function(){
    let amounts = document.getElementsByName('amount[]')
    let total = 0;
    for (var i=0; i < amounts.length; i++) {
        if (amounts[i].value !== '') {
            total += parseFloat(amounts[i].value);
        }
    } 
    document.getElementById('total').innerHTML = 'Total Expenses: $' + total.toFixed(2); 
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