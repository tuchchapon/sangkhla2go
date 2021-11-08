import axios from 'axios'
import {React,useState} from 'react'

export default function login() {
    const login =()=>{
        console.log('login');
        axios.post({
            method:'POST',
            url: 'http:localhost:8080/login',
            data: {
              email    : admin.email,
              password : admin.password
            }
        })
    }
    const [admin, setAdmin] = useState({
        email:'tuchchapon@gmail.com',
        password: 'tuch253913.'
      })
    return (
        <div>
            <span >email</span>
            <input onChange={(e)=>{setAdmin({...admin,email:e.target.value})}} type="text" />
            <span>password</span>
            <input onChange={(e)=>{setAdmin({...admin,password:e.target.value}),console.log(e.target.value);}} type="text" />
            <button onClick={login}>login</button>
        </div>
    )
}
