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

        return data[0]
    })
}

export const getCommentsByArticleID = (article_id)=>{
    return newsApi.get(`/articles/${article_id}/comments`, )
    .then(({data})=>{
    return data
})
}

export const getTopics = ()=>{
    return newsApi.get("/topics")
            .then(({data})=>{
        return data.topics
    })
}


export const patchComment = (comment_id)=>{
    const patchBody ={inc_votes:1}

    return newsApi.patch(`/comments/${comment_id}`, patchBody)
    .then(({data})=>{
        return data.comment
    })
}


export const patchArticle = (article_id)=>{
    const patchBody ={inc_votes:1}

    return newsApi.patch(`/articles/${article_id}`, patchBody)
    .then(({data})=>{
        console.log(data)
        return data.articles
    })
}



/*

https://nc-news-davidhcodes.onrender.com/api/
*/