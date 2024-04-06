import { useState, useContext } from "react";
import { LoginContext } from "../loginContext";

function Create() {
  const { user } = useContext(LoginContext);
  const [prompt, setPrompt] = useState("");

  const [image, setImage] = useState(
    "https://cdn.mos.cms.futurecdn.net/3n8tRry6fYg7sNyhFDPQwR-1200-80.jpg"
  );

  const generateImage = async () => {
    const response = await fetch("http://localhost:5000/gen", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt, user: user }), // Send the prompt in the body of the request
    });

    const data = await response.json();
    console.log(data);
    setImage(data);
  };

  return (
    <>
      <div>
        <h2>What was your dream?</h2>
        <input type="text" onChange={(e) => setPrompt(e.target.value)} />
        <br />
        <button onClick={generateImage}>Generate Image</button>
        <br />
        {image && (
          <img src={image} style={{ width: 300 }} alt="Generated Image" />
        )}
        <br />
      </div>
    </>
  );
}

export default Create;
