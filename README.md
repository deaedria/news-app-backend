## News-App-Backend
This is a ExpressJs-based API for [frontend project](https://github.com/deaedria/news-app-frontend.git). It uses PostgreSQL as its database

## Getting started

To get the Node server running locally:

* Clone this repo with `git clone https://github.com/deaedria/news-app-backend.git`
* `cd kurangguru-backend`
* `npm install` or `yarn install` to install all required dependencies
* Create a `.env` file and reference the `.env.example` file
* `npm start` or `yarn start` to start the local server

## Database

Open [database](https://drive.google.com/file/d/10pGBWTXUseKZWZRQAqZMtQubNuNl6Max/view?usp=sharing) and the [schema](https://drawsql.app/dea/diagrams/Kurangguru)

## Folder Structure

    ├── controllers                    
    │   ├── Article.js              
    │   ├── Auth.js              
    │   ├── Category.js             
    │   ├── Comment.js
    |   ├── Notification.js
    |   └── User.js
    ├── helpers
    │   ├── connect_db.js
    │   ├── fromResponse.js              
    │   ├── formUpload.js             
    │   ├── queryAuth.js
    |   ├── queryUser.js
    |   └── verifyToken.js
    ├── models
    │   ├── Article.js              
    │   ├── Auth.js              
    │   ├── Category.js             
    │   ├── Comment.js
    |   ├── Notification.js
    |   └── User.js
    ├── routes
    │   ├── Articles.js              
    │   ├── Auth.js              
    │   ├── Categories.js             
    │   ├── Comments.js
    |   ├── Notifications.js
    |   ├── index.js
    |   └── Users.js
    └── app.js
    
## Documentation

Open [documentation](https://documenter.getpostman.com/view/14707903/TzeTJp9b) 
