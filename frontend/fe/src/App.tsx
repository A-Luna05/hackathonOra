import { useState } from "react";
import "./App.css";
import firebase, { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import "firebase/auth";
import { getAnalytics } from "firebase/analytics";

function App() {
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyDLdK7IBnVxrVZe8L7OqPM4sfS0VOmFY-k",
    authDomain: "envision-db762.firebaseapp.com",
    projectId: "envision-db762",
    storageBucket: "envision-db762.appspot.com",
    messagingSenderId: "680482399515",
    appId: "1:680482399515:web:f1c49794a78249e9699fbe",
    measurementId: "G-KS6N0V3RPW",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

  const [image, setImage] = useState(
    "https://cdn.mos.cms.futurecdn.net/3n8tRry6fYg7sNyhFDPQwR-1200-80.jpg"
  );
  const [prompt, setPrompt] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [signingUp, setSigningUp] = useState(false);

  const testApiHome = async () => {
    const response = await fetch("http://localhost:5000/");
    const data = await response.json();
    console.log(data);
  };

  const testApiTest = async () => {
    const response = await fetch("http://localhost:5000/test");
    const data = await response.json();
    console.log(data);
  };

  const getPosts = async () => {
    const response = await fetch("http://localhost:5000/posts");
    const data = await response.json();
    console.log(data);
  };

  const generateImage = async () => {
    const response = await fetch("http://localhost:5000/gen", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }), // Send the prompt in the body of the request
    });

    const data = await response.json();
    console.log(data);
    setImage(data);
  };

  const LogIn = async () => {
    const auth = getAuth();
    const result = await signInWithEmailAndPassword(auth, username, password);
    if (result) {
      setLoggedIn(true);
    }
    //setLoggedIn(true);
  };

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
      <h1>Envision</h1>

      {!loggedIn && !signingUp ? (
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
      ) : signingUp ? (
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
      ) : (
        <div>
          <h2>What was your dream?</h2>
          <input type="text" onChange={(e) => setPrompt(e.target.value)} />
          <br />
          <br />
          <button onClick={getPosts}>Get Posts</button>
          <br />
          <button onClick={generateImage}>Generate Image</button>
          <br />
          {image && (
            <img src={image} style={{ width: 300 }} alt="Generated Image" />
          )}
          <br />
          <button onClick={() => setLoggedIn(false)}>Log Out</button>
        </div>
      )}
    </>
  );
}

export default App;
