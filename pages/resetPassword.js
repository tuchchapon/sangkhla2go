import {React,useState, useEffect} from 'react'
import { useRouter } from 'next/router'
import axios from 'axios';

 function resetPassword({  }) {
    const router = useRouter()
    const {token} = router.query
    const [new_password, setNew_password] = useState({
        token:'',password:''
    })

    useEffect(() => {
        setNew_password({...new_password,token:token})
        console.log('token is',new_password.token);

    }, [token])

    const setNewPassword =()=>{
        console.log('reset password');
        console.log('new password is',new_password);
        console.log('new token is ',token);
       try {
        axios.post('http://localhost:8080/reset-password',new_password).then((res)=>{
            console.log(res);
        })
       } catch (error) {
           console.log(error);
       }
    }
    return (
        
        <div>
            <h1>reset password</h1>
            <input type="text" onChange={(e)=>setNew_password({...new_password,password:e.target.value,})} placeholder="รหัสผ่านใหม่"/>
            <button onClick={setNewPassword} >set new password</button>
        </div>
    )
}
export default resetPassword