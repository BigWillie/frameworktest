<template>
    <div>
    <div class="mb-4">
  <input
    type="text"
    v-model="newTodoText"
    placeholder="Add new todo"
    class="mr-2"
    @keyup.enter="addTodo"
  />
  <button @click="addTodo" class="p-2 bg-blue-500 text-white mr-2">Add Todo</button>
  <span>{{ reversedTodosString }}</span>
</div>
  <ul class="border-2 border-rose-500">
    <li v-for="(todo, index) in todos" :key="todo.id"
        class="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer"
        :class="[
          { 'text-gray-400 line-through': todo.done, 'text-gray-800': !todo.done },
          index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
        ]">
      <button class="todo-item"
        :class="{ done: todo.done }"
        @click="toggleDone(todo.id)"
        draggable="true"
        @dragstart="event => handleDragStart(event, todo)"
        @drop="event => handleDrop(event, todo)"
        @dragover="allowDrop"
        tabindex="0"
        @keydown="event => handleKeydown(event, todo)">
        {{ todo.text }}
      </button>
      <button @click="deleteTodo(todo.id)" class="ml-4 bg-red-500 text-white p-1">Remove</button>
    </li>
  </ul>
</div>
  </template>
  
  <script>
export default {
  data() {
    return {
      dragItem: null,
      todos: [
        { id: 1, text: "Learn Vue Options API", done: false },
        { id: 2, text: "Build a to-do app", done: false },
      ],
      newTodoText: '',
    };
  },
  computed: {
    // Step 2: Define the computed property
    reversedTodosString() {
      return this.todos.map(todo => todo.text).join(', ').split('').reverse().join('');
    }
  },
  methods: {
    addTodo() {
      if (!this.newTodoText.trim()) return; // Prevent adding empty todos
      // Find the highest current ID and add 1 to ensure uniqueness
      const newId = this.todos.length > 0 ? Math.max(...this.todos.map(todo => todo.id)) + 1 : 1;
      // Add the new todo
      this.todos.push({ id: newId, text: this.newTodoText, done: false });

      // Clear the input after adding
      this.newTodoText = '';
    },
    deleteTodo(todoId) {
      this.todos = this.todos.filter(todo => todo.id !== todoId);
    },
    handleDragStart(event, todo) {
      this.dragItem = todo;
    },
    handleDrop(event, targetTodo) {
      event.preventDefault();
      if (this.dragItem && this.dragItem.id !== targetTodo.id) {
        const indexFrom = this.todos.findIndex(todo => todo.id === this.dragItem.id);
        const indexTo = this.todos.findIndex(todo => todo.id === targetTodo.id);

        // Remove the dragged item
        const [reorderedItem] = this.todos.splice(indexFrom, 1);
        // Insert at the new position
        this.todos.splice(indexTo, 0, reorderedItem);
      }
      this.dragItem = null; // Clear the dragged item
    },
    allowDrop(event) {
      event.preventDefault();
    },
    toggleDone(todoId) {
      const todo = this.todos.find(todo => todo.id === todoId);
      if (todo) {
        todo.done = !todo.done;
      }
    },
    handleKeydown(event, todo) {
      if (event.key === "Enter") {
        this.toggleDone(todo.id);
      }
    },
  },
};

  </script>
  
  <style>
  .todo-item { cursor: grab; }
  .done { text-decoration: line-through; }
  </style>
  