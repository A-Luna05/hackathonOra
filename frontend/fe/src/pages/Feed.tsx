import Create from "../components/Create";
import { useContext, useEffect } from "react";
import { LoginContext } from "../loginContext";
import { useNavigate } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useState } from "react";

interface CreateProps {
  getPosts: () => void;
}

interface Post {
  user: string;
  prompt: string;
  image_url: string;
}

function Feed() {
  const { user, setUser } = useContext(LoginContext);
  const [posts, setPosts] = useState([]);
  const navigator = useNavigate();

  const handleLogOut = () => {
    setUser({ email: "" });
  };

  const getPosts = async () => {
    const response = await fetch("http://localhost:5000/posts");
    const data = await response.json();
    setPosts(data);
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
    <>
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
        <h3>{user.email}</h3>
        <button onClick={handleLogOut} style={{ width: "6vw" }}>
          Log Out
        </button>
      </div>
      <Create getPosts={getPosts} />

      {posts.map((post: Post) => (
        <Card
          style={{
            width: 512,
            height: "auto",
            marginLeft: "auto",
            marginRight: "auto",
            marginBottom: "2vh",
          }}
        >
          <CardActionArea>
            <CardMedia
              image={post.image_url}
              title="Contemplative Reptile"
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
              }}
            />
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="h2"
                style={{ textAlign: "left", color: "blue" }}
              >
                {post.user}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {post.prompt}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
      <br />
    </>
  );
}

export default Feed;
