import { useEffect, useState } from "react";
import moment from "moment";
import { useParams } from "react-router-dom";
import { getArticleByID, getCommentsByArticleID } from "../utils/api";

function IndividualArticle() {
  const { article_id } = useParams();

  const [ArticleIsLoading, setArticleIsLoading] = useState(false);
  const [CommentsIsLoading, setCommentsIsLoading] = useState(false);
  const [err, setErr] = useState(null);
  const [article, setArticle] = useState({});
  const [comments, setComments] = useState([]);

  const formatTime = (timeISO) => {
    const newTime = moment(timeISO).format("dddd, MMMM Do YYYY, h:mm a");
    return newTime;
  };

  useEffect(() => {
    setArticleIsLoading(true);
    setCommentsIsLoading(true);

    getArticleByID(article_id)
      .then((article) => {
        setArticle(article);
        setArticleIsLoading(false);
      })
      .catch((err) => {
        setErr(err);
        setArticleIsLoading(false);
      });

    getCommentsByArticleID(article_id)
      .then((comments) => {
        console.log(comments);
        setComments(comments);
        setCommentsIsLoading(false);
      })
      .catch((err) => {
        setErr(err);
        setCommentsIsLoading(false);
      });
  }, [article_id]);

  const arrayOfComments = comments.map((comment) => {
    return (
      <>
        <div className="author">{comment.author}</div>

        <div>{formatTime(comment.created_at)}</div>

        <div key={comment.comment_id} className="article_box">
          <div className="text-box">
            <p> {comment.body}</p>
          </div>
          <div className="interactComment">
            <button>⬆️ </button>
            <p>{comment.votes}</p>
          </div>
        </div>
      </>
    );
  });

  if (article) {
    return (
      <>
        <div className="articles-container">
          <div className="articleHeader">
            <h1>{article.title} </h1>
            <h2>{article.topic}</h2>
          </div>
          <img className="img_articlepage" src={article.article_img_url} />
          <p className="articleParagraph">{article.body}</p>
          <p>Author: {article.author}</p>
          <p> Votes: {article.votes}</p>
          <p>Date Created: {formatTime(article.created_at)}</p>
        </div>
        <div>
          <h1> Comments </h1>
          <div>
            <ul>{CommentsIsLoading ? <p>Loading!</p> : arrayOfComments}</ul>
          </div>
        </div>
      </>
    );
  }
}

export default IndividualArticle;
