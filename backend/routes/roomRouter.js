const express = require('express')
const router=express.Router()
const roomModel=require("../model/room.js")
router.get('/getroom',(req, res) => {
    roomModel.find()
    .then(c => res.send(c))
    .catch((err)=>console.log(err))
    
    })
router.get('/getroom/:Name',(req, res) => {
      
      roomModel.findOne(req.params)
      .then(c => res.send(c))
      .catch((err)=>console.log(err))
      
      })
router.post('/addroom', (req, res) => {
      var room =new roomModel()
      room.Name=req.body.Name
      room.Subject=req.body.Subject
      room.save()
      res.status(200).send("done");
    })
router.delete('/deleteroom/:id',(req,res)=>{
      roomModel.findOneAndDelete(req.params)
      .then(c => res.send(c))
      .catch((err)=>console.log(err))
    })
router.put('/updateroom/:id',(req,res)=>{
      roomModel.findByIdAndUpdate(req.params.id,req.body)
      .then(c => res.send("successfull update"))
      .catch((err)=>console.log(err))
    })
module.exports=router