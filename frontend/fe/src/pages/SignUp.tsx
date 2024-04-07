import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import "firebase/auth";

function SignUp() {
  const navigator = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [signingUp, setSigningUp] = useState(false);

  const createAccount = async () => {
    if (password !== retypePassword) {
      alert("Passwords do not match");
      return;
    }
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
      <div className="bg" style={{ opacity: "45%" }}></div>
      <div className="star-field">
        <div className="layer"></div>
        <div className="layer"></div>
        <div className="layer"></div>
      </div>
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
        <button onClick={createAccount}>Create Account</button>
      </div>
    </>
  );
}

export default SignUp;
