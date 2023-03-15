import { FormControl,InputLabel,Input,FormHelperText,Button } from '@material-ui/core';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate,useLocation } from "react-router-dom";
export default function ModifyRoom() {
    const location = useLocation();
    const navigate = useNavigate()
    const [Name,setName]=useState(location.state.Name)
    const [Subject,setSubject]=useState(location.state.Subject)
    
    async function confirm(){
     if(Name && Subject){
        axios.put('http://localhost:3000/room/updateroom/'+location.state._id,{Name,Subject})
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
  <Input id="name" aria-describedby="my-helper-text" value={Name} onChange={(e)=>setName(e.target.value)} />
  <FormHelperText id="my-helper-text"></FormHelperText>
  </FormControl>
  <FormControl>
  <InputLabel htmlFor="Subject">Subject</InputLabel>
  <Input id="subject" aria-describedby="my-helper-text" value={Subject} onChange={(e)=>setSubject(e.target.value)}/>
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