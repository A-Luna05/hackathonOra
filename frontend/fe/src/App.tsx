import { useState } from "react";
import "./App.css";

function App() {
  const [image, setImage] = useState(
    "https://cdn.mos.cms.futurecdn.net/3n8tRry6fYg7sNyhFDPQwR-1200-80.jpg"
  );
  const [prompt, setPrompt] = useState("");

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

  return (
    <>
      <h1>Envision</h1>
      <div>
        <h2>What was your dream?</h2>
        <input type="text" onChange={(e) => setPrompt(e.target.value)} />
        <br />
        <br />
        <button onClick={testApiHome}>Test API Home</button>
        <br />
        <button onClick={testApiTest}>Test API Test</button>
        <br />
        <button onClick={generateImage}>Generate Image</button>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      {image && (
        <img src={image} style={{ width: 300 }} alt="Generated Image" />
      )}
    </>
  );
}

export default App;
