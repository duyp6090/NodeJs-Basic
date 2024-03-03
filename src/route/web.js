import express from "express";
import homeController from "../controller/homeController.js";

let router = express.Router();

const initWebRoute = (app) => {
    router.get('/', homeController.getHomepage);
    router.get('/detail/user/:userId', homeController.getDetailUser);
    router.post('/create-new-user', homeController.createNewUser);
    return app.use('/', router);
};

export default initWebRoute;