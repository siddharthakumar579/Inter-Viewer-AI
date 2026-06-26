import React, {useState} from 'react'
import {useNavigate, Link} from 'react-router';
import { useAuth } from '../hooks/useAuth';



const Register = () => {
  const navigate = useNavigate();

  const {loading, handleRegister} = useAuth()

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  if (loading) {
    return (<main><h1>Loading.......</h1></main>)
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleRegister({username,email, password })
    navigate('/')
  }
  return (
    <main>

      <div className="formContainer">

        <h1>Register</h1>

        <form onSubmit={handleSubmit}>

          <div className='input-fields'>
            
            <input 
              type="text" 
              placeholder='username' 
              name='username'
              onChange={(e) =>{setUsername(e.target.value)}} 
            />

            <input
              type="email" 
              placeholder='email' 
              name='email' 
              onChange={(e) =>{setEmail(e.target.value)}}
            />

            <input 
              type="password" 
              placeholder='password' 
              name='password'
              onChange={(e) =>{setPassword(e.target.value)}}
            />
            
          </div>
          <button className='btn'>Create Account</button>
        </form>

        <p>Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </main>
  )
}

export default Register
