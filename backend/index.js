const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')
const roomRouter=require("./routes/roomRouter.js")
const cors = require('cors');
const io = require('socket.io')(5000,{cors:{origin:'*'}});
const io1 = require('socket.io')(5001,{cors:{origin:'*'}});
app.use(express.json())
app.use(cors())
mongoose.connect("mongodb+srv://aziz:aziz123@cluster0.azhzg.mongodb.net/?retryWrites=true&w=majority")
.then(()=>console.log("success"))
.catch((err)=>console.log(err))
app.use("/room",roomRouter);
io.on('connection', (socket) => {
  console.log('user connected');
  socket.on("message",(e)=>{
    console.log(e)
    socket.broadcast.emit("receive msg",e)
  
    
  })
  
})
io1.on('connection', (socket) => {
  console.log('user connected');
  socket.on("name",(e)=>{
    console.log(e)
    socket.broadcast.emit("receive name",e)
   
    
  })
  
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})