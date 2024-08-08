import express from 'express';
import connectMongoDb from "./connection.js"
import configureMiddleware from "./middlewear/middlewear.js"

import {restrictUser, checkAuth} from './middlewear/auth.js';
import urlRoute from "./routes/urlRouter.js"
import path from "path";
import staticRoute  from "./routes/staticRouter.js"
import userRoute from "./routes/userRoutes.js"

const app = express();
const PORT = 8000;

//connection to MongoDB Database
connectMongoDb("mongodb://localhost:27017/shortUrl")

//middleware
configureMiddleware(app);

//set the view engine to ejs
app.set("view engine" , "ejs");
app.set("views", path.resolve("./views"))

//route
app.use("/url", restrictUser, urlRoute)
app.use("/", checkAuth, staticRoute)
app.use("/user", userRoute)

app.listen(PORT, ()=> console.log(`Server started at port : ${PORT}`));