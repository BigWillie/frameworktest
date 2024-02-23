<script>
    import { writable } from 'svelte/store';
  
    const dragItem = writable(null);
    let newTodoText = ''; // Holds the new todo text

    let todos = [
      { id: 1, text: "Learn Svelte", done: false },
      { id: 2, text: "Build a to-do app", done: false },
    ];

    function addTodo() {
    if (!newTodoText.trim()) {
      // Prevent adding empty todos
      return;
    }
    
    const newTodo = {
      id: todos.length ? Math.max(...todos.map(todo => todo.id)) + 1 : 1,
      text: newTodoText,
      done: false,
    };
    todos = [...todos, newTodo];
    newTodoText = ''; // Clear the input after adding
  }


  function deleteTodo(todoId) {
    todos = todos.filter(todo => todo.id !== todoId);
  }

  
    function handleDragStart(event, todo) {
      dragItem.set(todo);
    }
  
    function handleDrop(event, targetTodo) {
      event.preventDefault();
      dragItem.update(draggedTodo => {
        if (draggedTodo && draggedTodo.id !== targetTodo.id) {
          let updatedTodos = [...todos];
          const indexFrom = updatedTodos.findIndex(todo => todo.id === draggedTodo.id);
          const indexTo = updatedTodos.findIndex(todo => todo.id === targetTodo.id);
  
          // Remove the dragged item
          const [reorderedItem] = updatedTodos.splice(indexFrom, 1);
          // Insert at the new position
          updatedTodos.splice(indexTo, 0, reorderedItem);
  
          todos = updatedTodos; // This assignment triggers reactivity
        }
        return null; // Clear the dragged item
      });
    }
  
    function allowDrop(event) {
      event.preventDefault();
    }
  
    const toggleDone = todoId => {
      todos = todos.map(todo =>
        todo.id === todoId ? { ...todo, done: !todo.done } : todo
      );
    };
  
    function handleKeydown(event, todo) {
      if (event.key === "Enter") {
        toggleDone(todo.id);
      }
    }
  </script>
  
  <style>
    .todo-item { cursor: grab; }
    .done { text-decoration: line-through; }
  </style>

<div class="mb-4">
    <input
      type="text"
      bind:value={newTodoText}
      placeholder="Add new todo"
      class="mr-2"
      on:keyup={(event) => event.key === 'Enter' && addTodo()}
    />
    <button on:click={addTodo} class="p-2 bg-blue-500 text-white">Add Todo</button>
  </div>
  
  <ul class="border-2 border-rose-500">
    {#each todos as todo (todo.id)}
    <li class={`flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer ${todo.done ? 'text-gray-400 line-through' : 'text-gray-800'} ${todos.indexOf(todo) % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
        <button class="todo-item {todo.done ? 'done' : ''}"
        on:click={() => toggleDone(todo.id)}
        draggable="true"
        on:dragstart={(event) => handleDragStart(event, todo)}
        on:drop={(event) => handleDrop(event, todo)}
        on:dragover={allowDrop}
        tabindex="0"
        on:keydown={(event) => handleKeydown(event, todo)}>
        {todo.text}
        </button>
        <button on:click={() => deleteTodo(todo.id)} class="ml-4 bg-red-500 text-white p-1">Remove</button>
      </li>
    {/each}
  </ul>
  