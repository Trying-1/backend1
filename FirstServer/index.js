import express from "express"
const app=express()
app.use(express.json())
app.listen(3000,()=>console.log("listening to port 3000..."))
app.get("/firstRoute",(req,res)=>{
    res.send("hello world")
})
app.post("/firstRoute",(req,res)=>{
    const {name,email,password}=req.body;
    console.log(name)
    console.log(email)
    console.log(password)
    res.send(`<h1>${email}</h1>`)
})