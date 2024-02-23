import React, { useState } from 'react';

const TodoList = () => {
  const [todos, setTodos] = useState([
    { id: 1, text: "Learn React", done: false },
    { id: 2, text: "Build a to-do app", done: false },
  ]);

  const [newTodoText, setNewTodoText] = useState('');
  const [draggedItem, setDraggedItem] = useState(null);

  const handleDragStart = (todo) => {
    setDraggedItem(todo);
  };

  const handleDrop = (targetTodo) => {
    if (draggedItem && draggedItem.id !== targetTodo.id) {
      let updatedTodos = [...todos];
      const indexFrom = updatedTodos.findIndex(todo => todo.id === draggedItem.id);
      const indexTo = updatedTodos.findIndex(todo => todo.id === targetTodo.id);

      const [reorderedItem] = updatedTodos.splice(indexFrom, 1);
      updatedTodos.splice(indexTo, 0, reorderedItem);

      setTodos(updatedTodos);
      setDraggedItem(null);
    }
  };

  const allowDrop = (event) => {
    event.preventDefault();
  };

  const toggleDone = (todoId) => {
    const updatedTodos = todos.map(todo =>
      todo.id === todoId ? { ...todo, done: !todo.done } : todo
    );
    setTodos(updatedTodos);
  };

  const addTodo = () => {
    if (!newTodoText.trim()) return;
    const newTodo = { id: Date.now(), text: newTodoText, done: false };
    setTodos([...todos, newTodo]);
    setNewTodoText('');
  };

  const removeTodo = (todoId, event) => {
    event.stopPropagation(); // Prevents click event from bubbling to the parent element
    setTodos(todos.filter(todo => todo.id !== todoId));
  };

  return (
    <>
      <div className="mb-4">
        <input
          type="text"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          placeholder="Add new todo"
          className="mr-2"
        />
        <button onClick={addTodo} className="p-2 bg-blue-500 text-white">Add Todo</button>
      </div>
      <ul className="border-2 border-rose-500">
        {todos.map((todo, index) => (
          <li key={todo.id}
              className={`flex items-center justify-between p-4 ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'} hover:bg-gray-50 cursor-pointer ${todo.done ? 'text-gray-400 line-through' : 'text-gray-800'}`}
              draggable="true"
              onDragStart={() => handleDragStart(todo)}
              onDrop={() => handleDrop(todo)}
              onDragOver={allowDrop}
              tabIndex="0"
              style={{ cursor: 'grab', textDecoration: todo.done ? 'line-through' : 'none' }}>
            <span onClick={() => toggleDone(todo.id)} style={{ flexGrow: 1 }}>
              {todo.text}
            </span>
            <button onClick={(event) => removeTodo(todo.id, event)} className="ml-4 bg-red-500 text-white p-1">Remove</button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default TodoList;
