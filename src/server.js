import express from "express";
import configViewEngine from "./configs/viewEngine.js";
const path = require('path');
const app = express();
const port = 3000;


//config viewEngine
configViewEngine(app);

app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})