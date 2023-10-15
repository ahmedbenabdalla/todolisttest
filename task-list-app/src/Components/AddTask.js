import React, { useState } from "react";
import axios from 'axios';

function AddTask({ onTaskAdded }) {
  const [task, setTask] = useState("");

  //token
  const token = localStorage.getItem('token');
  const headers = {
    Authorization: `Bearer ${token}`,
  };
 
  //add element in the server
  const handleAdd = () => {
    axios.post('http://localhost:3001/todo/add', { task: task }, { headers})
  .then(result => {
    onTaskAdded(result.data); 
  })
  .catch(err => console.log(err));
  }

  return (
    <div className="create_form">
      <input type='text' placeholder="Enter Task" onChange={(e) => setTask(e.target.value)} />
      <button type='button' onClick={handleAdd}>Add</button>
    </div>
  );
}

export default AddTask;
