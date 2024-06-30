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
        <div className="bg-slate-100 md:bg-slate-100 md:pb-28 ">
          <Link className="link" to={`/articles/${article.article_id}`}>
            <img
              className="max-w-wd md:w-full md:h-full"
              src={article.article_img_url}
              alt="Main news article image"
            />
            <h3 className="text-purple-900 text-left font-TimesNew text-2xl capitalize font-semibold md:text-purple-900 md:text-left md:font-TimesNew md:text-5xl md:pb- md:capitalize md:font-semibold md:mb-8">
              {article.topic}{" "}
            </h3>
            <h1 className="font-semibold text-2xl text-justify font-TimesNew text-black md:font-semibold md:text-5xl md:text-left md:font-TimesNew md:text-black md:pr-2 md:mb-8">
              {" "}
              {article.title}
            </h1>
            <h4 className="text-purple-900 text-left font-TimesNew text-sm capitalize font-light md:text-purple-900 md:text-left md:font-TimesNew md:text-2xl md:capitalize md:font-light md:mb-8">
              {article.author}
            </h4>
            <div className="flex text-xs md:flex md:text-2xl">
              <img
                className="h-4 w-4 mt-0.5 mr-1 md:h-12 md:w-16"
                src={comments_symbol}
                alt="Comments"
              />
              <p className="text-black">{article.comment_count}</p>
              <img
                className="h-4 w-15   md:h-12 md:w-24 "
                src={upvote}
                alt="Upvote the article"
              />
              <p className="-ml-2 mr-12 text-black md:text-black md:-ml-2 md:mr-12">
                {" "}
                {article.votes}
              </p>
              <p className="text-black font-light md:text-black md:font-light">
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
      <li
        key={article.article_id}
        className="bg-white  w-full h-full md:bg-white md:w-full md:h-full"
      >
        <div className="container flex flex-col w-full h-full md:container md:flex md:flex-col md:w-full md:h-full">
          <div className="bg-slate-100 flex-col h-full md:bg-slate-100 md:flex-col md:h-full">
            <Link
              className="link w-full h-full md:link md:w-full md:h-full"
              to={`/articles/${article.article_id}`}
            >
              <img
                className="h-50 w-100 md:w-full md:h-auto"
                src={article.article_img_url}
                alt="Secondary article image"
              />
              <h3 className="text-black text-left font-TimesNew text-xs capitalize font-semibold md:text-black md:text-left md:font-TimesNew md:text-3xl md:capitalize md:font-semibold ">
                {article.title}
              </h3>
              <h3 className="text-purple-900 text-left font-TimesNew text-xxs capitalize font-semibold md:text-purple-900 md:text-left md:font-TimesNew md:text-2xl md:capitalize md:font-semibold">
                {article.topic}
              </h3>
              <h4 className="text-purple-900 text-left font-TimesNew text-xxs capitalize font-light  md:text-purple-900 md:text-left md:font-TimesNew md:text-1xl md:capitalize md:font-light ">
                {article.author}
              </h4>
              <div className=" flex text-xs mt-auto md:flex md:mt-auto md:text-2xl ">
                <img
                  className="h-2 w-2 mt-1 mr-1 md:h-6 md:w-8"
                  src={comments_symbol}
                  alt="Comments"
                />
                <p className="text-black md:text-black">
                  {article.comment_count}
                </p>
                <img
                  className="h-3 w-7 mt-0.5  md:h-6 md:w-8"
                  src={upvote}
                  alt="Upvote the article"
                />
                <p className="  text-black md:text-black md:-ml-2 md:mr-12">
                  {" "}
                  {article.votes}
                </p>
              </div>
              <div className="flex md:flex">
                <div className="mt-2 text-black text-xs text-bottom md:text-black md:mt-2 md:text-1xl">
                  <p className="text-black text-xxs font-TimesNew font-light md:text-black md:mt-2 md:text-xs md:font-TimesNew md:font-light ">
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

  const tertiaryArticles = articles.slice(3).map((article) => {
    return (
      <li key={article.article_id}>
        <div className="container flex flex-col bg-white md:container md:flex md:flex-col md:bg-white ">
          <div className="bg-slate-100 flex-col md:bg-slate-100 md:flex-col-2">
            <Link className="link" to={`/articles/${article.article_id}`}>
              <div className="flex md:flex ">
                <img
                  className="h-10 w-50 mr-2 md:h-48 md:w-80"
                  src={article.article_img_url}
                  alt="Secondary article image"
                />
                <div className="float-right md:float-right">
                  <h3 className="text-black text-left font-TimesNew text-xs capitalize font-semibold md:text-black md:text-left md:font-TimesNew md:text-2xl md:capitalize md:font-semibold ">
                    {article.title}
                  </h3>
                  <h3 className="text-purple-900 text-left font-TimesNew text-xxs capitalize font-semibold md:text-purple-900 md:text-left md:font-TimesNew md:text-2xl md:capitalize md:font-semibold">
                    {article.topic}
                  </h3>
                  <div className="flex md:flex">
                    <h4 className="text-purple-900  font-TimesNew text-xxs capitalize font-light mr-5 md:text-purple-900  md:font-TimesNew md:text-2xl md:capitalize md:font-light md:mr-5 ">
                      {article.author}{" "}
                    </h4>

                    <div className=" flex text-xs md:flex md:text-2xl">
                      <img
                        className="h-2 w-2 mt-1 mr-1 md:h-6 md:w-8 "
                        src={comments_symbol}
                        alt="Comments"
                      />
                      <p className="text-black md:text-black">
                        {article.comment_count}
                      </p>
                      <img
                        className="h-3 w-7 mt-0.5 md:h-6 md:w-8 "
                        src={upvote}
                        alt="Upvote the article"
                      />
                      <p className="-ml-2 mr-10  text-black md:text-black md:-ml-2 md:mr-12">
                        {" "}
                        {article.votes}
                      </p>
                      <p className="text-black  font-light text-xxs absolute right-0 mr-7 md:text-black md:font-light md:absolute md:right-0 md:mr-7 md:text-1xl ">
                        {formatShortTime(article.created_at)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-auto "></div>
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

  return (
    <div>
      <header className="w-full  text-center  bg-white">
        <Header />
      </header>
      <body className="px-5 py-5">
        <div className=" m-auto grid grid-rows-20 grid-cols-2 gap-2 mb-24 bg-white min-w-full md:grid-rows-20 md:grid-cols-5 w-full ">
          <div className="tile bg-white col-span-2 w-full  md:col-span-5 md:w-full">
            <div className="bg-white flex -mt-5 mb-2 md:bg-white md:text-black">
              {" "}
              <Link className="link" to={`/articles?sort_by=created_at`}>
                <button
                  className="bg-slate-100 text-black md:bg-slate-100 md:text-black"
                  onClick={handleFilter}
                >
                  Date
                </button>
              </Link>
              <Link className="link" to={`/articles?sort_by=comment_count`}>
                <button
                  className="bg-slate-100 text-black  md:bg-slate-100 md:text-black"
                  onClick={handleFilter}
                >
                  Number of comments
                </button>
              </Link>
              <Link className="link" to={`/articles?sort_by=votes`}>
                <button
                  className="bg-slate-100 text-black  md:bg-slate-100 md:text-black"
                  onClick={handleFilter}
                >
                  Sort By Votes
                </button>
              </Link>
              <select onChange={setSortOrder}>
                <option value={""}> Order by ...</option>
                <option value={"asc"}> ASC</option>
                <option value={"desc"}> DESC</option>
              </select>
            </div>
          </div>
          <div className="tile bg-slate-100 w-full h-full row-start-2 row-end-10 col-span-2 md:row-start-2 md:row-end-10 md:col-span-3  ">
            {isLoading ? <p>Loading!</p> : <ul>{mainArticleArray[0]}</ul>}
          </div>
          <div className="tile bg-white row-start-10 row-end-32 col-span-1 w-full h-full md:row-start-2 md:row-end-5 md:col-span-2">
            {isLoading ? (
              <p>Loading!</p>
            ) : (
              <ul className="w-full h-full">{secondaryArticles[1]}</ul>
            )}
          </div>

          <div className="tile bg-white row-start-10 row-end-20 col-span-1 w-full h-full md:row-start-5 md:row-end-10 md:col-span-2">
            {isLoading ? (
              <p>Loading!</p>
            ) : (
              <ul className="w-full h-full">{secondaryArticles[2]}</ul>
            )}
          </div>

          <div className="tile bg-white row-start-11 row-end-20 col-span-2 md:row-start-11 md:row-end-20 md:col-span-5 md:mt-10 md:w-full">
            {isLoading ? <p>Loading!</p> : <ul>{tertiaryArticles}</ul>}
          </div>
        </div>
      </body>
    </div>
  );
}

export default Articles;
