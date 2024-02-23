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
    <button @click="addTodo" class="p-2 bg-blue-500 text-white">Add Todo</button>
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
        @click="() => toggleDone(todo.id)"
        draggable="true"
        @dragstart="event => handleDragStart(event, todo)"
        @drop="event => handleDrop(event, todo)"
        @dragover="allowDrop"
        tabindex="0"
        @keydown="event => handleKeydown(event, todo)">
        {{ todo.text }}
      </button>
      <button @click="() => deleteTodo(todo.id)" class="ml-4 bg-red-500 text-white p-1">Remove</button>
    </li>
  </ul>
</div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const newTodoText = ref('');
    const todos = ref([
      { id: 1, text: "Learn Vue Options API", done: false },
      { id: 2, text: "Build a to-do app", done: false },
    ]);
    const dragItem = ref(null);

    const addTodo = () => {
      if (!newTodoText.value.trim()) return;

      const newId = todos.value.length > 0 ? Math.max(...todos.value.map(todo => todo.id)) + 1 : 1;
      todos.value.push({ id: newId, text: newTodoText.value, done: false });
      newTodoText.value = '';
    };

    const deleteTodo = (todoId) => {
      todos.value = todos.value.filter(todo => todo.id !== todoId);
    };

    const toggleDone = (todoId) => {
      const index = todos.value.findIndex(todo => todo.id === todoId);
      if (index !== -1) {
        todos.value[index] = { ...todos.value[index], done: !todos.value[index].done };
        // Trigger reactivity manually by replacing the item in the array
        todos.value = [...todos.value];
      }
    };

    const handleDragStart = (event, todo) => {
      dragItem.value = todo;
    };

    const handleDrop = (event, targetTodo) => {
      event.preventDefault();
      const draggedIndex = todos.value.findIndex(todo => todo.id === dragItem.value.id);
      const targetIndex = todos.value.findIndex(todo => todo.id === targetTodo.id);

      if (draggedIndex !== -1 && targetIndex !== -1 && draggedIndex !== targetIndex) {
        const itemToMove = todos.value.splice(draggedIndex, 1)[0];
        todos.value.splice(targetIndex, 0, itemToMove);
        // Ensure reactivity is triggered by replacing the array
        todos.value = [...todos.value];
      }
      dragItem.value = null;
    };

    const allowDrop = (event) => {
      event.preventDefault();
    };

    const handleKeydown = (event, todo) => {
      if (event.key === "Enter") {
        toggleDone(todo.id);
      }
    };

    return { newTodoText, todos, addTodo, deleteTodo, toggleDone, handleDragStart, handleDrop, allowDrop, handleKeydown };
  },
};
</script>

<style>
.todo-item { cursor: grab; }
.done { text-decoration: line-through; }
</style>
