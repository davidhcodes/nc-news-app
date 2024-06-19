import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./contexts/UserContext";

function Homepage() {
  const { user } = useContext(UserContext);

  return (
    <>
      <h1> Welcome to the homepage! </h1>
      <h1> You are logged in as {user.username}</h1>
      <nav>
        <Link className="link" to="/articles">
          <h1>Articles</h1>
        </Link>
        <Link className="link" to="/users">
          <h1>Users</h1>
        </Link>
        <Link className="link" to="/topics">
          <h1>Topics</h1>
        </Link>
      </nav>
    </>
  );
}

export default Homepage;
