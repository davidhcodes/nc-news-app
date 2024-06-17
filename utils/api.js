import axios from "axios"

const newsApi = axios.create({baseURL: "https://nc-news-davidhcodes.onrender.com/api/"})

export const getArticles = (topic)=>{
    return newsApi.get("/articles", 
        {params: {topic}})
        .then(({data})=>{

        return data.articles
    })
}

export const getTopics = ()=>{
    return newsApi.get("/topics")
        // {params: {topics}})
        .then(({data})=>{
        return data.topics
    })
}


/*

https://nc-news-davidhcodes.onrender.com/api/
*/