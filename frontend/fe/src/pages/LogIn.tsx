import { useState } from "react";
import {
    getAuth,
    signInWithEmailAndPassword,
  } from "firebase/auth";

function LogIn(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);
    const [signingUp, setSigningUp] = useState(false);

    const LogIn = async () => {
        const auth = getAuth();
        const result = await signInWithEmailAndPassword(auth, username, password);
        if (result) {
          setLoggedIn(true);
        }
        //setLoggedIn(true);
      };


    return (
        <>
        <div>
          <h2>Log In</h2>
          <input
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button onClick={LogIn}>Log In</button>
          <button onClick={() => setSigningUp(true)}>Sign Up</button>
        </div>
        </>
    )
}

export default LogIn