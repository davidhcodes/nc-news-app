import { getArticles } from "../utils/api";
import moment from "moment";
import { useEffect, useState, useParams, useContext } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useSearchParams,
} from "react-router-dom";
import { UserContext } from "./contexts/UserContext";
import { Link } from "react-router-dom";
import Header from "./Header";
import IndividualArticle from "./IndividualArticle";

/* Required symbols. */
import comments_symbol from "./assets/comment-symbol.png";
import upvote from "./assets/upvotearrow_nobackground.png";

function ArticlesList({ topics }) {
  const { user } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErr] = useState(null);
  const [articles, setArticles] = useState([]);
  const [mostPopularArticles, setMostPopularArticles] = useState([]);
  const [filter, setFilter] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortSelected, setSortSelected] = useState(false);
  const sortByQuery = searchParams.get("sort_by");
  const orderQuery = searchParams.get("order");
  const topic = searchParams.get("topic");

  useEffect(() => {
    setIsLoading(true);

    if (topic !== null || undefined) {
      setFilter(topic);
      getArticles(topic)
        .then((allArticles) => {
          setArticles(allArticles);
          setIsLoading(false);
          mostVotes();
        })
        .catch((err) => {
          setErr(err.message);
          setIsLoading(false);
        });
    } else {
      getArticles(filter, sortByQuery, orderQuery)
        .then((allArticles) => {
          setArticles(allArticles);
          mostVotes();
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setErr(err.message);
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

  const formatShortTime = (timeISO) => {
    const newTime = moment(timeISO).format("ll");
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

  const mainArticleArray = articles.map((article) => {
    return (
      <li key={article.article_id}>
        <div className="bg-slate-100">
          <Link className="link" to={`/articles/${article.article_id}`}>
            <img
              className="max-w-wd"
              src={article.article_img_url}
              alt="Main news article image"
            />
            <h3 className="text-purple-900 text-left font-TimesNew text-2xl capitalize font-semibold">
              {article.topic}{" "}
            </h3>
            <h1 className="font-semibold text-2xl text-justify font-TimesNew text-black">
              {" "}
              {article.title}
            </h1>
            <h4 className="text-purple-900 text-left font-TimesNew text-sm capitalize font-light ">
              {article.author}
            </h4>
            <div className="flex text-xs">
              <img
                className="h-4 w-4 mt-0.5 mr-1"
                src={comments_symbol}
                alt="Comments"
              />
              <p className="text-black">{article.comment_count}</p>
              <img
                className="h-4 w-15  "
                src={upvote}
                alt="Upvote the article"
              />
              <p className="-ml-2 mr-10 text-black"> {article.votes}</p>
              <p className="text-black font-light">
                {formatTime(article.created_at)}
              </p>
            </div>
          </Link>
        </div>
      </li>
    );
  });

  const secondaryArticles = articles.map((article) => {
    return (
      <li key={article.article_id} className="bg-white  w-full h-full">
        <div className="container flex flex-col w-full h-full">
          <div className="bg-slate-100 flex-col h-full">
            <Link
              className="link w-full h-full "
              to={`/articles/${article.article_id}`}
            >
              <img
                className="h-50 w-100"
                src={article.article_img_url}
                alt="Secondary article image"
              />
              <h3 className="text-black text-left font-TimesNew text-xs capitalize font-semibold">
                {article.title}
              </h3>
              <h3 className="text-purple-900 text-left font-TimesNew text-xxs capitalize font-semibold">
                {article.topic}
              </h3>
              <h4 className="text-purple-900 text-left font-TimesNew text-xxs capitalize font-light ">
                {article.author}
              </h4>
              <div className=" flex text-xs mt-auto  ">
                <img
                  className="h-2 w-2 mt-1 mr-1"
                  src={comments_symbol}
                  alt="Comments"
                />
                <p className="text-black">{article.comment_count}</p>
                <img
                  className="h-3 w-7 mt-0.5 "
                  src={upvote}
                  alt="Upvote the article"
                />
                <p className="  text-black"> {article.votes}</p>
              </div>
              <div className="flex ">
                <div className="mt-2 text-black text-xs text-bottom ">
                  <p className="text-black text-xxs font-TimesNew font-light">
                    {formatShortTime(article.created_at)}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </li>
    );
  });

  const tertiaryArticles = articles.map((article) => {
    return (
      <li key={article.article_id}>
        <div className="container flex flex-col bg-white ">
          <div className="bg-slate-100 flex-col">
            <Link className="link" to={`/articles/${article.article_id}`}>
              <div className="flex ">
                <img
                  className="h-10 w-50 float-left mr-2"
                  src={article.article_img_url}
                  alt="Secondary article image"
                />
                <div className="float-right ">
                  <h3 className="text-black text-left font-TimesNew text-xs capitalize font-semibold ">
                    {article.title}
                  </h3>
                  <h3 className="text-purple-900 text-left font-TimesNew text-xxs capitalize font-semibold">
                    {article.topic}
                  </h3>
                  <div className="flex">
                    <h4 className="text-purple-900  font-TimesNew text-xxs capitalize font-light mr-5 ">
                      {article.author}{" "}
                    </h4>

                    <div className=" flex text-xs ">
                      <img
                        className="h-2 w-2 mt-1 mr-1"
                        src={comments_symbol}
                        alt="Comments"
                      />
                      <p className="text-black">{article.comment_count}</p>
                      <img
                        className="h-3 w-7 mt-0.5 "
                        src={upvote}
                        alt="Upvote the article"
                      />
                      <p className="-ml-2 mr-10  text-black">
                        {" "}
                        {article.votes}
                      </p>
                      <p className="text-black  font-light text-xxs absolute right-0 mr-7 ">
                        {formatShortTime(article.created_at)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-auto ">
                {/* <div className=" flex text-xs ">
                  <img
                    className="h-2 w-2 mt-1 mr-1"
                    src={comments_symbol}
                    alt="Comments"
                  />
                  <p className="text-black">{article.comment_count}</p>
                  <img
                    className="h-3 w-7 mt-0.5 "
                    src={upvote}
                    alt="Comments"
                  />
                  <p className="-ml-2 mr-10  text-black"> {article.votes}</p>
                </div> */}
              </div>
            </Link>
          </div>
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
  };

  const handleFilter = (event) => {
    const sort_by = event.target.value;

    const newParams = new URLSearchParams(searchParams);
    // set the order query
    newParams.set("sort_by", sort_by);
    setSearchParams(newParams);
  };

  if (errorMessage) {
    return <h1> {errorMessage}</h1>;
  }

  const mostVotes = () => {
    let articlesCopy = [...articles];

    if (articlesCopy.length > 1) {
      articlesCopy.sort((a, b) => b.votes - a.votes);

      setMostPopularArticles([
        articlesCopy[0],
        articlesCopy[1],
        articlesCopy[2],
      ]);
    }
  };

  // mostVotes();

  return (
    <div>
      <header className="w-full  text-center  bg-white">
        <Header />
        {/* <div className="filterButtons">{" "} */}
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
        {/* </div> */}
        {/* <div className="articles-container"> */}
        {/* <div> */}
        <ul className="userList">
          {isLoading ? <p>Loading!</p> : arrayOfArticles}
        </ul>
        <div />
      </header>

      <body className="px-5 py-5">
        <div className="tile bg-pink-600 row-start-11 row-end-20 col-span-2">
          {isLoading ? <p>Loading!</p> : <ul>{tertiaryArticles}</ul>}
        </div>
      </body>
    </div>
  );
}

export default ArticlesList;
