import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

import NoteState from "./context/notes/NoteState";

// Components
import TopNavbar from "./components/TopNavbar";
import Home from "./components/Home";
import BottomNavbar from "./components/BottomNavbar";
import About from "./components/About";
import Alert from "./components/Alert";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

function App() {
  return (
    <>
      <NoteState>
        <Router>
          <TopNavbar />
          {/* <Alert/> */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
          <BottomNavbar />
        </Router>
      </NoteState>
    </>
  );
}

export default App;
