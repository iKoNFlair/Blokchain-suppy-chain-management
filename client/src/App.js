import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import BrowserRouter and other necessary components
import "./App.css";
import AssignRoles from "./AssignRoles/AssignRoles";
import Home from "./Home/Home";
import AddMed from "./AddMed/AddMed";
import Supply from "./Supply/Supply";
import Track from "./Track/Track";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/roles" element={<AssignRoles />} />
          <Route path="/addmed" element={<AddMed />} />
          <Route path="/supply" element={<Supply />} />
          <Route path="/track" element={<Track />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
