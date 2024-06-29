import { useEffect, useState, createContext, useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./Homepage";
import Articles from "./Articles";
import Topics from "./Topics";
import Users from "./Users";
import Error from "./Error";
import { getTopics } from "../utils/api";
import "./App.css";
import IndividualArticle from "./IndividualArticle";
import ArticlesList from "./ArticleList";

function App() {
  /* The variable category is an array of all the categories we have fetched   */
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getTopics()
      .then((allTopics) => {
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
          <Route path="/" element={<Articles topics={topics} />} />
          <Route path="/*" element={<Error />} />
          <Route
            path="/users"
            element={<Users setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route path="/topics" element={<Topics topics={topics} />} />
          <Route path="/articles" element={<Articles topics={topics} />} />
          <Route path="/articles/:article_id" element={<IndividualArticle />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
