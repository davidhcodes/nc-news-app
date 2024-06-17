import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./Homepage";
import Articles from "./Articles";
import { getTopics } from "../utils/api";
import "./App.css";
import IndividualArticle from "./IndividualArticle";

function App() {
  /* The variable category is an array of all the categories we have fetched   */
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState(null);

  useEffect(() => {
    setIsLoading(true);

    getTopics()
      .then((allTopics) => {
        console.log(allTopics);
        setTopics(allTopics);
        setIsLoading(false);
      })
      .catch((err) => {
        setErr(err);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/articles" element={<Articles topics={topics} />} />
          <Route path="/articles/:article_id" element={<IndividualArticle />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
