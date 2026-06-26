import React from 'react'
import './auth.form.scss';
import { useNavigate, Link } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import { useState } from 'react';



const Login = () => {
  const navigate = useNavigate();

  const {loading, handleLogin} = useAuth()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  if (loading) {
    return (<main><h1>Loading.......</h1></main>)
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleLogin({email, password})
    navigate('/')
  }
  return (
    <main>

      <div className="formContainer">

        <h1>Login</h1>

        <form onSubmit={handleSubmit}>

          <div className='input-fields'>
            <input 
              type="email" 
              placeholder='email' 
              name='email' 
              onChange = {(e) => {setEmail(e.target.value)}}
            />

            <input 
              type="password" 
              placeholder='password' 
              name='password'
              onChange={(e) =>{setPassword(e.target.value)}}
            />
          </div>
          <button className='btn'>LogIn</button>
        </form>

        <p>Don't have an account? <Link to="/register">Register</Link></p>
      </div>
    </main>
  )
}

export default Login
