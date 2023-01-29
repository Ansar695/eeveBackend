require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")

mongoose.connect(process.env.DATABASE, {

}).then(() => {
    console.log("DB connection successful")
}).catch((err) => {
    console.log("DB connection error")
})

// TODO: make separated env for local and production
// -DATABASE=mongodb://localhost:27017/EEVE