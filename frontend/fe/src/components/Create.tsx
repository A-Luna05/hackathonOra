import { useState, useContext, useEffect } from "react";
import { LoginContext } from "../loginContext";

interface CreateProps {
  getPosts: () => void;
}

function Create(props: CreateProps) {
  const { user } = useContext(LoginContext);
  const [prompt, setPrompt] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    setLoading(true);
    const response = await fetch("http://localhost:5000/gen", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt, user: user }), // Send the prompt in the body of the request
    });

    const result = await response.json();
    setData(result);
    setLoading(false);
  };

  useEffect(() => {
    props.getPosts();
  }, [data]);

  return (
    <>
      {!loading ? (
        <div>
          <h2>What was your dream?</h2>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <textarea
              style={{
                width: "484px",
                minHeight: "80px",
                fontSize: "20px",
                padding: "10px",
                borderRadius: "10px",
                backgroundColor: "#1a1a1a",
              }}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <button onClick={generateImage} style={{ width: "10vw" }}>
              Generate Image
            </button>
          </div>
          <br />
        </div>
      ) : (
        <div>
          <h2>Envisioning Dream...</h2>
        </div>
      )}
    </>
  );
}

export default Create;
