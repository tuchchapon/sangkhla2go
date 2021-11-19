import axios from 'axios'
import {React,useState} from 'react'

export default function login() {

    const signIn = ()=>{
        console.log('login');
        axios.post('http://localhost:8080/login',admin).then((res)=>{
            // console.log(res);
        })
    }
    const register = ()=>{
        console.log('register');
        axios.post('http://localhost:8080/createAdmin',admin).then((res)=>{
            console.log(res);
        })
    }
    const changePassword =()=>{
        console.log('change password');
        axios.post('http://localhost:8080/change-password',newPassword)
    }

    const [admin, setAdmin] = useState({
        email:'',
        password: ''
      })
   
      const [newPassword, setNewPassword] = useState('')
    
    const testPOST =()=>{
        console.log('test POST API');
          axios.post('http://localhost:8080/createAdmin',admin)
          .then((res) => {
            console.log(res);
            console.log(res.data);
            //router.replace("/");
          })
        } 

    return (
        <div>
            <span >email</span>
            <input onChange={(e)=>{setAdmin({...admin,email:e.target.value})}} type="text" />
            <span>password</span>
            <input onChange={(e)=>{setAdmin({...admin,password:e.target.value}),console.log(e.target.value);}} type="text" />
            <button onClick={signIn}>login</button>
            <button onClick={register}>register</button>

        </div>
    )
}
