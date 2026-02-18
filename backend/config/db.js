const mongoose = require('mongoose');
// use dotenv
require('dotenv').config();

const dbConnect = ()=>{
    mongoose.connect(process.env.DATABASE_URL)
.then(()=>{
    console.log("Connection Stablish Succesfully! ");
})
.catch((error)=>{
    console.log("Database Connection Failed ")
})
}

module.exports = dbConnect;