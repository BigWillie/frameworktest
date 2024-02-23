import React, { useState, useMemo } from 'react';

function TodoApp() {
  const [newTodoText, setNewTodoText] = useState('');
  const [todos, setTodos] = useState([
    { id: 1, text: "Learn React", done: false },
    { id: 2, text: "Build a to-do app", done: false },
  ]);
  const [dragItem, setDragItem] = useState(null);

  const reversedTodosString = useMemo(() => {
    return todos.map(todo => todo.text).join(', ').split('').reverse().join('');
  }, [todos]); // Dependency array, recalculate when `todos` changes

  const addTodo = () => {
    if (!newTodoText.trim()) return;
    const newId = todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;
    setTodos([...todos, { id: newId, text: newTodoText, done: false }]);
    setNewTodoText('');
  };

  const deleteTodo = (todoId) => {
    setTodos(todos.filter(todo => todo.id !== todoId));
  };

  const toggleDone = (todoId) => {
    setTodos(todos.map(todo => todo.id === todoId ? { ...todo, done: !todo.done } : todo));
  };

  const handleDragStart = (todo) => {
    setDragItem(todo);
  };

  const handleDrop = (targetTodo) => {
    const draggedIndex = todos.findIndex(todo => todo.id === dragItem.id);
    const targetIndex = todos.findIndex(todo => todo.id === targetTodo.id);

    if (draggedIndex !== -1 && targetIndex !== -1 && draggedIndex !== targetIndex) {
      const newTodos = [...todos];
      const itemToMove = newTodos.splice(draggedIndex, 1)[0];
      newTodos.splice(targetIndex, 0, itemToMove);
      setTodos(newTodos);
    }
    setDragItem(null);
  };

  const allowDrop = (event) => {
    event.preventDefault();
  };

  const handleKeydown = (event, todo) => {
    if (event.key === "Enter") {
      toggleDone(todo.id);
    }
  };

  // Inline styles
  const todoItemStyle = { cursor: 'grab' };
  const doneStyle = { textDecoration: 'line-through' };

  return (
    <>
      <div className="mb-4">
        <input
          type="text"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          placeholder="Add new todo"
          className="mr-2"
          onKeyUp={(e) => e.key === 'Enter' && addTodo()}
        />
        <button onClick={addTodo} className="p-2 bg-blue-500 text-white">Add Todo</button>
        <span>{reversedTodosString}</span>
      </div>
      <ul className="border-2 border-rose-500">
        {todos.map((todo, index) => (
          <li key={todo.id}
              className={`flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer ${
                todo.done ? 'text-gray-400 line-through' : 'text-gray-800'
              } ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}
              draggable="true"
              onDragStart={() => handleDragStart(todo)}
              onDrop={() => handleDrop(todo)}
              onDragOver={allowDrop}
          >
            <div
              style={todo.done ? {...todoItemStyle, ...doneStyle} : todoItemStyle}
              onClick={() => toggleDone(todo.id)}
              onKeyDown={(event) => handleKeydown(event, todo)}
              tabIndex="0"
            >
              {todo.text}
            </div>
            <button onClick={() => deleteTodo(todo.id)} className="ml-4 bg-red-500 text-white p-1">Remove</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default TodoApp;
