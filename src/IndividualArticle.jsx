import { useEffect, useState, useContext } from "react";
import moment from "moment";
import { UserContext } from "./contexts/UserContext";
import { useParams } from "react-router-dom";
import Header from "./Header";
import {
  getArticleByID,
  patchArticle,
  patchComment,
  postComment,
} from "../utils/api";
import Comments from "./Comments";

/* Required symbols. */
import upvote from "./assets/upvotearrow_nobackground.png";

function IndividualArticle() {
  const { user } = useContext(UserContext);
  const { article_id } = useParams();

  const [ArticleIsLoading, setArticleIsLoading] = useState(false);
  const [errorMessage, setErr] = useState(null);
  const [article, setArticle] = useState({});
  const [newComment, setNewComment] = useState("");

  const formatTime = (timeISO) => {
    const newTime = moment(timeISO).format("dddd, MMMM Do YYYY, h:mm a");
    return newTime;
  };

  useEffect(() => {
    setArticleIsLoading(true);
    getArticleByID(article_id)
      .then((article) => {
        setArticle(article);
        setArticleIsLoading(false);
      })
      .catch((err) => {
        setErr(err.message);
        setArticleIsLoading(false);
      });
  }, [article_id]);

  /* Here we are optimistically rendering by increasing the vote count before making a new GET request to update the article. */
  const incVoteArticles = (article_id) => {
    if (user.username === null) {
      alert("You must be logged in to vote on articles");
    } else {
      patchArticle(article_id);
      setArticle((existingArticle) => {
        return { ...existingArticle, votes: existingArticle.votes + 1 };
      });
    }
  };

  if (errorMessage) {
    return <h1> {errorMessage}</h1>;
  }

  if (article) {
    return (
      <div>
        <header className="w-full  text-center  bg-white">
          <Header />
        </header>
        <body>
          <div className=" m-auto grid grid-rows-50 grid-cols-2 gap-2 md:grid-rows-20 md:grid-cols-5-w-full">
            {/* <div className="tile bg-purple-900 col-span-2 w-full  md:col-span-5">
              <Header />
            </div> */}
            <div className="tile bg-amber-500 row-start-1 row-end-10 col-span-2 md:row-start-2 md:row-end-10 md:col-span-5 w-full h-full">
              {" "}
              <img className="w-full h-full" src={article.article_img_url} />
            </div>
            <div className="tile bg-slate-100 row-start-10 row-end-30 col-span-2 text-left ml-1  font-TimesNew">
              <div className="p-0 m-0">
                <h2 className="text-1xl mr-310 capitalize text-purple-900">
                  {article.topic}
                </h2>
                <h1 className=" font-TimesNew text-4xl text-left font-semibold">
                  {article.title}
                </h1>
              </div>
            </div>
            <div className="tile bg-white row-start-30 row-end-35 col-span-2 text-left ml-2 font-TimesNew">
              {/* <div className="flex space-x-2"> */}
              <p className="capitalize text-purple-900 font-semibold text-1xl">
                {article.author}
              </p>
              <div className="flex ">
                <p className="text-xxs">{formatTime(article.created_at)}</p>
                {/* </div> */}
                <button
                  className="ml-5 flex justify-center items-center flex-col h-4 p-0"
                  onClick={() => incVoteArticles(article.article_id)}
                >
                  <p className="text-2xl ml-10 text-purple-900  ">⬆</p>
                  {/* <img
                  className="h-5 w-8 "
                  src={upvote}
                  alt="Upvote the article"
                /> */}
                </button>

                <p className="text-xxs -ml-10 mb-1">{article.votes}</p>
              </div>
            </div>
            <div className="tile bg-slate-100 row-start-35 row-end-60 col-span-2 ml-1 ">
              <div className="flex">
                <p className="text-left font-TimesNew text-sm ">
                  {article.body}
                </p>
              </div>
            </div>
            {/* <div className="tile bg-purple-600 row-start-10 row-end-30 col-span-2"> */}
            <div className="tile bg-slate-200 row-start-60 row-end-80 col-span-2 mt-5">
              <Comments article_id={article_id} article={article} />
            </div>
            {/* <div className="tile bg-pink-600 row-start-60 row-end-70 col-span-2"></div>
          {/* </div> */}
            {/* <Comments article_id={article_id} article={article} /> */}
          </div>
        </body>
      </div>
    );
  }
}
export default IndividualArticle;
