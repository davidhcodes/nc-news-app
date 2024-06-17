import { useEffect, useState } from "react";
import moment from "moment";
import { useParams } from "react-router-dom";
import { getArticleByID } from "../utils/api";

function IndividualArticle() {
  const { article_id } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState(null);
  const [article, setArticle] = useState({});

  const formatTime = (timeISO) => {
    const newTime = moment(timeISO).format("dddd, MMMM Do YYYY, h:mm a");
    return newTime;
  };

  const capitalize = (str) => {
    return str.at(0).toUpperCase() + str.slice(1);
  };

  useEffect(() => {
    setIsLoading(true);

    getArticleByID(article_id)
      .then((article) => {
        setArticle(article);
        setIsLoading(false);
      })
      .catch((err) => {
        setErr(err);
        setIsLoading(false);
      });
  }, [article_id]);

  return (
    <>
      <div className="articles-container">
        <div className="articleHeader">
          <h1>{article.title} </h1>
          <h2> {capitalize(article.topic)}</h2>
        </div>
        <img className="img_articlepage" src={article.article_img_url} />
        <p className="articleParagraph">{article.body}</p>
        <p>Author: {article.author}</p>
        <p> Votes: {article.votes}</p>
        <p>Date Created: {formatTime(article.created_at)}</p>
      </div>
      <div>
        <h1> Placeholder for the comments </h1>
      </div>
    </>
  );
}

export default IndividualArticle;
