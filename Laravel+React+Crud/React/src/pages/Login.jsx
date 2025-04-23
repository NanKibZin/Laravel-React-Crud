import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Login() {
  useEffect(()=>{
    if(localStorage.getItem('user-info')){
      navigate('/create');
    }
  },[])
   const navigate = useNavigate();
    const [name,setName]=useState("")
    const [password,setPassword]=useState("")
    const [email,setEmail]=useState("")
    const [error, setError] = useState("") // បន្ថែមសម្រាប់បង្ហាញបញ្ហា
    const sigin= async ()=>{
      let item={name,password,email}
      console.warn(item)
      let result= await fetch("http://127.0.0.1:8000/api/login",{
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
        let nan=localStorage.setItem("user-info",JSON.stringify(result))
        console.log(nan)
        navigate("/");
      }else{
        setError(result.message)
      }
      // localStorage.setItem("user-info",JSON.stringify(result))
    }
  // const navigate = useNavigate();
  return (

    <div>
      <h1>Login Page</h1>
      {error && <div className="alert alert-danger">{error}</div>}
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
        
        <Button onClick={sigin} variant="primary" type="button" className="px-4">
          Sign Up
        </Button>
      </form>
    </div>
  )
}

export default Login
