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
        <header className="w-full  text-center  bg-white md:w-full md:text-center md:bg-white">
          <Header />
        </header>
        <body>
          <div className=" m-auto grid grid-rows-50 grid-cols-2 gap-2 md:grid-rows-20 md:grid-cols-5-w-full ">
            <div className="tile bg-amber-500 row-start-1 row-end-10 col-span-2 md:row-start-1 md:row-end-10 md:col-span-5 w-full h-full">
              {" "}
              <img
                className="w-full h-full md:w-full md:h-full"
                src={article.article_img_url}
              />
            </div>
            <div className="tile bg-slate-100 row-start-10 row-end-30 col-span-2 text-left ml-1  font-TimesNew md:tile md:bg-slate-100 md:row-start-10 row-end-30 md:col-span-5 md:text-left md:ml-1  md:font-TimesNew">
              <div className="p-0 m-0 md:p-0 md:m-0">
                <h2 className="text-1xl mr-310 capitalize text-purple-900 md:text-5xl md:mr-310 md:capitalize md:text-purple-900">
                  {article.topic}
                </h2>
                <h1 className=" font-TimesNew text-4xl text-left font-semibold md:font-TimesNew md:text-9xl md:text-left md:font-semibold">
                  {article.title}
                </h1>
              </div>
            </div>
            <div className="tile bg-white row-start-30 row-end-35 col-span-2 text-left ml-2 font-TimesNew md:tile md:bg-white row-start-30 row-end-35 md:col-span-5 md:text-left md:ml-2 md:font-TimesNew">
              <p className="capitalize text-purple-900 font-semibold text-1xl md:capitalize md:text-purple-900 md:font-semibold md:text-5xl">
                {article.author}
              </p>
              <div className="flex md:flex md:space-x-8 ">
                <p className="text-xxs md:text-3xl">
                  {formatTime(article.created_at)}
                </p>

                <button
                  className="ml-5 flex justify-center items-center flex-col h-4 p-0 md:ml-5 md:flex jmd:ustify-center md:items-center md:flex-col md:h-4 md:p-0"
                  onClick={() => incVoteArticles(article.article_id)}
                >
                  <p className="text-2xl ml-10 text-purple-900  md:text-5xl md:ml-10 md:mt-8">
                    ⬆
                  </p>
                </button>

                <p className="text-xxs -ml-10 mb-1 md:mb-1 md:-ml-10 md:text-4xl  md:mr-8">
                  {article.votes}
                </p>
              </div>
            </div>
            <div className="tile bg-slate-100 row-start-35 row-end-60 col-span-2 ml-1  md:tile md:bg-slate-100 md:row-start-35 md:row-end-60 md:col-span-5 md:ml-1 ">
              <div className="flex md:flex">
                <p className="text-left font-TimesNew text-sm md:text-left md:font-TimesNew md:text-4xl ">
                  {article.body}
                </p>
              </div>
            </div>

            <div className="tile bg-slate-200 row-start-60 row-end-80 col-span-2 mt-5 md:tile md:bg-slate-200 md:row-start-60 md:row-end-80 md:col-span-5 md:mt-5">
              <Comments article_id={article_id} article={article} />
            </div>
          </div>
        </body>
      </div>
    );
  }
}
export default IndividualArticle;
