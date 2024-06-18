import { useEffect, useState } from "react";
import moment from "moment";
import { useParams } from "react-router-dom";
import {
  getArticleByID,
  getCommentsByArticleID,
  patchArticle,
  patchComment,
} from "../utils/api";

function IndividualArticle() {
  const { article_id } = useParams();

  const [ArticleIsLoading, setArticleIsLoading] = useState(false);
  const [CommentsIsLoading, setCommentsIsLoading] = useState(false);
  const [err, setErr] = useState(null);
  const [article, setArticle] = useState({});
  const [comments, setComments] = useState([]);
  const [votes, setVotes] = useState(null);

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
        setComments(comments);
        setCommentsIsLoading(false);
      })
      .catch((err) => {
        setErr(err);
        setCommentsIsLoading(false);
      });
  }, [article_id]);

  /* Here we are optimistically rendering by increasing the vote count before making a new GET request to update all the comments. */
  const incVoteComments = (comment_id) => {
    console.log(comment_id);
    patchComment(comment_id);

    setComments((existingComment) => {
      return existingComment.map((comment) => {
        if (comment.comment_id === comment_id) {
          return { ...comment, votes: comment.votes + 1 };
        }
        return comment;
      });
    });
  };

  /* Here we are optimistically rendering by increasing the vote count before making a new GET request to update the article. */
  const incVoteArticles = (article_id) => {
    console.log(article_id);
    patchArticle(article_id);
    setArticle((existingArticle) => {
      return { ...existingArticle, votes: existingArticle.votes + 1 };
    });
  };

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
            <button onClick={() => incVoteComments(comment.comment_id)}>
              ⬆️
            </button>
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
          <p className="author">Author: {article.author}</p>
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
            <p>Date Created: {formatTime(article.created_at)}</p>
          </div>
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
