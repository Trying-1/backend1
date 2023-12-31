import express from "express";
import 'dotenv/config.js';
import mongoose from "mongoose";
import router from "./routes/user_routes.js"
const app = express()
const port = process.env.PORT || 5000
const password = process.env.PASSWORD;
const url = `mongodb+srv://admin:${password}@cluster0.j4ycwmg.mongodb.net/?retryWrites=true&w=majority`;

app.use(express.json)
app.use("/api/user", router)
mongoose.connect(url)
    .then(() => {
        app.listen(port, () => {
            console.log(`listening to port ${port} and connected to database`)
        })
    })
    .catch((err) => console.log(err))
