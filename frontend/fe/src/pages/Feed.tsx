import Create from "../components/Create";
import { useContext, useEffect } from "react";
import { LoginContext } from "../loginContext";
import { useNavigate } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";

import { useState } from "react";

interface Post {
  user: string;
  prompt: string;
  image_url: string;
  likes: string[];
}

function Feed() {
  const { user, setUser } = useContext(LoginContext);
  const [posts, setPosts] = useState([]);
  const navigator = useNavigate();

  const handleLogOut = () => {
    setUser({ email: "" });
  };

  // const handleLike = async (prompt: string) => {
  //   const response = await fetch("http://localhost:5000/like", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ prompt, email: user.email }),
  //   });
  //   const data = await response.json();
  //   setPosts(data);
  // };

  const getPosts = async () => {
    const response = await fetch("http://localhost:5000/posts");
    const data = await response.json();
    setPosts(data);
    console.log(data);
  };

  useEffect(() => {
    if (!user.email) {
      navigator("/login");
    }
  }, [user.email, setUser]);

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      <div className="bg" style={{ opacity: "45%" }}></div>
      <div className="star-field">
        {/* <div className="layer"></div>
        <div className="layer"></div>
        <div className="layer"></div> */}
      </div>

      <div
        style={{
          position: "absolute",
          top: 0,
          right: 10,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <h3>{user.email.split("@")[0]}</h3>
        <button onClick={handleLogOut} style={{ width: "6vw" }}>
          Log Out
        </button>
      </div>
      <Create getPosts={getPosts} />

      {posts.map((post: Post) => (
        <Card
          key={post.prompt}
          style={{
            width: 512,
            height: "auto",
            marginLeft: "auto",
            marginRight: "auto",
            marginBottom: "2vh",
            borderRadius: "20px",
          }}
        >
          <CardActionArea>
            <CardMedia
              image={post.image_url}
              style={{
                height: 512,
                width: 512,
                objectFit: "cover",
                scale: "auto",
                justifyContent: "center",
                alignItems: "center",
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
                borderRadius: "20px",
              }}
            />
            <CardContent style={{ backgroundColor: "#242424" }}>
              <Typography
                gutterBottom
                variant="h5"
                component="h2"
                style={{
                  textAlign: "left",
                  color: "white",
                  backgroundColor: "#242424",
                  fontWeight: "bold",
                }}
              >
                {post.user.split("@")[0]}
                <IconButton aria-label="add to favorites">
                  <FavoriteIcon />
                </IconButton>
                {post.likes.length}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                style={{
                  backgroundColor: "#242424",
                  color: "white",
                  fontWeight: "bold",
                  textAlign: "left",
                }}
              >
                {post.prompt}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
      <br />
    </div>
  );
}

export default Feed;
