import {React,useState,useEffect} from 'react'
import axios from 'axios'
export default function driver() {

    const [driverLocation, setDriverLocation] = useState([])

    useEffect(() => {
        const getLocation= async()=>{
            let response = await axios.get('http://localhost:8080/get/driverLocation')
            setDriverLocation(response.data.payload)
        }
        getLocation()
    }, [])
    return (
        <div>
            <div>
                <select name="" id="">
                {driverLocation.map((location)=>(
                    <option key={location.id} value="">{location.location_name}</option>
                ))}
                </select>
            </div>
        </div>
    )
}
