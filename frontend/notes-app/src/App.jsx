import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/home";
import Login from "./pages/login/login";
import SignUp from "./pages/SignUp/SignUp";

const routes = (
  <Router>
    <Routes>
      <Route path="/dashboard" exact element={<Home />} />
      <Route path="/login" exact element={<Login />} />
      <Route path="/signupn" exact element={<SignUp/>} />
     
    </Routes>
  </Router>
);

function App() {
  return <div>{routes}</div>;
}

export default App;
