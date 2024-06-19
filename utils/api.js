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



export const getUsers = ()=>{
    return newsApi.get("/users")
            .then(({data})=>{
        return data.user_data
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
        return data.articles
    })
}

export const postComment= (username, newComment, article_id)=>{
    const postBody = {username: username,
        body: newComment,};



        return newsApi.post(`/articles/${article_id}/comments`, postBody)
        .then(({data})=>{
            return data.comment
        })
    }

export const deleteComment = (comment_id)=>{
 

        return newsApi.delete(`/comments/${comment_id}`)
        .then(({data})=>{
            return data
        })
    }


/*

https://nc-news-davidhcodes.onrender.com/api/
*/