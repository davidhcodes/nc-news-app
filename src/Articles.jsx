// import { all } from "axios";
import { getArticles } from "../utils/api";
import moment from "moment";
import { useEffect, useState, useParams } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useSearchParams,
} from "react-router-dom";
import { Link } from "react-router-dom";
import Header from "./Header";
import IndividualArticle from "./IndividualArticle";
// import { search } from "../../be-nc-news/routes/users-router";

function Articles({ topics }) {
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState(null);
  const [articles, setArticles] = useState([]);
  const [filter, setFilter] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortSelected, setSortSelected] = useState(false);
  const sortByQuery = searchParams.get("sort_by"); // "average_weight"
  const orderQuery = searchParams.get("order"); // "asc
  const topic = searchParams.get("topic");

  useEffect(() => {
    setIsLoading(true);

    if (topic !== null || undefined) {
      setFilter(topic);
      getArticles(topic)
        .then((allArticles) => {
          setArticles(allArticles);
          setIsLoading(false);
        })
        .catch((err) => {
          setErr(err);
          setIsLoading(false);
        });
    } else {
      getArticles(filter, sortByQuery, orderQuery)
        .then((allArticles) => {
          setArticles(allArticles);
          setIsLoading(false);
        })
        .catch((err) => {
          setErr(err);
          setIsLoading(false);
        });
    }
  }, [filter, topic, sortByQuery, orderQuery]);

  const formatTime = (timeISO) => {
    const newTime = moment(timeISO).format("dddd, MMMM Do YYYY, h:mm a");
    return newTime;
  };
  function handleClick(event) {
    let selectedTopic = event.target.innerHTML;
    if (selectedTopic === "All") {
      setFilter(null);
    } else {
      setFilter(selectedTopic);
    }
  }

  const arrayOfTopics = topics.map((topic) => {
    return (
      <li className="userList" key={topic.slug}>
        <Link className="link" to={`/articles?topic=${topic.slug}`}>
          <button className="topicsButtons"> {topic.slug}</button>
        </Link>
        {/* <button className="topicsButtons" onClick={handleClick}>
          {topic.slug}
        </button> */}
      </li>
    );
  });

  /* Where itemList is an array of objects, each object has an item_name etc.*/

  const arrayOfArticles = articles.map((article) => {
    return (
      <li key={article.article_id}>
        <div className="article_box">
          <img className="img_size" src={article.article_img_url} />
          <h2> {article.title}</h2>
          <h3>Topic: {article.topic} </h3>
          <h3>Author: {article.author}</h3>
          <p>Comment count: {article.comment_count}</p>
          <p>Date Created: {formatTime(article.created_at)}</p>
          <p> Votes: {article.votes}</p>

          <Link className="link" to={`/articles/${article.article_id}`}>
            <button className="">Read more</button>
          </Link>
        </div>
      </li>
    );
  });

  const setSortOrder = (event) => {
    const direction = event.target.value;

    // copy existing queries to avoid mutation
    const newParams = new URLSearchParams(searchParams);
    // set the order query
    newParams.set("order", direction);
    setSearchParams(newParams);
    // }
  };

  const handleFilter = (event) => {
    const sort_by = event.target.value;

    const newParams = new URLSearchParams(searchParams);
    // set the order query
    newParams.set("sort_by", sort_by);
    setSearchParams(newParams);
  };

  return (
    <>
      <Header />
      <div className="pageContainer">
        <header></header>

        <h1> Articles </h1>
        {/* <button onClick={<IndividualArticle />}>Individual article</button> */}

        <div className="topicsList">
          {isLoading ? <p>Loading!</p> : arrayOfTopics}
          <button className="topicsButtons" onClick={handleClick}>
            All
          </button>
        </div>
        <div className="filterButtons">
          {" "}
          <h2>Placeholder for filtering buttons </h2>
          <Link className="link" to={`/articles?sort_by=created_at`}>
            <button className="filterButtons" onClick={handleFilter}>
              Date
            </button>
          </Link>
          <Link className="link" to={`/articles?sort_by=comment_count`}>
            <button className="filterButtons" onClick={handleFilter}>
              Number of comments
            </button>
          </Link>
          <Link className="link" to={`/articles?sort_by=votes`}>
            <button className="filterButtons" onClick={handleFilter}>
              Sort By Votes
            </button>
          </Link>
          <select onChange={setSortOrder}>
            <option value={""}> Order by ...</option>
            <option value={"asc"}> ASC</option>
            <option value={"desc"}> DESC</option>
          </select>
        </div>
        <div className="articles-container">
          <div>
            <ul className="userList">
              {isLoading ? <p>Loading!</p> : arrayOfArticles}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Articles;
