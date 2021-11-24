const express = require('express');
const passport = require('passport')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const router = express.Router();
const randomstring = require('randomstring')
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
const {smtpTransport} = require('../../controllers/nodemailer');
const accommodationType = require('../../model/accommodationType');
const accommodation = require('../../model/accommodation');
const AttractionType = require('../../model/attractionType')
const Attraction = require('../../model/attraction')
const Tradition = require('../../model/traditions')
const JWT_SECRET ='sadkajsdj1k3sastichasasclsadnfjasltuSFKHSJKDAPI@$@QKFSJKSJDK'
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
  //////////// create api ////////////

   // create boat tour provider api
   router.route("/create/provider").post((req,res)=>{
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

   // create driver location api
   router.route("/create/driverLocation").post((req,res)=>{
       const location_name = req.body.location_name;
       const location_detail = req.body.location_detail;
       DriverLocation.create({
         location_name,
         location_detail
       }).then((e)=>{
         res.status(201).json({ status:200,message:'create data success' })
       }).catch(res.status(500));
   })

   // create driver api
   router.route("/create/driver").post((req,res)=>{
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

   // create restaurant catagory api
   router.route("/create/catagory").post((req,res)=>{
       const  catagory_name = req.body.catagory_name;
      Catagory.create({
        catagory_name
      }).then((e) =>
      res.status(201).json({ status: true, message: "create data success" })
    )
      .catch(res.status(500));
   })

   // create restaurant
   router.route("/create/restaurant").post((req,res)=>{
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

   // create accommodation type api
   router.route("/create/accommodationType").post((req,res)=>{
       const type_name = req.body.type_name
       AccommodationType.create({
         type_name
       }).then((e) =>
       res.status(201).json({ status: true, message: "create data success" })
     )
       .catch(res.status(500));
   })
   // create accommodation api
   router.route("/create/accommodation").post((req,res)=>{
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
   router.route("/create/review").post((req, res)=>{
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

   // create admin api
   router.route("/create/admin").post(async(req,res)=>{
    const email = req.body.email
    const password = req.body.password
    
    if (!email || typeof email !== 'string') {
      return res.json({ status: 'error', error: 'Invalid email' })
    }
    if(password.length < 5 ){
      return res.json({
        status:'error',
        error:'password should be atleast 6 characters'
        
      })
    }
    let encodePass = await bcrypt.hash(password,10)
    console.log('email is',email)
    console.log('encode password is',encodePass);
    
    try {
      // res.json({status:'ok',data:{email:email,password:encodePass}})
      await Admins.create({
        email,
        password:encodePass,
      })

    } catch (error) {
      if (error.code === 11000) {
        console.log('error is',error);
        return res.json({ status: 'error', error: 'Username already in use' })
      } 
    }      
    res.status(201).json({ status: true, message: "create data success" ,
    payload:{email:email,
     password:password,
     encodePass:encodePass}})
})

    //login api
    router.route('/login').post (async(req, res)=>{
      const {email ,password} =req.body
      const admin = await Admins.findOne({email}).lean()
      if(!admin){
        return res.json({status:'error',error:'email or password wrong!!'})
      }
      console.log('admin password is ',admin.password);
      if( await bcrypt.compare(password,admin.password)){
        
        const token =  jwt.sign({
          id: admin._id,
          email:email,password:password},
          JWT_SECRET)
          console.log('token is ',token);
          res.json({status:'ok',data:'login success!! ',token})
      }
      else{
        res.json({status:'error',error:'password wrong'})
      }
    })

    // change password  api
    router.route('/reset-password').post(async(req, res)=>{
      const {password,token} = req.body
      console.log(req.body);
          Admins.findOne({token:token},async(err,admin)=>{
            if (err) {
              return res.status(400).json({status:400,type:'failed'})
            }
            if(!admin){
              return res
              .status(404)
              .json({ status: 404, type: 'failed', payload: 'ไม่พบอีเมล์ผู้ใช้งาน' })
            }
            if(password.length < 5 ){
              return res.json({
                status:'error',
                error:'password should be atleast 6 characters'
                
              })
            }
            else{
              let encodePass = await bcrypt.hash(password,10)
              admin.password = encodePass
              admin.save()
              console.log(admin.password)
              return res.status(200).json({status:200,type:'success',admin:admin})
            }
          })

 
    })

    // forgotPassword api
    router.route('/forgot-password/').post (async(req, res)=>{
      let new_admin_password = {email:'',token:''}
      new_admin_password.email = req.body.email,
      new_admin_password.token = req.body.token
     
      
      if (!req.body) {
        return res.status(400).json({ status: 400, type: 'failed',  })
      }
       Admins.findOne({email:new_admin_password.email.toLowerCase().trim()},(err, admin)=>{
       
        if (err) {
          return res.status(400).json({ status: 400, type: 'failed', payload: err })
        }
        if(!admin){
          return res
          .status(404)
          .json({ status: 404, type: 'failed', payload: 'ไม่พบอีเมล์ผู้ใช้งาน' })
        }
        else {
          let new_token =   randomstring.generate(32)
          console.log('new token is ',new_token);
          try {
              console.log(new_token);
              admin.token = new_token
              admin.save()
                console.log('update admin is',admin);
                console.log('token is ',new_token);
            console.log(admin.email);
            let url =`http://localhost:3000/resetPassword?token=${new_token}`
            // console.log('update admin is',updateAdmin);
             smtpTransport.verify()
            smtpTransport.sendMail({
              to:admin.email,
              from:'sangkhla2go',
              subject:'คำแนะนำสำหรับการตั้งรหัสผ่านใหม่',
              html:`<p><a href=${url}>ตั้งรหัสผ่านใหม่</a></p>`
            })
            return res
            .status(200)
            .json({ status: 200, type: 'success', payload: "เราส่งวิธีการเปลี่ยนรหัสผ่านไปที่อีเมลของท่านแล้ว " })
          } catch (error) {
            console.log(error);
          }}
      })
    })

    // attraction type api
    router.route('/create/attractionType').post(async(req,res)=>{
      const name = req.body.name
      AttractionType.create({
        name
      }).then((e) =>
      res.status(201).json({ status: true, message: "create data success" })
    )
      .catch(res.status(500));
    })

    // attraction api
    router.route('/create/attraction').post((req,res)=>{
      const type_id = req.body.type_id
      const name = req.body.name
      const detail = req.body.detail
      const images = req.body.images
      Attraction.create({
        type_id,
        name,
        detail,
        images
      }).then((e) =>
      res.status(201).json({ status: true, message: "create data success" })
    )
      .catch(res.status(500));
    })

    // create tradition api
    router.route('/create/tradition').post((req,res)=>{
      const type_id = req.body.id
      const name = req.body.name
      const detail = req.body.detail
      const images = req.body.images
      Tradition.create({
        type_id,
        name,
        detail,
        images
      }).then((e) =>
      res.status(201).json({ status: true, message: "create data success" })
    )
      .catch(res.status(500));

    })

/////////////////////// GET API ///////////////////////////////////////

      //get boat tour provider api
  router.route("/get/boat-provider").get((req,res)=>{
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
        boat_provider.max_passenger = data[i].max_passenger
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
  router.route('/get/driverLocation').get((req,res)=>{
    let location_array =[]
    DriverLocation.find({},function (err,data) {
      if (err){
        res.send(err)
      }
      for (let i = 0; i < data.length; i++) {
        let location = {id:'',location_name:'',location_detail:''}
        location.id = data[i]._id
        location.location_name = data[i].location_name
        location.location_detail = data[i].location_detail
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

  // get one driver location 
  router.route('/get/location/:id').post((req,res)=>{
    console.log(req.body)
    const id = req.body.id
    // let id = ObjectId(req.params.id.toString())
    // console.log(id.length);
    // id = id.slice(0,1)
    // console.log('id is',id);
    try {
        DriverLocation.findOne({_id: id},function(err,data){
          if (err) {
            console.log(err);
          } else {
            return res.status(200).json({
              status:200,
              type:'success',
              
              payload:data
            })
          }
        })

    } catch (error) {
      console.log('error is',error);

      
    }
  })

  // get driver api
  router.route("/get/driver").get((req, res)=>{
    
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

    // get restaurant catagory api
    router.route("/get/catagory").get((req, res)=>{
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

    // get accommodation type api
    router.route("/get/accommodationType").get((req, res)=>{
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

    // get acommodation api
    router.route("/get/accommodation").get((req,res)=>{
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

    // get restaurant api 
    router.route('/get/restaurant').get((req, res)=>{
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

    
    router.route('/get/reviews').get((req,res)=>{
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
         } 
         return res.status(200).json({payload:data_array,status:200})
      })
    })

    //get attraction type api
    router.route('/get/attractionType').get((req,res)=>{
      let data_array = []
      AttractionType.find({},function(err,data){
        for (let i = 0; i < data.length; i++) {
          let attraction_type = {id:'',name:''}
          attraction_type.id = data[i]._id
          attraction_type.name = data[i].name
          data_array.push(attraction_type)
        }
        return res.status(200).json({payload:data_array,status:200})
      })

    })

    // get attraction api 
    router.route('/get/attraction').get((req,res)=>{
      let data_array = []
      Attraction.find({},function(err,data){
        for (let i = 0; i < data.length; i++) {
          let attraction ={type_id:'',name:'',detail:'',images:[]}
          attraction.type_id = data[i]._id
          attraction.name = data[i].name
          attraction.detail = data[i].detail
          for (let j = 0; j < data[i].images[j].length; j++) {
            attraction.images.push(data[i].images[j])
          }
          data_array.push(attraction)
        }
        return res.status(200).json({payload:data_array,status:200})
      })
    })

    // get tradition api
    router.route('/get/tradition').get((req,res)=>{
      let data_array = []
      Tradition.find({},function(err,data){
        for (let i = 0; i < data.length; i++) {
          let tradition = {id:'',name:'',detail:'',images:[]}
          tradition.id = data[i]._id
          tradition.name = data[i].name,
          tradition.detail = data[i].detail
          for (let j = 0; j < data[i].images.length; j++) {
            tradition.images.push(data[i].images[j])
          }
          data_array.push(tradition)
          
        }
        return res.status(200).json({
          status:200,
            type:"success",
            payload:data_array
          })
      })
    })

    //////////// update data API ////////////

    //edit driver location api
    router.route('/edit/driverLocation').post(async(req,res)=>{
      let newlocation  = await DriverLocation.findOne({_id:req.body._id})
      // console.log('driver location is',req.body);
      newlocation.location_name = req.body.location_name
      newlocation.location_detail = req.body.location_detail
      if (!req.body.location_name) {
        return res
        .status(400)
        .json({ status: 400, type: 'failed', payload: 'กรุณากรอกข้อมูลให้ครบถ้วน' })
      }
      await newlocation.save()
      return res.status(200).json({status:200,type:'success',payload:'แก้ไขข้อมูลเรียบร้อยแล้ว'})
    })

    // edit driver api 
    router.route('/edit/driver').post(async(req,res)=>{
      let new_driver = await Drivers.findOne({_id:req.body.id})
      if (!req,body.location_id || !req,body.driver_name || !req.body.contact || !req.body.driveImage) {
        return res
        .status(400)
        .json({ status: 400, type: 'failed', payload: 'กรุณากรอกข้อมูลให้ครบถ้วน' })
      }
      new_driver.location_id = req.body.location_id,
      new_driver.driver_name = req.body.driver_name,
      new_driver.contact = req.body.contact,
      new_driver.driver_images = req.body.driver_images
      await new_driver.save()
      return res.status(200).json({status:200,type:'success',payload:'แก้ไขข้อมูลเรียบร้อยแล้ว'})


    })

    // edit boat provider api
    router.route('/edit/boat-provider').post(async(req,res)=>{
      let new_boat_provider = await BoatProvider.findOne({_id: req.body.id})
      if (!req.body.provider_name || !req.body.owner_name || !req.body.boat_club 
        || !req.body.boat_quantity || !req.body.max_passenger || !req.body.contact 
        || !req.body.boat_images || !req.body.provider_name || !req.body.sefty ) {
          return res
        .status(400)
        .json({ status: 400, type: 'failed', payload: 'กรุณากรอกข้อมูลให้ครบถ้วน' })
      }
      new_boat_provider.boat_club = req.body.boat_club
      new_boat_provider.provider_images = req.body.provider_name
      new_boat_provider.owner_name = req.body.owner_name
      new_boat_provider.boat_quantity = req.body.boat_quantity
      new_boat_provider.max_passenger = req.body.max_passenger
      new_boat_provider.sefty = req.body.sefty
      new_boat_provider.contact = req.body.contact
      new_boat_provider.boat_images = req.body.boat_images
      new_boat_provider.provider_name = req.body.provider_images

      await new_driver.save()
      return res.status(200).json({status:200,type:'success',payload:'แก้ไขข้อมูลเรียบร้อยแล้ว'})

    })

    // edit acommodation type api
    router.route('/edit/accommodationType').post(async(req,res)=>{
      let update_accommodation_type = await accommodationType.findOne({_id:req.body.id})
      if (!req.body.type_name){
        return res.status(400).json({status:400,type:'failed',payload:'กรุณากรอกข้อมูลให้ครบถ้วน'})
      }
      update_accommodation_type.type_name = req.body.type_name
      await update_accommodation_type.save()
      return res.status(200).json({status:200,type:'success',payload:'แก้ไขข้อมูลเรียบร้อยแล้ว'})
    })

    // edit accommodation api
    router.route('/edit/accommodation').post(async(req,res)=>{
      let update_accommodation = await accommodation.findOne({_id:req.body.id})
      if (!req.body.type_id || !req.body.name || !req.body.price  ) {
        return res.status(400).json({status:400,type:'failed',payload:'กรุณากรอกข้อมูลให้ครบถ้วน'})
      }
      update_accommodation.name = req.body.name
      update_accommodation.type_id = req.body.type_id
      update_accommodation.information = req.body.information
      update_accommodation.price = req.body.price
      update_accommodation.services = req.body.services
      update_accommodation.tel = req.body.tel
      update_accommodation.fb_page = req.body.fb_page
      update_accommodation.images = req.body.images
      await update_accommodation.save()
      return res.status(200).json({status:200,type:'success',payload:'แก้ไขข้อมูลเรียบร้อยแล้ว'})
    })
    // edit restaurant catagory api
    router.route('/edit/catagory').post(async(req,res)=>{
      let update_catagory = await Catagory.findOne({_id:req.body.id})
      if (!req.body.catagory_name) {
        return res.status(400).json({status:400,type:'failed',payload:'กรุณากรอกข้อมูลให้ครบถ้วน'})
      }
      update_catagory.catagory_name = req.body.catagory_name
      await update_catagory.save()
      return res.status(200).json({status:200,type:'success',payload:'แก้ไขข้อมูลเรียบร้อยแล้ว'})
    })

    // edit restaurant api
    router.route('/edit/restaurant').post(async(req,res)=>{
      let update_restaurant = await Restaurant.findOne({_id:req.body.id})
      if (!req.body.name || !req.body.catagory_id 
        || !req.body.location || !req.body.opening_time || !req.body.food_type) {
          return res.status(400).json({status:400,type:'failed',payload:'กรุณากรอกข้อมูลให้ครบถ้วน'})
      }
      update_restaurant.name = req.body.name
      update_restaurant.catagory_id = req.body.catagory_id
      update_restaurant.location = req.body.location
      update_restaurant.food_type = req.body.food_type
      update_restaurant.recommand_menu = req.body.recommand_menu
      update_restaurant.opening_time = req.body.opening_time
      update_restaurant.food_price = req.body.food_price
      update_restaurant.drink_price = req.body.drink_price
      update_restaurant.tel = req.body.tel
      update_restaurant.fb_page = req.body.fb_page
      update_restaurant.services = req.body.services
      update_restaurant.restaurant_images = req.body.restaurant_images
      await update_restaurant.save()
      return res.status(200).json({status:200,type:'success',payload:'แก้ไขข้อมูลเรียบร้อยแล้ว'})
    })
    
    // edit attraction type api
    router.route('/edit/attractionType').post(async(req,res)=>{
      let update_attraction_type = await Attraction.findOne({_id:req.body.id})
      if (!req.body.name) {
        return res.status(400).json({status:400,type:'failed',payload:'กรุณากรอกข้อมูลให้ครบ'})
      }
      update_attraction_type.name = req.body.name
      await update_attraction_type.save()
      return res.status(200).json({status:200,type:'success',payload:'แก้ไขข้อมูลเรียบร้อยแล้ว'})
    })

    // edit attraction api
    router.route('/edit/attraction').post(async(req,res)=>{
      let update_attraction = await Attraction.findOne({_id:req.body.id})
      if (!req.body.type_id || req.body.name || !req.body.detail ) {
        return res.status(400).json({status:400,type:'failed',payload:'ข้อมูลที่ส่งมาไม่ครบถ้วน'})
      }
      update_attraction.type_id = req.body.id
      update_attraction.name = req.body.name
      update_attraction.detail = req.body.detail
      update_attraction.images = req.body.images
      await update_attraction.save()
      return res.status(200).json({status:400,type:'failed',payload:'แก้ไขข้อมูลเรียบร้อยแล้ว'})
    })

    // edit tradiion api
    router.route('/edit/tradition').post(async(req,res)=>{
      let update_tradition = await Tradition.findOne({_id:req.body.id})
      if (!req.body.name || !req.body.type || !req.body.detail) {
        return res.status(400).json({status:400,type:'failed',payload:'กรุณากรอกข้อมูลให้ครบถ้วน'})
      }
      update_tradition.name = req.body.name
      update_tradition.tradition_type = req.body.tradition_type,
      update_tradition.detail = req.body.detail
      update_tradition.images = req.body.images
      await update_tradition.save()
      return res.status(200).json({status:200,type:'success',payload:'แก้ไขข้อมูลเรียบร้อยแล้ว'})
    })

    //////////// delete API ////////////

    // delete driver location api
    router.route('/delete/driver-location').delete(async(req,res)=>{
      console.log(req.body);
      if (!req.body.id) {
        return res.status(400).json({status:400,type:'failed',payload:'ไม่พบข้อมูลที่ส่งมา'})
      }
      await DriverLocation.deleteOne({_id:req.body.id})
      return res.json({status:200,type:'success',payload:'ลบข้อมูลสำเร็จ'})
    })

    // delete driver api
    router.route('/delete/driver').delete(async(req,res)=>{
      if (!req.body.id) {
        return res.status(400).json({status:400,type:'failed',payload:'ไม่พบข้อมูลที่ส่งมา'})
      }
      await Drivers.deleteOne({_id:req.body.id})
      return res.status(200).json({status:200,type:'success',payload:'ลบข้อมูลสำเร็จ'})
    })

    // delete boat provider api
    router.route('/delete/boatProvider').delete(async(req,res)=>{
      if (!req.body.id) {
        return res.status(400).json({status:400,type:'failed',payload:'ไม่พบข้อมูลที่ส่งมา'})
      }
      await BoatProvider.deleteOne({_id:req.body.id})
      return res.status(200).json({status:200,type:'success',payload:'ลบข้อมูลสำเร็จ'})
    })

    // delete accommodation type api
    router.route('/delete/accommodationType').delete(async(req,res)=>{
      if (!req.body.id) {
        return res.status(200).json({status:200,type:'success',payload:'ลบข้อมูลสำเร็จ'})
      }
      await accommodationType.deleteOne({_id:req.body.id})
      return res.status(200).json({status:200,type:'success',payload:'ลบข้อมูลสำเร็จ'})
    })

    // delete accommodation api
    router.route('/delete/accommodation').delete(async(req,res)=>{
      if (!req.body.id) {
        return res.status(400).json({status:400,type:'failed',payload:'ไม่พบข้อมูลที่ส่งมา'})
      }
      await accommodation.deleteOne({_id:req.body.id})
      return res.status(200).json({status:200,type:'success',payload:'ลบข้อมูลสำเร็จ'})
    })

    // delete restaurant api
    router.route('/delete/restaurant').delete(async(req,res)=>{
      if (!req.body.id) {
        return res.status(400).json({status:400,type:'failed',payload:'ไม่พบข้อมูลที่ส่งมา'})
      }
      await Restaurant.deleteOne({_id:req.body.id})
      return res.status(200).json({status:200,type:'success',payload:'ลบข้อมูลสำเร็จ'})
    })

    // delete restaurant catagory api
    router.route('/delete/catagory').delete(async(req,res)=>{
      if (!req.body.id) {
        return res.status(400).json({status:400,type:'failed',payload:'ไม่พบข้อมูลที่ส่งมา'})
      }
      await Catagory.deleteOne({_id:req.body.id})
      return res.status(200).json({status:200,type:'success',payload:'ลบข้อมูลสำเร็จ'})
    })

    // delete attraction type api
    router.route('/delete/attractionType').delete(async(req,res)=>{
      if (!req.body.id) {
        return res.status(400).json({status:400,type:'success',payload:'ไม่พบข้อมูลที่ส่งมา'})
      }
      await AttractionType.deleteOne({_id:req.body.id})
      return res.status(200).json({status:200,type:'success',payload:'ลบข้อมูลสำเร็จ'})
    })

    // delete attraction api
    router.route('/delete/attraction').delete(async(req,res)=>{
      if (!req.body.id) {
        return res.status(400).json({status:400,type:'failed',payload:'ไม่พบข้อมูลที่ส่งมา'})
      }
      await Attraction.deleteOne({_id:req.body.id})
      return res.status(200).json({status:200,type:'success',payload:'ลบข้อมูลสำเร็จ'})
    })

    // delete tradition api
    router.route('/delete/tradition').delete(async(req,res)=>{
      if (!req.body.id) {
        return res.status(400).json({status:400,type:'failed',payload:'ไม่พบข้อมูลที่ส่งมา'})
      }
      await Tradition.deleteOne({_id:req.body.id})
      return res.status(200).json({status:200,type:'success',payload:'ลบข้อมูลสำเร็จ'})
    })
    
  module.exports = router;