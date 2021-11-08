const express = require('express');
const passport = require('passport')
const router = express.Router();
const mongoose = require('mongoose');
const Drivers = require('../../model/driver')
const BoatProvider = require('../../model/boatProvider')
const DriverLocation = require('../../model/driverLocation')
const Catagory = require('../../model/catagory')
const AccommodationType = require('../../model/accommodationType');
const Accommodation = require('../../model/accommodation')
const Restaurant = require('../../model/restaurant')
const Reviews = require('../../model/review')
const Admins = require('../../model/admin')

require('dotenv').config()
const mongoURL = process.env.DB_URL

router.route("/dbcheck").get((req, res) => {
    mongoose.connect(mongoURL, (err) => {
      if (err) {
        return res
          .status(400)
          .json({ status: 400, type: "failed", payload: err.message });
      }
      return res
        .status(200)
        .json({ status: 200, type: "success", payload: "success" });
    });
  });
// create boat tour provider 
   router.route("/createProvider").post((req,res)=>{
    const provider_name = req.body.provider_name;
    const owner_name = req.body.owner_name;
    const boat_quantity = req.body.boat_quantity;
    const max_passenger = req.body.max_passenger;
    const contact = req.body.contact;
    const boat_images = req.body.boat_images;
    const provider_images = req.body.provider_images;
    BoatProvider.create({
      provider_name,
      owner_name,
      boat_quantity,
      max_passenger,
      contact,
      boat_images,
      provider_images
})
  .then((e) =>
    res.status(201).json({ status: true, message: "create data success" })
  )
  .catch(res.status(500));
})

  // create driver location
   router.route("/createDriverLocation").post((req,res)=>{
       const location_name = req.body.location_name;
       const location_detail = req.body.location_detail;
       DriverLocation.create({
         location_name,
         location_detail
       }).then((e)=>{
         res.status(201).json({ status:true,message:'create data success'})
       }).catch(res.status(500));
   })
// create driver
   router.route("/createDriver").post((req,res)=>{
       const location_id = req.body.location_id;
       const driver_name = req.body.driver_name;
       const contact = req.body.contact;
       const driveImage =req.body.driverImage;
         Drivers.create({
            location_id,
            driver_name,
            contact,
            driveImage,
      })
        .then((e) =>
          res.status(201).json({ status: true, message: "create data success" })
        )
        .catch(res.status(500));
   })

// create catagory
   router.route("/createCatagory").post((req,res)=>{
       const  catagory_name = req.body.catagory_name;
      Catagory.create({
        catagory_name
      }).then((e) =>
      res.status(201).json({ status: true, message: "create data success" })
    )
      .catch(res.status(500));
   })

   // create restaurant
   router.route("/createRestaurant").post((req,res)=>{
        const catagory_id  = req.body.catagory_id;
        const name = req.body.name;
        const location = req.body.location;
        const recommand_menu = req.body.recommand_menu;
        const opening_time = req.body.opening_time;
        const min_price = req.body.min_price;
        const max_price = req.body.max_price;
        const restaurant_images = req.body.restaurant_images;
        const contact = req.body.contact;
        const services = req.body.services;
        Restaurant.create({
          catagory_id,
          name,
          location,
          recommand_menu,
          opening_time,
          min_price,
          max_price,
          restaurant_images,
          contact,
          services
        }).then((e) =>
        res.status(201).json({ status: true, message: "create data success" })
      )
        .catch(res.status(500));

   })
   // create accommodation type
   router.route("/createAccommodationType").post((req,res)=>{
       const type_name = req.body.type_name
       AccommodationType.create({
         type_name
       }).then((e) =>
       res.status(201).json({ status: true, message: "create data success" })
     )
       .catch(res.status(500));
   })
   // create accommodation
   router.route("/createAccommodation").post((req,res)=>{
       const type_id = req.body.type_id;
       const name = req.body.name;
       const information = req.body.information;
       const price = req.body.price;
       const services = req.body.services;
       const contact = req.body.contact;
       const images = req.body.images;
       Accommodation.create({
         type_id,
         name,
         information,
         price,
         services,
         contact,
         images
       }).then((e) =>
       res.status(201).json({ status: true, message: "create data success" })
     )
       .catch(res.status(500));
   })
   // create Review
   router.route("/createReview").post((req, res)=>{
       const reviewer_name = req.body.reviewer_name;
       const reviewer_email = req.body.reviewer_email;
       const review_text = req.body.review_text;
       const status = req.body.status;
      Reviews.create({
        reviewer_name,
        reviewer_email,
        review_text,
        status
      }).then((e) =>
      res.status(201).json({ status: true, message: "create data success" })
    )
      .catch(res.status(500));
   })
   // create admin
   router.route("/createAdmin").post((req,res)=>{
    const email = req.body.email
    const password = req.body.password
   Admins.create({
     email,
     password
   }).then((e) =>
   res.status(201).json({ status: true, message: "create data success" })
 )
   .catch(res.status(500));
})

/////////////////////// GET API ///////////////////////////////////////
      //get boat tour provider
  router.route("/getBoatProvider").get((req,res)=>{
    let data_array = []
    BoatProvider.find({},function (err,data) {
      if(err){
        res.send(err)
      }
      for (let i = 0; i < data.length; i++) {
        let boat_provider = {id:'',provider_name:'',owner_name:'',
        boat_quantity:'',max_passenger:'',contact:'',
        boat_images:[],provider_images:[]}
        boat_provider.id = data[i]._id
        boat_provider.provider_name = data[i].provider_name
        boat_provider.owner_name = data[i].owner_name
        boat_provider.boat_quantity = data[i].boat_quantity
        boat_provider.max_passenger = data[i].max_passenge
        boat_provider.contact = data[i].contact
        for (let j = 0; j < data[i].boat_images.length; j++) {
          boat_provider.boat_images.push(data[i].boat_images[j])
        }
      for (let k = 0; k < data[i].provider_images.length; k++) {
        boat_provider.provider_images.push(data[i].provider_images[k])
        
      }
        data_array.push(boat_provider)
      }
      return res.status(200).json({
        status:200,
        type:'success',
        payload:data_array
      })
    })
  })
     //get driver location
  router.route('/getDriverLocation').get((req,res)=>{
    let location_array =[]
    DriverLocation.find({},function (err,data) {
      if (err){
        res.send(err)
      }
      for (let i = 0; i < data.length; i++) {
        let location = {id:'',location_name:''}
        location.id = data[i]._id
        location.location_name = data[i].location_name
        location_array.push(location) 
      }
      console.log(data);
      return res.status(200).json({
        status:200,
        type:'success',
        payload:location_array,
      })
    })
  })
     // get driver
  router.route("/getDriver").get((req, res)=>{
    
    let driver_array =[]
    Drivers.find({},function (err,data) {
      if(err){
          res.send(err);
      }
      for (let i = 0; i < data.length; i++) {
        let driver ={id:'',location_id:'',driver_name:'',contact:'',driver_images:[]}
         driver.id = data[i]._id
         driver.location_id = data[i].location_id
         driver.driver_name = data[i].driver_name 
          for (let j = 0; j < data[i].driver_images.length; j++) {
            driver.driver_images.push(data[i].driver_images[j])
          }
         driver.contact = data[i].contact
         driver_array.push(driver)
        
      }
      return res.status(200).json({
      status:200,
        type:"success",
        payload:driver_array
      })
      })  
  })
    // get catagory
    router.route("/getCatagory").get((req, res)=>{
      let catagory_array = []
      Catagory.find({},function (err,data) {
        if(err){
            res.send(err);
        }
        for (let i = 0; i < data.length; i++) {
          let catagory ={id:'',catagory_name:''}
          catagory.id = data[i]._id
          catagory.catagory_name  = data[i].catagory_name;
          catagory_array.push(catagory)
        }
        return res.status(200).json({
        status:200,
        type:"success",
          payload:catagory_array })
        })  
    })
    // get accommodation type 
    router.route("/getAccommodationType").get((req, res)=>{
     
      let accommodation_type_array =[]
      AccommodationType.find({},function (err,data) {
        if(err){
            res.send(err);
        }
        for(let i =0;i <data.length;i++){
          let accommodation_type = {id:'',type_name:''}
          accommodation_type.id = data[i]._id,
          accommodation_type.type_name = data[i].type_name
          accommodation_type_array.push(accommodation_type)
        }
       
        })  
    })
    router.route("/getAccommodation").get((req,res)=>{

      let data_array = []
      Accommodation.find({},function (err,data){
        for (let i = 0; i < data.length; i++) {
          let accommodation = {id:'',type_id:'',name:'',information:'',
          price:'',contact:'',services:[],images:[]}
          accommodation.id = data[i]._id,
          accommodation.type_id = data[i].type_id,
          accommodation.name = data[i].name,
          accommodation.information = data[i].information,
          accommodation.price = data[i].price,
          accommodation.contact = data[i].contact
          for (let j = 0; j < data[i].services.length; j++) {
             accommodation.services.push(data[i].services[j])
          }
          for (let k = 0; k < data[i].images.length; k++) {
            accommodation.images.push(data[i].images[k])
          }
          data_array.push(accommodation)
        
        }
      return res.status(200).json({payload:data_array,status:200})
      
      })
    })

    router.route('/getRestaurant').get((req, res)=>{
      let data_array = []
      Restaurant.find({},function (err,data){
        for (let i = 0; i < data.length; i++) {
          let restaurant = {id:'',catagory_id:'',name:'',location:'',recommand_menu:'',
          opening_time:'',min_price:'',max_price:'',restaurant_images:[],contact:'',services:[]}
          restaurant.id = data[i]._id,
          restaurant.catagory_id = data[i].catagory_id,
          restaurant.name = data[i].name,
          restaurant.location = data[i].location,
          restaurant.recommand_menu = data[i].recommand_menu,
          restaurant.opening_time = data[i].opening_time,
          restaurant.min_price = data[i].min_price,
          restaurant.max_price = data[i].max_price
          for (let j = 0; j < data[i].restaurant_images.length; j++) {
            restaurant.restaurant_images.push(data[i].restaurant_images[j])
          }
          restaurant.contact = data[i].contact
          for (let k = 0; k < data[i].services.length; k++) {
            restaurant.services.push(data[i].services[k])
            
          }
          // console.log(restaurant)
          data_array.push(restaurant)
        }
        return res.status(200).json({payload:data_array,status:200})
      })
     
    })
    router.route('/getReviews').get((req,res)=>{
      let data_array =[]
      Reviews.find({}, function (err,data){
         for (let i = 0; i < data.length; i++) {
          let reviews = {id:'',reviewer_name:'',reviewer_email:'',review_text:'',status:''}
           reviews.id = data[i]._id
           reviews.reviewer_name = data[i].reviewer_name,
           reviews.reviewer_email = data[i].reviewer_email,
           reviews.review_text =data[i].review_text,
           reviews.status = data[i].status
           data_array.push(reviews)
         } return res.status(200).json({payload:data_array,status:200})
      })
    })
  module.exports = router;