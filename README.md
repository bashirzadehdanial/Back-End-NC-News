# NC News API

```bash
This API provides functionality to access and manipulate articles, comments, topics and users.

This project is built with Node.js and Express. Data is stored in PostgreSQL. The API is hosted on Heroku.

```


## Link to the `hosted version`: 
```bash
 https://danial-news-app.herokuapp.com/api
 ```

##

## Instructions

1. To setup and test this project:

2. Clone the respository and `cd` into the directory

3. Run `npm install` to install the project and any dependencies

From the root of the project directory, run the following to set up environment variables for the test and dev database: 
 ```bash
 echo 'PGDATABASE=nc_news' > ./.env.development
echo 'PGDATABASE=nc_news_test' > ./.env.test
```
4. Run `npm run setup-dbs` to setup the development and test databases

5. Now you're ready to run or test the API:

      To run the app, use: `npm start`. The default port is 8000.
      To test the app, use: `npm test`


