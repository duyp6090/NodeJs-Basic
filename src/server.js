import express from "express";
import configViewEngine from "./config/viewEngine.js";
import initAPIRoute from "./route/api.js";
import initWebRoute from "./route/web.js";
import bodyParser from "body-parser";


const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//setup view engine
configViewEngine(app);

//init web route
initWebRoute(app);

//init API route
initAPIRoute(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})