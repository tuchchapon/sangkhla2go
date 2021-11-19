import {React, useState} from 'react'
import axios from 'axios'
export default function driverlocation() {

    const [driverlocation, setDriverlocation] = useState({
        location_name:'',location_detail:''
    })
    const submitLocation = async ()=>{
        console.log(driverlocation);
       await axios.post('http://localhost:8080/create/driverLocation',driverlocation).then((res)=>{
            console.log(res);
        })
    }
    return (
        <div>
            <h1>driver location</h1>
            <input type="text" onChange={((e)=>{setDriverlocation({...driverlocation,location_name:e.target.value})})} />
            <button onClick={submitLocation} >submit</button>
        </div>
    )
}
