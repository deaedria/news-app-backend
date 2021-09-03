## News-App-Backend
This is a ExpressJs-based API for [frontend project](https://github.com/deaedria/news-app-frontend.git). It uses PostgreSQL as its database. In some parts of this API development, there were implementations such as KISS, DRY, and also some endpoints that were tested for performance. For just information, there was also an explanation of related definitions. Please see it [here](https://difficult-jay-2a1.notion.site/Documentation-188d1520b1c64070bbe21e52b2be1a3c) for details. For another example of API development using SOLID with OOP, you can check it out in the repository [here](https://github.com/deaedria/shop-backend.git).

## Getting started

To get the Node server running locally:

* Clone this repo with `git clone https://github.com/deaedria/news-app-backend.git`
* `cd kurangguru-backend`
* `npm install` or `yarn install` to install all required dependencies
* Create a `.env` file and reference the `.env.example` file
* `npm start` or `yarn start` to start the local server

## Database

Open [schema](https://drawsql.app/dea/diagrams/Kurangguru)

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

Open Postman [documentation](https://documenter.getpostman.com/view/14707903/TzeTJp9b) 
