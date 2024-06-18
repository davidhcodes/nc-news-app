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

function IndividualArticle() {
  const { user } = useContext(UserContext);
  const { article_id } = useParams();

  const [ArticleIsLoading, setArticleIsLoading] = useState(false);
  const [err, setErr] = useState(null);
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
        setErr(err);
        setArticleIsLoading(false);
      });
  }, [article_id]);

  /* Here we are optimistically rendering by increasing the vote count before making a new GET request to update the article. */
  const incVoteArticles = (article_id) => {
    patchArticle(article_id);
    setArticle((existingArticle) => {
      return { ...existingArticle, votes: existingArticle.votes + 1 };
    });
  };

  if (article) {
    return (
      <>
        <Header />
        <div className="individualArticleContainer">
          <div className="articleHeader">
            <h1>{article.title} </h1>
            <h2>{article.topic}</h2>
          </div>
          <div className="articleContent">
            <img className="img_articlepage" src={article.article_img_url} />
            <p className="articleParagraph">{article.body}</p>
            <p className="author">Author: {article.author}</p>
            <p className="articleParagraph">
              Date Created: {formatTime(article.created_at)}
            </p>
          </div>
          <div className="articleInteract">
            <div className="articleVoteBox">
              <button
                className=""
                onClick={() => incVoteArticles(article.article_id)}
              >
                ⬆️
              </button>
              <p>{article.votes}</p>
            </div>
          </div>
        </div>
        <Comments article_id={article_id} article={article} />
      </>
    );
  }
}

export default IndividualArticle;
