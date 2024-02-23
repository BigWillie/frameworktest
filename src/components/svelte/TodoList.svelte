<script>
  import { derived } from 'svelte/store';

  let todos = [
    { id: 1, text: "Learn Svelte", done: false },
    { id: 2, text: "Build a to-do app", done: false },
  ];
  let newTodoText = '';
  let dragItem = null;

  const addTodo = () => {
    if (!newTodoText.trim()) return;
    const newId = todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;
    todos = [...todos, { id: newId, text: newTodoText, done: false }];
    newTodoText = '';
  };

  const deleteTodo = (todoId) => {
    todos = todos.filter(todo => todo.id !== todoId);
  };

  const toggleDone = (todoId) => {
    todos = todos.map(todo => todo.id === todoId ? { ...todo, done: !todo.done } : todo);
  };

  const handleDragStart = (todo) => {
    dragItem = todo;
  };

  const handleDrop = (targetTodo) => {
    if (dragItem && dragItem.id !== targetTodo.id) {
      let indexFrom = todos.findIndex(todo => todo.id === dragItem.id);
      let indexTo = todos.findIndex(todo => todo.id === targetTodo.id);
      let reorderedItem = todos.splice(indexFrom, 1)[0];
      todos.splice(indexTo, 0, reorderedItem);
      todos = [...todos];
    }
    dragItem = null;
  };

  const allowDrop = (event) => {
    event.preventDefault();
  };

  // Reactive statement for reversedTodosString
  $: reversedTodosString = todos.map(todo => todo.text).join(', ').split('').reverse().join('');
</script>

<style>
  .todo-item { cursor: grab; }
  .done { text-decoration: line-through; }
</style>

<div>
  <div class="mb-4">
    <input type="text" bind:value={newTodoText} placeholder="Add new todo" class="mr-2" on:keyup.enter={addTodo} />
    <button on:click={addTodo} class="p-2 bg-blue-500 text-white">Add Todo</button>
    <span>{reversedTodosString}</span>
  </div>
  <ul class="border-2 border-rose-500">
    {#each todos as todo, index (todo.id)}
      <li class="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer {todo.done ? 'text-gray-400 line-through' : 'text-gray-800'} {index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}">
        <button class="todo-item {todo.done ? 'done' : ''}" on:click={() => toggleDone(todo.id)} draggable="true" on:dragstart={() => handleDragStart(todo)} on:drop={() => handleDrop(todo)} on:dragover={allowDrop}>
          {todo.text}
        </button>
        <button on:click={() => deleteTodo(todo.id)} class="ml-4 bg-red-500 text-white p-1">Remove</button>
      </li>
    {/each}
  </ul>
</div>
