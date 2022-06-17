# NodeJs-Express-Backend

This project repository contains files for a NodeJs - Express backend with authentication. Includes JWT (access tokens and refresh tokens) and follows the Model-View-Controller architecture.

## Features:
  - User registration
  - User authentication
  - CRUD operations for employees
  - Error logging
  - Request logging


## Getting Started
### Prerequisites

 - NodeJS, NPM (https://www.npmjs.com/get-npm)
 - A MongoDB server, local or remote. Example: MongoDB Atlas (https://www.mongodb.com/)

 ## Installing

  - Clone the repository to your local
  - Run 
    ```
    $ npm install 

  - Set following environment variables in a .env file in the root directory
    ``` 
    ACCESS_TOKEN_SECRET = <some string>
    REFRESH_TOKEN_SECRET = <some string>
    MONGODB_URI = <some string>

  - Run ``$ npm run dev`` to start the backend express server on port 8000