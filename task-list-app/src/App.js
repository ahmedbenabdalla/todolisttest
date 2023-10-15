import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import SignIn from './Components/Sign-In';
import SignUp from './Components/Sign-Up';
import ToDoList from './Components/ToDoList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/todolist" element={<ToDoList />} />
        {/* <ProtectedRoute
          path="/todolist"
          element={<ToDoList />}
          isAuthenticated={userAuthenticated}
        /> */}

      </Routes>
    </Router>
  );
}

export default App;
