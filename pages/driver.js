import {React,useState,useEffect} from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

function driver() {
    const router = useRouter();
    const [data, setData] = useState({})
    const [driver, setDriver] = useState({location_id :null,
    driver_name :null, contact:null,driver_image : []
  })
  // const [boatProvider, setBoatProvider] = useState({
  //   provider_name:'provider name',
  //   owner_name : 'owner name',
  //   boat_quantity: 10,
  //   max_passenger:20,
  //   contact:'contact of boat tour provider',
  //   boat_images:['1','1','1','1','1','1','3'],
  //   provider_images: ['2','2','2','2','2','2','2','4']
  // })
  const [driverLocation, setDriverLocation] = useState({
    location_name:'location name 1',
    location_detail :'location detail 1'
  })
  // const [catagory, setcatagory] = useState({
  //   catagory_name:'catagory name'
  // })
  // const [accommodation, setaccommodation] = useState({
  //   accommodation_type: 'accommodation type'
  // })
  // const [accommodation, setaccommodation] = useState({
  //   type_name: 'accommodation type name'
  // })
    // const [accomodation, setAccomodation] = useState({
    //   type_id:'type id7',
    //   name:'accommodation name7',
    //   information :'accommodation information7',
    //   price:1000,
    //   services:[2,3,6,20,40,'34325'],
    //   contact:'accommodation contact',
    //   images:['1213','accommodation image','images']
    // })
    const [i, setI] = useState(0)
    // const restaurant = {catagory_id:`${i}`,name:`name ${i}`,location:`location ${i}`,
    // recommand_menu:`recommand_menu${i}`,opening_time:`openning timge${i}`,min_price:`min price ${i}`,
    // max_price:`max price ${i}`,restaurant_images:['23131','141821','dasadj',],contact:`contact ${i}`,services:['12314','14143','daskdhashdj','chjas']}
    // const reviews ={reviewer_name:`reviewer name ${i}`,reviewer_email:`reviewer email ${i}`,review_text:`review text ${i}`,status:'pending'}

    // const sendResetPassword =()=>{
    //   console.log('remind password email');
    //   fetch('api/resetPassword',{
    //     method:'POST',
    //     headers:{
    //       'Accept': 'application/json, text/plain, */*',
    //       'Content-Type': 'application/json'
    //     },
    //     body:''
    //   }).then((res)=>{
    //     console.log('response received');
    //     if (res.status === 200){
    //       console.log('response succeeded');
    //     }
    //   })
    // }
    const [admin, setAdmin] = useState({
      email:'tuchchapon@gmail.com',
      password: 'tuch253913.'
    })
  const testPOST =()=>{
    // console.log('test POST API');
    //   axios.post(`${process.env.SERVER_API}/create/driver-location`,driverLocation)
    //   .then((res) => {
    //     console.log(res);
    //     console.log(res.data);
    //     //router.replace("/");
    //   })

    //   setI(i +1)
  }
    const checkDB=()=>{
      console.log('check database connect');
      axios.get(`${process.env.SERVER_API}/dbcheck`)
      .then((response)=> console.log('response :',response))
      .catch((err)=>
      console.log(err))
    }
    const testUpdate=()=>{
    console.log('test update');
    axios.post('${process.env.SERVER_API}/edit/driverLocation',driver_location[0])
    .then((res) => {
      console.log(res);
      console.log(res.data);
      //router.replace("/");
    })
    }
    const testDelete=()=>{
      console.log('test delete');
      axios.delete(`${process.env.SERVER_API}/delete/driverLocation`,{data:driver_location[0]})
      .then((res)=>{
        console.log('res is',res);
      })
    }
  
    const [driver_location, setDriver_location] = useState([])
  useEffect(() => {
    const getDriver  = async()=>{
      try {
        let response = await axios.get(`${process.env.SERVER_API}/getDriverLocation`)
        console.log(response.data.payload);
        setDriver_location(response.data.payload)
      } catch (err) {
        console.log('err is ',err);
      }
    }
    getDriver()
    return () => {}
  }, [])
    return (
        <div>
          <div>
      <div>connect server</div>
      { driver_location.map((location)=>(
        <div key={location.id} >
        <p>{location.id}</p>
        <p>{location.location_name}</p>
        <p>{location.location_detail}</p>
        </div>
      ))}

      <span>ID</span>
      <input type="text" name="locationName" placeholder="location name" id="" />
      <span>location name</span>
      <input type="text" name="locationDetail" placeholder="location detail" id="" />
      <span>location detail</span>
      <input type="text" name="contact" placeholder="contact" id="" />
      <button onClick={testPOST}>test post</button>
      <button onClick={testUpdate} >test update</button>
      <button onClick={testDelete} >test delete</button>
  {/* <button onClick={sendApprovedEmail}>Appproved email</button>
  <button onClick={sendDisApprovedEmail}>disapproved email</button>
  <button onClick={sendResetPassword}>remind password email</button> */}
    </div>
        </div>
    )
}



// export async function getServerSideProps(context){
//   let response = await axios.get('http://localhost:1150/getDriver')
//   let Drivers = []
//   try{
//     if (response.data.status === 200 ){
//       Drivers = response.data ? Driver.data.driver:[]
//     }
//     return{
//       props: {Drivers},
//     }
//   }catch(err){
//     console.log(err);
//   }
//   return{
//     notFound:true,
//   }
//   const getData=()=>{
//     axios.get('http://localhost:1150/getDriver').then((response)=>{
//       setDriver(response.data)
//     }).then(console.log(driver))
//     .catch((err)=>
//     console.log(err))
    
//     console.log(data);
//   }
// }

