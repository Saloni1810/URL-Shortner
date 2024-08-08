import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

const app = express();


const configureMiddleware = (app) => {
    // Middleware
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser())
  };
  
  export default configureMiddleware;