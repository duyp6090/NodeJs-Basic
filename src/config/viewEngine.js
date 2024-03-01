import express from "express";

const configViewEngine = (app) => {
    app.use(express.static('./src/public'));
    //app.use(express.static(__dirname + '/public'));
    app.set("view engine", "ejs");
    app.set("views", "./src/views");
}

export default configViewEngine;