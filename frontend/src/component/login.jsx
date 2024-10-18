import React from 'react'
import { useState , useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Login() {

    const navigate=useNavigate()

    const [email,setEmail]=useState(null)
    const [password,setPassword]=useState(null)

    async function handleSubmit(e) {
        e.preventDefault();
        await axios.post(
            'http://localhost:9000/admin/login',
            { email, password },
            { withCredentials: true } 
          )
        .then(()=>navigate("/hi") )
        .catch((err)=> alert("Not Login"))
      }

  return (
    <div >
        <form className='flex items-center flex-col justify-around h-[300px]' action="" onSubmit={handleSubmit}>
            <input type="text" className='w-[350px] h-[40px] ps-2 bg-slate-200' placeholder='Enter Email' onChange={(e)=>setEmail(e.target.value)} /> <br />
            <input type="text" placeholder='Enter Password' className='w-[350px] h-[40px] ps-2 bg-slate-200' onChange={(e)=>setPassword(e.target.value)} /> <br />
            <button className='px-10 py-2 bg-green-400 text-white' type='submit'>Submit</button>
        </form>
    </div>
  )
}

export default Login