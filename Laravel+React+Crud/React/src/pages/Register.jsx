import React, { useState,useEffect } from 'react'
import { Button } from 'react-bootstrap'
// import {useHistory} from "react-router-dom"
import { useNavigate } from "react-router-dom";


function Register() {
  useEffect(()=>{
    if(localStorage.getItem('user-info')){
      navigate('/');
    }
  })
  const navigate = useNavigate();
  const [name,setName]=useState("")
  const [password,setPassword]=useState("")
  const [email,setEmail]=useState("")
  const signUp= async ()=>{
    let item={name,password,email}
    console.warn(item)
    let result= await fetch("http://127.0.0.1:8000/api/register",{
      method:"POST",
      body:JSON.stringify(item),
      headers:{
        "Content-Type":"application/json",
        "Accept":'application/json'
      }
    })
    result= await result.json()
    console.warn("result=",result)
    if(result.status==true){
      localStorage.setItem("user-info",JSON.stringify(result))
      navigate("/");
    }
  }
  return (
    <div className='mt-5 container '>
      <h1>Register Page</h1>
      <form className="mt-5 container">
        <div className="mb-3">
          <input
            type="text"
            name="name"
           value={name}
           onChange={(e)=>setName(e.target.value)}
            placeholder="name"
            className="form-control"
            required
          />
        </div>
        
        <div className="mb-3">
          <input
            type="text"
            name="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            placeholder="password"
            className="form-control"
  
          />
        </div>
        
        <div className="mb-3">
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            placeholder="email"
            className="form-control"
            required
          />
        </div>
        
        <Button onClick={signUp} variant="primary" type="button" className="px-4">
          Sign Up
        </Button>
      </form>
    </div>
  )
}

export default Register
