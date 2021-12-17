// Next.js API route support: https://nextjs.org/docs/api-routes/introduction


// const getDriver=(req,res)=>{
//   let location_array =[]
//   DriverLocation.find({},function (err,data) {
//     if (err){
//       res.send(err)
//     }
//     for (let i = 0; i < data.length; i++) {
//       let location = {id:'',location_name:'',location_detail:''}
//       location.id = data[i]._id
//       location.location_name = data[i].location_name
//       location.location_detail = data[i].location_detail
//       location_array.push(location) 
//     }
//     // console.log(data);
//     return res.status(200).json({
//       status:200,
//       type:'success',
//       payload:location_array,
//     })
//   })
// }


// export default getDriver()
