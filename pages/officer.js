import axios from 'axios'
import {React,useState,useEffect} from 'react'

export default function officer() {
    const [check_data, setCheck_data] = useState(false)
    useEffect(() => {
        const getOfficer=async()=>{
            const response = await axios.get('http://localhost:8080/get/officers')
            if (response.status === 200) {
                console.log(response.data.payload);
                setCheck_data(true)
            }
             
            
        }
        if (check_data === false)getOfficer()
    
    }, [])
    return (
        <div>
            
        </div>
    )
}
