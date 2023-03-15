
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import { useNavigate } from "react-router-dom";
import io from 'socket.io-client';

const columns = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'subject', label: 'subject', minWidth: 100 },
  { id: 'delete/modify/presence', label: 'delete/modify/presence', minWidth: 100 }
];


function createData(name, subject) {
  
  return { name, subject};
}
function createData1(name) {
  
  return { name};
}

var rows = [
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});
const socket = io.connect('http://localhost:5000');
const socket1 =io.connect('http://localhost:5001');
export default function Room() {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const[room,setRoom]=useState([])
  const[roomB,setRoomB]=useState([])
  const [code,setCode]=useState("")
  const [students,setSudents]=useState([])
  const [change,setChange]=useState()
  const [presenceRoom,setPresenceRoom]=useState("")

  const navigate = useNavigate();
  
  async function modifyRoom(info){
    
  
  for(var i=0;i<roomB.length;i++){
    var r=roomB[i]
    if(info.name===r.Name && info.subject===r.Subject){
      navigate("/modifyroom/",{state:r})
    }
  }
    
  }

  async function getRooms(){
    axios.get('http://localhost:3000/room/getroom')
    .then((response) =>{
      var rooms=response.data
      var res=[]
      for(var i=0;i<rooms.length;i++){
        var r=rooms[i]
        res.push(createData(r['Name'],r['Subject']))
      }
      setRoom(res)
      setRoomB(rooms)
    })
    .catch((error)=>console.log(error))
  }

  async function del(info){
    var id;
    
    
    for(var i=0;i<roomB.length;i++){
      var r=roomB[i]
      if(info.name===r.Name && info.subject===r.Subject){
       id=r['_id']
      }
    }
    
  axios.delete('http://localhost:3000/room/deleteroom/'+id)
  .then((response)=>getRooms())
  .catch((err)=>console.log(err))
  }
  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  
  useEffect(() => {
    socket1.on("receive name",(r)=>{
      var tab=students;
      tab.push(r.data)
      setSudents(tab);
      setChange(true)
    })
    getRooms();
    setChange(false)
    
  },[change]);
  const listPresence = (room) =>{
    let r = (Math.random() + 1).toString(36).substring(7);
    setCode(r)
    setPresenceRoom(room)
   
    socket.emit('message',{data : r})
  }
  
  return (
    
    <Paper className={classes.root}>
     
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {room.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    if(!value){
                      return(
                      
                      <div>
                         <br></br>
                      <br></br>
                        <Button onClick={() => {del(row)}} variant="contained" color="primary" disableElevation>
                        delete
                      </Button>
                      <br></br>
                      <br></br>
                      <Button onClick={() => {modifyRoom(row)}} variant="contained" color="primary" disableElevation>
                      modify
                    </Button>
                    <br></br>
                      <br></br>
                    <Button onClick={() => { listPresence(row.name) }} variant="contained" color="primary" disableElevation>
  PRESENCE
</Button>
                    </div>
                      )
                    }
                    else{
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                    }
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
   <Button onClick={() => { navigate("/addRoom") }} variant="contained" color="primary" disableElevation>
  ADD ROOM
</Button>
<br></br>
<br></br>

<br></br>
<br></br>
<div>CODE : {code}</div>
<br></br>
<br></br>
<div>PRESENCE IN ROOM : {presenceRoom}</div>


<TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>names</TableCell>
           
          </TableRow>
        </TableHead>
        <TableBody>
          {[...new Set(students)].map((row,i) => (
            <TableRow key={i+1}>
              <TableCell component="th" scope="row">
                {i+1}
              </TableCell>
              <TableCell align="right">{row}</TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Paper>
  );
}

