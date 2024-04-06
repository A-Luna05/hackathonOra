import Create from "../components/Create";
import Nav from "../components/Nav";
import { useContext, useEffect } from "react";
import { LoginContext } from "../loginContext";
import { useNavigate } from "react-router-dom";

function Feed() {
  const { user, setUser } = useContext(LoginContext);
  const navigator = useNavigate();

  const handleLogOut = () => {
    setUser({ email: "" });
  };

  useEffect(() => {
    if (!user.email) {
      navigator("/login");
    }
  }, [user.email, setUser]);

  return (
    <>
      <Nav />
      <h1>Welcome, {user.email}</h1>
      <Create />
      <button onClick={handleLogOut}>Log Out</button>
    </>
  );
}

export default Feed;
