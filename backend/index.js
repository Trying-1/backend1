import express from "express";
import 'dotenv/config.js';
import mongoose from "mongoose";
const app = express()
const port = process.env.PORT || 5000
const password = process.env.PASSWORD;
const url = `mongodb+srv://admin:${password}@cluster0.j4ycwmg.mongodb.net/?retryWrites=true&w=majority`
mongoose.connect(url)
    .then(() => {
        app.listen(port, () => {
            console.log(`listening to port ${port} and connected to database`)
        })
    })
    .catch((err) => console.log(err))
