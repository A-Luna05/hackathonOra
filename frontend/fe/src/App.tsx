import { useState } from "react";
import {Routes, Route, Navigate} from "react-router-dom"
import "./App.css";

import Nav from "./components/Nav"
import LogIn from "./pages/LogIn"
import Feed from "./pages/Feed"
import SignUp from "./pages/SignUp"
import Create from "./pages/Create"

import firebase, { initializeApp } from "firebase/app";

function App() {
  const firebaseConfig = {
    apiKey: "AIzaSyDLdK7IBnVxrVZe8L7OqPM4sfS0VOmFY-k",
    authDomain: "envision-db762.firebaseapp.com",
    projectId: "envision-db762",
    storageBucket: "envision-db762.appspot.com",
    messagingSenderId: "680482399515",
    appId: "1:680482399515:web:f1c49794a78249e9699fbe",
    measurementId: "G-KS6N0V3RPW",
  };

  const app = initializeApp(firebaseConfig);

  const [loggedIn, setLoggedIn] = useState(false);
  const [signingUp, setSigningUp] = useState(false);

  return (
    <>
      <h1>Envision</h1>
      <Nav />

      <Routes>
        <Route path='/login' element={<LogIn/>}></Route>
        <Route path='/signup' element={<SignUp/>}></Route>
      </Routes>
      {!loggedIn && !signingUp ? (
        <LogIn />
      ) : signingUp ? (
        <SignUp />
      ) : (
        <Create />
      )}

      
    </>
  );
}

export default App;
