import React, { useEffect, useState } from "react";
import AddTask from "./AddTask";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

function ToDoList() {
  //create header for communication
  const token = localStorage.getItem('token');
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  //get tasks
  useEffect(() => {
    axios
      .get('http://localhost:3001/todo/get', { headers })
      .then((result) => {
        setTodos(result.data);
      })
      .catch((err) => console.log(err));
  }, []);

  //add task in the list
  const [todos, setTodos] = useState([]);
  const addTaskToList = (newTask) => {
    setTodos([...todos, newTask]);
  };
  
  // update task to done
  const handleCheckboxChange = (id) => {
    console.log(id)
    axios
      .put('http://localhost:3001/update/' + id)
      .then((result) => {
       
        const updatedTodos = todos.map((todo) => {
          if (todo._id === id) {
            return { ...todo, done: !todo.done };
          }
          return todo;
        });
        setTodos(updatedTodos);
      })
      .catch((err) => console.log(err));
  };


  //remove task
  const removeTask = (id) => {
    axios
      .delete(`http://localhost:3001/todo/delete/${id}`, { headers })
      .then((result) => {
        const updatedTodos = todos.filter((todo) => todo._id !== id);
        setTodos(updatedTodos);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h2>To Do List</h2>
      <AddTask onTaskAdded={addTaskToList} />
      {todos.map((t) => (
        <div key={t._id}>
          <p>{t.task}</p>
          <input
            type="checkbox"
            checked={t.done}
            onChange={() => handleCheckboxChange(t._id)}
          />
          <button onClick={() => removeTask(t._id)}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      ))}
    </div>
  );
}

export default ToDoList;
