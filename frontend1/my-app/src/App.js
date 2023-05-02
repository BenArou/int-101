import logo from './logo.svg';
import './App.css';
import Room from './components/room.js'
import AddRoom  from './components/addRoom';
import ModifyRoom from './components/modifyRoom';
import CreateHotspot from './components/addHotspot'
import { Routes, Route } from "react-router-dom"
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <Room/> } />
        <Route path="/addroom" element={ <AddRoom/> } />
        <Route path="/modifyroom" element={<ModifyRoom/>} />
        <Route path="/createHotspot" element={<CreateHotspot/>} />
      </Routes>
    </div>
   
  );
}

export default App;
