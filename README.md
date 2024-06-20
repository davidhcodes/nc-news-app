# Northcoders News API

## Summary of project

The project is a building an API for accessing application data programmatically, the idea is to mimic a backend service such as a blog or article based site. The idea is to create the back end architecture that will provide the necessary information and environment for the front-end application.

## Deployed version link

https://hg-news.netlify.app/

## Instructions

### How to use the website

The home page will present a navigation page including information about the currently logged in user if there is one.
Click on each button to navigate the news app, there is a separate topics page that can redirect the user to articles specifically regarding that topic. The user can also select an account to log in as, only logged in users can make comments on articles and only the specified user can delete their existing comments. The user can sort the articles by topics but also by the "Date", "Number of comments" and "Number of votes".

To read more about an article the user can click on the "Read more" button which will redirect to a separate page of the full article and the corresponding comments. To post a new comment as a logged in user, write the comment in the given space and click submit, all logged in users can 'upvote' comments and articles.

## Running the project locally

### Installing dependencies

The list of npm packages required are listed below (run "npm i [package_name] " to install):

- axios
- moment
- react-router-dom

The use the project locally, clone the repository using the command

```
 git clone https://github.com/davidhcodes/nc-news-app.git
```

To run the project locally, use the command after installing the dependencies listed above. The console will provide a link to access the site locally.

```
npm run dev
```

---

### Link to back end repository

#### https://github.com/davidhcodes/nc-news

### Minimum package requirements:

- Node.js: v21.7.2
- Postgres: "node-postgres": v ^0.6.2

---

This portfolio project was created as part of a Digital Skills Bootcamp in Software Engineering provided by [Northcoders](https://northcoders.com/)
