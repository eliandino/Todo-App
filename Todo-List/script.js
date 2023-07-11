document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');
    let todos = [];
  
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      addTodo();
    });
  
    function addTodo() {
      const todoText = todoInput.value;
      if (todoText.trim() !== '') {
        const todoItem = document.createElement('li');
        const todoTextSpan = document.createElement('span');
        const removeButton = document.createElement('button');
  
        todoTextSpan.innerText = todoText;
        removeButton.innerText = 'Remove';
  
        todoItem.appendChild(todoTextSpan);
        todoItem.appendChild(removeButton);
        todoList.appendChild(todoItem);
  
        todoInput.value = '';
  
        todos.push(todoText);
        saveTodosToLocalStorage();
  
        removeButton.addEventListener('click', function() {
          removeTodo(todoItem);
        });
  
        todoTextSpan.addEventListener('click', function() {
          markAsCompleted(todoTextSpan);
        });
      }
    }
  
    function removeTodo(todoItem) {
      todoList.removeChild(todoItem);
      const todoText = todoItem.firstChild.innerText;
      todos = todos.filter(todo => todo !== todoText);
      saveTodosToLocalStorage();
    }
  
    function markAsCompleted(todoTextSpan) {
      todoTextSpan.classList.toggle('completed');
    }
  
    function saveTodosToLocalStorage() {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  
    function getTodosFromLocalStorage() {
      const savedTodos = localStorage.getItem('todos');
      if (savedTodos) {
        todos = JSON.parse(savedTodos);
        todos.forEach(todo => {
          const todoItem = document.createElement('li');
          const todoTextSpan = document.createElement('span');
          const removeButton = document.createElement('button');
  
          todoTextSpan.innerText = todo;
          removeButton.innerText = 'Remove';
  
          todoItem.appendChild(todoTextSpan);
          todoItem.appendChild(removeButton);
          todoList.appendChild(todoItem);
  
          removeButton.addEventListener('click', function() {
            removeTodo(todoItem);
          });
  
          todoTextSpan.addEventListener('click', function() {
            markAsCompleted(todoTextSpan);
          });
        });
      }
    }
  
    getTodosFromLocalStorage();
  });
  
 