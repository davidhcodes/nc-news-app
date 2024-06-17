import axios from "axios"

const newsApi = axios.create({baseURL: "https://nc-news-davidhcodes.onrender.com/api/"})

export const getArticles = (topic)=>{
    return newsApi.get("/articles", 
        {params: {topic}})
        .then(({data})=>{

        return data.articles
    })
}


export const getArticleByID = (article_id)=>{
    return newsApi.get(`/articles/${article_id}`, )
        .then(({data})=>{
            console.log(data)
        return data[0]
    })
}

export const getTopics = ()=>{
    return newsApi.get("/topics")
            .then(({data})=>{
        return data.topics
    })
}


/*

https://nc-news-davidhcodes.onrender.com/api/
*/