import { useState, useContext } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { LoginContext } from "../loginContext";
import { useNavigate } from "react-router-dom";

function LogIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(LoginContext);

  const navigator = useNavigate();

  const LogIn = async () => {
    const auth = getAuth();
    const result = await signInWithEmailAndPassword(auth, username, password);
    if (result) {
      console.log("Logged in!");
      setUser({ email: username });
      navigator("/feed");
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
        <button onClick={() => navigator("/signup")}>Sign Up</button>
      </div>
    </>
  );
}

export default LogIn;
