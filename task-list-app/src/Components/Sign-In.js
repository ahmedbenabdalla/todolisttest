import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';



function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSignIn = () => {


    axios
      .post('http://localhost:3001/user/login', { email, password })
      .then((response) => {
        localStorage.setItem('token', response.data.token);
      })
      .catch((error) => {
        console.error('Sign-in failed:', error);
      });
      window.location.href = '/todolist';
  }

  return (
    <div>
      <h2>Sign In</h2>
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleSignIn}>Sign In</button>
      <Link to="/signup">Sign Up</Link> 
    </div>
  );
}

export default SignIn;
