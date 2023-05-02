import { FormControl,InputLabel,Input,FormHelperText,Button } from '@material-ui/core';
import React, { useState} from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
export default function AddRoom() {
    const navigate = useNavigate()
    const [ssid,setName]=useState("")
    const [password,setSubject]=useState("")
    async function confirm(){
     if(ssid && password){
        axios.post('http://localhost:3000/room/addHotspot',{ssid,password})
        .then((response)=>console.log(response.data))
        .then((r)=>navigate("/"))
        .catch((error)=>console.log(error))
     }
     else {
        alert("missing information")
     }
        }
return (
    <div>
        <FormControl>
<FormControl>
  <InputLabel htmlFor="Name">SSID</InputLabel>
  <Input id="name" aria-describedby="my-helper-text" onChange={(e)=>setName(e.target.value)} />
  <FormHelperText id="my-helper-text"></FormHelperText>
  </FormControl>
  <FormControl>
  <InputLabel htmlFor="Subject">Password</InputLabel>
  <Input id="subject" aria-describedby="my-helper-text" onChange={(e)=>setSubject(e.target.value)}/>
  <FormHelperText id="my-helper-text"></FormHelperText>
</FormControl>
<br></br>
<Button onClick={() => {confirm()}} variant="contained" color="primary" disableElevation>
  CONFIRM
</Button>
<br></br>
<Button onClick={() => { navigate("/") }} variant="contained" color="primary" disableElevation>
  BACK
</Button>
</FormControl>

</div>
)
}