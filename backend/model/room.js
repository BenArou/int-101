const mongoose=require("mongoose")
const RoomSchema = mongoose.Schema({
    Name:  String ,
    Subject : String
    
  });
  const RoomModel=mongoose.model('Room',RoomSchema)
  module.exports=RoomModel