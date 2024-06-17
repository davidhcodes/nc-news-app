// import { all } from "axios";
import { getArticles } from "../utils/api";
import moment from "moment";
import { useEffect, useState, useParams } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import IndividualArticle from "./IndividualArticle";

function Articles({ topics }) {
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState(null);
  const [articles, setArticles] = useState([]);
  const [filter, setFilter] = useState([]);
  // const { article_id } = useParams();

  // console.log(article_id);

  useEffect(() => {
    setIsLoading(true);

    getArticles(filter)
      .then((allArticles) => {
        // console.log(allArticles);
        setArticles(allArticles);
        setIsLoading(false);
      })
      .catch((err) => {
        setErr(err);
        setIsLoading(false);
      });
  }, [filter]);

  const formatTime = (timeISO) => {
    // let newString = "";
    // const newDate = timeISO.slice(0, 10);
    // const newTime = timeISO.slice(11, 16);
    // return newDate + " " + newTime;
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
      <>
        <div>
          <button className="topicsButtons" onClick={handleClick}>
            {topic.slug}
          </button>
        </div>
      </>
    );
  });

  /* Where itemList is an array of objects, each object has an item_name etc.*/

  const arrayOfArticles = articles.map((article) => {
    return (
      <>
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
      </>
    );
  });

  return (
    <>
      <header>
        <h1> Articles </h1>
      </header>

      {/* <button onClick={<IndividualArticle />}>Individual article</button> */}

      <div className="topicsList">
        {isLoading ? <p>Loading!</p> : arrayOfTopics}
        <button className="topicsButtons" onClick={handleClick}>
          All
        </button>
      </div>
      <div className="articles-container">
        <div>
          <ul>{isLoading ? <p>Loading!</p> : arrayOfArticles}</ul>
        </div>
      </div>
    </>
  );
}

export default Articles;
