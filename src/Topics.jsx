import { useEffect, useState, useParams } from "react";
import Header from "./Header";
import { Link } from "react-router-dom";
function Topics({ topics }) {
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState(null);

  const handleTopics = (topic) => {
    <Link className="link" to={`/articles?${topic.slug}`}>
      <button className="">Read more</button>
    </Link>;
  };

  const arrayOfTopics = topics.map((topic) => {
    return (
      <li className="userList" key={topic.slug}>
        <Link className="link" to={`/articles?topic=${topic.slug}`}>
          <button className="topicsPageButtons"> {topic.slug}</button>
        </Link>
        ;
        {/* <button className="topicsPageButtons" onClick={""}>
          {topic.slug}
        </button> */}
      </li>
    );
  });
  return (
    <>
      <Header />
      <h1> These are our topics</h1>
      <div className="">
        {isLoading ? <p>Loading!</p> : arrayOfTopics}
        <button className="topicsPageButtons" onClick={""}>
          All
        </button>
      </div>
    </>
  );
}

export default Topics;
