import './App.css';
import { FormControl,InputLabel,Input,FormHelperText,Button } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
const socket = io.connect('http://localhost:5000');
function App() {
  const [Name,setName]=useState("")
  const [code,setcode]=useState("")
  const [codeAdmin,setcodeAdmin]=useState("")
  const confirm = () => {
    if(!codeAdmin){
      alert("code not generated from admin yet")
    }
    else if(code === codeAdmin){
      var d={data : Name};
      const socket1 = io.connect('http://localhost:5001');
      socket1.emit('name',d)
    }
    else{
      alert("wrong code")
    }
  }
  
  useEffect(()=>{
    
    socket.on('receive msg',(r)=>setcodeAdmin(r.data))
   //geo location problem?
    const successCallback = (position) => {
      console.log(position);
    };
    
    
    const errorCallback = (error) => {
      console.log(error);
    };
    
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    
  },[socket])
  return (
    <div className="App"> 
       <FormControl>
      <FormControl>
  <InputLabel htmlFor="Name">Name</InputLabel>
  <Input id="name" aria-describedby="my-helper-text" onChange={(e)=>setName(e.target.value)} />
  <FormHelperText id="my-helper-text"></FormHelperText>
  </FormControl>
  <FormControl>
  <InputLabel htmlFor="code">code</InputLabel>
  <Input id="code" aria-describedby="my-helper-text" onChange={(e)=>setcode(e.target.value)}/>
  <FormHelperText id="my-helper-text"></FormHelperText>
</FormControl>

<Button onClick={() => {confirm()}} variant="contained" color="primary" disableElevation>
  CONFIRM
</Button>
</FormControl>
    </div>
  );
}

export default App;
