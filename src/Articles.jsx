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

function Articles({ topics }) {
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
              <img className="h-4 w-15  " src={upvote} alt="Comments" />
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
      <li key={article.article_id}>
        <div className="container flex flex-col bg-white ">
          <div className="bg-slate-100 flex-col">
            <Link className="link" to={`/articles/${article.article_id}`}>
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
              <div className="mt-auto ">
                <div className=" flex text-xs bottom-0">
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
                  <p className="text-black font-light text-xxs">
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
              <div className="flex py-1">
                <img
                  className="h-10 w-50 float-left mr-2"
                  src={article.article_img_url}
                  alt="Secondary article image"
                />
                <div className="float-right">
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
                        alt="Comments"
                      />
                      <p className="-ml-2 mr-10  text-black">
                        {" "}
                        {article.votes}
                      </p>
                    </div>
                  </div>
                </div>
                <p className="text-black  font-light text-xxs  my-5 float-right">
                  {formatShortTime(article.created_at)}
                </p>
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
    <body>
      <div className="container m-auto grid grid-rows-20 grid-cols-2 gap-2 md:grid-rows-20 md:grid-cols-5-w-full">
        <div className="tile bg-purple-900 col-span-2  md:col-span-5">
          <h1 className="text-white">HG News </h1>
        </div>
        <div className="tile bg-amber-500 row-start-2 row-end-10 col-span-2 md:row-start-2 md:row-end-10 md:col-span-5 ">
          {/* <h1 className="tile-marker"> */}{" "}
          {isLoading ? <p>Loading!</p> : <ul>{mainArticleArray[0]}</ul>}
          {/* {console.log(mostPopularArticles)} */}
          {/* </h1>{" "} */}
        </div>
        <div className="tile bg-purple-600 row-start-10 row-end-30 h-full col-span-1">
          {/* <h1>THREE</h1> // Article 2nd */}
          {isLoading ? <p>Loading!</p> : <ul>{secondaryArticles[1]}</ul>}
        </div>
        <div className="tile bg-emerald-600 row-start-10 row-end-20 col-span-1">
          {isLoading ? <p>Loading!</p> : <ul>{secondaryArticles[2]}</ul>}
        </div>
        <div className="tile bg-pink-600 row-start-11 row-end-20 col-span-2">
          {isLoading ? <p>Loading!</p> : <ul>{tertiaryArticles}</ul>}
        </div>
      </div>
    </body>
  );
}

export default Articles;
