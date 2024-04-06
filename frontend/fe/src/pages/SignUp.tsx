import { useState } from "react";

import {
    getAuth,
    createUserWithEmailAndPassword,
  } from "firebase/auth";
  import "firebase/auth";

function SignUp(){

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [retypePassword, setRetypePassword] = useState("");
    const [signingUp, setSigningUp] = useState(false);

    const createAccount = async () => {
        const auth = getAuth();
        const result = await createUserWithEmailAndPassword(
          auth,
          username,
          password
        );
        console.log(result);
      };


    return (
        <>
        <div>
          <h2>Sign Up</h2>
          <input
            type="text"
            placeholder="Email"
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <input
            type="password"
            placeholder="Retype Password"
            onChange={(e) => setRetypePassword(e.target.value)}
          />
          <br />
          <button onClick={() => setSigningUp(false)}>Log In</button>
          <button onClick={createAccount}>Sign Up</button>
        </div>
        </>
    )
}

export default SignUp