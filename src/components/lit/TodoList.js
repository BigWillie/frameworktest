import { LitElement, html, css } from 'lit';
import { state } from 'lit/decorators.js';

export class TodoList extends LitElement {
  static styles = css`
    .todo-item { cursor: grab; }
    .done { text-decoration: line-through; }
  `;

  constructor() {
    super();
    this.todos = [
      { id: 1, text: "Learn Lit", done: false },
      { id: 2, text: "Build a to-do app", done: false },
    ];
    this.newTodoText = '';
    this.dragItem = null;
  }

  static get properties() {
    return {
      todos: { state: true },
      newTodoText: { state: true },
      dragItem: { state: true }
    };
  }

  addTodo() {
    if (!this.newTodoText.trim()) return;
    const newId = this.todos.length > 0 ? Math.max(...this.todos.map(todo => todo.id)) + 1 : 1;
    this.todos = [...this.todos, { id: newId, text: this.newTodoText, done: false }];
    this.newTodoText = '';
  }

  deleteTodo(todoId) {
    this.todos = this.todos.filter(todo => todo.id !== todoId);
  }

  toggleDone(todoId) {
    this.todos = this.todos.map(todo => todo.id === todoId ? { ...todo, done: !todo.done } : todo);
  }

  handleDragStart(todo) {
    this.dragItem = todo;
  }

  handleDrop(targetTodo) {
    if (this.dragItem && this.dragItem.id !== targetTodo.id) {
      const indexFrom = this.todos.findIndex(todo => todo.id === this.dragItem.id);
      const indexTo = this.todos.findIndex(todo => todo.id === targetTodo.id);
      const [reorderedItem] = this.todos.splice(indexFrom, 1);
      this.todos.splice(indexTo, 0, reorderedItem);
      this.dragItem = null;
    }
  }

  allowDrop(event) {
    event.preventDefault();
  }

  render() {
    return html`
      <div>
        <div class="mb-4">
          <input type="text" .value=${this.newTodoText} @input=${e => this.newTodoText = e.target.value} placeholder="Add new todo" class="mr-2" @keyup=${e => e.key === 'Enter' && this.addTodo()} />
          <button @click=${this.addTodo} class="p-2 bg-blue-500 text-white">Add Todo</button>
          <span>${this.todos.map(todo => todo.text).join(', ').split('').reverse().join('')}</span>
        </div>
        <p>Lit has its shadow DOM and scoped styles, so the styles are not leaking out of the component, making it a pain to include tailwind.</p>
        <ul class="border-2 border-rose-500">
          ${this.todos.map((todo, index) => html`
            <li class="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer ${todo.done ? 'text-gray-400 line-through' : 'text-gray-800'} ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}">
              <button class="todo-item ${todo.done ? 'done' : ''}" @click=${() => this.toggleDone(todo.id)} draggable="true" @dragstart=${() => this.handleDragStart(todo)} @drop=${() => this.handleDrop(todo)} @dragover=${this.allowDrop}>
                ${todo.text}
              </button>
              <button @click=${() => this.deleteTodo(todo.id)} class="ml-4 bg-red-500 text-white p-1">Remove</button>
            </li>
          `)}
        </ul>
      </div>
    `;
  }
}

customElements.define('todo-list', TodoList);
