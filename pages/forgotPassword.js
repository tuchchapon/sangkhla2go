import {React,useState} from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
const forgotPassword =()=> {

    const forgotPassword =()=>{
        console.log('forgot password')
        console.log(userEmail);
        try {
            axios.post('http://localhost:8080/forgot-password',userEmail).then((res)=>{
                console.log(res);
            })
        } catch (error) {
            console.log(error);
        }
    }
    const [userEmail, setUserEmail] = useState({email:'',token:''})
    return (
        <div className="body">
            <h1>forgot password</h1>
            <input type="text" placeholder='กรุณากรอกอีเมลที่ลืมรหัสผ่าน' onChange={(e)=>{setUserEmail({...userEmail,email:e.target.value})}} />
            <button onClick={forgotPassword} >forgot password</button>
        </div>
    )
}
export default  forgotPassword
