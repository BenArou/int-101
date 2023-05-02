const express = require('express')
const router=express.Router()
const roomModel=require("../model/room.js")
const { exec } = require('child_process');
const isWindows = process.platform === "win32";

function createWifiHotspot(req, res) {
  const { ssid, password } = req.body;
  const cmd = `netsh wlan set hostednetwork mode=allow ssid="${ssid}" key="${password}"`;

  if (!isWindows) {
    console.error('This function can only be executed on Windows systems.');
    return res.status(500).send('This function can only be executed on Windows systems.');
  }

  exec(cmd, { shell: 'runas' }, (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      return res.status(500).send('An error occurred while creating the Wi-Fi hotspot.');
    }

    console.log(stdout);
    console.error(stderr);

    return res.send('Wi-Fi hotspot created successfully!');
  });
}
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
    router.post('/addHotspot',createWifiHotspot)
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