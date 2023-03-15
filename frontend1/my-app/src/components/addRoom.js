import { FormControl,InputLabel,Input,FormHelperText,Button } from '@material-ui/core';
import React, { useState} from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
export default function AddRoom() {
    const navigate = useNavigate()
    const [Name,setName]=useState("")
    const [Subject,setSubject]=useState("")
    async function confirm(){
     if(Name && Subject){
        axios.post('http://localhost:3000/room/addroom',{Name,Subject})
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
  <InputLabel htmlFor="Name">Name</InputLabel>
  <Input id="name" aria-describedby="my-helper-text" onChange={(e)=>setName(e.target.value)} />
  <FormHelperText id="my-helper-text"></FormHelperText>
  </FormControl>
  <FormControl>
  <InputLabel htmlFor="Subject">Subject</InputLabel>
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