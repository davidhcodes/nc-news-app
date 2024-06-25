import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./contexts/UserContext";

function Homepage() {
  const { user } = useContext(UserContext);

  return (
    <div className="text-white bg-violet-950 h-screen text-center space-y-4">
      <h1 className="text-center"> Welcome to the homepage! </h1>
      <h1> You are logged in as {user.username}</h1>
      <nav>
        <Link className="link" to="/articles">
          <h1 className="text-white">Articles</h1>
        </Link>
        <Link className="link" to="/users">
          <h1 className="text-white">Users</h1>
        </Link>
        <Link className="link" to="/topics">
          <h1 className="text-white">Topics</h1>
        </Link>
      </nav>
    </div>
  );
}

export default Homepage;
