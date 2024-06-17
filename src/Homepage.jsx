import { Link } from "react-router-dom";

function Homepage() {
  return (
    <>
      <h1> Welcome to the homepage! </h1>
      <nav>
        <Link className="link" to="/articles">
          <h1>Articles</h1>
        </Link>
      </nav>
    </>
  );
}

export default Homepage;
