import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import LogIn from "./pages/LogIn";
import Feed from "./pages/Feed";
import SignUp from "./pages/SignUp";
import { LoginProvider } from "./loginContext";

import { initializeApp } from "firebase/app";

function App() {
  const logo = "/envsn-high-resolution-logo-transparent.png";
  const firebaseConfig = {
    apiKey: "AIzaSyDLdK7IBnVxrVZe8L7OqPM4sfS0VOmFY-k",
    authDomain: "envision-db762.firebaseapp.com",
    projectId: "envision-db762",
    storageBucket: "envision-db762.appspot.com",
    messagingSenderId: "680482399515",
    appId: "1:680482399515:web:f1c49794a78249e9699fbe",
    measurementId: "G-KS6N0V3RPW",
  };

  initializeApp(firebaseConfig);

  return (
    <>
      <LoginProvider>
        <div>
          <img src={logo} alt="logo" className="envsn" />
        </div>

        <Routes>
          <Route path="/login" element={<LogIn />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/feed" element={<Feed />}></Route>
          <Route path="/" element={<Navigate to="/login" />}></Route>
        </Routes>
      </LoginProvider>
    </>
  );
}

export default App;
