const express = require('express')
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser')
const bcrypt = require('bcryptjs')
require('dotenv').config()
const mongoose = require('mongoose')
app.use(cors())
app.use(express.json());
const mongoURL = process.env.DB_URL
mongoose.connect(mongoURL,{
    useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true
})
mongoose.connection.readyState==2?console.log('connected server...'):''
app.use('/',require('./pages/api/sangkhlaAPI'))
app.listen(8080,function(){
    console.log("server running on port 8080...");
})
