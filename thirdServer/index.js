import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config();
const app = express();
app.use(express.json())
const url = process.env.MONGO_URL;
mongoose.connect(url).then(() => {
    app.listen(3000, () => {
        console.log("database connected")
    })
})
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 4
    }
})
const User = mongoose.model("User", userSchema)


app.post("/adduser", async (req, res) => {
    const { name, email, password } = req.body;
    const newUser = new User({ name, email, password })
    try {
        const savedUser = await newUser.save()
        res.send(savedUser);
    }
    catch (err) {
        console.log("error while posting", err)
    }
})
app.get("/getallusers",async(req,res)=>{
    try{
const users= await User.find()
res.send(users)
    }catch(err){
        res.status(404).console.log("error while retrieveing userdata from server",err)
    }
})