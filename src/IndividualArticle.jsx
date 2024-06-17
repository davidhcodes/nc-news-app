import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { getArticleByID } from "../utils/api";

function IndividualArticle() {
  const { article_id } = useParams();

  console.log(article_id);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState(null);
  const [article, setArticle] = useState({});

  useEffect(() => {
    setIsLoading(true);

    getArticleByID(article_id)
      .then((article) => {
        console.log(article);
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
        <h1>{article.title} </h1>
        <p>{article.body}</p>
      </div>
      <div>
        <h1> Placeholder for the comments </h1>
      </div>
    </>
  );
}

export default IndividualArticle;
