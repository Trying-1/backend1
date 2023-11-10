import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config();
const app = express()
app.use(express.json())
const url = process.env.URL
mongoose.connect(url)
    .then(() => {
        app.listen(3000, () => console.log("data base connected and listening to port 3000..."))
    }).catch((err) => {
        console.log(err)
    })

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        minlength: 3
    },
    status: String
})
const Task = mongoose.model("Todo", TaskSchema);
app.get("/task", async (req, res) => {
    try {
        const task = await Task.find();
        console.log(task)
        res.json(task);
    }
    catch (err) {
        console.log("error", err);
    }
})
app.post("/task", async (req, res) => {
    try {
        const { title, status } = req.body
        const newTask = new Task({ title, status });
        const saveTask = await newTask.save();
        res.json(saveTask);
    } catch (err) {
        console.log("error while posting data")
    }
})
