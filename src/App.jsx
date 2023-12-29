import React from 'react'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "/node_modules/bootstrap/dist/js/bootstrap.min.js"
import AddRoom from './components/room/AddRoom'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ExistingRooms from './components/room/ExistingRooms'
import EditRoom from "./components/room/EditRoom"
import Home  from "./components/home/Home"

function App() {

  return(
  <>
    <main>
      <Router>
        <Routes>
          <Route path ="/" element={<Home/>}/>
          <Route path ="/edit-room/:roomId" element={<EditRoom />}/>
          <Route path ="/existing-rooms" element={<ExistingRooms />}/>
      </Routes>
      </Router>
    </main>
  </>
    
  )
}

export default App
